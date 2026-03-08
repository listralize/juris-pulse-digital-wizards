import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LandingCountdownProps {
  config: {
    title?: string;
    subtitle?: string;
    target_date?: string;
    background_color?: string;
    text_color?: string;
    accent_color?: string;
    cta_text?: string;
    cta_url?: string;
    show_labels?: boolean;
  };
  primaryColor: string;
}

export const LandingCountdown: React.FC<LandingCountdownProps> = ({ config, primaryColor }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = config.target_date ? new Date(config.target_date).getTime() : Date.now() + 86400000;
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [config.target_date]);

  const accent = config.accent_color || primaryColor;
  const units = [
    { value: timeLeft.days, label: 'Dias' },
    { value: timeLeft.hours, label: 'Horas' },
    { value: timeLeft.minutes, label: 'Min' },
    { value: timeLeft.seconds, label: 'Seg' },
  ];

  return (
    <section
      className="py-12 md:py-16 px-4"
      style={{ backgroundColor: config.background_color || 'transparent', color: config.text_color }}
    >
      <div className="max-w-4xl mx-auto text-center space-y-6">
        {config.title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold"
          >
            {config.title}
          </motion.h2>
        )}
        {config.subtitle && <p className="text-lg opacity-80">{config.subtitle}</p>}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-3 md:gap-6"
        >
          {units.map((u) => (
            <div
              key={u.label}
              className="flex flex-col items-center rounded-2xl px-4 py-3 md:px-8 md:py-5 min-w-[70px] md:min-w-[100px]"
              style={{ backgroundColor: accent + '22', color: accent }}
            >
              <span className="text-3xl md:text-5xl font-extrabold tabular-nums">
                {String(u.value).padStart(2, '0')}
              </span>
              {(config.show_labels !== false) && (
                <span className="text-xs md:text-sm mt-1 opacity-70 uppercase tracking-wider">{u.label}</span>
              )}
            </div>
          ))}
        </motion.div>
        {config.cta_text && (
          <a
            href={config.cta_url || '#'}
            className="inline-block mt-4 px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-transform hover:scale-105"
            style={{ backgroundColor: accent }}
          >
            {config.cta_text}
          </a>
        )}
      </div>
    </section>
  );
};
