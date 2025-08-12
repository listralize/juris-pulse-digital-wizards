import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bold, Italic, Underline, List, Quote, Image, Link2, Type, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface VisualBlogEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export const VisualBlogEditor: React.FC<VisualBlogEditorProps> = ({ content, onChange }) => {
  const [selectedFormat, setSelectedFormat] = useState<string>('paragraph');

  const formatText = (format: string) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    
    if (!selectedText) return;

    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'underline':
        formattedText = `<u>${selectedText}</u>`;
        break;
      case 'h2':
        formattedText = `## ${selectedText}`;
        break;
      case 'h3':
        formattedText = `### ${selectedText}`;
        break;
      case 'quote':
        formattedText = `> ${selectedText}`;
        break;
      case 'list':
        formattedText = `- ${selectedText}`;
        break;
      case 'link':
        const url = prompt('Digite a URL:');
        if (url) {
          formattedText = `[${selectedText}](${url})`;
        } else {
          return;
        }
        break;
      default:
        formattedText = selectedText;
    }

    // Replace selected text with formatted text
    const newContent = content.replace(selectedText, formattedText);
    onChange(newContent);
  };

  const insertBlock = (type: string) => {
    let blockText = '';
    switch (type) {
      case 'heading2':
        blockText = '\n\n## Título da Seção\n\n';
        break;
      case 'heading3':
        blockText = '\n\n### Subtítulo\n\n';
        break;
      case 'paragraph':
        blockText = '\n\nEscreva seu parágrafo aqui...\n\n';
        break;
      case 'list':
        blockText = '\n\n- Item da lista\n- Outro item\n- Mais um item\n\n';
        break;
      case 'quote':
        blockText = '\n\n> Esta é uma citação importante\n\n';
        break;
      case 'image':
        const imageUrl = prompt('Digite a URL da imagem:');
        if (imageUrl) {
          blockText = `\n\n![Descrição da imagem](${imageUrl})\n\n`;
        }
        break;
    }
    
    onChange(content + blockText);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Type className="w-5 h-5" />
          Editor Visual de Conteúdo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 p-3 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="outline"
              onClick={() => formatText('bold')}
              title="Negrito"
            >
              <Bold className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => formatText('italic')}
              title="Itálico"
            >
              <Italic className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => formatText('underline')}
              title="Sublinhado"
            >
              <Underline className="w-4 h-4" />
            </Button>
          </div>

          <div className="w-px h-6 bg-gray-300"></div>

          <div className="flex gap-1">
            <Button
              size="sm"
              variant="outline"
              onClick={() => insertBlock('heading2')}
              title="Título H2"
            >
              H2
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => insertBlock('heading3')}
              title="Título H3"
            >
              H3
            </Button>
          </div>

          <div className="w-px h-6 bg-gray-300"></div>

          <div className="flex gap-1">
            <Button
              size="sm"
              variant="outline"
              onClick={() => insertBlock('list')}
              title="Lista"
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => insertBlock('quote')}
              title="Citação"
            >
              <Quote className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => formatText('link')}
              title="Link"
            >
              <Link2 className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => insertBlock('image')}
              title="Imagem"
            >
              <Image className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Quick blocks */}
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => insertBlock('paragraph')}
            className="text-sm"
          >
            + Parágrafo
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => insertBlock('heading2')}
            className="text-sm"
          >
            + Título Principal
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => insertBlock('heading3')}
            className="text-sm"
          >
            + Subtítulo
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => insertBlock('list')}
            className="text-sm"
          >
            + Lista
          </Button>
        </div>

        {/* Content Editor */}
        <div className="space-y-2">
          <Label>Conteúdo do Post</Label>
          <Textarea
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Comece escrevendo seu post aqui...

## Introdução
Conte ao leitor sobre o que se trata este post.

### Principais pontos
- Ponto importante 1
- Ponto importante 2
- Ponto importante 3

## Desenvolvimento
Desenvolva sua ideia aqui...

### Exemplo prático
> Esta é uma citação ou destaque importante

## Conclusão
Finalize com uma conclusão clara..."
            rows={20}
            className="font-mono text-sm"
          />
        </div>

        {/* Preview hint */}
        <div className="text-xs text-muted-foreground p-3 bg-blue-50 dark:bg-blue-950 rounded">
          💡 <strong>Dicas:</strong> Use ## para títulos principais, ### para subtítulos, 
          **texto** para negrito, *texto* para itálico, - para listas e {`>`} para citações.
        </div>
      </CardContent>
    </Card>
  );
};