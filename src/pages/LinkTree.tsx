import React, { useEffect, useState } from 'react';
import { LinkTree as LinkTreeType, LinkTreeItem } from '@/types/linkTreeTypes';
import { supabase } from '@/integrations/supabase/client';
import { ExternalLink } from 'lucide-react';
import NeuralBackground from '@/components/NeuralBackground';

const LinkTree = () => {
  const [linkTree, setLinkTree] = useState<LinkTreeType | null>(null);
  const [linkTreeItems, setLinkTreeItems] = useState<LinkTreeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLinkTree = async () => {
      try {
        // Carregar link tree principal
        const { data: linkTreeData, error: linkTreeError } = await supabase
          .from('link_tree')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (linkTreeError && linkTreeError.code !== 'PGRST116') {
          console.error('Erro ao carregar link tree:', linkTreeError);
          setIsLoading(false);
          return;
        }

        if (linkTreeData) {
          setLinkTree(linkTreeData as LinkTreeType);

          // Carregar itens do link tree
          const { data: itemsData, error: itemsError } = await supabase
            .from('link_tree_items')
            .select('*')
            .eq('link_tree_id', linkTreeData.id)
            .eq('is_active', true)
            .order('display_order', { ascending: true });

          if (itemsError) {
            console.error('Erro ao carregar itens do link tree:', itemsError);
          } else {
            setLinkTreeItems(itemsData || []);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar link tree:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLinkTree();
  }, []);

  const handleLinkClick = (url: string) => {
    // Adicionar https:// se não estiver presente
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    window.open(fullUrl, '_blank', 'noopener,noreferrer');
  };

  const getButtonStyle = (style: string) => {
    switch (style) {
      case 'pill':
        return 'rounded-full';
      case 'square':
        return 'rounded-none';
      default:
        return 'rounded-lg';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!linkTree) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Link Tree não configurado</h1>
          <p className="text-gray-400">Configure seu Link Tree no painel administrativo.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen relative"
      style={{ backgroundColor: linkTree.background_color }}
    >
      <NeuralBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center space-y-6">
            {/* Avatar */}
            {linkTree.avatar_url && (
              <div className="flex justify-center">
                <img
                  src={linkTree.avatar_url}
                  alt={linkTree.title}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white/20 shadow-lg"
                />
              </div>
            )}

            {/* Título e Descrição */}
            <div className="space-y-2">
              <h1
                className="text-3xl font-bold"
                style={{ color: linkTree.text_color }}
              >
                {linkTree.title}
              </h1>
              {linkTree.description && (
                <p
                  className="text-lg opacity-80"
                  style={{ color: linkTree.text_color }}
                >
                  {linkTree.description}
                </p>
              )}
            </div>

            {/* Links */}
            <div className="space-y-4 pt-6">
              {linkTreeItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.url)}
                  className={`w-full p-4 font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/20 flex items-center justify-center gap-2 ${getButtonStyle(linkTree.button_style)}`}
                  style={{
                    backgroundColor: item.background_color,
                    color: item.text_color
                  }}
                >
                  <span>{item.title}</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              ))}

              {linkTreeItems.length === 0 && (
                <p
                  className="text-center py-8 opacity-60"
                  style={{ color: linkTree.text_color }}
                >
                  Nenhum link disponível no momento.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkTree;