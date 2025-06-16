
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useSupabaseData } from '../hooks/useSupabaseData';

const WhatsAppButton = () => {
  const { pageTexts } = useSupabaseData();
  const whatsappNumber = pageTexts.contactTexts.whatsapp || '5562994594496';
  
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
