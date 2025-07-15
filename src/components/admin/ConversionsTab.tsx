
import React, { useState, useEffect } from 'react';
import { supabase } from '../../integrations/supabase/client';
import { useTheme } from '../ThemeProvider';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';
import { 
  Trash2, 
  Download, 
  Filter, 
  Calendar,
  Mail,
  Phone,
  User,
  MessageSquare,
  RefreshCw,
  TrendingUp
} from 'lucide-react';
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

export const ConversionsTab = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [leads, setLeads] = useState<FormLead[]>([]);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    conversionRate: 0
  });

  const loadLeads = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('form_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao carregar leads:', error);
        toast.error('Erro ao carregar dados dos leads');
        return;
      }

      setLeads(data || []);
      
      // Calcular estatísticas
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

      const todayLeads = data?.filter(lead => new Date(lead.created_at) >= today).length || 0;
      const weekLeads = data?.filter(lead => new Date(lead.created_at) >= weekAgo).length || 0;
      const monthLeads = data?.filter(lead => new Date(lead.created_at) >= monthAgo).length || 0;

      setStats({
        total: data?.length || 0,
        today: todayLeads,
        thisWeek: weekLeads,
        thisMonth: monthLeads,
        conversionRate: data?.length ? (data.filter(l => l.status === 'converted').length / data.length) * 100 : 0
      });

    } catch (error) {
      console.error('Erro ao carregar leads:', error);
      toast.error('Erro ao carregar dados');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedLeads(leads.map(lead => lead.id));
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

  const handleDeleteSelected = async () => {
    if (selectedLeads.length === 0) {
      toast.warning('Selecione pelo menos um lead para deletar');
      return;
    }

    if (!confirm(`Tem certeza que deseja deletar ${selectedLeads.length} lead(s) selecionado(s)?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('form_leads')
        .delete()
        .in('id', selectedLeads);

      if (error) {
        console.error('Erro ao deletar leads:', error);
        toast.error('Erro ao deletar leads');
        return;
      }

      toast.success(`${selectedLeads.length} lead(s) deletado(s) com sucesso`);
      setSelectedLeads([]);
      loadLeads();
    } catch (error) {
      console.error('Erro ao deletar leads:', error);
      toast.error('Erro ao deletar leads');
    }
  };

  const exportToCSV = () => {
    if (leads.length === 0) {
      toast.warning('Não há dados para exportar');
      return;
    }

    const headers = ['Nome', 'Email', 'Telefone', 'Mensagem', 'Data/Hora', 'Origem', 'Status'];
    const csvData = leads.map(lead => [
      lead.lead_data?.name || '',
      lead.lead_data?.email || '',
      lead.lead_data?.phone || '',
      lead.lead_data?.message || '',
      format(new Date(lead.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR }),
      lead.source_page || '',
      lead.status || 'new'
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      converted: 'bg-green-100 text-green-800',
      lost: 'bg-red-100 text-red-800'
    };

    const labels = {
      new: 'Novo',
      contacted: 'Contatado',
      converted: 'Convertido',
      lost: 'Perdido'
    };

    return (
      <Badge className={variants[status as keyof typeof variants] || variants.new}>
        {labels[status as keyof typeof labels] || 'Novo'}
      </Badge>
    );
  };

  useEffect(() => {
    loadLeads();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <RefreshCw className="h-6 w-6 animate-spin mr-2" />
        <span>Carregando conversões...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header com Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Total de Leads</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Hoje</p>
                <p className="text-2xl font-bold">{stats.today}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Esta Semana</p>
                <p className="text-2xl font-bold">{stats.thisWeek}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Este Mês</p>
                <p className="text-2xl font-bold">{stats.thisMonth}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Taxa Conversão</p>
                <p className="text-2xl font-bold">{stats.conversionRate.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controles */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Leads de Formulários ({leads.length})
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={loadLeads}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Atualizar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={exportToCSV}
                disabled={leads.length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar CSV
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDeleteSelected}
                disabled={selectedLeads.length === 0}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Deletar Selecionados ({selectedLeads.length})
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {leads.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Nenhum lead encontrado</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedLeads.length === leads.length}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Mensagem</TableHead>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Origem</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tipo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedLeads.includes(lead.id)}
                          onCheckedChange={(checked) => handleSelectLead(lead.id, !!checked)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">{lead.lead_data?.name || 'N/A'}</span>
                          </div>
                          {lead.lead_data?.email && (
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Mail className="h-3 w-3" />
                              <span>{lead.lead_data.email}</span>
                            </div>
                          )}
                          {lead.lead_data?.phone && (
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Phone className="h-3 w-3" />
                              <span>{lead.lead_data.phone}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <p className="text-sm truncate" title={lead.lead_data?.message}>
                            {lead.lead_data?.message || 'Sem mensagem'}
                          </p>
                          {lead.lead_data?.service && (
                            <p className="text-xs text-gray-500 mt-1">
                              Serviço: {lead.lead_data.service}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {format(new Date(lead.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                          <br />
                          <span className="text-gray-500">
                            {format(new Date(lead.created_at), 'HH:mm', { locale: ptBR })}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{lead.source_page || 'N/A'}</p>
                          {lead.utm_source && (
                            <p className="text-xs text-gray-500">
                              {lead.utm_source} / {lead.utm_medium}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{lead.city || 'N/A'}</p>
                          <p className="text-xs text-gray-500">{lead.country || 'N/A'}</p>
                          <p className="text-xs text-gray-500">{lead.device_type || 'N/A'}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(lead.status)}
                      </TableCell>
                      <TableCell>
                        {lead.is_whatsapp_conversion ? (
                          <Badge className="bg-green-100 text-green-800">WhatsApp</Badge>
                        ) : (
                          <Badge className="bg-blue-100 text-blue-800">Formulário</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
