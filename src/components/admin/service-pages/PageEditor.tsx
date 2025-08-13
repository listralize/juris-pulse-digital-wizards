
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { ServicePage } from '../../../types/adminTypes';
import { FileText, Gift, Users, HelpCircle, Workflow } from 'lucide-react';
import { useTheme } from '../../ThemeProvider';
import { BenefitsEditor } from './BenefitsEditor';
import { TestimonialsEditor } from './TestimonialsEditor';
import { ProcessEditor } from './ProcessEditor';
import { FAQEditor } from './FAQEditor';

interface PageEditorProps {
  page: ServicePage;
  onUpdatePage: (pageId: string, field: keyof ServicePage, value: any) => void;
}

export const PageEditor: React.FC<PageEditorProps> = ({ page, onUpdatePage }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleInputChange = (field: keyof ServicePage, value: string) => {
    console.log('📝 Alterando campo:', field, 'para:', value);
    onUpdatePage(page.id, field, value);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className={`grid w-full grid-cols-5 ${isDark ? 'bg-black border border-white/20' : 'bg-white border border-gray-200'}`}>
          <TabsTrigger value="basic" className="flex items-center gap-1">
            <FileText className="w-3 h-3" />
            Básico
          </TabsTrigger>
          <TabsTrigger value="benefits" className="flex items-center gap-1">
            <Gift className="w-3 h-3" />
            Benefícios
          </TabsTrigger>
          <TabsTrigger value="process" className="flex items-center gap-1">
            <Workflow className="w-3 h-3" />
            Processo
          </TabsTrigger>
          <TabsTrigger value="faq" className="flex items-center gap-1">
            <HelpCircle className="w-3 h-3" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="testimonials" className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            Depoimentos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Título do Serviço</Label>
              <Input
                value={page.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                placeholder="Ex: Divórcio Consensual"
              />
            </div>
            <div>
              <Label>URL da Página (href)</Label>
              <Input
                value={page.href || ''}
                onChange={(e) => handleInputChange('href', e.target.value)}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                placeholder="Ex: divorcio-consensual"
              />
            </div>
          </div>
          <div>
            <Label>Descrição</Label>
            <Textarea
              value={page.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
              placeholder="Descrição detalhada do serviço..."
              rows={4}
            />
          </div>
        </TabsContent>

        <TabsContent value="benefits">
          <BenefitsEditor page={page} onUpdatePage={onUpdatePage} />
        </TabsContent>

        <TabsContent value="process">
          <ProcessEditor page={page} onUpdatePage={onUpdatePage} />
        </TabsContent>

        <TabsContent value="faq">
          <FAQEditor page={page} onUpdatePage={onUpdatePage} />
        </TabsContent>

        <TabsContent value="testimonials">
          <TestimonialsEditor page={page} onUpdatePage={onUpdatePage} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
