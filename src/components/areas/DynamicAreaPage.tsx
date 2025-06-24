
import React from 'react';
import PracticeAreaLayout from '../PracticeAreaLayout';

interface DynamicAreaPageProps {
  areaKey: string;
  title: string;
  description: string;
  icon?: string;
  introText?: string[];
}

export const DynamicAreaPage: React.FC<DynamicAreaPageProps> = ({
  areaKey,
  title,
  description,
  icon = '⚖️',
  introText = []
}) => {
  return (
    <PracticeAreaLayout 
      title={title}
      description={description}
      currentArea={title}
    >
      {/* Conteúdo Principal */}
      <div className="mb-12">
        {introText.length > 0 ? (
          <div className="prose prose-lg max-w-none">
            {introText.map((paragraph, index) => (
              <p key={index} className="mb-6 text-lg leading-relaxed text-gray-300">
                {paragraph}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-lg leading-relaxed text-gray-300">
            {description}
          </p>
        )}
      </div>

      {/* Ícone e Título da Área */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-xl font-bold">
          {icon}
        </div>
        <h2 className="text-2xl xl:text-3xl font-canela text-white">
          Serviços Especializados em {title}
        </h2>
      </div>
      
      <p className="text-lg mb-8 text-gray-300">
        Nossa equipe oferece assessoria completa e especializada em {title.toLowerCase()}, 
        com soluções jurídicas estratégicas para proteger seus direitos e interesses.
      </p>
    </PracticeAreaLayout>
  );
};
