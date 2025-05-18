
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link to="/">
              <img 
                src="/lovable-uploads/2425f737-7a9b-4742-9ef6-655d495a7ea9.png" 
                alt="Serafim & Trombela Advocacia Logo" 
                className="h-10"
              />
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-black font-medium">Home</Link>
            <Link to="/familia" className="text-gray-700 hover:text-black font-medium">Direito da Família</Link>
            <Link to="/tributario" className="text-gray-700 hover:text-black font-medium">Direito Tributário</Link>
            <Link to="/empresarial" className="text-gray-700 hover:text-black font-medium">Direito Empresarial</Link>
            <Link to="/trabalho" className="text-gray-700 hover:text-black font-medium">Direito do Trabalho</Link>
            <Link to="/constitucional" className="text-gray-700 hover:text-black font-medium">Constitucional</Link>
            <Link to="/administrativo" className="text-gray-700 hover:text-black font-medium">Administrativo</Link>
            <Link to="/previdenciario" className="text-gray-700 hover:text-black font-medium">Previdenciário</Link>
            <Link to="/consumidor" className="text-gray-700 hover:text-black font-medium">Consumidor</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
