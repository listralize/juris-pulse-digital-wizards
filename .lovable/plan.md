
# Analise Profunda do StepForm: Erros Criticos + Refatoracao

## Problemas Encontrados (por gravidade)

---

### BUG 1 - CRITICO: Leads salvos em `conversion_events` COM e SEM parse (dados inconsistentes)

**Onde:** `useAnalytics.ts` linha 90 vs `useStepForm.ts` linha 462

O StepForm salva `lead_data` como **objeto JSONB** na `conversion_events`:
```text
lead_data: { ...extractedData, service: serviceName, respostas_mapeadas: mappedResponses }
```

Mas o formulario de contato (via `useContactForm.ts` -> `trackConversion()`) salva como **string JSON**:
```text
lead_data: JSON.stringify(formData)
```

Resultado: na mesma tabela `conversion_events`, alguns registros tem `lead_data` como objeto e outros como string. O painel admin faz `JSON.parse` apenas se for string (linha 254 do LeadsManagement), mas isso cria inconsistencia e dificulta queries SQL.

**Correcao:** No `useAnalytics.ts`, remover o `JSON.stringify` e salvar como objeto direto.

---

### BUG 2 - CRITICO: `visitor_id` sempre unico (tracking quebrado)

**Onde:** `useStepForm.ts` linhas 417 e 455

Ambas as linhas geram um `visitor_id` novo a cada submit:
```text
visitor_id: `stepform_${Date.now()}`
```

Isso significa que CADA submissao tem um visitor_id diferente, impossibilitando rastrear se o mesmo visitante voltou. O `useAnalytics.ts` ja tem um sistema correto com `localStorage` (linha 25-31). O StepForm deveria usar esse mesmo visitor_id.

**Correcao:** Importar e reutilizar a funcao `getOrCreateVisitorId()` do `useAnalytics.ts` no `useStepForm.ts`.

---

### BUG 3 - CRITICO: Dedup do StepForm silenciosamente descarta leads validos

**Onde:** `useStepForm.ts` linhas 363-402

A dedup busca ate 10 `conversion_events` nos ultimos 5 minutos para o mesmo `form_id` e verifica se algum tem o mesmo email. Problemas:

1. Se houver mais de 10 submissoes de OUTROS emails no mesmo periodo, a query retorna 10 sem o email duplicado, e o lead passa como "novo" (falso negativo).
2. Se o lead E duplicado, mostra toast "Sucesso!" e redireciona -- o usuario pensa que enviou, mas o CRM nunca recebe. Google Ads ja contou a visita, gerando discrepancia.
3. A query nao filtra por email no SQL, fazendo fetch desnecessario.

**Correcao:** Fazer a verificacao de duplicata no SQL usando `lead_data->>email` ou, mais simples, verificar na `form_leads` (que tem o email no `lead_data`) com um filtro mais preciso. Reduzir janela para 2 minutos. E se for duplicata, NAO mostrar toast de sucesso -- mostrar mensagem diferente.

---

### BUG 4 - GRAVE: `process-webhook-queue` nunca executa se o usuario fechar a aba

**Onde:** `useStepForm.ts` linhas 568-574

O unico trigger para processar a fila de webhooks e um `setTimeout` no browser:
```text
setTimeout(async () => {
  await supabase.functions.invoke('process-webhook-queue', { body: {} });
}, Math.min(delaySeconds * 1000, 30000));
```

Se o usuario fechar a aba antes do timeout (muito provavel com delays de 30s+), o webhook fica `pending` para sempre. Nao existe cron nem trigger automatico.

**Correcao:** Disparar o `process-webhook-queue` IMEDIATAMENTE apos inserir na fila (delay = 0), e TAMBEM apos o delay configurado. O `send_at` na fila ja controla quando o webhook sera realmente enviado -- a edge function ja verifica `lte('send_at', now)`.

---

### BUG 5 - GRAVE: Evento GTM do StepForm envia dados incompletos

**Onde:** `useStepForm.ts` linha 475 + `useStepFormMarketingScripts.ts` linhas 171-178

O CustomEvent enviado:
```text
detail: { formSlug, formId, formName, userData: formResponses }
```

Mas o handler GTM tenta ler:
```text
event.detail.userData.email  // OK se campo = "email"
event.detail.formData.email  // UNDEFINED - nunca enviado
event.detail.answers.email   // UNDEFINED - nunca enviado
```

