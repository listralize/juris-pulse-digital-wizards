import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../ThemeProvider';

gsap.registerPlugin(ScrollTrigger);

const practiceAreas = [
  {
    id: 'familia',
    title: 'Direito de Família',
    description: 'Soluções em divórcios, união estável, guarda de filhos e pensão alimentícia.',
    image: '/lovable-uploads/69f01f04-0e29-4493-a363-b0f011029375.png',
    href: '/familia'
  },
  {
    id: 'tributario',
    title: 'Direito Tributário',
    description: 'Planejamento tributário, contencioso fiscal e recuperação de créditos.',
    image: '/lovable-uploads/36d1e670-c31a-4c66-ae2f-dfb952037683.png',
    href: '/tributario'
  },
  {
    id: 'empresarial',
    title: 'Direito Empresarial',
    description: 'Constituição de empresas, contratos e reestruturação societária.',
    image: '/lovable-uploads/a7d8123c-de9a-4ad4-986d-30c7232d4295.png',
    href: '/empresarial'
  },
  {
    id: 'trabalho',
    title: 'Direito do Trabalho',
    description: 'Defesa dos direitos trabalhistas e assessoria empresarial.',
    image: '/lovable-uploads/2425f737-7a9b-4742-9ef6-655d495a7ea9.png',
    href: '/trabalho'
  },
  {
    id: 'constitucional',
    title: 'Direito Constitucional',
    description: 'Defesa de direitos fundamentais e ações constitucionais.',
    image: '/lovable-uploads/aa4517a5-ce63-4dcf-aebf-16a5da902506.png',
    href: '/constitucional'
  },
  {
    id: 'administrativo',
    title: 'Direito Administrativo',
    description: 'Licitações, contratos públicos e processos administrativos.',
    image: '/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png',
    href: '/administrativo'
  },
  {
    id: 'previdenciario',
    title: 'Direito Previdenciário',
    description: 'Aposentadorias, benefícios e planejamento previdenciário.',
    image: '/lovable-uploads/a8cc2627-db98-4461-9afa-8b1f238766e0.png',
    href: '/previdenciario'
  },
  {
    id: 'consumidor',
    title: 'Direito do Consumidor',
    description: 'Defesa dos direitos dos consumidores e práticas abusivas.',
    image: '/lovable-uploads/9b5a5e2d-bc9e-4a28-880e-7b2acf0ff5a6.png',
    href: '/consumidor'
  },
  {
    id: 'civil',
    title: 'Direito Civil',
    description: 'Contratos, responsabilidade civil e direitos patrimoniais.',
    image: '/lovable-uploads/7252dec0-3fde-489c-b568-be9c0b19043a.png',
    href: '/civil'
  }
];

const PracticeAreas = () => {
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
      id="areas"
      ref={sectionRef}
      className={`min-h-screen py-20 px-6 md:px-16 lg:px-24 relative ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'}`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 
          ref={titleRef}
          className={`text-3xl md:text-4xl lg:text-5xl mb-12 font-canela text-center ${isDark ? 'text-white' : 'text-black'}`}
        >
          Áreas de Atuação
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {practiceAreas.map((area, index) => (
            <Link 
              key={area.id}
              to={area.href}
              className="group block"
              ref={el => cardsRef.current[index] = el}
            >
              <div className={`${isDark ? 'bg-black/80 border border-white/10' : 'bg-white/80 border border-black/10'} backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 group-hover:scale-105 h-full`}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={area.image} 
                    alt={area.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className={`text-2xl md:text-3xl font-canela mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                    {area.title}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {area.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
