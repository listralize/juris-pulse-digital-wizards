
import React from 'react';
import { useTheme } from '../ThemeProvider';
import { Card, CardContent } from '../ui/card';
import { Mail, User } from 'lucide-react';
import { TeamMember, PageTexts } from '../../types/adminTypes';

interface TeamProps {
  teamMembers: TeamMember[];
  pageTexts: PageTexts;
}

const Team: React.FC<TeamProps> = ({ teamMembers, pageTexts }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!teamMembers || teamMembers.length === 0) {
    return null;
  }

  return (
    <section className={`py-16 px-4 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            {pageTexts?.teamTitle || 'Nossa Equipe'}
          </h2>
          <p className={`text-lg md:text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Conheça os profissionais dedicados que compõem nossa equipe especializada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member) => (
            <Card 
              key={member.id}
              className={`overflow-hidden transition-all duration-300 hover:scale-105 ${isDark ? 'bg-black/80 border-white/10 hover:border-white/30' : 'bg-white/80 border-gray-200 hover:border-gray-400'}`}
            >
              <CardContent className="p-0">
                <div className="relative">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className={`w-full h-64 flex items-center justify-center ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
                      <User className={`w-16 h-16 ${isDark ? 'text-white/40' : 'text-gray-400'}`} />
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    {member.name}
                  </h3>
                  
                  <p className={`text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {member.title}
                  </p>
                  
                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {member.oab}
                  </p>
                  
                  {member.description && (
                    <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {member.description}
                    </p>
                  )}
                  
                  <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Mail className="w-4 h-4" />
                    <a 
                      href={`mailto:${member.email}`}
                      className={`hover:underline ${isDark ? 'hover:text-white' : 'hover:text-black'} transition-colors`}
                    >
                      {member.email}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
