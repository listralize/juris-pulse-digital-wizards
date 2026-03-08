import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, XCircle, Ban, ShieldAlert } from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  alert: AlertTriangle, x: XCircle, ban: Ban, shield: ShieldAlert,
};

interface LandingProblemsGridProps {
  config: {
    title?: string;
    subtitle?: string;
    items?: Array<{ title?: string; description?: string; icon?: string }>;
    background_color?: string;
  };
  primaryColor: string;
}

export const LandingProblemsGrid: React.FC<LandingProblemsGridProps> = ({ config, primaryColor }) => {
  const items = config.items || [];

  return (
    <section className="py-16 px-4" style={{ backgroundColor: config.background_color || 'transparent' }}>
      <div className="max-w-6xl mx-auto">
        {config.title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold text-center mb-4"
          >
            {config.title}
          </motion.h2>
        )}
        {config.subtitle && (
          <p className="text-center opacity-80 mb-10 max-w-2xl mx-auto">{config.subtitle}</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => {
            const Icon = iconMap[item.icon || 'alert'] || AlertTriangle;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow"
              >
                <Icon className="w-8 h-8 mb-4" style={{ color: primaryColor }} />
                {item.title && <h3 className="text-lg font-bold mb-2">{item.title}</h3>}
                {item.description && <p className="text-sm opacity-80">{item.description}</p>}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
