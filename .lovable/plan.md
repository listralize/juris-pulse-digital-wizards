

# Simplificar Campo de Telefone no StepForm

## Problema

O campo de telefone atual usa um **Select dropdown para o DDD** + input separado para o numero. Isso causa problemas com o preenchimento automatico (autofill) dos navegadores/celulares, que tenta preencher o numero completo (com DDD) no campo de input, cortando digitos porque o campo so espera a parte sem DDD.

## Solucao

Substituir o componente `PhoneFieldWithDDD` por um **campo unico de input** com mascara `(XX) XXXXX-XXXX`, onde o usuario digita ou o autofill preenche o numero completo (DDD + numero). A validacao e correcao do 9o digito acontecem **ao sair do campo (onBlur)** e **ao enviar o formulario**, nao durante a digitacao.

## Como vai funcionar

1. **Input unico** com placeholder `(00) 00000-0000` e mascara automatica conforme digita
2. **Autofill funciona normalmente** -- o navegador preenche direto no campo
3. **Ao sair do campo (blur):** valida se tem 10 ou 11 digitos, mostra borda verde/vermelha
4. **Ao enviar:** normaliza automaticamente:
   - Extrai DDD dos 2 primeiros digitos
   - Aplica regra do 9o digito (adiciona/remove conforme o DDD)
   - Prepende `55` para formato internacional
   - Salva como `55XXXXXXXXXXX` no banco (mesmo formato atual)

## Detalhes tecnicos

### `src/components/stepform/PhoneFieldWithDDD.tsx`

Reescrever o componente para:

- **Um unico `<Input>`** com `type="tel"` e `autoComplete="tel-national"`
- **Mascara em tempo real**: conforme o usuario digita, formata como `(XX) XXXXX-XXXX`
- **Estado interno**: armazena apenas digitos puros
- **onBlur**: valida comprimento (10-11 digitos) e mostra feedback visual
- **onChange emitido**: continua emitindo `55XXXXXXXXXXX` (formato internacional) para manter compatibilidade com todo o sistema (webhook, form_leads, conversion_events)
- Se o valor vier do autofill com `+55` ou `55` no inicio, limpa automaticamente

A interface do componente (`PhoneFieldWithDDDProps`) permanece identica -- nenhum outro arquivo precisa mudar.

### Mascara de formatacao

```text
Digitacao:  X -> (X
            XX -> (XX)
            XXX -> (XX) X
            XXXXX -> (XX) XXX
            XXXXXXX -> (XX) XXXXX
            XXXXXXXX -> (XX) XXXX-XXXX (8 digitos = fixo)
            XXXXXXXXXXX -> (XX) XXXXX-XXXX (9 digitos = celular)
```

### Normalizacao automatica do 9o digito

- DDDs de SP/RJ/ES (11-19, 21, 22, 24, 27, 28) exigem 9 digitos
- Demais DDDs aceitam 8 ou 9 digitos
- Se o DDD exige 9 e o usuario digitou 8: adiciona o `9` na frente automaticamente no blur
- Se o DDD nao exige 9 e o usuario digitou 9 comecando com `9`: remove no blur

### Validacao visual

- **Vazio**: borda padrao
- **Incompleto** (1-9 digitos): borda vermelha suave
- **Completo** (10 ou 11 digitos apos DDD): borda verde/primary

## Resumo de arquivos

| Arquivo | Alteracao |
|---|---|
| `src/components/stepform/PhoneFieldWithDDD.tsx` | Reescrever: input unico com mascara, sem dropdown de DDD |

Nenhum outro arquivo precisa ser alterado -- a interface do componente (props e valor emitido) permanece a mesma.

