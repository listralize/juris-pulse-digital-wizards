
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Database, RefreshCw, ArrowRight } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { useSupabaseDataNew } from '../../hooks/useSupabaseDataNew';
import { useAdminData } from '../../hooks/useAdminData';
import { toast } from 'sonner';

export const SupabaseDataManager: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isInitializing, setIsInitializing] = useState(false);
  
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
    try {
      console.log('Iniciando migração dos dados para Supabase...');
      
      // Migrar dados em sequência
      await saveSupabasePageTexts(localPageTexts);
      await saveSupabaseTeamMembers(localTeamMembers);
      await saveSupabaseCategories(localCategories);
      await saveSupabaseServicePages(localServicePages);
      
      // Recarregar dados do Supabase
      await refreshData();
      
      toast.success('Dados migrados para Supabase com sucesso!');
    } catch (error) {
      console.error('Erro na migração:', error);
      toast.error('Erro ao migrar dados para Supabase');
    }
    setIsInitializing(false);
  };

  return (
    <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <CardTitle className={`${isDark ? 'text-white' : 'text-black'} flex items-center gap-2`}>
          <Database className="w-5 h-5" />
          Gerenciamento de Dados Supabase
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className={`p-4 rounded-lg border ${isDark ? 'border-yellow-500/20 bg-yellow-500/10' : 'border-yellow-500/20 bg-yellow-50'}`}>
          <h3 className={`font-semibold mb-2 ${isDark ? 'text-yellow-400' : 'text-yellow-700'}`}>
            Migração para Nova Estrutura
          </h3>
          <p className={`text-sm mb-4 ${isDark ? 'text-yellow-200' : 'text-yellow-600'}`}>
            Seus dados estão atualmente salvos localmente. Para usar a nova estrutura hierárquica do Supabase, 
            clique no botão abaixo para migrar todos os dados.
          </p>
          <Button 
            onClick={initializeSupabaseData}
            disabled={isInitializing}
            className="w-full"
          >
            {isInitializing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Migrando Dados...
              </>
            ) : (
              <>
                <ArrowRight className="w-4 h-4 mr-2" />
                Migrar Dados para Supabase
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg border ${isDark ? 'border-white/20 bg-white/5' : 'border-gray-200 bg-gray-50'}`}>
            <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
              Dados Locais (Atual)
            </h4>
            <ul className={`text-sm space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>• Membros da Equipe: {localTeamMembers.length}</li>
              <li>• Categorias: {localCategories.length}</li>
              <li>• Páginas de Serviços: {localServicePages.length}</li>
              <li>• Configurações: {localPageTexts.heroTitle ? 'Configurado' : 'Não configurado'}</li>
            </ul>
          </div>

          <div className={`p-4 rounded-lg border ${isDark ? 'border-white/20 bg-white/5' : 'border-gray-200 bg-gray-50'}`}>
            <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
              Dados Supabase (Novo)
            </h4>
            <ul className={`text-sm space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>• Membros da Equipe: {supabaseTeamMembers.length}</li>
              <li>• Categorias: {supabaseCategories.length}</li>
              <li>• Páginas de Serviços: {supabaseServicePages.length}</li>
              <li>• Configurações: {supabasePageTexts.heroTitle ? 'Configurado' : 'Não configurado'}</li>
            </ul>
          </div>
        </div>

        <div className={`p-4 rounded-lg border ${isDark ? 'border-blue-500/20 bg-blue-500/10' : 'border-blue-500/20 bg-blue-50'}`}>
          <h3 className={`font-semibold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
            Vantagens da Nova Estrutura
          </h3>
          <ul className={`text-sm space-y-1 ${isDark ? 'text-blue-200' : 'text-blue-600'}`}>
            <li>• ✅ Dados organizados em tabelas separadas</li>
            <li>• ✅ Relacionamentos hierárquicos entre dados</li>
            <li>• ✅ Melhor performance para edição</li>
            <li>• ✅ Facilita backup e sincronização</li>
            <li>• ✅ Controle granular de permissões</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
