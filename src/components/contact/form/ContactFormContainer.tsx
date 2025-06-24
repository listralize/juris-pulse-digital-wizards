
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
        ? 'bg-black border border-white/20 text-white' 
        : 'bg-white border border-gray-200 text-black'
    }`}>
      {children}
    </div>
  );
};

export default ContactFormContainer;