Se o campo de email no form se chama "Email" (maiuscula), o handler cai para `userData.Email` que funciona. Mas `formData` e `answers` sao sempre undefined, fazendo o handler iterar por fallbacks desnecessarios.

**Correcao:** Incluir `answers`, `formData`, `extractedData` e `sessionId` no detail do CustomEvent.

---

### BUG 6 - MEDIO: Contact form NAO salva em `form_leads`

**Onde:** `supabase/functions/contact-form/index.ts`

A edge function do formulario de contato processa o lead, envia email e webhook, mas NAO insere em `form_leads`. O frontend insere em `conversion_events` via `trackConversion()`. Mas o painel admin le de `conversion_events`, entao os leads aparecem. Porem, o StepFormBuilder que conta leads por `form_name` na `form_leads` NUNCA mostra leads do formulario de contato -- o que e correto.

O problema real e que se o frontend falhar (JS bloqueado, erro de rede), o `trackConversion` nao executa e o lead e PERDIDO completamente -- a edge function ja retornou "sucesso" e o email foi enviado, mas nenhum registro ficou no banco.

**Correcao:** A edge function `contact-form` deve inserir o lead em `form_leads` no server-side (garantido), e o frontend pode continuar inserindo em `conversion_events` para analytics.

---

### BUG 7 - MEDIO: `form_id` inconsistente entre tabelas

**Onde:** `useStepForm.ts`

Na `form_leads` (linha 408): `form_id: form.slug || form.id || 'stepform'`
Na `conversion_events` (linha 460): `form_id: form.id || 'stepform'`
Na dedup query (linha 371): `form_id: form.id || 'stepform'`

Resultado: `form_leads` usa o SLUG ("divorcioform"), enquanto `conversion_events` usa o UUID. A dedup compara com UUID. Se o admin busca por slug na form_leads, encontra. Se busca por slug na conversion_events, nao encontra.

**Correcao:** Usar `form.slug` consistentemente em ambas as tabelas.

---

### MELHORIA 8: `loading` state com dupla funcao

**Onde:** `useStepForm.ts`

O estado `loading` e usado tanto para carregamento inicial do form (linha 168) quanto para submissao (linha 271). Isso nao causa bug visivel hoje porque o componente StepForm.tsx verifica `if (!form)` separadamente, mas e uma pratica fragil.

**Correcao:** Criar estado separado `isSubmitting` para a submissao.

---

## Plano de Implementacao

### 1. `src/hooks/useStepForm.ts` (principal)

- Extrair `getOrCreateVisitorId` de `useAnalytics.ts` e reutilizar (ou importar)
- Criar estado `isSubmitting` separado de `loading`
- Corrigir dedup: query SQL filtrando por email, janela de 2 min, mensagem diferente para duplicata
- Unificar `form_id` usando `form.slug` em todas as insercoes
- Disparar `process-webhook-queue` imediatamente (com delay 0) alem do timer
- Enriquecer o CustomEvent `stepFormSubmitSuccess` com `answers`, `formData`, `extractedData`, `sessionId`
- Retornar `isSubmitting` do hook (em vez de `loading` para o botao de submit)

### 2. `src/hooks/useAnalytics.ts`

- Exportar `getOrCreateVisitorId` para reuso
- Remover `JSON.stringify` do `lead_data` no `trackConversion`

### 3. `supabase/functions/contact-form/index.ts`

- Adicionar INSERT em `form_leads` server-side para garantir que o lead nunca se perde

### 4. `src/components/stepform/StepFormFields.tsx`

- Usar `isSubmitting` em vez de `loading` no botao de submit

### 5. `src/pages/StepForm.tsx`

- Passar `isSubmitting` do hook para o componente StepFormFields

---

## Resumo de Arquivos

| Arquivo | Alteracao |
|---|---|
| `src/hooks/useStepForm.ts` | Corrigir visitor_id, dedup, form_id, loading/isSubmitting, webhook trigger, CustomEvent |
| `src/hooks/useAnalytics.ts` | Exportar getOrCreateVisitorId, remover JSON.stringify |
| `supabase/functions/contact-form/index.ts` | Inserir lead em form_leads server-side |
| `src/components/stepform/StepFormFields.tsx` | Usar isSubmitting |
| `src/pages/StepForm.tsx` | Passar isSubmitting |

Nenhuma alteracao em funcionalidades nao relacionadas ao StepForm e tracking de leads.
