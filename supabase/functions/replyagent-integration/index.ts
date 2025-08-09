import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from '../_shared/cors.ts';

const REPLYAGENT_API_BASE = 'https://ra-bcknd.com';

// Função para normalizar números de telefone
const normalizePhoneNumber = (phone: string): string => {
  // Remove todos os caracteres não numéricos
  const digits = phone.replace(/\D/g, '');
  
  // Se o número começa com código do país, remove-o para comparação
  if (digits.startsWith('55') && digits.length > 11) {
    return digits.substring(2);
  }
  
  // Se tem 11 dígitos com 9 no início (celular), mantém
  if (digits.length === 11 && digits.startsWith('9')) {
    return digits;
  }
  
  // Se tem 10 dígitos, adiciona o 9 na frente para celular
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
  // Handle CORS preflight requests
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

    const headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      ...corsHeaders
    };

    console.log(`🔄 Executando ação: ${action}`, data);
    console.log('🌐 Headers sendo enviados:', {
      'Authorization': `Bearer ${apiKey.substring(0, 10)}...`,
      'Content-Type': 'application/json'
    });

    // Primeiro, vamos testar um endpoint simples para verificar a conectividade
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

    switch (action) {
      case 'find_contact_by_phone': {
        const { phone } = data;
        
        try {
          // Buscar todos os contatos para encontrar por telefone
          const response = await fetch(`${REPLYAGENT_API_BASE}/contacts`, {
            headers
          });

          if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
          }

          const contacts: APIContact[] = await response.json();
          const normalizedSearchPhone = normalizePhoneNumber(phone);
          
          // Encontrar contato por telefone normalizado
          const contact = contacts.find(c => {
            if (!c.phone) return false;
            const normalizedContactPhone = normalizePhoneNumber(c.phone);
            return normalizedContactPhone === normalizedSearchPhone;
          });

          return new Response(JSON.stringify({
            success: true,
            contact: contact || null,
            found: !!contact
          }), {
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });

        } catch (error) {
          console.error('❌ Erro ao buscar contato:', error);
          return new Response(JSON.stringify({
            success: false,
            error: error.message,
            contact: null,
            found: false
          }), {
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          });
        }
      }

      case 'add_contact': {
        const { first_name, last_name, phone, email, company_name } = data;
        
        const contactData = {
          first_name,
          ...(last_name && { last_name }),
          ...(phone && { primary_phone_number: phone }),
          ...(email && { primary_email: email }),
          ...(company_name && { company_name })
        };

        const response = await fetch(`${REPLYAGENT_API_BASE}/contacts`, {
          method: 'POST',
          headers,
          body: JSON.stringify(contactData)
        });

        const result = await response.json();

        return new Response(JSON.stringify({
          success: response.ok,
          data: result,
          status: response.status
        }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      case 'send_smart_flow': {
        const { automation_id, contact_id } = data;
        
        const formData = new FormData();
        formData.append('automation_id', automation_id.toString());
        formData.append('contact_id', contact_id.toString());

        const response = await fetch(`${REPLYAGENT_API_BASE}/send-a-flow`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            ...corsHeaders
          },
          body: formData
        });

        const result = await response.text(); // API pode retornar texto simples

        return new Response(JSON.stringify({
          success: response.ok,
          data: result,
          status: response.status
        }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      case 'set_custom_field': {
        const { contact_id, field_value, system_name } = data;
        
        const response = await fetch(`${REPLYAGENT_API_BASE}/contacts/${contact_id}/set-custom-field`, {
          method: 'PUT',
          headers,
          body: JSON.stringify({
            field_value,
            system_name
          })
        });

        const result = await response.json();

        return new Response(JSON.stringify({
          success: response.ok,
          data: result,
          status: response.status
        }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      case 'auto_process_lead': {
        // Processamento automático do lead
        const { leadData } = data;
        
        try {
          // Tentativa com diferentes endpoints possíveis
          const possibleEndpoints = [
            `${REPLYAGENT_API_BASE}/contacts`,
            `${REPLYAGENT_API_BASE}/api/contacts`,
            `${REPLYAGENT_API_BASE}/v1/contacts`,
            `${REPLYAGENT_API_BASE}/api/v1/contacts`
          ];

          let findResponse = null;
          let workingEndpoint = null;

          for (const endpoint of possibleEndpoints) {
            console.log(`🔍 Testando endpoint: ${endpoint}`);
            try {
              const testResponse = await fetch(endpoint, { 
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${apiKey}`,
                  'Content-Type': 'application/json'
                }
              });
              console.log(`📊 Status da resposta: ${testResponse.status} ${testResponse.statusText}`);
              
              if (testResponse.status === 200 || testResponse.status === 401) {
                // 200 = sucesso, 401 = não autorizado (mas endpoint existe)
                findResponse = testResponse;
                workingEndpoint = endpoint.replace('/contacts', '');
                console.log(`✅ Endpoint encontrado: ${workingEndpoint}`);
                
                if (testResponse.status === 401) {
                  console.log('🔐 Endpoint existe mas API key pode estar incorreta');
                  throw new Error('API key incorreta ou expirada');
                }
                break;
              } else {
                const errorText = await testResponse.text();
                console.log(`❌ Endpoint falhou - Status: ${testResponse.status}, Resposta: ${errorText.substring(0, 200)}`);
              }
            } catch (err) {
              console.log(`❌ Erro no endpoint ${endpoint}:`, err.message);
            }
          }

          if (!findResponse || (!findResponse.ok && findResponse.status !== 401)) {
            console.log('🚨 NENHUM ENDPOINT FUNCIONOU - Detalhes:');
            console.log('- URL base testada:', REPLYAGENT_API_BASE);
            console.log('- API Key (primeiros 10 chars):', apiKey.substring(0, 10));
            console.log('- Endpoints testados:', possibleEndpoints);
            throw new Error(`API ReplyAgent inacessível. Verifique a URL base e a chave da API.`);
          }

          const contacts: APIContact[] = await findResponse.json();
          const normalizedSearchPhone = normalizePhoneNumber(leadData.phone);
          
          // Encontrar contato por telefone normalizado
          const existingContact = contacts.find(c => {
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
            // 2. Criar novo contato se não existir
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

            const addResponse = await fetch(`${workingEndpoint}/contacts`, {
              method: 'POST',
              headers,
              body: JSON.stringify(contactData)
            });

            const addResult = await addResponse.json();
            
            if (addResponse.ok && addResult?.id) {
              contactId = addResult.id;
              wasNewContact = true;
              console.log(`✅ Novo contato criado: ${contactId}`);
            } else {
              console.error('❌ Erro ao criar contato:', addResult);
              throw new Error('Falha ao criar contato');
            }
          }

          // 3. Configurar campos personalizados se necessário
          if (contactId && leadData.service) {
            console.log('⚙️ Configurando campos personalizados...');
            
            try {
              const customFieldResponse = await fetch(`${workingEndpoint}/contacts/${contactId}/set-custom-field`, {
                method: 'PUT',
                headers,
                body: JSON.stringify({
                  field_value: leadData.service,
                  system_name: 'service_interest'
                })
              });

              if (customFieldResponse.ok) {
                console.log('✅ Campo personalizado configurado');
              }
            } catch (fieldError) {
              console.log('⚠️ Erro ao configurar campo personalizado (continuando):', fieldError);
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

      default:
        return new Response(JSON.stringify({
          success: false,
          error: 'Ação não reconhecida'
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
    }

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