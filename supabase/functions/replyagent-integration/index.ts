import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from '../_shared/cors.ts';

const REPLYAGENT_API_BASE = 'https://ra-bcknd.com';

// Função para normalizar números de telefone
const normalizePhoneNumber = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');
  
  if (digits.startsWith('55') && digits.length > 11) {
    return digits.substring(2);
  }
  
  if (digits.length === 11 && digits.startsWith('9')) {
    return digits;
  }
  
  if (digits.length === 10) {
    return '9' + digits;
  }
  
  return digits;
};

// Interface para contato da API
interface APIContact {
  id: string;
  first_name: string;
  last_name?: string;
  phone?: string;
  email?: string;
  [key: string]: any;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('REPLYAGENT_API_KEY');
    if (!apiKey) {
      throw new Error('REPLYAGENT_API_KEY não configurada');
    }

    console.log('🔑 API Key configurada:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NÃO ENCONTRADA');

    const { action, data } = await req.json();
    console.log(`🔄 Executando ação: ${action}`, data);

    // Teste de conectividade
    if (action === 'test_connection') {
      const testUrls = [
        'https://ra-bcknd.com',
        'https://ra-bcknd.com/api',
        'https://ra-bcknd.com/v1',
        'https://ra-bcknd.com/api/v1'
      ];

      for (const testUrl of testUrls) {
        try {
          console.log(`🧪 Testando conectividade: ${testUrl}`);
          const testResponse = await fetch(testUrl, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json'
            }
          });
          console.log(`📊 Resposta de ${testUrl}: ${testResponse.status} ${testResponse.statusText}`);
          const responseText = await testResponse.text();
          console.log(`📄 Conteúdo da resposta: ${responseText.substring(0, 200)}...`);
        } catch (error) {
          console.log(`❌ Erro ao testar ${testUrl}:`, error.message);
        }
      }

      return new Response(JSON.stringify({
        success: true,
        message: 'Teste de conectividade concluído, verifique os logs'
      }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // Processamento automático do lead
    if (action === 'auto_process_lead') {
      const { leadData } = data;
      
      try {
        console.log('🔍 Iniciando processamento automático do lead...');
        
        // Testar diferentes configurações de API
        const authHeaders = [
          { 'Authorization': `Bearer ${apiKey}` },
          { 'Authorization': `Token ${apiKey}` },
          { 'X-API-Key': apiKey },
          { 'api-key': apiKey }
        ];

        const baseUrls = [
          'https://ra-bcknd.com',
          'https://ra-bcknd.com/api',
          'https://ra-bcknd.com/v1',
          'https://ra-bcknd.com/api/v1'
        ];

        let workingConfig = null;

        // Encontrar configuração que funciona
        for (const baseUrl of baseUrls) {
          for (const authHeader of authHeaders) {
            console.log(`🧪 Testando: ${baseUrl}/contacts com auth:`, Object.keys(authHeader)[0]);
            
            try {
              const testResponse = await fetch(`${baseUrl}/contacts`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  ...authHeader
                }
              });
              
              console.log(`📊 Resposta: ${testResponse.status} ${testResponse.statusText}`);
              
              if (testResponse.status === 200) {
                console.log('✅ Configuração funcionando!');
                const contacts = await testResponse.json();
                workingConfig = { baseUrl, authHeader, contacts };
                break;
              } else if (testResponse.status === 401) {
                console.log('🔐 Endpoint existe mas auth pode estar incorreta');
              } else if (testResponse.status === 404) {
                console.log('❌ Endpoint não encontrado');
              } else {
                const responseText = await testResponse.text();
                console.log(`🔍 Status ${testResponse.status}, Resposta: ${responseText.substring(0, 100)}`);
              }
            } catch (fetchError) {
              console.log(`❌ Erro de fetch: ${fetchError.message}`);
            }
          }
          
          if (workingConfig) break;
        }

        if (!workingConfig) {
          throw new Error(`API ReplyAgent inacessível. Testados ${baseUrls.length} URLs e ${authHeaders.length} formatos de auth. Verifique a URL e API key.`);
        }

        console.log(`✅ Usando configuração: ${workingConfig.baseUrl} com ${Object.keys(workingConfig.authHeader)[0]}`);

        // Buscar contato existente
        const normalizedSearchPhone = normalizePhoneNumber(leadData.phone);
        const existingContact = workingConfig.contacts.find((c: APIContact) => {
          if (!c.phone) return false;
          const normalizedContactPhone = normalizePhoneNumber(c.phone);
          return normalizedContactPhone === normalizedSearchPhone;
        });

        let contactId = null;
        let wasNewContact = false;

        if (existingContact) {
          contactId = existingContact.id;
          console.log(`✅ Contato encontrado: ${contactId}`);
        } else {
          // Criar novo contato
          console.log('📝 Criando novo contato...');
          
          const contactData = {
            first_name: leadData.name?.split(' ')[0] || 'Lead',
            ...(leadData.name?.split(' ').slice(1).join(' ') && { 
              last_name: leadData.name.split(' ').slice(1).join(' ') 
            }),
            ...(leadData.phone && { primary_phone_number: leadData.phone }),
            ...(leadData.email && { primary_email: leadData.email }),
            ...(leadData.service && { company_name: leadData.service })
          };

          const addResponse = await fetch(`${workingConfig.baseUrl}/contacts`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...workingConfig.authHeader
            },
            body: JSON.stringify(contactData)
          });

          if (addResponse.ok) {
            const addResult = await addResponse.json();
            contactId = addResult.id;
            wasNewContact = true;
            console.log(`✅ Novo contato criado: ${contactId}`);
          } else {
            const errorText = await addResponse.text();
            console.error('❌ Erro ao criar contato:', addResponse.status, errorText);
            throw new Error(`Falha ao criar contato: ${addResponse.status} - ${errorText}`);
          }
        }

        return new Response(JSON.stringify({
          success: true,
          contact_id: contactId,
          was_new_contact: wasNewContact,
          message: `Lead processado com sucesso. Contact ID: ${contactId}`
        }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });

      } catch (error) {
        console.error('❌ Erro no processamento automático:', error);
        return new Response(JSON.stringify({
          success: false,
          error: error.message
        }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
    }

    // Outras ações...
    return new Response(JSON.stringify({
      success: false,
      error: 'Ação não reconhecida'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });

  } catch (error) {
    console.error('❌ Erro na API ReplyAgent:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
});