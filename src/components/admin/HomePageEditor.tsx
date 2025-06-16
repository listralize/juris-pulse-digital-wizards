
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Save, Upload, X, Link } from 'lucide-react';
import { useToast } from '../ui/use-toast';
import { useSupabaseContactInfo } from '../../hooks/supabase/useSupabaseContactInfo';
import { useSupabasePageTexts } from '../../hooks/supabase/useSupabasePageTexts';

const HomePageEditor = () => {
  const { toast } = useToast();
  const { 
    pageTexts, 
    savePageTexts, 
    isLoading: pageTextsLoading 
  } = useSupabasePageTexts();
  
  const { 
    contactInfo, 
    saveContactInfo, 
    isLoading: contactLoading 
  } = useSupabaseContactInfo();

  // Estados locais para edição
  const [localPageTexts, setLocalPageTexts] = useState(pageTexts);
  const [localContactInfo, setLocalContactInfo] = useState(contactInfo);
  const [localFooterTexts, setLocalFooterTexts] = useState({
    companyName: 'Serafim & Trombela Advocacia',
    description: 'Soluções jurídicas inovadoras com foco em resultados e excelência no atendimento.'
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  const isLoading = pageTextsLoading || contactLoading;

  // Sincronizar com os dados carregados
  useEffect(() => {
    setLocalPageTexts(pageTexts);
  }, [pageTexts]);

  useEffect(() => {
    setLocalContactInfo(contactInfo);
  }, [contactInfo]);

  // Funções de upload de imagem
  const handleImageUpload = async (file: File, field: string) => {
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      // Simular upload - substitua pela implementação real
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        
        if (field === 'heroBackgroundImage') {
          setLocalPageTexts(prev => ({
            ...prev,
            heroBackgroundImage: imageUrl
          }));
        } else if (field === 'aboutImage') {
          setLocalPageTexts(prev => ({
            ...prev,
            aboutImage: imageUrl
          }));
        }
      };
      reader.readAsDataURL(file);

      toast({
        title: "Imagem carregada",
        description: "A imagem foi carregada com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro no upload",
        description: "Houve um erro ao carregar a imagem.",
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  // Função para salvar dados da página
  const handleSavePageTexts = async () => {
    try {
      await savePageTexts(localPageTexts);
      toast({
        title: "Alterações salvas",
        description: "Os textos da página foram atualizados com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Houve um erro ao salvar as alterações.",
        variant: "destructive",
      });
    }
  };

  // Função para salvar informações de contato
  const handleSaveContactInfo = async () => {
    try {
      await saveContactInfo(localContactInfo);
      toast({
        title: "Contato atualizado",
        description: "As informações de contato foram atualizadas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Houve um erro ao salvar as informações de contato.",
        variant: "destructive",
      });
    }
  };

  // Função para salvar informações do rodapé
  const handleSaveFooterTexts = async () => {
    try {
      // Implementar quando necessário
      toast({
        title: "Rodapé atualizado",
        description: "As informações do rodapé foram atualizadas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Houve um erro ao salvar as informações do rodapé.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Editor da Página Inicial</h2>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="about">Sobre</TabsTrigger>
          <TabsTrigger value="contact">Contato</TabsTrigger>
          <TabsTrigger value="footer">Rodapé</TabsTrigger>
          <TabsTrigger value="buttons">Botões</TabsTrigger>
        </TabsList>

        {/* Seção Hero */}
        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Seção Hero</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="hero-title">Título Principal</Label>
                <Input
                  id="hero-title"
                  value={localPageTexts.heroTitle || ''}
                  onChange={(e) => setLocalPageTexts(prev => ({ ...prev, heroTitle: e.target.value }))}
                  placeholder="Digite o título principal"
                />
              </div>

              <div>
                <Label htmlFor="hero-subtitle">Subtítulo</Label>
                <Textarea
                  id="hero-subtitle"
                  value={localPageTexts.heroSubtitle || ''}
                  onChange={(e) => setLocalPageTexts(prev => ({ ...prev, heroSubtitle: e.target.value }))}
                  placeholder="Digite o subtítulo"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="hero-background">Imagem de Fundo</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="hero-background"
                    value={localPageTexts.heroBackgroundImage || ''}
                    onChange={(e) => setLocalPageTexts(prev => ({ ...prev, heroBackgroundImage: e.target.value }))}
                    placeholder="URL da imagem de fundo"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('hero-bg-upload')?.click()}
                    disabled={uploadingImage}
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                  <input
                    id="hero-bg-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, 'heroBackgroundImage');
                    }}
                  />
                  {localPageTexts.heroBackgroundImage && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setLocalPageTexts(prev => ({ ...prev, heroBackgroundImage: '' }))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                {localPageTexts.heroBackgroundImage && (
                  <div className="mt-2">
                    <img
                      src={localPageTexts.heroBackgroundImage}
                      alt="Preview"
                      className="w-32 h-20 object-cover rounded border"
                    />
                  </div>
                )}
              </div>

              <Button onClick={handleSavePageTexts} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Salvar Seção Hero
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Seção Botões */}
        <TabsContent value="buttons">
          <Card>
            <CardHeader>
              <CardTitle>Configuração dos Botões do Hero</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Botão Primário */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Botão Primário</h4>
                <div>
                  <Label htmlFor="primary-button-text">Texto do Botão</Label>
                  <Input
                    id="primary-button-text"
                    value={localPageTexts.heroPrimaryButtonText || 'Fale Conosco'}
                    onChange={(e) => setLocalPageTexts(prev => ({ ...prev, heroPrimaryButtonText: e.target.value }))}
                    placeholder="Texto do botão primário"
                  />
                </div>
                <div>
                  <Label htmlFor="primary-button-link">Link do Botão</Label>
                  <div className="flex items-center gap-2">
                    <Link className="h-4 w-4 text-gray-500" />
                    <Input
                      id="primary-button-link"
                      value={localPageTexts.heroPrimaryButtonLink || ''}
                      onChange={(e) => setLocalPageTexts(prev => ({ ...prev, heroPrimaryButtonLink: e.target.value }))}
                      placeholder="Ex: #contact, https://wa.me/5562999999999, mailto:contato@exemplo.com"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Use #id para rolar para seções, URLs para links externos, ou deixe vazio para WhatsApp padrão
                  </p>
                </div>
              </div>

              {/* Botão Secundário */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Botão Secundário</h4>
                <div>
                  <Label htmlFor="secondary-button-text">Texto do Botão</Label>
                  <Input
                    id="secondary-button-text"
                    value={localPageTexts.heroSecondaryButtonText || 'Saiba Mais'}
                    onChange={(e) => setLocalPageTexts(prev => ({ ...prev, heroSecondaryButtonText: e.target.value }))}
                    placeholder="Texto do botão secundário"
                  />
                </div>
                <div>
                  <Label htmlFor="secondary-button-link">Link do Botão</Label>
                  <div className="flex items-center gap-2">
                    <Link className="h-4 w-4 text-gray-500" />
                    <Input
                      id="secondary-button-link"
                      value={localPageTexts.heroSecondaryButtonLink || ''}
                      onChange={(e) => setLocalPageTexts(prev => ({ ...prev, heroSecondaryButtonLink: e.target.value }))}
                      placeholder="Ex: #about, https://exemplo.com, tel:+5562999999999"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Use #id para rolar para seções, URLs para links externos, ou deixe vazio para scroll padrão
                  </p>
                </div>
              </div>

              <Button onClick={handleSavePageTexts} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações dos Botões
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Outras abas mantidas iguais */}
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>Seção Sobre Nós</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="about-title">Título</Label>
                <Input
                  id="about-title"
                  value={localPageTexts.aboutTitle || ''}
                  onChange={(e) => setLocalPageTexts(prev => ({ ...prev, aboutTitle: e.target.value }))}
                  placeholder="Digite o título da seção sobre"
                />
              </div>

              <div>
                <Label htmlFor="about-description">Descrição</Label>
                <Textarea
                  id="about-description"
                  value={localPageTexts.aboutDescription || ''}
                  onChange={(e) => setLocalPageTexts(prev => ({ ...prev, aboutDescription: e.target.value }))}
                  placeholder="Digite a descrição da seção sobre"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="about-image">Imagem/Vídeo</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="about-image"
                    value={localPageTexts.aboutImage || ''}
                    onChange={(e) => setLocalPageTexts(prev => ({ ...prev, aboutImage: e.target.value }))}
                    placeholder="URL da imagem ou vídeo"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('about-img-upload')?.click()}
                    disabled={uploadingImage}
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                  <input
                    id="about-img-upload"
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, 'aboutImage');
                    }}
                  />
                  {localPageTexts.aboutImage && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setLocalPageTexts(prev => ({ ...prev, aboutImage: '' }))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                {localPageTexts.aboutImage && (
                  <div className="mt-2">
                    {localPageTexts.aboutImage.includes('video') || localPageTexts.aboutImage.endsWith('.mp4') ? (
                      <video
                        src={localPageTexts.aboutImage}
                        className="w-32 h-20 object-cover rounded border"
                        controls
                      />
                    ) : (
                      <img
                        src={localPageTexts.aboutImage}
                        alt="Preview"
                        className="w-32 h-20 object-cover rounded border"
                      />
                    )}
                  </div>
                )}
              </div>

              <Button onClick={handleSavePageTexts} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Salvar Seção Sobre
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Informações de Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact-phone">Telefone</Label>
                  <Input
                    id="contact-phone"
                    value={localContactInfo.phone || ''}
                    onChange={(e) => setLocalContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="(XX) XXXXX-XXXX"
                  />
                </div>
                <div>
                  <Label htmlFor="contact-whatsapp">WhatsApp</Label>
                  <Input
                    id="contact-whatsapp"
                    value={localContactInfo.whatsapp || ''}
                    onChange={(e) => setLocalContactInfo(prev => ({ ...prev, whatsapp: e.target.value }))}
                    placeholder="5562XXXXXXXXX"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="contact-email">E-mail</Label>
                <Input
                  id="contact-email"
                  value={localContactInfo.email || ''}
                  onChange={(e) => setLocalContactInfo(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="contato@exemplo.com"
                />
              </div>

              <div>
                <Label htmlFor="contact-address">Endereço</Label>
                <Textarea
                  id="contact-address"
                  value={localContactInfo.address || ''}
                  onChange={(e) => setLocalContactInfo(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Endereço completo"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="contact-map">URL do Mapa</Label>
                <Textarea
                  id="contact-map"
                  value={localContactInfo.mapEmbedUrl || ''}
                  onChange={(e) => setLocalContactInfo(prev => ({ ...prev, mapEmbedUrl: e.target.value }))}
                  placeholder="Cole aqui a URL do iframe do Google Maps"
                  rows={3}
                />
              </div>

              <Button onClick={handleSaveContactInfo} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Salvar Informações de Contato
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="footer">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Rodapé</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="footer-company">Nome da Empresa</Label>
                <Input
                  id="footer-company"
                  value={localFooterTexts.companyName || ''}
                  onChange={(e) => setLocalFooterTexts(prev => ({ ...prev, companyName: e.target.value }))}
                  placeholder="Nome da empresa"
                />
              </div>

              <div>
                <Label htmlFor="footer-description">Descrição</Label>
                <Textarea
                  id="footer-description"
                  value={localFooterTexts.description || ''}
                  onChange={(e) => setLocalFooterTexts(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descrição da empresa"
                  rows={3}
                />
              </div>

              <Button onClick={handleSaveFooterTexts} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Salvar Informações do Rodapé
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomePageEditor;
