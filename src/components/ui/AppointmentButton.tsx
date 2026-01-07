'use client';

import React from 'react';
import { Calendar } from 'lucide-react';

interface AppointmentButtonProps {
  location: 'aue' | 'zschorlau';
  variant: 'overlay' | 'standalone';
  label?: string;
  className?: string;
  showIcon?: boolean;
}

const AppointmentButton: React.FC<AppointmentButtonProps> = ({
  location,
  variant,
  label = 'Termin buchen',
  className = '',
  showIcon = true,
}) => {
  const config = {
    zschorlau: {
      id: '3c139fe0-e8d4-42af-90ea-4a0d6f45eb75',
      color: 'yellow',
      classes: 'bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-500',
      standaloneUrl: 'https://webtermin.medatixx.de/#/3c139fe0-e8d4-42af-90ea-4a0d6f45eb75',
    },
    aue: {
      id: '4e78d804-7777-4bb7-8959-841aaf62926e',
      color: 'red',
      classes: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
      standaloneUrl: 'https://webtermin.medatixx.de/#/4e78d804-7777-4bb7-8959-841aaf62926e',
    },
  };

  const currentConfig = config[location];
  
  const baseClasses = `
    inline-flex items-center justify-center px-4 py-2 
    text-sm font-medium rounded-full shadow-sm 
    transition-all duration-200 transform hover:scale-105 
    focus:outline-none focus:ring-2 focus:ring-offset-2 
    ${currentConfig.classes} ${className}
  `;

  if (variant === 'overlay') {
    const handleClick = (e: React.MouseEvent) => {
      // Versuch, existierende Overlays zu finden und zu schließen (Toggle-Verhalten)
      // Medatixx erstellt oft Iframes oder Container am Ende des Body
      const existingOverlays = document.querySelectorAll('iframe[src*="medatixx"], div[class*="terminbuchung"]');
      
      let closed = false;
      existingOverlays.forEach((overlay) => {
        // Prüfen ob es ein sichtbares Overlay ist (nicht der Button selbst)
        if (overlay !== e.currentTarget && overlay.tagName !== 'BUTTON' && overlay.clientHeight > 0) {
          overlay.remove(); // Oder style.display = 'none'
          closed = true;
        }
      });

      if (closed) {
        e.stopPropagation();
        e.preventDefault();
      }
    };

    return (
      <button
        type="button"
        className={`terminbuchung-trigger ${baseClasses}`}
        data-configid={currentConfig.id}
        onClick={handleClick}
      >
        {showIcon && <Calendar className="w-4 h-4 mr-2" />}
        {label}
      </button>
    );
  }

  return (
    <a
      href={currentConfig.standaloneUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={baseClasses}
    >
      {showIcon && <Calendar className="w-4 h-4 mr-2" />}
      {label}
    </a>
  );
};

export default AppointmentButton;
