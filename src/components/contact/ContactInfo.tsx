
import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

const ContactInfo = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Estados locais para as informações de contato
  const [contactData, setContactData] = useState({
    phone: '(62) 99459-4496',
    email: 'contato@stadv.com',
    address: 'World Trade Center, Torre Office e Corporate, Av. D, Av. 85 - St. Marista, Goiânia - GO, 74150-040',
    whatsapp: '5562994594496'
  });

  // Carregar dados iniciais do Supabase
  useEffect(() => {
    const loadContactInfo = async () => {
      try {
        console.log('📞 ContactInfo: Carregando dados iniciais...');
        const { supabase } = await import('../../integrations/supabase/client');
        
        // Buscar dados da contact_info
        const { data: contact } = await supabase
          .from('contact_info')
          .select('phone, email, address, whatsapp')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (contact) {
          console.log('📞 ContactInfo: Dados de contato encontrados:', contact);
          setContactData({
            phone: contact.phone || contactData.phone,
            email: contact.email || contactData.email,
            address: contact.address || contactData.address,
            whatsapp: contact.whatsapp || contactData.whatsapp
          });
        }
      } catch (error) {
        console.error('❌ ContactInfo: Erro ao carregar informações de contato:', error);
      }
    };

    loadContactInfo();
  }, []);

  // Escutar eventos de atualização em tempo real
  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      console.log('📞 ContactInfo: Evento pageTextsUpdated recebido:', event.detail);
      
      const data = event.detail;
      
      if (data.contactTexts) {
        const { phone, email, address, whatsapp } = data.contactTexts;
        console.log('📞 ContactInfo: Atualizando dados de contato:', data.contactTexts);
        
        setContactData(prev => ({
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
    <div className={`p-4 rounded-lg ${isDark ? 'bg-black text-white' : 'bg-white text-black'} h-full`}>
      <h3 className={`text-lg font-medium mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
        Informações de Contato
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <MapPin className={`w-5 h-5 mt-1 ${isDark ? 'text-white' : 'text-black'}`} />
          <div>
            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-black'}`}>Endereço</p>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {contactData.address}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Phone className={`w-5 h-5 ${isDark ? 'text-white' : 'text-black'}`} />
          <div>
            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-black'}`}>Telefone</p>
            <a 
              href={`tel:${contactData.phone.replace(/\D/g, '')}`}
              className={`text-sm ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'} hover:underline`}
            >
              {contactData.phone}
            </a>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Mail className={`w-5 h-5 ${isDark ? 'text-white' : 'text-black'}`} />
          <div>
            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-black'}`}>E-mail</p>
            <a 
              href={`mailto:${contactData.email}`}
              className={`text-sm ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'} hover:underline`}
            >
              {contactData.email}
            </a>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Clock className={`w-5 h-5 ${isDark ? 'text-white' : 'text-black'}`} />
          <div>
            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-black'}`}>Horário de Atendimento</p>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
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
