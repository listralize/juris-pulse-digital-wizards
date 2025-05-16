
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const practiceAreas = [
  {
    id: 'family',
    title: 'Direito da Família',
    description: 'Assessoria completa em questões familiares, divórcios, guarda de filhos e partilha de bens.'
  },
  {
    id: 'tax',
    title: 'Direito Tributário',
    description: 'Planejamento tributário estratégico e defesa em processos administrativos e judiciais.'
  },
  {
    id: 'corporate',
    title: 'Direito Empresarial',
    description: 'Consultoria jurídica para empresas, contratos, fusões, aquisições e compliance.'
  },
  {
    id: 'criminal',
    title: 'Direito Criminal',
    description: 'Defesa técnica especializada em processos criminais e investigações.'
  },
  {
    id: 'constitutional',
    title: 'Direito Constitucional',
    description: 'Atuação em causas que envolvem direitos e garantias fundamentais.'
  },
  {
    id: 'administrative',
    title: 'Direito Administrativo',
    description: 'Representação perante órgãos públicos e defesa em processos administrativos.'
  },
  {
    id: 'labor',
    title: 'Direito do Trabalho',
    description: 'Assessoria para empresas e empregados em questões trabalhistas e previdenciárias.'
  },
  {
    id: 'civil',
    title: 'Direito Civil',
    description: 'Atuação em contratos, responsabilidade civil, propriedade e sucessões.'
  },
  {
    id: 'social-security',
    title: 'Direito Previdenciário',
    description: 'Orientação em benefícios previdenciários, aposentadorias e revisões.'
  },
  {
    id: 'consumer',
    title: 'Direito do Consumidor',
    description: 'Defesa dos direitos do consumidor em relações de consumo.'
  }
];

const PracticeAreas = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
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
    
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.1 * index,
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
    };
  }, []);

  return (
    <section 
      id="areas" 
      ref={sectionRef} 
      className="min-h-screen py-20 px-6 md:px-16 lg:px-24"
    >
      <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl mb-12 font-canela">
        Áreas de Atuação
      </h2>
      
      <div className="overflow-hidden">
        <div className="scroll-container pb-6">
          {practiceAreas.map((area, index) => (
            <div 
              key={area.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="scroll-item area-card"
            >
              <h3 className="text-xl md:text-2xl mb-4 font-canela">{area.title}</h3>
              <p className="text-gray-700 font-satoshi">{area.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
