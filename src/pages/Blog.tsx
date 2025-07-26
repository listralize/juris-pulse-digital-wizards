
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../components/ThemeProvider';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Calendar, User, Search, ArrowRight } from 'lucide-react';
import { useSupabaseBlog } from '../hooks/supabase/useSupabaseBlog';
import Navbar from '../components/navbar';
import FloatingFooter from '../components/FloatingFooter';
import NeuralBackground from '../components/NeuralBackground';

const BlogPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const { blogPosts, isLoading } = useSupabaseBlog();
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
        <FloatingFooter />
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative ${isDark ? 'bg-black' : 'bg-white'}`}>
      
      {/* Background gradients escuros como na home */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-black to-neutral-900 -z-20"></div>
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-950/10 via-transparent to-purple-950/10 -z-20"></div>
      
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 opacity-0 animate-fade-in-up" style={{ opacity: 1 }}>
          <h1 className={`text-2xl md:text-3xl lg:text-4xl mb-3 font-canela ${isDark ? 'text-white' : 'text-black'}`}>
            Nosso Blog
          </h1>
          <div className={`w-16 h-0.5 mx-auto ${isDark ? 'bg-white/50' : 'bg-black/50'}`}></div>
        </div>

        {/* Filtros compactos */}
        <div className="mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 1 }}>
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 h-10 rounded-lg backdrop-blur-sm ${
                  isDark 
                    ? 'bg-neutral-900/50 border-neutral-700' 
                    : 'bg-white/50 border-gray-200'
                }`}
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedTag === '' ? 'default' : 'outline'}
                size="sm"
                className="rounded-lg"
                onClick={() => setSelectedTag('')}
              >
                Todos
              </Button>
              {allTags.slice(0, 4).map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? 'default' : 'outline'}
                  size="sm"
                  className="rounded-lg"
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid de Posts - com altura fixa e padding adequado para hover */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s', opacity: 1 }}>
            {filteredPosts.map((post, index) => (
              <div key={post.id} className="p-3">
                <Card 
                  className={`group cursor-pointer transition-all duration-500 hover:scale-[1.03] backdrop-blur-sm border h-[400px] flex flex-col opacity-0 animate-fade-in-up ${
                    isDark 
                      ? 'bg-neutral-900/80 border-neutral-800/50 hover:border-neutral-700/60 shadow-2xl shadow-black/40 hover:shadow-indigo-500/20' 
                      : 'bg-white/80 border-gray-200/60 hover:border-gray-400/60 shadow-lg hover:shadow-xl'
                  }`}
                  style={{ animationDelay: `${0.6 + index * 0.1}s`, opacity: 1 }}
                  onClick={() => navigate(`/blog/${post.slug}`)}
                >
                  <CardContent className="p-0 h-full flex flex-col">
                    {/* Gradiente de hover overlay */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg ${
                      isDark ? 'bg-gradient-to-br from-indigo-500/5 to-purple-500/5' : 'bg-gradient-to-br from-blue-500/5 to-indigo-500/5'
                    }`}></div>

                    {post.banner && (
                      <div className="relative overflow-hidden rounded-t-lg h-40 flex-shrink-0">
                        <img
                          src={post.banner}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                        {post.featured && (
                          <div className="absolute top-3 right-3">
                            <span className="premium-blog-badge">
                              ⭐ DESTAQUE
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="p-4 flex-1 flex flex-col relative z-10">
                      <div className="flex items-center gap-3 text-xs mb-2 flex-shrink-0">
                        <div className={`flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          <Calendar className="w-3 h-3" />
                          {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                        </div>
                        <div className={`flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          <User className="w-3 h-3" />
                          {post.author}
                        </div>
                      </div>
                      
                      <h3 className={`font-semibold mb-2 text-sm group-hover:text-blue-500 transition-colors h-10 overflow-hidden ${isDark ? 'text-white' : 'text-black'}`}>
                        {post.title}
                      </h3>
                      
                      <p className={`mb-3 text-xs flex-1 overflow-hidden ${isDark ? 'text-gray-300' : 'text-gray-700'}`} style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {post.excerpt}
                      </p>
                      
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3 flex-shrink-0">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span 
                              key={tag}
                              className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <Button variant="link" className="p-0 h-auto text-xs text-blue-500 hover:text-blue-600 mt-auto flex-shrink-0 justify-start">
                        Ler artigo completo <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className={`text-lg mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {searchTerm || selectedTag ? 'Nenhum artigo encontrado com os filtros aplicados.' : 'Nenhum artigo publicado ainda.'}
            </p>
          </div>
        )}
      </div>
      
      <FloatingFooter />
    </div>
  );
};

export default BlogPage;
