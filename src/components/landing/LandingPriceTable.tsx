import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface LandingPriceTableProps {
  config: {
    title?: string;
    subtitle?: string;
    background_color?: string;
    text_color?: string;
    plans?: Array<{
      name: string;
      price: string;
      period?: string;
      features?: string[];
      cta_text?: string;
      cta_url?: string;
      highlighted?: boolean;
    }>;
  };
  primaryColor: string;
}

export const LandingPriceTable: React.FC<LandingPriceTableProps> = ({ config, primaryColor }) => {
  const plans = config.plans || [];

  const handleCta = (url?: string) => {
    if (!url) return;
    if (url.startsWith('#')) {
      document.querySelector(url)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <section
      className="py-14 md:py-20 px-4"
      style={{ backgroundColor: config.background_color || 'transparent', color: config.text_color }}
    >
      <div className="max-w-6xl mx-auto space-y-10">
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
        <div className={`grid gap-6 ${plans.length <= 2 ? 'md:grid-cols-2 max-w-3xl mx-auto' : 'md:grid-cols-3'}`}>
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative rounded-2xl p-6 md:p-8 flex flex-col ${
                plan.highlighted
                  ? 'shadow-xl ring-2 scale-[1.02]'
                  : 'shadow-md border'
              }`}
              style={{
                borderColor: plan.highlighted ? primaryColor : undefined,
                boxShadow: plan.highlighted ? `0 0 0 2px ${primaryColor}` : undefined,
                backgroundColor: plan.highlighted ? primaryColor + '08' : undefined,
              }}
            >
              {plan.highlighted && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  Popular
                </span>
              )}
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl md:text-4xl font-extrabold" style={{ color: plan.highlighted ? primaryColor : undefined }}>
                  {plan.price}
                </div>
                {plan.period && <span className="text-sm opacity-60">/{plan.period}</span>}
              </div>
              <ul className="space-y-3 flex-1 mb-6">
                {(plan.features || []).map((feat, fi) => (
                  <li key={fi} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: primaryColor }} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full font-bold"
                size="lg"
                style={plan.highlighted ? { backgroundColor: primaryColor, color: '#fff' } : undefined}
                variant={plan.highlighted ? 'default' : 'outline'}
                onClick={() => handleCta(plan.cta_url)}
              >
                {plan.cta_text || 'Começar'}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
