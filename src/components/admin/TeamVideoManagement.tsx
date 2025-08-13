import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Video, Upload, Save, Trash2 } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { supabase } from '../../integrations/supabase/client';
import { toast } from 'sonner';
import { GalleryButton } from './GalleryButton';

interface TeamVideoSettings {
  team_video_enabled: boolean;
  team_background_video: string | null;
}

export const TeamVideoManagement: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [settings, setSettings] = useState<TeamVideoSettings>({
    team_video_enabled: false,
    team_background_video: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  // Carregar configurações atuais
  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('team_video_enabled, team_background_video')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Erro ao carregar configurações de vídeo:', error);
        toast.error('Erro ao carregar configurações');
        return;
      }

      if (data) {
        setSettings({
          team_video_enabled: data.team_video_enabled || false,
          team_background_video: data.team_background_video || null
        });
        setVideoUrl(data.team_background_video || '');
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
      toast.error('Erro ao carregar configurações');
    } finally {
      setIsLoading(false);
    }
  };

  // Salvar configurações
  const saveSettings = async (urlOverride?: string) => {
    setIsSaving(true);
    try {
      // Verificar se existe um registro
      const { data: existingData, error: selectError } = await supabase
        .from('site_settings')
        .select('id')
        .limit(1)
        .maybeSingle();

      if (selectError && selectError.code !== 'PGRST116') {
        console.error('Erro ao verificar registro existente:', selectError);
        throw selectError;
      }

      const newUrl = urlOverride ?? videoUrl ?? null;
      const updateData = {
        team_video_enabled: settings.team_video_enabled,
        team_background_video: newUrl,
        updated_at: new Date().toISOString()
      } as const;

      if (existingData) {
        // Atualizar registro existente
        const { error: updateError } = await supabase
          .from('site_settings')
          .update(updateData)
          .eq('id', existingData.id);

        if (updateError) {
          console.error('Erro ao atualizar configurações:', updateError);
          throw updateError;
        }
      } else {
        // Criar novo registro
        const { error: insertError } = await supabase
          .from('site_settings')
          .insert(updateData);

        if (insertError) {
          console.error('Erro ao criar configurações:', insertError);
          throw insertError;
        }
      }

      setSettings(prev => ({
        ...prev,
        team_background_video: newUrl
      }));

      toast.success('Configurações de vídeo salvas com sucesso!');
      
      // Disparar evento para atualizar a seção Hero
      window.dispatchEvent(new CustomEvent('heroVideoSettingsUpdated', {
        detail: {
          team_video_enabled: settings.team_video_enabled,
          team_background_video: newUrl
        }
      }));
      
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      toast.error('Erro ao salvar configurações de vídeo');
    } finally {
      setIsSaving(false);
    }
  };

  // Upload de vídeo para Supabase Storage
  const handleVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith('video/')) {
      toast.error('Por favor, selecione um arquivo de vídeo válido');
      return;
    }

    // Validar tamanho (máximo 50MB)
    if (file.size > 50 * 1024 * 1024) {
      toast.error('O arquivo deve ter no máximo 50MB');
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `team-background-${Date.now()}.${fileExt}`;
      const filePath = `videos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('videos')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Erro no upload:', uploadError);
        toast.error('Erro ao fazer upload do vídeo');
        return;
      }

      // Obter URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(filePath);

      setVideoUrl(publicUrl);
      toast.success('Vídeo enviado com sucesso!');
      await saveSettings(publicUrl);
      
    } catch (error) {
      console.error('Erro no upload:', error);
      toast.error('Erro ao fazer upload do vídeo');
    } finally {
      setUploading(false);
    }
  };

  // Remover vídeo
  const removeVideo = async () => {
    if (!settings.team_background_video) return;

    try {
      // Extrair o caminho do arquivo da URL
      const url = new URL(settings.team_background_video);
      const pathSegments = url.pathname.split('/');
      const bucketIndex = pathSegments.findIndex(segment => segment === 'videos');
      
      if (bucketIndex !== -1 && bucketIndex < pathSegments.length - 1) {
        const filePath = pathSegments.slice(bucketIndex + 1).join('/');
        
        const { error } = await supabase.storage
          .from('videos')
          .remove([filePath]);

        if (error) {
          console.error('Erro ao remover arquivo:', error);
        }
      }

      setVideoUrl('');
      toast.success('Vídeo removido com sucesso!');
      
    } catch (error) {
      console.error('Erro ao remover vídeo:', error);
      toast.error('Erro ao remover vídeo');
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${
          isDark ? 'border-white' : 'border-black'
        }`}></div>
      </div>
    );
  }

  return (
    <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <CardTitle className={`${isDark ? 'text-white' : 'text-black'} flex items-center gap-2`}>
          <Video className="w-5 h-5" />
          Vídeo de Fundo - Hero
        </CardTitle>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Configure um vídeo de fundo para a seção Hero. O vídeo será reproduzido em loop sem som.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Toggle para habilitar/desabilitar */}
        <div className="flex items-center justify-between">
          <div>
            <Label className={`text-base ${isDark ? 'text-white' : 'text-black'}`}>
              Habilitar Vídeo de Fundo no Hero
            </Label>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Ativar reprodução do vídeo de fundo na seção Hero da página principal
            </p>
          </div>
          <Switch
            checked={settings.team_video_enabled}
            onCheckedChange={(checked) => 
              setSettings(prev => ({ ...prev, team_video_enabled: checked }))
            }
          />
        </div>

{/* Upload/Seleção via Galeria */}
<div className="space-y-4">
  <Label className={`text-base ${isDark ? 'text-white' : 'text-black'}`}>
    Selecionar vídeo da Galeria
  </Label>

  {/* Preview do vídeo atual */}
  {videoUrl && (
    <div className="relative">
      <video
        src={videoUrl}
        className="w-full h-48 object-cover rounded-lg"
        muted
        loop
        controls
      />
      <Button
        onClick={removeVideo}
        variant="destructive"
        size="sm"
        className="absolute top-2 right-2"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )}

  <div className="space-y-2">
    <div className="flex items-center gap-2 flex-wrap">
      <GalleryButton
        onSelect={(url) => {
          setVideoUrl(url);
          toast.success('Vídeo selecionado da galeria');
          saveSettings(url);
        }}
        size="sm"
        variant="outline"
        acceptedTypes={['video']}
      />
    </div>
    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
      Formatos suportados: MP4, WebM. Tamanho recomendado: até 50MB.
    </p>
  </div>

  {uploading && (
    <div className="flex items-center gap-2">
      <div className={`animate-spin rounded-full h-4 w-4 border-b-2 ${
        isDark ? 'border-white' : 'border-black'
      }`}></div>
      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        Enviando vídeo...
      </span>
    </div>
  )}
</div>

        {/* Dicas de uso */}
        <div className={`p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-blue-50'} border ${isDark ? 'border-white/10' : 'border-blue-200'}`}>
          <h4 className={`font-semibold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-800'}`}>
            Dicas para melhor resultado:
          </h4>
          <ul className={`text-sm space-y-1 ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
            <li>• Use vídeos em formato landscape (16:9) para melhor visualização</li>
            <li>• Prefira vídeos com pouco movimento para não distrair do conteúdo</li>
            <li>• O vídeo será reproduzido sem som automaticamente</li>
            <li>• Recomendamos duração entre 10-30 segundos para loop suave</li>
            <li>• Teste em diferentes dispositivos para garantir boa performance</li>
          </ul>
        </div>

        {/* Botão salvar */}
        <div className="flex justify-end">
          <Button
            onClick={() => saveSettings()}
            disabled={isSaving}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Salvar Configurações
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};