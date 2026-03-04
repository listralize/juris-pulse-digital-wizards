// reply-agent-sync — integração com Reply Agent CRM
// Per-form tags & flows via step_forms.centralize_config

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const BASE = 'https://ra-bcknd.com/v1'

const VALID_REPLY_SLUGS = new Set([
  'cpf', 'assunto', 'link_astrea', 'login_astrea', 'senha_astrea',
  'link_processo', 'login_inss', 'senha_inss', 'documentos', 'profissao',
  'estado_civil', 'data_reuniao', 'data_audiencia', 'link_reuniao',
  'cep', 'complemento', 'endereco', 'gov_login', 'gov_senha',
  'json', 'sugestao_reuniao', 'respostacliente',
])

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
  system_fields?: { primary_mobile?: string; primary_whatsapp?: string; primary_email?: string }
  custom_fields?: Record<string, unknown>
  mobile_contacts?: Array<{ type: string; full_mobile_number: string; is_primary: boolean }>
}

// ─── Utils ────────────────────────────────────────────────────────────────────

const splitName = (fullName: string) => {
  const parts = (fullName || 'Lead').trim().split(/\s+/)
  return { first_name: parts[0] || 'Lead', last_name: parts.slice(1).join(' ') || '' }
}

const normalizePhone = (raw: string): string => {
  if (!raw) return ''
  const digits = raw.replace(/\D/g, '')
  if (!digits) return ''
  if (digits.startsWith('55') && digits.length >= 12) return `+${digits}`
  if (digits.length >= 10) return `+55${digits}`
  return `+55${digits}`
}

// ─── Reply Agent API ──────────────────────────────────────────────────────────

const createContact = async (apiKey: string, payload: LeadPayload): Promise<ReplyContact> => {
  const { first_name, last_name } = splitName(payload.name)
  const body: Record<string, unknown> = {
    first_name, locale: 'pt-BR', opt_in_sms: true, opt_in_call: true, opt_in_email: true,
  }
  if (last_name) body.last_name = last_name
  if (payload.email) body.primary_email = payload.email.trim().toLowerCase()

  const rawPhone = payload.phone || payload.whatsapp || ''
  const rawWhatsapp = payload.whatsapp || payload.phone || ''
  if (rawPhone) body.primary_phone_number = normalizePhone(rawPhone)
  if (rawWhatsapp) body.primary_whatsapp_number = normalizePhone(rawWhatsapp)

  const customFields: Record<string, unknown> = {}
  if (payload.service) customFields['assunto'] = payload.service
  if (payload.message) customFields['complemento'] = payload.message

  if (payload.custom_fields) {
    for (const [key, value] of Object.entries(payload.custom_fields)) {
      if (VALID_REPLY_SLUGS.has(key) && value != null && value !== '') {
        customFields[key] = value
      }
    }
  }

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

  if (Object.keys(tracking).length > 0) customFields['json'] = JSON.stringify(tracking)
  if (Object.keys(customFields).length > 0) body.custom_fields = customFields

  console.log('[reply-agent-sync] → POST /contact', JSON.stringify({
    first_name: body.first_name, last_name: body.last_name,
    primary_phone_number: body.primary_phone_number, primary_whatsapp_number: body.primary_whatsapp_number,
    primary_email: body.primary_email, custom_fields_keys: Object.keys(customFields),
  }))

  const res = await fetch(`${BASE}/contact`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(body),
  })
  const text = await res.text()
  console.log(`[reply-agent-sync] ← POST /contact ${res.status}:`, text.substring(0, 600))
  if (!res.ok) throw new Error(`createContact ${res.status}: ${text}`)
  return JSON.parse(text) as ReplyContact
}

const applyTags = async (apiKey: string, contactId: number, tags: string[]): Promise<void> => {
  if (!tags.length) return
  const res = await fetch(`${BASE}/contacts/${contactId}/tags`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json', 'Accept': 'application/json' },
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
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  try {
    const apiKey = Deno.env.get('REPLYAGENT_API_KEY')
    if (!apiKey) {
      console.error('[reply-agent-sync] ❌ REPLYAGENT_API_KEY não configurada')
      return new Response(JSON.stringify({ error: 'REPLYAGENT_API_KEY não configurada' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const defaultFlowId = Deno.env.get('REPLY_AGENT_FLOW_ID') || ''
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const payload: LeadPayload = await req.json()

    console.log('[reply-agent-sync] Payload:', JSON.stringify({
      name: payload.name, phone: payload.phone, email: payload.email,
      form_slug: payload.form_slug, automation_id: payload.automation_id,
    }))

    if (!payload.name) {
      return new Response(JSON.stringify({ error: 'name é obrigatório' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    // ── 1. Create contact ─────────────────────────────────────────────────────
    let contact: ReplyContact
    try {
      contact = await createContact(apiKey, payload)
    } catch (err) {
      console.error('[reply-agent-sync] ❌ Falha ao criar contato:', err)
      return new Response(JSON.stringify({ error: 'Falha ao criar contato', detail: String(err) }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    // ── 2. Per-form tags (manual only) ────────────────────────────────────────
    let tags: string[] = []
    let formConfig: any = null

    if (payload.form_slug) {
      const { data: formRow } = await supabase
        .from('step_forms')
        .select('centralize_config')
        .eq('slug', payload.form_slug)
        .maybeSingle()

      if (formRow?.centralize_config) {
        formConfig = formRow.centralize_config
        if (Array.isArray(formConfig.tags)) {
          tags = [...formConfig.tags]
        }
      }
    }

    // Traffic source tag (always applied)
    tags.push(payload.gclid ? 'TRAFEGO_PAGO' : 'organico')

    try {
      await applyTags(apiKey, contact.id, tags)
      console.log(`[reply-agent-sync] ✅ Tags: ${tags.join(', ')}`)
    } catch (tagErr) {
      console.warn('[reply-agent-sync] ⚠️ applyTags falhou:', tagErr)
    }

    // ── 3. Save lead_profiles ─────────────────────────────────────────────────
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
      console.warn('[reply-agent-sync] ⚠️ lead_profiles falhou:', profileErr)
    }

    // ── 4. SmartFlow — per-form config first, then fallback ───────────────────
    let automationId = payload.automation_id || ''

    // If no automation_id from client, try per-form config
    if (!automationId && formConfig?.enabled) {
      const urgency = payload.urgency || 'default'
      if (urgency === 'urgente') automationId = formConfig.flow_id_urgente || formConfig.flow_id_default || ''
      else if (urgency === 'semanas') automationId = formConfig.flow_id_semanas || formConfig.flow_id_default || ''
      else if (urgency === 'pesquisando') automationId = formConfig.flow_id_pesquisando || formConfig.flow_id_default || ''
      else automationId = formConfig.flow_id_default || ''
    }

    // Final fallback to env var
    if (!automationId) automationId = defaultFlowId

    let flowTriggered = false
    if (automationId && !payload.skip_flow) {
      try {
        await sendFlow(apiKey, automationId, contact.id)
        flowTriggered = true
        console.log(`[reply-agent-sync] ✅ SmartFlow ${automationId} → contact ${contact.id}`)
      } catch (flowErr) {
        console.warn('[reply-agent-sync] ⚠️ SmartFlow falhou:', flowErr)
      }
    }

    return new Response(JSON.stringify({
      success: true,
      contact_id: contact.id,
      tags_applied: tags,
      flow_triggered: flowTriggered,
      automation_id: automationId || null,
    }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

  } catch (err) {
    console.error('[reply-agent-sync] ❌ Erro não tratado:', err)
    return new Response(JSON.stringify({ error: 'Erro interno', detail: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})
