
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CampaignReports } from './CampaignReports';
import { ConversionsManagement } from './ConversionsManagement';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Settings, BarChart3, Users, Target } from 'lucide-react';

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
  form_tracking_config: any;
  event_tracking_config: any;
}

const defaultSettings: MarketingSettings = {
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
  custom_body_scripts: '',
  form_tracking_config: {},
  event_tracking_config: {}
};

export const MarketingManagement = () => {
  const [settings, setSettings] = useState<MarketingSettings>(defaultSettings);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const loadSettings = async () => {
    if (hasLoaded) return;
    
    try {
      setLoading(true);
      console.log('🔄 Carregando configurações de marketing...');
      
      const { data, error } = await supabase
        .from('marketing_settings')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('❌ Erro ao carregar configurações:', error);
        throw error;
      }

      if (data) {
        console.log('✅ Configurações carregadas:', data);
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
          custom_body_scripts: data.custom_body_scripts || '',
          form_tracking_config: data.form_tracking_config || {},
          event_tracking_config: data.event_tracking_config || {}
        });
      } else {
        console.log('ℹ️ Nenhuma configuração encontrada, usando valores padrão');
        setSettings(defaultSettings);
      }
      setHasLoaded(true);
    } catch (error) {
      console.error('❌ Erro ao carregar configurações:', error);
      toast.error('Erro ao carregar configurações de marketing');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadSettings();
  }, []);

  const saveSettings = async () => {
    try {
      setLoading(true);
      console.log('💾 Salvando configurações:', settings);

      // Primeiro, verificar se já existe uma configuração
      const { data: existing } = await supabase
        .from('marketing_settings')
        .select('id')
        .limit(1)
        .maybeSingle();

      let result;
      
      if (existing) {
        // Atualizar configuração existente
        result = await supabase
          .from('marketing_settings')
          .update(settings)
          .eq('id', existing.id)
          .select()
          .single();
      } else {
        // Criar nova configuração
        result = await supabase
          .from('marketing_settings')
          .insert([settings])
          .select()
          .single();
      }

      if (result.error) {
        console.error('❌ Erro ao salvar:', result.error);
        throw result.error;
      }

      console.log('✅ Configurações salvas com sucesso:', result.data);
      toast.success('Configurações de marketing salvas com sucesso!');
      
      // Recarregar configurações para refletir o estado atual
      setHasLoaded(false);
      await loadSettings();
      
    } catch (error) {
      console.error('❌ Erro ao salvar configurações:', error);
      toast.error('Erro ao salvar configurações de marketing');
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = (key: keyof MarketingSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="scripts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-900 border border-gray-800">
          <TabsTrigger value="scripts" className="flex items-center gap-2 text-white data-[state=active]:bg-gray-800">
            <Settings className="w-4 h-4" />
            Scripts
          </TabsTrigger>
          <TabsTrigger value="conversions" className="flex items-center gap-2 text-white data-[state=active]:bg-gray-800">
            <Users className="w-4 h-4" />
            Conversões
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="flex items-center gap-2 text-white data-[state=active]:bg-gray-800">
            <Target className="w-4 h-4" />
            Campanhas
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2 text-white data-[state=active]:bg-gray-800">
            <BarChart3 className="w-4 h-4" />
            Relatórios
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scripts">
          <div className="space-y-6">
            {/* Facebook Pixel */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Facebook Pixel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="facebook-enabled" className="text-white">Habilitar Facebook Pixel</Label>
                  <Switch
                    id="facebook-enabled"
                    checked={settings.facebook_pixel_enabled}
                    onCheckedChange={(checked) => updateSetting('facebook_pixel_enabled', checked)}
                  />
                </div>
                
                {settings.facebook_pixel_enabled && (
                  <>
                    <div>
                      <Label htmlFor="facebook-pixel-id" className="text-white">Pixel ID</Label>
                      <Input
                        id="facebook-pixel-id"
                        value={settings.facebook_pixel_id}
                        onChange={(e) => updateSetting('facebook_pixel_id', e.target.value)}
                        placeholder="Digite o ID do Facebook Pixel"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="facebook-api-token" className="text-white">Conversion API Token</Label>
                      <Input
                        id="facebook-api-token"
                        value={settings.facebook_conversion_api_token}
                        onChange={(e) => updateSetting('facebook_conversion_api_token', e.target.value)}
                        placeholder="Digite o token da Conversion API"
                        className="bg-gray-800 border-gray-700 text-white"
                        type="password"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="facebook-custom" className="text-white">Código Personalizado</Label>
                      <Textarea
                        id="facebook-custom"
                        value={settings.facebook_custom_code}
                        onChange={(e) => updateSetting('facebook_custom_code', e.target.value)}
                        placeholder="Código JavaScript personalizado para Facebook"
                        className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Google Analytics */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Google Analytics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="ga-enabled" className="text-white">Habilitar Google Analytics</Label>
                  <Switch
                    id="ga-enabled"
                    checked={settings.google_analytics_enabled}
                    onCheckedChange={(checked) => updateSetting('google_analytics_enabled', checked)}
                  />
                </div>
                
                {settings.google_analytics_enabled && (
                  <>
                    <div>
                      <Label htmlFor="ga-id" className="text-white">Measurement ID</Label>
                      <Input
                        id="ga-id"
                        value={settings.google_analytics_id}
                        onChange={(e) => updateSetting('google_analytics_id', e.target.value)}
                        placeholder="G-XXXXXXXXXX"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="ga-custom" className="text-white">Código Personalizado</Label>
                      <Textarea
                        id="ga-custom"
                        value={settings.google_analytics_custom_code}
                        onChange={(e) => updateSetting('google_analytics_custom_code', e.target.value)}
                        placeholder="Código JavaScript personalizado para Google Analytics"
                        className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Google Tag Manager */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Google Tag Manager</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="gtm-enabled" className="text-white">Habilitar Google Tag Manager</Label>
                  <Switch
                    id="gtm-enabled"
                    checked={settings.google_tag_manager_enabled}
                    onCheckedChange={(checked) => updateSetting('google_tag_manager_enabled', checked)}
                  />
                </div>
                
                {settings.google_tag_manager_enabled && (
                  <div>
                    <Label htmlFor="gtm-id" className="text-white">Container ID</Label>
                    <Input
                      id="gtm-id"
                      value={settings.google_tag_manager_id}
                      onChange={(e) => updateSetting('google_tag_manager_id', e.target.value)}
                      placeholder="GTM-XXXXXXX"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Scripts Personalizados */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Scripts Personalizados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="head-scripts" className="text-white">Scripts no &lt;head&gt;</Label>
                  <Textarea
                    id="head-scripts"
                    value={settings.custom_head_scripts}
                    onChange={(e) => updateSetting('custom_head_scripts', e.target.value)}
                    placeholder="Scripts a serem inseridos no <head> da página"
                    className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                  />
                </div>
                
                <div>
                  <Label htmlFor="body-scripts" className="text-white">Scripts no &lt;body&gt;</Label>
                  <Textarea
                    id="body-scripts"
                    value={settings.custom_body_scripts}
                    onChange={(e) => updateSetting('custom_body_scripts', e.target.value)}
                    placeholder="Scripts a serem inseridos no final do <body>"
                    className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button 
                onClick={saveSettings} 
                disabled={loading}
                className="bg-white text-black hover:bg-gray-200"
              >
                {loading ? 'Salvando...' : 'Salvar Configurações'}
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="conversions">
          <ConversionsManagement />
        </TabsContent>

        <TabsContent value="campaigns">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Gerenciamento de Campanhas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">Funcionalidade em desenvolvimento...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <CampaignReports />
        </TabsContent>
      </Tabs>
    </div>
  );
};
