
import React, { useState, useEffect } from 'react';
import { ServicePage, PageTexts } from '../../../types/adminTypes';
import { categories } from '../../../types/adminTypes';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Plus, ArrowLeft, Save, Settings } from 'lucide-react';
import { useTheme } from '../../ThemeProvider';
import { CategoryGrid } from './CategoryGrid';
import { PagesList } from './PagesList';
import { PageEditor } from './PageEditor';
import { CategoryTextsManagement } from '../CategoryTextsManagement';
import { NewLawAreaModal } from './NewLawAreaModal';
import { NewCategoryModal } from './NewCategoryModal';

interface ServicePagesManagerProps {
  servicePages: ServicePage[];
  pageTexts: PageTexts;
  onSave: (pages: ServicePage[]) => void;
  onSavePageTexts: () => void;
  onUpdatePageTexts: (texts: PageTexts) => void;
}

// Categorias específicas por área do direito - COMPLETAS
const lawAreaCategories = {
  familia: [
    { id: 'casamento-uniao', title: 'Casamento e União Estável', description: 'Formalização e dissolução de relacionamentos' },
    { id: 'divorcio-separacao', title: 'Divórcio e Separação', description: 'Assessoria completa em processos de divórcio consensual e litigioso' },
    { id: 'guarda-filhos', title: 'Guarda de Filhos', description: 'Definição de guarda, visitação e questões relacionadas aos filhos' },
    { id: 'pensao-alimenticia', title: 'Pensão Alimentícia', description: 'Fixação, revisão e execução de pensão alimentícia' },
    { id: 'adocao', title: 'Adoção', description: 'Processo de adoção nacional e internacional' },
    { id: 'protecao-menores', title: 'Proteção de Menores', description: 'Defesa dos direitos de crianças e adolescentes' },
    { id: 'patrimonio-sucessoes', title: 'Patrimônio e Sucessões', description: 'Gestão patrimonial familiar, planejamento sucessório e resolução de questões hereditárias' },
    { id: 'testamentos-sucessoes', title: 'Testamentos e Sucessões', description: 'Elaboração de testamentos e inventários' }
  ],
  tributario: [
    { id: 'planejamento-tributario', title: 'Planejamento Tributário', description: 'Estratégias para redução legal da carga tributária' },
    { id: 'elisao-fiscal', title: 'Elisão Fiscal', description: 'Técnicas legais de economia tributária' },
    { id: 'consultoria-impostos', title: 'Consultoria em Impostos', description: 'Orientação especializada sobre tributação' },
    { id: 'contencioso-tributario', title: 'Contencioso Tributário', description: 'Defesa em processos fiscais e administrativos' },
    { id: 'recuperacao-creditos', title: 'Recuperação de Créditos', description: 'Recuperação de tributos pagos indevidamente' },
    { id: 'parcelamento-debitos', title: 'Parcelamento de Débitos', description: 'Negociação e parcelamento de dívidas fiscais' },
    { id: 'auditoria-tributaria', title: 'Auditoria Tributária', description: 'Revisão e conformidade fiscal' },
    { id: 'compliance-tributario', title: 'Compliance Tributário', description: 'Adequação às normas tributárias' }
  ],
  empresarial: [
    { id: 'constituicao-empresas', title: 'Constituição de Empresas', description: 'Abertura e estruturação societária' },
    { id: 'contratos-empresariais', title: 'Contratos Empresariais', description: 'Elaboração e revisão de contratos comerciais' },
    { id: 'fusoes-aquisicoes', title: 'Fusões e Aquisições', description: 'Assessoria em operações de M&A' },
    { id: 'reestruturacao-societaria', title: 'Reestruturação Societária', description: 'Reorganização de estruturas empresariais' },
    { id: 'governanca-corporativa', title: 'Governança Corporativa', description: 'Implementação de boas práticas de gestão' },
    { id: 'compliance-empresarial', title: 'Compliance Empresarial', description: 'Conformidade regulatória e controles internos' },
    { id: 'contencioso-empresarial', title: 'Contencioso Empresarial', description: 'Resolução de conflitos comerciais' },
    { id: 'propriedade-intelectual', title: 'Propriedade Intelectual', description: 'Proteção de marcas, patentes e direitos autorais' }
  ],
  trabalho: [
    { id: 'assessoria-trabalhista', title: 'Assessoria Trabalhista', description: 'Consultoria preventiva em relações de trabalho' },
    { id: 'contencioso-trabalhista', title: 'Contencioso Trabalhista', description: 'Defesa em ações trabalhistas' },
    { id: 'defesa-trabalhador', title: 'Defesa do Trabalhador', description: 'Proteção dos direitos dos empregados' },
    { id: 'defesa-justa-causa', title: 'Defesa contra Justa Causa', description: 'Contestação de demissões por justa causa' },
    { id: 'reconhecimento-vinculo', title: 'Reconhecimento de Vínculo', description: 'Formalização de relações de trabalho' },
    { id: 'horas-extras', title: 'Horas Extras', description: 'Cobrança de horas extras e adicionais' },
    { id: 'adicionais-insalubridade', title: 'Adicionais de Insalubridade', description: 'Cobrança de adicionais por condições insalubres' },
    { id: 'acordos-coletivos', title: 'Acordos Coletivos', description: 'Negociação e implementação de acordos coletivos' },
    { id: 'compliance-trabalhista', title: 'Compliance Trabalhista', description: 'Adequação às normas trabalhistas' },
    { id: 'assedio-moral-sexual', title: 'Assédio Moral e Sexual', description: 'Combate ao assédio no ambiente de trabalho' },
    { id: 'saude-seguranca', title: 'Saúde e Segurança', description: 'Normas de segurança e medicina do trabalho' },
    { id: 'direitos-gestante', title: 'Direitos da Gestante', description: 'Proteção dos direitos da mulher gestante' }
  ],
  constitucional: [
    { id: 'acoes-controle', title: 'Ações de Controle de Constitucionalidade', description: 'ADI, ADC, ADPF e outras ações constitucionais' },
    { id: 'remedios-constitucionais', title: 'Remédios Constitucionais', description: 'Habeas Corpus, Mandado de Segurança, Habeas Data' },
    { id: 'atuacao-tribunais-superiores', title: 'Atuação nos Tribunais Superiores', description: 'Representação no STF e STJ' },
    { id: 'direitos-fundamentais', title: 'Direitos Fundamentais', description: 'Defesa de direitos e garantias constitucionais' },
    { id: 'liberdades-publicas', title: 'Liberdades Públicas', description: 'Proteção das liberdades individuais e coletivas' },
    { id: 'consultoria-constitucional', title: 'Consultoria Constitucional', description: 'Análise de constitucionalidade e pareceres' }
  ],
  administrativo: [
    { id: 'licitacoes-contratos', title: 'Licitações e Contratos', description: 'Assessoria em processos licitatórios' },
    { id: 'processos-administrativos', title: 'Processos Administrativos', description: 'Defesa em PAD e sindicâncias' },
    { id: 'atos-administrativos', title: 'Atos Administrativos', description: 'Contestação e anulação de atos administrativos' },
    { id: 'responsabilidade-estado', title: 'Responsabilidade do Estado', description: 'Ações indenizatórias contra o poder público' }
  ],
  previdenciario: [
    { id: 'beneficios-previdenciarios', title: 'Benefícios Previdenciários', description: 'Concessão e revisão de benefícios' },
    { id: 'aposentadorias', title: 'Aposentadorias', description: 'Aposentadoria por idade, tempo e especial' },
    { id: 'auxilio-doenca', title: 'Auxílio-Doença', description: 'Concessão e manutenção do benefício' },
    { id: 'pensao-morte', title: 'Pensão por Morte', description: 'Concessão de pensão aos dependentes' }
  ],
  consumidor: [
    { id: 'direitos-consumidor', title: 'Direitos do Consumidor', description: 'Proteção integral dos direitos consumeristas' },
    { id: 'contratos-consumo', title: 'Contratos de Consumo', description: 'Revisão e contestação de contratos' },
    { id: 'praticas-abusivas', title: 'Práticas Abusivas', description: 'Combate a práticas comerciais abusivas' },
    { id: 'publicidade-enganosa', title: 'Publicidade Enganosa', description: 'Ações contra propaganda enganosa' }
  ],
  civil: [
    { id: 'contratos-civil', title: 'Contratos', description: 'Elaboração, revisão e rescisão contratual' },
    { id: 'responsabilidade-civil', title: 'Responsabilidade Civil', description: 'Ações de indenização por danos' },
    { id: 'direito-propriedade', title: 'Direito de Propriedade', description: 'Questões imobiliárias e possessórias' },
    { id: 'sucessoes-herancas', title: 'Sucessões e Heranças', description: 'Inventários e questões sucessórias' }
  ]
};

