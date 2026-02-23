

# Corrigir Campo de Telefone - Nova Abordagem

## Problemas Encontrados

### BUG 1: Loop infinito entre estado interno e externo
O componente atual tem um ciclo vicioso:
1. Usuario digita -> `extractDigits` extrai digitos -> `emitValue` adiciona `55` na frente -> `onChange("55XX...")`
2. O `formData` atualiza com `55XX...`
3. O `useEffect` detecta mudanca em `value` -> chama `extractDigits("55XX...")` -> remove o `55` -> atualiza `digits`
4. Isso causa re-renders desnecessarios e, com autofill, pode cortar/duplicar digitos

### BUG 2: Nenhuma validacao de telefone no submit
O `handleFormSubmit` (useStepForm.ts, linha 311-318) verifica apenas se o campo required esta vazio (`!fieldValue || fieldValue.toString().trim() === ''`). Como o componente emite `55X` mesmo com 1 digito, qualquer numero parcial passa como valido.

### BUG 3: Mascara cria salto visual
Ao digitar o 9o digito (do numero, sem DDD), o formato muda de `XXXX-XXXX` para `XXXXX-XXXX`. Isso faz o cursor pular e confunde o usuario.

## Solucao: Abordagem Simples e Robusta

### Filosofia
- **Zero mascara durante digitacao** -- deixar o usuario/autofill digitar livremente
- **Formatar apenas no blur** -- quando sai do campo, aplica a mascara bonita
- **Validar no submit** -- bloquear envio se telefone invalido

### Como funciona

1. **Digitando**: o campo aceita qualquer input, mostra como o usuario digita (sem mascara forcada)
2. **Autofill**: o navegador preenche `(62) 99999-0000` ou `62999990000` ou `+5562999990000` -- tudo aceito
3. **Ao sair do campo (blur)**: extrai os digitos, normaliza o 9o digito, formata como `(XX) XXXXX-XXXX`, e emite `55XXXXXXXXXXX`
4. **Ao clicar enviar**: StepFormFields valida que o telefone tem 10-11 digitos antes de chamar onSubmit. Se invalido, mostra mensagem de erro e nao envia.

## Alteracoes

### `src/components/stepform/PhoneFieldWithDDD.tsx`

Reescrever com abordagem "format on blur":

- Estado interno: `displayValue` (string formatada mostrada ao usuario)
- **onChange**: armazena o texto como o usuario digita, SEM mascara. Nao emite para o pai durante digitacao.
- **onBlur**: extrai digitos, normaliza 9o digito, formata como `(XX) XXXXX-XXXX`, emite `55XXXXXXXXXXX` para o pai
- **Exportar funcao `isValidPhone(value)`**: recebe o valor `55XXXXXXXXXXX` e retorna true se tem 12-13 digitos (55 + 10 ou 11 digitos)
- Remover o `useEffect` de sync (causa do loop)
- Inicializar `displayValue` a partir do `value` prop apenas uma vez (no useState)

### `src/components/stepform/StepFormFields.tsx`

- Importar `isValidPhone` do PhoneFieldWithDDD
- Antes de chamar `onSubmit()`, validar todos os campos de telefone:
  - Se algum campo telefone required tem valor invalido, mostrar toast de erro e nao enviar
  - Mostrar mensagem: "Informe um numero de telefone valido com DDD"

## Detalhes tecnicos

### Funcao `extractDigits` (simplificada)
- Remove tudo que nao e digito
- Se comeca com `55` e tem 12+ digitos, remove o `55`
- Limita a 11 digitos

### Funcao `isValidPhone` (nova, exportada)
```text
recebe valor no formato "55XXXXXXXXXXX"
extrai digitos apos o 55
retorna true se tem 10 ou 11 digitos
```

### Formato visual no blur
```text
10 digitos: (XX) XXXX-XXXX
11 digitos: (XX) XXXXX-XXXX
```

### Formato emitido (sem mudanca)
```text
55XXXXXXXXXXX (12 ou 13 digitos)
```

## Resumo de arquivos

| Arquivo | Alteracao |
|---|---|
| `src/components/stepform/PhoneFieldWithDDD.tsx` | Reescrever: format-on-blur, exportar isValidPhone |
| `src/components/stepform/StepFormFields.tsx` | Adicionar validacao de telefone antes do submit |

Nenhum outro arquivo precisa ser alterado.

