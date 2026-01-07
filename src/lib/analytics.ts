// Google Analytics integration with consent management
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export class Analytics {
  private static instance: Analytics;
  private measurementId: string;
  private consentGranted: boolean = false;
  private scriptLoaded: boolean = false;

  constructor(measurementId: string) {
    this.measurementId = measurementId;
  }

  static getInstance(measurementId?: string): Analytics {
    if (!Analytics.instance && measurementId) {
      Analytics.instance = new Analytics(measurementId);
    }
    return Analytics.instance;
  }

  // Initialize Google Analytics - ONLY when consent is granted
  // This method MUST only be called after user has actively consented
  // to comply with TDDDG (Telekommunikation-Digitale-Dienste-Datenschutzgesetz)
  // Das Skript darf erst geladen werden, nachdem der Nutzer aktiv zugestimmt hat
  initialize() {
    if (typeof window === 'undefined') return;

    // CRITICAL: Do not load script or send any data without explicit consent
    // This violates TDDDG if called before consent
    // Gemäß TDDDG erfordert bereits das Laden des Skripts eine vorherige, ausdrückliche Einwilligung
    if (!this.consentGranted) {
      console.warn('⚠️ Analytics.initialize() called without consent. Script will not be loaded.');
      return;
    }

    // Prevent multiple script loads
    if (this.scriptLoaded) {
      return;
    }

    // Load Google Analytics script ONLY after consent
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
    document.head.appendChild(script);
    this.scriptLoaded = true;

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', this.measurementId, {
      anonymize_ip: true,
      respect_dnt: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
  }

  // Update consent - initializes Analytics when consent is granted
  updateConsent(consent: {
    analytics: boolean;
    marketing: boolean;
    preferences: boolean;
  }) {
    const previousConsent = this.consentGranted;
    this.consentGranted = consent.analytics;
    
    // Initialize Analytics ONLY when consent is granted for the first time
    if (consent.analytics && !previousConsent && !this.scriptLoaded) {
      this.initialize();
    }
    
    // Update consent in gtag if already initialized
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: consent.analytics ? 'granted' : 'denied',
        ad_storage: consent.marketing ? 'granted' : 'denied',
        functionality_storage: consent.preferences ? 'granted' : 'denied',
      });
    }
  }

  // Track page view
  trackPageView(url: string, title: string) {
    if (!this.consentGranted) return;

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', this.measurementId, {
        page_title: title,
        page_location: url,
      });
    }
  }

  // Track custom event
  trackEvent(eventName: string, parameters?: Record<string, any>) {
    if (!this.consentGranted) return;

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters);
    }
  }

  // Track conversion
  trackConversion(conversionId: string, value?: number, currency?: string) {
    if (!this.consentGranted) return;

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: conversionId,
        value: value,
        currency: currency || 'EUR',
      });
    }
  }
}

// Performance tracking
export function trackPerformance() {
  if (typeof window === 'undefined') return;

  const analytics = Analytics.getInstance();
  
  // Track page load time
  window.addEventListener('load', () => {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    analytics.trackEvent('page_load_time', {
      load_time: loadTime,
    });
  });

  // Track Core Web Vitals
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'largest-contentful-paint') {
        analytics.trackEvent('web_vitals', {
          metric_name: 'lcp',
          metric_value: Math.round(entry.startTime),
        });
      }
    }
  }).observe({ entryTypes: ['largest-contentful-paint'] });
}

// Error tracking
export function trackErrors() {
  if (typeof window === 'undefined') return;

  const analytics = Analytics.getInstance();

  // Track JavaScript errors
  window.addEventListener('error', (event) => {
    analytics.trackEvent('javascript_error', {
      error_message: event.message,
      error_filename: event.filename,
      error_lineno: event.lineno,
      error_colno: event.colno,
    });
  });

  // Track unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    analytics.trackEvent('unhandled_promise_rejection', {
      error_message: event.reason?.message || 'Unknown error',
      error_stack: event.reason?.stack,
    });
  });
}
