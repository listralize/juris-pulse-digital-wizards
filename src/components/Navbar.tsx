
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <div className="flex-shrink-0">
            <Link to="/">
              <img 
                src="/lovable-uploads/2425f737-7a9b-4742-9ef6-655d495a7ea9.png" 
                alt="Serafim & Trombela Advocacia Logo" 
                className="h-10"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
