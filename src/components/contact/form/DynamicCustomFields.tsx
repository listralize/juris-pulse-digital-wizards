
import React from 'react';
import { FormField } from '../../../types/contactFormTypes';

interface DynamicCustomFieldsProps {
  customFields: FormField[];
  formData: { [key: string]: any };
  updateField: (field: string, value: string | boolean) => void;
  darkBackground?: boolean;
}

export const DynamicCustomFields: React.FC<DynamicCustomFieldsProps> = ({
  customFields,
  formData,
  updateField,
  darkBackground = false
}) => {
  const renderField = (field: FormField) => {
    const baseClassName = `w-full px-3 py-2 border rounded-md ${
      darkBackground 
        ? 'bg-white/5 border-white/20 text-white placeholder:text-white/40' 
        : 'bg-white border-gray-300 text-black'
    }`;

    const labelClassName = `block text-sm font-medium mb-1 ${
      darkBackground ? 'text-white/80' : 'text-gray-700'
    }`;

    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
        return (
          <div key={field.id}>
            <label className={labelClassName}>
              {field.label}
            </label>
            <input
              type={field.type}
              value={formData[field.name] || ''}
              onChange={(e) => updateField(field.name, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
              className={baseClassName}
            />
          </div>
        );

      case 'textarea':
        return (
          <div key={field.id}>
            <label className={labelClassName}>
              {field.label}
            </label>
            <textarea
              value={formData[field.name] || ''}
              onChange={(e) => updateField(field.name, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
              rows={4}
              className={`${baseClassName} resize-vertical`}
            />
          </div>
        );

      case 'select':
        return (
          <div key={field.id}>
            <label className={labelClassName}>
              {field.label}
            </label>
            <select
              value={formData[field.name] || ''}
              onChange={(e) => updateField(field.name, e.target.value)}
              required={field.required}
              className={baseClassName}
            >
              <option value="">{field.placeholder || 'Selecione uma opção'}</option>
              {field.options?.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.id} className="flex items-start space-x-3">
            <input
              type="checkbox"
              id={field.id}
              checked={formData[field.name] || false}
              onChange={(e) => updateField(field.name, e.target.checked)}
              className={`mt-1 ${darkBackground ? 'border-white/40' : ''}`}
            />
            <label htmlFor={field.id} className={`text-sm ${darkBackground ? 'text-white/80' : 'text-gray-700'}`}>
              {field.label}
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  // Ordena os campos pela propriedade order
  const sortedFields = [...customFields].sort((a, b) => a.order - b.order);

  return (
    <>
      {sortedFields.map(renderField)}
    </>
  );
};
