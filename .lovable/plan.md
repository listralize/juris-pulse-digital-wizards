

# Diagnóstico: Leads chegam mas Google Ads não marca conversão

## Causa Raiz Identificada

Existem **3 problemas distintos** que impedem o Google Ads de registrar conversões:

### Problema 1: Landing Pages NÃO disparam Google Ads direto
O `LandingPageRenderer.tsx` faz apenas `dataLayer.push({ event: 'submit' })` (linha 140-154). Ele **não**:
- Usa `useStepFormMarketingScripts` (que contém `implementGoogleAdsConversion` com `gtag('event', 'conversion')`)
- Dispara o evento `stepFormSubmitSuccess` (que é o trigger que os handlers de marketing escutam)

Resultado: se o GTM não estiver configurado perfeitamente para capturar o evento "submit" e disparar a tag de conversão, nada acontece no Google Ads.

### Problema 2: `dataLayer.push` sem `transaction_id` correto no `useContactForm`
No `useContactForm.ts` (linha 136-156), o `dataLayer.push` envia `form_id`, `form_name`, `user_email` etc., mas **não envia `transaction_id` nem `gclid`**. O Google Ads precisa desses campos para Enhanced Conversions.

### Problema 3: Dependência exclusiva do GTM
O código atual depende 100% do GTM para landing pages e formulários de contato. Se a tag de conversão no GTM não estiver configurada com o trigger correto (evento "submit"), a conversão não dispara. O StepForm tem um backup direto via `gtag('event', 'conversion')`, mas landing pages e forms de contato não.

## Plano de Correção

### 1. LandingPageRenderer — adicionar disparo direto do Google Ads
**Arquivo**: `src/components/landing/LandingPageRenderer.tsx`
- Carregar `tracking_config` do `step_forms` (já tem `google_ads_conversion_id` e `google_ads_conversion_label`)
- Após o `dataLayer.push`, disparar `gtag('event', 'conversion', { send_to, transaction_id })` diretamente
- Incluir `gclid` no `dataLayer.push` (já está na variável mas não é enviado)

### 2. useContactForm — adicionar `transaction_id` e `gclid` ao dataLayer + disparo direto
**Arquivo**: `src/components/contact/form/useContactForm.ts`
- Gerar `transaction_id` único
- Capturar `gclid` da URL/sessionStorage
- Incluir ambos no `dataLayer.push`
- Adicionar disparo direto `gtag('event', 'conversion')` como backup (usando config do `marketing_settings.form_tracking_config`)

### 3. Garantir que `gclid` é persistido no sessionStorage
Em ambos os fluxos, capturar `gclid` da URL na primeira visita e persistir no `sessionStorage` para que sobreviva à navegação.

## Arquivos Alterados

| Arquivo | Mudança |
|---------|---------|
| `src/components/landing/LandingPageRenderer.tsx` | Adicionar `gtag('event', 'conversion')` direto + `gclid` no dataLayer |
| `src/components/contact/form/useContactForm.ts` | Adicionar `transaction_id`, `gclid`, e disparo direto `gtag` |

