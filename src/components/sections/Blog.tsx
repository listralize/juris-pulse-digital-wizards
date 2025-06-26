
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeProvider';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSupabaseBlog } from '../../hooks/supabase/useSupabaseBlog';
import NeuralBackground from '../NeuralBackground';

const Blog = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const { blogPosts, isLoading } = useSupabaseBlog();
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const featuredPosts = blogPosts.filter(post => post.featured);
  const displayPosts = featuredPosts.length >= 3 ? featuredPosts.slice(0, 6) : blogPosts.slice(0, 6);

  // Cálculos de slides baseados no dispositivo
  const itemsPerSlide = isMobile ? 1 : 3; // Mobile: 1 card, Desktop: 3 cards
  const totalSlides = Math.ceil(displayPosts.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

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
      className={`h-screen flex items-center justify-center overflow-hidden ${isDark ? 'bg-black' : 'bg-white'} relative`}
    >
      {/* Neural Background only in dark theme */}
      {isDark && <NeuralBackground />}
      
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

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header padronizado - mesma altura que outras páginas */}
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
            {/* Slider Container */}
            <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 mb-8">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ 
                    transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
                    width: `${totalSlides * 100}%`
                  }}
                >
                  {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                    <div 
                      key={slideIndex}
                      className={`w-full flex-shrink-0 px-2 sm:px-4 ${
                        isMobile 
                          ? 'flex justify-center' 
                          : 'grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8'
                      }`}
                      style={{ width: `${100 / totalSlides}%` }}
                    >
                      {displayPosts
                        .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                        .map(post => (
                          <div key={post.id} className={`group p-2 sm:p-3 lg:p-4 ${isMobile ? 'w-full max-w-sm' : ''}`}>
                            <Card 
                              className={`cursor-pointer transition-all duration-300 hover:scale-105 backdrop-blur-sm border h-96 flex flex-col ${
                                isDark 
                                  ? 'bg-neutral-900/80 border-neutral-800/50 hover:border-neutral-700/60 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/20' 
                                  : 'bg-white/80 border-gray-200/60 hover:border-gray-400/60 shadow-md hover:shadow-xl hover:shadow-blue-500/10'
                              }`}
                              onClick={() => navigate(`/blog/${post.slug}`)}
                            >
                              <CardContent className="p-0 h-full flex flex-col">
                                {/* Gradiente de hover overlay */}
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg ${
                                  isDark ? 'bg-gradient-to-br from-indigo-500/5 to-purple-500/5' : 'bg-gradient-to-br from-blue-500/5 to-indigo-500/5'
                                }`}></div>
                                
                                {post.banner && (
                                  <div className="relative overflow-hidden rounded-t-lg h-32 flex-shrink-0">
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
                                  
                                  <h3 className={`font-semibold mb-2 text-sm group-hover:text-blue-500 transition-colors line-clamp-2 flex-shrink-0 ${isDark ? 'text-white' : 'text-black'}`}>
                                    {post.title}
                                  </h3>
                                  
                                  <p className={`mb-3 text-xs flex-1 line-clamp-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
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

              {/* Navigation Buttons - Minimalista */}
              {totalSlides > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className={`absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isDark 
                        ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10' 
                        : 'bg-black/5 hover:bg-black/10 text-black border border-black/10'
                    } hover:scale-110 z-10`}
                  >
                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  
                  <button
                    onClick={nextSlide}
                    className={`absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isDark 
                        ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10' 
                        : 'bg-black/5 hover:bg-black/10 text-black border border-black/10'
                    } hover:scale-110 z-10`}
                  >
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </>
              )}

              {/* Dots Indicator - Minimalista */}
              {totalSlides > 1 && (
                <div className="flex justify-center mt-6 sm:mt-8 space-x-1.5">
                  {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                        currentSlide === index
                          ? isDark ? 'bg-white' : 'bg-black'
                          : isDark ? 'bg-white/20' : 'bg-black/20'
                      }`}
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
