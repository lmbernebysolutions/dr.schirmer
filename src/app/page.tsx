'use client';

import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Car, 
  Accessibility, 
  Navigation,
  Route,
  Calendar,
  CheckCircle, 
  Stethoscope,
  Heart,
  Shield,
  Users,
  GraduationCap,
  Award,
  Star,
  ArrowRight,
  Mail,
  Globe,
  Baby,
  TestTube,
  Home,
  Lock
} from 'lucide-react';
import ResponsiveImage from '@/components/ui/ResponsiveImage';
import ResponsiveHeader from '@/components/layout/ResponsiveHeader';
import SectionDivider from '@/components/ui/SectionDivider';
import { SERVICES, IGeL_SERVICES } from '@/config/services';
import { PRACTICES } from '@/config/company';
import { useCookieConsent } from 'react-cookie-manager';

// Lazy load alle Sektionen
const DoctorsTeam = lazy(() => import('@/components/sections/DoctorsTeam'));
const ChildConsultation = lazy(() => import('@/components/sections/ChildConsultation'));
const LabServices = lazy(() => import('@/components/sections/LabServices'));
const NewsSection = lazy(() => import('@/components/sections/NewsSection'));
const AnimatedHero = lazy(() => import('@/components/sections/AnimatedHero'));
const PracticeGallery = lazy(() => import('@/components/sections/PracticeGallery'));

