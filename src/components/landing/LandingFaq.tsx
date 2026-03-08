import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface LandingFaqProps {
  config: {
    title?: string;
    items?: Array<{ question?: string; answer?: string }>;
    background_color?: string;
  };
  primaryColor: string;
}

export const LandingFaq: React.FC<LandingFaqProps> = ({ config }) => {
  const items = config.items || [];
  if (items.length === 0) return null;

  return (
    <section className="py-16 px-4" style={{ backgroundColor: config.background_color || 'transparent' }}>
      <div className="max-w-3xl mx-auto">
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
        <Accordion type="single" collapsible className="space-y-3">
          {items.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl px-4">
              <AccordionTrigger className="text-left font-semibold">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="opacity-80">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
