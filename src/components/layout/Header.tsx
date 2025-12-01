'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { Menu, X, Phone, MapPin, Bell, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import MedicalIcon from '../ui/MedicalIcon';
import ResponsiveImage from '../ui/ResponsiveImage';

interface AlertSettings {
  isVisible: boolean;
  text: string;
  lastUpdated: string;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isAlertExpanded, setIsAlertExpanded] = useState(false);
  const [alertSettings, setAlertSettings] = useState<AlertSettings>({
    isVisible: false, // Start with false, will be set by useEffect
    text: 'Aktuell: Bitte beachten Sie die Hinweise zur Praxis-Schließung über den Jahreswechsel',
    lastUpdated: new Date().toISOString()
  });
  const pathname = usePathname();

  // Simple and reliable alert dismissal
  const handleAlertDismiss = () => {
    console.log('🚨 User dismissed alertbar');
    const dismissTime = Date.now().toString();
    localStorage.setItem('alertDismissed', dismissTime);
    // Don't change isVisible - keep the bell button visible
    setIsAlertExpanded(false); // Only collapse the alert panel
  };

  // Load alert settings from API
  useEffect(() => {
    console.log('🚨 Checking alertbar visibility...');
    
    const loadFromAPI = async () => {
      try {
        const response = await fetch('/api/cms/alert');
        if (response.ok) {
          const apiSettings = await response.json();
          console.log('🚨 Loaded settings from API:', apiSettings);
          
          // Check if user has visited before
          const hasVisited = localStorage.getItem('hasVisited');
          const userDismissed = localStorage.getItem('alertDismissed');
          const lastAdminChange = localStorage.getItem('lastAdminChange');
          
          console.log('🚨 hasVisited:', hasVisited);
          console.log('🚨 userDismissed:', userDismissed);
          console.log('🚨 lastAdminChange:', lastAdminChange);
          
          // Check if admin made changes since user last dismissed
          const adminChangedAfterDismissal = lastAdminChange && userDismissed && 
            parseInt(lastAdminChange) > parseInt(userDismissed);
          
          if (!hasVisited) {
            // First visit - show alertbar
            console.log('🚨 First visit - showing alertbar');
            setAlertSettings(apiSettings);
            setIsAlertExpanded(true); // Auto-expand on first visit
            localStorage.setItem('hasVisited', 'true');
          } else if (userDismissed && !adminChangedAfterDismissal) {
            // User has dismissed and no admin changes since - keep bell button but don't auto-expand
            console.log('🚨 User dismissed - keeping bell button but not auto-expanding');
            setAlertSettings(apiSettings); // Use API data but keep bell button visible
            setIsAlertExpanded(false); // Don't auto-expand
          } else if (adminChangedAfterDismissal) {
            // Admin made changes after user dismissed - show alertbar again
            console.log('🚨 Admin changed after dismissal - showing alertbar again');
            setAlertSettings(apiSettings);
            setIsAlertExpanded(true); // Auto-expand for admin changes
            // Update dismissal timestamp to current admin change
            localStorage.setItem('alertDismissed', lastAdminChange);
          } else {
            // User visited but didn't dismiss - show alertbar
            console.log('🚨 Returning user - showing alertbar');
            setAlertSettings(apiSettings);
            setIsAlertExpanded(true); // Auto-expand for returning users
          }
          
          return true;
        }
      } catch (error) {
        console.error('Error loading from API:', error);
      }
      return false;
    };
    
    loadFromAPI();
  }, []);

  // Listen for admin changes - reset alertbar when admin updates
  useEffect(() => {
    const handleAdminChange = () => {
      console.log('🚨 Admin changed alertbar - updating for all users');
      
      // Reload from API
      fetch('/api/cms/alert')
        .then(response => response.json())
        .then(apiSettings => {
          console.log('🚨 Admin settings:', apiSettings);
          
          // Set timestamp for admin change (don't clear user dismissal)
          const adminChangeTime = Date.now().toString();
          localStorage.setItem('lastAdminChange', adminChangeTime);
          
          // Update alertbar with new content from admin
          setAlertSettings({
            isVisible: true, // Always keep bell button visible
            text: apiSettings.text,
            lastUpdated: apiSettings.lastUpdated
          });
          setIsAlertExpanded(true); // Auto-expand when admin changes
          
          // Force re-render by updating state
          setTimeout(() => {
            setAlertSettings(prev => ({ ...prev }));
          }, 100);
        })
        .catch(error => {
          console.error('Error reloading from API:', error);
        });
    };

    window.addEventListener('storage', handleAdminChange);
    window.addEventListener('alertSettingsChanged', handleAdminChange);
    
    return () => {
      window.removeEventListener('storage', handleAdminChange);
      window.removeEventListener('alertSettingsChanged', handleAdminChange);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Detect active section based on visible area
      const sections = [
        { id: 'locations', element: document.getElementById('locations') },
        { id: 'services', element: document.getElementById('services') },
        { id: 'team', element: document.getElementById('team') },
        { id: 'labor', element: document.getElementById('labor') },
        { id: 'galerie', element: document.getElementById('galerie') },
        { id: 'blog', element: document.getElementById('blog') },
        { id: 'karriere', element: document.getElementById('karriere') },
        { id: 'downloads', element: document.getElementById('downloads') },
        { id: 'contact', element: document.getElementById('contact') }
      ];

      let maxVisibleArea = 0;
      let activeSection = '';

      sections.forEach((section) => {
        if (section?.element) {
          const rect = section.element.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          // Calculate visible area
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(windowHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const visibleArea = visibleHeight * rect.width;

          // Check if section is in viewport and has significant visible area
          if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.3 && visibleArea > maxVisibleArea) {
            maxVisibleArea = visibleArea;
            activeSection = section.id;
          }
        }
      });

      if (activeSection) {
        setActiveSection(activeSection);
        // Debug: Log active section (remove in production)
        console.log('Active section:', activeSection);
      } else {
        // Fallback: Use scroll position if no section is detected
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        if (scrollPosition < windowHeight * 0.5) {
          setActiveSection('locations');
        } else if (scrollPosition < windowHeight * 1.5) {
          setActiveSection('services');
        } else if (scrollPosition < windowHeight * 2.5) {
          setActiveSection('team');
        } else if (scrollPosition < windowHeight * 3.5) {
          setActiveSection('labor');
        } else if (scrollPosition < windowHeight * 4.5) {
          setActiveSection('galerie');
        } else if (scrollPosition < windowHeight * 5.5) {
          setActiveSection('blog');
        } else if (scrollPosition < windowHeight * 6.5) {
          setActiveSection('karriere');
        } else if (scrollPosition < windowHeight * 7.5) {
          setActiveSection('downloads');
        } else {
          setActiveSection('contact');
        }
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', throttledScroll);
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

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 py-4">
      <div className="container mx-auto px-6">
        <div className="bg-white backdrop-blur-lg rounded-full shadow-lg flex justify-between items-center card-spacing relative">
          {/* Logo */}
            <div className="flex items-center flex-1 sm:flex-none">
              <Link href="/" className="flex items-center text-2xl font-bold text-[#FF0000] hover:text-[#CC0000] transition-colors duration-300">
                <img 
                  src="/images/stab.jpg" 
                  alt="Logo" 
                  className="w-10 h-10 mr-3 object-contain"
                  loading="eager"
                  decoding="async"
                />
                <span className="hidden sm:inline">Hausarztpraxis Dr. Schirmer</span>
              </Link>
              <span className="sm:hidden text-center flex-1 text-2xl font-bold text-[#FF0000] ml-3">Dr. Schirmer</span>
            </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navigation.map((item) => {
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
                  style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1rem)' }}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Tablet Navigation - Kompakter */}
          <nav className="hidden lg:flex xl:hidden items-center space-x-0.5">
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
          </nav>

          {/* Alert Toggle Button */}
          {alertSettings.isVisible && (
            <button
              onClick={() => setIsAlertExpanded(!isAlertExpanded)}
              className="hidden lg:flex items-center justify-center space-x-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-full px-2 py-1.5 font-semibold hover:from-amber-500 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mr-1 min-h-[48px] min-w-[48px]"
              style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1rem)' }}
            >
              <Bell className="w-4 h-4 font-bold" />
              {isAlertExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          )}

          {/* Desktop CTA Button */}
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="hidden lg:flex items-center justify-center bg-[#FF0000] text-white rounded-full px-3 py-1.5 font-bold hover:bg-[#CC0000] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl min-h-[48px] min-w-[48px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1rem)' }}
          >
            Kontakt
          </button>

          {/* Mobile Alert Button */}
          {alertSettings.isVisible && (
            <button
              onClick={() => setIsAlertExpanded(!isAlertExpanded)}
              className="lg:hidden mr-2 p-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-full hover:from-amber-500 hover:to-yellow-500 transition-all duration-300 min-h-[48px] min-w-[48px] flex items-center justify-center"
              aria-label="Aktuelles öffnen"
            >
              <Bell className="w-5 h-5 font-bold" />
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden mr-2 text-black hover:text-gray-700 transition-colors duration-300 p-2 min-h-[48px] min-w-[48px] flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menü öffnen"
          >
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white backdrop-blur-lg rounded-3xl shadow-lg mt-2">
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
          </div>
        )}

        {/* Expandable Alert Panel */}
        {alertSettings.isVisible && isAlertExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="w-6 h-6 text-white" />
                  <h3 className="text-base font-bold text-white">Aktuelle Mitteilungen</h3>
                </div>
                <button
                  onClick={handleAlertDismiss}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Benachrichtigung dauerhaft schließen"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm font-medium text-white leading-relaxed mt-2">
                {alertSettings.text}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;