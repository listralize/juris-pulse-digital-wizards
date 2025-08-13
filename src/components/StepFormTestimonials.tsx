import React, { useState, useEffect } from 'react';
import { Star, Users, CheckCircle, Award, X, Shield, ThumbsUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useIsMobile } from '@/hooks/use-mobile';

interface TestimonialData {
  name: string;
  text: string;
  rating: number;
  role?: string;
  image?: string;
}

interface StatData {
  number?: string;
  value?: string;
  label: string;
  icon?: string;
}

interface SocialProofConfig {
  enabled: boolean;
  testimonials: TestimonialData[];
  stats: StatData[];
  autoRotate?: boolean;
  rotationInterval?: number;
  primaryColor?: string;
}

interface StepFormTestimonialsProps {
  formId?: string;
  config?: SocialProofConfig;
  className?: string;
}

export const StepFormTestimonials: React.FC<StepFormTestimonialsProps> = ({
  formId,
  config,
  className = ''
}) => {
  const [socialProofConfig, setSocialProofConfig] = useState<SocialProofConfig | null>(null);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (config) {
      setSocialProofConfig(config);
    } else {
      loadStepFormSocialProof();
    }
  }, [formId, config]);

  useEffect(() => {
    if (socialProofConfig?.autoRotate && socialProofConfig.testimonials?.length > 1) {
      const interval = setInterval(() => {
        setCurrentTestimonialIndex((prev) => 
          (prev + 1) % socialProofConfig.testimonials.length
        );
      }, socialProofConfig.rotationInterval || 8000);

      return () => clearInterval(interval);
    }
  }, [socialProofConfig]);

  const loadStepFormSocialProof = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('global_social_proof, updated_at')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Erro ao carregar prova social do step form:', error);
        return;
      }

      console.log('Dados carregados da tabela admin_settings:', data);
      
      const stepFormConfig = data?.global_social_proof as any;
      console.log('Config de prova social:', stepFormConfig);
      
      if (!stepFormConfig) {
        setSocialProofConfig(null);
        return;
      }

      const enabled = stepFormConfig.enabled ?? true;
      if (!enabled) {
        setSocialProofConfig(null);
        return;
      }

      const normalizedConfig: SocialProofConfig = {
        enabled: enabled,
        testimonials: stepFormConfig.testimonials || [],
        stats: (stepFormConfig.stats || []).map((s: any) => ({
          ...s,
          number: s.number ?? s.value
        })),
        autoRotate: stepFormConfig.autoRotate ?? true,
        rotationInterval: stepFormConfig.rotationInterval ?? 8000,
        primaryColor: stepFormConfig.primaryColor || '#4CAF50'
      };

      if (normalizedConfig.testimonials.length > 0 || normalizedConfig.stats.length > 0) {
        setSocialProofConfig(normalizedConfig);
        console.log('Prova social ativada:', normalizedConfig);
      } else {
        console.log('Prova social não está ativada ou não tem conteúdo');
        setSocialProofConfig(null);
      }
    } catch (error) {
      console.error('Erro ao carregar prova social do step form:', error);
    }
  };

  if (!socialProofConfig || (!socialProofConfig.testimonials?.length && !socialProofConfig.stats?.length)) {
    return null;
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const getIcon = (iconName?: string, color?: string) => {
    const iconClass = "w-6 h-6";
    const finalColor = color || socialProofConfig?.primaryColor || '#4CAF50';
    switch (iconName) {
      case 'users':
        return <Users className={iconClass} style={{ color: finalColor }} />;
      case 'check':
        return <CheckCircle className={iconClass} style={{ color: finalColor }} />;
      case 'award':
        return <Award className={iconClass} style={{ color: finalColor }} />;
      case 'star':
        return <Star className={iconClass} style={{ color: finalColor }} />;
      case 'shield':
        return <Shield className={iconClass} style={{ color: finalColor }} />;
      case 'thumbs-up':
        return <ThumbsUp className={iconClass} style={{ color: finalColor }} />;
      default:
        return <CheckCircle className={iconClass} style={{ color: finalColor }} />;
    }
  };

  return (
    <div className="relative w-full bg-transparent">
      <div className="container mx-auto px-4 py-3">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative"
            >
              {/* Estatísticas */}
              {socialProofConfig.stats?.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  {socialProofConfig.stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="flex justify-center mb-2">
                        {getIcon(stat.icon)}
                      </div>
                      <div 
                        className="text-xl font-bold"
                        style={{ color: socialProofConfig.primaryColor || '#4CAF50' }}
                      >
                        {stat.number || (stat as any).value}
                      </div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Depoimentos */}
              {socialProofConfig.testimonials?.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-base font-semibold text-center">
                    O que nossos clientes dizem
                  </h3>
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTestimonialIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="text-center"
                    >
                      {socialProofConfig.testimonials[currentTestimonialIndex] && (
                        <>
                          <div className="flex justify-center mb-3">
                            {renderStars(socialProofConfig.testimonials[currentTestimonialIndex].rating)}
                          </div>
                          
                          <blockquote className="text-muted-foreground italic mb-4">
                            "{socialProofConfig.testimonials[currentTestimonialIndex].text}"
                          </blockquote>
                          
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-2">
                              {socialProofConfig.testimonials[currentTestimonialIndex].image && (
                                <img src={socialProofConfig.testimonials[currentTestimonialIndex].image} alt={`Foto de ${socialProofConfig.testimonials[currentTestimonialIndex].name}`} className="w-8 h-8 rounded-full object-cover" loading="lazy" />
                              )}
                              <div className="font-semibold">
                                {socialProofConfig.testimonials[currentTestimonialIndex].name}
                              </div>
                            </div>
                            {socialProofConfig.testimonials[currentTestimonialIndex].role && (
                              <div className="text-xs text-muted-foreground">
                                {socialProofConfig.testimonials[currentTestimonialIndex].role}
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Indicadores de navegação */}
                  {socialProofConfig.testimonials.length > 1 && (
                    <div className="flex justify-center gap-2 mt-4">
                      {socialProofConfig.testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTestimonialIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentTestimonialIndex
                              ? 'bg-primary'
                              : 'bg-muted hover:bg-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Botão para ocultar */}
              <button
                onClick={(e) => e.preventDefault()}
                className="hidden"
                aria-label="Fechar depoimentos"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};