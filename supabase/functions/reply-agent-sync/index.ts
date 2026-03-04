/**
 * reply-agent-sync
 * ─────────────────────────────────────────────────────────────────────────────
 * Edge Function responsável por sincronizar leads com o Reply Agent CRM.
 *
 * Fluxo:
 *  1. Recebe os dados do lead (nome, email, telefone, serviço, urgência, etc.)
 *  2. Cria o contato via POST /v1/contact (JSON body)
 *  3. Aplica tags via POST /v1/contacts/{id}/tags (JSON body)
 *  4. Se um automation_id for fornecido, dispara o Smart Flow via POST /v1/send-a-flow (FormData)
 *  5. Salva o replyagent_contact_id na tabela lead_profiles do Supabase
 *  6. Retorna o contato criado e o resultado do flow
 *
 * Configuração necessária (Supabase Secrets):
 *  - REPLYAGENT_API_KEY   →  Bearer token da API do Reply Agent
 *  - REPLY_AGENT_FLOW_ID  →  ID do Smart Flow padrão a disparar (opcional)
 *
 * API Docs: https://developers.replyagent.com/
 * Base URL: https://ra-bcknd.com/v1
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const BASE = 'https://ra-bcknd.com/v1'

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

interface ReplyAgentContact {
  id: number
  first_name: string
  last_name?: string
  primary_email?: string
  primary_phone_number?: string
  primary_whatsapp_number?: string
  [key: string]: unknown
}

/** Splits "João da Silva" → { first_name: "João", last_name: "da Silva" } */
const splitName = (fullName: string) => {
  const parts = fullName.trim().split(/\s+/)
  return {
    first_name: parts[0] || 'Lead',
    last_name: parts.slice(1).join(' ') || '',
  }
}

/**
 * Normalizes a Brazilian phone number to E.164 (+55XXXXXXXXXXX).
 * - Strips all non-digits
 * - If already starts with 55 and has ≥12 digits → prepend +
 * - Otherwise → prepend +55
 */
const normalizePhone = (raw: string): string => {
  const digits = raw.replace(/\D/g, '')
  if (!digits) return raw
  if (digits.startsWith('55') && digits.length >= 12) return `+${digits}`
  return `+55${digits}`
}

/** POST /v1/contact — Creates a contact. Returns the created contact. */
const createContact = async (
  apiKey: string,
  payload: LeadPayload
): Promise<ReplyAgentContact> => {
  const { first_name, last_name } = splitName(payload.name)

  const body: Record<string, unknown> = {
    first_name,
    locale: 'pt-BR',
    opt_in_sms: true,
    opt_in_call: true,
    opt_in_email: true,
  }

  if (last_name) body.last_name = last_name

  // Email
  if (payload.email) {
    body.primary_email = payload.email.trim().toLowerCase()
  }

  // Phone & WhatsApp
  // Brazilian leads: phone IS whatsapp in most cases.
  // We always send as primary_whatsapp_number (required for SmartFlow).
  // Also send as primary_phone_number for CRM display.
  const rawPhone = payload.phone || payload.whatsapp || ''
  const rawWhatsapp = payload.whatsapp || payload.phone || ''

  if (rawPhone) {
    body.primary_phone_number = normalizePhone(rawPhone)
  }
  if (rawWhatsapp) {
    body.primary_whatsapp_number = normalizePhone(rawWhatsapp)
  }

  // Custom fields
  if (payload.custom_fields && Object.keys(payload.custom_fields).length > 0) {
    body.custom_fields = payload.custom_fields
  }

  console.log('[reply-agent-sync] → POST /contact body:', JSON.stringify(body))

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
  console.log(`[reply-agent-sync] ← POST /contact ${res.status}:`, text)

  if (!res.ok) {
    throw new Error(`createContact ${res.status}: ${text}`)
  }

  return JSON.parse(text) as ReplyAgentContact
}

