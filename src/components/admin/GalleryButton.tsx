import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { UniversalGallery } from './UniversalGallery';

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

interface GalleryButtonProps {
  onSelect: (url: string) => void;
  disabled?: boolean;
  variant?: 'outline' | 'default' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  acceptedTypes?: ('image' | 'video' | 'file')[];
}

export const GalleryButton: React.FC<GalleryButtonProps> = ({
  onSelect,
  disabled = false,
  variant = 'outline',
  size = 'sm',
  className = '',
  acceptedTypes,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleImageSelect = (file: MediaFile) => {
    onSelect(file.url);
    setIsOpen(false);
  };

  return (
    <>
      <Button
        type="button"
        variant={variant}
        size={size}
        onClick={() => setIsOpen(true)}
        disabled={disabled}
        className={className}
      >
        📁 Galeria
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-6xl h-[85vh] p-2">
          <DialogHeader className="px-4 pt-4">
            <DialogTitle>Galeria de Imagens</DialogTitle>
          </DialogHeader>
          <div className="h-full overflow-y-auto p-4">
            <UniversalGallery onSelect={handleImageSelect} embedded acceptedTypes={acceptedTypes || ['image','video','file']} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};