import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Link, Phone, Mail, Instagram, Facebook, Twitter, Youtube, 
  Home, User, Heart, Star, Camera, Music, Book, Coffee,
  MapPin, Calendar, Clock, Bell, Settings, Search, Plus,
  ShoppingCart, Zap, Truck, Gift, Award, Target, Briefcase,
  Globe, MessageCircle, Share, Download, Upload, Play,
  Pause, Volume2, Image, Video, File, Folder, Edit,
  Trash2, Check, X, ArrowRight, ArrowLeft, ChevronRight,
  Menu, Eye, EyeOff, Lock, Unlock, Info, AlertCircle,
  HelpCircle, Sun, Moon, Smartphone, Laptop, Tablet,
  Car, Plane, Ship, Bike, Train, Bus
} from 'lucide-react';

const iconOptions = [
  { name: 'link', icon: Link, label: 'Link' },
  { name: 'phone', icon: Phone, label: 'Telefone' },
  { name: 'mail', icon: Mail, label: 'Email' },
  { name: 'instagram', icon: Instagram, label: 'Instagram' },
  { name: 'facebook', icon: Facebook, label: 'Facebook' },
  { name: 'twitter', icon: Twitter, label: 'Twitter' },
  { name: 'youtube', icon: Youtube, label: 'YouTube' },
  { name: 'home', icon: Home, label: 'Casa' },
  { name: 'user', icon: User, label: 'Usuário' },
  { name: 'heart', icon: Heart, label: 'Coração' },
  { name: 'star', icon: Star, label: 'Estrela' },
  { name: 'camera', icon: Camera, label: 'Câmera' },
  { name: 'music', icon: Music, label: 'Música' },
  { name: 'book', icon: Book, label: 'Livro' },
  { name: 'coffee', icon: Coffee, label: 'Café' },
  { name: 'map-pin', icon: MapPin, label: 'Localização' },
  { name: 'calendar', icon: Calendar, label: 'Calendário' },
  { name: 'clock', icon: Clock, label: 'Relógio' },
  { name: 'bell', icon: Bell, label: 'Sino' },
  { name: 'settings', icon: Settings, label: 'Configurações' },
  { name: 'search', icon: Search, label: 'Buscar' },
  { name: 'plus', icon: Plus, label: 'Plus' },
  { name: 'shopping-cart', icon: ShoppingCart, label: 'Carrinho' },
  { name: 'zap', icon: Zap, label: 'Energia' },
  { name: 'truck', icon: Truck, label: 'Caminhão' },
  { name: 'gift', icon: Gift, label: 'Presente' },
  { name: 'award', icon: Award, label: 'Prêmio' },
  { name: 'target', icon: Target, label: 'Alvo' },
  { name: 'briefcase', icon: Briefcase, label: 'Maleta' },
  { name: 'globe', icon: Globe, label: 'Globo' },
  { name: 'message-circle', icon: MessageCircle, label: 'Mensagem' },
  { name: 'share', icon: Share, label: 'Compartilhar' },
  { name: 'download', icon: Download, label: 'Download' },
  { name: 'upload', icon: Upload, label: 'Upload' },
  { name: 'play', icon: Play, label: 'Play' },
  { name: 'pause', icon: Pause, label: 'Pausar' },
  { name: 'volume-2', icon: Volume2, label: 'Volume' },
  { name: 'image', icon: Image, label: 'Imagem' },
  { name: 'video', icon: Video, label: 'Vídeo' },
  { name: 'file', icon: File, label: 'Arquivo' },
  { name: 'folder', icon: Folder, label: 'Pasta' },
  { name: 'edit', icon: Edit, label: 'Editar' },
  { name: 'trash-2', icon: Trash2, label: 'Lixeira' },
  { name: 'check', icon: Check, label: 'Check' },
  { name: 'x', icon: X, label: 'Fechar' },
  { name: 'arrow-right', icon: ArrowRight, label: 'Seta Direita' },
  { name: 'arrow-left', icon: ArrowLeft, label: 'Seta Esquerda' },
  { name: 'chevron-right', icon: ChevronRight, label: 'Chevron' },
  { name: 'menu', icon: Menu, label: 'Menu' },
  { name: 'eye', icon: Eye, label: 'Olho' },
  { name: 'eye-off', icon: EyeOff, label: 'Olho Fechado' },
  { name: 'lock', icon: Lock, label: 'Bloqueado' },
  { name: 'unlock', icon: Unlock, label: 'Desbloqueado' },
  { name: 'info', icon: Info, label: 'Info' },
  { name: 'alert-circle', icon: AlertCircle, label: 'Alerta' },
  { name: 'help-circle', icon: HelpCircle, label: 'Ajuda' },
  { name: 'sun', icon: Sun, label: 'Sol' },
  { name: 'moon', icon: Moon, label: 'Lua' },
  { name: 'smartphone', icon: Smartphone, label: 'Smartphone' },
  { name: 'laptop', icon: Laptop, label: 'Laptop' },
  { name: 'tablet', icon: Tablet, label: 'Tablet' },
  { name: 'car', icon: Car, label: 'Carro' },
  { name: 'plane', icon: Plane, label: 'Avião' },
  { name: 'ship', icon: Ship, label: 'Navio' },
  { name: 'bike', icon: Bike, label: 'Bicicleta' },
  { name: 'train-front', icon: Train, label: 'Trem' },
  { name: 'bus', icon: Bus, label: 'Ônibus' }
];

interface IconSelectorProps {
  value: string;
  onChange: (iconName: string) => void;
  label?: string;
}

export function IconSelector({ value, onChange, label = "Ícone" }: IconSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const selectedIcon = iconOptions.find(icon => icon.name === value);
  const SelectedIconComponent = selectedIcon?.icon || Link;

  const filteredIcons = iconOptions.filter(icon =>
    icon.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    icon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIconSelect = (iconName: string) => {
    onChange(iconName);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div>
      <Label>{label}</Label>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full justify-start gap-2 h-10">
            <SelectedIconComponent size={16} />
            <span>{selectedIcon?.label || 'Selecionar ícone'}</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Selecionar Ícone</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Buscar ícones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
            <ScrollArea className="h-96">
              <div className="grid grid-cols-6 gap-2 p-2">
                {filteredIcons.map((iconOption) => {
                  const IconComponent = iconOption.icon;
                  const isSelected = value === iconOption.name;
                  
                  return (
                    <Button
                      key={iconOption.name}
                      variant={isSelected ? "default" : "ghost"}
                      className="flex flex-col items-center gap-1 p-3 h-auto aspect-square"
                      onClick={() => handleIconSelect(iconOption.name)}
                      title={iconOption.label}
                    >
                      <IconComponent size={20} />
                      <span className="text-xs truncate w-full text-center">
                        {iconOption.label}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}