import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImageIcon, Upload, X, FolderOpen } from 'lucide-react';
import { ImageGallery } from '@/components/admin/ImageGallery';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ImagePickerFieldProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
}

export const ImagePickerField: React.FC<ImagePickerFieldProps> = ({
  value, onChange, label, placeholder = 'URL da imagem',
}) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      toast.error('Selecione uma imagem ou vídeo');
      return;
    }
    setUploading(true);
    try {
      const fileName = `media_${Date.now()}_${file.name}`;
      const { error } = await supabase.storage.from('videos').upload(fileName, file);
      if (error) throw error;
      const { data } = supabase.storage.from('videos').getPublicUrl(fileName);
      onChange(data.publicUrl);
      toast.success('Upload concluído!');
    } catch (err) {
      console.error(err);
      toast.error('Erro no upload');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-2">
      {/* Preview */}
      {value && (
        <div className="relative group rounded-lg overflow-hidden border bg-muted/30 aspect-video max-h-32">
          <img src={value} alt="" className="w-full h-full object-cover" loading="lazy" />
          <button
            onClick={() => onChange('')}
            className="absolute top-1.5 right-1.5 p-1 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-1.5">
        <Button
          type="button" variant="outline" size="sm"
          className="h-8 text-xs gap-1.5 flex-1"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
        >
          <Upload className="w-3.5 h-3.5" />
          {uploading ? 'Enviando...' : 'Upload'}
        </Button>
        <Button
          type="button" variant="outline" size="sm"
          className="h-8 text-xs gap-1.5 flex-1"
          onClick={() => setGalleryOpen(true)}
        >
          <FolderOpen className="w-3.5 h-3.5" />
          Galeria
        </Button>
      </div>

      {/* Fallback URL input */}
      <Input
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-7 text-xs"
      />

      <input ref={fileRef} type="file" accept="image/*,video/*" className="hidden" onChange={handleUpload} />

      <ImageGallery
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        onSelectImage={(url) => { onChange(url); setGalleryOpen(false); }}
        selectedImage={value}
      />
    </div>
  );
};
