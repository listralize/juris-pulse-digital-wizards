
import { useState, useEffect } from 'react';
import { CategoryTexts } from '../types/adminTypes';
import { defaultPageTexts } from '../data/defaultPageTexts';

export const useCategoryTexts = () => {
  const [categoryTexts, setCategoryTexts] = useState<CategoryTexts[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedTexts = localStorage.getItem('adminPageTexts');
      if (savedTexts) {
        const parsedTexts = JSON.parse(savedTexts);
        setCategoryTexts(parsedTexts.categoryTexts || defaultPageTexts.categoryTexts);
      } else {
        setCategoryTexts(defaultPageTexts.categoryTexts);
      }
    } catch (error) {
      console.error('Erro ao carregar textos das categorias:', error);
      setCategoryTexts(defaultPageTexts.categoryTexts);
    }
    setIsLoading(false);
  }, []);

  const getCategoryText = (categoryId: string) => {
    return categoryTexts.find(category => category.id === categoryId);
  };

  return { categoryTexts, getCategoryText, isLoading };
};
