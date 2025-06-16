
import React from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { ServicePage, FAQ } from '../../../types/adminTypes';
import { Plus, Trash2 } from 'lucide-react';
import { useTheme } from '../../ThemeProvider';

interface FAQEditorProps {
  page: ServicePage;
  onUpdatePage: (pageId: string, field: keyof ServicePage, value: any) => void;
}

export const FAQEditor: React.FC<FAQEditorProps> = ({ page, onUpdatePage }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const faq = Array.isArray(page.faq) ? page.faq : [];

  const addFAQ = () => {
    console.log('➕ Adicionando nova FAQ');
    const newFAQ: FAQ = { 
      question: 'Nova pergunta frequente?', 
      answer: 'Resposta à pergunta frequente.'
    };
    const updatedFAQ = [...faq, newFAQ];
    console.log('📝 FAQ atualizada:', updatedFAQ);
    onUpdatePage(page.id, 'faq', updatedFAQ);
  };

  const removeFAQ = (index: number) => {
    console.log('🗑️ Removendo FAQ:', index);
    const updatedFAQ = faq.filter((_, i) => i !== index);
    onUpdatePage(page.id, 'faq', updatedFAQ);
  };

  const updateFAQ = (index: number, field: keyof FAQ, value: string) => {
    console.log('✏️ Atualizando FAQ:', index, field, value);
    const updatedFAQ = faq.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    onUpdatePage(page.id, 'faq', updatedFAQ);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
          Perguntas Frequentes ({faq.length})
        </h3>
        <Button onClick={addFAQ} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar FAQ
        </Button>
      </div>
      <div className="space-y-3">
        {faq.map((item, index) => (
          <div key={`faq-${index}`} className={`p-4 border rounded ${isDark ? 'border-white/20 bg-black/30' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium">FAQ {index + 1}</span>
              <Button onClick={() => removeFAQ(index)} size="sm" variant="destructive">
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <Label className="text-xs">Pergunta</Label>
                <Input
                  value={item.question || ''}
                  onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                  placeholder="Ex: Quanto tempo demora o processo?"
                  className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              <div>
                <Label className="text-xs">Resposta</Label>
                <Textarea
                  value={item.answer || ''}
                  onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                  rows={3}
                  placeholder="Forneça uma resposta detalhada à pergunta..."
                  className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
            </div>
          </div>
        ))}
        {faq.length === 0 && (
          <div className="text-center py-4">
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Nenhuma pergunta frequente adicionada ainda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
