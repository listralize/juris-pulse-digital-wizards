import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { supabase } from '../../integrations/supabase/client';
import { toast } from 'sonner';
import { Eye, Save, ExternalLink, Activity, Target, Settings, TrendingUp, BarChart3, Users, MousePointerClick, Zap, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import { ConversionFunnel } from './ConversionFunnel';
import { CampaignReports } from './CampaignReports';
import { useFormConfig } from '@/hooks/useFormConfig';

interface MarketingSettings {
  facebook_pixel_enabled: boolean;
  facebook_pixel_id: string;
  facebook_conversion_api_token: string;
  facebook_custom_code: string;
  google_analytics_enabled: boolean;
  google_analytics_id: string;
  google_analytics_custom_code: string;
  google_tag_manager_enabled: boolean;
  google_tag_manager_id: string;
  custom_head_scripts: string;
  custom_body_scripts: string;
}

interface FormPerformance {
  formId: string;
  formName: string;
  submissions: number;
  conversionRate: number;
  lastSubmission?: string;
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
  linkTreeForms: FormTrackingConfig[];
}

export const MarketingManagement: React.FC = () => {
  const [settings, setSettings] = useState<MarketingSettings>({
    facebook_pixel_enabled: false,
    facebook_pixel_id: '',
    facebook_conversion_api_token: '',
    facebook_custom_code: '',
    google_analytics_enabled: false,
    google_analytics_id: '',
    google_analytics_custom_code: '',
    google_tag_manager_enabled: false,
    google_tag_manager_id: '',
    custom_head_scripts: '',
    custom_body_scripts: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [formPerformance, setFormPerformance] = useState<FormPerformance[]>([]);
  const [isLoadingPerformance, setIsLoadingPerformance] = useState(false);
  
  const [conversionTracking, setConversionTracking] = useState<ConversionTracking>({
    systemForms: [],
    linkTreeForms: []
  });

  const { multipleFormsConfig, isLoading: formsLoading } = useFormConfig();

  // Load marketing settings
  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('marketing_settings')
        .select('*')
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setSettings({
          facebook_pixel_enabled: data.facebook_pixel_enabled || false,
          facebook_pixel_id: data.facebook_pixel_id || '',
          facebook_conversion_api_token: data.facebook_conversion_api_token || '',
          facebook_custom_code: data.facebook_custom_code || '',
          google_analytics_enabled: data.google_analytics_enabled || false,
          google_analytics_id: data.google_analytics_id || '',
          google_analytics_custom_code: data.google_analytics_custom_code || '',
          google_tag_manager_enabled: data.google_tag_manager_enabled || false,
          google_tag_manager_id: data.google_tag_manager_id || '',
          custom_head_scripts: data.custom_head_scripts || '',
          custom_body_scripts: data.custom_body_scripts || ''
        });

        // Load tracking configs
        if (data.form_tracking_config) {
          setConversionTracking(prev => ({
            ...prev,
            systemForms: data.form_tracking_config.systemForms || []
          }));
        }
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      toast.error('Erro ao carregar configurações');
    } finally {
      setIsLoading(false);
    }
  };

  // Load form performance data
  const loadFormPerformance = async () => {
    setIsLoadingPerformance(true);
    try {
      // Get all form submissions from the last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: submissions, error } = await supabase
        .from('form_leads')
        .select('form_id, form_name, created_at')
        .gte('created_at', thirtyDaysAgo.toISOString());

      if (error) throw error;

      // Process submissions by form and create performance data
      const performanceMap: Record<string, { submissions: number; lastSubmission: string; formName: string }> = {};

      submissions?.forEach((submission) => {
        const formId = submission.form_id || 'default';
        const formName = submission.form_name || 'Formulário Principal';
        
        if (!performanceMap[formId]) {
          performanceMap[formId] = {
            submissions: 0,
            lastSubmission: submission.created_at,
            formName
          };
        }
        
        performanceMap[formId].submissions++;
        if (submission.created_at > performanceMap[formId].lastSubmission) {
          performanceMap[formId].lastSubmission = submission.created_at;
        }
      });

      // Garantir que todos os formulários do sistema apareçam, mesmo sem submissões
      if (multipleFormsConfig?.forms) {
        multipleFormsConfig.forms.forEach((form) => {
          const formId = form.id || 'default';
          if (!performanceMap[formId]) {
            performanceMap[formId] = {
              submissions: 0,
              lastSubmission: '',
              formName: form.name || 'Formulário sem nome'
            };
          }
        });
      }

      // Convert to array format
      const performanceData: FormPerformance[] = Object.entries(performanceMap).map(([formId, data]) => ({
        formId,
        formName: data.formName,
        submissions: data.submissions,
        conversionRate: data.submissions > 0 ? Math.round((data.submissions / 100) * 100) / 100 : 0,
        lastSubmission: data.lastSubmission || undefined
      }));

      console.log('📊 [MarketingManagement] Performance dos formulários:', performanceData);
      setFormPerformance(performanceData);

    } catch (error) {
      console.error('Error loading form performance:', error);
      toast.error('Erro ao carregar performance dos formulários');
    } finally {
      setIsLoadingPerformance(false);
    }
  };

  // Save settings
  const saveSettings = async () => {
    setIsSaving(true);
    try {
      const dataToSave = {
        ...settings,
        form_tracking_config: {
          systemForms: conversionTracking.systemForms,
          linkTreeForms: conversionTracking.linkTreeForms
        },
        event_tracking_config: {
          enabled: true,
          trackFormSubmissions: true,
          trackPageViews: true
        }
      };

      const { error } = await supabase
        .from('marketing_settings')
        .upsert(dataToSave, { onConflict: 'id' });

      if (error) throw error;

      toast.success('Configurações salvas com sucesso!');
      
      // Reload and implement scripts
      await forceReloadFromDatabase();
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Erro ao salvar configurações');
    } finally {
      setIsSaving(false);
    }
  };

  // Force reload from database and implement scripts
  const forceReloadFromDatabase = async () => {
    try {
      const { data } = await supabase
        .from('marketing_settings')
        .select('*')
        .maybeSingle();

      if (data) {
        await implementMarketingScripts(data);
        toast.success('Scripts de marketing atualizados!');
      }
    } catch (error) {
      console.error('Error reloading from database:', error);
      toast.error('Erro ao recarregar configurações');
    }
  };

  // Implement marketing scripts
  const implementMarketingScripts = async (data: any) => {
    // Remove existing scripts
    removeExistingScripts();

    // Implement Facebook Pixel
    if (data.facebook_pixel_enabled && data.facebook_pixel_id) {
      implementFacebookPixel(data.facebook_pixel_id, data.facebook_custom_code);
    }

    // Implement Google Analytics
    if (data.google_analytics_enabled && data.google_analytics_id) {
      implementGoogleAnalytics(data.google_analytics_id, data.google_analytics_custom_code);
    }

    // Implement Google Tag Manager
    if (data.google_tag_manager_enabled && data.google_tag_manager_id) {
      implementGoogleTagManager(data.google_tag_manager_id);
    }

    // Add custom scripts
    if (data.custom_head_scripts) {
      addCustomHeadScripts(data.custom_head_scripts);
    }

    if (data.custom_body_scripts) {
      addCustomBodyScripts(data.custom_body_scripts);
    }
  };

  // Implement Facebook Pixel
  const implementFacebookPixel = (pixelId: string, customCode?: string) => {
    try {
      const script = document.createElement('script');
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        
        fbq('init', '${pixelId}');
        fbq('track', 'PageView');
        
        ${customCode || ''}
      `;
      script.id = 'facebook-pixel-script';
      document.head.appendChild(script);

      // Add noscript tag
      const noscript = document.createElement('noscript');
      noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1"/>`;
      noscript.id = 'facebook-pixel-noscript';
      document.head.appendChild(noscript);
    } catch (error) {
      console.error('Error implementing Facebook Pixel:', error);
    }
  };

  // Implement Google Analytics
  const implementGoogleAnalytics = (gaId: string, customCode?: string) => {
    try {
      // Add gtag script
      const gtagScript = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      gtagScript.id = 'google-analytics-script';
      document.head.appendChild(gtagScript);

      // Add gtag config
      const configScript = document.createElement('script');
      configScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}');
        
        ${customCode || ''}
      `;
      configScript.id = 'google-analytics-config';
      document.head.appendChild(configScript);
    } catch (error) {
      console.error('Error implementing Google Analytics:', error);
    }
  };

  // Implement Google Tag Manager
  const implementGoogleTagManager = (gtmId: string) => {
    try {
      // Add GTM script to head
      const headScript = document.createElement('script');
      headScript.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `;
      headScript.id = 'google-tag-manager-script';
      document.head.appendChild(headScript);

      // Add GTM noscript to body
      const noscript = document.createElement('noscript');
      noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
      noscript.id = 'google-tag-manager-noscript';
      document.body.insertBefore(noscript, document.body.firstChild);
    } catch (error) {
      console.error('Error implementing Google Tag Manager:', error);
    }
  };

  // Add custom head scripts
  const addCustomHeadScripts = (scripts: string) => {
    try {
      const script = document.createElement('script');
      script.innerHTML = scripts;
      script.id = 'custom-head-scripts';
      document.head.appendChild(script);
    } catch (error) {
      console.error('Error adding custom head scripts:', error);
    }
  };

  // Add custom body scripts
  const addCustomBodyScripts = (scripts: string) => {
    try {
      const script = document.createElement('script');
      script.innerHTML = scripts;
      script.id = 'custom-body-scripts';
      document.body.appendChild(script);
    } catch (error) {
      console.error('Error adding custom body scripts:', error);
    }
  };

  // Remove existing scripts
  const removeExistingScripts = () => {
    const scriptIds = [
      'facebook-pixel-script',
      'facebook-pixel-noscript',
      'google-analytics-script',
      'google-analytics-config',
      'google-tag-manager-script',
      'google-tag-manager-noscript',
      'custom-head-scripts',
      'custom-body-scripts'
    ];

    scriptIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.remove();
      }
    });
  };

  // Load Link Tree forms (placeholder for future implementation)
  const loadLinkTreeForms = async () => {
    try {
      const { data: linkTreeItems } = await supabase
        .from('link_tree_items')
        .select('*')
        .eq('item_type', 'form')
        .eq('is_active', true);

      if (linkTreeItems) {
        const linkTreeForms: FormTrackingConfig[] = linkTreeItems.map(item => ({
          formId: item.form_id || item.id,
          formName: item.title,
          submitButtonId: `submit-${item.id}`,
          webhookUrl: '',
          enabled: false,
          campaign: ''
        }));

        setConversionTracking(prev => ({
          ...prev,
          linkTreeForms
        }));
      }
    } catch (error) {
      console.error('Error loading Link Tree forms:', error);
    }
  };

  // Update form tracking config
  const updateFormTracking = (type: 'systemForms' | 'linkTreeForms', index: number, field: keyof FormTrackingConfig, value: any) => {
    setConversionTracking(prev => ({
      ...prev,
      [type]: prev[type].map((form, i) => 
        i === index ? { ...form, [field]: value } : form
      )
    }));
  };

  // Load initial data
  useEffect(() => {
    loadSettings();
    loadFormPerformance();
    loadLinkTreeForms();
  }, []);

  // Carregar formulários do sistema quando disponíveis
  useEffect(() => {
    if (!formsLoading && multipleFormsConfig?.forms && multipleFormsConfig.forms.length > 0) {
      console.log('🔄 [MarketingManagement] Carregando formulários do sistema:', multipleFormsConfig.forms.length);
      
      // Preservar configurações existentes ou criar novas
      const existingConfigs = conversionTracking.systemForms.reduce((acc, config) => {
        acc[config.formId] = config;
        return acc;
      }, {} as Record<string, FormTrackingConfig>);
      
      const systemForms: FormTrackingConfig[] = multipleFormsConfig.forms.map(form => {
        const existing = existingConfigs[form.id || ''];
        return {
          formId: form.id || 'default',
          formName: form.name || 'Formulário sem nome',
          submitButtonId: existing?.submitButtonId || `submit-${form.id}`,
          webhookUrl: form.webhookUrl,
          enabled: existing?.enabled ?? false,
          campaign: existing?.campaign || ''
        };
      });
      
      console.log('✅ [MarketingManagement] Configurados', systemForms.length, 'formulários para tracking');
      
      setConversionTracking(prev => ({
        ...prev,
        systemForms
      }));

      // Recarregar performance para incluir novos formulários
      loadFormPerformance();
    }
  }, [multipleFormsConfig, formsLoading]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Marketing & Analytics</h2>
          <p className="text-muted-foreground">Configure pixels, analytics e acompanhe conversões</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={loadFormPerformance}
            disabled={isLoadingPerformance}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingPerformance ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
          <Button onClick={saveSettings} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Analytics & Pixel
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="funnel" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Funil de Conversão
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Relatórios
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Configurações de Rastreamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Facebook Pixel */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="facebook-pixel-enabled">Facebook Pixel</Label>
                  <Switch
                    id="facebook-pixel-enabled"
                    checked={settings.facebook_pixel_enabled}
                    onCheckedChange={(checked) => setSettings({ ...settings, facebook_pixel_enabled: checked })}
                  />
                </div>
                {settings.facebook_pixel_enabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="facebook-pixel-id">Pixel ID</Label>
                      <Input
                        type="text"
                        id="facebook-pixel-id"
                        value={settings.facebook_pixel_id}
                        onChange={(e) => setSettings({ ...settings, facebook_pixel_id: e.target.value })}
                        placeholder="Insira o Pixel ID"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="facebook-conversion-api-token">Conversion API Token</Label>
                      <Input
                        type="text"
                        id="facebook-conversion-api-token"
                        value={settings.facebook_conversion_api_token}
                        onChange={(e) => setSettings({ ...settings, facebook_conversion_api_token: e.target.value })}
                        placeholder="Insira o Token da API de Conversão"
                      />
                    </div>
                  </div>
                )}
                {settings.facebook_pixel_enabled && (
                  <div className="space-y-2">
                    <Label htmlFor="facebook-custom-code">Código Personalizado (Opcional)</Label>
                    <Textarea
                      id="facebook-custom-code"
                      value={settings.facebook_custom_code}
                      onChange={(e) => setSettings({ ...settings, facebook_custom_code: e.target.value })}
                      placeholder="Insira código JavaScript adicional para o Pixel"
                    />
                  </div>
                )}
              </div>

              {/* Google Analytics */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="google-analytics-enabled">Google Analytics</Label>
                  <Switch
                    id="google-analytics-enabled"
                    checked={settings.google_analytics_enabled}
                    onCheckedChange={(checked) => setSettings({ ...settings, google_analytics_enabled: checked })}
                  />
                </div>
                {settings.google_analytics_enabled && (
                  <div className="space-y-2">
                    <Label htmlFor="google-analytics-id">Analytics ID</Label>
                    <Input
                      type="text"
                      id="google-analytics-id"
                      value={settings.google_analytics_id}
                      onChange={(e) => setSettings({ ...settings, google_analytics_id: e.target.value })}
                      placeholder="Insira o Analytics ID"
                    />
                  </div>
                )}
                {settings.google_analytics_enabled && (
                  <div className="space-y-2">
                    <Label htmlFor="google-analytics-custom-code">Código Personalizado (Opcional)</Label>
                    <Textarea
                      id="google-analytics-custom-code"
                      value={settings.google_analytics_custom_code}
                      onChange={(e) => setSettings({ ...settings, google_analytics_custom_code: e.target.value })}
                      placeholder="Insira código JavaScript adicional para o Analytics"
                    />
                  </div>
                )}
              </div>

              {/* Google Tag Manager */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="google-tag-manager-enabled">Google Tag Manager</Label>
                  <Switch
                    id="google-tag-manager-enabled"
                    checked={settings.google_tag_manager_enabled}
                    onCheckedChange={(checked) => setSettings({ ...settings, google_tag_manager_enabled: checked })}
                  />
                </div>
                {settings.google_tag_manager_enabled && (
                  <div className="space-y-2">
                    <Label htmlFor="google-tag-manager-id">Tag Manager ID</Label>
                    <Input
                      type="text"
                      id="google-tag-manager-id"
                      value={settings.google_tag_manager_id}
                      onChange={(e) => setSettings({ ...settings, google_tag_manager_id: e.target.value })}
                      placeholder="Insira o Tag Manager ID"
                    />
                  </div>
                )}
              </div>

              {/* Custom Scripts */}
              <div className="space-y-2">
                <Label htmlFor="custom-head-scripts">Scripts no &lt;head&gt;</Label>
                <Textarea
                  id="custom-head-scripts"
                  value={settings.custom_head_scripts}
                  onChange={(e) => setSettings({ ...settings, custom_head_scripts: e.target.value })}
                  placeholder="Insira scripts para adicionar ao &lt;head&gt;"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-body-scripts">Scripts no &lt;body&gt;</Label>
                <Textarea
                  id="custom-body-scripts"
                  value={settings.custom_body_scripts}
                  onChange={(e) => setSettings({ ...settings, custom_body_scripts: e.target.value })}
                  placeholder="Insira scripts para adicionar ao &lt;body&gt;"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Performance dos Formulários
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingPerformance ? (
                <div className="flex items-center justify-center py-8">
                  <RefreshCw className="w-6 h-6 animate-spin mr-2" />
                  Carregando dados...
                </div>
              ) : formPerformance.length > 0 ? (
                <div className="space-y-4">
                  {formPerformance.map((form) => (
                    <div key={form.formId} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{form.formName}</h4>
                        <p className="text-sm text-muted-foreground">ID: {form.formId}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{form.submissions}</div>
                        <div className="text-sm text-muted-foreground">envios</div>
                      </div>
                      {form.lastSubmission && (
                        <div className="text-right ml-4">
                          <div className="text-sm">Último envio:</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(form.lastSubmission).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Nenhum dado de performance encontrado</h3>
                  <p className="text-muted-foreground">Comece configurando seus formulários para rastrear conversões.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funnel">
          <ConversionFunnel />
        </TabsContent>

        <TabsContent value="reports">
          <CampaignReports />
        </TabsContent>
      </Tabs>
    </div>
  );
};
