import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Download, Eye, FileText, Filter, Mail, Phone, Search, Table, Users, Send, MessageSquare, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BulkEmailSender } from './BulkEmailSender';
import { ContactImporter } from './ContactImporter';

// Interface do lead
interface Lead {
  id: string;
  lead_data: any;
  event_type: string;
  page_url?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  created_at: string;
}

// Helper para parsear dados do lead
const parseLeadData = (leadData: any) => {
  try {
    if (typeof leadData === 'string') {
      leadData = JSON.parse(leadData);
    }
    
    return {
      name: leadData?.name || leadData?.nome || '',
      email: leadData?.email || '',
      phone: leadData?.phone || leadData?.telefone || '',
      service: leadData?.service || leadData?.servico || '',
      message: leadData?.message || leadData?.mensagem || '',
      urgent: leadData?.urgent || leadData?.urgente || false,
      ...leadData
    };
  } catch (error) {
    console.error('Erro ao parsear lead_data:', error);
    return {};
  }
};

// Componente para detalhes do lead
const LeadDetailSheet: React.FC<{
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onSendEmail: (lead: Lead, templateId?: string) => void;
  emailTemplates: any[];
  selectedTemplate: any;
  setSelectedTemplate: (template: any) => void;
}> = ({ lead, isOpen, onClose, onSendEmail, emailTemplates, selectedTemplate, setSelectedTemplate }) => {
  if (!lead) return null;

  const leadData = parseLeadData(lead.lead_data);
  const whatsappMessage = encodeURIComponent(
    `Olá ${leadData.name}, vi que você entrou em contato conosco através do site. Como posso ajudá-lo(a)?`
  );
  const whatsappUrl = `https://api.whatsapp.com/send?phone=5562994594496&text=${whatsappMessage}`;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Detalhes do Lead</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          {/* Informações principais */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{leadData.name || 'Nome não informado'}</h3>
              <p className="text-muted-foreground">{leadData.email || 'Email não informado'}</p>
              {leadData.phone && (
                <p className="text-muted-foreground">{leadData.phone}</p>
              )}
            </div>

            {leadData.service && (
              <div>
                <span className="text-sm font-medium text-muted-foreground">SERVIÇO:</span>
                <p className="mt-1">{leadData.service}</p>
              </div>
            )}

            {leadData.message && (
              <div>
                <span className="text-sm font-medium text-muted-foreground">MENSAGEM:</span>
                <p className="mt-1 p-3 bg-muted/30 rounded-md">{leadData.message}</p>
              </div>
            )}

            {leadData.urgent && (
              <Badge variant="destructive">Urgente</Badge>
            )}
          </div>

          {/* Ações de contato */}
          <div className="space-y-4">
            <h4 className="font-medium">Ações</h4>
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-green-600" />
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline"
                >
                  WhatsApp
                </a>
              </div>
              
              <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-600" />
                <button
                  onClick={() => {
                    if (leadData.email) {
                      navigator.clipboard.writeText(leadData.email);
                      toast.success('Email copiado!');
                    }
                  }}
                  className="text-blue-600 hover:underline text-left"
                >
                  {leadData.email || 'Email não informado'}
                </button>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Template:</span>
                </div>
                
                <Select
                  value={selectedTemplate?.id || ''}
                  onValueChange={(value) => {
                    const template = emailTemplates.find(t => t.id === value);
                    setSelectedTemplate(template);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um template" />
                  </SelectTrigger>
                  <SelectContent>
                    {emailTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSendEmail(lead)}
                  className="text-blue-600 hover:bg-blue-50"
                  disabled={!selectedTemplate}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Enviar Email
                </Button>
              </div>
              </div>
            </div>
          </div>

          {/* Dados técnicos */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Dados Técnicos</h4>
            
            <div className="text-xs space-y-1">
              <div className="p-2 bg-muted/30 rounded text-xs">
                <span className="font-medium text-muted-foreground">DATA:</span>
                <span className="ml-2">{new Date(lead.created_at).toLocaleString('pt-BR')}</span>
              </div>
              
              {lead.page_url && (
                <div className="p-2 bg-muted/30 rounded text-xs">
                  <span className="font-medium text-muted-foreground">PÁGINA:</span>
                  <span className="ml-2 break-all">{lead.page_url}</span>
                </div>
              )}
              
              {lead.referrer && (
                <div className="p-2 bg-muted/30 rounded text-xs">
                  <span className="font-medium text-muted-foreground">ORIGEM:</span>
                  <span className="ml-2 break-all">{lead.referrer}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

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
  const [leadStatuses, setLeadStatuses] = useState<{ [key: string]: string }>({});
  const [emailTemplates, setEmailTemplates] = useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);
  const [isContactImporterOpen, setIsContactImporterOpen] = useState(false);

  // Carregar leads e status do kanban
  const loadLeads = async () => {
    try {
      setIsLoading(true);
      console.log('🔄 Carregando leads da tabela conversion_events...');
      
      const { data: leadsData, error: leadsError } = await supabase
        .from('conversion_events')
        .select('*')
        .order('created_at', { ascending: false });

      if (leadsError) {
        console.error('❌ Erro ao carregar leads:', leadsError);
        toast.error('Erro ao carregar leads');
        return;
      }

      // Carregar status dos leads
      const { data: statusData, error: statusError } = await supabase
        .from('lead_status')
        .select('*');

      if (statusError) {
        console.error('❌ Erro ao carregar status:', statusError);
      }

      // Mapear status
      const statusMap: { [key: string]: string } = {};
      statusData?.forEach(status => {
        statusMap[status.lead_id] = status.status;
      });

      console.log(`✅ ${leadsData?.length || 0} leads carregados`);
      setLeads(leadsData || []);
      setFilteredLeads(leadsData || []);
      setLeadStatuses(statusMap);
    } catch (error) {
      console.error('❌ Erro geral:', error);
      toast.error('Erro ao carregar leads');
    } finally {
      setIsLoading(false);
    }
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
      const leadData = parseLeadData(lead.lead_data);
      
      if (!leadData.email) {
        toast.error('Email do lead não encontrado');
        return;
      }

      console.log('📧 Enviando email personalizado:', {
        to: leadData.email,
        template: template.name,
        lead: leadData.name
      });

      const { data, error } = await supabase.functions.invoke('send-smtp-email', {
        body: {
          to: leadData.email,
          subject: template.subject.replace('{name}', leadData.name || ''),
          name: leadData.name || 'Cliente',
          service: leadData.service || 'Consultoria Jurídica',
          message: leadData.message || '',
          customTitle: template.subject.replace('{name}', leadData.name || ''),
          customContent: template.content.replace('{name}', leadData.name || '').replace('{service}', leadData.service || 'Consultoria Jurídica')
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
  const exportLeads = () => {
    if (filteredLeads.length === 0) {
      toast.error('Não há leads para exportar');
      return;
    }

    const csvData = filteredLeads.map(lead => {
      const leadData = parseLeadData(lead.lead_data);
      return {
        'Nome': leadData.name || '',
        'Email': leadData.email || '',
        'Telefone': leadData.phone || '',
        'Serviço': leadData.service || '',
        'Mensagem': leadData.message || '',
        'Data': new Date(lead.created_at).toLocaleString('pt-BR'),
        'Página': lead.page_url || '',
        'Origem': lead.referrer || '',
        'Status': leadStatuses[lead.id] || 'novo'
      };
    });

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
    let filtered = [...leads];

    // Filtro de busca
    if (searchQuery) {
      filtered = filtered.filter(lead => {
        const leadData = parseLeadData(lead.lead_data);
        const searchLower = searchQuery.toLowerCase();
        return (
          leadData.name?.toLowerCase().includes(searchLower) ||
          leadData.email?.toLowerCase().includes(searchLower) ||
          leadData.phone?.includes(searchQuery) ||
          leadData.service?.toLowerCase().includes(searchLower)
        );
      });
    }

    // Filtro de data
    if (dateFilter !== 'all') {
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      filtered = filtered.filter(lead => {
        const leadDate = new Date(lead.created_at);
        switch (dateFilter) {
          case 'today':
            return leadDate >= startOfDay;
          case 'week':
            return leadDate >= startOfWeek;
          case 'month':
            return leadDate >= startOfMonth;
          default:
            return true;
        }
      });
    }

    // Filtro por fonte/evento
    if (formFilter !== 'all') {
      filtered = filtered.filter(lead => {
        return lead.event_type === formFilter;
      });
    }

    // Filtro por serviço
    if (serviceFilter !== 'all') {
      filtered = filtered.filter(lead => {
        const leadData = parseLeadData(lead.lead_data);
        return leadData.service?.toLowerCase().includes(serviceFilter.toLowerCase());
      });
    }

    setFilteredLeads(filtered);
  }, [leads, searchQuery, dateFilter, formFilter, serviceFilter]);

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
          
          <Button onClick={() => setIsContactImporterOpen(true)} variant="outline" size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Gerenciar Contatos
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
      <div className="mb-4 grid grid-cols-1 md:grid-cols-6 gap-4">
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
          </SelectContent>
        </Select>

        <Select value={formFilter} onValueChange={setFormFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por fonte" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as fontes</SelectItem>
            <SelectItem value="form_submission">Formulário de Contato</SelectItem>
            <SelectItem value="whatsapp_click">WhatsApp</SelectItem>
            <SelectItem value="email_click">Email</SelectItem>
          </SelectContent>
        </Select>

        <Select value={serviceFilter} onValueChange={setServiceFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por serviço" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os serviços</SelectItem>
            <SelectItem value="Direito Civil">Direito Civil</SelectItem>
            <SelectItem value="Direito Trabalhista">Direito Trabalhista</SelectItem>
            <SelectItem value="Direito Previdenciário">Direito Previdenciário</SelectItem>
            <SelectItem value="Direito Empresarial">Direito Empresarial</SelectItem>
            <SelectItem value="Direito Tributário">Direito Tributário</SelectItem>
            <SelectItem value="Direito Família">Direito de Família</SelectItem>
            <SelectItem value="Direito Consumidor">Direito do Consumidor</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={() => {
          setSearchQuery('');
          setDateFilter('all');
          setFormFilter('all');
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
            <CardTitle className="text-sm font-medium">Novos</CardTitle>
            <Badge variant="secondary">Novo</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {leads.filter(lead => !leadStatuses[lead.id] || leadStatuses[lead.id] === 'novo').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Contato</CardTitle>
            <Badge variant="default">Contato</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {leads.filter(lead => leadStatuses[lead.id] === 'contato').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Convertidos</CardTitle>
            <Badge variant="outline">Convertido</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {leads.filter(lead => leadStatuses[lead.id] === 'convertido').length}
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
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 w-12">
                        <Checkbox
                          checked={selectedLeads.size === filteredLeads.length}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedLeads(new Set(filteredLeads.map(lead => lead.id)));
                            } else {
                              setSelectedLeads(new Set());
                            }
                          }}
                        />
                      </th>
                       <th className="text-left p-2">Nome</th>
                       <th className="text-left p-2">Contato</th>
                       <th className="text-left p-2">Serviço</th>
                       <th className="text-left p-2">Data</th>
                       <th className="text-left p-2">Status</th>
                       <th className="text-left p-2">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead) => {
                      const leadData = parseLeadData(lead.lead_data);
                      const status = leadStatuses[lead.id] || 'novo';
                      
                      return (
                        <tr key={lead.id} className="border-b hover:bg-muted/50">
                          <td className="p-2">
                            <Checkbox
                              checked={selectedLeads.has(lead.id)}
                              onCheckedChange={(checked) => {
                                const newSelected = new Set(selectedLeads);
                                if (checked) {
                                  newSelected.add(lead.id);
                                } else {
                                  newSelected.delete(lead.id);
                                }
                                setSelectedLeads(newSelected);
                              }}
                            />
                          </td>
                           <td className="p-2 font-medium">{leadData.name || 'N/A'}</td>
                           <td className="p-2">
                             <div className="space-y-1">
                               <div className="flex items-center gap-2">
                                 <Mail className="h-3 w-3" />
                                 <span className="text-sm">{leadData.email || 'N/A'}</span>
                               </div>
                               {leadData.phone && (
                                 <div className="flex items-center gap-2">
                                   <a
                                     href={`https://api.whatsapp.com/send?phone=55${leadData.phone.replace(/\D/g, '')}&text=${encodeURIComponent(`Olá ${leadData.name}, vi que você entrou em contato conosco através do site. Como posso ajudá-lo(a)?`)}`}
                                     target="_blank"
                                     rel="noopener noreferrer"
                                     className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
                                   >
                                     <MessageSquare className="h-4 w-4" />
                                     <span className="text-sm font-medium">WhatsApp</span>
                                   </a>
                                 </div>
                               )}
                             </div>
                           </td>
                          <td className="p-2">{leadData.service || 'N/A'}</td>
                          <td className="p-2">{new Date(lead.created_at).toLocaleDateString('pt-BR')}</td>
                          <td className="p-2">
                            <Select
                              value={status}
                              onValueChange={(value) => updateLeadStatus(lead.id, value)}
                            >
                              <SelectTrigger className="w-24">
                                <SelectValue />
                              </SelectTrigger>
                               <SelectContent>
                                 <SelectItem value="novo">Novo</SelectItem>
                                 <SelectItem value="contato">Em Contato</SelectItem>
                                 <SelectItem value="qualificado">Qualificado</SelectItem>
                                 <SelectItem value="convertido">Convertido</SelectItem>
                                 <SelectItem value="descartado">Descartado</SelectItem>
                               </SelectContent>
                            </Select>
                          </td>
                          <td className="p-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openLeadDetails(lead)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Kanban Board */}
      {currentView === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { key: 'novo', title: 'Novos', variant: 'secondary' as const },
            { key: 'contato', title: 'Em Contato', variant: 'default' as const },
            { key: 'qualificado', title: 'Qualificados', variant: 'default' as const },
            { key: 'convertido', title: 'Convertidos', variant: 'outline' as const },
            { key: 'descartado', title: 'Descartados', variant: 'destructive' as const }
          ].map((column) => (
            <Card key={column.key}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant={column.variant}>{column.title}</Badge>
                  <span className="text-sm">
                    ({filteredLeads.filter(lead => (leadStatuses[lead.id] || 'novo') === column.key).length})
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent 
                className="space-y-2 min-h-[200px]"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const leadId = e.dataTransfer.getData('text/plain');
                  updateLeadStatus(leadId, column.key);
                }}
              >
                {filteredLeads
                  .filter(lead => (leadStatuses[lead.id] || 'novo') === column.key)
                  .map((lead) => {
                    const leadData = parseLeadData(lead.lead_data);
                    
                    return (
                      <Card 
                        key={lead.id} 
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData('text/plain', lead.id);
                        }}
                        onClick={() => openLeadDetails(lead)}
                      >
                        <CardContent className="p-3">
                          <div className="space-y-2">
                            <p className="font-medium text-sm">{leadData.name || 'Nome não informado'}</p>
                            <div className="flex items-center gap-2">
                              <Mail className="h-3 w-3" />
                              <p className="text-xs text-muted-foreground truncate">{leadData.email}</p>
                            </div>
                            {leadData.phone && (
                              <a
                                href={`https://api.whatsapp.com/send?phone=55${leadData.phone.replace(/\D/g, '')}&text=${encodeURIComponent(`Olá ${leadData.name}, vi que você entrou em contato conosco através do site. Como posso ajudá-lo(a)?`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MessageSquare className="h-4 w-4" />
                                <span className="text-xs font-medium">WhatsApp</span>
                              </a>
                            )}
                            <p className="text-xs">{leadData.service}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Sheet de detalhes do lead */}
      <LeadDetailSheet
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
    </div>
  );
};