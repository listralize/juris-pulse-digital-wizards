// reply-agent-sync — integração completa e robusta com a Reply Agent CRM
// Testado e validado contra a API real em 2026-03-04
//
// Comportamentos confirmados via testes:
//   ✅ primary_whatsapp_number aceita número IGUAL ao primary_phone_number
//   ✅ custom_fields inline no POST usa slugs: assunto, complemento, cpf, etc.
//   ✅ campo json (tipo JSON) recebe dados de rastreamento (UTMs, gclid, etc.)
//   ✅ POST /contacts/{id}/tags aplica múltiplas tags de uma vez
//   ✅ POST /send-a-flow dispara SmartFlow via FormData

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const BASE = 'https://ra-bcknd.com/v1'

// Slugs de custom fields válidos na Reply Agent (obtidos via GET /custom-fields)
const VALID_REPLY_SLUGS = new Set([
  'cpf', 'assunto', 'link_astrea', 'login_astrea', 'senha_astrea',
  'link_processo', 'login_inss', 'senha_inss', 'documentos', 'profissao',
  'estado_civil', 'data_reuniao', 'data_audiencia', 'link_reuniao',
  'cep', 'complemento', 'endereco', 'gov_login', 'gov_senha',
  'json', 'sugestao_reuniao', 'respostacliente',
])

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface LeadPayload {
  name: string
  email?: string
  phone?: string
  whatsapp?: string
  service?: string
  urgency?: string
  message?: string
  form_slug?: string
  form_name?: string
  lead_id?: string
  gclid?: string
  transaction_id?: string
  custom_fields?: Record<string, string>
  automation_id?: string
  skip_flow?: boolean
}

interface ReplyContact {
  id: number
  first_name: string
  last_name?: string
  system_fields?: {
    primary_mobile?: string
    primary_whatsapp?: string
    primary_email?: string
  }
  custom_fields?: Record<string, unknown>
  mobile_contacts?: Array<{
    type: string
    full_mobile_number: string
    is_primary: boolean
  }>
}

// ─── Utilitários ──────────────────────────────────────────────────────────────

const splitName = (fullName: string) => {
  const parts = (fullName || 'Lead').trim().split(/\s+/)
  return {
    first_name: parts[0] || 'Lead',
    last_name: parts.slice(1).join(' ') || '',
  }
}

const normalizePhone = (raw: string): string => {
  if (!raw) return ''
  const digits = raw.replace(/\D/g, '')
  if (!digits) return ''
  if (digits.startsWith('55') && digits.length >= 12) return `+${digits}`
  if (digits.length >= 10) return `+55${digits}`
  return `+55${digits}`
}

const toTagSlug = (s: string): string =>
  s.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '')
    .substring(0, 50)

// ─── Reply Agent API ──────────────────────────────────────────────────────────

