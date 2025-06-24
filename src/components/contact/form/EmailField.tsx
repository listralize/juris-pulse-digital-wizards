
import React from 'react';
import { Input } from '../../ui/input';
import { Mail } from 'lucide-react';
import { useTheme } from '../../ThemeProvider';

interface EmailFieldProps {
  value: string;
  onChange: (value: string) => void;
  darkBackground?: boolean;
}

const EmailField: React.FC<EmailFieldProps> = ({ 
  value,
  onChange,
  darkBackground = false 
}) => {
  const { theme } = useTheme();
  const isDark = darkBackground || theme === 'dark';
  
  return (
    <div className="space-y-2">
      <label className={`text-sm font-medium ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
        <Mail className="inline h-3 w-3 mr-1" />E-mail
      </label>
      <Input 
        placeholder="Seu e-mail" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${isDark 
          ? 'bg-white/5 border-white/20 text-white placeholder:text-white/40' 
          : 'bg-white border-gray-300 text-black'}`} 
      />
    </div>
  );
};

export default EmailField;
