
import React from 'react';
import { Button } from '../ui/button';
import { LogOut, Settings } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

interface AdminHeaderProps {
  onLogout: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onLogout }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-3">
        <Settings className="w-8 h-8" />
        <h1 className={`text-3xl font-canela ${isDark ? 'text-white' : 'text-black'}`}>
          Painel Administrativo
        </h1>
      </div>
      <Button 
        onClick={onLogout}
        variant="outline"
        className={`${isDark ? 'border-white/20 text-white hover:bg-white/10' : 'border-gray-200 text-black hover:bg-gray-100'}`}
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sair
      </Button>
    </div>
  );
};
