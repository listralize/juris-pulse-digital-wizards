
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

  console.log('BlogPage - Posts loaded from Supabase:', blogPosts.length);

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
        <div className="text-center mb-16">
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            📝 Blog Jurídico
          </h1>
          <div className={`w-24 h-0.5 mx-auto mb-6 ${isDark ? 'bg-white/50' : 'bg-black/50'}`}></div>
          <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Artigos especializados sobre as mais diversas áreas do Direito, 
            mantendo você sempre atualizado com as novidades jurídicas
          </p>
        </div>

        {/* Filtros */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-12 h-12 text-lg rounded-full border-2 ${
                  isDark 
                    ? 'bg-neutral-900/50 border-neutral-700 focus:border-white' 
                    : 'bg-white border-gray-200 focus:border-black'
                }`}
              />
            </div>
            
            <div className="flex gap-3 flex-wrap">
              <Button
                variant={selectedTag === '' ? 'default' : 'outline'}
                className="rounded-full px-6"
                onClick={() => setSelectedTag('')}
              >
                Todos
              </Button>
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? 'default' : 'outline'}
                  className="rounded-full px-6"
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid de Posts */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <Card 
                key={post.id}
                className={`group h-full cursor-pointer transition-all duration-500 hover:scale-105 ${
                  index === 0 && filteredPosts.length > 1 ? 'md:col-span-2 md:row-span-2' : ''
                } ${isDark ? 'bg-neutral-900/50 border-neutral-700/30 hover:border-neutral-600/50 backdrop-blur-sm' : 'bg-white/80 border-gray-200 hover:border-gray-400 backdrop-blur-sm'}`}
                onClick={() => navigate(`/blog/${post.slug}`)}
              >
                <CardContent className="p-0 h-full">
                  {post.banner && (
                    <div className="relative overflow-hidden">
                      <img
                        src={post.banner}
                        alt={post.title}
                        className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                          index === 0 && filteredPosts.length > 1 ? 'h-64 md:h-80' : 'h-48'
                        }`}
                        onError={(e) => {
                          console.log('Image failed to load:', post.banner);
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      {post.featured && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                            DESTAQUE
                          </span>
                        </div>
                      )}
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>
                  )}
                  
                  <div className={`p-6 ${index === 0 && filteredPosts.length > 1 ? 'md:p-8' : ''}`}>
                    <div className="flex items-center gap-4 text-sm mb-3">
                      <div className={`flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <Calendar className="w-4 h-4" />
                        {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                      </div>
                      <div className={`flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                    </div>
                    
                    <h3 className={`font-semibold mb-3 line-clamp-2 group-hover:text-blue-500 transition-colors duration-300 ${
                      index === 0 && filteredPosts.length > 1 ? 'text-xl md:text-2xl' : 'text-lg'
                    } ${isDark ? 'text-white' : 'text-black'}`}>
                      {post.title}
                    </h3>
                    
                    <p className={`mb-4 line-clamp-3 ${
                      index === 0 && filteredPosts.length > 1 ? 'text-base' : 'text-sm'
                    } ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {post.excerpt}
                    </p>
                    
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span 
                            key={tag}
                            className={`text-xs px-2 py-1 rounded-full ${isDark ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <Button variant="link" className="p-0 h-auto font-normal text-blue-500 hover:text-blue-600">
                      Ler artigo completo <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className={`text-xl mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {searchTerm || selectedTag ? 'Nenhum artigo encontrado com os filtros aplicados.' : 'Nenhum artigo publicado ainda.'}
            </p>
            <Button 
              onClick={() => navigate('/admin')}
              className={`px-8 py-3 rounded-full ${
                isDark 
                  ? 'bg-white text-black hover:bg-gray-100' 
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              Gerenciar Posts no Admin
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
