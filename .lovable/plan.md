
# Corrigir Limite de 1000 Leads no Supabase

## Problema Identificado

O Supabase retorna no maximo **1000 linhas** por query por padrao. Seu banco tem **1356 leads** na tabela `conversion_events`, mas a query carrega apenas 1000. Isso afeta dois arquivos:

1. `src/components/admin/LeadsManagement.tsx` (linha 217-221) -- query principal de leads
2. `src/hooks/useLeadsData.ts` (linha 111-115) -- hook usado em outros componentes
3. `lead_status` query (linha 344-346) tambem pode ser afetada futuramente

## Solucao

Implementar **fetch paginado** que busca todos os registros em lotes de 1000 ate nao haver mais dados. Isso e feito com `.range(from, to)` do Supabase.

## Mudancas

### 1. `src/components/admin/LeadsManagement.tsx`

Substituir a query simples (linhas 217-221):
```typescript
// ANTES (limite de 1000)
const { data: leadsData } = await supabase
  .from('conversion_events')
  .select('...')
  .in('event_type', [...])
  .order('created_at', { ascending: false });
```

Por uma funcao que busca em lotes:
```typescript
// DEPOIS (sem limite)
const fetchAllRows = async (table, query) => {
  const PAGE_SIZE = 1000;
  let allData = [];
  let from = 0;
  let hasMore = true;
  
  while (hasMore) {
    const { data, error } = await query.range(from, from + PAGE_SIZE - 1);
    if (error) throw error;
    allData = [...allData, ...(data || [])];
    hasMore = (data?.length || 0) === PAGE_SIZE;
    from += PAGE_SIZE;
  }
  return allData;
};
```

Aplicar o mesmo padrao para a query de `lead_status` (linha 344-346).

### 2. `src/hooks/useLeadsData.ts`

Aplicar a mesma correcao de fetch paginado na query de `conversion_events` (linhas 111-115).

### 3. Substituir `console.log` por `logger`

Ambos os arquivos ainda usam `console.log` direto. Migrar para o utilitario `logger` criado na refatoracao anterior.

## Detalhes Tecnicos

- O `PAGE_SIZE` de 1000 e o maximo que o Supabase permite por request
- O loop para quando um batch retorna menos de 1000 itens
- Nenhuma mudanca na interface do usuario -- apenas mais dados serao carregados
- A paginacao na tela (10 por pagina) continua funcionando normalmente, pois opera sobre os dados ja carregados em memoria
- Risco zero: a funcionalidade existente nao muda, apenas remove o limite artificial
