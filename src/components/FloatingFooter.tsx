import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';
import { Mail, MapPin, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const FloatingFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const isMobile = useIsMobile();

  // Estados locais para dados editáveis do footer
  const [footerData, setFooterData] = useState({
    companyName: 'Serafim & Trombela Advocacia',
    phone: '(62) 99459-4496',
    email: 'contato@stadv.com',
    address: 'World Trade Center, Goiânia - GO',
    whatsapp: '5562994594496',
    mapUrl: 'https://maps.google.com/?q=World+Trade+Center+Goiânia+GO',
    instagram: ''
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
          .select('phone, email, address, whatsapp, map_embed_url, instagram_url')
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
            ...(contact?.map_embed_url && { mapUrl: contact.map_embed_url }),
            ...(contact?.instagram_url && { instagram: contact.instagram_url })
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
        const { phone, email, address, whatsapp, mapEmbedUrl, map_embed_url, instagram, instagram_url } = data.contactTexts;
        setFooterData(prev => ({
          ...prev,
          ...(phone !== undefined && { phone }),
          ...(email !== undefined && { email }),
          ...(address !== undefined && { address }),
          ...(whatsapp !== undefined && { whatsapp }),
          ...(mapEmbedUrl !== undefined && { mapUrl: mapEmbedUrl }),
          ...(map_embed_url !== undefined && { mapUrl: map_embed_url }),
          ...(instagram !== undefined && { instagram }),
          ...(instagram_url !== undefined && { instagram: instagram_url })
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
    navigator.clipboard.writeText(footerData.email).then(() => {
      // Mostrar notificação de que o email foi copiado
      const notification = document.createElement('div');
      notification.textContent = 'Email copiado para a área de transferência!';
      notification.className = `fixed top-4 right-4 z-[100] px-4 py-2 rounded-lg text-sm font-medium ${
        theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
      } shadow-lg transition-all duration-300`;
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }).catch(() => {
      // Fallback para abrir o cliente de email
      window.location.href = `mailto:${footerData.email}`;
    });
  };

  const handleLocationClick = () => {
    if (footerData.mapUrl) {
      window.open(footerData.mapUrl, '_blank');
    } else {
      // Fallback para busca no Google Maps
      const encodedAddress = encodeURIComponent(footerData.address);
      window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank');
    }
  };

  // Funções para navegação por teclado
  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };


  // Se for mobile, não renderizar nada
  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* Desktop Only Footer */}
      <footer 
        className={`fixed bottom-3 left-1/2 transform -translate-x-1/2 
          w-[95%] max-w-4xl mx-auto rounded-xl backdrop-blur-md
          ${isDark 
            ? 'bg-neutral-950/60 border border-neutral-800/60 text-white shadow-xl' 
            : 'bg-white/60 border border-neutral-200/60 text-black shadow-2xl'
          }
          transition-all duration-300 hover:shadow-2xl`}
        style={{
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
          zIndex: 999998
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
                  onKeyDown={(e) => handleKeyDown(e, handleWhatsAppClick)}
                  tabIndex={0}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 
                    ${isDark 
                      ? 'bg-white/10 hover:bg-white/20 focus:bg-white/20 text-white focus:ring-white/30' 
                      : 'bg-black/10 hover:bg-black/20 focus:bg-black/20 text-black focus:ring-black/30'
                    }`}
                  title="Falar no WhatsApp"
                  aria-label="Abrir WhatsApp"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.905 3.488"/>
                  </svg>
                </button>

                {/* Ícone do Email */}
                <button
                  onClick={handleEmailClick}
                  onKeyDown={(e) => handleKeyDown(e, handleEmailClick)}
                  tabIndex={0}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2
                    ${isDark 
                      ? 'bg-white/10 hover:bg-white/20 focus:bg-white/20 text-white focus:ring-white/30' 
                      : 'bg-black/10 hover:bg-black/20 focus:bg-black/20 text-black focus:ring-black/30'
                    }`}
                  title={`Copiar email: ${footerData.email}`}
                  aria-label="Copiar email para área de transferência"
                >
                  <Mail className="h-4 w-4" />
                </button>

                {/* Ícone da Localização */}
                <button
                  onClick={handleLocationClick}
                  onKeyDown={(e) => handleKeyDown(e, handleLocationClick)}
                  tabIndex={0}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2
                    ${isDark 
                      ? 'bg-white/10 hover:bg-white/20 focus:bg-white/20 text-white focus:ring-white/30' 
                      : 'bg-black/10 hover:bg-black/20 focus:bg-black/20 text-black focus:ring-black/30'
                    }`}
                  title={`Ver localização: ${footerData.address}`}
                  aria-label="Abrir localização no Google Maps"
                >
                  <MapPin className="h-4 w-4" />
                </button>

                {/* Ícone do Instagram */}
                <button
                  onClick={() => window.open('https://www.instagram.com/serafimtrombela/', '_blank')}
                  onKeyDown={(e) => handleKeyDown(e, () => window.open('https://www.instagram.com/serafimtrombela/', '_blank'))}
                  tabIndex={0}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2
                    ${isDark 
                      ? 'bg-white/10 hover:bg-white/20 focus:bg-white/20 text-white focus:ring-white/30' 
                      : 'bg-black/10 hover:bg-black/20 focus:bg-black/20 text-black focus:ring-black/30'
                    }`}
                  title="Seguir no Instagram"
                  aria-label="Abrir Instagram"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.017 0C8.396 0 7.989.016 6.756.072 5.526.132 4.74.333 4.077.63a5.898 5.898 0 00-2.188 1.424A5.898 5.898 0 00.315 4.242c-.297.663-.498 1.45-.558 2.68C.201 8.155.017 8.562.017 12.183c0 3.621.184 4.028.24 5.261.06 1.23.261 2.017.558 2.68.317.868.744 1.605 1.424 2.188a5.898 5.898 0 002.188 1.424c.663.297 1.45.498 2.68.558 1.233.056 1.64.072 5.261.072 3.621 0 4.028-.016 5.261-.072 1.23-.06 2.017-.261 2.68-.558a5.898 5.898 0 002.188-1.424 5.898 5.898 0 001.424-2.188c.297-.663.498-1.45.558-2.68.056-1.233.072-1.64.072-5.261 0-3.621-.016-4.028-.072-5.261-.06-1.23-.261-2.017-.558-2.68a5.898 5.898 0 00-1.424-2.188A5.898 5.898 0 0019.852.63c-.663-.297-1.45-.498-2.68-.558C16.045.016 15.638 0 12.017 0zm0 2.16c3.563 0 3.983.016 5.384.078 1.298.06 2.003.282 2.474.468a4.108 4.108 0 011.526.99c.45.45.832.95.99 1.526.186.471.408 1.176.468 2.474.062 1.401.078 1.821.078 5.384 0 3.563-.016 3.983-.078 5.384-.06 1.298-.282 2.003-.468 2.474a4.108 4.108 0 01-.99 1.526c-.45.45-.95.832-1.526.99-.471.186-1.176.408-2.474.468-1.401.062-1.821.078-5.384.078-3.563 0-3.983-.016-5.384-.078-1.298-.06-2.003-.282-2.474-.468a4.108 4.108 0 01-1.526-.99 4.108 4.108 0 01-.99-1.526c-.186-.471-.408-1.176-.468-2.474-.062-1.401-.078-1.821-.078-5.384 0-3.563.016-3.983.078-5.384.06-1.298.282-2.003.468-2.474a4.108 4.108 0 01.99-1.526 4.108 4.108 0 011.526-.99c.471-.186 1.176-.408 2.474-.468 1.401-.062 1.821-.078 5.384-.078zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12.017 16a4 4 0 110-8 4 4 0 010 8zm7.846-10.405a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
                  </svg>
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
