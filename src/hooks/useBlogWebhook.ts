
import { useBlogAutomation } from './useBlogAutomation';
import { useToast } from './use-toast';

export const useBlogWebhook = () => {
  const { processWebhookData } = useBlogAutomation();
  const { toast } = useToast();

  // Simula o processamento do webhook
  const handleWebhookRequest = async (data: any) => {
    console.log('Webhook recebido:', data);
    
    try {
      const result = processWebhookData(data);
      
      if (result.success) {
        toast({
          title: "Post Criado!",
          description: `Post "${result.post?.title}" foi criado com sucesso.`,
        });
        
        // Recarrega a página do blog se estiver aberta
        if (window.location.pathname.includes('/blog')) {
          window.location.reload();
        }
        
        return { success: true, message: 'Post criado com sucesso' };
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Erro no webhook:', error);
      toast({
        title: "Erro",
        description: "Falha ao processar dados do webhook",
        variant: "destructive",
      });
      
      return { success: false, error: 'Erro ao processar webhook' };
    }
  };

  return {
    handleWebhookRequest
  };
};
