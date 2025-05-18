
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    submitted: false,
    focused: ''
  });
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
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
    if (formRef.current) {
      tl.to(formRef.current, { 
        y: -20, 
        opacity: 0, 
        duration: 0.5,
        onComplete: () => {
          setFormState(prev => ({
            ...prev,
            submitted: true,
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
          }));
        }
      });
      
      tl.to(formRef.current, { 
        y: 0, 
        opacity: 1, 
        duration: 0.5,
        delay: 0.3
      });
    }
  };
  
  useEffect(() => {
    if (sectionRef.current) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: true
      });
    }
    
    if (titleRef.current && formRef.current && mapRef.current) {
      // Animate elements on initial load
      const tl = gsap.timeline();
      
      tl.fromTo(
        titleRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
      
      tl.fromTo(
        formRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );
      
      tl.fromTo(
        mapRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
    };
  }, []);

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden bg-white"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white opacity-50 z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 h-full flex flex-col">
        <div ref={titleRef} className="mb-12 relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 font-canela gradient-text">
            Contato
          </h2>
          <div className="h-1 w-16 bg-black"></div>
        </div>
        
        <div className="flex flex-col md:flex-row flex-grow gap-8 lg:gap-16">
          <div className="md:w-1/2 z-10">
            {formState.submitted ? (
              <div ref={formRef} className="h-full flex flex-col items-center justify-center text-center p-8 backdrop-blur-sm bg-white/70 shadow-lg border border-gray-100">
                <div className="w-16 h-16 mb-6 rounded-full bg-green-50 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-canela mb-3">Mensagem Enviada!</h3>
                <p className="text-gray-700 font-satoshi mb-6">
                  Obrigado pelo contato. Retornaremos em breve.
                </p>
                <button
                  onClick={() => setFormState(prev => ({ ...prev, submitted: false }))}
                  className="elegant-button"
                >
                  Enviar nova mensagem
                </button>
              </div>
            ) : (
              <form 
                ref={formRef} 
                onSubmit={handleSubmit} 
                className="p-8 backdrop-blur-sm bg-white/70 shadow-lg border border-gray-100 h-full flex flex-col"
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
                      className="focus:ring-0"
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
                      className="focus:ring-0"
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
                      className="focus:ring-0"
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
                      className="focus:ring-0"
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
                    className="focus:ring-0 h-full min-h-[120px]"
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
            )}
          </div>
          
          <div className="md:w-1/2 z-10 flex flex-col">
            <div className="backdrop-blur-sm bg-white/70 p-8 border border-gray-100 shadow-lg mb-6">
              <h3 className="text-xl font-canela mb-6 gradient-text">Informações de Contato</h3>
              
              <div className="space-y-6">
                <div className="flex items-start group">
                  <div className="mr-3 p-2 rounded-full bg-gray-50 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Endereço</h4>
                    <p className="text-gray-700 font-satoshi">
                      World Trade Center<br />
                      Av. D, Av. 85 - St. Marista<br />
                      Goiânia - GO, 74150-040
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="mr-3 p-2 rounded-full bg-gray-50 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Telefone</h4>
                    <a 
                      href="https://api.whatsapp.com/send?phone=5562994594496"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 hover:underline font-satoshi block"
                    >
                      +55 62 99459-4496
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="mr-3 p-2 rounded-full bg-gray-50 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">E-mail</h4>
                    <a 
                      href="mailto:contato@stadv.com"
                      className="text-gray-900 hover:underline font-satoshi block"
                    >
                      contato@stadv.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div ref={mapRef} className="flex-grow rounded-lg overflow-hidden shadow-lg border border-gray-100 relative">
              <img 
                src="/lovable-uploads/a8cc2627-db98-4461-9afa-8b1f238766e0.png" 
                alt="Localização do escritório"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4">
                <a 
                  href="https://maps.google.com/?q=World+Trade+Center+Goiania" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="elegant-button bg-black/80 backdrop-blur-sm hover:bg-black/100 text-sm py-2 flex items-center"
                >
                  <MapPin className="w-4 h-4 mr-1" /> Abrir no Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
