
# Otimizacao do StepForm + Redirecionamento WhatsApp na Pagina Obrigado

## Resumo
Implementar melhorias de conversao no StepForm (animacoes, progresso visual, trust badges) e adicionar redirecionamento automatico para WhatsApp na pagina de obrigado apos 3 segundos.

## Alteracoes

### 1. Pagina de Obrigado - Redirecionamento WhatsApp
- Apos 3 segundos, redirecionar automaticamente para `https://api.whatsapp.com/send?phone=5562994594496&text=Quero saber mais sobre o divorcio`
- Mostrar contagem regressiva visual ("Redirecionando para WhatsApp em 3...2...1...")
- Manter botoes manuais caso o usuario queira agir antes
- Trocar botao do Instagram por botao do WhatsApp como acao principal

### 2. StepForm.tsx - Animacoes entre Steps
- Envolver o conteudo do card com `AnimatePresence` e `motion.div` do framer-motion
- Animacao de slide horizontal + fade ao trocar de step
- Usar `currentStepId` como key para disparar a animacao

### 3. StepFormHeader.tsx - Barra de Progresso Aprimorada
- Aumentar altura da barra para h-3
- Adicionar indicador percentual numerico abaixo da barra
- Texto motivacional dinamico baseado no progresso:
  - 0-25%: "Vamos comecar!"
  - 25-50%: "Voce esta indo bem!"
  - 50-75%: "Quase la!"
  - 75-100%: "Falta pouco para finalizar!"

### 4. StepQuestion.tsx - Botoes de Opcao Melhorados
- Adicionar efeito hover com escala (`hover:scale-[1.02]`) e sombra
- Icone de check animado ao selecionar uma opcao (estado visual antes de navegar)
- Transicao de cor de fundo no hover

### 5. StepFormFields.tsx - Trust Badges e Urgencia
- Adicionar icone de cadeado com "100% Confidencial" acima do formulario
- Texto "Seus dados estao protegidos" abaixo do botao de envio
- Indicador verde pulsante "Especialista disponivel agora" proximo ao botao
- Botao de envio maior com animacao pulse sutil

### 6. useStepForm.ts - Persistencia de Progresso
- Salvar `currentStepId`, `answers`, `formData` e `history` no localStorage a cada mudanca
- Ao carregar o form, verificar se existe progresso salvo para o mesmo slug
- Limpar localStorage apos envio bem-sucedido

---

## Detalhes Tecnicos

**Arquivos modificados:**
- `src/pages/Obrigado.tsx` - Adicionar useEffect com setTimeout para redirect WhatsApp + contagem regressiva
- `src/pages/StepForm.tsx` - Wrapper AnimatePresence do framer-motion
- `src/components/stepform/StepFormHeader.tsx` - Barra de progresso com percentual e texto motivacional
- `src/components/stepform/StepQuestion.tsx` - Hover animado e check visual nos botoes
- `src/components/stepform/StepFormFields.tsx` - Trust badges, urgencia e botao aprimorado
- `src/hooks/useStepForm.ts` - localStorage para persistir progresso parcial

**Dependencias:** Nenhuma nova (framer-motion ja instalado)

**Banco de dados:** Nenhuma alteracao

**Funcionalidades existentes:** Nenhuma alteracao em interfaces ou fluxos nao relacionados ao StepForm e pagina Obrigado
