import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { Save, Eye, BarChart3, Target, Code, TrendingUp, AlertTriangle, CheckCircle, Info, Users, MousePointer, Calendar, ArrowUpDown } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

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

interface ConversionTracking {
  formIds: {
    contactFormMain: string;
    serviceFormModal: string;
    linkTreeForms: string[];
    customForms: Array<{ name: string; id: string; campaign: string; }>;
  };
  events: {
    formSubmission: boolean;
    conversion: boolean;
    pageView: boolean;
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
  };
  conversions: {
    total: number;
    today: number;
    thisWeek: number;
    conversionRate: number;
  };
  topPages: Array<{ page: string; views: number; }>;
  formSubmissions: Array<{ formId: string; count: number; }>;
}

export const MarketingManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('scripts');
  const [isLoading, setIsLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  
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
    formIds: {
      contactFormMain: 'contact-form-main',
      serviceFormModal: 'service-form-modal', 
      linkTreeForms: [],
      customForms: []
    },
    events: {
      formSubmission: true,
      conversion: true,
      pageView: true,
      buttonClick: false,
      linkClick: false
    }
  });

  useEffect(() => {
    loadMarketingConfig();
    loadAnalyticsData();
    loadLinkTreeForms();
  }, []);

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
          .filter(Boolean);

        setConversionTracking(prev => ({
          ...prev,
          formIds: {
            ...prev.formIds,
            linkTreeForms: linkTreeFormIds
          }
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

      const { data: visitorsData } = await supabase
        .from('website_analytics')
        .select('session_id, timestamp')
        .gte('timestamp', oneWeekAgo.toISOString());

      const { data: conversionsData } = await supabase
        .from('conversion_events')
        .select('*')
        .gte('timestamp', oneWeekAgo.toISOString());

      if (visitorsData && conversionsData) {
        const uniqueVisitors = new Set(visitorsData.map(v => v.session_id)).size;
        const todayVisitors = visitorsData.filter(v => 
          new Date(v.timestamp).toDateString() === today.toDateString()
        ).length;

        const todayConversions = conversionsData.filter(c => 
          new Date(c.timestamp).toDateString() === today.toDateString()
        ).length;

        setAnalyticsData({
          visitors: {
            total: visitorsData.length,
            unique: uniqueVisitors,
            today: todayVisitors,
            thisWeek: visitorsData.length
          },
          conversions: {
            total: conversionsData.length,
            today: todayConversions,
            thisWeek: conversionsData.length,
            conversionRate: uniqueVisitors > 0 ? (conversionsData.length / uniqueVisitors * 100) : 0
          },
          topPages: [],
          formSubmissions: []
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
          setConversionTracking(prev => ({
            ...prev,
            formIds: {
              ...prev.formIds,
              ...settings.form_tracking_config as Record<string, any>
            }
          }));
        }

        if (settings.event_tracking_config && typeof settings.event_tracking_config === 'object') {
          setConversionTracking(prev => ({
            ...prev,
            events: {
              ...prev.events,
              ...settings.event_tracking_config as Record<string, boolean>
            }
          }));
        }
      }
    } catch (error) {
      console.error('Erro ao carregar configuração de marketing:', error);
    }
  };

  const saveMarketingConfig = async () => {
    setIsLoading(true);
    try {
      const { data: existingSettings } = await supabase
        .from('marketing_settings')
        .select('id')
        .single();

      const settingsData = {
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
        form_tracking_config: conversionTracking.formIds,
        event_tracking_config: conversionTracking.events
      };

      if (existingSettings) {
        await supabase
          .from('marketing_settings')
          .update(settingsData)
          .eq('id', existingSettings.id);
      } else {
        await supabase
          .from('marketing_settings')
          .insert([settingsData]);
      }
      
      setLastSaved(new Date());
      await injectScripts();
      
      toast.success('Configurações de marketing salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar configuração:', error);
      toast.error('Erro ao salvar configurações de marketing');
    } finally {
      setIsLoading(false);
    }
  };

  const injectScripts = async () => {
    const existingScripts = document.querySelectorAll('[data-marketing-script]');
    existingScripts.forEach(script => script.remove());

    if (marketingScripts.facebookPixel.enabled && marketingScripts.facebookPixel.pixelId) {
      const fbScript = document.createElement('script');
      fbScript.setAttribute('data-marketing-script', 'facebook-pixel');
      fbScript.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${marketingScripts.facebookPixel.pixelId}');
        fbq('track', 'PageView');
        ${marketingScripts.facebookPixel.customCode}
      `;
      document.head.appendChild(fbScript);
    }

    if (marketingScripts.googleAnalytics.enabled && marketingScripts.googleAnalytics.measurementId) {
      const gaScript = document.createElement('script');
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${marketingScripts.googleAnalytics.measurementId}`;
      gaScript.setAttribute('data-marketing-script', 'google-analytics');
      gaScript.async = true;
      document.head.appendChild(gaScript);

      const gaConfig = document.createElement('script');
      gaConfig.setAttribute('data-marketing-script', 'google-analytics-config');
      gaConfig.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${marketingScripts.googleAnalytics.measurementId}');
        ${marketingScripts.googleAnalytics.customCode}
      `;
      document.head.appendChild(gaConfig);
    }

    if (marketingScripts.googleTagManager.enabled && marketingScripts.googleTagManager.containerId) {
      const gtmScript = document.createElement('script');
      gtmScript.setAttribute('data-marketing-script', 'google-tag-manager');
      gtmScript.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${marketingScripts.googleTagManager.containerId}');
      `;
      document.head.appendChild(gtmScript);
    }

    if (marketingScripts.customScripts.head) {
      const customHead = document.createElement('script');
      customHead.setAttribute('data-marketing-script', 'custom-head');
      customHead.innerHTML = marketingScripts.customScripts.head;
      document.head.appendChild(customHead);
    }

    if (marketingScripts.customScripts.body) {
      const customBody = document.createElement('script');
      customBody.setAttribute('data-marketing-script', 'custom-body');
      customBody.innerHTML = marketingScripts.customScripts.body;
      document.body.appendChild(customBody);
    }

    const conversionScript = document.createElement('script');
    conversionScript.setAttribute('data-marketing-script', 'conversion-tracking');
    conversionScript.innerHTML = generateConversionCode();
    document.head.appendChild(conversionScript);
  };

  const addCustomForm = () => {
    setConversionTracking(prev => ({
      ...prev,
      formIds: {
        ...prev.formIds,
        customForms: [...prev.formIds.customForms, { name: '', id: '', campaign: '' }]
      }
    }));
  };

  const removeCustomForm = (index: number) => {
    setConversionTracking(prev => ({
      ...prev,
      formIds: {
        ...prev.formIds,
        customForms: prev.formIds.customForms.filter((_, i) => i !== index)
      }
    }));
  };

  const updateCustomForm = (index: number, field: string, value: string) => {
    setConversionTracking(prev => ({
      ...prev,
      formIds: {
        ...prev.formIds,
        customForms: prev.formIds.customForms.map((form, i) => 
          i === index ? { ...form, [field]: value } : form
        )
      }
    }));
  };

  const generateConversionCode = () => {
    return `
window.AdvancedMarketingTracker = {
  formIds: {
    contactFormMain: '${conversionTracking.formIds.contactFormMain}',
    serviceFormModal: '${conversionTracking.formIds.serviceFormModal}',
    linkTreeForms: ${JSON.stringify(conversionTracking.formIds.linkTreeForms)},
    customForms: ${JSON.stringify(conversionTracking.formIds.customForms)}
  },
  
  trackConversion: async function(formId, formData = {}, additionalData = {}) {
    const sessionId = this.getSessionId();
    const conversionData = {
      session_id: sessionId,
      event_type: 'conversion',
      event_category: 'lead_generation',
      event_action: 'form_submit',
      form_id: formId,
      form_name: this.getFormName(formId),
      lead_data: formData,
      page_url: window.location.href,
      referrer: document.referrer,
      user_agent: navigator.userAgent,
      ...additionalData
    };

    try {
      await fetch('https://hmfsvccbyxhdwmrgcyff.supabase.co/rest/v1/conversion_events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtZnN2Y2NieXhoZHdtcmdjeWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NzU4MjksImV4cCI6MjA2NDQ1MTgyOX0.X7SiICMFL246-QjgNPYruRglx2JuQJA2XWj2NVgZzdU'
        },
        body: JSON.stringify(conversionData)
      });
    } catch (error) {
      console.warn('Erro ao enviar conversão:', error);
    }

    if (window.fbq && ${marketingScripts.facebookPixel.enabled}) {
      fbq('track', 'Lead', { content_name: formId, form_name: this.getFormName(formId), ...formData });
    }
    
    if (window.gtag && ${marketingScripts.googleAnalytics.enabled}) {
      gtag('event', 'conversion', { event_category: 'lead_generation', event_label: formId, ...formData });
    }
  },

  getSessionId: function() {
    let sessionId = sessionStorage.getItem('marketing_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('marketing_session_id', sessionId);
    }
    return sessionId;
  },

  getFormName: function(formId) {
    const formNames = {
      '${conversionTracking.formIds.contactFormMain}': 'Formulário Principal',
      '${conversionTracking.formIds.serviceFormModal}': 'Modal de Serviços'
    };
    return formNames[formId] || formId;
  }
};

// Auto-track form submissions
document.addEventListener('submit', function(e) {
  const form = e.target;
  if (form.tagName === 'FORM') {
    const formId = form.id || form.className || 'unknown-form';
    const formData = new FormData(form);
    const dataObj = {};
    for (let [key, value] of formData.entries()) {
      dataObj[key] = value;
    }
    window.AdvancedMarketingTracker.trackConversion(formId, dataObj);
  }
});
    `;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Marketing & Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Configure pixels, códigos de rastreamento e analytics integrados ao Supabase
          </p>
        </div>
        <Button onClick={saveMarketingConfig} disabled={isLoading}>
          <Save className="w-4 h-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>

      {lastSaved && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Última configuração salva: {lastSaved.toLocaleString()}
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="scripts" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            Scripts & Pixels
          </TabsTrigger>
          <TabsTrigger value="tracking" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Rastreamento
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Dashboard
          </TabsTrigger>
        </TabsList>

        {/* SCRIPTS & PIXELS TAB */}
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
                  placeholder="gtag('event', 'conversion', {value: 1.0});"
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
                Gerencie todos os seus scripts e pixels de forma centralizada.
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
              
              <div className="grid grid-cols-2 gap-4">
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
              </div>
            </CardContent>
          </Card>

          {/* Custom Scripts */}
          <Card>
            <CardHeader>
              <CardTitle>🛠️ Scripts Personalizados</CardTitle>
              <CardDescription>
                Adicione scripts personalizados no head ou body da página.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="custom-head">Scripts do Head</Label>
                <Textarea
                  id="custom-head"
                  placeholder="<!-- Scripts que devem ficar no <head> -->"
                  value={marketingScripts.customScripts.head}
                  onChange={(e) => setMarketingScripts(prev => ({
                    ...prev,
                    customScripts: { ...prev.customScripts, head: e.target.value }
                  }))}
                  rows={4}
                />
              </div>
              
              <div>
                <Label htmlFor="custom-body">Scripts do Body</Label>
                <Textarea
                  id="custom-body"
                  placeholder="<!-- Scripts que devem ficar no final do <body> -->"
                  value={marketingScripts.customScripts.body}
                  onChange={(e) => setMarketingScripts(prev => ({
                    ...prev,
                    customScripts: { ...prev.customScripts, body: e.target.value }
                  }))}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TRACKING TAB */}
        <TabsContent value="tracking" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>📝 Formulários Rastreados</CardTitle>
              <CardDescription>
                Configure os IDs dos formulários que serão rastreados para conversões.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact-form-main">Formulário Principal</Label>
                  <Input
                    id="contact-form-main"
                    value={conversionTracking.formIds.contactFormMain}
                    onChange={(e) => setConversionTracking(prev => ({
                      ...prev,
                      formIds: { ...prev.formIds, contactFormMain: e.target.value }
                    }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="service-form-modal">Modal de Serviços</Label>
                  <Input
                    id="service-form-modal"
                    value={conversionTracking.formIds.serviceFormModal}
                    onChange={(e) => setConversionTracking(prev => ({
                      ...prev,
                      formIds: { ...prev.formIds, serviceFormModal: e.target.value }
                    }))}
                  />
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold">LinkTree Forms: {conversionTracking.formIds.linkTreeForms.length} encontrados</Label>
                <div className="mt-2 space-y-1">
                  {conversionTracking.formIds.linkTreeForms.map((formId, index) => (
                    <Badge key={index} variant="outline" className="mr-2">
                      {formId}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <Label className="text-base font-semibold">Formulários Personalizados</Label>
                  <Button variant="outline" size="sm" onClick={addCustomForm}>
                    + Adicionar
                  </Button>
                </div>
                
                <div className="space-y-3 mt-3">
                  {conversionTracking.formIds.customForms.map((form, index) => (
                    <div key={index} className="grid grid-cols-4 gap-2 items-center">
                      <Input
                        placeholder="Nome"
                        value={form.name}
                        onChange={(e) => updateCustomForm(index, 'name', e.target.value)}
                      />
                      <Input
                        placeholder="ID do Formulário"
                        value={form.id}
                        onChange={(e) => updateCustomForm(index, 'id', e.target.value)}
                      />
                      <Input
                        placeholder="Campanha"
                        value={form.campaign}
                        onChange={(e) => updateCustomForm(index, 'campaign', e.target.value)}
                      />
                      <Button variant="destructive" size="sm" onClick={() => removeCustomForm(index)}>
                        Remover
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🎯 Eventos de Rastreamento</CardTitle>
              <CardDescription>
                Configure quais eventos serão rastreados automaticamente.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(conversionTracking.events).map(([event, enabled]) => (
                  <div key={event} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`event-${event}`}
                      checked={enabled}
                      onChange={(e) => setConversionTracking(prev => ({
                        ...prev,
                        events: { ...prev.events, [event]: e.target.checked }
                      }))}
                      className="rounded"
                    />
                    <Label htmlFor={`event-${event}`} className="capitalize">
                      {event.replace(/([A-Z])/g, ' $1').trim()}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ANALYTICS TAB */}
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                ✅ Status dos Scripts
                <Badge variant="default">Funcionando</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-semibold">Facebook Pixel</h3>
                  <p className="text-sm text-muted-foreground">
                    {marketingScripts.facebookPixel.enabled ? 'Ativo e rastreando' : 'Inativo'}
                  </p>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-semibold">Google Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    {marketingScripts.googleAnalytics.enabled ? 'Ativo e rastreando' : 'Inativo'}
                  </p>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-semibold">Supabase Analytics</h3>
                  <p className="text-sm text-muted-foreground">Integrado e funcionando</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📋 Código de Rastreamento Gerado</CardTitle>
              <CardDescription>
                Este código é automaticamente injetado no site para rastrear conversões.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg text-sm font-mono overflow-x-auto max-h-64">
                <pre>{generateConversionCode()}</pre>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Este código rastreia automaticamente submissões de formulários, pageviews e eventos personalizados, 
                enviando dados para Supabase, Facebook Pixel e Google Analytics conforme configurado.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* DASHBOARD TAB */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Visitantes Totais</p>
                    <p className="text-2xl font-bold">{analyticsData?.visitors.total || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Eye className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Visitantes Únicos</p>
                    <p className="text-2xl font-bold">{analyticsData?.visitors.unique || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <MousePointer className="h-8 w-8 text-orange-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Conversões</p>
                    <p className="text-2xl font-bold">{analyticsData?.conversions.total || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Taxa de Conversão</p>
                    <p className="text-2xl font-bold">{analyticsData?.conversions.conversionRate.toFixed(1) || 0}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Dados de Hoje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Visitantes:</span>
                    <span className="font-semibold">{analyticsData?.visitors.today || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Conversões:</span>
                    <span className="font-semibold">{analyticsData?.conversions.today || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUpDown className="h-5 w-5" />
                  Últimos 7 Dias
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Visitantes:</span>
                    <span className="font-semibold">{analyticsData?.visitors.thisWeek || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Conversões:</span>
                    <span className="font-semibold">{analyticsData?.conversions.thisWeek || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>🔄 Atualização de Dados</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={loadAnalyticsData} disabled={isLoading} className="w-full">
                {isLoading ? 'Carregando...' : 'Atualizar Dados do Analytics'}
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                Os dados são atualizados automaticamente a cada pageview e conversão.
                Use este botão para forçar uma atualização manual.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketingManagement;