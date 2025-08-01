
import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowLeft, Edit, Mail } from 'lucide-react';
import { HomePageEditor } from './HomePageEditor';
import { ContactFormManagement } from './ContactFormManagement';
import { TeamMember, PageTexts } from '../../types/adminTypes';

interface ContentManagementProps {
  teamMembers: TeamMember[];
  pageTexts: PageTexts;
  onAddTeamMember: () => void;
  onRemoveTeamMember: (id: string) => void;
  onUpdateTeamMember: (id: string, field: keyof TeamMember, value: string) => void;
  onSaveTeamMembers: () => void;
  onUpdatePageTexts: (texts: PageTexts) => void;
  onSavePageTexts: () => void;
}

export const ContentManagement: React.FC<ContentManagementProps> = ({
  teamMembers,
  pageTexts,
  onAddTeamMember,
  onRemoveTeamMember,
  onUpdateTeamMember,
  onSaveTeamMembers,
  onUpdatePageTexts,
  onSavePageTexts
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const sections = [
    {
      id: 'home-page',
      title: 'Página Inicial Completa',
      description: 'Editar todos os elementos da página inicial: textos, imagens, equipe, contatos',
      icon: <Edit className="w-8 h-8" />,
      color: 'bg-blue-500'
    },
    {
      id: 'contact-form',
      title: 'Formulário de Contato',
      description: 'Gerenciar webhook, opções do formulário e configurações de envio',
      icon: <Mail className="w-8 h-8" />,
      color: 'bg-green-500'
    }
  ];

  const handleSaveAll = async () => {
    try {
      console.log('💾 ContentManagement: Salvando todos os dados...', { pageTexts, teamMembers });
      
      // Salvar textos da página
      await onSavePageTexts();
      console.log('✅ ContentManagement: Textos da página salvos');
      
      // Salvar membros da equipe
      await onSaveTeamMembers();
      console.log('✅ ContentManagement: Membros da equipe salvos');
      
    } catch (error) {
      console.error('❌ ContentManagement: Erro ao salvar dados:', error);
      throw error;
    }
  };

  if (selectedSection) {
    const section = sections.find(s => s.id === selectedSection);
    
    return (
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => setSelectedSection(null)}
              variant="outline"
              size="sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
              {section?.title}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {selectedSection === 'home-page' && (
            <HomePageEditor
              pageTexts={pageTexts}
              teamMembers={teamMembers}
              onUpdatePageTexts={onUpdatePageTexts}
              onAddTeamMember={onAddTeamMember}
              onRemoveTeamMember={onRemoveTeamMember}
              onUpdateTeamMember={onUpdateTeamMember}
              onSaveAll={handleSaveAll}
            />
          )}
          
          {selectedSection === 'contact-form' && (
            <ContactFormManagement />
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
          Gerenciamento de Conteúdo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section) => (
            <Card 
              key={section.id}
              className={`cursor-pointer transition-all hover:scale-105 ${isDark ? 'bg-black/50 border-white/10 hover:border-white/30' : 'bg-gray-50 border-gray-200 hover:border-gray-400'}`}
              onClick={() => setSelectedSection(section.id)}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 rounded-full ${section.color} mx-auto mb-4 flex items-center justify-center text-white`}>
                  {section.icon}
                </div>
                <h3 className={`font-semibold text-lg mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                  {section.title}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {section.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
