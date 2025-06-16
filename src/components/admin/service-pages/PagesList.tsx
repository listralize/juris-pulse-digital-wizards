
import React from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';
import { ServicePage } from '../../../types/adminTypes';
import { Plus, Trash2, Edit } from 'lucide-react';
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
          <p className="mb-4">Nenhuma página encontrada para esta categoria.</p>
          <Button onClick={onNewPage} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Criar primeira página
          </Button>
        </div>
      ) : (
        pages.map((page) => (
          <Card 
            key={page.id}
            className={`transition-all ${isDark ? 'bg-black/50 border-white/10 hover:border-white/30' : 'bg-gray-50 border-gray-200 hover:border-gray-400'}`}
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
                      {page.benefits?.length || 0} benefício{(page.benefits?.length || 0) !== 1 ? 's' : ''}
                    </span>
                    <span className={`px-2 py-1 rounded ${isDark ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}>
                      {page.process?.length || 0} etapa{(page.process?.length || 0) !== 1 ? 's' : ''}
                    </span>
                    <span className={`px-2 py-1 rounded ${isDark ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'}`}>
                      {page.faq?.length || 0} FAQ{(page.faq?.length || 0) !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button 
                    onClick={() => onPageSelect(page.id)}
                    size="sm"
                    variant="outline"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeletePage(page.id);
                    }}
                    size="sm"
                    variant="destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};
