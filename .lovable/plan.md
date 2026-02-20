
# Otimizacao Completa do StepForm: UX + Webhook Inteligente com Timing Anti-Ban

## Problemas Identificados

### UX/Conversao
1. **Pagina /obrigado redireciona para WhatsApp em 3 segundos** -- agressivo, contribui para banimentos e assusta o usuario
2. **Opcoes de resposta sao botoes genericos** sem icones ou destaque visual, parecem "frios"
3. **Formulario final nao tem labels** acima dos campos, apenas placeholders que somem ao digitar
4. **Nao mostra "Etapa X de Y"** -- usuario nao sabe quantas perguntas faltam
5. **Botao de envio diz "Enviar Formulario"** -- generico, sem orientacao a acao
6. **Step de urgencia foi adicionado mas nao esta salvando a resposta** nos leads recentes (os leads mais recentes nao tem "Qual a urgencia do seu caso?" no `respostas_mapeadas`)

### Webhook/WhatsApp Anti-Ban
7. **Webhook enviado diretamente do navegador** (`fetch` no useStepForm) -- sem controle de timing, sem retry robusto
8. **Todos os leads disparam webhook ao mesmo tempo** -- se 10 pessoas enviam em 5 minutos, o WhatsApp recebe 10 mensagens seguidas
9. **Nenhum controle de rate limiting** -- risco alto de ban

---

## Plano de Implementacao

### 1. Sistema de Fila de Webhook com Timing Inteligente

**Criar tabela `webhook_queue`** no banco:

```text
webhook_queue
- id (uuid, PK)
- lead_id (text) -- referencia ao lead
- webhook_url (text) -- URL do webhook (Make.com)
- payload (jsonb) -- dados completos do lead
- urgency (text) -- "urgente", "semanas", "pesquisando"
- send_at (timestamptz) -- quando enviar (agora + delay baseado na urgencia)
- sent_at (timestamptz, nullable) -- quando foi efetivamente enviado
- status (text) -- "pending", "sent", "failed", "retrying"
- attempts (int, default 0)
- error_message (text, nullable)
- created_at (timestamptz)
```

**Regras de delay:**
- "Preciso resolver urgentemente" -> `send_at = now() + 30 segundos`
- "Nas proximas semanas" -> `send_at = now() + 3 minutos`
- "Estou pesquisando" -> `send_at = now() + 8 minutos`
- Sem resposta de urgencia (leads antigos) -> `send_at = now() + 1 minuto`

Alem disso, o sistema garante um **intervalo minimo de 45 segundos** entre envios consecutivos para o mesmo `webhook_url`, evitando rajadas.

### 2. Edge Function `process-webhook-queue`

**Criar `supabase/functions/process-webhook-queue/index.ts`:**

- Busca itens da `webhook_queue` onde `status = 'pending'` e `send_at <= now()`
- Ordena por `send_at ASC`
- Para cada item:
  - Verifica se o ultimo envio para aquele `webhook_url` foi ha menos de 45 segundos; se sim, pula
  - Envia POST para o webhook_url com o payload
  - Atualiza `status = 'sent'` e `sent_at = now()`
  - Em caso de erro: incrementa `attempts`, marca `status = 'retrying'` (ate 3 tentativas), depois `status = 'failed'`
- Retorna quantos foram processados

**Gatilho:** Essa funcao sera chamada de duas formas:
1. **Pelo cliente** apos inserir na fila (com delay de 30s via `setTimeout` no frontend para o caso urgente)
2. **Via `pg_cron`** (se disponivel) a cada 2 minutos para processar filas pendentes

### 3. Modificar `useStepForm.ts` -- Webhook via Fila

**Arquivo:** `src/hooks/useStepForm.ts`

Substituir o bloco de envio de webhook direto (linhas 450-481) por:
- Extrair a resposta de urgencia dos `answers` (titulo do step de urgencia)
- Calcular o `send_at` baseado na urgencia
- Inserir na tabela `webhook_queue` com payload completo
- Agendar chamada ao edge function `process-webhook-queue` apos o delay calculado

