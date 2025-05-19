
import React, { useRef, useState } from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import gsap from 'gsap';
import { useTheme } from '../ThemeProvider';

interface ContactFormProps {
  onSubmitSuccess: () => void;
  isSubmitting?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmitSuccess, isSubmitting = false }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    focused: ''
  });
  
  const formRef = useRef<HTMLFormElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
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
            subject: '',
            message: ''
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

  return (
    <div 
      ref={formContainerRef} 
      className={`p-6 md:p-8 ${isDark ? 'bg-gray-900/90 border-gray-800' : 'bg-white/90 border-gray-100'} shadow-lg border h-full flex flex-col`}
    >
      <form 
        ref={formRef} 
        onSubmit={handleSubmit} 
        className="h-full flex flex-col"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className={`input-floating transition-all duration-300 ${formState.focused === 'name' ? (isDark ? 'border-white' : 'border-black') : ''} ${isDark ? 'bg-gray-800/50 text-white' : ''}`}>
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
              className={`focus:ring-0 w-full ${isDark ? 'bg-transparent text-white placeholder-gray-400' : ''}`}
            />
            <label htmlFor="name" className={isDark ? 'text-gray-300' : ''}>Nome</label>
          </div>
          
          <div className={`input-floating transition-all duration-300 ${formState.focused === 'email' ? (isDark ? 'border-white' : 'border-black') : ''} ${isDark ? 'bg-gray-800/50 text-white' : ''}`}>
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
              className={`focus:ring-0 w-full ${isDark ? 'bg-transparent text-white placeholder-gray-400' : ''}`}
            />
            <label htmlFor="email" className={isDark ? 'text-gray-300' : ''}>E-mail</label>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className={`input-floating transition-all duration-300 ${formState.focused === 'phone' ? (isDark ? 'border-white' : 'border-black') : ''} ${isDark ? 'bg-gray-800/50 text-white' : ''}`}>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formState.phone}
              onChange={handleChange}
              onFocus={() => handleFocus('phone')}
              onBlur={handleBlur}
              placeholder=" "
              className={`focus:ring-0 w-full ${isDark ? 'bg-transparent text-white placeholder-gray-400' : ''}`}
            />
            <label htmlFor="phone" className={isDark ? 'text-gray-300' : ''}>Telefone</label>
          </div>
          
          <div className={`input-floating transition-all duration-300 ${formState.focused === 'subject' ? (isDark ? 'border-white' : 'border-black') : ''} ${isDark ? 'bg-gray-800/50 text-white' : ''}`}>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formState.subject}
              onChange={handleChange}
              onFocus={() => handleFocus('subject')}
              onBlur={handleBlur}
              placeholder=" "
              required
              className={`focus:ring-0 w-full ${isDark ? 'bg-transparent text-white placeholder-gray-400' : ''}`}
            />
            <label htmlFor="subject" className={isDark ? 'text-gray-300' : ''}>Assunto</label>
          </div>
        </div>
        
        <div className={`input-floating mb-8 flex-grow transition-all duration-300 ${formState.focused === 'message' ? (isDark ? 'border-white' : 'border-black') : ''} ${isDark ? 'bg-gray-800/50 text-white' : ''}`}>
          <textarea
            id="message"
            name="message"
            value={formState.message}
            onChange={handleChange}
            onFocus={() => handleFocus('message')}
            onBlur={handleBlur}
            placeholder=" "
            required
            className={`focus:ring-0 h-full min-h-[120px] resize-none w-full ${isDark ? 'bg-transparent text-white placeholder-gray-400' : ''}`}
          ></textarea>
          <label htmlFor="message" className={isDark ? 'text-gray-300' : ''}>Mensagem</label>
        </div>
        
        <div className="mt-auto">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`elegant-button w-full md:w-auto hover:scale-105 transform transition-transform ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </span>
            ) : "Enviar mensagem"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
