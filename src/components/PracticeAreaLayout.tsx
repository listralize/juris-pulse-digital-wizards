
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import PageBanner from './PageBanner';
import WhatsAppButton from './WhatsAppButton';
import Footer from './sections/Footer';
import { useTheme } from './ThemeProvider';
import CtaSection from './serviceLanding/CtaSection';
import { useAdminData } from '../hooks/useAdminData';

interface PracticeAreaLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  currentArea?: string;
}

const PracticeAreaLayout: React.FC<PracticeAreaLayoutProps> = ({ 
  title, 
  description, 
  children,
  currentArea = ''
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { specializedServices, isLoading } = useAdminData();

  // Add scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get services for this area
  const areaServices = specializedServices.filter(service => 
    service.category === currentArea
  );
  
  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Navbar />
      
      <PageBanner 
        title={title}
        subtitle={description}
        bgImage="/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"
      />
      
      <section className={`px-6 md:px-16 lg:px-24 py-16 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          {children}
          
          {/* Services for this area */}
          {!isLoading && areaServices.length > 0 && (
            <div className="mt-16">
              <h2 className={`text-3xl md:text-4xl font-canela mb-8 ${isDark ? 'text-white' : 'text-black'}`}>
                Serviços Especializados
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {areaServices.map((service) => (
                  <Link 
                    key={service.id}
                    to={service.href.startsWith('/') ? service.href : `/servicos/${service.id}`}
                    className="group block"
                  >
                    <div 
                      className={`${isDark ? 'bg-black/80 border border-white/10' : 'bg-white/80 border border-black/10'} backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 group-hover:scale-105 h-full p-6`}
                    >
                      <h3 className={`text-xl font-canela mb-3 ${isDark ? 'text-white' : 'text-black'}`}>
                        {service.title}
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {service.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      
      {currentArea && <CtaSection serviceArea={title} respectTheme={true} />}
      
      <WhatsAppButton />
      <Footer respectTheme={true} />
    </div>
  );
};

export default PracticeAreaLayout;
