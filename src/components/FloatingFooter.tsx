import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';
import { MessageSquare, Mail, MapPin, X } from 'lucide-react';

const FloatingFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [isMobile, setIsMobile] = useState(false);

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Estados locais para dados editáveis do footer
  const [footerData, setFooterData] = useState({
    companyName: 'Serafim & Trombela Advocacia',
    phone: '(62) 99459-4496',
    email: 'contato@stadv.com',
    address: 'World Trade Center, Goiânia - GO',
    whatsapp: '5562994594496',
    mapUrl: 'https://maps.google.com/?q=World+Trade+Center+Goiânia+GO'
  });

  // Carregar dados iniciais do Supabase
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const { supabase } = await import('../integrations/supabase/client');
        
        // Carregar dados do footer_info
        const { data: footer } = await supabase
          .from('footer_info')
          .select('company_name')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        // Carregar dados do contact_info
        const { data: contact } = await supabase
          .from('contact_info')
          .select('phone, email, address, whatsapp, map_embed_url')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (footer || contact) {
          setFooterData(prev => ({
            ...prev,
            ...(footer?.company_name && { companyName: footer.company_name }),
            ...(contact?.phone && { phone: contact.phone }),
            ...(contact?.email && { email: contact.email }),
            ...(contact?.address && { address: contact.address }),
            ...(contact?.whatsapp && { whatsapp: contact.whatsapp }),
            ...(contact?.map_embed_url && { mapUrl: contact.map_embed_url })
          }));
        }
      } catch (error) {
        console.error('❌ FloatingFooter: Erro ao carregar dados:', error);
      }
    };

    loadInitialData();
  }, []);

  // Escutar eventos de atualização em tempo real
  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      const data = event.detail;
      
      // Atualizar dados do footer
      if (data.footerTexts) {
        const { companyName } = data.footerTexts;
        setFooterData(prev => ({
          ...prev,
          ...(companyName !== undefined && { companyName })
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

  // Funções para ações dos ícones
  const handleWhatsAppClick = () => {
    window.open(`https://api.whatsapp.com/send?phone=${footerData.whatsapp}`, '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${footerData.email}`;
  };

  const handleLocationClick = () => {
    const encodedAddress = encodeURIComponent(footerData.address);
    const mapsUrl = `https://maps.google.com/?q=${encodedAddress}`;
    window.open(mapsUrl, '_blank');
  };


  // Se for mobile, não renderizar nada
  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* Desktop Only Footer */}
      <footer 
        className={`fixed bottom-3 left-1/2 transform -translate-x-1/2 z-50 
          w-[95%] max-w-4xl mx-auto rounded-xl backdrop-blur-md
          ${isDark 
            ? 'bg-neutral-950/60 border border-neutral-800/60 text-white shadow-xl' 
            : 'bg-white/60 border border-neutral-200/60 text-black shadow-2xl'
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
                {/* Ícone do WhatsApp */}
                <button
                  onClick={handleWhatsAppClick}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110
                    ${isDark 
                      ? 'bg-white/10 hover:bg-white/20 text-white' 
                      : 'bg-black/10 hover:bg-black/20 text-black'
                    }`}
                  title="Falar no WhatsApp"
                >
                  <MessageSquare className="h-4 w-4" />
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

    </>
  );
};

export default FloatingFooter;
