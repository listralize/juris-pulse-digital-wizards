
import React from 'react';
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../ui/form";
import { Input } from '../../ui/input';
import { Phone } from 'lucide-react';
import { useTheme } from '../../ThemeProvider';

interface NamePhoneFieldsProps {
  darkBackground?: boolean;
}

const NamePhoneFields: React.FC<NamePhoneFieldsProps> = ({ darkBackground = false }) => {
  const { theme } = useTheme();
  const isDark = darkBackground || theme === 'dark';
  const form = useFormContext();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className={isDark ? 'text-white/80' : 'text-gray-700'}>
              Nome
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="Seu nome completo" 
                className={`${isDark 
                  ? 'bg-white/5 border-white/20 text-white placeholder:text-white/40' 
                  : 'bg-white border-gray-300 text-black'}`} 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className={isDark ? 'text-white/80' : 'text-gray-700'}>
              <Phone className="inline h-3 w-3 mr-1" />Telefone
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="Seu telefone" 
                className={`${isDark 
                  ? 'bg-white/5 border-white/20 text-white placeholder:text-white/40' 
                  : 'bg-white border-gray-300 text-black'}`} 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default NamePhoneFields;
