
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { Footer } from './sections';
import CustomCursor from './CustomCursor';
import WhatsAppButton from './WhatsAppButton';
import Sidebar from './Sidebar';
import { useTheme } from './ThemeProvider';

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
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <CustomCursor />
      <Sidebar activeSection="areas" onSectionChange={() => {}} />
      <WhatsAppButton />
      
      <Navbar />
      
      <main className="flex-grow">
        <section className={`py-20 px-6 md:px-16 lg:px-24 ${isDark ? 'bg-black text-white' : 'bg-white text-black'} relative`}>
          <div className="max-w-6xl mx-auto">
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-canela mb-10 ${isDark ? 'text-white' : 'text-black'}`}>{title}</h1>
            <div className={`w-24 h-1 ${isDark ? 'bg-white/40' : 'bg-black/40'} mb-10`}></div>
            <p className={`text-lg md:text-xl max-w-3xl ${isDark ? 'text-white/80' : 'text-black/80'}`}>
              {description}
            </p>
          </div>
        </section>
        
        <section className={`py-6 px-6 md:px-16 lg:px-24 ${isDark ? 'bg-black border-white/10' : 'bg-white border-black/10'} border-y sticky top-20 z-40`}>
          <div className="max-w-6xl mx-auto overflow-x-auto scrollbar-hide">
            <div className="flex space-x-4 py-2">
              {practiceAreas.map((area) => (
                <Link 
                  key={area.id}
                  to={area.path}
                  className={`px-6 py-2 whitespace-nowrap rounded-full transition-colors duration-300 ${
                    currentArea === area.id 
                      ? (isDark ? 'bg-white text-black' : 'bg-black text-white')
                      : (isDark ? 'text-white/70 hover:text-white bg-white/10 hover:bg-white/20' : 'text-black/70 hover:text-black bg-black/10 hover:bg-black/20')
                  }`}
                >
                  {area.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      
        <section className={`py-20 px-6 md:px-16 lg:px-24 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </section>
      </main>
      
      <Footer />
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default PracticeAreaLayout;
