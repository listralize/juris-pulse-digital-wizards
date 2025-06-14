
import React from 'react';
import { useContactForm } from "./form/useContactForm";

// Componentes modulares
import ContactFormContainer from './form/ContactFormContainer';
import FormHeader from './form/FormHeader';
import NamePhoneFields from './form/NamePhoneFields';
import EmailField from './form/EmailField';
import ServiceSelectField from './form/ServiceSelectField';
import MessageField from './form/MessageField';
import UrgentCheckbox from './form/UrgentCheckbox';
import SubmitButton from './form/SubmitButton';

interface UnifiedContactFormProps {
  preselectedService?: string;
  darkBackground?: boolean;
}

const UnifiedContactForm: React.FC<UnifiedContactFormProps> = ({ 
  preselectedService,
  darkBackground = false
}) => {
  const { formData, isSubmitting, updateField, handleSubmit } = useContactForm();

  // Pre-selecionar serviço se fornecido
  React.useEffect(() => {
    if (preselectedService && !formData.service) {
      updateField('service', preselectedService);
    }
  }, [preselectedService, formData.service, updateField]);

  return (
    <ContactFormContainer darkBackground={darkBackground}>
      <FormHeader darkBackground={darkBackground} />
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkBackground ? 'text-white/80' : 'text-gray-700'}`}>
              Nome *
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
              Telefone
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
            E-mail *
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
            Qual problema você precisa resolver?
          </label>
          <select
            value={formData.service}
            onChange={(e) => updateField('service', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${darkBackground 
              ? 'bg-white/5 border-white/20 text-white' 
              : 'bg-white border-gray-300 text-black'}`}
          >
            <option value="">Selecione seu problema jurídico</option>
            <option value="familia">Divórcio e questões familiares</option>
            <option value="tributario">Consultoria tributária</option>
            <option value="empresarial">Direito empresarial</option>
            <option value="trabalho">Direito trabalhista</option>
            <option value="constitucional">Direitos fundamentais</option>
            <option value="administrativo">Direito administrativo</option>
            <option value="previdenciario">Direito previdenciário</option>
            <option value="consumidor">Direito do consumidor</option>
          </select>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-1 ${darkBackground ? 'text-white/80' : 'text-gray-700'}`}>
            Detalhes do seu caso *
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

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="urgent"
            checked={formData.isUrgent}
            onChange={(e) => updateField('isUrgent', e.target.checked)}
            className={`mt-1 ${darkBackground ? 'border-white/40' : ''}`}
          />
          <label htmlFor="urgent" className={`text-sm ${darkBackground ? 'text-white/80' : 'text-gray-700'}`}>
            Preciso de atendimento urgente
          </label>
        </div>

        <SubmitButton isSubmitting={isSubmitting} darkBackground={darkBackground} />
      </form>
    </ContactFormContainer>
  );
};

export default UnifiedContactForm;
