
import React from 'react';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { PageTexts } from '../../../types/adminTypes';
import { useTheme } from '../../ThemeProvider';

interface ContactSectionProps {
  pageTexts: PageTexts;
  onUpdatePageTexts: (texts: PageTexts) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  pageTexts,
  onUpdatePageTexts
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const updateContactTexts = (field: string, value: string) => {
    onUpdatePageTexts({
      ...pageTexts,
      contactTexts: { ...pageTexts.contactTexts, [field]: value }
    });
  };

  return (
    <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
          Contato
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Título da Seção</Label>
          <Input
            value={pageTexts.contactTitle}
            onChange={(e) => onUpdatePageTexts({...pageTexts, contactTitle: e.target.value})}
            className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
          />
        </div>
        <div>
          <Label>Subtítulo</Label>
          <Input
            value={pageTexts.contactSubtitle}
            onChange={(e) => onUpdatePageTexts({...pageTexts, contactSubtitle: e.target.value})}
            className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
          />
        </div>
        <div>
          <Label>Endereço</Label>
          <Textarea
            value={pageTexts.contactTexts?.address || ''}
            onChange={(e) => updateContactTexts('address', e.target.value)}
            className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            rows={3}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Telefone</Label>
            <Input
              value={pageTexts.contactTexts?.phone || ''}
              onChange={(e) => updateContactTexts('phone', e.target.value)}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              value={pageTexts.contactTexts?.email || ''}
              onChange={(e) => updateContactTexts('email', e.target.value)}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
        </div>
        <div>
          <Label>URL do WhatsApp</Label>
          <Input
            value={pageTexts.contactTexts?.whatsappUrl || ''}
            onChange={(e) => updateContactTexts('whatsappUrl', e.target.value)}
            className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
          />
        </div>
        <div>
          <Label>Horários de Funcionamento</Label>
          <Textarea
            value={pageTexts.contactTexts?.scheduleText || ''}
            onChange={(e) => updateContactTexts('scheduleText', e.target.value)}
            className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            rows={2}
          />
        </div>
        <div>
          <Label>URL do Mapa (iframe)</Label>
          <Input
            value={pageTexts.contactTexts?.mapEmbedUrl || ''}
            onChange={(e) => updateContactTexts('mapEmbedUrl', e.target.value)}
            placeholder="URL de embed do Google Maps"
            className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
          />
        </div>
      </CardContent>
    </Card>
  );
};
