
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeProvider';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useSupabaseBlog } from '../../hooks/supabase/useSupabaseBlog';

const Blog = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const { blogPosts, isLoading } = useSupabaseBlog();

  const featuredPosts = blogPosts.filter(post => post.featured);
  const displayPosts = featuredPosts.length >= 3 ? featuredPosts.slice(0, 6) : blogPosts.slice(0, 6);

  console.log('Blog section - Posts carregados do Supabase:', blogPosts.length);

  if (isLoading) {
    return (
      <section className={`py-8 ${isDark ? 'bg-black' : 'bg-white'}`} style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}>
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
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-canela mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
            📝 Blog Jurídico
          </h2>
          <div className={`w-20 h-0.5 mx-auto mb-4 ${isDark ? 'bg-white/50' : 'bg-black/50'}`}></div>
          <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Mantenha-se atualizado com as últimas novidades do mundo jurídico
          </p>
        </div>

        {displayPosts.length > 0 ? (
          <>
            {/* Carrossel de artigos */}
            <div className="mb-12">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {displayPosts.map(post => (
                    <CarouselItem key={post.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                      <Card 
                        className={`group cursor-pointer transition-all duration-300 hover:scale-105 h-full ${
                          isDark 
                            ? 'bg-neutral-900/50 border-neutral-700/30 hover:border-neutral-600/50' 
                            : 'bg-white border-gray-200 hover:border-gray-400'
                        }`}
                        onClick={() => navigate(`/blog/${post.slug}`)}
                      >
                        <CardContent className="p-0 h-full flex flex-col">
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
                          
                          <div className="p-4 flex-1 flex flex-col">
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
                            
                            <h3 className={`font-semibold mb-2 line-clamp-2 text-sm group-hover:text-blue-500 transition-colors flex-1 ${isDark ? 'text-white' : 'text-black'}`}>
                              {post.title}
                            </h3>
                            
                            <p className={`mb-3 line-clamp-2 text-xs flex-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              {post.excerpt}
                            </p>
                            
                            <Button variant="link" className="p-0 h-auto text-xs text-blue-500 hover:text-blue-600 mt-auto">
                              Ler mais <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className={`${isDark ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : 'bg-black/10 border-black/20 text-black hover:bg-black/20'}`} />
                <CarouselNext className={`${isDark ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : 'bg-black/10 border-black/20 text-black hover:bg-black/20'}`} />
              </Carousel>
            </div>

            <div className="text-center">
              <Button 
                onClick={() => navigate('/blog')}
                className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
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
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
