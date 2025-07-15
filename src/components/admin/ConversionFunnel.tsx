import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useTheme } from '../ThemeProvider';
import { supabase } from '../../integrations/supabase/client';
import { Target, DollarSign, TrendingUp, FileText, Handshake, Calculator } from 'lucide-react';

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

  // Atualizar dados do formulário selecionado
  useEffect(() => {
    if (analyticsData) {
      if (selectedForm === 'all') {
        setFormSubmissions(analyticsData.conversions?.total || 0);
      } else {
        const formData = analyticsData.formSubmissions?.find((fs: any) => fs.formId === selectedForm);
        setFormSubmissions(formData?.count || 0);
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

  return (
    <div className="space-y-6">
      {/* Controles de Entrada */}
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-black'}`}>
            <Calculator className="w-5 h-5" />
            Configuração do Funil de Conversão
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label className={`${isDark ? 'text-white' : 'text-black'}`}>Formulário</Label>
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
            
            <div className="space-y-2">
              <Label className={`${isDark ? 'text-white' : 'text-black'}`}>Contratos Fechados</Label>
              <Input
                type="number"
                value={contracts}
                onChange={(e) => setContracts(Number(e.target.value) || 0)}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200'} text-lg`}
                placeholder="Ex: 5"
              />
            </div>
            
            <div className="space-y-2">
              <Label className={`${isDark ? 'text-white' : 'text-black'}`}>Dinheiro Gasto (R$)</Label>
              <Input
                type="number"
                value={adSpend}
                onChange={(e) => setAdSpend(Number(e.target.value) || 0)}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200'} text-lg`}
                placeholder="Ex: 5000"
              />
            </div>
            
            <div className="space-y-2">
              <Label className={`${isDark ? 'text-white' : 'text-black'}`}>Dinheiro Ganho (R$)</Label>
              <Input
                type="number"
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value) || 0)}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200'} text-lg`}
                placeholder="Ex: 25000"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Funil Visual */}
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <CardTitle className={`${isDark ? 'text-white' : 'text-black'} text-center text-2xl`}>
            📊 Funil de Conversão (Últimos 7 dias)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Visual do Funil */}
          <div className="relative max-w-4xl mx-auto mb-12">
            <div className="space-y-2">
              
              {/* NÍVEL 1: ENVIOS DE FORMULÁRIO */}
              <div className="relative">
                <div 
                  className="mx-auto h-16 rounded-xl relative overflow-hidden shadow-lg"
                  style={{ 
                    width: '100%',
                    background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)'
                  }}
                >
                  <div className="flex items-center justify-between h-full px-6 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                      <span className="text-white font-bold text-lg">
                        {formSubmissions.toLocaleString()} Envios de Formulário
                      </span>
                    </div>
                    <span className="text-white/80 text-sm">100%</span>
                  </div>
                </div>
              </div>

              {/* NÍVEL 2: CONTRATOS FECHADOS */}
              <div className="relative">
                <div 
                  className="mx-auto h-16 rounded-xl relative overflow-hidden shadow-lg"
                  style={{ 
                    width: '80%',
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                  }}
                >
                  <div className="flex items-center justify-between h-full px-6 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                      <span className="text-white font-bold text-lg">
                        {contracts.toLocaleString()} Contratos Fechados
                      </span>
                    </div>
                    <span className="text-white/80 text-sm">{conversionRate.toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              {/* NÍVEL 3: RECEITA GERADA */}
              <div className="relative">
                <div 
                  className="mx-auto h-16 rounded-xl relative overflow-hidden shadow-lg"
                  style={{ 
                    width: '60%',
                    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
                  }}
                >
                  <div className="flex items-center justify-between h-full px-6 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                      <span className="text-white font-bold text-lg">
                        R$ {revenue.toLocaleString()} em Receita
                      </span>
                    </div>
                    <span className="text-white/80 text-sm">
                      {contracts > 0 ? `R$ ${ticketMedio.toFixed(0)} médio` : '0'}
                    </span>
                  </div>
                </div>
              </div>

              {/* NÍVEL 4: LUCRO LÍQUIDO */}
              <div className="relative">
                <div 
                  className="mx-auto h-16 rounded-xl relative overflow-hidden shadow-lg"
                  style={{ 
                    width: '40%',
                    background: lucroLiquido >= 0 
                      ? 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'
                      : 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'
                  }}
                >
                  <div className="flex items-center justify-between h-full px-6 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                      <span className="text-white font-bold text-lg">
                        R$ {lucroLiquido.toLocaleString()} Lucro
                      </span>
                    </div>
                    <span className="text-white/80 text-sm">
                      {roi.toFixed(0)}% ROI
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Métricas Calculadas */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className={`text-2xl font-bold ${conversionRate >= 20 ? 'text-green-500' : conversionRate >= 10 ? 'text-yellow-500' : 'text-red-500'}`}>
                {conversionRate.toFixed(1)}%
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Taxa de Conversão
              </div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className={`text-2xl font-bold ${roi >= 200 ? 'text-green-500' : roi >= 100 ? 'text-yellow-500' : roi >= 0 ? 'text-blue-500' : 'text-red-500'}`}>
                {roi.toFixed(0)}%
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                ROI
              </div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                R$ {costPerLead.toFixed(0)}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Custo por Lead
              </div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                R$ {costPerAcquisition.toFixed(0)}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                CAC
              </div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                R$ {ticketMedio.toFixed(0)}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Ticket Médio
              </div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className={`text-xl font-bold ${lucroLiquido >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                R$ {lucroLiquido.toLocaleString()}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Lucro Líquido
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};