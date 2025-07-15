import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Checkbox } from '../../ui/checkbox';
import { Button } from '../../ui/button';
import { Save, RotateCw } from 'lucide-react';
import { useTheme } from '../../ThemeProvider';
import { supabase } from '../../../integrations/supabase/client';
import { toast } from 'sonner';

interface MarketingScripts {
  facebookPixel: {
    enabled: boolean;
    pixelId: string;
    accessToken: string;
    conversionApiEnabled: boolean;
  };
  googleAnalytics: {
    enabled: boolean;
    trackingId: string;
    gtag: string;
  };
  googleTagManager: {
    enabled: boolean;
    containerId: string;
  };
  customScripts: {
    headerScripts: string;
    bodyScripts: string;
    footerScripts: string;
  };
}

export const MarketingManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('scripts');
  const [isLoading, setIsLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [marketingScripts, setMarketingScripts] = useState({
    facebookPixel: {
      enabled: false,
      pixelId: '',
      accessToken: '',
      conversionApiEnabled: false
    },
    googleAnalytics: {
      enabled: false,
      trackingId: '',
      gtag: ''
    },
    googleTagManager: {
      enabled: false,
      containerId: ''
    },
    customScripts: {
      headerScripts: '',
      bodyScripts: '',
      footerScripts: ''
    }
  });

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    loadMarketingConfig();
  }, []);

  const loadMarketingConfig = async () => {
    console.log('🔄 Carregando configuração de marketing...');
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('*')
        .eq('id', 'marketing-config')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('❌ Erro ao carregar configuração:', error);
        return;
      }

      if (data && data.form_config) {
        console.log('✅ Configuração carregada:', data.form_config);
        setMarketingScripts(data.form_config);
      } else {
        console.log('ℹ️ Nenhuma configuração encontrada, usando padrões');
      }
    } catch (error) {
      console.error('❌ Erro crítico ao carregar configuração:', error);
    }
  };

  const saveMarketingConfig = async () => {
    console.log('💾 Salvando configuração de marketing...');
    console.log('📦 Dados a serem salvos:', marketingScripts);
    
    setIsLoading(true);
    
    try {
      // Primeiro, tentar atualizar se já existe
      const { data: existingData } = await supabase
        .from('admin_settings')
        .select('id')
        .eq('id', 'marketing-config')
        .single();

      let result;
      
      if (existingData) {
        // Atualizar registro existente
        console.log('🔄 Atualizando configuração existente...');
        result = await supabase
          .from('admin_settings')
          .update({
            form_config: marketingScripts,
            updated_at: new Date().toISOString()
          })
          .eq('id', 'marketing-config')
          .select();
      } else {
        // Criar novo registro
        console.log('➕ Criando nova configuração...');
        result = await supabase
          .from('admin_settings')
          .insert([{
            id: 'marketing-config',
            form_config: marketingScripts,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }])
          .select();
      }

      if (result.error) {
        console.error('❌ Erro ao salvar no banco:', result.error);
        throw result.error;
      }

      console.log('✅ Configuração salva com sucesso:', result.data);
      setLastSaved(new Date());
      toast.success('🎉 Configuração de marketing salva com sucesso!');
      
      // Disparar evento para recarregar scripts
      window.dispatchEvent(new CustomEvent('marketingConfigUpdated', {
        detail: marketingScripts
      }));
      
    } catch (error) {
      console.error('❌ Erro ao salvar configuração:', error);
      toast.error('❌ Erro ao salvar configuração de marketing');
    } finally {
      setIsLoading(false);
    }
  };

  const forceReloadFromDatabase = async () => {
    console.log('🔄 Forçando recarga do banco de dados...');
    await loadMarketingConfig();
    toast.success('✅ Dados sincronizados com o banco de dados');
  };

  const updateFacebookPixel = (field: string, value: string | boolean) => {
    console.log('🔧 Atualizando Facebook Pixel:', field, value);
    setMarketingScripts(prev => ({
      ...prev,
      facebookPixel: {
        ...prev.facebookPixel,
        [field]: value
      }
    }));
  };

  const updateGoogleAnalytics = (field: string, value: string | boolean) => {
    console.log('🔧 Atualizando Google Analytics:', field, value);
    setMarketingScripts(prev => ({
      ...prev,
      googleAnalytics: {
        ...prev.googleAnalytics,
        [field]: value
      }
    }));
  };

  const updateGoogleTagManager = (field: string, value: string | boolean) => {
    console.log('🔧 Atualizando Google Tag Manager:', field, value);
    setMarketingScripts(prev => ({
      ...prev,
      googleTagManager: {
        ...prev.googleTagManager,
        [field]: value
      }
    }));
  };

  const updateCustomScripts = (field: string, value: string) => {
    console.log('🔧 Atualizando Scripts Customizados:', field, value.length, 'caracteres');
    setMarketingScripts(prev => ({
      ...prev,
      customScripts: {
        ...prev.customScripts,
        [field]: value
      }
    }));
  };

  return (
    <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
            Marketing & Analytics
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={forceReloadFromDatabase}
              disabled={isLoading}
            >
              <RotateCw className="w-4 h-4 mr-2" />
              Sincronizar
            </Button>
            <Button onClick={saveMarketingConfig} disabled={isLoading} size="sm">
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </div>
        {lastSaved && (
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Última atualização: {lastSaved.toLocaleTimeString()}
          </p>
        )}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="scripts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="scripts" onClick={() => setActiveTab('scripts')}>Scripts</TabsTrigger>
            <TabsTrigger value="facebook" onClick={() => setActiveTab('facebook')}>Facebook Pixel</TabsTrigger>
            <TabsTrigger value="google" onClick={() => setActiveTab('google')}>Google Analytics</TabsTrigger>
            <TabsTrigger value="gtm" onClick={() => setActiveTab('gtm')}>Google Tag Manager</TabsTrigger>
          </TabsList>
          
          <TabsContent value="scripts">
            <div className="space-y-4">
              <div>
                <Label htmlFor="headerScripts">Scripts de Cabeçalho</Label>
                <Textarea
                  id="headerScripts"
                  value={marketingScripts.customScripts.headerScripts}
                  onChange={(e) => updateCustomScripts('headerScripts', e.target.value)}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  placeholder="Cole aqui seus scripts que devem ser inseridos no &lt;head&gt;."
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="bodyScripts">Scripts de Corpo (Início)</Label>
                <Textarea
                  id="bodyScripts"
                  value={marketingScripts.customScripts.bodyScripts}
                  onChange={(e) => updateCustomScripts('bodyScripts', e.target.value)}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  placeholder="Cole aqui seus scripts que devem ser inseridos logo após a abertura da tag &lt;body&gt;."
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="footerScripts">Scripts de Rodapé</Label>
                <Textarea
                  id="footerScripts"
                  value={marketingScripts.customScripts.footerScripts}
                  onChange={(e) => updateCustomScripts('footerScripts', e.target.value)}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  placeholder="Cole aqui seus scripts que devem ser inseridos antes do fechamento da tag &lt;body&gt;."
                  rows={4}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="facebook">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="facebookPixelEnabled"
                  checked={marketingScripts.facebookPixel.enabled}
                  onCheckedChange={(checked) => updateFacebookPixel('enabled', checked!)}
                  className={isDark ? 'border-neutral-500 data-[state=checked]:bg-white data-[state=checked]:text-black' : 'border-gray-400'}
                />
                <Label htmlFor="facebookPixelEnabled">Ativar Facebook Pixel</Label>
              </div>
              <div>
                <Label htmlFor="facebookPixelId">Pixel ID</Label>
                <Input
                  type="text"
                  id="facebookPixelId"
                  value={marketingScripts.facebookPixel.pixelId}
                  onChange={(e) => updateFacebookPixel('pixelId', e.target.value)}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  placeholder="Insira o ID do seu Pixel do Facebook"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="conversionApiEnabled"
                  checked={marketingScripts.facebookPixel.conversionApiEnabled}
                  onCheckedChange={(checked) => updateFacebookPixel('conversionApiEnabled', checked!)}
                  className={isDark ? 'border-neutral-500 data-[state=checked]:bg-white data-[state=checked]:text-black' : 'border-gray-400'}
                />
                <Label htmlFor="conversionApiEnabled">Ativar Conversion API</Label>
              </div>
              <div>
                <Label htmlFor="facebookAccessToken">Access Token</Label>
                <Input
                  type="text"
                  id="facebookAccessToken"
                  value={marketingScripts.facebookPixel.accessToken}
                  onChange={(e) => updateFacebookPixel('accessToken', e.target.value)}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  placeholder="Insira seu Access Token do Facebook"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="google">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="googleAnalyticsEnabled"
                  checked={marketingScripts.googleAnalytics.enabled}
                  onCheckedChange={(checked) => updateGoogleAnalytics('enabled', checked!)}
                  className={isDark ? 'border-neutral-500 data-[state=checked]:bg-white data-[state=checked]:text-black' : 'border-gray-400'}
                />
                <Label htmlFor="googleAnalyticsEnabled">Ativar Google Analytics</Label>
              </div>
              <div>
                <Label htmlFor="googleTrackingId">Tracking ID</Label>
                <Input
                  type="text"
                  id="googleTrackingId"
                  value={marketingScripts.googleAnalytics.trackingId}
                  onChange={(e) => updateGoogleAnalytics('trackingId', e.target.value)}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  placeholder="Insira o ID de rastreamento do Google Analytics (UA-XXXXX-Y)"
                />
              </div>
              <div>
                <Label htmlFor="googleGtag">Gtag (GA4)</Label>
                <Input
                  type="text"
                  id="googleGtag"
                  value={marketingScripts.googleAnalytics.gtag}
                  onChange={(e) => updateGoogleAnalytics('gtag', e.target.value)}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  placeholder="Insira o Gtag do Google Analytics (G-XXXXXXX)"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gtm">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="googleTagManagerEnabled"
                  checked={marketingScripts.googleTagManager.enabled}
                  onCheckedChange={(checked) => updateGoogleTagManager('enabled', checked!)}
                  className={isDark ? 'border-neutral-500 data-[state=checked]:bg-white data-[state=checked]:text-black' : 'border-gray-400'}
                />
                <Label htmlFor="googleTagManagerEnabled">Ativar Google Tag Manager</Label>
              </div>
              <div>
                <Label htmlFor="googleTagManagerContainerId">Container ID</Label>
                <Input
                  type="text"
                  id="googleTagManagerContainerId"
                  value={marketingScripts.googleTagManager.containerId}
                  onChange={(e) => updateGoogleTagManager('containerId', e.target.value)}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  placeholder="Insira o ID do seu Container do Google Tag Manager (GTM-XXXXXXX)"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MarketingManagement;
