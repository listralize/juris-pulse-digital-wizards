// centralize-bulk-sync v3.0
// CHECK DE STATUS APENAS — verifica quais leads do painel já existem na Reply Agent pelo WhatsApp
// NÃO cria contatos, NÃO dispara flows, NÃO envia mensagens
// Apenas marca o replyagent_contact_id no lead quando encontrado na Reply Agent

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const BASE = 'https://ra-bcknd.com/v1'

const normalizePhone = (raw: string): string => {
  if (!raw) return ''
  const digits = raw.replace(/\D/g, '')
  if (!digits) return ''
  if (digits.startsWith('55') && digits.length >= 12) return `+${digits}`
  if (digits.length >= 10) return `+55${digits}`
  return `+55${digits}`
}

// Busca contato na Reply Agent pelo WhatsApp — apenas lookup, sem criar
const findContactByWhatsapp = async (apiKey: string, whatsapp: string): Promise<{ id: number; name: string } | null> => {
  try {
    const res = await fetch(`${BASE}/fetch-contacts-by-whatsapp`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ whatsapp_number: whatsapp }),
    })
    if (res.ok) {
      const data = await res.json()
      const contacts = data?.data || (Array.isArray(data) ? data : [])
      if (contacts.length > 0) {
        const c = contacts[0]
        return { id: c.id, name: `${c.first_name || ''} ${c.last_name || ''}`.trim() }
      }
    }
    // Fallback: buscar por número de telefone
    const res2 = await fetch(`${BASE}/fetch-contacts-by-mobile-number`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile_number: whatsapp }),
    })
    if (res2.ok) {
      const data2 = await res2.json()
      const contacts2 = data2?.data || (Array.isArray(data2) ? data2 : [])
      if (contacts2.length > 0) {
        const c = contacts2[0]
        return { id: c.id, name: `${c.first_name || ''} ${c.last_name || ''}`.trim() }
      }
    }
    return null
  } catch (err) {
    console.warn('[bulk-sync] lookup falhou:', err)
    return null
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    const body = await req.json().catch(() => ({}))
    const { limit = 100, offset = 0, form_id, dry_run = false } = body

    // Buscar API Key da Reply Agent
    const { data: mktSettings } = await supabase
      .from('marketing_settings')
      .select('reply_agent_api_key, centralize_api_key')
      .limit(1)
      .maybeSingle()

    const apiKey = mktSettings?.centralize_api_key
      || mktSettings?.reply_agent_api_key
      || Deno.env.get('REPLYAGENT_API_KEY')
      || ''

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API Key da Reply Agent não configurada' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Buscar leads que ainda NÃO têm replyagent_contact_id marcado
    let query = supabase
      .from('form_leads')
      .select('id, form_id, form_name, lead_data, created_at')
      .is('replyagent_contact_id', null)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (form_id) query = query.eq('form_id', form_id)

    const { data: leads, error: leadsError } = await query
    if (leadsError) throw leadsError

    const results = {
      total_checked: leads?.length || 0,
      found_in_reply: 0,
      not_found: 0,
      no_phone: 0,
      errors: 0,
      details: [] as any[],
    }

    for (const lead of (leads || [])) {
      try {
        const ld = lead.lead_data || {}
        const rawPhone = ld.whatsapp || ld.phone || ld.telefone || ld.celular || ld.Telefone || ''
        const phone = normalizePhone(rawPhone)
        const name = ld.name || ld.nome || ld.Nome || 'Sem nome'

        // Lead sem telefone — não tem como verificar
        if (!phone || phone.length < 12) {
          results.no_phone++
          results.details.push({
            id: lead.id,
            name,
            status: 'sem_telefone',
            form_id: lead.form_id,
          })
          continue
        }

        // Aguardar 250ms entre requests para não sobrecarregar a API da Reply Agent
        await new Promise(r => setTimeout(r, 250))

        // Verificar se existe na Reply Agent
        const contact = await findContactByWhatsapp(apiKey, phone)

        if (contact) {
          results.found_in_reply++
          results.details.push({
            id: lead.id,
            name,
            status: 'encontrado_na_reply',
            phone,
            reply_contact_id: contact.id,
            reply_contact_name: contact.name,
            form_id: lead.form_id,
          })

          // Marcar o replyagent_contact_id no lead (exceto em dry_run)
          if (!dry_run) {
            await supabase
              .from('form_leads')
              .update({
                replyagent_contact_id: String(contact.id),
                centralize_synced_at: new Date().toISOString(),
              })
              .eq('id', lead.id)
          }
        } else {
          results.not_found++
          results.details.push({
            id: lead.id,
            name,
            status: 'nao_encontrado_na_reply',
            phone,
            form_id: lead.form_id,
          })
        }

      } catch (err) {
        results.errors++
        results.details.push({ id: lead.id, status: 'erro', error: String(err) })
        console.error(`[bulk-sync] Erro no lead ${lead.id}:`, err)
      }
    }

    console.log(
      `[bulk-sync] Verificados: ${results.total_checked} | Encontrados: ${results.found_in_reply} | Não encontrados: ${results.not_found} | Sem telefone: ${results.no_phone}`
    )

    return new Response(
      JSON.stringify({
        success: true,
        dry_run,
        total_checked: results.total_checked,
        found_in_reply: results.found_in_reply,
        not_found: results.not_found,
        no_phone: results.no_phone,
        errors: results.errors,
        message: dry_run
          ? `Simulação: ${results.found_in_reply} de ${results.total_checked} leads já estão na Reply Agent`
          : `${results.found_in_reply} de ${results.total_checked} leads marcados como presentes na Reply Agent`,
        details: results.details,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (err) {
    console.error('[bulk-sync] Erro geral:', err)
    return new Response(
      JSON.stringify({ error: 'Erro interno', detail: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
