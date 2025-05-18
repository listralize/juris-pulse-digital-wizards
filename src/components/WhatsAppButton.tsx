
import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  return (
    <a 
      href="https://api.whatsapp.com/send?phone=5562994594496"
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-40 bg-green-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6 text-white" />
    </a>
  );
};

export default WhatsAppButton;
