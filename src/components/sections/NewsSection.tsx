'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Heart, Shield } from 'lucide-react';
import { NewsPost } from '@/types/notion';
import { getNewsPosts } from '@/lib/notion-helpers';

const NewsSection: React.FC = () => {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  // Listen for news updates
  useEffect(() => {
    const handleNewsUpdate = () => {
      fetchPosts();
    };

    window.addEventListener('newsUpdated', handleNewsUpdate);
    return () => window.removeEventListener('newsUpdated', handleNewsUpdate);
  }, []);

  const fetchPosts = async () => {
    try {
      // Try to load from Notion API first
      const notionPosts = await getNewsPosts();
      
      if (notionPosts && notionPosts.length > 0) {
        // Filter only published posts for display
        const publishedPosts = notionPosts.filter((post: NewsPost) => post.published);
        setPosts(publishedPosts);
      } else {
        // Fallback to static JSON file
        const newsData = await import('@/data/news-posts.json');
        const data = newsData.default || newsData;
        
        // Handle both array format and object with posts property
        let posts: NewsPost[] = [];
        if (Array.isArray(data)) {
          posts = data as NewsPost[];
        } else if (data && typeof data === 'object' && 'posts' in data) {
          posts = (data as { posts: NewsPost[] }).posts;
        }
        
        // Filter only published posts for display
        const publishedPosts = posts.filter((post: NewsPost) => post.published);
        setPosts(publishedPosts);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
      // Fallback to static JSON file
      try {
        const newsData = await import('@/data/news-posts.json');
        const data = newsData.default || newsData;
        
        // Handle both array format and object with posts property
        let posts: NewsPost[] = [];
        if (Array.isArray(data)) {
          posts = data as NewsPost[];
        } else if (data && typeof data === 'object' && 'posts' in data) {
          posts = (data as { posts: NewsPost[] }).posts;
        }
        
        // Filter only published posts for display
        const publishedPosts = posts.filter((post: NewsPost) => post.published);
        setPosts(publishedPosts);
      } catch (fallbackError) {
        console.error('Error loading fallback posts:', fallbackError);
        const fallbackPosts: NewsPost[] = [
          {
            id: "1",
            title: "Praxis-Urlaub",
            description: "Vom 15. bis 30. Dezember bleibt unsere Praxis geschlossen. In dringenden Fällen wenden Sie sich an den ärztlichen Bereitschaftsdienst.",
            date: "2024-12-01",
            icon: "calendar",
            color: "yellow",
            published: true
          }
        ];
        setPosts(fallbackPosts);
      }
    } finally {
      setLoading(false);
    }
  };

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
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto element-spacing-sm"></div>
            <p className="text-gray-600">Lade aktuelle Meldungen...</p>
          </div>
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
          <div className="text-center py-12">
            <p className="text-gray-500">Derzeit keine aktuellen Meldungen verfügbar.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
