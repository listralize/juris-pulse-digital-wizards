import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useTheme } from '../ThemeProvider';
import { supabase } from '../../integrations/supabase/client';
import { Target, DollarSign, TrendingUp, FileText, Handshake, Calculator, Save, AlertTriangle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ConversionFunnelProps {
  analyticsData?: any;
}

export const ConversionFunnel: React.FC<ConversionFunnelProps> = ({ analyticsData }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [selectedForm, setSelectedForm] = useState<string>('all');
  const [availableForms, setAvailableForms] = useState<Array<{id: string, name: string}>>([]);
  
  // Dados que o usuário controla
  const [formSubmissions, setFormSubmissions] = useState<number>(0);
  const [contracts, setContracts] = useState<number>(0);
  const [adSpend, setAdSpend] = useState<number>(0);
  const [revenue, setRevenue] = useState<number>(0);
  const [campaignName, setCampaignName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [marketingConfig, setMarketingConfig] = useState<any>(null);

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

  // Carregar formulários disponíveis com nomes corretos
  useEffect(() => {
    const loadFormsWithCorrectNames = async () => {
      try {
        // Primeiro, carregar a configuração admin para pegar os nomes corretos
        const { data: adminData } = await supabase
          .from('admin_settings')
          .select('form_config')
          .maybeSingle();

        console.log('📋 Carregando configuração admin:', adminData);

        let formsConfig: any[] = [];
        if (adminData?.form_config) {
          const formConfig = adminData.form_config as any;
          formsConfig = formConfig.forms || [];
        }

        // Agora criar a lista de formulários baseada nos dados de analytics mas com nomes da config
        if (analyticsData?.formSubmissions) {
          console.log('📊 Dados de analytics:', analyticsData.formSubmissions);
          
          const formsWithCorrectNames = analyticsData.formSubmissions.map((analyticsForm: any) => {
            // Procurar o nome correto na configuração admin
            const configForm = formsConfig.find((config: any) => config.id === analyticsForm.formId);
            
            let displayName = analyticsForm.formId;
            if (configForm?.name) {
              displayName = configForm.name;
            } else if (analyticsForm.formId === 'default') {
              displayName = 'Formulário Principal';
            } else if (analyticsForm.formId.startsWith('form_')) {
              displayName = `Formulário ${analyticsForm.formId.replace('form_', '')}`;
            }

            console.log(`📋 Formulário ${analyticsForm.formId} -> Nome: ${displayName}`);
            
            return {
              id: analyticsForm.formId,
              name: displayName,
              count: analyticsForm.count
            };
          });

          const formsWithAll = [
            { id: 'all', name: 'Todos os Formulários' },
            ...formsWithCorrectNames
          ];

          setAvailableForms(formsWithAll);
          console.log('✅ Formulários configurados com nomes corretos:', formsWithAll);
        } else {
          // Se não há dados de analytics, usar apenas a configuração admin
          const formsFromConfig = formsConfig.map((form: any) => ({
            id: form.id,
            name: form.name || `Formulário ${form.id}`
          }));

          const formsWithAll = [
            { id: 'all', name: 'Todos os Formulários' },
            { id: 'default', name: 'Formulário Principal' },
            ...formsFromConfig
          ];

          setAvailableForms(formsWithAll);
          console.log('📋 Usando formulários da configuração:', formsWithAll);
        }
      } catch (error) {
        console.error('❌ Erro ao carregar formulários:', error);
        // Fallback básico
        setAvailableForms([
          { id: 'all', name: 'Todos os Formulários' },
          { id: 'default', name: 'Formulário Principal' }
        ]);
      }
    };

    loadFormsWithCorrectNames();
  }, [analyticsData]);

  // Atualizar dados do formulário selecionado
  useEffect(() => {
    if (analyticsData?.formSubmissions) {
      console.log('🔄 Atualizando dados para formulário:', selectedForm);
      console.log('📊 Dados disponíveis:', analyticsData.formSubmissions);
      
      if (selectedForm === 'all') {
        // Somar todas as conversões de todos os formulários
        const totalSubmissions = analyticsData.formSubmissions.reduce((sum: number, form: any) => sum + form.count, 0);
        setFormSubmissions(totalSubmissions);
        console.log('📊 Total de envios (todos):', totalSubmissions);
      } else {
        // Filtrar pelo formulário específico selecionado
        const formData = analyticsData.formSubmissions.find((fs: any) => fs.formId === selectedForm);
        const count = formData?.count || 0;
        setFormSubmissions(count);
        console.log('📊 Envios para formulário', selectedForm, ':', count);
      }
    }
  }, [analyticsData, selectedForm]);

  // Cálculos automáticos
  const conversionRate = formSubmissions > 0 ? (contracts / formSubmissions) * 100 : 0;
  const roi = adSpend > 0 ? ((revenue - adSpend) / adSpend) * 100 : 0;
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
        period_start: new Date().toISOString().split('T')[0],
        period_end: new Date().toISOString().split('T')[0]
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label className="text-white/90 font-medium">Formulário</Label>
              <Select value={selectedForm} onValueChange={setSelectedForm}>
                <SelectTrigger className="backdrop-blur-sm bg-white/5 border-white/20 text-white h-12 rounded-xl">
                  <SelectValue placeholder="Selecione um formulário" />
                </SelectTrigger>
                <SelectContent className="backdrop-blur-md bg-black/80 border-white/20">
                  {availableForms.map(form => (
                    <SelectItem key={form.id} value={form.id} className="text-white hover:bg-white/10">
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
              
              {marketingConfig?.facebook_pixel_id && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 backdrop-blur-sm bg-green-500/10 border border-green-400/20 rounded-xl">
                  <div className="space-y-1">
                    <Label className="text-green-100 text-sm">Facebook Pixel ID Configurado</Label>
                    <div className="text-green-100 font-mono text-sm bg-green-500/20 p-2 rounded">
                      {marketingConfig.facebook_pixel_id}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-green-100 text-sm">API de Conversão</Label>
                    <div className="text-green-100 text-sm">
                      {marketingConfig.facebook_conversion_api_token ? 
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" /> Configurado
                        </span> : 
                        <span className="text-amber-200">Não configurado</span>
                      }
                    </div>
                  </div>
                </div>
              )}
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
              <div className={`text-2xl font-bold drop-shadow-lg ${conversionRate >= 20 ? 'text-green-400' : conversionRate >= 10 ? 'text-yellow-400' : 'text-red-400'}`}>
                {conversionRate.toFixed(1)}%
              </div>
              <div className="text-sm text-white/70 font-medium">
                Taxa de Conversão
              </div>
            </div>
            
            <div className="text-center p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className={`text-2xl font-bold drop-shadow-lg ${roi >= 200 ? 'text-green-400' : roi >= 100 ? 'text-yellow-400' : roi >= 0 ? 'text-blue-400' : 'text-red-400'}`}>
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