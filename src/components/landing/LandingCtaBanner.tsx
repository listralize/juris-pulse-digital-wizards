import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageCircle, ArrowRight, Sparkles } from 'lucide-react';

const ICONS: Record<string, React.FC<{ className?: string }>> = {
  whatsapp: MessageCircle, arrow: ArrowRight, sparkles: Sparkles,
};

interface LandingCtaBannerProps {
  config: {
    title?: string;
    subtitle?: string;
    button_text?: string;
    button_url?: string;
    background_color?: string;
    text_color?: string;
    button_color?: string;
    icon?: string;
    whatsapp_url?: string;
    style?: 'solid' | 'gradient' | 'outlined';
  };
  primaryColor: string;
}

export const LandingCtaBanner: React.FC<LandingCtaBannerProps> = ({ config, primaryColor }) => {
  const btnColor = config.button_color || '#fff';
  const Icon = ICONS[config.icon || ''];
  const style = config.style || 'solid';
  const bg = config.background_color || primaryColor;

  return (
    <section className="py-12 md:py-16 px-4"
      style={{
        background: style === 'gradient' ? `linear-gradient(135deg, ${bg}, ${bg}CC)` : style === 'outlined' ? 'transparent' : bg,
        color: config.text_color || '#fff',
        border: style === 'outlined' ? `2px solid ${bg}` : undefined,
      }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center space-y-6">
        {config.title && <h2 className="text-2xl md:text-4xl font-bold">{config.title}</h2>}
        {config.subtitle && <p className="text-lg opacity-90">{config.subtitle}</p>}
        <div className="flex gap-3 justify-center flex-wrap">
          {config.button_text && (
            <Button size="lg" className="text-lg px-8 py-6 font-bold shadow-lg inline-flex items-center gap-2"
              style={{ backgroundColor: btnColor, color: bg }}
              onClick={() => {
                const url = config.button_url;
                if (url?.startsWith('#')) document.querySelector(url)?.scrollIntoView({ behavior: 'smooth' });
                else if (url) window.open(url, '_blank');
              }}>
              {Icon && <Icon className="w-5 h-5" />}
              {config.button_text}
            </Button>
          )}
          {config.whatsapp_url && (
            <a href={config.whatsapp_url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-transform hover:scale-105"
              style={{ backgroundColor: '#25D366' }}>
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </a>
          )}
        </div>
      </motion.div>
    </section>
  );
};
