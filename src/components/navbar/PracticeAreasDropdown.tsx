
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeProvider';
import { practiceAreas } from './practiceAreas';

interface PracticeAreasDropdownProps {
  isActive: boolean;
}

const PracticeAreasDropdown = ({ isActive }: PracticeAreasDropdownProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="relative group">
      <Link 
        to="#" 
        className={`px-4 py-2 font-medium transition-colors border-b-2 ${
          isActive
            ? (isDark ? 'border-white text-white' : 'border-black text-black') 
            : (isDark ? 'border-transparent text-white/70 hover:text-white' : 'border-transparent text-black/70 hover:text-black')
        }`}
      >
        Áreas de Atuação
      </Link>
      <div className={`absolute left-0 mt-2 w-60 ${isDark ? 'bg-black/95 border-white/10' : 'bg-white border-black/10'} border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50`}>
        <div className="py-2">
          {practiceAreas.map((area) => (
            <Link 
              key={area.id} 
              to={area.path} 
              className={`block px-4 py-2 ${isDark ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-black'} transition-colors`}
            >
              {area.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PracticeAreasDropdown;
