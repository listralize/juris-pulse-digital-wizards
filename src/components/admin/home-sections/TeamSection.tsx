
import React from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { PageTexts } from '../../../types/adminTypes';
import { useTheme } from '../../ThemeProvider';

interface TeamSectionProps {
  pageTexts: PageTexts;
  onUpdatePageTexts: (texts: PageTexts) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({
  pageTexts,
  onUpdatePageTexts
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
          Nossa Equipe
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Título da Seção</Label>
          <Input
            value={pageTexts.teamTitle}
            onChange={(e) => onUpdatePageTexts({...pageTexts, teamTitle: e.target.value})}
            className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
          />
        </div>
      </CardContent>
    </Card>
  );
};
