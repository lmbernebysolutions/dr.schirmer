'use client';

import React from 'react';
import { ArrowLeft, MapPin, Phone, Mail, FileText, Shield, Building2, Scale } from 'lucide-react';
import Link from 'next/link';

const ImpressumPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Zurück zur Startseite
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Impressum
            </h1>

            <div className="space-y-8">
              {/* Angaben gemäß § 5 TMG */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-yellow-600" />
                  Angaben gemäß § 5 TMG
                </h2>
                <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                  <div>
                    <p className="font-bold text-gray-900 text-lg mb-2">Lars Schirmer</p>
                    <p className="text-gray-700 mb-1">Ihre Hausarztpraxis in Zschorlau und Aue</p>
                    <p className="text-gray-700 mb-1">Schneeberger Str. 3</p>
                    <p className="text-gray-700 mb-1">Landarztpraxis Zschorlau</p>
                    <p className="text-gray-700">08321 Zschorlau</p>
                  </div>
                </div>
              </section>

              {/* Kontakt */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Phone className="w-6 h-6 mr-2 text-yellow-600" />
                  Kontakt
                </h2>
                <div className="bg-yellow-50 rounded-2xl p-6 space-y-3">
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Telefon:</p>
                      <a href="tel:+4937715653950" className="text-gray-700 hover:text-yellow-600 transition-colors">
                        +49 (0) 3771 5653950
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Telefax:</p>
                      <p className="text-gray-700">+49 (0) 3771 5653959</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">E-Mail:</p>
                      <a href="mailto:hausarztpraxis-dr-schirmer@web.de" className="text-gray-700 hover:text-yellow-600 transition-colors break-all">
                        hausarztpraxis-dr-schirmer@web.de
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              {/* Umsatzsteuer-ID */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-yellow-600" />
                  Umsatzsteuer-ID
                </h2>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <p className="text-gray-700">
                    Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
                  </p>
                  <p className="font-semibold text-gray-900 mt-2">DE999999999</p>
                </div>
              </section>

              {/* Aufsichtsbehörde */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Building2 className="w-6 h-6 mr-2 text-yellow-600" />
                  Aufsichtsbehörde
                </h2>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <p className="text-gray-700 mb-2">
                    <strong>KV Sachsen Chemnitz</strong>
                  </p>
                  <a 
                    href="http://kvsachsen.de" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-yellow-600 hover:text-yellow-700 underline transition-colors"
                  >
                    http://kvsachsen.de
                  </a>
                </div>
              </section>

              {/* Berufsbezeichnung und berufsrechtliche Regelungen */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-yellow-600" />
                  Berufsbezeichnung und berufsrechtliche Regelungen
                </h2>
                <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Berufsbezeichnung:</p>
                    <p className="text-gray-700">Facharzt für Allgemeinmedizin</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Zuständige Kammer:</p>
                    <p className="text-gray-700 mb-2">SLAEK Dresden</p>
                    <a 
                      href="http://slaek.de" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-yellow-600 hover:text-yellow-700 underline transition-colors"
                    >
                      http://slaek.de
                    </a>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Verliehen in:</p>
                    <p className="text-gray-700">Deutschland</p>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 italic">
                      Es gelten folgende berufsrechtliche Regelungen: SLAEK Dresden einsehbar unter:{' '}
                      <a 
                        href="http://slaek.de" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-yellow-600 hover:text-yellow-700 underline"
                      >
                        http://slaek.de
                      </a>
                    </p>
                  </div>
                </div>
              </section>

              {/* Angaben zur Berufshaftpflichtversicherung */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-6 h-6 mr-2 text-yellow-600" />
                  Angaben zur Berufshaftpflichtversicherung
                </h2>
                <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Name und Sitz des Versicherers:</p>
                    <p className="text-gray-700">ALLIANZ</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Geltungsraum der Versicherung:</p>
                    <p className="text-gray-700">Deutschland</p>
                  </div>
                </div>
              </section>

              {/* Redaktionell verantwortlich */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-yellow-600" />
                  Redaktionell verantwortlich
                </h2>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <p className="text-gray-700">
                    <strong>Dr. med. Lars Schirmer</strong><br />
                    Schneeberger Str. 3<br />
                    08321 Zschorlau
                  </p>
                </div>
              </section>

              {/* Verbraucherstreitbeilegung */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Scale className="w-6 h-6 mr-2 text-yellow-600" />
                  Verbraucherstreitbeilegung/Universalschlichtungsstelle
                </h2>
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                  <p className="text-gray-700 mb-4">
                    Wir nehmen an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teil. 
                    Zuständig ist die Universalschlichtungsstelle des Zentrums für Schlichtung e.V., 
                    Straßburger Straße 8, 77694 Kehl am Rhein.
                  </p>
                  <a 
                    href="https://www.verbraucher-schlichter.de" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 underline transition-colors break-all"
                  >
                    https://www.verbraucher-schlichter.de
                  </a>
                </div>
              </section>

              {/* Quelle */}
              <section>
                <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-200">
                  <p>Quelle: e-recht24.de</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpressumPage;
