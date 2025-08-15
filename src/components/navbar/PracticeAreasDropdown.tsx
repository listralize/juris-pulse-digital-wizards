
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
    <div className="relative group" role="menuitem">
      <button 
        className={`px-4 py-2 font-medium transition-colors border-b-2 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isActive
            ? (isDark ? 'border-white text-white focus:ring-white/30' : 'border-black text-black focus:ring-black/30') 
            : (isDark ? 'border-transparent text-white/70 hover:text-white focus:text-white focus:ring-white/30' : 'border-transparent text-black/70 hover:text-black focus:text-black focus:ring-black/30')
        }`}
        aria-haspopup="true"
        aria-expanded="false"
        onKeyDown={(e) => {
          // Permitir navegação Tab normal - não interceptar
          if (e.key === 'Tab') {
            return; // Deixa o comportamento padrão do Tab
          }
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            // Toggle do dropdown
            const dropdown = e.currentTarget.nextElementSibling as HTMLElement;
            if (dropdown) {
              if (dropdown.classList.contains('opacity-0')) {
                dropdown.classList.remove('opacity-0', 'invisible');
              } else {
                dropdown.classList.add('opacity-0', 'invisible');
              }
            }
          }
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            const dropdown = e.currentTarget.nextElementSibling;
            const firstLink = dropdown?.querySelector('a');
            firstLink?.focus();
          }
        }}
      >
        Áreas de Atuação
      </button>
      <div className={`absolute left-0 mt-2 w-60 ${isDark ? 'bg-black/95 border-white/10' : 'bg-white border-black/10'} border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300`} style={{ zIndex: 99999999 }}
        role="menu"
        aria-label="Áreas de Atuação"
      >
        <div className="py-2">
          {categories && categories.length > 0 ? (
            categories.map((category, index) => (
              <Link 
                key={category.id || category.value} 
                to={`/areas/${category.value}`} 
                className={`block px-4 py-2 ${isDark ? 'hover:bg-white/10 focus:bg-white/10 text-white' : 'hover:bg-black/5 focus:bg-black/5 text-black'} transition-colors focus:outline-none`}
                onClick={() => handleAreaClick(`/areas/${category.value}`)}
                role="menuitem"
                tabIndex={-1}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowUp' && index > 0) {
                    e.preventDefault();
                    const prevLink = e.currentTarget.previousElementSibling as HTMLAnchorElement;
                    prevLink?.focus();
                  }
                  if (e.key === 'ArrowDown' && index < categories.length - 1) {
                    e.preventDefault();
                    const nextLink = e.currentTarget.nextElementSibling as HTMLAnchorElement;
                    nextLink?.focus();
                  }
                  if (e.key === 'Escape' || e.key === 'Tab') {
                    e.preventDefault();
                    const button = e.currentTarget.closest('.group')?.querySelector('button') as HTMLButtonElement;
                    button?.focus();
                    // Fechar dropdown
                    const dropdown = e.currentTarget.closest('[role="menu"]') as HTMLElement;
                    if (dropdown) {
                      dropdown.classList.add('opacity-0', 'invisible');
                    }
                  }
                }}
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
