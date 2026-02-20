import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const MIN_INTERVAL_MS = 45_000 // 45 seconds between sends to same webhook_url

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Fetch pending items ready to send
    const { data: pending, error: fetchError } = await supabase
      .from('webhook_queue')
      .select('*')
      .in('status', ['pending', 'retrying'])
      .lte('send_at', new Date().toISOString())
      .order('send_at', { ascending: true })
      .limit(20)

    if (fetchError) throw fetchError
    if (!pending || pending.length === 0) {
      return new Response(JSON.stringify({ processed: 0, message: 'No pending webhooks' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Track last sent time per webhook_url to enforce minimum interval
    const lastSentMap: Record<string, string> = {}

    // Get last sent time for each unique webhook_url
    const uniqueUrls = [...new Set(pending.map(p => p.webhook_url))]
    for (const url of uniqueUrls) {
      const { data: lastSent } = await supabase
        .from('webhook_queue')
        .select('sent_at')
        .eq('webhook_url', url)
        .eq('status', 'sent')
        .order('sent_at', { ascending: false })
        .limit(1)

      if (lastSent?.[0]?.sent_at) {
        lastSentMap[url] = lastSent[0].sent_at
      }
    }

    let processed = 0
    let skipped = 0

    for (const item of pending) {
      // Check minimum interval
      const lastSentTime = lastSentMap[item.webhook_url]
      if (lastSentTime) {
        const elapsed = Date.now() - new Date(lastSentTime).getTime()
        if (elapsed < MIN_INTERVAL_MS) {
          skipped++
          continue
        }
      }

      try {
        const response = await fetch(item.webhook_url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'StepForm-Webhook-Queue/1.0',
          },
          body: JSON.stringify(item.payload),
        })

        if (response.ok) {
          const now = new Date().toISOString()
          await supabase
            .from('webhook_queue')
            .update({ status: 'sent', sent_at: now, attempts: item.attempts + 1 })
            .eq('id', item.id)

          lastSentMap[item.webhook_url] = now
          processed++
        } else {
          const errorText = await response.text()
          const newAttempts = item.attempts + 1
          const newStatus = newAttempts >= 3 ? 'failed' : 'retrying'

          await supabase
            .from('webhook_queue')
            .update({
              status: newStatus,
              attempts: newAttempts,
              error_message: `HTTP ${response.status}: ${errorText.substring(0, 500)}`,
              // Push send_at forward for retry (exponential backoff: 1min, 3min)
              send_at: new Date(Date.now() + newAttempts * 60_000).toISOString()
            })
            .eq('id', item.id)
        }
      } catch (sendError) {
        const newAttempts = item.attempts + 1
        const newStatus = newAttempts >= 3 ? 'failed' : 'retrying'

        await supabase
          .from('webhook_queue')
          .update({
            status: newStatus,
            attempts: newAttempts,
            error_message: (sendError as Error).message?.substring(0, 500) || 'Unknown error',
            send_at: new Date(Date.now() + newAttempts * 60_000).toISOString()
          })
          .eq('id', item.id)
      }
    }

    return new Response(JSON.stringify({ processed, skipped, total: pending.length }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Error processing webhook queue:', error)
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
