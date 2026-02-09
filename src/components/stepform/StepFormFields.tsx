import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { StepFormStep, StepFormData } from '@/types/stepFormTypes';

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
  return (
    <form noValidate onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-4">
      {step.formFields?.map((field, index) => (
        <div key={index}>
          {field.type === 'textarea' ? (
            <Textarea
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              value={formData[field.name] || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
              className="min-h-[120px]"
            />
          ) : (
            <Input
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

      <Button
        type="button"
        onClick={onSubmit}
        className="w-full h-12"
        disabled={loading}
        style={{
          backgroundColor: styles.primary_color || '#4CAF50',
          borderRadius: styles.button_style === 'rounded' ? '0.5rem' : '0.25rem'
        }}
      >
        {loading ? 'Enviando...' : 'Enviar Formulário'}
      </Button>
    </form>
  );
};
