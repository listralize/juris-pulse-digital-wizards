import React from 'react';
import { motion } from 'framer-motion';

interface LandingProcessStepsProps {
  config: {
    title?: string;
    subtitle?: string;
    background_color?: string;
    text_color?: string;
    accent_color?: string;
    layout?: 'vertical' | 'horizontal' | 'alternating';
    steps?: Array<{ number: string; title: string; description?: string }>;
  };
  primaryColor: string;
}

export const LandingProcessSteps: React.FC<LandingProcessStepsProps> = ({ config, primaryColor }) => {
  const steps = config.steps || [];
  const accent = config.accent_color || primaryColor;
  const layout = config.layout || 'vertical';

  return (
    <section
      className="py-14 md:py-20 px-4"
      style={{ backgroundColor: config.background_color || 'transparent', color: config.text_color }}
    >
      <div className="max-w-5xl mx-auto space-y-10">
        {(config.title || config.subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-2"
          >
            {config.title && <h2 className="text-2xl md:text-4xl font-bold">{config.title}</h2>}
            {config.subtitle && <p className="text-base md:text-lg opacity-70">{config.subtitle}</p>}
          </motion.div>
        )}

        {layout === 'horizontal' ? (
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="text-center space-y-3"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold mx-auto text-white"
                  style={{ backgroundColor: accent }}
                >
                  {step.number}
                </div>
                <h3 className="text-lg font-bold">{step.title}</h3>
                {step.description && <p className="text-sm opacity-70">{step.description}</p>}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-7 top-0 bottom-0 w-0.5 hidden md:block"
              style={{ backgroundColor: accent + '30' }}
            />
            <div className="space-y-8">
              {steps.map((step, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: layout === 'alternating' && !isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`flex items-start gap-4 md:gap-6 ${
                      layout === 'alternating' && !isEven ? 'md:flex-row-reverse md:text-right' : ''
                    }`}
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0 text-white relative z-10"
                      style={{ backgroundColor: accent }}
                    >
                      {step.number}
                    </div>
                    <div className="pt-2 space-y-1">
                      <h3 className="text-lg font-bold">{step.title}</h3>
                      {step.description && <p className="text-sm opacity-70 max-w-md">{step.description}</p>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
