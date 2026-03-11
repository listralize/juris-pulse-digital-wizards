

# Configurar Landing Page de Divórcio com StepForm Integrado

## Problema Atual

A landing page de divórcio usa um `embedded_form` simples (campos inline) que **não** usa o mesmo sistema de conversão do StepForm. O StepForm tem: reply-agent sync, email de confirmação, webhook com anti-ban timing, Enhanced Conversions com gclid/transaction_id, e deduplicação. O form embutido tem apenas um `dataLayer.push` básico.

## Abordagem

Criar um novo tipo de seção `embedded_stepform` que renderiza o StepForm quiz **dentro** da landing page. Isso reutiliza 100% da lógica do `useStepForm` (conversão, webhook, email, reply-agent, deduplicação) sem duplicar código.

### 1. Adicionar tipo `embedded_stepform` ao LandingSection

**Arquivo**: `src/types/stepFormTypes.ts`
- Adicionar `'embedded_stepform'` ao union type de `LandingSection.type`

### 2. Criar componente `LandingEmbeddedStepForm`

**Arquivo**: `src/components/landing/LandingEmbeddedStepForm.tsx`
- Componente que recebe `config.step_form_slug` e renderiza o StepForm inline
- Usa `useStepForm` internamente com o slug configurado
- Design clean: sem card wrapper extra, integrado visualmente com a landing page
- Renderiza: header do form, questions, form fields, tudo dentro da seção

### 3. Registrar no renderLandingSection

**Arquivo**: `src/components/landing/renderLandingSection.tsx`
- Adicionar case `'embedded_stepform'` que renderiza `LandingEmbeddedStepForm`

### 4. Registrar no landingSectionTypes

**Arquivo**: `src/components/landing/landingSectionTypes.ts`
- Adicionar default config para `embedded_stepform`

### 5. Atualizar template do divórcio

**Arquivo**: `src/data/divorcioLandingTemplate.ts`
- Substituir a seção `embedded_form` por `embedded_stepform` com `step_form_slug: 'divorcioform'`
- Adicionar `steps` ao template para que funcione como quiz (perguntas sobre tipo de divórcio, filhos, bens, urgência + form de contato no final)
- Refinar UX: remover seções redundantes, espaçamento mais clean

### 6. Criar StepForm "divorcioform" no template

**Arquivo**: `src/data/divorcioLandingTemplate.ts`
- Adicionar steps ao próprio template de divórcio (o form quiz fica embutido na mesma landing page)
- Steps: tipo de divórcio → filhos → bens → urgência → formulário de contato (nome, telefone)
- O `LandingEmbeddedStepForm` usa os `steps` do próprio form pai ao invés de carregar outro form

### Alternativa mais simples (recomendada)

Em vez de criar um slug separado, o `LandingEmbeddedStepForm` renderiza os `steps` que já existem no próprio `form` da landing page. O template de divórcio já tem `steps: []` — basta preenchê-los com as perguntas do quiz. O `LandingPageRenderer` já recebe o `form` completo, então pode passar os steps diretamente.

**Mudança no `LandingPageRenderer.tsx`**: passar o `form` completo para o `renderLandingSection`, que repassa ao `LandingEmbeddedStepForm`.

## Arquivos Alterados

| Arquivo | Mudança |
|---------|---------|
| `src/types/stepFormTypes.ts` | Adicionar `'embedded_stepform'` ao type union |
| `src/components/landing/LandingEmbeddedStepForm.tsx` | Novo componente — quiz inline na landing |
| `src/components/landing/renderLandingSection.tsx` | Registrar novo tipo + passar form completo |
| `src/components/landing/LandingPageRenderer.tsx` | Passar `form` nas options do render |
| `src/components/landing/landingSectionTypes.ts` | Default config para embedded_stepform |
| `src/data/divorcioLandingTemplate.ts` | Adicionar steps de quiz + trocar seção form |

## Steps do Quiz de Divórcio

1. **Tipo** (question): Consensual / Litigioso / Não sei
2. **Filhos** (question): Sim, menores / Sim, maiores / Não
3. **Bens** (question): Sim, imóveis e veículos / Sim, apenas contas / Não
4. **Urgência** (question): Urgente / Nas próximas semanas / Estou pesquisando
5. **Contato** (form): Nome, Telefone/WhatsApp (obrigatórios)

O form final dispara toda(!) a lógica de conversão do `useStepForm` — webhook, reply-agent, gtag, dataLayer, email, deduplicação.

