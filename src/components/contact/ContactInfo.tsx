
import React, { useEffect, useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactInfo = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [contactInfo, setContactInfo] = useState({
    phone: '(62) 99459-4496',
    email: 'contato@stadv.com',
    address: 'World Trade Center, Torre Office e Corporate, Av. D, Av. 85 - St. Marista, Goiânia - GO, 74150-040'
  });

  // Carregar dados do Supabase
  useEffect(() => {
    const loadContactInfo = async () => {
      try {
        const { supabase } = await import('../../integrations/supabase/client');
        
        const { data: contact } = await supabase
          .from('contact_info')
          .select('phone, email, address')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (contact) {
          console.log('📞 ContactInfo: Dados carregados do Supabase:', contact);
          setContactInfo({
            phone: contact.phone || '(62) 99459-4496',
            email: contact.email || 'contato@stadv.com',
            address: contact.address || 'World Trade Center, Torre Office e Corporate, Av. D, Av. 85 - St. Marista, Goiânia - GO, 74150-040'
          });
        }
      } catch (error) {
        console.error('❌ Erro ao carregar informações de contato:', error);
      }
    };

    loadContactInfo();
  }, []);

  // Escutar eventos de atualização
  useEffect(() => {
    const handleContactUpdate = (event: CustomEvent) => {
      console.log('📞 ContactInfo: Recebendo atualização:', event.detail);
      setContactInfo(prev => ({ ...prev, ...event.detail }));
    };

    window.addEventListener('contactInfoUpdated', handleContactUpdate as EventListener);
    
    return () => {
      window.removeEventListener('contactInfoUpdated', handleContactUpdate as EventListener);
    };
  }, []);

  return (
    <div className={`p-6 rounded-lg ${isDark ? 'bg-black border border-white/20' : 'bg-white border border-gray-200'} h-full`}>
      <h3 className={`text-xl font-canela mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
        Informações de Contato
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <MapPin className={`w-5 h-5 mt-1 flex-shrink-0 ${isDark ? 'text-white' : 'text-black'}`} />
          <div>
            <p className={`font-satoshi ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {contactInfo.address}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Phone className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-white' : 'text-black'}`} />
          <a 
            href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
            className={`font-satoshi hover:underline ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}
          >
            {contactInfo.phone}
          </a>
        </div>
        
        <div className="flex items-center space-x-3">
          <Mail className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-white' : 'text-black'}`} />
          <a 
            href={`mailto:${contactInfo.email}`}
            className={`font-satoshi hover:underline ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}
          >
            {contactInfo.email}
          </a>
        </div>
        
        <div className="flex items-start space-x-3">
          <Clock className={`w-5 h-5 mt-1 flex-shrink-0 ${isDark ? 'text-white' : 'text-black'}`} />
          <div>
            <p className={`font-satoshi ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Segunda a Sexta<br />
              9:00 - 18:00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
