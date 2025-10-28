'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Calendar, Heart, Shield, Save, Eye, EyeOff } from 'lucide-react';

interface AlertSettings {
  isVisible: boolean;
  text: string;
  lastUpdated: string;
}

interface NewsPost {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
  color: string;
  published: boolean;
}

const AdminPanel: React.FC = () => {
  const [alertSettings, setAlertSettings] = useState<AlertSettings>({
    isVisible: true,
    text: '',
    lastUpdated: ''
  });
  
  const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load alert settings
      const alertData = await import('@/data/alert-settings.json');
      setAlertSettings(alertData.default || alertData);

      // Load news posts
      const newsData = await import('@/data/news-posts.json');
      const data = newsData.default || newsData;
      const posts = Array.isArray(data) ? data : data.posts || [];
      setNewsPosts(posts);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveAlertSettings = async () => {
    setSaving(true);
    try {
      // In a real implementation, this would save to the JSON file
      // For now, we'll just show a success message
      setMessage('Alert-Einstellungen gespeichert! (In Entwicklung)');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Fehler beim Speichern!');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  const saveNewsPosts = async () => {
    setSaving(true);
    try {
      // In a real implementation, this would save to the JSON file
      setMessage('News-Posts gespeichert! (In Entwicklung)');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Fehler beim Speichern!');
      setTimeout(() => setMessage(''), 3000);
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
    updated[index] = { ...updated[index], [field]: value };
    setNewsPosts(updated);
  };

  const deleteNewsPost = (index: number) => {
    setNewsPosts(newsPosts.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Lade Admin-Panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Bell className="w-8 h-8 mr-3 text-blue-600" />
            Dr. Schirmer - Admin Panel
          </h1>

          {message && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              {message}
            </div>
          )}

          {/* Alert Settings */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Bell className="w-6 h-6 mr-2 text-yellow-600" />
              Alertleiste
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sichtbarkeit
                </label>
                <div className="flex items-center">
                  <button
                    onClick={() => setAlertSettings({...alertSettings, isVisible: !alertSettings.isVisible})}
                    className={`flex items-center px-4 py-2 rounded-lg ${
                      alertSettings.isVisible 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {alertSettings.isVisible ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
                    {alertSettings.isVisible ? 'Sichtbar' : 'Versteckt'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Text
                </label>
                <textarea
                  value={alertSettings.text}
                  onChange={(e) => setAlertSettings({...alertSettings, text: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Alert-Text eingeben..."
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={saveAlertSettings}
                disabled={saving}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Speichere...' : 'Alert speichern'}
              </button>
            </div>
          </div>

          {/* News Posts */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-blue-600" />
                Aktuelle Meldungen
              </h2>
              <button
                onClick={addNewsPost}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Neue Meldung
              </button>
            </div>

            <div className="space-y-6">
              {newsPosts.map((post, index) => (
                <div key={post.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Titel
                      </label>
                      <input
                        type="text"
                        value={post.title}
                        onChange={(e) => updateNewsPost(index, 'title', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Icon
                      </label>
                      <select
                        value={post.icon}
                        onChange={(e) => updateNewsPost(index, 'icon', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="calendar">Kalender</option>
                        <option value="heart">Herz</option>
                        <option value="shield">Schild</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Farbe
                      </label>
                      <select
                        value={post.color}
                        onChange={(e) => updateNewsPost(index, 'color', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="yellow">Gelb</option>
                        <option value="red">Rot</option>
                      </select>
                    </div>

                    <div className="md:col-span-2 lg:col-span-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Beschreibung
                      </label>
                      <textarea
                        value={post.description}
                        onChange={(e) => updateNewsPost(index, 'description', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        rows={3}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={post.published}
                          onChange={(e) => updateNewsPost(index, 'published', e.target.checked)}
                          className="mr-2"
                        />
                        <label className="text-sm font-medium text-gray-700">
                          Veröffentlicht
                        </label>
                      </div>
                      <button
                        onClick={() => deleteNewsPost(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Löschen
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button
                onClick={saveNewsPosts}
                disabled={saving}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Speichere...' : 'Alle News speichern'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
