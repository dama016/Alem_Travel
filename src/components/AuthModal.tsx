import { useState } from 'react';
import { X, Mail, Lock, User, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, signup, isLoading } = useAuth();
  const { t } = useLanguage();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (mode === 'login') {
        await login(email, password);
        toast.success(t('auth.welcomeMsg'));
      } else {
        if (!name.trim()) {
          setError(t('auth.enterName'));
          return;
        }
        await signup(name, email, password);
        toast.success(`${name}! ${t('auth.accountCreated')}`);
      }
      setName('');
      setEmail('');
      setPassword('');
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError('');
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="p-8">
          <div className="mb-6 space-y-2">
            <h2 className="text-gray-900 text-2xl font-bold">
              {mode === 'login' ? t('auth.welcomeBack') : t('auth.createAccount')}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {mode === 'login' ? t('auth.signInAccess') : t('auth.startPlanning')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <Label htmlFor="name" className="text-gray-700">{t('auth.name')}</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-gray-700">{t('auth.email')}</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700">{t('auth.password')}</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {mode === 'login' ? t('auth.signingIn') : t('auth.creatingAccount')}
                </>
              ) : (
                mode === 'login' ? t('auth.signinButton') : t('auth.signupButton')
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {mode === 'login' ? t('auth.noAccount') : t('auth.haveAccount')}{' '}
              <button
                onClick={switchMode}
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                {mode === 'login' ? t('auth.signup') : t('auth.signin')}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
