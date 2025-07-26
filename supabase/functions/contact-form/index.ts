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

    // Criar cliente Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Headers da requisição para analytics
    const headers = Object.fromEntries(req.headers.entries())
    const sessionId = crypto.randomUUID()
    const visitorId = headers['x-forwarded-for'] || 'unknown'
    const formId = 'contact_form_default'

    // Função para extrair parâmetros UTM
    const getUTMParam = (param: string) => {
      const url = new URL(headers.referer || 'https://example.com')
      return url.searchParams.get(param)
    }

    // Preparar dados de submissão
    const submissionData = {
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

    // 1. Salvar evento de conversão no Supabase
    console.log('💾 Salvando evento de conversão...')
    const { error: conversionError } = await supabase
      .from('conversion_events')
      .insert({
        session_id: sessionId,
        visitor_id: visitorId,
        event_type: 'form_submission',
        event_action: 'submit',
        event_label: 'contact_form',
        form_id: formId,
        form_name: 'Formulário de Contato',
        page_url: headers.referer || 'unknown',
        referrer: headers.referer || null,
        user_agent: headers['user-agent'] || 'unknown',
        lead_data: submissionData,
        conversion_value: 1,
        campaign_source: getUTMParam('utm_source'),
        campaign_medium: getUTMParam('utm_medium'),
        campaign_name: getUTMParam('utm_campaign')
      });

    if (conversionError) {
      console.error('❌ Erro ao salvar evento de conversão:', conversionError);
    } else {
      console.log('✅ Evento de conversão salvo com sucesso');
    }

    // 2. Enviar email automático de boas-vindas
    try {
      console.log('📧 Buscando template de email padrão...')
      
      // Buscar template padrão
      const { data: templates, error: templateError } = await supabase
        .from('email_templates')
        .select('*')
        .eq('is_default', true)
        .eq('is_active', true)
        .limit(1);

      if (templateError) {
        console.error('❌ Erro ao buscar template:', templateError);
      } else if (templates && templates.length > 0) {
        const defaultTemplate = templates[0];
        
        console.log('📤 Enviando email automático para:', email);
        
        const emailResponse = await supabase.functions.invoke('send-smtp-email', {
          body: {
            to: email,
            subject: defaultTemplate.subject.replace('{name}', name || 'Cliente'),
            name: name || 'Cliente',
            service: service || 'Consultoria Jurídica',
            message: message || '',
            customTitle: defaultTemplate.title,
            customContent: defaultTemplate.content
              .replace('{service}', service || 'nossos serviços')
              .replace('{name}', name || 'cliente')
          }
        });
        
        if (emailResponse.error) {
          console.error('❌ Erro ao enviar email:', emailResponse.error);
        } else {
          console.log('✅ Email automático enviado com sucesso');
        }
      } else {
        console.log('⚠️ Nenhum template padrão encontrado');
      }
    } catch (emailError) {
      console.error('❌ Erro geral no envio de email:', emailError);
      // Não bloquear o processo se o email falhar
    }

    // 3. Buscar configurações do webhook (processo original)
    console.log('🔍 Buscando configurações do formulário...')
    const { data: settingsData, error: settingsError } = await supabase
      .from('admin_settings')
      .select('form_config')
      .limit(1)
      .maybeSingle()

    if (settingsError) {
      console.error('❌ Erro ao buscar configurações:', settingsError)
      // Não bloquear se não conseguir buscar webhook
    }

    // 4. Enviar para webhook se configurado
    let webhookUrl = ''
    if (settingsData && settingsData.form_config) {
      const config = settingsData.form_config as any
      
      if (config.forms && Array.isArray(config.forms)) {
        const formWithWebhook = config.forms.find((form: any) => form.webhookUrl)
        if (formWithWebhook) {
          webhookUrl = formWithWebhook.webhookUrl
        }
      } else if (config.webhookUrl) {
        webhookUrl = config.webhookUrl
      }
    }

    if (webhookUrl) {
      try {
        console.log('📤 Enviando para webhook:', webhookUrl)
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData)
        })

        if (webhookResponse.ok) {
          console.log('✅ Webhook enviado com sucesso')
        } else {
          console.error('❌ Erro no webhook:', await webhookResponse.text())
        }
      } catch (webhookError) {
        console.error('❌ Erro ao enviar webhook:', webhookError)
      }
    } else {
      console.log('⚠️ Webhook não configurado')
    }

    console.log('✅ Formulário processado com sucesso:', { name, email, service })

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Mensagem enviada com sucesso! Você receberá um email de confirmação em breve.',
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