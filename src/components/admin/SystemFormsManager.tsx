import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { RefreshCw, Copy, Eye, EyeOff, Settings, Save } from 'lucide-react';
import { useFormConfig } from '@/hooks/useFormConfig';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SystemFormConfig {
  formId: string;
  formName: string;
  enabled: boolean;
  submitButtonId: string;
  campaignName: string;
  facebookPixel?: {
    enabled: boolean;
    pixelId: string;
    eventType: string;
    customEventName?: string;
  };
  googleAnalytics?: {
    enabled: boolean;
    measurementId: string;
    eventName: string;
  };
  customHeadScripts?: string;
  customBodyScripts?: string;
}

interface SystemFormsTracking {
  systemForms: SystemFormConfig[];
}

export const SystemFormsManager: React.FC = () => {
  const { toast } = useToast();
  const { multipleFormsConfig, refreshConfig } = useFormConfig();
  const [tracking, setTracking] = useState<SystemFormsTracking>({ systemForms: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [expandedForms, setExpandedForms] = useState<Set<string>>(new Set());
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Carregar configurações existentes
  useEffect(() => {
    loadTrackingConfig();
  }, []);

  // Sincronizar com formulários disponíveis quando eles mudarem (só na primeira vez)
  useEffect(() => {
    if (multipleFormsConfig?.forms && tracking.systemForms.length === 0) {
      syncWithAvailableForms();
    }
  }, [multipleFormsConfig, tracking.systemForms.length]);

  const loadTrackingConfig = async () => {
    try {
      const { data: settings, error } = await supabase
        .from('marketing_settings')
        .select('form_tracking_config')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('❌ Erro ao carregar configuração:', error);
        return;
      }

      if (settings?.form_tracking_config) {
        let trackingConfig;
        if (typeof settings.form_tracking_config === 'string') {
          trackingConfig = JSON.parse(settings.form_tracking_config);
        } else {
          trackingConfig = settings.form_tracking_config;
        }
        
        setTracking({
          systemForms: trackingConfig.systemForms || []
        });
      }
    } catch (error) {
      console.error('❌ Erro ao processar configuração:', error);
    }
  };

  const syncWithAvailableForms = () => {
    if (!multipleFormsConfig?.forms) return;

    const existingConfigs = tracking.systemForms.reduce((acc, config) => {
      acc[config.formId] = config;
      return acc;
    }, {} as Record<string, SystemFormConfig>);

    const synced: SystemFormConfig[] = multipleFormsConfig.forms.map(form => {
      const existing = existingConfigs[form.id || ''];
      return {
        formId: form.id || '',
        formName: form.name || 'Formulário sem nome',
        enabled: existing?.enabled || false,
        submitButtonId: existing?.submitButtonId || `submit-${form.id}`,
        campaignName: existing?.campaignName || form.name || 'Campanha sem nome',
        facebookPixel: existing?.facebookPixel || {
          enabled: false,
          pixelId: '',
          eventType: 'CompleteRegistration'
        },
        googleAnalytics: existing?.googleAnalytics || {
          enabled: false,
          measurementId: '',
          eventName: 'form_submit'
        },
        customHeadScripts: existing?.customHeadScripts || '',
        customBodyScripts: existing?.customBodyScripts || ''
      };
    });

    setTracking({ systemForms: synced });
  };

  const updateForm = (formId: string, updates: Partial<SystemFormConfig>) => {
    setTracking(prev => ({
      systemForms: prev.systemForms.map(form =>
        form.formId === formId ? { ...form, ...updates } : form
      )
    }));
  };

  const toggleFormExpansion = (formId: string) => {
    setExpandedForms(prev => {
      const newSet = new Set(prev);
      if (newSet.has(formId)) {
        newSet.delete(formId);
      } else {
        newSet.add(formId);
      }
      return newSet;
    });
  };

  const generatePixelCode = (form: SystemFormConfig): string => {
    if (!form.facebookPixel?.enabled || !form.facebookPixel?.pixelId) {
      return '';
    }

    const eventType = form.facebookPixel.eventType === 'Custom' 
      ? (form.facebookPixel.customEventName || 'CustomEvent')
      : form.facebookPixel.eventType;

    return `fbq('init', '${form.facebookPixel.pixelId}');\nfbq('track', '${eventType}');`;
  };

  const copyCodeToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({ title: '✅ Código copiado!', description: 'Código copiado para a área de transferência' });
  };

  const validateForm = (form: SystemFormConfig): string[] => {
    const errors: string[] = [];
    
    if (form.enabled) {
      if (!form.submitButtonId.trim()) {
        errors.push('ID do botão de submit é obrigatório');
      }
      
      if (form.facebookPixel?.enabled) {
        if (!form.facebookPixel.pixelId || form.facebookPixel.pixelId.length < 10) {
          errors.push('Pixel ID inválido (mínimo 10 dígitos)');
        }
        if (form.facebookPixel.eventType === 'Custom' && !form.facebookPixel.customEventName?.trim()) {
          errors.push('Nome do evento personalizado é obrigatório');
        }
      }
      
      if (form.googleAnalytics?.enabled) {
        if (!form.googleAnalytics.measurementId.startsWith('G-')) {
          errors.push('Measurement ID deve começar com "G-"');
        }
      }
    }
    
    return errors;
  };

  const saveConfiguration = async () => {
    setIsLoading(true);
    try {
      // Validar todos os formulários
      const allErrors: string[] = [];
      tracking.systemForms.forEach((form, index) => {
        const errors = validateForm(form);
        errors.forEach(error => allErrors.push(`${form.formName}: ${error}`));
      });

      if (allErrors.length > 0) {
        toast({ 
          title: '❌ Erro de validação', 
          description: allErrors.join(', '),
          variant: 'destructive'
        });
        return;
      }

      // Carregar configuração existente
      const { data: settings, error: loadError } = await supabase
        .from('marketing_settings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (loadError) {
        throw loadError;
      }

      // Preparar dados para salvar
      let existingConfig = {};
      if (settings?.form_tracking_config) {
        if (typeof settings.form_tracking_config === 'string') {
          existingConfig = JSON.parse(settings.form_tracking_config);
        } else {
          existingConfig = settings.form_tracking_config;
        }
      }

      const configData = {
        ...settings,
        form_tracking_config: JSON.stringify({
          ...existingConfig,
          systemForms: tracking.systemForms
        }),
        updated_at: new Date().toISOString()
      };

      // Salvar ou criar
      let result;
      if (settings?.id) {
        result = await supabase
          .from('marketing_settings')
          .update(configData)
          .eq('id', settings.id)
          .select();
      } else {
        result = await supabase
          .from('marketing_settings')
          .insert([configData])
          .select();
      }

      if (result.error) {
        throw result.error;
      }

      setLastSaved(new Date());
      toast({ title: '✅ Configuração salva!', description: 'Configurações dos formulários atualizadas' });

      // Disparar evento para recarregar scripts
      window.dispatchEvent(new CustomEvent('marketingSettingsUpdated'));

    } catch (error) {
      console.error('❌ Erro ao salvar:', error);
      toast({ 
        title: '❌ Erro ao salvar', 
        description: 'Não foi possível salvar as configurações',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const eventTypeOptions = [
    { value: 'Lead', label: 'Lead - Geração de leads' },
    { value: 'CompleteRegistration', label: 'Complete Registration - Cadastro completo' },
    { value: 'Contact', label: 'Contact - Contato' },
    { value: 'SubmitApplication', label: 'Submit Application - Envio de formulário' },
    { value: 'Purchase', label: 'Purchase - Compra/Conversão' },
    { value: 'ViewContent', label: 'View Content - Visualização de conteúdo' },
    { value: 'AddToCart', label: 'Add to Cart - Adicionar ao carrinho' },
    { value: 'InitiateCheckout', label: 'Initiate Checkout - Iniciar checkout' },
    { value: 'Custom', label: 'Evento Personalizado' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          📝 Formulários do Sistema
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                refreshConfig();
                loadTrackingConfig();
              }}
              disabled={isLoading}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Atualizar
            </Button>
            <Button 
              size="sm" 
              onClick={saveConfiguration}
              disabled={isLoading}
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar Tudo
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          Configure rastreamento personalizado para cada formulário do sistema. 
          {lastSaved && (
            <span className="text-green-600 ml-2">
              Último salvamento: {lastSaved.toLocaleTimeString()}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {tracking.systemForms.length === 0 ? (
          <div className="text-center p-8 text-muted-foreground">
            <p>Nenhum formulário encontrado.</p>
            <p className="text-sm">Clique em "Atualizar" para carregar os formulários disponíveis.</p>
          </div>
        ) : (
          tracking.systemForms.map((form) => {
            const isExpanded = expandedForms.has(form.formId);
            const errors = validateForm(form);
            const pixelCode = generatePixelCode(form);

            return (
              <div 
                key={form.formId} 
                className={`border rounded-lg p-4 space-y-3 transition-all ${
                  form.enabled ? 'border-primary bg-primary/5' : 'border-muted-foreground/20'
                } ${errors.length > 0 && form.enabled ? 'border-red-500 bg-red-50' : ''}`}
              >
                {/* Header do formulário */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant={form.enabled ? "default" : "outline"}>
                      {form.formId}
                    </Badge>
                    <span className="font-medium">{form.formName}</span>
                    {form.enabled && (
                      <Badge variant="secondary" className="text-xs">
                        ✓ Ativo
                      </Badge>
                    )}
                    {errors.length > 0 && form.enabled && (
                      <Badge variant="destructive" className="text-xs">
                        {errors.length} erro{errors.length > 1 ? 's' : ''}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFormExpansion(form.formId)}
                    >
                      {isExpanded ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.enabled}
                        onChange={(e) => updateForm(form.formId, { enabled: e.target.checked })}
                        className="rounded"
                      />
                      <span className="text-sm">Ativar</span>
                    </label>
                  </div>
                </div>

                {/* Configurações expandidas */}
                {isExpanded && (
                  <div className="space-y-6 pt-4 border-t">
                    {/* Configurações básicas */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>ID do Botão de Submit</Label>
                        <Input
                          value={form.submitButtonId}
                          onChange={(e) => updateForm(form.formId, { submitButtonId: e.target.value })}
                          placeholder="submit-button-id"
                        />
                      </div>
                      <div>
                        <Label>Nome da Campanha</Label>
                        <Input
                          value={form.campaignName}
                          onChange={(e) => updateForm(form.formId, { campaignName: e.target.value })}
                          placeholder="Nome da campanha"
                        />
                      </div>
                    </div>

                    {/* Facebook Pixel */}
                    <div className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={form.facebookPixel?.enabled || false}
                          onChange={(e) => updateForm(form.formId, {
                            facebookPixel: { ...form.facebookPixel!, enabled: e.target.checked }
                          })}
                        />
                        <Label className="font-medium">📘 Facebook Pixel</Label>
                      </div>

                      {form.facebookPixel?.enabled && (
                        <div className="space-y-4">
                          <div>
                            <Label>Pixel ID</Label>
                            <Input
                              value={form.facebookPixel.pixelId}
                              onChange={(e) => {
                                const pixelId = e.target.value.replace(/[^0-9]/g, '');
                                updateForm(form.formId, {
                                  facebookPixel: { ...form.facebookPixel!, pixelId }
                                });
                              }}
                              placeholder="1024100955860841"
                              className="font-mono"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Apenas números. Ex: 1024100955860841
                            </p>
                          </div>

                          <div>
                            <Label>Tipo de Evento</Label>
                            <select
                              value={form.facebookPixel.eventType}
                              onChange={(e) => updateForm(form.formId, {
                                facebookPixel: { ...form.facebookPixel!, eventType: e.target.value }
                              })}
                              className="w-full p-2 border rounded"
                            >
                              {eventTypeOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>

                            {form.facebookPixel.eventType === 'Custom' && (
                              <div className="mt-2">
                                <Label>Nome do Evento Personalizado</Label>
                                <Input
                                  value={form.facebookPixel.customEventName || ''}
                                  onChange={(e) => updateForm(form.formId, {
                                    facebookPixel: { ...form.facebookPixel!, customEventName: e.target.value }
                                  })}
                                  placeholder="ex: custom_form_submit"
                                />
                              </div>
                            )}
                          </div>

                          {/* Preview do código */}
                          {pixelCode && (
                            <div className="bg-blue-50 border border-blue-200 rounded p-3">
                              <div className="flex items-center justify-between mb-2">
                                <Label className="text-xs font-semibold text-blue-700">
                                  ✅ Código gerado para este formulário:
                                </Label>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyCodeToClipboard(pixelCode)}
                                >
                                  <Copy className="w-3 h-3" />
                                </Button>
                              </div>
                              <div className="bg-white p-2 rounded border text-xs font-mono overflow-x-auto">
                                <code className="text-blue-600">{pixelCode}</code>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Google Analytics */}
                    <div className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={form.googleAnalytics?.enabled || false}
                          onChange={(e) => updateForm(form.formId, {
                            googleAnalytics: { ...form.googleAnalytics!, enabled: e.target.checked }
                          })}
                        />
                        <Label className="font-medium">📊 Google Analytics</Label>
                      </div>

                      {form.googleAnalytics?.enabled && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Measurement ID</Label>
                            <Input
                              value={form.googleAnalytics.measurementId}
                              onChange={(e) => updateForm(form.formId, {
                                googleAnalytics: { ...form.googleAnalytics!, measurementId: e.target.value }
                              })}
                              placeholder="G-XXXXXXXXXX"
                            />
                          </div>
                          <div>
                            <Label>Nome do Evento</Label>
                            <Input
                              value={form.googleAnalytics.eventName}
                              onChange={(e) => updateForm(form.formId, {
                                googleAnalytics: { ...form.googleAnalytics!, eventName: e.target.value }
                              })}
                              placeholder="form_submit"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Scripts Personalizados */}
                    <div className="border rounded-lg p-4 space-y-4">
                      <Label className="font-medium">🔧 Scripts Personalizados</Label>
                      
                      <div>
                        <Label className="text-sm text-muted-foreground">Scripts no HEAD</Label>
                        <Textarea
                          value={form.customHeadScripts || ''}
                          onChange={(e) => updateForm(form.formId, { customHeadScripts: e.target.value })}
                          placeholder="<script>/* Código personalizado para HEAD */</script>"
                          rows={3}
                          className="text-xs font-mono"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-sm text-muted-foreground">Scripts no BODY</Label>
                        <Textarea
                          value={form.customBodyScripts || ''}
                          onChange={(e) => updateForm(form.formId, { customBodyScripts: e.target.value })}
                          placeholder="<script>/* Código personalizado para BODY */</script>"
                          rows={3}
                          className="text-xs font-mono"
                        />
                      </div>
                    </div>

                    {/* Erros de validação */}
                    {errors.length > 0 && form.enabled && (
                      <div className="bg-red-50 border border-red-200 rounded p-3">
                        <Label className="text-red-700 font-semibold">❌ Erros de configuração:</Label>
                        <ul className="text-red-600 text-sm mt-1">
                          {errors.map((error, idx) => (
                            <li key={idx}>• {error}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};