import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { RefreshCw, Download, Search, Trash2, Phone, Mail, MessageSquare, Calendar, Filter, Eye, ExternalLink } from 'lucide-react';
import { supabase } from '../../integrations/supabase/client';
import { toast } from 'sonner';

interface Lead {
  id: string;
  lead_data: any;
  session_id: string;
  visitor_id: string | null;
  event_type: string;
  event_category: string | null;
  event_action: string;
  event_label: string | null;
  form_id: string | null;
  form_name: string | null;
  page_url: string;
  referrer: string | null;
  campaign_name: string | null;
  campaign_source: string | null;
  campaign_medium: string | null;
  user_agent: string | null;
  timestamp: string;
  created_at: string;
  conversion_value?: number | null;
}

// Função para interpretar dados do formulário JSON
const parseLeadData = (leadData: any) => {
  if (!leadData) return {};
  
  console.log('🔍 Dados brutos do lead:', leadData);
  
  let parsedLeadData = leadData;
  
  // Se leadData é uma string JSON, fazer parse
  if (typeof leadData === 'string') {
    try {
      parsedLeadData = JSON.parse(leadData);
      console.log('📦 JSON parseado:', parsedLeadData);
    } catch (error) {
      console.error('❌ Erro ao fazer parse do JSON:', error);
      return {};
    }
  }
  
  // Os dados já vêm com as chaves corretas, apenas adicionar aliases para compatibilidade
  const result = {
    ...parsedLeadData,
    // Aliases para compatibilidade
    nome: parsedLeadData.name || parsedLeadData.nome,
    telefone: parsedLeadData.phone || parsedLeadData.telefone,
    servico: parsedLeadData.service || parsedLeadData.servico,
    mensagem: parsedLeadData.message || parsedLeadData.mensagem,
    urgente: parsedLeadData.isUrgent || parsedLeadData.urgente
  };
  
  console.log('✅ Dados parseados:', result);
  
  return result;
};


