
import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  return (
    <a 
      href="https://api.whatsapp.com/send?phone=5562994594496"
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-black hover:bg-gray-900 text-white p-4 rounded-full shadow-lg hover:scale-110 transition duration-300"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6 text-white" />
    </a>
  );
};

export default WhatsAppButton;
