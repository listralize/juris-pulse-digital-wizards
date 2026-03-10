import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface LandingFaqProps {
  config: {
    title?: string;
    subtitle?: string;
    items?: Array<{ question: string; answer: string }>;
    style?: 'accordion' | 'cards';
    columns?: number;
    background_color?: string;
    text_color?: string;
    accent_color?: string;
  };
  primaryColor: string;
}

export const LandingFaq: React.FC<LandingFaqProps> = ({ config, primaryColor }) => {
  const items = config.items || [];
  if (items.length === 0) return null;
  const style = config.style || 'accordion';
  const cols = config.columns || 1;
  const accent = config.accent_color || primaryColor;

  return (
    <section className="py-12 md:py-16 px-4"
      style={{ backgroundColor: config.background_color || 'transparent', color: config.text_color }}>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          {config.title && (
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold">{config.title}</motion.h2>
          )}
          {config.subtitle && <p className="text-lg opacity-80">{config.subtitle}</p>}
        </div>
        {style === 'cards' ? (
          <div className={`grid gap-4 grid-cols-1 ${cols >= 2 ? 'md:grid-cols-2' : ''}`}>
            {items.map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: idx * 0.06 }}
                className="p-5 rounded-2xl" style={{ backgroundColor: accent + '08', border: `1px solid ${accent}15` }}>
                <h3 className="font-bold mb-2">{item.question}</h3>
                <p className="text-sm opacity-75 leading-relaxed">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-2">
            {items.map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: idx * 0.05 }}>
                <AccordionItem value={`faq-${idx}`} className="rounded-xl px-4 border" style={{ borderColor: accent + '20' }}>
                  <AccordionTrigger className="font-semibold text-left">{item.question}</AccordionTrigger>
                  <AccordionContent className="opacity-80 leading-relaxed">{item.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        )}
      </div>
    </section>
  );
};
