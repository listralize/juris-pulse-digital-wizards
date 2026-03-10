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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.08 }}
      className="p-6 rounded-lg space-y-4 relative"
      style={{ border: `1px solid ${accent}12` }}
    >
      {/* Decorative quote */}
      <span className="absolute top-4 right-5 text-5xl font-serif opacity-[0.07] leading-none select-none" style={{ color: accent }}>"</span>

      {showStars && (item.rating ?? 5) > 0 && (
        <div className="flex gap-0.5">
          {Array.from({ length: item.rating || 5 }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: '#FBBF24' }} />
          ))}
        </div>
      )}
      <p className="text-sm opacity-80 leading-relaxed">{item.text}</p>
      <div className="flex items-center gap-3 pt-1">
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-9 h-9 rounded-full object-cover" />
        ) : (
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-xs"
            style={{ backgroundColor: accent + '60' }}>
            {item.name.charAt(0)}
          </div>
        )}
        <div>
          <div className="font-medium text-sm flex items-center gap-1">
            {item.name}
            {config.verified_badge && <CheckCircle className="w-3 h-3" style={{ color: accent }} />}
          </div>
          {item.role && <div className="text-xs opacity-40">{item.role}</div>}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="py-14 md:py-20 px-4"
      style={{ backgroundColor: config.background_color || 'transparent', color: config.text_color }}>
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          {config.title && (
            <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold">{config.title}</motion.h2>
          )}
          {config.subtitle && <p className="text-sm opacity-60">{config.subtitle}</p>}
        </div>
        {layout === 'carousel' ? (
          <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory">
            {items.map((item, idx) => (
              <div key={idx} className="min-w-[280px] max-w-[320px] snap-center flex-shrink-0">
                {renderCard(item, idx)}
              </div>
            ))}
          </div>
        ) : (
          <div className={`grid gap-5 grid-cols-1 ${cols >= 2 ? 'md:grid-cols-2' : ''} ${cols >= 3 ? 'lg:grid-cols-3' : ''}`}>
            {items.map(renderCard)}
          </div>
        )}
      </div>
    </section>
  );
};
