
import React from 'react';
import { Input } from '../../ui/input';
import { Phone } from 'lucide-react';
import { useTheme } from '../../ThemeProvider';

interface NamePhoneFieldsProps {
  nameValue: string;
  phoneValue: string;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  showName: boolean;
  showPhone: boolean;
  darkBackground?: boolean;
}

const NamePhoneFields: React.FC<NamePhoneFieldsProps> = ({ 
  nameValue,
  phoneValue,
  onNameChange,
  onPhoneChange,
  showName,
  showPhone,
  darkBackground = false 
}) => {
  const { theme } = useTheme();
  const isDark = darkBackground || theme === 'dark';
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {showName && (
        <div className="space-y-2">
          <label className={`text-sm font-medium ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
            Nome
          </label>
          <Input 
            placeholder="Seu nome completo" 
            value={nameValue}
            onChange={(e) => onNameChange(e.target.value)}
            className={`${isDark 
              ? 'bg-white/5 border-white/20 text-white placeholder:text-white/40' 
              : 'bg-white border-gray-300 text-black'}`} 
          />
        </div>
      )}
      
      {showPhone && (
        <div className="space-y-2">
          <label className={`text-sm font-medium ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
            <Phone className="inline h-3 w-3 mr-1" />Telefone
          </label>
          <Input 
            placeholder="Seu telefone" 
            value={phoneValue}
            onChange={(e) => onPhoneChange(e.target.value)}
            className={`${isDark 
              ? 'bg-white/5 border-white/20 text-white placeholder:text-white/40' 
              : 'bg-white border-gray-300 text-black'}`} 
          />
        </div>
      )}
    </div>
  );
};

export default NamePhoneFields;
