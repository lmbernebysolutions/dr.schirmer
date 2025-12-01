'use client';

import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, Database, Cookie, Globe, FileText, AlertCircle, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

const DatenschutzPage: React.FC = () => {
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
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Datenschutzerklärung
              </h1>
              <p className="text-lg text-gray-600">
                Stand: {new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            <div className="space-y-8">
              {/* Einleitung */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-blue-600" />
                  1. Einleitung
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. 
                    Diese Datenschutzerklärung informiert Sie über die Art, den Umfang 
                    und Zweck der Verarbeitung von personenbezogenen Daten durch unsere Praxis 
                    sowie über Ihre Rechte als Betroffener.
                  </p>
                  <p>
                    Wir verarbeiten Ihre Daten ausschließlich im Rahmen der geltenden 
                    Datenschutzgesetze, insbesondere der Datenschutz-Grundverordnung (DSGVO), 
                    des Bundesdatenschutzgesetzes (BDSG) und des Telekommunikation-Telemedien-Datenschutz-Gesetzes (TTDSG).
                  </p>
                </div>
              </section>

              {/* Verantwortlicher */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-6 h-6 mr-2 text-blue-600" />
                  2. Verantwortlicher
                </h2>
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                  <div className="space-y-3">
                    <p className="font-semibold text-gray-900">Verantwortlich für die Datenverarbeitung:</p>
                    <p><strong>Dr. med. Lars Schirmer</strong></p>
                    <div className="flex items-start mt-2">
                      <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-gray-700">Schneeberger Straße 3</p>
                        <p className="text-gray-700">08321 Zschorlau</p>
                      </div>
                    </div>
                    <div className="flex items-center mt-3">
                      <Phone className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                      <a href="tel:+4937715653950" className="text-gray-700 hover:text-blue-600 transition-colors">
                        +49 (0) 3771 5653950
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                      <a href="mailto:hausarztpraxis-dr-schirmer@web.de" className="text-gray-700 hover:text-blue-600 transition-colors break-all">
                        hausarztpraxis-dr-schirmer@web.de
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              {/* Zwecke der Datenverarbeitung */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Database className="w-6 h-6 mr-2 text-blue-600" />
                  3. Zwecke der Datenverarbeitung
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-100">
                    <div className="flex items-center mb-4">
                      <Lock className="w-6 h-6 text-yellow-600 mr-3" />
                      <h3 className="text-lg font-semibold text-gray-900">Medizinische Behandlung</h3>
                    </div>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Erfassung und Dokumentation von Patientendaten</li>
                      <li>• Diagnose und Therapieplanung</li>
                      <li>• Medizinische Dokumentation nach ärztlichen Standards</li>
                      <li>• Terminverwaltung und -koordination</li>
                      <li>• Rezeptausstellung und Medikamentenverordnung</li>
                      <li>• Kommunikation mit Patienten</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                    <div className="flex items-center mb-4">
                      <Database className="w-6 h-6 text-red-600 mr-3" />
                      <h3 className="text-lg font-semibold text-gray-900">Praxisverwaltung</h3>
                    </div>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Abrechnung mit Krankenkassen</li>
                      <li>• Kommunikation mit Patienten und Angehörigen</li>
                      <li>• Qualitätssicherung und Qualitätsmanagement</li>
                      <li>• Statistische Auswertungen (anonymisiert)</li>
                      <li>• Erfüllung gesetzlicher Aufbewahrungspflichten</li>
                      <li>• Notfallversorgung und Bereitschaftsdienst</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Rechtsgrundlage */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-blue-600" />
                  4. Rechtsgrundlage der Datenverarbeitung
                </h2>
                <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                  <p className="text-gray-700">
                    Die Verarbeitung Ihrer personenbezogenen Daten erfolgt auf Grundlage folgender Rechtsgrundlagen:
                  </p>
                  <ul className="list-disc list-inside space-y-3 text-gray-700 ml-4">
                    <li>
                      <strong>Art. 6 Abs. 1 lit. b DSGVO</strong> – Erfüllung des Behandlungsvertrages 
                      und vorvertraglicher Maßnahmen
                    </li>
                    <li>
                      <strong>Art. 6 Abs. 1 lit. c DSGVO</strong> – Erfüllung gesetzlicher Verpflichtungen 
                      (z.B. Aufbewahrungspflichten nach BÄO, SGB V)
                    </li>
                    <li>
                      <strong>Art. 6 Abs. 1 lit. f DSGVO</strong> – Berechtigte Interessen (z.B. 
                      Qualitätssicherung, Praxismanagement)
                    </li>
                    <li>
                      <strong>Art. 9 Abs. 2 lit. h DSGVO</strong> – Gesundheitsvorsorge und medizinische 
                      Behandlung durch Angehörige eines Gesundheitsberufs
                    </li>
                    <li>
                      <strong>§ 22 Abs. 1 Nr. 1 lit. b BDSG</strong> – Verarbeitung von Gesundheitsdaten 
                      für Zwecke der Gesundheitsvorsorge
                    </li>
                    <li>
                      <strong>Bundesärzteordnung (BÄO)</strong> – Berufsrechtliche Verpflichtungen
                    </li>
                    <li>
                      <strong>Musterberufsordnung der Bundesärztekammer</strong> – Berufsrechtliche Standards
                    </li>
                  </ul>
                </div>
              </section>

              {/* Kategorien verarbeiteter Daten */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Database className="w-6 h-6 mr-2 text-blue-600" />
                  5. Kategorien verarbeiteter Daten
                </h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Personenbezogene Daten</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Name, Vorname, Geburtsdatum, Geschlecht</li>
                      <li>• Anschrift (Straße, Hausnummer, Postleitzahl, Ort)</li>
                      <li>• Telefonnummer (fest, mobil), E-Mail-Adresse</li>
                      <li>• Versicherungsnummer, Krankenkasse, Versichertenstatus</li>
                      <li>• Notfallkontakt (Name, Telefonnummer)</li>
                      <li>• Zahlungsinformationen (bei Privatpatienten)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Gesundheitsdaten (besondere Kategorie)</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Krankengeschichte (Anamnese) und Diagnosen</li>
                      <li>• Untersuchungsergebnisse (körperliche Untersuchung, Labor, EKG, etc.)</li>
                      <li>• Medikamentenverordnungen und Therapiepläne</li>
                      <li>• Behandlungsverläufe und Therapieerfolge</li>
                      <li>• Allergien und Unverträglichkeiten</li>
                      <li>• Impfstatus</li>
                      <li>• Röntgenaufnahmen und bildgebende Verfahren</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Datenweitergabe an Dritte */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Globe className="w-6 h-6 mr-2 text-blue-600" />
                  6. Datenweitergabe an Dritte
                </h2>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 space-y-4">
                  <p className="text-gray-700">
                    Eine Weitergabe Ihrer Daten erfolgt nur, soweit dies gesetzlich vorgeschrieben 
                    oder für die Behandlung erforderlich ist:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>
                      <strong>Krankenkassen:</strong> Zur Abrechnung der erbrachten Leistungen 
                      (gesetzlich vorgeschrieben)
                    </li>
                    <li>
                      <strong>Kollegen und Fachärzte:</strong> Bei Überweisung oder Konsiliaranfragen 
                      (mit Ihrer Einwilligung oder bei medizinischer Notwendigkeit)
                    </li>
                    <li>
                      <strong>Krankenhäuser:</strong> Bei Einweisung oder Notfallversorgung
                    </li>
                    <li>
                      <strong>Laboratorien:</strong> Zur Durchführung von Laboruntersuchungen
                    </li>
                    <li>
                      <strong>Apotheken:</strong> Bei E-Rezept-Ausstellung
                    </li>
                    <li>
                      <strong>IT-Dienstleister:</strong> Für Wartung und Betrieb der Praxissoftware 
                      (unter strengen datenschutzrechtlichen Auflagen)
                    </li>
                    <li>
                      <strong>Behörden:</strong> Bei gesetzlichen Meldepflichten (z.B. meldepflichtige 
                      Krankheiten, Meldungen nach Infektionsschutzgesetz)
                    </li>
                  </ul>
                  <p className="text-gray-700 mt-4">
                    <strong>Keine Weitergabe zu Werbezwecken:</strong> Wir geben Ihre Daten nicht 
                    an Dritte zu Werbe- oder Marketingzwecken weiter.
                  </p>
                </div>
              </section>

              {/* Cookies und Tracking */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Cookie className="w-6 h-6 mr-2 text-blue-600" />
                  7. Cookies und Tracking-Technologien auf unserer Website
                </h2>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 space-y-4">
                  <p className="text-gray-700">
                    Unsere Website verwendet Cookies und ähnliche Technologien. Cookies sind kleine 
                    Textdateien, die auf Ihrem Endgerät gespeichert werden.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-2">Notwendige Cookies (technisch erforderlich)</h3>
                      <p className="text-sm text-gray-700 mb-2">
                        Diese Cookies sind für die Grundfunktionen der Website erforderlich und können 
                        nicht deaktiviert werden. Sie werden in der Regel nur als Reaktion auf von Ihnen 
                        durchgeführte Aktionen gesetzt, die einer Anfrage nach Diensten gleichkommen, 
                        wie z.B. das Festlegen Ihrer Datenschutzeinstellungen.
                      </p>
                      <p className="text-xs text-gray-600">
                        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)
                      </p>
                    </div>

                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-2">Externe Dienste (Google Maps)</h3>
                      <p className="text-sm text-gray-700 mb-2">
                        Auf unserer Website verwenden wir Google Maps zur Anzeige interaktiver Karten. 
                        Google Maps ist ein Dienst der Google Ireland Limited, Gordon House, Barrow Street, 
                        Dublin 4, Irland. Beim Aufruf einer Seite mit Google Maps werden Daten an Google 
                        übertragen, insbesondere Ihre IP-Adresse und Standortdaten.
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Zweck:</strong> Anzeige interaktiver Karten zur Standortfindung unserer Praxen
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) – 
                        Die Karte wird nur geladen, wenn Sie der Nutzung externer Dienste in den 
                        Cookie-Einstellungen zugestimmt haben.
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Datenschutzerklärung von Google:</strong>{' '}
                        <a 
                          href="https://policies.google.com/privacy" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 underline"
                        >
                          https://policies.google.com/privacy
                        </a>
                      </p>
                      <p className="text-xs text-gray-600">
                        Sie können die Nutzung von Google Maps jederzeit in den Cookie-Einstellungen 
                        deaktivieren. Die Karte wird dann nicht geladen.
                      </p>
                    </div>

                    <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                        Cookie-Verwaltung
                      </h3>
                      <p className="text-sm text-gray-700">
                        Sie können Ihre Cookie-Einstellungen jederzeit über den Cookie-Banner oder 
                        die Cookie-Verwaltung auf unserer Website anpassen. Dort können Sie einzelne 
                        Cookie-Kategorien aktivieren oder deaktivieren.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Server-Logs */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Database className="w-6 h-6 mr-2 text-blue-600" />
                  8. Server-Log-Dateien
                </h2>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 space-y-3">
                  <p className="text-gray-700">
                    Beim Aufruf unserer Website werden automatisch folgende Informationen in 
                    Server-Log-Dateien erfasst:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>IP-Adresse des anfragenden Rechners</li>
                    <li>Datum und Uhrzeit des Zugriffs</li>
                    <li>Name und URL der abgerufenen Datei</li>
                    <li>Website, von der aus der Zugriff erfolgt (Referrer-URL)</li>
                    <li>verwendeter Browser und ggf. das Betriebssystem</li>
                  </ul>
                  <p className="text-gray-700 mt-4">
                    <strong>Zweck:</strong> Sicherstellung der Stabilität und Sicherheit der Website, 
                    Fehleranalyse, Abwehr von Angriffen
                  </p>
                  <p className="text-gray-700">
                    <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)
                  </p>
                  <p className="text-gray-700">
                    <strong>Speicherdauer:</strong> Die Log-Dateien werden nach 7 Tagen automatisch gelöscht, 
                    es sei denn, sie sind zur Aufklärung von Sicherheitsvorfällen erforderlich.
                  </p>
                </div>
              </section>

              {/* Kontaktformular / E-Mail-Kontakt */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Mail className="w-6 h-6 mr-2 text-blue-600" />
                  9. Kontaktformular und E-Mail-Kontakt
                </h2>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 space-y-3">
                  <p className="text-gray-700">
                    Wenn Sie uns per E-Mail oder über ein Kontaktformular kontaktieren, werden die 
                    von Ihnen mitgeteilten Daten (Name, E-Mail-Adresse, Nachricht) von uns gespeichert, 
                    um Ihre Fragen zu beantworten.
                  </p>
                  <p className="text-gray-700">
                    <strong>Zweck:</strong> Bearbeitung Ihrer Anfrage, Kommunikation
                  </p>
                  <p className="text-gray-700">
                    <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse) 
                    bzw. Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen)
                  </p>
                  <p className="text-gray-700">
                    <strong>Speicherdauer:</strong> Die Daten werden gelöscht, sobald sie für die 
                    Erreichung des Zweckes nicht mehr erforderlich sind, spätestens jedoch nach 3 Jahren.
                  </p>
                  <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200 mt-4">
                    <p className="text-sm text-gray-700">
                      <strong>Hinweis:</strong> E-Mail-Kommunikation ist nicht vollständig sicher. 
                      Für vertrauliche medizinische Anfragen nutzen Sie bitte den telefonischen 
                      Kontakt oder den persönlichen Praxisbesuch.
                    </p>
                  </div>
                </div>
              </section>

              {/* Speicherdauer */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Database className="w-6 h-6 mr-2 text-blue-600" />
                  10. Speicherdauer
                </h2>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 space-y-3">
                  <p className="text-gray-700">
                    Wir speichern Ihre Daten nur so lange, wie es für die jeweiligen Zwecke 
                    erforderlich ist oder gesetzlich vorgeschrieben:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>
                      <strong>Patientenakten:</strong> 10 Jahre nach letzter Behandlung 
                      (§ 630f Abs. 3 BGB)
                    </li>
                    <li>
                      <strong>Röntgenaufnahmen:</strong> 30 Jahre (§ 28 Abs. 3 Röntgenverordnung)
                    </li>
                    <li>
                      <strong>Arzneimittelverordnungen:</strong> 10 Jahre (Abrechnungsunterlagen)
                    </li>
                    <li>
                      <strong>Kontaktdaten (Website):</strong> Bis zur Löschung durch den Nutzer 
                      oder nach 3 Jahren bei Inaktivität
                    </li>
                    <li>
                      <strong>Server-Logs:</strong> 7 Tage (außer bei Sicherheitsvorfällen)
                    </li>
                  </ul>
                  <p className="text-gray-700 mt-4">
                    Nach Ablauf der Speicherfristen werden die Daten routinemäßig und entsprechend 
                    den gesetzlichen Vorschriften gelöscht, sofern keine gesetzlichen 
                    Aufbewahrungspflichten entgegenstehen.
                  </p>
                </div>
              </section>

              {/* Ihre Rechte */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Eye className="w-6 h-6 mr-2 text-blue-600" />
                  11. Ihre Rechte als Betroffener
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <div className="flex items-start">
                        <Eye className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-gray-900">Auskunftsrecht (Art. 15 DSGVO)</h3>
                          <p className="text-gray-700 text-sm mt-1">
                            Sie haben das Recht, Auskunft über die von uns verarbeiteten 
                            personenbezogenen Daten zu erhalten.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <div className="flex items-start">
                        <Database className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-gray-900">Berichtigungsrecht (Art. 16 DSGVO)</h3>
                          <p className="text-gray-700 text-sm mt-1">
                            Sie haben das Recht, die Berichtigung unrichtiger oder die 
                            Vervollständigung unvollständiger Daten zu verlangen.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <div className="flex items-start">
                        <Lock className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-gray-900">Löschungsrecht (Art. 17 DSGVO)</h3>
                          <p className="text-gray-700 text-sm mt-1">
                            Sie haben das Recht, die Löschung Ihrer Daten zu verlangen, 
                            soweit keine gesetzlichen Aufbewahrungspflichten bestehen.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <div className="flex items-start">
                        <Shield className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-gray-900">Einschränkung (Art. 18 DSGVO)</h3>
                          <p className="text-gray-700 text-sm mt-1">
                            Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer 
                            Daten zu verlangen.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <div className="flex items-start">
                        <Database className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-gray-900">Datenübertragbarkeit (Art. 20 DSGVO)</h3>
                          <p className="text-gray-700 text-sm mt-1">
                            Sie haben das Recht, Ihre Daten in einem strukturierten, 
                            gängigen Format zu erhalten.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-gray-900">Widerspruchsrecht (Art. 21 DSGVO)</h3>
                          <p className="text-gray-700 text-sm mt-1">
                            Sie haben das Recht, der Verarbeitung Ihrer Daten zu widersprechen, 
                            soweit diese auf berechtigtem Interesse beruht.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <div className="flex items-start">
                        <Shield className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-gray-900">Widerruf der Einwilligung (Art. 7 DSGVO)</h3>
                          <p className="text-gray-700 text-sm mt-1">
                            Sie können eine erteilte Einwilligung jederzeit widerrufen. 
                            Die Rechtmäßigkeit der Verarbeitung bleibt bis zum Widerruf unberührt.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Beschwerderecht */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="w-6 h-6 mr-2 text-blue-600" />
                  12. Beschwerderecht bei Aufsichtsbehörde
                </h2>
                <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                  <p className="text-gray-700 mb-4">
                    Sie haben das Recht, sich bei einer Aufsichtsbehörde über die Verarbeitung 
                    Ihrer personenbezogenen Daten zu beschweren, wenn Sie der Ansicht sind, 
                    dass die Verarbeitung gegen die DSGVO verstößt.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="font-semibold text-gray-900 mb-2">Zuständige Aufsichtsbehörde:</p>
                    <p className="text-gray-700 mb-1">
                      <strong>Sächsischer Datenschutzbeauftragter</strong>
                    </p>
                    <p className="text-gray-700 mb-1">Devrientstraße 5</p>
                    <p className="text-gray-700 mb-3">01067 Dresden</p>
                    <p className="text-gray-700 mb-2">
                      <strong>Website:</strong>{' '}
                      <a 
                        href="https://www.saechsdsb.de" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 underline"
                      >
                        https://www.saechsdsb.de
                      </a>
                    </p>
                    <p className="text-gray-700">
                      <strong>E-Mail:</strong>{' '}
                      <a 
                        href="mailto:saechsdsb@slt.sachsen.de" 
                        className="text-blue-600 hover:text-blue-700 underline break-all"
                      >
                        saechsdsb@slt.sachsen.de
                      </a>
                    </p>
                  </div>
                </div>
              </section>

              {/* Datensicherheit */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Lock className="w-6 h-6 mr-2 text-blue-600" />
                  13. Datensicherheit
                </h2>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 space-y-3">
                  <p className="text-gray-700">
                    Wir setzen technische und organisatorische Maßnahmen ein, um Ihre Daten 
                    vor Verlust, Manipulation oder unberechtigtem Zugriff zu schützen:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>SSL/TLS-Verschlüsselung für die Datenübertragung</li>
                    <li>Zugriffsbeschränkungen und Authentifizierung</li>
                    <li>Regelmäßige Sicherheitsupdates</li>
                    <li>Backup-Systeme für Patientendaten</li>
                    <li>Schulung des Personals im Datenschutz</li>
                    <li>Verschlüsselte Speicherung sensibler Daten</li>
                  </ul>
                  <p className="text-gray-700 mt-4">
                    <strong>Hinweis:</strong> Die vollständige Sicherheit von Datenübertragungen 
                    im Internet kann nicht garantiert werden. Bei besonders sensiblen Daten 
                    empfehlen wir die persönliche Übermittlung.
                  </p>
                </div>
              </section>

              {/* Änderungen der Datenschutzerklärung */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-blue-600" />
                  14. Änderungen dieser Datenschutzerklärung
                </h2>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <p className="text-gray-700">
                    Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie 
                    stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen 
                    unserer Leistungen in der Datenschutzerklärung umzusetzen. Für Ihren 
                    erneuten Besuch gilt dann die neue Datenschutzerklärung.
                  </p>
                </div>
              </section>

              {/* Kontakt bei Fragen */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Mail className="w-6 h-6 mr-2 text-blue-600" />
                  15. Kontakt bei Fragen zum Datenschutz
                </h2>
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                  <p className="text-gray-700 mb-4">
                    Bei Fragen zum Datenschutz, zur Ausübung Ihrer Rechte oder bei Anliegen 
                    zur Datenverarbeitung wenden Sie sich bitte an:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">E-Mail:</p>
                        <a 
                          href="mailto:hausarztpraxis-dr-schirmer@web.de" 
                          className="text-gray-700 hover:text-blue-600 transition-colors break-all"
                        >
                          hausarztpraxis-dr-schirmer@web.de
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Telefon:</p>
                        <a 
                          href="tel:+4937715653950" 
                          className="text-gray-700 hover:text-blue-600 transition-colors"
                        >
                          +49 (0) 3771 5653950
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Post:</p>
                        <p className="text-gray-700">
                          Dr. med. Lars Schirmer<br />
                          Schneeberger Straße 3<br />
                          08321 Zschorlau
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatenschutzPage;
