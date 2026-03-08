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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="formulario" className="py-12 px-4" style={{ backgroundColor: config.background_color || 'transparent', color: config.text_color }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto text-center space-y-4 p-8 rounded-2xl" style={{ backgroundColor: primaryColor + '0D' }}>
          <CheckCircle className="w-16 h-16 mx-auto" style={{ color: primaryColor }} />
          <h3 className="text-2xl font-bold">{config.success_message || 'Enviado com sucesso!'}</h3>
          <p className="opacity-70">Entraremos em contato em breve.</p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="formulario" className="py-12 md:py-16 px-4"
      style={{ backgroundColor: config.background_color || 'transparent', color: config.text_color }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className={`mx-auto space-y-6 ${
          layout === 'card' ? 'max-w-xl p-6 md:p-8 rounded-2xl border shadow-xl' :
          layout === 'floating' ? 'max-w-md p-8 rounded-2xl shadow-2xl border' :
          'max-w-2xl'
        }`}
        style={
          layout === 'card' ? { backgroundColor: primaryColor + '05', borderColor: primaryColor + '20' } :
          layout === 'floating' ? { backgroundColor: '#fff', borderColor: primaryColor + '30' } :
          undefined
        }>
        {config.title && <h2 className="text-2xl md:text-3xl font-bold text-center">{config.title}</h2>}
        {config.subtitle && <p className="text-center opacity-80">{config.subtitle}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field, i) => {
            const isTel = field.type === 'tel' || field.name.toLowerCase().includes('telefone') || field.name.toLowerCase().includes('phone');
            return (
              <div key={i}>
                {field.label && <label className="block text-sm font-medium mb-1.5">{field.label}</label>}
                {field.type === 'select' && field.options ? (
                  <Select value={formData[field.name] || ''} onValueChange={(v) => setFormData(prev => ({ ...prev, [field.name]: v }))}>
                    <SelectTrigger><SelectValue placeholder={field.placeholder || 'Selecione...'} /></SelectTrigger>
                    <SelectContent>{field.options.map((opt, j) => <SelectItem key={j} value={opt}>{opt}</SelectItem>)}</SelectContent>
                  </Select>
                ) : field.type === 'textarea' ? (
                  <Textarea placeholder={field.placeholder} required={field.required}
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                    rows={3} className="min-h-[100px]" />
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
                    className="h-12" />
                )}
              </div>
            );
          })}
          <Button type="submit" disabled={isSubmitting} className="w-full h-12 text-lg font-bold shadow-lg"
            style={{ backgroundColor: primaryColor, color: '#fff' }}>
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
            {config.cta_text || 'Enviar'}
          </Button>
        </form>
      </motion.div>
    </section>
  );
};
