// centralize-bulk-sync — sincronização em lote de leads com Reply Agent
// Sincroniza leads existentes no Supabase com a Reply Agent via WhatsApp
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const BASE = 'https://ra-bcknd.com/v1'

const normalizePhone = (raw) => {
  if (!raw) return ''
  const digits = raw.replace(/\D/g, '')
  if (!digits) return ''
  if (digits.startsWith('55') && digits.length >= 12) return `+${digits}`
  if (digits.length >= 10) return `+55${digits}`
  return `+55${digits}`
}

const replyHeaders = (apiKey) => ({
  'Authorization': `Bearer ${apiKey}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json',
})

const splitName = (fullName) => {
  const parts = (fullName || 'Lead').trim().split(/\s+/)
  return { first_name: parts[0] || 'Lead', last_name: parts.slice(1).join(' ') || '' }
}

const findContactByWhatsapp = async (apiKey, whatsapp) => {
  try {
    const res = await fetch(`${BASE}/fetch-contacts-by-whatsapp`, {
      method: 'POST',
      headers: replyHeaders(apiKey),
      body: JSON.stringify({ whatsapp_number: whatsapp }),
    })
    if (res.ok) {
      const data = await res.json()
      const contacts = data?.data || (Array.isArray(data) ? data : [])
      if (contacts.length > 0) return contacts[0]
    }
    const res2 = await fetch(`${BASE}/fetch-contacts-by-mobile-number`, {
      method: 'POST',
      headers: replyHeaders(apiKey),
      body: JSON.stringify({ mobile_number: whatsapp }),
    })
    if (res2.ok) {
      const data2 = await res2.json()
      const contacts2 = data2?.data || (Array.isArray(data2) ? data2 : [])
      if (contacts2.length > 0) return contacts2[0]
    }
    return null
  } catch { return null }
}

const createContact = async (apiKey, lead) => {
  const { first_name, last_name } = splitName(lead.name || `${lead.first_name || ''} ${lead.last_name || ''}`.trim())
  const body = { first_name, locale: 'pt-BR', opt_in_sms: true, opt_in_call: true, opt_in_email: true }
  if (last_name) body.last_name = last_name
  if (lead.email) body.primary_email = lead.email.trim().toLowerCase()
  const phone = normalizePhone(lead.whatsapp || lead.phone || '')
  if (phone) {
    body.primary_phone_number = phone
    body.primary_whatsapp_number = phone
  }
  const customFields = {}
  if (lead.service || lead.service_interest) customFields['assunto'] = lead.service || lead.service_interest
  if (lead.message || lead.notes) customFields['complemento'] = lead.message || lead.notes
  if (Object.keys(customFields).length) body.custom_fields = customFields
  const res = await fetch(`${BASE}/contact`, {
    method: 'POST',
    headers: replyHeaders(apiKey),
    body: JSON.stringify(body),
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`createContact ${res.status}: ${text}`)
  return JSON.parse(text)
}

const applyTags = async (apiKey, contactId, tags, existingTags = []) => {
  if (!tags.length) return
  const existingNorm = new Set(existingTags.map(t => t.toLowerCase().trim()))
  const toApply = tags.filter(t => t && !existingNorm.has(t.toLowerCase().trim()))
  if (!toApply.length) return
  await fetch(`${BASE}/contacts/${contactId}/tags`, {
    method: 'POST',
    headers: replyHeaders(apiKey),
    body: JSON.stringify({ tags: toApply }),
  })
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    const body = await req.json().catch(() => ({}))
    const { limit = 50, offset = 0, form_slug, dry_run = false } = body

    // Buscar config global — prioridade: banco > variável de ambiente
    const { data: mktSettings } = await supabase
      .from('marketing_settings')
      .select('reply_agent_api_key, centralize_api_key, reply_agent_enabled, centralize_enabled')
      .limit(1)
      .maybeSingle()

    const apiKey = mktSettings?.centralize_api_key || mktSettings?.reply_agent_api_key || Deno.env.get('REPLYAGENT_API_KEY') || Deno.env.get('REPLY_AGENT_API_KEY') || ''
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API Key não configurada' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    // Buscar leads não sincronizados
    let query = supabase
      .from('form_leads')
      .select('id, name, email, phone, whatsapp, service, message, form_slug, form_name, gclid, created_at, lead_data')
      .is('replyagent_contact_id', null)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (form_slug) query = query.eq('form_slug', form_slug)

    const { data: leads, error: leadsError } = await query
    if (leadsError) throw leadsError

    const results = { synced: 0, skipped: 0, errors: 0, details: [] }

    for (const lead of (leads || [])) {
      try {
        const rawWhatsapp = lead.whatsapp || lead.phone || lead.lead_data?.phone || ''
        const normalizedWhatsapp = rawWhatsapp ? normalizePhone(rawWhatsapp) : ''

        if (!normalizedWhatsapp && !lead.email && !lead.name) {
          results.skipped++
          results.details.push({ id: lead.id, status: 'skipped', reason: 'sem dados de contato' })
          continue
        }

        if (dry_run) {
          results.details.push({ id: lead.id, status: 'dry_run', whatsapp: normalizedWhatsapp })
          results.synced++
          continue
        }

        // Buscar ou criar contato na Reply Agent
        let contact = null
        let isNew = false

        if (normalizedWhatsapp) {
          contact = await findContactByWhatsapp(apiKey, normalizedWhatsapp)
        }

        if (!contact) {
          const leadForCreate = {
            name: lead.name || 'Lead',
            email: lead.email,
            phone: rawWhatsapp,
            whatsapp: rawWhatsapp,
            service: lead.service || lead.lead_data?.service,
            message: lead.message || lead.lead_data?.message,
          }
          contact = await createContact(apiKey, leadForCreate)
          isNew = true
        }

        // Aplicar tags
        const existingTags = Array.isArray(contact.tags)
          ? contact.tags.map(t => typeof t === 'string' ? t : (t?.name || '')).filter(Boolean)
          : []
        const tags = [lead.gclid ? 'TRAFEGO_PAGO' : 'organico', 'sincronizado']
        if (lead.form_slug) tags.push(`form_${lead.form_slug}`)
        await applyTags(apiKey, contact.id, tags, existingTags)

        // Atualizar lead com o ID do contato
        await supabase
          .from('form_leads')
          .update({ replyagent_contact_id: String(contact.id) })
          .eq('id', lead.id)

        results.synced++
        results.details.push({
          id: lead.id,
          status: isNew ? 'created' : 'matched',
          contact_id: contact.id,
          whatsapp: normalizedWhatsapp,
        })

        // Rate limit: aguardar 300ms entre requests
        await new Promise(resolve => setTimeout(resolve, 300))

      } catch (err) {
        results.errors++
        results.details.push({ id: lead.id, status: 'error', error: String(err) })
        console.error(`[centralize-bulk-sync] Erro no lead ${lead.id}:`, err)
      }
    }

    const total = (leads || []).length
    console.log(`[centralize-bulk-sync] Concluído: ${results.synced} sincronizados, ${results.skipped} ignorados, ${results.errors} erros de ${total} leads`)

    return new Response(JSON.stringify({
      success: true,
      total_processed: total,
      synced: results.synced,
      skipped: results.skipped,
      errors: results.errors,
      dry_run,
      details: results.details,
    }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

  } catch (err) {
    console.error('[centralize-bulk-sync] Erro:', err)
    return new Response(JSON.stringify({ error: 'Erro interno', detail: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})
