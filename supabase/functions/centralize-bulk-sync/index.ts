// centralize-bulk-sync — sincronização em lote de leads com a Reply Agent (Centralize)
// v2.0: estrutura correta da tabela form_leads (lead_data JSONB, form_id, replyagent_contact_id)
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const BASE = 'https://ra-bcknd.com/v1'

const replyHeaders = (apiKey: string) => ({
  'Authorization': `Bearer ${apiKey}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json',
})

const normalizePhone = (raw: string): string => {
  if (!raw) return ''
  const digits = raw.replace(/\D/g, '')
  if (!digits) return ''
  if (digits.startsWith('55') && digits.length >= 12) return `+${digits}`
  if (digits.length >= 10) return `+55${digits}`
  return `+55${digits}`
}

const splitName = (fullName: string) => {
  const parts = (fullName || 'Lead').trim().split(/\s+/)
  return { first_name: parts[0] || 'Lead', last_name: parts.slice(1).join(' ') || '' }
}

const findContactByWhatsapp = async (apiKey: string, whatsapp: string) => {
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
    // Fallback: buscar por mobile
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
  } catch (err) {
    console.warn('[bulk-sync] findContactByWhatsapp falhou:', err)
    return null
  }
}

const createContact = async (apiKey: string, lead: any) => {
  const { first_name, last_name } = splitName(lead.name)
  const body: any = {
    first_name,
    locale: 'pt-BR',
    opt_in_sms: true,
    opt_in_call: true,
    opt_in_email: true,
  }
  if (last_name) body.last_name = last_name
  if (lead.email) body.primary_email = lead.email.trim().toLowerCase()
  if (lead.phone) {
    body.primary_phone_number = normalizePhone(lead.phone)
    body.primary_whatsapp_number = normalizePhone(lead.phone)
  }
  const customFields: any = {}
  if (lead.service) customFields['assunto'] = lead.service
  if (lead.message) customFields['complemento'] = lead.message
  if (Object.keys(customFields).length > 0) body.custom_fields = customFields
  const res = await fetch(`${BASE}/contact`, {
    method: 'POST',
    headers: replyHeaders(apiKey),
    body: JSON.stringify(body),
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`createContact ${res.status}: ${text.substring(0, 200)}`)
  return JSON.parse(text)
}

const applyTags = async (apiKey: string, contactId: number, tags: string[], existingTags: string[] = []) => {
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

const sendFlow = async (apiKey: string, flowId: string, contactId: number) => {
  try {
    const fd = new FormData()
    fd.append('automation_id', flowId)
    fd.append('contact_id', String(contactId))
    const res = await fetch(`${BASE}/send-a-flow`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}` },
      body: fd,
    })
    const text = await res.text()
    console.log(`[bulk-sync] sendFlow ${res.status}:`, text.substring(0, 200))
    return res.ok
  } catch (err) {
    console.warn('[bulk-sync] sendFlow falhou:', err)
    return false
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    const body = await req.json().catch(() => ({}))
    const { limit = 50, offset = 0, form_id, dry_run = false, fire_flow = false } = body

    // Buscar API Key — prioridade: banco > variável de ambiente
    const { data: mktSettings } = await supabase
      .from('marketing_settings')
      .select('reply_agent_api_key, centralize_api_key, reply_agent_enabled, centralize_enabled')
      .limit(1)
      .maybeSingle()

    const apiKey = mktSettings?.centralize_api_key || mktSettings?.reply_agent_api_key
      || Deno.env.get('REPLYAGENT_API_KEY') || Deno.env.get('REPLY_AGENT_API_KEY') || ''

    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API Key não configurada no Centralize' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    // Buscar leads não sincronizados (sem replyagent_contact_id)
    let query = supabase
      .from('form_leads')
      .select('id, form_id, form_name, lead_data, gclid, utm_source, utm_medium, utm_campaign, status, created_at')
      .is('replyagent_contact_id', null)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (form_id) query = query.eq('form_id', form_id)

    const { data: leads, error: leadsError } = await query
    if (leadsError) throw leadsError

    // Buscar centralize_config dos formulários para disparar flows
    const formConfigs: Record<string, any> = {}
    if (fire_flow && !dry_run) {
      const { data: forms } = await supabase
        .from('step_forms')
        .select('slug, centralize_config')
        .not('centralize_config', 'is', null)
      for (const f of (forms || [])) {
        formConfigs[f.slug] = f.centralize_config
      }
    }

    const results = {
      synced: 0,
      skipped: 0,
      errors: 0,
      details: [] as any[],
    }

    for (const lead of (leads || [])) {
      try {
        // Extrair dados do lead_data JSONB
        const ld = lead.lead_data || {}
        const rawPhone = ld.phone || ld.whatsapp || ld.Telefone || ''
        const normalizedPhone = rawPhone ? normalizePhone(rawPhone) : ''
        const name = ld.name || ld.Nome || ld.nome || 'Lead'
        const email = ld.email || ld.Email || ''
        const service = ld.service || ld.servico || ''
        const message = ld.message || ld.mensagem || ld.complemento || ''

        if (!normalizedPhone && !email && !name) {
          results.skipped++
          results.details.push({ id: lead.id, status: 'skipped', reason: 'sem dados de contato' })
          continue
        }

        if (dry_run) {
          results.details.push({
            id: lead.id,
            status: 'dry_run',
            name,
            phone: normalizedPhone,
            form_id: lead.form_id,
          })
          results.synced++
          continue
        }

        // Upsert: buscar ou criar contato
        let contact: any = null
        let isNew = false

        if (normalizedPhone) {
          contact = await findContactByWhatsapp(apiKey, normalizedPhone)
        }

        if (!contact) {
          contact = await createContact(apiKey, { name, email, phone: rawPhone, service, message })
          isNew = true
        }

        const contactId = contact.id || contact.contact_id
        if (!contactId) throw new Error('Contato criado sem ID')

        // Aplicar tags
        const existingTags = Array.isArray(contact.tags)
          ? contact.tags.map((t: any) => typeof t === 'string' ? t : (t?.name || '')).filter(Boolean)
          : []

        const tags = [lead.gclid ? 'TRAFEGO_PAGO' : 'organico', 'sincronizado']
        if (lead.form_id) tags.push(`form_${lead.form_id}`)
        if (service) tags.push(`servico_${service.toLowerCase().replace(/\s+/g, '_').substring(0, 30)}`)

        await applyTags(apiKey, contactId, tags, existingTags)

        // Disparar flow se configurado
        let flowFired = false
        if (fire_flow && lead.form_id) {
          const formConfig = formConfigs[lead.form_id]
          if (formConfig?.enabled && formConfig?.flow_id_default) {
            flowFired = await sendFlow(apiKey, formConfig.flow_id_default, contactId)
          }
        }

        // Atualizar lead com o ID do contato e timestamp de sincronização
        await supabase
          .from('form_leads')
          .update({
            replyagent_contact_id: String(contactId),
            centralize_synced_at: new Date().toISOString(),
          })
          .eq('id', lead.id)

        results.synced++
        results.details.push({
          id: lead.id,
          status: isNew ? 'created' : 'matched',
          contact_id: contactId,
          phone: normalizedPhone,
          form_id: lead.form_id,
          flow_fired: flowFired,
        })

        // Rate limit: 300ms entre requests
        await new Promise(resolve => setTimeout(resolve, 300))

      } catch (err) {
        results.errors++
        results.details.push({ id: lead.id, status: 'error', error: String(err) })
        console.error(`[bulk-sync] Erro no lead ${lead.id}:`, err)
      }
    }

    const total = (leads || []).length
    console.log(`[bulk-sync] Concluído: ${results.synced} sincronizados, ${results.skipped} ignorados, ${results.errors} erros de ${total} leads`)

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
    console.error('[bulk-sync] Erro:', err)
    return new Response(JSON.stringify({ error: 'Erro interno', detail: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})
