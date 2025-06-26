import React, { useEffect, useState } from 'react';
import { useTheme } from '../ThemeProvider';

interface FooterProps {
  respectTheme?: boolean;
  showOnMobile?: boolean;
}

const Footer: React.FC<FooterProps> = ({
  respectTheme = true,
  showOnMobile = false
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
    <>
      {/* Desktop Footer - sempre oculto no mobile */}
      <footer 
        className={`hidden md:block fixed bottom-3 left-1/2 transform -translate-x-1/2 z-50 
          w-[95%] max-w-4xl mx-auto rounded-xl shadow-xl backdrop-blur-md
          ${isDark 
            ? 'bg-neutral-950/60 border border-neutral-800/60 text-white' 
            : 'bg-white/60 border border-neutral-200/60 text-black'
          }
          transition-all duration-300 hover:shadow-2xl`}
        style={{
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)'
        }}
      >
        <div className="px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <img 
                src={isDark ? "/lovable-uploads/a8cf659d-921d-41fb-a37f-3639b3f036d0.png" : "/lovable-uploads/d43d5ba7-bbba-42dd-8cee-0cdd11892e68.png"} 
                alt={`${footerData.companyName} Logo`} 
                className="h-10 object-contain"
              />
              <div className="flex items-center space-x-4">
                {/* Ícone do Telefone */}
                <button
                  onClick={handlePhoneClick}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110
                    ${isDark 
                      ? 'bg-white/10 hover:bg-white/20 text-white' 
                      : 'bg-black/10 hover:bg-black/20 text-black'
                    }`}
                  title={`Ligar para ${footerData.phone}`}
                >
                  <Phone className="h-4 w-4" />
                </button>

                {/* Ícone do Email */}
                <button
                  onClick={handleEmailClick}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110
                    ${isDark 
                      ? 'bg-white/10 hover:bg-white/20 text-white' 
                      : 'bg-black/10 hover:bg-black/20 text-black'
                    }`}
                  title={`Enviar email para ${footerData.email}`}
                >
                  <Mail className="h-4 w-4" />
                </button>

                {/* Ícone da Localização */}
                <button
                  onClick={handleLocationClick}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110
                    ${isDark 
                      ? 'bg-white/10 hover:bg-white/20 text-white' 
                      : 'bg-black/10 hover:bg-black/20 text-black'
                    }`}
                  title={`Ver localização: ${footerData.address}`}
                >
                  <MapPin className="h-4 w-4" />
                </button>

                {/* Ícone do Horário */}
                <button
                  onClick={handleTimeClick}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110
                    ${isDark 
                      ? 'bg-white/10 hover:bg-white/20 text-white' 
                      : 'bg-black/10 hover:bg-black/20 text-black'
                    }`}
                  title="Ver horário de funcionamento"
                >
                  <Clock className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 text-xs">
                <a 
                  href="https://listralize.com.br/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`hover:underline transition-colors ${isDark ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'}`}
                >
                  Desenvolvido por Listralize
                </a>
              </div>
              <div className="text-xs opacity-60">
                © {currentYear} {footerData.companyName}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Footer - só aparece quando showOnMobile é true */}
      {showOnMobile && (
        <footer className={`block md:hidden py-8 px-6 border-t ${isDark ? 'border-white/20 bg-black text-white' : 'border-gray-200 bg-white text-black'}`}>
          <div className="max-w-sm mx-auto">
            <div className="text-center space-y-6">
              {/* Logo */}
              <div className="flex justify-center">
                <img 
                  src={isDark ? "/lovable-uploads/a8cf659d-921d-41fb-a37f-3639b3f036d0.png" : "/lovable-uploads/d43d5ba7-bbba-42dd-8cee-0cdd11892e68.png"} 
                  alt={`${footerData.companyName} Logo`} 
                  className={`h-16 object-contain ${isDark ? 'brightness-150' : 'brightness-90'}`}
                  style={{
                    filter: isDark ? 'drop-shadow(0 0 15px rgba(255,255,255,0.2)) drop-shadow(3px 5px 10px rgba(0,0,0,0.95))' : 'drop-shadow(0 0 10px rgba(0,0,0,0.1))'
                  }} 
                />
              </div>

              {/* Descrição */}
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} font-satoshi text-sm leading-relaxed`}>
                {footerData.description}
              </p>

              {/* Contato Rápido */}
              <div className="space-y-3">
                <h4 className={`text-lg font-canela ${isDark ? 'text-white' : 'text-black'}`}>
                  Contato Rápido
                </h4>
                
                <div className="space-y-2">
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} font-satoshi text-sm leading-relaxed`}>
                    {footerData.address}
                  </p>
                  
                  <a 
                    href={`mailto:${footerData.email}`} 
                    className={`${isDark ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-700'} hover:underline font-satoshi text-sm block`}
                  >
                    {footerData.email}
                  </a>
                  
                  <a 
                    href={`tel:${footerData.phone.replace(/\D/g, '')}`}
                    className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'} hover:underline font-satoshi text-sm block`}
                  >
                    {footerData.phone}
                  </a>
                </div>
              </div>

              {/* Atendimento */}
              <div className="space-y-3">
                <h4 className={`text-lg font-canela ${isDark ? 'text-white' : 'text-black'}`}>
                  Atendimento
                </h4>
                
                <div className="space-y-2">
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
                    className={`inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-all duration-300 rounded-md w-full ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`}
                  >
                    Atendimento via WhatsApp
                  </a>
                </div>
              </div>

              {/* Linha inferior com copyright e créditos */}
              <div className={`pt-6 border-t ${isDark ? 'border-white/30' : 'border-black/10'} space-y-3`}>
                {/* Crédito da Listralize */}
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
                
                {/* Copyright */}
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} font-satoshi`}>
                  © {currentYear} {footerData.companyName}. Todos os direitos reservados.
                </p>
                
                {/* Links legais */}
                <div className="flex justify-center space-x-4">
                  <a 
                    href="#" 
                    className={`text-xs ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} font-satoshi hover:underline`}
                  >
                    Política de Privacidade
                  </a>
                  <a 
                    href="#" 
                    className={`text-xs ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} font-satoshi hover:underline`}
                  >
                    Termos de Uso
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* Popup de Horário */}
      {showTimePopup && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className={`relative p-5 rounded-xl shadow-2xl max-w-xs mx-4 ${
            isDark ? 'bg-neutral-950 border border-neutral-800 text-white' : 'bg-white border border-neutral-200 text-black'
          }`}>
            <button
              onClick={() => setShowTimePopup(false)}
              className={`absolute top-3 right-3 p-1 rounded-full transition-colors ${
                isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'
              }`}
            >
              <X className="h-4 w-4" />
            </button>
            
            <div className="text-center">
              <Clock className="h-10 w-10 mx-auto mb-3 opacity-70" />
              <h3 className="text-lg font-semibold mb-3 font-space-grotesk">Horário de Funcionamento</h3>
              <div className="space-y-2 text-sm font-inter">
                <div className="flex justify-between">
                  <span>Segunda a Sexta:</span>
                  <span className="font-medium">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábado:</span>
                  <span className="font-medium">09:00 - 12:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingo:</span>
                  <span className="font-medium">Fechado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
