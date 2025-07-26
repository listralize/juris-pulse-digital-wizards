
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
      className={`py-8 px-6 md:px-16 lg:px-24 border-t ${isDark ? 'border-white/20 bg-black text-white' : 'border-gray-200 bg-white text-black'}`}
      style={{
        margin: '0',
        padding: '2rem 1.5rem 2rem 1.5rem', // Padding controlado, sem margin
        marginBottom: '0' // ZERO margin-bottom
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coluna da Logo e Descrição */}
          <div className="space-y-4">
            <img 
              src={isDark ? "/lovable-uploads/a8cf659d-921d-41fb-a37f-3639b3f036d0.png" : "/lovable-uploads/d43d5ba7-bbba-42dd-8cee-0cdd11892e68.png"} 
              alt={`${footerData.companyName} Logo`} 
              className={`h-16 object-contain ${isDark ? 'brightness-150' : 'brightness-90'}`}
              style={{
                filter: isDark ? 'drop-shadow(0 0 15px rgba(255,255,255,0.2)) drop-shadow(3px 5px 10px rgba(0,0,0,0.95))' : 'drop-shadow(0 0 10px rgba(0,0,0,0.1))'
              }} 
            />
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} font-satoshi max-w-sm text-sm leading-relaxed`}>
              {footerData.description}
            </p>
          </div>
          
          {/* Coluna de Contato Rápido */}
          <div className="space-y-4">
            <h4 className={`text-lg font-canela ${isDark ? 'text-white' : 'text-black'}`}>
              Contato Rápido
            </h4>
            <div className="space-y-3">
              <div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} font-satoshi text-sm leading-relaxed`}>
                  {footerData.address}
                </p>
              </div>
              <div>
                <a 
                  href={`mailto:${footerData.email}`} 
                  className={`${isDark ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-700'} hover:underline font-satoshi text-sm block`}
                >
                  📧 {footerData.email}
                </a>
              </div>
              <div>
                <a 
                  href={`tel:${footerData.phone.replace(/\D/g, '')}`}
                  className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'} hover:underline font-satoshi text-sm block`}
                >
                  📞 {footerData.phone}
                </a>
              </div>
            </div>
          </div>
          
          {/* Coluna de Atendimento */}
          <div className="space-y-4">
            <h4 className={`text-lg font-canela ${isDark ? 'text-white' : 'text-black'}`}>
              Atendimento
            </h4>
            <div className="space-y-3">
              <div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} font-satoshi text-sm`}>
                  Segunda a Sexta
                </p>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} font-satoshi text-sm`}>
                  9:00 - 18:00
                </p>
              </div>
              <a 
                href={`https://api.whatsapp.com/send?phone=${footerData.whatsapp}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-all duration-300 rounded-md ${isDark ? 'bg-white text-black hover:bg-black hover:text-white border-2 border-white hover:border-white' : 'bg-black text-white hover:bg-white hover:text-black border-2 border-black hover:border-black'}`}
              >
                Atendimento via WhatsApp
              </a>
            </div>
          </div>
        </div>
        
        {/* Linha inferior com copyright e créditos */}
        <div className={`mt-8 pt-6 border-t ${isDark ? 'border-white/30' : 'border-black/10'}`}>
          {/* Crédito da Listralize */}
          <div className="text-center mb-4">
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} font-satoshi`}>
              Desenvolvido por{' '}
              <a 
                href="https://listralize.com.br/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} hover:underline`}
              >
                Listralize
              </a>
            </p>
          </div>
          
          {/* Copyright e links */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} font-satoshi`}>
              © {currentYear} {footerData.companyName}. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6">
              <a 
                href="#" 
                className={`text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} font-satoshi hover:underline`}
              >
                Política de Privacidade
              </a>
              <a 
                href="#" 
                className={`text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} font-satoshi hover:underline`}
              >
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
