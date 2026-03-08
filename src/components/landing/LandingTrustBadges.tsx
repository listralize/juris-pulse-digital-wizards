import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Award, CheckCircle, Lock, Star, Heart, Zap } from 'lucide-react';

const ICONS: Record<string, React.FC<{ className?: string }>> = {
  shield: Shield, clock: Clock, award: Award, check: CheckCircle,
  lock: Lock, star: Star, heart: Heart, zap: Zap,
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
  const style = config.style || 'pill';
  const cols = config.columns || Math.min(items.length, 4);

  return (
    <section
      className="py-8 md:py-12 px-4"
      style={{ backgroundColor: config.background_color || 'transparent', color: config.text_color }}
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`flex flex-wrap justify-center ${
            style === 'card' ? 'grid gap-4' : 'gap-3 md:gap-5'
          }`}
          style={style === 'card' ? { gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` } : undefined}
        >
          {items.map((item, idx) => {
            const Icon = ICONS[item.icon || 'shield'] || Shield;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={
                  style === 'pill'
                    ? 'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium'
                    : style === 'card'
                    ? 'flex flex-col items-center gap-2 p-5 rounded-2xl text-center'
                    : style === 'icon_row'
                    ? 'flex flex-col items-center gap-1 text-center min-w-[80px]'
                    : 'flex items-center gap-2 text-sm'
                }
                style={{
                  backgroundColor:
                    style === 'pill' ? primaryColor + '15' :
                    style === 'card' ? primaryColor + '08' : 'transparent',
                  borderColor: style === 'card' ? primaryColor + '20' : undefined,
                  border: style === 'card' ? '1px solid' : undefined,
                }}
              >
                <Icon className="w-5 h-5 flex-shrink-0" style={{ color: primaryColor }} />
                <span className="font-medium">{item.text}</span>
                {style === 'card' && item.description && (
                  <span className="text-xs opacity-60">{item.description}</span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
