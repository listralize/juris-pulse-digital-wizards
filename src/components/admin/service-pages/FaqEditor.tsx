
import React from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { ServicePage } from '../../../types/adminTypes';
import { Plus, Trash2 } from 'lucide-react';
import { useTheme } from '../../ThemeProvider';

interface FaqEditorProps {
  page: ServicePage;
  onUpdatePage: (pageId: string, field: keyof ServicePage, value: any) => void;
}

export const FaqEditor: React.FC<FaqEditorProps> = ({ page, onUpdatePage }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const addFaq = () => {
    const newFaq = { question: '', answer: '' };
    onUpdatePage(page.id, 'faq', [...page.faq, newFaq]);
  };

  const removeFaq = (index: number) => {
    onUpdatePage(page.id, 'faq', page.faq.filter((_, i) => i !== index));
  };

  const updateFaq = (index: number, field: string, value: string) => {
    const updatedFaq = page.faq.map((faq, i) => 
      i === index ? { ...faq, [field]: value } : faq
    );
    onUpdatePage(page.id, 'faq', updatedFaq);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
          FAQ ({page.faq.length} perguntas)
        </h3>
        <Button onClick={addFaq} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar
        </Button>
      </div>
      <div className="space-y-3">
        {page.faq.map((faq, index) => (
          <div key={index} className={`p-4 border rounded ${isDark ? 'border-white/20 bg-black/30' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium">FAQ {index + 1}</span>
              <Button onClick={() => removeFaq(index)} size="sm" variant="destructive">
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
            <div className="space-y-3">
              <div>
                <Label className="text-xs">Pergunta</Label>
                <Input
                  value={faq.question}
                  onChange={(e) => updateFaq(index, 'question', e.target.value)}
                  className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              <div>
                <Label className="text-xs">Resposta</Label>
                <Textarea
                  value={faq.answer}
                  onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                  rows={3}
                  className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