Isso remove o `fetch` direto para Make.com do navegador do usuario.

### 4. Melhorias de UX no StepForm

#### 4a. StepFormHeader -- Mostrar "Etapa X de Y"

**Arquivo:** `src/components/stepform/StepFormHeader.tsx`

Adicionar props `currentStepNumber` e `totalSteps`. Exibir abaixo da barra de progresso:
- "Etapa 2 de 7" em texto discreto
- Manter o texto motivacional existente

#### 4b. StepQuestion -- Opcoes mais visuais

**Arquivo:** `src/components/stepform/StepQuestion.tsx`

Melhorias visuais nas opcoes:
- Adicionar icone de circulo vazio a esquerda que vira check quando selecionado
- Efeito de hover com sombra mais pronunciada e leve escala
- Feedback haptico visual: ao clicar, a opcao "pulsa" brevemente antes de avancar
- Bordas mais grossas e arredondadas

#### 4c. StepFormFields -- Labels + botao orientado a acao

**Arquivo:** `src/components/stepform/StepFormFields.tsx`

- Adicionar `<label>` visivel acima de cada campo (usando `field.label || field.placeholder`)
- Trocar texto do botao de "Enviar Formulario" para "Quero minha consulta gratuita"
- Adicionar icone de seta no botao
- Remover o `animate-pulse` do botao (cansa o usuario, parece spam)

#### 4d. Pagina /obrigado -- Parar redirecionamento automatico

**Arquivo:** `src/pages/Obrigado.tsx`

Mudancas criticas:
- **Remover o `setTimeout` que redireciona para WhatsApp em 3 segundos** -- isso e a principal causa de banimentos
- Manter apenas o botao "Falar no WhatsApp" como acao voluntaria do usuario
- Adicionar mensagem: "Um especialista entrara em contato com voce em breve pelo WhatsApp"
- Adicionar estimativa de tempo baseada na urgencia (passada via query param): 
  - Urgente: "Voce sera contactado em instantes"
  - Semanas: "Entraremos em contato em ate 24h"
  - Pesquisando: "Enviaremos informacoes por email em breve"

### 5. Passar urgencia para a pagina /obrigado

**Arquivo:** `src/hooks/useStepForm.ts`

Na hora do redirect, anexar a urgencia como query param:
```text
/obrigado?urgencia=urgente
```

A pagina /obrigado le esse parametro e exibe a mensagem personalizada.

---

## Resumo Tecnico

| Arquivo | Tipo | Alteracao |
|---|---|---|
| `webhook_queue` (tabela SQL) | Criar | Fila de webhooks com timing |
| `supabase/functions/process-webhook-queue/index.ts` | Criar | Edge function que processa a fila |
| `src/hooks/useStepForm.ts` | Editar | Trocar fetch direto por insert na fila + disparar edge function com delay |
| `src/components/stepform/StepFormHeader.tsx` | Editar | Adicionar "Etapa X de Y" |
| `src/components/stepform/StepQuestion.tsx` | Editar | Melhorar visual das opcoes (icones, hover, feedback) |
| `src/components/stepform/StepFormFields.tsx` | Editar | Labels visiveis, botao com texto de acao, remover pulse |
| `src/pages/Obrigado.tsx` | Editar | Remover auto-redirect WhatsApp, mensagem personalizada por urgencia |

**Dependencias:** Nenhuma nova

**Fluxo do webhook anti-ban:**
```text
Usuario envia form
  -> Salva lead no banco (form_leads + conversion_events)
  -> Insere na webhook_queue com send_at baseado na urgencia
  -> Agenda chamada ao edge function process-webhook-queue
  -> Edge function processa fila respeitando intervalo minimo de 45s entre envios
  -> Webhook (Make.com) recebe o lead com spacing natural
  -> WhatsApp nao detecta automacao agressiva
```

**Nenhuma alteracao em funcionalidades nao relacionadas ao StepForm e pagina /obrigado.**
