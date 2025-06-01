
import React, { useState } from 'react';
import { useTheme } from '../components/ThemeProvider';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Copy, ExternalLink, Zap, Code, FileText, Settings } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import Navbar from '../components/navbar';

const BlogAutomation = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isTestLoading, setIsTestLoading] = useState(false);

  const currentDomain = window.location.origin;
  const webhookEndpoint = `${currentDomain}/api/blog/webhook`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Texto copiado para a área de transferência",
    });
  };

  const testWebhook = async () => {
    if (!webhookUrl) {
      toast({
        title: "Erro",
        description: "Por favor, insira a URL do webhook do Make",
        variant: "destructive",
      });
      return;
    }

    setIsTestLoading(true);

    try {
      const testData = {
        title: "Post de Teste - Make Integration",
        content: "<p>Este é um post de teste criado via Make automation.</p>",
        excerpt: "Post de teste para verificar a integração com Make",
        banner: "https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Blog+Post+Test",
        author: "Sistema Make",
        tags: ["Teste", "Automação"],
        featured: false
      };

      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(testData),
      });

      toast({
        title: "Teste Enviado",
        description: "Dados de teste enviados para o Make. Verifique se o post foi criado.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao testar o webhook",
        variant: "destructive",
      });
    } finally {
      setIsTestLoading(false);
    }
  };

  const jsonStructure = {
    title: "Título do Post",
    content: "<p>Conteúdo HTML do post</p>",
    excerpt: "Resumo do post",
    banner: "URL da imagem de banner",
    author: "Nome do autor",
    tags: ["Tag1", "Tag2", "Tag3"],
    featured: true
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-white'}`}>
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className={`text-4xl font-canela mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
              🤖 Automação do Blog
            </h1>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Configure a automação com Make para criar posts automaticamente
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Configuração do Webhook */}
            <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-black'}`}>
                  <Zap className="w-5 h-5" />
                  Configuração do Webhook
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="webhook">URL do Webhook Make</Label>
                  <div className="flex gap-2">
                    <Input
                      id="webhook"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      placeholder="https://hook.eu1.make.com/..."
                    />
                    <Button
                      onClick={testWebhook}
                      disabled={isTestLoading}
                      size="sm"
                    >
                      {isTestLoading ? "Testando..." : "Testar"}
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold mb-2">Endpoint do Sistema:</h4>
                  <div className="flex items-center gap-2">
                    <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded flex-1">
                      {webhookEndpoint}
                    </code>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => copyToClipboard(webhookEndpoint)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Estrutura JSON */}
            <Card className={`${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-black'}`}>
                  <Code className="w-5 h-5" />
                  Estrutura JSON
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className={`text-sm p-4 rounded-lg overflow-x-auto ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
{JSON.stringify(jsonStructure, null, 2)}
                  </pre>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(JSON.stringify(jsonStructure, null, 2))}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Instruções */}
          <Card className={`mt-8 ${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-black'}`}>
                <FileText className="w-5 h-5" />
                Instruções para Configurar no Make
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                    1. Criar Cenário no Make
                  </h3>
                  <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li>• Acesse make.com e crie um novo cenário</li>
                    <li>• Adicione um trigger (ex: Google Sheets, Airtable, etc.)</li>
                    <li>• Configure os dados de entrada</li>
                  </ul>

                  <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                    2. Configurar Webhook
                  </h3>
                  <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li>• Adicione um módulo "HTTP Make a request"</li>
                    <li>• Method: POST</li>
                    <li>• URL: Cole a URL do webhook acima</li>
                    <li>• Content-Type: application/json</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                    3. Estruturar Dados
                  </h3>
                  <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li>• Use a estrutura JSON ao lado</li>
                    <li>• Mapeie os campos dos seus dados</li>
                    <li>• Tags devem ser um array de strings</li>
                    <li>• Featured é boolean (true/false)</li>
                  </ul>

                  <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                    4. Testar e Ativar
                  </h3>
                  <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li>• Execute um teste no Make</li>
                    <li>• Verifique se o post aparece no blog</li>
                    <li>• Ative o cenário</li>
                  </ul>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${isDark ? 'bg-green-900/20 border border-green-500/20' : 'bg-green-50 border border-green-200'}`}>
                <h4 className={`font-semibold mb-2 ${isDark ? 'text-green-400' : 'text-green-800'}`}>
                  💡 Dicas Importantes:
                </h4>
                <ul className={`space-y-1 text-sm ${isDark ? 'text-green-300' : 'text-green-700'}`}>
                  <li>• O sistema criará automaticamente slug e timestamps</li>
                  <li>• Use HTML válido no campo "content"</li>
                  <li>• Banner deve ser uma URL válida de imagem</li>
                  <li>• Tags ajudam na categorização e busca</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button asChild>
                  <a href="https://make.com" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Abrir Make.com
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/admin" target="_blank" rel="noopener noreferrer">
                    <Settings className="w-4 h-4 mr-2" />
                    Painel Admin
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogAutomation;
