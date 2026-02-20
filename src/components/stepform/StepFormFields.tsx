import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Lock, Shield, CircleDot, ArrowRight } from 'lucide-react';
import { PhoneFieldWithDDD } from './PhoneFieldWithDDD';
import type { StepFormStep, StepFormData } from '@/types/stepFormTypes';

const isPhoneField = (field: { name: string; type: string }) => {
  const nameLower = field.name.toLowerCase();
  return field.type === 'tel' || nameLower.includes('telefone') || nameLower.includes('phone') || nameLower.includes('whatsapp');
};

interface StepFormFieldsProps {
  step: StepFormStep;
  styles: StepFormData['styles'];
  formData: Record<string, string>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  loading: boolean;
  onSubmit: () => void;
}

export const StepFormFields: React.FC<StepFormFieldsProps> = ({
  step, styles, formData, setFormData, loading, onSubmit
}) => {
  const primaryColor = styles.primary_color || '#4CAF50';

  return (
    <form noValidate onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-5">
      {/* Trust badge */}
      <div className="flex items-center gap-2 text-sm opacity-70 mb-2">
        <Lock className="w-4 h-4" />
        <span>100% Confidencial — seus dados estão protegidos</span>
      </div>

      {step.formFields?.map((field, index) => (
        <div key={index} className="space-y-1.5">
          <Label htmlFor={`field-${field.name}`} className="text-sm font-medium">
            {field.label || field.placeholder}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          {field.type === 'textarea' ? (
            <Textarea
              id={`field-${field.name}`}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              value={formData[field.name] || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
              className="min-h-[120px]"
            />
          ) : isPhoneField(field) ? (
            <PhoneFieldWithDDD
              name={field.name}
              value={formData[field.name] || ''}
              onChange={(val) => setFormData(prev => ({ ...prev, [field.name]: val }))}
              required={field.required}
            />
          ) : (
            <Input
              id={`field-${field.name}`}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              value={formData[field.name] || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
              className="h-12"
            />
          )}
        </div>
      ))}

      {/* Urgency indicator */}
      <div className="flex items-center gap-2 text-sm font-medium" style={{ color: primaryColor }}>
        <CircleDot className="w-3 h-3 animate-pulse" style={{ color: '#22c55e' }} />
        <span>Especialista disponível agora</span>
      </div>

      <Button
        type="button"
        onClick={onSubmit}
        className="w-full h-14 text-base font-semibold"
        disabled={loading}
        style={{
          backgroundColor: primaryColor,
          borderRadius: styles.button_style === 'rounded' ? '0.5rem' : '0.25rem',
        }}
      >
        {loading ? 'Enviando...' : (
          <span className="flex items-center gap-2">
            Quero minha consulta gratuita
            <ArrowRight className="w-5 h-5" />
          </span>
        )}
      </Button>

      <div className="flex items-center justify-center gap-1 text-xs opacity-60">
        <Shield className="w-3 h-3" />
        <span>Não compartilhamos seus dados com terceiros</span>
      </div>
    </form>
  );
};
