
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../ThemeProvider';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black' : 'bg-[#f5f5f5]'}`}>
        <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'}`}>
        <div className="text-center">
          <h1 className="text-2xl font-canela mb-4">Acesso Negado</h1>
          <p className="mb-4">Você precisa estar autenticado para acessar esta página.</p>
          <a href="/login" className={`underline ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
            Fazer Login
          </a>
        </div>
      </div>
    );
  }

  if (!isAdmin()) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black text-white' : 'bg-[#f5f5f5] text-black'}`}>
        <div className="text-center">
          <h1 className="text-2xl font-canela mb-4">Acesso Negado</h1>
          <p className="mb-4">Você não tem permissão de administrador para acessar esta página.</p>
          <a href="/" className={`underline ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
            Voltar ao Início
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
