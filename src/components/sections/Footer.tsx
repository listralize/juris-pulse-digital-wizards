
import React, { useEffect, useState } from 'react';
import { useTheme } from '../ThemeProvider';
import GlobalSocialProof from '../GlobalSocialProof';
import { supabase } from '../../integrations/supabase/client';

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
    <>
      <footer
      className={`py-8 px-6 md:px-16 lg:px-24 border-t ${isDark ? 'border-white/20 md:bg-black text-white' : 'border-gray-200 md:bg-white text-black'}`}
      style={{
        margin: '0',
        padding: '3rem 1.5rem 2rem 1.5rem',
        marginBottom: '0',
        position: 'relative',
        zIndex: 10000,
        pointerEvents: 'auto',
        backgroundColor: 'transparent'
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
          
          {/* Coluna de Atendimento e Redes Sociais */}
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
              
              {/* Ícone do Instagram */}
              {footerData.whatsapp && (
                <a 
                  href="https://www.instagram.com/serafimtrombela/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 ${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/10 hover:bg-black/20 text-black'}`}
                  title="Seguir no Instagram"
                  aria-label="Abrir Instagram"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.017 0C8.396 0 7.989.016 6.756.072 5.526.132 4.74.333 4.077.63a5.898 5.898 0 00-2.188 1.424A5.898 5.898 0 00.315 4.242c-.297.663-.498 1.45-.558 2.68C.201 8.155.017 8.562.017 12.183c0 3.621.184 4.028.24 5.261.06 1.23.261 2.017.558 2.68.317.868.744 1.605 1.424 2.188a5.898 5.898 0 002.188 1.424c.663.297 1.45.498 2.68.558 1.233.056 1.64.072 5.261.072 3.621 0 4.028-.016 5.261-.072 1.23-.06 2.017-.261 2.68-.558a5.898 5.898 0 002.188-1.424 5.898 5.898 0 001.424-2.188c.297-.663.498-1.45.558-2.68.056-1.233.072-1.64.072-5.261 0-3.621-.016-4.028-.072-5.261-.06-1.23-.261-2.017-.558-2.68a5.898 5.898 0 00-1.424-2.188A5.898 5.898 0 0019.852.63c-.663-.297-1.45-.498-2.68-.558C16.045.016 15.638 0 12.017 0zm0 2.16c3.563 0 3.983.016 5.384.078 1.298.06 2.003.282 2.474.468a4.108 4.108 0 011.526.99c.45.45.832.95.99 1.526.186.471.408 1.176.468 2.474.062 1.401.078 1.821.078 5.384 0 3.563-.016 3.983-.078 5.384-.06 1.298-.282 2.003-.468 2.474a4.108 4.108 0 01-.99 1.526c-.45.45-.95.832-1.526.99-.471.186-1.176.408-2.474.468-1.401.062-1.821.078-5.384.078-3.563 0-3.983-.016-5.384-.078-1.298-.06-2.003-.282-2.474-.468a4.108 4.108 0 01-1.526-.99 4.108 4.108 0 01-.99-1.526c-.186-.471-.408-1.176-.468-2.474-.062-1.401-.078-1.821-.078-5.384 0-3.563.016-3.983.078-5.384.06-1.298.282-2.003.468-2.474a4.108 4.108 0 01.99-1.526 4.108 4.108 0 011.526-.99c.471-.186 1.176-.408 2.474-.468 1.401-.062 1.821-.078 5.384-.078zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12.017 16a4 4 0 110-8 4 4 0 010 8zm7.846-10.405a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
                  </svg>
                </a>
              )}
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
                className={`${isDark ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-700'} hover:underline`}
              >
                Listralize
              </a>
            </p>
          </div>
          
          {/* Copyright e links */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className={`text-sm ${isDark ? 'text-white' : 'text-black'} font-satoshi`}>
              © {currentYear} {footerData.companyName}. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6">
              <a 
                href="/politica-privacidade" 
                className={`text-sm ${isDark ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-700'} font-satoshi hover:underline`}
              >
                Política de Privacidade
              </a>
              <a 
                href="/termos-uso" 
                className={`text-sm ${isDark ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-700'} font-satoshi hover:underline`}
              >
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
      </footer>
    </>
  );
};

export default Footer;
