
import React from 'react';
import { Form } from "../ui/form";
import { FormProvider } from "react-hook-form";
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
  const { form, isSubmitting, onSubmit } = useContactForm(preselectedService);

  return (
    <ContactFormContainer darkBackground={darkBackground}>
      <FormHeader darkBackground={darkBackground} />
      
      <FormProvider {...form}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <NamePhoneFields darkBackground={darkBackground} />
            <EmailField darkBackground={darkBackground} />
            <ServiceSelectField darkBackground={darkBackground} />
            <MessageField darkBackground={darkBackground} />
            <UrgentCheckbox darkBackground={darkBackground} />
            <SubmitButton isSubmitting={isSubmitting} darkBackground={darkBackground} />
          </form>
        </Form>
      </FormProvider>
    </ContactFormContainer>
  );
};

export default UnifiedContactForm;
