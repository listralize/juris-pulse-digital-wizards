
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  Settings, 
  Code, 
  Facebook, 
  BarChart3, 
  Tag,
  Save,
  CheckCircle,
  AlertCircle,
  Loader2,
  TrendingUp,
  Target
} from 'lucide-react';
import { ConversionsTab } from './ConversionsTab';

interface MarketingSettings {
  id: string;
  facebook_pixel_enabled: boolean;
  facebook_pixel_id: string;
  facebook_custom_code: string;
  facebook_conversion_api_token: string;
  google_analytics_enabled: boolean;
  google_analytics_id: string;
  google_analytics_custom_code: string;
  google_tag_manager_enabled: boolean;
  google_tag_manager_id: string;
  custom_head_scripts: string;
  custom_body_scripts: string;
  form_tracking_config: any;
  event_tracking_config: any;
}

const defaultSettings: Omit<MarketingSettings, 'id'> = {
  facebook_pixel_enabled: false,
  facebook_pixel_id: '',
  facebook_custom_code: '',
  facebook_conversion_api_token: '',
  google_analytics_enabled: false,
  google_analytics_id: '',
  google_analytics_custom_code: '',
  google_tag_manager_enabled: false,
  google_tag_manager_id: '',
  custom_head_scripts: '',
  custom_body_scripts: '',
  form_tracking_config: {},
  event_tracking_config: {}
};

