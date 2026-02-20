

# Correcao de Duplicacao de Respostas + SEO das Paginas de Servico

## Problemas Identificados

### 1. Respostas duplicadas no detalhe do lead (CRITICO - visivel na screenshot)

A causa raiz esta em **duas camadas**:

**a) No salvamento (`useStepForm.ts`, linha 395):** O `lead_data` da `conversion_events` e salvo como:
```text
{ ...extractedData, service, respostas_mapeadas: mappedResponses, ...mappedResponses }
```
O `...mappedResponses` espalha TODAS as respostas (Nome, Email, Telefone, "Ha bens para dividir?", etc.) como chaves de nivel superior no `lead_data`. Resultado: cada resposta existe DUAS vezes -- dentro de `respostas_mapeadas` E como campo avulso.

**b) Na exibicao (`LeadDetailDialog.tsx`):** O componente exibe:
1. Secao "Respostas do Formulario" iterando `respostas_mapeadas` (Nome, Email, Telefone, etc.)
2. Secao "Campos dinamicos" via `getDynamicFields()` que pega TODOS os campos de nivel superior que nao estao na lista `excludeKeys`

Como `excludeKeys` so exclui chaves em ingles/minusculo (`name`, `email`, `phone`), as chaves em portugues com maiuscula ("Nome", "Email", "Telefone", "Ha Bens Para Dividir?", etc.) passam pelo filtro e aparecem duplicadas.

### 2. Navbar DUPLICADA nas paginas de servico (BUG)

Em `ServiceLandingLayout.tsx`, linhas 146-148:
```text
<Navbar />
<Navbar />
```
A Navbar esta renderizada DUAS VEZES.

### 3. Paginas de servico SEM SEO (meta tags)

O `ServiceLandingLayout` e o `DynamicServicePage` nao definem `document.title` nem meta description. Nao ha nenhuma tag SEO dinamica -- o Google indexa todas as paginas de servico com o mesmo titulo generico do `index.html`.

### 4. Paginas de servico SEM dados estruturados (JSON-LD)

Nenhuma pagina de servico gera schema `LegalService` ou `FAQPage` para o Google. As FAQs ja existem mas nao sao aproveitadas como dados estruturados.

---

## Plano de Implementacao

### 1. Corrigir salvamento do lead_data (useStepForm.ts)

Remover o `...mappedResponses` do spread no INSERT da `conversion_events` (linha 395). Os dados ja existem dentro de `respostas_mapeadas`, nao precisam ser duplicados no nivel superior.

**Antes:**
```text
lead_data: { ...extractedData, service: serviceName, respostas_mapeadas: mappedResponses, ...mappedResponses }
```

**Depois:**
```text
lead_data: { ...extractedData, service: serviceName, respostas_mapeadas: mappedResponses }
```

### 2. Corrigir exibicao no LeadDetailDialog.tsx

Para leads **ja salvos** com dados duplicados, a correcao deve ser na exibicao:

- Adicionar ao `excludeKeys` do `getDynamicFields()` todas as chaves que ja estao em `respostas_mapeadas`. Ou seja, se `respostas_mapeadas` existe, excluir dinamicamente todas as suas chaves do `getDynamicFields`.
- Tambem excluir campos de contato que ja aparecem no cabecalho (Nome/name, Email/email, Telefone/phone em qualquer variacao de maiuscula).
- Excluir campos internos/tecnicos: `respostas_mapeadas`, `source`, `company`, `nome`, `tel`, `celular`, `source_page`, `service`, `Servico`.

### 3. Remover Navbar duplicada (ServiceLandingLayout.tsx)

Remover a segunda chamada `<Navbar />` na linha 148.

### 4. Adicionar SEO dinamico nas paginas de servico (ServiceLandingLayout.tsx)

Adicionar um `useEffect` que define:
- `document.title` = `{serviceName} | {serviceArea} | Nome do Escritorio`
- Meta description via `document.querySelector('meta[name="description"]')` ou criando a tag se nao existir

### 5. Adicionar dados estruturados JSON-LD (ServiceLandingLayout.tsx)

Injetar um `<script type="application/ld+json">` com:
- Schema `LegalService` com `name`, `description`, `areaServed`
- Schema `FAQPage` com as perguntas e respostas da secao FAQ

Limpeza do script no `useEffect` cleanup para evitar acumulo ao navegar entre paginas.

---

## Resumo Tecnico

| Arquivo | Alteracao |
|---|---|
| `src/hooks/useStepForm.ts` | Remover `...mappedResponses` do spread da conversion_events (linha 395) |
| `src/components/admin/LeadDetailDialog.tsx` | Expandir `excludeKeys` dinamicamente com chaves de `respostas_mapeadas` + campos de contato |
| `src/components/ServiceLandingLayout.tsx` | Remover Navbar duplicada, adicionar SEO (document.title + meta description + JSON-LD) |

Nenhuma alteracao em funcionalidades nao relacionadas.

