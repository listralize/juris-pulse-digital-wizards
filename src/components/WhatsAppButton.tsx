
import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAnalytics } from '@/hooks/useAnalytics';

const WhatsAppButton = () => {
  const [whatsappNumber, setWhatsappNumber] = useState('5562994594496');
  const { trackConversion, sessionId, visitorId } = useAnalytics();
  
  // Carregar dados do Supabase
  useEffect(() => {
    const loadWhatsAppNumber = async () => {
      try {
        const { data: contact } = await supabase
          .from('contact_info')
          .select('whatsapp')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (contact && contact.whatsapp) {
          setWhatsappNumber(contact.whatsapp);
        }
      } catch (error) {
        console.error('❌ WhatsAppButton: Erro ao carregar número do WhatsApp:', error);
      }
    };

    loadWhatsAppNumber();
  }, []);

  // Escutar eventos de atualização
  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      if (event.detail.contactTexts?.whatsapp) {
        setWhatsappNumber(event.detail.contactTexts.whatsapp);
      }
    };

    window.addEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    };
  }, []);

  const handleWhatsAppClick = async () => {
    try {
      console.log('📱 Conversão WhatsApp detectada');

      // Obter informações do dispositivo e localização
      const getDeviceInfo = () => {
        const userAgent = navigator.userAgent;
        let deviceType = 'desktop';
        
        if (/Mobile|Android|iPhone|iPad/.test(userAgent)) {
          deviceType = /iPad|tablet/.test(userAgent) ? 'tablet' : 'mobile';
        }
        
        let browser = 'Unknown';
        if (userAgent.includes('Chrome')) browser = 'Chrome';
        else if (userAgent.includes('Firefox')) browser = 'Firefox';
        else if (userAgent.includes('Safari')) browser = 'Safari';
        else if (userAgent.includes('Edge')) browser = 'Edge';
        
        return { deviceType, browser };
      };

      const getLocationInfo = async () => {
        try {
          const response = await fetch('https://ipapi.co/json/');
          const data = await response.json();
          return {
            country: data.country_name || 'Unknown',
            city: data.city || 'Unknown',
            ip: data.ip || 'Unknown'
          };
        } catch (error) {
          return {
            country: 'Unknown',
            city: 'Unknown',
            ip: 'Unknown'
          };
        }
      };

      const { deviceType, browser } = getDeviceInfo();
      const locationInfo = await getLocationInfo();

      // Dados da conversão WhatsApp
      const whatsappLeadData = {
        type: 'whatsapp_click',
        source: 'whatsapp_button',
        button_location: 'floating_button',
        timestamp: new Date().toISOString(),
        user_action: 'whatsapp_contact_intent'
      };

      // Inserir na tabela form_leads
      const { error: leadError } = await supabase
        .from('form_leads')
        .insert({
          session_id: sessionId,
          visitor_id: visitorId,
          form_id: 'whatsapp_button',
          form_name: 'WhatsApp Button',
          lead_data: whatsappLeadData,
          source_page: window.location.href,
          utm_source: new URLSearchParams(window.location.search).get('utm_source'),
          utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
          utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
          ip_address: locationInfo.ip,
          user_agent: navigator.userAgent,
          device_type: deviceType,
          browser: browser,
          country: locationInfo.country,
          city: locationInfo.city,
          is_whatsapp_conversion: true,
          conversion_value: 50, // Valor estimado da conversão WhatsApp
          status: 'new'
        });

      if (leadError) {
        console.error('❌ Erro ao salvar lead WhatsApp:', leadError);
      } else {
        console.log('✅ Lead WhatsApp salvo com sucesso');
      }

      // Rastrear conversão no analytics
      await trackConversion(
        'whatsapp_button',
        'WhatsApp Button',
        whatsappLeadData,
        {
          source: new URLSearchParams(window.location.search).get('utm_source') || 'direct',
          medium: new URLSearchParams(window.location.search).get('utm_medium') || 'organic',
          campaign: new URLSearchParams(window.location.search).get('utm_campaign') || 'whatsapp'
        }
      );

      console.log('📊 Conversão WhatsApp rastreada nos analytics');

    } catch (error) {
      console.error('❌ Erro ao rastrear conversão WhatsApp:', error);
    }
  };
  
  return (
    <a 
      href={`https://api.whatsapp.com/send?phone=${whatsappNumber}`}
      target="_blank" 
      rel="noopener noreferrer"
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-black hover:bg-gray-900 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center"
      aria-label="Contact us on WhatsApp"
    >
      <MessageSquare className="h-6 w-6 text-white" />
    </a>
  );
};

export default WhatsAppButton;
