

# Auditoria Completa do Sistema

## 1. SEGURANCA

### Problemas Criticos

**1.1 — `dangerouslySetInnerHTML` sem sanitizacao (XSS)**
- `BlogPost.tsx` renderiza `post.content` diretamente via `dangerouslySetInnerHTML` sem DOMPurify. Um admin que insira HTML malicioso ou um conteudo comprometido no banco pode executar scripts arbitrarios no navegador de qualquer visitante.
- `StepFormElements.tsx`, `PageBuilder.tsx`, `LinkTreePreview.tsx` — mesmo problema.
- **Correcao**: Instalar `dompurify` e sanitizar todo conteudo HTML antes de renderizar.

**1.2 — Edge Functions sem autenticacao (verify_jwt = false)**
- Todas as 9 edge functions estao com `verify_jwt = false`. Isso e aceitavel para `contact-form` e `webhook-receiver` (publicos), mas `upload-offline-conversions` e `reply-agent-sync` deveriam validar pelo menos um token ou secret para evitar abuso externo.
- **Correcao**: Adicionar validacao de API key ou JWT para funcoes sensiveis.

**1.3 — RLS Policies conflitantes em `admin_settings`**
- Existem 4 politicas, incluindo uma "Allow all operations" com `USING (true)` e `WITH CHECK (true)`. Isso efetivamente permite que qualquer usuario (ate anonimo) leia e modifique configuracoes do admin.
- Mesma situacao em `service_pages`, `service_benefits`, `service_faq`, `service_process_steps`, `service_testimonials`, `team_members`, `footer_info`, `site_settings`, `contact_info` — todas tem politicas "Admin write access" com `USING (true)` que sobrepoem as politicas restritivas.
- **Correcao**: Remover as politicas permissivas redundantes que usam `USING (true)`.

**1.4 — `edge_rate_limits` sem RLS**
- A tabela nao tem nenhuma politica RLS. Embora so seja usada pelas edge functions com service_role_key, o RLS deveria estar habilitado por padrao.

**1.5 — Dados sensiveis expostos no console**
- 1081 ocorrencias de `console.log/console.error` em 61 arquivos. Em producao, dados de leads (nome, email, telefone) sao potencialmente logados no console do browser.
- **Correcao**: Usar o `logger.ts` existente de forma consistente e desabilitar logs em producao.

---

## 2. BANCO DE DADOS

### Problemas Encontrados

**2.1 — Triggers declarados mas nao existem**
- As funcoes `update_lead_location()` e `update_step_form_lead_location()` existem, mas o schema mostra "There are no triggers in the database". Os triggers nunca foram criados ou foram removidos. O enriquecimento de DDD/estado so funciona via edge function, nao no insert direto.
- **Correcao**: Criar os triggers `BEFORE INSERT` em `form_leads` e `conversion_events`.

**2.2 — Tabela `lead_status` sem foreign key para leads**
- `lead_status.lead_id` nao referencia `conversion_events.id` nem `form_leads.id`. Isso pode gerar orfaos.
- **Correcao**: Adicionar FK com `ON DELETE CASCADE`.

**2.3 — Duplicidade de armazenamento de leads**
- Leads sao salvos em DUAS tabelas: `form_leads` E `conversion_events`. O `LeadsManagement` le apenas de `conversion_events`, ignorando leads que falharam la mas foram salvos em `form_leads`.
- **Correcao**: Unificar a fonte de leitura ou fazer merge no painel.

**2.4 — Deduplicacao fragil no useStepForm**
- Linhas 419-422: `isDuplicate` sempre retorna `true` se qualquer lead existe nos ultimos 2 min (logica quebrada). Depois faz uma segunda query para verificar email, mas e ineficiente.
- **Correcao**: Simplificar para uma unica query com filtro JSONB.

---

## 3. FUNCIONALIDADES INCOMPLETAS

**3.1 — StepForm Analytics (recente)**
- A tabela `step_form_events` foi criada e o tracking implementado, mas o componente `StepFormAnalytics.tsx` precisa ser verificado se esta de fato acessivel na UI do StepFormBuilder.

**3.2 — `useBlogData.ts` usa localStorage como fonte primaria**
- O hook carrega posts do `localStorage` antes do Supabase. Se o admin editar posts no Supabase, a versao local pode sobreescrever. E um vestígio de antes da integracao com Supabase.
- **Correcao**: Remover fallback para localStorage, usar apenas Supabase.

