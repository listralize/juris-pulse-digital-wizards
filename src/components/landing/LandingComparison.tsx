import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface LandingComparisonProps {
  config: Record<string, any>;
  primaryColor: string;
}

export const LandingComparison: React.FC<LandingComparisonProps> = ({ config, primaryColor }) => {
  const title = config.title || 'Compare';
  const leftTitle = config.left_title || 'Sem Advogado';
  const rightTitle = config.right_title || 'Com Advogado';
  const items = config.items || [];
  const layout = config.layout || 'table';

  return (
    <section className="py-14 md:py-20 px-4" style={{ backgroundColor: config.background_color || 'transparent', color: config.text_color }}>
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          {config.subtitle && <p className="text-sm opacity-60 max-w-lg mx-auto">{config.subtitle}</p>}
        </motion.div>

        {layout === 'cards' ? (
          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-lg p-6 space-y-4" style={{ border: '1px solid rgba(239,68,68,0.15)' }}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-center opacity-50" style={{ color: config.left_color || '#ef4444' }}>{leftTitle}</h3>
              <ul className="space-y-3">
                {items.map((item: any, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <X className="w-4 h-4 mt-0.5 flex-shrink-0 opacity-50" style={{ color: config.left_color || '#ef4444' }} />
                    <span className="text-sm opacity-70">{item.left_text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg p-6 space-y-4" style={{ border: `1px solid ${primaryColor}25` }}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-center" style={{ color: config.right_color || primaryColor }}>{rightTitle}</h3>
              <ul className="space-y-3">
                {items.map((item: any, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: config.right_color || primaryColor }} />
                    <span className="text-sm font-medium">{item.right_text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border overflow-hidden" style={{ borderColor: primaryColor + '15' }}>
            <div className="grid grid-cols-3">
              <div className="p-4 border-b" style={{ borderColor: primaryColor + '15' }} />
              <div className="p-4 border-b text-center font-semibold text-xs uppercase tracking-wide opacity-50" style={{ color: config.left_color || '#ef4444', borderColor: primaryColor + '15' }}>{leftTitle}</div>
              <div className="p-4 border-b text-center font-semibold text-xs uppercase tracking-wide" style={{ color: primaryColor, borderColor: primaryColor + '15' }}>{rightTitle}</div>
            </div>
            {items.map((item: any, i: number) => (
              <div key={i} className="grid grid-cols-3" style={{ backgroundColor: i % 2 === 0 ? primaryColor + '04' : 'transparent' }}>
                <div className="p-3 border-b text-sm" style={{ borderColor: primaryColor + '10' }}>{item.feature || `Item ${i + 1}`}</div>
                <div className="p-3 border-b text-center text-sm opacity-60" style={{ borderColor: primaryColor + '10' }}>{item.left_text}</div>
                <div className="p-3 border-b text-center text-sm font-medium" style={{ color: primaryColor, borderColor: primaryColor + '10' }}>{item.right_text}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