export const ServicePagesManager: React.FC<ServicePagesManagerProps> = ({ 
  servicePages, 
  pageTexts,
  onSave, 
  onSavePageTexts,
  onUpdatePageTexts 
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [selectedLawArea, setSelectedLawArea] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [showCategoryEditor, setShowCategoryEditor] = useState(false);
  const [showNewLawAreaModal, setShowNewLawAreaModal] = useState(false);
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
  const [localPages, setLocalPages] = useState<ServicePage[]>([]);
  const [localLawAreaCategories, setLocalLawAreaCategories] = useState(lawAreaCategories);

  useEffect(() => {
    if (servicePages && servicePages.length > 0) {
      console.log('ServicePagesManager: Sincronizando páginas recebidas:', servicePages.length);
      setLocalPages([...servicePages]);
    }
  }, [servicePages]);

  const filteredPagesByLawArea = selectedLawArea 
    ? localPages.filter(page => page.category === selectedLawArea)
    : [];

  const filteredPagesByCategory = selectedCategory 
    ? filteredPagesByLawArea.filter(page => {
        const categoryInfo = lawAreaCategories[selectedLawArea as keyof typeof lawAreaCategories]?.find(cat => cat.id === selectedCategory);
        if (!categoryInfo) return false;
        
        const titleMatch = page.title?.toLowerCase().includes(categoryInfo.title.toLowerCase());
        const descMatch = page.description?.toLowerCase().includes(categoryInfo.title.toLowerCase());
        const hrefMatch = page.href?.includes(selectedCategory);
        const idMatch = page.id?.includes(selectedCategory);
        
        return titleMatch || descMatch || hrefMatch || idMatch;
      })
    : [];

  const selectedPage = selectedPageId 
    ? localPages.find(page => page.id === selectedPageId)
    : null;

  const updatePage = (pageId: string, field: keyof ServicePage, value: any) => {
    setLocalPages(pages => pages.map(page => 
      page.id === pageId ? { ...page, [field]: value } : page
    ));
  };

  const handleSave = () => {
    console.log('Salvando páginas locais:', localPages.length);
    onSave([...localPages]);
  };

  const addNewServicePage = () => {
    if (!selectedLawArea || !selectedCategory) return;
    
    const categoryInfo = lawAreaCategories[selectedLawArea as keyof typeof lawAreaCategories]?.find(cat => cat.id === selectedCategory);
    
    const newId = `${selectedLawArea}-${selectedCategory}-${Date.now()}`;
    const newServicePage: ServicePage = {
      id: newId,
      title: categoryInfo?.title || '',
      description: categoryInfo?.description || '',
      category: selectedLawArea,
      href: `/servicos/${selectedCategory}`,
      benefits: [],
      process: [],
      faq: [],
      testimonials: []
    };
    
    console.log('Adicionando nova página:', newId);
    setLocalPages(prev => [...prev, newServicePage]);
    setSelectedPageId(newId);
  };

  const removeServicePage = (pageId: string) => {
    console.log('Removendo página:', pageId);
    setLocalPages(pages => pages.filter(page => page.id !== pageId));
    if (selectedPageId === pageId) {
      setSelectedPageId(null);
    }
  };

  // Handlers para navegação
  const handleBackToLawAreas = () => {
    setSelectedLawArea(null);
    setSelectedCategory(null);
    setSelectedPageId(null);
    setShowCategoryEditor(false);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedPageId(null);
  };

  const handleBackToPages = () => {
    setSelectedPageId(null);
  };

  const addNewLawArea = (newArea: { id: string; title: string; description: string; color: string }) => {
    setLocalLawAreaCategories(prev => ({
      ...prev,
      [newArea.id]: []
    }));
    
    console.log('Nova área de direito criada:', newArea);
  };

  const addNewCategory = (categoryData: { id: string; title: string; description: string }) => {
    if (!selectedLawArea) return;
    
    setLocalLawAreaCategories(prev => ({
      ...prev,
      [selectedLawArea]: [
        ...(prev[selectedLawArea as keyof typeof prev] || []),
        categoryData
      ]
    }));
    
    console.log('Nova categoria criada para', selectedLawArea, ':', categoryData);
  };

  // Se está editando categorias
  if (showCategoryEditor) {
    return (
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => setShowCategoryEditor(false)}
                variant="outline"
                size="sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
                Editar Categorias de Serviços
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CategoryTextsManagement
            pageTexts={pageTexts}
            onUpdatePageTexts={onUpdatePageTexts}
            onSave={onSavePageTexts}
          />
        </CardContent>
      </Card>
    );
  }

  // Nível 1: Seleção da Área do Direito
  if (!selectedLawArea) {
    return (
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
              Selecione a Área do Direito
            </CardTitle>
            <div className="flex gap-2">
              <Button onClick={() => setShowNewLawAreaModal(true)} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nova Área
              </Button>
              <Button onClick={() => setShowCategoryEditor(true)} size="sm" variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Editar Categorias
              </Button>
              <Button onClick={handleSave} size="sm" variant="outline">
                <Save className="w-4 h-4 mr-2" />
                Salvar Tudo
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((lawArea) => {
              const areaPages = localPages.filter(page => page.category === lawArea.value);
              
              return (
                <Card 
                  key={lawArea.value}
                  className={`cursor-pointer transition-all hover:scale-105 ${isDark ? 'bg-black/50 border-white/10 hover:border-white/30' : 'bg-gray-50 border-gray-200 hover:border-gray-400'}`}
                  onClick={() => setSelectedLawArea(lawArea.value)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 rounded-full ${lawArea.color} mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl`}>
                      {areaPages.length}
                    </div>
                    <h3 className={`font-semibold text-lg mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                      {lawArea.label}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {areaPages.length} página{areaPages.length !== 1 ? 's' : ''} disponível{areaPages.length !== 1 ? 'eis' : ''}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>

        <NewLawAreaModal
          isOpen={showNewLawAreaModal}
          onClose={() => setShowNewLawAreaModal(false)}
          onSave={addNewLawArea}
        />
      </Card>
    );
  }

  // Nível 2: Seleção da Categoria de Serviço dentro da Área
  if (selectedLawArea && !selectedCategory) {
    const lawAreaInfo = categories.find(c => c.value === selectedLawArea);
    const availableCategories = localLawAreaCategories[selectedLawArea as keyof typeof localLawAreaCategories] || [];
    
    return (
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                onClick={handleBackToLawAreas}
                variant="outline"
                size="sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
                {lawAreaInfo?.label} - Categorias de Serviços
              </CardTitle>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setShowNewCategoryModal(true)} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nova Categoria
              </Button>
              <Button onClick={handleSave} size="sm" variant="outline">
                <Save className="w-4 h-4 mr-2" />
                Salvar Tudo
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableCategories.map((category) => {
              const categoryPages = filteredPagesByLawArea.filter(page => {
                const titleMatch = page.title?.toLowerCase().includes(category.title.toLowerCase());
                const descMatch = page.description?.toLowerCase().includes(category.title.toLowerCase());
                const hrefMatch = page.href?.includes(category.id);
                const idMatch = page.id?.includes(category.id);
                
                return titleMatch || descMatch || hrefMatch || idMatch;
              });
              
              return (
                <Card 
                  key={category.id}
                  className={`cursor-pointer transition-all hover:scale-105 ${isDark ? 'bg-black/50 border-white/10 hover:border-white/30' : 'bg-gray-50 border-gray-200 hover:border-gray-400'}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 rounded-full ${lawAreaInfo?.color} mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl`}>
                      {categoryPages.length}
                    </div>
                    <h3 className={`font-semibold text-lg mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                      {category.title}
                    </h3>
                    <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {category.description}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      {categoryPages.length} página{categoryPages.length !== 1 ? 's' : ''}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>

        <NewCategoryModal
          isOpen={showNewCategoryModal}
          onClose={() => setShowNewCategoryModal(false)}
          onSave={addNewCategory}
        />
      </Card>
    );
  }

  // Nível 3: Lista de Páginas dentro da Categoria
  if (selectedLawArea && selectedCategory && !selectedPageId) {
    const lawAreaInfo = categories.find(c => c.value === selectedLawArea);
    const categoryInfo = lawAreaCategories[selectedLawArea as keyof typeof lawAreaCategories]?.find(cat => cat.id === selectedCategory);
    
    return (
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                onClick={handleBackToCategories}
                variant="outline"
                size="sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
                {lawAreaInfo?.label} › {categoryInfo?.title}
              </CardTitle>
            </div>
            <div className="flex gap-2">
              <Button onClick={addNewServicePage} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nova Página
              </Button>
              <Button onClick={handleSave} size="sm" variant="outline">
                <Save className="w-4 h-4 mr-2" />
                Salvar Tudo
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <PagesList
            pages={filteredPagesByCategory}
            onPageSelect={setSelectedPageId}
            onNewPage={addNewServicePage}
            onDeletePage={removeServicePage}
          />
        </CardContent>
      </Card>
    );
  }

  // Nível 4: Editor da Página
  if (selectedPage) {
    const lawAreaInfo = categories.find(c => c.value === selectedLawArea);
    const categoryInfo = lawAreaCategories[selectedLawArea as keyof typeof lawAreaCategories]?.find(cat => cat.id === selectedCategory);
    
    return (
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                onClick={handleBackToPages}
                variant="outline"
                size="sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar à Lista
              </Button>
              <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
                {lawAreaInfo?.label} › {categoryInfo?.title} › {selectedPage.title || 'Nova Página'}
              </CardTitle>
            </div>
            <Button onClick={handleSave} size="sm" variant="outline">
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <PageEditor page={selectedPage} onUpdatePage={updatePage} />
        </CardContent>
      </Card>
    );
  }

  return null;
};
