
# Corrigir StepForm do Divorcio - 3 Bugs Criticos

## Problemas Encontrados

### BUG 1 (BLOQUEANTE): Formulario exige email, mas nao tem campo de email
O formulario `divorcioform` tem apenas 2 campos: **Nome** e **Telefone**. Porem, no `useStepForm.ts` (linhas 300-305), existe uma validacao obrigatoria de email:

```text
if (!emailValue || !emailValue.trim()) {
  toast('Email e obrigatorio para enviar o formulario');
  return; // <-- BLOQUEIA O ENVIO
}
```

Como nao existe campo de email no formulario, `emailValue` e sempre vazio, e o envio **nunca funciona**. Este e o motivo pelo qual o usuario nao consegue enviar.

**Solucao**: Tornar a validacao de email condicional -- so exigir se o formulario tiver um campo de email configurado.

### BUG 2: Texto do botao errado
Em `StepFormFields.tsx` (linha 99), o texto esta fixo como "Quero minha consulta gratuita". O usuario quer que seja "Enviar".

**Solucao**: Trocar o texto para "Enviar".

### BUG 3: normalize9thDigit remove digitos validos
A funcao `normalize9thDigit` no `PhoneFieldWithDDD.tsx` usa uma lista desatualizada (`DDDS_WITH_9`) que contem apenas DDDs de SP/RJ/ES. Para DDDs como 62 (Goiania), ela **remove** o 9o digito, corrompendo o numero. Desde 2016, todos os celulares brasileiros tem 9 digitos.

**Solucao**: Remover `DDDS_WITH_9` e `normalize9thDigit` completamente.

## Alteracoes por arquivo

### 1. `src/hooks/useStepForm.ts`
- **Linhas 299-305**: Tornar validacao de email condicional. So exigir email se existir um campo de email no formulario atual (verificar `currentStep.formFields` por campo com `type === 'email'` ou `name` contendo 'email')
- Se nao houver campo de email, pular a validacao e permitir envio sem email

### 2. `src/components/stepform/StepFormFields.tsx`
- **Linha 99**: Trocar "Quero minha consulta gratuita" por "Enviar"

### 3. `src/components/stepform/PhoneFieldWithDDD.tsx`
- **Linha 5**: Remover constante `DDDS_WITH_9`
- **Linhas 37-51**: Remover funcao `normalize9thDigit`
- **Linha 87**: No `handleBlur`, usar `digits` diretamente em vez de `normalize9thDigit(digits)`

## Tracking (ja funciona)
Verifiquei o `tracking_config` do formulario e o `useStepFormMarketingScripts.ts`:
- Facebook Pixel: habilitado, evento "Lead", pixel ID 1024100955860841
- GTM: habilitado, container GTM-PL22PJ6V, evento "submit"
- GA: desabilitado (correto)
- O evento `stepFormSubmitSuccess` e disparado apos salvar o lead (linha 482 do useStepForm.ts) e os handlers de FB/GTM capturam esse evento corretamente
- O redirecionamento para `/obrigado` esta configurado (linha 616) e funciona apos 1.5s

O tracking so nao funcionava porque o formulario nunca completava o submit (Bug 1).

## Resumo

| Arquivo | O que muda |
|---|---|
| `src/hooks/useStepForm.ts` | Validacao de email condicional |
| `src/components/stepform/StepFormFields.tsx` | Texto do botao: "Enviar" |
| `src/components/stepform/PhoneFieldWithDDD.tsx` | Remover normalize9thDigit e DDDS_WITH_9 |
