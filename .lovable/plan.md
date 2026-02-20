
# Otimizacao do Campo Telefone com Regra do 9 e DDD Select

## Analise dos Dados

Dos 86 leads do divorcioform:
- **100% tem `ddd: null` no banco** porque o campo `phone` no `lead_data` esta vazio (o codigo busca `formData.phone` mas o campo real e `formData.Telefone`)
- Telefones digitados em formatos variados: `62999118230`, `062998005141`, ` 6298005141` (com espaco e faltando digito)
- A tabela `ddd_locations` esta incompleta (faltam DDDs 12-19, 22, 24, 42-47, 49, 53-55, etc.)

## Plano de Implementacao

### 1. Componente PhoneFieldWithDDD (novo arquivo)

Criar `src/components/stepform/PhoneFieldWithDDD.tsx` -- um campo de telefone inteligente com:

- **Select de DDD** a esquerda com todos os DDDs do Brasil (11 a 99), mostrando `(DDD) - Estado`
- **Input de numero** a direita, aceitando apenas digitos
- **Prefixo +55** fixo e visivel
- **Mascara automatica** baseada na regra do 9:
  - DDDs com 9 digitos (11-19, 21, 22, 24, 27, 28): campo aceita 9 digitos, placeholder `9 XXXX-XXXX`
  - DDDs com 8 digitos (todos os outros): campo aceita 8 digitos, placeholder `XXXX-XXXX`
- **Valor salvo no formData**: sempre no formato `55{DDD}{numero}` (ex: `5562999118230`)
- **DDD padrao**: 62 (Goias, baseado nos dados -- 96% dos leads sao de GO)
- Lista completa de DDDs hardcoded no componente (nao depende da tabela `ddd_locations`)

### 2. Regra do 9 -- Logica

```text
DDDs COM 9 digitos (celular): 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28
DDDs COM 8 digitos (celular): todos os demais (31-99 exceto os acima)
```

O componente:
- Ao selecionar o DDD, ajusta automaticamente o placeholder e o limite de caracteres
- Se o usuario digitar 9 digitos num DDD de 8, remove o 9 da frente automaticamente
- Se o usuario digitar 8 digitos num DDD de 9, adiciona o 9 na frente automaticamente
- Validacao visual: borda verde quando completo, vermelha quando incompleto

### 3. Integracao no StepFormFields

Modificar `src/components/stepform/StepFormFields.tsx`:
- Detectar campos do tipo `tel` ou com nome contendo "telefone", "phone", "whatsapp" (case insensitive)
- Para esses campos, renderizar o `PhoneFieldWithDDD` em vez do `Input` padrao
- O valor salvo no `formData` sera o numero completo: `55{DDD}{numero}`

### 4. Correcao do Mapeamento no useStepForm

Modificar `src/hooks/useStepForm.ts` linha 263:
- Adicionar `formData.Telefone` na cadeia de fallback do `extractedData.phone`
- Isso corrige o bug que causava `phone: ""` em 100% dos leads, impedindo o trigger de DDD de funcionar

### 5. Completar Tabela ddd_locations (via SQL)

Inserir os DDDs faltantes na tabela `ddd_locations` para que o trigger de localizacao funcione corretamente para todos os leads futuros. DDDs faltantes:
- SP: 12, 13, 14, 15, 16, 17, 18, 19
- RJ: 22, 24
- PR: 42, 43, 44, 45, 46
- SC: 47, 49
- RS: 53, 54, 55
- BA: 73, 74, 75, 77
- MA: 99
- PA: 93, 94
- E outros

---

## Detalhes Tecnicos

### Arquivos criados:
| Arquivo | Descricao |
|---|---|
| `src/components/stepform/PhoneFieldWithDDD.tsx` | Componente de telefone com DDD select + regra do 9 |

### Arquivos modificados:
| Arquivo | Alteracao |
|---|---|
| `src/components/stepform/StepFormFields.tsx` | Detectar campo tel/telefone e renderizar PhoneFieldWithDDD |
| `src/hooks/useStepForm.ts` | Adicionar `formData.Telefone` no mapeamento de phone |

### Migracao SQL:
- Inserir DDDs faltantes na tabela `ddd_locations`

### Exemplo do componente PhoneFieldWithDDD:

```text
+---------------------------------------+
| +55 | (62) GO v | 9 9911-8230     |
+---------------------------------------+
```

- O "+55" e fixo (label visual)
- O DDD e um select com busca
- O numero aceita apenas digitos com mascara automatica
- Ao mudar o DDD, o placeholder e limite mudam conforme regra do 9

### Nenhuma alteracao em UI/funcionalidades nao relacionadas ao StepForm.
