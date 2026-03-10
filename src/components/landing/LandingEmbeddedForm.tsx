import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, CheckCircle } from 'lucide-react';

interface LandingEmbeddedFormProps {
  config: {
    title?: string;
    subtitle?: string;
    form_fields?: Array<{
      name: string;
      type: string;
      placeholder?: string;
      required?: boolean;
      label?: string;
      options?: string[];
    }>;
    cta_text?: string;
    background_color?: string;
    text_color?: string;
    accent_color?: string;
    layout?: 'card' | 'inline' | 'floating';
    success_message?: string;
    phone_mask?: boolean;
  };
  primaryColor: string;
  onSubmit: (data: Record<string, string>) => Promise<void>;
  isSubmitting: boolean;
}

const formatPhone = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

export const LandingEmbeddedForm: React.FC<LandingEmbeddedFormProps> = ({
  config, primaryColor, onSubmit, isSubmitting
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const fields = config.form_fields || [];
  const layout = config.layout || 'card';
  const phoneMask = config.phone_mask !== false;
  const accent = config.accent_color || primaryColor;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="formulario" className="py-14 px-4" style={{ backgroundColor: config.background_color || 'transparent', color: config.text_color }}>
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center space-y-4 p-8 rounded-lg" style={{ border: `1px solid ${accent}20` }}>
          <CheckCircle className="w-12 h-12 mx-auto" style={{ color: accent }} />
          <h3 className="text-xl font-bold">{config.success_message || 'Enviado com sucesso!'}</h3>
          <p className="text-sm opacity-50">Entraremos em contato em breve.</p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="formulario" className="py-14 md:py-20 px-4"
      style={{ backgroundColor: config.background_color || 'transparent', color: config.text_color }}>
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className={`mx-auto space-y-6 ${
          layout === 'card' ? 'max-w-lg p-6 md:p-8 rounded-lg' :
          layout === 'floating' ? 'max-w-md p-8 rounded-lg' :
          'max-w-2xl'
        }`}
        style={
          layout === 'card' || layout === 'floating'
            ? { border: `1px solid ${accent}18` }
            : undefined
        }>
        {config.title && <h2 className="text-xl md:text-2xl font-bold text-center">{config.title}</h2>}
        {config.subtitle && <p className="text-center text-sm opacity-50">{config.subtitle}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          {fields.map((field, i) => {
            const isTel = field.type === 'tel' || field.name.toLowerCase().includes('telefone') || field.name.toLowerCase().includes('phone');
            return (
              <div key={i}>
                {field.label && <label className="block text-xs font-medium mb-1 opacity-70">{field.label}</label>}
                {field.type === 'select' && field.options ? (
                  <Select value={formData[field.name] || ''} onValueChange={(v) => setFormData(prev => ({ ...prev, [field.name]: v }))}>
                    <SelectTrigger className="h-11"><SelectValue placeholder={field.placeholder || 'Selecione...'} /></SelectTrigger>
                    <SelectContent>{field.options.map((opt, j) => <SelectItem key={j} value={opt}>{opt}</SelectItem>)}</SelectContent>
                  </Select>
                ) : field.type === 'textarea' ? (
                  <Textarea placeholder={field.placeholder} required={field.required}
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                    rows={3} className="min-h-[90px] text-sm" />
                ) : (
                  <Input
                    type={isTel && phoneMask ? 'text' : field.type || 'text'}
                    placeholder={field.placeholder}
                    required={field.required}
                    value={isTel && phoneMask ? formatPhone(formData[field.name] || '') : (formData[field.name] || '')}
                    onChange={(e) => {
                      const val = isTel && phoneMask ? e.target.value.replace(/\D/g, '') : e.target.value;
                      setFormData(prev => ({ ...prev, [field.name]: val }));
                    }}
                    maxLength={isTel && phoneMask ? 16 : undefined}
                    className="h-11 text-sm" />
                )}
              </div>
            );
          })}
          <Button type="submit" disabled={isSubmitting} className="w-full h-11 font-semibold text-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: accent, color: '#fff' }}>
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            {config.cta_text || 'Enviar'}
          </Button>
        </form>
      </motion.div>
    </section>
  );
};
