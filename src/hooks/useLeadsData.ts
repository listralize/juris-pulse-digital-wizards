import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';

interface FormLead {
  id: string;
  form_id: string | null;
  form_name: string | null;
  lead_data: any;
  status: string;
  created_at: string;
  updated_at: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  source_page: string | null;
  country: string | null;
  city: string | null;
  is_whatsapp_conversion: boolean;
  conversion_value: number;
  session_id: string;
  visitor_id: string | null;
  ip_address: string | null;
  user_agent: string | null;
  device_type: string | null;
  browser: string | null;
}

interface FormConfig {
  id: string;
  name: string;
  form_id: string;
}

interface LeadsData {
  leads: FormLead[];
  formConfigs: FormConfig[];
  isLoading: boolean;
  refreshLeads: () => Promise<void>;
  deleteLeads: (leadIds: string[]) => Promise<void>;
  updateLeadStatus: (leadId: string, status: string) => Promise<void>;
}

export const useLeadsData = (): LeadsData => {
  const [leads, setLeads] = useState<FormLead[]>([]);
  const [formConfigs, setFormConfigs] = useState<FormConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar configurações de formulários
  const loadFormConfigs = async () => {
    try {
      const { data: adminSettings, error } = await supabase
        .from('admin_settings')
        .select('form_config')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Erro ao carregar configs de formulário:', error);
        return;
      }

      if (adminSettings?.form_config) {
        const formConfig = adminSettings.form_config as any;
        
        // Verificar se há formulários configurados
        if (formConfig.forms && Array.isArray(formConfig.forms)) {
          const configs = formConfig.forms.map((form: any) => ({
            id: form.id || 'default',
            name: form.name || 'Formulário Padrão',
            form_id: form.id || 'default'
          }));
          
          setFormConfigs(configs);
          console.log('📋 Formulários configurados:', configs);
        } else {
          // Formato antigo - formulário único
          setFormConfigs([{
            id: 'default',
            name: 'Formulário Principal',
            form_id: 'default'
          }]);
        }
      } else {
        // Sem configuração - usar padrão
        setFormConfigs([{
          id: 'default',
          name: 'Formulário Principal',
          form_id: 'default'
        }]);
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    }
  };

  // Carregar leads
  const loadLeads = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('form_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao carregar leads:', error);
        toast.error('Erro ao carregar leads');
        return;
      }

      // Filtrar apenas leads válidos (não de teste específicos)
      const validLeads = (data || []).filter(lead => {
        // Filtrar apenas dados de teste muito específicos
        if (lead.session_id?.includes('test-session') ||
            (lead.lead_data as any)?.name === 'Teste ConversionFunnel') {
          return false;
        }
        
        // Verificar se tem dados válidos de lead
        if (!lead.lead_data || typeof lead.lead_data !== 'object') {
          return false;
        }
        
        const leadData = lead.lead_data as any;
        return leadData?.name || leadData?.email;
      });

      console.log('📊 Leads carregados:', validLeads.length);
      setLeads(validLeads);
    } catch (error) {
      console.error('Erro ao carregar leads:', error);
      toast.error('Erro ao carregar leads');
    } finally {
      setIsLoading(false);
    }
  };

  // Deletar leads
  const deleteLeads = async (leadIds: string[]) => {
    try {
      const { error } = await supabase
        .from('form_leads')
        .delete()
        .in('id', leadIds);

      if (error) {
        console.error('Erro ao deletar leads:', error);
        toast.error('Erro ao deletar leads');
        throw error;
      }

      setLeads(prev => prev.filter(lead => !leadIds.includes(lead.id)));
      toast.success(`${leadIds.length} lead(s) deletado(s) com sucesso!`);
    } catch (error) {
      console.error('Erro ao deletar leads:', error);
      throw error;
    }
  };

  // Atualizar status do lead
  const updateLeadStatus = async (leadId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('form_leads')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', leadId);

      if (error) {
        console.error('Erro ao atualizar status:', error);
        toast.error('Erro ao atualizar status');
        throw error;
      }

      setLeads(prev => prev.map(lead => 
        lead.id === leadId ? { ...lead, status, updated_at: new Date().toISOString() } : lead
      ));
      
      toast.success('Status atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      throw error;
    }
  };

  // Atualizar leads automaticamente
  const refreshLeads = async () => {
    await loadFormConfigs();
    await loadLeads();
  };

  useEffect(() => {
    refreshLeads();
    
    // Configurar atualização em tempo real
    const channel = supabase
      .channel('form_leads_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'form_leads'
        },
        (payload) => {
          console.log('📊 Lead atualizado em tempo real:', payload);
          refreshLeads();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    leads,
    formConfigs,
    isLoading,
    refreshLeads,
    deleteLeads,
    updateLeadStatus
  };
};