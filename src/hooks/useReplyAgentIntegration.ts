import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface LeadData {
  name: string;
  email: string;
  phone: string;
  service?: string;
  message?: string;
  urgent?: boolean;
}

interface ReplyAgentResponse {
  success: boolean;
  data?: any;
  error?: string;
  contact_id?: string;
  found?: boolean;
  contact?: any;
  was_new_contact?: boolean;
  message?: string;
}

export const useReplyAgentIntegration = () => {
  const [isLoading, setIsLoading] = useState(false);

  const callReplyAgentAPI = async (action: string, data: any): Promise<ReplyAgentResponse> => {
    try {
      const { data: result, error } = await supabase.functions.invoke('replyagent-integration', {
        body: { action, data }
      });

      if (error) {
        throw new Error(error.message);
      }

      return result;
    } catch (error) {
      console.error(`❌ Erro na API ReplyAgent (${action}):`, error);
      throw error;
    }
  };

  // Buscar contato existente por telefone
  const findContactByPhone = async (phone: string): Promise<{ found: boolean; contact: any | null }> => {
    setIsLoading(true);
    try {
      const result = await callReplyAgentAPI('find_contact_by_phone', { phone });
      
      if (result.success) {
        return {
          found: result.found || false,
          contact: result.contact || null
        };
      } else {
        throw new Error(result.error || 'Erro ao buscar contato');
      }
    } catch (error) {
      console.error('❌ Erro ao buscar contato:', error);
      toast.error('Erro ao buscar contato na API');
      return { found: false, contact: null };
    } finally {
      setIsLoading(false);
    }
  };

  // Adicionar novo contato
  const addContact = async (leadData: LeadData): Promise<{ success: boolean; contact_id?: string }> => {
    setIsLoading(true);
    try {
      const nameParts = leadData.name.split(' ');
      const result = await callReplyAgentAPI('add_contact', {
        first_name: nameParts[0] || 'Lead',
        last_name: nameParts.slice(1).join(' ') || '',
        phone: leadData.phone,
        email: leadData.email,
        company_name: leadData.service
      });

      if (result.success && result.data?.id) {
        toast.success('Contato adicionado com sucesso!');
        return {
          success: true,
          contact_id: result.data.id
        };
      } else {
        throw new Error(result.error || 'Erro ao adicionar contato');
      }
    } catch (error) {
      console.error('❌ Erro ao adicionar contato:', error);
      toast.error('Erro ao adicionar contato na API');
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  // Enviar Smart Flow
  const sendSmartFlow = async (automationId: string, contactId: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const result = await callReplyAgentAPI('send_smart_flow', {
        automation_id: automationId,
        contact_id: contactId
      });

      if (result.success) {
        toast.success('Smart Flow enviado com sucesso!');
        return true;
      } else {
        throw new Error(result.error || 'Erro ao enviar Smart Flow');
      }
    } catch (error) {
      console.error('❌ Erro ao enviar Smart Flow:', error);
      toast.error('Erro ao enviar Smart Flow');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Definir campo personalizado
  const setCustomField = async (contactId: string, fieldValue: string, systemName: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const result = await callReplyAgentAPI('set_custom_field', {
        contact_id: contactId,
        field_value: fieldValue,
        system_name: systemName
      });

      if (result.success) {
        toast.success('Campo personalizado definido com sucesso!');
        return true;
      } else {
        throw new Error(result.error || 'Erro ao definir campo personalizado');
      }
    } catch (error) {
      console.error('❌ Erro ao definir campo personalizado:', error);
      toast.error('Erro ao definir campo personalizado');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Processamento automático completo do lead
  const autoProcessLead = async (leadData: LeadData): Promise<{ success: boolean; contact_id?: string; was_new_contact?: boolean }> => {
    setIsLoading(true);
    try {
      const result = await callReplyAgentAPI('auto_process_lead', { leadData });

      if (result.success) {
        const message = result.was_new_contact 
          ? `Novo contato criado e processado! ID: ${result.contact_id}`
          : `Contato existente encontrado e atualizado! ID: ${result.contact_id}`;
        
        toast.success(message);
        
        return {
          success: true,
          contact_id: result.contact_id,
          was_new_contact: result.was_new_contact
        };
      } else {
        throw new Error(result.error || 'Erro no processamento automático');
      }
    } catch (error) {
      console.error('❌ Erro no processamento automático:', error);
      toast.error('Erro no processamento automático do lead');
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    findContactByPhone,
    addContact,
    sendSmartFlow,
    setCustomField,
    autoProcessLead
  };
};