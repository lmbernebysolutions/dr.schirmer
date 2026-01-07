'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Car, Accessibility, Navigation, Route } from 'lucide-react';
import AnimatedCard from '@/components/ui/AnimatedCard';
import GradientButton from '@/components/ui/GradientButton';
import FloatingElement from '@/components/ui/FloatingElement';
import AppointmentButton from '@/components/ui/AppointmentButton';

interface AnimatedHeroProps {
  selectedMap: 'zschorlau' | 'aue';
  setSelectedMap: (map: 'zschorlau' | 'aue') => void;
  showPhoneModal: boolean;
  setShowPhoneModal: (show: boolean) => void;
}

const AnimatedHero: React.FC<AnimatedHeroProps> = ({
  selectedMap,
  setSelectedMap,
  showPhoneModal,
  setShowPhoneModal
}) => {
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-padding-xl bg-section-primary">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-red-50" />
      
      {/* Floating Elements */}
      <FloatingElement className="absolute top-20 left-10 w-20 h-20 bg-yellow-200 rounded-full opacity-20" intensity="low">
        <div />
      </FloatingElement>
      <FloatingElement className="absolute top-40 right-20 w-16 h-16 bg-red-200 rounded-full opacity-20" intensity="medium">
        <div />
      </FloatingElement>
      <FloatingElement className="absolute bottom-20 left-20 w-12 h-12 bg-yellow-300 rounded-full opacity-30" intensity="high">
        <div />
      </FloatingElement>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 grid-spacing-xl items-center">
          {/* Left Content */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold element-spacing"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-yellow-600">Hausarztpraxis</span>
              <br />
              <span className="text-red-600">Dr. Schirmer</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-600 element-spacing-lg leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Moderne Medizin mit Herz. Zwei Standorte im Erzgebirge für Ihre Gesundheit.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row grid-spacing-sm element-spacing-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <GradientButton 
                variant="yellow" 
                size="lg"
                onClick={() => setSelectedMap('zschorlau')}
                className="w-full sm:w-auto"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Zschorlau
              </GradientButton>
              
              <GradientButton 
                variant="red" 
                size="lg"
                onClick={() => setSelectedMap('aue')}
                className="w-full sm:w-auto"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Aue-Bad Schlema
              </GradientButton>
            </motion.div>

            <motion.div 
              className="flex flex-wrap justify-center lg:justify-start gap-4 grid-spacing-sm"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <AppointmentButton 
                  location="zschorlau" 
                  variant="overlay" 
                  label="Termin Zschorlau" 
                  className="w-full justify-center shadow-lg hover:shadow-xl"
                />
                <AppointmentButton 
                  location="aue" 
                  variant="overlay" 
                  label="Termin Aue" 
                  className="w-full justify-center shadow-lg hover:shadow-xl"
                />
              </div>
              
              <button className="flex items-center justify-center bg-white text-gray-700 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto h-fit self-start">
                <Navigation className="w-5 h-5 mr-2 text-blue-600" />
                Route planen
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - Practice Cards */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <AnimatedCard 
              className="bg-white rounded-3xl shadow-2xl card-spacing-lg"
              delay={0.2}
              direction="right"
            >
              <div className="text-center">
                <div className={`w-20 h-20 rounded-full mx-auto element-spacing flex items-center justify-center ${
                  selectedMap === 'zschorlau' ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                  <img 
                    src="/images/stab.jpg" 
                    alt="Logo" 
                    className="w-12 h-12 object-contain"
                  />
                </div>
                
                <h3 className={`text-2xl font-bold element-spacing-sm ${
                  selectedMap === 'zschorlau' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {selectedMap === 'zschorlau' ? 'Zschorlau' : 'Aue-Bad Schlema'}
                </h3>
                
                <div className="grid-spacing-sm text-gray-600">
                  <div className="flex items-center justify-center">
                    <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                    <span className="text-sm">
                      {selectedMap === 'zschorlau' 
                        ? 'Hauptstraße 123, 08309 Aue' 
                        : 'Badstraße 45, 08309 Aue-Bad Schlema'
                      }
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <Phone className="w-5 h-5 mr-2 text-gray-500" />
                    <span className="text-sm">03771 56 53 950</span>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <Clock className="w-5 h-5 mr-2 text-gray-500" />
                    <span className="text-sm">Mo-Fr: 8:00-18:00</span>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedHero;
