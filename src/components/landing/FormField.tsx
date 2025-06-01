
import React from 'react';
import { FormField as FormFieldType } from '../../types/adminTypes';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

interface FormFieldProps {
  field: FormFieldType;
  stepId: string;
  formData: Record<string, any>;
  updateFormField: (fieldId: string, value: any) => void;
  isDark: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  field,
  stepId,
  formData,
  updateFormField,
  isDark
}) => {
  const fieldId = `${stepId}-${field.id}`;
  const value = formData[fieldId] || '';
  const darkClass = isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black';

  switch (field.type) {
    case 'email':
      return (
        <div>
          <Label className="block text-sm font-medium mb-2">
            {field.label}
            {field.required && <span className="text-red-500">*</span>}
          </Label>
          <Input
            type="email"
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => updateFormField(fieldId, e.target.value)}
            required={field.required}
            className={darkClass}
          />
        </div>
      );
    case 'phone':
      return (
        <div>
          <Label className="block text-sm font-medium mb-2">
            {field.label}
            {field.required && <span className="text-red-500">*</span>}
          </Label>
          <Input
            type="tel"
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => updateFormField(fieldId, e.target.value)}
            required={field.required}
            className={darkClass}
          />
        </div>
      );
    case 'textarea':
      return (
        <div>
          <Label className="block text-sm font-medium mb-2">
            {field.label}
            {field.required && <span className="text-red-500">*</span>}
          </Label>
          <Textarea
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => updateFormField(fieldId, e.target.value)}
            required={field.required}
            className={darkClass}
            rows={4}
          />
        </div>
      );
    case 'select':
      return (
        <div>
          <Label className="block text-sm font-medium mb-2">
            {field.label}
            {field.required && <span className="text-red-500">*</span>}
          </Label>
          <Select value={value} onValueChange={(val) => updateFormField(fieldId, val)}>
            <SelectTrigger className={darkClass}>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option: string, index: number) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    case 'checkbox':
      return (
        <div className="flex items-center space-x-2">
          <Checkbox
            id={fieldId}
            checked={value}
            onCheckedChange={(checked) => updateFormField(fieldId, checked)}
          />
          <Label htmlFor={fieldId} className={`text-sm ${isDark ? 'text-white' : 'text-black'}`}>
            {field.label}
          </Label>
        </div>
      );
    default:
      return (
        <div>
          <Label className="block text-sm font-medium mb-2">
            {field.label}
            {field.required && <span className="text-red-500">*</span>}
          </Label>
          <Input
            type="text"
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => updateFormField(fieldId, e.target.value)}
            required={field.required}
            className={darkClass}
          />
        </div>
      );
  }
};

export default FormField;
