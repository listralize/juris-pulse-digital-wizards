
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import { useAdminData } from '../hooks/useAdminData';

interface ServiceLinksMapperProps {
  category: string;
  title: string;
}

const ServiceLinksMapper: React.FC<ServiceLinksMapperProps> = ({ 
  category, 
  title 
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { specializedServices, isLoading } = useAdminData();

  // Get services for this category
  const categoryServices = specializedServices.filter(service => 
    service.category === category
  );

  if (isLoading || categoryServices.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h3 className={`text-2xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
        Serviços em {title}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categoryServices.map((service) => (
          <Link 
            key={service.id}
            to={service.href.startsWith('/') ? service.href : `/servicos/${service.id}`}
            className={`p-4 rounded-lg border transition-all hover:shadow-md ${
              isDark 
                ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
              {service.title}
            </h4>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {service.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServiceLinksMapper;
