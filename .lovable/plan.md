

# Analise Profunda de 1.331 Leads + Plano de Conversao Extrema

## ANALISE COMPLETA DOS DADOS

### Distribuicao dos Leads (1.331 total)

**Regime de casamento:**
- Comunhao parcial: 45% (maioria absoluta)
- Uniao estavel: 24%
- Separacao total: 14%
- Nao sei: 12%
- Comunhao universal: 5%

**Combinacoes de complexidade (onde se GANHA e PERDE dinheiro):**

| Complexidade | Combinacao | % dos leads | Valor potencial |
|---|---|---|---|
| SIMPLES | Sem filhos + Sem bens + Sem divida | 25.8% (344) | Baixo (divorcio rapido) |
| MEDIO | Com filhos + Sem bens + Sem divida | 26.4% (352) | Medio (guarda + pensao) |
| COMPLEXO | Com filhos + Com bens + Com divida | 17.3% (230) | ALTO (caso completo) |
| MEDIO-ALTO | Com filhos + Com bens + Sem divida | 8.4% (112) | Medio-alto |

**Insight critico:** 52% dos leads sao casos SIMPLES ou MEDIO-SIMPLES. 25.7% sao casos COMPLEXOS/ALTO-VALOR. O formulario trata todos iguais -- deveria priorizar os complexos.

**Guarda (dos 57% que tem filhos):**
- Compartilhada: 57% | Nao sei: 21% | Unilateral: 17% | Alternada: 5%

**Pensao:** 80% SIM (dos que tem filhos)

**Horarios de pico (UTC -> Brasilia -3h):**
- 21h-01h Brasilia (horarios 0-4 UTC) = 27% dos leads
- 10h-13h Brasilia (13-16 UTC) = 19% dos leads

**Dias da semana:** Distribuicao uniforme (160-213/dia). Terça tem mais (213), Sabado menos (160).

**UTM/Source:** 99.5% chega como "direto" -- sem UTM tracking configurado nas campanhas. Isso e um problema grave de atribuicao.

### PROBLEMAS CRITICOS ENCONTRADOS

1. **form_leads so tem 90 registros (93% de perda)** -- dos 90, todos sao do desenvolvedor (onfleekmidiacriativa@gmail.com). NENHUM lead real esta na form_leads. O retry implementado anteriormente nao esta funcionando no producao porque o codigo ainda nao foi publicado.

2. **Step de urgencia nao esta funcionando em producao** -- dos 20 leads mais recentes, apenas 1 (o teste) tem urgencia preenchida. O codigo novo (com urgencia + webhook queue) precisa ser publicado.

3. **Campos Email e Telefone marcados como `required: false` no banco** -- o formulario exige email no codigo mas o campo no banco diz `required: false`. Telefone tambem e `required: false`, o que significa que leads podem enviar sem telefone.

4. **Webhook queue esta VAZIO** -- nenhum lead usou a fila. O codigo antigo (fetch direto) ainda esta rodando em producao.

5. **DDD/State nao esta sendo salvo** -- a coluna `ddd` e `state` da `conversion_events` estao todas NULL. O trigger `update_lead_location` existe mas nao esta ativo ou nao esta encontrando o campo correto.

6. **Deduplicacao falha** -- a query de deduplicacao verifica `form_id = form.slug` mas o campo salvo no conversion_events e `form_id = form.id` (UUID). Nunca vai encontrar duplicatas.

---

## PLANO DE IMPLEMENTACAO

### 1. Corrigir campos required no banco (SQL)

Atualizar o step de formulario no `step_forms` para marcar Email e Telefone como `required: true`. Isso garante que o codigo de validacao frontend funcione corretamente.

### 2. Corrigir deduplicacao no useStepForm.ts

O bug atual: busca por `form_id = form.slug` (ex: "divorcioform") mas o INSERT salva `form_id = form.id` (UUID). Corrigir para usar o UUID ou slug consistentemente.

### 3. Ativar trigger de localizacao (SQL)

Verificar se os triggers `update_lead_location` e `update_step_form_lead_location` estao ativos. Se nao, recria-los para as tabelas `conversion_events` e `form_leads`. O campo do telefone no trigger busca `lead_data->>'phone'` mas os leads salvam como `lead_data->>'Telefone'` -- precisa buscar ambos.

### 4. Melhorar copy de TODOS os steps para conversao extrema

Atualizar via SQL os textos dos steps. Aplicar principios de micro-copy persuasivo:

**Step 1 - Regime:**
- Titulo: "Qual o regime do seu casamento?" (manter)
- Descricao: "Isso nos ajuda a entender como proteger melhor os seus direitos. Fique tranquilo, e rapido!"

