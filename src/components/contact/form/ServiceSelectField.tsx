
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { useTheme } from '../../ThemeProvider';

interface ServiceSelectFieldProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  darkBackground?: boolean;
}

const ServiceSelectField: React.FC<ServiceSelectFieldProps> = ({ 
  value,
  onChange,
  options,
  darkBackground = false 
}) => {
  const { theme } = useTheme();
  const isDark = darkBackground || theme === 'dark';
  
  return (
    <div className="space-y-2">
      <label className={`text-sm font-medium ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
        Qual problema você precisa resolver?
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={`${isDark 
          ? 'bg-white/5 border-white/20 text-white' 
          : 'bg-white border-gray-300 text-black'}`}>
          <SelectValue placeholder="Selecione seu problema jurídico" />
        </SelectTrigger>
        <SelectContent className={isDark ? 'bg-neutral-800 border-white/10 text-white' : 'bg-white text-black'}>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ServiceSelectField;
