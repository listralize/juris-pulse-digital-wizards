import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

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
  };
  primaryColor: string;
  onSubmit: (data: Record<string, string>) => Promise<void>;
  isSubmitting: boolean;
}

export const LandingEmbeddedForm: React.FC<LandingEmbeddedFormProps> = ({
  config, primaryColor, onSubmit, isSubmitting
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const fields = config.form_fields || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <section id="formulario" className="py-16 px-4" style={{ backgroundColor: config.background_color || 'transparent' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto"
      >
        {config.title && (
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">{config.title}</h2>
        )}
        {config.subtitle && (
          <p className="text-center opacity-80 mb-8">{config.subtitle}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 p-6 md:p-8 rounded-2xl border shadow-xl bg-white/5 backdrop-blur-sm">
          {fields.map((field, i) => (
            <div key={i}>
              {field.label && <label className="block text-sm font-medium mb-1">{field.label}</label>}
              {field.type === 'select' && field.options ? (
                <Select
                  value={formData[field.name] || ''}
                  onValueChange={(v) => setFormData(prev => ({ ...prev, [field.name]: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={field.placeholder || 'Selecione...'} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((opt, j) => (
                      <SelectItem key={j} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field.type === 'textarea' ? (
                <Textarea
                  placeholder={field.placeholder}
                  required={field.required}
                  value={formData[field.name] || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                  rows={3}
                />
              ) : (
                <Input
                  type={field.type || 'text'}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={formData[field.name] || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                />
              )}
            </div>
          ))}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-lg py-6 font-bold"
            style={{ backgroundColor: primaryColor, color: '#fff' }}
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
            {config.cta_text || 'Enviar'}
          </Button>
        </form>
      </motion.div>
    </section>
  );
};
