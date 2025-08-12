import React, { useState, useEffect } from 'react';
import { Star, Users, CheckCircle, Award } from 'lucide-react';
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
}

interface StepFormSocialProofProps {
  formId?: string;
  config?: SocialProofConfig;
  className?: string;
}

export const StepFormSocialProof: React.FC<StepFormSocialProofProps> = ({
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
      loadGlobalSocialProof();
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

  const loadGlobalSocialProof = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('global_social_proof')
        .single();

      if (error) throw error;

      const globalConfig = data?.global_social_proof as any;
      if (globalConfig?.enabled) {
        setSocialProofConfig(globalConfig as SocialProofConfig);
      }
    } catch (error) {
      console.error('Erro ao carregar prova social global:', error);
    }
  };

  // Auto-hide após um tempo se não houver configuração
  useEffect(() => {
    if (!socialProofConfig?.enabled && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 10000); // 10 segundos

      return () => clearTimeout(timer);
    }
  }, [socialProofConfig, isVisible]);

  // Renderizar sempre se estiver habilitado
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
    switch (iconName) {
      case 'users':
        return <Users className="w-6 h-6 text-primary" />;
      case 'check':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'award':
        return <Award className="w-6 h-6 text-yellow-500" />;
      default:
        return <CheckCircle className="w-6 h-6 text-primary" />;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`${isMobile ? 'fixed bottom-4 left-4 right-4 z-50' : 'relative'} bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-4 shadow-lg ${className}`}
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
                  <div className="text-2xl font-bold text-primary">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Depoimentos */}
          {socialProofConfig.testimonials?.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center text-gray-800">
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
                      
                      <blockquote className="text-gray-700 italic mb-4">
                        "{socialProofConfig.testimonials[currentTestimonialIndex].text}"
                      </blockquote>
                      
                      <div className="text-center">
                        <div className="font-semibold text-gray-800">
                          {socialProofConfig.testimonials[currentTestimonialIndex].name}
                        </div>
                        {socialProofConfig.testimonials[currentTestimonialIndex].role && (
                          <div className="text-sm text-gray-600">
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
                          : 'bg-gray-300 hover:bg-gray-400'
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
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-lg"
            aria-label="Fechar prova social"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};