
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../components/ThemeProvider';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Calendar, User, Search, ArrowRight, Filter } from 'lucide-react';
import { useBlogData } from '../hooks/useBlogData';
import Navbar from '../components/navbar';

const BlogPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const { blogPosts, isLoading } = useBlogData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('');

  // Filtrar posts por termo de busca e tag
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = selectedTag === '' || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  // Obter todas as tags únicas
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  if (isLoading) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-white'}`}>
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="flex justify-center items-center py-12">
            <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-white'}`}>
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-5xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            📝 Blog Jurídico
          </h1>
          <p className={`text-xl max-w-3xl mx-auto mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Artigos especializados sobre as mais diversas áreas do Direito, 
            mantendo você sempre atualizado com as novidades jurídicas
          </p>
          
          {/* Filtros movidos para baixo da descrição */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Buscar artigos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2 flex-wrap justify-center">
                <Button
                  variant={selectedTag === '' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTag('')}
                >
                  Todos
                </Button>
                {allTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Grid de Posts */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredPosts.map((post) => (
              <Card 
                key={post.id}
                className={`h-full cursor-pointer transition-all duration-300 hover:scale-105 ${isDark ? 'bg-black/80 border-white/10 hover:border-white/30' : 'bg-white/80 border-gray-200 hover:border-gray-400'}`}
                onClick={() => navigate(`/blog/${post.slug}`)}
              >
                <CardContent className="p-0">
                  {post.banner && (
                    <div className="relative overflow-hidden">
                      <img
                        src={post.banner}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                      {post.featured && (
                        <span className="absolute top-3 right-3 bg-yellow-500 text-black text-xs px-2 py-1 rounded">
                          Destaque
                        </span>
                      )}
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs mb-3">
                      <div className={`flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <Calendar className="w-3 h-3" />
                        {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                      </div>
                      <div className={`flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                    </div>
                    
                    <h3 className={`font-semibold text-lg mb-2 line-clamp-2 ${isDark ? 'text-white' : 'text-black'}`}>
                      {post.title}
                    </h3>
                    
                    <p className={`text-sm line-clamp-3 mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {post.excerpt}
                    </p>
                    
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span 
                            key={tag}
                            className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <Button variant="link" className="p-0 h-auto font-normal">
                      Ler artigo completo <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {searchTerm || selectedTag ? 'Nenhum artigo encontrado com os filtros aplicados.' : 'Nenhum artigo publicado ainda.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
