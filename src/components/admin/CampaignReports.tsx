
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
  Trash2,
  BarChart3,
  RefreshCw
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
    if (roi >= 300) return 'text-green-400';
    if (roi >= 200) return 'text-blue-400';
    if (roi >= 100) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-gray-600 border-t-white rounded-full mx-auto mb-4"></div>
          <p className="text-gray-300">Carregando relatórios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Relatórios de Campanha</h2>
              <p className="text-gray-400">
                Visualize o desempenho das suas campanhas de marketing
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-gray-300 border-gray-600">
                {reports.length} {reports.length === 1 ? 'relatório' : 'relatórios'}
              </Badge>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={loadReports}
                className="bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Atualizar
              </Button>
            </div>
          </div>
        </div>

        {reports.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-lg">
            <div className="text-center py-16">
              <BarChart3 className="w-16 h-16 mx-auto text-gray-600 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">Nenhum relatório encontrado</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Crie seu primeiro relatório na aba "Analytics" usando o funil de conversão.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report, index) => (
              <div 
                key={report.id}
                className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg overflow-hidden"
              >
                <Collapsible 
                  open={expandedReport === report.id}
                  onOpenChange={(open) => setExpandedReport(open ? report.id : null)}
                >
                  <CollapsibleTrigger asChild>
                    <div className="cursor-pointer hover:bg-gray-800 transition-colors p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-800 rounded-lg border border-gray-700">
                              {expandedReport === report.id ? (
                                <ChevronDown className="w-5 h-5 text-gray-300" />
                              ) : (
                                <ChevronRight className="w-5 h-5 text-gray-300" />
                              )}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">{report.campaign_name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge 
                                  variant="secondary" 
                                  className="text-xs bg-gray-800 text-gray-300 border-gray-600"
                                >
                                  {report.form_name}
                                </Badge>
                                <span className="text-gray-500 text-sm">
                                  {formatDate(report.created_at)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <div className="text-sm text-gray-500 mb-1">ROI</div>
                            <div className={`text-2xl font-bold ${getROIColor(report.roi)}`}>
                              {report.roi.toFixed(1)}%
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500 mb-1">Receita</div>
                            <div className="text-xl font-bold text-white">
                              {formatCurrency(report.revenue)}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500 mb-1">Lucro</div>
                            <div className={`text-lg font-bold ${report.lucro_liquido >= 0 ? 'text-white' : 'text-gray-500'}`}>
                              {formatCurrency(report.lucro_liquido)}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteReport(report.id);
                            }}
                            className="text-gray-500 hover:text-gray-300 hover:bg-gray-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="px-6 pb-6 space-y-6 border-t border-gray-800">
                      {/* Métricas Principais */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
                        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
                          <Users className="w-8 h-8 mx-auto mb-3 text-gray-300" />
                          <div className="text-3xl font-bold text-white">{report.form_submissions}</div>
                          <div className="text-sm text-gray-500">Leads Gerados</div>
                        </div>
                        
                        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
                          <Target className="w-8 h-8 mx-auto mb-3 text-gray-300" />
                          <div className="text-3xl font-bold text-white">{report.contracts}</div>
                          <div className="text-sm text-gray-500">Contratos Fechados</div>
                        </div>
                        
                        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
                          <TrendingUp className="w-8 h-8 mx-auto mb-3 text-gray-300" />
                          <div className="text-3xl font-bold text-white">{report.conversion_rate.toFixed(1)}%</div>
                          <div className="text-sm text-gray-500">Taxa de Conversão</div>
                        </div>
                        
                        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
                          <DollarSign className="w-8 h-8 mx-auto mb-3 text-gray-300" />
                          <div className="text-3xl font-bold text-white">{formatCurrency(report.ticket_medio)}</div>
                          <div className="text-sm text-gray-500">Ticket Médio</div>
                        </div>
                      </div>

                      {/* Investimento vs Resultados */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            💰 Investimento
                          </h4>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-gray-700 border border-gray-600 rounded-lg">
                              <span className="text-gray-300">Gasto em Anúncios</span>
                              <span className="font-bold text-white">{formatCurrency(report.ad_spend)}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-700 border border-gray-600 rounded-lg">
                              <span className="text-gray-300">Custo por Lead</span>
                              <span className="font-medium text-white">{formatCurrency(report.cost_per_lead)}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-700 border border-gray-600 rounded-lg">
                              <span className="text-gray-300">Custo por Aquisição</span>
                              <span className="font-medium text-white">{formatCurrency(report.cost_per_acquisition)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            📈 Resultados
                          </h4>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-gray-700 border border-gray-600 rounded-lg">
                              <span className="text-gray-300">Receita Total</span>
                              <span className="font-bold text-white">{formatCurrency(report.revenue)}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-700 border border-gray-600 rounded-lg">
                              <span className="text-gray-300">Lucro Líquido</span>
                              <span className={`font-bold ${report.lucro_liquido >= 0 ? 'text-white' : 'text-gray-500'}`}>
                                {formatCurrency(report.lucro_liquido)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-600 border border-gray-500 rounded-lg">
                              <span className="text-gray-300">ROI</span>
                              <span className={`font-bold text-xl ${report.roi >= 0 ? 'text-white' : 'text-gray-500'}`}>
                                {report.roi.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Performance Summary */}
                      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                        <h4 className="text-lg font-bold text-white mb-4">📊 Resumo da Performance</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div className="text-center">
                            <div className="text-gray-500">Taxa de Fechamento</div>
                            <div className="text-xl font-bold text-white">
                              {report.form_submissions > 0 ? ((report.contracts / report.form_submissions) * 100).toFixed(1) : 0}%
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-gray-500">ROAS</div>
                            <div className="text-xl font-bold text-white">
                              {report.ad_spend > 0 ? (report.revenue / report.ad_spend).toFixed(1) : 0}x
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-gray-500">Margem de Lucro</div>
                            <div className="text-xl font-bold text-white">
                              {report.revenue > 0 ? ((report.lucro_liquido / report.revenue) * 100).toFixed(1) : 0}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
