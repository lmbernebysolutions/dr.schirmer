'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  placeholder = 'empty',
  blurDataURL
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  // Extrahiere Dateinamen und Pfad
  const getImagePaths = (originalSrc: string) => {
    const cleanSrc = originalSrc.startsWith('/') ? originalSrc.slice(1) : originalSrc;
    
    if (cleanSrc.includes('/images/optimized/')) {
      const fullPath = cleanSrc.split('/images/optimized/')[1] || '';
      const fileName = fullPath.split('/').pop()?.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '') || '';
      return { basePath: '/images/optimized', fileName };
    }
    
    const fileName = cleanSrc.split('/').pop()?.replace(/\.(jpg|jpeg|png)$/i, '') || '';
    
    return { basePath: '/images/optimized', fileName };
  };

  const { basePath, fileName } = getImagePaths(src);
  
  // Spezielle Behandlung für logo01 und logo02 - verwende direktes PNG ohne optimierte Versionen
  if (fileName === 'logo01' || fileName === 'logo02') {
    if (hasError) {
      return (
        <div 
          className={`bg-gray-200 flex items-center justify-center ${className}`}
          style={{ width, height }}
        >
          <span className="text-gray-500 text-sm">Bild konnte nicht geladen werden</span>
        </div>
      );
    }

    return (
      <div className={`relative overflow-hidden ${className}`}>
        {/* Blur Placeholder */}
        {placeholder === 'blur' && !isLoaded && (
          <div 
            className="absolute inset-0 bg-gray-200 animate-pulse"
            style={{ width, height }}
          />
        )}
        
        {/* Loading Skeleton */}
        {!isLoaded && placeholder === 'empty' && (
          <div 
            className="absolute inset-0 bg-gray-100 animate-pulse"
            style={{ width, height }}
          />
        )}

        {/* Direktes PNG-Bild */}
        <motion.img
          src={`/images/${fileName}.png`}
          alt={alt}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ width: '100%', height: 'auto' }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    );
  }
  
  // URL-Encode Dateinamen für Dateien mit Leerzeichen oder Sonderzeichen
  const encodeFileName = (name: string) => {
    return encodeURIComponent(name);
  };
  
  // Generiere srcset für verschiedene Größen
  const sizesList = ['320w', '640w', '960w', '1280w', '1920w'];
  
  const generateSrcSet = (format: 'avif' | 'webp' | 'jpg') => {
    return sizesList
      .map(size => {
        const encodedFileName = encodeFileName(`${fileName}-${size}.${format}`);
        return `${basePath}/${encodedFileName} ${size.replace('w', '')}w`;
      })
      .join(', ');
  };

  const fallbackSrc = `${basePath}/${encodeFileName(fileName + '-fallback.jpg')}`;

  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">Bild konnte nicht geladen werden</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blur Placeholder */}
      {placeholder === 'blur' && !isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ width, height }}
        />
      )}
      
      {/* Loading Skeleton */}
      {!isLoaded && placeholder === 'empty' && (
        <div 
          className="absolute inset-0 bg-gray-100 animate-pulse"
          style={{ width, height }}
        />
      )}

      {/* Picture Element mit optimierten Formaten */}
      <picture className="block w-full h-full">
        {/* AVIF Source */}
        <source
          srcSet={generateSrcSet('avif')}
          type="image/avif"
        />
        
        {/* WebP Source */}
        <source
          srcSet={generateSrcSet('webp')}
          type="image/webp"
        />
        
        {/* Fallback JPG mit Animation */}
      <motion.img
          src={fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ width: '100%', height: 'auto' }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      </picture>
    </div>
  );
};

export default OptimizedImage;
