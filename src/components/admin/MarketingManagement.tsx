import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { Save, Eye, BarChart3, Target, Code, TrendingUp, AlertTriangle, CheckCircle, Info, Users, MousePointer, Calendar, ArrowUpDown, Settings, Trash2, RefreshCw, Globe } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/logger';
import { useFormConfig } from '@/hooks/useFormConfig';
import { ConversionFunnel } from './ConversionFunnel';
import { CampaignReports } from './CampaignReports';
import { CitiesChart } from './CitiesChart';
import GlobalSocialProofManager from './GlobalSocialProofManager';
interface MarketingScripts {
  facebookPixel: {
    enabled: boolean;
    pixelId: string;
    customCode: string;
    conversionApiToken: string;
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
  campaignName?: string;
  facebookPixel?: {
    enabled: boolean;
    pixelId: string;
  eventType: 'Lead' | 'Purchase' | 'Contact' | 'SubmitApplication' | 'CompleteRegistration' | 'ViewContent' | 'AddToCart' | 'InitiateCheckout' | 'Custom';
  customEventName?: string;
  };
  googleAnalytics?: {
    enabled: boolean;
    measurementId: string;
    eventName: string;
  };
  googleTagManager?: {
    enabled: boolean;
    containerId: string;
    eventName: string;
  };
  customHeadScripts?: string;
  customBodyScripts?: string;
}
interface ConversionTracking {
          systemForms: FormTrackingConfig[];
          linkTreeForms: string[];
          stepForms: Array<{
            id: string;
            name: string;
            slug: string;
            enabled: boolean;
            facebookPixel?: {
              enabled: boolean;
              pixelId: string;
              eventType: 'Lead' | 'Purchase' | 'Contact' | 'SubmitApplication' | 'CompleteRegistration' | 'ViewContent' | 'AddToCart' | 'InitiateCheckout' | 'Custom';
              customEventName?: string;
            };
            googleAnalytics?: {
              enabled: boolean;
              measurementId: string;
              eventName: string;
            };
            googleTagManager?: {
              enabled: boolean;
              containerId: string;
              eventName: string;
            };
          }>;
          customForms: Array<{
    name: string;
    id: string;
    campaign: string;
    submitButtonId: string;
  }>;
  events: {
    formSubmission: boolean;
    buttonClick: boolean;
    linkClick: boolean;
  };
}
interface AnalyticsData {
  leads: {
    total: number;
    today: number;
    yesterday: number;
    growth: number;
  };
  formStats: Record<string, number>;
  topPages: Array<{ page: string; count: number }>;
  topStates: Array<{ state: string; count: number }>;
  topDDDs: Array<{ ddd: string; count: number }>;
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
  const {
    multipleFormsConfig,
    refreshConfig
  } = useFormConfig();
  const [marketingScripts, setMarketingScripts] = useState<MarketingScripts>({
    facebookPixel: {
      enabled: false,
      pixelId: '',
      customCode: '',
      conversionApiToken: ''
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
    stepForms: [],
    customForms: [],
    events: {
      formSubmission: true,
      buttonClick: false,
      linkClick: false
    }
  });

  // Forçar reload dos dados do banco
  const forceReloadFromDatabase = async () => {
    try {
      logger.log('🔄 Forçando reload dos dados do banco...');
      const {
        data: settings,
        error
      } = await supabase.from('marketing_settings').select('*').order('created_at', {
        ascending: false
      }).limit(1).maybeSingle();
      if (error) {
        console.error('❌ Erro ao recarregar:', error);
        return;
      }
      logger.log('📋 Dados recarregados do banco:', settings);
      if (settings) {
        // Atualizar scripts com dados do banco
        const newScripts = {
          facebookPixel: {
            enabled: settings.facebook_pixel_enabled || false,
            pixelId: settings.facebook_pixel_id || '',
            customCode: settings.facebook_custom_code || '',
            conversionApiToken: settings.facebook_conversion_api_token || ''
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
        };
        logger.log('📝 Atualizando interface com:', newScripts);
        setMarketingScripts(newScripts);

        // Atualizar tracking
        if (settings.form_tracking_config) {
          try {
            let trackingConfig;
            if (typeof settings.form_tracking_config === 'string') {
              trackingConfig = JSON.parse(settings.form_tracking_config);
            } else {
              trackingConfig = settings.form_tracking_config;
            }
            setConversionTracking({
              systemForms: trackingConfig.systemForms || [],
              linkTreeForms: trackingConfig.linkTreeForms || [],
              stepForms: trackingConfig.stepForms || [],
              customForms: trackingConfig.customForms || [],
              events: trackingConfig.events || {
                formSubmission: true,
                buttonClick: false,
                linkClick: false
              }
            });
          } catch (parseError) {
            console.error('❌ Erro ao parsear tracking:', parseError);
          }
        }

        // Implementar os scripts no site
        implementMarketingScripts(newScripts);
        toast.success('Dados sincronizados com o banco!');
      } else {
        logger.log('ℹ️ Nenhum dado encontrado no banco');
      }
    } catch (error) {
      console.error('❌ Erro ao forçar reload:', error);
      toast.error('Erro ao sincronizar com banco');
    }
  };

  // Implementar scripts de marketing no site
  const implementMarketingScripts = (scripts: MarketingScripts) => {
    logger.log('🚀 Implementando scripts no site:', scripts);

    // Remover scripts antigos
    removeExistingScripts();

    // Facebook Pixel
    if (scripts.facebookPixel.enabled && scripts.facebookPixel.pixelId) {
      implementFacebookPixel(scripts.facebookPixel);
    }

    // Google Analytics
    if (scripts.googleAnalytics.enabled && scripts.googleAnalytics.measurementId) {
      implementGoogleAnalytics(scripts.googleAnalytics);
    }

    // Google Tag Manager
    if (scripts.googleTagManager.enabled && scripts.googleTagManager.containerId) {
      // Validar se o container ID tem o formato correto
      if (scripts.googleTagManager.containerId.startsWith('GTM-')) {
        implementGoogleTagManager(scripts.googleTagManager);
        
        // Verificar se foi carregado corretamente após um tempo
        setTimeout(() => {
          if (typeof (window as any).dataLayer !== 'undefined') {
            logger.log('✅ GTM carregado com sucesso!');
            toast.success(`GTM ${scripts.googleTagManager.containerId} carregado com sucesso!`);
          } else {
            logger.warn('⚠️ GTM pode não ter carregado corretamente');
            toast.warning(`Verificar se o container ${scripts.googleTagManager.containerId} existe no Google Tag Manager`);
          }
        }, 2000);
      } else {
        console.error('❌ Container ID do GTM inválido:', scripts.googleTagManager.containerId);
        toast.error('Container ID do GTM deve começar com "GTM-"');
      }
    }

    // Scripts customizados
    if (scripts.customScripts.head || scripts.customScripts.body) {
      implementCustomScripts(scripts.customScripts);
    }
    
    logger.log('✅ Scripts implementados com sucesso!');
  };
  const removeExistingScripts = () => {
    // Remover scripts existentes do Facebook Pixel
    const existingFbScripts = document.querySelectorAll('script[data-marketing="facebook-pixel"]');
    existingFbScripts.forEach(script => script.remove());

    // Remover scripts existentes do Google Analytics
    const existingGaScripts = document.querySelectorAll('script[data-marketing="google-analytics"]');
    existingGaScripts.forEach(script => script.remove());

    // Remover scripts existentes do GTM
    const existingGtmScripts = document.querySelectorAll('script[data-marketing="google-tag-manager"]');
    existingGtmScripts.forEach(script => script.remove());
    
    // Remover noscript do GTM
    const existingGtmNoscripts = document.querySelectorAll('noscript[data-marketing="google-tag-manager"]');
    existingGtmNoscripts.forEach(noscript => noscript.remove());

    // Remover scripts customizados
    const existingCustomScripts = document.querySelectorAll('script[data-marketing="custom"]');
    existingCustomScripts.forEach(script => script.remove());
    
    logger.log('🧹 Scripts antigos removidos');
  };
  const implementFacebookPixel = (config: any) => {
    logger.log('📘 Implementando Facebook Pixel:', config.pixelId);
    
    // Limpar instâncias anteriores do fbq
    if ((window as any).fbq) {
      delete (window as any).fbq;
      delete (window as any)._fbq;
    }
    
    const fbPixelScript = document.createElement('script');
    fbPixelScript.setAttribute('data-marketing', 'facebook-pixel');
    fbPixelScript.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${config.pixelId}');
    `;
    document.head.appendChild(fbPixelScript);

    // Não enviamos PageView automaticamente; os eventos serão disparados conforme configuração do formulário
    
    logger.log('✅ Facebook Pixel implementado com ID:', config.pixelId);
  };
  const implementGoogleAnalytics = (config: any) => {
    logger.log('📊 Implementando Google Analytics:', config.measurementId);

    // Script do gtag
    const gtagScript = document.createElement('script');
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${config.measurementId}`;
    gtagScript.async = true;
    gtagScript.setAttribute('data-marketing', 'google-analytics');
    document.head.appendChild(gtagScript);

    // Script de configuração
    const configScript = document.createElement('script');
    configScript.setAttribute('data-marketing', 'google-analytics');
    configScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${config.measurementId}');
      ${config.customCode || ''}
    `;
    document.head.appendChild(configScript);
  };
  const implementGoogleTagManager = (config: any) => {
    logger.log('🏷️ Implementando Google Tag Manager:', config.containerId);

    // Limpar instâncias anteriores do GTM
    if ((window as any).google_tag_manager) {
      delete (window as any).google_tag_manager;
    }
    if ((window as any).dataLayer) {
      (window as any).dataLayer = [];
    } else {
      (window as any).dataLayer = [];
    }

    // Script principal do GTM no HEAD
    const gtmScript = document.createElement('script');
    gtmScript.setAttribute('data-marketing', 'google-tag-manager');
    gtmScript.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${config.containerId}');
    `;
    document.head.appendChild(gtmScript);

    // Noscript do GTM no BODY
    let existingNoscript = document.querySelector('noscript[data-marketing="google-tag-manager"]');
    if (existingNoscript) {
      existingNoscript.remove();
    }
    
    const noscript = document.createElement('noscript');
    noscript.setAttribute('data-marketing', 'google-tag-manager');
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${config.containerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.appendChild(noscript);

    logger.log('✅ Google Tag Manager implementado com Container ID:', config.containerId);
  };
  const implementCustomScripts = (config: any) => {
    logger.log('🔧 Implementando scripts customizados');
    if (config.head) {
      const headScript = document.createElement('div');
      headScript.setAttribute('data-marketing', 'custom');
      headScript.innerHTML = config.head;
      document.head.appendChild(headScript);
    }
    if (config.body) {
      const bodyScript = document.createElement('div');
      bodyScript.setAttribute('data-marketing', 'custom');
      bodyScript.innerHTML = config.body;
      document.body.appendChild(bodyScript);
    }
  };
  useEffect(() => {
    // Carregar dados iniciais e forçar sincronização
    forceReloadFromDatabase();
    loadAnalyticsData();
    loadLinkTreeForms();
    loadStepForms();
  }, []);
  useEffect(() => {
    // Evitar sobrescrever configurações carregadas do banco
    if (multipleFormsConfig?.forms && conversionTracking.systemForms.length === 0) {
      loadSystemForms();
    }
  }, [multipleFormsConfig, conversionTracking.systemForms.length]);
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
          enabled: existing?.enabled ?? false,
          // Por padrão desabilitado
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
      const {
        data: linkTreeItems
      } = await supabase.from('link_tree_items').select('form_id, title').eq('item_type', 'form').not('form_id', 'is', null);
      if (linkTreeItems) {
        const linkTreeFormIds = linkTreeItems.map(item => item.form_id).filter(id => id !== null);
        setConversionTracking(prev => ({
          ...prev,
          linkTreeForms: linkTreeFormIds
        }));
      }
    } catch (error) {
      console.error('Erro ao carregar formulários do LinkTree:', error);
    }
  };

  const loadStepForms = async () => {
    try {
      const { data: stepForms } = await supabase
        .from('step_forms')
        .select('id, name, slug, is_active')
        .eq('is_active', true);

      if (stepForms) {
        const stepFormConfigs = stepForms.map(form => ({
          id: form.id,
          name: form.name,
          slug: form.slug,
          enabled: false
        }));

        setConversionTracking(prev => ({
          ...prev,
          stepForms: stepFormConfigs
        }));
      }
    } catch (error) {
      console.error('Erro ao carregar formulários do LinkTree:', error);
    }
  };
  const loadAnalyticsData = async () => {
    logger.log('🔄 Iniciando carregamento dos dados de analytics...');
    setIsLoading(true);
    try {
      const today = new Date();
      const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

      // Carregar dados de visitantes
      const {
        data: visitorsData
      } = await supabase.from('website_analytics').select('session_id, timestamp, page_url, page_title, device_type, browser').gte('timestamp', oneWeekAgo.toISOString());

      // Carregar dados de conversões detalhadas
      const {
        data: conversionsData
      } = await supabase.from('conversion_events').select('*').gte('timestamp', oneWeekAgo.toISOString());
      if (visitorsData && conversionsData) {
        logger.log('📊 Dados brutos carregados:', {
          visitorsCount: visitorsData.length,
          conversionsCount: conversionsData.length
        });

        // Calcular visitantes únicos
        const uniqueSessionIds = new Set(visitorsData.map(v => v.session_id));
        const uniqueVisitors = uniqueSessionIds.size;

        // Calcular visitantes de hoje, ontem e esta semana
        const todayVisitors = visitorsData.filter(v => {
          const visitDate = new Date(v.timestamp).toDateString();
          return visitDate === today.toDateString();
        }).length;
        const yesterdayVisitors = visitorsData.filter(v => {
          const visitDate = new Date(v.timestamp).toDateString();
          return visitDate === yesterday.toDateString();
        }).length;
        const thisWeekVisitors = visitorsData.length; // Todos os visitantes da última semana

        // Calcular conversões de hoje, ontem e esta semana
        const todayConversions = conversionsData.filter(c => {
          const convDate = new Date(c.timestamp).toDateString();
          return convDate === today.toDateString();
        }).length;
        const yesterdayConversions = conversionsData.filter(c => {
          const convDate = new Date(c.timestamp).toDateString();
          return convDate === yesterday.toDateString();
        }).length;
        const thisWeekConversions = conversionsData.length;

        // Páginas mais visitadas
        const pageViewsMap = visitorsData.reduce((acc, visit) => {
          const page = visit.page_url || 'Página desconhecida';
          acc[page] = (acc[page] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        const topPages = Object.entries(pageViewsMap).sort(([, a], [, b]) => b - a).slice(0, 10).map(([page, views]) => ({
          page,
          views
        }));

        // Submissões por formulário
        const formSubmissionsMap = conversionsData.reduce((acc, conversion) => {
          const formId = conversion.form_id || 'Formulário desconhecido';
          acc[formId] = (acc[formId] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        const formStats = Object.entries(formSubmissionsMap).sort(([, a], [, b]) => b - a).map(([formId, count]) => ({
          formId,
          count
        }));
        const topLocations: Array<{
          location: string;
          count: number;
        }> = [];

        // Dados de dispositivos
        const deviceMap = visitorsData.reduce((acc, visit) => {
          const device = visit.device_type || 'Desconhecido';
          acc[device] = (acc[device] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        const deviceStats = Object.entries(deviceMap).sort(([, a], [, b]) => b - a).map(([device, count]) => ({
          device,
          count
        }));

        // Taxa de conversão
        const conversionRate = uniqueVisitors > 0 ? thisWeekConversions / uniqueVisitors * 100 : 0;

        // Cálculo de crescimento (hoje vs ontem)
        const visitorsGrowth = yesterdayVisitors > 0 ? (todayVisitors - yesterdayVisitors) / yesterdayVisitors * 100 : todayVisitors > 0 ? 100 : 0;
        const conversionsGrowth = yesterdayConversions > 0 ? (todayConversions - yesterdayConversions) / yesterdayConversions * 100 : todayConversions > 0 ? 100 : 0;

        // Funil de conversão realista
        const totalUniqueVisitors = uniqueVisitors;
        const engagedUsers = Math.floor(totalUniqueVisitors * 0.6);
        const qualifiedLeads = Math.floor(totalUniqueVisitors * 0.25);
        const actualConversions = thisWeekConversions;
        const newAnalyticsData = {
          visitors: {
            total: thisWeekVisitors,
            unique: uniqueVisitors,
            today: todayVisitors,
            thisWeek: thisWeekVisitors,
            growth: Number(visitorsGrowth.toFixed(1))
          },
          conversions: {
            total: thisWeekConversions,
            today: todayConversions,
            thisWeek: thisWeekConversions,
            conversionRate: Number(conversionRate.toFixed(1)),
            growth: Number(conversionsGrowth.toFixed(1))
          },
          topPages,
          formSubmissions: formStats,
          geographicData: [],
          deviceData: deviceStats,
          funnelData: {
            visitors: totalUniqueVisitors,
            engagedUsers,
            qualifiedLeads,
            conversions: actualConversions
          }
        };
        logger.log('📈 Analytics calculados:', newAnalyticsData);
        setAnalyticsData(analyticsData);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar dados de analytics:', error);
      toast.error('Erro ao carregar dados de analytics');
    } finally {
      setIsLoading(false);
    }
  };
  const saveMarketingConfig = async () => {
    setIsLoading(true);
    try {
      logger.log('💾 Salvando configurações de marketing...');
      const configData = {
        facebook_pixel_enabled: marketingScripts.facebookPixel.enabled,
        facebook_pixel_id: marketingScripts.facebookPixel.pixelId,
        facebook_custom_code: marketingScripts.facebookPixel.customCode,
        facebook_conversion_api_token: marketingScripts.facebookPixel.conversionApiToken,
        google_analytics_enabled: marketingScripts.googleAnalytics.enabled,
        google_analytics_id: marketingScripts.googleAnalytics.measurementId,
        google_analytics_custom_code: marketingScripts.googleAnalytics.customCode,
        google_tag_manager_enabled: marketingScripts.googleTagManager.enabled,
        google_tag_manager_id: marketingScripts.googleTagManager.containerId,
        custom_head_scripts: marketingScripts.customScripts.head,
        custom_body_scripts: marketingScripts.customScripts.body,
        form_tracking_config: JSON.stringify({
          systemForms: conversionTracking.systemForms,
          linkTreeForms: conversionTracking.linkTreeForms,
          customForms: conversionTracking.customForms,
          events: conversionTracking.events,
          stepForms: [] // StepForms desativado aqui para evitar duplicidade (usar editor do StepForm)
        }),
        event_tracking_config: {
          formSubmission: conversionTracking.events.formSubmission,
          buttonClick: conversionTracking.events.buttonClick,
          linkClick: conversionTracking.events.linkClick,
          pageView: true,
          conversion: true
        },
        updated_at: new Date().toISOString()
      };
      logger.log('📤 Dados a serem salvos:', configData);

      // Verificar configuração existente
      const {
        data: existingConfig
      } = await supabase.from('marketing_settings').select('id').order('created_at', {
        ascending: false
      }).limit(1).maybeSingle();
      let result;
      if (existingConfig) {
        logger.log('🔄 Atualizando configuração existente...');
        result = await supabase.from('marketing_settings').update(configData).eq('id', existingConfig.id).select();
      } else {
        logger.log('➕ Criando nova configuração...');
        result = await supabase.from('marketing_settings').insert([configData]).select();
      }
      const {
        data: savedData,
        error
      } = result;
      if (error) {
        console.error('❌ Erro ao salvar:', error);
        throw error;
      }
      logger.log('✅ Configurações salvas:', savedData);
      setLastSaved(new Date());

      // Implementar scripts imediatamente após salvar
      implementMarketingScripts(marketingScripts);
      
      // Disparar evento para que outras páginas atualizem seus scripts
      window.dispatchEvent(new CustomEvent('marketingSettingsUpdated', { 
        detail: { settings: savedData[0] } 
      }));
      
      toast.success('Configurações salvas e implementadas no site!');

      // Aguardar e recarregar para confirmar persistência
      setTimeout(() => {
        forceReloadFromDatabase();
      }, 1000);
    } catch (error) {
      console.error('❌ Erro ao salvar:', error);
      toast.error(`Erro ao salvar: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  const updateSystemForm = (index: number, field: keyof FormTrackingConfig, value: any) => {
    logger.log('✏️ Atualizando formulário:', index, field, value);
    setConversionTracking(prev => ({
      ...prev,
      systemForms: prev.systemForms.map((form, i) => i === index ? {
        ...form,
        [field]: value
      } : form)
    }));
  };
  const addCustomForm = () => {
    setConversionTracking(prev => ({
      ...prev,
      customForms: [...prev.customForms, {
        name: '',
        id: '',
        campaign: '',
        submitButtonId: ''
      }]
    }));
  };
  const updateCustomForm = (index: number, field: string, value: string) => {
    setConversionTracking(prev => ({
      ...prev,
      customForms: prev.customForms.map((form, i) => i === index ? {
        ...form,
        [field]: value
      } : form)
    }));
  };
  const removeCustomForm = (index: number) => {
    setConversionTracking(prev => ({
      ...prev,
      customForms: prev.customForms.filter((_, i) => i !== index)
    }));
  };
  return <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Configure scripts de marketing, rastreamento de conversões e analise performance
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button onClick={forceReloadFromDatabase} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sincronizar
          </Button>
          {lastSaved && <div className="text-sm text-muted-foreground">
              Última atualização: {lastSaved.toLocaleTimeString()}
            </div>}
          <Button onClick={saveMarketingConfig} disabled={isLoading}>
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Salvando...' : 'Salvar e Implementar'}
          </Button>
        </div>
      </div>

      {/* Indicador de status dos scripts */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Status dos Scripts:</strong>
          <div className="flex gap-2 mt-2">
            <Badge variant={marketingScripts.facebookPixel.enabled ? "default" : "secondary"}>
              Facebook Pixel: {marketingScripts.facebookPixel.enabled ? "Ativo" : "Inativo"}
            </Badge>
            <Badge variant={marketingScripts.googleAnalytics.enabled ? "default" : "secondary"}>
              Google Analytics: {marketingScripts.googleAnalytics.enabled ? "Ativo" : "Inativo"}
            </Badge>
            <Badge variant={marketingScripts.googleTagManager.enabled ? "default" : "secondary"}>
              GTM: {marketingScripts.googleTagManager.enabled ? "Ativo" : "Inativo"}
            </Badge>
          </div>
        </AlertDescription>
      </Alert>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="scripts">📊 Scripts Marketing</TabsTrigger>
          <TabsTrigger value="tracking">🎯 Rastreamento</TabsTrigger>
          <TabsTrigger value="reports">📑 Relatórios</TabsTrigger>
          <TabsTrigger value="dashboard">📈 Dashboard</TabsTrigger>
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
                <input type="checkbox" id="facebook-enabled" checked={marketingScripts.facebookPixel.enabled} onChange={e => setMarketingScripts(prev => ({
                ...prev,
                facebookPixel: {
                  ...prev.facebookPixel,
                  enabled: e.target.checked
                }
              }))} className="rounded" />
                <Label htmlFor="facebook-enabled">Ativar Facebook Pixel</Label>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="facebook-pixel-id">Facebook Pixel ID</Label>
                  <Input id="facebook-pixel-id" placeholder="123456789012345" value={marketingScripts.facebookPixel.pixelId} onChange={e => setMarketingScripts(prev => ({
                  ...prev,
                  facebookPixel: {
                    ...prev.facebookPixel,
                    pixelId: e.target.value
                  }
                }))} />
                </div>
                
                <div>
                  <Label htmlFor="facebook-conversion-api-token">Token API de Conversão</Label>
                  <Input id="facebook-conversion-api-token" type="password" placeholder="Token da API de Conversão do Facebook" value={marketingScripts.facebookPixel.conversionApiToken} onChange={e => setMarketingScripts(prev => ({
                  ...prev,
                  facebookPixel: {
                    ...prev.facebookPixel,
                    conversionApiToken: e.target.value
                  }
                }))} />
                  <p className="text-xs text-muted-foreground mt-1">
                    Configure na <a href="https://business.facebook.com/events_manager2/list/pixel" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Central de Eventos do Facebook</a>
                  </p>
                </div>
              </div>
              
              <div>
                <Label htmlFor="facebook-custom-code">Código Personalizado (Opcional)</Label>
                <Textarea id="facebook-custom-code" placeholder="fbq('track', 'Purchase', {value: 0.00, currency: 'USD'});" value={marketingScripts.facebookPixel.customCode} onChange={e => setMarketingScripts(prev => ({
                ...prev,
                facebookPixel: {
                  ...prev.facebookPixel,
                  customCode: e.target.value
                }
              }))} rows={3} />
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
                <input type="checkbox" id="ga-enabled" checked={marketingScripts.googleAnalytics.enabled} onChange={e => setMarketingScripts(prev => ({
                ...prev,
                googleAnalytics: {
                  ...prev.googleAnalytics,
                  enabled: e.target.checked
                }
              }))} className="rounded" />
                <Label htmlFor="ga-enabled">Ativar Google Analytics</Label>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ga-measurement-id">Measurement ID</Label>
                  <Input id="ga-measurement-id" placeholder="G-XXXXXXXXXX" value={marketingScripts.googleAnalytics.measurementId} onChange={e => setMarketingScripts(prev => ({
                  ...prev,
                  googleAnalytics: {
                    ...prev.googleAnalytics,
                    measurementId: e.target.value
                  }
                }))} />
                </div>
              </div>
              
              <div>
                <Label htmlFor="ga-custom-code">Código Personalizado (Opcional)</Label>
                <Textarea id="ga-custom-code" placeholder="gtag('event', 'purchase', {transaction_id: '12345'});" value={marketingScripts.googleAnalytics.customCode} onChange={e => setMarketingScripts(prev => ({
                ...prev,
                googleAnalytics: {
                  ...prev.googleAnalytics,
                  customCode: e.target.value
                }
              }))} rows={3} />
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
                <input type="checkbox" id="gtm-enabled" checked={marketingScripts.googleTagManager.enabled} onChange={e => setMarketingScripts(prev => ({
                ...prev,
                googleTagManager: {
                  ...prev.googleTagManager,
                  enabled: e.target.checked
                }
              }))} className="rounded" />
                <Label htmlFor="gtm-enabled">Ativar Google Tag Manager</Label>
              </div>
              
              <div>
                <Label htmlFor="gtm-container-id" className="flex items-center gap-2">
                  Container ID
                  <Badge variant="outline" className="text-xs">Formato: GTM-XXXXXXX</Badge>
                </Label>
                <Input 
                  id="gtm-container-id" 
                  placeholder="GTM-PL22PJ6V" 
                  value={marketingScripts.googleTagManager.containerId} 
                  onChange={e => setMarketingScripts(prev => ({
                    ...prev,
                    googleTagManager: {
                      ...prev.googleTagManager,
                      containerId: e.target.value
                    }
                  }))} 
                  className={marketingScripts.googleTagManager.containerId && !marketingScripts.googleTagManager.containerId.startsWith('GTM-') ? 'border-red-500' : ''}
                />
                {marketingScripts.googleTagManager.containerId && !marketingScripts.googleTagManager.containerId.startsWith('GTM-') && (
                  <p className="text-xs text-red-500 mt-1">
                    ⚠️ Container ID deve começar com "GTM-"
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Encontre seu Container ID em: <a href="https://tagmanager.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Tag Manager</a>
                </p>
              </div>
              
              {marketingScripts.googleTagManager.enabled && marketingScripts.googleTagManager.containerId && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-800">Testar GTM</p>
                      <p className="text-xs text-blue-600">Verificar se o container está carregando corretamente</p>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => {
                        if (typeof (window as any).dataLayer !== 'undefined') {
                          toast.success('✅ GTM está funcionando! DataLayer encontrado.');
                          console.log('GTM DataLayer:', (window as any).dataLayer);
                        } else {
                          toast.error('❌ GTM não está carregado. Verifique o Container ID.');
                          console.error('GTM DataLayer não encontrado');
                        }
                      }}
                    >
                      Testar GTM
                    </Button>
                  </div>
                </div>
              )}
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
                <Textarea id="custom-head" placeholder="<script>/* Seu código aqui */</script>" value={marketingScripts.customScripts.head} onChange={e => setMarketingScripts(prev => ({
                ...prev,
                customScripts: {
                  ...prev.customScripts,
                  head: e.target.value
                }
              }))} rows={5} />
              </div>
              
              <div>
                <Label htmlFor="custom-body">Scripts no Body</Label>
                <Textarea id="custom-body" placeholder="<script>/* Seu código aqui */</script>" value={marketingScripts.customScripts.body} onChange={e => setMarketingScripts(prev => ({
                ...prev,
                customScripts: {
                  ...prev.customScripts,
                  body: e.target.value
                }
              }))} rows={5} />
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
                <Button variant="outline" size="sm" onClick={() => {
                loadSystemForms();
                refreshConfig();
              }}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Atualizar
                </Button>
              </CardTitle>
              <CardDescription>
                Formulários configurados no sistema com opções de rastreamento personalizadas.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {conversionTracking.systemForms.length === 0 ? <div className="text-center p-8 text-muted-foreground">
                  <p>Nenhum formulário encontrado.</p>
                  <p className="text-sm">Clique em "Atualizar" para recarregar os formulários do sistema.</p>
                </div> : conversionTracking.systemForms.map((form, index) => <div key={form.formId} className={`border rounded-lg p-4 space-y-3 cursor-pointer transition-all ${form.enabled ? 'border-primary bg-primary/5' : 'border-muted-foreground/20'}`} onClick={() => updateSystemForm(index, 'enabled', !form.enabled)}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant={form.enabled ? "default" : "outline"}>{form.formId}</Badge>
                        <span className="font-medium">{form.formName}</span>
                        {form.enabled && <Badge variant="secondary" className="text-xs">
                            ✓ Rastreando
                          </Badge>}
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id={`form-enabled-${index}`} checked={form.enabled} onChange={e => {
                    e.stopPropagation();
                    updateSystemForm(index, 'enabled', e.target.checked);
                  }} className="rounded" />
                        <Label htmlFor={`form-enabled-${index}`}>Ativar</Label>
                      </div>
                    </div>
                    
                    {form.enabled && <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>ID do Botão de Submit</Label>
                            <Input value={form.submitButtonId} onChange={e => {
                      e.stopPropagation();
                      updateSystemForm(index, 'submitButtonId', e.target.value);
                    }} placeholder="submit-button-id" onClick={e => e.stopPropagation()} />
                          </div>
                          <div>
                            <Label>Nome da Campanha</Label>
                            <Input value={form.campaignName} onChange={e => {
                      e.stopPropagation();
                      updateSystemForm(index, 'campaignName', e.target.value);
                    }} placeholder="Nome da campanha" onClick={e => e.stopPropagation()} />
                          </div>
                        </div>

                        {/* Facebook Pixel Config */}
                        <div className="border-t pt-4">
                          <div className="flex items-center space-x-2 mb-3">
                            <input 
                              type="checkbox" 
                              id={`fb-enabled-${index}`}
                              checked={form.facebookPixel?.enabled || false}
                              onChange={e => {
                                e.stopPropagation();
                                updateSystemForm(index, 'facebookPixel', {
                                  ...form.facebookPixel,
                                  enabled: e.target.checked
                                });
                              }}
                              className="rounded" 
                            />
                            <Label htmlFor={`fb-enabled-${index}`}>📘 Facebook Pixel</Label>
                          </div>
                          
                          {form.facebookPixel?.enabled && (
                            <div className="space-y-4 bg-blue-50/50 p-4 rounded-lg border border-blue-200">
                              <div>
                                <Label className="text-sm font-medium flex items-center gap-2">
                                  <span>🆔 Pixel ID</span>
                                  <Badge variant="outline" className="text-xs">Obrigatório</Badge>
                                </Label>
                                <Input 
                                  value={form.facebookPixel?.pixelId || ''}
                                  onChange={e => {
                                    e.stopPropagation();
                                    // Validar se é apenas números (limpar qualquer código extra)
                                    const pixelId = e.target.value.replace(/[^0-9]/g, '');
                                    updateSystemForm(index, 'facebookPixel', {
                                      ...form.facebookPixel,
                                      pixelId: pixelId
                                    });
                                  }}
                                  placeholder="1024100955860841"
                                  onClick={e => e.stopPropagation()}
                                  className="font-mono text-sm"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                  Apenas números. Ex: 1024100955860841
                                </p>
                              </div>
                              
                              <div>
                                <Label className="text-sm font-medium flex items-center gap-2">
                                  <span>🎯 Tipo de Evento</span>
                                  <Badge variant="secondary" className="text-xs">Configurável</Badge>
                                </Label>
                                <Select 
                                  value={form.facebookPixel?.eventType || 'Lead'}
                                  onValueChange={(value) => {
                                    updateSystemForm(index, 'facebookPixel', {
                                      ...form.facebookPixel,
                                      eventType: value
                                    });
                                  }}
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione o tipo de evento" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Lead">📋 Lead (padrão)</SelectItem>
                                    <SelectItem value="Purchase">💰 Purchase</SelectItem>
                                    <SelectItem value="Contact">📞 Contact</SelectItem>
                                    <SelectItem value="SubmitApplication">📄 Submit Application</SelectItem>
                                    <SelectItem value="CompleteRegistration">✅ Complete Registration</SelectItem>
                                    <SelectItem value="ViewContent">👁️ View Content</SelectItem>
                                    <SelectItem value="AddToCart">🛒 Add to Cart</SelectItem>
                                    <SelectItem value="InitiateCheckout">💳 Initiate Checkout</SelectItem>
                                    <SelectItem value="Custom">🔧 Evento Personalizado</SelectItem>
                                  </SelectContent>
                                </Select>
                                
                                {form.facebookPixel?.eventType === 'Custom' && (
                                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                                    <Label className="text-sm font-medium flex items-center gap-2">
                                      <span>✏️ Nome do Evento Personalizado</span>
                                      <Badge variant="outline" className="text-xs">Obrigatório para evento personalizado</Badge>
                                    </Label>
                                    <Input
                                      type="text"
                                      placeholder="Ex: lead_form_submit, contact_form, etc."
                                      value={form.facebookPixel?.customEventName || ''}
                                      onChange={e => {
                                        e.stopPropagation();
                                        updateSystemForm(index, 'facebookPixel', {
                                          ...form.facebookPixel,
                                          customEventName: e.target.value
                                        });
                                      }}
                                      className="w-full mt-2 font-mono text-sm"
                                      onClick={e => e.stopPropagation()}
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                      Use apenas letras, números e underscore. Ex: lead_form_submit
                                    </p>
                                  </div>
                                )}
                              </div>
                              
                              {/* Preview do código gerado */}
                              {form.facebookPixel?.pixelId && (
                                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                                  <Label className="text-xs font-semibold text-blue-700">
                                    ✅ Código que será gerado para este formulário:
                                  </Label>
                                   <div className="bg-white p-2 rounded border text-xs font-mono mt-2 overflow-x-auto">
                                     <code className="text-blue-600">
{`fbq('init', '${form.facebookPixel.pixelId}');
fbq('track', '${form.facebookPixel.eventType === 'Custom' 
  ? (form.facebookPixel.customEventName || 'CustomEvent') 
  : (form.facebookPixel.eventType || 'Lead')}');`}
                                     </code>
                                   </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Google Analytics Config */}
                        <div className="border-t pt-4">
                          <div className="flex items-center space-x-2 mb-3">
                            <input 
                              type="checkbox" 
                              id={`ga-enabled-${index}`}
                              checked={form.googleAnalytics?.enabled || false}
                              onChange={e => {
                                e.stopPropagation();
                                updateSystemForm(index, 'googleAnalytics', {
                                  ...form.googleAnalytics,
                                  enabled: e.target.checked
                                });
                              }}
                              className="rounded" 
                            />
                            <Label htmlFor={`ga-enabled-${index}`}>📊 Google Analytics</Label>
                          </div>
                          
                          {form.googleAnalytics?.enabled && (
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Measurement ID</Label>
                                <Input 
                                  value={form.googleAnalytics?.measurementId || ''}
                                  onChange={e => {
                                    e.stopPropagation();
                                    updateSystemForm(index, 'googleAnalytics', {
                                      ...form.googleAnalytics,
                                      measurementId: e.target.value
                                    });
                                  }}
                                  placeholder="G-XXXXXXXXXX"
                                  onClick={e => e.stopPropagation()}
                                />
                              </div>
                              <div>
                                <Label>Nome do Evento</Label>
                                <Input 
                                  value={form.googleAnalytics?.eventName || 'form_submit'}
                                  onChange={e => {
                                    e.stopPropagation();
                                    updateSystemForm(index, 'googleAnalytics', {
                                      ...form.googleAnalytics,
                                      eventName: e.target.value
                                    });
                                  }}
                                  placeholder="form_submit"
                                  onClick={e => e.stopPropagation()}
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Google Tag Manager Config */}
                        <div className="border-t pt-4">
                          <div className="flex items-center space-x-2 mb-3">
                            <input 
                              type="checkbox" 
                              id={`gtm-enabled-${index}`}
                              checked={form.googleTagManager?.enabled || false}
                              onChange={e => {
                                e.stopPropagation();
                                updateSystemForm(index, 'googleTagManager', {
                                  ...form.googleTagManager,
                                  enabled: e.target.checked
                                });
                              }}
                              className="rounded" 
                            />
                            <Label htmlFor={`gtm-enabled-${index}`}>🏷️ Google Tag Manager</Label>
                          </div>
                          
                          {form.googleTagManager?.enabled && (
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Container ID</Label>
                                <Input 
                                  value={form.googleTagManager?.containerId || ''}
                                  onChange={e => {
                                    e.stopPropagation();
                                    updateSystemForm(index, 'googleTagManager', {
                                      ...form.googleTagManager,
                                      containerId: e.target.value
                                    });
                                  }}
                                  placeholder="GTM-XXXXXXX"
                                  onClick={e => e.stopPropagation()}
                                />
                              </div>
                              <div>
                                <Label>Nome do Evento</Label>
                                <Input 
                                  value={form.googleTagManager?.eventName || 'submit'}
                                  onChange={e => {
                                    e.stopPropagation();
                                    updateSystemForm(index, 'googleTagManager', {
                                      ...form.googleTagManager,
                                      eventName: e.target.value
                                    });
                                  }}
                                  placeholder="submit"
                                  onClick={e => e.stopPropagation()}
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Scripts Personalizados */}
                        <div className="border-t pt-4">
                          <Label className="text-sm font-medium mb-3 block">🔧 Scripts Personalizados</Label>
                          
                          <div className="space-y-4">
                            <div>
                              <Label className="text-xs font-medium text-muted-foreground">Scripts no HEAD</Label>
                              <Textarea 
                                value={form.customHeadScripts || ''} 
                                onChange={e => {
                                  e.stopPropagation();
                                  updateSystemForm(index, 'customHeadScripts', e.target.value);
                                }} 
                                placeholder="<script>/* Código personalizado para HEAD */</script>" 
                                onClick={e => e.stopPropagation()}
                                rows={3}
                                className="text-xs font-mono"
                              />
                            </div>
                            
                            <div>
                              <Label className="text-xs font-medium text-muted-foreground">Scripts no BODY</Label>
                              <Textarea 
                                value={form.customBodyScripts || ''} 
                                onChange={e => {
                                  e.stopPropagation();
                                  updateSystemForm(index, 'customBodyScripts', e.target.value);
                                }} 
                                placeholder="<script>/* Código personalizado para BODY */</script>" 
                                onClick={e => e.stopPropagation()}
                                rows={3}
                                className="text-xs font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      </>}
                  </div>)}
            </CardContent>
          </Card>

          {/* Step Forms - desativado para evitar duplicidade de pixel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                📋 Formulários StepForm
              </CardTitle>
              <CardDescription>
                O rastreamento dos StepForms agora é controlado exclusivamente no Editor do StepForm (aba "Rastreamento").
                Este módulo foi desativado aqui para evitar duplicidade de pixels e conflitos de configuração.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertDescription>
                  Para configurar Pixel/GA/GTM de um StepForm, abra o StepForm Builder, edite o formulário desejado e use a aba "Rastreamento".
                  As configurações de StepForm neste painel foram descontinuadas.
                </AlertDescription>
              </Alert>
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
              {conversionTracking.systemForms.length === 0 ? <div className="text-center p-8 text-muted-foreground">
                  <p>Nenhum formulário encontrado.</p>
                  <p className="text-sm">Clique em "Atualizar" na aba de Rastreamento para carregar os formulários.</p>
                </div> : <div className="space-y-4">
                  {conversionTracking.systemForms.map((form, index) => <div key={form.formId} className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="default">{form.formId}</Badge>
                        <span className="font-medium">{form.formName}</span>
                      </div>
                      
                       <div className="space-y-3">
                         {/* Facebook Pixel Script - sempre mostra */}
                         <div className="space-y-2">
                           <Label className="text-sm font-semibold text-blue-600">
                             Facebook Pixel - Evento de Lead:
                             {!marketingScripts.facebookPixel.enabled && <Badge variant="outline" className="ml-2 text-xs">Pixel desabilitado</Badge>}
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
                             {!marketingScripts.googleAnalytics.enabled && <Badge variant="outline" className="ml-2 text-xs">GA desabilitado</Badge>}
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
                             {!marketingScripts.googleTagManager.enabled && <Badge variant="outline" className="ml-2 text-xs">GTM desabilitado</Badge>}
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
                    </div>)}
                  
                  {/* Instrução de Implementação */}
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Como implementar:</strong> Copie os scripts acima e adicione-os no final da sua página, 
                      antes do fechamento da tag &lt;/body&gt;. Certifique-se de que os IDs dos botões de submit 
                      correspondem aos configurados acima.
                    </AlertDescription>
                  </Alert>
                </div>}
            </CardContent>
          </Card>
        </TabsContent>

        {/* RELATÓRIOS TAB */}
        <TabsContent value="reports" className="space-y-6">
          <CampaignReports />
        </TabsContent>

        {/* DASHBOARD TAB */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Gráfico de Cidades com Mais Leads */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Cidades com Mais Leads
              </CardTitle>
              <CardDescription>Análise por período selecionado</CardDescription>
            </CardHeader>
            <CardContent>
              <CitiesChart />
            </CardContent>
          </Card>

          <ConversionFunnel analyticsData={analyticsData} />
        </TabsContent>



      </Tabs>
    </div>;
};
export default MarketingManagement;