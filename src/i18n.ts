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
      manageEssentialSubtitle: "Diese Cookies sind für die Grundfunktionen der Website erforderlich. Sie ermöglichen die Session-Verwaltung, Sicherheitsfunktionen und die Speicherung Ihrer Cookie-Einstellungen.",
      manageEssentialStatus: "Status: Immer aktiviert",
      manageEssentialStatusButtonText: "Immer an",
      manageSocialTitle: "Externe Dienste",
      manageSocialSubtitle: "Diese Cookies ermöglichen die Nutzung externer Dienste wie Google Maps. Google Maps wird für die Routenplanung zu unseren Praxen in Zschorlau und Aue verwendet. Bitte beachten Sie, dass Google Maps Daten in die USA überträgt. Diese Kategorie ist optional - Sie können die Website auch ohne Google Maps nutzen.",
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
