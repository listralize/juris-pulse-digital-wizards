

# Webhook com Resumo Inteligente do Caso (Template-Based NLG)

## Problema Atual

O webhook envia um JSON bruto com TUDO (`responses`, `extractedData`, `allData`, `metadata`, UTMs...). Quem recebe no CRM ve um bloco ilegivel. O plano anterior propunha regras fixas com `if pergunta.includes("bens")` -- isso e fragil e so funciona para divorcio.

## Solucao: Template Engine com NLG (Natural Language Generation)

Em vez de regras hardcoded por tipo de pergunta, usar uma abordagem generica que funciona para QUALQUER formulario, presente ou futuro:

### Arquitetura

```text
mappedResponses + steps metadata
        |
        v
  buildCaseSummary()
        |
        +-- 1. Separar campos de contato (nome, email, telefone)
        +-- 2. Classificar respostas por tipo de step
        +-- 3. Gerar frases naturais com template:
        |       "sim/nao" -> afirmativa/negativa
        |       opcao unica -> "Pergunta: Resposta"
        |       texto livre -> incluir se curto, truncar se longo
        +-- 4. Montar paragrafo unico separado por " | "
        |
        v
  webhookPayload simplificado
```

### Logica do `buildCaseSummary`

```text
function buildCaseSummary(mappedResponses, steps, formName):
  
  CONTACT_KEYS = set de variacoes de nome/email/telefone (case-insensitive)
  
  partes = []
  
  para cada (pergunta, resposta) em mappedResponses:
    // Pular campos de contato
    se normalizar(pergunta) esta em CONTACT_KEYS: continuar
    se resposta vazia: continuar
    
    // Encontrar o step original para contexto
    step = steps.find(s => s.title === pergunta)
    
    // Deteccao inteligente de tipo de resposta:
    
    CASO 1 - Resposta binaria (Sim/Nao):
      se resposta == "Sim" ou "Nao":
        // Gerar frase afirmativa/negativa a partir do titulo
        // "Ha bens para dividir?" + "Sim" -> "Possui bens para dividir"
        // "Ha bens para dividir?" + "Nao" -> "Nao possui bens para dividir"
        frase = transformBinaryAnswer(pergunta, resposta)
        
    CASO 2 - Opcao de multipla escolha (step tem options[]):
      // Usar resposta direta, ja e descritiva
      // "Qual o regime?" + "Comunhao parcial" -> "Regime: Comunhao parcial"
      frase = compactLabel(pergunta) + ": " + resposta
        
    CASO 3 - Texto livre:
      // Truncar se > 80 chars
      frase = compactLabel(pergunta) + ": " + truncar(resposta, 80)
    
    partes.push(frase)
  
  retorna formName + " | " + partes.join(" | ")
```

### Funcoes auxiliares

**`transformBinaryAnswer(pergunta, resposta)`**: Converte perguntas Sim/Nao em frases naturais:
- Remove "Ha ", "Existe ", "Possui ", "Tem ", "Voce tem " do inicio
- Remove "?" do final
- Se "Sim": "Possui " + resto ("bens para dividir")
- Se "Nao": "Sem " + resto ("bens para dividir")

**`compactLabel(pergunta)`**: Encurta titulos longos:
- Remove "Qual e o/a ", "Qual o/a ", "Selecione ", "Escolha ", "Informe "
- Remove "?" do final
- Capitaliza primeira letra
- Exemplo: "Qual e o regime de bens?" -> "Regime de bens"

### Exemplo real (divorcio)

Respostas do lead:
```text
{
  "Nome": "Maria Santos",
  "Email": "maria@email.com",  
  "Telefone": "(62) 99459-4496",
  "Qual o regime de bens?": "Comunhao parcial",
  "Ha bens para dividir?": "Sim",
  "Ha dividas em comum?": "Nao",
  "Possui filhos menores?": "Sim, 2 filhos",
  "Deseja guarda compartilhada?": "Sim",
  "Ha pensao alimenticia?": "Sim",
  "Qual a urgencia?": "Preciso resolver urgentemente"
}
```

Resultado:
```text
{
  "nome": "Maria Santos",
  "email": "maria@email.com",
  "telefone": "(62) 99459-4496",
  "resumo_caso": "Divorcio | Regime de bens: Comunhao parcial | Possui bens para dividir | Sem dividas em comum | Filhos menores: Sim, 2 filhos | Possui guarda compartilhada | Possui pensao alimenticia | Urgencia: Preciso resolver urgentemente",
  "formulario": "Divorcio",
  "data_envio": "2026-02-20T12:00:00Z"
}
```

## Alteracoes Tecnicas

### `src/hooks/useStepForm.ts`

1. Adicionar 3 funcoes utilitarias ANTES do hook:

- `compactLabel(label)`: remove prefixos interrogativos e "?"
- `transformBinaryAnswer(question, answer)`: converte Sim/Nao em frases naturais
- `buildCaseSummary(mappedResponses, steps, formName)`: orquestra a geracao do resumo

2. Substituir o `webhookPayload` atual (linhas 453-466) por:

```text
const resumo = buildCaseSummary(mappedResponses, form.steps, serviceName);
const webhookPayload = {
  nome: extractedData.name,
  email: extractedData.email,
  telefone: extractedData.phone,
  resumo_caso: resumo,
  urgencia: urgency,
  formulario: form.name,
  data_envio: new Date().toISOString(),
  lead_id: savedLead?.id,
  form_slug: form.slug
};
```

### Nenhuma alteracao no edge function `process-webhook-queue`

Ele ja envia `item.payload` como JSON -- o payload simplificado sera enviado automaticamente.

## Resumo

| Arquivo | Alteracao |
|---|---|
| `src/hooks/useStepForm.ts` | Adicionar `buildCaseSummary` + helpers, substituir webhookPayload |

Nenhuma outra funcionalidade e alterada. A mudanca afeta APENAS o conteudo enviado via webhook.
