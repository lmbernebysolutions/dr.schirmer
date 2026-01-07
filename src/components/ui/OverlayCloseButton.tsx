'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const OverlayCloseButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Überwache DOM-Änderungen, um zu erkennen, wenn das Medatixx Overlay erscheint
    const observer = new MutationObserver(() => {
      const overlay = document.querySelector('iframe[src*="medatixx"], div[class*="terminbuchung-overlay"]');
      setIsVisible(!!overlay);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  const closeOverlay = () => {
    const overlays = document.querySelectorAll('iframe[src*="medatixx"], div[class*="terminbuchung"], div[id*="termin"]');
    overlays.forEach(overlay => overlay.remove());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={closeOverlay}
      className="fixed top-4 right-4 z-[9999] bg-white text-black p-2 rounded-full shadow-2xl border border-gray-200 hover:bg-gray-100 transition-all transform hover:scale-110"
      aria-label="Terminbuchung schließen"
    >
      <X className="w-6 h-6" />
    </button>
  );
};

export default OverlayCloseButton;
