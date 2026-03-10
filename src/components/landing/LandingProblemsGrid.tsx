import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

interface LandingProblemsGridProps {
  config: {
    title?: string;
    subtitle?: string;
    items?: Array<{ title: string; description?: string; icon?: string }>;
    columns?: number;
    background_color?: string;
    text_color?: string;
    accent_color?: string;
  };
  primaryColor: string;
}

const getIcon = (name: string) => {
  const formatted = name.replace(/-./g, x => x[1].toUpperCase()).replace(/^./, x => x.toUpperCase());
  return (LucideIcons as any)[formatted] || LucideIcons.AlertTriangle;
};

export const LandingProblemsGrid: React.FC<LandingProblemsGridProps> = ({ config, primaryColor }) => {
  const items = config.items || [];
  const cols = config.columns || Math.min(items.length, 3);
  const accent = config.accent_color || primaryColor;

  return (
    <section className="py-14 md:py-20 px-4" style={{ backgroundColor: config.background_color || 'transparent', color: config.text_color }}>
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          {config.title && (
            <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold">{config.title}</motion.h2>
          )}
          {config.subtitle && <p className="text-sm opacity-60 max-w-lg mx-auto">{config.subtitle}</p>}
        </div>
        <div className={`grid gap-4 grid-cols-1 ${cols >= 2 ? 'md:grid-cols-2' : ''} ${cols >= 3 ? 'lg:grid-cols-3' : ''}`}>
          {items.map((item, idx) => {
            const Icon = getIcon(item.icon || 'alert-triangle');
            return (
              <motion.div key={idx} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: idx * 0.06 }}
                className="p-5 rounded-lg space-y-2"
                style={{ border: `1px solid ${accent}18` }}>
                <Icon className="w-5 h-5 opacity-70" style={{ color: accent }} />
                <h3 className="font-semibold text-sm">{item.title}</h3>
                {item.description && <p className="text-xs opacity-55 leading-relaxed">{item.description}</p>}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
