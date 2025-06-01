
import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { ArrowLeft, Plus, Save, Edit, Trash2 } from 'lucide-react';
import { BlogPost } from '../../types/blogTypes';

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
  const [localPosts, setLocalPosts] = useState<BlogPost[]>(blogPosts);

  const createNewPost = () => {
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: '',
      content: '',
      excerpt: '',
      banner: '',
      author: '',
      authorImage: '',
      publishedAt: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      slug: '',
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
        .replace(/\s+/g, '-');
    }
    
    setSelectedPost(updatedPost);
  };

  const savePost = () => {
    if (!selectedPost) return;
    
    const isNew = !localPosts.find(p => p.id === selectedPost.id);
    let updatedPosts;
    
    if (isNew) {
      updatedPosts = [...localPosts, selectedPost];
    } else {
      updatedPosts = localPosts.map(p => 
        p.id === selectedPost.id ? selectedPost : p
      );
    }
    
    setLocalPosts(updatedPosts);
    onSave(updatedPosts);
    setIsEditing(false);
    setSelectedPost(null);
  };

  const deletePost = (postId: string) => {
    const updatedPosts = localPosts.filter(p => p.id !== postId);
    setLocalPosts(updatedPosts);
    onSave(updatedPosts);
    if (selectedPost?.id === postId) {
      setSelectedPost(null);
      setIsEditing(false);
    }
  };

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
              Salvar
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título</Label>
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
                <Label htmlFor="author">Autor</Label>
                <Input
                  id="author"
                  value={selectedPost.author}
                  onChange={(e) => updatePost('author', e.target.value)}
                  placeholder="Nome do autor"
                />
              </div>
              
              <div>
                <Label htmlFor="banner">URL do Banner</Label>
                <Input
                  id="banner"
                  value={selectedPost.banner}
                  onChange={(e) => updatePost('banner', e.target.value)}
                  placeholder="URL da imagem de banner"
                />
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
              </div>
            </div>
            
            <div>
              <Label htmlFor="content">Conteúdo</Label>
              <Textarea
                id="content"
                value={selectedPost.content}
                onChange={(e) => updatePost('content', e.target.value)}
                placeholder="Conteúdo do post (HTML permitido)"
                rows={15}
                className="font-mono text-sm"
              />
            </div>
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
          <CardTitle className={`${isDark ? 'text-white' : 'text-black'}`}>
            Gerenciar Posts do Blog
          </CardTitle>
          <Button onClick={createNewPost} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Novo Post
          </Button>
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
                      Por {post.author} - {new Date(post.publishedAt).toLocaleDateString()}
                    </p>
                    {post.featured && (
                      <span className="inline-block mt-1 text-xs bg-yellow-500 text-black px-2 py-1 rounded">
                        Destaque
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
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
