import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Upload, Image as ImageIcon, X, Check } from 'lucide-react';
import { supabase } from '../../integrations/supabase/client';
import { toast } from 'sonner';

interface ImageGalleryProps {
  onSelectImage: (url: string) => void;
  selectedImage?: string;
  isOpen: boolean;
  onClose: () => void;
}

interface MediaFile {
  url: string;
  name: string;
  type: 'image' | 'video';
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  onSelectImage,
  selectedImage,
  isOpen,
  onClose
}) => {
  const [images, setImages] = useState<MediaFile[]>([]);
  const [filteredImages, setFilteredImages] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');

  useEffect(() => {
    if (isOpen) {
      loadImages();
    }
  }, [isOpen]);

  const loadImages = async () => {
    setLoading(true);
    try {
      // Primeiro tentar bucket 'videos'
      let { data, error } = await supabase.storage
        .from('videos')
        .list('', { limit: 100 });

      // Se o bucket 'videos' não existir, criar
      if (error && error.message.includes('not found')) {
        await supabase.storage.createBucket('videos', { public: true });
        ({ data, error } = await supabase.storage
          .from('videos')
          .list('', { limit: 100 }));
      }

      if (error) throw error;

      const mediaFiles = data
        ?.filter(file => 
          file.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp|svg|mp4|mov|avi|mkv)$/i)
        )
        .map(file => {
          const { data: urlData } = supabase.storage
            .from('videos')
            .getPublicUrl(file.name);
          return {
            url: urlData.publicUrl,
            name: file.name,
            type: file.name.toLowerCase().match(/\.(mp4|mov|avi|mkv)$/i) ? 'video' as const : 'image' as const
          };
        }) || [];

      setImages(mediaFiles);
      setFilteredImages(mediaFiles);
    } catch (error) {
      console.error('Erro ao carregar imagens:', error);
      toast.error('Erro ao carregar galeria');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    filterImages();
  }, [images, searchTerm, selectedFolder]);

  const filterImages = () => {
    let filtered = images;

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(image => 
        image.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por pasta/tipo
    if (selectedFolder !== 'all') {
      filtered = filtered.filter(image => image.type === selectedFolder);
    }

    setFilteredImages(filtered);
  };

  const getFolders = () => {
    const types = [...new Set(images.map(img => img.type))];
    return [
      { value: 'all', label: 'Todos os arquivos', count: images.length },
      ...types.map(type => ({
        value: type,
        label: type === 'image' ? 'Imagens' : 'Vídeos',
        count: images.filter(img => img.type === type).length
      }))
    ];
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    const allowedTypes = ['image/', 'video/'];
    if (!allowedTypes.some(type => file.type.startsWith(type))) {
      toast.error('Por favor, selecione apenas arquivos de imagem ou vídeo');
      return;
    }

    setUploading(true);
    try {
      const fileName = `media_${Date.now()}_${file.name}`;
      
      const { error: uploadError } = await supabase.storage
        .from('videos')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('videos')
        .getPublicUrl(fileName);

      toast.success('Arquivo enviado com sucesso!');
      onSelectImage(urlData.publicUrl);
      loadImages(); // Recarregar galeria
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      toast.error('Erro ao enviar arquivo');
    } finally {
      setUploading(false);
      event.target.value = ''; // Limpar input
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Galeria de Mídia
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Section */}
          <Card>
            <CardContent className="p-4">
              <Label htmlFor="media-upload" className="block mb-2 font-medium">
                Enviar Nova Mídia
              </Label>
              <div className="flex items-center gap-4">
                <Input
                  id="media-upload"
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="flex-1"
                />
                <Button disabled={uploading} variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  {uploading ? 'Enviando...' : 'Upload'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="search" className="block mb-2 font-medium">
                    Buscar Arquivos
                  </Label>
                  <Input
                    id="search"
                    type="text"
                    placeholder="Digite o nome do arquivo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="folder" className="block mb-2 font-medium">
                    Filtrar por Tipo
                  </Label>
                  <select
                    id="folder"
                    className="w-full p-2 border border-input rounded-md bg-background"
                    value={selectedFolder}
                    onChange={(e) => setSelectedFolder(e.target.value)}
                  >
                    {getFolders().map(folder => (
                      <option key={folder.value} value={folder.value}>
                        {folder.label} ({folder.count})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gallery Grid */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Selecionar da Galeria</h3>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredImages.map((mediaFile, index) => (
                  <div
                    key={index}
                    className={`relative cursor-pointer group rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === mediaFile.url
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => {
                      onSelectImage(mediaFile.url);
                      onClose();
                    }}
                  >
                    <div className="aspect-square relative">
                      {mediaFile.type === 'video' ? (
                        <>
                          <video
                            src={mediaFile.url}
                            className="w-full h-full object-cover"
                            muted
                            loop
                            onMouseEnter={(e) => e.currentTarget.play()}
                            onMouseLeave={(e) => {
                              e.currentTarget.pause();
                              e.currentTarget.currentTime = 0;
                            }}
                          />
                          <div className="absolute top-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                            VIDEO
                          </div>
                        </>
                      ) : (
                        <img
                          src={mediaFile.url}
                          alt={`Mídia ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      )}
                    </div>
                    {selectedImage === mediaFile.url && (
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                        <div className="bg-primary text-primary-foreground rounded-full p-2">
                          <Check className="w-4 h-4" />
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                ))}
                {filteredImages.length === 0 && !loading && (
                  <div className="col-span-full text-center py-8 text-muted-foreground">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Nenhuma mídia encontrada</p>
                    <p className="text-sm">Faça upload do primeiro arquivo</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};