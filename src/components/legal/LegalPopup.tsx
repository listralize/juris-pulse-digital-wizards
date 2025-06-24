
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';
import { useTheme } from '../ThemeProvider';
import { FileText, Shield, Eye, X } from 'lucide-react';

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

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] max-w-sm">
      <div className={`rounded-lg shadow-2xl border backdrop-blur-md ${
        isDark ? 'bg-black/95 border-white/20 text-white' : 'bg-white/95 border-gray-200 text-black'
      }`}>
        {!showPrivacyPolicy && !showTerms && (
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <h3 className="text-sm font-semibold">Termos e Privacidade</h3>
              </div>
              <button
                onClick={onClose}
                className={`p-1 rounded-full transition-colors ${
                  isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'
                }`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            <p className={`text-xs mb-3 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
              Para continuar, aceite nossos termos.
            </p>

            <div className="space-y-2 mb-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPrivacyPolicy(true)}
                className={`w-full justify-between text-xs h-8 ${
                  isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'
                }`}
              >
                <span className="flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  Política de Privacidade
                </span>
                <Eye className="w-3 h-3" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTerms(true)}
                className={`w-full justify-between text-xs h-8 ${
                  isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'
                }`}
              >
                <span className="flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  Termos de Uso
                </span>
                <Eye className="w-3 h-3" />
              </Button>
            </div>

            <div className="flex items-center space-x-2 mb-3">
              <Checkbox
                id="accept-terms"
                checked={accepted}
                onCheckedChange={(checked) => setAccepted(checked as boolean)}
                className="w-3 h-3"
              />
              <label
                htmlFor="accept-terms"
                className="text-xs leading-none cursor-pointer"
              >
                Aceito os termos
              </label>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className={`flex-1 text-xs h-7 ${
                  isDark ? 'border-white/20 hover:bg-white/10' : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                Depois
              </Button>
              <Button
                onClick={handleAccept}
                disabled={!accepted}
                size="sm"
                className="flex-1 text-xs h-7 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Aceitar
              </Button>
            </div>
          </div>
        )}

        {showPrivacyPolicy && (
          <div className="p-4 max-h-96">
            <div className="flex items-center justify-between mb-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPrivacyPolicy(false)}
                className="text-xs p-1 h-auto"
              >
                ← Voltar
              </Button>
              <button
                onClick={onClose}
                className={`p-1 rounded-full transition-colors ${
                  isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'
                }`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <div className={`max-h-72 overflow-y-auto p-3 rounded text-xs ${
              isDark ? 'bg-white/5' : 'bg-gray-50'
            }`}>
              <pre className="whitespace-pre-wrap">{privacyPolicyContent}</pre>
            </div>
          </div>
        )}

        {showTerms && (
          <div className="p-4 max-h-96">
            <div className="flex items-center justify-between mb-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTerms(false)}
                className="text-xs p-1 h-auto"
              >
                ← Voltar
              </Button>
              <button
                onClick={onClose}
                className={`p-1 rounded-full transition-colors ${
                  isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'
                }`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <div className={`max-h-72 overflow-y-auto p-3 rounded text-xs ${
              isDark ? 'bg-white/5' : 'bg-gray-50'
            }`}>
              <pre className="whitespace-pre-wrap">{termsContent}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LegalPopup;
