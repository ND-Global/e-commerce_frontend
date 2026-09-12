'use client';

import React, { useState } from 'react';
import {
  Lock,
  Mail,
  User as UserIcon,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useShop } from '../context/shopcontext';

interface AuthPageProps {
  initialMode?: 'login' | 'signup';
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode = 'login',
}) => {
  const {
    login,
    signup,
    navigate,
    addToast,
  } = useShop();

  const [mode, setMode] =
    useState<'login' | 'signup'>(initialMode);

  const [name, setName] = useState('');
  const [email, setEmail] =
    useState('demo@velora.com');
  const [password, setPassword] =
    useState('luxury2026');

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      if (mode === 'login') {
        const ok = await login(
          email.trim(),
          password
        );

        if (ok) {
          navigate('/account');
        }

        return;
      }

      if (!name.trim()) {
        addToast(
          'Name Required',
          'Please enter your full name.',
          'error'
        );
        return;
      }

      const ok = await signup(
        name.trim(),
        email.trim(),
        password
      );

      if (ok) {
        navigate('/account');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const ok = await login(
        'alex.vanderbilt@velora-demo.com',
        'demo123'
      );

      if (ok) {
        navigate('/account');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-20">
      <div className="bg-white rounded-3xl border border-[#E8E6DF] p-8 sm:p-10 shadow-sm space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8C8880]">
            VELORA ATELIER
          </span>

          <h1 className="font-serif-luxury text-3xl font-bold text-[#1A1A1A]">
            {mode === 'login'
              ? 'Welcome Back'
              : 'Create Atelier Account'}
          </h1>

          <p className="text-xs text-[#8C8880]">
            {mode === 'login'
              ? 'Sign in to access your orders, saved pieces, and VIP rewards.'
              : 'Join our private circle for early collection drops and complimentary tailoring.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-[#F0ECE1] p-1 rounded-xl text-xs font-bold uppercase tracking-wider">
          <button
            type="button"
            onClick={() => setMode('login')}
            disabled={loading}
            className={`flex-1 py-2 rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-white text-[#1A1A1A] shadow-xs'
                : 'text-[#8C8880]'
            }`}
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => setMode('signup')}
            disabled={loading}
            className={`flex-1 py-2 rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-white text-[#1A1A1A] shadow-xs'
                : 'text-[#8C8880]'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 text-xs"
        >
          {mode === 'signup' && (
            <div>
              <label className="font-bold text-[#1A1A1A] block mb-1">
                Full Name
              </label>

              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Elena Rostova"
                  disabled={loading}
                  className="w-full p-3 pl-9 bg-[#FAF9F6] border border-[#DDD9CE] rounded-lg text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                />

                <UserIcon className="w-4 h-4 text-[#8C8880] absolute left-3 top-3.5" />
              </div>
            </div>
          )}

          <div>
            <label className="font-bold text-[#1A1A1A] block mb-1">
              Email Address
            </label>

            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="client@velora.com"
                disabled={loading}
                className="w-full p-3 pl-9 bg-[#FAF9F6] border border-[#DDD9CE] rounded-lg text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
              />

              <Mail className="w-4 h-4 text-[#8C8880] absolute left-3 top-3.5" />
            </div>
          </div>

          <div>
            <label className="font-bold text-[#1A1A1A] block mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="••••••••"
                disabled={loading}
                className="w-full p-3 pl-9 bg-[#FAF9F6] border border-[#DDD9CE] rounded-lg text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
              />

              <Lock className="w-4 h-4 text-[#8C8880] absolute left-3 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#1A1A1A] text-white font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-black transition-all shadow-md mt-2 flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span>
              {loading
                ? 'Please Wait...'
                : mode === 'login'
                ? 'Sign In'
                : 'Create Account'}
            </span>

            {!loading && (
              <ArrowRight className="w-4 h-4" />
            )}
          </button>
        </form>

        {/* Demo Fast Login Helper */}
        <div className="pt-4 border-t border-[#E8E6DF] text-center space-y-3">
          <span className="text-[11px] text-[#8C8880] block">
            Demo Shortcut
          </span>

          <button
            type="button"
            onClick={handleQuickDemoLogin}
            disabled={loading}
            className="w-full py-2.5 px-4 bg-[#F0ECE1] hover:bg-[#E5DFD1] text-[#1A1A1A] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center space-x-1.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C19A6B]" />

            <span>
              Auto-fill Demo VIP Client Profile
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;