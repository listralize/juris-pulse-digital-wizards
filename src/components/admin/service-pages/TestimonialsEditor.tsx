
import React from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { ServicePage, Testimonial } from '../../../types/adminTypes';
import { Plus, Trash2 } from 'lucide-react';
import { useTheme } from '../../ThemeProvider';

interface TestimonialsEditorProps {
  page: ServicePage;
  onUpdatePage: (pageId: string, field: keyof ServicePage, value: any) => void;
}

export const TestimonialsEditor: React.FC<TestimonialsEditorProps> = ({ page, onUpdatePage }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const testimonials = page.testimonials || [];

  const addTestimonial = () => {
    const newTestimonial: Testimonial = { name: '', text: '', image: '' };
    onUpdatePage(page.id, 'testimonials', [...testimonials, newTestimonial]);
  };

  const removeTestimonial = (index: number) => {
    onUpdatePage(page.id, 'testimonials', testimonials.filter((_, i) => i !== index));
  };

  const updateTestimonial = (index: number, field: keyof Testimonial, value: string) => {
    const updatedTestimonials = testimonials.map((testimonial, i) => 
      i === index ? { ...testimonial, [field]: value } : testimonial
    );
    onUpdatePage(page.id, 'testimonials', updatedTestimonials);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
          Depoimentos ({testimonials.length})
        </h3>
        <Button onClick={addTestimonial} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar
        </Button>
      </div>
      <div className="space-y-3">
        {testimonials.map((testimonial, index) => (
          <div key={index} className={`p-4 border rounded ${isDark ? 'border-white/20 bg-black/30' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium">Depoimento {index + 1}</span>
              <Button onClick={() => removeTestimonial(index)} size="sm" variant="destructive">
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <Label className="text-xs">Nome</Label>
                <Input
                  value={testimonial.name}
                  onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                  className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              <div>
                <Label className="text-xs">Foto (URL)</Label>
                <Input
                  value={testimonial.image || ''}
                  onChange={(e) => updateTestimonial(index, 'image', e.target.value)}
                  className={`mt-1 ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                />
              </div>
              <div>
                <Label className="text-xs">Depoimento</Label>
                <Textarea
                  value={testimonial.text}
                  onChange={(e) => updateTestimonial(index, 'text', e.target.value)}
                  rows={2}
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
