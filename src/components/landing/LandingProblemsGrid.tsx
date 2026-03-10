import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, XCircle, HelpCircle, AlertCircle, Ban, ShieldAlert } from 'lucide-react';

const ICONS: Record<string, React.FC<{ className?: string }>> = {
  alert: AlertTriangle, x: XCircle, help: HelpCircle, info: AlertCircle, ban: Ban, shield: ShieldAlert,
};

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

export const LandingProblemsGrid: React.FC<LandingProblemsGridProps> = ({ config, primaryColor }) => {
  const items = config.items || [];
  const cols = config.columns || Math.min(items.length, 3);
  const accent = config.accent_color || '#EF4444';

  return (
    <section className="py-12 md:py-16 px-4" style={{ backgroundColor: config.background_color || 'transparent', color: config.text_color }}>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          {config.title && (
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold">{config.title}</motion.h2>
          )}
          {config.subtitle && <p className="text-lg opacity-80">{config.subtitle}</p>}
        </div>
        <div className={`grid gap-4 grid-cols-1 ${cols >= 2 ? 'md:grid-cols-2' : ''} ${cols >= 3 ? 'lg:grid-cols-3' : ''} ${cols >= 4 ? 'xl:grid-cols-4' : ''}`}>
          {items.map((item, idx) => {
            const Icon = ICONS[item.icon || 'alert'] || AlertTriangle;
            return (
              <motion.div key={idx} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
                className="p-5 rounded-2xl space-y-2" style={{ backgroundColor: accent + '0A', border: `1px solid ${accent}20` }}>
                <Icon className="w-6 h-6" style={{ color: accent }} />
                <h3 className="font-bold">{item.title}</h3>
                {item.description && <p className="text-sm opacity-70">{item.description}</p>}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
