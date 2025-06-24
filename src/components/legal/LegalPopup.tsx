
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';
import { useTheme } from '../ThemeProvider';
import { FileText, Shield, Eye } from 'lucide-react';

interface LegalPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const LegalPopup: React.FC<LegalPopupProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [accepted, setAccepted] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const handleAccept = () => {
    if (accepted) {
      localStorage.setItem('legal-terms-accepted', 'true');
      onClose();
    }
  };

  const privacyPolicyContent = `
    POLÍTICA DE PRIVACIDADE

    1. INFORMAÇÕES GERAIS
    Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações pessoais.

    2. COLETA DE DADOS
    Coletamos informações quando você:
    - Entra em contato conosco através dos formulários
    - Navega em nosso site
    - Se inscreve em nossos serviços

    3. USO DAS INFORMAÇÕES
    Utilizamos suas informações para:
    - Responder às suas solicitações
    - Melhorar nossos serviços
    - Comunicações relacionadas aos serviços jurídicos

    4. PROTEÇÃO DE DADOS
    Implementamos medidas de segurança adequadas para proteger suas informações pessoais contra acesso não autorizado.

    5. SEUS DIREITOS
    Você tem o direito de acessar, corrigir ou excluir suas informações pessoais a qualquer momento.

    6. CONTATO
    Para questões sobre privacidade, entre em contato: contato@stadv.com
  `;

  const termsContent = `
    TERMOS DE USO

    1. ACEITAÇÃO DOS TERMOS
    Ao usar este site, você concorda com estes Termos de Uso.

    2. SERVIÇOS JURÍDICOS
    Os serviços jurídicos são fornecidos exclusivamente pelos advogados licenciados do escritório.

    3. RESPONSABILIDADES DO USUÁRIO
    Você se compromete a:
    - Fornecer informações verdadeiras
    - Usar o site de forma legal e ética
    - Respeitar os direitos de propriedade intelectual

    4. LIMITAÇÃO DE RESPONSABILIDADE
    O escritório não se responsabiliza por danos indiretos ou consequenciais.

    5. MODIFICAÇÕES
    Estes termos podem ser modificados a qualquer momento, com notificação prévia.

    6. LEI APLICÁVEL
    Estes termos são regidos pelas leis brasileiras.

    7. CONTATO
    Para questões legais, entre em contato: contato@stadv.com
  `;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-2xl max-h-[80vh] overflow-hidden ${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}>
        <DialogHeader>
          <DialogTitle className={`text-2xl font-semibold flex items-center gap-2 ${isDark ? 'text-white' : 'text-black'}`}>
            <Shield className="w-6 h-6" />
            Termos e Política de Privacidade
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!showPrivacyPolicy && !showTerms && (
            <>
              <div className={`p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                <p className={`text-sm ${isDark ? 'text-white/80' : 'text-gray-600'}`}>
                  Para continuar usando nossos serviços, você precisa aceitar nossos Termos de Uso e Política de Privacidade.
                </p>
              </div>

              <div className="space-y-4">
                <Button
                  variant="outline"
                  onClick={() => setShowPrivacyPolicy(true)}
                  className={`w-full justify-between ${isDark ? 'border-white/20 text-white hover:bg-white/10' : 'border-gray-200 text-black hover:bg-gray-50'}`}
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Política de Privacidade
                  </span>
                  <Eye className="w-4 h-4" />
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setShowTerms(true)}
                  className={`w-full justify-between ${isDark ? 'border-white/20 text-white hover:bg-white/10' : 'border-gray-200 text-black hover:bg-gray-50'}`}
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Termos de Uso
                  </span>
                  <Eye className="w-4 h-4" />
                </Button>
              </div>

              <Separator className={isDark ? 'bg-white/20' : 'bg-gray-200'} />

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="accept-terms"
                  checked={accepted}
                  onCheckedChange={(checked) => setAccepted(checked as boolean)}
                />
                <label
                  htmlFor="accept-terms"
                  className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${isDark ? 'text-white' : 'text-black'}`}
                >
                  Eu li e aceito os Termos de Uso e Política de Privacidade
                </label>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className={`flex-1 ${isDark ? 'border-white/20 text-white hover:bg-white/10' : 'border-gray-200 text-black hover:bg-gray-50'}`}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleAccept}
                  disabled={!accepted}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Aceitar e Continuar
                </Button>
              </div>
            </>
          )}

          {showPrivacyPolicy && (
            <div className="space-y-4">
              <Button
                variant="ghost"
                onClick={() => setShowPrivacyPolicy(false)}
                className={`text-sm ${isDark ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-black'}`}
              >
                ← Voltar
              </Button>
              <div className={`max-h-96 overflow-y-auto p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                <pre className={`whitespace-pre-wrap text-sm ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                  {privacyPolicyContent}
                </pre>
              </div>
            </div>
          )}

          {showTerms && (
            <div className="space-y-4">
              <Button
                variant="ghost"
                onClick={() => setShowTerms(false)}
                className={`text-sm ${isDark ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-black'}`}
              >
                ← Voltar
              </Button>
              <div className={`max-h-96 overflow-y-auto p-4 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                <pre className={`whitespace-pre-wrap text-sm ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                  {termsContent}
                </pre>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LegalPopup;
