
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeProvider';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSupabaseBlog } from '../../hooks/supabase/useSupabaseBlog';
import NeuralBackground from '../NeuralBackground';
import { useIsMobile, useIsTablet } from '../../hooks/use-mobile';

const Blog = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const { blogPosts, isLoading } = useSupabaseBlog();
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Memoizar posts processados para evitar re-cálculos
  const displayPosts = useMemo(() => {
    const featuredPosts = blogPosts.filter(post => post.featured);
    return featuredPosts.length >= 3 ? featuredPosts.slice(0, 6) : blogPosts.slice(0, 6);
  }, [blogPosts]);

  // Cálculos de slides baseados no dispositivo - memoizado
  const slideConfig = useMemo(() => {
    const itemsPerSlide = isMobile ? 1 : isTablet ? 2 : 3;
    const totalSlides = Math.ceil(displayPosts.length / itemsPerSlide);
    return { itemsPerSlide, totalSlides };
  }, [isMobile, isTablet, displayPosts.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideConfig.totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideConfig.totalSlides) % slideConfig.totalSlides);
  };

  // Auto-play otimizado
  useEffect(() => {
    if (slideConfig.totalSlides <= 1) return;
    
    const interval = setInterval(nextSlide, isMobile ? 4000 : 5000); // Mais rápido no mobile
    return () => clearInterval(interval);
  }, [slideConfig.totalSlides, isMobile]);

  // Memoizar função de navegação
  const handlePostClick = useMemo(() => (slug: string) => {
    // Usar requestAnimationFrame para melhor performance
    requestAnimationFrame(() => {
      navigate(`/blog/${slug}`);
    });
  }, [navigate]);

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
      className={`h-screen flex items-center justify-center overflow-hidden ${isDark ? 'bg-black' : 'bg-white'} relative`}
    >
      {/* Neural Background only in dark theme - apenas desktop */}
      {isDark && !isMobile && <NeuralBackground />}
      
      {/* Background gradients - simplificado no mobile */}
      {!isMobile && (
        <>
          <div className="fixed inset-0 bg-gradient-to-br from-neutral-950 via-neutral-950 to-neutral-900 -z-10"></div>
          <div className="fixed inset-0 bg-gradient-to-br from-indigo-950/20 via-transparent to-purple-950/20 -z-10"></div>
        </>
      )}

      {/* Background Pattern - simplificado no mobile */}
      <div className={`absolute inset-0 ${isMobile ? 'opacity-[0.01]' : 'opacity-[0.02]'}`}>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? 'white' : 'black'} 1px, transparent 0)`,
          backgroundSize: isMobile ? '20px 20px' : '40px 40px'
        }}></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header padronizado */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className={`text-2xl md:text-3xl lg:text-4xl mb-3 font-canela ${isDark ? 'text-white' : 'text-black'}`}>
            📝 Blog Jurídico
          </h2>
          <div className={`w-16 h-0.5 mx-auto ${isDark ? 'bg-white/50' : 'bg-black/50'}`}></div>
          <p className={`text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mt-4 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Mantenha-se atualizado com as últimas novidades do mundo jurídico
          </p>
        </div>

        {displayPosts.length > 0 ? (
          <>
            {/* Slider Container - otimizado */}
            <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 mb-8">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ 
                    transform: `translateX(-${currentSlide * (100 / slideConfig.totalSlides)}%)`,
                    width: `${slideConfig.totalSlides * 100}%`,
                    willChange: 'transform'
                  }}
                >
                  {Array.from({ length: slideConfig.totalSlides }).map((_, slideIndex) => (
                    <div 
                      key={slideIndex}
                      className={`w-full flex-shrink-0 px-2 sm:px-4 ${
                        isMobile 
                          ? 'flex justify-center' 
                          : isTablet
                            ? 'grid grid-cols-2 gap-4 sm:gap-6'
                            : 'grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8'
                      }`}
                      style={{ width: `${100 / slideConfig.totalSlides}%` }}
                    >
                      {displayPosts
                        .slice(slideIndex * slideConfig.itemsPerSlide, (slideIndex + 1) * slideConfig.itemsPerSlide)
                        .map(post => (
                          <div key={post.id} className={`group p-2 sm:p-3 lg:p-4 ${isMobile ? 'w-full max-w-sm' : ''}`}>
                            <Card 
                              className={`cursor-pointer transition-all duration-300 hover:scale-105 backdrop-blur-sm border flex flex-col ${
                                isTablet ? 'h-80' : isMobile ? 'h-96' : 'h-96'
                              } ${
                                isDark 
                                  ? 'bg-neutral-900/80 border-neutral-800/50 hover:border-neutral-700/60 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/20' 
                                  : 'bg-white/80 border-gray-200/60 hover:border-gray-400/60 shadow-md hover:shadow-xl hover:shadow-blue-500/10'
                              }`}
                              onClick={() => handlePostClick(post.slug)}
                            >
                              <CardContent className="p-0 h-full flex flex-col">
                                {/* Gradiente de hover overlay */}
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg ${
                                  isDark ? 'bg-gradient-to-br from-indigo-500/5 to-purple-500/5' : 'bg-gradient-to-br from-blue-500/5 to-indigo-500/5'
                                }`}></div>
                                
                                {post.banner && (
                                  <div className={`relative overflow-hidden rounded-t-lg flex-shrink-0 ${
                                    isTablet ? 'h-24' : isMobile ? 'h-32' : 'h-32'
                                  }`}>
                                    <img 
                                      src={post.banner} 
                                      alt={post.title}
                                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                      loading="lazy" // Lazy loading para melhor performance
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                      }}
                                    />
                                  </div>
                                )}
                                
                                <div className="p-4 flex-1 flex flex-col relative z-10">
                                  <div className="flex items-center gap-2 text-xs mb-2 flex-shrink-0">
                                    <div className={`flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                      <Calendar className="w-3 h-3" />
                                      <span className="hidden sm:inline">
                                        {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                                      </span>
                                      <span className="sm:hidden">
                                        {new Date(post.publishedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                                      </span>
                                    </div>
                                    <div className={`flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                      <User className="w-3 h-3" />
                                      <span className="truncate max-w-20 sm:max-w-none">{post.author}</span>
                                    </div>
                                  </div>
                                  
                                  <h3 className={`font-semibold mb-2 group-hover:text-blue-500 transition-colors line-clamp-2 flex-shrink-0 ${
                                    isTablet ? 'text-xs' : 'text-sm'
                                  } ${isDark ? 'text-white' : 'text-black'}`}>
                                    {post.title}
                                  </h3>
                                  
                                  <p className={`mb-3 flex-1 overflow-hidden ${
                                    isTablet ? 'text-xs line-clamp-2' : 'text-xs line-clamp-3'
                                  } ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {post.excerpt}
                                  </p>
                                  
                                  <div className="flex-shrink-0 mt-auto">
                                    <Button variant="link" className="p-0 h-auto text-xs text-blue-500 hover:text-blue-600 justify-start group-hover:translate-x-1 transition-transform">
                                      Ler mais <ArrowRight className="w-3 h-3 ml-1" />
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons - otimizado */}
              {slideConfig.totalSlides > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className={`absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                      isMobile 
                        ? 'w-4 h-4 rounded-full'
                        : 'w-6 h-6 sm:w-7 sm:h-7 rounded-full'
                    } flex items-center justify-center ${
                      isDark 
                        ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10' 
                        : 'bg-black/5 hover:bg-black/10 text-black border border-black/10'
                    } hover:scale-110 z-10`}
                    aria-label="Post anterior"
                  >
                    <ChevronLeft className={`${isMobile ? 'w-2 h-2' : 'w-3 h-3 sm:w-4 sm:h-4'}`} />
                  </button>
                  
                  <button
                    onClick={nextSlide}
                    className={`absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                      isMobile 
                        ? 'w-4 h-4 rounded-full'
                        : 'w-6 h-6 sm:w-7 sm:h-7 rounded-full'
                    } flex items-center justify-center ${
                      isDark 
                        ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10' 
                        : 'bg-black/5 hover:bg-black/10 text-black border border-black/10'
                    } hover:scale-110 z-10`}
                    aria-label="Próximo post"
                  >
                    <ChevronRight className={`${isMobile ? 'w-2 h-2' : 'w-3 h-3 sm:w-4 sm:h-4'}`} />
                  </button>
                </>
              )}

              {/* Dots Indicator - otimizado */}
              {slideConfig.totalSlides > 1 && (
                <div className="flex justify-center mt-6 sm:mt-8 space-x-1.5">
                  {Array.from({ length: slideConfig.totalSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                        currentSlide === index
                          ? isDark ? 'bg-white' : 'bg-black'
                          : isDark ? 'bg-white/20' : 'bg-black/20'
                      }`}
                      aria-label={`Slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
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
    </section>
  );
};

export default Blog;
