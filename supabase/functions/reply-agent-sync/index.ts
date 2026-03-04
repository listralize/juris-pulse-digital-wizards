/**
 * reply-agent-sync
 * ─────────────────────────────────────────────────────────────────────────────
 * Edge Function responsável por sincronizar leads com o Reply Agent CRM.
 *
 * Fluxo:
 *  1. Recebe os dados do lead (nome, email, telefone, serviço, urgência, etc.)
 *  2. Cria (ou atualiza) o contato via POST /v1/contact
 *  3. Salva o replyagent_contact_id na tabela lead_profiles do Supabase
 *  4. Se um automation_id for fornecido, dispara o Smart Flow via POST /v1/send-a-flow
 *  5. Retorna o contato criado e o resultado do flow
 *
 * Configuração necessária (Supabase Secrets):
 *  - REPLY_AGENT_API_KEY  →  Bearer token da API do Reply Agent
 *  - REPLY_AGENT_FLOW_ID  →  ID do Smart Flow padrão a disparar (opcional)
 *
 * Pode ser chamada internamente pelas funções contact-form e process-webhook-queue.
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const REPLY_AGENT_BASE_URL = 'https://ra-bcknd.com/v1'

interface LeadPayload {
  // Dados do lead
  name: string
  email?: string
  phone?: string
  whatsapp?: string
  service?: string
  urgency?: string
  message?: string
  form_slug?: string
  form_name?: string
  lead_id?: string          // ID do lead na tabela form_leads ou step_form_leads
  gclid?: string            // Google Click ID — para Enhanced Conversions offline
  transaction_id?: string   // ID único de transação — para deduplicação no Google Ads
  custom_fields?: Record<string, string>
  // Controle
  automation_id?: string    // Override do REPLY_AGENT_FLOW_ID para este lead específico
  skip_flow?: boolean       // Se true, cria o contato mas não dispara o flow
}

interface ReplyAgentContact {
  id: number
  first_name: string
  last_name?: string
  primary_email?: string
  primary_phone_number?: string
  primary_whatsapp_number?: string
  [key: string]: unknown
}

/**
 * Splits a full name into first_name and last_name.
 * e.g. "João da Silva" → { first_name: "João", last_name: "da Silva" }
 */
const splitName = (fullName: string): { first_name: string; last_name: string } => {
  const parts = fullName.trim().split(/\s+/)
  const first_name = parts[0] || 'Lead'
  const last_name = parts.slice(1).join(' ') || ''
  return { first_name, last_name }
}

/**
 * Normalizes a Brazilian phone number to E.164 format (+55XXXXXXXXXXX).
 * Accepts formats: (62) 99459-4496, 62999118230, +5562999118230, etc.
 *
 * Regra: sempre retorna +55 + dígitos puros.
 * O número já deve vir com o 9 correto (ex: 62999118230 = DDD 62 + 9 dígitos).
 * Não adiciona nem remove dígitos — apenas garante o prefixo +55.
 */
const normalizePhone = (raw: string): string => {
  const digits = raw.replace(/\D/g, '')
  // Já tem o DDI 55
  if (digits.startsWith('55') && digits.length >= 12) return `+${digits}`
  // Sem DDI — adiciona +55
  if (digits.length >= 10) return `+55${digits}`
  return raw // retorna como está se não conseguir normalizar
}

/**
 * Creates a new contact in Reply Agent.
 * Returns the created contact object.
 */
