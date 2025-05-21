
import React from 'react';
import { useTheme } from '../../ThemeProvider';

interface FormHeaderProps {
  darkBackground?: boolean;
}

const FormHeader: React.FC<FormHeaderProps> = ({ darkBackground = false }) => {
  const { theme } = useTheme();
  const isDark = darkBackground || theme === 'dark';
  
  return (
    <h3 className={`text-xl font-medium mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
      Precisa de ajuda com seu caso?
    </h3>
  );
};

export default FormHeader;
