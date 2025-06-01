
import { useState, useEffect } from 'react';
import { BlogCategory } from '../types/blogTypes';

const defaultCategories: BlogCategory[] = [
  {
    id: '1',
    name: 'Direito Tributário',
    description: 'Artigos sobre impostos, tributos e planejamento fiscal',
    color: '#3B82F6'
  },
  {
    id: '2',
    name: 'Direito do Consumidor',
    description: 'Proteção aos direitos do consumidor',
    color: '#10B981'
  },
  {
    id: '3',
    name: 'E-commerce',
    description: 'Aspectos jurídicos do comércio eletrônico',
    color: '#8B5CF6'
  },
  {
    id: '4',
    name: 'Legislação',
    description: 'Mudanças e atualizações na legislação',
    color: '#F59E0B'
  },
  {
    id: '5',
    name: 'Proteção',
    description: 'Proteção de dados e direitos digitais',
    color: '#EF4444'
  },
  {
    id: '6',
    name: 'Direito de Família',
    description: 'Questões familiares e sucessórias',
    color: '#EC4899'
  },
  {
    id: '7',
    name: 'Planejamento',
    description: 'Planejamento patrimonial e sucessório',
    color: '#06B6D4'
  }
];

export const useBlogCategories = () => {
  const [blogCategories, setBlogCategories] = useState<BlogCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedCategories = localStorage.getItem('adminBlogCategories');
      if (savedCategories) {
        const parsedCategories = JSON.parse(savedCategories);
        if (Array.isArray(parsedCategories) && parsedCategories.length > 0) {
          setBlogCategories(parsedCategories);
        } else {
          setBlogCategories(defaultCategories);
          localStorage.setItem('adminBlogCategories', JSON.stringify(defaultCategories));
        }
      } else {
        setBlogCategories(defaultCategories);
        localStorage.setItem('adminBlogCategories', JSON.stringify(defaultCategories));
      }
    } catch (error) {
      console.error('Erro ao carregar categorias do blog:', error);
      setBlogCategories(defaultCategories);
    }
    
    setIsLoading(false);
  }, []);

  const saveBlogCategories = (categories: BlogCategory[]) => {
    console.log('Salvando categorias:', categories);
    setBlogCategories(categories);
    localStorage.setItem('adminBlogCategories', JSON.stringify(categories));
    
    // Força um refresh do estado
    window.dispatchEvent(new Event('storage'));
  };

  return { 
    blogCategories, 
    isLoading, 
    saveBlogCategories 
  };
};
