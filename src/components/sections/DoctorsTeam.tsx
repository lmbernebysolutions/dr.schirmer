'use client';

import React from 'react';
import { MapPin, Stethoscope, GraduationCap } from 'lucide-react';
import { DOCTORS, getDoctorsByCategory } from '@/config/team';

const DoctorsTeam: React.FC = () => {
  const fachaerzte = getDoctorsByCategory('facharzt');
  const weiterbildungsaerzte = getDoctorsByCategory('weiterbildungsarzt');

  const getLocationColor = (location: string) => {
    switch (location) {
      case 'zschorlau':
        return 'yellow';
      case 'aue':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getLocationBadge = (location: string) => {
    const color = getLocationColor(location);
    const colorClasses = {
      yellow: 'bg-yellow-100 text-yellow-600 border-yellow-200',
      red: 'bg-red-100 text-red-600 border-red-200',
      gray: 'bg-gray-100 text-gray-600 border-gray-200'
    };

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${colorClasses[color as keyof typeof colorClasses]}`}>
        <MapPin className="w-3 h-3 mr-1" />
        {location === 'zschorlau' ? 'Zschorlau' : location === 'aue' ? 'Aue' : 'Beide Standorte'}
      </span>
    );
  };

  const DoctorCard: React.FC<{ doctor: any; isFacharzt?: boolean }> = ({ doctor, isFacharzt = false }) => {
    const color = getLocationColor(doctor.location);
    const colorClasses = {
      yellow: {
        bg: 'bg-yellow-600',
        text: 'text-yellow-600',
        light: 'bg-yellow-100'
      },
      red: {
        bg: 'bg-[#FF0000]',
        text: 'text-red-600',
        light: 'bg-red-100'
      },
      gray: {
        bg: 'bg-gray-600',
        text: 'text-gray-600',
        light: 'bg-gray-100'
      }
    };

    const colors = colorClasses[color as keyof typeof colorClasses];

    return (
      <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 text-center w-48">
        <div className="w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden">
          {doctor.image ? (
            <img 
              src={doctor.image} 
              alt={doctor.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center text-white text-lg font-bold ${colors.bg}`}>
              {doctor.name.split(' ').map((n: string) => n.charAt(0)).join('')}
            </div>
          )}
        </div>
        
        <div className="mb-2">
          {getLocationBadge(doctor.location)}
        </div>
        
        <h3 className={`text-base font-bold mb-1 ${colors.text}`}>
          {doctor.name}
        </h3>
        
        <p className="text-gray-600 text-xs font-medium mb-2">
          {doctor.title}
        </p>
      </div>
    );
  };


  return (
    <section id="team" className="section-padding bg-section-primary">
      <div className="container mx-auto px-6">
        {/* Hauptüberschrift */}
        <div className="text-center element-spacing-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 element-spacing">
            Unser Team
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mt-4">
            Unser engagiertes Team besteht aus erfahrenen Fachärzten Dr. med. Lars Schirmer und Dr. med. Lars Unger sowie unseren Weiterbildungsärztinnen Fr. Isabelle Rau und Frau Dr. med. Julia Schuster Meinel. Unterstützt werden wir von unserem Team aus erfahrenen Krankenschwestern und Medizinischen Fachangestellten, die für eine professionelle und herzliche Betreuung während Ihres Praxisbesuchs sorgen.
          </p>
        </div>

        {/* Zwei Spalten: Schwestern (links) und Ärzte (rechts) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto element-spacing-xl">
          {/* Linke Spalte: Unsere Schwestern */}
          <div className="text-center group">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Unsere Schwestern
            </h3>
            <div className="relative element-spacing">
              <img 
                src="/images/Schwesternteam 2025.jpg" 
                alt="Schwesternteam 2025" 
                className="w-64 md:w-80 h-64 md:h-80 mx-auto rounded-full object-cover group-hover:scale-105 transition-transform duration-300 shadow-lg"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute -bottom-2 -right-2 w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl bg-yellow-600 shadow-lg">
                <Stethoscope className="w-10 h-10" />
              </div>
            </div>
            {/* Schwesternnamen in klein */}
            <p className="text-xs text-gray-400 mt-4">
              Mandy, Lilly, Sylvia, Conny, Monique
            </p>
          </div>

          {/* Rechte Spalte: Unsere Ärzte */}
          <div className="text-center group">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Unsere Ärzte
            </h3>
            <div className="relative element-spacing">
              <img 
                src="/images/picture01.jpg" 
                alt="Medizinische Fachangestellte" 
                className="w-64 md:w-80 h-64 md:h-80 mx-auto rounded-full object-cover group-hover:scale-105 transition-transform duration-300 shadow-lg"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute -bottom-2 -right-2 w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl bg-[#FF0000] shadow-lg">
                <GraduationCap className="w-10 h-10" />
              </div>
            </div>
            {/* Ärztenamen entfernt */}
          </div>
        </div>

        {/* Ärzte Cards */}
        <div className="element-spacing-xl">
          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
            {fachaerzte.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} isFacharzt={true} />
            ))}
            {weiterbildungsaerzte.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} isFacharzt={false} />
            ))}
          </div>
          
        </div>

      </div>
    </section>
  );
};

export default DoctorsTeam;
