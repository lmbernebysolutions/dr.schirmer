'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Calendar, Heart, Shield, Save, Eye, EyeOff, LogOut, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { AlertSettings, NewsPost } from '@/types/notion';

const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [alertSettings, setAlertSettings] = useState<AlertSettings>({
    isVisible: true,
    text: '',
    lastUpdated: ''
  });
  
  const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  // Authentifizierung prüfen
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/auth');
      const data = await response.json();
      setIsAuthenticated(data.authenticated);
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        loadData();
      } else {
        setLoginError('Falsches Passwort');
      }
    } catch (error) {
      setLoginError('Login fehlgeschlagen');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', {
        method: 'DELETE',
      });
      setIsAuthenticated(false);
      setPassword('');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const loadData = async () => {
    try {
      // Alert-Einstellungen laden
      const alertResponse = await fetch('/api/admin/alert');
      const alertData = await alertResponse.json();
      setAlertSettings(alertData);

      // News-Posts laden
      const newsResponse = await fetch('/api/admin/news');
      const newsData = await newsResponse.json();
      setNewsPosts(newsData);
    } catch (error) {
      console.error('Error loading data:', error);
      showMessage('Fehler beim Laden der Daten', 'error');
    }
  };

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 3000);
  };

  const saveAlertSettings = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/alert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...alertSettings,
          lastUpdated: new Date().toISOString()
        }),
      });

      if (response.ok) {
        showMessage('Alert-Einstellungen erfolgreich gespeichert!', 'success');
      } else {
        showMessage('Fehler beim Speichern der Alert-Einstellungen', 'error');
      }
    } catch (error) {
      showMessage('Fehler beim Speichern', 'error');
    } finally {
      setSaving(false);
    }
  };

  const saveNewsPosts = async () => {
    setSaving(true);
    try {
      let allSuccessful = true;
      
      for (const post of newsPosts) {
        const response = await fetch('/api/admin/news', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(post),
        });

        if (!response.ok) {
          allSuccessful = false;
        }
      }

      if (allSuccessful) {
        showMessage('Alle News-Posts erfolgreich gespeichert!', 'success');
      } else {
        showMessage('Einige News-Posts konnten nicht gespeichert werden', 'error');
      }
    } catch (error) {
      showMessage('Fehler beim Speichern der News-Posts', 'error');
    } finally {
      setSaving(false);
    }
  };

  const addNewsPost = () => {
    const newPost: NewsPost = {
      id: Date.now().toString(),
      title: 'Neue Meldung',
      description: 'Beschreibung eingeben...',
      date: new Date().toISOString(),
      icon: 'calendar',
      color: 'yellow',
      published: true
    };
    setNewsPosts([...newsPosts, newPost]);
  };

  const updateNewsPost = (index: number, field: keyof NewsPost, value: any) => {
    const updated = [...newsPosts];
    const currentPost = updated[index];
    updated[index] = { 
      ...currentPost, 
      [field]: value 
    } as NewsPost;
    setNewsPosts(updated);
  };

  const deleteNewsPost = async (index: number) => {
    const post = newsPosts[index];
    
    if (!post) {
      showMessage('News-Post nicht gefunden', 'error');
      return;
    }
    
    if (post.id && !post.id.startsWith('fallback-')) {
      try {
        const response = await fetch(`/api/admin/news?id=${post.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          showMessage('Fehler beim Löschen des News-Posts', 'error');
          return;
        }
      } catch (error) {
        showMessage('Fehler beim Löschen des News-Posts', 'error');
        return;
      }
    }

    setNewsPosts(newsPosts.filter((_, i) => i !== index));
    showMessage('News-Post gelöscht', 'success');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Lade Admin-Panel...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h1>
            <p className="text-gray-600">Dr. Schirmer Website</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Passwort
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Admin-Passwort eingeben"
                required
              />
            </div>

            {loginError && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Anmelden
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Bell className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dr. Schirmer Admin</h1>
                <p className="text-gray-600">Website Content Management</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Abmelden
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Success/Error Messages */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center ${
            messageType === 'success' 
              ? 'bg-green-100 border border-green-400 text-green-700' 
              : 'bg-red-100 border border-red-400 text-red-700'
          }`}>
            {messageType === 'success' ? (
              <CheckCircle className="w-5 h-5 mr-2" />
            ) : (
              <AlertCircle className="w-5 h-5 mr-2" />
            )}
            {message}
          </div>
        )}

        {/* Alert Settings */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <Bell className="w-6 h-6 mr-3 text-yellow-600" />
            Alertleiste
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Sichtbarkeit
              </label>
              <button
                onClick={() => setAlertSettings({...alertSettings, isVisible: !alertSettings.isVisible})}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all ${
                  alertSettings.isVisible 
                    ? 'bg-green-100 text-green-800 border-2 border-green-200' 
                    : 'bg-gray-100 text-gray-600 border-2 border-gray-200'
                }`}
              >
                {alertSettings.isVisible ? <Eye className="w-5 h-5 mr-2" /> : <EyeOff className="w-5 h-5 mr-2" />}
                {alertSettings.isVisible ? 'Sichtbar' : 'Versteckt'}
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Alert-Text
              </label>
              <textarea
                value={alertSettings.text}
                onChange={(e) => setAlertSettings({...alertSettings, text: e.target.value})}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
                placeholder="Alert-Text eingeben..."
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={saveAlertSettings}
              disabled={saving}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 flex items-center font-medium transition-colors"
            >
              <Save className="w-5 h-5 mr-2" />
              {saving ? 'Speichere...' : 'Alert speichern'}
            </button>
          </div>
        </div>

        {/* News Posts */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
              <Calendar className="w-6 h-6 mr-3 text-blue-600" />
              Aktuelle Meldungen
            </h2>
            <button
              onClick={addNewsPost}
              className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 flex items-center font-medium transition-colors"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Neue Meldung
            </button>
          </div>

          <div className="space-y-6">
            {newsPosts.map((post, index) => (
              <div key={post.id} className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titel
                    </label>
                    <input
                      type="text"
                      value={post.title}
                      onChange={(e) => updateNewsPost(index, 'title', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Icon
                    </label>
                    <select
                      value={post.icon}
                      onChange={(e) => updateNewsPost(index, 'icon', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="calendar">📅 Kalender</option>
                      <option value="heart">❤️ Herz</option>
                      <option value="shield">🛡️ Schild</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Farbe
                    </label>
                    <select
                      value={post.color}
                      onChange={(e) => updateNewsPost(index, 'color', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="yellow">🟡 Gelb</option>
                      <option value="red">🔴 Rot</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 lg:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Beschreibung
                    </label>
                    <textarea
                      value={post.description}
                      onChange={(e) => updateNewsPost(index, 'description', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center justify-between md:col-span-2 lg:col-span-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={post.published}
                        onChange={(e) => updateNewsPost(index, 'published', e.target.checked)}
                        className="mr-3 w-4 h-4 text-blue-600"
                      />
                      <label className="text-sm font-medium text-gray-700">
                        Veröffentlicht
                      </label>
                    </div>
                    <button
                      onClick={() => deleteNewsPost(index)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1 rounded hover:bg-red-50 transition-colors"
                    >
                      Löschen
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <button
              onClick={saveNewsPosts}
              disabled={saving}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 flex items-center font-medium transition-colors"
            >
              <Save className="w-5 h-5 mr-2" />
              {saving ? 'Speichere...' : 'Alle News speichern'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;