
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
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        toast.success('Login realizado com sucesso!');
        navigate('/admin');
      } else {
        toast.error('Credenciais inválidas');
      }
    } catch (error) {
      toast.error('Erro no processo de autenticação');
      console.error('Erro de autenticação:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${isDark ? 'bg-black' : 'bg-[#f5f5f5]'}`}>
      <Card className={`w-full max-w-md ${isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200'}`}>
        <CardHeader className="text-center">
          <CardTitle className={`text-2xl font-canela ${isDark ? 'text-white' : 'text-black'}`}>
            Acesso Administrativo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form id="admin-login-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className={`${isDark ? 'text-white' : 'text-black'}`}>
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${isDark ? 'bg-black border-white/20 text-white' : 'bg-white border-gray-200 text-black'}`}
                placeholder="seu@email.com"
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
              id="submit-admin-login"
              type="submit" 
              className={`w-full ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
              disabled={loading}
            >
              {loading ? 'Processando...' : 'Entrar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
