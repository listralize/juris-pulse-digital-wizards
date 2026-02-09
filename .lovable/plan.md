

# Limpeza Geral - Remover Lovable, Eliminar Logs, Estrutura Robusta

## Escopo da Limpeza

Analise completa revelou **~1400+ console.log/warn** em 53 arquivos e **308 mencoes a "lovable/Lovable"** em 23 arquivos. Alem de dead code CSS e arquivos desnecessarios.

---

## 1. Remover Todas as Mencoes a "Lovable"

### Arquivos a modificar:

| Arquivo | Mudanca |
|---------|---------|
| `vite.config.ts` | Remover import e uso de `lovable-tagger` (plugin de dev) |
| `package.json` | Remover `lovable-tagger` de devDependencies |
| `src/utils/logger.ts` | Trocar `lovable.app` por dominio de producao no check isDev |
| `src/hooks/useMarketingLoader.ts` | Remover check `lovable.app` (linha 18); trocar `pllovable` por `pllistralize` no Facebook Pixel agent (linha 80) |
| `README.md` | Reescrever completamente: remover todas as referencias a Lovable, substituir por "Projeto Serafim & Trombela - Desenvolvido por Listralize" |

**Nota**: Os paths `/lovable-uploads/` NAO serao alterados pois sao paths reais de arquivos estaticos que existem no disco. Altera-los quebraria todas as imagens do site.

---

## 2. Eliminar TODOS os console.log/warn de Debug

### Estrategia:
- **Componentes publicos** (sections, navbar, contact, areas): remover todos os `console.log` e `console.warn` de debug
- **Hooks Supabase** (useSupabaseServicePages, useSupabaseCategories, useSupabaseTeamMembers, useSupabasePageTexts): substituir `console.log` por `logger.log` e `console.warn` por `logger.warn` (mantendo `console.error` para erros criticos)
- **Hooks de marketing** (useStepFormMarketingScripts, useFormMarketingScripts): substituir todos os `console.log` por `logger.log` e `console.warn` por `logger.warn`
- **Componentes admin**: substituir `console.log` por `logger.log` (admin precisa de debug em dev)
- **Hooks de dados** (useBlogData, useFormConfig, useLeadsData): substituir por `logger`

### Arquivos com mais impacto (render path principal):

| Arquivo | console.log count | Acao |
|---------|-------------------|------|
| `src/hooks/supabase/useSupabaseServicePages.ts` | ~30 | Substituir por logger |
| `src/hooks/supabase/useSupabasePageTexts.ts` | ~15 | Substituir por logger |
| `src/hooks/supabase/useSupabaseCategories.ts` | ~8 | Substituir por logger |
| `src/hooks/supabase/useSupabaseTeamMembers.ts` | ~6 | Substituir por logger |
| `src/hooks/useStepFormMarketingScripts.ts` | ~50 | Substituir por logger |
| `src/hooks/useFormConfig.ts` | ~10 | Substituir por logger |
| `src/hooks/useBlogData.ts` | ~6 | Substituir por logger |
| `src/components/navbar/DesktopNavigation.tsx` | 6 | Remover completamente |
| `src/components/contact/LocationMap.tsx` | ~6 | Substituir por logger |
| `src/components/admin/LeadsManagement.tsx` | ~10 | Substituir por logger |
| `src/components/admin/LinkTreeManagement.tsx` | ~5 | Substituir por logger |
| `src/components/admin/BlogManagement.tsx` | ~2 | Substituir por logger |
| `src/components/admin/service-pages/*.tsx` | ~20 | Substituir por logger |
| `src/components/admin/StepFormBuilder.tsx` | ~3 | Substituir por logger |
| `src/main.tsx` | 2 | Remover startup logs |

---

## 3. Remover Dead Code e Arquivos Desnecessarios

| Arquivo | Acao |
|---------|------|
| `src/App.css` | **DELETAR** - Contem CSS do template Vite default (`.logo`, `.read-the-docs`, `logo-spin`) que nunca e usado. O unico util (`.no-scrollbar`) ja pode ir para `index.css` |
| `src/tailwind.config.lov.json` | **NAO ALTERAR** - arquivo de configuracao do sistema de build, renomear pode quebrar |
| `.lovable/plan.md` | Manter - arquivo de sistema |

---

## 4. Mover `.no-scrollbar` para `index.css`

O `App.css` sera deletado, entao as classes utilitarias `.no-scrollbar` precisam ser movidas para `index.css`.

---

## 5. Remover Import de `App.css` no `App.tsx`

Apos deletar `App.css`, remover a linha `import './App.css'` do `App.tsx`.

---

## Resumo de Impacto

- **~1400 console.log/warn** eliminados ou convertidos para logger (silenciosos em producao)
- **Zero mencoes a "Lovable"** no codigo fonte (exceto paths de upload que sao fisicos)
- **1 arquivo deletado** (App.css - dead code)
- **Console de producao limpo** - zero logs de debug visiveis ao usuario final
- **Estrutura mais profissional** - README reescrito, branding correto
- O build de producao ja tem `drop: ['console', 'debugger']` no esbuild (vite.config.ts linha 67), mas o logger adiciona uma camada extra de seguranca para ambientes intermediarios

### Arquivos totais a modificar: ~25+
### Arquivos a deletar: 1 (App.css)