export const MarketingManagement: React.FC = () => {
  const [settings, setSettings] = useState<MarketingSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      console.log('🔄 Carregando configurações de marketing...');

      const { data, error } = await supabase
        .from('marketing_settings')
        .select('*')
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        console.log('✅ Configurações carregadas:', data);
        setSettings(data);
      } else {
        console.log('📝 Nenhuma configuração encontrada, usando padrões');
        const newSettings = { 
          id: crypto.randomUUID(), 
          ...defaultSettings 
        };
        setSettings(newSettings);
      }
      
      setHasChanges(false);
    } catch (error) {
      console.error('❌ Erro ao carregar configurações:', error);
      toast.error('Erro ao carregar configurações de marketing');
    } finally {
      setIsLoading(false);
    }
  };

  const updateSettings = (field: keyof MarketingSettings, value: any) => {
    if (!settings) return;
    
    setSettings(prev => prev ? { ...prev, [field]: value } : null);
    setHasChanges(true);
  };

  const saveSettings = async () => {
    if (!settings || !hasChanges) return;

    try {
      setIsSaving(true);
      console.log('💾 Salvando configurações:', settings);

      // Verificar se já existe uma configuração
      const { data: existingData } = await supabase
        .from('marketing_settings')
        .select('id')
        .maybeSingle();

      let result;
      if (existingData) {
        // Atualizar configuração existente
        result = await supabase
          .from('marketing_settings')
          .update({
            facebook_pixel_enabled: settings.facebook_pixel_enabled,
            facebook_pixel_id: settings.facebook_pixel_id || null,
            facebook_custom_code: settings.facebook_custom_code || null,
            facebook_conversion_api_token: settings.facebook_conversion_api_token || null,
            google_analytics_enabled: settings.google_analytics_enabled,
            google_analytics_id: settings.google_analytics_id || null,
            google_analytics_custom_code: settings.google_analytics_custom_code || null,
            google_tag_manager_enabled: settings.google_tag_manager_enabled,
            google_tag_manager_id: settings.google_tag_manager_id || null,
            custom_head_scripts: settings.custom_head_scripts || null,
            custom_body_scripts: settings.custom_body_scripts || null,
            form_tracking_config: settings.form_tracking_config || {},
            event_tracking_config: settings.event_tracking_config || {},
            updated_at: new Date().toISOString()
          })
          .eq('id', existingData.id);
      } else {
        // Criar nova configuração
        result = await supabase
          .from('marketing_settings')
          .insert([{
            facebook_pixel_enabled: settings.facebook_pixel_enabled,
            facebook_pixel_id: settings.facebook_pixel_id || null,
            facebook_custom_code: settings.facebook_custom_code || null,
            facebook_conversion_api_token: settings.facebook_conversion_api_token || null,
            google_analytics_enabled: settings.google_analytics_enabled,
            google_analytics_id: settings.google_analytics_id || null,
            google_analytics_custom_code: settings.google_analytics_custom_code || null,
            google_tag_manager_enabled: settings.google_tag_manager_enabled,
            google_tag_manager_id: settings.google_tag_manager_id || null,
            custom_head_scripts: settings.custom_head_scripts || null,
            custom_body_scripts: settings.custom_body_scripts || null,
            form_tracking_config: settings.form_tracking_config || {},
            event_tracking_config: settings.event_tracking_config || {}
          }]);
      }

      if (result.error) throw result.error;

      console.log('✅ Configurações salvas com sucesso');
      toast.success('Configurações de marketing salvas com sucesso!');
      setHasChanges(false);
      
      // Implementar scripts no site
      implementScripts();
      
    } catch (error) {
      console.error('❌ Erro ao salvar configurações:', error);
      toast.error('Erro ao salvar configurações de marketing');
    } finally {
      setIsSaving(false);
    }
  };

  const implementScripts = () => {
    if (!settings) return;

    // Remover scripts existentes
    const existingScripts = document.querySelectorAll('script[data-marketing="true"]');
    existingScripts.forEach(script => script.remove());

    // Facebook Pixel
    if (settings.facebook_pixel_enabled && settings.facebook_pixel_id) {
      const fbScript = document.createElement('script');
      fbScript.setAttribute('data-marketing', 'true');
      fbScript.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${settings.facebook_pixel_id}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(fbScript);
    }

    // Google Analytics
    if (settings.google_analytics_enabled && settings.google_analytics_id) {
      const gaScript = document.createElement('script');
      gaScript.setAttribute('data-marketing', 'true');
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${settings.google_analytics_id}`;
      gaScript.async = true;
      document.head.appendChild(gaScript);

      const gaConfigScript = document.createElement('script');
      gaConfigScript.setAttribute('data-marketing', 'true');
      gaConfigScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${settings.google_analytics_id}');
      `;
      document.head.appendChild(gaConfigScript);
    }

    // Google Tag Manager
    if (settings.google_tag_manager_enabled && settings.google_tag_manager_id) {
      const gtmScript = document.createElement('script');
      gtmScript.setAttribute('data-marketing', 'true');
      gtmScript.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${settings.google_tag_manager_id}');
      `;
      document.head.appendChild(gtmScript);
    }

    // Scripts personalizados no head
    if (settings.custom_head_scripts) {
      const customHeadScript = document.createElement('script');
      customHeadScript.setAttribute('data-marketing', 'true');
      customHeadScript.innerHTML = settings.custom_head_scripts;
      document.head.appendChild(customHeadScript);
    }

    // Scripts personalizados no body
    if (settings.custom_body_scripts) {
      const customBodyScript = document.createElement('script');
      customBodyScript.setAttribute('data-marketing', 'true');
      customBodyScript.innerHTML = settings.custom_body_scripts;
      document.body.appendChild(customBodyScript);
    }

    console.log('🚀 Scripts de marketing implementados no site');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Carregando configurações...</span>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="flex items-center justify-center p-8">
        <AlertCircle className="w-8 h-8 mr-2" />
        <span>Erro ao carregar configurações</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Marketing & Analytics</h2>
          <p className="text-muted-foreground">Configure scripts de rastreamento e analise conversões</p>
        </div>
        <div className="flex items-center gap-2">
          {hasChanges && (
            <Badge variant="outline" className="text-orange-600">
              <AlertCircle className="w-3 h-3 mr-1" />
              Alterações não salvas
            </Badge>
          )}
          <Button onClick={saveSettings} disabled={!hasChanges || isSaving}>
            {isSaving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Salvar Configurações
          </Button>
        </div>
      </div>

      <Tabs defaultValue="scripts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="scripts" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            Scripts & Rastreamento
          </TabsTrigger>
          <TabsTrigger value="conversions" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Conversões
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Campanhas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scripts" className="space-y-6">
          {/* Facebook Pixel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Facebook className="w-5 h-5" />
                Facebook Pixel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.facebook_pixel_enabled}
                  onCheckedChange={(checked) => updateSettings('facebook_pixel_enabled', checked)}
                />
                <Label>Habilitar Facebook Pixel</Label>
              </div>

              {settings.facebook_pixel_enabled && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="facebook_pixel_id">Pixel ID</Label>
                    <Input
                      id="facebook_pixel_id"
                      value={settings.facebook_pixel_id}
                      onChange={(e) => updateSettings('facebook_pixel_id', e.target.value)}
                      placeholder="123456789012345"
                    />
                  </div>

                  <div>
                    <Label htmlFor="facebook_conversion_api_token">Conversion API Token (Opcional)</Label>
                    <Input
                      id="facebook_conversion_api_token"
                      value={settings.facebook_conversion_api_token}
                      onChange={(e) => updateSettings('facebook_conversion_api_token', e.target.value)}
                      placeholder="Access Token para Conversion API"
                      type="password"
                    />
                  </div>

                  <div>
                    <Label htmlFor="facebook_custom_code">Código Personalizado (Opcional)</Label>
                    <Textarea
                      id="facebook_custom_code"
                      value={settings.facebook_custom_code}
                      onChange={(e) => updateSettings('facebook_custom_code', e.target.value)}
                      placeholder="Código JavaScript personalizado para Facebook"
                      rows={4}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Google Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Google Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.google_analytics_enabled}
                  onCheckedChange={(checked) => updateSettings('google_analytics_enabled', checked)}
                />
                <Label>Habilitar Google Analytics</Label>
              </div>

              {settings.google_analytics_enabled && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="google_analytics_id">Measurement ID</Label>
                    <Input
                      id="google_analytics_id"
                      value={settings.google_analytics_id}
                      onChange={(e) => updateSettings('google_analytics_id', e.target.value)}
                      placeholder="G-XXXXXXXXXX"
                    />
                  </div>

                  <div>
                    <Label htmlFor="google_analytics_custom_code">Código Personalizado (Opcional)</Label>
                    <Textarea
                      id="google_analytics_custom_code"
                      value={settings.google_analytics_custom_code}
                      onChange={(e) => updateSettings('google_analytics_custom_code', e.target.value)}
                      placeholder="Código JavaScript personalizado para Google Analytics"
                      rows={4}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Google Tag Manager */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Google Tag Manager
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.google_tag_manager_enabled}
                  onCheckedChange={(checked) => updateSettings('google_tag_manager_enabled', checked)}
                />
                <Label>Habilitar Google Tag Manager</Label>
              </div>

              {settings.google_tag_manager_enabled && (
                <div>
                  <Label htmlFor="google_tag_manager_id">Container ID</Label>
                  <Input
                    id="google_tag_manager_id"
                    value={settings.google_tag_manager_id}
                    onChange={(e) => updateSettings('google_tag_manager_id', e.target.value)}
                    placeholder="GTM-XXXXXXX"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Scripts Personalizados */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Scripts Personalizados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="custom_head_scripts">Scripts do Head</Label>
                <Textarea
                  id="custom_head_scripts"
                  value={settings.custom_head_scripts}
                  onChange={(e) => updateSettings('custom_head_scripts', e.target.value)}
                  placeholder="Scripts que serão inseridos no <head>"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="custom_body_scripts">Scripts do Body</Label>
                <Textarea
                  id="custom_body_scripts"
                  value={settings.custom_body_scripts}
                  onChange={(e) => updateSettings('custom_body_scripts', e.target.value)}
                  placeholder="Scripts que serão inseridos no final do <body>"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversions">
          <ConversionsTab />
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Analytics Avançado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Analytics Avançado</h3>
                <p className="text-muted-foreground">
                  Relatórios detalhados de tráfego e comportamento dos usuários em breve
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Gestão de Campanhas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <TrendingUp className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Gestão de Campanhas</h3>
                <p className="text-muted-foreground">
                  Crie e gerencie campanhas de marketing integradas em breve
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
