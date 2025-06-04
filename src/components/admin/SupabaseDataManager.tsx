
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Database, RefreshCw, CheckCircle, AlertCircle, Clock, Upload, Zap } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { useSupabaseDataNew } from '../../hooks/useSupabaseDataNew';
import { useAdminData } from '../../hooks/useAdminData';

interface SupabaseDataManagerProps {
  onForceMigration?: () => Promise<void>;
  refreshData?: () => Promise<void>;
}

export const SupabaseDataManager: React.FC<SupabaseDataManagerProps> = ({ 
  onForceMigration, 
  refreshData 
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Hook atual (localStorage)
  const {
    teamMembers: localTeamMembers,
    pageTexts: localPageTexts,
    categories: localCategories,
    servicePages: localServicePages
  } = useAdminData();

  // Hook novo (Supabase)
  const {
    teamMembers: supabaseTeamMembers,
    pageTexts: supabasePageTexts,
    categories: supabaseCategories,
    servicePages: supabaseServicePages,
    refreshData: supabaseRefreshData,
    saveCategories: saveSupabaseCategories,
    saveServicePages: saveSupabaseServicePages
  } = useSupabaseDataNew();

  const hasLocalData = localTeamMembers.length > 0 || localServicePages.length > 0 || localCategories.length > 0 || localPageTexts.heroTitle;
  const hasSupabaseData = supabaseTeamMembers.length > 0 || supabaseServicePages.length > 0 || supabaseCategories.length > 0 || supabasePageTexts.heroTitle;

  console.log('🔍 SUPABASE DATA MANAGER - ESTADO ATUAL:', {
    hasLocalData,
    hasSupabaseData,
    localCategories: localCategories.length,
    supabaseCategories: supabaseCategories.length,
    localServicePages: localServicePages.length,
    supabaseServicePages: supabaseServicePages.length
  });

  // MIGRAÇÃO FORÇADA COMPLETA - NOVA VERSÃO
  const forceCompleteMigration = async () => {
    console.log('🔥 FORÇANDO MIGRAÇÃO COMPLETA - CATEGORIAS + PÁGINAS');
    setIsProcessing(true);
    
    try {
      // 1. MIGRAR CATEGORIAS PADRÃO
      const defaultCategories = [
        {
          id: 'familia-' + Date.now(),
          value: 'familia',
          label: 'Direito de Família',
          name: 'Direito de Família',
          description: 'Proteção e orientação em questões familiares',
          icon: 'Heart',
          color: 'bg-rose-500'
        },
        {
          id: 'tributario-' + Date.now(),
          value: 'tributario',
          label: 'Direito Tributário',
          name: 'Direito Tributário',
          description: 'Consultoria e planejamento tributário',
          icon: 'Calculator',
          color: 'bg-blue-500'
        },
        {
          id: 'empresarial-' + Date.now(),
          value: 'empresarial',
          label: 'Direito Empresarial',
          name: 'Direito Empresarial',
          description: 'Suporte jurídico para empresas',
          icon: 'Building2',
          color: 'bg-green-500'
        },
        {
          id: 'trabalho-' + Date.now(),
          value: 'trabalho',
          label: 'Direito do Trabalho',
          name: 'Direito do Trabalho',
          description: 'Defesa dos direitos trabalhistas',
          icon: 'Users',
          color: 'bg-orange-500'
        },
        {
          id: 'constitucional-' + Date.now(),
          value: 'constitucional',
          label: 'Direito Constitucional',
          name: 'Direito Constitucional',
          description: 'Defesa de direitos fundamentais',
          icon: 'Scale',
          color: 'bg-purple-500'
        },
        {
          id: 'administrativo-' + Date.now(),
          value: 'administrativo',
          label: 'Direito Administrativo',
          name: 'Direito Administrativo',
          description: 'Atuação junto ao poder público',
          icon: 'FileText',
          color: 'bg-indigo-500'
        },
        {
          id: 'previdenciario-' + Date.now(),
          value: 'previdenciario',
          label: 'Direito Previdenciário',
          name: 'Direito Previdenciário',
          description: 'Benefícios previdenciários',
          icon: 'Shield',
          color: 'bg-yellow-500'
        },
        {
          id: 'consumidor-' + Date.now(),
          value: 'consumidor',
          label: 'Direito do Consumidor',
          name: 'Direito do Consumidor',
          description: 'Proteção aos direitos do consumidor',
          icon: 'ShoppingCart',
          color: 'bg-teal-500'
        },
        {
          id: 'civil-' + Date.now(),
          value: 'civil',
          label: 'Direito Civil',
          name: 'Direito Civil',
          description: 'Questões civis e contratuais',
          icon: 'Home',
          color: 'bg-gray-500'
        }
      ];

      console.log('📋 1. Migrando categorias padrão...');
      await saveSupabaseCategories(defaultCategories);
      
      // 2. AGUARDAR CATEGORIAS SEREM PROCESSADAS
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 3. MIGRAR PÁGINAS DE SERVIÇOS (USAR DADOS LOCAIS SE DISPONÍVEIS)
      let pagesToMigrate = localServicePages;
      
      // Se não há páginas locais, criar páginas de exemplo
      if (!pagesToMigrate || pagesToMigrate.length === 0) {
        console.log('📄 Criando páginas de serviços de exemplo...');
        pagesToMigrate = [
          {
            id: 'divorcio-' + Date.now(),
            title: 'Divórcio',
            description: 'Orientação completa para processo de divórcio',
            category: 'familia',
            href: 'divorcio',
            benefits: [
              { title: 'Agilidade', description: 'Processo rápido e eficiente' },
              { title: 'Segurança Jurídica', description: 'Proteção total dos seus direitos' }
            ],
            process: [
              { step: 1, title: 'Consulta Inicial', description: 'Análise do seu caso' },
              { step: 2, title: 'Documentação', description: 'Preparação dos documentos' }
            ],
            faq: [
              { question: 'Quanto tempo demora?', answer: 'O processo pode levar de 3 a 6 meses.' }
            ],
            testimonials: [
              { name: 'Maria Silva', text: 'Excelente atendimento!', role: 'Cliente' }
            ]
          },
          {
            id: 'planejamento-tributario-' + Date.now(),
            title: 'Planejamento Tributário',
            description: 'Otimização fiscal para sua empresa',
            category: 'tributario',
            href: 'planejamento-tributario',
            benefits: [
              { title: 'Economia', description: 'Redução significativa de impostos' },
              { title: 'Compliance', description: 'Conformidade com a legislação' }
            ],
            process: [
              { step: 1, title: 'Análise Fiscal', description: 'Diagnóstico da situação atual' },
              { step: 2, title: 'Estratégia', description: 'Desenvolvimento do plano' }
            ],
            faq: [
              { question: 'É legal?', answer: 'Sim, totalmente dentro da legislação.' }
            ],
            testimonials: [
              { name: 'João Santos', text: 'Economizei muito!', role: 'Empresário' }
            ]
          },
          {
            id: 'constituicao-empresa-' + Date.now(),
            title: 'Constituição de Empresa',
            description: 'Abertura de empresa de forma rápida e segura',
            category: 'empresarial',
            href: 'constituicao-empresa',
            benefits: [
              { title: 'Rapidez', description: 'Processo otimizado' },
              { title: 'Suporte Completo', description: 'Acompanhamento total' }
            ],
            process: [
              { step: 1, title: 'Planejamento', description: 'Definição da estrutura' },
              { step: 2, title: 'Registro', description: 'Formalização da empresa' }
            ],
            faq: [
              { question: 'Qual o prazo?', answer: 'De 15 a 30 dias úteis.' }
            ],
            testimonials: [
              { name: 'Ana Costa', text: 'Processo muito tranquilo!', role: 'Empreendedora' }
            ]
          }
        ];
      }
      
      console.log('📄 2. Migrando páginas de serviços:', pagesToMigrate.length);
      await saveSupabaseServicePages(pagesToMigrate);
      
      // 4. RECARREGAR DADOS MÚLTIPLAS VEZES
      console.log('🔄 3. Recarregando dados...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      await supabaseRefreshData();
      await new Promise(resolve => setTimeout(resolve, 1000));
      await supabaseRefreshData();
      
      console.log(`✅ MIGRAÇÃO COMPLETA FINALIZADA!`);
      alert(`✅ Migração completa realizada com sucesso!\n${defaultCategories.length} categorias + ${pagesToMigrate.length} páginas migradas!`);
      
    } catch (error) {
      console.error('❌ Erro na migração completa:', error);
      alert(`❌ Erro na migração: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Status da migração
  const migrationStatus = () => {
    if (supabaseCategories.length === 0) {
      return 'categories_missing';
    }
    
    if (supabaseServicePages.length === 0 && supabaseCategories.length > 0) {
      return 'pages_missing';
    }
    
    if (hasSupabaseData && hasLocalData) {
      const localTotal = localServicePages.length + localTeamMembers.length + localCategories.length;
      const supabaseTotal = supabaseServicePages.length + supabaseTeamMembers.length + supabaseCategories.length;
      
      if (supabaseTotal >= localTotal * 0.8) {
        return 'completed';
      } else {
        return 'partial';
      }
    } else if (hasSupabaseData && !hasLocalData) {
      return 'completed';
    } else if (hasLocalData && !hasSupabaseData) {
      return 'pending';
    } else {
      return 'empty';
    }
  };

  const status = migrationStatus();

  const handleRefreshData = async () => {
    console.log('🔄 Botão Recarregar Dados clicado');
    setIsProcessing(true);
    try {
      if (refreshData) {
        await refreshData();
      } else {
        await supabaseRefreshData();
      }
      console.log('✅ Dados recarregados');
    } catch (error) {
      console.error('❌ Erro ao recarregar dados:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleForceMigration = async () => {
    if (!onForceMigration) return;
    
    console.log('🚀 Botão Forçar Migração clicado');
    setIsProcessing(true);
    try {
      await onForceMigration();
      console.log('✅ Migração forçada concluída');
    } catch (error) {
      console.error('❌ Erro na migração forçada:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <CardTitle className={`${isDark ? 'text-white' : 'text-black'} flex items-center gap-2`}>
          <Database className="w-5 h-5" />
          Status da Migração de Dados
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {status === 'categories_missing' && (
          <div className={`p-4 rounded-lg border ${isDark ? 'border-red-500/20 bg-red-500/10' : 'border-red-500/20 bg-red-50'}`}>
            <h3 className={`font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-red-400' : 'text-red-700'}`}>
              <AlertCircle className="w-4 h-4" />
              CATEGORIAS NÃO ENCONTRADAS!
            </h3>
            <p className={`text-sm mb-3 ${isDark ? 'text-red-200' : 'text-red-600'}`}>
              O sistema precisa das categorias para funcionar.
            </p>
            <Button 
              onClick={forceCompleteMigration}
              disabled={isProcessing}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Zap className="w-4 h-4 mr-2" />
              MIGRAÇÃO COMPLETA AGORA
            </Button>
          </div>
        )}

        {status === 'pages_missing' && (
          <div className={`p-4 rounded-lg border ${isDark ? 'border-orange-500/20 bg-orange-500/10' : 'border-orange-500/20 bg-orange-50'}`}>
            <h3 className={`font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-orange-400' : 'text-orange-700'}`}>
              <AlertCircle className="w-4 h-4" />
              PÁGINAS DE SERVIÇOS NÃO ENCONTRADAS!
            </h3>
            <p className={`text-sm mb-3 ${isDark ? 'text-orange-200' : 'text-orange-600'}`}>
              Categorias existem mas não há páginas de serviços vinculadas.
            </p>
            <Button 
              onClick={forceCompleteMigration}
              disabled={isProcessing}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              <Zap className="w-4 h-4 mr-2" />
              MIGRAR PÁGINAS AGORA
            </Button>
          </div>
        )}

        {status === 'completed' ? (
          <div className={`p-4 rounded-lg border ${isDark ? 'border-green-500/20 bg-green-500/10' : 'border-green-500/20 bg-green-50'}`}>
            <h3 className={`font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-green-400' : 'text-green-700'}`}>
              <CheckCircle className="w-4 h-4" />
              Migração Concluída
            </h3>
            <p className={`text-sm ${isDark ? 'text-green-200' : 'text-green-600'}`}>
              Todos os dados estão sincronizados com o Supabase.
            </p>
          </div>
        ) : status === 'partial' ? (
          <div className={`p-4 rounded-lg border ${isDark ? 'border-orange-500/20 bg-orange-500/10' : 'border-orange-500/20 bg-orange-50'}`}>
            <h3 className={`font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-orange-400' : 'text-orange-700'}`}>
              <Clock className="w-4 h-4" />
              Migração Parcial
            </h3>
            <p className={`text-sm mb-3 ${isDark ? 'text-orange-200' : 'text-orange-600'}`}>
              Alguns dados foram migrados, mas ainda há inconsistências.
            </p>
            <Button 
              onClick={forceCompleteMigration}
              disabled={isProcessing}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              <Zap className="w-4 h-4 mr-2" />
              COMPLETAR MIGRAÇÃO
            </Button>
          </div>
        ) : status === 'pending' ? (
          <div className={`p-4 rounded-lg border ${isDark ? 'border-yellow-500/20 bg-yellow-500/10' : 'border-yellow-500/20 bg-yellow-50'}`}>
            <h3 className={`font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-yellow-400' : 'text-yellow-700'}`}>
              <AlertCircle className="w-4 h-4" />
              Migração Pendente
            </h3>
            <p className={`text-sm mb-3 ${isDark ? 'text-yellow-200' : 'text-yellow-600'}`}>
              Dados no localStorage precisam ser migrados.
            </p>
            <Button 
              onClick={forceCompleteMigration}
              disabled={isProcessing}
              className="bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              <Zap className="w-4 h-4 mr-2" />
              MIGRAR AGORA
            </Button>
          </div>
        ) : (
          <div className={`p-4 rounded-lg border ${isDark ? 'border-blue-500/20 bg-blue-500/10' : 'border-blue-500/20 bg-blue-50'}`}>
            <h3 className={`font-semibold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
              Sistema Vazio
            </h3>
            <p className={`text-sm mb-3 ${isDark ? 'text-blue-200' : 'text-blue-600'}`}>
              Nenhum dado encontrado. Vamos configurar tudo.
            </p>
            <Button 
              onClick={forceCompleteMigration}
              disabled={isProcessing}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Zap className="w-4 h-4 mr-2" />
              CONFIGURAR SISTEMA
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg border ${isDark ? 'border-white/20 bg-white/5' : 'border-gray-200 bg-gray-50'}`}>
            <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
              Local (localStorage)
            </h4>
            <ul className={`text-sm space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>• Categorias: <strong className="text-blue-500">{localCategories.length}</strong></li>
              <li>• Páginas: {localServicePages.length}</li>
              <li>• Equipe: {localTeamMembers.length}</li>
              <li>• Configurações: {localPageTexts.heroTitle ? 'Sim' : 'Não'}</li>
            </ul>
          </div>

          <div className={`p-4 rounded-lg border ${isDark ? 'border-white/20 bg-white/5' : 'border-gray-200 bg-gray-50'}`}>
            <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
              Supabase (Ativo)
            </h4>
            <ul className={`text-sm space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>• Categorias: <strong className={supabaseCategories.length === 0 ? 'text-red-500' : 'text-green-500'}>{supabaseCategories.length}</strong></li>
              <li>• Páginas: <strong className={supabaseServicePages.length === 0 ? 'text-red-500' : 'text-green-500'}>{supabaseServicePages.length}</strong></li>
              <li>• Equipe: {supabaseTeamMembers.length}</li>
              <li>• Configurações: {supabasePageTexts.heroTitle ? 'Sim' : 'Não'}</li>
            </ul>
          </div>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Button 
            onClick={handleRefreshData}
            size="sm" 
            variant="outline"
            disabled={isProcessing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isProcessing ? 'animate-spin' : ''}`} />
            Recarregar
          </Button>
          
          <Button 
            onClick={forceCompleteMigration}
            size="sm" 
            variant="default"
            disabled={isProcessing}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Zap className="w-4 h-4 mr-2" />
            MIGRAÇÃO TOTAL
          </Button>
          
          {(status === 'pending' || status === 'partial') && onForceMigration && (
            <Button 
              onClick={handleForceMigration}
              size="sm" 
              variant="default"
              disabled={isProcessing}
            >
              <Upload className="w-4 h-4 mr-2" />
              Migração Alternativa
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
