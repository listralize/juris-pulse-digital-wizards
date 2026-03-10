

# Diagnóstico: Google Ads Tag Error "Cannot parse target"

## Problema Encontrado

O erro no GTM Tag Assistant diz: **"Cannot parse target: '16884173585'"**

A causa raiz: o Conversion ID salvo no banco (`16884173585`) está **sem o prefixo `AW-`**. O `gtag()` exige o formato `AW-16884173585` para funcionar. Sem o prefixo, ele não consegue identificar a conta do Google Ads e descarta a conversão.

Isso afeta duas coisas:
- `gtag('config', '16884173585')` falha (deveria ser `gtag('config', 'AW-16884173585')`)
- `send_to: '16884173585/kuptCP-t3q8aEJGWgPM-'` falha (deveria ser `send_to: 'AW-16884173585/kuptCP-t3q8aEJGWgPM-'`)

Adicionalmente, o campo `custom_head_html` do `divorcioform` está **vazio**, então o script do gtag.js nem sequer carrega na página. O código tenta carregá-lo como fallback, mas com o ID errado.

## Plano de Correção

### 1. Corrigir o Conversion ID no banco (SQL migration)
Atualizar de `16884173585` para `AW-16884173585`:

```sql
UPDATE step_forms 
SET tracking_config = jsonb_set(
  tracking_config::jsonb, 
  '{google_ads_conversion_id}', 
  '"AW-16884173585"'
)
WHERE slug = 'divorcioform';
```

### 2. Adicionar normalização no código (`useStepFormMarketingScripts.ts`)
Garantir que o código sempre adiciona o prefixo `AW-` caso esteja ausente, evitando que esse problema se repita:

```typescript
// Antes de usar gadsId:
const rawId = (config.google_ads_conversion_id || '').trim();
const gadsId = rawId && !rawId.startsWith('AW-') ? `AW-${rawId}` : rawId;
```

### Arquivos alterados

| Arquivo | Mudança |
|---------|---------|
| Nova migration SQL | Corrigir valor no banco para `AW-16884173585` |
| `src/hooks/useStepFormMarketingScripts.ts` | Auto-prefixar `AW-` se ausente |

