
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { Footer } from './sections';
import CustomCursor from './CustomCursor';
import WhatsAppButton from './WhatsAppButton';
import Sidebar from './Sidebar';
import { useTheme } from './ThemeProvider';
import Loading from './Loading';

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
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

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

  if (isLoading) {
    return <Loading />;
  }

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
        
        {/* Areas navigation - fixed with overflow handling */}
        <section className={`py-6 px-6 md:px-16 lg:px-24 ${isDark ? 'bg-black border-white/10' : 'bg-white border-black/10'} border-y sticky top-[89px] z-40 w-full`}>
          <div className="max-w-6xl mx-auto">
            <div className="overflow-x-auto no-scrollbar -mx-2" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
              <div className="inline-flex space-x-2 py-2 px-2 min-w-full" style={{ WebkitOverflowScrolling: 'touch' }}>
                {practiceAreas.map((area) => (
                  <Link 
                    key={area.id}
                    to={area.path}
                    className={`px-4 py-2 whitespace-nowrap rounded-full transition-colors duration-300 flex-shrink-0 ${
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
          </div>
        </section>
      
        <section className={`py-20 px-6 md:px-16 lg:px-24 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PracticeAreaLayout;
