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

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  onSelectImage,
  selectedImage,
  isOpen,
  onClose
}) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

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

      const imageFiles = data
        ?.filter(file => 
          file.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)
        )
        .map(file => {
          const { data: urlData } = supabase.storage
            .from('videos')
            .getPublicUrl(file.name);
          return urlData.publicUrl;
        }) || [];

      setImages(imageFiles);
    } catch (error) {
      console.error('Erro ao carregar imagens:', error);
      toast.error('Erro ao carregar galeria');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione apenas arquivos de imagem');
      return;
    }

    setUploading(true);
    try {
      const fileName = `logo_${Date.now()}_${file.name}`;
      
      const { error: uploadError } = await supabase.storage
        .from('videos')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('videos')
        .getPublicUrl(fileName);

      toast.success('Imagem enviada com sucesso!');
      onSelectImage(urlData.publicUrl);
      loadImages(); // Recarregar galeria
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      toast.error('Erro ao enviar imagem');
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
            Galeria de Imagens
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Section */}
          <Card>
            <CardContent className="p-4">
              <Label htmlFor="image-upload" className="block mb-2 font-medium">
                Enviar Nova Imagem
              </Label>
              <div className="flex items-center gap-4">
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
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

          {/* Gallery Grid */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Selecionar da Galeria</h3>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((imageUrl, index) => (
                  <div
                    key={index}
                    className={`relative cursor-pointer group rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === imageUrl
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => {
                      onSelectImage(imageUrl);
                      onClose();
                    }}
                  >
                    <div className="aspect-square">
                      <img
                        src={imageUrl}
                        alt={`Imagem ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    {selectedImage === imageUrl && (
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                        <div className="bg-primary text-primary-foreground rounded-full p-2">
                          <Check className="w-4 h-4" />
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                ))}
                {images.length === 0 && !loading && (
                  <div className="col-span-full text-center py-8 text-muted-foreground">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Nenhuma imagem encontrada</p>
                    <p className="text-sm">Faça upload da primeira imagem</p>
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