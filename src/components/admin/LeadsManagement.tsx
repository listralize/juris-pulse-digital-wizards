import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { MessageSquare, Phone, Mail, Clock, User, Eye, ExternalLink } from 'lucide-react';
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
  const [formGroups, setFormGroups] = useState<FormGroup[]>([]);
  const [selectedFormId, setSelectedFormId] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<FormLead | null>(null);

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

      setLeads(data || []);
      
      // Agrupar leads por formulário
      const groups: Record<string, FormGroup> = {};
      
      (data || []).forEach(lead => {
        const formId = lead.form_id || 'unknown';
        const formName = lead.form_name || 'Formulário Desconhecido';
        
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

  useEffect(() => {
    loadLeads();
  }, []);

  // Filtrar leads baseado no formulário selecionado
  const filteredLeads = selectedFormId === 'all' 
    ? leads 
    : leads.filter(lead => lead.form_id === selectedFormId);

  // Abrir WhatsApp do cliente
  const openWhatsApp = (phone: string) => {
    if (!phone) return;
    
    // Limpar formatação do telefone
    const cleanPhone = phone.replace(/\D/g, '');
    let formattedPhone = cleanPhone;
    
    // Adicionar código do país se não tiver
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

      // Atualizar estado local
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

  // Obter status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500';
      case 'contacted':
        return 'bg-yellow-500';
      case 'qualified':
        return 'bg-green-500';
      case 'converted':
        return 'bg-purple-500';
      case 'lost':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Renderizar detalhes do lead
  const renderLeadDetails = (lead: FormLead) => {
    const data = lead.lead_data || {};
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Informações básicas */}
          <div className={`p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <User className="w-4 h-4" />
              Informações Pessoais
            </h4>
            <div className="space-y-2 text-sm">
              <div><strong>Nome:</strong> {data.name || 'Não informado'}</div>
              <div><strong>Email:</strong> {data.email || 'Não informado'}</div>
              <div><strong>Telefone:</strong> {data.phone || 'Não informado'}</div>
              {data.phone && (
                <Button
                  onClick={() => openWhatsApp(data.phone)}
                  size="sm"
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Abrir WhatsApp
                </Button>
              )}
            </div>
          </div>

          {/* Informações do contato */}
          <div className={`p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Detalhes do Contato
            </h4>
            <div className="space-y-2 text-sm">
              <div><strong>Data:</strong> {formatDate(lead.created_at)}</div>
              <div><strong>Formulário:</strong> {lead.form_name || 'Não identificado'}</div>
              <div><strong>Página:</strong> {lead.source_page || 'Não informada'}</div>
              <div><strong>Serviço:</strong> {data.service || 'Não especificado'}</div>
              {data.isUrgent && (
                <Badge variant="destructive">Urgente</Badge>
              )}
            </div>
          </div>
        </div>

        {/* Mensagem */}
        {data.message && (
          <div className={`p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
            <h4 className="font-semibold mb-2">Mensagem:</h4>
            <p className="text-sm whitespace-pre-wrap">{data.message}</p>
          </div>
        )}

        {/* Campos personalizados */}
        {Object.entries(data).filter(([key]) => 
          !['name', 'email', 'phone', 'message', 'service', 'isUrgent'].includes(key)
        ).length > 0 && (
          <div className={`p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
            <h4 className="font-semibold mb-2">Informações Adicionais:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {Object.entries(data)
                .filter(([key]) => !['name', 'email', 'phone', 'message', 'service', 'isUrgent'].includes(key))
                .map(([key, value]) => (
                  <div key={key}>
                    <strong>{key}:</strong> {String(value)}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* UTM e Tracking */}
        {(lead.utm_source || lead.utm_medium || lead.utm_campaign) && (
          <div className={`p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
            <h4 className="font-semibold mb-2">Origem do Tráfego:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
              {lead.utm_source && <div><strong>Fonte:</strong> {lead.utm_source}</div>}
              {lead.utm_medium && <div><strong>Meio:</strong> {lead.utm_medium}</div>}
              {lead.utm_campaign && <div><strong>Campanha:</strong> {lead.utm_campaign}</div>}
            </div>
          </div>
        )}

        {/* Ações */}
        <div className="flex gap-2 pt-4 border-t">
          <select
            value={lead.status}
            onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
            className={`px-3 py-2 rounded border ${
              isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-300 text-black'
            }`}
          >
            <option value="new">Novo</option>
            <option value="contacted">Contatado</option>
            <option value="qualified">Qualificado</option>
            <option value="converted">Convertido</option>
            <option value="lost">Perdido</option>
          </select>
        </div>
      </div>
    );
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
      {/* Header */}
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <CardTitle className={`${isDark ? 'text-white' : 'text-black'} flex items-center gap-2`}>
            <User className="w-5 h-5" />
            Gerenciar Leads ({leads.length} total)
          </CardTitle>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Visualize e gerencie todos os leads recebidos através dos formulários do site.
          </p>
        </CardHeader>
      </Card>

      {/* Resumo por formulário */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {formGroups.map((group) => (
          <Card 
            key={group.formId}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              isDark ? 'bg-black border-white/20 hover:border-white/40' : 'bg-white border-gray-200 hover:border-gray-400'
            } ${selectedFormId === group.formId ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setSelectedFormId(group.formId)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                    {group.formName}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {group.count} lead{group.count !== 1 ? 's' : ''}
                  </p>
                </div>
                <Badge variant="secondary">{group.count}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {/* Card para "Todos" */}
        <Card 
          className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
            isDark ? 'bg-black border-white/20 hover:border-white/40' : 'bg-white border-gray-200 hover:border-gray-400'
          } ${selectedFormId === 'all' ? 'ring-2 ring-blue-500' : ''}`}
          onClick={() => setSelectedFormId('all')}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                  Todos os Formulários
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {leads.length} lead{leads.length !== 1 ? 's' : ''} total
                </p>
              </div>
              <Badge variant="outline">{leads.length}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de leads */}
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
            {selectedFormId === 'all' 
              ? 'Todos os Leads' 
              : `Leads - ${formGroups.find(g => g.formId === selectedFormId)?.formName || 'Formulário'}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredLeads.length === 0 ? (
            <div className="text-center py-8">
              <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Nenhum lead encontrado para este formulário.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLeads.map((lead) => (
                <Card 
                  key={lead.id}
                  className={`transition-all duration-200 hover:shadow-md ${
                    isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(lead.status)}`}></div>
                        <div>
                          <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                            {lead.lead_data?.name || 'Nome não informado'}
                          </h4>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {formatDate(lead.created_at)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {lead.lead_data?.phone && (
                          <Button
                            onClick={() => openWhatsApp(lead.lead_data.phone)}
                            size="sm"
                            variant="outline"
                            className="bg-green-500 hover:bg-green-600 text-white border-green-500"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                        )}
                        
                        <Button
                          onClick={() => setSelectedLead(selectedLead?.id === lead.id ? null : lead)}
                          size="sm"
                          variant="outline"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Email:</span>
                        <p className={`${isDark ? 'text-white' : 'text-black'}`}>
                          {lead.lead_data?.email || 'Não informado'}
                        </p>
                      </div>
                      <div>
                        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Telefone:</span>
                        <p className={`${isDark ? 'text-white' : 'text-black'}`}>
                          {lead.lead_data?.phone || 'Não informado'}
                        </p>
                      </div>
                      <div>
                        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Serviço:</span>
                        <p className={`${isDark ? 'text-white' : 'text-black'}`}>
                          {lead.lead_data?.service || 'Não especificado'}
                        </p>
                      </div>
                    </div>

                    {/* Detalhes expandidos */}
                    {selectedLead?.id === lead.id && (
                      <div className="mt-4 pt-4 border-t">
                        {renderLeadDetails(lead)}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};