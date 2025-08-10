import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Plus, Edit, Trash2, Star, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../../integrations/supabase/client';
import { toast } from 'sonner';
import { ImageGallery } from './ImageGallery';

interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  image_url?: string;
  position?: string;
  company?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const TestimonialsManager: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    text: '',
    rating: 5,
    image_url: '',
    position: '',
    company: '',
    is_active: true
  });

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Erro ao carregar depoimentos:', error);
      toast.error('Erro ao carregar depoimentos');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingTestimonial) {
        // Atualizar depoimento existente
        const { error } = await supabase
          .from('testimonials')
          .update(formData)
          .eq('id', editingTestimonial.id);

        if (error) throw error;
        toast.success('Depoimento atualizado com sucesso!');
      } else {
        // Criar novo depoimento
        const { error } = await supabase
          .from('testimonials')
          .insert([formData]);

        if (error) throw error;
        toast.success('Depoimento criado com sucesso!');
      }

      setIsDialogOpen(false);
      setEditingTestimonial(null);
      resetForm();
      loadTestimonials();
    } catch (error) {
      console.error('Erro ao salvar depoimento:', error);
      toast.error('Erro ao salvar depoimento');
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      text: testimonial.text,
      rating: testimonial.rating,
      image_url: testimonial.image_url || '',
      position: testimonial.position || '',
      company: testimonial.company || '',
      is_active: testimonial.is_active
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este depoimento?')) return;

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Depoimento excluído com sucesso!');
      loadTestimonials();
    } catch (error) {
      console.error('Erro ao excluir depoimento:', error);
      toast.error('Erro ao excluir depoimento');
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      toast.success(`Depoimento ${!currentStatus ? 'ativado' : 'desativado'} com sucesso!`);
      loadTestimonials();
    } catch (error) {
      console.error('Erro ao alterar status:', error);
      toast.error('Erro ao alterar status do depoimento');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      text: '',
      rating: 5,
      image_url: '',
      position: '',
      company: '',
      is_active: true
    });
  };

  const handleOpenDialog = () => {
    resetForm();
    setEditingTestimonial(null);
    setIsDialogOpen(true);
  };

  const handleImageSelect = (imageUrl: string) => {
    setFormData(prev => ({ ...prev, image_url: imageUrl }));
    setIsGalleryOpen(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Gerenciar Depoimentos</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleOpenDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Novo Depoimento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingTestimonial ? 'Editar Depoimento' : 'Novo Depoimento'}
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="text">Depoimento</Label>
                  <Textarea
                    id="text"
                    value={formData.text}
                    onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
                    required
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="rating">Avaliação</Label>
                  <Select 
                    value={formData.rating.toString()} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, rating: parseInt(value) }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map(rating => (
                        <SelectItem key={rating} value={rating.toString()}>
                          <div className="flex items-center gap-2">
                            {renderStars(rating)}
                            <span>({rating} estrelas)</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="position">Cargo</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="company">Empresa</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>Imagem do Cliente</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      value={formData.image_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                      placeholder="URL da imagem ou selecione da galeria"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setIsGalleryOpen(true)}
                    >
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                  />
                  <Label htmlFor="is_active">Ativo</Label>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {editingTestimonial ? 'Atualizar' : 'Criar'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {testimonials.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Nenhum depoimento cadastrado
            </p>
          ) : (
            testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="relative">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {testimonial.image_url && (
                          <img
                            src={testimonial.image_url}
                            alt={testimonial.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          {(testimonial.position || testimonial.company) && (
                            <p className="text-sm text-muted-foreground">
                              {testimonial.position} {testimonial.company && `- ${testimonial.company}`}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        {renderStars(testimonial.rating)}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{testimonial.text}</p>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant={testimonial.is_active ? "default" : "secondary"}>
                          {testimonial.is_active ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(testimonial)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleActive(testimonial.id, testimonial.is_active)}
                      >
                        <Switch checked={testimonial.is_active} />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(testimonial.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>

      <ImageGallery
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        onSelectImage={handleImageSelect}
        selectedImage={formData.image_url}
      />
    </Card>
  );
};