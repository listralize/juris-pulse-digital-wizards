import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, Star, TrendingUp } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { toast } from 'sonner';

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
}

interface SocialProofConfig {
  enabled: boolean;
  testimonials: TestimonialData[];
  stats: StatData[];
  primaryColor: string;
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

  const socialProofConfig: SocialProofConfig = formData.social_proof_config || {
    enabled: false,
    testimonials: [],
    stats: [],
    primaryColor: '#D4A574'
  };

  const [newTestimonial, setNewTestimonial] = useState<Partial<TestimonialData>>({
    name: '',
    text: '',
    rating: 5,
    image: '',
    role: ''
  });

  const [newStat, setNewStat] = useState<Partial<StatData>>({
    label: '',
    value: '',
    icon: 'TrendingUp'
  });

  const updateSocialProofConfig = (config: SocialProofConfig) => {
    onUpdate('social_proof_config', config);
  };

  const toggleEnabled = (enabled: boolean) => {
    updateSocialProofConfig({
      ...socialProofConfig,
      enabled
    });
  };

  const addTestimonial = () => {
    if (!newTestimonial.name || !newTestimonial.text) {
      toast.error('Nome e depoimento são obrigatórios');
      return;
    }

    const testimonial: TestimonialData = {
      id: Date.now().toString(),
      name: newTestimonial.name!,
      text: newTestimonial.text!,
      rating: newTestimonial.rating || 5,
      image: newTestimonial.image || '',
      role: newTestimonial.role || ''
    };

    updateSocialProofConfig({
      ...socialProofConfig,
      testimonials: [...socialProofConfig.testimonials, testimonial]
    });

    setNewTestimonial({
      name: '',
      text: '',
      rating: 5,
      image: '',
      role: ''
    });

    toast.success('Depoimento adicionado com sucesso!');
  };

  const removeTestimonial = (id: string) => {
    updateSocialProofConfig({
      ...socialProofConfig,
      testimonials: socialProofConfig.testimonials.filter(t => t.id !== id)
    });
    toast.success('Depoimento removido!');
  };

  const addStat = () => {
    if (!newStat.label || !newStat.value) {
      toast.error('Rótulo e valor são obrigatórios');
      return;
    }

    const stat: StatData = {
      id: Date.now().toString(),
      label: newStat.label!,
      value: newStat.value!,
      icon: newStat.icon || 'TrendingUp'
    };

    updateSocialProofConfig({
      ...socialProofConfig,
      stats: [...socialProofConfig.stats, stat]
    });

    setNewStat({
      label: '',
      value: '',
      icon: 'TrendingUp'
    });

    toast.success('Estatística adicionada com sucesso!');
  };

