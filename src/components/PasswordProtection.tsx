'use client';

import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface PasswordProtectionProps {
  children: React.ReactNode;
}

const PasswordProtection: React.FC<PasswordProtectionProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Website-Passwort
  const WEBSITE_PASSWORD = 'DrSchirmer2024!';

  useEffect(() => {
    // Prüfe ob bereits authentifiziert
    const authStatus = localStorage.getItem('website-auth');
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === WEBSITE_PASSWORD) {
      localStorage.setItem('website-auth', 'authenticated');
      setIsAuthenticated(true);
    } else {
      setError('Falsches Passwort. Bitte versuchen Sie es erneut.');
      setPassword('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('website-auth');
    setIsAuthenticated(false);
    setPassword('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Lade Website...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Website-Zugang</h1>
            <p className="text-gray-600">Dr. Schirmer Hausarztpraxis</p>
            <p className="text-sm text-gray-500 mt-2">Bitte geben Sie das Passwort ein, um fortzufahren</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Passwort
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  placeholder="Website-Passwort eingeben"
                  required
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
            >
              Website betreten
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Geschützter Bereich - Nur für autorisierte Personen
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Logout Button - nur für Entwicklung */}
      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={handleLogout}
          className="fixed top-4 right-4 z-50 bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      )}
      {children}
    </div>
  );
};

export default PasswordProtection;