**Step 2 - Bens:**
- Titulo: "Existem bens para dividir?" (manter)
- Descricao: "Imoveis, veiculos ou investimentos adquiridos durante a relacao. Vamos garantir o que e seu."

**Step 3 - Divida:**
- Titulo: "Ha alguma divida em comum?" (manter)
- Descricao: "Financiamentos ou emprestimos em conjunto. Resolvemos isso para voce nao ter dor de cabeca."

**Step 4 - Filhos:**
- Titulo: "Voces tem filhos menores de 18 anos?" (manter)
- Descricao: "O bem-estar dos seus filhos e nossa prioridade numero um."

**Step 5 - Guarda:**
- Titulo: "Qual tipo de guarda voce idealiza?" (manter)
- Descricao: "Cada familia e unica. Vamos encontrar a melhor solucao para os seus filhos."

**Step 6 - Pensao:**
- Titulo: "Havera pensao alimenticia?" (manter)
- Descricao: "Vamos calcular o valor justo para proteger o sustento dos seus filhos."

**Step 7 - Urgencia:**
- Titulo: "Qual a urgencia do seu caso?" (manter)
- Descricao: "Nos ajuda a priorizar o seu atendimento."

**Step 8 - Formulario:**
- Titulo: "Ultimo passo! Seus dados para contato."
- Descricao: "Preencha abaixo e receba uma analise gratuita do seu caso em ate 24h. 100% confidencial."

### 5. Otimizar StepQuestion.tsx - Micro-interacoes

- Reduzir o delay de 400ms para 300ms (mais responsivo)
- Adicionar "ripple effect" sutil ao clicar (sem framer-motion extra, apenas CSS)
- Reset do `selectedIndex` quando o step muda (bug: se usuario voltar, a selecao anterior fica marcada)

### 6. Otimizar StepFormFields.tsx - Formulario final

- Tornar Telefone `required` visualmente (ja e no banco apos correcao)
- Mover o badge "100% Confidencial" para DEPOIS dos campos (nao antes -- usuario precisa ver os campos primeiro)
- Reduzir espacamento entre campos para o formulario parecer mais curto
- Adicionar contador de caracteres sutil no nome (min 3 chars)

### 7. Otimizar StepForm.tsx - Performance

- Adicionar `loading="lazy"` no logo da StepFormHeader
- Reduzir a animacao de transicao de 0.3s para 0.2s (mais rapido)
- Remover import do `StepOffer` e `StepContent` se nao estao em uso no divorcioform (tree-shaking nao funciona com dynamic imports condicionais)

### 8. Pagina /obrigado - Mensagem mais forte

- Adicionar nome do usuario via query param (passado do useStepForm)
- "Obrigado, [Nome]!" personalizado
- Adicionar contagem de pessoas que ja foram ajudadas: "Mais de 1.000 pessoas ja resolveram seu caso conosco"
- Botao WhatsApp maior e mais proeminente

### 9. Corrigir trigger de DDD (SQL)

O trigger `update_lead_location` busca `NEW.lead_data->>'phone'` mas o campo real e `'Telefone'`. Recriar o trigger para buscar em multiplos campos:
```
phone_number := COALESCE(
  NEW.lead_data->>'phone',
  NEW.lead_data->>'Telefone',
  NEW.lead_data->>'telefone',
  NEW.lead_data->>'whatsapp',
  NEW.lead_data->'respostas_mapeadas'->>'Telefone'
);
```

### 10. Passar nome do usuario para /obrigado

No `useStepForm.ts`, ao redirecionar, incluir o nome no query param:
```
/obrigado?urgencia=urgente&nome=João
```

---

## RESUMO TECNICO

| Arquivo/Recurso | Tipo | Alteracao |
|---|---|---|
| Tabela `step_forms` (SQL) | UPDATE | Marcar Email/Telefone required:true, melhorar copy de todos os steps |
| Triggers DDD (SQL) | RECREATE | Buscar telefone em multiplos campos (phone, Telefone, etc) + ativar triggers |
| `src/hooks/useStepForm.ts` | Editar | Corrigir deduplicacao (form_id), passar nome no redirect |
| `src/components/stepform/StepQuestion.tsx` | Editar | Reduzir delay 400->300ms, reset selectedIndex por step |
| `src/components/stepform/StepFormFields.tsx` | Editar | Reordenar trust badge, espacamento, required visual |
| `src/pages/StepForm.tsx` | Editar | Reduzir animacao 0.3->0.2s, lazy logo |
| `src/pages/Obrigado.tsx` | Editar | Nome personalizado, contagem social proof |

**Nenhuma alteracao em funcionalidades nao relacionadas ao StepForm e /obrigado.**

