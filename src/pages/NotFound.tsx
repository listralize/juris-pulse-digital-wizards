
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import { useTheme } from '../components/ThemeProvider';
import PageBanner from '../components/PageBanner';
import { Footer } from '../components/sections';
import CustomCursor from '../components/CustomCursor';

const NotFound = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'}`}>
      <CustomCursor />
      <Navbar />
      
      <PageBanner 
        title="Página não encontrada" 
        subtitle="A página que você está procurando não existe ou foi movida."
      />
      
      <div className="flex-grow flex items-center justify-center py-16">
        <div className="text-center px-4">
          <h2 className={`text-6xl md:text-8xl font-canela mb-8 ${isDark ? 'text-white/30' : 'text-black/30'}`}>404</h2>
          <Link 
            to="/" 
            className={`inline-block px-6 py-3 ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} font-medium rounded transition-colors`}
          >
            Voltar para a Home
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
