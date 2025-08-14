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
    id?: string;
    name?: string;
    redirectUrl?: string;
    webhookUrl?: string;
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const formData: ContactFormData & { antiBot?: { hp?: string; elapsedMs?: number }, website?: string } = await req.json()
    const { name, email, phone, message, service, isUrgent, customFields, formConfig } = formData

    // Anti-bot: honeypot e time-trap
    const hp = formData.website || formData.antiBot?.hp || ''
    const elapsed = formData.antiBot?.elapsedMs || 9999
    if ((hp && hp.trim() !== '') || elapsed < 1500) {
      return new Response(JSON.stringify({ success: true, message: 'OK' }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

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

    // Rate limiting simples por IP (5 req/5min)
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const endpoint = 'contact-form'
    const now = Date.now()
    const windowMs = 5 * 60 * 1000
    const windowStart = new Date(Math.floor(now / windowMs) * windowMs).toISOString()

    // Verifica/atualiza contador
    const { data: rateRow } = await supabase
      .from('edge_rate_limits')
      .select('*')
      .eq('ip', ip)
      .eq('endpoint', endpoint)
      .eq('window_start', windowStart)
      .maybeSingle()

    if (rateRow && rateRow.count >= 5) {
      return new Response(JSON.stringify({ error: 'Too Many Requests' }), { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    if (rateRow) {
      await supabase
        .from('edge_rate_limits')
        .update({ count: rateRow.count + 1 })
        .eq('id', rateRow.id)
    } else {
      await supabase
        .from('edge_rate_limits')
        .insert({ ip, endpoint, window_start: windowStart, count: 1 })
    }

    // Headers da requisição para analytics
    const headers = Object.fromEntries(req.headers.entries())
    const sessionId = crypto.randomUUID()
    const visitorId = headers['x-forwarded-for'] || 'unknown'
    const formId = formConfig?.id || 'contact_form_default'

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

    // Extrair DDD e buscar localização
    let ddd = null;
    let locationInfo = null;
    
    if (phone && phone.trim()) {
      const phoneNumbers = phone.replace(/\D/g, '');
      
      if (phoneNumbers.length >= 10) {
        if (phoneNumbers.startsWith('55') && phoneNumbers.length >= 12) {
          ddd = parseInt(phoneNumbers.substring(2, 4));
        } else {
          ddd = parseInt(phoneNumbers.substring(0, 2));
        }
        
        if (ddd >= 11 && ddd <= 99) {
          const { data: locationData } = await supabase
            .from('ddd_locations')
            .select('state_name, capital, region')
            .eq('ddd', ddd)
            .maybeSingle();
          
          if (locationData) {
            locationInfo = locationData;
          }
        }
      }
    }

    // Conversão é gerenciada pelo frontend via useAnalytics para evitar duplicação
    console.log('✅ Dados processados - conversão será registrada pelo frontend');

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
              .replace('{name}', name || 'cliente'),
            customHtml: defaultTemplate.custom_html,
            buttonText: defaultTemplate.button_text,
            buttonUrl: defaultTemplate.button_url,
            secondaryButtonText: defaultTemplate.secondary_button_text,
            secondaryButtonUrl: defaultTemplate.secondary_button_url,
            showSecondaryButton: defaultTemplate.show_secondary_button,
            logoUrl: defaultTemplate.logo_url,
            backgroundColor: defaultTemplate.background_color,
            textColor: defaultTemplate.text_color,
            buttonColor: defaultTemplate.button_color
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
    let webhookUrl = formConfig?.webhookUrl || ''
    
    // Se não há webhook específico no formConfig, buscar nas configurações gerais
    if (!webhookUrl && settingsData && settingsData.form_config) {
      const config = settingsData.form_config as any
      
      if (config.forms && Array.isArray(config.forms)) {
        // Se temos um formId específico, buscar seu webhook
        if (formConfig?.id) {
          const specificForm = config.forms.find((form: any) => form.id === formConfig.id)
          if (specificForm && specificForm.webhookUrl) {
            webhookUrl = specificForm.webhookUrl
          }
        }
        
        // Fallback: buscar qualquer formulário com webhook
        if (!webhookUrl) {
          const formWithWebhook = config.forms.find((form: any) => form.webhookUrl)
          if (formWithWebhook) {
            webhookUrl = formWithWebhook.webhookUrl
          }
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
          body: JSON.stringify({
            ...submissionData,
            formId: formConfig?.id,
            formName: formConfig?.name
          })
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
      console.log('⚠️ Webhook não configurado para o formulário:', formConfig?.id || 'default')
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