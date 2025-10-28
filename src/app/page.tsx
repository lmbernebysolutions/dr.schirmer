'use client';

import React from 'react';
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
  Home
} from 'lucide-react';
import ResponsiveImage from '@/components/ui/ResponsiveImage';
import ResponsiveHeader from '@/components/layout/ResponsiveHeader';
import DoctorsTeam from '@/components/sections/DoctorsTeam';
import ChildConsultation from '@/components/sections/ChildConsultation';
import LabServices from '@/components/sections/LabServices';
import NewsSection from '@/components/sections/NewsSection';
import AnimatedHero from '@/components/sections/AnimatedHero';
import PracticeGallery from '@/components/sections/PracticeGallery';
import SectionDivider from '@/components/ui/SectionDivider';
import { SERVICES, IGeL_SERVICES } from '@/config/services';
import { PRACTICES } from '@/config/company';

const HomePage: React.FC = () => {
  const [selectedMap, setSelectedMap] = React.useState<'zschorlau' | 'aue'>('zschorlau');
  const [showPhoneModal, setShowPhoneModal] = React.useState(false);

  const handlePhoneCall = (practice: 'zschorlau' | 'aue') => {
    const phoneNumber = practice === 'zschorlau' ? '037715653950' : '0377120208';
    window.open(`tel:${phoneNumber}`, '_self');
    setShowPhoneModal(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding-xl bg-section-primary">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
              <span className="block">Hausarztpraxis</span>
              <span className="block text-[#FF0000] hover:text-[#CC0000] transition-colors duration-300 cursor-pointer">Dr. Schirmer</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Ihre vertrauensvolle Hausarztpraxis in Zschorlau und Aue. 
              Mit modernster Ausstattung und persönlicher Betreuung für die ganze Familie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
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
            </div>
          </div>
          
          {/* Tablet Praxis-Kreise */}
          <div className="hidden md:flex lg:hidden justify-center mt-8">
            <div className="flex gap-6 items-center">
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 overflow-hidden hover:from-amber-500 hover:to-yellow-500">
                  <ResponsiveImage 
                    src="/images/logo01.jpg" 
                    alt="Praxis Zschorlau Logo" 
                    className="w-full h-full object-cover rounded-full"
                    sizes="160px"
                    priority={true}
                  />
                </div>
                <span className="text-gray-900 font-bold mt-3 text-base">Zschorlau</span>
                <span className="text-yellow-600 text-sm font-medium">Hauptstandort</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 bg-[#FF0000] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 overflow-hidden hover:bg-[#CC0000]">
                  <ResponsiveImage 
                    src="/images/logo02.jpg" 
                    alt="Praxis Aue Logo" 
                    className="w-full h-full object-cover rounded-full"
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
            {/* Zwei größere Praxis-Kreise zentriert */}
            <div className="flex gap-12 items-center">
                <div className="flex flex-col items-center">
                  <div className="w-72 h-72 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 overflow-hidden hover:from-amber-500 hover:to-yellow-500">
                    <ResponsiveImage 
                      src="/images/logo01.jpg" 
                      alt="Praxis Zschorlau Logo" 
                      className="w-full h-full object-cover rounded-full"
                      sizes="(max-width: 768px) 0px, 288px"
                      priority={true}
                    />
              </div>
                  <span className="text-gray-900 font-bold mt-4 text-xl">Zschorlau</span>
                  <span className="text-yellow-600 text-lg font-medium">Hauptstandort</span>
            </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-72 h-72 bg-[#FF0000] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 overflow-hidden hover:bg-[#CC0000]">
                    <ResponsiveImage 
                      src="/images/logo02.jpg" 
                      alt="Praxis Aue Logo" 
                      className="w-full h-full object-cover rounded-full"
                      sizes="(max-width: 768px) 0px, 288px"
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
          <div className="text-center element-spacing-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 element-spacing">
              Unsere Standorte
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Wir sind für Sie da an zwei Standorten im Erzgebirge für optimale Erreichbarkeit
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Zschorlau - Gelb */}
            <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 border-l-8 border-yellow-500">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-yellow-600 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                  <ResponsiveImage 
                    src="/images/logo01.jpg" 
                    alt="Logo Zschorlau" 
                    className="w-full h-full object-cover rounded-full"
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
                  <li><strong>MONTAG:</strong> 07:30 - 12:30 Uhr & 14:00 - 16:00 Uhr</li>
                  <li><strong>DIENSTAG:</strong> 07:30 - 11:30 Uhr</li>
                  <li><strong>MITTWOCH:</strong> 07:30 - 12:30 Uhr</li>
                  <li><strong>DONNERSTAG:</strong> 07:30 - 12:30 Uhr "schwesterlich" & 14:00 - 18:00 Uhr</li>
                  <li><strong>FREITAG:</strong> nach Absprache</li>
                </ul>
              </div>

              <div className="mb-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Akutterminanmeldung
                </h4>
                <p className="text-yellow-700 text-sm">
                  <strong>Bitte in der Zeit von 7:30 - 10:00 Uhr!!</strong><br />
                  Nur so können wir lange Wartezeiten vermeiden und Ihnen eine Akutbehandlung zusichern.
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
            </div>

            {/* Aue - Rot */}
            <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 border-l-8 border-red-500">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-red-600 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                  <ResponsiveImage 
                    src="/images/logo02.jpg" 
                    alt="Logo Aue" 
                    className="w-full h-full object-cover rounded-full"
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
                  <li><strong>MONTAG:</strong> 07:30 - 12:30 Uhr & 14:00 - 17:00 Uhr</li>
                  <li><strong>DIENSTAG:</strong> 07:30 - 12:30 Uhr & 14:00 - 18:00 Uhr & 14:00 - 17:00 OP's + Privat</li>
                  <li><strong>MITTWOCH:</strong> 07:30 - 12:30 Uhr & 14:00 - 17:00 Uhr</li>
                  <li><strong>DONNERSTAG:</strong> 07:30 - 12:30 Uhr "schwesterlich"</li>
                  <li><strong>FREITAG:</strong> 07:30 - 11:30 Uhr</li>
                </ul>
              </div>

              <div className="mb-6 p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                <h4 className="font-bold text-red-800 mb-2 flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Akutterminanmeldung
                </h4>
                <p className="text-red-700 text-sm">
                  <strong>Bitte in der Zeit von 7:30 - 10:00 Uhr!!</strong><br />
                  Nur so können wir lange Wartezeiten vermeiden und Ihnen eine Akutbehandlung zusichern.
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
            </div>
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
          <div className="text-center element-spacing-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 element-spacing">
              Unsere Leistungen
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Umfassende medizinische Versorgung für die ganze Familie
            </p>
          </div>

          {/* Accordion für detaillierte Leistungen - Variante 5 Logic */}
          <div className="max-w-3xl mx-auto space-y-5">
            <div className="accordion-item bg-white rounded-2xl shadow-lg overflow-hidden">
              <button 
                className="accordion-header w-full flex justify-between items-center text-left p-6 min-h-[48px]"
                onClick={(e) => {
                  const item = e.currentTarget.parentElement;
                  if (item) {
                  item.classList.toggle('open');
                  }
                }}
              >
                <span className="text-2xl font-bold">Moderne Diagnostik</span>
                <div className="accordion-icon w-8 h-8 flex-shrink-0 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center transition-transform duration-500">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </div>
              </button>
              <div className="accordion-content px-6">
                <p className="text-gray-600">Mit EKG, Ergometrie und Lungenfunktionstests blicken wir genau hin, um Ihnen die beste Behandlung zu ermöglichen.</p>
              </div>
            </div>

            <div className="accordion-item bg-white rounded-2xl shadow-lg overflow-hidden">
              <button 
                className="accordion-header w-full flex justify-between items-center text-left p-6 min-h-[48px]"
                onClick={(e) => {
                  const item = e.currentTarget.parentElement;
                  if (item) {
                  item.classList.toggle('open');
                  }
                }}
              >
                <span className="text-2xl font-bold">Ganzheitliche Vorsorge</span>
                <div className="accordion-icon w-8 h-8 flex-shrink-0 bg-red-100 text-red-600 rounded-full flex items-center justify-center transition-transform duration-500">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </div>
              </button>
              <div className="accordion-content px-6">
                <p className="text-gray-600">Von Check-ups über Hautkrebsscreenings bis zu U-Untersuchungen – wir begleiten Sie auf dem Weg zu einem langen, gesunden Leben.</p>
              </div>
            </div>

            <div className="accordion-item bg-white rounded-2xl shadow-lg overflow-hidden">
              <button 
                className="accordion-header w-full flex justify-between items-center text-left p-6 min-h-[48px]"
                onClick={(e) => {
                  const item = e.currentTarget.parentElement;
                  if (item) {
                  item.classList.toggle('open');
                  }
                }}
              >
                <span className="text-2xl font-bold">Individuelle Gesundheitsleistungen (IGeL)</span>
                <div className="accordion-icon w-8 h-8 flex-shrink-0 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center transition-transform duration-500">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </div>
              </button>
              <div className="accordion-content px-6">
                <div className="space-y-3">
                  <p className="text-gray-600 mb-4">Erweiterte Gesundheitsleistungen für Ihre optimale Versorgung:</p>
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
            </div>

            <div className="accordion-item bg-white rounded-2xl shadow-lg overflow-hidden">
              <button 
                className="accordion-header w-full flex justify-between items-center text-left p-6 min-h-[48px]"
                onClick={(e) => {
                  const item = e.currentTarget.parentElement;
                  if (item) {
                  item.classList.toggle('open');
                  }
                }}
              >
                <span className="text-2xl font-bold">Hausbesuche & Notfallversorgung</span>
                <div className="accordion-icon w-8 h-8 flex-shrink-0 bg-red-100 text-red-600 rounded-full flex items-center justify-center transition-transform duration-500">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </div>
              </button>
              <div className="accordion-content px-6">
                <p className="text-gray-600">Für immobile Patienten bieten wir Hausbesuche an. Bei akuten Notfällen sind wir für Sie da und koordinieren mit dem Rettungsdienst.</p>
              </div>
            </div>
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
          <div className="text-center element-spacing-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 element-spacing">
              Ausbildung
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Starten Sie Ihre medizinische Ausbildung bei uns
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Medizinstudenten */}
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
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
              </div>

              {/* Lehrpraxis der Universitäten */}
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
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
                    onClick={() => window.open('https://www.medizin.uni-dresden.de/studium/lehrpraxen', '_blank')}
                    className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-full px-6 py-3 font-bold hover:from-amber-500 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Mehr erfahren
                  </button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>

      {/* Section Divider */}
      <SectionDivider variant="subtle" />

      {/* Downloads Section */}
      <section id="downloads" className="section-padding bg-section-primary">
        <div className="container mx-auto px-6">
          <div className="text-center element-spacing-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 element-spacing">
              Downloads
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Wichtige Formulare und Dokumente für Ihren Praxisbesuch
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl md:rounded-3xl p-3 md:card-spacing-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 md:border-l-8 border-yellow-500">
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
            </div>

            <div className="bg-white rounded-2xl md:rounded-3xl p-3 md:card-spacing-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 md:border-l-8 border-red-500">
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
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <SectionDivider variant="subtle" />

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-section-primary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Kontakt & Terminvereinbarung
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Rufen Sie uns an oder schreiben Sie uns eine E-Mail. Wir sind für Sie da!
            </p>
            
          </div>
          
          <div className="max-w-6xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Praxis Zschorlau */}
              <div className="bg-white rounded-2xl shadow-lg p-6 text-gray-900">
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
            </div>

            {/* Praxis Aue */}
            <div className="bg-white rounded-2xl shadow-lg p-6 text-gray-900">
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
            </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            
            {/* Schnellkontakt */}
            <div className="bg-white rounded-3xl shadow-lg p-8 text-gray-900">
              <h3 className="text-2xl font-bold mb-6">Schnellkontakt</h3>
              <div className="space-y-4">
                <button
                  onClick={() => setShowPhoneModal(true)}
                  className="w-full bg-white text-red-600 rounded-full px-6 py-3 font-bold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Jetzt anrufen
                </button>
                <button
                  onClick={() => window.open('mailto:hausarztpraxis-dr-schirmer@web.de', '_self')}
                  className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-full px-6 py-3 font-bold hover:from-amber-500 hover:to-yellow-500 transition-colors duration-300 flex items-center justify-center"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  E-Mail senden
                </button>
                <button
                  onClick={() => window.open('https://wa.me/4937715653950?text=Hallo%2C%20ich%20möchte%20einen%20Termin%20vereinbaren.', '_blank')}
                  className="w-full bg-green-600 text-white rounded-full px-6 py-3 font-bold hover:bg-green-700 transition-colors duration-300 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  WhatsApp
                </button>
                <button
                  onClick={() => window.open('https://www.instagram.com/hausarztpraxis.dr.schirmer/', '_blank')}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full px-6 py-3 font-bold hover:from-pink-500 hover:to-purple-500 transition-colors duration-300 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </button>
              </div>
            </div>
            
            {/* Umschaltbare Karten */}
            <div className="bg-white rounded-3xl shadow-lg p-8 text-gray-900">
              <h3 className="text-2xl font-bold mb-6">Standorte</h3>
              
              {/* Karten-Auswahl */}
              <div className="flex space-x-2 mb-6">
                <button 
                  onClick={() => setSelectedMap('zschorlau')}
                  className={`flex-1 py-2 px-4 rounded-full font-semibold transition-all duration-300 ${
                    selectedMap === 'zschorlau' 
                      ? 'bg-yellow-600 text-white' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Zschorlau
                </button>
                <button 
                  onClick={() => setSelectedMap('aue')}
                  className={`flex-1 py-2 px-4 rounded-full font-semibold transition-all duration-300 ${
                    selectedMap === 'aue' 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Aue
                </button>
              </div>
              
              
              {/* Karten-Anzeige */}
              <div className="space-y-4">
                <div>
                  <h4 className={`font-semibold mb-2 ${selectedMap === 'zschorlau' ? 'text-yellow-300' : 'text-red-300'}`}>
                    Praxis {selectedMap === 'zschorlau' ? 'Zschorlau' : 'Aue'}
                  </h4>
                  <p className="text-sm">
                    {selectedMap === 'zschorlau' 
                      ? 'Schneeberger Straße 3, 08321 Zschorlau'
                      : 'Schwarzenberger Straße 7, 08280 Aue'
                    }
                  </p>
                </div>
                
                <div className="mt-6">
                  <iframe
                    src={selectedMap === 'zschorlau' 
                      ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2534.380256760598!2d12.6380256763231!3d50.56429417161414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a0c96ff2447a0b%3A0x1902c32d6d842b20!2sSchneeberger%20Str.%203%2C%2008321%20Zschorlau!5e0!3m2!1sen!2sde!4v1761333014395!5m2!1sen!2sde"
                      : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2533.2180119553846!2d12.701939776324465!3d50.58590107161833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a0ca13bd023821%3A0x7ebb9bce54aecac7!2sSchwarzenberger%20Str.%207%2C%2008280%20Aue-Bad%20Schlema!5e0!3m2!1sen!2sde!4v1761333046361!5m2!1sen!2sde"
                    }
                    width="100%"
                    height="250"
                    style={{ border: 0, borderRadius: '1rem' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Praxis ${selectedMap === 'zschorlau' ? 'Zschorlau' : 'Aue'} - Google Maps`}
                  ></iframe>
                </div>
              </div>
            </div>

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