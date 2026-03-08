import React from 'react';
import { motion } from 'framer-motion';

interface LandingLogoCarouselProps {
  config: {
    title?: string;
    logos?: Array<{ image_url: string; alt?: string; url?: string }>;
    background_color?: string;
    text_color?: string;
    grayscale?: boolean;
    logo_height?: string;
  };
  primaryColor: string;
}

export const LandingLogoCarousel: React.FC<LandingLogoCarouselProps> = ({ config }) => {
  const logos = config.logos || [];
  const height = config.logo_height || '48px';

  return (
    <section
      className="py-10 md:py-14 px-4 overflow-hidden"
      style={{ backgroundColor: config.background_color || 'transparent', color: config.text_color }}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {config.title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl font-bold text-center"
          >
            {config.title}
          </motion.h2>
        )}
        <div className="relative">
          <div className="flex items-center gap-8 md:gap-12 overflow-x-auto pb-4 justify-center flex-wrap">
            {logos.map((logo, idx) => {
              const img = (
                <motion.img
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  src={logo.image_url}
                  alt={logo.alt || `Logo ${idx + 1}`}
                  style={{ height, maxHeight: height }}
                  className={`object-contain transition-all hover:scale-110 ${
                    config.grayscale ? 'grayscale hover:grayscale-0 opacity-60 hover:opacity-100' : ''
                  }`}
                />
              );
              return logo.url ? (
                <a key={idx} href={logo.url} target="_blank" rel="noopener noreferrer">{img}</a>
              ) : img;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
