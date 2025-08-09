import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WebhookLeadData {
  [key: string]: any;
}

const handler = async (req: Request): Promise<Response> => {
  console.log(`🔗 Webhook Receiver chamado: ${req.method} ${req.url}`);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    console.log(`❌ Método não permitido: ${req.method}`);
    return new Response(
      JSON.stringify({ error: `Método ${req.method} não permitido` }),
      { 
        status: 405,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    );
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Variáveis do Supabase não configuradas');
      return new Response(
        JSON.stringify({ error: 'Configuração do servidor inválida' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Parse incoming webhook data with error handling
    let webhookData: WebhookLeadData;
    let requestText: string = '';
    
    try {
      const contentType = req.headers.get('content-type') || '';
      console.log('📋 Content-Type:', contentType);
      
      if (contentType.includes('multipart/form-data')) {
        // Parse multipart/form-data
        console.log('🔄 Parseando dados multipart/form-data...');
        const formData = await req.formData();
        webhookData = {};
        
        for (const [key, value] of formData.entries()) {
          webhookData[key] = value.toString();
        }
        
        console.log('📋 Dados parseados do form-data:', JSON.stringify(webhookData, null, 2));
      } else {
        // Parse JSON
        console.log('🔄 Parseando dados JSON...');
        requestText = await req.text();
        console.log('📋 Dados brutos recebidos:', requestText);
        
        if (!requestText || requestText.trim() === '') {
          throw new Error('Dados vazios recebidos');
        }
        
        webhookData = JSON.parse(requestText);
      }
    } catch (parseError) {
      console.error('❌ Erro ao parsear dados:', parseError);
      console.log('📋 Conteúdo que causou erro:', requestText);
      return new Response(
        JSON.stringify({ 
          error: 'Dados inválidos', 
          details: 'Erro ao processar dados recebidos',
          parseError: parseError.message,
          receivedData: requestText 
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        }
      );
    }
    
    console.log('📥 Dados processados do webhook:', JSON.stringify(webhookData, null, 2));

    // Get webhook configuration from admin_settings
    const { data: adminData, error: adminError } = await supabase
      .from('admin_settings')
      .select('lead_webhook_config')
      .limit(1)
      .maybeSingle();

    if (adminError) {
      console.error('❌ Erro ao buscar configuração de webhook:', adminError);
    }

    let webhookConfig: any = null;
    if (adminData?.lead_webhook_config) {
      try {
        webhookConfig = JSON.parse(adminData.lead_webhook_config);
        console.log('⚙️ Configuração de webhook encontrada:', webhookConfig);
      } catch (e) {
        console.error('❌ Erro ao parsear configuração de webhook:', e);
      }
    }

    // Map webhook data to lead data
    let mappedData: any = {};

    if (webhookConfig?.mappings && Array.isArray(webhookConfig.mappings)) {
      // Use configured mappings
      console.log('🔄 Usando mapeamentos configurados');
      
      // Primeiro, preservar todos os dados originais
      mappedData = { ...webhookData };
      
      // Depois, aplicar os mapeamentos configurados
      for (const mapping of webhookConfig.mappings) {
        if (mapping.webhookField && webhookData[mapping.webhookField] !== undefined) {
          mappedData[mapping.systemField] = webhookData[mapping.webhookField];
          console.log(`📋 Mapeando: ${mapping.webhookField} -> ${mapping.systemField} = ${webhookData[mapping.webhookField]}`);
        }
      }
      
      // Garantir que temos fonte identificada
      mappedData.source = mappedData.source || 'Webhook - Sistema Configurado';
      
      console.log('📊 Dados após mapeamento configurado:', mappedData);
    } else {
      // Auto-mapping fallback - preservar TODOS os dados originais
      console.log('🔄 Usando auto-mapeamento melhorado');
      
      // Primeiro, preservar todos os dados originais
      mappedData = { ...webhookData };
      
      // Depois, normalizar campos principais para o sistema
      const normalizedData = {
        name: webhookData.name || webhookData.nome || webhookData.first_name || webhookData.full_name || '',
        email: webhookData.email || webhookData.e_mail || webhookData.mail || '',
        phone: webhookData.phone || webhookData.telefone || webhookData.tel || webhookData.celular || '',
        message: webhookData.message || webhookData.mensagem || webhookData.msg || webhookData.description || webhookData.observacoes || '',
        service: webhookData.service || webhookData.servico || webhookData.subject || webhookData.assunto || 'Contato via Webhook',
        company: webhookData.company || webhookData.empresa || '',
        source: 'Webhook - Sistema Externo'
      };
      
      // Mesclar dados normalizados com os originais (dados originais têm prioridade se já existirem)
      mappedData = { ...normalizedData, ...webhookData };
      
      console.log('📊 Auto-mapeamento aplicado - dados normalizados:', normalizedData);
    }

    console.log('📊 Dados mapeados:', mappedData);

    // Validate essential fields
    if (!mappedData.name && !mappedData.phone) {
      console.log('❌ Dados insuficientes - faltam nome ou telefone');
      return new Response(
        JSON.stringify({ 
          error: 'Dados insuficientes', 
          required: ['name', 'phone'],
          received: Object.keys(webhookData)
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        }
      );
    }

    // Check for duplicate leads (based on email if available)
    if (mappedData.email) {
      const { data: existingLead } = await supabase
        .from('conversion_events')
        .select('id')
        .eq('event_type', 'webhook_received')
        .contains('lead_data', { email: mappedData.email })
        .limit(1)
        .maybeSingle();

      if (existingLead) {
        console.log('⚠️ Lead duplicado encontrado para email:', mappedData.email);
      }
    }

    // Generate unique IDs
    const timestamp = Date.now();
    const sessionId = `webhook-${timestamp}`;
    const visitorId = `webhook-visitor-${timestamp}`;

    // Insert the lead data into conversion_events
    const { data, error } = await supabase
      .from('conversion_events')
      .insert({
        event_type: 'webhook_received',
        event_category: 'webhook',
        event_action: 'lead_created',
        event_label: 'webhook-receiver',
        visitor_id: visitorId,
        session_id: sessionId,
        page_url: mappedData.page_url || `https://hmfsvccbyxhdwmrgcyff.supabase.co/webhook-receiver`,
        referrer: mappedData.referrer || 'webhook',
        lead_data: {
          ...mappedData,
          webhook_timestamp: new Date().toISOString(),
          webhook_source: 'webhook-receiver',
          processing_method: webhookConfig ? 'configured_mapping' : 'auto_mapping'
        },
        form_name: mappedData.form_name || 'Webhook Lead Form',
        form_id: mappedData.form_id || 'webhook_form',
        timestamp: new Date().toISOString(),
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Erro ao inserir dados no banco:', error);
      return new Response(
        JSON.stringify({ error: 'Erro ao salvar dados', details: error.message }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        }
      );
    }

    console.log('✅ Lead criado com sucesso:', data.id);

    // Send welcome email if configured and email is available
    if (mappedData.email && mappedData.name) {
      try {
        console.log('📧 Enviando email de boas-vindas...');
        
        const emailResult = await supabase.functions.invoke('send-smtp-email', {
          body: {
            to: mappedData.email,
            subject: `Obrigado pelo contato, ${mappedData.name}! 📧`,
            name: mappedData.name,
            service: mappedData.service || 'nossos serviços',
            message: mappedData.message || ''
          }
        });

        if (emailResult.error) {
          console.error('❌ Erro ao enviar email de boas-vindas:', emailResult.error);
        } else {
          console.log('✅ Email de boas-vindas enviado com sucesso');
        }
      } catch (emailError) {
        console.error('❌ Erro ao processar envio de email:', emailError);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Lead processado com sucesso',
        leadId: data.id,
        data: {
          mappedData,
          timestamp: new Date().toISOString(),
          session_id: sessionId
        }
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    );

  } catch (error) {
    console.error('❌ Erro geral no webhook receiver:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Erro interno do servidor', 
        details: error.message 
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    );
  }
};

serve(handler);