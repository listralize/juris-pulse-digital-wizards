import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { logger } from '@/utils/logger';

interface StepFormLoaderProps {
  title?: string;
  message?: string;
}

export const StepFormLoader: React.FC<StepFormLoaderProps> = ({ 
  title = "Carregando formulário...", 
  message = "Aguarde enquanto preparamos tudo para você" 
}) => {
  const [dots, setDots] = useState('');
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    const hostname = window.location.hostname;
    setDebugInfo(`${hostname} | ${window.location.protocol}`);

    const timeout = setTimeout(() => {
      logger.warn('⚠️ StepForm demorou muito para carregar - possível erro 404');
      logger.log('🔍 Debug ambiente:', {
        hostname,
        protocol: window.location.protocol,
        pathname: window.location.pathname,
        userAgent: navigator.userAgent
      });
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
        
        <h1 className="text-2xl font-bold text-foreground">
          {title}{dots}
        </h1>
        
        <p className="text-muted-foreground">
          {message}
        </p>
        
        <div className="w-full bg-secondary/20 rounded-full h-2 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full animate-pulse" 
               style={{ width: '60%' }}></div>
        </div>
        
        <div className="text-xs text-muted-foreground/60">
          {debugInfo}
        </div>
        
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