import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Star, Zap, Heart } from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  check: CheckCircle, star: Star, zap: Zap, heart: Heart,
};

interface LandingBenefitsProps {
  config: {
    title?: string;
    items?: Array<{ title?: string; description?: string; icon?: string }>;
    background_color?: string;
  };
  primaryColor: string;
}

export const LandingBenefits: React.FC<LandingBenefitsProps> = ({ config, primaryColor }) => {
  const items = config.items || [];

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
          {items.map((item, i) => {
            const Icon = iconMap[item.icon || 'check'] || CheckCircle;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex gap-4 p-5 rounded-xl border shadow-sm"
              >
                <Icon className="w-7 h-7 flex-shrink-0 mt-1" style={{ color: primaryColor }} />
                <div>
                  {item.title && <h3 className="font-bold mb-1">{item.title}</h3>}
                  {item.description && <p className="text-sm opacity-80">{item.description}</p>}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
