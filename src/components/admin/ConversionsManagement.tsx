
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Calendar, Trash2, Search, Filter, Download, MessageSquare, Users, TrendingUp, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface FormLead {
  id: string;
  session_id: string;
  visitor_id: string | null;
  form_id: string | null;
  form_name: string | null;
  lead_data: any;
  source_page: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  ip_address: string | null;
  user_agent: string | null;
  device_type: string | null;
  browser: string | null;
  country: string | null;
  city: string | null;
  is_whatsapp_conversion: boolean;
  conversion_value: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export const ConversionsManagement = () => {
  const [leads, setLeads] = useState<FormLead[]>([]);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    whatsapp: 0,
    forms: 0
  });

  const loadLeads = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('form_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setLeads(data || []);
      
      // Calcular estatísticas
      const today = new Date().toDateString();
      const todayLeads = data?.filter(lead => 
        new Date(lead.created_at).toDateString() === today
      ) || [];
      
      setStats({
        total: data?.length || 0,
        today: todayLeads.length,
        whatsapp: data?.filter(lead => lead.is_whatsapp_conversion).length || 0,
        forms: data?.filter(lead => !lead.is_whatsapp_conversion).length || 0
      });
      
    } catch (error) {
      console.error('Erro ao carregar leads:', error);
      toast.error('Erro ao carregar dados de conversões');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = searchTerm === '' || 
      JSON.stringify(lead.lead_data).toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.source_page?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.country?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    const matchesType = typeFilter === 'all' || 
      (typeFilter === 'whatsapp' && lead.is_whatsapp_conversion) ||
      (typeFilter === 'form' && !lead.is_whatsapp_conversion);

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedLeads(filteredLeads.map(lead => lead.id));
    } else {
      setSelectedLeads([]);
    }
  };

  const handleSelectLead = (leadId: string, checked: boolean) => {
    if (checked) {
      setSelectedLeads([...selectedLeads, leadId]);
    } else {
      setSelectedLeads(selectedLeads.filter(id => id !== leadId));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedLeads.length === 0) {
      toast.error('Selecione pelo menos um lead para deletar');
      return;
    }

    if (!confirm(`Tem certeza que deseja deletar ${selectedLeads.length} leads selecionados?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('form_leads')
        .delete()
        .in('id', selectedLeads);

      if (error) throw error;

      toast.success(`${selectedLeads.length} leads deletados com sucesso`);
      setSelectedLeads([]);
      loadLeads();
    } catch (error) {
      console.error('Erro ao deletar leads:', error);
      toast.error('Erro ao deletar leads selecionados');
    }
  };

  const handleUpdateStatus = async (leadId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('form_leads')
        .update({ status: newStatus })
        .eq('id', leadId);

      if (error) throw error;

      toast.success('Status atualizado com sucesso');
      loadLeads();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast.error('Erro ao atualizar status');
    }
  };

  const exportLeads = () => {
    const csvContent = [
      ['Data', 'Tipo', 'Nome', 'Email', 'Telefone', 'Página', 'Cidade', 'Status'],
      ...filteredLeads.map(lead => [
        format(new Date(lead.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR }),
        lead.is_whatsapp_conversion ? 'WhatsApp' : 'Formulário',
        lead.lead_data?.name || '-',
        lead.lead_data?.email || '-',
        lead.lead_data?.phone || '-',
        lead.source_page || '-',
        lead.city || '-',
        lead.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total de Leads</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Hoje</p>
                <p className="text-2xl font-bold text-white">{stats.today}</p>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">WhatsApp</p>
                <p className="text-2xl font-bold text-white">{stats.whatsapp}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Formulários</p>
                <p className="text-2xl font-bold text-white">{stats.forms}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Ações */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Gerenciar Conversões</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nome, email, cidade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            >
              <option value="all">Todos os Status</option>
              <option value="new">Novo</option>
              <option value="contacted">Contatado</option>
              <option value="qualified">Qualificado</option>
              <option value="converted">Convertido</option>
              <option value="lost">Perdido</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            >
              <option value="all">Todos os Tipos</option>
              <option value="form">Formulários</option>
              <option value="whatsapp">WhatsApp</option>
            </select>

            <Button
              onClick={exportLeads}
              variant="outline"
              className="border-gray-700 text-white hover:bg-gray-800"
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>

            {selectedLeads.length > 0 && (
              <Button
                onClick={handleBulkDelete}
                variant="destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Deletar ({selectedLeads.length})
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Leads */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead className="text-gray-300">
                    <Checkbox
                      checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-gray-300">Data/Hora</TableHead>
                  <TableHead className="text-gray-300">Tipo</TableHead>
                  <TableHead className="text-gray-300">Nome</TableHead>
                  <TableHead className="text-gray-300">Contato</TableHead>
                  <TableHead className="text-gray-300">Localização</TableHead>
                  <TableHead className="text-gray-300">Página</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id} className="border-gray-800">
                    <TableCell>
                      <Checkbox
                        checked={selectedLeads.includes(lead.id)}
                        onCheckedChange={(checked) => handleSelectLead(lead.id, !!checked)}
                      />
                    </TableCell>
                    <TableCell className="text-gray-300">
                      <div className="text-sm">
                        <div>{format(new Date(lead.created_at), 'dd/MM/yyyy', { locale: ptBR })}</div>
                        <div className="text-gray-500">{format(new Date(lead.created_at), 'HH:mm', { locale: ptBR })}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={lead.is_whatsapp_conversion ? "default" : "secondary"}
                        className={lead.is_whatsapp_conversion ? "bg-green-600" : "bg-blue-600"}
                      >
                        {lead.is_whatsapp_conversion ? 'WhatsApp' : 'Formulário'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      <div>
                        <div className="font-medium">{lead.lead_data?.name || 'N/A'}</div>
                        <div className="text-sm text-gray-500">{lead.device_type} - {lead.browser}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      <div className="text-sm">
                        {lead.lead_data?.email && <div>{lead.lead_data.email}</div>}
                        {lead.lead_data?.phone && <div>{lead.lead_data.phone}</div>}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      <div className="text-sm">
                        {lead.city && <div>{lead.city}</div>}
                        {lead.country && <div className="text-gray-500">{lead.country}</div>}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      <div className="text-sm max-w-xs truncate">
                        {lead.source_page || 'N/A'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                        className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm"
                      >
                        <option value="new">Novo</option>
                        <option value="contacted">Contatado</option>
                        <option value="qualified">Qualificado</option>
                        <option value="converted">Convertido</option>
                        <option value="lost">Perdido</option>
                      </select>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          setSelectedLeads([lead.id]);
                          handleBulkDelete();
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredLeads.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">Nenhuma conversão encontrada</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