// Componente para exibir detalhes do lead
const LeadDetailSheet: React.FC<{ lead: Lead; children: React.ReactNode; selectedTemplate?: any }> = ({ lead, children, selectedTemplate }) => {
  const rawLeadData = lead.lead_data || {};
  const leadData = parseLeadData(rawLeadData);
  
  const phone = leadData.phone || leadData.telefone;
  const name = leadData.name || leadData.nome;
  const email = leadData.email;
  const service = leadData.service || leadData.servico;
  const message = leadData.message || leadData.mensagem;

  const formatWhatsAppNumber = (phoneNumber: string) => {
    // Remove todos os caracteres não numéricos
    const clean = phoneNumber.replace(/\D/g, '');
    // Se não começar com 55, adiciona
    return clean.startsWith('55') ? clean : `55${clean}`;
  };

  const openWhatsApp = () => {
    if (phone) {
      const formattedNumber = formatWhatsAppNumber(phone);
      const whatsappMessage = `Olá ${name || 'cliente'}, vi que você entrou em contato através do nosso site. Em que posso ajudá-lo?`;
      const url = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(url, '_blank');
    }
  };

  const sendWelcomeEmail = async () => {
    if (!email) {
      toast.error('Email não disponível');
      return;
    }

    if (!selectedTemplate) {
      toast.error('Template de email não encontrado');
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('send-smtp-email', {
        body: {
          to: email,
          subject: selectedTemplate.subject.replace('{name}', name || 'Cliente'),
          name: name || 'Cliente',
          service: service || 'Consultoria Jurídica',
          message: message || '',
          customTitle: selectedTemplate.title,
          customContent: selectedTemplate.content.replace('{service}', service || 'nossos serviços').replace('{name}', name || 'cliente')
        }
      });

      if (error) throw error;
      toast.success('Email enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      toast.error('Erro ao enviar email');
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-[500px] sm:max-w-[500px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl">{name || 'Lead sem nome'}</SheetTitle>
          <SheetDescription>
            {new Date(lead.created_at).toLocaleString('pt-BR')}
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          {/* Ações principais */}
          <div className="flex gap-2">
            {email && (
              <Button variant="outline" size="sm" asChild className="flex-1">
                <a href={`mailto:${email}`}>
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </a>
              </Button>
            )}
            {phone && (
              <Button variant="default" size="sm" onClick={openWhatsApp} className="flex-1 bg-green-600 hover:bg-green-700">
                <Phone className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            )}
          </div>

          {/* Ação para enviar email personalizado */}
          {email && selectedTemplate && (
            <Button onClick={sendWelcomeEmail} variant="secondary" size="sm" className="w-full">
              <Mail className="w-4 h-4 mr-2" />
              Enviar Email Personalizado
            </Button>
          )}

          {/* Informações principais - Grid compacto */}
          <div className="grid grid-cols-1 gap-3">
            {/* Nome */}
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-xs font-medium text-muted-foreground mb-1">NOME</div>
              <div className="text-sm font-medium">{name || 'Não informado'}</div>
            </div>

            {/* Email */}
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-xs font-medium text-muted-foreground mb-1">EMAIL</div>
              <div className="text-sm">{email || 'Não informado'}</div>
            </div>

            {/* Telefone */}
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-xs font-medium text-muted-foreground mb-1">TELEFONE</div>
              <div className="text-sm">{phone || 'Não informado'}</div>
            </div>

            {/* Serviço */}
            {service && (
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="text-xs font-medium text-muted-foreground mb-1">SERVIÇO</div>
                <div className="text-sm">{service}</div>
              </div>
            )}

            {/* Mensagem */}
            {message && (
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="text-xs font-medium text-muted-foreground mb-1">MENSAGEM</div>
                <div className="text-sm leading-relaxed">{message}</div>
              </div>
            )}
          </div>

          {/* Outros dados do formulário */}
          {Object.keys(leadData).length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Outros Dados</h3>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(leadData).map(([key, value]) => {
                  // Pular campos já exibidos
                  if (['name', 'nome', 'email', 'phone', 'telefone', 'service', 'servico', 'message', 'mensagem'].includes(key) || !value) {
                    return null;
                  }
                  
                  return (
                    <div key={key} className="p-2 bg-muted/30 rounded text-xs">
                      <span className="font-medium text-muted-foreground">{key.toUpperCase()}:</span>
                      <span className="ml-2">{typeof value === 'boolean' ? (value ? 'Sim' : 'Não') : String(value)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Dados técnicos */}
          <div className="space-y-3 pt-4 border-t">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Dados Técnicos</h3>
            <div className="space-y-2">
              <div className="p-2 bg-muted/30 rounded text-xs">
                <span className="font-medium text-muted-foreground">FORMULÁRIO:</span>
                <span className="ml-2">{lead.form_name || lead.form_id || 'N/A'}</span>
              </div>
              
              <div className="p-2 bg-muted/30 rounded text-xs">
                <span className="font-medium text-muted-foreground">PÁGINA:</span>
                <span className="ml-2 break-all">{lead.page_url}</span>
              </div>
              
              {lead.campaign_name && (
                <div className="p-2 bg-muted/30 rounded text-xs">
                  <span className="font-medium text-muted-foreground">CAMPANHA:</span>
                  <span className="ml-2">{lead.campaign_name}</span>
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
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const [currentView, setCurrentView] = useState<'table' | 'kanban'>('table');
  const [leadStatuses, setLeadStatuses] = useState<{ [key: string]: string }>({});
  const [emailTemplates, setEmailTemplates] = useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

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
      const { error } = await supabase
        .from('lead_status')
        .upsert({
          lead_id: leadId,
          status: newStatus,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('❌ Erro ao salvar status:', error);
        toast.error('Erro ao salvar status');
        return false;
      }

      // Atualizar estado local
      setLeadStatuses(prev => ({ ...prev, [leadId]: newStatus }));
      toast.success(`Status atualizado para: ${newStatus}`);
      return true;
    } catch (error) {
      console.error('❌ Erro ao salvar status:', error);
      toast.error('Erro ao salvar status');
      return false;
    }
  };

  // Carregar na inicialização
  useEffect(() => {
    loadLeads();
    loadEmailTemplates();
  }, []);

  // Aplicar filtros
  useEffect(() => {
    let filtered = [...leads];

    // Filtro por data
    if (dateFilter !== 'all') {
      const today = new Date().toDateString();
      const thisWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toDateString();
      
      filtered = filtered.filter(lead => {
        const leadDate = new Date(lead.created_at).toDateString();
        if (dateFilter === 'today') return leadDate === today;
        if (dateFilter === 'week') return new Date(lead.created_at) >= new Date(thisWeek);
        return true;
      });
    }

    // Filtro por formulário
    if (formFilter !== 'all') {
      filtered = filtered.filter(lead => lead.form_id === formFilter);
    }

    // Filtro por busca
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(lead => {
        const leadData = lead.lead_data || {};
        return (
          JSON.stringify(leadData).toLowerCase().includes(query) ||
          (lead.form_name || '').toLowerCase().includes(query) ||
          (lead.page_url || '').toLowerCase().includes(query) ||
          (lead.campaign_name || '').toLowerCase().includes(query)
        );
      });
    }

    setFilteredLeads(filtered);
  }, [leads, formFilter, searchQuery, dateFilter]);

  // Deletar leads selecionados
  const deleteSelected = async () => {
    if (selectedLeads.size === 0) return;

    try {
      const { error } = await supabase
        .from('conversion_events')
        .delete()
        .in('id', Array.from(selectedLeads));

      if (error) throw error;

      toast.success(`${selectedLeads.size} lead(s) deletado(s)`);
      setSelectedLeads(new Set());
      loadLeads();
    } catch (error) {
      console.error('❌ Erro ao deletar:', error);
      toast.error('Erro ao deletar leads');
    }
  };

  // Exportar leads
  const exportLeads = () => {
    const csv = [
      ['ID', 'Data', 'Formulário', 'Nome', 'Email', 'Telefone', 'Página', 'Campanha'],
      ...filteredLeads.map(lead => {
        const data = lead.lead_data || {};
        return [
          lead.id,
          new Date(lead.created_at).toLocaleString('pt-BR'),
          lead.form_name || lead.form_id || '',
          data.name || data.nome || '',
          data.email || '',
          data.phone || data.telefone || '',
          lead.page_url || '',
          lead.campaign_name || ''
        ];
      })
    ];

    const csvContent = csv.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Obter formulários únicos
  const uniqueForms = Array.from(new Set(leads.map(lead => lead.form_id))).filter(Boolean);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2">Carregando leads...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Leads ({filteredLeads.length})</h2>
          <p className="text-muted-foreground">Dados da tabela conversion_events</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={loadLeads} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
          <Button onClick={exportLeads} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          {selectedLeads.size > 0 && (
            <Button onClick={deleteSelected} variant="destructive" size="sm">
              <Trash2 className="w-4 h-4 mr-2" />
              Deletar ({selectedLeads.size})
            </Button>
          )}
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, email, telefone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-48">
            <Calendar className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os períodos</SelectItem>
            <SelectItem value="today">Hoje</SelectItem>
            <SelectItem value="week">Última semana</SelectItem>
          </SelectContent>
        </Select>

        <Select value={formFilter} onValueChange={setFormFilter}>
          <SelectTrigger className="w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Formulário" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os formulários</SelectItem>
            {uniqueForms.map(formId => (
              <SelectItem key={formId} value={formId || 'sem-form'}>
                {formId || 'Sem formulário'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Tabs value={currentView} onValueChange={(v) => setCurrentView(v as 'table' | 'kanban')}>
          <TabsList>
            <TabsTrigger value="table">Tabela</TabsTrigger>
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Visualização Kanban */}
      {currentView === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Coluna Novo */}
          <div className="bg-muted/30 rounded-lg p-4 min-h-[600px]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-center">Novo</h3>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {filteredLeads.filter(lead => !leadStatuses[lead.id] || leadStatuses[lead.id] === 'novo').length}
              </Badge>
            </div>
            <div className="space-y-3">
              {filteredLeads
                .filter(lead => !leadStatuses[lead.id] || leadStatuses[lead.id] === 'novo')
                .map((lead) => {
                  const rawLeadData = lead.lead_data || {};
                  const leadData = parseLeadData(rawLeadData);
                  const phone = leadData.phone || leadData.telefone;
                  const name = leadData.name || leadData.nome;
                  
                  return (
                    <LeadDetailSheet key={lead.id} lead={lead} selectedTemplate={selectedTemplate}>
                      <Card className="border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20 cursor-pointer hover:shadow-md transition-all">
                        <CardContent className="p-3">
                          <div className="space-y-2">
                            <div className="font-medium text-sm">{name || 'Nome não informado'}</div>
                            {leadData.email && (
                              <div className="flex items-center gap-1 text-xs">
                                <Mail className="w-3 h-3" />
                                <span className="text-muted-foreground truncate">{leadData.email}</span>
                              </div>
                            )}
                            {phone && (
                              <div className="flex items-center gap-1 text-xs">
                                <Phone className="w-3 h-3" />
                                <span className="text-muted-foreground">{phone}</span>
                              </div>
                            )}
                            <div className="text-xs text-muted-foreground">
                              {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                            </div>
                            <div className="flex gap-1 pt-1">
                              <Select 
                                value={leadStatuses[lead.id] || 'novo'} 
                                onValueChange={async (value) => {
                                  await updateLeadStatus(lead.id, value);
                                }}
                              >
                                <SelectTrigger className="h-6 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="novo">Novo</SelectItem>
                                  <SelectItem value="contato">Em Contato</SelectItem>
                                  <SelectItem value="qualificado">Qualificado</SelectItem>
                                  <SelectItem value="cliente">Cliente</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </LeadDetailSheet>
                  );
                })}
            </div>
          </div>

          {/* Coluna Em Contato */}
          <div className="bg-muted/30 rounded-lg p-4 min-h-[600px]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-center">Em Contato</h3>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                {filteredLeads.filter(lead => leadStatuses[lead.id] === 'contato').length}
              </Badge>
            </div>
            <div className="space-y-3">
              {filteredLeads
                .filter(lead => leadStatuses[lead.id] === 'contato')
                .map((lead) => {
                  const rawLeadData = lead.lead_data || {};
                  const leadData = parseLeadData(rawLeadData);
                  const phone = leadData.phone || leadData.telefone;
                  const name = leadData.name || leadData.nome;
                  
                  return (
                    <LeadDetailSheet key={lead.id} lead={lead} selectedTemplate={selectedTemplate}>
                      <Card className="border-l-4 border-l-yellow-500 bg-yellow-50/50 dark:bg-yellow-950/20 cursor-pointer hover:shadow-md transition-all">
                        <CardContent className="p-3">
                          <div className="space-y-2">
                            <div className="font-medium text-sm">{name || 'Nome não informado'}</div>
                            {leadData.email && (
                              <div className="flex items-center gap-1 text-xs">
                                <Mail className="w-3 h-3" />
                                <span className="text-muted-foreground truncate">{leadData.email}</span>
                              </div>
                            )}
                            {phone && (
                              <div className="flex items-center gap-1 text-xs">
                                <Phone className="w-3 h-3" />
                                <span className="text-muted-foreground">{phone}</span>
                              </div>
                            )}
                            <div className="text-xs text-muted-foreground">
                              {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                            </div>
                            <div className="flex gap-1 pt-1">
                              <Select 
                                value={leadStatuses[lead.id] || 'novo'} 
                                onValueChange={async (value) => {
                                  await updateLeadStatus(lead.id, value);
                                }}
                              >
                                <SelectTrigger className="h-6 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="novo">Novo</SelectItem>
                                  <SelectItem value="contato">Em Contato</SelectItem>
                                  <SelectItem value="qualificado">Qualificado</SelectItem>
                                  <SelectItem value="cliente">Cliente</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </LeadDetailSheet>
                  );
                })}
            </div>
          </div>

          {/* Coluna Qualificado */}
          <div className="bg-muted/30 rounded-lg p-4 min-h-[600px]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-center">Qualificado</h3>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                {filteredLeads.filter(lead => leadStatuses[lead.id] === 'qualificado').length}
              </Badge>
            </div>
            <div className="space-y-3">
              {filteredLeads
                .filter(lead => leadStatuses[lead.id] === 'qualificado')
                .map((lead) => {
                  const rawLeadData = lead.lead_data || {};
                  const leadData = parseLeadData(rawLeadData);
                  const phone = leadData.phone || leadData.telefone;
                  const name = leadData.name || leadData.nome;
                  
                  return (
                    <LeadDetailSheet key={lead.id} lead={lead} selectedTemplate={selectedTemplate}>
                      <Card className="border-l-4 border-l-orange-500 bg-orange-50/50 dark:bg-orange-950/20 cursor-pointer hover:shadow-md transition-all">
                        <CardContent className="p-3">
                          <div className="space-y-2">
                            <div className="font-medium text-sm">{name || 'Nome não informado'}</div>
                            {leadData.email && (
                              <div className="flex items-center gap-1 text-xs">
                                <Mail className="w-3 h-3" />
                                <span className="text-muted-foreground truncate">{leadData.email}</span>
                              </div>
                            )}
                            {phone && (
                              <div className="flex items-center gap-1 text-xs">
                                <Phone className="w-3 h-3" />
                                <span className="text-muted-foreground">{phone}</span>
                              </div>
                            )}
                            <div className="text-xs text-muted-foreground">
                              {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                            </div>
                            <div className="flex gap-1 pt-1">
                              <Select 
                                value={leadStatuses[lead.id] || 'novo'} 
                                onValueChange={async (value) => {
                                  await updateLeadStatus(lead.id, value);
                                }}
                              >
                                <SelectTrigger className="h-6 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="novo">Novo</SelectItem>
                                  <SelectItem value="contato">Em Contato</SelectItem>
                                  <SelectItem value="qualificado">Qualificado</SelectItem>
                                  <SelectItem value="cliente">Cliente</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </LeadDetailSheet>
                  );
                })}
            </div>
          </div>

          {/* Coluna Cliente */}
          <div className="bg-muted/30 rounded-lg p-4 min-h-[600px]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-center">Cliente</h3>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {filteredLeads.filter(lead => leadStatuses[lead.id] === 'cliente').length}
              </Badge>
            </div>
            <div className="space-y-3">
              {filteredLeads
                .filter(lead => leadStatuses[lead.id] === 'cliente')
                .map((lead) => {
                  const rawLeadData = lead.lead_data || {};
                  const leadData = parseLeadData(rawLeadData);
                  const phone = leadData.phone || leadData.telefone;
                  const name = leadData.name || leadData.nome;
                  
                  return (
                    <LeadDetailSheet key={lead.id} lead={lead} selectedTemplate={selectedTemplate}>
                      <Card className="border-l-4 border-l-green-500 bg-green-50/50 dark:bg-green-950/20 cursor-pointer hover:shadow-md transition-all">
                        <CardContent className="p-3">
                          <div className="space-y-2">
                            <div className="font-medium text-sm">{name || 'Nome não informado'}</div>
                            {leadData.email && (
                              <div className="flex items-center gap-1 text-xs">
                                <Mail className="w-3 h-3" />
                                <span className="text-muted-foreground truncate">{leadData.email}</span>
                              </div>
                            )}
                            {phone && (
                              <div className="flex items-center gap-1 text-xs">
                                <Phone className="w-3 h-3" />
                                <span className="text-muted-foreground">{phone}</span>
                              </div>
                            )}
                            <div className="text-xs text-muted-foreground">
                              {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                            </div>
                            <div className="flex gap-1 pt-1">
                              <Select 
                                value={leadStatuses[lead.id] || 'novo'} 
                                onValueChange={async (value) => {
                                  await updateLeadStatus(lead.id, value);
                                }}
                              >
                                <SelectTrigger className="h-6 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="novo">Novo</SelectItem>
                                  <SelectItem value="contato">Em Contato</SelectItem>
                                  <SelectItem value="qualificado">Qualificado</SelectItem>
                                  <SelectItem value="cliente">Cliente</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </LeadDetailSheet>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* Visualização em Tabela */}
      {currentView === 'table' && (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    checked={selectedLeads.size === filteredLeads.length && filteredLeads.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedLeads(new Set(filteredLeads.map(lead => lead.id)));
                      } else {
                        setSelectedLeads(new Set());
                      }
                    }}
                  />
                </TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Formulário</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => {
                const rawLeadData = lead.lead_data || {};
                const leadData = parseLeadData(rawLeadData);
                const isSelected = selectedLeads.has(lead.id);
                const phone = leadData.phone || leadData.telefone;
                const name = leadData.name || leadData.nome;
                
                return (
                  <TableRow key={lead.id} className={isSelected ? 'bg-muted/50' : ''}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                          const newSelected = new Set(selectedLeads);
                          if (e.target.checked) {
                            newSelected.add(lead.id);
                          } else {
                            newSelected.delete(lead.id);
                          }
                          setSelectedLeads(newSelected);
                        }}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {name || 'Nome não informado'}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {leadData.email && (
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="w-3 h-3" />
                            <a href={`mailto:${leadData.email}`} className="text-blue-600 hover:underline">
                              {leadData.email}
                            </a>
                          </div>
                        )}
                        {phone && (
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="w-3 h-3" />
                            <a 
                              href={`https://wa.me/55${phone.replace(/\D/g, '')}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-green-600 hover:underline"
                            >
                              {phone}
                            </a>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {lead.form_name || lead.form_id || 'N/A'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(lead.created_at).toLocaleString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <LeadDetailSheet lead={lead} selectedTemplate={selectedTemplate}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3 mr-1" />
                          Ver Detalhes
                        </Button>
                      </LeadDetailSheet>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {filteredLeads.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Nenhum lead encontrado</p>
        </div>
      )}
    </div>
  );
};