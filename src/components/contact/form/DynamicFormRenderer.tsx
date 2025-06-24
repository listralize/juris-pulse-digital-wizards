
import React from 'react';
import { FormField } from '../../../types/contactFormTypes';
import NamePhoneFields from './NamePhoneFields';
import EmailField from './EmailField';
import MessageField from './MessageField';
import ServiceSelectField from './ServiceSelectField';
import UrgentCheckbox from './UrgentCheckbox';
import { DynamicCustomFields } from './DynamicCustomFields';

interface DynamicFormRendererProps {
  formFields: FormField[];
  serviceOptions: Array<{ value: string; label: string }>;
  formData: Record<string, any>;
  updateField: (field: string, value: string | boolean) => void;
  darkBackground?: boolean;
}

export const DynamicFormRenderer: React.FC<DynamicFormRendererProps> = ({
  formFields,
  serviceOptions,
  formData,
  updateField,
  darkBackground = false
}) => {
  // Separar campos padrão dos personalizados
  const defaultFields = formFields.filter(field => field.isDefault && !field.disabled);
  const customFields = formFields.filter(field => !field.isDefault && !field.disabled);

  const hasNameField = defaultFields.some(field => field.name === 'name');
  const hasPhoneField = defaultFields.some(field => field.name === 'phone');
  const hasEmailField = defaultFields.some(field => field.name === 'email');
  const hasServiceField = defaultFields.some(field => field.name === 'service');
  const hasMessageField = defaultFields.some(field => field.name === 'message');
  const hasUrgentField = defaultFields.some(field => field.name === 'isUrgent');

  return (
    <div className="space-y-4">
      {/* Campos Nome e Telefone */}
      {(hasNameField || hasPhoneField) && (
        <NamePhoneFields
          nameValue={formData.name || ''}
          phoneValue={formData.phone || ''}
          onNameChange={(value) => updateField('name', value)}
          onPhoneChange={(value) => updateField('phone', value)}
          showName={hasNameField}
          showPhone={hasPhoneField}
          darkBackground={darkBackground}
        />
      )}

      {/* Campo E-mail */}
      {hasEmailField && (
        <EmailField
          value={formData.email || ''}
          onChange={(value) => updateField('email', value)}
          darkBackground={darkBackground}
        />
      )}

      {/* Campo Serviço */}
      {hasServiceField && (
        <ServiceSelectField
          value={formData.service || ''}
          onChange={(value) => updateField('service', value)}
          options={serviceOptions}
          darkBackground={darkBackground}
        />
      )}

      {/* Campos Personalizados */}
      {customFields.length > 0 && (
        <DynamicCustomFields
          customFields={customFields}
          formData={formData}
          updateField={updateField}
          darkBackground={darkBackground}
        />
      )}

      {/* Campo Mensagem */}
      {hasMessageField && (
        <MessageField
          value={formData.message || ''}
          onChange={(value) => updateField('message', value)}
          darkBackground={darkBackground}
        />
      )}

      {/* Checkbox Urgente */}
      {hasUrgentField && (
        <UrgentCheckbox
          checked={formData.isUrgent || false}
          onChange={(checked) => updateField('isUrgent', checked)}
          darkBackground={darkBackground}
        />
      )}
    </div>
  );
};
