
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

  return (
    <div className={`p-6 rounded-lg h-full ${
      isDark 
        ? 'bg-black border-white/20 text-white' 
        : 'bg-white border-gray-200 text-black'
    } border`}>
      {children}
    </div>
  );
};

export default ContactFormContainer;
