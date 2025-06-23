
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Save } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { MainTextsManagement } from './MainTextsManagement';
import { AreasTextsManagement } from './AreasTextsManagement';
import { TeamManagement } from './TeamManagement';
import { TeamMember, PageTexts } from '../../types/adminTypes';
import { useSupabasePageTexts } from '../../hooks/useSupabasePageTexts';
import { toast } from 'sonner';

interface HomePageEditorProps {
  pageTexts: PageTexts;
  teamMembers: TeamMember[];
  onUpdatePageTexts: (texts: PageTexts) => void;
  onAddTeamMember: () => void;
  onRemoveTeamMember: (id: string) => void;
  onUpdateTeamMember: (id: string, field: keyof TeamMember, value: string) => void;
  onSaveAll: () => void;
}

export const HomePageEditor: React.FC<HomePageEditorProps> = ({
  pageTexts,
  teamMembers,
  onUpdatePageTexts,
  onAddTeamMember,
  onRemoveTeamMember,
  onUpdateTeamMember,
  onSaveAll
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isSaving, setIsSaving] = useState(false);
  const { savePageTexts } = useSupabasePageTexts();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      console.log('💾 HomePageEditor: Salvando dados...');
      
      // Salvar via hook específico para disparar eventos
      await savePageTexts(pageTexts);
      
      // Salvar também via prop para manter compatibilidade
      await onSaveAll();
      
      toast.success('Alterações salvas com sucesso!');
      console.log('✅ HomePageEditor: Dados salvos com sucesso');
    } catch (error) {
      console.error('❌ HomePageEditor: Erro ao salvar:', error);
      toast.error('Erro ao salvar alterações');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
          Editor da Página Inicial
        </h2>
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Salvando...' : 'Salvar Tudo'}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
          <CardHeader>
            <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
              Textos Principais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MainTextsManagement 
              pageTexts={pageTexts}
              onUpdate={onUpdatePageTexts}
            />
          </CardContent>
        </Card>

        <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
          <CardHeader>
            <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
              Textos das Áreas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AreasTextsManagement 
              pageTexts={pageTexts}
              onUpdate={onUpdatePageTexts}
            />
          </CardContent>
        </Card>

        <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
          <CardHeader>
            <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
              Equipe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TeamManagement 
              teamMembers={teamMembers}
              onAdd={onAddTeamMember}
              onRemove={onRemoveTeamMember}
              onUpdate={onUpdateTeamMember}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
