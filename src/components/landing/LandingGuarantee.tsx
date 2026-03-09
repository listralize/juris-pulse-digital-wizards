import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, CheckCircle } from 'lucide-react';

interface LandingGuaranteeProps {
  config: {
    title?: string;
    subtitle?: string;
    description?: string;
    days?: number;
    icon_type?: 'shield' | 'award' | 'check';
    background_color?: string;
    text_color?: string;
    accent_color?: string;
  };
  primaryColor: string;
}

const ICONS = { shield: Shield, award: Award, check: CheckCircle };

export const LandingGuarantee: React.FC<LandingGuaranteeProps> = ({ config, primaryColor }) => {
  const accent = config.accent_color || primaryColor;
  const Icon = ICONS[config.icon_type || 'shield'] || Shield;

  return (
    <section
      className="py-14 md:py-20 px-4"
      style={{ backgroundColor: config.background_color || 'transparent', color: config.text_color }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center space-y-6"
      >
        <div
          className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto"
          style={{ backgroundColor: accent + '15' }}
        >
          <Icon className="w-10 h-10 md:w-12 md:h-12" style={{ color: accent }} />
        </div>
        {config.title && <h2 className="text-2xl md:text-3xl font-bold">{config.title}</h2>}
        {config.days && (
          <div className="text-4xl md:text-5xl font-extrabold" style={{ color: accent }}>
            {config.days} dias
          </div>
        )}
        {config.subtitle && <p className="text-lg opacity-80">{config.subtitle}</p>}
        {config.description && <p className="text-sm opacity-60 max-w-xl mx-auto">{config.description}</p>}
      </motion.div>
    </section>
  );
};
