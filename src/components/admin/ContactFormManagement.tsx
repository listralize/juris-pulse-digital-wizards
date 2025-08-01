import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Save, Star, StarOff, Send, Loader2, ChevronDown, ChevronRight } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { toast } from 'sonner';
import { supabase } from '../../integrations/supabase/client';
import { FormFieldsManager } from './contact-form/FormFieldsManager';
import { FormConfig, FormField } from '../../types/contactFormTypes';
import { useFormConfig } from '../../hooks/useFormConfig';

const defaultFormConfig: FormConfig = {
  webhookUrl: '',
  redirectUrl: '',
  serviceOptions: [
    { value: "familia", label: "Divórcio e questões familiares" },
    { value: "tributario", label: "Consultoria tributária" },
    { value: "empresarial", label: "Direito empresarial" },
    { value: "trabalho", label: "Direito trabalhista" },
    { value: "constitucional", label: "Direitos fundamentais" },
    { value: "administrativo", label: "Direito administrativo" },
    { value: "previdenciario", label: "Direito previdenciário" },
    { value: "consumidor", label: "Direito do consumidor" }
  ],
  formTexts: {
    headerTitle: "Como podemos ajudar você?",
    headerSubtitle: "Entre em contato conosco",
    submitButton: "Enviar mensagem",
    successMessage: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
    errorMessage: "Erro ao enviar mensagem. Tente novamente."
  },
  customFields: [],
  allFields: [
    {
      id: 'name',
      name: 'name',
      label: 'Nome *',
      type: 'text',
      required: true,
      placeholder: 'Seu nome completo',
      order: 0,
      isDefault: true
    },
    {
      id: 'email',
      name: 'email',
      label: 'E-mail *',
      type: 'email',
      required: true,
      placeholder: 'Seu e-mail',
      order: 1,
      isDefault: true
    },
    {
      id: 'phone',
      name: 'phone',
      label: 'Telefone',
      type: 'tel',
      required: false,
      placeholder: 'Seu telefone',
      order: 2,
      isDefault: true
    },
    {
      id: 'message',
      name: 'message',
      label: 'Detalhes do seu caso *',
      type: 'textarea',
      required: true,
      placeholder: 'Conte-nos brevemente sobre o seu caso',
      order: 4,
      isDefault: true
    },
    {
      id: 'isUrgent',
      name: 'isUrgent',
      label: 'Preciso de atendimento urgente',
      type: 'checkbox',
      required: false,
      order: 5,
      isDefault: true
    }
  ]
};

