import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const SimplePixelManager: React.FC = () => {
  const [formPixel, setFormPixel] = useState({
    enabled: false,
    pixelId: '',
    eventType: 'CompleteRegistration'
  });

  const [stepFormPixel, setStepFormPixel] = useState({
    enabled: false,
    pixelId: '',
    eventType: 'Contact'
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadConfiguration();
  }, []);

  const loadConfiguration = async () => {
    try {
      // Carregar configuração de formulários
      const { data: settings } = await supabase
        .from('marketing_settings')
        .select('form_tracking_config')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (settings?.form_tracking_config) {
        const config = typeof settings.form_tracking_config === 'string' 
          ? JSON.parse(settings.form_tracking_config) 
          : settings.form_tracking_config;
        
        const defaultForm = config.systemForms?.find((f: any) => f.formId === 'default');
        if (defaultForm?.facebookPixel) {
          setFormPixel({
            enabled: defaultForm.facebookPixel.enabled || false,
            pixelId: defaultForm.facebookPixel.pixelId || '',
            eventType: defaultForm.facebookPixel.eventType || 'CompleteRegistration'
          });
        }
      }

      // Carregar configuração de StepForm
      const { data: stepForm } = await supabase
        .from('step_forms')
        .select('tracking_config')
        .eq('slug', 'juridico-completo')
        .maybeSingle();

      if (stepForm?.tracking_config) {
        const config = stepForm.tracking_config as any;
        const pixelId = config?.pixel_id || config?.facebook_pixel?.pixel_id || '';
        setStepFormPixel({
          enabled: !!pixelId,
          pixelId: pixelId,
          eventType: config?.facebook_pixel?.event_type || config?.event_type || 'Contact'
        });
      }
    } catch (error) {
      console.error('Erro ao carregar configuração:', error);
    }
  };

  const saveFormPixelConfig = async () => {
    setIsLoading(true);
    try {
      const config = {
        systemForms: [
          {
            formId: 'default',
            formName: 'Formulário Principal',
            enabled: formPixel.enabled,
            facebookPixel: {
              enabled: formPixel.enabled,
              pixelId: formPixel.pixelId,
              eventType: formPixel.eventType
            }
          }
        ]
      };

      const { error } = await supabase
        .from('marketing_settings')
        .upsert({
          form_tracking_config: config
        });

      if (error) throw error;
      toast.success('Configuração de formulários salva!');
    } catch (error) {
      console.error('Erro ao salvar:', error);
      toast.error('Erro ao salvar configuração');
    } finally {
      setIsLoading(false);
    }
  };

  const saveStepFormPixelConfig = async () => {
    setIsLoading(true);
    try {
      const config = {
        pixel_id: stepFormPixel.pixelId,
        facebook_pixel: {
          enabled: stepFormPixel.enabled,
          pixel_id: stepFormPixel.pixelId,
          event_type: stepFormPixel.eventType
        }
      };

      const { error } = await supabase
        .from('step_forms')
        .update({ tracking_config: config })
        .eq('slug', 'juridico-completo');

      if (error) throw error;
      toast.success('Configuração de StepForm salva!');
    } catch (error) {
      console.error('Erro ao salvar:', error);
      toast.error('Erro ao salvar configuração');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>📋 Pixel para Formulários do Site</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="form-pixel-enabled"
              checked={formPixel.enabled}
              onCheckedChange={(checked) => setFormPixel(prev => ({ ...prev, enabled: checked }))}
            />
            <Label htmlFor="form-pixel-enabled">Ativar Facebook Pixel</Label>
          </div>
          
          {formPixel.enabled && (
            <>
              <div>
                <Label htmlFor="form-pixel-id">Pixel ID</Label>
                <Input
                  id="form-pixel-id"
                  value={formPixel.pixelId}
                  onChange={(e) => setFormPixel(prev => ({ ...prev, pixelId: e.target.value }))}
                  placeholder="1024100955860841"
                />
              </div>
              
              <div>
                <Label htmlFor="form-event-type">Tipo de Evento</Label>
                <Input
                  id="form-event-type"
                  value={formPixel.eventType}
                  onChange={(e) => setFormPixel(prev => ({ ...prev, eventType: e.target.value }))}
                  placeholder="CompleteRegistration"
                />
              </div>
            </>
          )}
          
          <Button onClick={saveFormPixelConfig} disabled={isLoading}>
            {isLoading ? 'Salvando...' : 'Salvar Configuração'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>📝 Pixel para StepForm</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="stepform-pixel-enabled"
              checked={stepFormPixel.enabled}
              onCheckedChange={(checked) => setStepFormPixel(prev => ({ ...prev, enabled: checked }))}
            />
            <Label htmlFor="stepform-pixel-enabled">Ativar Facebook Pixel</Label>
          </div>
          
          {stepFormPixel.enabled && (
            <>
              <div>
                <Label htmlFor="stepform-pixel-id">Pixel ID</Label>
                <Input
                  id="stepform-pixel-id"
                  value={stepFormPixel.pixelId}
                  onChange={(e) => setStepFormPixel(prev => ({ ...prev, pixelId: e.target.value }))}
                  placeholder="1024100955860841"
                />
              </div>
              
              <div>
                <Label htmlFor="stepform-event-type">Tipo de Evento</Label>
                <Input
                  id="stepform-event-type"
                  value={stepFormPixel.eventType}
                  onChange={(e) => setStepFormPixel(prev => ({ ...prev, eventType: e.target.value }))}
                  placeholder="Contact"
                />
              </div>
            </>
          )}
          
          <Button onClick={saveStepFormPixelConfig} disabled={isLoading}>
            {isLoading ? 'Salvando...' : 'Salvar Configuração'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ℹ️ Como funciona</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>• <strong>Formulários do Site:</strong> Rastreia envios dos formulários de contato nas páginas</p>
            <p>• <strong>StepForm:</strong> Rastreia envios do formulário em etapas (/form/juridico-completo)</p>
            <p>• <strong>Eventos:</strong> CompleteRegistration para forms, Contact para stepforms</p>
            <p>• <strong>Pixel ID:</strong> Use o mesmo ID (1024100955860841) para ambos se necessário</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};