
import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';

const WhatsAppButton = () => {
  const [whatsappNumber, setWhatsappNumber] = useState('5562994594496');
  
  // Carregar dados do Supabase
  useEffect(() => {
    const loadWhatsAppNumber = async () => {
      try {
        const { supabase } = await import('../integrations/supabase/client');
        
        // Buscar dados da contact_info
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
  
  return (
    <a 
      href={`https://api.whatsapp.com/send?phone=${whatsappNumber}`}
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-black hover:bg-gray-900 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center"
      aria-label="Contact us on WhatsApp"
    >
      <MessageSquare className="h-6 w-6 text-white" />
    </a>
  );
};

export default WhatsAppButton;
