
import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Save } from 'lucide-react';
import { PageTexts } from '../../types/adminTypes';
import { useTheme } from '../ThemeProvider';

interface MainTextsManagementProps {
  pageTexts: PageTexts;
  onUpdatePageTexts: (texts: PageTexts) => void;
  onSave: () => void;
}

export const MainTextsManagement: React.FC<MainTextsManagementProps> = ({
  pageTexts,
  onUpdatePageTexts,
  onSave
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
            Textos Principais das Páginas
          </CardTitle>
          <Button onClick={onSave} size="sm" variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <Label>Título Principal (Hero)</Label>
            <Input
              value={pageTexts.heroTitle}
              onChange={(e) => onUpdatePageTexts({...pageTexts, heroTitle: e.target.value})}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
          <div>
            <Label>Subtítulo (Hero)</Label>
            <Input
              value={pageTexts.heroSubtitle}
              onChange={(e) => onUpdatePageTexts({...pageTexts, heroSubtitle: e.target.value})}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
          <div>
            <Label>Título Sobre Nós</Label>
            <Input
              value={pageTexts.aboutTitle}
              onChange={(e) => onUpdatePageTexts({...pageTexts, aboutTitle: e.target.value})}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
          <div>
            <Label>Descrição Sobre Nós</Label>
            <Textarea
              value={pageTexts.aboutDescription}
              onChange={(e) => onUpdatePageTexts({...pageTexts, aboutDescription: e.target.value})}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              rows={4}
            />
          </div>
          <div>
            <Label>Título Nossa Equipe</Label>
            <Input
              value={pageTexts.teamTitle}
              onChange={(e) => onUpdatePageTexts({...pageTexts, teamTitle: e.target.value})}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
          <div>
            <Label>Título Áreas de Atuação</Label>
            <Input
              value={pageTexts.areasTitle}
              onChange={(e) => onUpdatePageTexts({...pageTexts, areasTitle: e.target.value})}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
          <div>
            <Label>Título Área do Cliente</Label>
            <Input
              value={pageTexts.clientAreaTitle}
              onChange={(e) => onUpdatePageTexts({...pageTexts, clientAreaTitle: e.target.value})}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
          <div>
            <Label>Descrição Área do Cliente</Label>
            <Textarea
              value={pageTexts.clientAreaDescription}
              onChange={(e) => onUpdatePageTexts({...pageTexts, clientAreaDescription: e.target.value})}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              rows={3}
            />
          </div>
          <div>
            <Label>Título Contato</Label>
            <Input
              value={pageTexts.contactTitle}
              onChange={(e) => onUpdatePageTexts({...pageTexts, contactTitle: e.target.value})}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
          <div>
            <Label>Subtítulo Contato</Label>
            <Input
              value={pageTexts.contactSubtitle}
              onChange={(e) => onUpdatePageTexts({...pageTexts, contactSubtitle: e.target.value})}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
