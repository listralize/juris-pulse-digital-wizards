
import { ServicePage } from '../../../types/adminTypes';
import { lawAreaCategories } from './lawAreaCategories';

export const filterPagesByLawArea = (
  pages: ServicePage[],
  lawArea: string | null
): ServicePage[] => {
  if (!lawArea) return [];
  
  console.log('Filtrando páginas para área:', lawArea);
  console.log('Total de páginas disponíveis:', pages.length);
  
  const filtered = pages.filter(page => page.category === lawArea);
  console.log('Páginas encontradas para', lawArea, ':', filtered.length);
  
  return filtered;
};

export const filterPagesByCategory = (
  pages: ServicePage[],
  lawArea: string | null, 
  categoryId: string | null
): ServicePage[] => {
  if (!lawArea || !categoryId) return [];
  
  console.log('Filtrando páginas para área:', lawArea, 'categoria:', categoryId);
  
  // Primeiro filtra por área do direito
  const areaPages = pages.filter(page => page.category === lawArea);
  console.log('Páginas da área', lawArea, ':', areaPages.length);
  
  // Busca informações da categoria
  const categoryInfo = lawAreaCategories[lawArea as keyof typeof lawAreaCategories]?.find(
    cat => cat.id === categoryId
  );
  
  if (!categoryInfo) {
    console.log('Categoria não encontrada:', categoryId);
    // Se categoria não existe, retorna todas as páginas da área
    return areaPages;
  }
  
  console.log('Categoria encontrada:', categoryInfo.title);
  
  // Critérios mais flexíveis de correspondência:
  const matchingPages = areaPages.filter(page => {
    // 1. ID da página contém o ID da categoria
    if (page.id.toLowerCase().includes(categoryId.toLowerCase())) {
      console.log('Match por ID:', page.id, 'contém', categoryId);
      return true;
    }
    
    // 2. URL da página contém o ID da categoria
    if (page.href && page.href.toLowerCase().includes(categoryId.toLowerCase())) {
      console.log('Match por href:', page.href, 'contém', categoryId);
      return true;
    }
    
    // 3. Correspondência por palavras-chave do título da categoria
    const categoryKeywords = categoryInfo.title
      .toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 2);
      
    const pageTitle = page.title?.toLowerCase() || '';
    const pageDesc = page.description?.toLowerCase() || '';
    const pageId = page.id.toLowerCase();
    
    const hasKeywordMatch = categoryKeywords.some(keyword => 
      pageTitle.includes(keyword) || 
      pageDesc.includes(keyword) || 
      pageId.includes(keyword)
    );
    
    if (hasKeywordMatch) {
      console.log('Match por palavra-chave para página:', page.title);
      return true;
    }
    
    // 4. Se é uma página genérica da área (quando categoria é muito geral)
    if (categoryId === 'geral' || categoryId === 'outros') {
      return true;
    }
    
    return false;
  });
  
  console.log('Páginas correspondentes encontradas:', matchingPages.length);
  
  // Se não encontrou nenhuma página específica, retorna algumas páginas da área
  if (matchingPages.length === 0) {
    console.log('Nenhuma página específica encontrada, retornando páginas da área');
    return areaPages.slice(0, 5); // Retorna até 5 páginas da área
  }
  
  return matchingPages;
};
