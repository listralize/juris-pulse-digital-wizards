
import React from 'react';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { PageTexts } from '../../../types/adminTypes';
import { useTheme } from '../../ThemeProvider';

interface ClientAreaSectionProps {
  pageTexts: PageTexts;
  onUpdatePageTexts: (texts: PageTexts) => void;
}

export const ClientAreaSection: React.FC<ClientAreaSectionProps> = ({
  pageTexts,
  onUpdatePageTexts
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
          Área do Cliente
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Título da Seção</Label>
          <Input
            value={pageTexts.clientAreaTitle}
            onChange={(e) => onUpdatePageTexts({...pageTexts, clientAreaTitle: e.target.value})}
            className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
          />
        </div>
        <div>
          <Label>Descrição</Label>
          <Textarea
            value={pageTexts.clientAreaDescription}
            onChange={(e) => onUpdatePageTexts({...pageTexts, clientAreaDescription: e.target.value})}
            className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            rows={3}
          />
        </div>
        <div>
          <Label>URL da Imagem do Cliente</Label>
          <Input
            value={pageTexts.clientAreaImage || '/lovable-uploads/a7d8123c-de9a-4ad4-986d-30c7232d4295.png'}
            onChange={(e) => onUpdatePageTexts({...pageTexts, clientAreaImage: e.target.value})}
            placeholder="URL da imagem"
            className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Link do Botão Principal</Label>
            <Input
              value={pageTexts.clientAreaMainButtonLink || '#'}
              onChange={(e) => onUpdatePageTexts({...pageTexts, clientAreaMainButtonLink: e.target.value})}
              placeholder="URL do botão principal"
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
          <div>
            <Label>Texto do Botão Principal</Label>
            <Input
              value={pageTexts.clientAreaMainButtonText || 'Acessar minha área'}
              onChange={(e) => onUpdatePageTexts({...pageTexts, clientAreaMainButtonText: e.target.value})}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Link do Botão WhatsApp</Label>
            <Input
              value={pageTexts.clientAreaWhatsAppLink || 'https://api.whatsapp.com/send?phone=5562994594496'}
              onChange={(e) => onUpdatePageTexts({...pageTexts, clientAreaWhatsAppLink: e.target.value})}
              placeholder="URL do WhatsApp"
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
          <div>
            <Label>Texto do Botão WhatsApp</Label>
            <Input
              value={pageTexts.clientAreaWhatsAppText || 'Primeiro acesso via WhatsApp'}
              onChange={(e) => onUpdatePageTexts({...pageTexts, clientAreaWhatsAppText: e.target.value})}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
