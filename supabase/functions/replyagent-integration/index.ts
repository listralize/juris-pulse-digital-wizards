import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from '../_shared/cors.ts';

const REPLYAGENT_API_BASE = 'https://ra-bcknd.com/api';

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

    const { action, data } = await req.json();

    const headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      ...corsHeaders
    };

    console.log(`🔄 Executando ação: ${action}`, data);

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
          // 1. Buscar contato existente por telefone
          const findResponse = await fetch(`${REPLYAGENT_API_BASE}/contacts`, {
            headers
          });

          if (!findResponse.ok) {
            throw new Error(`Erro na API: ${findResponse.status}`);
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

            const addResponse = await fetch(`${REPLYAGENT_API_BASE}/contacts`, {
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
              const customFieldResponse = await fetch(`${REPLYAGENT_API_BASE}/contacts/${contactId}/set-custom-field`, {
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