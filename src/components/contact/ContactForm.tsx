
import React, { useRef, useState } from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import gsap from 'gsap';

interface ContactFormProps {
  onSubmitSuccess: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmitSuccess }) => {
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
    <div ref={formContainerRef} className="p-8 backdrop-blur-sm bg-white/70 shadow-lg border border-gray-100 h-full flex flex-col">
      <form 
        ref={formRef} 
        onSubmit={handleSubmit} 
        className="h-full flex flex-col"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className={`input-floating transition-all duration-300 ${formState.focused === 'name' ? 'border-black' : ''}`}>
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
              className="focus:ring-0 w-full"
            />
            <label htmlFor="name">Nome</label>
          </div>
          
          <div className={`input-floating transition-all duration-300 ${formState.focused === 'email' ? 'border-black' : ''}`}>
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
              className="focus:ring-0 w-full"
            />
            <label htmlFor="email">E-mail</label>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className={`input-floating transition-all duration-300 ${formState.focused === 'phone' ? 'border-black' : ''}`}>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formState.phone}
              onChange={handleChange}
              onFocus={() => handleFocus('phone')}
              onBlur={handleBlur}
              placeholder=" "
              className="focus:ring-0 w-full"
            />
            <label htmlFor="phone">Telefone</label>
          </div>
          
          <div className={`input-floating transition-all duration-300 ${formState.focused === 'subject' ? 'border-black' : ''}`}>
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
              className="focus:ring-0 w-full"
            />
            <label htmlFor="subject">Assunto</label>
          </div>
        </div>
        
        <div className={`input-floating mb-8 flex-grow transition-all duration-300 ${formState.focused === 'message' ? 'border-black' : ''}`}>
          <textarea
            id="message"
            name="message"
            value={formState.message}
            onChange={handleChange}
            onFocus={() => handleFocus('message')}
            onBlur={handleBlur}
            placeholder=" "
            required
            className="focus:ring-0 h-full min-h-[120px] resize-none w-full"
          ></textarea>
          <label htmlFor="message">Mensagem</label>
        </div>
        
        <div className="mt-auto">
          <button
            type="submit"
            className="elegant-button w-full md:w-auto hover:scale-105 transform transition-transform"
          >
            Enviar mensagem
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
