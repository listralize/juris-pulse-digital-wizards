
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../components/ThemeProvider';
import { Button } from '../components/ui/button';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { useSupabaseBlog } from '../hooks/supabase/useSupabaseBlog';
import Navbar from '../components/navbar';
import Footer from '../components/sections/Footer';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { blogPosts, isLoading } = useSupabaseBlog();

  const post = blogPosts.find(p => p.slug === slug);

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

  if (!post) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-white'}`}>
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
              Artigo não encontrado
            </h1>
            <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              O artigo que você está procurando não existe ou foi removido.
            </p>
            <Button onClick={() => navigate('/blog')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Blog
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-white'}`}>
      <Navbar />
      
      <article className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="max-w-4xl mx-auto">
          <Button 
            onClick={() => navigate('/blog')}
            variant="outline"
            className="mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Blog
          </Button>

          {/* Banner */}
          {post.banner && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={post.banner}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
          )}

          {/* Meta */}
          <div className="flex items-center gap-6 text-sm mb-6">
            <div className={`flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <Calendar className="w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className={`flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <User className="w-4 h-4" />
              {post.author}
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
          </div>

          {/* Title */}
          <h1 className={`text-4xl md:text-5xl font-canela mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className={`text-xl leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {post.excerpt}
          </p>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span 
                  key={tag}
                  className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Content */}
          <div 
            className={`prose prose-lg max-w-none ${isDark ? 'prose-invert' : ''}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author Info */}
          <div className={`mt-12 p-6 rounded-lg border ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex items-center gap-4">
              {post.authorImage && (
                <img
                  src={post.authorImage}
                  alt={post.author}
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div>
                <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-black'}`}>
                  {post.author}
                </h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Autor do artigo
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
