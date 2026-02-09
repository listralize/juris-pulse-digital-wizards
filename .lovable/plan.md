
# Fase 4 e 5: Continuacao da Refatoracao

## O que sera feito

### Fase 4: Refatorar StepForm (1074 linhas -> componentes menores)

O arquivo `src/pages/StepForm.tsx` sera dividido em:

1. **`src/hooks/useStepForm.ts`** - Hook com toda a logica de negocio:
   - State management (form, currentStepId, answers, formData, history, visitedSteps, progress)
   - `loadForm()` - carregamento do formulario
   - `getFirstStepFromFlow()` / `getNextStepFromFlow()` - navegacao por flow
   - `goToNextStep()` - navegacao entre steps
   - `handleFormSubmit()` - envio do formulario (validacao, save no Supabase, webhook, email, marketing events)
   - `saveAnswer()`, `getCurrentStep()`, `getBackStep()`

2. **`src/components/stepform/StepFormHeader.tsx`** - Barra de progresso + logo + titulo/subtitulo

3. **`src/components/stepform/StepQuestion.tsx`** - Renderizacao de steps tipo `question` (media + opcoes)

4. **`src/components/stepform/StepContent.tsx`** - Renderizacao de steps tipo `content` (media + botao continuar)

5. **`src/components/stepform/StepFormFields.tsx`** - Renderizacao de steps tipo `form` (campos input/textarea + botao enviar)

6. **`src/components/stepform/StepOffer.tsx`** - Renderizacao de steps tipo `offer`

7. **`src/components/stepform/StepFormFooter.tsx`** - Footer customizado

8. **`src/pages/StepForm.tsx`** - Componente principal simplificado (~50 linhas), apenas composicao dos sub-componentes

Os tipos `StepFormData` e `StepFormStep` serao extraidos para `src/types/stepFormTypes.ts`.

### Fase 5: Limpeza Geral

1. **Remover `useAdminData.ts`** - Nao e importado por nenhum componente, apenas re-exporta `useSupabaseDataNew`

2. **Remover rotas estaticas de areas no `App.tsx`** - Os 9 arquivos em `src/pages/areas/` sao wrappers identicos de `CategoryAreaPage`. O `DynamicCategoryRoutes` ja cobre todas as rotas `/areas/*`. Remover as importacoes e rotas estaticas, e deletar os 9 arquivos.

3. **Substituir `console.log` por `logger`** - No `StepForm.tsx` refatorado, usar o utilitario `logger` criado na fase anterior em vez de `console.log` direto. (Os demais 72 arquivos serao migrados gradualmente.)

4. **Limpar DOM manipulation no `Index.tsx`** - Adicionar cleanup adequado no `useEffect` para resetar os estilos de `body` e `html` quando o componente desmonta, evitando side-effects em outras paginas.

5. **Simplificar `ThemeProvider`** - Remover state/useState desnecessario, props nao usadas (`storageKey`), e a funcao `applyTheme` separada. Manter apenas o contexto fixo em dark.

---

## Detalhes Tecnicos

### Estrutura de arquivos apos refatoracao

```text
src/
  types/
    stepFormTypes.ts          (NOVO - tipos extraidos)
  hooks/
    useStepForm.ts            (NOVO - logica do StepForm)
    useAdminData.ts           (DELETAR)
  components/
    stepform/                 (NOVO - pasta)
      StepFormHeader.tsx
      StepQuestion.tsx
      StepContent.tsx
      StepFormFields.tsx
      StepOffer.tsx
      StepFormFooter.tsx
  pages/
    StepForm.tsx              (SIMPLIFICADO ~50 linhas)
    areas/                    (DELETAR pasta inteira)
      Administrativo.tsx
      Civil.tsx
      ...
```

### Mudancas no App.tsx

- Remover 9 imports de `src/pages/areas/*`
- Remover 9 rotas estaticas `/areas/familia`, `/areas/tributario`, etc.
- A rota `"/areas/*"` com `DynamicCategoryRoutes` ja cobre tudo

### Riscos mitigados

- As rotas `/areas/familia` etc. continuarao funcionando via `DynamicCategoryRoutes` que le categorias do Supabase
- O StepForm mantera exatamente a mesma funcionalidade, apenas reorganizado em arquivos menores
- Nenhuma interface de usuario sera alterada
