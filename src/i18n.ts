import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  de: {
    translation: {
      title: "Cookie-Einstellungen - Hausarztpraxis Dr. Schirmer",
      message: "Die Hausarztpraxis Dr. Schirmer verwendet Cookies, um Ihre Erfahrung auf unserer Website zu verbessern. Wählen Sie aus, welche Cookies Sie zulassen möchten.",
      buttonText: "Alle akzeptieren",
      declineButtonText: "Alle ablehnen",
      manageButtonText: "Cookies verwalten",
      privacyPolicyText: "Datenschutzerklärung",
      privacyPolicyLink: "/datenschutz",
      manageTitle: "Cookie-Einstellungen - Hausarztpraxis Dr. Schirmer",
      manageMessage: "Passen Sie Ihre Cookie-Einstellungen für die Website der Hausarztpraxis Dr. Schirmer unten an. Weitere Informationen finden Sie in unserer Datenschutzerklärung.",
      manageEssentialTitle: "Notwendige Cookies",
      manageEssentialSubtitle: "Diese Cookies sind für die Grundfunktionen der Website erforderlich. Sie ermöglichen die Session-Verwaltung, Sicherheitsfunktionen und die Speicherung Ihrer Cookie-Einstellungen. Zusätzlich werden externe Dienste wie Google Maps (für Routenplanung zu unseren Praxen in Zschorlau und Aue) und Google Fonts geladen, die für die Funktionalität der Website notwendig sind.",
      manageEssentialStatus: "Status: Immer aktiviert",
      manageEssentialStatusButtonText: "Immer an",
      manageAnalyticsTitle: "Analytische Cookies",
      manageAnalyticsSubtitle: "Diese Cookies helfen der Hausarztpraxis Dr. Schirmer zu verstehen, wie Besucher mit unserer Website interagieren. Sie werden für statistische Auswertungen und zur Verbesserung unserer Online-Präsenz verwendet. (Bspw. Google Analytics, falls aktiviert)",
      manageCookiesStatus: "Status: {{status}} am {{date}}",
      manageCookiesStatusConsented: "Zugestimmt",
      manageCookiesStatusDeclined: "Abgelehnt",
      manageCancelButtonText: "Abbrechen",
      manageSaveButtonText: "Einstellungen speichern",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "de",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
