
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { Footer } from './sections';
import CustomCursor from './CustomCursor';
import WhatsAppButton from './WhatsAppButton';
import Sidebar from './Sidebar';

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

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CustomCursor />
      <Sidebar activeSection="areas" onSectionChange={() => {}} />
      <WhatsAppButton />
      
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-20 px-6 md:px-16 lg:px-24 bg-black text-white relative">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-canela mb-10">{title}</h1>
            <div className="w-24 h-1 bg-white/40 mb-10"></div>
            <p className="text-lg md:text-xl max-w-3xl">
              {description}
            </p>
          </div>
        </section>
        
        <section className="py-10 px-6 md:px-16 lg:px-24 bg-black/90 border-y border-white/10 sticky top-0 z-40">
          <div className="max-w-6xl mx-auto overflow-x-auto hide-scrollbar">
            <div className="flex space-x-4 py-2">
              {practiceAreas.map((area) => (
                <Link 
                  key={area.id}
                  to={area.path}
                  className={`px-6 py-2 whitespace-nowrap rounded-full ${
                    currentArea === area.id 
                      ? 'bg-white text-black' 
                      : 'text-white/70 hover:text-white bg-white/10 hover:bg-white/20'
                  } transition-colors duration-300`
                  }
                >
                  {area.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      
        <section className="py-20 px-6 md:px-16 lg:px-24 bg-black text-white">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </section>
      </main>
      
      <Footer />
      
      <style jsx="true">{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default PracticeAreaLayout;
