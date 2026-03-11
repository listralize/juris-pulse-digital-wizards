

# Diagnóstico: Google Ads diz "Seu site não tem uma tag do Google"

## Causa Raiz

O Google Ads está dizendo que **não encontra a Google Tag (gtag.js) instalada globalmente** no site `stadv.com.br`. O ID é `AW-16884173585`.

O problema é simples: o `useMarketingLoader.ts` carrega **GTM** (`GTM-xxx`) e **Google Analytics** (`G-xxx`), mas **nunca carrega a tag do Google Ads** (`AW-xxx`) globalmente. 

Atualmente, o código só dispara `gtag('event', 'conversion')` no momento do submit do formulário — mas sem a tag base `gtag('config', 'AW-16884173585')` carregada globalmente em todas as páginas, o Google Ads:
1. Não detecta a tag no site (erro que você vê no print)
2. Não consegue atribuir conversões mesmo quando o evento é disparado
3. Não consegue fazer remarketing/audience building

## Correção

### Arquivo: `src/hooks/useMarketingLoader.ts`
Adicionar carregamento global da tag Google Ads (`AW-`) usando o `google_ads_conversion_id` salvo no `form_tracking_config` da tabela `marketing_settings`. Após carregar GTM e GA, também carregar:

```
gtag.js?id=AW-16884173585
gtag('config', 'AW-16884173585');
```

Isso resolve o erro "Seu site não tem uma tag do Google" e permite que as conversões disparadas nos formulários sejam atribuídas corretamente.

**Mudanças específicas:**
- Na função `loadFromDatabase()`, após carregar GTM/GA, ler `form_tracking_config.google_ads_conversion_id` dos settings
- Criar função `loadGoogleAdsTag(adsId)` que injeta `gtag.js` e `gtag('config', 'AW-xxx')` globalmente
- Reutilizar o `gtag` global se já existir (evitar duplicação com GA)

### Arquivo: `index.html` (opcional mas recomendado)
Como backup, adicionar a tag do Google diretamente no `<head>` do `index.html` para garantir que esteja presente antes mesmo do React carregar. Isso é exatamente o que o Google Ads pede no print (Opção 2).

| Arquivo | Mudança |
|---------|---------|
| `src/hooks/useMarketingLoader.ts` | Adicionar `loadGoogleAdsTag()` que carrega `gtag.js` + `gtag('config', 'AW-xxx')` globalmente |
| `index.html` | Adicionar tag do Google Ads hardcoded no `<head>` como fallback imediato |

