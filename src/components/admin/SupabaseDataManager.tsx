
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Database, CheckCircle } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { useSupabaseDataNew } from '../../hooks/useSupabaseDataNew';
import { useSupabaseBlog } from '../../hooks/supabase/useSupabaseBlog';
import { logger } from '@/utils/logger';

export const SupabaseDataManager: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const {
    categories: supabaseCategories,
    servicePages: supabaseServicePages,
    teamMembers: supabaseTeamMembers,
    pageTexts: supabasePageTexts
  } = useSupabaseDataNew();

  const { blogPosts: supabaseBlogPosts } = useSupabaseBlog();

  logger.log('🔍 SUPABASE DATA STATUS:', {
    categories: supabaseCategories.length,
    servicePages: supabaseServicePages.length,
    teamMembers: supabaseTeamMembers.length,
    blogPosts: supabaseBlogPosts.length,
    pageTexts: supabasePageTexts.heroTitle ? 'Configurado' : 'Não configurado'
  });

  return (
    <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <CardTitle className={`${isDark ? 'text-white' : 'text-black'} flex items-center gap-2`}>
          <Database className="w-5 h-5" />
          Status da Sincronização Automática
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className={`p-4 rounded-lg border ${isDark ? 'border-green-500/20 bg-green-500/10' : 'border-green-500/20 bg-green-50'}`}>
          <h3 className={`font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-green-400' : 'text-green-700'}`}>
            <CheckCircle className="w-4 h-4" />
            Sistema Sincronizado Automaticamente
          </h3>
          <p className={`text-sm ${isDark ? 'text-green-200' : 'text-green-600'}`}>
            Todos os dados estão sendo sincronizados automaticamente com o Supabase. 
            Edite tudo diretamente pelo painel admin.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className={`p-4 rounded-lg border ${isDark ? 'border-white/20 bg-white/5' : 'border-gray-200 bg-gray-50'}`}>
            <h4 className={`font-medium mb-3 ${isDark ? 'text-white' : 'text-black'}`}>
              Status dos Dados no Supabase
            </h4>
            <ul className={`text-sm space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <li className="flex justify-between">
                <span>• Categorias:</span>
                <strong className={supabaseCategories.length > 0 ? 'text-green-500' : 'text-yellow-500'}>
                  {supabaseCategories.length}
                </strong>
              </li>
              <li className="flex justify-between">
                <span>• Páginas de Serviços:</span>
                <strong className={supabaseServicePages.length > 0 ? 'text-green-500' : 'text-yellow-500'}>
                  {supabaseServicePages.length}
                </strong>
              </li>
              <li className="flex justify-between">
                <span>• Posts do Blog:</span>
                <strong className={supabaseBlogPosts.length > 0 ? 'text-green-500' : 'text-yellow-500'}>
                  {supabaseBlogPosts.length}
                </strong>
              </li>
              <li className="flex justify-between">
                <span>• Equipe:</span>
                <strong className={supabaseTeamMembers.length > 0 ? 'text-green-500' : 'text-yellow-500'}>
                  {supabaseTeamMembers.length}
                </strong>
              </li>
              <li className="flex justify-between">
                <span>• Configurações de Página:</span>
                <strong className={supabasePageTexts.heroTitle ? 'text-green-500' : 'text-yellow-500'}>
                  {supabasePageTexts.heroTitle ? 'Configurado' : 'Não configurado'}
                </strong>
              </li>
            </ul>
          </div>
        </div>

        <div className={`p-3 rounded-lg ${isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'}`}>
          <p className={`text-sm ${isDark ? 'text-blue-200' : 'text-blue-700'}`}>
            <strong>✨ Sistema Automático:</strong> Não é mais necessário sincronizar manualmente. 
            Todos os dados são automaticamente migrados e mantidos em sincronia com o Supabase.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};