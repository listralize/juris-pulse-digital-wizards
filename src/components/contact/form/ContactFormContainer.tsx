
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
  const isDark = darkBackground || theme === 'dark';
  
  return (
    <div className={`p-6 rounded-lg ${
      isDark 
      ? 'bg-black/90 border border-white/10' 
      : 'bg-white border border-gray-200'
    }`}>
      {children}
    </div>
  );
};

export default ContactFormContainer;
