

# Refatoracao Final - Desempenho, Logica Robusta e Leveza

## Foco: Eliminar queries duplicadas restantes, remover logs de producao, otimizar CSS, melhorar FloatingFooter e Footer, e polir responsividade

---

## 1. CRITICO: 3 Componentes Ainda Usam `useSupabaseDataNew` Diretamente

Apesar do Provider centralizado criado na fase anterior, 3 componentes ainda chamam `useSupabaseDataNew()` diretamente, criando instancias independentes com queries duplicadas:

| Componente | Impacto |
|-----------|---------|
| `DynamicServicePage.tsx` (linha 13) | 4 queries extras por pagina de servico |
| `DynamicServiceRoutes.tsx` (linha 4) | 4 queries extras no load de rotas |
| `CategoryAreaPage.tsx` (linha 23) | 4 queries extras por pagina de categoria |

**Solucao:** Substituir por `useSupabaseData()` (context) em todos os 3.

---

## 2. CRITICO: `FloatingFooter.tsx` Faz Queries Supabase Independentes

O FloatingFooter (linhas 27-63) faz 2 queries proprias ao Supabase (`footer_info` e `contact_info`) em vez de usar os dados ja carregados no `SupabaseDataContext`. Alem disso, tem listeners de `CustomEvent` para dados que ja vem do context.

**Solucao:** Usar `useSupabaseData()` para `contactInfo` e criar uma query para `footer_info` no context (ou manter a query local mas usando o contactInfo do context para eliminar 1 das 2 queries).

---

## 3. CRITICO: `Footer.tsx` Faz 2 Queries Supabase Independentes

Mesmo problema que o FloatingFooter. O Footer (linhas 27-75) carrega `footer_info` e `contact_info` de forma independente + tem listeners de CustomEvent desnecessarios.

**Solucao:** Usar `useSupabaseData()` para contactInfo. Adicionar `footerInfo` ao context para centralizar completamente.

---

## 4. IMPORTANTE: `useSectionTransition.tsx` Ainda Tem Device Detection Duplicada

Linhas 23-39: O hook mantem `const [isMobile, setIsMobile]` e `const [isTablet, setIsTablet]` com resize listener proprio, apesar de ja importar `useIsMobile`/`useIsTablet` no topo do arquivo na refatoracao anterior. Os estados locais duplicados devem ser removidos.

**Solucao:** Remover os estados locais `isMobile`/`isTablet` e o resize listener. Usar os hooks importados.

---

## 5. IMPORTANTE: 864 `console.log/warn` em Producao

42 arquivos em `src/components` contem `console.log` ou `console.warn` em caminhos de execucao normais (nao apenas erros). Isso:
- Polui o console do usuario final
- Causa micro-overhead em cada render
- Expoe informacao interna (nomes de funcoes, dados de debug)

**Solucao:** Substituir todos os `console.log` de debug em componentes publicos por `logger.log` (que ja existe e respeita ambiente). Remover logs completamente desnecessarios (ex: "MobileNavigation: Home clicked").

Componentes prioritarios (mais impactantes no render path):
- `SectionsContainer.tsx` - logger.log no corpo do render (linha 32) - mover para useEffect ou remover
- `DynamicServiceRoutes.tsx` - 10+ console.logs
- `DynamicServicePage.tsx` - 3 console.logs
- `CategoryAreaPage.tsx` - console.log no corpo do render
- `MobileNavigation.tsx` - 7 console.logs em handlers de click
- `FloatingFooter.tsx` - console.error
- `Footer.tsx` - console.log

---

## 6. IMPORTANTE: CSS com `!important` Excessivo e Regras Conflitantes

O `index.css` tem problemas:
- **Media query aninhada invalida** (linhas 541-556): `@media (max-width: 1440px)` DENTRO de `@media (max-width: 767px)` - a regra interna nunca sera aplicada corretamente porque ja esta dentro de max-width:767px
- **`!important` excessivo** em regras mobile (linhas 506-538): 15 usos de `!important` que sobrescrevem tudo
- **z-index: 999999** no CSS do video (linhas 649-660): z-index absurdo que pode causar conflitos de camada
- **Regra `button, .btn, a { min-height: 44px }` no mobile** (linha 514): isso afeta TODOS os links e botoes, inclusive spans dentro de navbars, causando layouts inesperados

