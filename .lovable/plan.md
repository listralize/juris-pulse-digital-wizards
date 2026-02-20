
# Melhorias no Painel Admin: StepForm Builder + Gestao de Leads

## Problemas Encontrados

### 1. Status do Lead INCONSISTENTE entre componentes (CRITICO)

A tabela `lead_status` no banco tem os valores: `novo`, `contatado`, `qualificado`, `convertido`, `perdido`.

Porem os componentes usam valores DIFERENTES:

| Componente | Valores usados |
|---|---|
| **ResponsiveLeadsTable** (Select) | `novo`, `contato`, `cliente`, `perdido` |
| **LeadsKanban** (colunas) | `novo`, `contatado`, `qualificado`, `proposta`, `convertido`, `perdido` |
| **Estatisticas** (cards superiores) | Filtra por `contato` e `convertido` |
| **Banco de dados** | `novo`, `contatado`, `qualificado`, `convertido`, `perdido` |

Resultado: quando o admin muda o status na tabela para "contato", o Kanban nao reconhece porque espera "contatado". Quando muda no Kanban para "convertido", o card de estatisticas filtra por "convertido" mas o select da tabela nao tem essa opcao. Dados ficam "perdidos" entre componentes.

### 2. Kanban pagina TODOS os leads de uma coluna juntos

O Kanban fatia os leads da coluna usando `slice(kanbanIndexOfFirstLead, kanbanIndexOfLastLead)` -- isso pagina DENTRO de cada coluna, mas o controle de pagina e global. Se voce esta na pagina 2, todas as colunas mostram o "segundo lote" de leads, mesmo que a coluna "novo" tenha 500 leads e "convertido" tenha 3. A experiencia e confusa.

### 3. StepFormBuilder: Botao "Cancelar" duplicado

Na barra superior do editor, existem dois botoes "Voltar" com icone `ArrowLeft` -- um na esquerda e outro na direita (linhas 335-344 e 357-366). O da direita diz "Cancelar" mas faz a mesma coisa.

### 4. StepFormBuilder: Tracking config salvo DUAS VEZES

O `saveForm()` ja inclui `tracking_config` no payload (linhas 252-271). Porem existe um botao separado "Salvar Configuracoes de Rastreamento" que chama `saveTrackingConfig()` e salva so o tracking. O admin precisa lembrar de clicar em DOIS botoes de salvar, ou perde as configs de tracking ao salvar o form geral (que sobrescreve com o estado local).

### 5. LeadComments armazena comentarios na `conversion_events`

Os comentarios de lead sao salvos como `event_type = 'comment'` na tabela `conversion_events`. Isso polui a tabela de leads e os comentarios aparecem na contagem total de "leads" se o filtro nao excluir event_type 'comment'. Alem disso, o `loadLeads` filtra por `event_type IN ('form_submission', 'webhook_received')`, entao os comentarios nao aparecem como leads -- mas e uma pratica fragil.

### 6. Deduplicacao usa `processedLeads` mas retorna `enrichedLeads`

Na funcao `loadLeads` do LeadsManagement (linha 328), a deduplicacao roda sobre `processedLeads`, mas o `setLeads` na linha 422 usa `enrichedLeads` (que NAO foi deduplicado). Ou seja, a deduplicacao e calculada mas NUNCA aplicada -- os leads duplicados aparecem normalmente.

### 7. Nao ha filtro por formulario (form_name/form_id)

O filtro `formFilter` esta declarado (linha 64) mas nunca e usado no `useEffect` de filtragem (linhas 741-831). O admin nao consegue filtrar leads por formulario especifico (ex: so ver leads do "divorcioform").

### 8. StepFormBuilder: sem contagem de leads por formulario

O card de cada formulario mostra "Etapas" e "Webhook", mas nao mostra quantos leads aquele formulario gerou. O admin precisa ir na aba Leads para saber.

---

## Plano de Implementacao

### 1. Unificar status do lead em TODOS os componentes

Definir um unico conjunto de status consistente com o banco:

```text
novo | contatado | qualificado | proposta | convertido | perdido
```

Arquivos a editar:
- **`ResponsiveLeadsTable.tsx`**: Atualizar o `<Select>` para usar `novo, contatado, qualificado, proposta, convertido, perdido`
- **`LeadsManagement.tsx`**: Atualizar os cards de estatisticas para filtrar por `contatado` (nao `contato`) e `convertido`
- **`LeadsKanban.tsx`**: Remover o `getKanbanStatus` mapping (ja nao sera necessario pois os valores serao iguais)

### 2. Corrigir deduplicacao ignorada

Na `loadLeads` do `LeadsManagement.tsx`, trocar `setLeads(enrichedLeads)` por `setLeads(deduplicatedLeads)` -- mas ANTES aplicar o enriquecimento de DDD nos deduplicados (mover a logica de enriquecimento para rodar sobre `deduplicatedLeads`).

### 3. Ativar filtro por formulario

No `useEffect` de filtragem (linha 741), adicionar logica para `formFilter`:

```text
if (formFilter !== 'all') {
  filtered = filtered.filter(lead => lead.form_name === formFilter || lead.form_id === formFilter);
}
```

Adicionar um `<Select>` na area de filtros com os `form_name` unicos extraidos dos leads.

### 4. Remover botao "Cancelar" duplicado no StepFormBuilder

Remover o segundo botao "Cancelar" (linhas 357-366) que duplica o "Voltar" da esquerda.

### 5. Unificar salvamento do tracking config

Remover o botao separado "Salvar Configuracoes de Rastreamento" e garantir que o `saveForm()` sempre salve o tracking junto. O estado `trackingConfig` ja e incluido no `saveForm`, entao basta remover o botao redundante e a funcao `saveTrackingConfig`.

### 6. Melhorar Kanban: remover paginacao global confusa

Remover a paginacao global do Kanban (que fatia cada coluna igualmente). Em vez disso, limitar cada coluna a mostrar os 10 leads mais recentes com um botao "Ver mais" que expande. Isso e mais natural para um board Kanban.

### 7. Adicionar contagem de leads no card do StepFormBuilder

No componente da lista de formularios, buscar a contagem de leads por `form_name` ou `form_id` e exibir no card junto com "Etapas" e "Webhook".

### 8. Exibir respostas do StepForm no detalhe do lead

No `LeadDetailDialog`, quando o lead tem `respostas_mapeadas` no `lead_data`, exibir cada pergunta/resposta de forma formatada em vez de mostrar como campo dinamico generico.

---

## Resumo Tecnico

| Arquivo | Tipo | Alteracao |
|---|---|---|
| `src/components/admin/ResponsiveLeadsTable.tsx` | Editar | Unificar opcoes de status (6 opcoes) |
| `src/components/admin/LeadsKanban.tsx` | Editar | Remover mapping de status, limitar leads por coluna |
| `src/components/admin/LeadsManagement.tsx` | Editar | Corrigir deduplicacao, ativar filtro por formulario, corrigir estatisticas |
| `src/components/admin/StepFormBuilder.tsx` | Editar | Remover botao duplicado, unificar save do tracking, adicionar contagem de leads |
| `src/components/admin/LeadDetailDialog.tsx` | Editar | Exibir respostas_mapeadas formatadas |

**Nenhuma alteracao em funcionalidades nao relacionadas ao admin de StepForm e Leads.**
