/**
 * upload-offline-conversions
 * ─────────────────────────────────────────────────────────────────────────────
 * Edge Function para upload de conversões offline qualificadas ao Google Ads.
 *
 * Estratégia de Enhanced Conversions for Leads:
 *  1. Busca leads com gclid salvo que ainda não foram enviados ao Google Ads
 *  2. Filtra apenas leads qualificados (status: 'qualified' | 'converted')
 *  3. Envia via Google Ads API (Offline Conversion Import)
 *  4. Marca os leads como enviados para evitar duplicação
 *
 * Por que isso reduz o custo das campanhas:
 *  - O Google Ads aprende quais cliques geraram clientes reais (não apenas leads)
 *  - O algoritmo de Smart Bidding otimiza para conversões de maior valor
 *  - Elimina o desperdício de orçamento em cliques que não convertem
 *
 * Configuração necessária (Supabase Secrets):
 *  - GOOGLE_ADS_DEVELOPER_TOKEN  →  Token de desenvolvedor do Google Ads
 *  - GOOGLE_ADS_CUSTOMER_ID      →  ID da conta do Google Ads (sem hífens)
 *  - GOOGLE_ADS_REFRESH_TOKEN    →  Refresh token OAuth2
 *  - GOOGLE_ADS_CLIENT_ID        →  Client ID OAuth2
 *  - GOOGLE_ADS_CLIENT_SECRET    →  Client Secret OAuth2
 *  - GOOGLE_ADS_CONVERSION_ACTION_ID → ID da ação de conversão no Google Ads
 *
 * Pode ser chamada:
 *  - Manualmente via painel Centralize (botão "Enviar Conversões Offline")
 *  - Automaticamente via cron (recomendado: 1x por dia)
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface OfflineConversionPayload {
  /** Se fornecido, processa apenas este lead específico */
  lead_id?: string
  /** Status mínimo para considerar qualificado (padrão: 'qualified') */
  min_status?: 'qualified' | 'converted'
  /** Limite de registros por execução (padrão: 100) */
  limit?: number
  /** Modo de teste: não envia ao Google Ads, apenas retorna o que seria enviado */
  dry_run?: boolean
}

interface LeadForConversion {
  id: string
  gclid: string
  transaction_id: string
  created_at: string
  email?: string
  phone?: string
  name?: string
}

/**
 * Obtém um access_token OAuth2 usando o refresh_token.
 */
const getAccessToken = async (
  clientId: string,
  clientSecret: string,
  refreshToken: string
): Promise<string> => {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  })

  const data = await res.json()
  if (!res.ok || !data.access_token) {
    throw new Error(`OAuth2 token error: ${JSON.stringify(data)}`)
  }

  return data.access_token
}

/**
 * Envia uma conversão offline para o Google Ads via API v17.
 * Documentação: https://developers.google.com/google-ads/api/docs/conversions/upload-clicks
 */
