import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { MessageSquare, Phone, Mail, Clock, User, Eye, ExternalLink, Search, Filter, Trash2, Download, RefreshCw } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { supabase } from '../../integrations/supabase/client';
import { toast } from 'sonner';

interface FormLead {
  id: string;
  form_id: string | null;
  form_name: string | null;
  lead_data: any;
  status: string;
  created_at: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  source_page: string | null;
  country: string | null;
  city: string | null;
}

interface FormGroup {
  formId: string;
  formName: string;
  leads: FormLead[];
  count: number;
}

export const LeadsManagement: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [leads, setLeads] = useState<FormLead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<FormLead[]>([]);
  const [formGroups, setFormGroups] = useState<FormGroup[]>([]);
  const [selectedFormId, setSelectedFormId] = useState<string>('all');
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<FormLead | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Carregar leads do Supabase
  const loadLeads = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('form_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao carregar leads:', error);
        toast.error('Erro ao carregar leads');
        return;
      }

      const validLeads = (data || []).filter(lead => {
        if (!lead.lead_data || typeof lead.lead_data !== 'object') return false;
        const leadData = lead.lead_data as any;
        return leadData.name || leadData.email;
      });

      setLeads(validLeads);
      setFilteredLeads(validLeads);
      
      // Agrupar leads por formulário
      const groups: Record<string, FormGroup> = {};
      
      validLeads.forEach(lead => {
        const formId = lead.form_id || 'unknown';
        const formName = lead.form_name || 'Formulário Padrão';
        
        if (!groups[formId]) {
          groups[formId] = {
            formId,
            formName,
            leads: [],
            count: 0
          };
        }
        
        groups[formId].leads.push(lead);
        groups[formId].count++;
      });

      setFormGroups(Object.values(groups));
    } catch (error) {
      console.error('Erro ao carregar leads:', error);
      toast.error('Erro ao carregar leads');
    } finally {
      setIsLoading(false);
    }
  };

  // Aplicar filtros
  useEffect(() => {
    let filtered = [...leads];

    // Filtro por formulário
    if (selectedFormId !== 'all') {
      filtered = filtered.filter(lead => lead.form_id === selectedFormId);
    }

    // Filtro por busca
    if (searchQuery) {
      filtered = filtered.filter(lead => {
        const searchText = searchQuery.toLowerCase();
        const data = lead.lead_data || {};
        return (
          data.name?.toLowerCase().includes(searchText) ||
          data.email?.toLowerCase().includes(searchText) ||
          data.phone?.toLowerCase().includes(searchText) ||
          data.message?.toLowerCase().includes(searchText)
        );
      });
    }

    // Filtro por status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }

    // Filtro por data
    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setDate(now.getDate() - 30);
          break;
      }
      
      if (dateFilter !== 'all') {
        filtered = filtered.filter(lead => new Date(lead.created_at) >= filterDate);
      }
    }

    setFilteredLeads(filtered);
  }, [leads, selectedFormId, searchQuery, statusFilter, dateFilter]);

  useEffect(() => {
    loadLeads();
  }, []);

  // Selecionar/deselecionar lead
  const toggleLeadSelection = (leadId: string) => {
    const newSelection = new Set(selectedLeads);
    if (newSelection.has(leadId)) {
      newSelection.delete(leadId);
    } else {
      newSelection.add(leadId);
    }
    setSelectedLeads(newSelection);
  };

  // Selecionar todos
  const selectAll = () => {
    if (selectedLeads.size === filteredLeads.length) {
      setSelectedLeads(new Set());
    } else {
      setSelectedLeads(new Set(filteredLeads.map(lead => lead.id)));
    }
  };

  // Deletar leads selecionados
  const deleteSelectedLeads = async () => {
    if (selectedLeads.size === 0) return;

    const confirmed = window.confirm(`Tem certeza que deseja deletar ${selectedLeads.size} lead(s)?`);
    if (!confirmed) return;

    try {
      const { error } = await supabase
        .from('form_leads')
        .delete()
        .in('id', Array.from(selectedLeads));

      if (error) {
        console.error('Erro ao deletar leads:', error);
        toast.error('Erro ao deletar leads');
        return;
      }

      setLeads(prev => prev.filter(lead => !selectedLeads.has(lead.id)));
      setSelectedLeads(new Set());
      toast.success(`${selectedLeads.size} lead(s) deletado(s) com sucesso!`);
    } catch (error) {
      console.error('Erro ao deletar leads:', error);
      toast.error('Erro ao deletar leads');
    }
  };

  // Abrir WhatsApp do cliente
  const openWhatsApp = (phone: string) => {
    if (!phone) return;
    
    const cleanPhone = phone.replace(/\D/g, '');
    let formattedPhone = cleanPhone;
    
    if (!cleanPhone.startsWith('55') && cleanPhone.length === 11) {
      formattedPhone = '55' + cleanPhone;
    }
    
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${formattedPhone}`;
    window.open(whatsappUrl, '_blank');
  };

  // Atualizar status do lead
  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('form_leads')
        .update({ status: newStatus })
        .eq('id', leadId);

      if (error) {
        console.error('Erro ao atualizar status:', error);
        toast.error('Erro ao atualizar status');
        return;
      }

      setLeads(prev => prev.map(lead => 
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      ));
      
      toast.success('Status atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast.error('Erro ao atualizar status');
    }
  };

  // Formatar data
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  // Obter cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'contacted': return 'bg-yellow-500';
      case 'qualified': return 'bg-green-500';
      case 'converted': return 'bg-purple-500';
      case 'lost': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  // Exportar leads
  const exportLeads = () => {
    const csvContent = [
      ['Nome', 'Email', 'Telefone', 'Status', 'Data', 'Formulário', 'Serviço', 'Mensagem'],
      ...filteredLeads.map(lead => [
        lead.lead_data?.name || '',
        lead.lead_data?.email || '',
        lead.lead_data?.phone || '',
        lead.status,
        formatDate(lead.created_at),
        lead.form_name || '',
        lead.lead_data?.service || '',
        lead.lead_data?.message || ''
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `leads_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${
          isDark ? 'border-white' : 'border-black'
        }`}></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header com estatísticas */}
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className={`${isDark ? 'text-white' : 'text-black'} flex items-center gap-2`}>
                <User className="w-5 h-5" />
                Gerenciar Leads ({leads.length} total)
              </CardTitle>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Gerencie todos os leads recebidos através dos formulários do site.
              </p>
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
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Resumo por formulário */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {formGroups.map((group) => (
          <Card 
            key={group.formId}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              isDark ? 'bg-black border-white/20 hover:border-white/40' : 'bg-white border-gray-200 hover:border-gray-400'
            } ${selectedFormId === group.formId ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setSelectedFormId(group.formId)}
          >
            <CardContent className="p-4">
              <div className="text-center">
                <h3 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-black'}`}>
                  {group.formName}
                </h3>
                <div className={`text-2xl font-bold mt-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  {group.count}
                </div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  lead{group.count !== 1 ? 's' : ''}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Card 
          className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
            isDark ? 'bg-black border-white/20 hover:border-white/40' : 'bg-white border-gray-200 hover:border-gray-400'
          } ${selectedFormId === 'all' ? 'ring-2 ring-blue-500' : ''}`}
          onClick={() => setSelectedFormId('all')}
        >
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-black'}`}>
                Todos
              </h3>
              <div className={`text-2xl font-bold mt-2 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                {leads.length}
              </div>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                total
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, email ou telefone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="new">Novo</SelectItem>
                <SelectItem value="contacted">Contatado</SelectItem>
                <SelectItem value="qualified">Qualificado</SelectItem>
                <SelectItem value="converted">Convertido</SelectItem>
                <SelectItem value="lost">Perdido</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}>
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todo período</SelectItem>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">Última semana</SelectItem>
                <SelectItem value="month">Último mês</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button 
                onClick={selectAll} 
                variant="outline" 
                size="sm"
                className="flex-1"
              >
                {selectedLeads.size === filteredLeads.length ? 'Desmarcar' : 'Marcar'} Todos
              </Button>
              {selectedLeads.size > 0 && (
                <Button 
                  onClick={deleteSelectedLeads} 
                  variant="destructive" 
                  size="sm"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista compacta de leads */}
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
            {selectedFormId === 'all' 
              ? `Todos os Leads (${filteredLeads.length})` 
              : `${formGroups.find(g => g.formId === selectedFormId)?.formName || 'Formulário'} (${filteredLeads.length})`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredLeads.length === 0 ? (
            <div className="text-center py-12">
              <User className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
              <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Nenhum lead encontrado
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                Ajuste os filtros ou aguarde novos leads chegarem
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredLeads.map((lead) => (
                <div 
                  key={lead.id}
                  className={`flex items-center gap-4 p-3 rounded-lg border hover:shadow-sm transition-all ${
                    isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <Checkbox
                    checked={selectedLeads.has(lead.id)}
                    onCheckedChange={() => toggleLeadSelection(lead.id)}
                  />

                  <div className={`w-3 h-3 rounded-full ${getStatusColor(lead.status)} flex-shrink-0`}></div>

                  <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-4 gap-2">
                    <div className="truncate">
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                        {lead.lead_data?.name || 'Nome não informado'}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {formatDate(lead.created_at)}
                      </p>
                    </div>
                    
                    <div className="truncate">
                      <p className={`text-sm ${isDark ? 'text-white' : 'text-black'}`}>
                        {lead.lead_data?.email || 'Email não informado'}
                      </p>
                    </div>

                    <div className="truncate">
                      <p className={`text-sm ${isDark ? 'text-white' : 'text-black'}`}>
                        {lead.lead_data?.phone || 'Telefone não informado'}
                      </p>
                    </div>

                    <div className="truncate">
                      <Badge variant="outline" className="text-xs">
                        {lead.form_name || 'Formulário Padrão'}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Select value={lead.status} onValueChange={(value) => updateLeadStatus(lead.id, value)}>
                      <SelectTrigger className="w-32 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">Novo</SelectItem>
                        <SelectItem value="contacted">Contatado</SelectItem>
                        <SelectItem value="qualified">Qualificado</SelectItem>
                        <SelectItem value="converted">Convertido</SelectItem>
                        <SelectItem value="lost">Perdido</SelectItem>
                      </SelectContent>
                    </Select>

                    {lead.lead_data?.phone && (
                      <Button
                        onClick={() => openWhatsApp(lead.lead_data.phone)}
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 bg-green-500 hover:bg-green-600 text-white border-green-500"
                      >
                        <MessageSquare className="w-3 h-3" />
                      </Button>
                    )}

                    <Button
                      onClick={() => setSelectedLead(selectedLead?.id === lead.id ? null : lead)}
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detalhes do lead selecionado */}
      {selectedLead && (
        <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
          <CardHeader>
            <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
              Detalhes do Lead: {selectedLead.lead_data?.name || 'Nome não informado'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                <h4 className="font-semibold mb-3">Informações Pessoais</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Nome:</strong> {selectedLead.lead_data?.name || 'Não informado'}</div>
                  <div><strong>Email:</strong> {selectedLead.lead_data?.email || 'Não informado'}</div>
                  <div><strong>Telefone:</strong> {selectedLead.lead_data?.phone || 'Não informado'}</div>
                  <div><strong>Serviço:</strong> {selectedLead.lead_data?.service || 'Não especificado'}</div>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                <h4 className="font-semibold mb-3">Informações do Contato</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Data:</strong> {formatDate(selectedLead.created_at)}</div>
                  <div><strong>Formulário:</strong> {selectedLead.form_name || 'Padrão'}</div>
                  <div><strong>Página:</strong> {selectedLead.source_page || 'Não informada'}</div>
                  <div><strong>Localização:</strong> {selectedLead.city && selectedLead.country ? `${selectedLead.city}, ${selectedLead.country}` : 'Não informada'}</div>
                </div>
              </div>

              {selectedLead.lead_data?.message && (
                <div className={`p-4 rounded-lg md:col-span-2 ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <h4 className="font-semibold mb-3">Mensagem</h4>
                  <p className="text-sm whitespace-pre-wrap">{selectedLead.lead_data.message}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};