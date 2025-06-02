
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Database, RefreshCw, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { useSupabaseDataNew } from '../../hooks/useSupabaseDataNew';
import { useAdminData } from '../../hooks/useAdminData';

export const SupabaseDataManager: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
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
    refreshData
  } = useSupabaseDataNew();

  const hasLocalData = localTeamMembers.length > 0 || localServicePages.length > 0 || localCategories.length > 0 || localPageTexts.heroTitle;
  const hasSupabaseData = supabaseTeamMembers.length > 0 || supabaseServicePages.length > 0 || supabaseCategories.length > 0 || supabasePageTexts.heroTitle;

  // Status real da migração
  const migrationStatus = () => {
    if (hasSupabaseData && hasLocalData) {
      // Verificar se os números batem
      const localTotal = localServicePages.length + localTeamMembers.length + localCategories.length;
      const supabaseTotal = supabaseServicePages.length + supabaseTeamMembers.length + supabaseCategories.length;
      
      if (supabaseTotal >= localTotal * 0.8) { // 80% ou mais migrado
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

  return (
    <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <CardTitle className={`${isDark ? 'text-white' : 'text-black'} flex items-center gap-2`}>
          <Database className="w-5 h-5" />
          Status da Migração de Dados
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {status === 'completed' ? (
          <div className={`p-4 rounded-lg border ${isDark ? 'border-green-500/20 bg-green-500/10' : 'border-green-500/20 bg-green-50'}`}>
            <h3 className={`font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-green-400' : 'text-green-700'}`}>
              <CheckCircle className="w-4 h-4" />
              Migração Concluída
            </h3>
            <p className={`text-sm ${isDark ? 'text-green-200' : 'text-green-600'}`}>
              Seus dados foram migrados com sucesso para o Supabase e agora estão organizados 
              na estrutura hierárquica. Todas as edições são automaticamente sincronizadas.
            </p>
          </div>
        ) : status === 'partial' ? (
          <div className={`p-4 rounded-lg border ${isDark ? 'border-orange-500/20 bg-orange-500/10' : 'border-orange-500/20 bg-orange-50'}`}>
            <h3 className={`font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-orange-400' : 'text-orange-700'}`}>
              <Clock className="w-4 h-4" />
              Migração Parcial
            </h3>
            <p className={`text-sm ${isDark ? 'text-orange-200' : 'text-orange-600'}`}>
              Alguns dados foram migrados, mas ainda há inconsistências. 
              Verifique os números abaixo e clique em "Recarregar Dados" se necessário.
            </p>
          </div>
        ) : status === 'pending' ? (
          <div className={`p-4 rounded-lg border ${isDark ? 'border-yellow-500/20 bg-yellow-500/10' : 'border-yellow-500/20 bg-yellow-50'}`}>
            <h3 className={`font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-yellow-400' : 'text-yellow-700'}`}>
              <AlertCircle className="w-4 h-4" />
              Migração Pendente
            </h3>
            <p className={`text-sm ${isDark ? 'text-yellow-200' : 'text-yellow-600'}`}>
              Detectamos dados no localStorage que precisam ser migrados para o Supabase. 
              A migração deve ocorrer automaticamente em alguns segundos.
            </p>
          </div>
        ) : (
          <div className={`p-4 rounded-lg border ${isDark ? 'border-blue-500/20 bg-blue-500/10' : 'border-blue-500/20 bg-blue-50'}`}>
            <h3 className={`font-semibold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
              Sistema Pronto
            </h3>
            <p className={`text-sm ${isDark ? 'text-blue-200' : 'text-blue-600'}`}>
              O sistema está configurado e pronto para uso. Todos os dados serão armazenados no Supabase.
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
              Dados Supabase (Sistema Ativo)
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
              Estrutura Hierárquica Ativa
            </h3>
            <ul className={`text-sm space-y-1 ${isDark ? 'text-blue-200' : 'text-blue-600'}`}>
              <li>• ✅ Tabelas especializadas por tipo de conteúdo</li>
              <li>• ✅ Relacionamentos entre páginas, benefícios, processos e FAQs</li>
              <li>• ✅ Sincronização automática entre sessões</li>
              <li>• ✅ Histórico de alterações e versionamento</li>
            </ul>
          </div>
        )}
        
        <div className="flex gap-2">
          <Button 
            onClick={refreshData}
            size="sm" 
            variant="outline"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Recarregar Dados
          </Button>
          
          {status === 'pending' && (
            <Button 
              onClick={() => window.location.reload()}
              size="sm" 
              variant="default"
            >
              Forçar Migração
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
