import React from 'react';
import { useTheme } from './ThemeProvider';
import { Mail, MapPin } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSupabaseData } from '@/hooks/useSupabaseData';

const FloatingFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isMobile = useIsMobile();
  const { contactInfo, footerInfo } = useSupabaseData();

  const companyName = footerInfo?.companyName || 'Serafim & Trombela Advocacia';
  const email = contactInfo?.email || 'contato@stadv.com';
  const whatsapp = contactInfo?.whatsapp || '5562994594496';
  const address = contactInfo?.address || 'World Trade Center, Goiânia - GO';
  const mapUrl = contactInfo?.map_embed_url || '';
  const instagramUrl = contactInfo?.instagram_url || 'https://www.instagram.com/serafimtrombela/';

  const handleWhatsAppClick = () => {
    window.open(`https://api.whatsapp.com/send?phone=${whatsapp}`, '_blank');
  };

  const handleEmailClick = () => {
    navigator.clipboard.writeText(email).then(() => {
      const notification = document.createElement('div');
      notification.textContent = 'Email copiado para a área de transferência!';
      notification.className = `fixed top-4 right-4 z-[100] px-4 py-2 rounded-lg text-sm font-medium ${
        isDark ? 'bg-white text-black' : 'bg-black text-white'
      } shadow-lg transition-all duration-300`;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    }).catch(() => {
      window.location.href = `mailto:${email}`;
    });
  };

  const handleLocationClick = () => {
    if (mapUrl) {
      window.open(mapUrl, '_blank');
    } else {
      window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`, '_blank');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  if (isMobile) return null;

  return (
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
              alt={`${companyName} Logo`} 
              className="h-10 object-contain"
            />
            <div className="flex items-center space-x-4">
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

              <button
                onClick={handleEmailClick}
                onKeyDown={(e) => handleKeyDown(e, handleEmailClick)}
                tabIndex={0}
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2
                  ${isDark 
                    ? 'bg-white/10 hover:bg-white/20 focus:bg-white/20 text-white focus:ring-white/30' 
                    : 'bg-black/10 hover:bg-black/20 focus:bg-black/20 text-black focus:ring-black/30'
                  }`}
                title={`Copiar email: ${email}`}
                aria-label="Copiar email para área de transferência"
              >
                <Mail className="h-4 w-4" />
              </button>

              <button
                onClick={handleLocationClick}
                onKeyDown={(e) => handleKeyDown(e, handleLocationClick)}
                tabIndex={0}
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2
                  ${isDark 
                    ? 'bg-white/10 hover:bg-white/20 focus:bg-white/20 text-white focus:ring-white/30' 
                    : 'bg-black/10 hover:bg-black/20 focus:bg-black/20 text-black focus:ring-black/30'
                  }`}
                title={`Ver localização: ${address}`}
                aria-label="Abrir localização no Google Maps"
              >
                <MapPin className="h-4 w-4" />
              </button>

              <button
                onClick={() => window.open(instagramUrl, '_blank')}
                onKeyDown={(e) => handleKeyDown(e, () => window.open(instagramUrl, '_blank'))}
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
              © {currentYear} {companyName}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FloatingFooter;
