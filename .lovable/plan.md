

# Refatoracao Profunda - Codigo Ruim Restante

## Foco: Queries Duplicadas, Anti-Patterns de Estado, Device Detection Duplicada, GSAP Cleanup Perigoso, e Event-Driven Anti-Patterns

---

## 1. CRITICO: `useSupabaseDataNew` Chamado em 7 Componentes Independentes

Cada componente que importa `useSupabaseDataNew()` cria uma **instancia independente** do hook, disparando queries **separadas** ao Supabase para `service_pages`, `categories`, `team_members`, e `page_texts`. No carregamento da home, isso significa:

- `PracticeAreas.tsx` chama `useSupabaseDataNew()` -> 4 queries
- `Partners.tsx` chama `useSupabaseDataNew()` -> 4 queries
- `ClientArea.tsx` chama `useSupabaseDataNew()` -> 4 queries
- `DynamicServiceRoutes.tsx` chama `useSupabaseDataNew()` -> 4 queries
- `DynamicServicePage.tsx` chama `useSupabaseDataNew()` -> 4 queries

**Total: ~20 queries duplicadas** ao Supabase no load da home.

**Solucao:** Criar um `SupabaseDataProvider` (Context) no topo do app que chama `useSupabaseDataNew` uma unica vez e disponibiliza os dados via context para todos os componentes filhos. Componentes consumidores usarao `useSupabaseData()` (novo hook leve que le do context).

---

## 2. CRITICO: Queries Supabase Avulsas em Componentes de Secao

Alem do `useSupabaseDataNew`, varios componentes fazem suas proprias queries Supabase diretamente:

- `Hero.tsx` (linha 35): `site_settings` SELECT *
- `About.tsx` (linha 34): `site_settings` SELECT 7 colunas
- `Contact.tsx` (linha 35): `site_settings` SELECT 2 colunas
- `Partners.tsx` (linha 82): `site_settings` SELECT 2 colunas
- `WhatsAppButton.tsx` (linha 15): `contact_info` SELECT whatsapp

Todos esses dados ja poderiam vir do Provider centralizado (item 1).

**Solucao:** Expandir o Provider para incluir `site_settings` e `contact_info`. Eliminar todas as queries inline.

---

## 3. IMPORTANTE: `ScrollTrigger.getAll().forEach(kill)` Destroi GSAP de Outros Componentes

Em 4 arquivos (`Hero.tsx`, `PracticeAreas.tsx`, `ClientArea.tsx`, `ServiceLandingLayout.tsx`), o cleanup do `useEffect` chama `ScrollTrigger.getAll().forEach(trigger => trigger.kill())`. Isso mata **TODOS** os ScrollTriggers da pagina, nao apenas os criados pelo componente atual.

Se `PracticeAreas` unmounts primeiro, ele mata os ScrollTriggers do `Hero`, `ClientArea`, e qualquer outro componente.

**Solucao:** Cada componente deve matar apenas seus proprios triggers. Usar o retorno do `gsap.timeline()` com `tl.kill()` (que ja e feito em About e Contact, mas NAO em PracticeAreas e ClientArea).

---

## 4. IMPORTANTE: Device Detection Duplicada em Partners e PracticeAreas

- `Partners.tsx` (linha 49-56): `window.addEventListener('resize', checkMobile)` proprio
- `PracticeAreas.tsx` (linha 25-34): `window.addEventListener('resize', checkMobile)` proprio
- `useSectionTransition.tsx` (linha 30-39): mais um resize listener proprio

Todos detectam mobile/tablet mas usando thresholds DIFERENTES:
- `Partners.tsx`: `< 768` para mobile
- `PracticeAreas.tsx`: `< 768` para mobile
- `useSectionTransition.tsx`: `< 640` para mobile, `< 1024` para tablet

Existem os hooks `useIsMobile()` e `useIsTablet()` que ja fazem isso com um unico media query listener. Os componentes deveriam usa-los.

**Solucao:** Substituir deteccao manual nos 3 componentes pelos hooks `useIsMobile`/`useIsTablet`.

---

## 5. IMPORTANTE: `Blog.tsx` - Logger no Render Body

Linha 33: `logger.log('Blog section - Posts carregados do Supabase:', blogPosts.length)` e chamado **fora de useEffect**, ou seja, em cada re-render do componente. Isso nao causa crash mas polui o console e e anti-pattern.

**Solucao:** Mover para dentro de um `useEffect` ou remover.

---

## 6. MODERADO: `PracticeAreas.tsx` Duplica Estado com `localPageTexts` e `localCategories`

O componente cria estado local que e copia exata do estado do hook:
- Linha 36: `const [localPageTexts, setLocalPageTexts] = useState(pageTexts)`
- Linha 37: `const [localCategories, setLocalCategories] = useState(supabaseCategories)`

Depois sincroniza via `useEffect` (linhas 39-45) E via `window.addEventListener('pageTextsUpdated')` (linhas 47-63). Isso cria 3 fontes de verdade para o mesmo dado.

O mesmo padrao se repete em `Partners.tsx`, `ClientArea.tsx`, `About.tsx`, `Contact.tsx`, e `Hero.tsx` - todos criam estado local + listeners de `CustomEvent` para dados que ja vem do Supabase via hooks.

