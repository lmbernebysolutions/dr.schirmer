'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Eye, Camera } from 'lucide-react';
import ResponsiveImage from '../ui/ResponsiveImage';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  location: 'zschorlau' | 'aue';
}

const PracticeGallery: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<'all' | 'zschorlau' | 'aue'>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Statische Bildliste - bewährte GitHub-Methode
  const galleryImages: GalleryImage[] = [
    {
      id: '1',
      src: '/images/Sprechzimmer 1.jpg',
      alt: 'Sprechzimmer 1 Zschorlau',
      title: 'Moderne Sprechzimmer',
      description: 'Helle und einladende Praxisräume in Zschorlau',
      location: 'zschorlau'
    },
    {
      id: '2',
      src: '/images/Sprechzimmer 2.jpg',
      alt: 'Sprechzimmer 2 Zschorlau',
      title: 'Behandlungsräume',
      description: 'Professionell ausgestattete Behandlungsräume',
      location: 'zschorlau'
    },
    {
      id: '3',
      src: '/images/Labor Zschorlau.jpg',
      alt: 'Labor Zschorlau',
      title: 'Eigenes Labor',
      description: 'Moderne Labortechnik für schnelle Ergebnisse',
      location: 'zschorlau'
    },
    {
      id: '4',
      src: '/images/wz-1.jpg',
      alt: 'Wartebereich Zschorlau',
      title: 'Gemütlicher Wartebereich',
      description: 'Moderne und einladende Wartebereiche',
      location: 'zschorlau'
    },
    {
      id: '6',
      src: '/images/picture02.jpg',
      alt: 'Praxisräume Aue',
      title: 'Praxisräume Aue',
      description: 'Moderne Ausstattung in Aue-Bad Schlema',
      location: 'aue'
    },
    {
      id: '7',
      src: '/images/picture03.jpg',
      alt: 'Behandlungsräume Aue',
      title: 'Behandlungsräume Aue',
      description: 'Professionelle Ausstattung für eine fundierte Behandlung',
      location: 'aue'
    },
    {
      id: '8',
      src: '/images/picture04.jpg',
      alt: 'Sprechzimmer Aue',
      title: 'Sprechzimmer in Aue',
      description: 'Helle und einladende Praxisräume in Aue-Bad Schlema',
      location: 'aue'
    }
  ];

  // Einfache Filter-Funktion - bewährte GitHub-Methode
  const getFilteredImages = useCallback(() => {
    if (selectedLocation === 'all') {
      return galleryImages;
    }
    return galleryImages.filter(img => img.location === selectedLocation);
  }, [selectedLocation]);

  const filteredImages = getFilteredImages();

  // Statistik berechnen
  const locationStats = {
    zschorlau: galleryImages.filter(img => img.location === 'zschorlau').length,
    aue: galleryImages.filter(img => img.location === 'aue').length
  };

  return (
    <section id="galerie" className="section-padding bg-section-primary">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center element-spacing-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 element-spacing">
            Unsere Praxisräume
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Moderne Ausstattung und eine einladende Atmosphäre für Ihre Gesundheit
          </p>
        </motion.div>

        {/* Location Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 md:gap-4 element-spacing-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button
            onClick={() => setSelectedLocation('all')}
            className={`px-3 py-2 md:px-6 md:py-3 rounded-full font-semibold transition-all duration-300 min-h-[48px] text-sm md:text-base ${
              selectedLocation === 'all'
                ? 'bg-gray-800 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Alle ({galleryImages.length})
          </button>
          
          <button
            onClick={() => setSelectedLocation('zschorlau')}
            className={`px-3 py-2 md:px-6 md:py-3 rounded-full font-semibold transition-all duration-300 min-h-[48px] text-sm md:text-base ${
              selectedLocation === 'zschorlau'
                ? 'bg-yellow-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 inline" />
            <span className="hidden sm:inline">Zschorlau</span>
            <span className="sm:hidden">Zsch</span> ({locationStats.zschorlau})
          </button>
          
          <button
            onClick={() => setSelectedLocation('aue')}
            className={`px-3 py-2 md:px-6 md:py-3 rounded-full font-semibold transition-all duration-300 min-h-[48px] text-sm md:text-base ${
              selectedLocation === 'aue'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 inline" />
            <span className="hidden sm:inline">Aue-Bad Schlema</span>
            <span className="sm:hidden">Aue</span> ({locationStats.aue})
          </button>
        </motion.div>

        {/* Gallery Grid - Einfache, robuste Implementierung */}
        <div className="min-h-[400px]">
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                    <div className="relative overflow-hidden flex-shrink-0 aspect-[4/3]">
                      <ResponsiveImage
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <Eye className="w-4 h-4 md:w-8 md:h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className={`absolute top-2 left-2 md:top-4 md:left-4 px-1 py-0.5 md:px-3 md:py-1 rounded-full text-xs font-semibold ${
                        image.location === 'zschorlau' 
                          ? 'bg-yellow-100 text-yellow-600' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        <span className="hidden sm:inline">{image.location === 'zschorlau' ? 'Zschorlau' : 'Aue'}</span>
                        <span className="sm:hidden">{image.location === 'zschorlau' ? 'Zsch' : 'Aue'}</span>
                      </div>
                    </div>
                    <div className="p-3 md:p-6 flex-1 flex flex-col justify-between min-h-[80px]">
                      <h3 className="text-sm md:text-lg font-semibold text-gray-900 mb-1 md:mb-2 line-clamp-2">
                        <span className="hidden sm:inline">{image.title}</span>
                        <span className="sm:hidden">{image.title.split(' ')[0]}</span>
                      </h3>
                      <p className="text-gray-600 text-xs md:text-sm line-clamp-2">
                        <span className="hidden sm:inline">{image.description}</span>
                        <span className="sm:hidden">{image.description.split(' ').slice(0, 3).join(' ')}...</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Camera className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Keine Bilder gefunden
              </h3>
              <p className="text-gray-600 mb-4">
                Für den ausgewählten Standort "{selectedLocation === 'all' ? 'Alle Standorte' : selectedLocation === 'zschorlau' ? 'Zschorlau' : 'Aue-Bad Schlema'}" sind derzeit keine Bilder verfügbar.
              </p>
              <div className="space-y-3">
                <button 
                  onClick={() => setSelectedLocation('all')}
                  className="bg-[#FF0000] text-white px-6 py-2 rounded-full hover:bg-[#CC0000] transition-colors mr-3"
                >
                  Alle Bilder anzeigen
                </button>
                <button 
                  onClick={() => setSelectedLocation('zschorlau')}
                  className="bg-yellow-600 text-white px-6 py-2 rounded-full hover:bg-yellow-700 transition-colors mr-3"
                >
                  Zschorlau anzeigen
                </button>
                <button 
                  onClick={() => setSelectedLocation('aue')}
                  className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors"
                >
                  Aue anzeigen
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-hidden mx-4 md:mx-0"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-auto max-h-[60vh] object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedImage.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {selectedImage.description}
                  </p>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                    selectedImage.location === 'zschorlau' 
                      ? 'bg-yellow-100 text-yellow-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    <MapPin className="w-4 h-4 mr-2" />
                    {selectedImage.location === 'zschorlau' ? 'Zschorlau' : 'Aue-Bad Schlema'}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PracticeGallery;