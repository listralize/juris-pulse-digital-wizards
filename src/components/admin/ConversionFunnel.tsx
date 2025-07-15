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
      {/* Controles */}
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-black'}`}>
            <Calculator className="w-5 h-5" />
            Funil de Conversão - Dados Manuais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                value={contracts}
                onChange={(e) => setContracts(Number(e.target.value) || 0)}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200'}`}
                placeholder="0"
              />
            </div>
            
            <div>
              <Label>Dinheiro Gasto (R$)</Label>
              <Input
                type="number"
                value={adSpend}
                onChange={(e) => setAdSpend(Number(e.target.value) || 0)}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200'}`}
                placeholder="0"
              />
            </div>
            
            <div>
              <Label>Dinheiro Ganho (R$)</Label>
              <Input
                type="number"
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value) || 0)}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200'}`}
                placeholder="0"
              />
            </div>

            <div className="flex items-end">
              <div className={`text-center w-full p-2 rounded ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Envios do Form
                </div>
                <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                  {formSubmissions}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Funil Visual */}
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
            📊 Funil de Conversão - {availableForms.find(f => f.id === selectedForm)?.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative max-w-3xl mx-auto space-y-6">
            
            {/* ETAPA 1: LEADS (Envios de Formulário) */}
            <div className="relative">
              <div 
                className="mx-auto h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-between px-6 shadow-xl transform hover:scale-105 transition-transform"
                style={{ width: '100%' }}
              >
                <div className="flex items-center gap-4">
                  <FileText className="w-8 h-8 text-white" />
                  <div>
                    <div className="text-white font-bold text-xl">Leads Gerados</div>
                    <div className="text-blue-100 text-sm">Envios do formulário</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-white">{formSubmissions.toLocaleString()}</div>
                  <div className="text-blue-100 text-sm">100%</div>
                </div>
              </div>
            </div>

            {/* SETA */}
            <div className="flex justify-center">
              <TrendingUp className="w-8 h-8 text-gray-400 transform rotate-90" />
            </div>

            {/* ETAPA 2: CONTRATOS (Conversões) */}
            <div className="relative">
              <div 
                className="mx-auto h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-between px-6 shadow-xl transform hover:scale-105 transition-transform"
                style={{ width: '75%' }}
              >
                <div className="flex items-center gap-4">
                  <Handshake className="w-8 h-8 text-white" />
                  <div>
                    <div className="text-white font-bold text-xl">Contratos Fechados</div>
                    <div className="text-green-100 text-sm">Clientes convertidos</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-white">{contracts.toLocaleString()}</div>
                  <div className="text-green-100 text-sm">{conversionRate.toFixed(1)}%</div>
                </div>
              </div>
            </div>

            {/* SETA */}
            <div className="flex justify-center">
              <DollarSign className="w-8 h-8 text-gray-400" />
            </div>

            {/* ETAPA 3: RECEITA */}
            <div className="relative">
              <div 
                className="mx-auto h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-between px-6 shadow-xl transform hover:scale-105 transition-transform"
                style={{ width: '50%' }}
              >
                <div className="flex items-center gap-4">
                  <Target className="w-8 h-8 text-white" />
                  <div>
                    <div className="text-white font-bold text-xl">Receita Total</div>
                    <div className="text-purple-100 text-sm">Dinheiro ganho</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">R$ {revenue.toLocaleString()}</div>
                  <div className="text-purple-100 text-sm">Total</div>
                </div>
              </div>
            </div>
          </div>

          {/* Métricas Calculadas */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className={`text-xl font-bold ${conversionRate >= 20 ? 'text-green-500' : conversionRate >= 10 ? 'text-yellow-500' : 'text-red-500'}`}>
                {conversionRate.toFixed(1)}%
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Taxa Conversão
              </div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className={`text-xl font-bold ${roi >= 200 ? 'text-green-500' : roi >= 100 ? 'text-yellow-500' : roi >= 0 ? 'text-blue-500' : 'text-red-500'}`}>
                {roi.toFixed(0)}%
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                ROI
              </div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                R$ {costPerLead.toFixed(0)}
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Custo/Lead
              </div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                R$ {costPerAcquisition.toFixed(0)}
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                CAC
              </div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                R$ {ticketMedio.toFixed(0)}
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Ticket Médio
              </div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className={`text-xl font-bold ${lucroLiquido >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                R$ {lucroLiquido.toLocaleString()}
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Lucro Líquido
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};