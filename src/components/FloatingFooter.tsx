
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
    whatsapp: '5562994594496'
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
          .select('phone, email, address, whatsapp')
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
            ...(contact?.whatsapp && { whatsapp: contact.whatsapp })
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

  return (
    <footer 
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 
        w-[95%] max-w-6xl mx-auto rounded-2xl shadow-2xl backdrop-blur-md
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
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Phone className="h-3 w-3" />
                <a 
                  href={`tel:${footerData.phone.replace(/\D/g, '')}`}
                  className="hover:underline"
                >
                  {footerData.phone}
                </a>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-3 w-3" />
                <a 
                  href={`mailto:${footerData.email}`}
                  className="hover:underline"
                >
                  {footerData.email}
                </a>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span className="text-xs">{footerData.address}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-xs">
              <Clock className="h-3 w-3" />
              <span>Seg-Sex 9:00-18:00</span>
            </div>
            <a 
              href={`https://api.whatsapp.com/send?phone=${footerData.whatsapp}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all duration-300
                ${isDark 
                  ? 'bg-white text-black hover:bg-gray-100' 
                  : 'bg-black text-white hover:bg-gray-800'
                }`}
            >
              WhatsApp
            </a>
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
            <a 
              href={`https://api.whatsapp.com/send?phone=${footerData.whatsapp}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300
                ${isDark 
                  ? 'bg-white text-black hover:bg-gray-100' 
                  : 'bg-black text-white hover:bg-gray-800'
                }`}
            >
              WhatsApp
            </a>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center space-x-1">
              <Phone className="h-3 w-3" />
              <a 
                href={`tel:${footerData.phone.replace(/\D/g, '')}`}
                className="hover:underline truncate"
              >
                {footerData.phone}
              </a>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="h-3 w-3" />
              <a 
                href={`mailto:${footerData.email}`}
                className="hover:underline truncate"
              >
                {footerData.email}
              </a>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{footerData.address}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>Seg-Sex 9:00-18:00</span>
            </div>
          </div>
          
          <div className="text-center text-xs opacity-60 mt-2 pt-2 border-t border-current/20">
            © {currentYear} {footerData.companyName}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FloatingFooter;
