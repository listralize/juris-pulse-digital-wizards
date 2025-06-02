
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Database, RefreshCw, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { useSupabaseDataNew } from '../../hooks/useSupabaseDataNew';
import { useAdminData } from '../../hooks/useAdminData';
import { toast } from 'sonner';

export const SupabaseDataManager: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isInitializing, setIsInitializing] = useState(false);
  const [migrationStep, setMigrationStep] = useState('');
  const [migrationProgress, setMigrationProgress] = useState(0);
  
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
    saveTeamMembers: saveSupabaseTeamMembers,
    savePageTexts: saveSupabasePageTexts,
    saveCategories: saveSupabaseCategories,
    saveServicePages: saveSupabaseServicePages,
    refreshData
  } = useSupabaseDataNew();

  const initializeSupabaseData = async () => {
    setIsInitializing(true);
    setMigrationProgress(0);
    
    try {
      console.log('Iniciando migração completa dos dados para Supabase...');
      
      // Passo 1: Migrar configurações do site
      setMigrationStep('Migrando configurações do site...');
      setMigrationProgress(20);
      await saveSupabasePageTexts(localPageTexts);
      
      // Passo 2: Migrar categorias
      setMigrationStep('Migrando categorias de direito...');
      setMigrationProgress(40);
      await saveSupabaseCategories(localCategories);
      
      // Passo 3: Migrar membros da equipe
      setMigrationStep('Migrando membros da equipe...');
      setMigrationProgress(60);
      await saveSupabaseTeamMembers(localTeamMembers);
      
      // Passo 4: Migrar páginas de serviços (mais complexo)
      setMigrationStep(`Migrando ${localServicePages.length} páginas de serviços...`);
      setMigrationProgress(80);
      await saveSupabaseServicePages(localServicePages);
      
      // Passo 5: Recarregar dados
      setMigrationStep('Finalizando migração...');
      setMigrationProgress(100);
      await refreshData();
      
      toast.success('Migração completa! Todos os dados foram transferidos para o Supabase.');
      setMigrationStep('Migração concluída com sucesso!');
    } catch (error) {
      console.error('Erro na migração:', error);
      toast.error(`Erro na migração: ${error.message || 'Erro desconhecido'}`);
      setMigrationStep('Erro na migração - verifique o console');
    }
    
    setIsInitializing(false);
  };

  const hasLocalData = localTeamMembers.length > 0 || localServicePages.length > 0 || localCategories.length > 0;
  const hasSupabaseData = supabaseTeamMembers.length > 0 || supabaseServicePages.length > 0 || supabaseCategories.length > 0;

  return (
    <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <CardTitle className={`${isDark ? 'text-white' : 'text-black'} flex items-center gap-2`}>
          <Database className="w-5 h-5" />
          Gerenciamento de Dados Supabase
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!hasSupabaseData && hasLocalData && (
          <div className={`p-4 rounded-lg border ${isDark ? 'border-yellow-500/20 bg-yellow-500/10' : 'border-yellow-500/20 bg-yellow-50'}`}>
            <h3 className={`font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-yellow-400' : 'text-yellow-700'}`}>
              <AlertCircle className="w-4 h-4" />
              Migração Necessária
            </h3>
            <p className={`text-sm mb-4 ${isDark ? 'text-yellow-200' : 'text-yellow-600'}`}>
              Detectamos {localServicePages.length} páginas de serviços, {localTeamMembers.length} membros da equipe 
              e {localCategories.length} categorias no localStorage. Para usar a nova estrutura hierárquica do Supabase, 
              você precisa migrar estes dados.
            </p>
            
            {isInitializing && (
              <div className="mb-4">
                <div className={`text-sm mb-2 ${isDark ? 'text-yellow-200' : 'text-yellow-600'}`}>
                  {migrationStep}
                </div>
                <div className={`w-full bg-gray-200 rounded-full h-2 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div 
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${migrationProgress}%` }}
                  ></div>
                </div>
                <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {migrationProgress}% concluído
                </div>
              </div>
            )}
            
            <Button 
              onClick={initializeSupabaseData}
              disabled={isInitializing}
              className="w-full"
            >
              {isInitializing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  {migrationStep || 'Migrando...'}
                </>
              ) : (
                <>
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Migrar {localServicePages.length} Páginas + Dados para Supabase
                </>
              )}
            </Button>
          </div>
        )}

        {hasSupabaseData && (
          <div className={`p-4 rounded-lg border ${isDark ? 'border-green-500/20 bg-green-500/10' : 'border-green-500/20 bg-green-50'}`}>
            <h3 className={`font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-green-400' : 'text-green-700'}`}>
              <CheckCircle className="w-4 h-4" />
              Dados Migrados com Sucesso
            </h3>
            <p className={`text-sm ${isDark ? 'text-green-200' : 'text-green-600'}`}>
              Seus dados estão agora organizados na estrutura hierárquica do Supabase e são automaticamente 
              sincronizados entre todas as sessões.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg border ${isDark ? 'border-white/20 bg-white/5' : 'border-gray-200 bg-gray-50'}`}>
            <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
              Dados Locais (localStorage)
            </h4>
            <ul className={`text-sm space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>• Páginas de Serviços: {localServicePages.length}</li>
              <li>• Membros da Equipe: {localTeamMembers.length}</li>
              <li>• Categorias: {localCategories.length}</li>
              <li>• Configurações: {localPageTexts.heroTitle ? 'Configurado' : 'Não configurado'}</li>
            </ul>
          </div>

          <div className={`p-4 rounded-lg border ${isDark ? 'border-white/20 bg-white/5' : 'border-gray-200 bg-gray-50'}`}>
            <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
              Dados Supabase (Novo Sistema)
            </h4>
            <ul className={`text-sm space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>• Páginas de Serviços: {supabaseServicePages.length}</li>
              <li>• Membros da Equipe: {supabaseTeamMembers.length}</li>
              <li>• Categorias: {supabaseCategories.length}</li>
              <li>• Configurações: {supabasePageTexts.heroTitle ? 'Configurado' : 'Não configurado'}</li>
            </ul>
          </div>
        </div>

        {hasSupabaseData && (
          <div className={`p-4 rounded-lg border ${isDark ? 'border-blue-500/20 bg-blue-500/10' : 'border-blue-500/20 bg-blue-50'}`}>
            <h3 className={`font-semibold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
              Nova Estrutura Ativa
            </h3>
            <ul className={`text-sm space-y-1 ${isDark ? 'text-blue-200' : 'text-blue-600'}`}>
              <li>• ✅ Tabelas especializadas por tipo de conteúdo</li>
              <li>• ✅ Relacionamentos entre páginas, benefícios, processos e FAQs</li>
              <li>• ✅ Sincronização automática entre sessões</li>
              <li>• ✅ Histórico de alterações e versionamento</li>
              <li>• ✅ Performance otimizada para grandes volumes</li>
            </ul>
            
            <Button 
              onClick={refreshData}
              size="sm" 
              variant="outline"
              className="mt-3"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Recarregar Dados
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
