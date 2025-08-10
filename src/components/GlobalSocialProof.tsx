import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
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

const GlobalSocialProof: React.FC = () => {
  const [config, setConfig] = useState<SocialProofConfig | null>(null);

  useEffect(() => {
    const loadSocialProofConfig = async () => {
      try {
        const { data, error } = await supabase
          .from('admin_settings')
          .select('global_social_proof')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error('Erro ao carregar configuração de prova social:', error);
          return;
        }

        if (data && data.global_social_proof) {
          setConfig(data.global_social_proof as unknown as SocialProofConfig);
        }
      } catch (error) {
        console.error('Erro ao carregar prova social global:', error);
      }
    };

    loadSocialProofConfig();

    // Real-time updates
    const channel = supabase
      .channel('global_social_proof_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'admin_settings' },
        () => {
          loadSocialProofConfig();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (!config || !config.enabled) {
    return null;
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-gradient-to-r from-primary/5 via-background to-primary/5 border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Stats Section */}
          {config.stats && config.stats.length > 0 && (
            <div className="flex justify-center md:justify-start">
              <div className="grid grid-cols-2 gap-6">
                {config.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div 
                      className="text-3xl font-bold mb-1"
                      style={{ color: config.primaryColor || 'hsl(var(--primary))' }}
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

          {/* Testimonials Section */}
          {config.testimonials && config.testimonials.length > 0 && (
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
  );
};

export default GlobalSocialProof;