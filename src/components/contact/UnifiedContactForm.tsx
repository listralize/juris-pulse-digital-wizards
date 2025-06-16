
import React from 'react';
import { useContactForm } from "./form/useContactForm";
import { useFormConfig } from "../../hooks/useFormConfig";
import { DynamicCustomFields } from './form/DynamicCustomFields';

// Componentes modulares
import ContactFormContainer from './form/ContactFormContainer';

interface UnifiedContactFormProps {
  preselectedService?: string;
  darkBackground?: boolean;
}

const UnifiedContactForm: React.FC<UnifiedContactFormProps> = ({ 
  preselectedService,
  darkBackground = false
}) => {
  const { formConfig, isLoading } = useFormConfig();
  const { formData, isSubmitting, updateField, handleSubmit } = useContactForm();

  // Pre-selecionar serviço se fornecido
  React.useEffect(() => {
    if (preselectedService && !formData.service) {
      updateField('service', preselectedService);
    }
  }, [preselectedService, formData.service, updateField]);

  if (isLoading) {
    return (
      <ContactFormContainer darkBackground={darkBackground}>
        <div className="flex items-center justify-center py-8">
          <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${
            darkBackground ? 'border-white' : 'border-black'
          }`}></div>
        </div>
      </ContactFormContainer>
    );
  }

  return (
    <ContactFormContainer darkBackground={darkBackground}>
      <div className="mb-6">
        <h3 className={`text-xl md:text-2xl font-canela mb-2 ${
          darkBackground ? 'text-white' : 'text-black'
        }`}>
          {formConfig.formTexts.headerTitle}
        </h3>
        <p className={`text-sm ${
          darkBackground ? 'text-white/70' : 'text-gray-600'
        }`}>
          {formConfig.formTexts.headerSubtitle}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkBackground ? 'text-white/80' : 'text-gray-700'}`}>
              {formConfig.formTexts.nameLabel}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="Seu nome completo"
              className={`w-full px-3 py-2 border rounded-md ${darkBackground 
                ? 'bg-white/5 border-white/20 text-white placeholder:text-white/40' 
                : 'bg-white border-gray-300 text-black'}`}
              required
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkBackground ? 'text-white/80' : 'text-gray-700'}`}>
              {formConfig.formTexts.phoneLabel}
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="Seu telefone"
              className={`w-full px-3 py-2 border rounded-md ${darkBackground 
                ? 'bg-white/5 border-white/20 text-white placeholder:text-white/40' 
                : 'bg-white border-gray-300 text-black'}`}
            />
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-1 ${darkBackground ? 'text-white/80' : 'text-gray-700'}`}>
            {formConfig.formTexts.emailLabel}
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="Seu e-mail"
            className={`w-full px-3 py-2 border rounded-md ${darkBackground 
              ? 'bg-white/5 border-white/20 text-white placeholder:text-white/40' 
              : 'bg-white border-gray-300 text-black'}`}
            required
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-1 ${darkBackground ? 'text-white/80' : 'text-gray-700'}`}>
            {formConfig.formTexts.serviceLabel}
          </label>
          <select
            value={formData.service}
            onChange={(e) => updateField('service', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${darkBackground 
              ? 'bg-white/5 border-white/20 text-white' 
              : 'bg-white border-gray-300 text-black'}`}
          >
            <option value="">Selecione seu problema jurídico</option>
            {formConfig.serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-1 ${darkBackground ? 'text-white/80' : 'text-gray-700'}`}>
            {formConfig.formTexts.messageLabel}
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => updateField('message', e.target.value)}
            placeholder="Conte-nos brevemente sobre o seu caso"
            rows={4}
            className={`w-full px-3 py-2 border rounded-md resize-vertical ${darkBackground 
              ? 'bg-white/5 border-white/20 text-white placeholder:text-white/40' 
              : 'bg-white border-gray-300 text-black'}`}
            required
          />
        </div>

        {/* Campos personalizados dinâmicos */}
        <DynamicCustomFields
          customFields={formConfig.customFields || []}
          formData={formData}
          updateField={updateField}
          darkBackground={darkBackground}
        />

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="urgent"
            checked={formData.isUrgent}
            onChange={(e) => updateField('isUrgent', e.target.checked)}
            className={`mt-1 ${darkBackground ? 'border-white/40' : ''}`}
          />
          <label htmlFor="urgent" className={`text-sm ${darkBackground ? 'text-white/80' : 'text-gray-700'}`}>
            {formConfig.formTexts.urgentLabel}
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center py-3 px-6 rounded-md font-medium transition-all ${
            darkBackground 
              ? 'bg-white text-black hover:bg-white/90' 
              : 'bg-black text-white hover:bg-black/90'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enviando...
            </span>
          ) : (
            formConfig.formTexts.submitButton
          )}
        </button>
      </form>
    </ContactFormContainer>
  );
};

export default UnifiedContactForm;
