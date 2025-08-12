import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';

interface FormLead {
  id: string;
  form_id: string | null;
  form_name: string | null;
  lead_data: any;
  event_type: string;
  event_category: string | null;
  event_action: string;
  event_label: string | null;
  conversion_value: number | null;
  created_at: string;
  timestamp: string;
  campaign_source: string | null;
  campaign_medium: string | null;
  campaign_name: string | null;
  page_url: string;
  referrer: string | null;
  session_id: string;
  visitor_id: string | null;
  user_agent: string | null;
  status?: string; // Campo local para simulação de status
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
      console.log('🔄 Carregando configurações de formulários...');
      const { data: adminSettings, error } = await supabase
        .from('admin_settings')
        .select('form_config')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      console.log('📋 Admin settings response:', { adminSettings, error });

      if (error) {
        console.error('❌ Erro ao carregar configs de formulário:', error);
        return;
      }

      if (adminSettings?.form_config) {
        const formConfig = adminSettings.form_config as any;
        console.log('📋 Form config encontrado:', formConfig);
        
        // Verificar se há formulários configurados
        if (formConfig.forms && Array.isArray(formConfig.forms)) {
          const configs = formConfig.forms.map((form: any) => ({
            id: form.id || 'default',
            name: form.name || 'Formulário Padrão',
            form_id: form.id || 'default'
          }));
          
          console.log('📋 Formulários configurados:', configs);
          setFormConfigs(configs);
        } else {
          // Formato antigo - formulário único
          const defaultConfig = [{
            id: 'default',
            name: 'Formulário Principal',
            form_id: 'default'
          }];
          console.log('📋 Usando configuração padrão:', defaultConfig);
          setFormConfigs(defaultConfig);
        }
      } else {
        // Sem configuração - usar padrão
        const defaultConfig = [{
          id: 'default',
          name: 'Formulário Principal',
          form_id: 'default'
        }];
        console.log('📋 Sem config encontrada, usando padrão:', defaultConfig);
        setFormConfigs(defaultConfig);
      }
    } catch (error) {
      console.error('❌ Erro geral ao carregar configurações:', error);
    }
  };

  // Carregar leads
  const loadLeads = async () => {
    try {
      setIsLoading(true);
      console.log('🔄 Iniciando carregamento de leads...');
      
      const { data, error } = await supabase
        .from('conversion_events')
        .select('*')
        .eq('event_type', 'form_submission')
        .order('created_at', { ascending: false });

      console.log('📊 Resposta da query conversion_events:', { data, error });

      if (error) {
        console.error('❌ Erro ao carregar leads:', error);
        toast.error('Erro ao carregar leads');
        return;
      }

      console.log('📈 Total de conversion_events encontrados:', data?.length || 0);

      // Filtrar apenas leads válidos e adicionar status padrão
      const validLeads = (data || []).filter(lead => {
        // Verificar se tem dados válidos de lead
        if (!lead.lead_data || typeof lead.lead_data !== 'object') {
          console.log('❌ Lead inválido - sem lead_data:', lead.id);
          return false;
        }
        
        const leadData = lead.lead_data as any;
        const isValid = leadData?.name || leadData?.nome || leadData?.email;
        
        if (!isValid) {
          console.log('❌ Lead inválido - sem nome/email:', lead.id, leadData);
        }
        
        return isValid;
      }).map(lead => {
        const leadData = lead.lead_data as any;
        
        // Mapear dados do stepform para formato padrão
        const mappedLeadData = {
          ...leadData,
          // Garantir que nome, email e telefone estejam no formato correto
          name: leadData.name || leadData.nome || leadData.Nome || 'Nome não informado',
          email: leadData.email || leadData.Email || 'Não informado',
          phone: leadData.phone || leadData.telefone || leadData.whatsapp || leadData.Telefone || 'Não informado',
          service: leadData.service || leadData.servico || leadData.Serviço || 'Não informado'
        };

        return {
          ...lead,
          lead_data: mappedLeadData,
          status: 'new' // Status padrão para todos os leads
        };
      });

      console.log('✅ Leads válidos após filtro:', validLeads.length);
      console.log('📋 Amostra dos leads:', validLeads.slice(0, 2));
      setLeads(validLeads);
    } catch (error) {
      console.error('❌ Erro geral ao carregar leads:', error);
      toast.error('Erro ao carregar leads');
    } finally {
      setIsLoading(false);
    }
  };

  // Deletar leads
  const deleteLeads = async (leadIds: string[]) => {
    try {
      const { error } = await supabase
        .from('conversion_events')
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

  // Atualizar status do lead (conversão de evento não tem status, mas vamos adicionar uma nota)
  const updateLeadStatus = async (leadId: string, status: string) => {
    try {
      // Para conversion_events, vamos apenas simular a atualização local
      // pois a tabela não tem campo de status
      setLeads(prev => prev.map(lead => 
        lead.id === leadId ? { ...lead, status } : lead
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
      .channel('conversion_events_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'conversion_events'
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