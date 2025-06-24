
import React from 'react';
import { Checkbox } from '../../ui/checkbox';
import { useTheme } from '../../ThemeProvider';

interface UrgentCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  darkBackground?: boolean;
}

const UrgentCheckbox: React.FC<UrgentCheckboxProps> = ({ 
  checked,
  onChange,
  darkBackground = false 
}) => {
  const { theme } = useTheme();
  const isDark = darkBackground || theme === 'dark';
  
  return (
    <div className="flex flex-row items-start space-x-3 space-y-0">
      <Checkbox
        checked={checked}
        onCheckedChange={onChange}
        className={isDark ? 'border-white/40 data-[state=checked]:bg-white data-[state=checked]:text-black' : ''}
      />
      <div className="space-y-1 leading-none">
        <label className={`text-sm font-medium ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
          Preciso de atendimento urgente
        </label>
      </div>
    </div>
  );
};

export default UrgentCheckbox;