const createContact = async (apiKey: string, payload: LeadPayload): Promise<ReplyContact> => {
  const { first_name, last_name } = splitName(payload.name)

  const body: Record<string, unknown> = {
    first_name,
    locale: 'pt-BR',
    opt_in_sms: true,
    opt_in_call: true,
    opt_in_email: true,
  }

  if (last_name) body.last_name = last_name
  if (payload.email) body.primary_email = payload.email.trim().toLowerCase()

  // Telefone e WhatsApp — a API aceita número igual nos dois campos ✅
  const rawPhone = payload.phone || payload.whatsapp || ''
  const rawWhatsapp = payload.whatsapp || payload.phone || ''

  if (rawPhone) body.primary_phone_number = normalizePhone(rawPhone)
  if (rawWhatsapp) body.primary_whatsapp_number = normalizePhone(rawWhatsapp)

  // ── Construção dos custom fields ──────────────────────────────────────────
  const customFields: Record<string, unknown> = {}

  // Mapeamento semântico: campos do payload → slugs da Reply Agent
  if (payload.service) customFields['assunto'] = payload.service
  if (payload.message) customFields['complemento'] = payload.message

  // Campos explícitos do formulário que sejam slugs válidos
  if (payload.custom_fields) {
    for (const [key, value] of Object.entries(payload.custom_fields)) {
      if (VALID_REPLY_SLUGS.has(key) && value != null && value !== '') {
        customFields[key] = value
      }
    }
  }

  // Dados de rastreamento consolidados no campo json (tipo JSON)
  const tracking: Record<string, string> = {}
  const UTM_FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
                      'pagina_origem', 'referrer', 'lead_id', 'formulario']
  if (payload.custom_fields) {
    for (const f of UTM_FIELDS) {
      if (payload.custom_fields[f]) tracking[f] = payload.custom_fields[f]
    }
  }
  if (payload.gclid) tracking['gclid'] = payload.gclid
  if (payload.transaction_id) tracking['transaction_id'] = payload.transaction_id
  if (payload.form_slug) tracking['form_slug'] = payload.form_slug
  if (payload.form_name) tracking['form_name'] = payload.form_name
  if (payload.lead_id) tracking['lead_id'] = payload.lead_id

  if (Object.keys(tracking).length > 0) {
    customFields['json'] = JSON.stringify(tracking)
  }

  if (Object.keys(customFields).length > 0) {
    body.custom_fields = customFields
  }

  console.log('[reply-agent-sync] → POST /contact', JSON.stringify({
    first_name: body.first_name,
    last_name: body.last_name,
    primary_phone_number: body.primary_phone_number,
    primary_whatsapp_number: body.primary_whatsapp_number,
    primary_email: body.primary_email,
    custom_fields_keys: Object.keys(customFields),
  }))

  const res = await fetch(`${BASE}/contact`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const text = await res.text()
  console.log(`[reply-agent-sync] ← POST /contact ${res.status}:`, text.substring(0, 600))

  if (!res.ok) throw new Error(`createContact ${res.status}: ${text}`)

  const contact = JSON.parse(text) as ReplyContact

  const whatsappOk = !!(
    contact.system_fields?.primary_whatsapp ||
    contact.mobile_contacts?.some(m => m.type === 'whatsapp')
  )

  console.log(`[reply-agent-sync] ✅ Contact id=${contact.id} | whatsapp=${whatsappOk ? '✅' : '❌'} | custom_fields=${JSON.stringify(contact.custom_fields)}`)

  return contact
}

const applyTags = async (apiKey: string, contactId: number, tags: string[]): Promise<void> => {
  if (!tags.length) return

  const res = await fetch(`${BASE}/contacts/${contactId}/tags`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ tags }),
  })

  const text = await res.text()
  console.log(`[reply-agent-sync] ← POST /contacts/${contactId}/tags ${res.status}:`, text.substring(0, 300))

  if (!res.ok) console.warn(`[reply-agent-sync] ⚠️ applyTags ${res.status}: ${text}`)
}

