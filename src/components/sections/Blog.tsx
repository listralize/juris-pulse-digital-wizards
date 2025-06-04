
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeProvider';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useBlogData } from '../../hooks/useBlogData';

const Blog = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const { blogPosts, isLoading } = useBlogData();

  // Primeiro tenta pegar posts em destaque, senão pega os 6 mais recentes
  const featuredPosts = blogPosts.filter(post => post.featured);
  const displayPosts = featuredPosts.length >= 3 ? featuredPosts.slice(0, 6) : blogPosts.slice(0, 6);

  console.log('Blog posts loaded:', blogPosts.length);
  console.log('Featured posts:', featuredPosts.length);
  console.log('Display posts:', displayPosts.length);

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
    <section className={`py-8 ${isDark ? 'bg-black' : 'bg-white'}`} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className={`text-2xl md:text-4xl font-canela mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
            📝 Blog Jurídico
          </h2>
          <p className={`text-base md:text-lg max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
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
                className="w-full max-w-6xl mx-auto"
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
                                className="w-full h-40 md:h-48 object-cover"
                                onError={(e) => {
                                  console.log('Image failed to load:', post.banner);
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                              {post.featured && (
                                <span className="absolute top-3 right-3 bg-yellow-500 text-black text-xs px-2 py-1 rounded">
                                  Destaque
                                </span>
                              )}
                            </div>
                          )}
                          
                          <div className="p-4 md:p-6">
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
                            
                            <h3 className={`font-semibold text-base md:text-lg mb-2 line-clamp-2 ${isDark ? 'text-white' : 'text-black'}`}>
                              {post.title}
                            </h3>
                            
                            <p className={`text-xs md:text-sm line-clamp-3 mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              {post.excerpt}
                            </p>
                            
                            <Button variant="link" className="p-0 h-auto font-normal text-xs md:text-sm">
                              Ler mais <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
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

            <div className="text-center mt-8">
              <Button 
                onClick={() => navigate('/blog')}
                variant="outline"
                size="lg"
              >
                Ver todos os artigos
                <ArrowRight className="w-4 h-4 ml-2" />
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
