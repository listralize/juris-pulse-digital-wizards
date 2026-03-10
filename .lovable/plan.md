

# Página de Divórcio — Landing Page Completa de Alta Conversão

## Abordagem

Criar um arquivo de seed/template que insere uma landing page completa no banco `step_forms` com `page_type: 'landing_page'`, slug `divorcio`, usando todas as seções disponíveis no builder. A página será criada via um componente utilitário que o admin pode acionar, ou diretamente como um template pré-configurado no `StepFormBuilder`.

A alternativa mais prática: criar a landing page como um **template embutido** no código que é inserido no Supabase ao clicar "Criar" no admin. Isso garante que funcione sem depender de dados existentes no banco.

## Estrutura da Página (14 seções otimizadas para conversão)

```text
┌─────────────────────────────────────────┐
│ 1. BANNER MARQUEE (urgência)            │
│    "Divórcio Rápido • Sigilo Total •    │
│     Primeira Consulta Grátis"           │
├─────────────────────────────────────────┤
│ 2. HERO (layout: split)                 │
│    Headline: "Divórcio Rápido,          │
│    Seguro e Sem Complicações"           │
│    CTA principal + CTA WhatsApp         │
├─────────────────────────────────────────┤
│ 3. TRUST BADGES                         │
│    OAB • +500 Divórcios • Sigilo Total  │
│    Atendimento Online                   │
├─────────────────────────────────────────┤
│ 4. PROBLEMS GRID                        │
│    "Você está passando por isso?"        │
│    6 dores comuns de quem quer divorciar │
├─────────────────────────────────────────┤
│ 5. COMPARISON (cards)                   │
│    "Sem Advogado" vs "Com Nossa Equipe" │
├─────────────────────────────────────────┤
│ 6. PROCESS STEPS (horizontal)           │
│    1. Consulta → 2. Documentação →      │
│    3. Protocolo → 4. Resolução          │
├─────────────────────────────────────────┤
│ 7. BENEFITS (grid 3 cols)               │
│    6 benefícios com ícones              │
├─────────────────────────────────────────┤
│ 8. NUMBERS                              │
│    500+ divórcios, 98% satisfação,      │
│    30 dias média, 10+ anos exp          │
├─────────────────────────────────────────┤
│ 9. TESTIMONIALS (grid)                  │
│    4 depoimentos realistas              │
├─────────────────────────────────────────┤
│ 10. CTA BANNER (gradient)               │
│    "Não Sofra Mais — Resolva Agora"     │
├─────────────────────────────────────────┤
│ 11. FAQ (accordion)                     │
│    8 perguntas frequentes sobre divórcio│
│    (SEO: cada uma é um long-tail)       │
├─────────────────────────────────────────┤
│ 12. GUARANTEE                           │
│    "Compromisso de Resultado"           │
├─────────────────────────────────────────┤
│ 13. EMBEDDED FORM (card)                │
│    Nome, Telefone, Email, Tipo de       │
│    Divórcio (select), Mensagem          │
├─────────────────────────────────────────┤
│ 14. WHATSAPP CTA (banner)              │
│    Botão flutuante final                │
└─────────────────────────────────────────┘
```

## SEO Completo

- **meta_title**: "Advogado de Divórcio | Divórcio Rápido e Seguro | Consulta Grátis"
- **meta_description**: "Precisa de divórcio? Especialistas em divórcio consensual e litigioso. Atendimento online, sigilo total. Primeira consulta gratuita. Resolva em até 30 dias."
- **meta_keywords**: "advogado divórcio, divórcio rápido, divórcio consensual, divórcio litigioso, separação judicial, advogado família"
- **JSON-LD**: LegalService schema (já injetado pelo renderer)
- **FAQ schema**: As 8 perguntas do FAQ serão indexáveis como rich snippets

## Implementação

Criar um arquivo `src/data/divorcioLandingTemplate.ts` com o template completo da landing page (objeto `StepFormData`). Depois, adicionar um botão "Templates Prontos" no `StepFormBuilder` que permite criar a landing page com um clique.

### Arquivos

| Arquivo | Ação |
|---------|------|
| `src/data/divorcioLandingTemplate.ts` | **Novo** — template completo com 14 seções |
| `src/components/admin/StepFormBuilder.tsx` | Adicionar botão "Usar Template" no dialog de criação que carrega o template de divórcio |

### Template terá:
- `page_type: 'landing_page'`
- `slug: 'divorcio'`
- `webhook_url: ''` (admin configura depois)
- `styles`: cores escuras profissionais (#1a1a2e fundo, #c9a44a dourado como primary)
- `seo_config` completo com título, descrição, keywords
- `footer_config` com texto de direitos
- 14 seções com `display_order` sequencial, todas com `section_animate: true`
- Cada seção com textos reais e persuasivos de divórcio

