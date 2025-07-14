import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { useLinkTree } from '@/hooks/useLinkTree';
import { LinkTree, LinkTreeItem } from '@/types/linkTreeTypes';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Plus, Trash2, Eye, Save, GripVertical } from 'lucide-react';
import { toast } from 'sonner';

export const LinkTreeManagement = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const {
    linkTree,
    linkTreeItems,
    isLoading,
    saveLinkTree,
    saveLinkTreeItem,
    updateLinkTreeItem,
    deleteLinkTreeItem
  } = useLinkTree();

  const [formData, setFormData] = useState<Omit<LinkTree, 'id' | 'created_at' | 'updated_at'>>({
    title: linkTree?.title || 'Meu Link Tree',
    description: linkTree?.description || '',
    background_color: linkTree?.background_color || '#000000',
    text_color: linkTree?.text_color || '#ffffff',
    button_style: linkTree?.button_style || 'rounded',
    avatar_url: linkTree?.avatar_url || '',
    is_active: linkTree?.is_active ?? true
  });

  const [newItem, setNewItem] = useState({
    title: '',
    url: '',
    icon: '',
    background_color: '#ffffff',
    text_color: '#000000'
  });

  const [showPreview, setShowPreview] = useState(false);

  React.useEffect(() => {
    if (linkTree) {
      setFormData({
        title: linkTree.title,
        description: linkTree.description || '',
        background_color: linkTree.background_color,
        text_color: linkTree.text_color,
        button_style: linkTree.button_style,
        avatar_url: linkTree.avatar_url || '',
        is_active: linkTree.is_active
      });
    }
  }, [linkTree]);

  const handleSave = async () => {
    try {
      await saveLinkTree(formData);
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  };

  const handleAddItem = async () => {
    if (!newItem.title || !newItem.url) {
      toast.error('Título e URL são obrigatórios');
      return;
    }

    if (!linkTree) {
      toast.error('Salve as configurações do Link Tree primeiro');
      return;
    }

    try {
      await saveLinkTreeItem({
        link_tree_id: linkTree.id,
        title: newItem.title,
        url: newItem.url,
        icon: newItem.icon,
        background_color: newItem.background_color,
        text_color: newItem.text_color,
        display_order: linkTreeItems.length,
        is_active: true
      });

      setNewItem({
        title: '',
        url: '',
        icon: '',
        background_color: '#ffffff',
        text_color: '#000000'
      });
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (confirm('Tem certeza que deseja remover este item?')) {
      await deleteLinkTreeItem(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
          Gerenciar Link Tree
        </h2>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowPreview(!showPreview)}
            variant="outline"
            size="sm"
          >
            <Eye className="w-4 h-4 mr-2" />
            {showPreview ? 'Ocultar Preview' : 'Ver Preview'}
          </Button>
          <Button onClick={handleSave} size="sm">
            <Save className="w-4 h-4 mr-2" />
            Salvar Configurações
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configurações */}
        <div className="space-y-6">
          <Card className={isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : 'text-black'}>
                Configurações Gerais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className={isDark ? 'text-gray-300' : 'text-gray-700'}>Título</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}
                />
              </div>

              <div>
                <Label className={isDark ? 'text-gray-300' : 'text-gray-700'}>Descrição</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}
                />
              </div>

              <div>
                <Label className={isDark ? 'text-gray-300' : 'text-gray-700'}>URL do Avatar</Label>
                <Input
                  value={formData.avatar_url}
                  onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                  placeholder="https://..."
                  className={isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className={isDark ? 'text-gray-300' : 'text-gray-700'}>Cor de Fundo</Label>
                  <Input
                    type="color"
                    value={formData.background_color}
                    onChange={(e) => setFormData({ ...formData, background_color: e.target.value })}
                    className="h-10"
                  />
                </div>
                <div>
                  <Label className={isDark ? 'text-gray-300' : 'text-gray-700'}>Cor do Texto</Label>
                  <Input
                    type="color"
                    value={formData.text_color}
                    onChange={(e) => setFormData({ ...formData, text_color: e.target.value })}
                    className="h-10"
                  />
                </div>
              </div>

              <div>
                <Label className={isDark ? 'text-gray-300' : 'text-gray-700'}>Estilo dos Botões</Label>
                <Select
                  value={formData.button_style}
                  onValueChange={(value: 'rounded' | 'square' | 'pill') => 
                    setFormData({ ...formData, button_style: value })
                  }
                >
                  <SelectTrigger className={isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rounded">Arredondado</SelectItem>
                    <SelectItem value="square">Quadrado</SelectItem>
                    <SelectItem value="pill">Pílula</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Adicionar Item */}
          <Card className={isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : 'text-black'}>
                Adicionar Novo Link
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className={isDark ? 'text-gray-300' : 'text-gray-700'}>Título</Label>
                <Input
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  placeholder="Ex: Meu Site"
                  className={isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}
                />
              </div>

              <div>
                <Label className={isDark ? 'text-gray-300' : 'text-gray-700'}>URL</Label>
                <Input
                  value={newItem.url}
                  onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                  placeholder="https://..."
                  className={isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}
                />
              </div>

              <div>
                <Label className={isDark ? 'text-gray-300' : 'text-gray-700'}>Ícone (opcional)</Label>
                <Input
                  value={newItem.icon}
                  onChange={(e) => setNewItem({ ...newItem, icon: e.target.value })}
                  placeholder="Ex: globe, mail, phone"
                  className={isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className={isDark ? 'text-gray-300' : 'text-gray-700'}>Cor de Fundo</Label>
                  <Input
                    type="color"
                    value={newItem.background_color}
                    onChange={(e) => setNewItem({ ...newItem, background_color: e.target.value })}
                    className="h-10"
                  />
                </div>
                <div>
                  <Label className={isDark ? 'text-gray-300' : 'text-gray-700'}>Cor do Texto</Label>
                  <Input
                    type="color"
                    value={newItem.text_color}
                    onChange={(e) => setNewItem({ ...newItem, text_color: e.target.value })}
                    className="h-10"
                  />
                </div>
              </div>

              <Button onClick={handleAddItem} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Link
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview e Lista de Items */}
        <div className="space-y-6">
          {showPreview && (
            <Card className={isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}>
              <CardHeader>
                <CardTitle className={isDark ? 'text-white' : 'text-black'}>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="p-6 rounded-lg min-h-[400px]"
                  style={{ backgroundColor: formData.background_color }}
                >
                  <div className="text-center space-y-4">
                    {formData.avatar_url && (
                      <img
                        src={formData.avatar_url}
                        alt="Avatar"
                        className="w-20 h-20 rounded-full mx-auto object-cover"
                      />
                    )}
                    <h1
                      className="text-2xl font-bold"
                      style={{ color: formData.text_color }}
                    >
                      {formData.title}
                    </h1>
                    {formData.description && (
                      <p
                        className="text-sm opacity-80"
                        style={{ color: formData.text_color }}
                      >
                        {formData.description}
                      </p>
                    )}
                    
                    <div className="space-y-3 mt-6">
                      {linkTreeItems.map((item) => (
                        <div
                          key={item.id}
                          className={`p-3 text-center cursor-pointer transition-transform hover:scale-105 ${
                            formData.button_style === 'rounded' ? 'rounded-lg' :
                            formData.button_style === 'pill' ? 'rounded-full' : 'rounded-none'
                          }`}
                          style={{
                            backgroundColor: item.background_color,
                            color: item.text_color
                          }}
                        >
                          {item.title}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Lista de Items */}
          <Card className={isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : 'text-black'}>
                Links ({linkTreeItems.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {linkTreeItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <GripVertical className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                            {item.title}
                          </p>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {item.url}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {linkTreeItems.length === 0 && (
                  <p className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Nenhum link adicionado ainda.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};