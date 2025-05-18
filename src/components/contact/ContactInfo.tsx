
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactInfo: React.FC = () => {
  return (
    <div className="backdrop-blur-sm bg-white/70 p-8 border border-gray-100 shadow-lg mb-6">
      <h3 className="text-xl font-canela mb-6 gradient-text">Informações de Contato</h3>
      
      <div className="space-y-6">
        <div className="flex items-start group">
          <div className="mr-3 p-2 rounded-full bg-gray-50 group-hover:bg-black group-hover:text-white transition-colors duration-300">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-medium mb-1">Endereço</h4>
            <p className="text-gray-700 font-satoshi">
              World Trade Center<br />
              Av. D, Av. 85 - St. Marista<br />
              Goiânia - GO, 74150-040
            </p>
          </div>
        </div>
        
        <div className="flex items-start group">
          <div className="mr-3 p-2 rounded-full bg-gray-50 group-hover:bg-black group-hover:text-white transition-colors duration-300">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-medium mb-1">Telefone</h4>
            <a 
              href="https://api.whatsapp.com/send?phone=5562994594496"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 hover:underline font-satoshi block"
            >
              +55 62 99459-4496
            </a>
          </div>
        </div>
        
        <div className="flex items-start group">
          <div className="mr-3 p-2 rounded-full bg-gray-50 group-hover:bg-black group-hover:text-white transition-colors duration-300">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-medium mb-1">E-mail</h4>
            <a 
              href="mailto:contato@stadv.com"
              className="text-gray-900 hover:underline font-satoshi block"
            >
              contato@stadv.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
