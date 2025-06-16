
import React, { useEffect, useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [footerInfo, setFooterInfo] = useState({
    companyName: 'Serafim & Trombela Advocacia',
    description: 'Soluções jurídicas inovadoras com foco em resultados e excelência no atendimento.',
    copyright: '© 2024 Serafim & Trombela Advocacia. Todos os direitos reservados.',
    logo: '/lovable-uploads/a8cf659d-921d-41fb-a37f-3639b3f036d0.png'
  });

  const [contactInfo, setContactInfo] = useState({
    phone: '(62) 99459-4496',
    email: 'contato@stadv.com',
    address: 'World Trade Center, Torre Office e Corporate, Av. D, Av. 85 - St. Marista, Goiânia - GO, 74150-040'
  });

  // Carregar dados do Supabase
  useEffect(() => {
    const loadFooterData = async () => {
      try {
        const { supabase } = await import('../../integrations/supabase/client');
        
        // Carregar informações do rodapé
        const { data: footer } = await supabase
          .from('footer_info')
          .select('company_name, description')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        // Carregar informações de contato
        const { data: contact } = await supabase
          .from('contact_info')
          .select('phone, email, address')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (footer) {
          console.log('🦶 Footer: Dados do rodapé carregados:', footer);
          setFooterInfo(prev => ({
            ...prev,
            companyName: footer.company_name || prev.companyName,
            description: footer.description || prev.description,
            copyright: `© ${new Date().getFullYear()} ${footer.company_name || prev.companyName}. Todos os direitos reservados.`
          }));
        }

        if (contact) {
          console.log('📞 Footer: Dados de contato carregados:', contact);
          setContactInfo({
            phone: contact.phone || '(62) 99459-4496',
            email: contact.email || 'contato@stadv.com',
            address: contact.address || 'World Trade Center, Torre Office e Corporate, Av. D, Av. 85 - St. Marista, Goiânia - GO, 74150-040'
          });
        }
      } catch (error) {
        console.error('❌ Erro ao carregar dados do Footer:', error);
      }
    };

    loadFooterData();
  }, []);

  // Escutar eventos de atualização
  useEffect(() => {
    const handleFooterUpdate = (event: CustomEvent) => {
      console.log('🦶 Footer: Recebendo atualização do rodapé:', event.detail);
      if (event.detail.footerTexts) {
        const { companyName, description } = event.detail.footerTexts;
        setFooterInfo(prev => ({
          ...prev,
          companyName: companyName || prev.companyName,
          description: description || prev.description,
          copyright: `© ${new Date().getFullYear()} ${companyName || prev.companyName}. Todos os direitos reservados.`
        }));
      }
    };

    const handleContactUpdate = (event: CustomEvent) => {
      console.log('📞 Footer: Recebendo atualização de contato:', event.detail);
      setContactInfo(prev => ({ ...prev, ...event.detail }));
    };

    window.addEventListener('pageTextsUpdated', handleFooterUpdate as EventListener);
    window.addEventListener('contactInfoUpdated', handleContactUpdate as EventListener);
    
    return () => {
      window.removeEventListener('pageTextsUpdated', handleFooterUpdate as EventListener);
      window.removeEventListener('contactInfoUpdated', handleContactUpdate as EventListener);
    };
  }, []);

  return (
    <footer className={`${isDark ? 'bg-black border-t border-white/20' : 'bg-gray-900'} text-white py-12`}>
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Informações da Empresa */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src={footerInfo.logo} 
                alt={footerInfo.companyName}
                className="h-8 w-auto mr-3"
                style={{ filter: isDark ? 'none' : 'invert(1)' }}
              />
              <h3 className="text-xl font-canela">{footerInfo.companyName}</h3>
            </div>
            <p className="text-gray-300 font-satoshi mb-6 leading-relaxed">
              {footerInfo.description}
            </p>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-lg font-canela mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <a 
                  href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
                  className="text-gray-300 hover:text-white font-satoshi transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="text-gray-300 hover:text-white font-satoshi transition-colors"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Localização */}
          <div>
            <h4 className="text-lg font-canela mb-4">Localização</h4>
            <div className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
              <p className="text-gray-300 font-satoshi leading-relaxed">
                {contactInfo.address}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 font-satoshi">
            {footerInfo.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
