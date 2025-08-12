
import React, { useState, useEffect } from 'react';
import { useTheme } from '../ThemeProvider';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { ArrowLeft, Plus, Save, Edit, Trash2, Eye, RefreshCw, X } from 'lucide-react';
import { BlogPost } from '../../types/blogTypes';
import { toast } from 'sonner';
import { GalleryButton } from './GalleryButton';
import { VisualBlogEditor } from './VisualBlogEditor';

interface BlogManagementProps {
  blogPosts: BlogPost[];
  onSave: (posts: BlogPost[]) => void;
}

export const BlogManagement: React.FC<BlogManagementProps> = ({
  blogPosts,
  onSave
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [localPosts, setLocalPosts] = useState<BlogPost[]>([]);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    console.log('BlogManagement - Recebendo posts:', blogPosts.length);
    setLocalPosts([...blogPosts]);
  }, [blogPosts]);

  const createNewPost = () => {
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: 'Novo Post',
      content: '',
      excerpt: '',
      banner: '',
      author: 'Autor',
      publishedAt: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      slug: 'novo-post-' + Date.now(),
      tags: [],
      featured: false
    };
    setSelectedPost(newPost);
    setIsEditing(true);
  };

  const updatePost = (field: keyof BlogPost, value: any) => {
    if (!selectedPost) return;
    
    const updatedPost = { ...selectedPost, [field]: value };
    
    // Auto-generate slug from title
    if (field === 'title') {
      updatedPost.slug = value.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .trim();
    }
    
    setSelectedPost(updatedPost);
  };

  const addTag = () => {
    if (!selectedPost || !newTag.trim()) return;
    
    const trimmedTag = newTag.trim();
    if (selectedPost.tags.includes(trimmedTag)) {
      toast.error('Tag já existe neste post');
      return;
    }
    
    const updatedPost = {
      ...selectedPost,
      tags: [...selectedPost.tags, trimmedTag]
    };
    
    setSelectedPost(updatedPost);
    setNewTag('');
  };

  const removeTag = (tagToRemove: string) => {
    if (!selectedPost) return;
    
    const updatedPost = {
      ...selectedPost,
      tags: selectedPost.tags.filter(tag => tag !== tagToRemove)
    };
    
    setSelectedPost(updatedPost);
  };

  const savePost = async () => {
    if (!selectedPost) return;
    
    if (!selectedPost.title.trim()) {
      toast.error('Título é obrigatório');
      return;
    }

    if (!selectedPost.author.trim()) {
      toast.error('Autor é obrigatório');
      return;
    }
    
    const isNew = !localPosts.find(p => p.id === selectedPost.id);
    let updatedPosts;
    
    if (isNew) {
      updatedPosts = [...localPosts, selectedPost];
    } else {
      updatedPosts = localPosts.map(p => 
        p.id === selectedPost.id ? selectedPost : p
      );
    }
    
    try {
      setLocalPosts(updatedPosts);
      await onSave(updatedPosts);
      
      if (isNew) {
        toast.success('Post criado e salvo no Supabase!');
      } else {
        toast.success('Post atualizado e salvo no Supabase!');
      }
      
      setIsEditing(false);
      setSelectedPost(null);
    } catch (error) {
      console.error('Erro ao salvar post:', error);
      toast.error('Erro ao salvar post no Supabase');
    }
  };

  const deletePost = async (postId: string) => {
    if (!confirm('Tem certeza que deseja excluir este post?')) return;
    
    try {
      const updatedPosts = localPosts.filter(p => p.id !== postId);
      setLocalPosts(updatedPosts);
      await onSave(updatedPosts);
      toast.success('Post excluído do Supabase!');
      
      if (selectedPost?.id === postId) {
        setSelectedPost(null);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Erro ao excluir post:', error);
      toast.error('Erro ao excluir post do Supabase');
    }
  };

  const featuredCount = localPosts.filter(p => p.featured).length;

  // Obter todas as tags únicas de todos os posts
  const allTags = Array.from(new Set(localPosts.flatMap(post => post.tags)));

  // Se está editando um post
  if (isEditing && selectedPost) {
    return (
      <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => {
                  setIsEditing(false);
                  setSelectedPost(null);
                }}
                variant="outline"
                size="sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
                {selectedPost.title || 'Novo Post'}
              </CardTitle>
            </div>
            <Button onClick={savePost} size="sm">
              <Save className="w-4 h-4 mr-2" />
              Salvar no Supabase
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={selectedPost.title}
                  onChange={(e) => updatePost('title', e.target.value)}
                  placeholder="Título do post"
                />
              </div>
              
              <div>
                <Label htmlFor="excerpt">Resumo</Label>
                <Textarea
                  id="excerpt"
                  value={selectedPost.excerpt}
                  onChange={(e) => updatePost('excerpt', e.target.value)}
                  placeholder="Breve descrição do post"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="author">Autor *</Label>
                <Input
                  id="author"
                  value={selectedPost.author}
                  onChange={(e) => updatePost('author', e.target.value)}
                  placeholder="Nome do autor"
                />
              </div>
              
              <div>
                <Label htmlFor="banner">URL do Banner</Label>
                <div className="flex gap-2">
                  <Input
                    id="banner"
                    value={selectedPost.banner}
                    onChange={(e) => updatePost('banner', e.target.value)}
                    placeholder="URL da imagem de banner"
                    className="flex-1"
                  />
                  <GalleryButton
                    onSelect={(url) => updatePost('banner', url)}
                    size="sm"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="publishedAt">Data de Publicação</Label>
                <Input
                  id="publishedAt"
                  type="date"
                  value={selectedPost.publishedAt}
                  onChange={(e) => updatePost('publishedAt', e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={selectedPost.featured}
                  onCheckedChange={(checked) => updatePost('featured', checked)}
                />
                <Label htmlFor="featured">Post em destaque</Label>
                {featuredCount >= 3 && !selectedPost.featured && (
                  <span className="text-xs text-yellow-600">
                    (Já há 3 posts em destaque)
                  </span>
                )}
              </div>

              <div>
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input
                  id="slug"
                  value={selectedPost.slug}
                  onChange={(e) => updatePost('slug', e.target.value)}
                  placeholder="url-do-post"
                />
              </div>

              {/* Gerenciamento de Tags */}
              <div>
                <Label>Tags para Filtro</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Digite uma tag"
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button onClick={addTag} size="sm" type="button">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedPost.tags.map((tag) => (
                    <span 
                      key={tag}
                      className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${isDark ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                {allTags.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Tags existentes:</p>
                    <div className="flex flex-wrap gap-1">
                      {allTags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            if (!selectedPost.tags.includes(tag)) {
                              setSelectedPost({
                                ...selectedPost,
                                tags: [...selectedPost.tags, tag]
                              });
                            }
                          }}
                          className={`text-xs px-2 py-1 rounded border ${isDark ? 'border-white/20 hover:bg-white/10' : 'border-gray-200 hover:bg-gray-100'}`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <VisualBlogEditor
              content={selectedPost.content}
              onChange={(content) => updatePost('content', content)}
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Lista de posts
  return (
    <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
              Gerenciar Posts do Blog
            </CardTitle>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {localPosts.length} posts • {featuredCount} em destaque • {allTags.length} tags únicas • Sincronizado com Supabase
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline" 
              size="sm"
              title="Recarregar dados do Supabase"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button onClick={createNewPost} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Novo Post
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {localPosts.map((post) => (
            <Card 
              key={post.id}
              className={`${isDark ? 'bg-black/50 border-white/10' : 'bg-gray-50 border-gray-200'}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                      {post.title || 'Sem título'}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Por {post.author} - {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                    </p>
                    <div className="flex gap-2 mt-2">
                      {post.featured && (
                        <span className="inline-block text-xs bg-yellow-500 text-black px-2 py-1 rounded">
                          Destaque
                        </span>
                      )}
                      {post.tags && post.tags.map(tag => (
                        <span 
                          key={tag}
                          className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-white/10 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                      title="Visualizar post"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedPost(post);
                        setIsEditing(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deletePost(post.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {localPosts.length === 0 && (
            <div className="text-center py-8">
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Nenhum post criado ainda. Clique em "Novo Post" para começar.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
