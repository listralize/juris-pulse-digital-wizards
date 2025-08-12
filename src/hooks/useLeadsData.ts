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

  // Carregar leads com deduplicação no servidor
  const loadLeads = async () => {
    try {
      setIsLoading(true);
      console.log('🔄 Carregando leads da tabela conversion_events...');
      
      const { data, error } = await supabase
        .from('conversion_events')
        .select('*')
        .eq('event_type', 'form_submission')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Erro ao carregar leads:', error);
        toast.error('Erro ao carregar leads');
        return;
      }

      if (!data || data.length === 0) {
        console.log('📊 Nenhum lead encontrado');
        setLeads([]);
        return;
      }

      console.log(`📈 Total de conversion_events encontrados: ${data.length}`);

      // Processar e dedupplicar leads
      const leadMap = new Map<string, any>();
      
      for (const lead of data) {
        if (!lead.lead_data || typeof lead.lead_data !== 'object') {
          continue;
        }
        
        const leadData = lead.lead_data as any;
        const name = leadData.name || leadData.nome || leadData.Nome || '';
        const email = leadData.email || leadData.Email || '';
        const phone = leadData.phone || leadData.telefone || leadData.whatsapp || leadData.Telefone || '';
        
        // Pelo menos nome ou email deve existir
        if (!name && !email) {
          continue;
        }
        
        // Chave para deduplicação (email ou telefone se disponível)
        const key = email || phone || name;
        
        // Se já existe, manter o mais recente
        if (leadMap.has(key)) {
          const existingLead = leadMap.get(key);
          const existingTime = new Date(existingLead.created_at).getTime();
          const currentTime = new Date(lead.created_at).getTime();
          
          if (currentTime > existingTime) {
            const timeDiff = currentTime - existingTime;
            console.log(`🔄 Duplicata removida: ${key} (diferença: ${timeDiff}ms)`);
            leadMap.set(key, lead);
          }
        } else {
          leadMap.set(key, lead);
        }
      }

      // Converter mapa para array e processar dados
      const processedLeads = Array.from(leadMap.values()).map(lead => {
        const leadData = lead.lead_data as any;
        
        // Mapear e normalizar dados
        const mappedLeadData = {
          ...leadData,
          name: leadData.name || leadData.nome || leadData.Nome || 'N/A',
          email: leadData.email || leadData.Email || 'N/A', 
          phone: leadData.phone || leadData.telefone || leadData.whatsapp || leadData.Telefone || 'N/A',
          service: leadData.service || leadData.servico || leadData.Serviço || lead.form_name || 'Não informado'
        };

        return {
          ...lead,
          lead_data: mappedLeadData,
          status: 'new'
        };
      });

      console.log(`✅ Leads processados: ${data.length} -> ${processedLeads.length} (após deduplicação)`);
      setLeads(processedLeads);
      
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
    let isMounted = true;
    
    const initializeData = async () => {
      if (isMounted) {
        await refreshLeads();
      }
    };
    
    initializeData();
    
    // Configurar atualização em tempo real (sem auto-refresh)
    const channel = supabase
      .channel('conversion_events_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'conversion_events'
        },
        (payload) => {
          console.log('📊 Novo lead recebido:', payload);
          if (isMounted) {
            refreshLeads();
          }
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
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