

# Diagnóstico: Perda Massiva de Leads — 3 Bugs Críticos Encontrados

## Evidência do Problema

Dados do banco confirmam perda catastrófica:

| Métrica | Valor |
|---------|-------|
| form_leads (leads salvos) | **119** (desde Jul/2025) |
| conversion_events (submissões detectadas) | **1.457** |
| Taxa de perda | **~92% dos leads perdidos** |

Exemplo concreto: **Hoje (09/03)**, Douglas submeteu o formulário. Resultado:
- conversion_events: salvo
- webhook_queue: salvo e enviado
- reply-agent-sync: executado com sucesso
- **form_leads: NÃO SALVO** (lead perdido)

Em 24/02, ~20 leads reais de anúncios Google Ads apareceram em conversion_events mas **apenas 1** (seu teste manual logado como admin) foi salvo em form_leads.

---

## Bug 1 (CRÍTICO): form_leads INSERT falha para usuários anônimos

**Arquivo:** `src/hooks/useStepForm.ts`, linhas 464-472

**Causa raiz:** O insert usa `.select().single()`:
```typescript
const { data, error } = await supabase
  .from('form_leads')
  .insert([leadData])
  .select()    // ← PROBLEMA
  .single();   // ← PROBLEMA
```

A tabela form_leads tem políticas de SELECT que exigem admin. Quando um visitante anônimo (vindo do anúncio) insere, o PostgREST não consegue retornar o row inserido via `.select()`, e `.single()` gera erro. O INSERT é revertido (rollback da transação).

**Prova:** Seu teste manual funciona porque você está logado como admin (tem permissão SELECT). Leads de anúncios (anônimos) nunca são salvos.

**Comparação:** conversion_events usa `.insert([...])` SEM `.select().single()` — e funciona perfeitamente para anônimos.

**Fix:** Remover `.select().single()`, gerar UUID no client:
```typescript
const leadId = crypto.randomUUID();
const { error } = await supabase
  .from('form_leads')
  .insert([{ id: leadId, ...leadData }]);
```

---

## Bug 2 (IMPORTANTE): gclid e transaction_id NÃO salvos em conversion_events

**Arquivo:** `src/hooks/useStepForm.ts`, linhas 491-507

O código calcula `gclid` e `transactionId` corretamente (linhas 376-382), mas NÃO os inclui no insert de conversion_events:

```typescript
await supabase.from('conversion_events').insert([{
  session_id, visitor_id, event_type, ...
  // FALTAM: gclid e transaction_id!
}]);
```

E como form_leads nunca é salvo (Bug 1), esses dados se perdem completamente. Resultado: Google Ads não consegue atribuir conversões offline.

**Fix:** Adicionar `gclid` e `transaction_id` ao insert de conversion_events.

---

## Bug 3 (MODERADO): CORS headers incompletos nas Edge Functions

**Arquivo:** `supabase/functions/_shared/cors.ts`

Headers atuais:
```
authorization, x-client-info, apikey, content-type
```

Faltam (exigidos pelo Supabase SDK v2.98+):
```
x-supabase-client-platform, x-supabase-client-platform-version,
x-supabase-client-runtime, x-supabase-client-runtime-version
```

Isso pode causar falhas silenciosas na Edge Function `contact-form` (formulário de contato da página principal), bloqueando o preflight CORS em alguns navegadores.

---

## Plano de Correção

### 1. Fix form_leads INSERT (useStepForm.ts)
- Gerar `leadId = crypto.randomUUID()` antes do insert
- Trocar `.insert([leadData]).select().single()` por `.insert([{ id: leadId, ...leadData }])`
- Usar `leadId` diretamente em vez de `savedLead?.id` em todo o código subsequente (webhook, reply-agent, marketing events)
- Manter o retry com a mesma lógica simplificada

### 2. Fix conversion_events INSERT (useStepForm.ts)
- Adicionar `gclid` e `transaction_id` ao objeto do insert

### 3. Fix CORS headers (cors.ts)
- Adicionar os headers faltantes do Supabase client

### Arquivos alterados
| Arquivo | Mudança |
|---------|---------|
| `src/hooks/useStepForm.ts` | Fix insert + adicionar gclid/transaction_id |
| `supabase/functions/_shared/cors.ts` | Adicionar headers CORS |

Nenhuma alteração em UI, banco de dados, ou outros fluxos.

