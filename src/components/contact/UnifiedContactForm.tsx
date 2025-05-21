
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useToast } from "../../hooks/use-toast";
import { Mail, Phone, Loader2 } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor insira um e-mail válido.",
  }),
  phone: z.string().optional(),
  service: z.string(),
  message: z.string().min(10, {
    message: "A mensagem deve ter pelo menos 10 caracteres.",
  }),
  urgent: z.boolean().default(false),
});

interface UnifiedContactFormProps {
  preselectedService?: string;
  darkBackground?: boolean;
}

const UnifiedContactForm: React.FC<UnifiedContactFormProps> = ({ 
  preselectedService,
  darkBackground = false
}) => {
  const { theme } = useTheme();
  const isDark = darkBackground || theme === 'dark';
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: preselectedService || "",
      message: "",
      urgent: false,
    },
  });

  const serviceOptions = [
    { value: "familia", label: "Divórcio e questões familiares" },
    { value: "tributario", label: "Problemas com impostos" },
    { value: "empresarial", label: "Assessoria para sua empresa" },
    { value: "trabalho", label: "Questões trabalhistas" },
    { value: "constitucional", label: "Defesa de direitos fundamentais" },
    { value: "administrativo", label: "Problemas com órgãos públicos" },
    { value: "previdenciario", label: "Aposentadoria e benefícios" },
    { value: "consumidor", label: "Direitos como consumidor" },
    { value: "outro", label: "Outro problema jurídico" }
  ];

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://hook.us1.make.com/30b2rz3ot9c417lv8rlwbusolkuv3a5x', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      if (response.ok) {
        navigate('/obrigado');
      } else {
        throw new Error('Falha ao enviar formulário');
      }
    } catch (error) {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={`p-6 rounded-lg ${
      isDark 
      ? 'bg-black/90 border border-white/10' 
      : 'bg-white border border-gray-200'
    }`}>
      <h3 className={`text-xl font-medium mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
        Precisa de ajuda com seu caso?
      </h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full ${isDark 
              ? 'bg-white text-black hover:bg-white/90' 
              : 'bg-black text-white hover:bg-black/90'} transition-all`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : "Enviar mensagem"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UnifiedContactForm;
