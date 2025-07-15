
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

  // Load all available forms from database automatically
  const loadAllAvailableForms = async () => {
    try {
      console.log('🔄 Buscando todos os formulários disponíveis...');

      // Buscar todos os form_ids únicos que têm leads
      const { data: formLeads, error } = await supabase
        .from('form_leads')
        .select('form_id, form_name');

      if (error) {
        console.error('❌ Erro ao carregar formulários:', error);
        throw error;
      }

      console.log('📋 Form leads brutos encontrados:', formLeads);

      if (!formLeads || formLeads.length === 0) {
        console.log('⚠️ Nenhum formulário com leads encontrado');
        const fallbackForms = [
          { id: 'all', name: 'Todos os Formulários' }
        ];
        setAvailableForms(fallbackForms);
        return fallbackForms;
      }

      // Agrupar por form_id e pegar nomes únicos
      const uniqueForms: Record<string, AvailableForm> = {};
      
      formLeads.forEach(lead => {
        // Verificar se lead existe e tem as propriedades necessárias
        if (!lead) return;
        
        const formId = lead.form_id || 'default';
        
        if (!uniqueForms[formId]) {
          let displayName = lead.form_name || formId;
          
          // Melhorar nomes de exibição
          if (formId === 'default') {
            displayName = 'Formulário Principal';
          } else if (!lead.form_name && formId.startsWith('form_')) {
            displayName = `Formulário ${formId.replace('form_', '')}`;
          }

          uniqueForms[formId] = {
            id: formId,
            name: displayName
          };
        }
      });

      const formsArray = Object.values(uniqueForms);
      
      // Adicionar opção "Todos os Formulários" no início
      const allForms: AvailableForm[] = [
        { id: 'all', name: 'Todos os Formulários' },
        ...formsArray
      ];

      setAvailableForms(allForms);
      console.log('✅ Formulários carregados:', allForms);

      return allForms;
    } catch (error) {
      console.error('❌ Erro ao carregar formulários:', error);
      const fallbackForms = [
        { id: 'all', name: 'Todos os Formulários' }
      ];
      setAvailableForms(fallbackForms);
      return fallbackForms;
    }
  };

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

      // Atualizar lista de formulários disponíveis
      await loadAllAvailableForms();

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

  // Load forms when component mounts
  useEffect(() => {
    loadAllAvailableForms();
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
    <div className="space-y-6">
      {/* Controles de Entrada - Glassmorphism */}
      <div className="backdrop-blur-md bg-white/10 dark:bg-black/20 border border-white/20 rounded-2xl shadow-2xl">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Calculator className="w-5 h-5 text-white" />
            <h3 className="text-xl font-bold text-white">Configuração do Funil de Conversão</h3>
          </div>
          
          {/* Date Range Selector */}
          <div className="mb-6 p-4 backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl">
            <h4 className="text-lg font-semibold text-white mb-4">📅 Período de Análise</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white/90 font-medium">Período Pré-definido</Label>
                <Select value={selectedPeriod} onValueChange={handlePeriodChange}>
                  <SelectTrigger className="backdrop-blur-sm bg-white/5 border-white/20 text-white h-12 rounded-xl">
                    <SelectValue placeholder="Selecione um período" />
                  </SelectTrigger>
                  <SelectContent className="backdrop-blur-md bg-black/80 border-white/20">
                    {periods.map(period => (
                      <SelectItem 
                        key={period.value} 
                        value={period.value} 
                        className="text-white hover:bg-white/10"
                      >
                        {period.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedPeriod === 'custom' && (
                <div className="space-y-2">
                  <Label className="text-white/90 font-medium">Período Personalizado</Label>
                  <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "backdrop-blur-sm bg-white/5 border-white/20 text-white h-12 rounded-xl justify-start text-left font-normal hover:bg-white/10",
                          !dateRange && "text-white/50"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange?.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })} -{" "}
                              {format(dateRange.to, "dd/MM/yyyy", { locale: ptBR })}
                            </>
                          ) : (
                            format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })
                          )
                        ) : (
                          <span>Selecione as datas</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 backdrop-blur-md bg-black/80 border-white/20" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange?.from}
                        selected={dateRange}
                        onSelect={(range) => {
                          if (range?.from && range?.to) {
                            setDateRange({ from: range.from, to: range.to });
                            setIsDatePickerOpen(false);
                          } else if (range?.from) {
                            setDateRange({ from: range.from, to: range.from });
                          }
                        }}
                        numberOfMonths={2}
                        className={cn("backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl text-white")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="text-white/70 text-sm">
                Dados de {format(dateRange.from, 'dd/MM/yyyy', { locale: ptBR })} até {format(dateRange.to, 'dd/MM/yyyy', { locale: ptBR })}
              </div>
              <Button
                onClick={refreshAnalyticsData}
                disabled={isRefreshing}
                className="backdrop-blur-sm bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-white px-4 py-2 rounded-xl transition-all duration-300"
              >
                <RefreshCw className={cn("w-4 h-4 mr-2", isRefreshing && "animate-spin")} />
                {isRefreshing ? 'Atualizando...' : 'Atualizar Dados'}
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label className="text-white/90 font-medium">Formulário</Label>
              <Select value={selectedForm} onValueChange={setSelectedForm}>
                <SelectTrigger className="backdrop-blur-sm bg-white/5 border-white/20 text-white h-12 rounded-xl">
                  <SelectValue placeholder="Selecione um formulário" />
                </SelectTrigger>
                <SelectContent className="backdrop-blur-md bg-black/80 border-white/20">
                  {availableForms.map(form => (
                    <SelectItem 
                      key={form.id} 
                      value={form.id} 
                      className="text-white hover:bg-white/10"
                    >
                      {form.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-white/90 font-medium">Contratos Fechados</Label>
              <Input
                type="number"
                value={contracts}
                onChange={(e) => setContracts(Number(e.target.value) || 0)}
                className="backdrop-blur-sm bg-white/5 border-white/20 text-white h-12 rounded-xl placeholder:text-white/50"
                placeholder="Ex: 5"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-white/90 font-medium">Dinheiro Gasto (R$)</Label>
              <Input
                type="number"
                value={adSpend}
                onChange={(e) => setAdSpend(Number(e.target.value) || 0)}
                className="backdrop-blur-sm bg-white/5 border-white/20 text-white h-12 rounded-xl placeholder:text-white/50"
                placeholder="Ex: 5000"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-white/90 font-medium">Dinheiro Ganho (R$)</Label>
              <Input
                type="number"
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value) || 0)}
                className="backdrop-blur-sm bg-white/5 border-white/20 text-white h-12 rounded-xl placeholder:text-white/50"
                placeholder="Ex: 25000"
              />
            </div>
          </div>

          {/* Seção de Configuração de Campanha */}
          <div className="border-t border-white/20 pt-6 mt-6">
            <h4 className="text-lg font-semibold text-white mb-4">📊 Configuração da Campanha</h4>
            
            {!marketingConfig?.facebook_pixel_id && (
              <div className="mb-6 p-4 backdrop-blur-sm bg-amber-500/20 border border-amber-400/30 rounded-xl">
                <div className="flex items-center gap-2 text-amber-100">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Configure o Facebook Pixel ID na aba "Scripts de Marketing e Rastreamento" para ativar o rastreamento de conversões.
                  </span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label className="text-white/90 font-medium">Nome da Campanha</Label>
                <Input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="backdrop-blur-sm bg-white/5 border-white/20 text-white h-12 rounded-xl placeholder:text-white/50"
                  placeholder="Ex: Campanha Black Friday 2024"
                />
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button
                onClick={saveCampaignReport}
                disabled={isLoading || !campaignName.trim()}
                className="backdrop-blur-sm bg-green-500/20 hover:bg-green-500/30 border border-green-400/30 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? 'Salvando...' : 'Salvar Relatório'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Funil Visual - Glassmorphism */}
      <div className="backdrop-blur-md bg-white/10 dark:bg-black/20 border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            📊 Funil de Conversão - {availableForms.find(f => f.id === selectedForm)?.name || 'Carregando...'}
          </h2>
          
          {/* Visual do Funil */}
          <div className="relative max-w-4xl mx-auto mb-12">
            <div className="space-y-4">
              
              {/* NÍVEL 1: ENVIOS DE FORMULÁRIO */}
              <div className="relative animate-fade-in">
                <div 
                  className="mx-auto h-20 rounded-2xl relative overflow-hidden shadow-2xl backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105"
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(29, 78, 216, 0.9) 100%)'
                  }}
                >
                  <div className="flex items-center justify-between h-full px-8 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-4 h-4 bg-white/80 rounded-full animate-pulse"></div>
                      <span className="text-white font-bold text-xl drop-shadow-lg">
                        {formSubmissions.toLocaleString()} Envios de Formulário
                      </span>
                    </div>
                    <span className="text-white/90 text-lg font-semibold">100%</span>
                  </div>
                </div>
              </div>

              {/* NÍVEL 2: CONTRATOS FECHADOS */}
              <div className="relative animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div 
                  className="mx-auto h-20 rounded-2xl relative overflow-hidden shadow-2xl backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105"
                  style={{
                    width: '80%',
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.8) 0%, rgba(5, 150, 105, 0.9) 100%)'
                  }}
                >
                  <div className="flex items-center justify-between h-full px-8 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-4 h-4 bg-white/80 rounded-full animate-pulse"></div>
                      <span className="text-white font-bold text-xl drop-shadow-lg">
                        {contracts.toLocaleString()} Contratos Fechados
                      </span>
                    </div>
                    <span className="text-white/90 text-lg font-semibold">{conversionRate.toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              {/* NÍVEL 3: RECEITA GERADA */}
              <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div 
                  className="mx-auto h-20 rounded-2xl relative overflow-hidden shadow-2xl backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105"
                  style={{
                    width: '60%',
                    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.8) 0%, rgba(217, 119, 6, 0.9) 100%)'
                  }}
                >
                  <div className="flex items-center justify-between h-full px-8 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-4 h-4 bg-white/80 rounded-full animate-pulse"></div>
                      <span className="text-white font-bold text-xl drop-shadow-lg">
                        R$ {revenue.toLocaleString()} em Receita
                      </span>
                    </div>
                    <span className="text-white/90 text-sm font-medium">
                      {contracts > 0 ? `R$ ${ticketMedio.toFixed(0)} médio` : '0'}
                    </span>
                  </div>
                </div>
              </div>

              {/* NÍVEL 4: LUCRO LÍQUIDO */}
              <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div 
                  className="mx-auto h-20 rounded-2xl relative overflow-hidden shadow-2xl backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105"
                  style={{
                    width: '40%',
                    background: lucroLiquido >= 0 
                      ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.8) 0%, rgba(124, 58, 237, 0.9) 100%)'
                      : 'linear-gradient(135deg, rgba(239, 68, 68, 0.8) 0%, rgba(220, 38, 38, 0.9) 100%)'
                  }}
                >
                  <div className="flex items-center justify-between h-full px-8 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-4 h-4 bg-white/80 rounded-full animate-pulse"></div>
                      <span className="text-white font-bold text-xl drop-shadow-lg">
                        R$ {lucroLiquido.toLocaleString()} Lucro
                      </span>
                    </div>
                    <span className="text-white/90 text-sm font-medium">
                      {roi.toFixed(0)}% ROI
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Métricas Calculadas - Glassmorphism */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 pt-8 border-t border-white/20">
            <div className="text-center p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className={`text-2xl font-bold drop-shadow-lg ${
                conversionRate >= 20 ? 'text-green-400' : 
                conversionRate >= 10 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {conversionRate.toFixed(1)}%
              </div>
              <div className="text-sm text-white/70 font-medium">
                Taxa de Conversão
              </div>
            </div>
            
            <div className="text-center p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className={`text-2xl font-bold drop-shadow-lg ${
                roi >= 200 ? 'text-green-400' : 
                roi >= 100 ? 'text-yellow-400' : 
                roi >= 0 ? 'text-blue-400' : 'text-red-400'
              }`}>
                {roi.toFixed(0)}%
              </div>
              <div className="text-sm text-white/70 font-medium">
                ROI
              </div>
            </div>
            
            <div className="text-center p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-xl font-bold text-white drop-shadow-lg">
                R$ {costPerLead.toFixed(0)}
              </div>
              <div className="text-sm text-white/70 font-medium">
                Custo por Lead
              </div>
            </div>
            
            <div className="text-center p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-xl font-bold text-white drop-shadow-lg">
                R$ {costPerAcquisition.toFixed(0)}
              </div>
              <div className="text-sm text-white/70 font-medium">
                CAC
              </div>
            </div>
            
            <div className="text-center p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-xl font-bold text-white drop-shadow-lg">
                R$ {ticketMedio.toFixed(0)}
              </div>
              <div className="text-sm text-white/70 font-medium">
                Ticket Médio
              </div>
            </div>
            
            <div className="text-center p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className={`text-xl font-bold drop-shadow-lg ${lucroLiquido >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                R$ {lucroLiquido.toLocaleString()}
              </div>
              <div className="text-sm text-white/70 font-medium">
                Lucro Líquido
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