**Solucao:** Com o Provider centralizado (item 1), os componentes lerao direto do context. Os custom events (`pageTextsUpdated`, `teamVideoSettingsUpdated`, etc.) sao necessarios apenas para atualizacao em tempo real do admin - mas como os componentes de secao NAO sao renderizados na pagina de admin, esses listeners sao **codigo morto** nas secoes publicas. Serao removidos.

---

## 7. MODERADO: `Partners.tsx` Manipula DOM Diretamente para Video

Linhas 92-109: Busca elemento de video via `document.getElementById('team-background-video')` e manipula `.src`, `.style.display`, `.play()` manualmente. Isso e anti-pattern em React - o video deveria ser controlado via state.

**Solucao:** Converter para state-driven: `const [videoUrl, setVideoUrl] = useState('')` e renderizar condicionalmente no JSX.

---

## 8. MODERADO: `PracticeAreas.tsx` Usa `window.location.href` em Links

Linhas 219: `window.location.href = area.href` forca uma navegacao full-page em vez de usar o `<Link>` do React Router que ja envolve o componente. Isso causa reload completo da SPA e perde todo o estado.

O componente ja tem `<Link to={area.href}>` envolvendo o card, mas o `onClick` (linha 211) faz `e.preventDefault()` e depois `window.location.href`, anulando completamente o beneficio do React Router.

**Solucao:** Remover o `onClick` handler e deixar o `<Link>` funcionar naturalmente. Tambem remover `onTouchStart`/`onTouchEnd` handlers que fazem micro-animacoes desnecessarias via JS inline.

---

## 9. LEVE: `useLeadsData` Fetch Paginado Ineficiente

Linha 131: `allData = [...allData, ...(batch || [])]` cria um novo array em cada iteracao do loop while. Para 5000 leads, isso significa 5 alocacoes de array crescentes.

**Solucao:** Usar `allData.push(...(batch || []))` em vez de spread para evitar copia.

---

## 10. LEVE: `Admin.tsx` Mobile Dropdown Nao Funciona

O dropdown mobile (linhas 212-268) usa `<Select>` do Radix mas NAO esta conectado ao `<Tabs>`. Selecionar um item no dropdown nao muda a tab ativa. E um componente puramente visual sem funcionalidade.

**Solucao:** Conectar o Select ao estado do Tabs para que ambos estejam sincronizados.

---

## Plano de Implementacao

### Fase 1 - Provider Centralizado (Elimina ~20 queries duplicadas)

| Arquivo | Acao |
|---------|------|
| `src/contexts/SupabaseDataContext.tsx` | **CRIAR** - Provider que chama useSupabaseDataNew + site_settings + contact_info UMA vez |
| `src/hooks/useSupabaseData.ts` | **CRIAR** - Hook leve que consome do context |
| `src/App.tsx` | **MODIFICAR** - Envolver app com SupabaseDataProvider |
| `src/components/sections/PracticeAreas.tsx` | **MODIFICAR** - Usar useSupabaseData() em vez de useSupabaseDataNew(); remover estado local duplicado; remover listeners de CustomEvent; remover resize listener; usar useIsMobile; corrigir ScrollTrigger cleanup; remover window.location.href |
| `src/components/sections/Partners.tsx` | **MODIFICAR** - Usar useSupabaseData(); remover estado local; remover resize listener; usar useIsMobile; converter video para state-driven |
| `src/components/sections/ClientArea.tsx` | **MODIFICAR** - Usar useSupabaseData(); remover estado local; corrigir ScrollTrigger cleanup |
| `src/components/sections/Hero.tsx` | **MODIFICAR** - Usar useSupabaseData(); remover query inline; remover estado local duplicado |
| `src/components/sections/About.tsx` | **MODIFICAR** - Usar useSupabaseData(); remover query inline |
| `src/components/sections/Contact.tsx` | **MODIFICAR** - Usar useSupabaseData(); remover query inline |
| `src/components/sections/Blog.tsx` | **MODIFICAR** - Mover logger para useEffect |
| `src/components/WhatsAppButton.tsx` | **MODIFICAR** - Usar useSupabaseData(); remover query inline |

### Fase 2 - Fixes Pontuais

| Arquivo | Acao |
|---------|------|
| `src/hooks/useSectionTransition.tsx` | **MODIFICAR** - Usar useIsMobile/useIsTablet em vez de resize listener proprio |
| `src/hooks/useLeadsData.ts` | **MODIFICAR** - Corrigir spread ineficiente no loop paginado |
| `src/pages/Admin.tsx` | **MODIFICAR** - Conectar Select mobile ao Tabs state |

### Impacto Esperado

- De ~25+ queries Supabase no load para ~5 queries (reducao de 80%)
- Eliminacao de ~10 resize listeners desnecessarios
- Eliminacao de ~15 listeners de CustomEvent em componentes publicos
- Zero risco de ScrollTrigger destruir animacoes de outros componentes
- Navegacao entre areas sem full-page reload
- Admin mobile dropdown funcional
- Codigo mais limpo e manutenivel
