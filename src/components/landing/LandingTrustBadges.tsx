import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Lock, CheckCircle, Award, Users } from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  shield: Shield, clock: Clock, lock: Lock, check: CheckCircle, award: Award, users: Users,
};

interface LandingTrustBadgesProps {
  config: {
    items?: Array<{ icon?: string; text?: string }>;
    background_color?: string;
  };
  primaryColor: string;
}

export const LandingTrustBadges: React.FC<LandingTrustBadgesProps> = ({ config, primaryColor }) => {
  const items = config.items || [];
  if (items.length === 0) return null;

  return (
    <section className="py-8 px-4" style={{ backgroundColor: config.background_color || 'transparent' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {items.map((item, i) => {
            const Icon = iconMap[item.icon || 'shield'] || Shield;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm"
              >
                <Icon className="w-5 h-5 flex-shrink-0" style={{ color: primaryColor }} />
                <span className="text-sm font-medium">{item.text}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