const createContact = async (
  apiKey: string,
  payload: LeadPayload
): Promise<ReplyAgentContact> => {
  const { first_name, last_name } = splitName(payload.name)

  const body: Record<string, unknown> = {
    first_name,
    last_name: last_name || undefined,
    locale: 'pt-BR',
    opt_in_sms: true,
    opt_in_call: true,
    opt_in_email: true,
  }

  if (payload.email) body.primary_email = payload.email.trim().toLowerCase()

  const phoneNum = payload.phone ? normalizePhone(payload.phone) : null
  const whatsappNum = (payload.whatsapp || payload.phone) ? normalizePhone(payload.whatsapp || payload.phone!) : null

  if (phoneNum && whatsappNum && phoneNum === whatsappNum) {
    // Same number: send only as WhatsApp (API ignores whatsapp if phone has same value)
    body.primary_whatsapp_number = whatsappNum
  } else {
    if (phoneNum) body.primary_phone_number = phoneNum
    if (whatsappNum) body.primary_whatsapp_number = whatsappNum
  }

  if (payload.service) body.company_name = payload.service // use company_name as service label

  // Map custom fields if provided
  if (payload.custom_fields && Object.keys(payload.custom_fields).length > 0) {
    body.custom_fields = payload.custom_fields
  }

  console.log('[reply-agent-sync] → createContact body:', JSON.stringify(body))

  const res = await fetch(`${REPLY_AGENT_BASE_URL}/contact`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await res.json()
  console.log('[reply-agent-sync] ← createContact response:', JSON.stringify(data))

  if (!res.ok) {
    throw new Error(`Reply Agent createContact error ${res.status}: ${JSON.stringify(data)}`)
  }

  return data as ReplyAgentContact
}

/**
 * Triggers a Smart Flow for a given contact.
 */
const sendFlow = async (
  apiKey: string,
  automationId: string,
  contactId: number
): Promise<void> => {
  const formData = new FormData()
  formData.append('automation_id', automationId)
  formData.append('contact_id', String(contactId))

  const res = await fetch(`${REPLY_AGENT_BASE_URL}/send-a-flow`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
    body: formData,
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Reply Agent sendFlow error ${res.status}: ${text}`)
  }
}

/**
 * Applies a tag to a contact (best-effort, non-blocking).
 */
const applyTag = async (
  apiKey: string,
  contactId: number,
  tag: string
): Promise<void> => {
  const formData = new FormData()
  formData.append('contact_id', String(contactId))
  formData.append('tag', tag)

  await fetch(`${REPLY_AGENT_BASE_URL}/contact/apply-tag`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}` },
    body: formData,
  }).catch(() => {/* non-critical */})
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const apiKey = Deno.env.get('REPLYAGENT_API_KEY')
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'REPLYAGENT_API_KEY not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const defaultFlowId = Deno.env.get('REPLY_AGENT_FLOW_ID') || ''
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const payload: LeadPayload = await req.json()

    if (!payload.name) {
      return new Response(
        JSON.stringify({ error: 'name is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`[reply-agent-sync] Processing lead: ${payload.name} | ${payload.email || payload.phone}`)
    console.log('[reply-agent-sync] Payload received:', JSON.stringify(payload))

    // ─── 1. Create contact in Reply Agent ────────────────────────────────────
    let contact: ReplyAgentContact
    try {
      contact = await createContact(apiKey, payload)
      console.log(`[reply-agent-sync] ✅ Contact created: id=${contact.id}`)
    } catch (err) {
      console.error('[reply-agent-sync] ❌ Failed to create contact:', err)
      return new Response(
        JSON.stringify({ error: 'Failed to create contact in Reply Agent', detail: String(err) }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // ─── 2. Apply tags ──────────────────────────────────────────────────────────
    // Sempre aplica a tag do formulário
    if (payload.form_slug) {
      await applyTag(apiKey, contact.id, `form_${payload.form_slug}`)
    }
    // Tag de serviço
    if (payload.service) {
      await applyTag(apiKey, contact.id, `servico_${payload.service.toLowerCase().replace(/\s+/g, '_').substring(0, 50)}`)
    }
    // Tag de urgência (incluindo default)
    const urgencyTag = payload.urgency || 'default'
    await applyTag(apiKey, contact.id, `urgencia_${urgencyTag}`)
    // Tag de origem (tráfego pago vs orgânico)
    if (payload.gclid) {
      await applyTag(apiKey, contact.id, 'TRAFEGO_PAGO')
    } else {
      await applyTag(apiKey, contact.id, 'organico')
    }

    // ─── 3. Persist replyagent_contact_id in lead_profiles ───────────────────
    try {
      const { first_name, last_name } = splitName(payload.name)
      const profileData = {
        replyagent_contact_id: String(contact.id),
        first_name,
        last_name: last_name || null,
        email: payload.email?.trim().toLowerCase() || null,
        phone: payload.phone || null,
        whatsapp_number: payload.whatsapp || payload.phone || null,
        service_interest: payload.service || null,
        urgency_level: payload.urgency === 'urgente' ? 'urgent' : 'normal',
        lead_source: payload.form_slug || 'website',
        lead_status: 'novo',
        is_synced_with_replyagent: true,
        last_sync_at: new Date().toISOString(),
        notes: payload.message || null,
        // Enhanced Conversions: salvar gclid e transaction_id para upload offline
        gclid: payload.gclid || null,
        transaction_id: payload.transaction_id || null,
        custom_fields: {
          form_name: payload.form_name || '',
          lead_id: payload.lead_id || '',
          gclid: payload.gclid || '',
          transaction_id: payload.transaction_id || '',
        },
      }

      const { error: upsertError } = await supabase
        .from('lead_profiles')
        .upsert(profileData, { onConflict: 'replyagent_contact_id' })

      if (upsertError) {
        console.error('[reply-agent-sync] ⚠️ Failed to upsert lead_profile:', upsertError)
      } else {
        console.log('[reply-agent-sync] ✅ lead_profiles upserted')
      }
    } catch (profileErr) {
      console.error('[reply-agent-sync] ⚠️ lead_profiles upsert exception:', profileErr)
      // Non-blocking — continue even if profile save fails
    }

    // ─── 4. Trigger Smart Flow ────────────────────────────────────────────────
    const automationId = payload.automation_id || defaultFlowId
    let flowTriggered = false

    if (automationId && !payload.skip_flow) {
      try {
        await sendFlow(apiKey, automationId, contact.id)
        flowTriggered = true
        console.log(`[reply-agent-sync] ✅ Smart Flow ${automationId} triggered for contact ${contact.id}`)
      } catch (flowErr) {
        console.error('[reply-agent-sync] ⚠️ Smart Flow trigger failed (non-blocking):', flowErr)
        // Non-blocking — the contact was created successfully even if the flow fails
      }
    } else {
      console.log('[reply-agent-sync] ℹ️ No automation_id configured — skipping Smart Flow')
    }

    return new Response(
      JSON.stringify({
        success: true,
        contact_id: contact.id,
        flow_triggered: flowTriggered,
        automation_id: automationId || null,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (err) {
    console.error('[reply-agent-sync] ❌ Unhandled error:', err)
    return new Response(
      JSON.stringify({ error: 'Internal server error', detail: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