export const ContactFormManagement: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { multipleFormsConfig, setMultipleFormsConfig } = useFormConfig();
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  const [availablePages, setAvailablePages] = useState<Array<{ value: string; label: string; category?: string }>>([]);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

  const currentForm = multipleFormsConfig.forms[currentFormIndex] || defaultFormConfig;

  // Carregar páginas de serviços disponíveis organizadas por categoria
  useEffect(() => {
    const loadServicePages = async () => {
      try {
        const { data, error } = await supabase
          .from('service_pages')
          .select('href, title, category_id')
          .eq('is_active', true)
          .order('category_id, title');

        if (error) {
          console.error('Erro ao carregar páginas de serviços:', error);
          return;
        }

        // Buscar categorias para mapear os IDs
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('law_categories')
          .select('category_key, name')
          .eq('is_active', true);

        if (categoriesError) {
          console.error('Erro ao carregar categorias:', categoriesError);
        }

        const categoryMap = (categoriesData || []).reduce((acc, cat) => {
          acc[cat.category_key] = cat.name;
          return acc;
        }, {} as Record<string, string>);

        const pages = data?.map(page => {
          let cleanHref = page.href || '';
          if (cleanHref.startsWith('/services/services/')) {
            cleanHref = cleanHref.replace('/services/services/', '');
          } else if (cleanHref.startsWith('/services/')) {
            cleanHref = cleanHref.replace('/services/', '');
          }
          
          return {
            value: cleanHref,
            label: page.title,
            category: page.category_id ? categoryMap[page.category_id] || 'Outros' : 'Outros'
          };
        }) || [];

        const mainPages = [
          { value: 'home', label: 'Página Inicial', category: 'Principal' },
          { value: 'contato', label: 'Página de Contato', category: 'Principal' }
        ];

        setAvailablePages([...mainPages, ...pages]);
      } catch (error) {
        console.error('Erro ao carregar páginas:', error);
      }
    };

    loadServicePages();
  }, []);

  const updateCurrentForm = (updates: Partial<FormConfig>) => {
    const updatedForms = [...multipleFormsConfig.forms];
    updatedForms[currentFormIndex] = { ...currentForm, ...updates };
    setMultipleFormsConfig({
      ...multipleFormsConfig,
      forms: updatedForms
    });
  };

  const testWebhook = async () => {
    if (!currentForm.webhookUrl) {
      toast.error('Configure uma URL de webhook primeiro');
      return;
    }

    setIsTestingWebhook(true);
    try {
      const testData = {
        name: 'Teste do Sistema',
        email: 'teste@exemplo.com',
        phone: '(11) 99999-9999',
        message: 'Esta é uma mensagem de teste do webhook configurado no painel administrativo.',
        service: 'Teste',
        isUrgent: false,
        customFields: {},
        timestamp: new Date().toISOString(),
        source: 'Teste - Painel Admin',
        isTest: true
      };

      const response = await fetch(currentForm.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData)
      });

      if (response.ok) {
        toast.success('Webhook testado com sucesso!');
      } else {
        toast.error(`Erro no webhook: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Erro ao testar webhook:', error);
      toast.error('Erro ao conectar com o webhook');
    } finally {
      setIsTestingWebhook(false);
    }
  };

  const addNewForm = () => {
    const newForm: FormConfig = {
      ...defaultFormConfig,
      id: `form_${Date.now()}`,
      name: `Novo Formulário ${multipleFormsConfig.forms.length + 1}`,
      linkedPages: [],
      allFields: defaultFormConfig.allFields.map(field => ({
        ...field,
        options: field.name === 'service' ? [] : field.options
      }))
    };
    
    setMultipleFormsConfig({
      ...multipleFormsConfig,
      forms: [...multipleFormsConfig.forms, newForm]
    });
    setCurrentFormIndex(multipleFormsConfig.forms.length);
  };

  const removeForm = (index: number) => {
    if (multipleFormsConfig.forms.length <= 1) {
      toast.error('Deve existir pelo menos um formulário');
      return;
    }
    
    const formToRemove = multipleFormsConfig.forms[index];
    const isDefault = multipleFormsConfig.defaultFormId === formToRemove.id;
    
    if (isDefault) {
      toast.error('Não é possível remover o formulário principal. Defina outro como principal primeiro.');
      return;
    }
    
    const updatedForms = multipleFormsConfig.forms.filter((_, i) => i !== index);
    setMultipleFormsConfig({
      ...multipleFormsConfig,
      forms: updatedForms
    });
    
    if (currentFormIndex >= updatedForms.length) {
      setCurrentFormIndex(0);
    }
  };

  const setAsDefaultForm = (formId: string) => {
    setMultipleFormsConfig({
      ...multipleFormsConfig,
      defaultFormId: formId
    });
    toast.success('Formulário definido como principal!');
  };

  const updateFormFields = (fields: FormField[]) => {
    updateCurrentForm({ 
      allFields: fields,
      customFields: fields.filter(f => !f.isDefault)
    });
  };

  const updateLinkedPages = (selectedPages: string[]) => {
    updateCurrentForm({ linkedPages: selectedPages });
  };

  const saveFormConfig = async () => {
    setIsSaving(true);
    try {
      console.log('💾 Iniciando salvamento das configurações:', multipleFormsConfig);
      
      const { data: existingData, error: selectError } = await supabase
        .from('admin_settings')
        .select('id')
        .limit(1)
        .maybeSingle();

      if (selectError && selectError.code !== 'PGRST116') {
        console.error('❌ Erro ao verificar registro existente:', selectError);
        throw selectError;
      }

      if (existingData) {
        console.log('🔄 Atualizando primeiro registro com ID:', existingData.id);
        
        const { error: updateError } = await supabase
          .from('admin_settings')
          .update({
            form_config: multipleFormsConfig as any,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingData.id);

        if (updateError) {
          console.error('❌ Erro ao atualizar registro:', updateError);
          throw updateError;
        }
        
        console.log('✅ Registro atualizado com sucesso');
      } else {
        console.log('➕ Criando novo registro');
        
        const { error: insertError } = await supabase
          .from('admin_settings')
          .insert({
            form_config: multipleFormsConfig as any,
            updated_at: new Date().toISOString()
          });

        if (insertError) {
          console.error('❌ Erro ao criar registro:', insertError);
          throw insertError;
        }
        
        console.log('✅ Novo registro criado com sucesso');
      }

      toast.success('Configurações dos formulários salvas com sucesso!');
      console.log('🎉 Salvamento concluído com sucesso');
      
    } catch (error) {
      console.error('💥 Erro ao salvar configurações:', error);
      toast.error('Erro ao salvar configurações dos formulários');
    } finally {
      setIsSaving(false);
    }
  };

  // Organizar páginas por categoria
  const pagesByCategory = availablePages.reduce((acc, page) => {
    const category = page.category || 'Outros';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(page);
    return acc;
  }, {} as Record<string, typeof availablePages>);

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Form Selector */}
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
              📋 Gerenciar Formulários ({multipleFormsConfig.forms.length})
            </CardTitle>
            <Button onClick={addNewForm} size="sm">
              + Novo Formulário
            </Button>
          </div>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            O formulário principal será usado em todas as páginas que não tiverem um formulário específico atribuído.
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {multipleFormsConfig.forms.map((form, index) => {
              const isDefault = multipleFormsConfig.defaultFormId === form.id;
              return (
                <div key={form.id} className="flex items-center gap-2 p-2 border rounded-lg">
                  <Button
                    onClick={() => setCurrentFormIndex(index)}
                    variant={index === currentFormIndex ? "default" : "outline"}
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    {isDefault && <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />}
                    {form.name}
                    {isDefault && <span className="text-xs">(Principal)</span>}
                  </Button>
                  
                  <div className="flex gap-1">
                    {!isDefault && (
                      <Button
                        onClick={() => setAsDefaultForm(form.id!)}
                        variant="outline"
                        size="sm"
                        title="Definir como formulário principal"
                      >
                        <StarOff className="w-4 h-4" />
                      </Button>
                    )}
                    
                    {multipleFormsConfig.forms.length > 1 && (
                      <Button
                        onClick={() => removeForm(index)}
                        variant="destructive"
                        size="sm"
                        disabled={isDefault}
                        title={isDefault ? "Não é possível remover o formulário principal" : "Remover formulário"}
                      >
                        ×
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Form Settings */}
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
            ⚙️ Configurações do Formulário: {currentForm.name}
            {multipleFormsConfig.defaultFormId === currentForm.id && (
              <span className="ml-2 text-yellow-500 text-sm">(Principal)</span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Nome do Formulário</Label>
              <Input
                value={currentForm.name || ''}
                onChange={(e) => updateCurrentForm({ name: e.target.value })}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
            </div>
            <div>
              <Label>Webhook URL</Label>
              <div className="flex gap-2">
                <Input
                  value={currentForm.webhookUrl}
                  onChange={(e) => updateCurrentForm({ webhookUrl: e.target.value })}
                  placeholder="https://seu-webhook-url.com/endpoint"
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
                <Button
                  onClick={testWebhook}
                  disabled={!currentForm.webhookUrl || isTestingWebhook}
                  size="sm"
                  variant="outline"
                >
                  {isTestingWebhook ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="md:col-span-2">
              <Label>URL de Redirecionamento (opcional)</Label>
              <Input
                value={currentForm.redirectUrl || ''}
                onChange={(e) => updateCurrentForm({ redirectUrl: e.target.value })}
                placeholder="https://seusite.com/obrigado"
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              />
              <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Página para onde o usuário será redirecionado após enviar o formulário
              </p>
            </div>
          </div>
          
          <div>
            <Label>Páginas Específicas (deixe vazio para usar como principal)</Label>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
              Selecione as páginas onde este formulário deve aparecer. Páginas não selecionadas usarão o formulário principal.
            </p>
            
            {Object.entries(pagesByCategory).map(([category, pages]) => (
              <Collapsible 
                key={category} 
                open={openCategories[category]} 
                onOpenChange={() => toggleCategory(category)}
                className="mb-4"
              >
                <CollapsibleTrigger asChild>
                  <div className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-opacity-50 ${
                    isDark ? 'border-white/20 hover:bg-white/10' : 'border-gray-200 hover:bg-gray-50'
                  }`}>
                    <div className="flex items-center gap-2">
                      {openCategories[category] ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                      <span className="font-medium">{category}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isDark ? 'bg-white/10 text-white/70' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {pages.length}
                      </span>
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 mt-2 ml-6">
                  {pages.map((page) => (
                    <div key={page.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`page-${page.value}`}
                        checked={currentForm.linkedPages?.includes(page.value) || false}
                        onCheckedChange={(checked) => {
                          const currentPages = currentForm.linkedPages || [];
                          if (checked) {
                            updateLinkedPages([...currentPages, page.value]);
                          } else {
                            updateLinkedPages(currentPages.filter(p => p !== page.value));
                          }
                        }}
                      />
                      <Label htmlFor={`page-${page.value}`} className="text-sm">
                        {page.label}
                      </Label>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Embed Generator */}
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
            🔗 Gerador de Embed
          </CardTitle>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Gere um código HTML para incorporar este formulário em qualquer site
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Código HTML do Formulário</Label>
            <Textarea
              readOnly
              value={`<iframe 
  src="${window.location.origin}/embed/form/${currentForm.id || 'default'}" 
  width="100%" 
  height="600" 
  frameborder="0" 
  style="border: none; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
</iframe>

<!-- Adicione este script para tracking e redimensionamento automático -->
<script>
window.addEventListener('message', function(event) {
  if (event.origin !== '${window.location.origin}') return;
  if (event.data.type === 'resize') {
    const iframe = document.querySelector('iframe[src*="embed/form"]');
    if (iframe) iframe.height = event.data.height;
  }
  if (event.data.type === 'form_submitted') {
    console.log('Formulário enviado:', event.data.data);
    // Adicione aqui seu código de tracking (Google Analytics, Facebook Pixel, etc.)
  }
});
</script>`}
              rows={15}
              className={`font-mono text-xs ${isDark ? 'bg-black border-white/20 text-white' : 'bg-gray-50 border-gray-200 text-black'}`}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => {
                const embedCode = `<iframe src="${window.location.origin}/embed/form/${currentForm.id || 'default'}" width="100%" height="600" frameborder="0" style="border: none; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></iframe>`;
                navigator.clipboard.writeText(embedCode);
                toast.success('Código do iframe copiado!');
              }}
              variant="outline"
            >
              📋 Copiar Apenas iframe
            </Button>
            
            <Button
              onClick={() => {
                const fullCode = `<iframe 
  src="${window.location.origin}/embed/form/${currentForm.id || 'default'}" 
  width="100%" 
  height="600" 
  frameborder="0" 
  style="border: none; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
</iframe>

<script>
window.addEventListener('message', function(event) {
  if (event.origin !== '${window.location.origin}') return;
  if (event.data.type === 'resize') {
    const iframe = document.querySelector('iframe[src*="embed/form"]');
    if (iframe) iframe.height = event.data.height;
  }
  if (event.data.type === 'form_submitted') {
    console.log('Formulário enviado:', event.data.data);
  }
});
</script>`;
                navigator.clipboard.writeText(fullCode);
                toast.success('Código completo copiado!');
              }}
            >
              📋 Copiar Código Completo
            </Button>
          </div>

          <div className={`p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-blue-50'}`}>
            <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
              💡 Como usar:
            </h4>
            <ul className={`text-sm space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>• Cole o código HTML em qualquer página web</li>
              <li>• O formulário será exibido com seus estilos personalizados</li>
              <li>• Os dados serão enviados para o webhook configurado</li>
              <li>• O script de tracking permite monitorar envios</li>
              <li>• O iframe se redimensiona automaticamente</li>
            </ul>
          </div>

          <div>
            <Label>Preview do Embed</Label>
            <div className={`p-4 border rounded-lg ${isDark ? 'border-white/20' : 'border-gray-200'}`}>
              <iframe 
                src={`${window.location.origin}/embed/form/${currentForm.id || 'default'}`}
                width="100%" 
                height="400" 
                style={{ border: 'none', borderRadius: '8px' }}
                title="Preview do formulário embed"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Fields Management */}
      <FormFieldsManager
        formFields={currentForm.allFields || []}
        onUpdateFormFields={updateFormFields}
      />

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={saveFormConfig} 
          disabled={isSaving}
          className="flex items-center gap-2"
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isSaving ? 'Salvando...' : 'Salvar Configurações'}
        </Button>
      </div>
    </div>
  );
};