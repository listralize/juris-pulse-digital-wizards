import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { LinkTree, LinkTreeItem } from '@/types/linkTreeTypes';
import { LinkTreePreview } from '@/components/LinkTreePreview';
import { ExternalLink } from 'lucide-react';
import NeuralBackground from '@/components/NeuralBackground';

export default function LinkTreePage() {
  const [linkTree, setLinkTree] = useState<LinkTree | null>(null);
  const [linkTreeItems, setLinkTreeItems] = useState<LinkTreeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLinkTree();
  }, []);

  const loadLinkTree = async () => {
    try {
      setIsLoading(true);
      
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
        return;
      }

      if (linkTreeData) {
        setLinkTree(linkTreeData as LinkTree);

        // Carregar itens do link tree
        const { data: itemsData, error: itemsError } = await supabase
          .from('link_tree_items')
          .select('*')
          .eq('link_tree_id', linkTreeData.id)
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (itemsError) {
          console.error('Erro ao carregar itens do link tree:', itemsError);
          return;
        }

        const processedItems = (itemsData || []).map(item => ({
          ...item,
          form_fields: item.form_fields ? (typeof item.form_fields === 'string' ? JSON.parse(item.form_fields) : item.form_fields) : []
        })) as LinkTreeItem[];

        setLinkTreeItems(processedItems);
      }
    } catch (error) {
      console.error('Erro ao carregar link tree:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleItemClick = async (item: LinkTreeItem) => {
    if (item.item_type === 'link' && item.url) {
      // Incrementar contador de cliques
      await supabase
        .from('link_tree_items')
        .update({ click_count: item.click_count + 1 })
        .eq('id', item.id);

      const fullUrl = item.url.startsWith('http') ? item.url : `https://${item.url}`;
      window.open(fullUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative bg-black">
        <NeuralBackground />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin"></div>
          <p className="text-white/70 text-sm">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!linkTree) {
    return (
      <div className="min-h-screen flex items-center justify-center relative bg-black">
        <NeuralBackground />
        <div className="relative z-10 text-center text-white">
          <div className="mb-8">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ExternalLink className="w-12 h-12" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Link Tree não configurado</h1>
            <p className="text-white/70 max-w-md mx-auto">
              Esta página ainda não foi configurada. Entre em contato com o administrador para mais informações.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <LinkTreePreview linkTree={linkTree} linkTreeItems={linkTreeItems} onItemClick={handleItemClick} />;
}