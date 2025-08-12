import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Download, Eye, FileText, Filter, Mail, Phone, Search, Table, Users, Send, MessageSquare, UserPlus, Webhook, ChevronLeft, ChevronRight, Edit, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BulkEmailSender } from './BulkEmailSender';
import { ContactImporter } from './ContactImporter';
import { LeadWebhookManager } from './LeadWebhookManager';
import { LeadsKanban } from './LeadsKanban';
import { LeadComments } from './LeadComments';
import { LeadDetailDialog } from './LeadDetailDialog';
import { ResponsiveLeadsTable } from './ResponsiveLeadsTable';

// Interface do lead
interface Lead {
  id: string;
  lead_data: any;
  event_type: string;
  event_action: string;
  session_id: string;
  visitor_id?: string;
  form_id?: string;
  form_name?: string;
  page_url?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  created_at: string;
  state?: string;
  capital?: string;
  region?: string;
  ddd?: number;
  ddd_locations?: {
    cities?: string;
  };
}

// Interface para lead editável
interface EditableLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  urgent: boolean;
}

export const LeadsManagement: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [formFilter, setFormFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const [currentView, setCurrentView] = useState<'table' | 'kanban'>('table');
  const [customDateStart, setCustomDateStart] = useState('');
  const [customDateEnd, setCustomDateEnd] = useState('');
  const [editingLead, setEditingLead] = useState<string | null>(null);
  const [editableData, setEditableData] = useState<{ [key: string]: EditableLead }>({});
  const [kanbanCurrentPage, setKanbanCurrentPage] = useState(1);
  const [kanbanLeadsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [leadsPerPage] = useState(10);
  const [leadStatuses, setLeadStatuses] = useState<{ [key: string]: string }>({});
  const [leadStatusDates, setLeadStatusDates] = useState<{ [key: string]: { status: string, updated_at: string } }>({});
  const [emailTemplates, setEmailTemplates] = useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);
  const [isContactImporterOpen, setIsContactImporterOpen] = useState(false);
  const [isLeadWebhookManagerOpen, setIsLeadWebhookManagerOpen] = useState(false);
  const [availableServices, setAvailableServices] = useState<string[]>([]);
  const [isProcessingAll, setIsProcessingAll] = useState(false);

  // Função para buscar localização baseada no DDD
  const getLocationByDDD = async (ddd: number) => {
    try {
      const { data, error } = await supabase
        .from('ddd_locations')
        .select('state_name, capital, region')
        .eq('ddd', ddd)
        .maybeSingle();
      
      if (error) {
        console.error('Erro ao buscar localização por DDD:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Erro ao buscar localização por DDD:', error);
      return null;
    }
  };

  // Helper para parsear dados do lead (assíncrono)
  const parseLeadData = async (leadData: any) => {
    try {
      if (typeof leadData === 'string') {
        leadData = JSON.parse(leadData);
      }
      
      // Extrair dados de diferentes estruturas
      let extractedData = {
        name: 'Nome não informado',
        email: 'Email não informado', 
        phone: 'N/A',
        service: 'N/A',
        message: '',
        urgent: false,
        ddd: null as number | null,
        state: null as string | null,
        capital: null as string | null,
        region: null as string | null
      };

      // Tentar extrair nome
      extractedData.name = leadData?.name || leadData?.nome || leadData?.Name || 
                          leadData?.userName || leadData?.user_name || 
                          leadData?.fullName || leadData?.full_name || 'Nome não informado';

      // Tentar extrair email
      extractedData.email = leadData?.email || leadData?.Email || 
                           leadData?.userEmail || leadData?.user_email || 'Email não informado';

      // Tentar extrair telefone - parsing mais abrangente para stepform
      const phoneFields = [
        leadData?.phone, leadData?.telefone, leadData?.Phone, leadData?.Telefone,
        leadData?.['Telefone/WhatsApp'], leadData?.whatsapp, leadData?.Whatsapp,
        leadData?.phoneNumber, leadData?.phone_number, leadData?.userPhone, 
        leadData?.user_phone, leadData?.tel, leadData?.celular
      ];
      
      // Primeiro tentar campos diretos
      let foundPhone = phoneFields.find(field => 
        field && typeof field === 'string' && field.trim() !== '' && field !== 'N/A'
      );

      if (!foundPhone && typeof leadData === 'object') {
        // Primeiro verificar em respostas_mapeadas para stepform
        if (leadData?.respostas_mapeadas) {
          const mappedEntries = Object.entries(leadData.respostas_mapeadas);
          for (const [key, value] of mappedEntries) {
            if (typeof value === 'string' && value.trim() !== '') {
              // Verificar se é um campo que pode conter telefone
              if (key.toLowerCase().includes('telefone') || 
                  key.toLowerCase().includes('phone') ||
                  key.toLowerCase().includes('whatsapp') ||
                  key.toLowerCase().includes('tel') ||
                  key.toLowerCase().includes('celular') ||
                  /^\(?[\d\s\-\(\)+]{10,}$/.test(value)) {
                const cleanPhone = value.replace(/\D/g, '');
                if (cleanPhone.length >= 10) {
                  foundPhone = value;
                  break;
                }
              }
            }
          }
        }
        
        // Se ainda não encontrou, verificar nos campos diretos
        if (!foundPhone) {
          const stepFormFields = Object.entries(leadData || {});
          for (const [key, value] of stepFormFields) {
            if (typeof value === 'string' && value.trim() !== '') {
              // Verificar se é um campo que pode conter telefone
              if (key.toLowerCase().includes('telefone') || 
                  key.toLowerCase().includes('phone') ||
                  key.toLowerCase().includes('whatsapp') ||
                  key.toLowerCase().includes('tel') ||
                  key.toLowerCase().includes('celular') ||
                  /^\(?[\d\s\-\(\)+]{10,}$/.test(value)) {
                const cleanPhone = value.replace(/\D/g, '');
                if (cleanPhone.length >= 10) {
                  foundPhone = value;
                  break;
                }
              }
            }
          }
        }
      }
      
      extractedData.phone = foundPhone || 'N/A';

      // Extrair DDD e localização se temos telefone
      if (foundPhone && foundPhone !== 'N/A') {
        const phoneNumbers = foundPhone.replace(/\D/g, '');
        let ddd = null;
        
        // Extrair DDD baseado no tamanho do número
        if (phoneNumbers.length >= 10) {
          if (phoneNumbers.startsWith('55') && phoneNumbers.length >= 12) {
            // Número com código do país (55)
            ddd = parseInt(phoneNumbers.substring(2, 4));
          } else {
            // Número sem código do país
            ddd = parseInt(phoneNumbers.substring(0, 2));
          }
          
          // Validar se é um DDD válido (11-99)
          if (ddd >= 11 && ddd <= 99) {
            extractedData.ddd = ddd;
            
            // Buscar localização no banco de dados
            try {
              const { data: locationData } = await supabase
                .from('ddd_locations')
                .select('state_name, capital, region')
                .eq('ddd', ddd)
                .maybeSingle();
              
              if (locationData) {
                extractedData.state = locationData.state_name;
                extractedData.capital = locationData.capital;
                extractedData.region = locationData.region;
              }
            } catch (error) {
              console.error('Erro ao buscar localização:', error);
            }
          }
        }
      }

      // Tentar extrair serviço
      extractedData.service = leadData?.service || leadData?.servico || leadData?.Service || 
                             leadData?.serviceType || leadData?.service_type || 
                             leadData?.category || leadData?.categoria || 'N/A';

      // Tentar extrair mensagem
      extractedData.message = leadData?.message || leadData?.mensagem || leadData?.Message || 
                             leadData?.description || leadData?.descricao || 
                             leadData?.comment || leadData?.comentario || '';

      // Tentar extrair urgência
      extractedData.urgent = leadData?.urgent || leadData?.urgente || false;

      return extractedData;
    } catch (error) {
      console.error('Erro ao parsear lead_data:', error);
      return {
        name: 'Erro ao carregar dados',
        email: 'Erro ao carregar dados',
        phone: 'N/A',
        service: 'N/A',
        message: '',
        urgent: false,
        ddd: null,
        state: null,
        capital: null,
        region: null
      };
    }
  };

  // Carregar leads e status do kanban
  const loadLeads = async () => {
    try {
      setIsLoading(true);
      console.log('🔄 Carregando leads da tabela conversion_events...');
      
      const { data: leadsData, error: leadsError } = await supabase
        .from('conversion_events')
        .select('id, event_type, event_action, session_id, visitor_id, form_id, form_name, page_url, referrer, created_at, lead_data, state, capital, region, ddd')
        .in('event_type', ['form_submission', 'webhook_received'])
        .order('created_at', { ascending: false });

      if (leadsError) {
        console.error('❌ Erro ao carregar leads:', leadsError);
        toast.error('Erro ao carregar leads');
        setLeads([]);
        return;
      }

      // Buscar informações de cidades para os DDDs
      const ddds = [...new Set(leadsData?.map(lead => lead.ddd).filter(Boolean))];
      let dddLocationsMap = new Map();
      
      if (ddds.length > 0) {
        const { data: dddData } = await supabase
          .from('ddd_locations')
          .select('ddd, cities')
          .in('ddd', ddds);
        
        if (dddData) {
          dddData.forEach(location => {
            dddLocationsMap.set(location.ddd, location.cities);
          });
        }
      }

      // Enriquecer os leads com informações de cidade
      const enrichedLeads = leadsData?.map(lead => ({
        ...lead,
        ddd_locations: lead.ddd ? { cities: dddLocationsMap.get(lead.ddd) } : null
      })) || [];

      // Processar e enriquecer dados
      const processedLeads = enrichedLeads.map(lead => {
        const leadData = lead.lead_data;
        let parsedData = leadData;
        
        if (typeof leadData === 'string') {
          try {
            parsedData = JSON.parse(leadData);
          } catch (e) {
            console.error('Erro ao fazer parse do lead_data:', e);
          }
        }
        
        return { ...lead, lead_data: parsedData };
      });

      // Remover duplicatas baseado em email/telefone apenas se intervalo <= 30 segundos
      const deduplicatedLeads: any[] = [];
      const seenLeads = new Map<string, any>();

      for (const lead of processedLeads) {
        const leadData = await parseLeadData(lead.lead_data);
        const email = leadData.email?.toLowerCase() || '';
        const phone = leadData.phone?.replace(/\D/g, '') || '';
        const key = email || phone;
        
        if (key && seenLeads.has(key)) {
          const existingLead = seenLeads.get(key);
          const timeDiff = Math.abs(new Date(lead.created_at).getTime() - new Date(existingLead.created_at).getTime());
          
          // Se diferença for <= 30 segundos (30000ms), considerar duplicata
          if (timeDiff <= 30000) {
            console.log(`🔄 Duplicata removida: ${key} (diferença: ${timeDiff}ms)`);
            continue; // Pular este lead duplicado
          }
        }
        
        deduplicatedLeads.push(lead);
        if (key) {
          seenLeads.set(key, lead);
        }
      }

      console.log(`✅ Leads processados: ${enrichedLeads?.length || 0} -> ${deduplicatedLeads.length} (após deduplicação)`);
      
      // Carregar status dos leads com suas datas de atualização
      const { data: statusData, error: statusError } = await supabase
        .from('lead_status')
        .select('*');

      if (statusError) {
        console.error('❌ Erro ao carregar status:', statusError);
      }

      // Mapear status e suas datas de atualização
      const statusMap: { [key: string]: string } = {};
      const statusDatesMap: { [key: string]: { status: string, updated_at: string } } = {};
      statusData?.forEach(status => {
        statusMap[status.lead_id] = status.status;
        statusDatesMap[status.lead_id] = {
          status: status.status,
          updated_at: status.updated_at
        };
      });

      console.log('📊 Status carregados:', statusDatesMap);

      // Extrair serviços únicos dos leads
      const servicesSet = new Set<string>();
      for (const lead of deduplicatedLeads) {
        const leadData = await parseLeadData(lead.lead_data);
        if (leadData.service && leadData.service !== 'N/A') {
          servicesSet.add(leadData.service);
        }
      }
      setAvailableServices(Array.from(servicesSet).sort());

      setLeads(deduplicatedLeads);
      setFilteredLeads(deduplicatedLeads);
      setLeadStatuses(statusMap);
      setLeadStatusDates(statusDatesMap);
    } catch (error) {
      console.error('❌ Erro geral:', error);
      toast.error('Erro ao carregar leads');
    } finally {
      setIsLoading(false);
    }
  };


  // Gerar HTML completo do email
  const generateEmailHTML = (template: any, leadData: any) => {
    if (!template.custom_html || template.custom_html.trim() === '') {
      // Usar template padrão se não há HTML customizado
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${template.title || 'Email'}</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: ${template.background_color || '#000000'}; font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: ${template.background_color || '#000000'}; color: ${template.text_color || '#ffffff'};">
            <div style="background: linear-gradient(135deg, #1a1a1a, #333333); padding: 40px 20px; text-align: center;">
              ${template.logo_url ? `<img src="${template.logo_url}" alt="Logo" style="max-width: 200px; height: auto; display: block; margin: 0 auto 20px;" />` : ''}
              <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: ${template.text_color || '#ffffff'};">
                ${template.title || 'Obrigado pelo seu contato!'}
              </h1>
            </div>
            <div style="padding: 30px 20px; background-color: #111111;">
              <p style="font-size: 18px; margin: 0 0 20px 0; color: ${template.text_color || '#ffffff'};">
                Olá <strong style="color: ${template.button_color || '#4CAF50'};">${leadData.name || 'Cliente'}</strong>,
              </p>
              <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px 0; color: ${template.text_color || '#ffffff'};">
                ${(template.content || '').replace(/{name}/g, leadData.name || 'Cliente').replace(/{service}/g, leadData.service || 'Consultoria Jurídica')}
              </p>
              ${template.button_text && template.button_url ? `
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${template.button_url}" style="display: inline-block; background-color: ${template.button_color || '#4CAF50'}; color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                    ${template.button_text}
                  </a>
                </div>
              ` : ''}
            </div>
          </div>
        </body>
        </html>
      `;
    }
    
    // Usar HTML customizado e substituir variáveis
    return template.custom_html
      .replace(/{name}/g, leadData.name || 'Cliente')
      .replace(/{service}/g, leadData.service || 'Consultoria Jurídica')
      .replace(/{message}/g, leadData.message || '')
      .replace(/{email}/g, leadData.email || '')
      .replace(/{phone}/g, leadData.phone || '')
      .replace(/{date}/g, new Date().toLocaleDateString('pt-BR'))
      .replace(/{time}/g, new Date().toLocaleTimeString('pt-BR'));
  };

  // Carregar templates de email
  const loadEmailTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Erro ao carregar templates:', error);
        return;
      }

      setEmailTemplates(data || []);
      
      // Selecionar template padrão
      const defaultTemplate = data?.find(t => t.is_default) || data?.[0];
      setSelectedTemplate(defaultTemplate);
    } catch (error) {
      console.error('❌ Erro ao carregar templates:', error);
    }
  };

  // Salvar status do lead no banco
  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      console.log(`🔄 Atualizando status do lead ${leadId} para ${newStatus}`);
      
      // Verificar se já existe um status para este lead
      const { data: existingStatus, error: checkError } = await supabase
        .from('lead_status')
        .select('id')
        .eq('lead_id', leadId)
        .maybeSingle();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('❌ Erro ao verificar status existente:', checkError);
        toast.error('Erro ao verificar status do lead');
        return false;
      }

      if (existingStatus) {
        // Atualizar status existente
        const { error } = await supabase
          .from('lead_status')
          .update({
            status: newStatus,
            updated_at: new Date().toISOString()
          })
          .eq('lead_id', leadId);

        if (error) {
          console.error('❌ Erro ao atualizar status:', error);
          toast.error('Erro ao atualizar status do lead');
          return false;
        }
      } else {
        // Criar novo status
        const { error } = await supabase
          .from('lead_status')
          .insert({
            lead_id: leadId,
            status: newStatus,
            updated_by: null
          });

        if (error) {
          console.error('❌ Erro ao criar status:', error);
          toast.error('Erro ao criar status do lead');
          return false;
        }
      }

      // Atualizar estado local
      setLeadStatuses(prev => ({
        ...prev,
        [leadId]: newStatus
      }));
      
      // Atualizar também as datas dos status
      setLeadStatusDates(prev => ({
        ...prev,
        [leadId]: {
          status: newStatus,
          updated_at: new Date().toISOString()
        }
      }));

      toast.success(`Status atualizado para: ${newStatus}!`);
      return true;
    } catch (error) {
      console.error('❌ Erro ao atualizar status:', error);
      toast.error('Erro ao atualizar status');
    }
  };

  // Enviar email personalizado
  const sendCustomEmail = async (lead: Lead, templateId?: string) => {
    const template = templateId ? emailTemplates.find(t => t.id === templateId) : selectedTemplate;
    
    if (!template) {
      toast.error('Selecione um template de email');
      return;
    }

    try {
      const leadData = await parseLeadData(lead.lead_data);
      
      if (!leadData.email) {
        toast.error('Email do lead não encontrado');
        return;
      }

      console.log('📧 Enviando email personalizado:', {
        to: leadData.email,
        template: template.name,
        lead: leadData.name
      });

      // Gerar HTML completo do template
      const fullHtml = generateEmailHTML(template, leadData);
      
      const { data, error } = await supabase.functions.invoke('send-smtp-email', {
        body: {
          to: leadData.email,
          subject: template.subject.replace('{name}', leadData.name || ''),
          name: leadData.name || 'Cliente',
          service: leadData.service || 'Consultoria Jurídica',
          message: leadData.message || '',
          customHtml: fullHtml // Enviar o HTML completo
        }
      });

      if (error) {
        console.error('❌ Erro ao enviar email:', error);
        toast.error(`Erro ao enviar email: ${error.message}`);
        return;
      }

      console.log('✅ Email enviado:', data);
      toast.success('Email enviado com sucesso!');
    } catch (error) {
      console.error('❌ Erro ao enviar email:', error);
      toast.error('Erro ao enviar email');
    }
  };

  // Enviar emails em massa
  const sendBulkEmails = async () => {
    if (selectedLeads.size === 0) {
      toast.error('Selecione pelo menos um lead');
      return;
    }

    if (!selectedTemplate) {
      toast.error('Selecione um template de email');
      return;
    }

    const confirmation = window.confirm(`Deseja enviar emails para ${selectedLeads.size} leads selecionados?`);
    if (!confirmation) return;

    try {
      let successCount = 0;
      let errorCount = 0;

      for (const leadId of selectedLeads) {
        const lead = leads.find(l => l.id === leadId);
        if (!lead) continue;

        try {
          await sendCustomEmail(lead);
          successCount++;
          await new Promise(resolve => setTimeout(resolve, 1000)); // Delay entre emails
        } catch (error) {
          console.error(`❌ Erro ao enviar email para lead ${leadId}:`, error);
          errorCount++;
        }
      }

      toast.success(`Emails enviados: ${successCount} sucessos, ${errorCount} erros`);
      setSelectedLeads(new Set());
    } catch (error) {
      console.error('❌ Erro no envio em massa:', error);
      toast.error('Erro no envio em massa');
    }
  };

  // Excluir leads selecionados
  const deleteSelected = async () => {
    if (selectedLeads.size === 0) return;

    const confirmation = window.confirm(`Deseja excluir ${selectedLeads.size} leads selecionados?`);
    if (!confirmation) return;

    try {
      const { error } = await supabase
        .from('conversion_events')
        .delete()
        .in('id', Array.from(selectedLeads));

      if (error) {
        console.error('❌ Erro ao excluir leads:', error);
        toast.error('Erro ao excluir leads');
        return;
      }

      toast.success(`${selectedLeads.size} leads excluídos com sucesso!`);
      setSelectedLeads(new Set());
      loadLeads();
    } catch (error) {
      console.error('❌ Erro ao excluir leads:', error);
      toast.error('Erro ao excluir leads');
    }
  };

  // Exportar leads
  const exportLeads = async () => {
    if (filteredLeads.length === 0) {
      toast.error('Não há leads para exportar');
      return;
    }

    const csvData = [];
    for (const lead of filteredLeads) {
      const leadData = await parseLeadData(lead.lead_data);
      csvData.push({
        'Nome': leadData.name || '',
        'Email': leadData.email || '',
        'Telefone': leadData.phone || '',
        'Serviço': leadData.service || '',
        'Mensagem': leadData.message || '',
        'Data': new Date(lead.created_at).toLocaleString('pt-BR'),
        'Página': lead.page_url || '',
        'Origem': lead.referrer || '',
        'Status': leadStatuses[lead.id] || 'novo'
      });
    }

    const headers = Object.keys(csvData[0]).join(',');
    const rows = csvData.map(row => Object.values(row).map(value => `"${value}"`).join(','));
    const csv = [headers, ...rows].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Leads exportados com sucesso!');
  };

  // Filtrar leads
  useEffect(() => {
    const filterLeads = async () => {
      let filtered = [...leads];

      // Filtro de busca
      if (searchQuery) {
        const filteredPromises = await Promise.all(filtered.map(async (lead) => {
          const leadData = await parseLeadData(lead.lead_data);
          const searchLower = searchQuery.toLowerCase();
          const matches = (
            leadData.name?.toLowerCase().includes(searchLower) ||
            leadData.email?.toLowerCase().includes(searchLower) ||
            leadData.phone?.includes(searchQuery) ||
            leadData.service?.toLowerCase().includes(searchLower)
          );
          return matches ? lead : null;
        }));
        
        filtered = filteredPromises.filter(lead => lead !== null) as Lead[];
      }

      // Filtro de data - corrigindo para timezone local
      if (dateFilter !== 'all') {
        const now = new Date();
        let startDate: Date;
        let endDate: Date | null = null;

        switch (dateFilter) {
          case 'today':
            // Usar exatamente o dia atual no timezone local
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
            endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
            break;
          case 'week':
            // Últimos 7 dias
            const weekStart = new Date(now);
            weekStart.setDate(now.getDate() - 6); // Últimos 7 dias incluindo hoje
            weekStart.setHours(0, 0, 0, 0);
            startDate = weekStart;
            endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
            break;
          case 'month':
            // Mês atual
            startDate = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
            endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
            break;
          case 'custom':
            if (customDateStart && customDateEnd) {
              // Parseamento manual para evitar problemas de timezone
              const startParts = customDateStart.split('-');
              const endParts = customDateEnd.split('-');
              
              startDate = new Date(
                parseInt(startParts[0]), 
                parseInt(startParts[1]) - 1, 
                parseInt(startParts[2]), 
                0, 0, 0, 0
              );
              endDate = new Date(
                parseInt(endParts[0]), 
                parseInt(endParts[1]) - 1, 
                parseInt(endParts[2]), 
                23, 59, 59, 999
              );
            } else {
              startDate = new Date(0);
            }
            break;
          default:
            startDate = new Date(0);
        }

        filtered = filtered.filter(lead => {
          const leadDate = new Date(lead.created_at);
          const inRange = endDate ? 
            (leadDate >= startDate && leadDate <= endDate) : 
            (leadDate >= startDate);
          
          return inRange;
        });
      }

      // Filtro por serviço
      if (serviceFilter !== 'all') {
        const serviceFilteredPromises = await Promise.all(filtered.map(async (lead) => {
          const leadData = await parseLeadData(lead.lead_data);
          return leadData.service === serviceFilter ? lead : null;
        }));
        
        filtered = serviceFilteredPromises.filter(lead => lead !== null) as Lead[];
      }

      setFilteredLeads(filtered);
      setCurrentPage(1); // Reset para primeira página quando filtros mudam
      setKanbanCurrentPage(1); // Reset página do kanban
    };

    filterLeads();
  }, [leads, searchQuery, dateFilter, serviceFilter, customDateStart, customDateEnd]);

  // Carregar dados iniciais
  useEffect(() => {
    loadLeads();
    loadEmailTemplates();
  }, []);

  // Função para abrir detalhes do lead
  const openLeadDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDetailSheetOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Carregando leads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Gestão de Leads</h2>
        </div>

        <div className="flex items-center gap-2 flex-wrap">

          <Button
            variant={currentView === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCurrentView('table')}
          >
            <Table className="h-4 w-4 mr-2" />
            Tabela
          </Button>
          <Button
            variant={currentView === 'kanban' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCurrentView('kanban')}
          >
            <Eye className="h-4 w-4 mr-2" />
            Kanban
          </Button>
          
              <Button 
                variant="outline" 
                onClick={() => setIsContactImporterOpen(true)}
                className="flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Gerenciar Contatos
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsLeadWebhookManagerOpen(true)}
                className="flex items-center gap-2"
              >
                <Webhook className="w-4 h-4" />
                Sistema de Webhook para Leads
              </Button>
          
          <Button onClick={exportLeads} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
          
          <BulkEmailSender
            selectedLeads={selectedLeads}
            leads={leads}
            emailTemplates={emailTemplates}
            onEmailsSent={() => setSelectedLeads(new Set())}
          />
          
          {selectedLeads.size > 0 && (
            <Button onClick={deleteSelected} variant="destructive" size="sm">
              Excluir ({selectedLeads.size})
            </Button>
          )}
        </div>
      </div>

      {/* Filtros */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por data" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as datas</SelectItem>
            <SelectItem value="today">Hoje</SelectItem>
            <SelectItem value="week">Esta semana</SelectItem>
            <SelectItem value="month">Este mês</SelectItem>
            <SelectItem value="custom">Personalizado</SelectItem>
          </SelectContent>
        </Select>

        {dateFilter === 'custom' && (
          <div className="flex gap-2 items-center">
            <input
              type="date"
              value={customDateStart}
              onChange={(e) => setCustomDateStart(e.target.value)}
              className="h-10 px-3 text-sm border rounded"
              placeholder="Data inicial"
            />
            <span className="text-sm">até</span>
            <input
              type="date"
              value={customDateEnd}
              onChange={(e) => setCustomDateEnd(e.target.value)}
              className="h-10 px-3 text-sm border rounded"
              placeholder="Data final"
            />
          </div>
        )}

        <Select value={serviceFilter} onValueChange={setServiceFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por serviço" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os serviços</SelectItem>
            {availableServices.map(service => (
              <SelectItem key={service} value={service}>
                {service}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={() => {
          setSearchQuery('');
          setDateFilter('all');
          setServiceFilter('all');
        }}>
          <Filter className="h-4 w-4 mr-2" />
          Limpar Filtros
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leads.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Período Filtrado</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredLeads.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {dateFilter === 'all' ? 'Todos os períodos' : 
               dateFilter === 'today' ? 'Hoje' :
               dateFilter === 'week' ? 'Últimos 7 dias' :
               dateFilter === 'month' ? 'Este mês' :
               dateFilter === 'custom' && customDateStart && customDateEnd ? 
                 `${new Date(customDateStart).toLocaleDateString('pt-BR')} - ${new Date(customDateEnd).toLocaleDateString('pt-BR')}` :
                 'Período personalizado'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Contato (Período)</CardTitle>
            <Badge variant="default">Contato</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(() => {
                let contactCount = 0;
                
                if (dateFilter === 'all') {
                  // Se não há filtro de data, mostrar todos os "Em Contato"
                  contactCount = leads.filter(lead => leadStatuses[lead.id] === 'contato').length;
                } else {
                  // Para período específico, verificar se o status foi alterado no período
                  const now = new Date();
                  let startDate: Date;
                  let endDate: Date;

                  switch (dateFilter) {
                    case 'today':
                      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
                      break;
                    case 'week':
                      const weekStart = new Date(now);
                      weekStart.setDate(now.getDate() - 7);
                      weekStart.setHours(0, 0, 0, 0);
                      startDate = weekStart;
                      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
                      break;
                    case 'month':
                      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
                      break;
                     case 'custom':
                       if (customDateStart && customDateEnd) {
                         // Parseamento manual para evitar problema de timezone
                         const startParts = customDateStart.split('-');
                         const endParts = customDateEnd.split('-');
                         
                         startDate = new Date(
                           parseInt(startParts[0]), 
                           parseInt(startParts[1]) - 1, 
                           parseInt(startParts[2]), 
                           0, 0, 0, 0
                         );
                         endDate = new Date(
                           parseInt(endParts[0]), 
                           parseInt(endParts[1]) - 1, 
                           parseInt(endParts[2]), 
                           23, 59, 59, 999
                         );
                       } else {
                         startDate = new Date(0);
                         endDate = new Date();
                       }
                       break;
                    default:
                      startDate = new Date(0);
                      endDate = new Date();
                  }

                  // Filtrar pelos status que foram alterados no período
                  contactCount = Object.entries(leadStatusDates).filter(([leadId, statusInfo]) => {
                    if (statusInfo.status !== 'contato') return false;
                    const statusDate = new Date(statusInfo.updated_at);
                    return statusDate >= startDate && statusDate <= endDate;
                  }).length;
                }
                
                return contactCount;
              })()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Convertidos (Período)</CardTitle>
            <Badge variant="outline">Convertido</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(() => {
                let convertedCount = 0;
                
                if (dateFilter === 'all') {
                  // Se não há filtro de data, mostrar todos os "Convertidos"
                  convertedCount = leads.filter(lead => leadStatuses[lead.id] === 'convertido').length;
                } else {
                  // Para período específico, verificar se o status foi alterado no período
                  const now = new Date();
                  let startDate: Date;
                  let endDate: Date;

                  switch (dateFilter) {
                    case 'today':
                      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
                      break;
                    case 'week':
                      const weekStart = new Date(now);
                      weekStart.setDate(now.getDate() - 7);
                      weekStart.setHours(0, 0, 0, 0);
                      startDate = weekStart;
                      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
                      break;
                    case 'month':
                      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
                      break;
                     case 'custom':
                       if (customDateStart && customDateEnd) {
                         // Parseamento manual para evitar problema de timezone
                         const startParts = customDateStart.split('-');
                         const endParts = customDateEnd.split('-');
                         
                         startDate = new Date(
                           parseInt(startParts[0]), 
                           parseInt(startParts[1]) - 1, 
                           parseInt(startParts[2]), 
                           0, 0, 0, 0
                         );
                         endDate = new Date(
                           parseInt(endParts[0]), 
                           parseInt(endParts[1]) - 1, 
                           parseInt(endParts[2]), 
                           23, 59, 59, 999
                         );
                       } else {
                         startDate = new Date(0);
                         endDate = new Date();
                       }
                       break;
                    default:
                      startDate = new Date(0);
                      endDate = new Date();
                  }

                  // Filtrar pelos status que foram alterados no período
                  convertedCount = Object.entries(leadStatusDates).filter(([leadId, statusInfo]) => {
                    if (statusInfo.status !== 'convertido') return false;
                    const statusDate = new Date(statusInfo.updated_at);
                    return statusDate >= startDate && statusDate <= endDate;
                  }).length;
                }
                
                return convertedCount;
              })()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de leads */}
      {currentView === 'table' && (
        <Card>
          <CardContent className="p-6">
            {filteredLeads.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum lead encontrado</p>
              </div>
            ) : (
              <>
                <ResponsiveLeadsTable
                  leads={filteredLeads.slice((currentPage - 1) * leadsPerPage, currentPage * leadsPerPage)}
                  selectedLeads={selectedLeads}
                  leadStatuses={leadStatuses}
                  parseLeadData={parseLeadData}
                  isAllSelected={selectedLeads.size === filteredLeads.slice((currentPage - 1) * leadsPerPage, currentPage * leadsPerPage).length && filteredLeads.slice((currentPage - 1) * leadsPerPage, currentPage * leadsPerPage).length > 0}
                  toggleSelectAll={() => {
                    const paginatedLeads = filteredLeads.slice((currentPage - 1) * leadsPerPage, currentPage * leadsPerPage);
                    const allSelected = selectedLeads.size === paginatedLeads.length && paginatedLeads.length > 0;
                    if (allSelected) {
                      const newSelected = new Set(selectedLeads);
                      paginatedLeads.forEach(lead => newSelected.delete(lead.id));
                      setSelectedLeads(newSelected);
                    } else {
                      setSelectedLeads(new Set([...selectedLeads, ...paginatedLeads.map(lead => lead.id)]));
                    }
                  }}
                  toggleSelectLead={(id: string) => {
                    const newSelected = new Set(selectedLeads);
                    if (newSelected.has(id)) {
                      newSelected.delete(id);
                    } else {
                      newSelected.add(id);
                    }
                    setSelectedLeads(newSelected);
                  }}
                  updateLeadStatus={updateLeadStatus}
                  viewLeadDetails={openLeadDetails}
                  copyToClipboard={(text: string, type: string) => {
                    navigator.clipboard.writeText(text);
                    toast.success(`${type} copiado!`);
                  }}
                  handleEditLead={() => {}}
                  handleDeleteLead={() => {}}
                />
                
                {/* Paginação */}
                {filteredLeads.length > leadsPerPage && (
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-muted-foreground">
                      Mostrando {Math.min((currentPage - 1) * leadsPerPage + 1, filteredLeads.length)} até {Math.min(currentPage * leadsPerPage, filteredLeads.length)} de {filteredLeads.length} leads
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Anterior
                      </Button>
                      
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.ceil(filteredLeads.length / leadsPerPage) }, (_, i) => i + 1)
                          .filter(page => 
                            page === 1 || 
                            page === Math.ceil(filteredLeads.length / leadsPerPage) || 
                            Math.abs(page - currentPage) <= 1
                          )
                          .map((page, index, array) => (
                            <div key={page} className="flex items-center gap-1">
                              {index > 0 && array[index - 1] !== page - 1 && (
                                <span className="px-2 py-1 text-sm text-muted-foreground">...</span>
                              )}
                              <Button
                                variant={page === currentPage ? "default" : "outline"}
                                size="sm"
                                className="w-8 h-8 p-0"
                                onClick={() => setCurrentPage(page)}
                              >
                                {page}
                              </Button>
                            </div>
                          ))
                        }
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(Math.ceil(filteredLeads.length / leadsPerPage), prev + 1))}
                        disabled={currentPage === Math.ceil(filteredLeads.length / leadsPerPage)}
                      >
                        Próximo
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}


      {/* Kanban Board */}
      {currentView === 'kanban' && (
        <LeadsKanban
          filteredLeads={filteredLeads}
          leadStatuses={leadStatuses}
          updateLeadStatus={updateLeadStatus}
          onLeadClick={openLeadDetails}
        />
      )}

      {/* Dialog de detalhes do lead */}
      <LeadDetailDialog
        lead={selectedLead}
        isOpen={isDetailSheetOpen}
        onClose={() => setIsDetailSheetOpen(false)}
        onSendEmail={sendCustomEmail}
        emailTemplates={emailTemplates}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
      />

      {/* Contact Importer */}
      <ContactImporter
        isOpen={isContactImporterOpen}
        onClose={() => setIsContactImporterOpen(false)}
        onContactsAdded={loadLeads}
      />

      {/* Lead Webhook Manager Dialog */}
      {isLeadWebhookManagerOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Sistema de Webhook para Leads</h2>
              <Button variant="outline" onClick={() => setIsLeadWebhookManagerOpen(false)}>
                ✕
              </Button>
            </div>
            <LeadWebhookManager />
          </div>
        </div>
      )}
    </div>
  );
};