const uploadConversionToGoogleAds = async (
  accessToken: string,
  developerToken: string,
  customerId: string,
  conversionActionId: string,
  lead: LeadForConversion
): Promise<{ success: boolean; error?: string }> => {
  const conversionTime = new Date(lead.created_at)
    .toISOString()
    .replace('T', ' ')
    .replace(/\.\d{3}Z$/, '+0000')

  const requestBody = {
    conversions: [
      {
        gclid: lead.gclid,
        conversionAction: `customers/${customerId}/conversionActions/${conversionActionId}`,
        conversionDateTime: conversionTime,
        conversionValue: 1.0,
        currencyCode: 'BRL',
        // transaction_id para deduplicação — evita contar a mesma conversão duas vezes
        orderId: lead.transaction_id || lead.id,
      },
    ],
    partialFailure: true,
  }

  const res = await fetch(
    `https://googleads.googleapis.com/v17/customers/${customerId}/offlineUserDataJobs:uploadClickConversions`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'developer-token': developerToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }
  )

  const data = await res.json()

  if (!res.ok) {
    return { success: false, error: `HTTP ${res.status}: ${JSON.stringify(data)}` }
  }

  // Verificar partial failures
  if (data.partialFailureError) {
    return { success: false, error: JSON.stringify(data.partialFailureError) }
  }

  return { success: true }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const payload: OfflineConversionPayload = await req.json().catch(() => ({}))
    const dryRun = payload.dry_run === true
    const limit = payload.limit || 100
    const minStatus = payload.min_status || 'qualified'

    console.log(`[upload-offline-conversions] Starting | dry_run=${dryRun} | limit=${limit}`)

    // ─── Verificar configuração do Google Ads ────────────────────────────────
    const developerToken = Deno.env.get('GOOGLE_ADS_DEVELOPER_TOKEN')
    const customerId = Deno.env.get('GOOGLE_ADS_CUSTOMER_ID')?.replace(/-/g, '')
    const refreshToken = Deno.env.get('GOOGLE_ADS_REFRESH_TOKEN')
    const clientId = Deno.env.get('GOOGLE_ADS_CLIENT_ID')
    const clientSecret = Deno.env.get('GOOGLE_ADS_CLIENT_SECRET')
    const conversionActionId = Deno.env.get('GOOGLE_ADS_CONVERSION_ACTION_ID')

    const missingSecrets = [
      !developerToken && 'GOOGLE_ADS_DEVELOPER_TOKEN',
      !customerId && 'GOOGLE_ADS_CUSTOMER_ID',
      !refreshToken && 'GOOGLE_ADS_REFRESH_TOKEN',
      !clientId && 'GOOGLE_ADS_CLIENT_ID',
      !clientSecret && 'GOOGLE_ADS_CLIENT_SECRET',
      !conversionActionId && 'GOOGLE_ADS_CONVERSION_ACTION_ID',
    ].filter(Boolean)

    if (missingSecrets.length > 0 && !dryRun) {
      return new Response(
        JSON.stringify({
          error: 'Google Ads não configurado',
          missing_secrets: missingSecrets,
          message: 'Configure os secrets no painel Centralize → Google Ads API',
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // ─── Buscar leads qualificados com gclid ─────────────────────────────────
    let query = supabase
      .from('form_leads')
      .select('id, gclid, transaction_id, created_at, email, phone, name')
      .not('gclid', 'is', null)
      .eq('offline_conversion_sent', false)
      .in('status', minStatus === 'converted' ? ['converted'] : ['qualified', 'converted'])
      .order('created_at', { ascending: true })
      .limit(limit)

    if (payload.lead_id) {
      query = supabase
        .from('form_leads')
        .select('id, gclid, transaction_id, created_at, email, phone, name')
        .eq('id', payload.lead_id)
        .not('gclid', 'is', null)
    }

    const { data: leads, error: fetchError } = await query

    if (fetchError) {
      console.error('[upload-offline-conversions] Error fetching leads:', fetchError)
      return new Response(
        JSON.stringify({ error: 'Erro ao buscar leads', detail: fetchError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!leads || leads.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Nenhum lead qualificado com gclid encontrado para envio',
          sent: 0,
          total: 0,
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`[upload-offline-conversions] Found ${leads.length} leads to process`)

    // ─── Modo dry_run: retornar sem enviar ───────────────────────────────────
    if (dryRun) {
      return new Response(
        JSON.stringify({
          success: true,
          dry_run: true,
          message: `${leads.length} conversões seriam enviadas ao Google Ads`,
          leads: leads.map(l => ({
            id: l.id,
            gclid: l.gclid,
            transaction_id: l.transaction_id,
            created_at: l.created_at,
          })),
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // ─── Obter access_token OAuth2 ───────────────────────────────────────────
    let accessToken: string
    try {
      accessToken = await getAccessToken(clientId!, clientSecret!, refreshToken!)
    } catch (tokenErr) {
      console.error('[upload-offline-conversions] OAuth2 error:', tokenErr)
      return new Response(
        JSON.stringify({ error: 'Falha na autenticação OAuth2 com Google', detail: String(tokenErr) }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // ─── Processar cada lead ─────────────────────────────────────────────────
    const results = {
      sent: 0,
      failed: 0,
      errors: [] as { lead_id: string; error: string }[],
    }

    for (const lead of leads as LeadForConversion[]) {
      try {
        const result = await uploadConversionToGoogleAds(
          accessToken,
          developerToken!,
          customerId!,
          conversionActionId!,
          lead
        )

        if (result.success) {
          // Marcar como enviado para evitar duplicação
          await supabase
            .from('form_leads')
            .update({
              offline_conversion_sent: true,
              offline_conversion_sent_at: new Date().toISOString(),
            })
            .eq('id', lead.id)

          results.sent++
          console.log(`[upload-offline-conversions] ✅ Lead ${lead.id} sent | gclid: ${lead.gclid}`)
        } else {
          results.failed++
          results.errors.push({ lead_id: lead.id, error: result.error || 'Unknown error' })
          console.error(`[upload-offline-conversions] ❌ Lead ${lead.id} failed:`, result.error)
        }
      } catch (leadErr) {
        results.failed++
        results.errors.push({ lead_id: lead.id, error: String(leadErr) })
        console.error(`[upload-offline-conversions] ❌ Lead ${lead.id} exception:`, leadErr)
      }
    }

    console.log(`[upload-offline-conversions] Done | sent=${results.sent} | failed=${results.failed}`)

    return new Response(
      JSON.stringify({
        success: true,
        total: leads.length,
        sent: results.sent,
        failed: results.failed,
        errors: results.errors.length > 0 ? results.errors : undefined,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (err) {
    console.error('[upload-offline-conversions] ❌ Unhandled error:', err)
    return new Response(
      JSON.stringify({ error: 'Internal server error', detail: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
