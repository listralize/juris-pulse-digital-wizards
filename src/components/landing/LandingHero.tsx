import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface LandingHeroProps {
  config: {
    headline?: string;
    subheadline?: string;
    body_text?: string;
    image_url?: string;
    cta_text?: string;
    cta_url?: string;
    background_color?: string;
    text_color?: string;
  };
  primaryColor: string;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ config, primaryColor }) => {
  return (
    <section
      className="relative py-16 md:py-24 px-4 overflow-hidden"
      style={{ backgroundColor: config.background_color || 'transparent', color: config.text_color }}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {config.headline && (
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              {config.headline}
            </h1>
          )}
          {config.subheadline && (
            <p className="text-lg md:text-xl opacity-90">
              {config.subheadline}
            </p>
          )}
          {config.body_text && (
            <p className="text-base opacity-80 leading-relaxed">
              {config.body_text}
            </p>
          )}
          {config.cta_text && (
            <Button
              size="lg"
              className="text-lg px-8 py-6 font-bold shadow-lg"
              style={{ backgroundColor: primaryColor, color: '#fff' }}
              onClick={() => {
                if (config.cta_url) {
                  if (config.cta_url.startsWith('#')) {
                    document.querySelector(config.cta_url)?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.open(config.cta_url, '_blank');
                  }
                }
              }}
            >
              {config.cta_text}
            </Button>
          )}
        </motion.div>

        {config.image_url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <img
              src={config.image_url}
              alt={config.headline || 'Hero'}
              className="rounded-2xl shadow-2xl max-w-full h-auto"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};
