import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Shield, Award, Trophy, Medal, Star, Users, CheckCircle, 
  Building, Briefcase, Scale, BookOpen, Gavel, GraduationCap,
  Target, TrendingUp, Clock, Heart, Zap, Crown, 
  Plus, Edit, Trash2, Save
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuthorityItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  value?: string;
  category: 'achievements' | 'certifications' | 'experience' | 'metrics';
  is_active: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

const iconOptions = [
  { name: 'shield', icon: Shield, label: 'Escudo' },
  { name: 'award', icon: Award, label: 'Prêmio' },
  { name: 'trophy', icon: Trophy, label: 'Troféu' },
  { name: 'medal', icon: Medal, label: 'Medalha' },
  { name: 'star', icon: Star, label: 'Estrela' },
  { name: 'users', icon: Users, label: 'Usuários' },
  { name: 'check-circle', icon: CheckCircle, label: 'Check' },
  { name: 'building', icon: Building, label: 'Edifício' },
  { name: 'briefcase', icon: Briefcase, label: 'Maleta' },
  { name: 'scale', icon: Scale, label: 'Balança' },
  { name: 'book-open', icon: BookOpen, label: 'Livro' },
  { name: 'gavel', icon: Gavel, label: 'Martelo' },
  { name: 'graduation-cap', icon: GraduationCap, label: 'Formatura' },
  { name: 'target', icon: Target, label: 'Alvo' },
  { name: 'trending-up', icon: TrendingUp, label: 'Crescimento' },
  { name: 'clock', icon: Clock, label: 'Relógio' },
  { name: 'heart', icon: Heart, label: 'Coração' },
  { name: 'zap', icon: Zap, label: 'Raio' },
  { name: 'crown', icon: Crown, label: 'Coroa' }
];

const categoryOptions = [
  { value: 'achievements', label: 'Conquistas' },
  { value: 'certifications', label: 'Certificações' },
  { value: 'experience', label: 'Experiência' },
  { value: 'metrics', label: 'Métricas' }
];

