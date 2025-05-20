
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './navbar';
import { Footer } from './sections';
import CustomCursor from './CustomCursor';
import WhatsAppButton from './WhatsAppButton';
import { useTheme } from './ThemeProvider';
import Loading from './Loading';
import { ArrowDown } from 'lucide-react';
import PageBanner from './PageBanner';

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
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const isDark = theme === 'dark';

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Hide scroll indicator on scroll
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
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
      <Navbar />
      
      <main className="flex-grow pb-24"> {/* Added bottom padding for WhatsApp button */}
        {/* Substituindo a seção anterior pelo novo PageBanner */}
        <PageBanner title={title} subtitle={description} />

        {/* Areas navigation */}
        <section className={`py-4 px-6 md:px-16 lg:px-24 ${isDark ? 'bg-black border-white/10' : 'bg-white border-black/10'} border-y sticky top-[89px] z-30 w-full overflow-visible`}>
          <div className="max-w-6xl mx-auto">
            <div className="overflow-x-auto no-scrollbar -mx-2" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none', paddingTop: '5px', paddingBottom: '5px' }}>
              <div className="inline-flex space-x-2 py-2 px-2 min-w-full justify-center" style={{ WebkitOverflowScrolling: 'touch' }}>
                {practiceAreas.map((area) => (
                  <Link 
                    key={area.id}
                    to={area.path}
                    className={`px-4 py-2 whitespace-nowrap rounded-full transition-colors duration-300 flex-shrink-0 ${
                      currentArea === area.id 
                        ? isDark
                          ? 'bg-white text-black'
                          : 'bg-black text-white'
                        : isDark
                          ? 'text-white/70 hover:text-white bg-gray-800 hover:bg-gray-700'
                          : 'text-black/70 hover:text-black bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {area.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      
        {/* Scroll indicator */}
        {showScrollIndicator && (
          <div className="flex justify-center py-6 animate-bounce">
            <ArrowDown className={`w-6 h-6 ${isDark ? 'text-white/70' : 'text-black/70'}`} />
          </div>
        )}
      
        <section className={`py-12 px-6 md:px-16 lg:px-24 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </section>
      </main>
      
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default PracticeAreaLayout;
