import React from 'react';
import { Loader2 } from 'lucide-react';

interface StepFormLoaderProps {
  title?: string;
  message?: string;
}

export const StepFormLoader: React.FC<StepFormLoaderProps> = ({ 
  title = "Carregando formulário...", 
  message = "Aguarde enquanto preparamos tudo para você" 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Logo ou ícone */}
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
        
        {/* Título */}
        <h1 className="text-2xl font-bold text-foreground">
          {title}
        </h1>
        
        {/* Mensagem */}
        <p className="text-muted-foreground">
          {message}
        </p>
        
        {/* Barra de progresso animada */}
        <div className="w-full bg-secondary/20 rounded-full h-2 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full animate-pulse" 
               style={{ width: '60%' }}></div>
        </div>
        
        {/* Dots de loading */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" 
               style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" 
               style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};