**3.3 — Testimonials ocultos no mobile**
- `Index.tsx` linha 124: `hidden md:block` — depoimentos nunca aparecem em mobile, que e a maioria do trafego.
- **Correcao**: Criar versao mobile do carrossel.

**3.4 — Formulario de contato nao tem rate limiting client-side**
- O rate limiting so existe na edge function. Um usuario pode clickar "Enviar" repetidamente antes de receber resposta.
- **Correcao**: Desabilitar botao apos primeiro click (ja feito no StepForm via `isSubmitting`, mas verificar `useContactForm`).

**3.5 — `useContactForm` nao valida telefone obrigatorio**
- Diferente do StepForm que forca telefone, o formulario de contato aceita telefone com apenas 8 digitos (linha 77) e nao impoe obrigatoriedade.

---

## 4. PERFORMANCE

**4.1 — LeadsManagement carrega TODOS os leads (paginacao infinita)**
- O `loadLeads()` faz loop ate trazer todos os registros de `conversion_events`, carregando tudo na memoria. Com milhares de leads, isso causa lentidao.
- **Correcao**: Implementar paginacao server-side real (carregar apenas a pagina atual).

**4.2 — Index.tsx manipula `body.style` diretamente**
- Overrida `overflow: hidden` no desktop, o que pode causar conflitos com modais e dropdowns. O cleanup no unmount e fragil.

**4.3 — GSAP warnings constantes**
- Console mostra "GSAP target null not found" repetidamente. Refs estao sendo usadas antes dos elementos montarem.
- **Correcao**: Garantir que GSAP so anime apos `ref.current` existir.

**4.4 — QueryClient sem `gcTime`**
- O `staleTime` e 5min mas o garbage collection time (antigo `cacheTime`) usa o default de 5min. Para dados que mudam pouco (categorias, paginas de servico), poderia ser maior.

---

## 5. UX / DESIGN

**5.1 — Login sem feedback de erro especifico**
- `Login.tsx`: mostra apenas "Credenciais invalidas" sem distinguir email nao encontrado vs senha errada. Tambem nao tem "Esqueci minha senha".

**5.2 — Admin sem redirect apos login**
- Se um usuario tenta acessar `/admin` sem estar logado, ve "Acesso Negado" com link para `/login`. Apos login, vai para `/admin` fixo — nao volta para a URL original.

**5.3 — Mobile navigation cortada**
- O `CompactMobileNavbar` carrega dados do admin (contato, logo) mas nao ha indicacao de como funciona a navegacao entre secoes no mobile.

---

## 6. INTEGRACOES

**6.1 — Reply Agent sync e fire-and-forget sem retentativa**
- Se a chamada `reply-agent-sync` falhar (timeout, API fora), o lead nao sera sincronizado e nao ha mecanismo de retry.
- **Correcao**: Usar uma tabela de fila (como `webhook_queue`) para sync com retry.

**6.2 — Email de boas-vindas duplicado**
- O `contact-form` edge function envia email E o `useStepForm` tambem envia email. Se o lead vier do StepForm e tambem disparar o contact-form, pode receber 2 emails.

---

## 7. PLANO DE ACAO PRIORIZADO

### Prioridade Alta (Seguranca)
1. Remover politicas RLS permissivas (`USING (true)`) de 10+ tabelas
2. Instalar DOMPurify e sanitizar todos os `dangerouslySetInnerHTML`
3. Adicionar validacao em edge functions sensiveis

### Prioridade Media (Dados / Integridade)
4. Criar triggers de enriquecimento DDD que estao faltando
5. Unificar leitura de leads (form_leads + conversion_events)
6. Corrigir deduplicacao quebrada no useStepForm (linhas 419-422)
7. Adicionar FK em `lead_status.lead_id`

### Prioridade Normal (Performance / UX)
8. Implementar paginacao server-side no LeadsManagement
9. Corrigir warnings GSAP (target null)
10. Mostrar testimonials no mobile
11. Remover localStorage fallback do blog
12. Adicionar "Esqueci senha" no login
13. Implementar retry queue para Reply Agent sync
14. Reduzir console.logs em producao

