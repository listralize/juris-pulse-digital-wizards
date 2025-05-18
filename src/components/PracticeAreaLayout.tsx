
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { Footer } from './sections';
import { Card, CardContent } from './ui/card';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PracticeAreaLayoutProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  currentArea: string;
}

const PracticeAreaLayout: React.FC<PracticeAreaLayoutProps> = ({ 
  title, 
  description, 
  children, 
  currentArea 
}) => {
  const practiceAreas = [
    { id: 'familia', label: 'Família', path: '/familia' },
    { id: 'tributario', label: 'Tributário', path: '/tributario' },
    { id: 'empresarial', label: 'Empresarial', path: '/empresarial' },
    { id: 'trabalho', label: 'Trabalho', path: '/trabalho' },
    { id: 'constitucional', label: 'Constitucional', path: '/constitucional' },
    { id: 'administrativo', label: 'Administrativo', path: '/administrativo' },
    { id: 'previdenciario', label: 'Previdenciário', path: '/previdenciario' },
    { id: 'consumidor', label: 'Consumidor', path: '/consumidor' }
  ];

  useEffect(() => {
    // Animations
    gsap.fromTo(
      '.hero-title',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
    
    gsap.fromTo(
      '.hero-description',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
    );
    
    gsap.fromTo(
      '.area-navigation',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'power3.out' }
    );
    
    gsap.utils.toArray('.service-card').forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2 + index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
          }
        }
      );
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
    };
  }, [currentArea]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <Navbar />
      
      <div className="hero-section relative pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-0"></div>
        <div className="radial-gradient absolute inset-0 opacity-20 z-0"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-canela font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              {title}
            </h1>
            
            <div className="w-24 h-1 mx-auto bg-white/40 mb-8"></div>
            
            <p className="hero-description text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-200 max-w-3xl mx-auto">
              {description}
            </p>
          </div>
        </div>
      </div>
      
      <div className="area-navigation backdrop-blur-md bg-black/50 border-y border-white/10 py-6 sticky top-[104px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="scroll-container overflow-x-auto p-1 max-w-full flex space-x-2 md:space-x-4 scrollbar-hide">
              {practiceAreas.map((area) => (
                <Link 
                  key={area.id}
                  to={area.path}
                  className={`px-4 py-3 whitespace-nowrap text-sm md:text-base rounded-full transition-all duration-300 flex-shrink-0
                    ${currentArea === area.id 
                      ? 'bg-white text-black font-medium shadow-glow' 
                      : 'text-gray-300 hover:text-white bg-white/5 hover:bg-white/10'}`
                  }
                >
                  {area.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {children}
      </main>
      
      <Footer />
      
      <style jsx>{`
        .radial-gradient {
          background: radial-gradient(circle at center, rgba(60, 60, 60, 0.3) 0%, rgba(0, 0, 0, 0) 70%);
        }
        
        .shadow-glow {
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        }
        
        .scroll-container::-webkit-scrollbar {
          display: none;
        }
        
        .scroll-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default PracticeAreaLayout;
