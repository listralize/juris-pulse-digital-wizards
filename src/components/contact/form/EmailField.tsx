
import React from 'react';
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../ui/form";
import { Input } from '../../ui/input';
import { Mail } from 'lucide-react';
import { useTheme } from '../../ThemeProvider';

interface EmailFieldProps {
  darkBackground?: boolean;
}

const EmailField: React.FC<EmailFieldProps> = ({ darkBackground = false }) => {
  const { theme } = useTheme();
  const isDark = darkBackground || theme === 'dark';
  const form = useFormContext();
  
  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel className={isDark ? 'text-white/80' : 'text-gray-700'}>
            <Mail className="inline h-3 w-3 mr-1" />E-mail
          </FormLabel>
          <FormControl>
            <Input 
              placeholder="Seu e-mail" 
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
  );
};

export default EmailField;
