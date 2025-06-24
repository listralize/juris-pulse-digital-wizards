
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Users, Briefcase, User, MessageCircle, BookOpen, Mail, Phone, MapPin } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator
} from '../ui/sidebar';
import { useTheme } from '../ThemeProvider';
import ThemeToggle from '../navbar/ThemeToggle';
import { practiceAreas } from '../navbar/practiceAreas';

export function AppSidebar() {
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isDark = theme === 'dark';
  const [activeSection, setActiveSection] = useState('home');

  // Estados locais para dados do Supabase
  const [footerData, setFooterData] = useState({
    companyName: 'S&T',
    phone: '(62) 99459-4496',
    email: 'contato@stadv.com',
    whatsapp: '5562994594496'
  });

  // Carregar dados iniciais do Supabase
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const { supabase } = await import('../../integrations/supabase/client');
        
        const { data: footer } = await supabase
          .from('footer_info')
          .select('company_name')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        const { data: contact } = await supabase
          .from('contact_info')
          .select('phone, email, whatsapp')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (footer || contact) {
          setFooterData(prev => ({
            ...prev,
            ...(footer?.company_name && { companyName: footer.company_name }),
            ...(contact?.phone && { phone: contact.phone }),
            ...(contact?.email && { email: contact.email }),
            ...(contact?.whatsapp && { whatsapp: contact.whatsapp })
          }));
        }
      } catch (error) {
        console.error('❌ Sidebar: Erro ao carregar dados:', error);
      }
    };

    loadInitialData();
  }, []);

  // Escutar eventos de atualização em tempo real
  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      const data = event.detail;
      
      if (data.footerTexts) {
        const { companyName } = data.footerTexts;
        setFooterData(prev => ({
          ...prev,
          ...(companyName !== undefined && { companyName })
        }));
      }
      
      if (data.contactTexts) {
        const { phone, email, whatsapp } = data.contactTexts;
        setFooterData(prev => ({
          ...prev,
          ...(phone !== undefined && { phone }),
          ...(email !== undefined && { email }),
          ...(whatsapp !== undefined && { whatsapp })
        }));
      }
    };

    window.addEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    };
  }, []);

  useEffect(() => {
    const path = location.pathname;
    const hash = location.hash.substring(1);
    
    if (path === '/') {
      if (hash && ['home', 'about', 'areas', 'socios', 'cliente', 'blog', 'contact'].includes(hash)) {
        setActiveSection(hash);
      } else {
        setActiveSection('home');
      }
    } else if (['/familia', '/tributario', '/empresarial', '/trabalho', 
               '/constitucional', '/administrativo', '/previdenciario', 
               '/consumidor', '/civil'].includes(path)) {
      setActiveSection('areas');
    } else if (path === '/blog') {
      setActiveSection('blog');
    } else {
      setActiveSection('');
    }
  }, [location]);

  const handleNavigation = (sectionId: string, path: string) => {
    if (sectionId === 'home') {
      if (location.pathname !== '/') {
        navigate('/', { replace: true });
        setActiveSection('home');
      } else {
        setActiveSection(sectionId);
        window.dispatchEvent(new CustomEvent('sectionChange', { detail: sectionId }));
      }
      return;
    }
    
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
      setTimeout(() => {
        setActiveSection(sectionId);
        window.dispatchEvent(new CustomEvent('sectionChange', { detail: sectionId }));
      }, 150);
      return;
    }
    
    setActiveSection(sectionId);
    window.dispatchEvent(new CustomEvent('sectionChange', { detail: sectionId }));
  };

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'about', label: 'Sobre', icon: Users, path: '/#about' },
    { id: 'areas', label: 'Áreas', icon: Briefcase, path: '/#areas' },
    { id: 'socios', label: 'Equipe', icon: User, path: '/#socios' },
    { id: 'cliente', label: 'Cliente', icon: MessageCircle, path: '/#cliente' },
    { id: 'blog', label: 'Blog', icon: BookOpen, path: '/blog' },
    { id: 'contact', label: 'Contato', icon: Mail, path: '/#contact' }
  ];

  return (
    <Sidebar className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'} w-48`}>
      <SidebarHeader className="p-2">
        <div className="flex items-center gap-2 mb-2">
          <img 
            src={isDark ? "/lovable-uploads/a8cf659d-921d-41fb-a37f-3639b3f036d0.png" : "/lovable-uploads/d43d5ba7-bbba-42dd-8cee-0cdd11892e68.png"} 
            alt={`${footerData.companyName} Logo`} 
            className="h-6 object-contain"
          />
          <span className={`font-canela text-xs font-medium ${isDark ? 'text-white' : 'text-black'}`}>
            {footerData.companyName}
          </span>
        </div>
        <ThemeToggle />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  {item.id === 'blog' ? (
                    <SidebarMenuButton asChild isActive={window.location.pathname === '/blog'} size="sm">
                      <Link to="/blog" className="flex items-center gap-2">
                        <item.icon className="w-3 h-3" />
                        <span className="text-xs">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  ) : (
                    <SidebarMenuButton 
                      onClick={() => handleNavigation(item.id, item.path)}
                      isActive={activeSection === item.id}
                      className="flex items-center gap-2 cursor-pointer"
                      size="sm"
                    >
                      <item.icon className="w-3 h-3" />
                      <span className="text-xs">{item.label}</span>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs">Áreas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {practiceAreas.slice(0, 5).map((area) => (
                <SidebarMenuItem key={area.id}>
                  <SidebarMenuButton asChild isActive={window.location.pathname === area.path} size="sm">
                    <Link to={area.path} className="text-xs">
                      {area.label.replace('Direito ', '')}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <div className="space-y-2">
          <div className="flex items-center gap-1 text-xs">
            <Phone className="w-2 h-2" />
            <a 
              href={`tel:${footerData.phone.replace(/\D/g, '')}`}
              className="hover:underline text-xs"
            >
              {footerData.phone}
            </a>
          </div>
          
          <div className="flex items-center gap-1 text-xs">
            <Mail className="w-2 h-2" />
            <a 
              href={`mailto:${footerData.email}`} 
              className="hover:underline text-xs"
            >
              {footerData.email}
            </a>
          </div>
          
          <a 
            href={`https://api.whatsapp.com/send?phone=${footerData.whatsapp}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`w-full py-1 px-2 text-xs font-medium transition-all duration-300 rounded-md text-center block ${
              isDark 
                ? 'bg-white text-black hover:bg-gray-200' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            WhatsApp
          </a>
          
          <div className="text-xs text-center pt-1 border-t opacity-60">
            © {new Date().getFullYear()} {footerData.companyName}
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
