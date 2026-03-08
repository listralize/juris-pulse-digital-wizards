import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface LandingCtaBannerProps {
  config: {
    title?: string;
    subtitle?: string;
    button_text?: string;
    button_url?: string;
    background_color?: string;
    text_color?: string;
  };
  primaryColor: string;
}

export const LandingCtaBanner: React.FC<LandingCtaBannerProps> = ({ config, primaryColor }) => {
  return (
    <section
      className="py-12 px-4"
      style={{ backgroundColor: config.background_color || primaryColor, color: config.text_color || '#fff' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center space-y-4"
      >
        {config.title && <h2 className="text-2xl md:text-3xl font-bold">{config.title}</h2>}
        {config.subtitle && <p className="text-lg opacity-90">{config.subtitle}</p>}
        {config.button_text && (
          <Button
            size="lg"
            className="text-lg px-8 py-6 font-bold mt-4"
            style={{ backgroundColor: '#fff', color: config.background_color || primaryColor }}
            onClick={() => {
              if (config.button_url) {
                if (config.button_url.startsWith('#')) {
                  document.querySelector(config.button_url)?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.open(config.button_url, '_blank');
                }
              }
            }}
          >
            {config.button_text}
          </Button>
        )}
      </motion.div>
    </section>
  );
};
