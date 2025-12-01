'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X, Bell, ChevronDown, ChevronUp } from 'lucide-react';
import { AlertSettings } from '@/types/notion';

const ResponsiveHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isAlertExpanded, setIsAlertExpanded] = useState(false);
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const [alertSettings, setAlertSettings] = useState<AlertSettings>({
    isVisible: false,
    text: '',
    lastUpdated: new Date().toISOString()
  });

  // Logo rotation system
  const logos = [
    { src: '/images/aue_header_logo.png', alt: 'Hausarztpraxis Dr. Schirmer Aue' },
    { src: '/images/zschorlau_header_logo.png', alt: 'Hausarztpraxis Dr. Schirmer Zschorlau' }
  ];

  // Logo rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }, 20000); // 20 seconds

    return () => clearInterval(interval);
  }, [logos.length]);

  // Load alert settings from JSON (Fetch)
  const fetchAlertSettings = async () => {
    try {
      const response = await fetch('/data/content.json?t=' + new Date().getTime());
      if (response.ok) {
        const data = await response.json();
        if (data.alert) {
          const settings = data.alert;
          setAlertSettings(settings);
          
          const shouldAutoExpand = checkIfShouldAutoExpand(settings.lastUpdated);
          if (shouldAutoExpand && settings.isVisible) {
            setIsAlertExpanded(true);
          }
        }
      }
    } catch (error) {
      console.error('Error loading alert settings:', error);
    }
  };

  useEffect(() => {
    fetchAlertSettings();

    // Event Listener für Updates
    const handleUpdate = () => fetchAlertSettings();
    window.addEventListener('contentUpdated', handleUpdate);
    return () => window.removeEventListener('contentUpdated', handleUpdate);
  }, []);

  // Professional auto-expansion logic following best practices
  const checkIfShouldAutoExpand = (lastUpdated: string) => {
    const ALERT_EXPANSION_KEY = 'alertAutoExpansion';
    const ALERT_LAST_SEEN_KEY = 'alertLastSeen';
    const ALERT_DISMISSED_KEY = 'alertDismissed';
    
    // Check if user has never seen this alert (first visit)
    const lastSeen = localStorage.getItem(ALERT_LAST_SEEN_KEY);
    if (!lastSeen) {
      localStorage.setItem(ALERT_LAST_SEEN_KEY, lastUpdated);
      return true; // First visit - always show
    }

    // Check if alert content has changed since last seen
    if (lastSeen !== lastUpdated) {
      localStorage.setItem(ALERT_LAST_SEEN_KEY, lastUpdated);
      return true; // Content changed - show updated alert
    }

    // Check if user dismissed alert permanently (24h cooldown)
    const dismissedTime = localStorage.getItem(ALERT_DISMISSED_KEY);
    if (dismissedTime) {
      const dismissedDate = new Date(parseInt(dismissedTime));
      const now = new Date();
      const hoursSinceDismissed = (now.getTime() - dismissedDate.getTime()) / (1000 * 60 * 60);
      
      if (hoursSinceDismissed < 24) {
        return false; // Still in cooldown period
      } else {
        // Cooldown expired, clear dismissal
        localStorage.removeItem(ALERT_DISMISSED_KEY);
        return true; // Show again after cooldown
      }
    }

    return false; // Default: don't auto-expand
  };

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      const sections = [
        { id: 'locations', element: document.getElementById('locations') },
        { id: 'services', element: document.getElementById('services') },
        { id: 'team', element: document.getElementById('team') },
        { id: 'labor', element: document.getElementById('labor') },
        { id: 'galerie', element: document.getElementById('galerie') },
        { id: 'karriere', element: document.getElementById('karriere') },
        { id: 'downloads', element: document.getElementById('downloads') },
        { id: 'contact', element: document.getElementById('contact') },
        { id: 'blog', element: document.getElementById('blog') }
      ];

      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Standorte', href: '#locations' },
    { name: 'Aktuelles', href: '#blog' },
    { name: 'Leistungen', href: '#services' },
    { name: 'Team', href: '#team' },
    { name: 'Labor', href: '#labor' },
    { name: 'Galerie', href: '#galerie' },
    { name: 'Ausbildung', href: '#karriere' },
    { name: 'Downloads', href: '#downloads' },
  ];

  const handleAlertDismiss = () => {
    const dismissTime = Date.now().toString();
    localStorage.setItem('alertDismissed', dismissTime);
    setIsAlertExpanded(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 py-4">
        <div className="container mx-auto px-6">
          {/* Main Navbar */}
          <nav className="bg-white backdrop-blur-lg rounded-full shadow-lg flex justify-between items-center p-4 relative">
            
            {/* Logo */}
            <div className="flex items-center flex-1 sm:flex-none">
              <Link href="/" className="flex items-center h-12 sm:h-16 md:h-18 lg:h-20 ml-4 sm:ml-6">
                <motion.img 
                  key={currentLogoIndex}
                  src={logos[currentLogoIndex]?.src || ''}
                  alt={logos[currentLogoIndex]?.alt || ''}
                  className="h-full w-auto object-contain max-w-full"
                  loading="eager"
                  decoding="async"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </Link>
            </div>

            {/* Desktop Navigation - Nur für sehr große Bildschirme */}
            <div className="hidden xl:flex items-center space-x-1">
              {navigation.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-2 py-1 rounded-full text-black hover:text-gray-700 transition-all duration-300 font-medium ${
                      isActive 
                        ? 'bg-gray-100 text-black shadow-lg' 
                        : 'hover:bg-gray-50'
                    }`}
                    style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1rem)' }}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Laptop Navigation - Für 1280x800 und ähnliche */}
            <div className="hidden lg:flex xl:hidden items-center space-x-0.5">
              {navigation.slice(0, 6).map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-1 py-1 rounded-full text-black hover:text-gray-700 transition-all duration-300 font-medium ${
                      isActive 
                        ? 'bg-gray-100 text-black shadow-lg' 
                        : 'hover:bg-gray-50'
                    }`}
                    style={{ fontSize: 'clamp(0.625rem, 1.1vw, 0.875rem)' }}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Tablet Navigation - Für 1024x600 und ähnliche */}
            <div className="hidden md:flex lg:hidden items-center space-x-0.5">
              {navigation.slice(0, 4).map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-1 py-1 rounded-full text-black hover:text-gray-700 transition-all duration-300 font-medium ${
                      isActive 
                        ? 'bg-gray-100 text-black shadow-lg' 
                        : 'hover:bg-gray-50'
                    }`}
                    style={{ fontSize: 'clamp(0.625rem, 1.2vw, 0.875rem)' }}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Right Side Buttons */}
            <div className="flex items-center space-x-2">
              {/* Alert Button - Desktop */}
              {alertSettings.isVisible && (
                <button
                  onClick={() => setIsAlertExpanded(!isAlertExpanded)}
                  className="hidden xl:flex items-center justify-center space-x-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-full px-3 py-2 font-semibold hover:from-amber-500 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl min-h-[48px] min-w-[48px]"
                  style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1rem)' }}
                >
                  <Bell className="w-4 h-4 font-bold" />
                  {isAlertExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              )}

              {/* Alert Button - Laptop */}
              {alertSettings.isVisible && (
                <button
                  onClick={() => setIsAlertExpanded(!isAlertExpanded)}
                  className="hidden lg:flex xl:hidden items-center justify-center space-x-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-full px-2 py-1.5 font-semibold hover:from-amber-500 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl min-h-[48px] min-w-[48px]"
                  style={{ fontSize: 'clamp(0.625rem, 1.1vw, 0.875rem)' }}
                >
                  <Bell className="w-3 h-3 font-bold" />
                  {isAlertExpanded ? <ChevronUp className="w-2 h-2" /> : <ChevronDown className="w-2 h-2" />}
                </button>
              )}

              {/* Alert Button - Tablet */}
              {alertSettings.isVisible && (
                <button
                  onClick={() => setIsAlertExpanded(!isAlertExpanded)}
                  className="hidden md:flex lg:hidden items-center justify-center space-x-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-full px-2 py-1.5 font-semibold hover:from-amber-500 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl min-h-[48px] min-w-[48px]"
                  style={{ fontSize: 'clamp(0.625rem, 1.2vw, 0.875rem)' }}
                >
                  <Bell className="w-3 h-3 font-bold" />
                  {isAlertExpanded ? <ChevronUp className="w-2 h-2" /> : <ChevronDown className="w-2 h-2" />}
                </button>
              )}

              {/* Contact Button - Desktop */}
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="hidden xl:flex items-center justify-center bg-[#FF0000] text-white rounded-full px-4 py-2 font-bold hover:bg-[#CC0000] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl min-h-[48px] min-w-[48px]"
                style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1rem)' }}
              >
                Kontakt
              </button>

              {/* Contact Button - Laptop */}
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="hidden lg:flex xl:hidden items-center justify-center bg-[#FF0000] text-white rounded-full px-3 py-1.5 font-bold hover:bg-[#CC0000] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl min-h-[48px] min-w-[48px]"
                style={{ fontSize: 'clamp(0.625rem, 1.1vw, 0.875rem)' }}
              >
                Kontakt
              </button>

              {/* Contact Button - Tablet */}
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="hidden md:flex lg:hidden items-center justify-center bg-[#FF0000] text-white rounded-full px-3 py-1.5 font-bold hover:bg-[#CC0000] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl min-h-[48px] min-w-[48px]"
                style={{ fontSize: 'clamp(0.625rem, 1.2vw, 0.875rem)' }}
              >
                Kontakt
              </button>

              {/* Mobile Alert Button */}
              {alertSettings.isVisible && (
                <button
                  onClick={() => setIsAlertExpanded(!isAlertExpanded)}
                  className="md:hidden mr-2 p-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-full hover:from-amber-500 hover:to-yellow-500 transition-all duration-300 min-h-[48px] min-w-[48px] flex items-center justify-center"
                  aria-label="Aktuelles öffnen"
                >
                  <Bell className="w-5 h-5 font-bold" />
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-black hover:text-gray-700 transition-colors duration-300 p-2 min-h-[48px] min-w-[48px] flex items-center justify-center"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menü öffnen"
              >
                {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>
          </nav>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white backdrop-blur-lg rounded-3xl shadow-lg mt-2 overflow-hidden"
            >
              {navigation.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block text-center py-3 px-4 text-black hover:text-gray-700 transition-colors min-h-[48px] flex items-center justify-center ${
                      isActive 
                        ? 'bg-gray-100 text-black font-semibold' 
                        : 'hover:bg-gray-50'
                    }`}
                    style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <Link
                href="#contact"
                className="block text-center py-4 bg-[#FF0000] text-white font-bold rounded-b-3xl hover:bg-[#CC0000] transition-colors min-h-[48px] flex items-center justify-center"
                style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Kontakt
              </Link>
            </motion.div>
          )}

          {/* Expandable Alert Panel - INNERHALB des Headers */}
          {alertSettings.isVisible && isAlertExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-500 mx-6 mb-2 md:mb-4 rounded-r-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <Bell className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0" />
                    <h3 className="text-lg font-bold text-yellow-800">Aktuelle Mitteilungen</h3>
                  </div>
                  <button
                    onClick={handleAlertDismiss}
                    className="text-yellow-600 hover:text-yellow-800 transition-colors p-1"
                    aria-label="Benachrichtigung dauerhaft schließen"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-yellow-700 mt-3 leading-relaxed">
                  {alertSettings.text}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </header>
    </>
  );
};

export default ResponsiveHeader;
