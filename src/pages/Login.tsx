
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../components/ThemeProvider';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signUp } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isSignUp) {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          toast.error(`Erro no cadastro: ${error.message}`);
        } else {
          toast.success('Cadastro realizado! Verifique seu email.');
          setIsSignUp(false);
        }
      } else {
        const success = await login(email, password);
        if (success) {
          toast.success('Login realizado com sucesso!');
          navigate('/admin');
        } else {
          toast.error('Credenciais inválidas');
        }
      }
    } catch (error) {
      toast.error('Erro no processo de autenticação');
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${isDark ? 'bg-black' : 'bg-[#f5f5f5]'}`}>
      <Card className={`w-full max-w-md ${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader className="text-center">
          <CardTitle className={`text-2xl font-canela ${isDark ? 'text-white' : 'text-black'}`}>
            {isSignUp ? 'Criar Conta' : 'Acesso Administrativo'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <Label htmlFor="fullName" className={`${isDark ? 'text-white' : 'text-black'}`}>
                  Nome Completo
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                  required={isSignUp}
                />
              </div>
            )}
            <div>
              <Label htmlFor="email" className={`${isDark ? 'text-white' : 'text-black'}`}>
                {isSignUp ? 'Email' : 'Email ou Usuário'}
              </Label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                placeholder={isSignUp ? 'seu@email.com' : 'admin ou seu@email.com'}
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className={`${isDark ? 'text-white' : 'text-black'}`}>
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                required
              />
            </div>
            <Button 
              type="submit" 
              className={`w-full ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
              disabled={loading}
            >
              {loading ? 'Processando...' : (isSignUp ? 'Cadastrar' : 'Entrar')}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className={`text-sm underline ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}
            >
              {isSignUp ? 'Já tem conta? Faça login' : 'Não tem conta? Cadastre-se'}
            </button>
          </div>

          <div className={`mt-4 p-3 rounded text-xs ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
            <strong>Acesso Admin Local:</strong><br />
            Usuário: admin<br />
            Senha: stadv2024
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
