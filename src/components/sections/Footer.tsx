
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 px-6 md:px-16 lg:px-24 border-t border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <img 
            src="/lovable-uploads/2425f737-7a9b-4742-9ef6-655d495a7ea9.png" 
            alt="Serafim & Trombela Advocacia Logo"
            className="h-8 md:h-10"
          />
        </div>
        
        <div className="text-sm text-gray-600 font-satoshi text-center md:text-right">
          <p>© {new Date().getFullYear()} Serafim & Trombela Advocacia</p>
          <p>Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
