import React, { useEffect, useRef, useState } from 'react';
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

const AnimatedNumber: React.FC<{ target: string; prefix?: string; suffix?: string; color: string }> = ({
  target, prefix, suffix, color,
}) => {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const numericTarget = parseInt(target.replace(/\D/g, ''), 10);
          if (isNaN(numericTarget)) {
            setDisplay(target);
            return;
          }
          const duration = 1500;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.floor(numericTarget * eased).toLocaleString('pt-BR'));
            if (progress < 1) requestAnimationFrame(step);
            else setDisplay(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-4xl md:text-6xl font-extrabold tracking-tight" style={{ color }}>
      {prefix}{display}{suffix}
    </div>
  );
};

export const LandingNumbers: React.FC<LandingNumbersProps> = ({ config, primaryColor }) => {
  const items = config.items || [];
  const cols = config.columns || Math.min(items.length, 4);
  const accent = config.accent_color || primaryColor;

  return (
    <section
      className="py-14 md:py-20 px-4"
      style={{ backgroundColor: config.background_color || 'transparent', color: config.text_color }}
    >
      <div className="max-w-5xl mx-auto space-y-10">
        {config.title && (
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-center"
          >
            {config.title}
          </motion.h2>
        )}
        <div className={`grid gap-8 grid-cols-2 ${cols >= 3 ? 'md:grid-cols-3' : ''} ${cols >= 4 ? 'lg:grid-cols-4' : ''}`}>
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="text-center space-y-1"
            >
              <AnimatedNumber target={item.number} prefix={item.prefix} suffix={item.suffix} color={accent} />
              <div className="text-xs md:text-sm opacity-50 uppercase tracking-wide font-medium">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
