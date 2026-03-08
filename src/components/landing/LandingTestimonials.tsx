import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle } from 'lucide-react';

interface LandingTestimonialsProps {
  config: {
    title?: string;
    subtitle?: string;
    items?: Array<{ name: string; text: string; rating?: number; image?: string; role?: string }>;
    layout?: 'grid' | 'carousel' | 'cards';
    columns?: number;
    show_stars?: boolean;
    verified_badge?: boolean;
    background_color?: string;
    text_color?: string;
    accent_color?: string;
  };
  primaryColor: string;
}

export const LandingTestimonials: React.FC<LandingTestimonialsProps> = ({ config, primaryColor }) => {
  const items = config.items || [];
  if (items.length === 0) return null;
  const layout = config.layout || 'grid';
  const cols = config.columns || Math.min(items.length, 3);
  const showStars = config.show_stars !== false;
  const accent = config.accent_color || primaryColor;

  const renderCard = (item: typeof items[0], idx: number) => (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      className="p-6 rounded-2xl space-y-4"
      style={{ backgroundColor: accent + '08', border: `1px solid ${accent}15` }}
    >
      {showStars && (item.rating ?? 5) > 0 && (
        <div className="flex gap-0.5">
          {Array.from({ length: item.rating || 5 }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" style={{ color: '#FBBF24' }} />
          ))}
        </div>
      )}
      <p className="italic opacity-90 leading-relaxed">"{item.text}"</p>
      <div className="flex items-center gap-3">
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: accent }}>
            {item.name.charAt(0)}
          </div>
        )}
        <div>
          <div className="font-semibold text-sm flex items-center gap-1">
            {item.name}
            {config.verified_badge && <CheckCircle className="w-3.5 h-3.5" style={{ color: accent }} />}
          </div>
          {item.role && <div className="text-xs opacity-60">{item.role}</div>}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="py-12 md:py-16 px-4"
      style={{ backgroundColor: config.background_color || 'transparent', color: config.text_color }}>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          {config.title && (
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold">{config.title}</motion.h2>
          )}
          {config.subtitle && <p className="text-lg opacity-80">{config.subtitle}</p>}
        </div>
        {layout === 'carousel' ? (
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
            {items.map((item, idx) => (
              <div key={idx} className="min-w-[300px] max-w-[350px] snap-center flex-shrink-0">
                {renderCard(item, idx)}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
            {items.map(renderCard)}
          </div>
        )}
      </div>
    </section>
  );
};
