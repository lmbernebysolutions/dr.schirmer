'use client';

import React from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 80,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError
}) => {
  // Extrahiere Dateinamen und Pfad
  const getImagePaths = (originalSrc: string) => {
    // Normalisiere den Pfad - entferne führenden Slash
    const cleanSrc = originalSrc.startsWith('/') ? originalSrc.slice(1) : originalSrc;
    
    // Prüfe ob bereits im optimized Ordner
    if (cleanSrc.includes('/images/optimized/')) {
      const fullPath = cleanSrc.split('/images/optimized/')[1] || '';
      const fileName = fullPath.split('/').pop()?.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '') || '';
      return {
        basePath: '/images/optimized',
        fileName,
        isOptimized: true
      };
    }
    
    // Extrahiere Dateinamen aus Original-Pfad
    const fileName = cleanSrc.split('/').pop()?.replace(/\.(jpg|jpeg|png)$/i, '') || '';
    
    return {
      basePath: '/images/optimized',
      fileName,
      isOptimized: false
    };
  };

  const { basePath, fileName } = getImagePaths(src);
  
  // Spezielle Behandlung für logo01 und logo02 - verwende direktes PNG ohne optimierte Versionen
  if (fileName === 'logo01' || fileName === 'logo02') {
    return (
      <img
        src={`/images/${fileName}.png`}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={className}
        onLoad={onLoad}
        onError={onError}
        style={{
          width: '100%',
          height: 'auto',
          ...(placeholder === 'blur' && blurDataURL && {
            backgroundImage: `url(${blurDataURL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          })
        }}
      />
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

  // Fallback JPG Pfad mit URL-Encoding
  const fallbackSrc = `${basePath}/${encodeFileName(fileName + '-fallback.jpg')}`;

  return (
    <picture className={className}>
      {/* AVIF Source - modernstes Format */}
      <source
        srcSet={generateSrcSet('avif')}
        type="image/avif"
        sizes={sizes}
      />
      
      {/* WebP Source - gutes Fallback */}
      <source
        srcSet={generateSrcSet('webp')}
        type="image/webp"
        sizes={sizes}
      />
      
      {/* Fallback JPG */}
    <img
      src={fallbackSrc}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      onLoad={onLoad}
      onError={onError}
      style={{
        width: '100%',
        height: 'auto',
        ...(placeholder === 'blur' && blurDataURL && {
          backgroundImage: `url(${blurDataURL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        })
      }}
    />
    </picture>
  );
};

export default ResponsiveImage;
