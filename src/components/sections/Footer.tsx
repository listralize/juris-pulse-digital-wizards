import React from 'react';
import { useTheme } from '../ThemeProvider';

interface FooterProps {
  respectTheme?: boolean;
}

const Footer: React.FC<FooterProps> = ({ respectTheme = false }) => {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  const isDark = respectTheme ? theme === 'dark' : true; // Respeita o tema quando respectTheme é true
  
  return (
    <footer className={`py-10 px-6 md:px-16 lg:px-24 border-t ${isDark ? 'border-white/20 bg-black text-white' : 'border-gray-200 bg-white text-black'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img 
              src="/lovable-uploads/a8cf659d-921d-41fb-a37f-3639b3f036d0.png" 
              alt="Serafim & Trombela Advocacia Logo"
              className={`h-20 mb-4 object-contain ${isDark ? 'brightness-150' : 'brightness-90'}`}
              style={{
                filter: isDark 
                  ? 'drop-shadow(0 0 15px rgba(255,255,255,0.2)) drop-shadow(3px 5px 10px rgba(0,0,0,0.95))' 
                  : 'drop-shadow(0 0 10px rgba(0,0,0,0.1))'
              }}
            />
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} font-satoshi max-w-sm`}>
              Soluções jurídicas inovadoras com foco em resultados. Nossa equipe está pronta para atender suas necessidades.
            </p>
          </div>
          
          <div>
            <h4 className={`text-lg font-canela mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Contato Rápido</h4>
            <div className="space-y-2">
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} font-satoshi`}>World Trade Center</p>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} font-satoshi`}>Torre Office e Corporate</p>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} font-satoshi`}>Av. D, Av. 85 - St. Marista</p>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} font-satoshi`}>Goiânia - GO, 74150-040</p>
              <a 
                href="mailto:contato@stadv.com"
                className={`${isDark ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-700'} hover:underline font-satoshi block`}
              >
                contato@stadv.com
              </a>
            </div>
          </div>
          
          <div>
            <h4 className={`text-lg font-canela mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Atendimento</h4>
            <div className="space-y-2">
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} font-satoshi`}>Segunda a Sexta</p>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} font-satoshi`}>9:00 - 18:00</p>
              <a 
                href="https://api.whatsapp.com/send?phone=5562994594496"
                target="_blank"
                rel="noopener noreferrer" 
                className={`elegant-button inline-flex mt-4 ${
                  isDark 
                    ? 'bg-white text-black hover:bg-black hover:text-white hover:border-white' 
                    : 'bg-black text-white hover:bg-white hover:text-black hover:border-black'
                }`}
              >
                Atendimento via WhatsApp
              </a>
            </div>
          </div>
        </div>
        
        <div className={`mt-10 pt-6 border-t ${isDark ? 'border-white/30' : 'border-black/10'} flex flex-col md:flex-row justify-between items-center`}>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} font-satoshi mb-4 md:mb-0`}>
            © {currentYear} Serafim & Trombela Advocacia. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6">
            <a href="#" className={`text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} font-satoshi`}>Política de Privacidade</a>
            <a href="#" className={`text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} font-satoshi`}>Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
