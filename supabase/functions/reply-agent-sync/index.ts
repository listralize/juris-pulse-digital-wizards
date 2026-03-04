// reply-agent-sync — integração com Reply Agent CRM
// v4.0: Flow Mappings por resposta, remoção de tags obsoletas, sincronização robusta
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

const splitName = (fullName) => {
  const parts = (fullName || 'Lead').trim().split(/\s+/)
  return { first_name: parts[0] || 'Lead', last_name: parts.slice(1).join(' ') || '' }
}

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
      if (contacts.length > 0) {
        console.log(`[reply-agent-sync] Encontrado por WhatsApp: ID ${contacts[0].id}`)
        return contacts[0]
      }
    }
    const res2 = await fetch(`${BASE}/fetch-contacts-by-mobile-number`, {
      method: 'POST',
      headers: replyHeaders(apiKey),
      body: JSON.stringify({ mobile_number: whatsapp }),
    })
    if (res2.ok) {
      const data2 = await res2.json()
      const contacts2 = data2?.data || (Array.isArray(data2) ? data2 : [])
      if (contacts2.length > 0) {
        console.log(`[reply-agent-sync] Encontrado por mobile: ID ${contacts2[0].id}`)
        return contacts2[0]
      }
    }
    return null
  } catch (err) {
    console.warn('[reply-agent-sync] findContactByWhatsapp falhou:', err)
    return null
  }
}

const buildCustomFields = (payload) => {
  const fields = {}
  if (payload.service) fields['assunto'] = payload.service
  if (payload.message) fields['complemento'] = payload.message
  if (payload.custom_fields) {
    for (const [key, value] of Object.entries(payload.custom_fields)) {
      if (VALID_REPLY_SLUGS.has(key) && value != null && value !== '') {
        fields[key] = value
      }
    }
  }
  const tracking = {}
  const UTM_FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'pagina_origem', 'referrer', 'formulario']
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
  if (Object.keys(tracking).length > 0) fields['json'] = JSON.stringify(tracking)
  return fields
}

const createContact = async (apiKey, payload) => {
  const { first_name, last_name } = splitName(payload.name)
  const body = { first_name, locale: 'pt-BR', opt_in_sms: true, opt_in_call: true, opt_in_email: true }
  if (last_name) body.last_name = last_name
  if (payload.email) body.primary_email = payload.email.trim().toLowerCase()
  const rawPhone = payload.phone || payload.whatsapp || ''
  const rawWhatsapp = payload.whatsapp || payload.phone || ''
  if (rawPhone) body.primary_phone_number = normalizePhone(rawPhone)
  if (rawWhatsapp) body.primary_whatsapp_number = normalizePhone(rawWhatsapp)
  body.custom_fields = buildCustomFields(payload)
  const res = await fetch(`${BASE}/contact`, {
    method: 'POST',
    headers: replyHeaders(apiKey),
    body: JSON.stringify(body),
  })
  const text = await res.text()
  console.log(`[reply-agent-sync] POST /contact ${res.status}:`, text.substring(0, 400))
  if (!res.ok) throw new Error(`createContact ${res.status}: ${text}`)
  return JSON.parse(text)
}

const updateContactFields = async (apiKey, contactId, payload) => {
  const fields = buildCustomFields(payload)
  for (const [slug, value] of Object.entries(fields)) {
    try {
      const res = await fetch(`${BASE}/contacts/${contactId}/set-custom-field`, {
        method: 'PUT',
        headers: replyHeaders(apiKey),
        body: JSON.stringify({ system_name: slug, field_value: String(value) }),
      })
      if (!res.ok) {
        const text = await res.text()
        console.warn(`[reply-agent-sync] set-custom-field [${slug}] ${res.status}: ${text.substring(0, 100)}`)
      }
    } catch (err) {
      console.warn(`[reply-agent-sync] set-custom-field [${slug}] falhou:`, err)
    }
  }
}

const applyTags = async (apiKey, contactId, newTags, existingTags = []) => {
  if (!newTags.length) return
  const existingNorm = new Set(existingTags.map(t => t.toLowerCase().trim()))
  const tagsToApply = newTags.filter(t => t && !existingNorm.has(t.toLowerCase().trim()))
  if (!tagsToApply.length) return
  const res = await fetch(`${BASE}/contacts/${contactId}/tags`, {
    method: 'POST',
    headers: replyHeaders(apiKey),
    body: JSON.stringify({ tags: tagsToApply }),
  })
  const text = await res.text()
  console.log(`[reply-agent-sync] POST /contacts/${contactId}/tags ${res.status}:`, text.substring(0, 200))
  if (!res.ok) console.warn(`[reply-agent-sync] applyTags ${res.status}: ${text}`)
}

