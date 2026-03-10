import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Award, CheckCircle, Lock, Star, Heart, Zap, Globe } from 'lucide-react';

const ICONS: Record<string, React.FC<{ className?: string }>> = {
  shield: Shield, clock: Clock, award: Award, check: CheckCircle,
  'check-circle': CheckCircle, lock: Lock, star: Star, heart: Heart, zap: Zap, globe: Globe,
};

interface LandingTrustBadgesProps {
  config: {
    items?: Array<{ icon?: string; text: string; description?: string }>;
    background_color?: string;
    text_color?: string;
    style?: 'pill' | 'card' | 'minimal' | 'icon_row';
    columns?: number;
  };
  primaryColor: string;
}

export const LandingTrustBadges: React.FC<LandingTrustBadgesProps> = ({ config, primaryColor }) => {
  const items = config.items || [];
  if (items.length === 0) return null;

  return (
    <section
      className="py-6 md:py-8 px-4"
      style={{ backgroundColor: config.background_color || 'transparent', color: config.text_color }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {items.map((item, idx) => {
            const Icon = ICONS[item.icon || 'shield'] || Shield;
            return (
              <React.Fragment key={idx}>
                {idx > 0 && (
                  <span className="hidden md:inline text-xs opacity-20" style={{ color: config.text_color }}>|</span>
                )}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.04 }}
                  className="flex items-center gap-2 text-xs md:text-sm font-medium opacity-80"
                >
                  <Icon className="w-4 h-4 flex-shrink-0" style={{ color: primaryColor }} />
                  <span>{item.text}</span>
                </motion.div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};
