import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useTheme } from '../ThemeProvider';
import { supabase } from '../../integrations/supabase/client';
import { Target, DollarSign, TrendingUp, FileText, Handshake, Calculator, Save, AlertTriangle, CheckCircle, CalendarIcon, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { format, addDays, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '../../lib/utils';
import { useFormConfig } from '@/hooks/useFormConfig';

interface ConversionFunnelProps {
  analyticsData?: any;
}

interface AvailableForm {
  id: string;
  name: string;
}

export const ConversionFunnel: React.FC<ConversionFunnelProps> = ({
  analyticsData
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedForm, setSelectedForm] = useState<string>('all');
  const [availableForms, setAvailableForms] = useState<AvailableForm[]>([]);
  const { multipleFormsConfig, isLoading: formsLoading } = useFormConfig();

  // Date range state
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: subDays(new Date(), 7),
    to: new Date()
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('7days');

  // Dados que o usuário controla
  const [formSubmissions, setFormSubmissions] = useState<number>(0);
  const [contracts, setContracts] = useState<number>(0);
  const [adSpend, setAdSpend] = useState<number>(0);
  const [revenue, setRevenue] = useState<number>(0);
  const [campaignName, setCampaignName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [marketingConfig, setMarketingConfig] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Predefined periods
  const periods = [
    { value: '7days', label: 'Últimos 7 dias' },
    { value: '30days', label: 'Últimos 30 dias' },
    { value: 'thisWeek', label: 'Esta semana' },
    { value: 'lastWeek', label: 'Semana passada' },
    { value: 'thisMonth', label: 'Este mês' },
    { value: 'lastMonth', label: 'Mês passado' },
    { value: 'thisYear', label: 'Este ano' },
    { value: 'custom', label: 'Período personalizado' }
  ];

  // Handle period selection
  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    const now = new Date();
    
    switch (period) {
      case '7days':
        setDateRange({ from: subDays(now, 7), to: now });
        break;
      case '30days':
        setDateRange({ from: subDays(now, 30), to: now });
        break;
      case 'thisWeek':
        setDateRange({
          from: startOfWeek(now, { weekStartsOn: 1 }),
          to: endOfWeek(now, { weekStartsOn: 1 })
        });
        break;
      case 'lastWeek':
        const lastWeekStart = startOfWeek(subDays(now, 7), { weekStartsOn: 1 });
        const lastWeekEnd = endOfWeek(subDays(now, 7), { weekStartsOn: 1 });
        setDateRange({ from: lastWeekStart, to: lastWeekEnd });
        break;
      case 'thisMonth':
        setDateRange({ from: startOfMonth(now), to: endOfMonth(now) });
        break;
      case 'lastMonth':
        const lastMonth = subDays(startOfMonth(now), 1);
        setDateRange({
          from: startOfMonth(lastMonth),
          to: endOfMonth(lastMonth)
        });
        break;
      case 'thisYear':
        setDateRange({ from: startOfYear(now), to: endOfYear(now) });
        break;
      case 'custom':
        // Keep current dates for custom selection
        break;
    }
  };

  // Carregar formulários diretamente do useFormConfig
  useEffect(() => {
    console.log('🔄 [ConversionFunnel] useFormConfig alterado:', { 
      formsLoading, 
      formsLength: multipleFormsConfig?.forms?.length,
      forms: multipleFormsConfig?.forms 
    });

    if (!formsLoading && multipleFormsConfig?.forms && multipleFormsConfig.forms.length > 0) {
      console.log('📋 [ConversionFunnel] Processando formulários do sistema...');
      
      // Mapear formulários do sistema
      const systemForms: AvailableForm[] = multipleFormsConfig.forms.map(form => ({
        id: form.id || 'default',
        name: form.name || 'Formulário sem nome'
      }));
      
      // Adicionar opção "Todos os Formulários" no início
      const allForms: AvailableForm[] = [
        { id: 'all', name: 'Todos os Formulários' },
        ...systemForms
      ];

      console.log('✅ [ConversionFunnel] Formulários carregados:', allForms);
      setAvailableForms(allForms);
    } else if (!formsLoading) {
      console.log('⚠️ [ConversionFunnel] Nenhum formulário encontrado, usando fallback');
      setAvailableForms([
        { id: 'all', name: 'Todos os Formulários' },
        { id: 'default', name: 'Formulário Principal' }
      ]);
    }
  }, [multipleFormsConfig, formsLoading]);

  // Refresh data based on date range
  const refreshAnalyticsData = async () => {
    setIsRefreshing(true);
    try {
      console.log('🔄 Buscando dados para período:', {
        from: dateRange.from.toISOString(),
        to: dateRange.to.toISOString(),
        selectedForm
      });

      // Query form leads for the selected period
      let query = supabase
        .from('form_leads')
        .select('*')
        .gte('created_at', dateRange.from.toISOString())
        .lte('created_at', dateRange.to.toISOString());

      // Se não for "all", filtrar pelo formulário específico
      if (selectedForm !== 'all') {
        query = query.eq('form_id', selectedForm);
      }

      const { data: formLeads, error: leadsError } = await query;

      if (leadsError) {
        console.error('❌ Erro ao carregar leads:', leadsError);
        throw leadsError;
      }

      console.log('📊 Leads encontrados:', formLeads);

      if (formLeads && Array.isArray(formLeads) && formLeads.length > 0) {
        // Contar total de envios - verificação de segurança adicional
        const validLeads = formLeads.filter(lead => lead && typeof lead === 'object');
        setFormSubmissions(validLeads.length);
        console.log('📈 Total de envios encontrados:', validLeads.length);
      } else {
        setFormSubmissions(0);
        console.log('📉 Nenhum envio encontrado para o período');
      }

      toast.success(`Dados atualizados para o período de ${format(dateRange.from, 'dd/MM/yyyy', { locale: ptBR })} a ${format(dateRange.to, 'dd/MM/yyyy', { locale: ptBR })}`);
    } catch (error) {
      console.error('❌ Erro ao atualizar dados:', error);
      toast.error('Erro ao atualizar dados do período selecionado');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Carregar configurações de marketing
  useEffect(() => {
    const loadMarketingConfig = async () => {
      try {
        const { data: settings } = await supabase
          .from('marketing_settings')
          .select('*')
          .maybeSingle();
        setMarketingConfig(settings);
      } catch (error) {
        console.error('❌ Erro ao carregar configurações de marketing:', error);
      }
    };
    loadMarketingConfig();
  }, []);

  // Refresh data when date range or selected form changes
  useEffect(() => {
    refreshAnalyticsData();
  }, [dateRange, selectedForm]);

  // Cálculos automáticos
  const conversionRate = formSubmissions > 0 ? contracts / formSubmissions * 100 : 0;
  const roi = adSpend > 0 ? (revenue - adSpend) / adSpend * 100 : 0;
  const costPerLead = formSubmissions > 0 ? adSpend / formSubmissions : 0;
  const costPerAcquisition = contracts > 0 ? adSpend / contracts : 0;
  const ticketMedio = contracts > 0 ? revenue / contracts : 0;
  const lucroLiquido = revenue - adSpend;

  // Função para salvar relatório de campanha
  const saveCampaignReport = async () => {
    if (!campaignName.trim()) {
      toast.error('Por favor, insira um nome para a campanha');
      return;
    }

    if (formSubmissions === 0) {
      toast.error('Não há dados de envios de formulário para salvar');
      return;
    }

    setIsLoading(true);
    try {
      const selectedFormData = availableForms.find(f => f.id === selectedForm);
      const reportData = {
        campaign_name: campaignName,
        form_id: selectedForm,
        form_name: selectedFormData?.name || 'Formulário desconhecido',
        form_submissions: formSubmissions,
        contracts,
        ad_spend: adSpend,
        revenue,
        conversion_rate: Number(conversionRate.toFixed(2)),
        roi: Number(roi.toFixed(2)),
        cost_per_lead: Number(costPerLead.toFixed(2)),
        cost_per_acquisition: Number(costPerAcquisition.toFixed(2)),
        ticket_medio: Number(ticketMedio.toFixed(2)),
        lucro_liquido: Number(lucroLiquido.toFixed(2)),
        facebook_pixel_config: {
          pixel_id: marketingConfig?.facebook_pixel_id || '',
          conversion_api_token: marketingConfig?.facebook_conversion_api_token || ''
        },
        period_start: format(dateRange.from, 'yyyy-MM-dd'),
        period_end: format(dateRange.to, 'yyyy-MM-dd')
      };

      const { error } = await supabase
        .from('campaign_reports')
        .insert(reportData);

      if (error) throw error;

      toast.success('Relatório de campanha salvo com sucesso!');
      setCampaignName('');
    } catch (error) {
      console.error('Erro ao salvar relatório:', error);
      toast.error('Erro ao salvar relatório de campanha');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Controles Compactos */}
      <Card className="h-fit">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Funil de Conversão
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Seletor de Período e Formulário */}
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Período</Label>
              <Select value={selectedPeriod} onValueChange={handlePeriodChange}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Selecione um período" />
                </SelectTrigger>
                <SelectContent>
                  {periods.map(period => (
                    <SelectItem key={period.value} value={period.value}>
                      {period.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Formulário</Label>
              <Select value={selectedForm} onValueChange={setSelectedForm}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Selecione um formulário" />
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
          </div>
          
          {/* Inputs Compactos */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Contratos</Label>
              <Input
                type="number"
                value={contracts}
                onChange={(e) => setContracts(Number(e.target.value) || 0)}
                className="h-10"
                placeholder="0"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Gasto (R$)</Label>
              <Input
                type="number"
                value={adSpend}
                onChange={(e) => setAdSpend(Number(e.target.value) || 0)}
                className="h-10"
                placeholder="0"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Receita (R$)</Label>
              <Input
                type="number"
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value) || 0)}
                className="h-10"
                placeholder="0"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Campanha</Label>
              <Input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="h-10"
                placeholder="Nome da campanha"
              />
            </div>
          </div>
          
          {/* Botões de Ação */}
          <div className="flex gap-2">
            <Button
              onClick={refreshAnalyticsData}
              disabled={isRefreshing}
              variant="outline"
              className="flex-1"
            >
              <RefreshCw className={cn("w-4 h-4 mr-2", isRefreshing && "animate-spin")} />
              {isRefreshing ? 'Atualizando...' : 'Atualizar'}
            </Button>
            
            <Button
              onClick={saveCampaignReport}
              disabled={isLoading || !campaignName.trim()}
              className="flex-1"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Funil Visual Compacto */}
      <Card className="h-fit">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">
            {availableForms.find(f => f.id === selectedForm)?.name || 'Carregando...'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Funil Visual Compacto */}
          <div className="space-y-3 mb-4">
            {/* Nível 1: Envios */}
            <div className="relative">
              <div className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-between px-4">
                <span className="text-white font-medium text-sm">
                  {formSubmissions.toLocaleString()} Envios
                </span>
                <span className="text-white/90 text-sm">100%</span>
              </div>
            </div>
            
            {/* Nível 2: Contratos */}
            <div className="relative">
              <div className="w-4/5 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-between px-4 mx-auto">
                <span className="text-white font-medium text-sm">
                  {contracts.toLocaleString()} Contratos
                </span>
                <span className="text-white/90 text-sm">{conversionRate.toFixed(1)}%</span>
              </div>
            </div>
            
            {/* Nível 3: Receita */}
            <div className="relative">
              <div className="w-3/5 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex items-center justify-between px-4 mx-auto">
                <span className="text-white font-medium text-sm">
                  R$ {revenue.toLocaleString()}
                </span>
                <span className="text-white/90 text-xs">
                  {contracts > 0 ? `R$ ${ticketMedio.toFixed(0)}` : '0'}
                </span>
              </div>
            </div>
            
            {/* Nível 4: Lucro */}
            <div className="relative">
              <div className={`w-2/5 h-12 rounded-lg flex items-center justify-between px-4 mx-auto ${
                lucroLiquido >= 0 
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600' 
                  : 'bg-gradient-to-r from-red-500 to-red-600'
              }`}>
                <span className="text-white font-medium text-sm">
                  R$ {lucroLiquido.toLocaleString()}
                </span>
                <span className="text-white/90 text-xs">
                  {roi.toFixed(0)}% ROI
                </span>
              </div>
            </div>
          </div>
          
          {/* Métricas Compactas */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t">
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <div className={`text-lg font-bold ${
                conversionRate >= 20 ? 'text-green-500' : 
                conversionRate >= 10 ? 'text-yellow-500' : 'text-red-500'
              }`}>
                {conversionRate.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">Taxa Conv.</div>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <div className="text-lg font-bold text-foreground">
                R$ {costPerLead.toFixed(0)}
              </div>
              <div className="text-xs text-muted-foreground">CPL</div>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <div className="text-lg font-bold text-foreground">
                R$ {costPerAcquisition.toFixed(0)}
              </div>
              <div className="text-xs text-muted-foreground">CAC</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
