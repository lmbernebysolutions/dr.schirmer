'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Calendar, 
  Heart, 
  Shield, 
  ArrowLeft,
  Save,
  X
} from 'lucide-react';

interface NewsPost {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
  color: string;
  published: boolean;
}

const AdminDashboard = () => {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<NewsPost | null>(null);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/cms/news');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Möchten Sie diesen Beitrag wirklich löschen?')) return;
    
    try {
      const response = await fetch(`/api/cms/news?id=${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        fetchPosts();
      } else {
        alert('Fehler beim Löschen des Posts!');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Fehler beim Löschen des Posts!');
    }
  };

  const handleTogglePublished = async (post: NewsPost) => {
    try {
      const response = await fetch('/api/cms/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...post, published: !post.published })
      });
      
      if (response.ok) {
        fetchPosts();
      } else {
        alert('Fehler beim Aktualisieren des Posts!');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Fehler beim Aktualisieren des Posts!');
    }
  };

  const handleSave = async (post: NewsPost) => {
    try {
      const response = await fetch('/api/cms/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...post,
          id: post.id === 'new' ? Date.now().toString() : post.id
        })
      });
      
      if (response.ok) {
        setEditingPost(null);
        setShowForm(false);
        fetchPosts();
      } else {
        alert('Fehler beim Speichern des Posts!');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Fehler beim Speichern des Posts!');
    }
  };

  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      calendar: Calendar,
      heart: Heart,
      shield: Shield,
    };
    const IconComponent = iconMap[iconName] || Calendar;
    return <IconComponent className="w-5 h-5" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Lade...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/')}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Zur Website
              </button>
              <h1 className="text-2xl font-bold text-gray-900">CMS Dashboard</h1>
            </div>
            <button
              onClick={() => {
                setEditingPost({
                  id: 'new',
                  title: '',
                  description: '',
                  date: new Date().toISOString().split('T')[0] || '',
                  icon: 'calendar',
                  color: 'yellow',
                  published: false,
                });
                setShowForm(true);
              }}
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Neuer Beitrag
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm && editingPost && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {editingPost.id === 'new' ? 'Neuer Beitrag' : 'Beitrag bearbeiten'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingPost(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titel
                </label>
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Datum
                </label>
                <input
                  type="date"
                  value={editingPost.date}
                  onChange={(e) => setEditingPost({ ...editingPost, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon
                </label>
                <select
                  value={editingPost.icon}
                  onChange={(e) => setEditingPost({ ...editingPost, icon: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
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
                  value={editingPost.color}
                  onChange={(e) => setEditingPost({ ...editingPost, color: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                >
                  <option value="yellow">Gelb</option>
                  <option value="red">Rot</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Beschreibung
              </label>
              <textarea
                value={editingPost.description}
                onChange={(e) => setEditingPost({ ...editingPost, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>

            <div className="flex items-center justify-between mt-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={editingPost.published}
                  onChange={(e) => setEditingPost({ ...editingPost, published: e.target.checked })}
                  className="mr-2"
                />
                Veröffentlicht
              </label>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingPost(null);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Abbrechen
                </button>
                <button
                  onClick={() => handleSave(editingPost)}
                  className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors flex items-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Speichern
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    post.color === 'yellow' ? 'bg-yellow-100' : 'bg-red-100'
                  }`}>
                    <div className={`${
                      post.color === 'yellow' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {getIcon(post.icon)}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                      {post.published ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <Eye className="w-3 h-3 mr-1" />
                          Veröffentlicht
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          <EyeOff className="w-3 h-3 mr-1" />
                          Entwurf
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">{post.description}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString('de-DE')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleTogglePublished(post)}
                    className={`p-2 rounded-lg transition-colors ${
                      post.published 
                        ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    title={post.published ? 'Verstecken' : 'Veröffentlichen'}
                  >
                    {post.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  
                  <button
                    onClick={() => {
                      setEditingPost(post);
                      setShowForm(true);
                    }}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    title="Bearbeiten"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    title="Löschen"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Noch keine Beiträge vorhanden.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
