
import React, { useEffect, useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { TeamMember } from '../../types/adminTypes';
import { useSupabaseTeamMembers } from '../../hooks/supabase/useSupabaseTeamMembers';

const Partners = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { teamMembers, isLoading } = useSupabaseTeamMembers();
  const [title, setTitle] = useState('Nossa Equipe');
  const [subtitle, setSubtitle] = useState('Profissionais experientes e comprometidos com a excelência');

  useEffect(() => {
    const loadTexts = async () => {
      try {
        const { supabase } = await import('../../integrations/supabase/client');
        const { data: settings } = await supabase
          .from('site_settings')
          .select('*')
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (settings) {
          if (settings.partners_title) setTitle(settings.partners_title);
          if (settings.partners_subtitle) setSubtitle(settings.partners_subtitle);
        }
      } catch (error) {
        console.error('❌ Erro ao carregar textos da equipe:', error);
      }
    };

    loadTexts();
  }, []);

  useEffect(() => {
    const handlePageTextsUpdate = (event: CustomEvent) => {
      const data = event.detail;
      if (data.partnersTitle !== undefined) setTitle(data.partnersTitle);
      if (data.partnersSubtitle !== undefined) setSubtitle(data.partnersSubtitle);
    };

    window.addEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    return () => {
      window.removeEventListener('pageTextsUpdated', handlePageTextsUpdate as EventListener);
    };
  }, []);

  if (isLoading) {
    return (
      <section id="socios" className="h-screen w-full flex items-center justify-center px-6">
        <div className={`text-center ${isDark ? 'text-white' : 'text-black'}`}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current mx-auto mb-4"></div>
          <p>Carregando equipe...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="socios" className="min-h-screen w-full flex flex-col justify-center items-center px-6 py-16">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header centralizado */}
        <div className="text-center mb-12">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl mb-6 font-canela tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
            {title}
          </h2>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto font-satoshi leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {subtitle}
          </p>
        </div>

        {/* Grid de membros da equipe */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {teamMembers.map((member) => (
            <div 
              key={member.id} 
              className={`w-full max-w-sm rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              }`}
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={member.image || "/lovable-uploads/bd2c20b7-60ee-423e-bf07-0505e25c78a7.png"} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <h3 className={`text-xl font-canela mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                  {member.name}
                </h3>
                
                <p className={`text-sm font-satoshi mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  {member.title}
                </p>
                
                <p className={`text-sm font-satoshi mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {member.oab}
                </p>
                
                {member.description && (
                  <p className={`text-sm font-satoshi leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {member.description}
                  </p>
                )}
                
                {member.email && (
                  <a 
                    href={`mailto:${member.email}`}
                    className={`inline-block mt-4 text-sm font-satoshi transition-colors ${
                      isDark 
                        ? 'text-blue-400 hover:text-blue-300' 
                        : 'text-blue-600 hover:text-blue-800'
                    }`}
                  >
                    {member.email}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {teamMembers.length === 0 && (
          <div className="text-center py-16">
            <p className={`text-lg font-satoshi ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Nenhum membro da equipe encontrado.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Partners;
