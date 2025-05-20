
import React from 'react';
import { useTheme } from '../ThemeProvider';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <footer className="py-10 px-6 md:px-16 lg:px-24 border-t border-white bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img 
              src="/lovable-uploads/a8cf659d-921d-41fb-a37f-3639b3f036d0.png" 
              alt="Serafim & Trombela Advocacia Logo"
              className="h-20 mb-4 object-contain brightness-150"
              style={{
                filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.2)) drop-shadow(3px 5px 10px rgba(0,0,0,0.95))'
              }}
            />
            <p className="text-gray-300 font-satoshi max-w-sm">
              Soluções jurídicas inovadoras com foco em resultados. Nossa equipe está pronta para atender suas necessidades.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-canela mb-4 text-white">Contato Rápido</h4>
            <div className="space-y-2">
              <p className="text-gray-300 font-satoshi">World Trade Center, Av. D, Av. 85</p>
              <p className="text-gray-300 font-satoshi">St. Marista, Goiânia - GO</p>
              <p className="text-gray-300 font-satoshi">74150-040</p>
              <a 
                href="mailto:contato@stadv.com"
                className="text-white hover:text-gray-300 hover:underline font-satoshi block"
              >
                contato@stadv.com
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-canela mb-4 text-white">Atendimento</h4>
            <div className="space-y-2">
              <p className="text-gray-300 font-satoshi">Segunda a Sexta</p>
              <p className="text-gray-300 font-satoshi">9:00 - 18:00</p>
              <a 
                href="https://api.whatsapp.com/send?phone=5562994594496"
                target="_blank"
                rel="noopener noreferrer" 
                className="elegant-button inline-flex mt-4 bg-white text-black hover:bg-black hover:text-white hover:border-white"
              >
                Atendimento via WhatsApp
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-white/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 font-satoshi mb-4 md:mb-0">
            © {currentYear} Serafim & Trombela Advocacia. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-gray-400 hover:text-white font-satoshi">Política de Privacidade</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white font-satoshi">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
