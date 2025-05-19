
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

const ContactInfo: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`${isDark ? 'glass-card text-white' : 'bg-white border-gray-100 border'} p-3 shadow-lg h-full`}>
      <h3 className={`text-xs font-medium mb-2 ${isDark ? 'text-white' : 'gradient-text'}`}>Informações de Contato</h3>
      
      <div className="space-y-2 text-xs">
        <div className="flex items-start group">
          <div className={`mr-2 p-1 rounded-full ${isDark ? 'bg-white/10 group-hover:bg-white group-hover:text-black' : 'bg-gray-50 group-hover:bg-black group-hover:text-white'} transition-colors duration-300`}>
            <MapPin className="w-2.5 h-2.5" />
          </div>
          <div>
            <h4 className="font-medium text-xs mb-0.5">Endereço</h4>
            <p className={`${isDark ? 'text-white/70' : 'text-gray-700'} font-satoshi text-xs`}>
              World Trade Center<br />
              Av. D, Av. 85 - St. Marista<br />
              Goiânia - GO, 74150-040
            </p>
          </div>
        </div>
        
        <div className="flex items-start group">
          <div className={`mr-2 p-1 rounded-full ${isDark ? 'bg-white/10 group-hover:bg-white group-hover:text-black' : 'bg-gray-50 group-hover:bg-black group-hover:text-white'} transition-colors duration-300`}>
            <Phone className="w-2.5 h-2.5" />
          </div>
          <div>
            <h4 className="font-medium text-xs mb-0.5">Telefone</h4>
            <a 
              href="https://api.whatsapp.com/send?phone=5562994594496"
              target="_blank"
              rel="noopener noreferrer"
              className={`${isDark ? 'text-white/70' : 'text-gray-900'} hover:underline font-satoshi block text-xs`}
            >
              +55 62 99459-4496
            </a>
          </div>
        </div>
        
        <div className="flex items-start group">
          <div className={`mr-2 p-1 rounded-full ${isDark ? 'bg-white/10 group-hover:bg-white group-hover:text-black' : 'bg-gray-50 group-hover:bg-black group-hover:text-white'} transition-colors duration-300`}>
            <Mail className="w-2.5 h-2.5" />
          </div>
          <div>
            <h4 className="font-medium text-xs mb-0.5">E-mail</h4>
            <a 
              href="mailto:contato@stadv.com"
              className={`${isDark ? 'text-white/70' : 'text-gray-900'} hover:underline font-satoshi block text-xs`}
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
