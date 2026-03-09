import React, { useState } from 'react';
import {
  Shield, Clock, Award, Check, Lock, Star, Heart, Zap,
  AlertCircle, Users, Phone, ThumbsUp, TrendingUp, Sparkles,
  Target, Rocket, Eye, Ban, HelpCircle, Info, X, CheckCircle,
  ArrowRight, MessageCircle
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

const ICONS: Record<string, React.FC<{ className?: string }>> = {
  shield: Shield, clock: Clock, award: Award, check: Check,
  lock: Lock, star: Star, heart: Heart, zap: Zap,
  alert: AlertCircle, users: Users, phone: Phone, thumbsup: ThumbsUp,
  trending: TrendingUp, sparkles: Sparkles, target: Target, rocket: Rocket,
  eye: Eye, ban: Ban, help: HelpCircle, info: Info,
  x: X, 'check-circle': CheckCircle, arrow: ArrowRight, whatsapp: MessageCircle,
};

interface IconPickerFieldProps {
  value?: string;
  onChange: (icon: string) => void;
}

export const IconPickerField: React.FC<IconPickerFieldProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const SelectedIcon = value ? ICONS[value] || Shield : Shield;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 w-full justify-start gap-2 text-xs">
          <SelectedIcon className="w-4 h-4 text-primary" />
          <span className="truncate">{value || 'Selecionar ícone'}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-2" align="start">
        <div className="grid grid-cols-6 gap-1">
          {Object.entries(ICONS).map(([name, Icon]) => (
            <button
              key={name}
              onClick={() => { onChange(name); setOpen(false); }}
              className={`p-2 rounded-md transition-colors ${
                value === name
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              }`}
              title={name}
            >
              <Icon className="w-4 h-4 mx-auto" />
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
