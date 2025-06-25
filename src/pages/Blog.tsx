
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../components/ThemeProvider';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Calendar, User, Search, ArrowRight } from 'lucide-react';
import { useSupabaseBlog } from '../hooks/supabase/useSupabaseBlog';
import Navbar from '../components/navbar';
import Footer from '../components/sections/Footer';

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
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-white'}`}>
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-canela mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
            📝 Blog Jurídico
          </h1>
          <div className={`w-24 h-0.5 mx-auto mb-4 ${isDark ? 'bg-white/50' : 'bg-black/50'}`}></div>
          <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Artigos especializados sobre as mais diversas áreas do Direito
          </p>
        </div>

        {/* Filtros compactos */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 h-10 rounded-lg ${
                  isDark 
                    ? 'bg-neutral-900/50 border-neutral-700' 
                    : 'bg-white border-gray-200'
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

        {/* Grid compacto de Posts */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card 
                key={post.id}
                className={`group cursor-pointer transition-all duration-300 hover:scale-105 ${isDark ? 'bg-neutral-900/50 border-neutral-700/30 hover:border-neutral-600/50' : 'bg-white border-gray-200 hover:border-gray-400'}`}
                onClick={() => navigate(`/blog/${post.slug}`)}
              >
                <CardContent className="p-0">
                  {post.banner && (
                    <div className="relative overflow-hidden">
                      <img
                        src={post.banner}
                        alt={post.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      {post.featured && (
                        <div className="absolute top-3 right-3">
                          <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                            DESTAQUE
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="p-4">
                    <div className="flex items-center gap-3 text-xs mb-2">
                      <div className={`flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <Calendar className="w-3 h-3" />
                        {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                      </div>
                      <div className={`flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                    </div>
                    
                    <h3 className={`font-semibold mb-2 line-clamp-2 text-sm group-hover:text-blue-500 transition-colors ${isDark ? 'text-white' : 'text-black'}`}>
                      {post.title}
                    </h3>
                    
                    <p className={`mb-3 line-clamp-2 text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {post.excerpt}
                    </p>
                    
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
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
                    
                    <Button variant="link" className="p-0 h-auto text-xs text-blue-500 hover:text-blue-600">
                      Ler artigo completo <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
      
      <Footer />
    </div>
  );
};

export default BlogPage;
