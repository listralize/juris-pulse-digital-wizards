import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, CheckCircle, ShieldCheck } from 'lucide-react';

interface LandingGuaranteeProps {
  config: {
    title?: string;
    subtitle?: string;
    description?: string;
    days?: number;
    icon?: string;
    icon_type?: 'shield' | 'award' | 'check';
    badge_text?: string;
    background_color?: string;
    text_color?: string;
    accent_color?: string;
  };
  primaryColor: string;
}

const ICONS: Record<string, React.FC<{ className?: string }>> = {
  shield: Shield, 'shield-check': ShieldCheck, award: Award, check: CheckCircle,
};

export const LandingGuarantee: React.FC<LandingGuaranteeProps> = ({ config, primaryColor }) => {
  const accent = config.accent_color || primaryColor;
  const iconKey = config.icon || config.icon_type || 'shield';
  const Icon = ICONS[iconKey] || Shield;

  return (
    <section
      className="py-14 md:py-20 px-4"
      style={{ backgroundColor: config.background_color || 'transparent', color: config.text_color }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-8"
      >
        <div className="flex-shrink-0">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ border: `1px solid ${accent}30` }}
          >
            <Icon className="w-7 h-7" style={{ color: accent }} />
          </div>
        </div>
        <div className="text-center md:text-left space-y-2">
          {config.badge_text && (
            <span className="text-xs font-medium uppercase tracking-wide" style={{ color: accent }}>{config.badge_text}</span>
          )}
          {config.title && <h2 className="text-xl md:text-2xl font-bold">{config.title}</h2>}
          {config.days && (
            <div className="text-3xl font-extrabold" style={{ color: accent }}>
              {config.days} dias
            </div>
          )}
          {config.subtitle && <p className="text-sm opacity-70">{config.subtitle}</p>}
          {config.description && <p className="text-sm opacity-50 leading-relaxed">{config.description}</p>}
        </div>
      </motion.div>
    </section>
  );
};
