
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

const ContactInfo: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`${isDark ? 'bg-black/80 border-white/10 text-white' : 'bg-white border-gray-200 text-black'} p-4 border shadow-lg h-full rounded-lg backdrop-blur-sm`}>
      <h3 className={`text-lg font-medium mb-3 ${isDark ? 'text-white' : 'text-black'}`}>Informações de Contato</h3>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <div className={`mr-2 p-1.5 rounded-full ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-black'}`}>
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h4 className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>Endereço</h4>
            <p className={`${isDark ? 'text-white/80' : 'text-gray-700'} font-satoshi`}>
              World Trade Center<br />
              Av. D, Av. 85 - St. Marista<br />
              Goiânia - GO, 74150-040
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className={`mr-2 p-1.5 rounded-full ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-black'}`}>
            <Phone className="w-4 h-4" />
          </div>
          <div>
            <h4 className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>Telefone</h4>
            <a 
              href="https://api.whatsapp.com/send?phone=5562994594496"
              target="_blank"
              rel="noopener noreferrer"
              className={`${isDark ? 'text-white/80 hover:text-white' : 'text-gray-700 hover:text-black'} hover:underline font-satoshi block`}
            >
              +55 62 99459-4496
            </a>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className={`mr-2 p-1.5 rounded-full ${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-black'}`}>
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <h4 className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>E-mail</h4>
            <a 
              href="mailto:contato@stadv.com"
              className={`${isDark ? 'text-white/80 hover:text-white' : 'text-gray-700 hover:text-black'} hover:underline font-satoshi block`}
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
