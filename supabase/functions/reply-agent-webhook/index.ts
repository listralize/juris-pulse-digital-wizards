// reply-agent-webhook — recebe eventos do SmartFlow da Reply Agent (Centralize)
// e atualiza o status do lead no painel quando o cliente responde
// v1.0
//
// Como usar no SmartFlow:
//   Ação: "Solicitação externa (API)"
//   Método: POST
//   URL: https://hmfsvccbyxhdwmrgcyff.supabase.co/functions/v1/reply-agent-webhook
//   Cabeçalhos:
//     Content-Type: application/json
//     x-webhook-secret: [seu_secret_configurado_no_supabase]
//   Corpo (JSON):
//     {
//       "contact_id": "{{contact.id}}",
//       "contact_name": "{{contact.first_name}} {{contact.last_name}}",
//       "whatsapp": "{{contact.primary_whatsapp}}",
//       "event": "respondeu",
//       "message": "{{last_message}}",
//       "flow_id": "{{flow.id}}",
//       "flow_name": "{{flow.name}}"
//     }

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-webhook-secret',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

// Mapeamento de eventos do SmartFlow para status no painel
const EVENT_TO_STATUS: Record<string, string> = {
  'respondeu': 'respondeu',
  'interessado': 'interessado',
  'agendou': 'agendou',
  'nao_interessado': 'nao_interessado',
  'sem_resposta': 'sem_resposta',
  'converteu': 'converteu',
  'cancelou': 'cancelou',
  // Aliases comuns
  'replied': 'respondeu',
  'interested': 'interessado',
  'scheduled': 'agendou',
  'not_interested': 'nao_interessado',
  'no_reply': 'sem_resposta',
  'converted': 'converteu',
  'cancelled': 'cancelou',
  'flow_started': 'em_atendimento',
  'flow_completed': 'atendimento_concluido',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  try {
    // Validar secret do webhook (segurança)
    const webhookSecret = Deno.env.get('WEBHOOK_SECRET') || Deno.env.get('REPLY_WEBHOOK_SECRET') || ''
    const requestSecret = req.headers.get('x-webhook-secret') || ''

    if (webhookSecret && requestSecret !== webhookSecret) {
      console.warn('[reply-agent-webhook] Secret inválido:', requestSecret.substring(0, 10))
      return new Response(JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    const body = await req.json().catch(() => ({}))
    const {
      contact_id,
      contact_name,
      whatsapp,
      event = 'respondeu',
      message,
      flow_id,
      flow_name,
      custom_status,
      metadata,
    } = body

    if (!contact_id && !whatsapp) {
      return new Response(JSON.stringify({ error: 'contact_id ou whatsapp é obrigatório' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const newStatus = custom_status || EVENT_TO_STATUS[event] || event
    const timestamp = new Date().toISOString()

    console.log(`[reply-agent-webhook] Evento: ${event} -> status: ${newStatus} | contact: ${contact_id} | whatsapp: ${whatsapp}`)

    // 1. Atualizar lead_profiles pelo replyagent_contact_id
    let profileUpdated = false
    let profileId: string | null = null

    if (contact_id) {
      const { data: profile, error: profileErr } = await supabase
        .from('lead_profiles')
        .update({
          lead_status: newStatus,
          last_sync_at: timestamp,
          updated_at: timestamp,
        })
        .eq('replyagent_contact_id', String(contact_id))
        .select('id')
        .maybeSingle()

      if (profile?.id) {
        profileId = profile.id
        profileUpdated = true
        console.log(`[reply-agent-webhook] lead_profiles atualizado: ${profileId} -> ${newStatus}`)
      } else if (profileErr) {
        console.warn('[reply-agent-webhook] Erro ao atualizar lead_profiles:', profileErr)
      }
    }

    // 2. Atualizar form_leads pelo replyagent_contact_id
    let formLeadsUpdated = 0
    if (contact_id) {
      const { data: updatedLeads, error: leadsErr } = await supabase
        .from('form_leads')
        .update({
          status: newStatus,
          updated_at: timestamp,
        })
        .eq('replyagent_contact_id', String(contact_id))
        .select('id')

      if (updatedLeads) {
        formLeadsUpdated = updatedLeads.length
        console.log(`[reply-agent-webhook] form_leads atualizados: ${formLeadsUpdated} registros -> ${newStatus}`)
      } else if (leadsErr) {
        console.warn('[reply-agent-webhook] Erro ao atualizar form_leads:', leadsErr)
      }
    }

    // 3. Registrar evento no webhook_queue para auditoria
    const { error: queueErr } = await supabase
      .from('webhook_queue')
      .insert({
        lead_id: contact_id ? String(contact_id) : null,
        webhook_url: 'reply-agent-smartflow',
        payload: {
          contact_id,
          contact_name,
          whatsapp,
          event,
          message,
          flow_id,
          flow_name,
          new_status: newStatus,
          metadata: metadata || {},
        },
        urgency: event === 'agendou' || event === 'scheduled' ? 'high' : 'normal',
        status: 'received',
        send_at: timestamp,
        sent_at: timestamp,
      })

    if (queueErr) {
      console.warn('[reply-agent-webhook] Erro ao registrar no webhook_queue:', queueErr)
    }

    // 4. Se não encontrou pelo contact_id, tentar pelo WhatsApp via lead_profiles
    if (!profileUpdated && whatsapp) {
      const normalizedWa = whatsapp.replace(/\D/g, '')
      const waVariants = [
        whatsapp,
        `+${normalizedWa}`,
        normalizedWa,
        `+55${normalizedWa}`,
      ]

      for (const wa of waVariants) {
        const { data: profile } = await supabase
          .from('lead_profiles')
          .update({
            lead_status: newStatus,
            last_sync_at: timestamp,
            updated_at: timestamp,
          })
          .eq('whatsapp_number', wa)
          .select('id')
          .maybeSingle()

        if (profile?.id) {
          profileId = profile.id
          profileUpdated = true
          console.log(`[reply-agent-webhook] lead_profiles atualizado por WhatsApp: ${wa} -> ${newStatus}`)
          break
        }
      }
    }

    return new Response(JSON.stringify({
      success: true,
      event,
      new_status: newStatus,
      contact_id: contact_id || null,
      profile_updated: profileUpdated,
      form_leads_updated: formLeadsUpdated,
      timestamp,
    }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

  } catch (err) {
    console.error('[reply-agent-webhook] Erro:', err)
    return new Response(JSON.stringify({ error: 'Erro interno', detail: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})
