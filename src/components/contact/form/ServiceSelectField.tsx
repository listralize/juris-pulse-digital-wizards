
import React from 'react';
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { useTheme } from '../../ThemeProvider';

interface ServiceSelectFieldProps {
  darkBackground?: boolean;
}

const ServiceSelectField: React.FC<ServiceSelectFieldProps> = ({ darkBackground = false }) => {
  const { theme } = useTheme();
  const isDark = darkBackground || theme === 'dark';
  const form = useFormContext();
  
  const serviceOptions = [
    { value: "familia", label: "Divórcio e questões familiares" },
    { value: "tributario", label: "Consultoria tributária" },
    { value: "empresarial", label: "Direito empresarial" },
    { value: "trabalho", label: "Direito trabalhista" },
    { value: "constitucional", label: "Direitos fundamentais" },
    { value: "administrativo", label: "Direito administrativo" },
    { value: "previdenciario", label: "Direito previdenciário" },
    { value: "consumidor", label: "Direito do consumidor" }
  ];
  
  return (
    <FormField
      control={form.control}
      name="service"
      render={({ field }) => (
        <FormItem>
          <FormLabel className={isDark ? 'text-white/80' : 'text-gray-700'}>
            Qual problema você precisa resolver?
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className={`${isDark 
                ? 'bg-white/5 border-white/20 text-white' 
                : 'bg-white border-gray-300 text-black'}`}>
                <SelectValue placeholder="Selecione seu problema jurídico" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className={isDark ? 'bg-neutral-800 border-white/10 text-white' : 'bg-white text-black'}>
              {serviceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ServiceSelectField;
