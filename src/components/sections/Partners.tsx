
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { useTheme } from '../ThemeProvider';

gsap.registerPlugin(ScrollTrigger);

const partners = [
  {
    id: 'trombela',
    name: 'Dr. Enzo Trombela',
    title: 'Advogado',
    oab: 'OAB/GO: 67.754',
    email: 'trombela@stadv.com',
    image: '/lovable-uploads/07094fad-fd21-4696-9f5e-6cf1024149a2.png',
    description: 'Atuação em Direito Civil e Contratual, com foco em soluções jurídicas para empresas e pessoas físicas.'
  },
  {
    id: 'serafim',
    name: 'Dr. Vinicius Serafim',
    title: 'Advogado',
    oab: 'OAB/GO: 67.790',
    email: 'serafim@stadv.com',
    image: '/lovable-uploads/9b5a5e2d-bc9e-4a28-880e-7b2acf0ff5a6.png',
    description: 'Especializado em Direito Empresarial e Tributário, com vasta experiência em consultorias e contencioso estratégico.'
  }
];

const Partners = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  useEffect(() => {
    // Remove pinning which might cause layout issues
    const animateCards = () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          toggleActions: "play none none reverse"
        }
      });
      
      cardsRef.current.forEach((card, index) => {
        if (card) {
          tl.fromTo(
            card,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: index * 0.2 },
            index > 0 ? "-=0.4" : 0
          );
        }
      });
    };
    
    animateCards();
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
    };
  }, []);

  return (
    <section 
      id="socios"
      ref={sectionRef}
      className={`min-h-screen w-full flex flex-col justify-center items-center ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-black'} py-16 px-4`}
    >
      <div className="max-w-7xl w-full mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-4xl md:text-5xl font-canela mb-2 ${isDark ? 'text-white' : 'text-black'}`}>Sócios</h2>
          <div className={`h-1 w-16 ${isDark ? 'bg-white' : 'bg-black'} mx-auto`}></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {partners.map((partner, index) => (
            <Card 
              key={partner.id}
              className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-none'} shadow-lg hover:shadow-xl transition-shadow duration-300`}
              ref={el => cardsRef.current[index] = el}
            >
              <CardContent className="p-0">
                <div className="flex flex-col p-6">
                  <div className="flex flex-col items-center md:items-start md:flex-row gap-6 mb-6">
                    <div className="w-32 h-32 overflow-hidden rounded-lg flex-shrink-0 border-4 border-white shadow-md bg-white">
                      <img 
                        src={partner.image} 
                        alt={partner.name} 
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    
                    <div className="text-center md:text-left">
                      <h3 className={`text-3xl font-canela mb-1 ${isDark ? 'text-white' : 'text-black'}`}>{partner.name}</h3>
                      <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>{partner.title}</p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{partner.oab}</p>
                    </div>
                  </div>
                  
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed mb-6`}>
                    {partner.description}
                  </p>
                  
                  <a 
                    href={`mailto:${partner.email}`}
                    className={`flex items-center ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'} transition-colors mt-auto self-start font-medium`}
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    {partner.email}
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
