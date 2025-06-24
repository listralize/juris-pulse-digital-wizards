
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

interface FooterProps {
  respectTheme?: boolean;
}

const Footer: React.FC<FooterProps> = ({ respectTheme = false }) => {
  const { theme } = useTheme();
  const isDark = respectTheme ? theme === 'dark' : false;

  return (
    <footer className={`py-16 px-6 md:px-16 lg:px-24 border-t ${
      isDark 
        ? 'bg-black text-white border-white/10' 
        : 'bg-white text-black border-black/10'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo e Descrição */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <img 
                src="/lovable-uploads/a8cf659d-921d-41fb-a37f-3639b3f036d0.png"
                alt="Serafim & Trombela Advocacia"
                className="h-16 w-auto filter brightness-0 invert"
                style={{ 
                  filter: isDark 
                    ? 'brightness(0) invert(1)' 
                    : 'brightness(0) invert(0)' 
                }}
              />
            </div>
            <p className={`text-base leading-relaxed mb-6 max-w-md ${
              isDark ? 'text-white/70' : 'text-black/70'
            }`}>
              Oferecemos assessoria jurídica especializada com foco em resultados, 
              ética e atendimento personalizado para cada cliente.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className={`text-lg font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
              Navegação
            </h3>
            <nav className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'Sobre Nós', href: '#about' },
                { label: 'Áreas de Atuação', href: '#areas' },
                { label: 'Contato', href: '/contato' }
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`block text-sm transition-colors hover:opacity-70 ${
                    isDark ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contato */}
          <div>
            <h3 className={`text-lg font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
              Contato
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className={`w-4 h-4 mt-1 flex-shrink-0 ${
                  isDark ? 'text-white/60' : 'text-black/60'
                }`} />
                <div>
                  <a 
                    href="tel:+5511999999999"
                    className={`text-sm transition-colors hover:opacity-70 ${
                      isDark ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'
                    }`}
                  >
                    (11) 99999-9999
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className={`w-4 h-4 mt-1 flex-shrink-0 ${
                  isDark ? 'text-white/60' : 'text-black/60'
                }`} />
                <div>
                  <a 
                    href="mailto:contato@serafimetrombela.com.br"
                    className={`text-sm transition-colors hover:opacity-70 ${
                      isDark ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'
                    }`}
                  >
                    contato@serafimetrombela.com.br
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className={`w-4 h-4 mt-1 flex-shrink-0 ${
                  isDark ? 'text-white/60' : 'text-black/60'
                }`} />
                <div>
                  <span className={`text-sm ${
                    isDark ? 'text-white/60' : 'text-black/60'
                  }`}>
                    São Paulo, SP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={`pt-8 border-t text-center ${
          isDark ? 'border-white/10' : 'border-black/10'
        }`}>
          <p className={`text-sm ${isDark ? 'text-white/60' : 'text-black/60'}`}>
            © 2024 Serafim & Trombela Advocacia. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
