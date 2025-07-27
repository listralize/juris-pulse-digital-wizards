import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WebhookLeadData {
  [key: string]: any;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  try {
    console.log('🔄 Processando webhook de lead...');

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Configuração do Supabase não encontrada');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse incoming webhook data with error handling
    let webhookData: WebhookLeadData;
    let requestText: string = '';
    
    try {
      requestText = await req.text();
      console.log('📋 Dados brutos recebidos:', requestText);
      
      if (!requestText || requestText.trim() === '') {
        throw new Error('Dados vazios recebidos');
      }
      
      webhookData = JSON.parse(requestText);
    } catch (parseError) {
      console.error('❌ Erro ao parsear JSON:', parseError);
      console.log('📋 Conteúdo que causou erro:', requestText);
      return new Response(
        JSON.stringify({ 
          error: 'Dados inválidos', 
          details: 'JSON malformado ou vazio',
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

    // Get webhook configuration
    const { data: configData, error: configError } = await supabase
      .from('admin_settings')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (configError) {
      console.error('❌ Erro ao buscar configuração:', configError);
      throw new Error('Erro ao buscar configuração de webhook');
    }

    let webhookConfig = null;
    if (configData?.lead_webhook_config) {
      try {
        webhookConfig = JSON.parse(configData.lead_webhook_config);
      } catch (e) {
        console.error('❌ Erro ao parsear configuração:', e);
      }
    }

    // If no configuration exists, create a basic lead entry
    let mappedData: any = {};
    
    if (webhookConfig?.mappings && Array.isArray(webhookConfig.mappings)) {
      console.log('🔄 Aplicando mapeamentos configurados...');
      
      // Apply configured mappings
      for (const mapping of webhookConfig.mappings) {
        if (mapping.webhookField && webhookData[mapping.webhookField]) {
          mappedData[mapping.systemField] = webhookData[mapping.webhookField];
        } else if (mapping.required) {
          console.warn(`⚠️ Campo obrigatório não encontrado: ${mapping.webhookField}`);
        }
      }
    } else {
      console.log('🔄 Usando mapeamento automático...');
      
      // Auto-mapping for common fields
      mappedData = {
        name: webhookData.name || webhookData.nome || webhookData.full_name || '',
        email: webhookData.email || webhookData.e_mail || '',
        phone: webhookData.phone || webhookData.telefone || webhookData.telephone || '',
        message: webhookData.message || webhookData.mensagem || webhookData.msg || '',
        service: webhookData.service || webhookData.servico || 'Contato via Webhook',
        ...webhookData // Include all original data
      };
    }

    // Validate required fields
    if (!mappedData.name && !mappedData.phone) {
      console.warn('⚠️ Dados insuficientes - nome ou telefone obrigatório');
      return new Response(JSON.stringify({ 
        error: 'Dados insuficientes',
        message: 'Nome ou telefone são obrigatórios'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Check for duplicates if email is provided
    if (mappedData.email) {
      const { data: existingLead, error: duplicateError } = await supabase
        .from('conversion_events')
        .select('id')
        .eq('event_type', 'form_submission')
        .like('lead_data', `%${mappedData.email}%`)
        .limit(1)
        .maybeSingle();

      if (duplicateError && duplicateError.code !== 'PGRST116') {
        console.error('❌ Erro ao verificar duplicatas:', duplicateError);
      }

      if (existingLead) {
        console.log('⚠️ Lead duplicado encontrado:', mappedData.email);
        return new Response(JSON.stringify({ 
          message: 'Lead já existe',
          duplicate: true,
          leadId: existingLead.id
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }
    }

    // Create new lead in conversion_events
    const leadEntry = {
      event_type: 'webhook_received',
      event_action: 'lead_created',
      event_category: 'webhook',
      event_label: 'lead_webhook_receiver',
      lead_data: mappedData,
      session_id: `webhook-${Date.now()}`,
      visitor_id: `webhook-visitor-${Date.now()}`,
      page_url: req.url,
      form_id: 'webhook_form',
      form_name: 'Webhook Lead Form',
      timestamp: new Date().toISOString(),
      created_at: new Date().toISOString()
    };

    const { data: newLead, error: insertError } = await supabase
      .from('conversion_events')
      .insert(leadEntry)
      .select()
      .single();

    if (insertError) {
      console.error('❌ Erro ao inserir lead:', insertError);
      throw new Error(`Erro ao criar lead: ${insertError.message}`);
    }

    console.log('✅ Lead criado com sucesso:', newLead.id);

    return new Response(JSON.stringify({
      success: true,
      message: 'Lead criado com sucesso',
      leadId: newLead.id,
      mappedData: mappedData
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error: any) {
    console.error('❌ Erro no processamento:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Erro interno do servidor'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
};

serve(handler);