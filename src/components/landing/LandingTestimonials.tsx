import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface LandingTestimonialsProps {
  config: {
    title?: string;
    items?: Array<{ name?: string; text?: string; rating?: number; image?: string }>;
    background_color?: string;
  };
  primaryColor: string;
}

export const LandingTestimonials: React.FC<LandingTestimonialsProps> = ({ config, primaryColor }) => {
  const items = config.items || [];
  if (items.length === 0) return null;

  return (
    <section className="py-16 px-4" style={{ backgroundColor: config.background_color || 'transparent' }}>
      <div className="max-w-6xl mx-auto">
        {config.title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold text-center mb-10"
          >
            {config.title}
          </motion.h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-6 rounded-2xl border shadow-sm"
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: item.rating || 5 }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-current" style={{ color: primaryColor }} />
                ))}
              </div>
              {item.text && <p className="text-sm mb-4 opacity-80 italic">"{item.text}"</p>}
              <div className="flex items-center gap-3">
                {item.image && (
                  <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                )}
                {item.name && <span className="font-semibold text-sm">{item.name}</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
