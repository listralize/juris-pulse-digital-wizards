import React from 'react';
import { motion } from 'framer-motion';

interface LandingTextImageProps {
  config: {
    title?: string;
    text?: string;
    image_url?: string;
    image_position?: 'left' | 'right';
    background_color?: string;
    text_color?: string;
    cta_text?: string;
    cta_url?: string;
  };
  primaryColor: string;
}

export const LandingTextImage: React.FC<LandingTextImageProps> = ({ config, primaryColor }) => {
  const isLeft = config.image_position === 'left';

  return (
    <section className="py-12 md:py-16 px-4" style={{ backgroundColor: config.background_color || 'transparent', color: config.text_color }}>
      <div className={`max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center`}>
        <motion.div initial={{ opacity: 0, x: isLeft ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} className={`space-y-4 ${isLeft ? 'md:order-2' : ''}`}>
          {config.title && <h2 className="text-2xl md:text-3xl font-bold">{config.title}</h2>}
          {config.text && <p className="opacity-80 leading-relaxed whitespace-pre-line">{config.text}</p>}
          {config.cta_text && (
            <a href={config.cta_url || '#'} className="inline-block mt-2 px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-transform hover:scale-105"
              style={{ backgroundColor: primaryColor }}>{config.cta_text}</a>
          )}
        </motion.div>
        {config.image_url && (
          <motion.div initial={{ opacity: 0, x: isLeft ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} className={isLeft ? 'md:order-1' : ''}>
            <img src={config.image_url} alt={config.title || ''} className="rounded-2xl shadow-xl w-full h-auto" />
          </motion.div>
        )}
      </div>
    </section>
  );
};
