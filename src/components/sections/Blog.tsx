
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
      className={`py-2 px-4 ${isDark ? 'bg-black' : 'bg-white'}`} 
      style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center'
      }}
    >
      <div className="container mx-auto">
        <div className="text-center mb-6">
          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-canela mb-3 ${isDark ? 'text-white' : 'text-black'}`}>
            📝 Blog Jurídico
          </h2>
          <div className={`w-16 h-0.5 mx-auto mb-3 ${isDark ? 'bg-white/50' : 'bg-black/50'}`}></div>
          <p className={`text-sm md:text-base max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Mantenha-se atualizado com as últimas novidades do mundo jurídico através dos nossos artigos especializados
          </p>
        </div>

        {displayPosts.length > 0 ? (
          <>
            <div className="relative">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full max-w-4xl mx-auto"
              >
                <CarouselContent className="-ml-1">
                  {displayPosts.map((post) => (
                    <CarouselItem key={post.id} className="pl-1 basis-full md:basis-1/2 lg:basis-1/3">
                      <Card 
                        className={`h-full cursor-pointer transition-all duration-300 hover:scale-105 ${isDark ? 'bg-black/80 border-white/10 hover:border-white/30' : 'bg-white/80 border-gray-200 hover:border-gray-400'}`}
                        onClick={() => navigate(`/blog/${post.slug}`)}
                      >
                        <CardContent className="p-0">
                          {post.banner && (
                            <div className="relative overflow-hidden">
                              <img
                                src={post.banner}
                                alt={post.title}
                                className="w-full h-32 md:h-40 object-cover"
                                onError={(e) => {
                                  console.log('Image failed to load:', post.banner);
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                              {post.featured && (
                                <span className="absolute top-2 right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded">
                                  Destaque
                                </span>
                              )}
                            </div>
                          )}
                          
                          <div className="p-3 md:p-4">
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
                            
                            <h3 className={`font-semibold text-sm md:text-base mb-2 line-clamp-2 ${isDark ? 'text-white' : 'text-black'}`}>
                              {post.title}
                            </h3>
                            
                            <p className={`text-xs md:text-sm line-clamp-2 mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              {post.excerpt}
                            </p>
                            
                            <Button variant="link" className="p-0 h-auto font-normal text-xs">
                              Ler mais <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 md:-left-12" />
                <CarouselNext className="right-2 md:-right-12" />
              </Carousel>
            </div>

            <div className="text-center mt-4">
              <Button 
                onClick={() => navigate('/blog')}
                variant="outline"
                size="sm"
              >
                Ver todos os artigos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Em breve, novos artigos jurídicos serão publicados aqui.
            </p>
            <Button 
              onClick={() => navigate('/admin')}
              variant="outline"
              className="mt-3"
              size="sm"
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
