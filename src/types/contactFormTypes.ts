
export interface FormField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox';
  required: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  order: number;
}

export interface FormConfig {
  webhookUrl: string;
  serviceOptions: Array<{
    value: string;
    label: string;
  }>;
  formTexts: {
    headerTitle: string;
    headerSubtitle: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    serviceLabel: string;
    messageLabel: string;
    urgentLabel: string;
    submitButton: string;
    successMessage: string;
    errorMessage: string;
  };
  customFields?: FormField[];
}