/**
 * POST /v1/contacts/{id}/tags — Applies multiple tags at once.
 * Body: JSON { "tags": ["tag a", "tag b"] }
 */
const applyTags = async (
  apiKey: string,
  contactId: number,
  tags: string[]
): Promise<void> => {
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
  console.log(`[reply-agent-sync] ← POST /contacts/${contactId}/tags ${res.status}:`, text)

  if (!res.ok) {
    console.warn(`[reply-agent-sync] ⚠️ applyTags failed ${res.status}: ${text}`)
  }
}

/**
 * POST /v1/send-a-flow — Triggers a Smart Flow.
 * Body: FormData { automation_id, contact_id }
 */
const sendFlow = async (
  apiKey: string,
  automationId: string,
  contactId: number
): Promise<void> => {
  const formData = new FormData()
  formData.append('automation_id', automationId)
  formData.append('contact_id', String(contactId))

  console.log(`[reply-agent-sync] → POST /send-a-flow automation_id=${automationId} contact_id=${contactId}`)

  const res = await fetch(`${BASE}/send-a-flow`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
    body: formData,
  })

  const text = await res.text()
  console.log(`[reply-agent-sync] ← POST /send-a-flow ${res.status}:`, text)

  if (!res.ok) {
    throw new Error(`sendFlow ${res.status}: ${text}`)
  }
}

// ─── Main Handler ─────────────────────────────────────────────────────────────

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const apiKey = Deno.env.get('REPLYAGENT_API_KEY')
    if (!apiKey) {
      console.error('[reply-agent-sync] ❌ REPLYAGENT_API_KEY not configured')
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
    console.log('[reply-agent-sync] Payload received:', JSON.stringify(payload))

    if (!payload.name) {
      return new Response(
        JSON.stringify({ error: 'name is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // ─── 1. Create contact ────────────────────────────────────────────────────
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

    // ─── 2. Apply tags ────────────────────────────────────────────────────────
    const tags: string[] = []

    // Tag do formulário
    if (payload.form_slug) tags.push(`form_${payload.form_slug}`)

    // Tag de urgência
    const urgencyTag = payload.urgency || 'default'
    tags.push(`urgencia_${urgencyTag}`)

    // Tag de origem (tráfego pago vs orgânico)
    if (payload.gclid) {
      tags.push('TRAFEGO_PAGO')
    } else {
      tags.push('organico')
    }

    // Tag de serviço
    if (payload.service) {
      tags.push(`servico_${payload.service.toLowerCase().replace(/\s+/g, '_').substring(0, 50)}`)
    }

    try {
      await applyTags(apiKey, contact.id, tags)
      console.log(`[reply-agent-sync] ✅ Tags applied: ${tags.join(', ')}`)
    } catch (tagErr) {
      console.warn('[reply-agent-sync] ⚠️ applyTags exception (non-blocking):', tagErr)
    }

    // ─── 3. Persist in lead_profiles ─────────────────────────────────────────
    try {
      const { first_name, last_name } = splitName(payload.name)
      await supabase.from('lead_profiles').upsert({
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
        gclid: payload.gclid || null,
        transaction_id: payload.transaction_id || null,
        custom_fields: {
          form_name: payload.form_name || '',
          lead_id: payload.lead_id || '',
          gclid: payload.gclid || '',
          transaction_id: payload.transaction_id || '',
        },
      }, { onConflict: 'replyagent_contact_id' })

      console.log('[reply-agent-sync] ✅ lead_profiles upserted')
    } catch (profileErr) {
      console.warn('[reply-agent-sync] ⚠️ lead_profiles upsert exception (non-blocking):', profileErr)
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
        console.warn('[reply-agent-sync] ⚠️ Smart Flow trigger failed (non-blocking):', flowErr)
      }
    } else {
      console.log('[reply-agent-sync] ℹ️ No automation_id — skipping Smart Flow')
    }

    return new Response(
      JSON.stringify({
        success: true,
        contact_id: contact.id,
        tags_applied: tags,
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
