
import React from 'react';
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormControl, FormLabel } from "../../ui/form";
import { Checkbox } from '../../ui/checkbox';
import { useTheme } from '../../ThemeProvider';

interface UrgentCheckboxProps {
  darkBackground?: boolean;
}

const UrgentCheckbox: React.FC<UrgentCheckboxProps> = ({ darkBackground = false }) => {
  const { theme } = useTheme();
  const isDark = darkBackground || theme === 'dark';
  const form = useFormContext();
  
  return (
    <FormField
      control={form.control}
      name="urgent"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              className={isDark ? 'border-white/40 data-[state=checked]:bg-white data-[state=checked]:text-black' : ''}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel className={isDark ? 'text-white/80' : 'text-gray-700'}>
              Preciso de atendimento urgente
            </FormLabel>
          </div>
        </FormItem>
      )}
    />
  );
};

export default UrgentCheckbox;
