
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../ThemeProvider';

gsap.registerPlugin(ScrollTrigger);

// Partner data
const partners = [
  {
    id: 'trombela',
    name: 'Dr. Enzo Trombela',
    title: 'Advogado',
    oab: 'OAB/GO: 67.754',
    email: 'trombela@stadv.com',
    image: '/lovable-uploads/9b5a5e2d-bc9e-4a28-880e-7b2acf0ff5a6.png', // Swapped image
    description: 'Atuação em Direito Civil e Contratual, com foco em soluções jurídicas para empresas e pessoas físicas.'
  },
  {
    id: 'serafim',
    name: 'Dr. Rafael Serafim',
    title: 'Advogado',
    oab: 'OAB/GO: 67.790',
    email: 'serafim@stadv.com',
    image: '/lovable-uploads/07094fad-fd21-4696-9f5e-6cf1024149a2.png', // Swapped image
    description: 'Especializado em Direito Empresarial e Tributário, com vasta experiência em consultorias e contencioso estratégico.'
  }
];

const Partners = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
    
    tl.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6
      }
    );
    
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2 * index,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      id="socios"
      ref={sectionRef}
      className="min-h-screen py-20 px-6 md:px-16 lg:px-24 relative bg-black dark:bg-black text-white"
    >
      <div className="max-w-6xl mx-auto">
        <h2 
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl mb-12 font-canela text-center text-white"
        >
          Nossos Sócios
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {partners.map((partner, index) => (
            <div 
              key={partner.id}
              className={`bg-black/80 border border-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500`}
              ref={el => cardsRef.current[index] = el}
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="w-32 h-32 overflow-hidden flex-shrink-0 border-2 border-white/20">
                    <img 
                      src={partner.image} 
                      alt={partner.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-canela mb-2 text-white">
                      {partner.name}
                    </h3>
                    <p className="text-sm text-gray-300 mb-1">
                      {partner.title} - {partner.oab}
                    </p>
                    <a 
                      href={`mailto:${partner.email}`} 
                      className="text-sm hover:underline text-white"
                    >
                      {partner.email}
                    </a>
                    <p className="mt-4 text-gray-300">
                      {partner.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
