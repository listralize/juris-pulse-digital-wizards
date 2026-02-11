import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useTheme } from '../ThemeProvider';
import { supabase } from '../../integrations/supabase/client';
import { Target, DollarSign, TrendingUp, FileText, Handshake, Calculator, Save, AlertTriangle, CheckCircle, CalendarIcon, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { format, addDays, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '../../lib/utils';
import { useFormConfig } from '@/hooks/useFormConfig';
import { logger } from '@/utils/logger';

interface ConversionFunnelProps {
  analyticsData?: any;
}

interface AvailableForm {
  id: string;
  name: string;
}

interface FormPerformance {
  formId: string;
  formName: string;
  count: number;
}

export const ConversionFunnel: React.FC<ConversionFunnelProps> = ({
  analyticsData
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedForm, setSelectedForm] = useState<string>('all');
  const [availableForms, setAvailableForms] = useState<AvailableForm[]>([]);
  const { multipleFormsConfig, isLoading: configLoading } = useFormConfig();

  // Date range state
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: subDays(new Date(), 7),
    to: new Date()
  });
  const [selectedPeriod, setSelectedPeriod] = useState<string>('7days');

  // Performance tracking - FONTE ÚNICA DE VERDADE
  const [formPerformanceData, setFormPerformanceData] = useState<FormPerformance[]>([]);

  // Dados que o usuário controla
  const [manualLeads, setManualLeads] = useState<number>(0); // Campo manual para leads
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

  // Carregar todos os formulários configurados no sistema
  const loadAllAvailableForms = () => {
    logger.log('🔄 [ConversionFunnel] Carregando formulários do sistema...');
    logger.log('📋 [ConversionFunnel] multipleFormsConfig:', multipleFormsConfig);

    if (!multipleFormsConfig || !multipleFormsConfig.forms || multipleFormsConfig.forms.length === 0) {
      logger.log('⚠️ [ConversionFunnel] Nenhum formulário configurado no sistema');
      const fallbackForms = [
        { id: 'all', name: 'Todos os Formulários' },
        { id: 'default', name: 'Formulário Principal' }
      ];
      setAvailableForms(fallbackForms);
      return;
    }

    // Mapear formulários do sistema para o formato esperado
    const systemForms: AvailableForm[] = multipleFormsConfig.forms.map(form => ({
      id: form.id || 'default',
      name: form.name || 'Formulário sem nome'
    }));
    
    // Adicionar opção "Todos os Formulários" no início
    const allForms: AvailableForm[] = [
      { id: 'all', name: 'Todos os Formulários' },
      ...systemForms
    ];

    setAvailableForms(allForms);
    logger.log('✅ [ConversionFunnel] Formulários carregados:', allForms);
  };

  // Função unificada para buscar dados de form_leads - FONTE ÚNICA DE VERDADE
  const loadFormData = async () => {
    try {
      logger.log('📊 [ConversionFunnel] === CARREGANDO DADOS DOS FORMULÁRIOS (FORM_LEADS) ===');
      logger.log('📅 [ConversionFunnel] Período:', {
        from: dateRange.from.toISOString(),
        to: dateRange.to.toISOString()
      });
      logger.log('🎯 [ConversionFunnel] Formulário selecionado:', selectedForm);
      
      // Buscar TODOS os dados de form_leads para o período
      const { data: leadsData, error } = await supabase
        .from('form_leads')
        .select('form_id, form_name, created_at')
        .gte('created_at', dateRange.from.toISOString())
        .lte('created_at', dateRange.to.toISOString())
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ [ConversionFunnel] Erro ao carregar form_leads:', error);
        return;
      }

      logger.log('📈 [ConversionFunnel] TODOS os leads encontrados no período:', leadsData);
      
      // Calcular performance de todos os formulários usando os dados carregados
      const performanceMap = new Map<string, { formName: string; count: number }>();
      
      (leadsData || []).forEach(lead => {
        const formId = lead.form_id || 'unknown';
        const formName = lead.form_name || 'Formulário desconhecido';
        
        if (performanceMap.has(formId)) {
          performanceMap.get(formId)!.count += 1;
        } else {
          performanceMap.set(formId, { formName, count: 1 });
        }
      });

      // Converter para array e garantir que todos os formulários apareçam
      const performanceData: FormPerformance[] = [];
      
      // Adicionar formulários configurados, mesmo que não tenham dados
      availableForms.forEach(form => {
        if (form.id !== 'all') {
          const data = performanceMap.get(form.id);
          performanceData.push({
            formId: form.id,
            formName: form.name,
            count: data?.count || 0
          });
        }
      });

      // Adicionar formulários que têm dados mas não estão configurados
      performanceMap.forEach((data, formId) => {
        if (!performanceData.find(p => p.formId === formId)) {
          performanceData.push({
            formId,
            formName: data.formName,
            count: data.count
          });
        }
      });

      logger.log('📊 [ConversionFunnel] Performance calculada:', performanceData);
      setFormPerformanceData(performanceData);

      // ===== USAR DADOS CALCULADOS DIRETAMENTE (NÃO O ESTADO) =====
      let submissionsForSelectedForm = 0;
      
      if (selectedForm === 'all') {
        submissionsForSelectedForm = leadsData?.length || 0;
        logger.log('📊 [ConversionFunnel] Todos os formulários - total:', submissionsForSelectedForm);
      } else {
        // Usar os dados recém-calculados (performanceData) ao invés do estado (formPerformanceData)
        const performanceItem = performanceData.find(p => p.formId === selectedForm);
        submissionsForSelectedForm = performanceItem?.count || 0;
        
        logger.log('📊 [ConversionFunnel] ===== CORREÇÃO FINAL =====');
        logger.log('📊 [ConversionFunnel] Formulário selecionado:', selectedForm);
        logger.log('📊 [ConversionFunnel] Performance calculada:', performanceItem);
        logger.log('📊 [ConversionFunnel] Contagem final para funil:', submissionsForSelectedForm);
      }

      // Não atualizar automaticamente os leads, apenas armazenar para referência
      logger.log('✅ [ConversionFunnel] Performance calculada - dados disponíveis para referência');
      logger.log('✅ [ConversionFunnel] FUNIL ATUALIZADO - Envios:', submissionsForSelectedForm);

    } catch (error) {
      console.error('❌ [ConversionFunnel] Erro crítico ao carregar dados:', error);
    }
  };

  // Função de refresh que usa a mesma lógica
  const refreshAnalyticsData = async () => {
    setIsRefreshing(true);
    try {
      logger.log('🔄 [ConversionFunnel] === ATUALIZANDO DADOS ===');
      await loadFormData();
      toast.success(`Dados atualizados para o período selecionado`);
    } catch (error) {
      console.error('❌ [ConversionFunnel] Erro ao atualizar dados:', error);
      toast.error('Erro ao atualizar dados do período selecionado');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Setup realtime listening para form_leads
  useEffect(() => {
    logger.log('🔄 [ConversionFunnel] Configurando realtime para form_leads...');
    
    const channel = supabase
      .channel('form_leads_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'form_leads'
        },
        (payload) => {
          logger.log('📡 [ConversionFunnel] Mudança detectada em form_leads:', payload);
          // Recarregar dados quando houver mudanças
          loadFormData();
        }
      )
      .subscribe();

    return () => {
      logger.log('🔄 [ConversionFunnel] Removendo listener realtime...');
      supabase.removeChannel(channel);
    };
  }, [dateRange, availableForms, selectedForm]);

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
        console.error('❌ [ConversionFunnel] Erro ao carregar configurações de marketing:', error);
      }
    };
    loadMarketingConfig();
  }, []);

  // Carregar formulários quando multipleFormsConfig estiver disponível
  useEffect(() => {
    if (!configLoading && multipleFormsConfig) {
      logger.log('🔄 [ConversionFunnel] useEffect: Carregando formulários');
      loadAllAvailableForms();
    }
  }, [configLoading, multipleFormsConfig]);

  // Atualizar dados quando período mudar
  useEffect(() => {
    if (availableForms.length > 0) {
      logger.log('🔄 [ConversionFunnel] useEffect: Atualizando dados analytics');
      loadFormData();
    }
  }, [dateRange, availableForms, selectedForm]);

  // Cálculos automáticos usando leads manuais
  const conversionRate = manualLeads > 0 ? contracts / manualLeads * 100 : 0;
  const roi = adSpend > 0 ? (revenue - adSpend) / adSpend * 100 : 0;
  const costPerLead = manualLeads > 0 ? adSpend / manualLeads : 0;
  const costPerAcquisition = contracts > 0 ? adSpend / contracts : 0;
  const ticketMedio = contracts > 0 ? revenue / contracts : 0;
  const lucroLiquido = revenue - adSpend;

  // Função para salvar relatório de campanha
  const saveCampaignReport = async () => {
    if (!campaignName.trim()) {
      toast.error('Por favor, insira um nome para a campanha');
      return;
    }

    if (manualLeads === 0 && contracts === 0 && adSpend === 0 && revenue === 0) {
      toast.error('Não há dados suficientes para salvar o relatório');
      return;
    }

    setIsLoading(true);
    try {
      const selectedFormData = availableForms.find(f => f.id === selectedForm);
      
      // Validar e garantir que todos os números sejam válidos
      const reportData = {
        campaign_name: campaignName.trim(),
        form_id: selectedForm || 'all',
        form_name: selectedFormData?.name || 'Formulário desconhecido',
        form_submissions: Math.max(0, manualLeads || 0),
        contracts: Math.max(0, contracts || 0),
        ad_spend: Math.max(0, Number(adSpend) || 0),
        revenue: Math.max(0, Number(revenue) || 0),
        conversion_rate: Number((conversionRate || 0).toFixed(2)),
        roi: Number((roi || 0).toFixed(2)),
        cost_per_lead: Number((costPerLead || 0).toFixed(2)),
        cost_per_acquisition: Number((costPerAcquisition || 0).toFixed(2)),
        ticket_medio: Number((ticketMedio || 0).toFixed(2)),
        lucro_liquido: Number((lucroLiquido || 0).toFixed(2)),
        facebook_pixel_config: {
          pixel_id: marketingConfig?.facebook_pixel_id || '',
          conversion_api_token: marketingConfig?.facebook_conversion_api_token || ''
        },
        period_start: format(dateRange.from, 'yyyy-MM-dd'),
        period_end: format(dateRange.to, 'yyyy-MM-dd')
      };

      logger.log('💾 [ConversionFunnel] Salvando relatório:', reportData);

      const { data, error } = await supabase
        .from('campaign_reports')
        .insert(reportData)
        .select();

      if (error) {
        console.error('❌ [ConversionFunnel] Erro detalhado ao salvar:', error);
        throw error;
      }

      logger.log('✅ [ConversionFunnel] Relatório salvo com sucesso:', data);
      toast.success('Relatório de campanha salvo com sucesso!');
      setCampaignName('');
      
    } catch (error: any) {
      console.error('❌ [ConversionFunnel] Erro ao salvar relatório:', error);
      
      // Mensagem de erro mais específica
      if (error?.message) {
        toast.error(`Erro ao salvar: ${error.message}`);
      } else if (error?.code) {
        toast.error(`Erro no banco de dados (${error.code}): Verifique os dados inseridos`);
      } else {
        toast.error('Erro desconhecido ao salvar relatório de campanha');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const selectedFormData = availableForms.find(f => f.id === selectedForm);

  return (
    <div className="space-y-6">
      {/* Funil Principal */}
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
                <Label className="text-sm font-medium">Leads</Label>
                <Input
                  type="number"
                  value={manualLeads}
                  onChange={(e) => setManualLeads(Number(e.target.value) || 0)}
                  className="h-10"
                  placeholder="0"
                  min="0"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Contratos</Label>
                <Input
                  type="number"
                  value={contracts}
                  onChange={(e) => setContracts(Number(e.target.value) || 0)}
                  className="h-10"
                  placeholder="0"
                  min="0"
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
                  min="0"
                  step="0.01"
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
                  min="0"
                  step="0.01"
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
                  maxLength={100}
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
              Funil gerado
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Funil Visual Compacto */}
            <div className="space-y-3 mb-4">
              {/* Nível 1: Envios */}
              <div className="relative">
                <div className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-between px-4 text-white">
                  <span className="font-medium text-sm">
                    {manualLeads.toLocaleString()} Leads
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

    </div>
  );
};
