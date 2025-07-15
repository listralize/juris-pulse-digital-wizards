import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { Save, Eye, BarChart3, Target, Code, TrendingUp, AlertTriangle, CheckCircle, Info, Users, MousePointer, Calendar, ArrowUpDown, Settings, Trash2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useFormConfig } from '@/hooks/useFormConfig';

interface MarketingScripts {
  facebookPixel: {
    enabled: boolean;
    pixelId: string;
    customCode: string;
  };
  googleAnalytics: {
    enabled: boolean;
    measurementId: string;
    customCode: string;
  };
  googleTagManager: {
    enabled: boolean;
    containerId: string;
  };
  customScripts: {
    head: string;
    body: string;
  };
}

interface FormTrackingConfig {
  formId: string;
  formName: string;
  submitButtonId: string;
  webhookUrl?: string;
  enabled: boolean;
  campaign?: string;
}

interface ConversionTracking {
  systemForms: FormTrackingConfig[];
  linkTreeForms: string[];
  customForms: Array<{ name: string; id: string; campaign: string; submitButtonId: string; }>;
  events: {
    formSubmission: boolean;
    buttonClick: boolean;
    linkClick: boolean;
  };
}

interface AnalyticsData {
  visitors: {
    total: number;
    unique: number;
    today: number;
    thisWeek: number;
    growth: number;
  };
  conversions: {
    total: number;
    today: number;
    thisWeek: number;
    conversionRate: number;
    growth: number;
  };
  topPages: Array<{ page: string; views: number; }>;
  formSubmissions: Array<{ formId: string; count: number; }>;
  geographicData: Array<{ location: string; count: number; }>;
  deviceData: Array<{ device: string; count: number; }>;
  funnelData: {
    visitors: number;
    engagedUsers: number;
    qualifiedLeads: number;
    conversions: number;
  };
}

