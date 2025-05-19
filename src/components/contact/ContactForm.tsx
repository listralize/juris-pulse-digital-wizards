
import React, { useRef, useState } from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { Checkbox } from "../ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { ChevronDown, MessageCircle, HelpCircle, Phone, Mail, Send } from 'lucide-react';
import gsap from 'gsap';
import { useTheme } from '../ThemeProvider';

interface ContactFormProps {
  onSubmitSuccess: () => void;
  isSubmitting?: boolean;
}

// Updated with more client-focused language
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

const ContactForm: React.FC<ContactFormProps> = ({ onSubmitSuccess, isSubmitting = false }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    focused: '',
    urgent: false,
  });
  
  const formRef = useRef<HTMLFormElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (value: string) => {
    setFormState(prev => ({ ...prev, service: value }));
  };

  const handleUrgentChange = (checked: boolean) => {
    setFormState(prev => ({ ...prev, urgent: checked }));
  };
  
  const handleFocus = (field: string) => {
    setFormState(prev => ({ ...prev, focused: field }));
  };
  
  const handleBlur = () => {
    setFormState(prev => ({ ...prev, focused: '' }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formState);
    
    // Animate form submission
    const tl = gsap.timeline();
    if (formContainerRef.current) {
      tl.to(formContainerRef.current, { 
        y: -20, 
        opacity: 0, 
        duration: 0.5,
        onComplete: () => {
          onSubmitSuccess();
          setFormState(prev => ({
            ...prev,
            name: '',
            email: '',
            phone: '',
            service: '',
            message: '',
            urgent: false
          }));
        }
      });
      
      tl.to(formContainerRef.current, { 
        y: 0, 
        opacity: 1, 
        duration: 0.5,
        delay: 0.3
      });
    }
  };

  const getServiceIcon = () => {
    return <MessageCircle className="h-4 w-4 opacity-70" />;
  };

  return (
    <div 
      ref={formContainerRef} 
      className={`p-4 md:p-5 ${isDark ? 'bg-black/90 border-gray-800' : 'bg-white/90 border-gray-100'} shadow-lg border rounded-lg flex flex-col max-h-[600px]`}
    >
      <div className="mb-4">
        <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Como podemos ajudar você?
        </h3>
        <p className={`text-sm ${isDark ? 'text-white/80' : 'text-gray-600'}`}>
          Conte-nos sobre seu problema jurídico e entraremos em contato rapidamente.
        </p>
      </div>
      
      <form 
        ref={formRef} 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-3 overflow-y-auto pr-1 scrollbar-thin"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className={`input-floating transition-all duration-300 ${formState.focused === 'name' ? (isDark ? 'border-white' : 'border-black') : ''} ${isDark ? 'bg-[#0A0A0A] text-white' : ''}`}>
            <input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              onFocus={() => handleFocus('name')}
              onBlur={handleBlur}
              placeholder=" "
              required
              className={`focus:ring-0 w-full ${isDark ? 'bg-transparent text-white placeholder-white/50' : ''}`}
            />
            <label htmlFor="name" className={isDark ? 'text-white/70' : ''}>Nome</label>
          </div>
          
          <div className={`input-floating transition-all duration-300 ${formState.focused === 'phone' ? (isDark ? 'border-white' : 'border-black') : ''} ${isDark ? 'bg-[#0A0A0A] text-white' : ''}`}>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formState.phone}
              onChange={handleChange}
              onFocus={() => handleFocus('phone')}
              onBlur={handleBlur}
              placeholder=" "
              className={`focus:ring-0 w-full ${isDark ? 'bg-transparent text-white placeholder-white/50' : ''}`}
            />
            <label htmlFor="phone" className={isDark ? 'text-white/70' : ''}><Phone className="inline h-3 w-3 mr-1" />Telefone</label>
          </div>
        </div>
        
        <div className={`input-floating transition-all duration-300 ${formState.focused === 'email' ? (isDark ? 'border-white' : 'border-black') : ''} ${isDark ? 'bg-[#0A0A0A] text-white' : ''}`}>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            onFocus={() => handleFocus('email')}
            onBlur={handleBlur}
            placeholder=" "
            required
            className={`focus:ring-0 w-full ${isDark ? 'bg-transparent text-white placeholder-white/50' : ''}`}
          />
          <label htmlFor="email" className={isDark ? 'text-white/70' : ''}><Mail className="inline h-3 w-3 mr-1" />E-mail</label>
        </div>
        
        <div className="form-group">
          <label htmlFor="service" className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/90' : 'text-gray-700'}`}>
            Qual problema você precisa resolver?
          </label>
          <Select onValueChange={handleServiceChange} value={formState.service}>
            <SelectTrigger className={`w-full ${isDark ? 'bg-[#0A0A0A] border-gray-800 text-white' : 'bg-white'}`}>
              <SelectValue placeholder="Selecione seu problema jurídico" />
            </SelectTrigger>
            <SelectContent className={`${isDark ? 'bg-[#0F0F0F] border-gray-800 text-white' : ''}`}>
              {serviceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className={`input-floating transition-all duration-300 ${formState.focused === 'message' ? (isDark ? 'border-white' : 'border-black') : ''} ${isDark ? 'bg-[#0A0A0A] text-white' : ''}`}>
          <textarea
            id="message"
            name="message"
            value={formState.message}
            onChange={handleChange}
            onFocus={() => handleFocus('message')}
            onBlur={handleBlur}
            placeholder=" "
            required
            className={`focus:ring-0 h-20 resize-none w-full ${isDark ? 'bg-transparent text-white placeholder-white/50' : ''}`}
          ></textarea>
          <label htmlFor="message" className={isDark ? 'text-white/70' : ''}><MessageCircle className="inline h-3 w-3 mr-1" />Detalhes do seu caso</label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="urgent" 
            checked={formState.urgent}
            onCheckedChange={handleUrgentChange}
            className={isDark ? "border-white/50" : ""}
          />
          <label
            htmlFor="urgent"
            className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${isDark ? 'text-white/90' : 'text-gray-700'}`}
          >
            Preciso de atendimento urgente
          </label>
        </div>
        
        <div className="mt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all ${
              isDark 
                ? 'bg-white text-black hover:bg-gray-200' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </span>
            ) : (
              <>
                <Send className="h-4 w-4" /> 
                <span>Enviar mensagem</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
