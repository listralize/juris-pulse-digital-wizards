
import React from 'react';
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../ui/form";
import { Textarea } from '../../ui/textarea';
import { useTheme } from '../../ThemeProvider';

interface MessageFieldProps {
  darkBackground?: boolean;
}

const MessageField: React.FC<MessageFieldProps> = ({ darkBackground = false }) => {
  const { theme } = useTheme();
  const isDark = darkBackground || theme === 'dark';
  const form = useFormContext();
  
  return (
    <FormField
      control={form.control}
      name="message"
      render={({ field }) => (
        <FormItem>
          <FormLabel className={isDark ? 'text-white/80' : 'text-gray-700'}>
            Detalhes do seu caso
          </FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Conte-nos brevemente sobre o seu caso" 
              className={`min-h-[80px] ${isDark 
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

export default MessageField;
