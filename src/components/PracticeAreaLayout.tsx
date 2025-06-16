
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import Navbar from './navbar';
import Footer from './sections/Footer';

interface PracticeAreaLayoutProps {
  title: string;
  description: string;
  currentArea: string;
  children: React.ReactNode;
}

const PracticeAreaLayout: React.FC<PracticeAreaLayoutProps> = ({
  title,
  description,
  currentArea,
  children
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'}`}>
      <Navbar />
      
      <div className="pt-20">
        {/* Header com botão voltar */}
        <div className={`${isDark ? 'bg-black border-b border-white/10' : 'bg-white border-b border-gray-200'} py-6`}>
          <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
            <button
              onClick={handleBack}
              className={`flex items-center gap-2 mb-4 ${isDark ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-800'} transition-colors`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Voltar</span>
            </button>
            
            <h1 className={`text-3xl md:text-4xl lg:text-5xl font-canela mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
              {title}
            </h1>
            <p className={`text-lg md:text-xl max-w-4xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {description}
            </p>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12">
          {children}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PracticeAreaLayout;
