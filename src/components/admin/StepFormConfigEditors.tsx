import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { Plus, Trash2, Star, Timer, Gift } from 'lucide-react';
import { ImageGallery } from './ImageGallery';

interface StepFormStep {
  offerConfig?: any;
  timerConfig?: any;
  socialProofConfig?: any;
}

// Offer Config Editor
export const OfferConfigEditor: React.FC<{
  step: StepFormStep;
  updateStep: (field: string, value: any) => void;
}> = ({ step, updateStep }) => {
  const config = step.offerConfig || {};

  const updateOfferConfig = (field: string, value: any) => {
    updateStep('offerConfig', { ...config, [field]: value });
  };

  const updateFeatures = (features: string[]) => {
    updateOfferConfig('features', features);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="w-5 h-5" />
          Configuração da Oferta
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Título da Oferta</Label>
            <Input
              value={config.title || ''}
              onChange={(e) => updateOfferConfig('title', e.target.value)}
              placeholder="Oferta Especial"
            />
          </div>
          <div>
            <Label>Texto de Urgência</Label>
            <Input
              value={config.urgencyText || ''}
              onChange={(e) => updateOfferConfig('urgencyText', e.target.value)}
              placeholder="⏰ Oferta limitada!"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Preço Original</Label>
            <Input
              value={config.originalPrice || ''}
              onChange={(e) => updateOfferConfig('originalPrice', e.target.value)}
              placeholder="R$ 1.200,00"
            />
          </div>
          <div>
            <Label>Preço Promocional</Label>
            <Input
              value={config.salePrice || ''}
              onChange={(e) => updateOfferConfig('salePrice', e.target.value)}
              placeholder="R$ 800,00"
            />
          </div>
          <div>
            <Label>Desconto</Label>
            <Input
              value={config.discount || ''}
              onChange={(e) => updateOfferConfig('discount', e.target.value)}
              placeholder="33% OFF"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Texto do Botão</Label>
            <Input
              value={config.ctaText || ''}
              onChange={(e) => updateOfferConfig('ctaText', e.target.value)}
              placeholder="Garantir Oferta"
            />
          </div>
          <div>
            <Label>URL do Botão</Label>
            <Input
              value={config.ctaUrl || ''}
              onChange={(e) => updateOfferConfig('ctaUrl', e.target.value)}
              placeholder="https://api.whatsapp.com/send?phone=..."
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label>Características/Benefícios</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const features = config.features || [];
                updateFeatures([...features, '']);
              }}
            >
              <Plus className="w-4 h-4 mr-1" />
              Adicionar
            </Button>
          </div>
          <div className="space-y-2">
            {(config.features || []).map((feature: string, index: number) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={feature}
                  onChange={(e) => {
                    const features = [...(config.features || [])];
                    features[index] = e.target.value;
                    updateFeatures(features);
                  }}
                  placeholder="Benefício ou característica"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    const features = (config.features || []).filter((_: any, i: number) => i !== index);
                    updateFeatures(features);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Timer Config Editor
export const TimerConfigEditor: React.FC<{
  step: StepFormStep;
  updateStep: (field: string, value: any) => void;
}> = ({ step, updateStep }) => {
  const config = step.timerConfig || {};

  const updateTimerConfig = (field: string, value: any) => {
    updateStep('timerConfig', { ...config, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Timer className="w-5 h-5" />
          Configuração do Timer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Duração (em minutos)</Label>
          <Input
            type="number"
            value={config.duration || 30}
            onChange={(e) => updateTimerConfig('duration', parseInt(e.target.value))}
            placeholder="30"
          />
        </div>

        <div className="space-y-2">
          <Label>Mostrar no Timer:</Label>
          <div className="flex gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                checked={config.showHours !== false}
                onCheckedChange={(checked) => updateTimerConfig('showHours', checked)}
              />
              <Label>Horas</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={config.showMinutes !== false}
                onCheckedChange={(checked) => updateTimerConfig('showMinutes', checked)}
              />
              <Label>Minutos</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={config.showSeconds !== false}
                onCheckedChange={(checked) => updateTimerConfig('showSeconds', checked)}
              />
              <Label>Segundos</Label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Ação ao Expirar</Label>
            <Input
              value={config.onExpireAction || ''}
              onChange={(e) => updateTimerConfig('onExpireAction', e.target.value)}
              placeholder="redirect"
            />
          </div>
          <div>
            <Label>URL ao Expirar</Label>
            <Input
              value={config.onExpireUrl || ''}
              onChange={(e) => updateTimerConfig('onExpireUrl', e.target.value)}
              placeholder="https://exemplo.com"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Social Proof Config Editor
export const SocialProofConfigEditor: React.FC<{
  step: StepFormStep;
  updateStep: (field: string, value: any) => void;
}> = ({ step, updateStep }) => {
  const config = step.socialProofConfig || {};

  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);

  const updateSocialProofConfig = (field: string, value: any) => {
    updateStep('socialProofConfig', { ...config, [field]: value });
  };

  const updateTestimonials = (testimonials: any[]) => {
    updateSocialProofConfig('testimonials', testimonials);
  };

  const updateStats = (stats: any[]) => {
    updateSocialProofConfig('stats', stats);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5" />
          Configuração da Prova Social
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Toggle */}
        <div className="flex items-center justify-between mb-2">
          <Label className="text-base font-semibold">Ativar Prova Social</Label>
          <Switch
            checked={!!(config.enabled ?? false)}
            onCheckedChange={(checked) => updateSocialProofConfig('enabled', checked)}
          />
        </div>
        {/* Statistics Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <Label className="text-base font-semibold">Estatísticas</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const stats = config.stats || [];
                updateStats([...stats, { number: '', label: '' }]);
              }}
            >
              <Plus className="w-4 h-4 mr-1" />
              Adicionar Estatística
            </Button>
          </div>
          <div className="space-y-3">
            {(config.stats || []).map((stat: any, index: number) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-2 items-end">
                <Input
                  value={stat.number}
                  onChange={(e) => {
                    const stats = [...(config.stats || [])];
                    stats[index] = { ...stat, number: e.target.value };
                    updateStats(stats);
                  }}
                  placeholder="1000+"
                  className="w-full"
                />
                <Input
                  value={stat.label}
                  onChange={(e) => {
                    const stats = [...(config.stats || [])];
                    stats[index] = { ...stat, label: e.target.value };
                    updateStats(stats);
                  }}
                  placeholder="Clientes satisfeitos"
                  className="w-full"
                />
                <select
                  className="w-full p-2 border border-input rounded-md bg-background"
                  value={stat.icon || 'check'}
                  onChange={(e) => {
                    const stats = [...(config.stats || [])];
                    stats[index] = { ...stat, icon: e.target.value };
                    updateStats(stats);
                  }}
                >
                  <option value="check">Check</option>
                  <option value="users">Users</option>
                  <option value="award">Award</option>
                  <option value="star">Star</option>
                  <option value="shield">Shield</option>
                  <option value="thumbs-up">Thumbs Up</option>
                </select>
                <Input
                  type="color"
                  value={stat.color || '#4CAF50'}
                  onChange={(e) => {
                    const stats = [...(config.stats || [])];
                    stats[index] = { ...stat, color: e.target.value };
                    updateStats(stats);
                  }}
                  className="w-20 h-10"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    const stats = (config.stats || []).filter((_: any, i: number) => i !== index);
                    updateStats(stats);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <Label className="text-base font-semibold">Depoimentos</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const testimonials = config.testimonials || [];
                updateTestimonials([...testimonials, { name: '', text: '', rating: 5, image: '' }]);
              }}
            >
              <Plus className="w-4 h-4 mr-1" />
              Adicionar Depoimento
            </Button>
          </div>
          <div className="space-y-4">
            {(config.testimonials || []).map((testimonial: any, index: number) => (
              <Card key={index} className="p-4">
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label>Nome</Label>
                      <Input
                        value={testimonial.name}
                        onChange={(e) => {
                          const testimonials = [...(config.testimonials || [])];
                          testimonials[index] = { ...testimonial, name: e.target.value };
                          updateTestimonials(testimonials);
                        }}
                        placeholder="João Silva"
                      />
                    </div>
                    <div>
                      <Label>Avaliação (1-5)</Label>
                      <Input
                        type="number"
                        min="1"
                        max="5"
                        value={testimonial.rating || 5}
                        onChange={(e) => {
                          const testimonials = [...(config.testimonials || [])];
                          testimonials[index] = { ...testimonial, rating: parseInt(e.target.value) };
                          updateTestimonials(testimonials);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Depoimento</Label>
                    <Textarea
                      value={testimonial.text}
                      onChange={(e) => {
                        const testimonials = [...(config.testimonials || [])];
                        testimonials[index] = { ...testimonial, text: e.target.value };
                        updateTestimonials(testimonials);
                      }}
                      placeholder="Excelente serviço, recomendo para todos!"
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Label>URL da Foto</Label>
                      <div className="flex gap-2">
                        <Input
                          value={testimonial.image}
                          onChange={(e) => {
                            const testimonials = [...(config.testimonials || [])];
                            testimonials[index] = { ...testimonial, image: e.target.value };
                            updateTestimonials(testimonials);
                          }}
                          placeholder="https://exemplo.com/foto.jpg"
                        />
                        <Button variant="outline" size="sm" onClick={() => setGalleryIndex(index)}>
                          Abrir Galeria
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const testimonials = (config.testimonials || []).filter((_: any, i: number) => i !== index);
                        updateTestimonials(testimonials);
                      }}
                      className="mt-6"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
      <ImageGallery
        isOpen={galleryIndex !== null}
        onClose={() => setGalleryIndex(null)}
        selectedImage={galleryIndex !== null ? (config.testimonials || [])[galleryIndex]?.image : undefined}
        onSelectImage={(url) => {
          if (galleryIndex === null) return;
          const testimonials = [...(config.testimonials || [])];
          testimonials[galleryIndex] = { ...(testimonials[galleryIndex] || {}), image: url };
          updateTestimonials(testimonials);
          setGalleryIndex(null);
        }}
      />
    </Card>
  );
};