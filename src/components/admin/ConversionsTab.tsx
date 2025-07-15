
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  Search, 
  Trash2, 
  Download, 
  Users, 
  Calendar, 
  TrendingUp, 
  Filter,
  CheckSquare,
  Square,
  RefreshCw,
  MessageSquare,
  Phone
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '../../integrations/supabase/client';

interface FormLead {
  id: string;
  lead_data: any;
  created_at: string;
  form_id: string | null;
  form_name: string | null;
  source_page: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  status: string;
  country: string | null;
  city: string | null;
  device_type: string | null;
  browser: string | null;
  conversion_value: number | null;
}

interface ConversionStats {
  total: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
  conversionRate: number;
}

export const ConversionsTab: React.FC = () => {
  const [leads, setLeads] = useState<FormLead[]>([]);
  const [stats, setStats] = useState<ConversionStats>({
    total: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    conversionRate: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    loadConversions();
    loadStats();
  }, []);

  const loadConversions = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('form_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Erro ao carregar conversões:', error);
      toast.error('Erro ao carregar dados de conversões');
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const today = new Date();
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const weekStart = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

      // Total leads
      const { count: total } = await supabase
        .from('form_leads')
        .select('*', { count: 'exact', head: true });

      // Today's leads
      const { count: todayCount } = await supabase
        .from('form_leads')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', todayStart.toISOString());

      // This week's leads
      const { count: weekCount } = await supabase
        .from('form_leads')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', weekStart.toISOString());

      // This month's leads
      const { count: monthCount } = await supabase
        .from('form_leads')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', monthStart.toISOString());

      // Get total visitors for conversion rate
      const { count: totalVisitors } = await supabase
        .from('website_analytics')
        .select('*', { count: 'exact', head: true })
        .gte('timestamp', weekStart.toISOString());

      const conversionRate = totalVisitors ? ((weekCount || 0) / totalVisitors * 100) : 0;

      setStats({
        total: total || 0,
        today: todayCount || 0,
        thisWeek: weekCount || 0,
        thisMonth: monthCount || 0,
        conversionRate: Number(conversionRate.toFixed(2))
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  const handleSelectAll = () => {
    if (selectedLeads.size === filteredLeads.length) {
      setSelectedLeads(new Set());
    } else {
      setSelectedLeads(new Set(filteredLeads.map(lead => lead.id)));
    }
  };

  const handleSelectLead = (leadId: string) => {
    const newSelected = new Set(selectedLeads);
    if (newSelected.has(leadId)) {
      newSelected.delete(leadId);
    } else {
      newSelected.add(leadId);
    }
    setSelectedLeads(newSelected);
  };

  const handleDeleteSelected = async () => {
    if (selectedLeads.size === 0) return;

    if (!confirm(`Deseja realmente deletar ${selectedLeads.size} lead(s) selecionado(s)?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('form_leads')
        .delete()
        .in('id', Array.from(selectedLeads));

      if (error) throw error;

      toast.success(`${selectedLeads.size} lead(s) deletado(s) com sucesso!`);
      setSelectedLeads(new Set());
      loadConversions();
      loadStats();
    } catch (error) {
      console.error('Erro ao deletar leads:', error);
      toast.error('Erro ao deletar leads selecionados');
    }
  };

  const handleExportCSV = () => {
    const csvData = filteredLeads.map(lead => ({
      'Data/Hora': new Date(lead.created_at).toLocaleString('pt-BR'),
      'Nome': lead.lead_data?.name || '',
      'Email': lead.lead_data?.email || '',
      'Telefone': lead.lead_data?.phone || '',
      'Mensagem': lead.lead_data?.message || '',
      'Formulário': lead.form_name || lead.form_id || 'N/A',
      'Página Origem': lead.source_page || '',
      'UTM Source': lead.utm_source || '',
      'UTM Medium': lead.utm_medium || '',
      'UTM Campaign': lead.utm_campaign || '',
      'Status': lead.status,
      'País': lead.country || '',
      'Cidade': lead.city || '',
      'Dispositivo': lead.device_type || '',
      'Navegador': lead.browser || '',
      'Valor Conversão': lead.conversion_value || 0
    }));

    const csvContent = [
      Object.keys(csvData[0] || {}).join(','),
      ...csvData.map(row => Object.values(row).map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `conversoes_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const handleWhatsAppContact = (phone: string, name: string) => {
    if (!phone) {
      toast.error('Número de telefone não disponível');
      return;
    }
    
    // Remove caracteres não numéricos
    const cleanPhone = phone.replace(/\D/g, '');
    const message = `Olá ${name || 'cliente'}, vi que você entrou em contato através do nosso site. Como posso ajudá-lo?`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=55${cleanPhone}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = searchTerm === '' || 
      lead.lead_data?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.lead_data?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.lead_data?.phone?.includes(searchTerm) ||
      lead.form_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLeads = filteredLeads.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      'new': 'default',
      'contacted': 'secondary',
      'qualified': 'outline',
      'converted': 'default',
      'lost': 'destructive'
    };
    
    const labels: Record<string, string> = {
      'new': 'Novo',
      'contacted': 'Contatado',
      'qualified': 'Qualificado',
      'converted': 'Convertido',
      'lost': 'Perdido'
    };

    return (
      <Badge variant={variants[status] || 'outline'}>
        {labels[status] || status}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Conversões de Formulários</h1>
          <p className="text-muted-foreground">
            Gerencie e analise todos os leads gerados pelos formulários do site
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button onClick={loadConversions} variant="outline" size="sm" disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
          <Button onClick={handleExportCSV} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
          {selectedLeads.size > 0 && (
            <Button onClick={handleDeleteSelected} variant="destructive" size="sm">
              <Trash2 className="w-4 h-4 mr-2" />
              Deletar ({selectedLeads.size})
            </Button>
          )}
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Leads</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Hoje</p>
                <p className="text-3xl font-bold">{stats.today}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Esta Semana</p>
                <p className="text-3xl font-bold">{stats.thisWeek}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Este Mês</p>
                <p className="text-3xl font-bold">{stats.thisMonth}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Taxa Conversão</p>
                <p className="text-3xl font-bold">{stats.conversionRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex gap-4 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por nome, email, telefone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="all">Todos os Status</option>
                <option value="new">Novo</option>
                <option value="contacted">Contatado</option>
                <option value="qualified">Qualificado</option>
                <option value="converted">Convertido</option>
                <option value="lost">Perdido</option>
              </select>
            </div>
            
            <div className="text-sm text-muted-foreground">
              {filteredLeads.length} lead(s) encontrado(s)
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground">
              <p>Nenhum lead encontrado</p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedLeads.size === filteredLeads.length && filteredLeads.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Mensagem</TableHead>
                    <TableHead>Formulário</TableHead>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Origem</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedLeads.has(lead.id)}
                          onCheckedChange={() => handleSelectLead(lead.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{lead.lead_data?.name || 'N/A'}</div>
                          <div className="text-sm text-muted-foreground">{lead.lead_data?.email || 'N/A'}</div>
                          <div className="text-sm text-muted-foreground">{lead.lead_data?.phone || 'N/A'}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate" title={lead.lead_data?.message}>
                          {lead.lead_data?.message || 'N/A'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {lead.form_name || lead.form_id || 'N/A'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(lead.created_at).toLocaleTimeString('pt-BR')}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {lead.source_page && (
                            <div className="text-xs truncate max-w-32" title={lead.source_page}>
                              {lead.source_page}
                            </div>
                          )}
                          {lead.utm_source && (
                            <Badge variant="secondary" className="text-xs">
                              {lead.utm_source}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {lead.country && (
                            <div className="text-sm">{lead.country}</div>
                          )}
                          {lead.city && (
                            <div className="text-xs text-muted-foreground">{lead.city}</div>
                          )}
                          {lead.device_type && (
                            <Badge variant="outline" className="text-xs">
                              {lead.device_type}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(lead.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {lead.lead_data?.phone && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleWhatsAppContact(lead.lead_data.phone, lead.lead_data.name)}
                              className="h-8 w-8 p-0"
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          )}
                          {lead.lead_data?.phone && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(`tel:${lead.lead_data.phone}`, '_self')}
                              className="h-8 w-8 p-0"
                            >
                              <Phone className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Paginação */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversionsTab;
