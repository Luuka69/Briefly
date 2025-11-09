// File: src/components/LoginPage.tsx

import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import apiClient from '../services/api';
import { type Page } from '../App';
import { BrieflyLogo } from './BrieflyLogo';

interface LoginPageProps {
  onNavigate: (page: Page) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      localStorage.setItem('userToken', response.data.token);
      onNavigate('chatbot');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      {/* Left Side: The Form */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <BrieflyLogo />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
              Welcome Back
            </h2>
            <p className="mt-2 text-center text-sm text-slate-600">
              Log in to access your news briefings.
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-slate-300"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-slate-700">
                  Password
                </label>
                <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-slate-300"
              />
            </div>
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log In'}
            </Button>
            <p className="text-center text-sm text-slate-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => onNavigate('subscribe')}
                className="font-medium text-blue-600 hover:underline"
              >
                Sign Up
              </button>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side: Branding/Image */}
      <div className="hidden lg:block bg-slate-100">
        <div className="flex items-center justify-center h-full p-12">
            <Card className="p-8 bg-white border-slate-200">
                <h3 className="text-2xl font-semibold text-slate-900">Stay Informed, Instantly.</h3>
                <p className="mt-2 text-slate-600">
                    Briefly uses advanced AI to deliver personalized news summaries from trusted sources, keeping you ahead of the curve.
                </p>
            </Card>
        </div>
      </div>
    </div>
  );
}