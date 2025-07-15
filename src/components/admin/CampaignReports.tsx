import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { supabase } from '../../integrations/supabase/client';
import { Eye, Calendar, TrendingUp, DollarSign, Target, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface CampaignReport {
  id: string;
  campaign_name: string;
  form_id: string;
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
  facebook_pixel_config: any;
  conversion_api_config: any;
  period_start: string;
  period_end: string;
  created_at: string;
}

export const CampaignReports: React.FC = () => {
  const [reports, setReports] = useState<CampaignReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    setIsLoading(true);
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
      toast.success('Relatório excluído com sucesso');
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-muted-foreground">Carregando relatórios...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">📊 Relatórios de Campanha</h2>
          <p className="text-muted-foreground">
            Histórico de campanhas salvas com métricas de performance
          </p>
        </div>
        <Button onClick={loadReports} variant="outline">
          Atualizar
        </Button>
      </div>

      {reports.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">Nenhum relatório encontrado</h3>
              <p>Crie campanhas no Funil de Conversão para visualizar relatórios aqui.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {reports.map((report) => (
            <Card key={report.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {report.campaign_name}
                      <Badge variant="outline">{report.form_name}</Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(report.period_start)}
                        {report.period_start !== report.period_end && ` - ${formatDate(report.period_end)}`}
                      </span>
                      <span className="text-xs">
                        Criado em {formatDate(report.created_at)}
                      </span>
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteReport(report.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                {/* Métricas principais */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {report.form_submissions}
                    </div>
                    <div className="text-sm text-muted-foreground">Leads</div>
                  </div>

                  <div className="text-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {report.contracts}
                    </div>
                    <div className="text-sm text-muted-foreground">Contratos</div>
                  </div>

                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {report.conversion_rate.toFixed(1)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Conversão</div>
                  </div>

                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                    <div className={`text-2xl font-bold ${report.roi >= 0 ? 'text-purple-600' : 'text-red-600'}`}>
                      {report.roi.toFixed(0)}%
                    </div>
                    <div className="text-sm text-muted-foreground">ROI</div>
                  </div>
                </div>

                {/* Dados financeiros */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Investimento</span>
                      <DollarSign className="h-4 w-4 text-red-500" />
                    </div>
                    <div className="text-xl font-bold text-red-600">
                      {formatCurrency(report.ad_spend)}
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Receita</span>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="text-xl font-bold text-green-600">
                      {formatCurrency(report.revenue)}
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Lucro Líquido</span>
                      <Target className="h-4 w-4 text-purple-500" />
                    </div>
                    <div className={`text-xl font-bold ${report.lucro_liquido >= 0 ? 'text-purple-600' : 'text-red-600'}`}>
                      {formatCurrency(report.lucro_liquido)}
                    </div>
                  </div>
                </div>

                {/* Métricas detalhadas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Custo por Lead:</span>
                    <div className="font-medium">{formatCurrency(report.cost_per_lead)}</div>
                  </div>
                  
                  <div>
                    <span className="text-muted-foreground">CAC:</span>
                    <div className="font-medium">{formatCurrency(report.cost_per_acquisition)}</div>
                  </div>
                  
                  <div>
                    <span className="text-muted-foreground">Ticket Médio:</span>
                    <div className="font-medium">{formatCurrency(report.ticket_medio)}</div>
                  </div>

                  <div>
                    <span className="text-muted-foreground">Formulário ID:</span>
                    <div className="font-medium">{report.form_id}</div>
                  </div>
                </div>

                {/* Configurações do Facebook Pixel */}
                {report.facebook_pixel_config && Object.keys(report.facebook_pixel_config).length > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                    <div className="text-sm font-medium mb-2">📘 Configuração Facebook Pixel:</div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      {report.facebook_pixel_config.pixel_id && (
                        <div>Pixel ID: {report.facebook_pixel_config.pixel_id}</div>
                      )}
                      {report.facebook_pixel_config.conversion_api_token && (
                        <div>API de Conversão: Configurada</div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};