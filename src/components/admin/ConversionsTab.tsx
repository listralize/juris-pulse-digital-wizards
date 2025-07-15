
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../ui/table';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  Trash2, 
  Download, 
  Search, 
  Filter,
  Users,
  TrendingUp,
  Calendar,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Clock,
  Loader2
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ConversionEvent {
  id: string;
  session_id: string;
  visitor_id: string;
  event_type: string;
  event_category: string;
  event_action: string;
  event_label: string;
  form_id: string;
  form_name: string;
  campaign_source: string;
  campaign_medium: string;
  campaign_name: string;
  page_url: string;
  referrer: string;
  user_agent: string;
  lead_data: any;
  conversion_value: number;
  timestamp: string;
  created_at: string;
}

interface ConversionStats {
  total: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
  conversionRate: number;
}

export const ConversionsTab: React.FC = () => {
  const [conversions, setConversions] = useState<ConversionEvent[]>([]);
  const [stats, setStats] = useState<ConversionStats>({
    total: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    conversionRate: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadConversions();
    loadStats();
  }, [currentPage, searchTerm]);

  const loadConversions = async () => {
    try {
      setIsLoading(true);
      console.log('🔄 Carregando conversões...');

      let query = supabase
        .from('conversion_events')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`form_name.ilike.%${searchTerm}%,campaign_source.ilike.%${searchTerm}%,page_url.ilike.%${searchTerm}%`);
      }

      const { data, error, count } = await query
        .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

      if (error) throw error;

      setConversions(data || []);
      setTotalPages(Math.ceil((count || 0) / itemsPerPage));
      
      console.log('✅ Conversões carregadas:', data?.length);
    } catch (error) {
      console.error('❌ Erro ao carregar conversões:', error);
      toast.error('Erro ao carregar dados de conversão');
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekStart = new Date(today.getTime() - (today.getDay() * 24 * 60 * 60 * 1000));
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

      // Total de conversões
      const { count: total } = await supabase
        .from('conversion_events')
        .select('*', { count: 'exact', head: true });

      // Conversões de hoje
      const { count: todayCount } = await supabase
        .from('conversion_events')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString());

      // Conversões desta semana
      const { count: weekCount } = await supabase
        .from('conversion_events')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', weekStart.toISOString());

      // Conversões deste mês
      const { count: monthCount } = await supabase
        .from('conversion_events')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', monthStart.toISOString());

      setStats({
        total: total || 0,
        today: todayCount || 0,
        thisWeek: weekCount || 0,
        thisMonth: monthCount || 0,
        conversionRate: 0 // Calcular baseado em analytics se disponível
      });
    } catch (error) {
      console.error('❌ Erro ao carregar estatísticas:', error);
    }
  };

  const handleSelectAll = () => {
    if (selectedIds.length === conversions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(conversions.map(conv => conv.id));
    }
  };

  const handleSelectItem = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;

    try {
      setIsDeleting(true);
      console.log('🗑️ Deletando conversões selecionadas:', selectedIds);

      const { error } = await supabase
        .from('conversion_events')
        .delete()
        .in('id', selectedIds);

      if (error) throw error;

      toast.success(`${selectedIds.length} conversão(ões) deletada(s) com sucesso!`);
      setSelectedIds([]);
      loadConversions();
      loadStats();
    } catch (error) {
      console.error('❌ Erro ao deletar conversões:', error);
      toast.error('Erro ao deletar conversões selecionadas');
    } finally {
      setIsDeleting(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['Data', 'Formulário', 'Origem', 'Campanha', 'Página', 'Dados do Lead'];
    const csvData = conversions.map(conv => [
      format(new Date(conv.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR }),
      conv.form_name || 'N/A',
      conv.campaign_source || 'Direto',
      conv.campaign_name || 'N/A',
      conv.page_url,
      JSON.stringify(conv.lead_data)
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `conversoes_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
  };

  const getLeadInfo = (leadData: any) => {
    if (!leadData) return { name: 'N/A', email: 'N/A', phone: 'N/A' };
    
    return {
      name: leadData.name || leadData.nome || 'N/A',
      email: leadData.email || 'N/A',
      phone: leadData.phone || leadData.telefone || 'N/A'
    };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Carregando conversões...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Conversões de Formulários</h3>
        <p className="text-muted-foreground">
          Gerencie e analise todas as conversões capturadas pelos formulários do site
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Hoje</p>
                <p className="text-2xl font-bold">{stats.today}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Esta Semana</p>
                <p className="text-2xl font-bold">{stats.thisWeek}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Este Mês</p>
                <p className="text-2xl font-bold">{stats.thisMonth}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controles */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Lista de Conversões
            </CardTitle>
            
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar conversões..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              
              {selectedIds.length > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteSelected}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4 mr-2" />
                  )}
                  Deletar ({selectedIds.length})
                </Button>
              )}
              
              <Button variant="outline" size="sm" onClick={exportToCSV}>
                <Download className="w-4 h-4 mr-2" />
                Exportar CSV
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {conversions.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhuma conversão encontrada</h3>
              <p className="text-muted-foreground">
                {searchTerm ? 'Tente ajustar os filtros de busca' : 'As conversões aparecerão aqui quando os formulários forem enviados'}
              </p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedIds.length === conversions.length}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Formulário</TableHead>
                    <TableHead>Origem</TableHead>
                    <TableHead>Página</TableHead>
                    <TableHead>Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {conversions.map((conversion) => {
                    const leadInfo = getLeadInfo(conversion.lead_data);
                    return (
                      <TableRow key={conversion.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedIds.includes(conversion.id)}
                            onCheckedChange={() => handleSelectItem(conversion.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">
                                {format(new Date(conversion.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {format(new Date(conversion.created_at), 'HH:mm', { locale: ptBR })}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{leadInfo.name}</div>
                            <div className="text-sm text-muted-foreground">{leadInfo.email}</div>
                            {leadInfo.phone !== 'N/A' && (
                              <div className="text-sm text-muted-foreground">{leadInfo.phone}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {conversion.form_name || 'Formulário'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {conversion.campaign_source || 'Direto'}
                            </div>
                            {conversion.campaign_name && (
                              <div className="text-sm text-muted-foreground">
                                {conversion.campaign_name}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs truncate" title={conversion.page_url}>
                            {conversion.page_url}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={conversion.conversion_value > 0 ? "default" : "secondary"}>
                            R$ {(conversion.conversion_value || 0).toFixed(2)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              {/* Paginação */}
              {totalPages > 1 && (
                <div className="mt-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = i + 1;
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setCurrentPage(page)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
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
