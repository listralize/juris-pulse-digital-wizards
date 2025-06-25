
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
      <section className={`h-screen flex items-center justify-center ${isDark ? 'bg-transparent' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center">
            <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? 'border-white' : 'border-black'}`}></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className={`h-screen flex flex-col overflow-hidden relative ${isDark ? 'bg-transparent text-white' : 'bg-transparent text-black'}`}
    >
      <div className="max-w-6xl mx-auto relative z-10 h-full flex flex-col justify-center px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center flex-1">
          {/* Header padronizado - mesma altura que outras páginas */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className={`text-2xl md:text-3xl lg:text-4xl mb-3 font-canela ${isDark ? 'text-white' : 'text-black'}`}>
              📝 Blog Jurídico
            </h2>
            <div className={`w-16 h-0.5 mx-auto ${isDark ? 'bg-white/50' : 'bg-black/50'}`}></div>
          </div>

          {displayPosts.length > 0 ? (
            <>
              {/* Container com padding adequado para hover */}
              <div className="mb-8 px-4 sm:px-8 lg:px-16 max-w-5xl w-full">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2 sm:-ml-4 lg:-ml-6">
                    {displayPosts.map(post => (
                      <CarouselItem key={post.id} className="pl-2 sm:pl-4 lg:pl-6 basis-full sm:basis-1/2 lg:basis-1/2">
                        {/* Container com padding para hover - altura reduzida */}
                        <div className="p-2 sm:p-3 lg:p-4">
                          <Card 
                            className={`
                              group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 backdrop-blur-sm border h-64 flex
                              ${isDark 
                                ? 'bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.04] hover:border-white/[0.15]' 
                                : 'bg-black/[0.02] border-black/[0.08] hover:bg-black/[0.04] hover:border-black/[0.15]'
                              }
                              shadow-md hover:shadow-xl
                            `}
                            onClick={() => navigate(`/blog/${post.slug}`)}
                          >
                            <CardContent className="p-0 h-full flex">
                              {/* Gradiente de hover overlay */}
                              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-transparent to-black/[0.03] group-hover:to-black/[0.06] transition-all duration-300"></div>
                              
                              {post.banner && (
                                <div className="relative overflow-hidden rounded-l-lg w-40 flex-shrink-0">
                                  <img 
                                    src={post.banner} 
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                  />
                                </div>
                              )}
                              
                              <div className="flex-1 p-4 flex flex-col relative z-10">
                                <div className="flex items-center gap-2 sm:gap-3 text-xs mb-2 flex-shrink-0">
                                  <div className={`flex items-center gap-1 font-inter ${isDark ? 'text-white/50' : 'text-black/50'}`}>
                                    <Calendar className="w-3 h-3" />
                                    <span>
                                      {new Date(post.publishedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                                    </span>
                                  </div>
                                  <div className={`flex items-center gap-1 font-inter ${isDark ? 'text-white/50' : 'text-black/50'}`}>
                                    <User className="w-3 h-3" />
                                    <span className="truncate max-w-20">{post.author}</span>
                                  </div>
                                </div>
                                
                                <h3 className={`font-semibold mb-2 text-sm group-hover:text-blue-500 transition-colors line-clamp-2 font-space-grotesk ${isDark ? 'text-white' : 'text-black'}`}>
                                  {post.title}
                                </h3>
                                
                                <p className={`mb-3 text-xs flex-1 line-clamp-3 ${isDark ? 'text-white/60' : 'text-black/50'}`}>
                                  {post.excerpt}
                                </p>
                                
                                <div className="mt-auto">
                                  <span className={`text-xs text-blue-500 hover:text-blue-600 flex items-center gap-1 font-inter ${isDark ? 'text-white/70' : 'text-black/70'}`}>
                                    Ler mais <ArrowRight className="w-3 h-3" />
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className={`hidden sm:flex ${isDark ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : 'bg-black/10 border-black/20 text-black hover:bg-black/20'}`} />
                  <CarouselNext className={`hidden sm:flex ${isDark ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : 'bg-black/10 border-black/20 text-black hover:bg-black/20'}`} />
                </Carousel>
              </div>

              <div className="text-center px-4">
                <Button 
                  onClick={() => navigate('/blog')}
                  className={`px-6 sm:px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl ${
                    isDark 
                      ? 'bg-gradient-to-b from-white to-gray-100 text-black hover:shadow-white/25 hover:scale-105' 
                      : 'bg-gradient-to-b from-black to-gray-800 text-white hover:shadow-black/25 hover:scale-105'
                  }`}
                >
                  Ver todos os artigos
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center px-4">
              <p className={`text-base sm:text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Em breve, novos artigos jurídicos serão publicados aqui.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;
