
import React from 'react';
import { useContactForm } from "./form/useContactForm";
import { useFormConfig } from "../../hooks/useFormConfig";
import { useFormMarketingScripts } from "../../hooks/useFormMarketingScripts";
import { DynamicFormRenderer } from './form/DynamicFormRenderer';
import ContactFormContainer from './form/ContactFormContainer';
import { supabase } from '@/integrations/supabase/client';

interface UnifiedContactFormProps {
  preselectedService?: string;
  darkBackground?: boolean;
  pageId?: string;
  formId?: string; // Adicionar propriedade para identificar o formulário específico
}

const UnifiedContactForm: React.FC<UnifiedContactFormProps> = ({ 
  preselectedService,
  darkBackground = false,
  pageId,
  formId
}) => {
  // Implementar marketing scripts específicos para este formulário
  
  // Determinar o pageId baseado na URL atual se não fornecido
  const currentPageId = pageId || (() => {
    const pathname = window.location.pathname;
    console.log('🌐 [UnifiedContactForm] Pathname atual:', pathname);
    
    if (pathname === '/' || pathname === '/home') return 'home';
    if (pathname === '/contato') return 'contato';
    
    // Verificar páginas de áreas de direito primeiro
    if (pathname.startsWith('/areas/')) {
      let cleanPath = pathname.replace('/areas/', '');
      // Remover múltiplas barras e normalizar
      cleanPath = cleanPath.replace(/\/+/g, '/').replace(/\/$/, '');
      // Remover barra inicial se existir
      if (cleanPath.startsWith('/')) {
        cleanPath = cleanPath.substring(1);
      }
      console.log('🏛️ [UnifiedContactForm] Área de direito detectada:', cleanPath);
      return cleanPath;
    }
    
    if (pathname.startsWith('/services/')) {
      // Normalizar completamente o slug do serviço
      let cleanPath = pathname.replace('/services/', '');
      
      // Remover possível duplicação de prefixos
      if (cleanPath.startsWith('services/')) {
        cleanPath = cleanPath.replace('services/', '');
      }
      
      // Remover múltiplas barras e normalizar
      cleanPath = cleanPath.replace(/\/+/g, '/').replace(/\/$/, '');
      
      // Remover barra inicial se existir
      if (cleanPath.startsWith('/')) {
        cleanPath = cleanPath.substring(1);
      }
      
      return cleanPath;
    }
    if (pathname.startsWith('/servicos/')) {
      // Normalizar completamente o slug do serviço
      let cleanPath = pathname.replace('/servicos/', '');
      
      // Remover possível duplicação de prefixos
      if (cleanPath.startsWith('servicos/')) {
        cleanPath = cleanPath.replace('servicos/', '');
      }
      
      // Remover múltiplas barras e normalizar
      cleanPath = cleanPath.replace(/\/+/g, '/').replace(/\/$/, '');
      
      // Remover barra inicial se existir
      if (cleanPath.startsWith('/')) {
        cleanPath = cleanPath.substring(1);
      }
      
      return cleanPath;
    }
    return 'home'; // fallback
  })();

  console.log('📍 [UnifiedContactForm] PageId determinado:', currentPageId);

  const { formConfig, isLoading } = useFormConfig(formId, currentPageId);
  const { formData, isSubmitting, updateField, handleSubmit } = useContactForm(formConfig);

  // Implementar marketing scripts usando o ID real do formulário
  const activeFormId = (formId || formConfig?.id || 'default');
  console.log('🚨 [UNIFIED DEBUG] FormId para marketing:', activeFormId);
  console.log('🚨 [UNIFIED DEBUG] FormConfig:', formConfig);
  console.log('🚨 [UNIFIED DEBUG] Chamando useFormMarketingScripts com:', activeFormId);
  console.log('🚨 [UNIFIED DEBUG] Hook vai executar agora...');
  console.log('🚨 [UNIFIED DEBUG] Component montado, executando hook...');
  
  // FORÇA o carregamento do pixel se for o formulário padrão
  React.useEffect(() => {
    if (activeFormId === 'default') {
      console.log('🚨 [FORCE PIXEL] Forçando carregamento do pixel para formulário padrão');
      const loadPixelForDefault = async () => {
        try {
          const { data: settings, error } = await supabase
            .from('marketing_settings')
            .select('*')
            .maybeSingle();
          
          if (error) {
            console.error('❌ [FORCE PIXEL] Erro ao buscar configurações:', error);
            return;
          }
          
          if (settings) {
            const trackingConfig = JSON.parse(String(settings.form_tracking_config || '{}'));
            const formConfig = trackingConfig.systemForms?.find((f: any) => f.formId === 'default');
            
            if (formConfig?.facebookPixel?.enabled && formConfig.facebookPixel.pixelId) {
              console.log('🚨 [FORCE PIXEL] Carregando pixel:', formConfig.facebookPixel.pixelId);
              
              if (!(window as any).fbq) {
                const script = document.createElement('script');
                script.innerHTML = `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${formConfig.facebookPixel.pixelId}');
                  fbq('track', 'PageView');
                  console.log('✅ [FORCE PIXEL] Pixel carregado:', '${formConfig.facebookPixel.pixelId}');
                `;
                document.head.appendChild(script);
              }
            }
          }
        } catch (error) {
          console.error('❌ [FORCE PIXEL] Erro:', error);
        }
      };
      
      loadPixelForDefault();
    }
  }, [activeFormId]);
  
  useFormMarketingScripts(activeFormId);

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

  console.log('📋 [UnifiedContactForm] Usando formulário:', formConfig.name, 'para página:', currentPageId);

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
      
      <form id="contact-form-main" onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot e time-trap */}
        <input type="text" id="hp_field" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: 'none' }} />
        <input type="hidden" id="ts_field" name="ts" value={String(Date.now())} />
        <DynamicFormRenderer
          formFields={formConfig.allFields || []}
          serviceOptions={formConfig.serviceOptions}
          formData={formData}
          updateField={updateField}
          darkBackground={darkBackground}
        />

        <button
          id="submit-contact-main"
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
