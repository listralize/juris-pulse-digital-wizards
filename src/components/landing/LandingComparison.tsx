import React from 'react';
import { Check, X } from 'lucide-react';

interface LandingComparisonProps {
  config: Record<string, any>;
  primaryColor: string;
}

export const LandingComparison: React.FC<LandingComparisonProps> = ({ config, primaryColor }) => {
  const title = config.title || 'Compare';
  const leftTitle = config.left_title || 'Sem Advogado';
  const rightTitle = config.right_title || 'Com Advogado';
  const items = config.items || [];
  const layout = config.layout || 'table';

  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">{title}</h2>
        {config.subtitle && (
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">{config.subtitle}</p>
        )}

        {layout === 'cards' ? (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left (negative) */}
            <div className="rounded-2xl border-2 border-red-200 bg-red-50/50 dark:bg-red-950/20 dark:border-red-900/50 p-6 space-y-4">
              <h3 className="text-lg font-bold text-red-600 dark:text-red-400 text-center">{leftTitle}</h3>
              <ul className="space-y-3">
                {items.map((item: any, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item.left_text}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Right (positive) */}
            <div className="rounded-2xl border-2 p-6 space-y-4" style={{ borderColor: primaryColor + '40', backgroundColor: primaryColor + '08' }}>
              <h3 className="text-lg font-bold text-center" style={{ color: primaryColor }}>{rightTitle}</h3>
              <ul className="space-y-3">
                {items.map((item: any, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: primaryColor }} />
                    <span className="text-sm font-medium">{item.right_text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          /* Table layout */
          <div className="rounded-2xl border overflow-hidden">
            <div className="grid grid-cols-3">
              <div className="p-4 bg-muted/50 border-b" />
              <div className="p-4 bg-red-50 dark:bg-red-950/30 border-b text-center font-bold text-red-600 dark:text-red-400 text-sm">{leftTitle}</div>
              <div className="p-4 border-b text-center font-bold text-sm" style={{ backgroundColor: primaryColor + '10', color: primaryColor }}>{rightTitle}</div>
            </div>
            {items.map((item: any, i: number) => (
              <div key={i} className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-muted/20' : ''}`}>
                <div className="p-3 border-b text-sm font-medium">{item.feature || `Item ${i + 1}`}</div>
                <div className="p-3 border-b text-center">
                  <span className="text-sm text-red-600 dark:text-red-400">{item.left_text}</span>
                </div>
                <div className="p-3 border-b text-center">
                  <span className="text-sm font-medium" style={{ color: primaryColor }}>{item.right_text}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
