import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

interface WebhookLeadData {
  [key: string]: any;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('📥 Webhook recebido:', req.method);
    
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { 
        status: 405, 
        headers: corsHeaders 
      });
    }

    // Inicializar Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse do body
    const webhookData: WebhookLeadData = await req.json();
    console.log('📄 Dados recebidos:', JSON.stringify(webhookData, null, 2));

    // Buscar configurações de webhook ativas
    const { data: adminSettings, error: settingsError } = await supabase
      .from('admin_settings')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (settingsError) {
      console.error('❌ Erro ao buscar configurações:', settingsError);
      return new Response('Internal server error', { 
        status: 500, 
        headers: corsHeaders 
      });
    }

    const webhookConfigs = adminSettings?.webhook_configs 
      ? JSON.parse(adminSettings.webhook_configs) 
      : [];

    console.log('⚙️ Configurações de webhook encontradas:', webhookConfigs.length);

    // Processar dados através das configurações
    let processedLead = null;
    
    for (const config of webhookConfigs) {
      if (!config.is_active) continue;
      
      console.log('🔄 Processando com configuração:', config.name);
      
      // Mapear campos conforme configuração
      const mappedData: any = {};
      let hasRequiredFields = true;
      
      for (const mapping of config.mappings) {
        const value = webhookData[mapping.webhookField];
        
        if (mapping.required && (!value || value === '')) {
          console.log(`❌ Campo obrigatório ausente: ${mapping.webhookField}`);
          hasRequiredFields = false;
          break;
        }
        
        if (value) {
          mappedData[mapping.systemField] = value;
        }
      }
      
      if (hasRequiredFields) {
        processedLead = mappedData;
        console.log('✅ Lead processado:', JSON.stringify(processedLead, null, 2));
        break;
      }
    }

    if (!processedLead) {
      console.log('⚠️ Nenhuma configuração de webhook válida encontrada');
      return new Response(JSON.stringify({ 
        error: 'No valid webhook configuration found' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Verificar se já existe um lead com este email (evitar duplicatas)
    if (processedLead.email) {
      const { data: existingLead } = await supabase
        .from('conversion_events')
        .select('id')
        .eq('lead_data->email', processedLead.email)
        .limit(1)
        .maybeSingle();

      if (existingLead) {
        console.log('⚠️ Lead já existe, ignorando duplicata');
        return new Response(JSON.stringify({ 
          message: 'Lead already exists',
          lead_id: existingLead.id 
        }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // Criar novo lead
    const leadData = {
      event_type: 'webhook_form_submission',
      event_action: 'form_submit',
      event_category: 'lead_generation',
      form_name: 'webhook_form',
      page_url: webhookData.page_url || 'webhook',
      referrer: webhookData.referrer || 'webhook',
      utm_source: webhookData.utm_source || 'webhook',
      utm_medium: webhookData.utm_medium || 'webhook',
      utm_campaign: webhookData.utm_campaign || 'webhook_campaign',
      lead_data: processedLead,
      session_id: webhookData.session_id || 'webhook_' + Date.now(),
      visitor_id: webhookData.visitor_id || 'webhook_visitor_' + Date.now()
    };

    const { data: newLead, error: insertError } = await supabase
      .from('conversion_events')
      .insert(leadData)
      .select()
      .single();

    if (insertError) {
      console.error('❌ Erro ao inserir lead:', insertError);
      return new Response('Failed to create lead', { 
        status: 500, 
        headers: corsHeaders 
      });
    }

    console.log('✅ Lead criado com sucesso:', newLead.id);

    return new Response(JSON.stringify({ 
      success: true,
      lead_id: newLead.id,
      message: 'Lead created successfully' 
    }), {
      status: 201,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('❌ Erro no webhook:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      message: (error as Error).message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
};

serve(handler);