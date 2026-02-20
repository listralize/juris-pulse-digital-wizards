
# Otimizacao Profunda do StepForm - Analise de 1.323 Leads

## Descobertas Criticas

### 1. Perda massiva de dados: 1.323 conversion_events vs 86 form_leads
O formulario salvou **1.323 submissoes** na tabela `conversion_events` mas apenas **86 na tabela `form_leads`**. Isso indica que 93.5% dos leads estao sendo perdidos na tabela principal. A causa provavel e que o `INSERT` em `form_leads` esta falhando silenciosamente (o codigo ja trata isso com um toast de aviso sem bloquear o envio), mas os dados ficam apenas em `conversion_events`.

### 2. Distribuicao REAL das respostas (1.323 leads, nao 86)
Os numeros mudaram drasticamente com a amostra completa:

**Regime do casamento:**
- Comunhao parcial: 596 (45.0%)
- Uniao estavel: 314 (23.7%)
- Separacao total: 179 (13.5%)
- Nao sei: 152 (11.5%)
- Comunhao universal: 67 (5.1%)

A analise anterior com 86 leads dizia "96% uniao estavel" -- isso estava completamente errado. Na realidade, **Comunhao parcial e a maioria** (45%).

**Filhos menores:** Sim 758 (58%) / Nao 550 (42%)

**Tipo de guarda (dos que tem filhos):**
- Compartilhada: 432 (57%)
- Nao sei: 162 (21%)
- Unilateral: 126 (17%)
- Alternada: 38 (5%)

**Partilha de bens:** Nao 797 (60%) / Sim 511 (39%)

**Divida em comum:** Nao 896 (68%) / Sim 412 (31%)

**Pensao alimenticia (dos que tem filhos):** Sim 609 (80%) / Nao 149 (20%)

### 3. Combinacao mais comum (13.4% dos leads)
O caminho mais frequente e: **Comunhao parcial + Sem filhos + Sem partilha + Sem divida** (177 leads). Esse e o "divorcio simples" -- o caso mais facil e rapido.

### 4. Telefone: 0 leads com campo `phone`, 1.291 com `Telefone`
Confirma o bug ja corrigido: o campo `phone` do `extractedData` estava vazio em 100% dos casos.

### 5. Duplicatas: 1 email enviou 27 vezes
O email `onfleekmidiacriativa@gmail.com` (provavelmente do desenvolvedor) aparece 27 vezes. Nao ha deduplicacao.

### 6. Volume mensal estavel
- Ago/2025: 47 (inicio)
- Set: 236
- Out: 336 (pico)
- Nov: 258
- Dez: 126 (queda de fim de ano)
- Jan/2026: 163
- Fev/2026: 157 (parcial)

### 7. Horarios de pico
Picos entre 10h-16h (horario de Brasilia, considerando UTC), com outro pico as 20h-00h. Distribuicao uniforme entre dias da semana (sabado ligeiramente menor).

---

## Plano de Implementacao

### 1. Corrigir perda de 93.5% dos leads na form_leads

O codigo em `useStepForm.ts` salva em `form_leads` mas ignora erros silenciosamente. A correcao e:
- Adicionar retry (1 tentativa extra) ao INSERT em `form_leads`
- Se falhar novamente, salvar os dados no `conversion_events` com flag `form_leads_failed: true`
- Logar o erro real para diagnostico

**Arquivo:** `src/hooks/useStepForm.ts`

### 2. Corrigir calculo de progresso

O progresso atual usa `(currentIndex + 1) / form.steps.length * 100` onde `form.steps.length = 12` (inclui 5 steps orfaos). A correcao:
- Calcular o total de steps alcancaveis percorrendo o `flow_config.edges` a partir do primeiro step
- Ou usar abordagem simples: `(visitedSteps.length) / totalConnectedSteps * 100`
- Expor `visitedSteps` do hook para o calculo

**Arquivo:** `src/hooks/useStepForm.ts`

### 3. Remover 5 steps orfaos via SQL

Os steps com `_copy_` no ID nunca recebem respostas e inflam o total. Remover do array `steps` e do `flow_config.edges`:
- `question_1755015599945_copy_1755015750539`
- `question_1755015599945_copy_1755015750539_copy_1755015756143`
- `question_1755013141974_copy_1755016001163`
- `question_1754915235565_copy_1755016039980`
- `question_1754915235565_copy_1755016039980_copy_1755016127571`

Isso reduz de 12 para 7 steps, corrigindo automaticamente o progresso.

**Implementacao:** UPDATE via SQL na tabela `step_forms` para slug `divorcioform`

### 4. Injetar SEO dinamico

A pagina StepForm nao injeta nenhuma meta tag. Adicionar `useEffect`:
- `document.title` = seo_config.meta_title ou form.title
- Meta description, keywords, OG tags
- JSON-LD schema `LegalService`
- Canonical URL

**Arquivo:** `src/pages/StepForm.tsx`

### 5. Atualizar textos e SEO no banco

Atualizar via SQL:
- meta_title: "Divorcio Online Rapido | Consulta Gratuita - Serafim & Trombela"
- meta_description: "Resolva seu divorcio ou dissolucao de uniao estavel 100% online. Guarda, pensao e partilha de bens. Atendimento em 24h."
- meta_keywords: "divorcio online, divorcio rapido, guarda compartilhada, pensao alimenticia, advogado divorcio goiania"

### 6. Adicionar deduplicacao

Antes de salvar o lead, verificar se o mesmo email ja enviou nos ultimos 5 minutos. Se sim, ignorar (evita spam de re-envio).

**Arquivo:** `src/hooks/useStepForm.ts`

### 7. Melhorar textos dos steps para conversao

Atualizar via SQL os textos dos steps existentes:
- "Regime do casamento" -> "Qual o regime do seu casamento?" (manter as 5 opcoes, pois a distribuicao real mostra uso de todas)
- Adicionar descriptions empateticas em cada step
- Step do formulario: description "Preencha seus dados para receber uma analise gratuita em ate 24h"

### 8. Adicionar step de urgencia antes do formulario

Nova pergunta: "Qual a urgencia do seu caso?"
- "Preciso resolver urgentemente" 
- "Nas proximas semanas"
- "Estou pesquisando"

Conectar todas as opcoes ao step de formulario.

**Implementacao:** INSERT no JSON de steps + edges via SQL

---

## Resumo Tecnico

| Arquivo | Alteracao |
|---|---|
| `src/hooks/useStepForm.ts` | Retry em form_leads, corrigir progresso, deduplicacao por email |
| `src/pages/StepForm.tsx` | useEffect para injetar meta tags, OG, canonical e JSON-LD |
| Tabela `step_forms` (SQL) | Remover 5 steps orfaos, adicionar step urgencia, atualizar textos e SEO |

**IMPORTANTE:** A analise anterior com 86 leads estava enviesada. Com 1.323 leads, a distribuicao e muito mais equilibrada -- Comunhao parcial (45%) e a maioria, nao Uniao estavel. As 5 opcoes de regime devem ser mantidas.

**Nenhuma alteracao em UI/funcionalidades nao relacionadas ao StepForm.**
