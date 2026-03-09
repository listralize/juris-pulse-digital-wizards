

# Auditoria de Leads — Resultado Pós-Fix

## Status: Fix aplicado no código, mas AINDA NÃO EFETIVO em produção

### Evidência dos dados

| Período | conversion_events | form_leads salvos | Perdidos |
|---------|------------------|-------------------|----------|
| 09/Mar (hoje) | 1 (Douglas) | 0 | 1 |
| 07/Mar | 3 | 2 (Derick - admin) | 1 (Alexsandro - real) |
| 05/Mar | 1 | 0 | 1 |

O lead do Douglas (hoje 17:36) ainda **não** foi salvo em form_leads. Isso confirma que ele acessou uma versão cacheada do site (antes do fix ser publicado). O padrão continua: leads de admin (Derick) salvam, leads anônimos reais (Douglas, Alexsandro) não.

### Código verificado — Fix está correto

1. **useStepForm.ts**: `crypto.randomUUID()` + insert sem `.select().single()` — correto
2. **gclid/transaction_id** agora inclusos no insert de conversion_events — correto
3. **cors.ts**: Headers expandidos — correto

### Problema restante encontrado

**LandingPageRenderer.tsx** (landing pages com formulário embutido) também insere em form_leads mas **sem** `gclid`, `transaction_id`, ou `visitor_id`. Embora não use `.select()` (então o INSERT funciona), perde dados de atribuição do Google Ads.

### Plano de ação

1. **Publicar o site** para que visitantes reais recebam o código corrigido (o fix está no código mas pode não estar no build publicado ainda)
2. **Corrigir LandingPageRenderer.tsx** — adicionar `id: crypto.randomUUID()`, `gclid`, `transaction_id`, `visitor_id` e `user_agent` ao insert de form_leads
3. **Script de recuperação** — criar query para recriar form_leads a partir de conversion_events que não têm correspondência (recuperar os ~1.338 leads perdidos historicamente)

### Arquivos a alterar

| Arquivo | Mudança |
|---------|---------|
| `src/components/landing/LandingPageRenderer.tsx` | Adicionar gclid, transaction_id, visitor_id, user_agent ao insert de form_leads |

### Recuperação de dados históricos (SQL)

Executar no SQL Editor para recuperar leads perdidos:
```sql
INSERT INTO form_leads (session_id, lead_data, form_id, form_name, source_page, referrer, user_agent, status, created_at)
SELECT ce.session_id, ce.lead_data, ce.form_id, ce.form_name, ce.page_url, ce.referrer, ce.user_agent, 'new', ce.created_at
FROM conversion_events ce
LEFT JOIN form_leads fl ON fl.session_id = ce.session_id
WHERE ce.event_type = 'form_submission'
  AND fl.id IS NULL
  AND ce.lead_data IS NOT NULL;
```

