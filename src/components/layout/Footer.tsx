import React from 'react';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Heart,
  Stethoscope,
  Shield,
  FileText,
  ExternalLink,
  Home,
  Users,
  TestTube,
  Newspaper,
  Download,
  Building2
} from 'lucide-react';
import MedicalIcon from '../ui/MedicalIcon';
import AlertAdmin from '../admin/AlertAdmin';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Standorte', href: '#locations', icon: Home },
    { name: 'Unsere Leistungen', href: '#services', icon: Stethoscope },
    { name: 'Team', href: '#team', icon: Users },
    { name: 'Labor', href: '#labor', icon: TestTube },
    { name: 'Aktuelles', href: '#blog', icon: Newspaper },
    { name: 'Downloads', href: '#downloads', icon: Download },
  ];

  const legalLinks = [
    { name: 'Impressum', href: '/impressum' },
    { name: 'Datenschutz', href: '/datenschutz' },
  ];

      return (
        <footer className="bg-white text-black relative">
          <div className="container mx-auto px-8 pt-40 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Spalte 1: Praxis-Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
                  <h3 className="text-xl font-bold text-black mx-4">Hausarztpraxis Dr. Schirmer</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
              Ihre vertrauensvolle Hausarztpraxis in Zschorlau und Aue. 
              Mit modernster Ausstattung und persönlicher Betreuung für die ganze Familie.
            </p>
            <p className="text-sm text-gray-500">
              Mit Sorgfalt für Sie gestaltet.
            </p>
          </div>

          {/* Spalte 2: Schnelllinks */}
          <div className="space-y-4">
                <h4 className="text-lg font-semibold text-black mx-4">Schnellzugriff</h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                        className="flex items-center space-x-3 text-gray-600 hover:text-[#FF0000] transition-colors duration-300 group"
                  >
                    <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Spalte 3: Kontakt */}
          <div className="space-y-4">
                <h4 className="text-lg font-semibold text-black mx-4">Kontakt</h4>
            <div className="space-y-4">
              {/* Praxis Zschorlau */}
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-yellow-500">Praxis Zschorlau</h5>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>03771 / 56 53 950</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 mt-0.5" />
                    <span>Schneeberger Straße 3<br />08321 Zschorlau</span>
                  </div>
                </div>
              </div>

              {/* Praxis Aue */}
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-red-500">Praxis Aue</h5>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>03771 / 20 208</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 mt-0.5" />
                    <span>Schwarzenberger Straße 7<br />08280 Aue</span>
                  </div>
                </div>
              </div>

              {/* E-Mail */}
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4" />
                <span>hausarztpraxis-dr-schirmer@web.de</span>
              </div>
            </div>
          </div>

          {/* Spalte 4: Rechtliches */}
          <div className="space-y-4">
                <h4 className="text-lg font-semibold text-black mx-4">Rechtliches</h4>
            <nav className="space-y-3">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                      className="block text-gray-600 hover:text-[#FF0000] transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
            <div className="border-t border-gray-300 mt-8 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500">
              © {currentYear} Hausarztpraxis Dr. Schirmer. Alle Rechte vorbehalten.
            </p>
            <div className="flex items-center space-x-4">
              <AlertAdmin />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;