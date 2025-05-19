
import React, { useRef, useState } from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from "../ui/checkbox";
import { Phone, Mail, Send } from 'lucide-react';
import gsap from 'gsap';
import { useTheme } from '../ThemeProvider';

interface ContactFormProps {
  onSubmitSuccess: () => void;
  isSubmitting?: boolean;
}

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
        y: -10, 
        opacity: 0, 
        duration: 0.4,
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
        duration: 0.4,
        delay: 0.2
      });
    }
  };

  return (
    <div 
      ref={formContainerRef} 
      className={`p-3 h-full ${isDark ? 'glass-form text-white' : 'bg-white/90 border-gray-100 border'} shadow-lg rounded-lg flex flex-col`}
    >
      <div className="mb-2">
        <h3 className={`text-base font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Como podemos ajudar você?
        </h3>
        <p className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
          Conte-nos sobre seu problema jurídico
        </p>
      </div>
      
      <form 
        ref={formRef} 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-2 flex-grow overflow-y-auto pr-1 scrollbar-thin"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className={`input-floating transition-all duration-300 ${formState.focused === 'name' ? (isDark ? 'border-white/60' : 'border-black') : ''} ${isDark ? 'bg-white/5 text-white' : ''}`}>
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
              className={`focus:ring-0 w-full text-sm ${isDark ? 'bg-transparent text-white placeholder-white/40' : ''}`}
            />
            <label htmlFor="name" className={`text-xs ${isDark ? 'text-white/60' : ''}`}>Nome</label>
          </div>
          
          <div className={`input-floating transition-all duration-300 ${formState.focused === 'phone' ? (isDark ? 'border-white/60' : 'border-black') : ''} ${isDark ? 'bg-white/5 text-white' : ''}`}>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formState.phone}
              onChange={handleChange}
              onFocus={() => handleFocus('phone')}
              onBlur={handleBlur}
              placeholder=" "
              className={`focus:ring-0 w-full text-sm ${isDark ? 'bg-transparent text-white placeholder-white/40' : ''}`}
            />
            <label htmlFor="phone" className={`text-xs ${isDark ? 'text-white/60' : ''}`}><Phone className="inline h-3 w-3 mr-1" />Telefone</label>
          </div>
        </div>
        
        <div className={`input-floating transition-all duration-300 ${formState.focused === 'email' ? (isDark ? 'border-white/60' : 'border-black') : ''} ${isDark ? 'bg-white/5 text-white' : ''}`}>
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
            className={`focus:ring-0 w-full text-sm ${isDark ? 'bg-transparent text-white placeholder-white/40' : ''}`}
          />
          <label htmlFor="email" className={`text-xs ${isDark ? 'text-white/60' : ''}`}><Mail className="inline h-3 w-3 mr-1" />E-mail</label>
        </div>
        
        <div className="form-group">
          <label htmlFor="service" className={`block text-xs font-medium mb-1 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
            Qual problema você precisa resolver?
          </label>
          <Select onValueChange={handleServiceChange} value={formState.service}>
            <SelectTrigger className={`w-full text-sm h-8 ${isDark ? 'bg-white/5 border-white/20 text-white' : 'bg-white'}`}>
              <SelectValue placeholder="Selecione seu problema jurídico" />
            </SelectTrigger>
            <SelectContent className={`${isDark ? 'bg-neutral-800 border-white/10 text-white' : ''}`}>
              {serviceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className={`input-floating transition-all duration-300 ${formState.focused === 'message' ? (isDark ? 'border-white/60' : 'border-black') : ''} ${isDark ? 'bg-white/5 text-white' : ''}`}>
          <textarea
            id="message"
            name="message"
            value={formState.message}
            onChange={handleChange}
            onFocus={() => handleFocus('message')}
            onBlur={handleBlur}
            placeholder=" "
            required
            className={`focus:ring-0 h-14 resize-none w-full text-sm ${isDark ? 'bg-transparent text-white placeholder-white/40' : ''}`}
          ></textarea>
          <label htmlFor="message" className={`text-xs ${isDark ? 'text-white/60' : ''}`}>Detalhes do seu caso</label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="urgent" 
            checked={formState.urgent}
            onCheckedChange={handleUrgentChange}
            className={isDark ? "border-white/40" : ""}
          />
          <label
            htmlFor="urgent"
            className={`text-xs font-medium leading-none ${isDark ? 'text-white/70' : 'text-gray-700'}`}
          >
            Preciso de atendimento urgente
          </label>
        </div>
        
        <div className="mt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center space-x-2 py-1.5 px-4 rounded-md transition-all text-sm ${
              isDark 
                ? 'bg-white text-black hover:bg-white/90' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </span>
            ) : (
              <>
                <Send className="h-3.5 w-3.5" /> 
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
