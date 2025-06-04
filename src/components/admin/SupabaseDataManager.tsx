
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Database, RefreshCw, CheckCircle, AlertCircle, Clock, Upload, Zap } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { useSupabaseDataNew } from '../../hooks/useSupabaseDataNew';
import { useAdminData } from '../../hooks/useAdminData';
import { useBlogData } from '../../hooks/useBlogData';
import { useSupabaseBlog } from '../../hooks/supabase/useSupabaseBlog';

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

  const { blogPosts: localBlogPosts } = useBlogData();

  // Hook novo (Supabase)
  const {
    teamMembers: supabaseTeamMembers,
    pageTexts: supabasePageTexts,
    categories: supabaseCategories,
    servicePages: supabaseServicePages,
    refreshData: supabaseRefreshData
  } = useSupabaseDataNew();

  const { blogPosts: supabaseBlogPosts } = useSupabaseBlog();

  const hasLocalData = localTeamMembers.length > 0 || localServicePages.length > 0 || localCategories.length > 0 || localPageTexts.heroTitle || localBlogPosts.length > 0;
  const hasSupabaseData = supabaseTeamMembers.length > 0 || supabaseServicePages.length > 0 || supabaseCategories.length > 0 || supabasePageTexts.heroTitle || supabaseBlogPosts.length > 0;

  console.log('🔍 SUPABASE DATA MANAGER - ESTADO ATUAL:', {
    hasLocalData,
    hasSupabaseData,
    localCategories: localCategories.length,
    supabaseCategories: supabaseCategories.length,
    localServicePages: localServicePages.length,
    supabaseServicePages: supabaseServicePages.length,
    localBlogPosts: localBlogPosts.length,
    supabaseBlogPosts: supabaseBlogPosts.length
  });

  // Status da migração
  const migrationStatus = () => {
    if (supabaseCategories.length === 0) {
      return 'categories_missing';
    }
    
    if (supabaseServicePages.length === 0 && supabaseCategories.length > 0) {
      return 'pages_missing';
    }
    
    if (hasSupabaseData && hasLocalData) {
      const localTotal = localServicePages.length + localTeamMembers.length + localCategories.length + localBlogPosts.length;
      const supabaseTotal = supabaseServicePages.length + supabaseTeamMembers.length + supabaseCategories.length + supabaseBlogPosts.length;
      
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
          Status da Sincronização - Sistema Integrado
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {status === 'categories_missing' && (
          <div className={`p-4 rounded-lg border ${isDark ? 'border-red-500/20 bg-red-500/10' : 'border-red-500/20 bg-red-50'}`}>
            <h3 className={`font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-red-400' : 'text-red-700'}`}>
              <AlertCircle className="w-4 h-4" />
              SINCRONIZAÇÃO NECESSÁRIA
            </h3>
            <p className={`text-sm mb-3 ${isDark ? 'text-red-200' : 'text-red-600'}`}>
              Os dados locais precisam ser sincronizados com o Supabase.
            </p>
            <Button 
              onClick={handleForceMigration}
              disabled={isProcessing}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Zap className="w-4 h-4 mr-2" />
              SINCRONIZAR AGORA
            </Button>
          </div>
        )}

        {status === 'pages_missing' && (
          <div className={`p-4 rounded-lg border ${isDark ? 'border-orange-500/20 bg-orange-500/10' : 'border-orange-500/20 bg-orange-50'}`}>
            <h3 className={`font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-orange-400' : 'text-orange-700'}`}>
              <AlertCircle className="w-4 h-4" />
              PÁGINAS PRECISAM SER SINCRONIZADAS
            </h3>
            <p className={`text-sm mb-3 ${isDark ? 'text-orange-200' : 'text-orange-600'}`}>
              Categorias existem mas as páginas de serviços precisam ser migradas.
            </p>
            <Button 
              onClick={handleForceMigration}
              disabled={isProcessing}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              <Zap className="w-4 h-4 mr-2" />
              SINCRONIZAR PÁGINAS
            </Button>
          </div>
        )}

        {status === 'completed' ? (
          <div className={`p-4 rounded-lg border ${isDark ? 'border-green-500/20 bg-green-500/10' : 'border-green-500/20 bg-green-50'}`}>
            <h3 className={`font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-green-400' : 'text-green-700'}`}>
              <CheckCircle className="w-4 h-4" />
              Sistema Totalmente Sincronizado
            </h3>
            <p className={`text-sm ${isDark ? 'text-green-200' : 'text-green-600'}`}>
              Todos os dados estão sincronizados e editáveis pelo painel admin.
            </p>
          </div>
        ) : status === 'partial' ? (
          <div className={`p-4 rounded-lg border ${isDark ? 'border-orange-500/20 bg-orange-500/10' : 'border-orange-500/20 bg-orange-50'}`}>
            <h3 className={`font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-orange-400' : 'text-orange-700'}`}>
              <Clock className="w-4 h-4" />
              Sincronização Parcial
            </h3>
            <p className={`text-sm mb-3 ${isDark ? 'text-orange-200' : 'text-orange-600'}`}>
              Alguns dados foram sincronizados, mas ainda há pendências.
            </p>
            <Button 
              onClick={handleForceMigration}
              disabled={isProcessing}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              <Zap className="w-4 h-4 mr-2" />
              COMPLETAR SINCRONIZAÇÃO
            </Button>
          </div>
        ) : status === 'pending' ? (
          <div className={`p-4 rounded-lg border ${isDark ? 'border-yellow-500/20 bg-yellow-500/10' : 'border-yellow-500/20 bg-yellow-50'}`}>
            <h3 className={`font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-yellow-400' : 'text-yellow-700'}`}>
              <AlertCircle className="w-4 h-4" />
              Sincronização Pendente
            </h3>
            <p className={`text-sm mb-3 ${isDark ? 'text-yellow-200' : 'text-yellow-600'}`}>
              {localServicePages.length} páginas, {localBlogPosts.length} posts do blog e outros dados precisam ser sincronizados.
            </p>
            <Button 
              onClick={handleForceMigration}
              disabled={isProcessing}
              className="bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              <Zap className="w-4 h-4 mr-2" />
              SINCRONIZAR TUDO
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
              onClick={handleForceMigration}
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
              <li>• Páginas: <strong className="text-red-500">{localServicePages.length}</strong></li>
              <li>• Blog: <strong className="text-purple-500">{localBlogPosts.length}</strong></li>
              <li>• Equipe: {localTeamMembers.length}</li>
              <li>• Configurações: {localPageTexts.heroTitle ? 'Sim' : 'Não'}</li>
            </ul>
          </div>

          <div className={`p-4 rounded-lg border ${isDark ? 'border-white/20 bg-white/5' : 'border-gray-200 bg-gray-50'}`}>
            <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
              Supabase (Sistema Ativo)
            </h4>
            <ul className={`text-sm space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>• Categorias: <strong className={supabaseCategories.length === 0 ? 'text-red-500' : 'text-green-500'}>{supabaseCategories.length}</strong></li>
              <li>• Páginas: <strong className={supabaseServicePages.length === 0 ? 'text-red-500' : 'text-green-500'}>{supabaseServicePages.length}</strong></li>
              <li>• Blog: <strong className={supabaseBlogPosts.length === 0 ? 'text-red-500' : 'text-green-500'}>{supabaseBlogPosts.length}</strong></li>
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
            onClick={handleForceMigration}
            size="sm" 
            variant="default"
            disabled={isProcessing}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Zap className="w-4 h-4 mr-2" />
            SINCRONIZAÇÃO COMPLETA
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
