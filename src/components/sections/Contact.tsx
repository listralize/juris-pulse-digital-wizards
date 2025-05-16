
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const addressRef = useRef<HTMLDivElement>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the form data to a server
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };
  
  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, scaleY: 0.9 },
      {
        opacity: 1,
        scaleY: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    gsap.fromTo(
      formRef.current,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    gsap.fromTo(
      addressRef.current,
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: addressRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
    };
  }, []);

  return (
    <section 
      id="contact" 
      className="min-h-screen py-20 px-6 md:px-16 lg:px-24 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white opacity-50 z-[-1]"></div>
      
      <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl mb-12 font-canela gradient-text">
        Contato
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <form 
          ref={formRef} 
          onSubmit={handleSubmit} 
          className="space-y-8 backdrop-blur-sm bg-white/30 p-8 border border-gray-100 shadow-sm"
        >
          <div className="input-floating">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder=" "
              required
              className="focus:ring-0"
            />
            <label htmlFor="name">Nome</label>
          </div>
          
          <div className="input-floating">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              required
              className="focus:ring-0"
            />
            <label htmlFor="email">E-mail</label>
          </div>
          
          <div className="input-floating">
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder=" "
              required
              className="focus:ring-0"
            />
            <label htmlFor="subject">Assunto</label>
          </div>
          
          <div className="input-floating">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder=" "
              required
              rows={5}
              className="focus:ring-0"
            ></textarea>
            <label htmlFor="message">Mensagem</label>
          </div>
          
          <button
            type="submit"
            className="elegant-button w-full md:w-auto"
          >
            Enviar mensagem
          </button>
        </form>
        
        <div ref={addressRef} className="space-y-6">
          <div className="backdrop-blur-sm bg-white/30 p-8 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-canela mb-4 gradient-text">Informações de Contato</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-1" />
                <div>
                  <h4 className="font-medium mb-1">Endereço</h4>
                  <p className="text-gray-700 font-satoshi">
                    World Trade Center<br />
                    Av. D, Av. 85 - St. Marista<br />
                    Goiânia - GO, 74150-040
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="w-5 h-5 mr-3 mt-1" />
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
              
              <div className="flex items-start">
                <Mail className="w-5 h-5 mr-3 mt-1" />
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
          
          <div className="h-64 md:h-80 bg-gray-100 rounded-none overflow-hidden shadow-sm border border-gray-100">
            <img 
              src="/lovable-uploads/a8cc2627-db98-4461-9afa-8b1f238766e0.png" 
              alt="Localização do escritório"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
