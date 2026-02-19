
# Limpeza do Banco de Dados Supabase - Reduzir de 54MB para ~5MB

## Problema Atual (imagem do usuario)
- Banco de dados: 0.054 GB / 0.5 GB (11%)
- Objetivo: reduzir drasticamente para nao se aproximar do limite do plano gratuito

## Analise dos Dados

| Tabela | Linhas | Tamanho | Problema |
|--------|--------|---------|----------|
| `admin_settings` | 1122 | **12 MB** | Deveria ter 1 linha. 1121 duplicatas |
| `website_analytics` | 8739 | **6.5 MB** | 7764 linhas com +30 dias (89%). Funcao de limpeza existe mas nunca roda |
| `conversion_events` | 1444 | **2.3 MB** | Usuario quer MANTER todos (historico de leads) |
| `footer_info` | 40 | 32 KB | 39 duplicatas |
| `contact_info` | 40 | 64 KB | 39 duplicatas |
| `edge_rate_limits` | 77 | 80 KB | 100% expirados |
| `marketing_campaigns` | 0 | 32 KB | Nunca usada no codigo |
| `webhook_configs` | 0 | 16 KB | Nunca usada no codigo |
| `analytics_monthly_summary` | 0 | 24 KB | Nunca populada |

**Economia estimada: ~19 MB (de ~22 MB para ~3 MB)**

---

## Acoes

### 1. Limpar admin_settings (economia: ~12 MB)
- Deletar as 1121 linhas duplicatas, mantendo apenas a mais recente (id: `68ad83e9-7172-48d5-a519-045e980df900`)
- Adicionar constraint UNIQUE para prevenir futuras duplicatas

### 2. Limpar website_analytics (economia: ~5.8 MB)
- Primeiro, executar a funcao `cleanup_old_analytics()` que ja existe no banco -- ela resume dados antigos em `analytics_monthly_summary` e deleta os registros com +30 dias
- Configurar um cron job (pg_cron + pg_net) para rodar semanalmente, evitando acumulo futuro

### 3. Conversion Events -- MANTER TODOS
- O usuario quer ver leads com mais de 30 dias
- A funcao `cleanup_old_analytics()` atual DELETA conversion_events antigos -- isso precisa ser corrigido
- Alterar a funcao para NAO deletar conversion_events, apenas website_analytics

### 4. Limpar duplicatas de footer_info e contact_info
- Deletar 39 duplicatas de cada tabela, mantendo apenas a linha mais recente

### 5. Limpar edge_rate_limits expirados
- Deletar todas as 77 linhas (100% expiradas)

### 6. Dropar tabelas nao utilizadas
- `marketing_campaigns` -- 0 linhas, zero referencias no codigo
- `webhook_configs` -- 0 linhas, zero referencias no codigo (webhooks sao gerenciados via `admin_settings.webhook_configs` e `admin_settings.lead_webhook_config`)

### 7. Prevenir futuras duplicatas
- Corrigir `HomePageEditor.tsx`: usar `.order('updated_at', { ascending: false }).limit(1).maybeSingle()` consistentemente (ja esta correto)
- Os componentes que acessam admin_settings ja usam `.limit(1)` ou `.order().limit(1)`, o problema foi historico

---

## Detalhes Tecnicos

### SQL de Limpeza (sera executado via migration/insert tool)

**admin_settings**: Manter apenas a linha mais recente, deletar 1121 duplicatas

**website_analytics**: Chamar `cleanup_old_analytics()` para resumir e limpar

**cleanup_old_analytics()**: Recriar a funcao SEM o `DELETE FROM conversion_events` para preservar historico de leads

**Cron job**: Configurar `pg_cron` para rodar `cleanup_old_analytics()` semanalmente

**footer_info / contact_info**: Deletar duplicatas mantendo a mais recente de cada

**edge_rate_limits**: Deletar todos os registros expirados

**Tabelas**: DROP `marketing_campaigns` e `webhook_configs`

### Arquivos de Codigo a Modificar
Nenhum arquivo de codigo precisa ser alterado -- o codigo atual ja funciona corretamente com uma unica linha por tabela. O problema foi causado por versoes anteriores do codigo que faziam INSERT em vez de UPDATE.

### Restricoes
- Conversion events preservados integralmente (requisito do usuario)
- Nenhuma funcionalidade existente alterada
- Nenhuma integracao quebrada (webhook_configs na tabela propria nao e usada; webhooks reais estao em admin_settings)
