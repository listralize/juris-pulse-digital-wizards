import React, { useState, useEffect } from 'react';
import { Star, Users, CheckCircle, Award, X } from 'lucide-react';
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
  number: string;
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
      }, socialProofConfig.rotationInterval || 5000);

      return () => clearInterval(interval);
    }
  }, [socialProofConfig]);

  const loadStepFormSocialProof = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('global_social_proof')
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Erro ao carregar prova social do step form:', error);
        return;
      }

      const stepFormConfig = data?.global_social_proof as any;
      if (stepFormConfig?.enabled) {
        setSocialProofConfig(stepFormConfig as SocialProofConfig);
      }
    } catch (error) {
      console.error('Erro ao carregar prova social do step form:', error);
    }
  };

  if (!socialProofConfig?.enabled || (!socialProofConfig.testimonials?.length && !socialProofConfig.stats?.length)) {
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

  const getIcon = (iconName?: string) => {
    const iconClass = "w-6 h-6";
    const primaryColor = socialProofConfig.primaryColor || '#4CAF50';
    
    switch (iconName) {
      case 'users':
        return <Users className={iconClass} style={{ color: primaryColor }} />;
      case 'check':
        return <CheckCircle className={`${iconClass} text-green-500`} />;
      case 'award':
        return <Award className={`${iconClass} text-yellow-500`} />;
      default:
        return <CheckCircle className={iconClass} style={{ color: primaryColor }} />;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg">
      <div className="container mx-auto px-4 py-6">
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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
                        className="text-2xl font-bold"
                        style={{ color: socialProofConfig.primaryColor || '#4CAF50' }}
                      >
                        {stat.number}
                      </div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Depoimentos */}
              {socialProofConfig.testimonials?.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-center">
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
                            <div className="font-semibold">
                              {socialProofConfig.testimonials[currentTestimonialIndex].name}
                            </div>
                            {socialProofConfig.testimonials[currentTestimonialIndex].role && (
                              <div className="text-sm text-muted-foreground">
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
                onClick={() => setIsVisible(false)}
                className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
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