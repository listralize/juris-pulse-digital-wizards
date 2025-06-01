
import React from 'react';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { PageTexts } from '../../../types/adminTypes';
import { useTheme } from '../../ThemeProvider';

interface AboutSectionProps {
  pageTexts: PageTexts;
  onUpdatePageTexts: (texts: PageTexts) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  pageTexts,
  onUpdatePageTexts
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
          Seção Sobre Nós
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Título da Seção</Label>
          <Input
            value={pageTexts.aboutTitle}
            onChange={(e) => onUpdatePageTexts({...pageTexts, aboutTitle: e.target.value})}
            className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
          />
        </div>
        <div>
          <Label>Descrição</Label>
          <Textarea
            value={pageTexts.aboutDescription}
            onChange={(e) => onUpdatePageTexts({...pageTexts, aboutDescription: e.target.value})}
            className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
};
