import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { useTheme } from '../ThemeProvider';
import { supabase } from '../../integrations/supabase/client';
import { Calculator, TrendingUp, Users, Target, DollarSign, MapPin } from 'lucide-react';

interface FunnelData {
  formId: string;
  formName: string;
  pageViews: number;
  formViews: number;
  submissions: number;
  contracts: number;
  adSpend: number;
  contractValue: number;
}

interface LocationData {
  city: string;
  country: string;
  visitors: number;
}

interface ConversionFunnelProps {
  analyticsData?: any; // Recebe dados do componente pai
}

export const ConversionFunnel: React.FC<ConversionFunnelProps> = ({ analyticsData }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [selectedForm, setSelectedForm] = useState<string>('all');
  const [availableForms, setAvailableForms] = useState<Array<{id: string, name: string}>>([]);
  const [funnelData, setFunnelData] = useState<FunnelData>({
    formId: 'all',
    formName: 'Todos os Formulários',
    pageViews: 0,
    formViews: 0,
    submissions: 0,
    contracts: 0,
    adSpend: 0,
    contractValue: 0
  });
  const [locationData, setLocationData] = useState<LocationData[]>([]);
  const [editableValues, setEditableValues] = useState({
    contracts: 0,
    adSpend: 0,
    contractValue: 0
  });

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

  // Carregar dados do funil baseado no formulário selecionado e analytics data
  useEffect(() => {
    const loadFunnelData = async () => {
      try {
        console.log('🎯 Analytics data recebidos:', analyticsData);
        
        // Usar dados do analytics se disponíveis
        if (analyticsData) {
          const totalVisitors = analyticsData.visitors?.total || 0;
          const totalConversions = analyticsData.conversions?.total || 0;
          
          // Estimar visualizações do formulário (70% dos visitantes veem o formulário)
          const estimatedFormViews = Math.round(totalVisitors * 0.7);
          
          // Filtrar conversões por formulário se não for "all"
          let filteredSubmissions = totalConversions;
          if (selectedForm !== 'all') {
            const formSubmission = analyticsData.formSubmissions?.find(
              (fs: any) => fs.formId === selectedForm
            );
            filteredSubmissions = formSubmission?.count || 0;
          }

          const selectedFormData = availableForms.find(f => f.id === selectedForm);

          console.log('🔍 Dados do funil calculados:', {
            formId: selectedForm,
            formName: selectedFormData?.name || 'Todos os Formulários',
            pageViews: totalVisitors,
            formViews: estimatedFormViews,
            submissions: filteredSubmissions,
            contracts: editableValues.contracts,
            adSpend: editableValues.adSpend,
            contractValue: editableValues.contractValue
          });

          setFunnelData({
            formId: selectedForm,
            formName: selectedFormData?.name || 'Todos os Formulários',
            pageViews: totalVisitors,
            formViews: estimatedFormViews,
            submissions: filteredSubmissions,
            contracts: editableValues.contracts,
            adSpend: editableValues.adSpend,
            contractValue: editableValues.contractValue
          });

          // Processar dados de localização do analytics
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
        } else {
          // Fallback para buscar dados diretamente se analyticsData não estiver disponível
          const { data: analyticsData } = await supabase
            .from('website_analytics')
            .select('*')
            .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

          const { data: conversionData } = await supabase
            .from('conversion_events')
            .select('*')
            .eq('event_type', 'form_submission')
            .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

          let filteredConversions = conversionData || [];
          if (selectedForm !== 'all') {
            filteredConversions = conversionData?.filter(conv => conv.form_id === selectedForm) || [];
          }

          const uniqueVisitors = new Set(analyticsData?.map(a => a.visitor_id)).size;
          const estimatedFormViews = Math.round(uniqueVisitors * 0.7);

          setFunnelData({
            formId: selectedForm,
            formName: availableForms.find(f => f.id === selectedForm)?.name || 'Todos os Formulários',
            pageViews: uniqueVisitors,
            formViews: estimatedFormViews,
            submissions: filteredConversions.length,
            contracts: editableValues.contracts,
            adSpend: editableValues.adSpend,
            contractValue: editableValues.contractValue
          });
        }

      } catch (error) {
        console.error('❌ Erro ao carregar dados do funil:', error);
      }
    };

    loadFunnelData();
  }, [selectedForm, editableValues, availableForms, analyticsData]);

  const handleValueChange = (field: keyof typeof editableValues, value: string) => {
    const numValue = parseFloat(value) || 0;
    setEditableValues(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  // Calcular métricas do funil
  const conversionRate1 = funnelData.pageViews > 0 ? (funnelData.formViews / funnelData.pageViews) * 100 : 0;
  const conversionRate2 = funnelData.formViews > 0 ? (funnelData.submissions / funnelData.formViews) * 100 : 0;
  const conversionRate3 = funnelData.submissions > 0 ? (funnelData.contracts / funnelData.submissions) * 100 : 0;
  const overallConversion = funnelData.pageViews > 0 ? (funnelData.contracts / funnelData.pageViews) * 100 : 0;

  // Calcular ROI
  const totalRevenue = funnelData.contracts * funnelData.contractValue;
  const roi = funnelData.adSpend > 0 ? ((totalRevenue - funnelData.adSpend) / funnelData.adSpend) * 100 : 0;
  const costPerLead = funnelData.submissions > 0 ? funnelData.adSpend / funnelData.submissions : 0;
  const costPerAcquisition = funnelData.contracts > 0 ? funnelData.adSpend / funnelData.contracts : 0;

  return (
    <div className="space-y-6">
      {/* Controles do Funil */}
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-black'}`}>
            <Target className="w-5 h-5" />
            Funil de Conversão Interativo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label>Selecionar Formulário</Label>
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
                value={editableValues.contracts}
                onChange={(e) => handleValueChange('contracts', e.target.value)}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200'}`}
              />
            </div>
            
            <div>
              <Label>Investimento em Anúncios (R$)</Label>
              <Input
                type="number"
                value={editableValues.adSpend}
                onChange={(e) => handleValueChange('adSpend', e.target.value)}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200'}`}
              />
            </div>
            
            <div>
              <Label>Valor por Contrato (R$)</Label>
              <Input
                type="number"
                value={editableValues.contractValue}
                onChange={(e) => handleValueChange('contractValue', e.target.value)}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200'}`}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Funil Visual */}
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
            Funil de Conversão - {funnelData.formName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Etapa 1: Visualizações da Página */}
            <div className="relative">
              <div className={`w-full h-16 flex items-center justify-between px-6 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600`}>
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-white" />
                  <div>
                    <div className="text-white font-semibold">Visualizações da Página</div>
                    <div className="text-blue-100 text-sm">Visitantes únicos na página</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{funnelData.pageViews}</div>
                  <div className="text-blue-100 text-sm">100%</div>
                </div>
              </div>
            </div>

            {/* Etapa 2: Visualizações do Formulário */}
            <div className="relative">
              <div className={`w-5/6 h-16 flex items-center justify-between px-6 rounded-lg bg-gradient-to-r from-green-500 to-green-600 mx-auto`}>
                <div className="flex items-center gap-3">
                  <Target className="w-6 h-6 text-white" />
                  <div>
                    <div className="text-white font-semibold">Visualizações do Formulário</div>
                    <div className="text-green-100 text-sm">Usuários que viram o formulário</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{funnelData.formViews}</div>
                  <div className="text-green-100 text-sm">{conversionRate1.toFixed(1)}%</div>
                </div>
              </div>
            </div>

            {/* Etapa 3: Envios do Formulário */}
            <div className="relative">
              <div className={`w-4/6 h-16 flex items-center justify-between px-6 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 mx-auto`}>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-white" />
                  <div>
                    <div className="text-white font-semibold">Envios do Formulário</div>
                    <div className="text-orange-100 text-sm">Leads gerados</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{funnelData.submissions}</div>
                  <div className="text-orange-100 text-sm">{conversionRate2.toFixed(1)}%</div>
                </div>
              </div>
            </div>

            {/* Etapa 4: Contratos Fechados */}
            <div className="relative">
              <div className={`w-3/6 h-16 flex items-center justify-between px-6 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 mx-auto`}>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-6 h-6 text-white" />
                  <div>
                    <div className="text-white font-semibold">Contratos Fechados</div>
                    <div className="text-purple-100 text-sm">Clientes convertidos</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{funnelData.contracts}</div>
                  <div className="text-purple-100 text-sm">{conversionRate3.toFixed(1)}%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Métricas de Performance */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                {overallConversion.toFixed(1)}%
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Conversão Geral
              </div>
            </div>
            
            <div className="text-center">
              <div className={`text-2xl font-bold ${roi >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {roi.toFixed(0)}%
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                ROI
              </div>
            </div>
            
            <div className="text-center">
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                R$ {costPerLead.toFixed(0)}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Custo por Lead
              </div>
            </div>
            
            <div className="text-center">
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                R$ {costPerAcquisition.toFixed(0)}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                CAC
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visitantes por Localização */}
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-black'}`}>
            <MapPin className="w-5 h-5" />
            Visitantes por Localização (Últimos 7 dias)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {locationData.map((location, index) => (
              <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="w-8 h-8 rounded-full p-0 flex items-center justify-center">
                    #{index + 1}
                  </Badge>
                  <div>
                    <div className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                      {location.city} - {location.country}
                    </div>
                  </div>
                </div>
                <div className={`font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                  {location.visitors} visitantes
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};