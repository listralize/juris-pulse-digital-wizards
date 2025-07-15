import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  Calendar, 
  TrendingUp, 
  Target, 
  DollarSign, 
  Users, 
  ChevronDown, 
  ChevronRight,
  Eye,
  Trash2,
  BarChart3,
  Hash
} from 'lucide-react';

interface CampaignReport {
  id: string;
  campaign_name: string;
  form_name: string;
  form_submissions: number;
  contracts: number;
  ad_spend: number;
  revenue: number;
  conversion_rate: number;
  roi: number;
  cost_per_lead: number;
  cost_per_acquisition: number;
  ticket_medio: number;
  lucro_liquido: number;
  period_start: string;
  period_end: string;
  created_at: string;
  facebook_pixel_config?: any;
}

export const CampaignReports: React.FC = () => {
  const [reports, setReports] = useState<CampaignReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedReport, setExpandedReport] = useState<string | null>(null);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const { data, error } = await supabase
        .from('campaign_reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Erro ao carregar relatórios:', error);
      toast.error('Erro ao carregar relatórios de campanha');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteReport = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este relatório?')) return;

    try {
      const { error } = await supabase
        .from('campaign_reports')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setReports(prev => prev.filter(r => r.id !== id));
      toast.success('Relatório excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir relatório:', error);
      toast.error('Erro ao excluir relatório');
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getROIColor = (roi: number) => {
    if (roi >= 300) return 'text-green-600 bg-green-50';
    if (roi >= 200) return 'text-blue-600 bg-blue-50';
    if (roi >= 100) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando relatórios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Relatórios de Campanha</h2>
          <p className="text-muted-foreground">
            Visualize o desempenho das suas campanhas de marketing
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            {reports.length} {reports.length === 1 ? 'relatório' : 'relatórios'}
          </Badge>
          <Button variant="outline" size="sm" onClick={loadReports}>
            <BarChart3 className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
        </div>
      </div>

      {reports.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum relatório encontrado</h3>
            <p className="text-muted-foreground">
              Crie seu primeiro relatório na aba "Analytics" usando o funil de conversão.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id} className="overflow-hidden">
              <Collapsible 
                open={expandedReport === report.id}
                onOpenChange={(open) => setExpandedReport(open ? report.id : null)}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {expandedReport === report.id ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                          <CardTitle className="text-lg">{report.campaign_name}</CardTitle>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {report.form_name}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">ROI</div>
                          <div className={`text-lg font-bold px-2 py-1 rounded ${getROIColor(report.roi)}`}>
                            {report.roi.toFixed(1)}%
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Receita</div>
                          <div className="text-lg font-bold text-green-600">
                            {formatCurrency(report.revenue)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Data</div>
                          <div className="text-sm font-medium">
                            {formatDate(report.created_at)}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteReport(report.id);
                          }}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <CardContent className="pt-0 space-y-6">
                    {/* Métricas Principais */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <Users className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                        <div className="text-2xl font-bold text-blue-600">{report.form_submissions}</div>
                        <div className="text-sm text-muted-foreground">Leads</div>
                      </div>
                      
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <Target className="w-6 h-6 mx-auto mb-2 text-green-600" />
                        <div className="text-2xl font-bold text-green-600">{report.contracts}</div>
                        <div className="text-sm text-muted-foreground">Contratos</div>
                      </div>
                      
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <TrendingUp className="w-6 h-6 mx-auto mb-2 text-orange-600" />
                        <div className="text-2xl font-bold text-orange-600">{report.conversion_rate.toFixed(1)}%</div>
                        <div className="text-sm text-muted-foreground">Conversão</div>
                      </div>
                      
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <DollarSign className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                        <div className="text-2xl font-bold text-purple-600">{formatCurrency(report.ticket_medio)}</div>
                        <div className="text-sm text-muted-foreground">Ticket Médio</div>
                      </div>
                    </div>

                    {/* Custos e Resultados */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg">💰 Investimento</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <span className="text-muted-foreground">Gasto em Anúncios</span>
                            <span className="font-medium text-red-600">{formatCurrency(report.ad_spend)}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <span className="text-muted-foreground">Custo por Lead</span>
                            <span className="font-medium">{formatCurrency(report.cost_per_lead)}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <span className="text-muted-foreground">Custo por Aquisição</span>
                            <span className="font-medium">{formatCurrency(report.cost_per_acquisition)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg">📈 Resultados</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                            <span className="text-muted-foreground">Receita Total</span>
                            <span className="font-medium text-green-600">{formatCurrency(report.revenue)}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                            <span className="text-muted-foreground">Lucro Líquido</span>
                            <span className={`font-medium ${report.lucro_liquido >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {formatCurrency(report.lucro_liquido)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                            <span className="text-muted-foreground">ROI</span>
                            <span className={`font-bold ${report.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {report.roi.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Configuração do Facebook Pixel */}
                    {report.facebook_pixel_config && (
                      <div className="border-t pt-4">
                        <h4 className="font-semibold text-lg mb-3">🎯 Configuração do Pixel</h4>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <span className="text-sm text-muted-foreground">Facebook Pixel ID</span>
                              <div className="font-mono text-sm bg-white p-2 rounded border">
                                {report.facebook_pixel_config.pixel_id || 'Não configurado'}
                              </div>
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">API de Conversão</span>
                              <div className="text-sm">
                                {report.facebook_pixel_config.conversion_api_token ? 
                                  <Badge variant="secondary" className="text-green-600">✓ Configurado</Badge> : 
                                  <Badge variant="outline">Não configurado</Badge>
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};