// Loading Component
const SectionLoader = () => (
  <div className="flex justify-center items-center py-16">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

const HomePage: React.FC = () => {
  const [selectedMap, setSelectedMap] = React.useState<'zschorlau' | 'aue'>('zschorlau');
  const [showPhoneModal, setShowPhoneModal] = React.useState(false);
  const [openAccordions, setOpenAccordions] = React.useState<Set<string>>(new Set());
  const { detailedConsent, openPreferencesModal } = useCookieConsent();

  const toggleAccordion = (id: string) => {
    setOpenAccordions(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Prüfe ob Social-Cookies (Externe Dienste) erlaubt sind
  const hasSocialConsent = detailedConsent?.Social?.consented === true;

  // Google Maps Embed URLs (kein API Key benötigt für Static Server)
  const mapsEmbedUrls = {
    zschorlau: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2534.380256760598!2d12.6380256763231!3d50.56429417161414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a0c96ff2447a0b%3A0x1902c32d6d842b20!2sSchneeberger%20Str.%203%2C%2008321%20Zschorlau!5e0!3m2!1sen!2sde!4v1761333014395!5m2!1sen!2sde",
    aue: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2533.2180119553846!2d12.701939776324465!3d50.58590107161833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a0ca13bd023821%3A0x7ebb9bce54aecac7!2sSchwarzenberger%20Str.%207%2C%2008280%20Aue-Bad%20Schlema!5e0!3m2!1sen!2sde!4v1761333046361!5m2!1sen!2sde"
  };

  const handlePhoneCall = (practice: 'zschorlau' | 'aue') => {
    const phoneNumber = practice === 'zschorlau' ? '037715653950' : '0377120208';
    window.open(`tel:${phoneNumber}`, '_self');
    setShowPhoneModal(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding-xl bg-section-primary pt-4 md:pt-16">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-4 md:gap-6 justify-center md:justify-start">
              <motion.img 
                src="/images/stab.jpg" 
                alt="Äskulapstab - Symbol der Medizin" 
                className="hidden md:block h-[4rem] lg:h-[5rem] w-auto object-contain flex-shrink-0 self-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              />
              <div className="space-y-6">
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold leading-tight text-gray-900"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                >
                  <span className="block">Hausarztpraxis</span>
                  <span className="block text-[#FF0000] hover:text-[#CC0000] transition-colors duration-300 cursor-pointer">Dr. Schirmer</span>
                </motion.h1>
                <motion.p 
                  className="text-xl text-gray-600 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                >
                  Ihre vertrauensvolle Hausarztpraxis in Zschorlau und Aue. 
                  Mit moderner Ausstattung und persönlicher Betreuung für die ganze Familie.
                </motion.p>
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                >
                  <button 
                    onClick={() => document.getElementById('locations')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-full px-8 py-4 font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center hover:from-amber-500 hover:to-yellow-500 min-h-[48px] min-w-[48px]"
                  >
                    <MapPin className="mr-2 h-5 w-5" />
                    Zu unseren Praxen
                  </button>
                  <button 
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-[#FF0000] text-white rounded-full px-8 py-4 font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center hover:bg-[#CC0000] min-h-[48px] min-w-[48px]"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Termin vereinbaren
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          {/* Tablet Praxis-Rechtecke */}
          <div className="hidden md:flex lg:hidden justify-center mt-8">
            <div className="flex gap-6 items-center">
              <div className="flex flex-col items-center">
                <div className="min-w-[180px] min-h-[180px] max-w-[200px] max-h-[200px] bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden hover:from-amber-500 hover:to-yellow-500 p-4">
                  <ResponsiveImage 
                    src="/images/logo01.png" 
                    alt="Praxis Zschorlau Logo" 
                    className="w-full h-full object-contain"
                    sizes="160px"
                    priority={true}
                  />
                </div>
                <span className="text-gray-900 font-bold mt-3 text-base">Zschorlau</span>
                <span className="text-yellow-600 text-sm font-medium">Hauptstandort</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="min-w-[180px] min-h-[180px] max-w-[200px] max-h-[200px] bg-[#FF0000] rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden hover:bg-[#CC0000] p-4">
                  <ResponsiveImage 
                    src="/images/logo02.png" 
                    alt="Praxis Aue Logo" 
                    className="w-full h-full object-contain"
                    sizes="160px"
                    priority={true}
                  />
                </div>
                <span className="text-gray-900 font-bold mt-3 text-base">Aue</span>
                <span className="text-red-600 text-sm font-medium">Zweigstelle</span>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:flex justify-center">
            {/* Zwei größere Praxis-Rechtecke zentriert */}
            <div className="flex gap-12 items-center">
                <div className="flex flex-col items-center">
                  <div className="min-w-[320px] min-h-[320px] max-w-[360px] max-h-[360px] bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden hover:from-amber-500 hover:to-yellow-500 p-6">
                    <ResponsiveImage 
                      src="/images/logo01.png" 
                      alt="Praxis Zschorlau Logo" 
                      className="w-full h-full object-contain"
                      sizes="(max-width: 768px) 0px, 320px"
                      priority={true}
                    />
              </div>
                  <span className="text-gray-900 font-bold mt-4 text-xl">Zschorlau</span>
                  <span className="text-yellow-600 text-lg font-medium">Hauptstandort</span>
            </div>
                
                <div className="flex flex-col items-center">
                  <div className="min-w-[320px] min-h-[320px] max-w-[360px] max-h-[360px] bg-[#FF0000] rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden hover:bg-[#CC0000] p-6">
                    <ResponsiveImage 
                      src="/images/logo02.png" 
                      alt="Praxis Aue Logo" 
                      className="w-full h-full object-contain"
                      sizes="(max-width: 768px) 0px, 320px"
                      priority={true}
                    />
                  </div>
                  <span className="text-gray-900 font-bold mt-4 text-xl">Aue</span>
                  <span className="text-red-600 text-lg font-medium">Zweigstelle</span>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section id="locations" className="section-padding bg-section-primary">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center element-spacing-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 element-spacing">
              Unsere Standorte
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Wir sind für Sie da an zwei Standorten im Erzgebirge für eine gute Erreichbarkeit
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Zschorlau - Gelb */}
            <motion.div 
              className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 border-l-8 border-yellow-500"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-yellow-600 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                  <ResponsiveImage 
                    src="/images/logo01.png" 
                    alt="Logo Zschorlau" 
                    className="w-full h-full object-contain rounded-full scale-95"
                    sizes="(max-width: 768px) 80px, 96px"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-3xl font-bold text-yellow-600">Praxis Zschorlau</h3>
                  </div>
                  <p className="text-gray-600">Hauptstandort</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mt-1 mr-3 flex-shrink-0 text-yellow-600" />
                  <p className="text-gray-700">Schneeberger Straße 3<br />08321 Zschorlau</p>
                </div>
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700 font-medium">03771 / 56 53 950</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-yellow-600" />
                  Sprechzeiten Zschorlau
                </h4>
                <ul className="text-gray-600 space-y-1 text-xs md:text-sm">
                  <li><strong>MONTAG:</strong> 07:30 - 12:00 Uhr & 14:00 - 16:00 Uhr</li>
                  <li><strong>DIENSTAG:</strong> 07:30 - 11:30 Uhr</li>
                  <li><strong>MITTWOCH:</strong> 07:30 - 12:00 Uhr</li>
                  <li><strong>DONNERSTAG:</strong> 07:30 - 12:00 Uhr & 14:00 - 18:00 Uhr<br />
                      <span className="text-yellow-700 font-medium ml-4">Kindersprechstunde: 15:00 - 17:00 Uhr</span></li>
                  <li><strong>FREITAG:</strong> 07:30 - 11:30 Uhr</li>
                </ul>
              </div>

              <div className="mb-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Akutterminanmeldung
                </h4>
                <p className="text-yellow-700 text-sm">
                  <strong>Bitte in der Zeit von 7:30 - 10:00 Uhr!!</strong><br />
                  Nur so können wir lange Wartezeiten vermeiden und Ihnen eine zeitnahe Akutbehandlung ermöglichen.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => window.open('tel:037715653950')}
                  className="flex-1 basis-0 min-w-0 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-full px-6 py-3 font-bold hover:from-amber-500 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center min-h-[48px]"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Anrufen
                </button>
                <button 
                  onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Schneeberger+Straße+3,+08321+Zschorlau')}
                  className="flex-1 basis-0 min-w-0 bg-yellow-100 text-yellow-600 rounded-full px-6 py-3 font-bold hover:bg-yellow-200 transition-all duration-300 transform hover:scale-105 flex items-center justify-center min-h-[48px]"
                >
                  <Navigation className="mr-2 h-4 w-4" />
                  Route
                </button>
              </div>
            </motion.div>

            {/* Aue - Rot */}
            <motion.div 
              className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 border-l-8 border-red-500"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-red-600 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                  <ResponsiveImage 
                    src="/images/logo02.png" 
                    alt="Logo Aue" 
                    className="w-full h-full object-contain rounded-full scale-95"
                    sizes="(max-width: 768px) 80px, 96px"
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-2 text-red-600">Praxis Aue</h3>
                  <p className="text-gray-600">Zweigstelle</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mt-1 mr-3 flex-shrink-0 text-red-600" />
                  <p className="text-gray-700">Schwarzenberger Straße 7<br />08280 Aue</p>
                </div>
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-red-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700 font-medium">03771 / 20 208</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-red-600" />
                  Sprechzeiten Aue
                </h4>
                <ul className="text-gray-600 space-y-1 text-xs md:text-sm">
                  <li><strong>MONTAG:</strong> 07:30 - 12:00 Uhr & 14:00 - 17:00 Uhr</li>
                  <li><strong>DIENSTAG:</strong> 07:30 - 12:00 Uhr & 14:00 - 17:00 Uhr</li>
                  <li><strong>MITTWOCH:</strong> Geschlossen</li>
                  <li><strong>DONNERSTAG:</strong> Geschlossen</li>
                  <li><strong>FREITAG:</strong> Geschlossen</li>
                </ul>
              </div>

              <div className="mb-6 p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                <h4 className="font-bold text-red-800 mb-2 flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Akutterminanmeldung
                </h4>
                <p className="text-red-700 text-sm">
                  <strong>Bitte in der Zeit von 7:30 - 10:00 Uhr!!</strong><br />
                  Nur so können wir lange Wartezeiten vermeiden und Ihnen eine zeitnahe Akutbehandlung ermöglichen.
                </p>
              </div>
    
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => window.open('tel:0377120208')}
                  className="flex-1 basis-0 min-w-0 bg-[#FF0000] text-white rounded-full px-6 py-3 font-bold hover:bg-[#CC0000] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center min-h-[48px]"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Anrufen
                </button>
                <button 
                  onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Schwarzenberger+Straße+7,+08280+Aue')}
                  className="flex-1 basis-0 min-w-0 bg-red-100 text-red-600 rounded-full px-6 py-3 font-bold hover:bg-red-200 transition-all duration-300 transform hover:scale-105 flex items-center justify-center min-h-[48px]"
                >
                  <Navigation className="mr-2 h-4 w-4" />
                  Route
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <NewsSection />

      {/* Section Divider */}
      <SectionDivider variant="subtle" />

      {/* Services Section */}
      <section id="services" className="section-padding bg-section-primary">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center element-spacing-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 element-spacing">
              Unsere Leistungen
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Umfassende medizinische Versorgung für die ganze Familie
            </p>
          </motion.div>

          {/* Accordion für detaillierte Leistungen - WCAG-konform mit ARIA */}
          <div className="max-w-3xl mx-auto space-y-5">
            <motion.div 
              className={`accordion-item bg-white rounded-2xl shadow-lg overflow-hidden ${openAccordions.has('diagnostik') ? 'open' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <button 
                id="accordion-button-diagnostik"
                aria-expanded={openAccordions.has('diagnostik')}
                aria-controls="accordion-content-diagnostik"
                className="accordion-header w-full flex justify-between items-center text-left p-6 min-h-[48px]"
                onClick={() => toggleAccordion('diagnostik')}
              >
                <span className="text-2xl font-bold">Moderne Diagnostik</span>
                <div className={`accordion-icon w-8 h-8 flex-shrink-0 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center transition-transform duration-500 ${openAccordions.has('diagnostik') ? 'rotate-45' : ''}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </div>
              </button>
              <div 
                id="accordion-content-diagnostik"
                role="region"
                aria-labelledby="accordion-button-diagnostik"
                className="accordion-content px-6"
                hidden={!openAccordions.has('diagnostik')}
              >
                <p className="text-gray-600">Mit EKG, Ergometrie und Lungenfunktionstests führen wir umfassende Diagnostik durch, um eine fundierte Behandlungsgrundlage zu schaffen.</p>
              </div>
            </motion.div>

            <motion.div 
              className={`accordion-item bg-white rounded-2xl shadow-lg overflow-hidden ${openAccordions.has('vorsorge') ? 'open' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <button 
                id="accordion-button-vorsorge"
                aria-expanded={openAccordions.has('vorsorge')}
                aria-controls="accordion-content-vorsorge"
                className="accordion-header w-full flex justify-between items-center text-left p-6 min-h-[48px]"
                onClick={() => toggleAccordion('vorsorge')}
              >
                <span className="text-2xl font-bold">Ganzheitliche Vorsorge</span>
                <div className={`accordion-icon w-8 h-8 flex-shrink-0 bg-red-100 text-red-600 rounded-full flex items-center justify-center transition-transform duration-500 ${openAccordions.has('vorsorge') ? 'rotate-45' : ''}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </div>
              </button>
              <div 
                id="accordion-content-vorsorge"
                role="region"
                aria-labelledby="accordion-button-vorsorge"
                className="accordion-content px-6"
                hidden={!openAccordions.has('vorsorge')}
              >
                <p className="text-gray-600">Von Vorsorgeuntersuchungen über Hautkrebsscreenings bis zu U-Untersuchungen – wir begleiten Sie in allen Lebensphasen bei Ihrer Gesundheitsvorsorge.</p>
              </div>
            </motion.div>

            <motion.div 
              className={`accordion-item bg-white rounded-2xl shadow-lg overflow-hidden ${openAccordions.has('igel') ? 'open' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              <button 
                id="accordion-button-igel"
                aria-expanded={openAccordions.has('igel')}
                aria-controls="accordion-content-igel"
                className="accordion-header w-full flex justify-between items-center text-left p-6 min-h-[48px]"
                onClick={() => toggleAccordion('igel')}
              >
                <span className="text-2xl font-bold">Individuelle Gesundheitsleistungen (IGeL)</span>
                <div className={`accordion-icon w-8 h-8 flex-shrink-0 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center transition-transform duration-500 ${openAccordions.has('igel') ? 'rotate-45' : ''}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </div>
              </button>
              <div 
                id="accordion-content-igel"
                role="region"
                aria-labelledby="accordion-button-igel"
                className="accordion-content px-6"
                hidden={!openAccordions.has('igel')}
              >
                <div className="space-y-3">
                  <p className="text-gray-600 mb-4">Erweiterte Gesundheitsleistungen für eine umfassende Versorgung:</p>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {IGeL_SERVICES.map((service, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className={`accordion-item bg-white rounded-2xl shadow-lg overflow-hidden ${openAccordions.has('hausbesuche') ? 'open' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
              <button 
                id="accordion-button-hausbesuche"
                aria-expanded={openAccordions.has('hausbesuche')}
                aria-controls="accordion-content-hausbesuche"
                className="accordion-header w-full flex justify-between items-center text-left p-6 min-h-[48px]"
                onClick={() => toggleAccordion('hausbesuche')}
              >
                <span className="text-2xl font-bold">Hausbesuche & Notfallversorgung</span>
                <div className={`accordion-icon w-8 h-8 flex-shrink-0 bg-red-100 text-red-600 rounded-full flex items-center justify-center transition-transform duration-500 ${openAccordions.has('hausbesuche') ? 'rotate-45' : ''}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </div>
              </button>
              <div 
                id="accordion-content-hausbesuche"
                role="region"
                aria-labelledby="accordion-button-hausbesuche"
                className="accordion-content px-6"
                hidden={!openAccordions.has('hausbesuche')}
              >
                <p className="text-gray-600">Für immobile Patienten bieten wir Hausbesuche an. Bei akuten Notfällen sind wir für Sie da und koordinieren mit dem Rettungsdienst.</p>
              </div>
            </motion.div>
          </div>
      </div>
    </section>

      {/* Kindersprechstunde Section */}
      <ChildConsultation />

      {/* Section Divider */}
      <SectionDivider variant="subtle" />

      {/* Team Section */}
      <DoctorsTeam />

      {/* Section Divider */}
      <SectionDivider variant="subtle" />

      {/* Lab Services Section */}
      <LabServices />

      {/* Section Divider */}
      <SectionDivider variant="subtle" />

      {/* Practice Gallery Section */}
      <PracticeGallery />

      {/* Section Divider */}
      <SectionDivider variant="subtle" />

      {/* Karriere Section */}
      <section id="karriere" className="section-padding bg-section-primary">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center element-spacing-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 element-spacing">
              Ausbildung
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Starten Sie Ihre medizinische Ausbildung bei uns
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Medizinstudenten */}
              <motion.div 
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              >
                <div className="w-20 h-20 bg-yellow-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <GraduationCap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-yellow-600 mb-4 text-center">
                  Medizinstudenten
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 text-center">
                  Als anerkannte Lehrpraxis bieten wir Medizinstudenten der Universitäten 
                  Dresden, Leipzig und Chemnitz umfassende praktische Erfahrung.
                </p>
                <div className="text-center">
                  <button 
                    onClick={() => window.open('mailto:hausarztpraxis-dr-schirmer@web.de?subject=Bewerbung Medizinstudent&body=Sehr geehrte Damen und Herren,%0D%0A%0D%0Ahiermit bewerbe ich mich um einen Platz als Medizinstudent in Ihrer Lehrpraxis.%0D%0A%0D%0AMit freundlichen Grüßen', '_blank')}
                    className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-full px-6 py-3 font-bold hover:from-amber-500 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Bewerbung einreichen
                  </button>
                </div>
              </motion.div>

              {/* Lehrpraxis der Universitäten */}
              <motion.div 
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                <div className="w-20 h-20 bg-yellow-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <GraduationCap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-yellow-600 mb-4 text-center">
                  Lehrpraxis der Universitäten
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 text-center">
                  Als anerkannte Lehrpraxis der Universitäten Dresden, Leipzig und Chemnitz 
                  geben wir unser Wissen mit Freude an die nächste Generation weiter.
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {["Dresden", "Leipzig", "Chemnitz"].map((uni, index) => (
                    <span
                      key={index}
                      className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      Universität {uni}
                    </span>
                  ))}
                </div>
                <div className="text-center">
                  <button 
                    onClick={() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-full px-6 py-3 font-bold hover:from-amber-500 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Mehr erfahren
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <SectionDivider variant="subtle" />

      {/* Downloads Section */}
      <section id="downloads" className="section-padding bg-section-primary">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center element-spacing-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 element-spacing">
              Downloads
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Wichtige Formulare und Dokumente für Ihren Praxisbesuch
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-8 max-w-4xl mx-auto">
            <motion.div 
              className="bg-white rounded-2xl md:rounded-3xl p-3 md:card-spacing-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 md:border-l-8 border-yellow-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <div className="w-8 h-8 md:w-16 md:h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-2 md:element-spacing mx-auto md:mx-0">
                <Mail className="w-4 h-4 md:w-8 md:h-8 text-yellow-600" />
              </div>
              <h3 className="text-xs md:text-xl font-bold text-yellow-600 mb-1 md:text-spacing text-center md:text-left">
                <span className="hidden sm:inline">Patientenaufnahmebogen</span>
                <span className="sm:hidden">Aufnahmebogen</span>
              </h3>
              <p className="text-gray-600 leading-relaxed mb-2 md:text-spacing text-xs md:text-base text-center md:text-left">
                <span className="hidden sm:inline">Füllen Sie diesen Bogen vor Ihrem ersten Besuch aus, um Wartezeiten zu verkürzen.</span>
                <span className="sm:hidden">Wartezeiten verkürzen</span>
              </p>
              <button className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-full px-2 py-1 md:px-6 md:py-3 font-bold hover:from-amber-500 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-xs md:text-base w-full">
                <span className="hidden sm:inline">PDF herunterladen</span>
                <span className="sm:hidden">PDF</span>
              </button>
            </motion.div>

            <motion.div 
              className="bg-white rounded-2xl md:rounded-3xl p-3 md:card-spacing-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 md:border-l-8 border-red-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <div className="w-8 h-8 md:w-16 md:h-16 bg-red-100 rounded-full flex items-center justify-center mb-2 md:element-spacing mx-auto md:mx-0">
                <Heart className="w-4 h-4 md:w-8 md:h-8 text-red-600" />
              </div>
              <h3 className="text-xs md:text-xl font-bold text-red-600 mb-1 md:text-spacing text-center md:text-left">
                <span className="hidden sm:inline">Einverständniserklärung</span>
                <span className="sm:hidden">Einverständnis</span>
              </h3>
              <p className="text-gray-600 leading-relaxed mb-2 md:text-spacing text-xs md:text-base text-center md:text-left">
                <span className="hidden sm:inline">Einverständniserklärung für Behandlungen und Datenverarbeitung nach DSGVO.</span>
                <span className="sm:hidden">DSGVO-konform</span>
              </p>
              <button className="bg-[#FF0000] text-white rounded-full px-2 py-1 md:px-6 md:py-3 font-bold hover:bg-[#CC0000] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-xs md:text-base w-full">
                <span className="hidden sm:inline">PDF herunterladen</span>
                <span className="sm:hidden">PDF</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <SectionDivider variant="subtle" />

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-section-primary">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Kontakt & Terminvereinbarung
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Rufen Sie uns an oder schreiben Sie uns eine E-Mail. Wir sind für Sie da!
            </p>
            
          </motion.div>
          
          <div className="max-w-6xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Praxis Zschorlau */}
              <motion.div 
                className="bg-white rounded-2xl shadow-lg p-6 text-gray-900"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              >
              <div className="flex items-center mb-3 md:mb-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-yellow-600 rounded-full flex items-center justify-center mr-2 md:mr-3">
                  <Home className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold">Praxis Zschorlau</h3>
                  <p className="text-yellow-600 text-xs md:text-sm">Landarztpraxis</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-yellow-600" />
                  <div>
                    <p className="font-semibold text-sm">Telefon</p>
                    <p className="text-sm">03771 / 56 53 950</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-yellow-600" />
                  <div>
                    <p className="font-semibold text-sm">Fax</p>
                    <p className="text-sm">03771 / 56 53 959</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-yellow-600" />
                  <div>
                    <p className="font-semibold text-sm">E-Mail</p>
                    <p className="text-sm">hausarztpraxis-dr-schirmer@web.de</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 text-yellow-600 mt-1" />
                  <div>
                    <p className="font-semibold text-sm">Adresse</p>
                    <p className="text-sm">Schneeberger Straße 3<br />08321 Zschorlau</p>
                  </div>
                </div>
              </div>
              
              {/* Route Button */}
              <div className="mt-4">
                <button 
                  onClick={() => {
                    const isApple = /iPad|iPhone|iPod/.test(navigator.userAgent);
                    const mapsUrl = isApple 
                      ? 'https://maps.apple.com/?q=Schneeberger+Straße+3,+08321+Zschorlau'
                      : 'https://www.google.com/maps/dir/?api=1&destination=Schneeberger+Straße+3,+08321+Zschorlau';
                    window.open(mapsUrl, '_blank');
                  }}
                  className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-full px-3 py-2 text-sm font-semibold hover:from-amber-500 hover:to-yellow-500 transition-all duration-300 flex items-center justify-center"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Route aufrufen
                </button>
              </div>
            </motion.div>

            {/* Praxis Aue */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-6 text-gray-900"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mr-3">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Praxis Aue</h3>
                  <p className="text-red-600 text-sm">Zweigstelle</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-red-600" />
                  <div>
                    <p className="font-semibold text-sm">Telefon</p>
                    <p className="text-sm">03771 / 20 208</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-red-600" />
                  <div>
                    <p className="font-semibold text-sm">Fax</p>
                    <p className="text-sm">03771 / 25 90 944</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-red-600" />
                  <div>
                    <p className="font-semibold text-sm">E-Mail</p>
                    <p className="text-sm">hausarztpraxis-dr-schirmer@web.de</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 text-red-600 mt-1" />
                  <div>
                    <p className="font-semibold text-sm">Adresse</p>
                    <p className="text-sm">Schwarzenberger Straße 7<br />08280 Aue</p>
                  </div>
                </div>
              </div>
              
              {/* Route Button */}
              <div className="mt-4">
                <button 
                  onClick={() => {
                    const isApple = /iPad|iPhone|iPod/.test(navigator.userAgent);
                    const mapsUrl = isApple 
                      ? 'https://maps.apple.com/?q=Schwarzenberger+Straße+7,+08280+Aue'
                      : 'https://www.google.com/maps/dir/?api=1&destination=Schwarzenberger+Straße+7,+08280+Aue';
                    window.open(mapsUrl, '_blank');
                  }}
                  className="w-full bg-[#FF0000] text-white rounded-full px-3 py-2 text-sm font-semibold hover:bg-[#CC0000] transition-all duration-300 flex items-center justify-center"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Route aufrufen
                </button>
              </div>
            </motion.div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            
            {/* Schnellkontakt - Verbessertes Layout */}
            <motion.div 
              className="bg-white rounded-3xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              {/* Header mit Icon */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
                <h3 className="text-2xl font-bold text-white flex items-center">
                  <Phone className="w-6 h-6 mr-3" />
                  Schnellkontakt
                </h3>
                <p className="text-red-50 text-sm mt-2">Wählen Sie Ihre bevorzugte Kontaktmethode</p>
              </div>
              
              <div className="p-6">
                {/* Primäre Kontaktmethoden - Prominenter */}
                <div className="space-y-3 mb-6">
                  <button
                    onClick={() => setShowPhoneModal(true)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl px-6 py-4 font-bold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center group"
                  >
                    <Phone className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                    <span>Jetzt anrufen</span>
                  </button>
                  <button
                    onClick={() => window.open('mailto:hausarztpraxis-dr-schirmer@web.de', '_self')}
                    className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-white rounded-xl px-6 py-4 font-bold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center group"
                  >
                    <Mail className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                    <span>E-Mail senden</span>
                  </button>
                </div>
                
                {/* Sekundäre Kontaktmethoden - Kompakter */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wide">Weitere Kanäle</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => window.open('https://wa.me/4937715653950?text=Hallo%2C%20ich%20möchte%20einen%20Termin%20vereinbaren.', '_blank')}
                      className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-3 font-semibold text-sm transition-all duration-300 flex items-center justify-center group shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                      WhatsApp
                    </button>
                    <button
                      onClick={() => window.open('https://www.instagram.com/hausarztpraxis.dr.schirmer/', '_blank')}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white rounded-lg px-4 py-3 font-semibold text-sm transition-all duration-300 flex items-center justify-center group shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      Instagram
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Standorte - Verbessertes Layout */}
            <motion.div 
              className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
              {/* Header mit Icon */}
              <div className={`p-6 ${selectedMap === 'zschorlau' ? 'bg-gradient-to-r from-yellow-500 to-amber-500' : 'bg-gradient-to-r from-red-500 to-red-600'}`}>
                <h3 className="text-2xl font-bold text-white flex items-center mb-4">
                  <MapPin className="w-6 h-6 mr-3" />
                  Standorte
                </h3>
                
                {/* Karten-Auswahl - Verbessert */}
                <div className="flex space-x-2 bg-white/20 backdrop-blur-sm rounded-xl p-1">
                  <button 
                    onClick={() => setSelectedMap('zschorlau')}
                    className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ${
                      selectedMap === 'zschorlau' 
                        ? 'bg-white text-yellow-600 shadow-md' 
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Zschorlau
                  </button>
                  <button 
                    onClick={() => setSelectedMap('aue')}
                    className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ${
                      selectedMap === 'aue' 
                        ? 'bg-white text-red-600 shadow-md' 
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Aue
                  </button>
                </div>
              </div>
              
              {/* Standort-Info */}
              <div className="p-6 pb-4 border-b border-gray-100">
                <div className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    selectedMap === 'zschorlau' ? 'bg-yellow-100' : 'bg-red-100'
                  }`}>
                    <MapPin className={`w-6 h-6 ${selectedMap === 'zschorlau' ? 'text-yellow-600' : 'text-red-600'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-bold text-lg mb-1 ${selectedMap === 'zschorlau' ? 'text-yellow-600' : 'text-red-600'}`}>
                      Praxis {selectedMap === 'zschorlau' ? 'Zschorlau' : 'Aue'}
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {selectedMap === 'zschorlau' 
                        ? 'Schneeberger Straße 3, 08321 Zschorlau'
                        : 'Schwarzenberger Straße 7, 08280 Aue'
                      }
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Karte - Größer und prominenter */}
              <div 
                className="flex-1 min-h-[300px] lg:min-h-[350px]"
                key={`map-container-${hasSocialConsent ? 'allowed' : 'blocked'}-${selectedMap}`}
              >
                {hasSocialConsent ? (
                  <iframe
                    src={mapsEmbedUrls[selectedMap]}
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '300px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Praxis ${selectedMap === 'zschorlau' ? 'Zschorlau' : 'Aue'} - Google Maps`}
                    className="w-full h-full"
                  />
                ) : (
                  <div 
                    className="w-full h-full bg-gray-900 flex flex-col items-center justify-center text-center p-8"
                    style={{ minHeight: '300px' }}
                  >
                    <Lock className="w-12 h-12 text-gray-400 mb-4" />
                    <h4 className="text-lg font-bold text-white mb-2">
                      Karte blockiert
                    </h4>
                    <p className="text-gray-300 text-sm mb-4 max-w-md">
                      Um die Karte anzuzeigen, müssen Sie der Nutzung von externen Diensten (Google Maps) in den Cookie-Einstellungen zustimmen.
                    </p>
                    <button
                      onClick={openPreferencesModal}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300"
                    >
                      Cookie-Einstellungen öffnen
                    </button>
                  </div>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Floating WhatsApp CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => window.open('https://wa.me/4937715653950?text=Hallo%2C%20ich%20möchte%20einen%20Termin%20vereinbaren.', '_blank')}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
          aria-label="WhatsApp Nachricht senden"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </button>
      </div>

      {/* Phone Selection Modal */}
      {showPhoneModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Praxis auswählen</h3>
              <p className="text-gray-600">Wählen Sie die Praxis, die Sie anrufen möchten:</p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => handlePhoneCall('zschorlau')}
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-full px-6 py-4 font-bold hover:from-amber-500 hover:to-yellow-500 transition-colors duration-300 flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-bold">Praxis Zschorlau</div>
                  <div className="text-sm opacity-90">03771 / 56 53 950</div>
                </div>
              </button>
              
              <button
                onClick={() => handlePhoneCall('aue')}
                className="w-full bg-[#FF0000] text-white rounded-full px-6 py-4 font-bold hover:bg-[#CC0000] transition-colors duration-300 flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-bold">Praxis Aue</div>
                  <div className="text-sm opacity-90">03771 / 20 208</div>
                </div>
              </button>
            </div>
            
            <button
              onClick={() => setShowPhoneModal(false)}
              className="w-full mt-6 bg-gray-200 text-gray-700 rounded-full px-6 py-3 font-semibold hover:bg-gray-300 transition-colors duration-300"
            >
              Abbrechen
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default HomePage;