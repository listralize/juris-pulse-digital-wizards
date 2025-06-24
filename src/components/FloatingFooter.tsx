
import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const FloatingFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
  const handlePhoneClick = () => {
    window.open(`tel:${footerData.phone.replace(/\D/g, '')}`, '_self');
  };

  const handleEmailClick = () => {
    window.open(`mailto:${footerData.email}`, '_self');
  };

  const handleLocationClick = () => {
    const encodedAddress = encodeURIComponent(footerData.address);
    const mapsUrl = `https://maps.google.com/?q=${encodedAddress}`;
    window.open(mapsUrl, '_blank');
  };

  const handleWhatsAppClick = () => {
    window.open(`https://api.whatsapp.com/send?phone=${footerData.whatsapp}`, '_blank');
  };

  return (
    <footer 
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 
        w-[95%] max-w-4xl mx-auto rounded-2xl shadow-2xl backdrop-blur-md
        ${isDark 
          ? 'bg-black/90 border border-white/20 text-white' 
          : 'bg-white/95 border border-gray-200 text-black'
        }
        transition-all duration-300 hover:shadow-3xl`}
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}
    >
      <div className="px-4 py-3 sm:px-6 sm:py-4">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <img 
              src={isDark ? "/lovable-uploads/a8cf659d-921d-41fb-a37f-3639b3f036d0.png" : "/lovable-uploads/d43d5ba7-bbba-42dd-8cee-0cdd11892e68.png"} 
              alt={`${footerData.companyName} Logo`} 
              className="h-8 object-contain"
            />
            <div className="flex items-center space-x-6">
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
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full
                  ${isDark 
                    ? 'bg-white/10 text-white' 
                    : 'bg-black/10 text-black'
                  }`}
                title="Horário de funcionamento: Seg-Sex 9:00-18:00"
              >
                <Clock className="h-4 w-4" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleWhatsAppClick}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105
                ${isDark 
                  ? 'bg-white text-black hover:bg-gray-100' 
                  : 'bg-black text-white hover:bg-gray-800'
                }`}
            >
              WhatsApp
            </button>
            <div className="text-xs opacity-60">
              © {currentYear} {footerData.companyName}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-3">
            <img 
              src={isDark ? "/lovable-uploads/a8cf659d-921d-41fb-a37f-3639b3f036d0.png" : "/lovable-uploads/d43d5ba7-bbba-42dd-8cee-0cdd11892e68.png"} 
              alt={`${footerData.companyName} Logo`} 
              className="h-6 object-contain"
            />
            <button 
              onClick={handleWhatsAppClick}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 hover:scale-105
                ${isDark 
                  ? 'bg-white text-black hover:bg-gray-100' 
                  : 'bg-black text-white hover:bg-gray-800'
                }`}
            >
              WhatsApp
            </button>
          </div>
          
          <div className="flex items-center justify-center space-x-6 mb-3">
            {/* Ícone do Telefone Mobile */}
            <button
              onClick={handlePhoneClick}
              className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:scale-110
                ${isDark 
                  ? 'bg-white/10 hover:bg-white/20 text-white' 
                  : 'bg-black/10 hover:bg-black/20 text-black'
                }`}
              title={`Ligar para ${footerData.phone}`}
            >
              <Phone className="h-5 w-5" />
            </button>

            {/* Ícone do Email Mobile */}
            <button
              onClick={handleEmailClick}
              className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:scale-110
                ${isDark 
                  ? 'bg-white/10 hover:bg-white/20 text-white' 
                  : 'bg-black/10 hover:bg-black/20 text-black'
                }`}
              title={`Enviar email para ${footerData.email}`}
            >
              <Mail className="h-5 w-5" />
            </button>

            {/* Ícone da Localização Mobile */}
            <button
              onClick={handleLocationClick}
              className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:scale-110
                ${isDark 
                  ? 'bg-white/10 hover:bg-white/20 text-white' 
                  : 'bg-black/10 hover:bg-black/20 text-black'
                }`}
              title={`Ver localização: ${footerData.address}`}
            >
              <MapPin className="h-5 w-5" />
            </button>

            {/* Ícone do Horário Mobile */}
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full
                ${isDark 
                  ? 'bg-white/10 text-white' 
                  : 'bg-black/10 text-black'
                }`}
              title="Horário de funcionamento: Seg-Sex 9:00-18:00"
            >
              <Clock className="h-5 w-5" />
            </div>
          </div>
          
          <div className="text-center text-xs opacity-60 pt-2 border-t border-current/20">
            © {currentYear} {footerData.companyName}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FloatingFooter;
