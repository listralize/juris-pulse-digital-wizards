import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { useTheme } from '../ThemeProvider';
import { supabase } from '../../integrations/supabase/client';
import { Target, DollarSign, MapPin, TrendingUp, Calculator, Users, MousePointer, FileText, Handshake } from 'lucide-react';

interface ConversionFunnelProps {
  analyticsData?: any;
}

interface FunnelMetrics {
  formViews: number;
  formSubmissions: number;
  contracts: number;
  adSpend: number;
  revenue: number;
}

export const ConversionFunnel: React.FC<ConversionFunnelProps> = ({ analyticsData }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [selectedForm, setSelectedForm] = useState<string>('all');
  const [availableForms, setAvailableForms] = useState<Array<{id: string, name: string}>>([]);
  const [metrics, setMetrics] = useState<FunnelMetrics>({
    formViews: 0,
    formSubmissions: 0,
    contracts: 0,
    adSpend: 0,
    revenue: 0
  });
  const [locationData, setLocationData] = useState<Array<{city: string, country: string, visitors: number}>>([]);

  // Carregar formulários disponíveis
  useEffect(() => {
    const loadForms = async () => {
      try {
        const { data: adminData } = await supabase
          .from('admin_settings')
          .select('form_config')
          .single();

        if (adminData?.form_config) {
          const formConfig = adminData.form_config as any;
          const forms = formConfig.forms || [];
          setAvailableForms([
            { id: 'all', name: 'Todos os Formulários' },
            ...forms.map((form: any) => ({ id: form.id, name: form.name }))
          ]);
        }
      } catch (error) {
        console.error('Erro ao carregar formulários:', error);
      }
    };

    loadForms();
  }, []);

  // Atualizar métricas baseado nos dados e formulário selecionado
  useEffect(() => {
    if (analyticsData) {
      console.log('📊 Atualizando funil com dados:', analyticsData);
      
      // Calcular visualizações de formulários (estimativa de 70% dos visitantes)
      const totalVisitors = analyticsData.visitors?.total || 0;
      const estimatedFormViews = Math.round(totalVisitors * 0.7);
      
      // Buscar submissions do formulário selecionado
      let formSubmissions = 0;
      if (selectedForm === 'all') {
        formSubmissions = analyticsData.conversions?.total || 0;
      } else {
        const formData = analyticsData.formSubmissions?.find((fs: any) => fs.formId === selectedForm);
        formSubmissions = formData?.count || 0;
      }

      setMetrics(prev => ({
        ...prev,
        formViews: estimatedFormViews,
        formSubmissions: formSubmissions
      }));

      // Processar dados de localização
      if (analyticsData.geographicData) {
        const locations = analyticsData.geographicData
          .map((item: any) => {
            const [city, country] = item.location.split(' - ');
            return { 
              city: city || 'Unknown', 
              country: country || 'Unknown', 
              visitors: item.count 
            };
          })
          .slice(0, 10);
        
        setLocationData(locations);
      }
    }
  }, [analyticsData, selectedForm]);

  const updateMetric = (field: keyof FunnelMetrics, value: string) => {
    const numValue = parseFloat(value) || 0;
    setMetrics(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  // Calcular taxas de conversão
  const viewsToSubmissions = metrics.formViews > 0 ? (metrics.formSubmissions / metrics.formViews) * 100 : 0;
  const submissionsToContracts = metrics.formSubmissions > 0 ? (metrics.contracts / metrics.formSubmissions) * 100 : 0;
  const overallConversion = metrics.formViews > 0 ? (metrics.contracts / metrics.formViews) * 100 : 0;

  // Calcular métricas financeiras
  const roi = metrics.adSpend > 0 ? ((metrics.revenue - metrics.adSpend) / metrics.adSpend) * 100 : 0;
  const costPerLead = metrics.formSubmissions > 0 ? metrics.adSpend / metrics.formSubmissions : 0;
  const costPerAcquisition = metrics.contracts > 0 ? metrics.adSpend / metrics.contracts : 0;
  const avgRevenuePerContract = metrics.contracts > 0 ? metrics.revenue / metrics.contracts : 0;

  return (
    <div className="space-y-6">
      {/* Controles */}
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-black'}`}>
            <Target className="w-5 h-5" />
            Funil de Conversão Interativo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <Label>Formulário</Label>
              <Select value={selectedForm} onValueChange={setSelectedForm}>
                <SelectTrigger className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200'}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableForms.map(form => (
                    <SelectItem key={form.id} value={form.id}>
                      {form.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Contratos Fechados</Label>
              <Input
                type="number"
                value={metrics.contracts}
                onChange={(e) => updateMetric('contracts', e.target.value)}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200'}`}
                placeholder="0"
              />
            </div>
            
            <div>
              <Label>Investimento (R$)</Label>
              <Input
                type="number"
                value={metrics.adSpend}
                onChange={(e) => updateMetric('adSpend', e.target.value)}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200'}`}
                placeholder="0"
              />
            </div>
            
            <div>
              <Label>Receita Total (R$)</Label>
              <Input
                type="number"
                value={metrics.revenue}
                onChange={(e) => updateMetric('revenue', e.target.value)}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200'}`}
                placeholder="0"
              />
            </div>

            <div className="flex items-end">
              <Button 
                onClick={() => console.log('Métricas atuais:', metrics)}
                className="w-full"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Calcular
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Funil Visual */}
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
            Funil de Conversão - {availableForms.find(f => f.id === selectedForm)?.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative max-w-4xl mx-auto">
            {/* Etapa 1: Visualizações de Formulário */}
            <div className="relative mb-4">
              <div 
                className="mx-auto h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-lg flex items-center justify-between px-6 shadow-lg"
                style={{ width: '100%' }}
              >
                <div className="flex items-center gap-3">
                  <MousePointer className="w-6 h-6 text-white" />
                  <div>
                    <div className="text-white font-bold text-lg">Visualizações do Formulário</div>
                    <div className="text-blue-100">Pessoas que viram o formulário</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">{metrics.formViews.toLocaleString()}</div>
                  <div className="text-blue-100">100%</div>
                </div>
              </div>
            </div>

            {/* Etapa 2: Envios do Formulário */}
            <div className="relative mb-4">
              <div 
                className="mx-auto h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-between px-6 shadow-lg"
                style={{ width: '85%' }}
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-white" />
                  <div>
                    <div className="text-white font-bold text-lg">Envios do Formulário</div>
                    <div className="text-green-100">Leads gerados</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">{metrics.formSubmissions.toLocaleString()}</div>
                  <div className="text-green-100">{viewsToSubmissions.toFixed(1)}%</div>
                </div>
              </div>
            </div>

            {/* Etapa 3: Contratos Fechados */}
            <div className="relative mb-4">
              <div 
                className="mx-auto h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-b-lg flex items-center justify-between px-6 shadow-lg"
                style={{ width: '60%' }}
              >
                <div className="flex items-center gap-3">
                  <Handshake className="w-6 h-6 text-white" />
                  <div>
                    <div className="text-white font-bold text-lg">Contratos Fechados</div>
                    <div className="text-purple-100">Clientes convertidos</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">{metrics.contracts.toLocaleString()}</div>
                  <div className="text-purple-100">{submissionsToContracts.toFixed(1)}%</div>
                </div>
              </div>
            </div>

            {/* Setas de Conexão */}
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-gray-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="absolute top-44 left-1/2 transform -translate-x-1/2 text-gray-400">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          {/* Métricas de Performance */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                {overallConversion.toFixed(1)}%
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Conversão Geral
              </div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className={`text-2xl font-bold ${roi >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {roi.toFixed(0)}%
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                ROI
              </div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                R$ {costPerLead.toFixed(0)}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Custo por Lead
              </div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                R$ {costPerAcquisition.toFixed(0)}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                CAC
              </div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                R$ {avgRevenuePerContract.toFixed(0)}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Ticket Médio
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Localização dos Visitantes */}
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-black'}`}>
            <MapPin className="w-5 h-5" />
            Origem dos Visitantes (Últimos 7 dias)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {locationData.map((location, index) => (
              <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="w-8 h-8 rounded-full p-0 flex items-center justify-center">
                    #{index + 1}
                  </Badge>
                  <div>
                    <div className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                      {location.city}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {location.country}
                    </div>
                  </div>
                </div>
                <div className={`font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                  {location.visitors}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};