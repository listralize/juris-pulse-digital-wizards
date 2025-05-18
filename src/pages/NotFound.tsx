
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useTheme } from '../components/ThemeProvider';

const NotFound = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className={`text-4xl md:text-6xl font-canela mb-4 ${isDark ? 'text-white' : 'text-black'}`}>404</h1>
          <h2 className={`text-2xl md:text-3xl mb-6 font-satoshi ${isDark ? 'text-white/80' : 'text-black/80'}`}>Página não encontrada</h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
            A página que você está procurando não existe ou foi movida.
          </p>
          <Link 
            to="/" 
            className={`inline-block px-6 py-3 ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} font-medium rounded transition-colors`}
          >
            Voltar para a Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
