import React from 'react';
import { motion } from 'framer-motion';

interface LandingTextImageProps {
  config: {
    title?: string;
    text?: string;
    image_url?: string;
    image_position?: 'left' | 'right';
    background_color?: string;
  };
  primaryColor: string;
}

export const LandingTextImage: React.FC<LandingTextImageProps> = ({ config }) => {
  const imageRight = (config.image_position || 'right') === 'right';

  return (
    <section className="py-16 px-4" style={{ backgroundColor: config.background_color || 'transparent' }}>
      <div className={`max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center ${!imageRight ? 'direction-rtl' : ''}`}>
        <motion.div
          initial={{ opacity: 0, x: imageRight ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`space-y-4 ${!imageRight ? 'md:order-2' : ''}`}
        >
          {config.title && <h2 className="text-2xl md:text-3xl font-bold">{config.title}</h2>}
          {config.text && <p className="opacity-80 leading-relaxed whitespace-pre-line">{config.text}</p>}
        </motion.div>
        {config.image_url && (
          <motion.div
            initial={{ opacity: 0, x: imageRight ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={!imageRight ? 'md:order-1' : ''}
          >
            <img src={config.image_url} alt={config.title || ''} className="rounded-2xl shadow-lg max-w-full h-auto" />
          </motion.div>
        )}
      </div>
    </section>
  );
};
