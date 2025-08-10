import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { Star, Plus, Trash2, Save } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface SocialProofConfig {
  enabled: boolean;
  testimonials: Array<{
    name: string;
    rating: number;
    text: string;
  }>;
  stats: Array<{
    number: string;
    label: string;
  }>;
  primaryColor: string;
}

const GlobalSocialProofManager: React.FC = () => {
  const [config, setConfig] = useState<SocialProofConfig>({
    enabled: false,
    testimonials: [],
    stats: [],
    primaryColor: '#D4A574'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('global_social_proof')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Erro ao carregar configuração:', error);
        return;
      }

      if (data && data.global_social_proof) {
        setConfig(data.global_social_proof as unknown as SocialProofConfig);
      }
    } catch (error) {
      console.error('Erro ao carregar prova social global:', error);
    }
  };

  const saveConfig = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('admin_settings')
        .upsert({
          id: '1',
          global_social_proof: config as any,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Erro ao salvar:', error);
        toast.error('Erro ao salvar configuração');
        return;
      }

      toast.success('Configuração salva com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar prova social global:', error);
      toast.error('Erro ao salvar configuração');
    } finally {
      setLoading(false);
    }
  };

  const addTestimonial = () => {
    setConfig(prev => ({
      ...prev,
      testimonials: [...prev.testimonials, { name: '', rating: 5, text: '' }]
    }));
  };

  const updateTestimonial = (index: number, field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      testimonials: prev.testimonials.map((testimonial, i) => 
        i === index ? { ...testimonial, [field]: value } : testimonial
      )
    }));
  };

  const removeTestimonial = (index: number) => {
    setConfig(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter((_, i) => i !== index)
    }));
  };

  const addStat = () => {
    setConfig(prev => ({
      ...prev,
      stats: [...prev.stats, { number: '', label: '' }]
    }));
  };

  const updateStat = (index: number, field: string, value: string) => {
    setConfig(prev => ({
      ...prev,
      stats: prev.stats.map((stat, i) => 
        i === index ? { ...stat, [field]: value } : stat
      )
    }));
  };

  const removeStat = (index: number) => {
    setConfig(prev => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index)
    }));
  };

  const renderStars = (rating: number, onChange?: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 cursor-pointer ${
          i < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300 hover:text-yellow-200'
        }`}
        onClick={() => onChange?.(i + 1)}
      />
    ));
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Prova Social Global
          <div className="flex items-center space-x-2">
            <Label htmlFor="social-proof-enabled">Habilitado</Label>
            <Switch
              id="social-proof-enabled"
              checked={config.enabled}
              onCheckedChange={(enabled) => setConfig(prev => ({ ...prev, enabled }))}
            />
          </div>
        </CardTitle>
        <CardDescription>
          Configure a prova social que aparecerá acima do rodapé em todas as páginas do site
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Cor Primária */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="primary-color">Cor Primária</Label>
            <Input
              id="primary-color"
              type="color"
              value={config.primaryColor}
              onChange={(e) => setConfig(prev => ({ ...prev, primaryColor: e.target.value }))}
            />
          </div>
        </div>

        {/* Estatísticas */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Estatísticas</h3>
            <Button onClick={addStat} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Estatística
            </Button>
          </div>
          <div className="space-y-4">
            {config.stats.map((stat, index) => (
              <div key={index} className="flex items-end space-x-4 p-4 border rounded-lg">
                <div className="flex-1">
                  <Label htmlFor={`stat-number-${index}`}>Número</Label>
                  <Input
                    id={`stat-number-${index}`}
                    placeholder="Ex: 500+, 95%"
                    value={stat.number}
                    onChange={(e) => updateStat(index, 'number', e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor={`stat-label-${index}`}>Descrição</Label>
                  <Input
                    id={`stat-label-${index}`}
                    placeholder="Ex: Clientes Atendidos"
                    value={stat.label}
                    onChange={(e) => updateStat(index, 'label', e.target.value)}
                  />
                </div>
                <Button
                  onClick={() => removeStat(index)}
                  size="sm"
                  variant="destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Depoimentos */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Depoimentos</h3>
            <Button onClick={addTestimonial} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Depoimento
            </Button>
          </div>
          <div className="space-y-4">
            {config.testimonials.map((testimonial, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <Label htmlFor={`testimonial-name-${index}`}>Nome</Label>
                      <Input
                        id={`testimonial-name-${index}`}
                        placeholder="Nome do cliente"
                        value={testimonial.name}
                        onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Avaliação</Label>
                      <div className="flex items-center space-x-1 mt-1">
                        {renderStars(testimonial.rating, (rating) => updateTestimonial(index, 'rating', rating))}
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => removeTestimonial(index)}
                    size="sm"
                    variant="destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div>
                  <Label htmlFor={`testimonial-text-${index}`}>Depoimento</Label>
                  <Textarea
                    id={`testimonial-text-${index}`}
                    placeholder="O que o cliente disse sobre nossos serviços..."
                    value={testimonial.text}
                    onChange={(e) => updateTestimonial(index, 'text', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview */}
        {config.enabled && (config.stats.length > 0 || config.testimonials.length > 0) && (
          <div>
            <h3 className="text-lg font-medium mb-4">Preview</h3>
            <div className="bg-gradient-to-r from-primary/5 via-background to-primary/5 border border-border rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Stats Preview */}
                {config.stats.length > 0 && (
                  <div className="flex justify-center md:justify-start">
                    <div className="grid grid-cols-2 gap-6">
                      {config.stats.map((stat, index) => (
                        <div key={index} className="text-center">
                          <div 
                            className="text-3xl font-bold mb-1"
                            style={{ color: config.primaryColor }}
                          >
                            {stat.number}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Testimonials Preview */}
                {config.testimonials.length > 0 && (
                  <div className="space-y-4">
                    {config.testimonials.slice(0, 2).map((testimonial, index) => (
                      <div key={index} className="bg-card p-4 rounded-lg border border-border">
                        <div className="flex items-center mb-2">
                          <div className="flex items-center space-x-1 mr-3">
                            {renderStars(testimonial.rating)}
                          </div>
                          <span className="font-medium text-sm">{testimonial.name}</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          "{testimonial.text}"
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Salvar */}
        <div className="flex justify-end">
          <Button onClick={saveConfig} disabled={loading}>
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Salvando...' : 'Salvar Configuração'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GlobalSocialProofManager;