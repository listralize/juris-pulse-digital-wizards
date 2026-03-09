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
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
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
    <div ref={ref} className="text-3xl md:text-5xl font-extrabold" style={{ color }}>
      {prefix}{display}{suffix}
    </div>
  );
};

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
        <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
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
              <AnimatedNumber target={item.number} prefix={item.prefix} suffix={item.suffix} color={accent} />
              <div className="text-sm md:text-base mt-2 opacity-70">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