export const MarketingManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('scripts');
  const [isLoading, setIsLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const { multipleFormsConfig, refreshConfig } = useFormConfig();
  
  const [marketingScripts, setMarketingScripts] = useState<MarketingScripts>({
    facebookPixel: {
      enabled: false,
      pixelId: '',
      customCode: ''
    },
    googleAnalytics: {
      enabled: false,
      measurementId: '',
      customCode: ''
    },
    googleTagManager: {
      enabled: false,
      containerId: ''
    },
    customScripts: {
      head: '',
      body: ''
    }
  });

  const [conversionTracking, setConversionTracking] = useState<ConversionTracking>({
    systemForms: [],
    linkTreeForms: [],
    customForms: [],
    events: {
      formSubmission: true,
      buttonClick: false,
      linkClick: false
    }
  });

  useEffect(() => {
    loadMarketingConfig();
    loadAnalyticsData();
    loadLinkTreeForms();
  }, []);

  useEffect(() => {
    if (multipleFormsConfig?.forms) {
      loadSystemForms();
    }
  }, [multipleFormsConfig]);

  const loadSystemForms = () => {
    if (multipleFormsConfig?.forms) {
      // Preservar configurações existentes ou criar novas
      const existingConfigs = conversionTracking.systemForms.reduce((acc, config) => {
        acc[config.formId] = config;
        return acc;
      }, {} as Record<string, FormTrackingConfig>);

      const systemForms: FormTrackingConfig[] = multipleFormsConfig.forms.map(form => {
        const existing = existingConfigs[form.id || ''];
        return {
          formId: form.id || '',
          formName: form.name || 'Formulário sem nome',
          submitButtonId: existing?.submitButtonId || `submit-${form.id}`,
          webhookUrl: form.webhookUrl,
          enabled: existing?.enabled ?? false, // Por padrão desabilitado
          campaign: existing?.campaign || ''
        };
      });

      setConversionTracking(prev => ({
        ...prev,
        systemForms
      }));
    }
  };

  const loadLinkTreeForms = async () => {
    try {
      const { data: linkTreeItems } = await supabase
        .from('link_tree_items')
        .select('form_id, title')
        .eq('item_type', 'form')
        .not('form_id', 'is', null);

      if (linkTreeItems) {
        const linkTreeFormIds = linkTreeItems
          .map(item => item.form_id)
          .filter(id => id !== null);

        setConversionTracking(prev => ({
          ...prev,
          linkTreeForms: linkTreeFormIds
        }));
      }
    } catch (error) {
      console.error('Erro ao carregar formulários do LinkTree:', error);
    }
  };

  const loadAnalyticsData = async () => {
    try {
      const today = new Date();
      const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

      // Carregar dados de visitantes com informações geográficas
      const { data: visitorsData } = await supabase
        .from('website_analytics')
        .select('session_id, timestamp, country, city, page_url, page_title, device_type, browser')
        .gte('timestamp', oneWeekAgo.toISOString());

      // Carregar dados de conversões detalhadas
      const { data: conversionsData } = await supabase
        .from('conversion_events')
        .select('*')
        .gte('timestamp', oneWeekAgo.toISOString());

      if (visitorsData && conversionsData) {
        const uniqueVisitors = new Set(visitorsData.map(v => v.session_id)).size;
        const todayVisitors = visitorsData.filter(v => 
          new Date(v.timestamp).toDateString() === today.toDateString()
        ).length;

        const yesterdayVisitors = visitorsData.filter(v => 
          new Date(v.timestamp).toDateString() === yesterday.toDateString()
        ).length;

        const todayConversions = conversionsData.filter(c => 
          new Date(c.timestamp).toDateString() === today.toDateString()
        ).length;

        const yesterdayConversions = conversionsData.filter(c => 
          new Date(c.timestamp).toDateString() === yesterday.toDateString()
        ).length;

        // Analisar páginas mais visitadas
        const pageViews = visitorsData.reduce((acc, visit) => {
          const page = visit.page_url || 'Página desconhecida';
          acc[page] = (acc[page] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const topPages = Object.entries(pageViews)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 10)
          .map(([page, views]) => ({ page, views }));

        // Analisar submissões por formulário
        const formSubmissions = conversionsData.reduce((acc, conversion) => {
          const formId = conversion.form_id || 'Formulário desconhecido';
          acc[formId] = (acc[formId] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const formStats = Object.entries(formSubmissions)
          .sort(([,a], [,b]) => b - a)
          .map(([formId, count]) => ({ formId, count }));

        // Dados geográficos
        const geographicData = visitorsData.reduce((acc, visit) => {
          if (visit.country) {
            const key = `${visit.country}${visit.city ? ` - ${visit.city}` : ''}`;
            acc[key] = (acc[key] || 0) + 1;
          }
          return acc;
        }, {} as Record<string, number>);

        const topLocations = Object.entries(geographicData)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 10)
          .map(([location, count]) => ({ location, count }));

        // Dados de dispositivos
        const deviceData = visitorsData.reduce((acc, visit) => {
          const device = visit.device_type || 'Desconhecido';
          acc[device] = (acc[device] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        // Funil de conversão
        const totalVisitors = uniqueVisitors;
        const totalConversions = conversionsData.length;
        const conversionRate = totalVisitors > 0 ? (totalConversions / totalVisitors * 100) : 0;

        // Cálculos de crescimento
        const visitorsGrowth = yesterdayVisitors > 0 ? 
          ((todayVisitors - yesterdayVisitors) / yesterdayVisitors * 100) : 0;
        
        const conversionsGrowth = yesterdayConversions > 0 ? 
          ((todayConversions - yesterdayConversions) / yesterdayConversions * 100) : 0;

        setAnalyticsData({
          visitors: {
            total: visitorsData.length,
            unique: uniqueVisitors,
            today: todayVisitors,
            thisWeek: visitorsData.length,
            growth: visitorsGrowth
          },
          conversions: {
            total: conversionsData.length,
            today: todayConversions,
            thisWeek: conversionsData.length,
            conversionRate,
            growth: conversionsGrowth
          },
          topPages,
          formSubmissions: formStats,
          geographicData: topLocations,
          deviceData: Object.entries(deviceData).map(([device, count]) => ({ device, count })),
          funnelData: {
            visitors: totalVisitors,
            engagedUsers: Math.floor(totalVisitors * 0.7), // Estimativa
            qualifiedLeads: Math.floor(totalVisitors * 0.3), // Estimativa
            conversions: totalConversions
          }
        });
      }
    } catch (error) {
      console.error('Erro ao carregar dados de analytics:', error);
    }
  };

  const loadMarketingConfig = async () => {
    try {
      const { data: settings } = await supabase
        .from('marketing_settings')
        .select('*')
        .single();

      if (settings) {
        setMarketingScripts({
          facebookPixel: {
            enabled: settings.facebook_pixel_enabled || false,
            pixelId: settings.facebook_pixel_id || '',
            customCode: settings.facebook_custom_code || ''
          },
          googleAnalytics: {
            enabled: settings.google_analytics_enabled || false,
            measurementId: settings.google_analytics_id || '',
            customCode: settings.google_analytics_custom_code || ''
          },
          googleTagManager: {
            enabled: settings.google_tag_manager_enabled || false,
            containerId: settings.google_tag_manager_id || ''
          },
          customScripts: {
            head: settings.custom_head_scripts || '',
            body: settings.custom_body_scripts || ''
          }
        });

        if (settings.form_tracking_config && typeof settings.form_tracking_config === 'object') {
          const savedConfig = settings.form_tracking_config as any;
          setConversionTracking({
            systemForms: savedConfig.systemForms || [],
            linkTreeForms: savedConfig.linkTreeForms || [],
            customForms: savedConfig.customForms || [],
            events: savedConfig.events || { formSubmission: true, buttonClick: false, linkClick: false }
          });
        }
      }
    } catch (error) {
      console.error('Erro ao carregar configurações de marketing:', error);
    }
  };

  const saveMarketingConfig = async () => {
    setIsLoading(true);
    try {
      const configData = {
        facebook_pixel_enabled: marketingScripts.facebookPixel.enabled,
        facebook_pixel_id: marketingScripts.facebookPixel.pixelId,
        facebook_custom_code: marketingScripts.facebookPixel.customCode,
        google_analytics_enabled: marketingScripts.googleAnalytics.enabled,
        google_analytics_id: marketingScripts.googleAnalytics.measurementId,
        google_analytics_custom_code: marketingScripts.googleAnalytics.customCode,
        google_tag_manager_enabled: marketingScripts.googleTagManager.enabled,
        google_tag_manager_id: marketingScripts.googleTagManager.containerId,
        custom_head_scripts: marketingScripts.customScripts.head,
        custom_body_scripts: marketingScripts.customScripts.body,
        form_tracking_config: JSON.stringify(conversionTracking),
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('marketing_settings')
        .upsert(configData);

      if (error) throw error;

      setLastSaved(new Date());
      toast.success('Configurações de marketing salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar:', error);
      toast.error('Erro ao salvar configurações de marketing');
    } finally {
      setIsLoading(false);
    }
  };

  const updateSystemForm = (index: number, field: keyof FormTrackingConfig, value: any) => {
    setConversionTracking(prev => ({
      ...prev,
      systemForms: prev.systemForms.map((form, i) => 
        i === index ? { ...form, [field]: value } : form
      )
    }));
  };

  const addCustomForm = () => {
    setConversionTracking(prev => ({
      ...prev,
      customForms: [...prev.customForms, { name: '', id: '', campaign: '', submitButtonId: '' }]
    }));
  };

  const updateCustomForm = (index: number, field: string, value: string) => {
    setConversionTracking(prev => ({
      ...prev,
      customForms: prev.customForms.map((form, i) => 
        i === index ? { ...form, [field]: value } : form
      )
    }));
  };

  const removeCustomForm = (index: number) => {
    setConversionTracking(prev => ({
      ...prev,
      customForms: prev.customForms.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Marketing & Analytics</h1>
          <p className="text-muted-foreground">
            Configure scripts de marketing, rastreamento de conversões e analise performance
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {lastSaved && (
            <div className="text-sm text-muted-foreground">
              Última atualização: {lastSaved.toLocaleTimeString()}
            </div>
          )}
          <Button onClick={saveMarketingConfig} disabled={isLoading}>
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Salvando...' : 'Salvar Configurações'}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="scripts">📊 Scripts Marketing</TabsTrigger>
          <TabsTrigger value="tracking">🎯 Rastreamento</TabsTrigger>
          <TabsTrigger value="dashboard">📈 Dashboard</TabsTrigger>
          <TabsTrigger value="analytics">⚙️ Analytics</TabsTrigger>
        </TabsList>

        {/* SCRIPTS TAB */}
        <TabsContent value="scripts" className="space-y-6">
          {/* Facebook Pixel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📘 Facebook Pixel
                <Badge variant={marketingScripts.facebookPixel.enabled ? "default" : "secondary"}>
                  {marketingScripts.facebookPixel.enabled ? "Ativo" : "Inativo"}
                </Badge>
              </CardTitle>
              <CardDescription>
                Configure o Facebook Pixel para rastrear conversões e otimizar campanhas.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="facebook-enabled"
                  checked={marketingScripts.facebookPixel.enabled}
                  onChange={(e) => setMarketingScripts(prev => ({
                    ...prev,
                    facebookPixel: { ...prev.facebookPixel, enabled: e.target.checked }
                  }))}
                  className="rounded"
                />
                <Label htmlFor="facebook-enabled">Ativar Facebook Pixel</Label>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="facebook-pixel-id">Pixel ID</Label>
                  <Input
                    id="facebook-pixel-id"
                    placeholder="123456789012345"
                    value={marketingScripts.facebookPixel.pixelId}
                    onChange={(e) => setMarketingScripts(prev => ({
                      ...prev,
                      facebookPixel: { ...prev.facebookPixel, pixelId: e.target.value }
                    }))}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="facebook-custom-code">Código Personalizado (Opcional)</Label>
                <Textarea
                  id="facebook-custom-code"
                  placeholder="fbq('track', 'Purchase', {value: 0.00, currency: 'USD'});"
                  value={marketingScripts.facebookPixel.customCode}
                  onChange={(e) => setMarketingScripts(prev => ({
                    ...prev,
                    facebookPixel: { ...prev.facebookPixel, customCode: e.target.value }
                  }))}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Google Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📊 Google Analytics 4
                <Badge variant={marketingScripts.googleAnalytics.enabled ? "default" : "secondary"}>
                  {marketingScripts.googleAnalytics.enabled ? "Ativo" : "Inativo"}
                </Badge>
              </CardTitle>
              <CardDescription>
                Configure o Google Analytics 4 para análise detalhada de comportamento.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="ga-enabled"
                  checked={marketingScripts.googleAnalytics.enabled}
                  onChange={(e) => setMarketingScripts(prev => ({
                    ...prev,
                    googleAnalytics: { ...prev.googleAnalytics, enabled: e.target.checked }
                  }))}
                  className="rounded"
                />
                <Label htmlFor="ga-enabled">Ativar Google Analytics</Label>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ga-measurement-id">Measurement ID</Label>
                  <Input
                    id="ga-measurement-id"
                    placeholder="G-XXXXXXXXXX"
                    value={marketingScripts.googleAnalytics.measurementId}
                    onChange={(e) => setMarketingScripts(prev => ({
                      ...prev,
                      googleAnalytics: { ...prev.googleAnalytics, measurementId: e.target.value }
                    }))}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="ga-custom-code">Código Personalizado (Opcional)</Label>
                <Textarea
                  id="ga-custom-code"
                  placeholder="gtag('event', 'purchase', {transaction_id: '12345'});"
                  value={marketingScripts.googleAnalytics.customCode}
                  onChange={(e) => setMarketingScripts(prev => ({
                    ...prev,
                    googleAnalytics: { ...prev.googleAnalytics, customCode: e.target.value }
                  }))}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Google Tag Manager */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🏷️ Google Tag Manager
                <Badge variant={marketingScripts.googleTagManager.enabled ? "default" : "secondary"}>
                  {marketingScripts.googleTagManager.enabled ? "Ativo" : "Inativo"}
                </Badge>
              </CardTitle>
              <CardDescription>
                Configure o Google Tag Manager para gerenciar todos os seus tags.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="gtm-enabled"
                  checked={marketingScripts.googleTagManager.enabled}
                  onChange={(e) => setMarketingScripts(prev => ({
                    ...prev,
                    googleTagManager: { ...prev.googleTagManager, enabled: e.target.checked }
                  }))}
                  className="rounded"
                />
                <Label htmlFor="gtm-enabled">Ativar Google Tag Manager</Label>
              </div>
              
              <div>
                <Label htmlFor="gtm-container-id">Container ID</Label>
                <Input
                  id="gtm-container-id"
                  placeholder="GTM-XXXXXXX"
                  value={marketingScripts.googleTagManager.containerId}
                  onChange={(e) => setMarketingScripts(prev => ({
                    ...prev,
                    googleTagManager: { ...prev.googleTagManager, containerId: e.target.value }
                  }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Custom Scripts */}
          <Card>
            <CardHeader>
              <CardTitle>🔧 Scripts Personalizados</CardTitle>
              <CardDescription>
                Adicione scripts personalizados no head ou body da página.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="custom-head">Scripts no Head</Label>
                <Textarea
                  id="custom-head"
                  placeholder="<script>/* Seu código aqui */</script>"
                  value={marketingScripts.customScripts.head}
                  onChange={(e) => setMarketingScripts(prev => ({
                    ...prev,
                    customScripts: { ...prev.customScripts, head: e.target.value }
                  }))}
                  rows={5}
                />
              </div>
              
              <div>
                <Label htmlFor="custom-body">Scripts no Body</Label>
                <Textarea
                  id="custom-body"
                  placeholder="<script>/* Seu código aqui */</script>"
                  value={marketingScripts.customScripts.body}
                  onChange={(e) => setMarketingScripts(prev => ({
                    ...prev,
                    customScripts: { ...prev.customScripts, body: e.target.value }
                  }))}
                  rows={5}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TRACKING TAB */}
        <TabsContent value="tracking" className="space-y-6">
          {/* System Forms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                📝 Formulários do Sistema
                <Button variant="outline" size="sm" onClick={() => { loadSystemForms(); refreshConfig(); }}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Atualizar
                </Button>
              </CardTitle>
              <CardDescription>
                Formulários configurados no sistema com opções de rastreamento personalizadas.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {conversionTracking.systemForms.length === 0 ? (
                <div className="text-center p-8 text-muted-foreground">
                  <p>Nenhum formulário encontrado.</p>
                  <p className="text-sm">Clique em "Atualizar" para recarregar os formulários do sistema.</p>
                </div>
              ) : (
                conversionTracking.systemForms.map((form, index) => (
                  <div 
                    key={form.formId} 
                    className={`border rounded-lg p-4 space-y-3 cursor-pointer transition-all ${
                      form.enabled ? 'border-primary bg-primary/5' : 'border-muted-foreground/20'
                    }`}
                    onClick={() => updateSystemForm(index, 'enabled', !form.enabled)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant={form.enabled ? "default" : "outline"}>{form.formId}</Badge>
                        <span className="font-medium">{form.formName}</span>
                        {form.enabled && (
                          <Badge variant="secondary" className="text-xs">
                            ✓ Rastreando
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`form-enabled-${index}`}
                          checked={form.enabled}
                          onChange={(e) => {
                            e.stopPropagation();
                            updateSystemForm(index, 'enabled', e.target.checked);
                          }}
                          className="rounded"
                        />
                        <Label htmlFor={`form-enabled-${index}`}>Ativar</Label>
                      </div>
                    </div>
                    
                    {form.enabled && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>ID do Botão de Submit</Label>
                            <Input
                              value={form.submitButtonId}
                              onChange={(e) => {
                                e.stopPropagation();
                                updateSystemForm(index, 'submitButtonId', e.target.value);
                              }}
                              placeholder="submit-button-id"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                          <div>
                            <Label>Nome da Campanha</Label>
                            <Input
                              value={form.campaign || ''}
                              onChange={(e) => {
                                e.stopPropagation();
                                updateSystemForm(index, 'campaign', e.target.value);
                              }}
                              placeholder="nome-da-campanha"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        </div>
                        
                        {form.webhookUrl && (
                          <div>
                            <Label>Webhook URL</Label>
                            <Input
                              value={form.webhookUrl}
                              readOnly
                              className="bg-muted"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Scripts Gerados Automaticamente */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Scripts de Conversão Gerados
              </CardTitle>
              <CardDescription>
                Scripts automáticos para formulários ativos. Cole estes códigos nos seus formulários ou use eventos de JavaScript.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {conversionTracking.systemForms.length === 0 ? (
                <div className="text-center p-8 text-muted-foreground">
                  <p>Nenhum formulário encontrado.</p>
                  <p className="text-sm">Clique em "Atualizar" na aba de Rastreamento para carregar os formulários.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {conversionTracking.systemForms.map((form, index) => (
                    <div key={form.formId} className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="default">{form.formId}</Badge>
                        <span className="font-medium">{form.formName}</span>
                      </div>
                      
                       <div className="space-y-3">
                         {/* Facebook Pixel Script - sempre mostra */}
                         <div className="space-y-2">
                           <Label className="text-sm font-semibold text-blue-600">
                             Facebook Pixel - Evento de Lead:
                             {!marketingScripts.facebookPixel.enabled && (
                               <Badge variant="outline" className="ml-2 text-xs">Pixel desabilitado</Badge>
                             )}
                           </Label>
                           <div className="bg-slate-50 p-3 rounded border text-xs font-mono overflow-x-auto">
                             <code>{`// Adicione este código no evento de submit do formulário
document.getElementById('${form.submitButtonId}').addEventListener('click', function() {
  if (typeof fbq !== 'undefined') {
    fbq('track', 'Lead', {
      content_name: '${form.formId}',
      campaign_name: '${form.campaign || form.formName}',
      form_id: '${form.formId}',
      source: 'website'
    });
  }
});`}</code>
                           </div>
                         </div>
                         
                         {/* Google Analytics Script - sempre mostra */}
                         <div className="space-y-2">
                           <Label className="text-sm font-semibold text-green-600">
                             Google Analytics - Evento de Conversão:
                             {!marketingScripts.googleAnalytics.enabled && (
                               <Badge variant="outline" className="ml-2 text-xs">GA desabilitado</Badge>
                             )}
                           </Label>
                           <div className="bg-slate-50 p-3 rounded border text-xs font-mono overflow-x-auto">
                             <code>{`// Adicione este código no evento de submit do formulário
document.getElementById('${form.submitButtonId}').addEventListener('click', function() {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'conversion', {
      event_category: 'lead_generation',
      event_label: '${form.formId}',
      campaign_name: '${form.campaign || form.formName}',
      form_id: '${form.formId}',
      value: 1
    });
  }
});`}</code>
                           </div>
                         </div>
                         
                         {/* Google Tag Manager Script - sempre mostra */}
                         <div className="space-y-2">
                           <Label className="text-sm font-semibold text-purple-600">
                             Google Tag Manager - DataLayer Push:
                             {!marketingScripts.googleTagManager.enabled && (
                               <Badge variant="outline" className="ml-2 text-xs">GTM desabilitado</Badge>
                             )}
                           </Label>
                           <div className="bg-slate-50 p-3 rounded border text-xs font-mono overflow-x-auto">
                             <code>{`// Adicione este código no evento de submit do formulário
document.getElementById('${form.submitButtonId}').addEventListener('click', function() {
  if (typeof dataLayer !== 'undefined') {
    dataLayer.push({
      'event': 'form_submission',
      'form_id': '${form.formId}',
      'form_name': '${form.formName}',
      'campaign_name': '${form.campaign || form.formName}',
      'conversion_value': 1
    });
  }
});`}</code>
                           </div>
                         </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Instrução de Implementação */}
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Como implementar:</strong> Copie os scripts acima e adicione-os no final da sua página, 
                      antes do fechamento da tag &lt;/body&gt;. Certifique-se de que os IDs dos botões de submit 
                      correspondem aos configurados acima.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* DASHBOARD FUNCIONAL */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Header do Dashboard com Botão de Refresh */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Dashboard Analytics Funcional</h2>
            <Button onClick={loadAnalyticsData} disabled={isLoading} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Atualizar Dados
            </Button>
          </div>

          {/* KPIs Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Visitantes Únicos</p>
                    <p className="text-3xl font-bold">{analyticsData?.visitors.unique || 0}</p>
                    {analyticsData?.visitors.growth !== undefined && (
                      <p className={`text-sm flex items-center gap-1 ${analyticsData.visitors.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <TrendingUp className="w-3 h-3" />
                        {analyticsData.visitors.growth > 0 ? '+' : ''}{analyticsData.visitors.growth.toFixed(1)}% hoje
                      </p>
                    )}
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total de Conversões</p>
                    <p className="text-3xl font-bold">{analyticsData?.conversions.total || 0}</p>
                    {analyticsData?.conversions.growth !== undefined && (
                      <p className={`text-sm flex items-center gap-1 ${analyticsData.conversions.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <TrendingUp className="w-3 h-3" />
                        {analyticsData.conversions.growth > 0 ? '+' : ''}{analyticsData.conversions.growth.toFixed(1)}% hoje
                      </p>
                    )}
                  </div>
                  <Target className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Taxa de Conversão</p>
                    <p className="text-3xl font-bold">{analyticsData?.conversions.conversionRate.toFixed(2) || 0}%</p>
                    <p className="text-sm text-muted-foreground">Meta: 3.5%</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Hoje</p>
                    <p className="text-3xl font-bold">{analyticsData?.visitors.today || 0}</p>
                    <p className="text-sm text-muted-foreground">{analyticsData?.conversions.today || 0} conversões</p>
                  </div>
                  <Calendar className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Funil de Conversão */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Funil de Conversão (Últimos 7 dias)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-medium">Visitantes</span>
                  </div>
                  <span className="text-xl font-bold">{analyticsData?.funnelData?.visitors || 0}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium">Usuários Engajados</span>
                  </div>
                  <span className="text-xl font-bold">{analyticsData?.funnelData?.engagedUsers || 0}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="font-medium">Leads Qualificados</span>
                  </div>
                  <span className="text-xl font-bold">{analyticsData?.funnelData?.qualifiedLeads || 0}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="font-medium">Conversões</span>
                  </div>
                  <span className="text-xl font-bold">{analyticsData?.funnelData?.conversions || 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Submissões por Formulário */}
            <Card>
              <CardHeader>
                <CardTitle>📝 Performance dos Formulários</CardTitle>
                <CardDescription>Conversões por formulário (últimos 7 dias)</CardDescription>
              </CardHeader>
              <CardContent>
                {analyticsData?.formSubmissions && analyticsData.formSubmissions.length > 0 ? (
                  <div className="space-y-3">
                    {analyticsData.formSubmissions.slice(0, 5).map((form, index) => (
                      <div key={form.formId} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{form.formId}</Badge>
                          <span className="text-sm font-medium">
                            {form.formId === 'default' ? 'Formulário Principal' : 
                             conversionTracking.systemForms.find(f => f.formId === form.formId)?.formName || form.formId}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">{form.count}</p>
                          <p className="text-xs text-muted-foreground">conversões</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-8 text-muted-foreground">
                    <p>Nenhuma submissão de formulário registrada</p>
                    <p className="text-sm">Configure o rastreamento para ver dados aqui</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Dados Geográficos */}
            <Card>
              <CardHeader>
                <CardTitle>🌍 Visitantes por Localização</CardTitle>
                <CardDescription>Top 10 cidades (últimos 7 dias)</CardDescription>
              </CardHeader>
              <CardContent>
                {analyticsData?.geographicData && analyticsData.geographicData.length > 0 ? (
                  <div className="space-y-3">
                    {analyticsData.geographicData.map((location, index) => (
                      <div key={location.location} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                          <span className="text-sm font-medium">{location.location}</span>
                        </div>
                        <Badge variant="secondary">{location.count} visitantes</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-8 text-muted-foreground">
                    <p>Nenhum dado geográfico disponível</p>
                    <p className="text-sm">Os dados aparecem conforme os visitantes chegam ao site</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Páginas */}
            <Card>
              <CardHeader>
                <CardTitle>📊 Páginas Mais Visitadas</CardTitle>
                <CardDescription>Últimos 7 dias</CardDescription>
              </CardHeader>
              <CardContent>
                {analyticsData?.topPages && analyticsData.topPages.length > 0 ? (
                  <div className="space-y-3">
                    {analyticsData.topPages.slice(0, 8).map((page, index) => (
                      <div key={page.page} className="flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                          <span className="text-sm font-medium truncate">{page.page.replace(/^https?:\/\/[^\/]+/, '') || '/'}</span>
                        </div>
                        <Badge variant="outline">{page.views} views</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-8 text-muted-foreground">
                    <p>Nenhuma visualização de página registrada</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Dispositivos */}
            <Card>
              <CardHeader>
                <CardTitle>📱 Dispositivos dos Visitantes</CardTitle>
                <CardDescription>Últimos 7 dias</CardDescription>
              </CardHeader>
              <CardContent>
                {analyticsData?.deviceData && analyticsData.deviceData.length > 0 ? (
                  <div className="space-y-3">
                    {analyticsData.deviceData.map((device, index) => (
                      <div key={device.device} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="font-medium capitalize">{device.device}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">{device.count}</p>
                          <p className="text-xs text-muted-foreground">
                            {((device.count / (analyticsData?.visitors.unique || 1)) * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-8 text-muted-foreground">
                    <p>Nenhum dado de dispositivo disponível</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Insights e Recomendações */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Insights e Recomendações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Taxa de Conversão:</strong> {analyticsData?.conversions.conversionRate.toFixed(2) || 0}% 
                    {(analyticsData?.conversions.conversionRate || 0) < 2 ? 
                      " - Baixa. Considere otimizar os formulários." : 
                      " - Boa performance de conversão!"
                    }
                  </AlertDescription>
                </Alert>
                
                <Alert>
                  <TrendingUp className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Crescimento:</strong> 
                    {analyticsData?.visitors.growth ? 
                      ` ${analyticsData.visitors.growth > 0 ? '+' : ''}${analyticsData.visitors.growth.toFixed(1)}% visitantes hoje` :
                      " Configure o analytics para ver tendências"
                    }
                  </AlertDescription>
                </Alert>
              </div>
              
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="font-semibold mb-2">💡 Próximos Passos:</p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Configure rastreamento nos formulários mais importantes</li>
                  <li>• Monitore a taxa de conversão diariamente</li>
                  <li>• Analise o funil para identificar pontos de melhoria</li>
                  <li>• Configure campanhas no Facebook e Google para aumentar conversões</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ANALYTICS TAB */}
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>⚙️ Configurações Avançadas</CardTitle>
              <CardDescription>
                Configurações técnicas e integrações avançadas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Configurações avançadas em desenvolvimento. Em breve: 
                webhooks customizados, APIs externas, relatórios automatizados.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketingManagement;