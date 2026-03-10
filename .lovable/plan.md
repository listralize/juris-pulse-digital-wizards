

# Diagnóstico: 0 Conversões no Google Ads

## Problema Identificado

Analisei o GTM (screenshots), o código de tracking, e a configuração do formulário `divorcioform` no banco de dados. Encontrei 2 problemas que explicam a perda de conversões:

### Bug 1: Nomes das variáveis do dataLayer NÃO correspondem ao GTM

O GTM espera variáveis com nomes `user_name`, `user_email`, `user_phone` (conforme os Data Layer Variables "DL - user_name", "DL - user_email", "DL - user_phone" configurados nas screenshots).

Mas o código (`useStepFormMarketingScripts.ts`, linhas 258-260) envia com nomes diferentes:

```
dataLayer.push({
  event: "submit",
  customer_full_name: "João",  // GTM procura: user_name
  customer_email: "joao@...",  // GTM procura: user_email
  customer_phone: "62...",     // GTM procura: user_phone
  transaction_id: "...",       // ✓ este está correto
})
```

Resultado: O trigger "submit" DISPARA o tag de conversão, mas os Enhanced Conversions Event Parameters (`user_name`, `user_email`, `user_phone`) chegam VAZIOS no Google Ads. Sem dados de Enhanced Conversions, o Google não consegue atribuir a conversão ao clique do anúncio, e a conversão pode ser descartada como "não verificável".

### Bug 2: Conversão Direta do Google Ads não configurada

O código suporta disparo direto de `gtag('event', 'conversion')` (o método mais confiável, independente do GTM). Mas no banco de dados, os campos `google_ads_conversion_id` e `google_ads_conversion_label` do formulário `divorcioform` estão **nulos**.

Dados do GTM que precisam ser configurados:
- Conversion ID: `16884173585`  
- Conversion Label: `kuptCP-t3q8aEJGWgPM-`

## Plano de Correção

### 1. Fix dataLayer variable names (`useStepFormMarketingScripts.ts`)

Adicionar as variáveis com AMBOS os nomes (manter `customer_*` para compatibilidade + adicionar `user_*` para o GTM):

```typescript
const eventData = {
  event: eventName,
  transaction_id: transactionId,
  gclid: gclid,
  // GTM variable names (conforme configurado no GTM)
  user_name: nome,
  user_email: email,
  user_phone: telefone,
  // Aliases para compatibilidade
  customer_email: email,
  customer_phone: telefone,
  customer_full_name: nome,
  // ... resto mantém igual
};
```

### 2. Fix dataLayer no `useFormMarketingScripts.ts` (formulário principal)

Mesmo fix: adicionar `user_name`, `user_email`, `user_phone` ao dataLayer.push do GTM handler para o formulário da home.

### 3. Configurar Conversão Direta no banco (backup do GTM)

Atualizar o `tracking_config` do formulário `divorcioform` via SQL para incluir:
- `google_ads_conversion_id`: `"16884173585"`
- `google_ads_conversion_label`: `"kuptCP-t3q8aEJGWgPM-"`

Isso ativará o `implementGoogleAdsConversion` que dispara `gtag('event', 'conversion')` diretamente, sem depender do GTM.

### Arquivos alterados

| Arquivo | Mudança |
|---------|---------|
| `src/hooks/useStepFormMarketingScripts.ts` | Adicionar `user_name`, `user_email`, `user_phone` ao dataLayer |
| `src/hooks/useFormMarketingScripts.ts` | Mesmo fix para formulário principal |

### SQL a executar (Supabase SQL Editor)

```sql
UPDATE step_forms 
SET tracking_config = jsonb_set(
  jsonb_set(
    tracking_config::jsonb, 
    '{google_ads_conversion_id}', 
    '"16884173585"'
  ),
  '{google_ads_conversion_label}', 
  '"kuptCP-t3q8aEJGWgPM-"'
)
WHERE slug = 'divorcioform';
```

