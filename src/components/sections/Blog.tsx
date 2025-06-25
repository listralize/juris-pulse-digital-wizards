
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
      <section className={`h-screen flex items-center justify-center ${isDark ? 'bg-black' : 'bg-white'}`}>
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
      className={`h-screen flex items-center justify-center overflow-hidden ${isDark ? 'bg-black' : 'bg-white'}`}
    >
      {/* Background gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-neutral-950 via-neutral-950 to-neutral-900 -z-10"></div>
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-950/20 via-transparent to-purple-950/20 -z-10"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? 'white' : 'black'} 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 relative z-10">
        {/* Header padronizado - mesmo padrão de todas as outras seções */}
        <div className="text-center mb-8">
          <h2 className={`text-2xl md:text-3xl lg:text-4xl mb-3 font-canela ${isDark ? 'text-white' : 'text-black'}`}>
            📝 Blog Jurídico
          </h2>
          <div className={`w-16 h-0.5 mx-auto ${isDark ? 'bg-white/50' : 'bg-black/50'}`}></div>
          <p className={`text-base md:text-lg max-w-3xl mx-auto leading-relaxed mt-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Mantenha-se atualizado com as últimas novidades do mundo jurídico
          </p>
        </div>

        {displayPosts.length > 0 ? (
          <>
            {/* Carrossel de artigos */}
            <div className="mb-6">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full px-12"
              >
                <CarouselContent className="-ml-4 md:-ml-6">
                  {displayPosts.map(post => (
                    <CarouselItem key={post.id} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3">
                      <Card 
                        className={`group cursor-pointer transition-all duration-500 hover:scale-[1.03] backdrop-blur-sm border h-[320px] flex flex-col ${
                          isDark 
                            ? 'bg-neutral-900/80 border-neutral-800/50 hover:border-neutral-700/60 shadow-2xl shadow-black/40' 
                            : 'bg-white/80 border-gray-200/60 hover:border-gray-400/60 shadow-lg hover:shadow-xl'
                        }`}
                        style={{
                          boxShadow: isDark 
                            ? '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(139, 92, 246, 0.1)' 
                            : '0 10px 25px rgba(0, 0, 0, 0.1), 0 0 15px rgba(99, 102, 241, 0.1)'
                        }}
                        onClick={() => navigate(`/blog/${post.slug}`)}
                      >
                        <CardContent className="p-0 h-full flex flex-col">
                          {/* Gradiente de hover overlay */}
                          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg ${
                            isDark ? 'bg-gradient-to-br from-indigo-500/5 to-purple-500/5' : 'bg-gradient-to-br from-blue-500/5 to-indigo-500/5'
                          }`}></div>
                          
                          {post.banner && (
                            <div className="relative overflow-hidden rounded-t-lg h-32 flex-shrink-0">
                              <img 
                                src={post.banner} 
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                            </div>
                          )}
                          
                          <div className="p-3 flex-1 flex flex-col relative z-10">
                            <div className="flex items-center gap-2 text-xs mb-2 flex-shrink-0">
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
                            
                            <p className={`mb-2 text-xs flex-1 overflow-hidden ${isDark ? 'text-gray-300' : 'text-gray-700'}`} style={{
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical'
                            }}>
                              {post.excerpt}
                            </p>
                            
                            <Button variant="link" className="p-0 h-auto text-xs text-blue-500 hover:text-blue-600 mt-auto flex-shrink-0 justify-start">
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
                className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg ${
                  isDark 
                    ? 'bg-gradient-to-b from-white to-gray-100 text-black hover:shadow-white/25 hover:scale-105' 
                    : 'bg-gradient-to-b from-black to-gray-800 text-white hover:shadow-black/25 hover:scale-105'
                }`}
              >
                Ver todos os artigos
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center">
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
