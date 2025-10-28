'use client';

import React, { useState } from 'react';
import { 
  Droplet, 
  Microscope, 
  Zap, 
  Sun, 
  Activity,
  TestTube,
  Heart,
  Beaker,
  Bug,
  Shield,
  X
} from 'lucide-react';
import { LAB_SERVICES } from '@/config/services';

const LabServices: React.FC = () => {
  const [selectedService, setSelectedService] = useState<any>(null);

  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      droplet: Droplet,
      microscope: Microscope,
      zap: Zap,
      sun: Sun,
      activity: Activity,
      'test-tube': TestTube,
      heart: Heart,
      flask: Beaker,
      bacteria: Bug,
      allergy: Shield
    };
    
    const IconComponent = iconMap[iconName] || TestTube;
    return <IconComponent className="w-8 h-8" />;
  };

  return (
    <section id="labor" className="section-padding-sm bg-section-primary">
      <div className="container mx-auto px-6">
        <div className="text-center element-spacing-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 element-spacing">
            <span className="hidden sm:inline">Laboruntersuchungen</span>
            <span className="sm:hidden">Labor</span>
          </h2>
          <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto">
            <span className="hidden sm:inline">Umfassende Labordiagnostik für präzise Diagnosen und optimale Behandlung</span>
            <span className="sm:hidden">Labordiagnostik für präzise Diagnosen</span>
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-6 max-w-7xl mx-auto">
          {LAB_SERVICES.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl sm:rounded-2xl p-2 sm:card-spacing shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center group flex flex-col h-full cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              <div className="w-10 h-10 sm:w-16 sm:h-16 bg-blue-100 rounded-full mx-auto mb-1 sm:element-spacing-sm flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                <div className="text-blue-600 group-hover:text-white transition-colors duration-300">
                  {React.cloneElement(getIcon(service.icon), { className: "w-6 h-6 sm:w-8 sm:h-8" })}
                </div>
              </div>
              
              <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-1 sm:text-spacing break-words">
                {service.title}
              </h3>
              
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-2 sm:mb-8 hidden sm:block">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="element-spacing-xl max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg card-spacing-lg">
            <div className="text-center">
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 element-spacing-sm">
                <span className="hidden sm:inline">Schnelle Ergebnisse</span>
                <span className="sm:hidden">Schnelle Ergebnisse</span>
              </h3>
              <p className="text-gray-600 leading-relaxed element-spacing max-w-3xl mx-auto text-sm md:text-base">
                <span className="hidden sm:inline">Unsere Praxis verfügt über ein eigenes Labor, das es uns ermöglicht, zahlreiche Untersuchungen direkt vor Ort durchzuführen. Dies gewährleistet schnelle und zuverlässige Ergebnisse, die eine optimale Behandlung unterstützen.</span>
                <span className="sm:hidden">Eigenes Labor für schnelle und zuverlässige Ergebnisse vor Ort.</span>
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600 max-w-2xl mx-auto">
                <li className="flex items-center justify-center sm:justify-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">Schnelltests in wenigen Minuten</span>
                </li>
                <li className="flex items-center justify-center sm:justify-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">Blutabnahme vor Ort</span>
                </li>
                <li className="flex items-center justify-center sm:justify-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">Kooperation mit Fachlaboren</span>
                </li>
                <li className="flex items-center justify-center sm:justify-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">Digitale Ergebnisübermittlung</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center element-spacing">
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-blue-600 text-white rounded-full px-8 py-4 font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center mx-auto"
          >
            <TestTube className="mr-2 h-5 w-5" />
            Labortermin vereinbaren
          </button>
        </div>

        {/* Modal für Laboruntersuchungen Details */}
        {selectedService && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <div className="text-blue-600">
                        {React.cloneElement(getIcon(selectedService.icon), { className: "w-6 h-6" })}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedService.title}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {selectedService.description}
                </p>
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-full bg-blue-600 text-white rounded-full px-6 py-3 font-bold hover:bg-blue-700 transition-colors"
                >
                  Schließen
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LabServices;
