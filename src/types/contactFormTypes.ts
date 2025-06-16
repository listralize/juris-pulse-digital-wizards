
export interface FormField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox';
  required: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  order: number;
  isDefault: boolean;
  disabled?: boolean;
}

export interface FormConfig {
  id?: string;
  name?: string;
  webhookUrl: string;
  redirectUrl?: string;
  serviceOptions: Array<{
    value: string;
    label: string;
  }>;
  formTexts: {
    headerTitle: string;
    headerSubtitle: string;
    submitButton: string;
    successMessage: string;
    errorMessage: string;
  };
  customFields?: FormField[];
  allFields: FormField[];
  linkedPages?: string[];
}

export interface MultipleFormsConfig {
  forms: FormConfig[];
  defaultFormId?: string;
}
