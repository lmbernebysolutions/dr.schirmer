"use client";

import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { CookieManager } from "react-cookie-manager";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <CookieManager
        cookieKitId="hausarztpraxis-dr-schirmer-v1"
        cookieKey="hausarztpraxis-dr-schirmer-consent-v1"
        enableFloatingButton={true}
        showManageButton={true}
        translations={i18n.t}
        displayType="banner"
        theme="light"
        disableGeolocation={true}
        cookieCategories={{
          Analytics: false,  // Nicht verwendet auf der Website - entfernt
          Social: true,  // Wird als "Externe Dienste" für Google Maps verwendet
          Advertising: false  // Nicht verwendet auf der Website
        }}
        initialPreferences={{
          Analytics: false,
          Social: false,  // Google Maps: Standardmäßig nicht aktiviert
          Advertising: false
        }}
        onAccept={() => {
          console.log("✅ Cookies akzeptiert - Hausarztpraxis Dr. Schirmer");
        }}
        onDecline={() => {
          console.log("❌ Cookies abgelehnt - Hausarztpraxis Dr. Schirmer");
        }}
        onManage={(preferences) => {
          console.log("⚙️ Cookie-Einstellungen - Hausarztpraxis Dr. Schirmer:", preferences);
        }}
      >
        {children}
      </CookieManager>
    </I18nextProvider>
  );
}