const sendFlow = async (apiKey: string, automationId: string, contactId: number): Promise<void> => {
  const fd = new FormData()
  fd.append('automation_id', automationId)
  fd.append('contact_id', String(contactId))

  console.log(`[reply-agent-sync] → POST /send-a-flow automation_id=${automationId} contact_id=${contactId}`)

  const res = await fetch(`${BASE}/send-a-flow`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}` },
    body: fd,
  })

  const text = await res.text()
  console.log(`[reply-agent-sync] ← POST /send-a-flow ${res.status}:`, text.substring(0, 300))

  if (!res.ok) throw new Error(`sendFlow ${res.status}: ${text}`)
}

// ─── Handler ──────────────────────────────────────────────────────────────────

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const apiKey = Deno.env.get('REPLYAGENT_API_KEY')
    if (!apiKey) {
      console.error('[reply-agent-sync] ❌ REPLYAGENT_API_KEY não configurada')
      return new Response(
        JSON.stringify({ error: 'REPLYAGENT_API_KEY não configurada' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const defaultFlowId = Deno.env.get('REPLY_AGENT_FLOW_ID') || ''
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const payload: LeadPayload = await req.json()

    console.log('[reply-agent-sync] Payload:', JSON.stringify({
      name: payload.name,
      phone: payload.phone,
      whatsapp: payload.whatsapp,
      email: payload.email,
      service: payload.service,
      urgency: payload.urgency,
      form_slug: payload.form_slug,
      gclid: payload.gclid,
      automation_id: payload.automation_id,
      custom_fields_keys: payload.custom_fields ? Object.keys(payload.custom_fields) : [],
    }))

    if (!payload.name) {
      return new Response(
        JSON.stringify({ error: 'name é obrigatório' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // ── 1. Criar contato ──────────────────────────────────────────────────────
    let contact: ReplyContact
    try {
      contact = await createContact(apiKey, payload)
    } catch (err) {
      console.error('[reply-agent-sync] ❌ Falha ao criar contato:', err)
      return new Response(
        JSON.stringify({ error: 'Falha ao criar contato', detail: String(err) }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // ── 2. Tags ───────────────────────────────────────────────────────────────
    const tags: string[] = []
    if (payload.form_slug) tags.push(`form${payload.form_slug}`)
    tags.push(`urgencia${payload.urgency || 'default'}`)
    tags.push(payload.gclid ? 'TRAFEGO_PAGO' : 'organico')
    if (payload.service) tags.push(`servico_${toTagSlug(payload.service)}`)
    if (payload.form_name) tags.push(`formname_${toTagSlug(payload.form_name)}`)

    try {
      await applyTags(apiKey, contact.id, tags)
      console.log(`[reply-agent-sync] ✅ Tags: ${tags.join(', ')}`)
    } catch (tagErr) {
      console.warn('[reply-agent-sync] ⚠️ applyTags falhou (não-bloqueante):', tagErr)
    }

    // ── 3. Salvar lead_profiles no Supabase ───────────────────────────────────
    try {
      const { first_name, last_name } = splitName(payload.name)
      const rawPhone = payload.phone || payload.whatsapp || ''
      const rawWhatsapp = payload.whatsapp || payload.phone || ''

      await supabase.from('lead_profiles').upsert({
        replyagent_contact_id: String(contact.id),
        first_name,
        last_name: last_name || null,
        email: payload.email?.trim().toLowerCase() || null,
        phone: rawPhone ? normalizePhone(rawPhone) : null,
        whatsapp_number: rawWhatsapp ? normalizePhone(rawWhatsapp) : null,
        service_interest: payload.service || null,
        urgency_level: payload.urgency === 'urgente' ? 'urgent' : 'normal',
        lead_source: payload.form_slug || 'website',
        lead_status: 'novo',
        is_synced_with_replyagent: true,
        last_sync_at: new Date().toISOString(),
        notes: payload.message || null,
        gclid: payload.gclid || null,
        transaction_id: payload.transaction_id || null,
        custom_fields: {
          ...(payload.custom_fields || {}),
          form_name: payload.form_name || '',
          lead_id: payload.lead_id || '',
        },
      }, { onConflict: 'replyagent_contact_id' })

      console.log('[reply-agent-sync] ✅ lead_profiles salvo')
    } catch (profileErr) {
      console.warn('[reply-agent-sync] ⚠️ lead_profiles falhou (não-bloqueante):', profileErr)
    }

    // ── 4. SmartFlow ──────────────────────────────────────────────────────────
    const automationId = payload.automation_id || defaultFlowId
    let flowTriggered = false

    if (automationId && !payload.skip_flow) {
      try {
        await sendFlow(apiKey, automationId, contact.id)
        flowTriggered = true
        console.log(`[reply-agent-sync] ✅ SmartFlow ${automationId} → contact ${contact.id}`)
      } catch (flowErr) {
        console.warn('[reply-agent-sync] ⚠️ SmartFlow falhou (não-bloqueante):', flowErr)
      }
    } else {
      console.log('[reply-agent-sync] ℹ️ SmartFlow ignorado (sem automation_id ou skip_flow=true)')
    }

    // ── Resposta ──────────────────────────────────────────────────────────────
    const whatsappOk = !!(
      contact.system_fields?.primary_whatsapp ||
      contact.mobile_contacts?.some(m => m.type === 'whatsapp')
    )

    return new Response(
      JSON.stringify({
        success: true,
        contact_id: contact.id,
        whatsapp_populated: whatsappOk,
        tags_applied: tags,
        flow_triggered: flowTriggered,
        automation_id: automationId || null,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (err) {
    console.error('[reply-agent-sync] ❌ Erro não tratado:', err)
    return new Response(
      JSON.stringify({ error: 'Erro interno', detail: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
