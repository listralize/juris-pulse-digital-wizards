
import { ServicePage } from '../../../types/adminTypes';
import { lawAreaCategories } from './lawAreaCategories';

export const filterPagesByLawArea = (
  pages: ServicePage[],
  lawArea: string | null
): ServicePage[] => {
  if (!lawArea) return [];
  return pages.filter(page => page.category === lawArea);
};

export const filterPagesByCategory = (
  pages: ServicePage[],
  lawArea: string | null, 
  categoryId: string | null
): ServicePage[] => {
  if (!lawArea || !categoryId) return [];
  
  return pages.filter(page => {
    // Verifica primeiro se é da área correta
    if (page.category !== lawArea) return false;
    
    // Busca informações da categoria
    const categoryInfo = lawAreaCategories[lawArea as keyof typeof lawAreaCategories]?.find(
      cat => cat.id === categoryId
    );
    
    if (!categoryInfo) return false;
    
    // Critérios de correspondência:
    
    // 1. ID da página contém o ID da categoria
    if (page.id.includes(categoryId)) return true;
    
    // 2. URL da página contém o ID da categoria
    if (page.href && page.href.includes(categoryId)) return true;
    
    // 3. Correspondência por palavras-chave do título da categoria
    const categoryKeywords = categoryInfo.title
      .toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 2);
      
    const pageTitle = page.title?.toLowerCase() || '';
    const pageDesc = page.description?.toLowerCase() || '';
    
    return categoryKeywords.some(keyword => 
      pageTitle.includes(keyword) || pageDesc.includes(keyword)
    );
  });
};
