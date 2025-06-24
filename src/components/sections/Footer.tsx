
import React, { useEffect, useState } from 'react';
import { useTheme } from '../ThemeProvider';

interface FooterProps {
  respectTheme?: boolean;
}

const Footer: React.FC<FooterProps> = ({
  respectTheme = true
}) => {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  const isDark = respectTheme ? theme === 'dark' : true;

  // Estados locais para todos os dados editáveis do footer
  const [footerData, setFooterData] = useState({
    companyName: 'Serafim & Trombela Advocacia',
    description: 'A história do Serafim & Trombela Advocacia é moldada pelo compromisso com a excelência jurídica e o sucesso de nossos clientes.',
    phone: '(62) 99459-4496',
    email: 'contato@stadv.com',
    address: 'World Trade Center, Torre Office e Corporate, Av. D, Av. 85 - St. Marista, Goiânia - GO, 74150-040',
    whatsapp: '5562994594496'
  });

  // Carregar dados iniciais do Supabase
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        console.log('🦶 Footer: Carregando dados iniciais...');
        const { supabase } = await import('../../integrations/supabase/client');
        
        // Carregar dados do footer_info
        const { data: footer } = await supabase
          .from('footer_info')
          .select('company_name, description')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        // Carregar dados do contact_info
        const { data: contact } = await supabase
          .from('contact_info')
          .select('phone, email, address, whatsapp')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (footer || contact) {
          console.log('🦶 Footer: Dados carregados:', { footer, contact });
          setFooterData(prev => ({
            ...prev,
            ...(footer?.company_name && { companyName: footer.company_name }),
            ...(footer?.description && { description: footer.description }),
            ...(contact?.phone && { phone: contact.phone }),
            ...(contact?.email && { email: contact.email }),
            ...(contact?.address && { address: contact.address }),
            ...(contact?.whatsapp && { whatsapp: contact.whatsapp })
          }));
        }
      } catch (error) {
        console.error('❌ Footer: Erro ao carregar dados:', error);
      }
    };

    loadInitialData();
  }, []);

  // Escutar eventos de atualização em tempo real
  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      console.log('🦶 Footer: Recebendo atualização de textos:', event.detail);
      
      const data = event.detail;
      
      // Atualizar dados do footer
      if (data.footerTexts) {
        const { companyName, description } = data.footerTexts;
        setFooterData(prev => ({
          ...prev,
          ...(companyName !== undefined && { companyName }),
          ...(description !== undefined && { description })
        }));
      }
      
      // Atualizar dados de contato
      if (data.contactTexts) {
        const { phone, email, address, whatsapp } = data.contactTexts;
        setFooterData(prev => ({
          ...prev,
          ...(phone !== undefined && { phone }),
          ...(email !== undefined && { email }),
          ...(address !== undefined && { address }),
          ...(whatsapp !== undefined && { whatsapp })
        }));
      }
    };

    window.addEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    };
  }, []);

  return (
    <footer 
      className={`fixed bottom-0 left-0 right-0 z-50 py-3 px-6 border-t backdrop-blur-lg ${
        isDark 
          ? 'border-white/20 bg-black/90 text-white' 
          : 'border-gray-200 bg-white/90 text-black'
      }`}
      style={{ boxShadow: '0 -4px 20px rgba(0,0,0,0.1)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
          {/* Logo e Nome da Empresa */}
          <div className="flex items-center gap-3">
            <img 
              src={isDark ? "/lovable-uploads/a8cf659d-921d-41fb-a37f-3639b3f036d0.png" : "/lovable-uploads/d43d5ba7-bbba-42dd-8cee-0cdd11892e68.png"} 
              alt={`${footerData.companyName} Logo`} 
              className={`h-8 object-contain ${isDark ? 'brightness-150' : 'brightness-90'}`}
            />
            <span className={`font-canela text-sm font-medium ${isDark ? 'text-white' : 'text-black'}`}>
              {footerData.companyName}
            </span>
          </div>
          
          {/* Informações de Contato */}
          <div className="flex flex-col lg:flex-row items-center gap-4 text-xs">
            <a 
              href={`mailto:${footerData.email}`} 
              className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'} hover:underline transition-colors`}
            >
              {footerData.email}
            </a>
            <a 
              href={`tel:${footerData.phone.replace(/\D/g, '')}`}
              className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'} hover:underline transition-colors`}
            >
              {footerData.phone}
            </a>
            <a 
              href={`https://api.whatsapp.com/send?phone=${footerData.whatsapp}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`px-3 py-1 text-xs font-medium transition-all duration-300 rounded-full ${
                isDark 
                  ? 'bg-white text-black hover:bg-gray-200' 
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              WhatsApp
            </a>
          </div>
          
          {/* Copyright e Créditos */}
          <div className="flex flex-col lg:flex-row items-center gap-2 text-xs">
            <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              © {currentYear} {footerData.companyName}
            </span>
            <span className={`hidden lg:block ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>•</span>
            <a 
              href="https://listralize.com.br/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} hover:underline transition-colors`}
            >
              Desenvolvido por Listralize
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
