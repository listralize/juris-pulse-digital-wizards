
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeProvider';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useSupabaseBlog } from '../../hooks/supabase/useSupabaseBlog';

const Blog = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const { blogPosts, isLoading } = useSupabaseBlog();

  // Primeiro tenta pegar posts em destaque, senão pega os 6 mais recentes
  const featuredPosts = blogPosts.filter(post => post.featured);
  const displayPosts = featuredPosts.length >= 3 ? featuredPosts.slice(0, 6) : blogPosts.slice(0, 6);

  console.log('Blog section - Posts carregados do Supabase:', blogPosts.length);
  console.log('Blog section - Posts em destaque:', featuredPosts.length);
  console.log('Blog section - Posts exibidos:', displayPosts.length);

  if (isLoading) {
    return (
      <section className={`py-8 ${isDark ? 'bg-black' : 'bg-white'}`} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-12">
            <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className={`py-16 px-4 ${isDark ? 'bg-black' : 'bg-white'}`} 
      style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-canela mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
            📝 Blog Jurídico
          </h2>
          <div className={`w-20 h-0.5 mx-auto mb-4 ${isDark ? 'bg-white/50' : 'bg-black/50'}`}></div>
          <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Mantenha-se atualizado com as últimas novidades do mundo jurídico através dos nossos artigos especializados
          </p>
        </div>

        {displayPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {displayPosts.map((post, index) => (
                <Card 
                  key={post.id}
                  className={`group h-full cursor-pointer transition-all duration-500 hover:scale-105 ${
                    index === 0 ? 'md:col-span-2 md:row-span-2' : ''
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
                            index === 0 ? 'h-64 md:h-80' : 'h-48'
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
                    
                    <div className={`p-6 ${index === 0 ? 'md:p-8' : ''}`}>
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
                        index === 0 ? 'text-xl md:text-2xl' : 'text-lg'
                      } ${isDark ? 'text-white' : 'text-black'}`}>
                        {post.title}
                      </h3>
                      
                      <p className={`mb-4 line-clamp-3 ${
                        index === 0 ? 'text-base' : 'text-sm'
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

            <div className="text-center">
              <Button 
                onClick={() => navigate('/blog')}
                className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                  isDark 
                    ? 'bg-white text-black hover:bg-gray-100' 
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                Ver todos os artigos
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Em breve, novos artigos jurídicos serão publicados aqui.
            </p>
            <Button 
              onClick={() => navigate('/admin')}
              variant="outline"
              className="mt-4"
            >
              Adicionar Posts no Admin
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
