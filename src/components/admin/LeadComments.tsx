import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trash2, MessageSquare, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  lead_id: string;
  content: string;
  author: string;
  created_at: string;
  updated_at: string;
}

interface LeadCommentsProps {
  leadId: string;
}

export const LeadComments: React.FC<LeadCommentsProps> = ({ leadId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Carregar comentários do lead
  const loadComments = async () => {
    try {
      setIsLoading(true);
      
      // Buscar comentários na tabela conversion_events com event_type 'comment'
      const { data, error } = await supabase
        .from('conversion_events')
        .select('*')
        .eq('event_type', 'comment')
        .eq('form_id', leadId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Transformar dados para o formato de comentário
      const formattedComments = data?.map(item => {
        const leadData = item.lead_data as any;
        return {
          id: item.id,
          lead_id: leadId,
          content: leadData?.comment || '',
          author: leadData?.author || 'Admin',
          created_at: item.created_at,
          updated_at: item.timestamp
        };
      }) || [];

      setComments(formattedComments);
    } catch (error) {
      console.error('Erro ao carregar comentários:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao carregar comentários do lead"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Adicionar novo comentário
  const addComment = async () => {
    if (!newComment.trim()) return;

    try {
      setIsSubmitting(true);

      const commentData = {
        session_id: `comment_${Date.now()}`,
        event_type: 'comment',
        event_action: 'add_comment',
        form_id: leadId,
        page_url: '/admin/leads',
        lead_data: {
          comment: newComment.trim(),
          author: 'Admin',
          timestamp: new Date().toISOString()
        }
      };

      const { error } = await supabase
        .from('conversion_events')
        .insert([commentData]);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Comentário adicionado com sucesso"
      });

      setNewComment('');
      loadComments();
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao adicionar comentário"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Remover comentário
  const removeComment = async (commentId: string) => {
    try {
      const { error } = await supabase
        .from('conversion_events')
        .delete()
        .eq('id', commentId);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Comentário removido com sucesso"
      });

      loadComments();
    } catch (error) {
      console.error('Erro ao remover comentário:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao remover comentário"
      });
    }
  };

  useEffect(() => {
    loadComments();
  }, [leadId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Comentários ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Lista de comentários */}
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {isLoading ? (
            <div className="text-center text-muted-foreground py-4">
              Carregando comentários...
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center text-muted-foreground py-4">
              Nenhum comentário ainda
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-3 p-3 bg-muted/30 rounded-lg">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {comment.author.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{comment.author}</span>
                      <Badge variant="outline" className="text-xs">
                        {new Date(comment.created_at).toLocaleDateString('pt-BR')} às{' '}
                        {new Date(comment.created_at).toLocaleTimeString('pt-BR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeComment(comment.id)}
                      className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">{comment.content}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Adicionar novo comentário */}
        <div className="space-y-3 border-t pt-3">
          <Textarea
            placeholder="Adicione um comentário..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            className="resize-none"
          />
          <div className="flex justify-end">
            <Button
              onClick={addComment}
              disabled={!newComment.trim() || isSubmitting}
              size="sm"
              className="flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? 'Enviando...' : 'Adicionar Comentário'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};