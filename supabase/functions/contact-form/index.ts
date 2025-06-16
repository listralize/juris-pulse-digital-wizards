
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  service: string;
  isUrgent: boolean;
  customFields?: { [key: string]: any };
  formConfig?: {
    redirectUrl?: string;
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const formData: ContactFormData = await req.json()
    const { name, email, phone, message, service, isUrgent, customFields, formConfig } = formData

    // Validação de entrada
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Nome, email e mensagem são obrigatórios' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Email inválido' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Criar cliente Supabase para buscar configurações
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Buscar configurações do formulário para obter webhook URL
    console.log('🔍 Buscando configurações do formulário...')
    const { data: settingsData, error: settingsError } = await supabase
      .from('admin_settings')
      .select('form_config')
      .limit(1)
      .maybeSingle()

    if (settingsError) {
      console.error('❌ Erro ao buscar configurações:', settingsError)
      return new Response(
        JSON.stringify({ error: 'Erro ao buscar configurações do formulário' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Obter webhook URL das configurações (pode haver múltiplos formulários)
    let webhookUrl = ''
    if (settingsData && settingsData.form_config) {
      const config = settingsData.form_config as any
      
      // Se é o novo formato com múltiplos formulários
      if (config.forms && Array.isArray(config.forms)) {
        // Por enquanto, usar o primeiro formulário com webhook configurado
        // TODO: implementar lógica para identificar qual formulário foi usado
        const formWithWebhook = config.forms.find((form: any) => form.webhookUrl)
        if (formWithWebhook) {
          webhookUrl = formWithWebhook.webhookUrl
        }
      } else if (config.webhookUrl) {
        // Formato antigo
        webhookUrl = config.webhookUrl
      }
    }

    if (!webhookUrl) {
      console.error('❌ Webhook URL não configurada no painel admin')
      return new Response(
        JSON.stringify({ error: 'Webhook não configurado. Configure o webhook no painel administrativo.' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Preparar payload para webhook
    const webhookPayload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || '',
      message: message.trim(),
      service: service || 'Não especificado',
      isUrgent: Boolean(isUrgent),
      customFields: customFields || {},
      timestamp: new Date().toISOString(),
      source: 'Website - Formulário de Contato',
      redirectUrl: formConfig?.redirectUrl || ''
    }

    console.log('📤 Enviando para webhook:', webhookUrl)
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload)
    })

    if (!webhookResponse.ok) {
      console.error('❌ Erro ao enviar webhook:', await webhookResponse.text())
      return new Response(
        JSON.stringify({ error: 'Erro interno do servidor' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('✅ Formulário de contato enviado com sucesso:', { name, email, service })

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Mensagem enviada com sucesso!',
        redirectUrl: formConfig?.redirectUrl 
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('❌ Erro no processamento do formulário:', error)
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
