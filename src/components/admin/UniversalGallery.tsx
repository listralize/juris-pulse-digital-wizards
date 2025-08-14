import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Upload, Search, Filter, Grid, List, Trash2, 
  Image as ImageIcon, Video, File, Plus, X
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'file';
  size: number;
  created_at: string;
  tags: string[];
  folder?: string;
}

interface UniversalGalleryProps {
  onSelect?: (file: MediaFile) => void;
  allowMultiple?: boolean;
  acceptedTypes?: ('image' | 'video' | 'file')[];
  className?: string;
  embedded?: boolean;
}

export const UniversalGallery: React.FC<UniversalGalleryProps> = ({
  onSelect,
  allowMultiple = false,
  acceptedTypes = ['image', 'video', 'file'],
  className = '',
  embedded = false
}) => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<MediaFile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      setLoading(true);
      
      const { data: storageFiles, error: storageError } = await supabase.storage
        .from('website-gallery')
        .list('', {
          limit: 100,
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (storageError) throw storageError;

      const filesWithUrls = await Promise.all(
        storageFiles.map(async (file) => {
          const { data: { publicUrl } } = supabase.storage
            .from('website-gallery')
            .getPublicUrl(file.name);

          const extension = file.name.split('.').pop()?.toLowerCase() || '';
          let type: 'image' | 'video' | 'file' = 'file';
          
          if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension)) {
            type = 'image';
          } else if (['mp4', 'webm', 'ogg', 'avi', 'mov'].includes(extension)) {
            type = 'video';
          }

          return {
            id: file.id || file.name,
            name: file.name,
            url: publicUrl,
            type,
            size: file.metadata?.size || 0,
            created_at: file.created_at || new Date().toISOString(),
            tags: [],
            folder: file.name.includes('/') ? file.name.split('/')[0] : undefined
          } as MediaFile;
        })
      );

      setFiles(filesWithUrls);
    } catch (error: any) {
      console.error('Erro ao carregar arquivos:', error);
      toast.error('Erro ao carregar galeria');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles) return;

    // Verificar tamanho dos arquivos - Supabase tem limite real de ~25MB
    const maxSizeBytes = 25 * 1024 * 1024; // 25MB limite real do Supabase
    const oversizedFiles = Array.from(uploadedFiles).filter(file => file.size > maxSizeBytes);
    
    if (oversizedFiles.length > 0) {
      const filesizesMB = oversizedFiles.map(f => `${f.name}: ${(f.size / 1024 / 1024).toFixed(1)}MB`);
      toast.error(`❌ Arquivos muito grandes (limite Supabase: 25MB):\n${filesizesMB.join('\n')}\n\n💡 Soluções:\n- Comprima o vídeo online (recomendado)\n- Use formato WebM ou MP4 otimizado\n- Reduza resolução/qualidade`);
      event.target.value = '';
      return;
    }

    setUploading(true);
    
    try {
      for (const file of Array.from(uploadedFiles)) {
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(2, 15);
        const fileName = `${timestamp}-${randomId}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        
        console.log(`📤 Uploading: ${fileName}, Size: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
        
        const { data, error: uploadError } = await supabase.storage
          .from('website-gallery')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: true
          });

        if (uploadError) {
          console.error('❌ Upload error:', uploadError);
          
          // Mensagem específica para limite de tamanho
          if (uploadError.message.includes('exceeded the maximum allowed size')) {
            throw new Error(`🚫 ${file.name} é muito grande para o Supabase (>${(file.size / 1024 / 1024).toFixed(1)}MB)\n\n✅ Comprima o vídeo em:\n- https://www.media.io/video-compressor.html\n- https://www.freeconvert.com/video-compressor\n- https://clideo.com/compress-video`);
          }
          
          throw new Error(`Falha no upload de ${file.name}: ${uploadError.message}`);
        }

        console.log('✅ Upload success:', data);
      }
      
      toast.success(`🎉 ${uploadedFiles.length} arquivo(s) enviado(s) com sucesso!`);
      loadFiles();
    } catch (error: any) {
      console.error('💥 Upload failed:', error);
      toast.error(error.message || 'Erro desconhecido no upload');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

const handleFileSelect = (file: MediaFile) => {
  if (allowMultiple) {
    if (selectedFiles.find(f => f.id === file.id)) {
      setSelectedFiles(prev => prev.filter(f => f.id !== file.id));
    } else {
      setSelectedFiles(prev => [...prev, file]);
    }
  } else {
    onSelect?.(file);
    if (!embedded) setIsDialogOpen(false);
  }
};

  const handleConfirmSelection = () => {
    if (selectedFiles.length > 0 && onSelect) {
      selectedFiles.forEach(file => onSelect(file));
      setIsDialogOpen(false);
      setSelectedFiles([]);
    }
  };

  const handleDeleteFile = async (file: MediaFile) => {
    if (!confirm(`Tem certeza que deseja excluir "${file.name}"?`)) return;

    try {
      const { error } = await supabase.storage
        .from('website-gallery')
        .remove([file.name]);

      if (error) throw error;

      toast.success('Arquivo excluído com sucesso!');
      loadFiles();
    } catch (error: any) {
      console.error('Erro ao excluir arquivo:', error);
      toast.error('Erro ao excluir arquivo');
    }
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || file.type === filterType;
    const matchesAccepted = acceptedTypes.includes(file.type);
    
    return matchesSearch && matchesType && matchesAccepted;
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <ImageIcon className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      default: return <File className="w-4 h-4" />;
    }
  };

