import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { Save, Eye, BarChart3, Target, Code, TrendingUp, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { toast } from 'sonner';

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
    contactForm: string;
    newsletterForm: string;
    serviceForm: string;
    customForms: Array<{ name: string; id: string; campaign: string; }>;
  };
  events: {
    formSubmission: boolean;
    pageView: boolean;
    buttonClick: boolean;
    linkClick: boolean;
  };
}

export const MarketingManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('scripts');
  const [isLoading, setIsLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
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
      contactForm: 'contact-form-main',
      newsletterForm: 'newsletter-form',
      serviceForm: 'service-form',
      customForms: []
    },
    events: {
      formSubmission: true,
      pageView: true,
      buttonClick: false,
      linkClick: false
    }
  });

  // Load existing configurations
  useEffect(() => {
    loadMarketingConfig();
  }, []);

  const loadMarketingConfig = async () => {
    try {
      const saved = localStorage.getItem('marketing-config');
      if (saved) {
        const config = JSON.parse(saved);
        setMarketingScripts(config.scripts || marketingScripts);
        setConversionTracking(config.tracking || conversionTracking);
      }
    } catch (error) {
      console.error('Erro ao carregar configuração de marketing:', error);
    }
  };

  const saveMarketingConfig = async () => {
    setIsLoading(true);
    try {
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
// Configuração de rastreamento de conversão - ${new Date().toISOString()}
window.MarketingTracker = {
  formIds: ${JSON.stringify(conversionTracking.formIds, null, 2)},
  
  trackFormSubmission: function(formId, additionalData = {}) {
    // Facebook Pixel
    if (window.fbq && ${marketingScripts.facebookPixel.enabled}) {
      fbq('track', 'Lead', {
        content_name: formId,
        ...additionalData
      });
    }
    
    // Google Analytics 4
    if (window.gtag && ${marketingScripts.googleAnalytics.enabled}) {
      gtag('event', 'form_submit', {
        form_id: formId,
        event_category: 'engagement',
        event_label: formId,
        ...additionalData
      });
    }
    
    console.log('Conversion tracked for form:', formId, additionalData);
  },
  
  init: function() {
    // Auto-track configured forms
    Object.values(this.formIds).forEach(formConfig => {
      if (typeof formConfig === 'string') {
        const form = document.getElementById(formConfig);
        if (form) {
          form.addEventListener('submit', (e) => {
            this.trackFormSubmission(formConfig);
          });
        }
      } else if (Array.isArray(formConfig)) {
        formConfig.forEach(config => {
          const form = document.getElementById(config.id);
          if (form) {
            form.addEventListener('submit', (e) => {
              this.trackFormSubmission(config.id, { campaign: config.campaign });
            });
          }
        });
      }
    });
  }
};

// Initialize tracking when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => window.MarketingTracker.init());
} else {
  window.MarketingTracker.init();
}
    `;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Marketing & Analytics</h2>
          <p className="text-white/70">Configure pixels, códigos de rastreamento e analytics</p>
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
        <TabsList className="grid w-full grid-cols-3 backdrop-blur-md bg-white/10 border border-white/20">
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
        </TabsList>

        <TabsContent value="scripts" className="space-y-6">
          {/* Facebook Pixel */}
          <Card className="backdrop-blur-md bg-white/5 border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">f</div>
                Facebook Pixel (Meta)
              </CardTitle>
              <CardDescription className="text-white/70">
                Configure o Meta Pixel para rastreamento de conversões e criação de públicos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="fb-enabled"
                  checked={marketingScripts.facebookPixel.enabled}
                  onChange={(e) => setMarketingScripts(prev => ({
                    ...prev,
                    facebookPixel: { ...prev.facebookPixel, enabled: e.target.checked }
                  }))}
                  className="w-4 h-4"
                />
                <Label htmlFor="fb-enabled" className="text-white">Ativar Facebook Pixel</Label>
              </div>
              
              {marketingScripts.facebookPixel.enabled && (
                <>
                  <div>
                    <Label className="text-white">Pixel ID</Label>
                    <Input
                      placeholder="123456789012345"
                      value={marketingScripts.facebookPixel.pixelId}
                      onChange={(e) => setMarketingScripts(prev => ({
                        ...prev,
                        facebookPixel: { ...prev.facebookPixel, pixelId: e.target.value }
                      }))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-white">Código Personalizado (Opcional)</Label>
                    <Textarea
                      placeholder="fbq('track', 'CustomEvent');"
                      value={marketingScripts.facebookPixel.customCode}
                      onChange={(e) => setMarketingScripts(prev => ({
                        ...prev,
                        facebookPixel: { ...prev.facebookPixel, customCode: e.target.value }
                      }))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      rows={3}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Google Analytics 4 */}
          <Card className="backdrop-blur-md bg-white/5 border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">G</div>
                Google Analytics 4
              </CardTitle>
              <CardDescription className="text-white/70">
                Configure o GA4 para análise detalhada de comportamento e conversões
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="ga-enabled"
                  checked={marketingScripts.googleAnalytics.enabled}
                  onChange={(e) => setMarketingScripts(prev => ({
                    ...prev,
                    googleAnalytics: { ...prev.googleAnalytics, enabled: e.target.checked }
                  }))}
                  className="w-4 h-4"
                />
                <Label htmlFor="ga-enabled" className="text-white">Ativar Google Analytics 4</Label>
              </div>
              
              {marketingScripts.googleAnalytics.enabled && (
                <>
                  <div>
                    <Label className="text-white">Measurement ID</Label>
                    <Input
                      placeholder="G-XXXXXXXXXX"
                      value={marketingScripts.googleAnalytics.measurementId}
                      onChange={(e) => setMarketingScripts(prev => ({
                        ...prev,
                        googleAnalytics: { ...prev.googleAnalytics, measurementId: e.target.value }
                      }))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-white">Código Personalizado (Opcional)</Label>
                    <Textarea
                      placeholder="gtag('config', 'GA_MEASUREMENT_ID', { custom_parameter: 'value' });"
                      value={marketingScripts.googleAnalytics.customCode}
                      onChange={(e) => setMarketingScripts(prev => ({
                        ...prev,
                        googleAnalytics: { ...prev.googleAnalytics, customCode: e.target.value }
                      }))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      rows={3}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Google Tag Manager */}
          <Card className="backdrop-blur-md bg-white/5 border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">GTM</div>
                Google Tag Manager
              </CardTitle>
              <CardDescription className="text-white/70">
                Gerencie todos os seus códigos de rastreamento em um só lugar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="gtm-enabled"
                  checked={marketingScripts.googleTagManager.enabled}
                  onChange={(e) => setMarketingScripts(prev => ({
                    ...prev,
                    googleTagManager: { ...prev.googleTagManager, enabled: e.target.checked }
                  }))}
                  className="w-4 h-4"
                />
                <Label htmlFor="gtm-enabled" className="text-white">Ativar Google Tag Manager</Label>
              </div>
              
              {marketingScripts.googleTagManager.enabled && (
                <div>
                  <Label className="text-white">Container ID</Label>
                  <Input
                    placeholder="GTM-XXXXXXX"
                    value={marketingScripts.googleTagManager.containerId}
                    onChange={(e) => setMarketingScripts(prev => ({
                      ...prev,
                      googleTagManager: { ...prev.googleTagManager, containerId: e.target.value }
                    }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Custom Scripts */}
          <Card className="backdrop-blur-md bg-white/5 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Scripts Personalizados</CardTitle>
              <CardDescription className="text-white/70">
                Adicione códigos personalizados de outras ferramentas de marketing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-white">Scripts para &lt;head&gt;</Label>
                <Textarea
                  placeholder="<!-- Hotjar, Clarity, ou outros scripts -->"
                  value={marketingScripts.customScripts.head}
                  onChange={(e) => setMarketingScripts(prev => ({
                    ...prev,
                    customScripts: { ...prev.customScripts, head: e.target.value }
                  }))}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  rows={4}
                />
              </div>
              
              <div>
                <Label className="text-white">Scripts para &lt;body&gt;</Label>
                <Textarea
                  placeholder="<!-- Scripts que devem executar no body -->"
                  value={marketingScripts.customScripts.body}
                  onChange={(e) => setMarketingScripts(prev => ({
                    ...prev,
                    customScripts: { ...prev.customScripts, body: e.target.value }
                  }))}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-6">
          {/* Form IDs Configuration */}
          <Card className="backdrop-blur-md bg-white/5 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">IDs dos Formulários</CardTitle>
              <CardDescription className="text-white/70">
                Configure IDs únicos para cada formulário para rastreamento preciso de conversões
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-blue-500/10 border-blue-500/20">
                <Info className="h-4 w-4 text-blue-400" />
                <AlertDescription className="text-blue-300">
                  Cada formulário deve ter um ID único para evitar conflitos no rastreamento de campanhas diferentes.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">Formulário de Contato Principal</Label>
                  <Input
                    value={conversionTracking.formIds.contactForm}
                    onChange={(e) => setConversionTracking(prev => ({
                      ...prev,
                      formIds: { ...prev.formIds, contactForm: e.target.value }
                    }))}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                
                <div>
                  <Label className="text-white">Formulário de Newsletter</Label>
                  <Input
                    value={conversionTracking.formIds.newsletterForm}
                    onChange={(e) => setConversionTracking(prev => ({
                      ...prev,
                      formIds: { ...prev.formIds, newsletterForm: e.target.value }
                    }))}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                
                <div>
                  <Label className="text-white">Formulário de Serviços</Label>
                  <Input
                    value={conversionTracking.formIds.serviceForm}
                    onChange={(e) => setConversionTracking(prev => ({
                      ...prev,
                      formIds: { ...prev.formIds, serviceForm: e.target.value }
                    }))}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-white">Formulários Personalizados</Label>
                  <Button 
                    onClick={addCustomForm}
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Adicionar Formulário
                  </Button>
                </div>
                
                {conversionTracking.formIds.customForms.map((form, index) => (
                  <div key={index} className="grid grid-cols-4 gap-2 p-3 bg-white/5 rounded border border-white/10">
                    <Input
                      placeholder="Nome do formulário"
                      value={form.name}
                      onChange={(e) => updateCustomForm(index, 'name', e.target.value)}
                      className="bg-white/10 border-white/20 text-white"
                    />
                    <Input
                      placeholder="ID único"
                      value={form.id}
                      onChange={(e) => updateCustomForm(index, 'id', e.target.value)}
                      className="bg-white/10 border-white/20 text-white"
                    />
                    <Input
                      placeholder="Campanha"
                      value={form.campaign}
                      onChange={(e) => updateCustomForm(index, 'campaign', e.target.value)}
                      className="bg-white/10 border-white/20 text-white"
                    />
                    <Button
                      onClick={() => removeCustomForm(index)}
                      variant="destructive"
                      size="sm"
                    >
                      Remover
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Event Tracking */}
          <Card className="backdrop-blur-md bg-white/5 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Eventos de Rastreamento</CardTitle>
              <CardDescription className="text-white/70">
                Configure quais eventos devem ser automaticamente rastreados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(conversionTracking.events).map(([key, enabled]) => (
                  <div key={key} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={(e) => setConversionTracking(prev => ({
                        ...prev,
                        events: { ...prev.events, [key]: e.target.checked }
                      }))}
                      className="w-4 h-4"
                    />
                    <Label className="text-white capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Generated Tracking Code */}
          <Card className="backdrop-blur-md bg-white/5 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Código de Rastreamento Gerado</CardTitle>
              <CardDescription className="text-white/70">
                Código JavaScript gerado automaticamente baseado nas suas configurações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-black/30 p-4 rounded text-white/80 text-xs overflow-auto max-h-60">
                {generateConversionCode()}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="backdrop-blur-md bg-white/5 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Status dos Scripts</CardTitle>
              <CardDescription className="text-white/70">
                Verificação em tempo real dos scripts de marketing configurados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white/5 rounded border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${
                      marketingScripts.facebookPixel.enabled && marketingScripts.facebookPixel.pixelId 
                        ? 'bg-green-400' : 'bg-red-400'
                    }`} />
                    <span className="text-white font-medium">Facebook Pixel</span>
                  </div>
                  <p className="text-white/60 text-sm">
                    {marketingScripts.facebookPixel.enabled && marketingScripts.facebookPixel.pixelId 
                      ? `Ativo (${marketingScripts.facebookPixel.pixelId})` 
                      : 'Inativo'}
                  </p>
                </div>

                <div className="p-3 bg-white/5 rounded border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${
                      marketingScripts.googleAnalytics.enabled && marketingScripts.googleAnalytics.measurementId 
                        ? 'bg-green-400' : 'bg-red-400'
                    }`} />
                    <span className="text-white font-medium">Google Analytics</span>
                  </div>
                  <p className="text-white/60 text-sm">
                    {marketingScripts.googleAnalytics.enabled && marketingScripts.googleAnalytics.measurementId 
                      ? `Ativo (${marketingScripts.googleAnalytics.measurementId})` 
                      : 'Inativo'}
                  </p>
                </div>

                <div className="p-3 bg-white/5 rounded border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${
                      marketingScripts.googleTagManager.enabled && marketingScripts.googleTagManager.containerId 
                        ? 'bg-green-400' : 'bg-red-400'
                    }`} />
                    <span className="text-white font-medium">Google Tag Manager</span>
                  </div>
                  <p className="text-white/60 text-sm">
                    {marketingScripts.googleTagManager.enabled && marketingScripts.googleTagManager.containerId 
                      ? `Ativo (${marketingScripts.googleTagManager.containerId})` 
                      : 'Inativo'}
                  </p>
                </div>

                <div className="p-3 bg-white/5 rounded border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${
                      conversionTracking.formIds.customForms.length > 0 
                        ? 'bg-green-400' : 'bg-yellow-400'
                    }`} />
                    <span className="text-white font-medium">Formulários Rastreados</span>
                  </div>
                  <p className="text-white/60 text-sm">
                    {conversionTracking.formIds.customForms.length + 3} formulários configurados
                  </p>
                </div>
              </div>

              <Alert className="bg-amber-500/10 border-amber-500/20">
                <TrendingUp className="h-4 w-4 text-amber-400" />
                <AlertDescription className="text-amber-300">
                  <strong>Dica Pro:</strong> Para melhor performance, use Google Tag Manager para gerenciar Facebook Pixel e outros scripts. 
                  Configure eventos personalizados para medir micro-conversões como tempo na página, scroll depth e cliques em CTAs.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};