
export interface FormField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox';
  required: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  order: number;
  isDefault: boolean; // Agora é obrigatório
}

export interface FormConfig {
  id?: string;
  name?: string; // Nome do formulário
  webhookUrl: string;
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
  allFields: FormField[]; // Agora é obrigatório
  linkedPages?: string[]; // Páginas onde este formulário aparece
}

export interface MultipleFormsConfig {
  forms: FormConfig[];
  defaultFormId?: string; // ID do formulário padrão
}
