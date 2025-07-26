import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { RefreshCw, Download, Search, Trash2 } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { supabase } from '../../integrations/supabase/client';
import { toast } from 'sonner';

export const LeadsManagement: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [leads, setLeads] = useState<any[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [formFilter, setFormFilter] = useState('all');
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());

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
          (lead.page_url || '').toLowerCase().includes(query)
        );
      });
    }

    setFilteredLeads(filtered);
  }, [leads, formFilter, searchQuery]);

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
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar em todos os campos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={formFilter} onValueChange={setFormFilter}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Filtrar por formulário" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os formulários</SelectItem>
            {uniqueForms.map(formId => (
              <SelectItem key={formId} value={formId}>
                {formId}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Leads */}
      <div className="space-y-4">
        {filteredLeads.map((lead) => {
          const leadData = lead.lead_data || {};
          const isSelected = selectedLeads.has(lead.id);

          return (
            <Card key={lead.id} className={`${isSelected ? 'ring-2 ring-primary' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
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
                      className="rounded"
                    />
                    <div>
                      <CardTitle className="text-lg">
                        {leadData.name || leadData.nome || 'Nome não informado'}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{lead.form_name || lead.form_id}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(lead.created_at).toLocaleString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div>
                    <strong>Email:</strong> {leadData.email || 'Não informado'}
                  </div>
                  <div>
                    <strong>Telefone:</strong> {leadData.phone || leadData.telefone || 'Não informado'}
                  </div>
                  <div>
                    <strong>Serviço:</strong> {leadData.service || leadData.servico || 'Não informado'}
                  </div>
                  <div>
                    <strong>Página:</strong> {lead.page_url || 'Não informado'}
                  </div>
                  <div>
                    <strong>Campanha:</strong> {lead.campaign_name || 'Não informado'}
                  </div>
                  <div>
                    <strong>Valor:</strong> R$ {lead.conversion_value || 0}
                  </div>
                </div>
                {leadData.message && (
                  <div className="mt-3 p-3 bg-muted rounded">
                    <strong>Mensagem:</strong> {leadData.message}
                  </div>
                )}
                {leadData.isUrgent && (
                  <Badge variant="destructive" className="mt-2">
                    Urgente
                  </Badge>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredLeads.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Nenhum lead encontrado</p>
        </div>
      )}
    </div>
  );
};