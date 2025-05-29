
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
    title: 'Advogado Sócio',
    oab: 'OAB/GO: 67.754',
    email: 'trombela@stadv.com',
    image: '/lovable-uploads/9b5a5e2d-bc9e-4a28-880e-7b2acf0ff5a6.png',
    description: 'Atuação em Direito Civil e Contratual, com foco em soluções jurídicas para empresas e pessoas físicas.'
  },
  {
    id: 'serafim',
    name: 'Dr. Rafael Serafim',
    title: 'Advogado Sócio',
    oab: 'OAB/GO: 67.790',
    email: 'serafim@stadv.com',
    image: '/lovable-uploads/07094fad-fd21-4696-9f5e-6cf1024149a2.png',
    description: 'Especializado em Direito Empresarial e Tributário, com vasta experiência em consultorias e contencioso estratégico.'
  },
  {
    id: 'lanzana',
    name: 'Dr. João Victor Lanzana',
    title: 'Advogado Associado',
    oab: 'OAB/GO: 71.163',
    email: 'lanzana@stadv.com',
    image: '/lovable-uploads/d11e57cf-ddb3-4377-9caf-91e75503165b.png',
    description: 'Graduado com Mérito Acadêmico (Summa Cum Laude) pela PUC Goiás. Pós-graduado em Direito Penal e Processo Penal pelo Gran Centro Universitário. Atuação em direito privado, especialmente em demandas cíveis, imobiliárias e do consumidor.'
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
      className={`min-h-screen py-20 px-6 md:px-16 lg:px-24 relative ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'}`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 
          ref={titleRef}
          className={`text-3xl md:text-4xl lg:text-5xl mb-12 font-canela text-center ${isDark ? 'text-white' : 'text-black'}`}
        >
          Nossa Equipe
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {partners.map((partner, index) => (
            <div 
              key={partner.id}
              className={`${isDark ? 'bg-black/80 border border-white/10' : 'bg-white/80 border border-black/10'} backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500`}
              ref={el => cardsRef.current[index] = el}
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col items-center text-center gap-6">
                  <div className="w-32 h-32 overflow-hidden flex-shrink-0 border-2 border-white/20">
                    <img 
                      src={partner.image} 
                      alt={partner.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className={`text-2xl md:text-3xl font-canela mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                      {partner.name}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      {partner.title} - {partner.oab}
                    </p>
                    <a 
                      href={`mailto:${partner.email}`} 
                      className={`text-sm hover:underline ${isDark ? 'text-white' : 'text-black'}`}
                    >
                      {partner.email}
                    </a>
                    <p className={`mt-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
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