export const AuthorityManager: React.FC = () => {
  const [items, setItems] = useState<AuthorityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AuthorityItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'shield',
    value: '',
    category: 'achievements' as AuthorityItem['category'],
    is_active: true,
    order: 1
  });

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('admin_settings')
        .select('*')
        .single();

      if (error) throw error;
      
      // Usar um campo existente ou criar no page_texts como JSON
      const currentPageTexts = data?.page_texts as any || {};
      const authorityItems = currentPageTexts.authority_items || [];
      setItems(Array.isArray(authorityItems) ? authorityItems : []);
    } catch (error: any) {
      console.error('Erro ao carregar itens de autoridade:', error);
      toast.error('Erro ao carregar itens de autoridade');
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const itemData = {
        ...formData,
        id: editingItem?.id || crypto.randomUUID(),
        updated_at: new Date().toISOString(),
        created_at: editingItem?.created_at || new Date().toISOString()
      };

      let updatedItems;
      if (editingItem) {
        updatedItems = items.map(item => 
          item.id === editingItem.id ? itemData : item
        );
      } else {
        updatedItems = [...items, itemData].sort((a, b) => a.order - b.order);
      }

      // Primeiro buscar o registro atual
      const { data: currentData } = await supabase
        .from('admin_settings')
        .select('page_texts')
        .single();

      const currentPageTexts = (currentData?.page_texts as any) || {};
      
      const { error } = await supabase
        .from('admin_settings')
        .update({ 
          page_texts: {
            ...currentPageTexts,
            authority_items: updatedItems
          },
          updated_at: new Date().toISOString()
        })
        .eq('id', '1');

      if (error) throw error;

      toast.success(editingItem ? 'Item atualizado!' : 'Item criado!');
      setIsDialogOpen(false);
      resetForm();
      loadItems();
    } catch (error: any) {
      console.error('Erro ao salvar item:', error);
      toast.error('Erro ao salvar item');
    }
  };

  const handleEdit = (item: AuthorityItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      icon: item.icon,
      value: item.value || '',
      category: item.category,
      is_active: item.is_active,
      order: item.order
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este item?')) return;

    try {
      const updatedItems = items.filter(item => item.id !== id);

      // Primeiro buscar o registro atual
      const { data: currentData } = await supabase
        .from('admin_settings')
        .select('page_texts')
        .single();

      const currentPageTexts = (currentData?.page_texts as any) || {};

      const { error } = await supabase
        .from('admin_settings')
        .update({ 
          page_texts: {
            ...currentPageTexts,
            authority_items: updatedItems
          },
          updated_at: new Date().toISOString()
        })
        .eq('id', '1');

      if (error) throw error;

      toast.success('Item excluído!');
      loadItems();
    } catch (error: any) {
      console.error('Erro ao excluir item:', error);
      toast.error('Erro ao excluir item');
    }
  };

  const toggleActive = async (item: AuthorityItem) => {
    try {
      const updatedItems = items.map(i => 
        i.id === item.id 
          ? { ...i, is_active: !i.is_active, updated_at: new Date().toISOString() }
          : i
      );

      // Primeiro buscar o registro atual
      const { data: currentData } = await supabase
        .from('admin_settings')
        .select('page_texts')
        .single();

      const currentPageTexts = (currentData?.page_texts as any) || {};

      const { error } = await supabase
        .from('admin_settings')
        .update({ 
          page_texts: {
            ...currentPageTexts,
            authority_items: updatedItems
          },
          updated_at: new Date().toISOString()
        })
        .eq('id', '1');

      if (error) throw error;

      toast.success(`Item ${!item.is_active ? 'ativado' : 'desativado'}!`);
      loadItems();
    } catch (error: any) {
      console.error('Erro ao alterar status:', error);
      toast.error('Erro ao alterar status');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: 'shield',
      value: '',
      category: 'achievements',
      is_active: true,
      order: 1
    });
    setEditingItem(null);
  };

  const handleOpenDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const getIconComponent = (iconName: string) => {
    const iconOption = iconOptions.find(opt => opt.name === iconName);
    return iconOption ? iconOption.icon : Shield;
  };

  const getCategoryLabel = (category: string) => {
    const categoryOption = categoryOptions.find(opt => opt.value === category);
    return categoryOption ? categoryOption.label : category;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Autoridade</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Carregando...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Gerenciar Autoridade</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenDialog} className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Novo Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Editar Item' : 'Novo Item de Autoridade'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Título</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: 15 Anos de Experiência"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Descrição</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descrição detalhada do item"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Valor (opcional)</label>
                <Input
                  value={formData.value}
                  onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
                  placeholder="Ex: 15+, 500+, 98%"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Categoria</label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value: AuthorityItem['category']) => 
                    setFormData(prev => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Ícone</label>
                <Select 
                  value={formData.icon} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {iconOptions.map(option => {
                      const IconComponent = option.icon;
                      return (
                        <SelectItem key={option.name} value={option.name}>
                          <div className="flex items-center gap-2">
                            <IconComponent className="w-4 h-4" />
                            {option.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Ordem</label>
                <Input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 1 }))}
                  min="1"
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                  />
                  <label htmlFor="is_active" className="text-sm">Ativo</label>
                </div>

                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Salvar
                  </Button>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Nenhum item de autoridade cadastrado
            </p>
          ) : (
            items.map((item) => {
              const IconComponent = getIconComponent(item.icon);
              return (
                <Card key={item.id} className={!item.is_active ? 'opacity-50' : ''}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{item.title}</h4>
                            {item.value && (
                              <Badge variant="secondary" className="text-xs">
                                {item.value}
                              </Badge>
                            )}
                            <Badge 
                              variant={item.is_active ? 'default' : 'secondary'} 
                              className="text-xs"
                            >
                              {item.is_active ? 'Ativo' : 'Inativo'}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {getCategoryLabel(item.category)}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                          <p className="text-xs text-gray-400">Ordem: {item.order}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={item.is_active ? "secondary" : "default"}
                          onClick={() => toggleActive(item)}
                        >
                          {item.is_active ? 'Desativar' : 'Ativar'}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};