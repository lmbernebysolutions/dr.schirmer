'use client';

import React, { useEffect, useState } from 'react';
import { Calendar, Heart, Shield } from 'lucide-react';
import { NewsPost } from '@/types/notion';

const NewsSection: React.FC = () => {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const response = await fetch('/data/content.json?t=' + new Date().getTime());
      if (response.ok) {
        const data = await response.json();
        if (data.news) {
          const publishedPosts = data.news.filter((p: NewsPost) => p.published);
          setPosts(publishedPosts);
        }
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();

    // Event Listener für Updates vom Admin Panel
    const handleUpdate = () => fetchNews();
    window.addEventListener('contentUpdated', handleUpdate);
    return () => window.removeEventListener('contentUpdated', handleUpdate);
  }, []);

  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      calendar: Calendar,
      heart: Heart,
      shield: Shield,
    };
    const IconComponent = iconMap[iconName] || Calendar;
    return <IconComponent className="w-8 h-8" />;
  };

  const getColorClasses = (color: string) => {
    if (color === 'yellow') {
      return {
        border: 'border-yellow-500',
        bg: 'bg-yellow-100',
        text: 'text-yellow-600',
        title: 'text-yellow-600'
      };
    } else {
      return {
        border: 'border-red-500',
        bg: 'bg-red-100',
        text: 'text-red-600',
        title: 'text-red-600'
      };
    }
  };

  if (loading) {
    return (
      <section className="section-padding bg-section-primary">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="section-padding bg-section-primary">
      <div className="container mx-auto px-6">
        <div className="text-center element-spacing-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 element-spacing">
            Aktuelle Meldungen
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Wichtige Informationen und Neuigkeiten aus unserer Praxis
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-spacing-lg">
            {posts.map((post) => {
              const colors = getColorClasses(post.color);
              return (
                <div 
                  key={post.id}
                  className={`bg-white rounded-3xl card-spacing-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-8 ${colors.border}`}
                >
                  <div className={`w-16 h-16 md:w-20 md:h-20 ${colors.bg} rounded-full flex items-center justify-center element-spacing`}>
                    <div className={colors.text}>
                      {getIcon(post.icon)}
                    </div>
                  </div>
                  <h3 className={`text-xl font-bold text-spacing ${colors.title}`}>
                    {post.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-spacing">
                    {post.description}
                  </p>
                  <div className="text-sm text-gray-500">
                    Veröffentlicht: {new Date(post.date).toLocaleDateString('de-DE')}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl shadow-sm max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Keine Meldungen</h3>
            <p className="text-gray-500 mt-2">Derzeit liegen keine aktuellen Meldungen vor.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