return (
  embedded ? (
    <div className={`flex flex-col ${className}`}>
      <div className="flex flex-wrap gap-4 p-4 border-b">
        <div className="relative">
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*,video/*,.pdf,.doc,.docx"
          />
          <Button disabled={uploading} className="gap-2">
            <Upload className="w-4 h-4" />
            {uploading ? 'Enviando...' : 'Upload'}
          </Button>
        </div>

        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Buscar arquivos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="image">Imagens</SelectItem>
            <SelectItem value="video">Vídeos</SelectItem>
            <SelectItem value="file">Arquivos</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-1 border rounded">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Nenhum arquivo encontrado
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredFiles.map((file) => (
              <Card 
                key={file.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedFiles.find(f => f.id === file.id) ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleFileSelect(file)}
              >
                <CardContent className="p-2">
                  <div className="aspect-square mb-2 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                    {file.type === 'image' ? (
                      <img 
                        src={file.url} 
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-4xl text-gray-400">
                        {getFileIcon(file.type)}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium truncate" title={file.name}>
                      {file.name}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {file.type}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFile(file);
                        }}
                        className="p-1 h-auto hover:text-red-500"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredFiles.map((file) => (
              <Card 
                key={file.id}
                className={`cursor-pointer transition-all hover:shadow-sm ${
                  selectedFiles.find(f => f.id === file.id) ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleFileSelect(file)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                      {file.type === 'image' ? (
                        <img 
                          src={file.url} 
                          alt={file.name}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        getFileIcon(file.type)
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{file.name}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Badge variant="secondary">{file.type}</Badge>
                        <span>{formatFileSize(file.size)}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFile(file);
                      }}
                      className="hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {allowMultiple && selectedFiles.length > 0 && (
        <div className="border-t p-4 flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {selectedFiles.length} arquivo(s) selecionado(s)
          </span>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setSelectedFiles([])}
            >
              Limpar
            </Button>
            <Button onClick={handleConfirmSelection}>
              Confirmar Seleção
            </Button>
          </div>
        </div>
      )}
    </div>
  ) : (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <ImageIcon className="w-4 h-4" />
          Galeria do Site
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Galeria Universal do Site</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex flex-wrap gap-4 p-4 border-b">
            <div className="relative">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*,video/*,.pdf,.doc,.docx"
              />
              <Button disabled={uploading} className="gap-2">
                <Upload className="w-4 h-4" />
                {uploading ? 'Enviando...' : 'Upload'}
              </Button>
            </div>

            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar arquivos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="image">Imagens</SelectItem>
                <SelectItem value="video">Vídeos</SelectItem>
                <SelectItem value="file">Arquivos</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-1 border rounded">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : filteredFiles.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Nenhum arquivo encontrado
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredFiles.map((file) => (
                  <Card 
                    key={file.id} 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedFiles.find(f => f.id === file.id) ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => handleFileSelect(file)}
                  >
                    <CardContent className="p-2">
                      <div className="aspect-square mb-2 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                        {file.type === 'image' ? (
                          <img 
                            src={file.url} 
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-4xl text-gray-400">
                            {getFileIcon(file.type)}
                          </div>
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium truncate" title={file.name}>
                          {file.name}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            {file.type}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteFile(file);
                            }}
                            className="p-1 h-auto hover:text-red-500"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredFiles.map((file) => (
                  <Card 
                    key={file.id}
                    className={`cursor-pointer transition-all hover:shadow-sm ${
                      selectedFiles.find(f => f.id === file.id) ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => handleFileSelect(file)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                          {file.type === 'image' ? (
                            <img 
                              src={file.url} 
                              alt={file.name}
                              className="w-full h-full object-cover rounded"
                            />
                          ) : (
                            getFileIcon(file.type)
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{file.name}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Badge variant="secondary">{file.type}</Badge>
                            <span>{formatFileSize(file.size)}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteFile(file);
                          }}
                          className="hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {allowMultiple && selectedFiles.length > 0 && (
            <div className="border-t p-4 flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {selectedFiles.length} arquivo(s) selecionado(s)
              </span>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedFiles([])}
                >
                  Limpar
                </Button>
                <Button onClick={handleConfirmSelection}>
                  Confirmar Seleção
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
);
};