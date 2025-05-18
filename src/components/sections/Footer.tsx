
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 px-6 md:px-16 lg:px-24 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img 
              src="/lovable-uploads/2425f737-7a9b-4742-9ef6-655d495a7ea9.png" 
              alt="Serafim & Trombela Advocacia Logo"
              className="h-16 mb-4"
            />
            <p className="text-gray-600 font-satoshi max-w-sm">
              Soluções jurídicas inovadoras com foco em resultados. Nossa equipe está pronta para atender suas necessidades.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-canela mb-4">Contato Rápido</h4>
            <div className="space-y-2">
              <p className="text-gray-600 font-satoshi">World Trade Center, Av. D, Av. 85</p>
              <p className="text-gray-600 font-satoshi">St. Marista, Goiânia - GO</p>
              <p className="text-gray-600 font-satoshi">74150-040</p>
              <a 
                href="mailto:contato@stadv.com"
                className="text-gray-900 hover:underline font-satoshi block"
              >
                contato@stadv.com
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-canela mb-4">Atendimento</h4>
            <div className="space-y-2">
              <p className="text-gray-600 font-satoshi">Segunda a Sexta</p>
              <p className="text-gray-600 font-satoshi">9:00 - 18:00</p>
              <a 
                href="https://api.whatsapp.com/send?phone=5562994594496"
                target="_blank"
                rel="noopener noreferrer" 
                className="elegant-button inline-flex mt-4"
              >
                Atendimento via WhatsApp
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 font-satoshi mb-4 md:mb-0">
            © {currentYear} Serafim & Trombela Advocacia. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-gray-600 hover:text-black font-satoshi">Política de Privacidade</a>
            <a href="#" className="text-sm text-gray-600 hover:text-black font-satoshi">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
