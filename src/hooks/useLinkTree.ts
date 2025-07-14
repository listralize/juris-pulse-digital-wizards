import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { LinkTree, LinkTreeItem } from '@/types/linkTreeTypes';
import { toast } from 'sonner';

export const useLinkTree = () => {
  const [linkTree, setLinkTree] = useState<LinkTree | null>(null);
  const [linkTreeItems, setLinkTreeItems] = useState<LinkTreeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

        setLinkTreeItems((itemsData || []).map(item => ({
          ...item,
          form_fields: item.form_fields ? JSON.parse(JSON.stringify(item.form_fields)) : []
        })) as LinkTreeItem[]);
      }
    } catch (error) {
      console.error('Erro ao carregar link tree:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveLinkTree = async (data: Omit<LinkTree, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      if (linkTree) {
        // Atualizar existente
        const { error } = await supabase
          .from('link_tree')
          .update(data)
          .eq('id', linkTree.id);

        if (error) throw error;
        
        setLinkTree({ ...linkTree, ...data });
      } else {
        // Criar novo
        const { data: newLinkTree, error } = await supabase
          .from('link_tree')
          .insert([data])
          .select()
          .single();

        if (error) throw error;
        
        setLinkTree(newLinkTree as LinkTree);
      }
      
      toast.success('Link Tree salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar link tree:', error);
      toast.error('Erro ao salvar Link Tree');
      throw error;
    }
  };

  const saveLinkTreeItem = async (item: Omit<LinkTreeItem, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: newItem, error } = await supabase
        .from('link_tree_items')
        .insert([{
          ...item,
          form_fields: item.form_fields ? JSON.stringify(item.form_fields) : null
        }])
        .select()
        .single();

      if (error) throw error;
      
      setLinkTreeItems(prev => [...prev, {
        ...newItem,
        form_fields: newItem.form_fields ? JSON.parse(JSON.stringify(newItem.form_fields)) : []
      } as LinkTreeItem].sort((a, b) => a.display_order - b.display_order));
      toast.success('Item adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar item:', error);
      toast.error('Erro ao adicionar item');
      throw error;
    }
  };

  const updateLinkTreeItem = async (id: string, data: Partial<LinkTreeItem>) => {
    try {
      const updateData = {
        ...data,
        form_fields: data.form_fields ? JSON.stringify(data.form_fields) : undefined
      };
      const { error } = await supabase
        .from('link_tree_items')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
      
      setLinkTreeItems(prev => 
        prev.map(item => item.id === id ? { ...item, ...data } : item)
      );
    } catch (error) {
      console.error('Erro ao atualizar item:', error);
      toast.error('Erro ao atualizar item');
      throw error;
    }
  };

  const deleteLinkTreeItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('link_tree_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setLinkTreeItems(prev => prev.filter(item => item.id !== id));
      toast.success('Item removido com sucesso!');
    } catch (error) {
      console.error('Erro ao remover item:', error);
      toast.error('Erro ao remover item');
      throw error;
    }
  };

  useEffect(() => {
    loadLinkTree();
  }, []);

  return {
    linkTree,
    linkTreeItems,
    isLoading,
    saveLinkTree,
    saveLinkTreeItem,
    updateLinkTreeItem,
    deleteLinkTreeItem,
    loadLinkTree
  };
};