  const removeStat = (id: string) => {
    updateSocialProofConfig({
      ...socialProofConfig,
      stats: socialProofConfig.stats.filter(s => s.id !== id)
    });
    toast.success('Estatística removida!');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Configuração Geral */}
      <Card className={isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-black'}`}>
            <TrendingUp className="w-5 h-5" />
            Prova Social do Step Form
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className={isDark ? 'text-white' : 'text-black'}>
                Ativar Prova Social
              </Label>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Exibe depoimentos e estatísticas acima do rodapé do Step Form
              </p>
            </div>
            <Switch
              checked={socialProofConfig.enabled}
              onCheckedChange={toggleEnabled}
            />
          </div>

          <div>
            <Label className={isDark ? 'text-white' : 'text-black'}>
              Cor Principal
            </Label>
            <Input
              type="color"
              value={socialProofConfig.primaryColor}
              onChange={(e) => updateSocialProofConfig({
                ...socialProofConfig,
                primaryColor: e.target.value
              })}
              className="w-20 h-10 mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Depoimentos */}
      <Card className={isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-black'}`}>
            <Star className="w-5 h-5" />
            Depoimentos ({socialProofConfig.testimonials.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Adicionar Novo Depoimento */}
          <div className={`p-4 border rounded-lg ${isDark ? 'border-white/20 bg-black/50' : 'border-gray-200 bg-gray-50'}`}>
            <h4 className={`font-medium mb-3 ${isDark ? 'text-white' : 'text-black'}`}>
              Adicionar Depoimento
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label>Nome</Label>
                <Input
                  value={newTestimonial.name || ''}
                  onChange={(e) => setNewTestimonial({
                    ...newTestimonial,
                    name: e.target.value
                  })}
                  placeholder="Nome do cliente"
                  className={isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200'}
                />
              </div>
              <div>
                <Label>Cargo/Empresa</Label>
                <Input
                  value={newTestimonial.role || ''}
                  onChange={(e) => setNewTestimonial({
                    ...newTestimonial,
                    role: e.target.value
                  })}
                  placeholder="Ex: CEO da Empresa X"
                  className={isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200'}
                />
              </div>
            </div>
            <div className="mt-3">
              <Label>Depoimento</Label>
              <Textarea
                value={newTestimonial.text || ''}
                onChange={(e) => setNewTestimonial({
                  ...newTestimonial,
                  text: e.target.value
                })}
                placeholder="Texto do depoimento..."
                className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200'}`}
                rows={3}
              />
            </div>
            <div className="flex gap-3 mt-3">
              <div className="flex-1">
                <Label>Avaliação</Label>
                <Input
                  type="number"
                  min="1"
                  max="5"
                  value={newTestimonial.rating || 5}
                  onChange={(e) => setNewTestimonial({
                    ...newTestimonial,
                    rating: parseInt(e.target.value)
                  })}
                  className={isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200'}
                />
              </div>
              <div className="flex-1">
                <Label>Foto (URL)</Label>
                <Input
                  value={newTestimonial.image || ''}
                  onChange={(e) => setNewTestimonial({
                    ...newTestimonial,
                    image: e.target.value
                  })}
                  placeholder="https://..."
                  className={isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200'}
                />
              </div>
            </div>
            <Button onClick={addTestimonial} className="mt-3" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Depoimento
            </Button>
          </div>

          {/* Lista de Depoimentos */}
          <div className="space-y-3">
            {socialProofConfig.testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className={`p-4 border rounded-lg ${isDark ? 'border-white/20 bg-black/30' : 'border-gray-200 bg-white'}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h5 className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                        {testimonial.name}
                      </h5>
                      {testimonial.role && (
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          - {testimonial.role}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {renderStars(testimonial.rating)}
                    </div>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      "{testimonial.text}"
                    </p>
                  </div>
                  <Button
                    onClick={() => removeTestimonial(testimonial.id)}
                    size="sm"
                    variant="destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <Card className={isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-black'}`}>
            <TrendingUp className="w-5 h-5" />
            Estatísticas ({socialProofConfig.stats.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Adicionar Nova Estatística */}
          <div className={`p-4 border rounded-lg ${isDark ? 'border-white/20 bg-black/50' : 'border-gray-200 bg-gray-50'}`}>
            <h4 className={`font-medium mb-3 ${isDark ? 'text-white' : 'text-black'}`}>
              Adicionar Estatística
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <Label>Rótulo</Label>
                <Input
                  value={newStat.label || ''}
                  onChange={(e) => setNewStat({
                    ...newStat,
                    label: e.target.value
                  })}
                  placeholder="Ex: Clientes Atendidos"
                  className={isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200'}
                />
              </div>
              <div>
                <Label>Valor</Label>
                <Input
                  value={newStat.value || ''}
                  onChange={(e) => setNewStat({
                    ...newStat,
                    value: e.target.value
                  })}
                  placeholder="Ex: 1000+"
                  className={isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200'}
                />
              </div>
              <div>
                <Label>Ícone</Label>
                <Input
                  value={newStat.icon || ''}
                  onChange={(e) => setNewStat({
                    ...newStat,
                    icon: e.target.value
                  })}
                  placeholder="TrendingUp"
                  className={isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200'}
                />
              </div>
            </div>
            <Button onClick={addStat} className="mt-3" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Estatística
            </Button>
          </div>

          {/* Lista de Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {socialProofConfig.stats.map((stat) => (
              <div
                key={stat.id}
                className={`p-4 border rounded-lg ${isDark ? 'border-white/20 bg-black/30' : 'border-gray-200 bg-white'}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                      {stat.value}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {stat.label}
                    </div>
                  </div>
                  <Button
                    onClick={() => removeStat(stat.id)}
                    size="sm"
                    variant="destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};