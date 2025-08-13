import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, Star, TrendingUp, Save } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { ImageGallery } from './ImageGallery';

interface TestimonialData {
  id: string;
  name: string;
  text: string;
  rating: number;
  image?: string;
  role?: string;
}

interface StatData {
  id: string;
  label: string;
  value: string;
  icon: string;
  color?: string;
}

interface SocialProofConfig {
  enabled: boolean;
  testimonials: TestimonialData[];
  stats: StatData[];
  primaryColor: string;
  autoRotate?: boolean;
  rotationInterval?: number;
}

interface StepFormSocialProofManagerProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

export const StepFormSocialProofManager: React.FC<StepFormSocialProofManagerProps> = ({ 
  formData, 
  onUpdate 
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [config, setConfig] = useState<SocialProofConfig>({
    enabled: false,
    testimonials: [],
    stats: [],
    primaryColor: '#4CAF50',
    autoRotate: true,
    rotationInterval: 8000
  });

  const [loading, setLoading] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);

  // Load configuration from Supabase
  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('admin_settings')
        .select('id, global_social_proof, updated_at')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Erro ao carregar configuração:', error);
        return;
      }

      if (data?.global_social_proof) {
        const loadedConfig = data.global_social_proof as unknown as SocialProofConfig;
        setConfig({
          ...loadedConfig,
          autoRotate: loadedConfig.autoRotate ?? true,
          rotationInterval: loadedConfig.rotationInterval ?? 5000
        });
      }
    } catch (error) {
      console.error('Erro ao carregar configuração:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveConfig = async () => {
    try {
      setLoading(true);
      
      // Primeiro, tenta buscar os dados existentes
      const { data: existingData, error: fetchError } = await supabase
        .from('admin_settings')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      // Se não existem dados, criar novo registro
      if (!existingData) {
        const { error } = await supabase
          .from('admin_settings')
          .insert({
            global_social_proof: config as any
          });
        
        if (error) throw error;
      } else {
        // Atualizar registro existente
        const { error } = await supabase
          .from('admin_settings')
          .update({
            global_social_proof: config as any,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingData.id);
        
        if (error) throw error;
      }

      // Also update the local formData
      onUpdate('social_proof_config', config);
      
      toast.success('Configuração salva com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar configuração:', error);
      toast.error('Erro ao salvar configuração');
    } finally {
      setLoading(false);
    }
  };

  const updateConfig = (field: keyof SocialProofConfig, value: any) => {
    const updatedConfig = {
      ...config,
      [field]: value
    };
    setConfig(updatedConfig);
  };

  const addTestimonial = () => {
    const newTestimonial: TestimonialData = {
      id: Date.now().toString(),
      name: '',
      text: '',
      rating: 5,
      role: ''
    };
    updateConfig('testimonials', [...config.testimonials, newTestimonial]);
  };

  const updateTestimonial = (index: number, field: keyof TestimonialData, value: any) => {
    const updatedTestimonials = [...config.testimonials];
    updatedTestimonials[index] = {
      ...updatedTestimonials[index],
      [field]: value
    };
    updateConfig('testimonials', updatedTestimonials);
  };

  const removeTestimonial = (index: number) => {
    const updatedTestimonials = config.testimonials.filter((_, i) => i !== index);
    updateConfig('testimonials', updatedTestimonials);
  };

  const addStat = () => {
    const newStat: StatData = {
      id: Date.now().toString(),
      label: '',
      value: '',
      icon: 'check',
      color: '#4CAF50'
    };
    updateConfig('stats', [...config.stats, newStat]);
  };

  const updateStat = (index: number, field: keyof StatData, value: any) => {
    const updatedStats = [...config.stats];
    updatedStats[index] = {
      ...updatedStats[index],
      [field]: value
    };
    updateConfig('stats', updatedStats);
  };

  const removeStat = (index: number) => {
    const updatedStats = config.stats.filter((_, i) => i !== index);
    updateConfig('stats', updatedStats);
  };

  const renderStars = (rating: number, onChange?: (rating: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 cursor-pointer ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
            onClick={() => onChange?.(star)}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <Card className={isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-black'}`}>
            <TrendingUp className="w-5 h-5" />
            Depoimentos do Step Form
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className={isDark ? 'text-white' : 'text-black'}>
                Ativar Depoimentos
              </Label>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Exibe depoimentos e estatísticas acima do rodapé do Step Form
              </p>
            </div>
            <Switch
              checked={config.enabled}
              onCheckedChange={async (checked) => {
                updateConfig('enabled', checked);
                // Auto-save when toggling enabled state
                try {
                  const updatedConfig = { ...config, enabled: checked };
                  setConfig(updatedConfig);
                  await saveConfig();
                } catch (error) {
                  console.error('Erro ao salvar estado:', error);
                }
              }}
            />
          </div>

          {config.enabled && (
            <div className="space-y-6">
              {/* Configurações de Carrossel */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className={isDark ? 'text-white' : 'text-black'}>Cor Primária</Label>
                  <Input
                    type="color"
                    value={config.primaryColor}
                    onChange={(e) => updateConfig('primaryColor', e.target.value)}
                    className="w-20 h-10"
                  />
                </div>
                <div>
                  <Label className={isDark ? 'text-white' : 'text-black'}>
                    Rotação Automática
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={config.autoRotate}
                      onCheckedChange={(checked) => updateConfig('autoRotate', checked)}
                    />
                    <span className="text-sm">Ativar carrossel</span>
                  </div>
                  {config.autoRotate && (
                    <div className="mt-2">
                      <Label className="text-sm">Intervalo (ms)</Label>
                      <Input
                        type="number"
                        value={config.rotationInterval || 5000}
                        onChange={(e) => updateConfig('rotationInterval', parseInt(e.target.value))}
                        min="1000"
                        max="30000"
                        className="w-24"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Estatísticas */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                    Estatísticas
                  </Label>
                  <Button onClick={addStat} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar
                  </Button>
                </div>

                {config.stats.map((stat, index) => (
                  <Card key={stat.id} className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div>
                        <Label>Número</Label>
                        <Input
                          placeholder="500+"
                          value={stat.value}
                          onChange={(e) => updateStat(index, 'value', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Descrição</Label>
                        <Input
                          placeholder="Clientes Atendidos"
                          value={stat.label}
                          onChange={(e) => updateStat(index, 'label', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Ícone</Label>
                        <select
                          className="w-full p-2 border border-input rounded-md bg-background"
                          value={stat.icon || 'check'}
                          onChange={(e) => updateStat(index, 'icon', e.target.value)}
                        >
                          <option value="check">Check</option>
                          <option value="users">Users</option>
                          <option value="award">Award</option>
                          <option value="star">Star</option>
                          <option value="shield">Shield</option>
                          <option value="thumbs-up">Thumbs Up</option>
                        </select>
                      </div>
                      <div>
                        <Label>Cor do Ícone</Label>
                        <Input
                          type="color"
                          value={stat.color || config.primaryColor}
                          onChange={(e) => updateStat(index, 'color', e.target.value)}
                          className="w-20 h-10"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeStat(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Depoimentos */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                    Depoimentos
                  </Label>
                  <Button onClick={addTestimonial} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar
                  </Button>
                </div>

                {config.testimonials.map((testimonial, index) => (
                  <Card key={testimonial.id} className="p-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Nome</Label>
                          <Input
                            placeholder="Nome do cliente"
                            value={testimonial.name}
                            onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Avaliação (1-5)</Label>
                          {renderStars(testimonial.rating, (rating) => 
                            updateTestimonial(index, 'rating', rating)
                          )}
                        </div>
                      </div>
                      <div>
                        <Label>Depoimento</Label>
                        <Textarea
                          placeholder="Excelente serviço, recomendo para todos!"
                          value={testimonial.text}
                          onChange={(e) => updateTestimonial(index, 'text', e.target.value)}
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Cargo/Profissão (opcional)</Label>
                          <Input
                            placeholder="Empresário"
                            value={testimonial.role || ''}
                            onChange={(e) => updateTestimonial(index, 'role', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Foto (URL)</Label>
                          <div className="flex gap-2">
                            <Input
                              placeholder="https://..."
                              value={testimonial.image || ''}
                              onChange={(e) => updateTestimonial(index, 'image', e.target.value)}
                            />
                            <Button variant="outline" size="sm" onClick={() => setGalleryIndex(index)}>
                              Abrir Galeria
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-end">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeTestimonial(index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Preview */}
              {(config.testimonials.length > 0 || config.stats.length > 0) && (
                <div className="space-y-4">
                  <Label className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                    Preview do Carrossel
                  </Label>
                  <Card className="p-4 bg-gray-50 dark:bg-gray-900">
                    {config.stats.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {config.stats.map((stat, index) => (
                          <div key={index} className="text-center">
                            <div 
                              className="text-2xl font-bold"
                              style={{ color: config.primaryColor }}
                            >
                              {stat.value}
                            </div>
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {config.testimonials.length > 0 && (
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-4">
                          O que nossos clientes dizem
                        </h3>
                        <div className="space-y-4">
                          {config.testimonials.slice(0, 1).map((testimonial, index) => (
                            <div key={index}>
                              <div className="flex justify-center mb-2">
                                {renderStars(testimonial.rating)}
                              </div>
                              <blockquote className="italic mb-2">
                                "{testimonial.text}"
                              </blockquote>
                              <div className="font-semibold">{testimonial.name}</div>
                              {testimonial.role && (
                                <div className="text-sm text-muted-foreground">
                                  {testimonial.role}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        {config.testimonials.length > 1 && (
                          <p className="text-sm text-muted-foreground mt-2">
                            + {config.testimonials.length - 1} depoimentos em carrossel
                          </p>
                        )}
                      </div>
                    )}
                  </Card>
                </div>
              )}

              {/* Salvar */}
              <div className="flex justify-end">
                <Button onClick={saveConfig} disabled={loading}>
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Salvando...' : 'Salvar Configuração'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Galeria de Imagens para Testemunhos */}
      <ImageGallery
        isOpen={galleryIndex !== null}
        onClose={() => setGalleryIndex(null)}
        selectedImage={galleryIndex !== null ? config.testimonials[galleryIndex]?.image : undefined}
        onSelectImage={(url) => {
          if (galleryIndex === null) return;
          const updated = [...config.testimonials];
          updated[galleryIndex] = { ...updated[galleryIndex], image: url };
          updateConfig('testimonials', updated);
          setGalleryIndex(null);
        }}
      />
    </div>
  );
};