
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeProvider';
import { useSupabaseLawCategories } from '../../hooks/supabase/useSupabaseLawCategories';

interface PracticeAreasDropdownProps {
  isActive: boolean;
}

const PracticeAreasDropdown = ({ isActive }: PracticeAreasDropdownProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const { categories, isLoading } = useSupabaseLawCategories();

  const handleAreaClick = (areaPath: string) => {
    // Dispara evento para atualizar seção ativa
    window.dispatchEvent(new CustomEvent('activeSectionChanged', { 
      detail: { section: 'areas' } 
    }));
    navigate(areaPath);
  };

  // Se estiver carregando, mostrar um dropdown básico
  if (isLoading) {
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
            <div className="px-4 py-2 text-sm text-gray-500">
              Carregando...
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <Link 
                key={category.id || category.value} 
                to={`/areas/${category.value}`} 
                className={`block px-4 py-2 ${isDark ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-black'} transition-colors`}
                onClick={() => handleAreaClick(`/areas/${category.value}`)}
              >
                <div className="flex items-center gap-2">
                  {category.icon && (
                    <span className="text-sm">{category.icon}</span>
                  )}
                  <span>{category.label}</span>
                </div>
              </Link>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">
              Nenhuma área disponível
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PracticeAreasDropdown;
