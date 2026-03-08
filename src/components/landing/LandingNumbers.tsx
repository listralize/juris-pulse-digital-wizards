import React from 'react';
import { motion } from 'framer-motion';

interface LandingNumbersProps {
  config: {
    title?: string;
    items?: Array<{ number: string; label: string; suffix?: string; prefix?: string }>;
    columns?: number;
    background_color?: string;
    text_color?: string;
    accent_color?: string;
    style?: 'cards' | 'minimal' | 'bordered';
  };
  primaryColor: string;
}

export const LandingNumbers: React.FC<LandingNumbersProps> = ({ config, primaryColor }) => {
  const items = config.items || [];
  const cols = config.columns || Math.min(items.length, 4);
  const accent = config.accent_color || primaryColor;
  const style = config.style || 'cards';

  return (
    <section
      className="py-12 md:py-16 px-4"
      style={{ backgroundColor: config.background_color || 'transparent', color: config.text_color }}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {config.title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-center"
          >
            {config.title}
          </motion.h2>
        )}
        <div className={`grid gap-6`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`text-center p-6 rounded-2xl ${
                style === 'cards' ? 'shadow-lg' : style === 'bordered' ? 'border-2' : ''
              }`}
              style={{
                backgroundColor: style === 'cards' ? accent + '0D' : 'transparent',
                borderColor: style === 'bordered' ? accent + '33' : undefined,
              }}
            >
              <div className="text-3xl md:text-5xl font-extrabold" style={{ color: accent }}>
                {item.prefix}{item.number}{item.suffix}
              </div>
              <div className="text-sm md:text-base mt-2 opacity-70">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
