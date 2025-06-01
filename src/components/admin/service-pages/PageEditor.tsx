
import React from 'react';
import { ServicePage } from '../../../types/adminTypes';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { BenefitsEditor } from './BenefitsEditor';
import { ProcessEditor } from './ProcessEditor';
import { FaqEditor } from './FaqEditor';
import { TestimonialsEditor } from './TestimonialsEditor';
import { useTheme } from '../../ThemeProvider';

interface PageEditorProps {
  page: ServicePage;
  onUpdatePage: (pageId: string, field: keyof ServicePage, value: any) => void;
}

export const PageEditor: React.FC<PageEditorProps> = ({ page, onUpdatePage }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-8">
      {/* Informações Básicas */}
      <div className="space-y-4">
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>Informações Básicas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Título</Label>
            <Input
              value={page.title}
              onChange={(e) => onUpdatePage(page.id, 'title', e.target.value)}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
          <div>
            <Label>Link (href)</Label>
            <Input
              value={page.href}
              onChange={(e) => onUpdatePage(page.id, 'href', e.target.value)}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
          <div className="md:col-span-2">
            <Label>Descrição</Label>
            <Textarea
              value={page.description}
              onChange={(e) => onUpdatePage(page.id, 'description', e.target.value)}
              rows={3}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
            />
          </div>
        </div>
      </div>

      {/* Benefícios */}
      <BenefitsEditor page={page} onUpdatePage={onUpdatePage} />

      {/* Processo */}
      <ProcessEditor page={page} onUpdatePage={onUpdatePage} />

      {/* FAQ */}
      <FaqEditor page={page} onUpdatePage={onUpdatePage} />

      {/* Depoimentos */}
      <TestimonialsEditor page={page} onUpdatePage={onUpdatePage} />
    </div>
  );
};
