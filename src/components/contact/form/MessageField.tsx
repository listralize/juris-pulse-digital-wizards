
import React from 'react';
import { Textarea } from '../../ui/textarea';
import { useTheme } from '../../ThemeProvider';

interface MessageFieldProps {
  value: string;
  onChange: (value: string) => void;
  darkBackground?: boolean;
}

const MessageField: React.FC<MessageFieldProps> = ({ 
  value,
  onChange,
  darkBackground = false 
}) => {
  const { theme } = useTheme();
  const isDark = darkBackground || theme === 'dark';
  
  return (
    <div className="space-y-2">
      <label className={`text-sm font-medium ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
        Detalhes do seu caso
      </label>
      <Textarea 
        placeholder="Conte-nos brevemente sobre o seu caso" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`min-h-[80px] ${isDark 
          ? 'bg-white/5 border-white/20 text-white placeholder:text-white/40' 
          : 'bg-white border-gray-300 text-black'}`} 
      />
    </div>
  );
};

export default MessageField;
