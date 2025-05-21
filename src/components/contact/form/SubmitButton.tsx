
import React from 'react';
import { Button } from '../../ui/button';
import { Loader2 } from 'lucide-react';
import { useTheme } from '../../ThemeProvider';

interface SubmitButtonProps {
  isSubmitting: boolean;
  darkBackground?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ 
  isSubmitting, 
  darkBackground = false 
}) => {
  const { theme } = useTheme();
  const isDark = darkBackground || theme === 'dark';
  
  return (
    <Button 
      type="submit" 
      disabled={isSubmitting}
      className={`w-full ${isDark 
        ? 'bg-white text-black hover:bg-white/90' 
        : 'bg-black text-white hover:bg-black/90'} transition-all`}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Enviando...
        </>
      ) : "Enviar mensagem"}
    </Button>
  );
};

export default SubmitButton;
