

# Preparacao para Deploy via Coolify (GitHub) - Maxima Eficiencia

## Visao Geral

O projeto precisa de um Dockerfile + nginx para rodar no Coolify, limpeza de dependencias nao utilizadas, e otimizacoes finais de build. O Coolify faz deploy via Docker a partir do GitHub.

---

## 1. Criar Dockerfile multi-stage otimizado

O Coolify precisa de um `Dockerfile` na raiz do projeto. Usar build multi-stage para manter a imagem final minima:

```text
Stage 1: Node 20 Alpine -> npm ci -> npm run build
Stage 2: Nginx Alpine -> copiar /dist -> servir SPA
```

Imagem final tera ~25MB (apenas nginx + arquivos estaticos).

## 2. Criar configuracao nginx otimizada

Arquivo `nginx.conf` na raiz com:
- Compressao gzip para JS/CSS/HTML/JSON/SVG
- Cache headers longos para assets com hash (1 ano)
- Cache curto para HTML (sem cache)
- SPA fallback: todas as rotas redirecionam para `index.html`
- Security headers (X-Frame-Options, X-Content-Type, HSTS)
- Brotli-ready (fallback gzip)

## 3. Criar `.dockerignore`

Excluir `node_modules`, `.git`, `scripts/`, etc. para build mais rapido.

## 4. Limpeza de dependencias nao utilizadas

Analise revelou pacotes instalados mas **nunca importados no codigo principal** (apenas em componentes UI boilerplate nao usados):

**Remover do `package.json`:**
- `fabric` (0 imports) -- biblioteca pesada de canvas (~300KB)
- `embla-carousel-react` (0 imports fora do UI boilerplate `carousel.tsx` que ninguem usa)
- `input-otp` (apenas em `ui/input-otp.tsx` que ninguem importa)
- `react-resizable-panels` (apenas em `ui/resizable.tsx` que ninguem importa)
- `@radix-ui/react-hover-card` (apenas em `ui/hover-card.tsx` nao utilizado)
- `@radix-ui/react-context-menu` (apenas em `ui/context-menu.tsx` nao utilizado)
- `@radix-ui/react-menubar` (apenas em `ui/menubar.tsx` nao utilizado)
- `@radix-ui/react-navigation-menu` (apenas em `ui/navigation-menu.tsx` nao utilizado)
- `@radix-ui/react-aspect-ratio` (apenas em `ui/aspect-ratio.tsx` nao utilizado)

**Nota:** Os componentes UI correspondentes (`carousel.tsx`, `input-otp.tsx`, `resizable.tsx`, `hover-card.tsx`, `context-menu.tsx`, `menubar.tsx`, `navigation-menu.tsx`, `aspect-ratio.tsx`) tambem serao removidos pois nao sao importados em lugar nenhum do projeto.

Isso reduz o bundle em ~400KB+ antes de minificacao.

## 5. Otimizar `vite.config.ts` para producao

- Remover `terser` da lista de dependencias (mover para devDependencies ja que so e usado no build)
- Usar `esbuild` minifier em vez de `terser` (mais rapido, resultado similar)
- Adicionar `manualChunks` inteligente para separar vendor (react, supabase, gsap, recharts) do app code
- Remover `keepNames: true` do esbuild (aumenta bundle desnecessariamente)
- Adicionar `cssMinify: true`

## 6. Otimizar `vite.config.ts` - Code Splitting por vendor

```typescript
manualChunks: {
  'vendor-react': ['react', 'react-dom', 'react-router-dom'],
  'vendor-supabase': ['@supabase/supabase-js'],
  'vendor-ui': ['@radix-ui/react-dialog', '@radix-ui/react-select', ...],
  'vendor-charts': ['recharts'],
  'vendor-gsap': ['gsap'],
}
```

Isso permite cache granular -- quando voce atualiza o app, o usuario so rebaixa o chunk do app, nao os vendors.

## 7. Remover scripts de build legados

Os 7 arquivos em `scripts/` (`build-production.js`, `finalize-build.js`, `clean-production.js`, `copy-assets.js`, `fix-build.js`, `production-deploy.js`, `simple-build.js`) sao scripts manuais para deploy na Hostinger que nao serao mais necessarios com Coolify. Tambem remover `BUILD-PRODUCTION.md` e `DEPLOY-HOSTINGER.md`.

## 8. Remover `console.log` restantes (83 arquivos)

Ainda existem **2638 instancias** de `console.log/error/warn` espalhadas em 83 arquivos. Em vez de migrar cada uma manualmente, configurar o Vite para **dropar automaticamente** todos os console.* em producao:

```typescript
// vite.config.ts
esbuild: {
  drop: mode === 'production' ? ['console', 'debugger'] : [],
}
```

Isso remove TODOS os console.* do bundle final sem alterar nenhum arquivo de codigo.

## 9. Limpar `index.html`

- Remover o `<meta http-equiv="Content-Security-Policy">` inline que e muito permissivo (`unsafe-inline unsafe-eval`)
- Configurar CSP via nginx headers no lugar (mais seguro, nao duplicado)
- Remover script de compatibilidade `Promise/Map/Set` (desnecessario para es2020 target)

## 10. Mover `terser` para devDependencies

`terser` esta em `dependencies` mas so e usado durante build. Mover para `devDependencies` reduz o tamanho de install em producao.

---

## Detalhes Tecnicos

### Arquivos a CRIAR:
- `Dockerfile` -- multi-stage build
- `nginx.conf` -- configuracao de servidor otimizada
- `.dockerignore` -- exclusoes para build Docker

### Arquivos a MODIFICAR:
- `package.json` -- remover dependencias nao usadas, mover terser para devDependencies
- `vite.config.ts` -- otimizar build (esbuild minifier, code splitting, drop console)
- `index.html` -- limpar CSP inline e script de compatibilidade desnecessario

### Arquivos a DELETAR:
- `scripts/build-production.js`
- `scripts/finalize-build.js`
- `scripts/clean-production.js`
- `scripts/copy-assets.js`
- `scripts/fix-build.js`
- `scripts/production-deploy.js`
- `scripts/simple-build.js`
- `BUILD-PRODUCTION.md`
- `DEPLOY-HOSTINGER.md`
- `src/components/ui/carousel.tsx`
- `src/components/ui/input-otp.tsx`
- `src/components/ui/resizable.tsx`
- `src/components/ui/hover-card.tsx`
- `src/components/ui/context-menu.tsx`
- `src/components/ui/menubar.tsx`
- `src/components/ui/navigation-menu.tsx`
- `src/components/ui/aspect-ratio.tsx`
- `src/production-build.css`
- `.env.production` (variaveis irao no Coolify diretamente)

### Configuracao no Coolify:
Apos o deploy, voce precisara configurar no painel do Coolify:
- Build Pack: Dockerfile
- Branch: main (ou sua branch padrao)
- Port: 80 (nginx)

Nenhuma variavel de ambiente e necessaria no Coolify pois o Supabase URL e anon key ja estao hardcoded no client.

### Impacto Esperado:
- Bundle ~30-40% menor (remocao de deps nao usadas + code splitting)
- Build ~50% mais rapido (esbuild vs terser)
- Imagem Docker ~25MB
- Cache HTTP otimizado (assets com hash: 1 ano, HTML: sem cache)
- Zero console.log em producao
- gzip/brotli no nginx

