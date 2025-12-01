'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Eye, EyeOff, Save, X, Lock, Plus, Edit, Trash2, Calendar, Heart, Shield, AlertTriangle } from 'lucide-react';

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

interface ContentData {
  alert: AlertSettings;
  news: NewsPost[];
}

const AlertAdmin: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'alert' | 'news'>('alert');
  
  // Daten State
  const [data, setData] = useState<ContentData>({
    alert: { isVisible: false, text: '', lastUpdated: '' },
    news: []
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<NewsPost | null>(null);
  const [showNewsForm, setShowNewsForm] = useState(false);

  // Lade Daten beim Start (und wenn Modal öffnet)
  useEffect(() => {
    if (showModal) {
      loadData();
    }
  }, [showModal]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/data/content.json?t=' + new Date().getTime()); // Cache busting
      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
      } else {
        console.error('Fehler beim Laden der Daten');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveData = async (newData: ContentData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/save_data.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });

      const result = await response.json();

      if (result.success) {
        setData(newData);
        alert('Änderungen erfolgreich gespeichert! Die Website wird aktualisiert.');
        // Event feuern damit andere Komponenten neu laden
        window.dispatchEvent(new CustomEvent('contentUpdated'));
      } else {
        alert('Fehler beim Speichern: ' + result.message);
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Verbindungsfehler beim Speichern.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'password123') {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Falsches Passwort!');
      setPassword('');
    }
  };

  // --- Alert Handler ---
  const updateAlert = (updates: Partial<AlertSettings>) => {
    const newAlert = { ...data.alert, ...updates, lastUpdated: new Date().toISOString() };
    const newData = { ...data, alert: newAlert };
    // Optimistisches Update
    setData(newData); 
  };

  const saveAlert = () => {
    saveData(data);
  };

  // --- News Handler ---
  const handleNewsSave = (post: NewsPost) => {
    let newNews = [...data.news];
    const index = newNews.findIndex(p => p.id === post.id);
    
    if (index >= 0) {
      newNews[index] = post;
    } else {
      newNews.push(post);
    }
    
    // Sortieren nach Datum
    newNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const newData = { ...data, news: newNews };
    saveData(newData);
    setShowNewsForm(false);
    setSelectedPost(null);
  };

  const handleNewsDelete = (id: string) => {
    if (confirm('Wirklich löschen?')) {
      const newNews = data.news.filter(p => p.id !== id);
      const newData = { ...data, news: newNews };
      saveData(newData);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-xs text-gray-400 hover:text-gray-600 transition-colors duration-200 flex items-center"
        title="Inhalte verwalten"
      >
        <Settings className="w-3 h-3 mr-1" />
        Admin
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            {!isAuthenticated ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Admin Zugang</h3>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Passwort"
                    className="w-full px-4 py-3 border border-gray-300 rounded-full text-center focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    autoFocus
                  />
                  <div className="flex space-x-3">
                    <button type="submit" className="flex-1 bg-yellow-500 text-white rounded-full py-3 font-bold hover:bg-yellow-600">Anmelden</button>
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-200 rounded-full py-3 font-bold">Abbrechen</button>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">Inhalte verwalten</h3>
                  <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-6 h-6" /></button>
                </div>

                {/* Tabs */}
                <div className="flex space-x-2 mb-6 bg-gray-100 p-1 rounded-lg">
                  <button onClick={() => setActiveTab('alert')} className={`flex-1 py-2 rounded-md font-medium ${activeTab === 'alert' ? 'bg-white shadow-sm' : 'text-gray-500'}`}>Warnhinweis</button>
                  <button onClick={() => setActiveTab('news')} className={`flex-1 py-2 rounded-md font-medium ${activeTab === 'news' ? 'bg-white shadow-sm' : 'text-gray-500'}`}>News</button>
                </div>

                {/* Alert Editor */}
                {activeTab === 'alert' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                      <span className="font-medium">Anzeige auf Website</span>
                      <button 
                        onClick={() => updateAlert({ isVisible: !data.alert.isVisible })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${data.alert.isVisible ? 'bg-green-500' : 'bg-gray-300'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${data.alert.isVisible ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                    <textarea 
                      value={data.alert.text}
                      onChange={(e) => updateAlert({ text: e.target.value })}
                      className="w-full h-32 border rounded-xl p-4 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Text für den Warnhinweis..."
                    />
                    <button onClick={saveAlert} disabled={isLoading} className="w-full bg-green-600 text-white rounded-full py-3 font-bold hover:bg-green-700 disabled:opacity-50 flex items-center justify-center">
                      <Save className="w-5 h-5 mr-2" /> Speichern
                    </button>
                  </div>
                )}

                {/* News Editor */}
                {activeTab === 'news' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold">Einträge ({data.news.length})</h4>
                      <button 
                        onClick={() => { setSelectedPost(null); setShowNewsForm(true); }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-blue-700 flex items-center"
                      >
                        <Plus className="w-4 h-4 mr-1" /> Neu
                      </button>
                    </div>
                    
                    <div className="space-y-3 max-h-[400px] overflow-y-auto">
                      {data.news.map(post => (
                        <div key={post.id} className="border rounded-xl p-4 flex justify-between items-center hover:bg-gray-50">
                          <div>
                            <div className="font-bold flex items-center">
                              {post.title}
                              {!post.published && <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded-full">Entwurf</span>}
                            </div>
                            <div className="text-xs text-gray-500">{new Date(post.date).toLocaleDateString()}</div>
                          </div>
                          <div className="flex space-x-2">
                            <button onClick={() => { setSelectedPost(post); setShowNewsForm(true); }} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"><Edit className="w-4 h-4" /></button>
                            <button onClick={() => handleNewsDelete(post.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* News Form Modal */}
      {showNewsForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl">
            <h3 className="text-xl font-bold mb-4">{selectedPost ? 'Bearbeiten' : 'Neuer Eintrag'}</h3>
            <NewsForm 
              post={selectedPost} 
              onSave={handleNewsSave} 
              onCancel={() => setShowNewsForm(false)} 
            />
          </div>
        </div>
      )}
    </>
  );
};

// Sub-Komponente für das Formular
const NewsForm = ({ post, onSave, onCancel }: { post: NewsPost | null, onSave: (p: NewsPost) => void, onCancel: () => void }) => {
  const [formData, setFormData] = useState<NewsPost>(post || {
    id: Date.now().toString(),
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0] || '',
    icon: 'calendar',
    color: 'yellow',
    published: true
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="space-y-4">
      <div>
        <label className="block text-sm font-bold mb-1">Titel</label>
        <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border rounded-lg p-2" />
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Text</label>
        <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border rounded-lg p-2 h-24" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold mb-1">Datum</label>
          <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full border rounded-lg p-2" />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Icon</label>
          <select value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} className="w-full border rounded-lg p-2">
            <option value="calendar">Kalender</option>
            <option value="heart">Herz</option>
            <option value="shield">Schild</option>
          </select>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <label className="flex items-center cursor-pointer">
          <input type="checkbox" checked={formData.published} onChange={e => setFormData({...formData, published: e.target.checked})} className="mr-2" />
          Veröffentlicht
        </label>
        <label className="flex items-center cursor-pointer">
          <span className="mr-2 text-sm font-bold">Farbe:</span>
          <select value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} className="border rounded-lg p-1">
            <option value="yellow">Gelb</option>
            <option value="red">Rot</option>
          </select>
        </label>
      </div>
      <div className="flex space-x-3 pt-4">
        <button type="submit" className="flex-1 bg-green-600 text-white rounded-full py-3 font-bold hover:bg-green-700">Speichern</button>
        <button type="button" onClick={onCancel} className="flex-1 bg-gray-200 text-gray-800 rounded-full py-3 font-bold hover:bg-gray-300">Abbrechen</button>
      </div>
    </form>
  );
};

export default AlertAdmin;
