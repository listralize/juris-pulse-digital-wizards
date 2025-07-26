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

// Componente para exibir detalhes do lead
const LeadDetailSheet: React.FC<{ lead: Lead; children: React.ReactNode }> = ({ lead, children }) => {
  const leadData = lead.lead_data || {};
  const phone = leadData.phone || leadData.telefone;
  const name = leadData.name || leadData.nome;

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-[600px] sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle>{name || 'Lead sem nome'}</SheetTitle>
          <SheetDescription>
            Detalhes completos do lead - {new Date(lead.created_at).toLocaleString('pt-BR')}
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          {/* Informações principais */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informações de Contato</h3>
            
            <div className="grid gap-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span className="font-medium">Email:</span>
                </div>
                {leadData.email ? (
                  <a href={`mailto:${leadData.email}`} className="text-blue-600 hover:underline">
                    {leadData.email}
                  </a>
                ) : (
                  <span className="text-muted-foreground">Não informado</span>
                )}
              </div>

              {phone && (
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span className="font-medium">Telefone:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>{phone}</span>
                    <Button size="sm" variant="outline" asChild>
                      <a 
                        href={`https://wa.me/55${phone.replace(/\D/g, '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-green-600"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Dados do formulário */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dados do Formulário</h3>
            <div className="space-y-3">
              {Object.entries(leadData).map(([key, value]) => {
                if (!value || key === 'phone' || key === 'telefone' || key === 'email') return null;
                
                const displayKey = key === 'nome' ? 'Nome' : 
                                 key === 'servico' ? 'Serviço' : 
                                 key === 'message' ? 'Mensagem' : 
                                 key === 'isUrgent' ? 'Urgente' : key;
                
                return (
                  <div key={key} className="p-3 bg-muted rounded-lg">
                    <div className="font-medium text-sm mb-1">{displayKey}:</div>
                    <div className="text-sm">
                      {key === 'isUrgent' ? (value ? 'Sim' : 'Não') : String(value)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dados técnicos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dados Técnicos</h3>
            <div className="grid gap-3">
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-medium text-sm mb-1">Formulário:</div>
                <div className="text-sm">{lead.form_name || lead.form_id || 'N/A'}</div>
              </div>
              
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-medium text-sm mb-1">Página de Origem:</div>
                <div className="text-sm break-all">{lead.page_url}</div>
              </div>
              
              {lead.campaign_name && (
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium text-sm mb-1">Campanha:</div>
                  <div className="text-sm">{lead.campaign_name}</div>
                </div>
              )}
              
              {lead.referrer && (
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium text-sm mb-1">Referrer:</div>
                  <div className="text-sm break-all">{lead.referrer}</div>
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
  const [currentView, setCurrentView] = useState<'cards' | 'table'>('table');

  // Carregar leads diretamente da tabela conversion_events
  const loadLeads = async () => {
    try {
      setIsLoading(true);
      console.log('🔄 Carregando leads da tabela conversion_events...');
      
      const { data, error } = await supabase
        .from('conversion_events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Erro:', error);
        toast.error('Erro ao carregar leads');
        return;
      }

      console.log(`✅ ${data?.length || 0} registros carregados da conversion_events`);
      setLeads(data || []);
      setFilteredLeads(data || []);
    } catch (error) {
      console.error('❌ Erro geral:', error);
      toast.error('Erro ao carregar leads');
    } finally {
      setIsLoading(false);
    }
  };

  // Carregar na inicialização
  useEffect(() => {
    loadLeads();
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

        <Tabs value={currentView} onValueChange={(v) => setCurrentView(v as 'cards' | 'table')}>
          <TabsList>
            <TabsTrigger value="table">Tabela</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

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
                const leadData = lead.lead_data || {};
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
                      <LeadDetailSheet lead={lead}>
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

      {/* Visualização em Cards */}
      {currentView === 'cards' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filteredLeads.map((lead, index) => {
            const leadData = lead.lead_data || {};
            const isSelected = selectedLeads.has(lead.id);
            const phone = leadData.phone || leadData.telefone;
            const name = leadData.name || leadData.nome;
            
            // Cores alternadas para os cards
            const cardColors = [
              'border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20',
              'border-l-green-500 bg-green-50/50 dark:bg-green-950/20',
              'border-l-purple-500 bg-purple-50/50 dark:bg-purple-950/20',
              'border-l-orange-500 bg-orange-50/50 dark:bg-orange-950/20',
              'border-l-red-500 bg-red-50/50 dark:bg-red-950/20',
              'border-l-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20',
              'border-l-pink-500 bg-pink-50/50 dark:bg-pink-950/20',
              'border-l-teal-500 bg-teal-50/50 dark:bg-teal-950/20'
            ];
            const colorClass = cardColors[index % cardColors.length];

            return (
              <LeadDetailSheet key={lead.id} lead={lead}>
                <Card className={`${colorClass} border-l-4 cursor-pointer hover:shadow-md transition-all ${isSelected ? 'ring-2 ring-primary' : ''} h-fit`}>
                  <CardContent className="p-3">
                    <div className="space-y-2">
                      {/* Checkbox e Nome */}
                      <div className="flex items-start justify-between">
                        <div 
                          className="flex-1"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              e.stopPropagation();
                              const newSelected = new Set(selectedLeads);
                              if (e.target.checked) {
                                newSelected.add(lead.id);
                              } else {
                                newSelected.delete(lead.id);
                              }
                              setSelectedLeads(newSelected);
                            }}
                            className="rounded mr-2"
                          />
                          <span className="font-medium text-sm">
                            {name || 'Nome não informado'}
                          </span>
                        </div>
                      </div>

                      {/* Contato rápido */}
                      <div className="space-y-1">
                        {leadData.email && (
                          <div className="flex items-center gap-1 text-xs">
                            <Mail className="w-3 h-3 text-muted-foreground" />
                            <span className="truncate">{leadData.email}</span>
                          </div>
                        )}
                        {phone && (
                          <div className="flex items-center gap-1 text-xs">
                            <Phone className="w-3 h-3 text-green-600" />
                            <span className="truncate">{phone}</span>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-5 w-5 p-0 ml-auto"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(`https://wa.me/55${phone.replace(/\D/g, '')}`, '_blank');
                              }}
                            >
                              <ExternalLink className="w-3 h-3 text-green-600" />
                            </Button>
                          </div>
                        )}
                      </div>

                      {/* Formulário e Data */}
                      <div className="space-y-1">
                        <Badge variant="outline" className="text-xs h-5">
                          {lead.form_name || lead.form_id || 'N/A'}
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                        </div>
                      </div>

                      {/* Indicadores */}
                      <div className="flex flex-wrap gap-1">
                        {leadData.isUrgent && (
                          <Badge variant="destructive" className="text-xs h-4 px-1">
                            Urgente
                          </Badge>
                        )}
                        {lead.campaign_name && (
                          <Badge variant="secondary" className="text-xs h-4 px-1">
                            Campanha
                          </Badge>
                        )}
                        {leadData.message && (
                          <Badge variant="outline" className="text-xs h-4 px-1">
                            <MessageSquare className="w-2 h-2 mr-1" />
                            Msg
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </LeadDetailSheet>
            );
          })}
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