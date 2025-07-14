import React from 'react';
import { LinkTree, LinkTreeItem } from '@/types/linkTreeTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, ExternalLink, TrendingUp } from 'lucide-react';

interface LinkTreePreviewProps {
  linkTree: LinkTree;
  linkTreeItems: LinkTreeItem[];
  onItemClick?: (item: LinkTreeItem) => void;
}

export function LinkTreePreview({ linkTree, linkTreeItems, onItemClick }: LinkTreePreviewProps) {
  const getThemeClasses = () => {
    switch (linkTree.theme) {
      case 'netflix':
        return {
          container: 'bg-black text-white min-h-screen',
          wrapper: 'max-w-sm mx-auto p-6',
          avatar: 'w-24 h-24 rounded-lg object-cover shadow-2xl border-2 border-red-600',
          title: 'text-3xl font-bold text-red-500 mb-2',
          description: 'text-gray-300 mb-6',
          item: 'bg-gradient-to-r from-red-900 to-red-700 hover:from-red-800 hover:to-red-600 text-white rounded-lg p-4 mb-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/25',
          card: 'bg-gradient-to-br from-red-900/50 to-black border-red-600 shadow-xl hover:shadow-red-500/25'
        };
      
      case 'amazon':
        return {
          container: 'bg-gradient-to-br from-orange-50 to-yellow-50 text-gray-900 min-h-screen',
          wrapper: 'max-w-sm mx-auto p-6',
          avatar: 'w-24 h-24 rounded-xl object-cover shadow-lg border-2 border-orange-400',
          title: 'text-3xl font-bold text-orange-600 mb-2',
          description: 'text-gray-700 mb-6',
          item: 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white rounded-xl p-4 mb-3 transition-all duration-300 hover:scale-105 shadow-lg',
          card: 'bg-white border-orange-200 shadow-xl hover:shadow-orange-200/50'
        };
      
      case 'landing_page':
        return {
          container: 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white min-h-screen',
          wrapper: 'max-w-sm mx-auto p-6',
          avatar: 'w-24 h-24 rounded-2xl object-cover shadow-xl border-2 border-purple-400',
          title: 'text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2',
          description: 'text-purple-100 mb-6',
          item: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-2xl p-4 mb-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25',
          card: 'bg-white/10 backdrop-blur-lg border-purple-300/30 shadow-xl hover:shadow-purple-400/25'
        };
      
      case 'futurista':
        return {
          container: 'bg-black text-cyan-400 min-h-screen relative overflow-hidden',
          wrapper: 'max-w-sm mx-auto p-6 relative z-10',
          avatar: 'w-24 h-24 rounded-full object-cover shadow-2xl border-2 border-cyan-400 ring-4 ring-cyan-400/30',
          title: 'text-3xl font-bold text-cyan-400 mb-2 animate-pulse',
          description: 'text-cyan-200 mb-6',
          item: 'bg-gradient-to-r from-cyan-900/50 to-blue-900/50 border border-cyan-400 hover:border-cyan-300 text-cyan-100 rounded-lg p-4 mb-3 transition-all duration-300 hover:scale-105 hover:shadow-cyan-400/25 backdrop-blur-sm',
          card: 'bg-cyan-900/20 backdrop-blur-lg border-cyan-400/50 shadow-xl hover:shadow-cyan-400/25'
        };
      
      case 'spotify':
        return {
          container: 'bg-gradient-to-br from-green-900 to-black text-white min-h-screen',
          wrapper: 'max-w-sm mx-auto p-6',
          avatar: 'w-24 h-24 rounded-full object-cover shadow-2xl border-2 border-green-500',
          title: 'text-3xl font-bold text-green-400 mb-2',
          description: 'text-green-100 mb-6',
          item: 'bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-green-500 text-white rounded-full p-4 mb-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/25',
          card: 'bg-green-900/30 backdrop-blur-lg border-green-400/30 shadow-xl hover:shadow-green-400/25'
        };
      
      case 'discord':
        return {
          container: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white min-h-screen',
          wrapper: 'max-w-sm mx-auto p-6',
          avatar: 'w-24 h-24 rounded-lg object-cover shadow-2xl border-2 border-indigo-400',
          title: 'text-3xl font-bold text-indigo-300 mb-2',
          description: 'text-indigo-100 mb-6',
          item: 'bg-gradient-to-r from-indigo-700 to-purple-700 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl p-4 mb-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-indigo-500/25',
          card: 'bg-indigo-900/30 backdrop-blur-lg border-indigo-400/30 shadow-xl hover:shadow-indigo-400/25'
        };
      
      default:
        return {
          container: 'bg-black text-white min-h-screen',
          wrapper: 'max-w-sm mx-auto p-6',
          avatar: 'w-24 h-24 rounded-lg object-cover shadow-lg',
          title: 'text-3xl font-bold mb-2',
          description: 'text-gray-300 mb-6',
          item: 'bg-gray-800 hover:bg-gray-700 text-white rounded-lg p-4 mb-3 transition-all duration-300 hover:scale-105',
          card: 'bg-gray-800 border-gray-600 shadow-lg'
        };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <div className={themeClasses.container}>
      {/* Cyberpunk background effect for futurista theme */}
      {linkTree.theme === 'futurista' && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
        </div>
      )}

      <div className={themeClasses.wrapper}>
        <div className="text-center space-y-6">
          {/* Avatar */}
          {linkTree.avatar_url && (
            <div className="flex justify-center">
              <img
                src={linkTree.avatar_url}
                alt={linkTree.title}
                className={themeClasses.avatar}
              />
            </div>
          )}

          {/* Title and Description */}
          <div>
            <h1 className={themeClasses.title}>
              {linkTree.title}
            </h1>
            {linkTree.description && (
              <p className={themeClasses.description}>
                {linkTree.description}
              </p>
            )}
          </div>

          {/* Items */}
          <div className="space-y-4">
            {linkTreeItems
              .sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0))
              .map((item, index) => (
              <div
                key={item.id}
                className={`animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.item_type === 'link' && (
                  <div
                    className={themeClasses.item}
                    onClick={() => onItemClick?.(item)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {item.is_featured && (
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        )}
                        <span className="font-semibold">{item.title}</span>
                      </div>
                      <ExternalLink className="w-4 h-4 opacity-70" />
                    </div>
                  </div>
                )}

                {item.item_type === 'card' && (
                  <Card className={themeClasses.card}>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        {item.is_featured && <Star className="w-5 h-5 text-yellow-400 fill-current" />}
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {item.card_image && (
                        <img 
                          src={item.card_image} 
                          alt={item.title}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                      )}
                      <p className="text-sm opacity-90 mb-3">
                        {item.card_content}
                      </p>
                      {item.card_price && (
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-green-400">
                            {item.card_price}
                          </span>
                          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                            {item.card_button_text || 'Saiba Mais'}
                          </button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {item.item_type === 'form' && (
                  <Card className={themeClasses.card}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {item.is_featured && <Star className="w-5 h-5 text-yellow-400 fill-current" />}
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm opacity-75 mb-3">
                        Formulário personalizado disponível
                      </p>
                      <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg p-3 font-medium transition-all">
                        Preencher Formulário
                      </button>
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}

            {linkTreeItems.length === 0 && (
              <div className="py-12 text-center opacity-60">
                <p>Nenhum item adicionado ainda</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}