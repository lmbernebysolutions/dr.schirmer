'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Eye, EyeOff, Save, X, Lock, Plus, Edit, Trash2, Calendar, Heart, Shield } from 'lucide-react';

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

const AlertAdmin: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'alert' | 'news'>('alert');
  const [alertSettings, setAlertSettings] = useState<AlertSettings>({
    isVisible: true,
    text: 'Aktuell: Dr. Schuster-Meinel ist nun Fachärztin in Zschorlau | Neue Kindersprechstunde | Neuaufnahmen möglich',
    lastUpdated: new Date().toISOString()
  });
  const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<NewsPost | null>(null);
  const [showNewsForm, setShowNewsForm] = useState(false);

  // Load settings from API on component mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch('/api/cms/alert');
        if (response.ok) {
          const apiSettings = await response.json();
          console.log('🚨 Admin loaded settings from API:', apiSettings);
          setAlertSettings(apiSettings);
        }
      } catch (error) {
        console.error('Error loading from API in admin:', error);
      }
    };
    
    loadSettings();
  }, []);

  // Load news posts
  useEffect(() => {
    if (isAuthenticated) {
      const loadNewsPosts = async () => {
        try {
          const response = await fetch('/api/cms/news');
          if (response.ok) {
            const posts = await response.json();
            console.log('Loading news posts:', posts);
            setNewsPosts(posts);
          }
        } catch (error) {
          console.error('Error loading news posts:', error);
        }
      };
      
      loadNewsPosts();
    }
  }, [isAuthenticated]);

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

  const handleSave = async () => {
    try {
      // Save to API
      const response = await fetch('/api/cms/alert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isVisible: alertSettings.isVisible,
          text: alertSettings.text
        })
      });

      if (response.ok) {
        console.log('🚨 Admin saved settings to API');
        
        // Trigger a custom event to notify Header of changes
        window.dispatchEvent(new CustomEvent('alertSettingsChanged'));
        
        setShowModal(false);
        setIsAuthenticated(false);
      } else {
        alert('Fehler beim Speichern!');
      }
    } catch (error) {
      console.error('Error saving to API:', error);
      alert('Fehler beim Speichern!');
    }
  };

  const handleNewsSave = async (post: NewsPost) => {
    try {
      const response = await fetch('/api/cms/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post)
      });

      if (response.ok) {
        // Reload news posts
        const newsResponse = await fetch('/api/cms/news');
        if (newsResponse.ok) {
          const posts = await newsResponse.json();
          setNewsPosts(posts);
        }
        window.dispatchEvent(new CustomEvent('newsUpdated'));
        setShowNewsForm(false);
        setSelectedPost(null);
      } else {
        alert('Fehler beim Speichern des Posts!');
      }
    } catch (error) {
      console.error('Error saving news post:', error);
      alert('Fehler beim Speichern des Posts!');
    }
  };

  const handleNewsDelete = async (id: string) => {
    if (confirm('Möchten Sie diesen Post wirklich löschen?')) {
      try {
        const response = await fetch(`/api/cms/news?id=${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          // Reload news posts
          const newsResponse = await fetch('/api/cms/news');
          if (newsResponse.ok) {
            const posts = await newsResponse.json();
            setNewsPosts(posts);
          }
          window.dispatchEvent(new CustomEvent('newsUpdated'));
        } else {
          alert('Fehler beim Löschen des Posts!');
        }
      } catch (error) {
        console.error('Error deleting news post:', error);
        alert('Fehler beim Löschen des Posts!');
      }
    }
  };

  const handleEditPost = (post: NewsPost) => {
    setSelectedPost(post);
    setShowNewsForm(true);
  };

  const handleNewPost = () => {
    setSelectedPost(null);
    setShowNewsForm(true);
  };

  const handleCancel = () => {
    setShowModal(false);
    setIsAuthenticated(false);
    setPassword('');
  };

  const updateAlertSettings = (updates: Partial<AlertSettings>) => {
    setAlertSettings(prev => ({ ...prev, ...updates }));
  };

  return (
    <>
      {/* Admin Link im Footer */}
      <button
        onClick={() => setShowModal(true)}
        className="text-xs text-gray-400 hover:text-gray-600 transition-colors duration-200 flex items-center"
        title="Alert-Leiste verwalten"
      >
        <Settings className="w-3 h-3 mr-1" />
        Admin
      </button>

      {/* Admin Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {!isAuthenticated ? (
              // Password Form
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Admin-Zugang</h3>
                <p className="text-gray-600 mb-6">Geben Sie das Passwort ein, um die Alert-Leiste zu verwalten:</p>
                
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Passwort eingeben"
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    autoFocus
                  />
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="flex-1 bg-red-600 text-white rounded-full px-6 py-3 font-semibold hover:bg-red-700 transition-colors duration-300"
                    >
                      Anmelden
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 bg-gray-200 text-gray-700 rounded-full px-6 py-3 font-semibold hover:bg-gray-300 transition-colors duration-300"
                    >
                      Abbrechen
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              // Admin Panel
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Admin-Panel</h3>
                  <button
                    onClick={handleCancel}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Tab Navigation */}
                <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setActiveTab('alert')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'alert' 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Alert-Leiste
                  </button>
                  <button
                    onClick={() => setActiveTab('news')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'news' 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    News-Verwaltung
                  </button>
                </div>

                {activeTab === 'alert' && (
                  <div className="space-y-6">
                    {/* Visibility Toggle */}
                    <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      {alertSettings.isVisible ? (
                        <Eye className="w-5 h-5 mr-2 text-green-600" />
                      ) : (
                        <EyeOff className="w-5 h-5 mr-2 text-gray-400" />
                      )}
                      Sichtbarkeit
                    </h4>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => updateAlertSettings({ isVisible: !alertSettings.isVisible })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          alertSettings.isVisible ? 'bg-green-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            alertSettings.isVisible ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                      <span className="text-gray-700">
                        Alert-Leiste ist {alertSettings.isVisible ? 'sichtbar' : 'ausgeblendet'}
                      </span>
                    </div>
                  </div>

                  {/* Text Editor */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Text bearbeiten</h4>
                    <textarea
                      value={alertSettings.text}
                      onChange={(e) => updateAlertSettings({ text: e.target.value })}
                      placeholder="Geben Sie den Text für die Alert-Leiste ein..."
                      className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Tipp: Verwenden Sie " | " um Textteile zu trennen
                    </p>
                  </div>

                  {/* Preview */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Vorschau</h4>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-yellow-600 rounded-full animate-pulse"></div>
                          <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
                        </div>
                        <p className="text-sm font-medium text-gray-800">
                          {alertSettings.text || 'Kein Text eingegeben'}
                        </p>
                      </div>
                    </div>
                  </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                      <button
                        onClick={handleSave}
                        className="bg-green-600 text-white rounded-full px-8 py-3 font-semibold hover:bg-green-700 transition-colors duration-300 flex items-center"
                      >
                        <Save className="w-5 h-5 mr-2" />
                        Speichern & Schließen
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'news' && (
                  <div className="space-y-6">
                    {/* News Management */}
                    <div className="flex justify-between items-center">
                      <h4 className="text-lg font-semibold text-gray-900">News-Posts verwalten</h4>
                      <button
                        onClick={handleNewPost}
                        className="bg-blue-600 text-white rounded-full px-4 py-2 font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Neuer Post
                      </button>
                    </div>

                    {/* News List */}
                    <div className="space-y-3">
                      {newsPosts.map((post) => (
                        <div key={post.id} className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <h5 className="font-semibold text-gray-900">{post.title}</h5>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                post.published ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                              }`}>
                                {post.published ? 'Veröffentlicht' : 'Entwurf'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{post.description}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(post.date).toLocaleDateString('de-DE')} | {post.color} | {post.icon}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditPost(post)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Bearbeiten"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleNewsDelete(post.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Löschen"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <NewsForm 
              post={selectedPost}
              onSave={handleNewsSave}
              onCancel={() => {
                setShowNewsForm(false);
                setSelectedPost(null);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

// News Form Component
interface NewsFormProps {
  post: NewsPost | null;
  onSave: (post: NewsPost) => void;
  onCancel: () => void;
}

const NewsForm: React.FC<NewsFormProps> = ({ post, onSave, onCancel }) => {
  const [formData, setFormData] = useState<NewsPost>({
    id: post?.id || Date.now().toString(),
    title: post?.title || '',
    description: post?.description || '',
    date: post?.date || new Date().toISOString().split('T')[0] || '',
    icon: post?.icon || 'calendar',
    color: post?.color || 'yellow',
    published: post?.published || false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      calendar: Calendar,
      heart: Heart,
      shield: Shield,
    };
    const IconComponent = iconMap[iconName] || Calendar;
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">
          {post ? 'Post bearbeiten' : 'Neuer Post'}
        </h3>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Titel
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Titel des Posts"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Beschreibung
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Beschreibung des Posts"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Datum
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Icon and Color */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Icon
            </label>
            <select
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="yellow">Gelb</option>
              <option value="red">Rot</option>
            </select>
          </div>
        </div>

        {/* Published Toggle */}
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, published: !formData.published })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              formData.published ? 'bg-green-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.published ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className="text-gray-700">
            {formData.published ? 'Veröffentlicht' : 'Entwurf'}
          </span>
        </div>

        {/* Preview */}
        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Vorschau</h4>
          <div className={`border-l-8 ${
            formData.color === 'yellow' ? 'border-yellow-500' : 'border-red-500'
          } bg-white rounded-xl p-4`}>
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 ${
                formData.color === 'yellow' ? 'bg-yellow-100' : 'bg-red-100'
              } rounded-full flex items-center justify-center`}>
                <div className={formData.color === 'yellow' ? 'text-yellow-600' : 'text-red-600'}>
                  {getIconComponent(formData.icon)}
                </div>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900">{formData.title || 'Titel'}</h5>
                <p className="text-sm text-gray-600">{formData.description || 'Beschreibung'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-3">
          <button
            type="submit"
            className="flex-1 bg-green-600 text-white rounded-full px-6 py-3 font-semibold hover:bg-green-700 transition-colors duration-300 flex items-center justify-center"
          >
            <Save className="w-5 h-5 mr-2" />
            Speichern
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-700 rounded-full px-6 py-3 font-semibold hover:bg-gray-300 transition-colors duration-300"
          >
            Abbrechen
          </button>
        </div>
      </form>
    </div>
  );
};

export default AlertAdmin;
