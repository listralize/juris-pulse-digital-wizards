import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Shield, Zap, Heart, Award } from 'lucide-react';

const ICONS: Record<string, React.FC<{ className?: string }>> = {
  check: Check, star: Star, shield: Shield, zap: Zap, heart: Heart, award: Award,
};

interface LandingBenefitsProps {
  config: {
    title?: string;
    subtitle?: string;
    items?: Array<{ title: string; description?: string; icon?: string }>;
    layout?: 'grid' | 'list' | 'alternating';
    columns?: number;
    background_color?: string;
    text_color?: string;
    icon_color?: string;
  };
  primaryColor: string;
}

export const LandingBenefits: React.FC<LandingBenefitsProps> = ({ config, primaryColor }) => {
  const items = config.items || [];
  const layout = config.layout || 'grid';
  const cols = config.columns || 3;
  const iconColor = config.icon_color || primaryColor;

  return (
    <section
      className="py-12 md:py-16 px-4"
      style={{ backgroundColor: config.background_color || 'transparent', color: config.text_color }}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          {config.title && (
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold">{config.title}</motion.h2>
          )}
          {config.subtitle && <p className="text-lg opacity-80">{config.subtitle}</p>}
        </div>
        {layout === 'list' ? (
          <div className="max-w-2xl mx-auto space-y-4">
            {items.map((item, idx) => {
              const Icon = ICONS[item.icon || 'check'] || Check;
              return (
                <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
                  className="flex items-start gap-4 p-4 rounded-xl" style={{ backgroundColor: iconColor + '08' }}>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: iconColor + '20' }}>
                    <Icon className="w-5 h-5" style={{ color: iconColor }} />
                  </div>
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    {item.description && <p className="text-sm opacity-70 mt-1">{item.description}</p>}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : layout === 'alternating' ? (
          <div className="max-w-4xl mx-auto space-y-8">
            {items.map((item, idx) => {
              const Icon = ICONS[item.icon || 'check'] || Check;
              const isEven = idx % 2 === 0;
              return (
                <motion.div key={idx} initial={{ opacity: 0, x: isEven ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} className={`flex items-center gap-6 ${isEven ? '' : 'flex-row-reverse'}`}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: iconColor + '15' }}>
                    <Icon className="w-8 h-8" style={{ color: iconColor }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    {item.description && <p className="opacity-70 mt-1">{item.description}</p>}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className={`grid gap-6 grid-cols-1 ${cols >= 2 ? 'md:grid-cols-2' : ''} ${cols >= 3 ? 'lg:grid-cols-3' : ''} ${cols >= 4 ? 'xl:grid-cols-4' : ''}`}>
            {items.map((item, idx) => {
              const Icon = ICONS[item.icon || 'check'] || Check;
              return (
                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
                  className="p-6 rounded-2xl text-center space-y-3" style={{ backgroundColor: iconColor + '08' }}>
                  <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: iconColor + '20' }}>
                    <Icon className="w-6 h-6" style={{ color: iconColor }} />
                  </div>
                  <h3 className="font-bold">{item.title}</h3>
                  {item.description && <p className="text-sm opacity-70">{item.description}</p>}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
