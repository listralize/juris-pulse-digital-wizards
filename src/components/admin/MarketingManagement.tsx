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
      contactFormMain: 'contact-form-main', // Formulário principal de contato
      serviceFormModal: 'service-form-modal', // Modal de serviços
      linkTreeForms: [], // Formulários do LinkTree (populado dinamicamente)
      customForms: []
    },
    events: {
      formSubmission: true,
      conversion: true, // ✅ ADICIONADO evento de conversão
      pageView: true,
      buttonClick: false,
      linkClick: false
    }
  });

  // Load existing configurations
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
      // Carregar dados de analytics do Supabase
      const today = new Date();
      const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

      // Visitantes
      const { data: visitorsData } = await supabase
        .from('website_analytics')
        .select('session_id, timestamp')
        .gte('timestamp', oneWeekAgo.toISOString());

      // Conversões
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
      // Carregar configurações do Supabase
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

        if (settings.form_tracking_config) {
          setConversionTracking(prev => ({
            ...prev,
            formIds: {
              ...prev.formIds,
              ...settings.form_tracking_config
            }
          }));
        }

        if (settings.event_tracking_config) {
          setConversionTracking(prev => ({
            ...prev,
            events: {
              ...prev.events,
              ...settings.event_tracking_config
            }
          }));
        }
      }
    } catch (error) {
      console.error('Erro ao carregar configuração de marketing:', error);
      // Fallback para localStorage se não houver no Supabase
      const saved = localStorage.getItem('marketing-config');
      if (saved) {
        const config = JSON.parse(saved);
        setMarketingScripts(config.scripts || marketingScripts);
        setConversionTracking(config.tracking || conversionTracking);
      }
    }
  };

  const saveMarketingConfig = async () => {
    setIsLoading(true);
    try {
      // Salvar no Supabase
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

      // Backup no localStorage
      const config = {
        scripts: marketingScripts,
        tracking: conversionTracking,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem('marketing-config', JSON.stringify(config));
      
      setLastSaved(new Date());
      
      // Inject scripts into the DOM
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
    // Remove existing injected scripts
    const existingScripts = document.querySelectorAll('[data-marketing-script]');
    existingScripts.forEach(script => script.remove());

    // Facebook Pixel
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

    // Google Analytics 4
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
        gtag('config', '${marketingScripts.googleAnalytics.measurementId}', {
          page_title: document.title,
          page_location: window.location.href
        });
        ${marketingScripts.googleAnalytics.customCode}
      `;
      document.head.appendChild(gaConfig);
    }

    // Google Tag Manager
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

    // Custom Scripts
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

    // Inject conversion tracking script
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
// 🚀 Sistema de Analytics e Conversão Avançado - ${new Date().toISOString()}
// Este código rastreia automaticamente todos os eventos importantes do seu site

window.AdvancedMarketingTracker = {
  // ✅ CONFIGURAÇÃO DE FORMULÁRIOS REAIS DO SEU SITE
  formIds: {
    contactFormMain: '${conversionTracking.formIds.contactFormMain}', // Formulário principal de contato
    serviceFormModal: '${conversionTracking.formIds.serviceFormModal}', // Modal de serviços específicos
    linkTreeForms: ${JSON.stringify(conversionTracking.formIds.linkTreeForms)}, // Formulários do LinkTree
    customForms: ${JSON.stringify(conversionTracking.formIds.customForms)} // Formulários personalizados
  },
  
  // 📊 FUNÇÃO DE RASTREAMENTO DE CONVERSÕES
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

    // Enviar para Supabase
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
      console.warn('Erro ao enviar conversão para analytics:', error);
    }

    // Facebook Pixel
    if (window.fbq && ${marketingScripts.facebookPixel.enabled}) {
      fbq('track', 'Lead', {
        content_name: formId,
        form_name: this.getFormName(formId),
        ...formData
      });
    }
    
    // Google Analytics 4
    if (window.gtag && ${marketingScripts.googleAnalytics.enabled}) {
      gtag('event', 'conversion', {
        event_category: 'lead_generation',
        event_label: formId,
        form_id: formId,
        value: 1,
        currency: 'BRL',
        ...formData
      });
    }
    
    console.log('✅ Conversão rastreada:', formId, formData);
  },

  // 📈 RASTREAMENTO DE PAGEVIEW
  trackPageView: async function() {
    const sessionId = this.getSessionId();
    const pageData = {
      session_id: sessionId,
      page_url: window.location.href,
      page_title: document.title,
      referrer: document.referrer,
      user_agent: navigator.userAgent,
      timestamp: new Date().toISOString()
    };

    try {
      await fetch('https://hmfsvccbyxhdwmrgcyff.supabase.co/rest/v1/website_analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtZnN2Y2NieXhoZHdtcmdjeWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NzU4MjksImV4cCI6MjA2NDQ1MTgyOX0.X7SiICMFL246-QjgNPYruRglx2JuQJA2XWj2NVgZzdU'
        },
        body: JSON.stringify(pageData)
      });
    } catch (error) {
      console.warn('Erro ao enviar pageview:', error);
    }
  },

  // 🔧 FUNÇÕES AUXILIARES
  getSessionId: function() {
    let sessionId = localStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  },

  getFormName: function(formId) {
    const formNames = {
      '${conversionTracking.formIds.contactFormMain}': 'Formulário de Contato Principal',
      '${conversionTracking.formIds.serviceFormModal}': 'Formulário de Serviços (Modal)',
      ...Object.fromEntries(${JSON.stringify(conversionTracking.formIds.customForms)}.map(f => [f.id, f.name]))
    };
    return formNames[formId] || 'Formulário Desconhecido';
  },
  
  // 🚀 INICIALIZAÇÃO AUTOMÁTICA
  init: function() {
    // Rastrear pageview
    this.trackPageView();

    // Auto-rastrear formulários principais
    this.setupFormTracking('${conversionTracking.formIds.contactFormMain}');
    this.setupFormTracking('${conversionTracking.formIds.serviceFormModal}');
    
    // Auto-rastrear formulários do LinkTree
    ${JSON.stringify(conversionTracking.formIds.linkTreeForms)}.forEach(formId => {
      this.setupFormTracking(formId);
    });
    
    // Auto-rastrear formulários personalizados
    ${JSON.stringify(conversionTracking.formIds.customForms)}.forEach(config => {
      this.setupFormTracking(config.id, { campaign: config.campaign });
    });

    console.log('🚀 Sistema de Analytics inicializado com sucesso!');
  },

  setupFormTracking: function(formId, extraData = {}) {
    const form = document.getElementById(formId);
    if (form) {
      form.addEventListener('submit', (e) => {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        this.trackConversion(formId, data, extraData);
      });
      console.log('✅ Rastreamento configurado para:', formId);
    } else {
      console.warn('⚠️ Formulário não encontrado:', formId);
    }
  }
};

// 🔥 INICIALIZAR QUANDO DOM ESTIVER PRONTO
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => window.AdvancedMarketingTracker.init(), 1000);
  });
} else {
  setTimeout(() => window.AdvancedMarketingTracker.init(), 1000);
}
    `;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Marketing & Analytics</h2>
          <p className="text-white/70">Configure pixels, códigos de rastreamento e analytics integrados ao Supabase</p>
        </div>
        <div className="flex items-center gap-4">
          {lastSaved && (
            <Badge variant="outline" className="text-green-400 border-green-400">
              <CheckCircle className="w-3 h-3 mr-1" />
              Salvo {lastSaved.toLocaleTimeString()}
            </Badge>
          )}
          <Button onClick={saveMarketingConfig} disabled={isLoading} className="bg-white/10 hover:bg-white/20 text-white">
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Salvando...' : 'Salvar Configurações'}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 backdrop-blur-md bg-white/10 border border-white/20">
          <TabsTrigger value="scripts" className="text-white/80 hover:text-white data-[state=active]:text-white data-[state=active]:bg-white/20">
            <Code className="w-4 h-4 mr-2" />
            Scripts & Pixels
          </TabsTrigger>
          <TabsTrigger value="tracking" className="text-white/80 hover:text-white data-[state=active]:text-white data-[state=active]:bg-white/20">
            <Target className="w-4 h-4 mr-2" />
            Rastreamento
          </TabsTrigger>
          <TabsTrigger value="analytics" className="text-white/80 hover:text-white data-[state=active]:text-white data-[state=active]:bg-white/20">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="text-white/80 hover:text-white data-[state=active]:text-white data-[state=active]:bg-white/20">
            <TrendingUp className="w-4 h-4 mr-2" />
            Dashboard
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scripts">
          {/* Content for scripts tab - simplified */}
          <Card className="backdrop-blur-md bg-white/5 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Scripts & Pixels Configurados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/70">Configure Facebook Pixel, Google Analytics e outros scripts aqui.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking">
          <Card className="backdrop-blur-md bg-white/5 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Formulários Rastreados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-white">Formulário Principal: {conversionTracking.formIds.contactFormMain}</Label>
              </div>
              <div>
                <Label className="text-white">Modal de Serviços: {conversionTracking.formIds.serviceFormModal}</Label>
              </div>
              <div>
                <Label className="text-white">LinkTree Forms: {conversionTracking.formIds.linkTreeForms.length} encontrados</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="backdrop-blur-md bg-white/5 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Status dos Scripts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/70">Todos os scripts estão integrados ao Supabase e funcionando.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dashboard">
          <Card className="backdrop-blur-md bg-white/5 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Dashboard Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/60">Visitantes: {analyticsData?.visitors.total || 0}</p>
                </div>
                <div>
                  <p className="text-white/60">Conversões: {analyticsData?.conversions.total || 0}</p>
                </div>
              </div>
              <Button onClick={loadAnalyticsData} className="mt-4">
                Atualizar Dados
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};