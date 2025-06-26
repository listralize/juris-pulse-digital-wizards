
import React from 'react';
import { useTheme } from '../../ThemeProvider';

interface ContactFormContainerProps {
  children: React.ReactNode;
  darkBackground?: boolean;
}

const ContactFormContainer: React.FC<ContactFormContainerProps> = ({ 
  children, 
  darkBackground = false 
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || darkBackground;

  // Verificar se estamos em uma página de serviço
  const isServicePage = window.location.pathname.includes('/services/') || window.location.pathname.includes('/servicos/');

  return (
    <div className={`p-6 rounded-lg h-full ${
      isServicePage && isDark
        ? 'bg-transparent border-white/20 text-white' 
        : isDark 
        ? 'bg-black border-white/20 text-white' 
        : 'bg-white border-gray-200 text-black'
    } border`}>
      {children}
    </div>
  );
};

export default ContactFormContainer;
