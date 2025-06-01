
import React from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';
import { ServicePage } from '../../../types/adminTypes';
import { Plus, Trash2 } from 'lucide-react';
import { useTheme } from '../../ThemeProvider';

interface PagesListProps {
  pages: ServicePage[];
  onPageSelect: (pageId: string) => void;
  onNewPage: () => void;
  onDeletePage: (pageId: string) => void;
}

export const PagesList: React.FC<PagesListProps> = ({ 
  pages, 
  onPageSelect, 
  onNewPage, 
  onDeletePage 
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-3">
      {pages.length === 0 ? (
        <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Nenhuma página encontrada para esta categoria.
          <br />
          <Button onClick={onNewPage} className="mt-4" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Criar primeira página
          </Button>
        </div>
      ) : (
        pages.map((page) => (
          <Card 
            key={page.id}
            className={`cursor-pointer transition-all hover:scale-[1.02] ${isDark ? 'bg-black/50 border-white/10 hover:border-white/30' : 'bg-gray-50 border-gray-200 hover:border-gray-400'}`}
            onClick={() => onPageSelect(page.id)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className={`font-semibold text-lg mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    {page.title || 'Título não definido'}
                  </h3>
                  <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {page.description || 'Descrição não definida'}
                  </p>
                  <div className="flex gap-2 text-xs">
                    <span className={`px-2 py-1 rounded ${isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                      {page.benefits.length} benefício{page.benefits.length !== 1 ? 's' : ''}
                    </span>
                    <span className={`px-2 py-1 rounded ${isDark ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}>
                      {page.process.length} etapa{page.process.length !== 1 ? 's' : ''}
                    </span>
                    <span className={`px-2 py-1 rounded ${isDark ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'}`}>
                      {page.faq.length} FAQ{page.faq.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeletePage(page.id);
                  }}
                  size="sm"
                  variant="destructive"
                  className="ml-4"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};