const removeTags = async (apiKey, contactId, tagsToRemove, existingTags = []) => {
  if (!tagsToRemove.length) return
  const existingNorm = new Set(existingTags.map(t => t.toLowerCase().trim()))
  const tagsPresent = tagsToRemove.filter(t => t && existingNorm.has(t.toLowerCase().trim()))
  if (!tagsPresent.length) return
  console.log(`[reply-agent-sync] Removendo tags obsoletas: ${tagsPresent.join(', ')}`)
  for (const tag of tagsPresent) {
    try {
      const res = await fetch(`${BASE}/contacts/${contactId}/tags/${encodeURIComponent(tag)}`, {
        method: 'DELETE',
        headers: replyHeaders(apiKey),
      })
      if (!res.ok) {
        const text = await res.text()
        console.warn(`[reply-agent-sync] removeTag [${tag}] ${res.status}: ${text.substring(0, 100)}`)
      } else {
        console.log(`[reply-agent-sync] Tag removida: ${tag}`)
      }
    } catch (err) {
      console.warn(`[reply-agent-sync] removeTag [${tag}] falhou:`, err)
    }
  }
}

const sendFlow = async (apiKey, automationId, contactId) => {
  const fd = new FormData()
  fd.append('automation_id', automationId)
  fd.append('contact_id', String(contactId))
  const res = await fetch(`${BASE}/send-a-flow`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}` },
    body: fd,
  })
  const text = await res.text()
  console.log(`[reply-agent-sync] POST /send-a-flow ${res.status}:`, text.substring(0, 300))
  if (!res.ok) throw new Error(`sendFlow ${res.status}: ${text}`)
}

/**
 * Resolve o flow_id baseado em:
 * 1. automation_id explícito no payload
 * 2. flow_mappings: verifica se alguma resposta bate com um mapeamento
 * 3. Urgência legacy (urgente/semanas/pesquisando/default)
 * 4. Flow padrão global
 */
const resolveFlowId = (payload, formConfig, defaultFlowId) => {
  if (payload.automation_id) return payload.automation_id
  if (formConfig?.enabled) {
    // Flow Mappings por resposta (v4)
    if (formConfig.flow_mappings?.length && payload.answers) {
      for (const mapping of formConfig.flow_mappings) {
        if (!mapping.answer_contains || !mapping.flow_id) continue
        const needle = mapping.answer_contains.toLowerCase().trim()
        for (const [stepTitle, answer] of Object.entries(payload.answers)) {
          if (mapping.step_title && !stepTitle.toLowerCase().includes(mapping.step_title.toLowerCase())) continue
          const answerStr = String(answer || '').toLowerCase()
          if (answerStr.includes(needle)) {
            console.log(`[reply-agent-sync] Flow mapping: "${needle}" -> ${mapping.flow_id}`)
            return mapping.flow_id
          }
        }
      }
    }
    // Urgência legacy
    const urgency = payload.urgency || 'default'
    if (urgency === 'urgente' && formConfig.flow_id_urgente) return formConfig.flow_id_urgente
    if (urgency === 'semanas' && formConfig.flow_id_semanas) return formConfig.flow_id_semanas
    if (urgency === 'pesquisando' && formConfig.flow_id_pesquisando) return formConfig.flow_id_pesquisando
    if (formConfig.flow_id_default) return formConfig.flow_id_default
  }
  return defaultFlowId
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    const payload = await req.json()
    console.log('[reply-agent-sync] Payload:', JSON.stringify({
      name: payload.name, phone: payload.phone, whatsapp: payload.whatsapp,
      form_slug: payload.form_slug, urgency: payload.urgency, service: payload.service,
      answers_keys: payload.answers ? Object.keys(payload.answers) : [],
    }))

    if (!payload.name) {
      return new Response(JSON.stringify({ error: 'Campo name é obrigatório' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    // Buscar config global — prioridade: banco > variável de ambiente
    const { data: mktSettings } = await supabase
      .from('marketing_settings')
      .select('reply_agent_api_key, centralize_api_key, reply_agent_flow_id, centralize_flow_id_default, reply_agent_enabled, centralize_enabled')
      .limit(1)
      .maybeSingle()

    const apiKey = mktSettings?.centralize_api_key || mktSettings?.reply_agent_api_key || Deno.env.get('REPLYAGENT_API_KEY') || Deno.env.get('REPLY_AGENT_API_KEY') || ''
    const defaultFlowId = mktSettings?.centralize_flow_id_default || mktSettings?.reply_agent_flow_id || ''

    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API Key não configurada no Centralize' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    // Buscar config do formulário
    let formConfig = null
    if (payload.form_slug) {
      const { data: formRow } = await supabase
        .from('step_forms')
        .select('centralize_config')
        .eq('slug', payload.form_slug)
        .maybeSingle()
      if (formRow?.centralize_config) {
        formConfig = formRow.centralize_config
      }
    }

    // Normalizar WhatsApp
    const rawWhatsapp = payload.whatsapp || payload.phone || ''
    const normalizedWhatsapp = rawWhatsapp ? normalizePhone(rawWhatsapp) : ''

    // Upsert: buscar ou criar contato
    let contact = null
    let isNewContact = false

    if (normalizedWhatsapp) {
      const existing = await findContactByWhatsapp(apiKey, normalizedWhatsapp)
      if (existing) {
        contact = existing
        isNewContact = false
        console.log(`[reply-agent-sync] Contato existente: ID ${contact.id}`)
        await updateContactFields(apiKey, contact.id, payload)
      } else {
        contact = await createContact(apiKey, payload)
        isNewContact = true
        console.log(`[reply-agent-sync] Novo contato: ID ${contact.id}`)
      }
    } else {
      contact = await createContact(apiKey, payload)
      isNewContact = true
    }

    // Tags
    const existingTags = Array.isArray(contact.tags)
      ? contact.tags.map(t => typeof t === 'string' ? t : (t?.name || '')).filter(Boolean)
      : []

    const newTags = []
    if (formConfig?.tags?.length) newTags.push(...formConfig.tags)
    newTags.push(payload.gclid ? 'TRAFEGO_PAGO' : 'organico')

    try {
      await applyTags(apiKey, contact.id, newTags, existingTags)
    } catch (tagErr) {
      console.warn('[reply-agent-sync] applyTags falhou:', tagErr)
    }

    // Remover tags obsoletas (apenas em contatos existentes)
    if (!isNewContact && formConfig?.tags_to_remove?.length) {
      try {
        await removeTags(apiKey, contact.id, formConfig.tags_to_remove, existingTags)
      } catch (removeErr) {
        console.warn('[reply-agent-sync] removeTags falhou:', removeErr)
      }
    }

    // Salvar lead_profiles
    try {
      const { first_name, last_name } = splitName(payload.name)
      await supabase.from('lead_profiles').upsert({
        replyagent_contact_id: String(contact.id),
        first_name,
        last_name: last_name || null,
        email: payload.email?.trim().toLowerCase() || null,
        phone: rawWhatsapp ? normalizePhone(rawWhatsapp) : null,
        whatsapp_number: normalizedWhatsapp || null,
        service_interest: payload.service || null,
        urgency_level: payload.urgency === 'urgente' ? 'urgent' : 'normal',
        lead_source: payload.form_slug || 'website',
        lead_status: isNewContact ? 'novo' : 'retorno',
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
    } catch (profileErr) {
      console.warn('[reply-agent-sync] lead_profiles falhou:', profileErr)
    }

    // Atualizar form_leads com o ID do contato (quando lead_id é fornecido)
    if (payload.lead_id) {
      try {
        await supabase
          .from('form_leads')
          .update({
            replyagent_contact_id: String(contact.id),
            centralize_synced_at: new Date().toISOString(),
          })
          .eq('id', payload.lead_id)
        console.log(`[reply-agent-sync] form_leads atualizado: lead ${payload.lead_id} -> contact ${contact.id}`)
      } catch (updateErr) {
        console.warn('[reply-agent-sync] Atualização form_leads falhou:', updateErr)
      }
    }
    // SmartFlow
    const automationId = resolveFlowId(payload, formConfig, defaultFlowId)
    let flowTriggered = false
    const shouldFire = automationId && !payload.skip_flow && (isNewContact || !!payload.automation_id)

    if (shouldFire) {
      try {
        await sendFlow(apiKey, automationId, contact.id)
        flowTriggered = true
        console.log(`[reply-agent-sync] SmartFlow ${automationId} -> contact ${contact.id}`)
      } catch (flowErr) {
        console.warn('[reply-agent-sync] SmartFlow falhou:', flowErr)
      }
    }

    return new Response(JSON.stringify({
      success: true,
      contact_id: contact.id,
      is_new_contact: isNewContact,
      tags_applied: newTags,
      flow_triggered: flowTriggered,
      automation_id: automationId || null,
    }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

  } catch (err) {
    console.error('[reply-agent-sync] Erro:', err)
    return new Response(JSON.stringify({ error: 'Erro interno', detail: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})