**Solucao:**
- Corrigir a media query aninhada movendo-a para o escopo correto
- Remover `!important` onde possivel, usando especificidade CSS adequada
- Reduzir z-index do video para valores razoaveis
- Limitar a regra de touch target a botoes interativos reais

---

## 7. MODERADO: `NeuralBackground` Roda em Todas as Paginas de Servico

O `ServiceLandingLayout.tsx` (linha 21) importa e renderiza `NeuralBackground` em CADA pagina de servico. Isso significa que o shader WebGL pesado roda em paginas internas que ja tem seu proprio layout. Combinado com o NeuralBackground da home (se o usuario navegar da home), pode haver 2 instancias WebGL simultaneas.

**Solucao:** Remover NeuralBackground das paginas de servico. Manter apenas na home onde ja e renderizado condicionalmente.

---

## 8. MODERADO: `SectionsContainer` Logger no Corpo do Render

Linha 32: `logger.log('SectionsContainer render:', ...)` e chamado em CADA render. Como o SectionsContainer re-renderiza frequentemente (a cada transicao, resize, etc), isso e extremamente verboso.

**Solucao:** Remover completamente (ja se sabe que funciona).

---

## 9. LEVE: Adicionar `font-display: swap` para Fontes Custom

As fontes `Space Grotesk`, `Inter`, `Satoshi`, `Canela` sao carregadas mas sem `font-display: swap`. Isso pode causar FOIT (Flash of Invisible Text) no primeiro load.

**Solucao:** Verificar se o Tailwind config ja tem font-display. Se nao, adicionar no CSS base.

---

## 10. LEVE: Adicionar `will-change: transform` Seletivamente

O `SectionsContainer` desktop usa transicoes horizontais pesadas via GSAP mas o container nao tem `will-change: transform` no CSS (apenas inline style condicional). Adicionar para promover a camada de composicao do GPU.

Ja existe em `willChange: (isMobile || isTablet) ? 'auto' : 'transform'` no estilo inline - confirmar que esta funcionando corretamente.

---

## Plano de Implementacao

### Arquivos a MODIFICAR:

| Arquivo | Mudanca |
|---------|---------|
| `src/contexts/SupabaseDataContext.tsx` | Adicionar `footerInfo` ao context para centralizar |
| `src/hooks/useSupabaseData.ts` | Expor `footerInfo` |
| `src/components/DynamicServicePage.tsx` | Trocar `useSupabaseDataNew` por `useSupabaseData` |
| `src/components/DynamicServiceRoutes.tsx` | Trocar `useSupabaseDataNew` por `useSupabaseData` |
| `src/components/areas/CategoryAreaPage.tsx` | Trocar `useSupabaseDataNew` por `useSupabaseData` |
| `src/components/FloatingFooter.tsx` | Usar context em vez de queries proprias; remover CustomEvent listeners |
| `src/components/sections/Footer.tsx` | Usar context em vez de queries proprias; remover CustomEvent listeners |
| `src/hooks/useSectionTransition.tsx` | Remover device detection duplicada; usar hooks importados |
| `src/components/SectionsContainer.tsx` | Remover logger.log do corpo do render |
| `src/components/navbar/MobileNavigation.tsx` | Remover console.logs de debug |
| `src/components/ServiceLandingLayout.tsx` | Remover NeuralBackground |
| `src/index.css` | Corrigir media query aninhada; reduzir !important; corrigir z-index do video; limitar touch targets |

### Impacto Esperado

- Eliminacao de mais ~12 queries Supabase duplicadas por navegacao
- Console limpo em producao (zero logs de debug)
- CSS mais previsivel sem !important desnecessarios
- GPU melhor utilizada (sem WebGL em paginas de servico)
- Navegacao visivelmente mais leve entre paginas
- Touch targets corrigidos para mobile (sem afetar layout)

