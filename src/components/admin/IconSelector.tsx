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
  Car, Plane, Ship, Bike, Train, Bus, CreditCard, Wallet,
  Store, Newspaper, PenTool, Palette, Headphones, Gamepad2,
  Dumbbell, Utensils, Pizza, Cake, Wine, Stethoscope,
  GraduationCap, Users, Building, Factory, Hammer, Wrench,
  ShieldCheck, Crown, Diamond, Gem, Coins, DollarSign,
  Percent, Calculator, BarChart3, TrendingUp, Megaphone,
  Mic, Radio, Tv, Monitor, Printer, FileText,
  Database, Server, Cloud, Wifi, Bluetooth, Battery,
  Lightbulb, Flame, Snowflake, Umbrella, TreePine, Flower2,
  Fish, Cat, Dog, Bird, Bug, Leaf, Sprout, Apple,
  Banana, Cherry, Grape, Citrus, IceCream2, IceCream,
  Cookie, Candy, Baby, Shirt, Glasses, Watch, Circle,
  Key, Scissors, Ruler, Compass, Magnet, Flashlight
} from 'lucide-react';

const iconOptions = [
  // Redes Sociais e Contato
  { name: 'link', icon: Link, label: 'Link' },
  { name: 'phone', icon: Phone, label: 'Telefone' },
  { name: 'mail', icon: Mail, label: 'Email' },
  { name: 'instagram', icon: Instagram, label: 'Instagram' },
  { name: 'facebook', icon: Facebook, label: 'Facebook' },
  { name: 'twitter', icon: Twitter, label: 'Twitter' },
  { name: 'youtube', icon: Youtube, label: 'YouTube' },
  { name: 'message-circle', icon: MessageCircle, label: 'Mensagem' },
  { name: 'share', icon: Share, label: 'Compartilhar' },
  
  // Básicos e Interface
  { name: 'home', icon: Home, label: 'Casa' },
  { name: 'user', icon: User, label: 'Usuário' },
  { name: 'users', icon: Users, label: 'Usuários' },
  { name: 'heart', icon: Heart, label: 'Coração' },
  { name: 'star', icon: Star, label: 'Estrela' },
  { name: 'settings', icon: Settings, label: 'Configurações' },
  { name: 'search', icon: Search, label: 'Buscar' },
  { name: 'plus', icon: Plus, label: 'Plus' },
  { name: 'menu', icon: Menu, label: 'Menu' },
  { name: 'eye', icon: Eye, label: 'Visualizar' },
  { name: 'info', icon: Info, label: 'Info' },
  { name: 'help-circle', icon: HelpCircle, label: 'Ajuda' },
  
  // Mídia e Entretenimento
  { name: 'camera', icon: Camera, label: 'Câmera' },
  { name: 'music', icon: Music, label: 'Música' },
  { name: 'headphones', icon: Headphones, label: 'Fones' },
  { name: 'mic', icon: Mic, label: 'Microfone' },
  { name: 'radio', icon: Radio, label: 'Rádio' },
  { name: 'tv', icon: Tv, label: 'TV' },
  { name: 'monitor', icon: Monitor, label: 'Monitor' },
  { name: 'gamepad-2', icon: Gamepad2, label: 'Games' },
  { name: 'image', icon: Image, label: 'Imagem' },
  { name: 'video', icon: Video, label: 'Vídeo' },
  { name: 'play', icon: Play, label: 'Play' },
  { name: 'pause', icon: Pause, label: 'Pausar' },
  
  // Negócios e Finanças
  { name: 'briefcase', icon: Briefcase, label: 'Maleta' },
  { name: 'building', icon: Building, label: 'Empresa' },
  { name: 'store', icon: Store, label: 'Loja' },
  { name: 'credit-card', icon: CreditCard, label: 'Cartão' },
  { name: 'wallet', icon: Wallet, label: 'Carteira' },
  { name: 'coins', icon: Coins, label: 'Moedas' },
  { name: 'dollar-sign', icon: DollarSign, label: 'Dinheiro' },
  { name: 'percent', icon: Percent, label: 'Desconto' },
  { name: 'calculator', icon: Calculator, label: 'Calculadora' },
  { name: 'bar-chart-3', icon: BarChart3, label: 'Gráfico' },
  { name: 'trending-up', icon: TrendingUp, label: 'Crescimento' },
  { name: 'target', icon: Target, label: 'Meta' },
  { name: 'award', icon: Award, label: 'Prêmio' },
  { name: 'crown', icon: Crown, label: 'Premium' },
  
  // Compras e E-commerce
  { name: 'shopping-cart', icon: ShoppingCart, label: 'Carrinho' },
  { name: 'gift', icon: Gift, label: 'Presente' },
  { name: 'truck', icon: Truck, label: 'Entrega' },
  { name: 'package', icon: ShoppingCart, label: 'Produto' },
  
  // Educação e Aprendizado
  { name: 'book', icon: Book, label: 'Livro' },
  { name: 'graduation-cap', icon: GraduationCap, label: 'Educação' },
  { name: 'pen-tool', icon: PenTool, label: 'Escrita' },
  { name: 'newspaper', icon: Newspaper, label: 'Notícia' },
  
  // Saúde e Bem-estar
  { name: 'stethoscope', icon: Stethoscope, label: 'Saúde' },
  { name: 'dumbbell', icon: Dumbbell, label: 'Fitness' },
  { name: 'heart', icon: Heart, label: 'Saúde' },
  
  // Comida e Bebida
  { name: 'coffee', icon: Coffee, label: 'Café' },
  { name: 'utensils', icon: Utensils, label: 'Restaurante' },
  { name: 'pizza', icon: Pizza, label: 'Pizza' },
  { name: 'cake', icon: Cake, label: 'Bolo' },
  { name: 'wine', icon: Wine, label: 'Bebida' },
  { name: 'ice-cream', icon: IceCream, label: 'Sorvete' },
  { name: 'cookie', icon: Cookie, label: 'Biscoito' },
  { name: 'candy', icon: Candy, label: 'Doce' },
  { name: 'apple', icon: Apple, label: 'Maçã' },
  { name: 'banana', icon: Banana, label: 'Banana' },
  { name: 'cherry', icon: Cherry, label: 'Cereja' },
  { name: 'grape', icon: Grape, label: 'Uva' },
  { name: 'citrus', icon: Citrus, label: 'Fruta' },
  
  // Tecnologia
  { name: 'smartphone', icon: Smartphone, label: 'Celular' },
  { name: 'laptop', icon: Laptop, label: 'Laptop' },
  { name: 'tablet', icon: Tablet, label: 'Tablet' },
  { name: 'wifi', icon: Wifi, label: 'WiFi' },
  { name: 'bluetooth', icon: Bluetooth, label: 'Bluetooth' },
  { name: 'battery', icon: Battery, label: 'Bateria' },
  { name: 'database', icon: Database, label: 'Dados' },
  { name: 'server', icon: Server, label: 'Servidor' },
  { name: 'cloud', icon: Cloud, label: 'Nuvem' },
  
  // Localização e Tempo
  { name: 'map-pin', icon: MapPin, label: 'Localização' },
  { name: 'calendar', icon: Calendar, label: 'Calendário' },
  { name: 'clock', icon: Clock, label: 'Horário' },
  { name: 'bell', icon: Bell, label: 'Notificação' },
  { name: 'globe', icon: Globe, label: 'Website' },
  
  // Transporte
  { name: 'car', icon: Car, label: 'Carro' },
  { name: 'plane', icon: Plane, label: 'Avião' },
  { name: 'ship', icon: Ship, label: 'Navio' },
  { name: 'bike', icon: Bike, label: 'Bicicleta' },
  { name: 'train-front', icon: Train, label: 'Trem' },
  { name: 'bus', icon: Bus, label: 'Ônibus' },
  
  // Ferramentas e Utilitários
  { name: 'wrench', icon: Wrench, label: 'Ferramenta' },
  { name: 'hammer', icon: Hammer, label: 'Construção' },
  { name: 'scissors', icon: Scissors, label: 'Cortar' },
  { name: 'ruler', icon: Ruler, label: 'Régua' },
  { name: 'compass', icon: Compass, label: 'Bússola' },
  { name: 'key', icon: Key, label: 'Chave' },
  { name: 'lock', icon: Lock, label: 'Segurança' },
  { name: 'shield-check', icon: ShieldCheck, label: 'Proteção' },
  { name: 'flashlight', icon: Flashlight, label: 'Lanterna' },
  { name: 'lightbulb', icon: Lightbulb, label: 'Ideia' },
  
  // Natureza
  { name: 'tree-pine', icon: TreePine, label: 'Árvore' },
  { name: 'flower-2', icon: Flower2, label: 'Flor' },
  { name: 'leaf', icon: Leaf, label: 'Folha' },
  { name: 'sprout', icon: Sprout, label: 'Broto' },
  { name: 'sun', icon: Sun, label: 'Sol' },
  { name: 'moon', icon: Moon, label: 'Lua' },
  { name: 'snowflake', icon: Snowflake, label: 'Neve' },
  { name: 'umbrella', icon: Umbrella, label: 'Chuva' },
  { name: 'flame', icon: Flame, label: 'Fogo' },
  
  // Animais
  { name: 'cat', icon: Cat, label: 'Gato' },
  { name: 'dog', icon: Dog, label: 'Cachorro' },
  { name: 'bird', icon: Bird, label: 'Pássaro' },
  { name: 'fish', icon: Fish, label: 'Peixe' },
  { name: 'bug', icon: Bug, label: 'Inseto' },
  
  // Moda e Acessórios
  { name: 'shirt', icon: Shirt, label: 'Roupa' },
  { name: 'glasses', icon: Glasses, label: 'Óculos' },
  { name: 'watch', icon: Watch, label: 'Relógio' },
  { name: 'gem', icon: Gem, label: 'Joia' },
  { name: 'diamond', icon: Diamond, label: 'Diamante' },
  { name: 'circle', icon: Circle, label: 'Anel' },
  
  // Arquivos e Sistema
  { name: 'file', icon: File, label: 'Arquivo' },
  { name: 'folder', icon: Folder, label: 'Pasta' },
  { name: 'download', icon: Download, label: 'Download' },
  { name: 'upload', icon: Upload, label: 'Upload' },
  { name: 'printer', icon: Printer, label: 'Imprimir' },
  { name: 'file-text', icon: FileText, label: 'Documento' },
  
  // Ações
  { name: 'edit', icon: Edit, label: 'Editar' },
  { name: 'trash-2', icon: Trash2, label: 'Excluir' },
  { name: 'check', icon: Check, label: 'Confirmar' },
  { name: 'x', icon: X, label: 'Cancelar' },
  { name: 'arrow-right', icon: ArrowRight, label: 'Avançar' },
  { name: 'arrow-left', icon: ArrowLeft, label: 'Voltar' },
  { name: 'chevron-right', icon: ChevronRight, label: 'Próximo' },
  
  // Comunicação
  { name: 'megaphone', icon: Megaphone, label: 'Anúncio' },
  { name: 'volume-2', icon: Volume2, label: 'Som' },
  { name: 'zap', icon: Zap, label: 'Energia' },
  { name: 'magnet', icon: Magnet, label: 'Ímã' },
  
  // Outros
  { name: 'baby', icon: Baby, label: 'Bebê' },
  { name: 'palette', icon: Palette, label: 'Arte' },
  { name: 'factory', icon: Factory, label: 'Indústria' }
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