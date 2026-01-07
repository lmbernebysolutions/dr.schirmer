// Performance optimization utilities

export const imageOptimization = {
  // Default image sizes for different breakpoints
  sizes: {
    hero: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    card: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw',
    thumbnail: '(max-width: 768px) 50vw, 25vw',
    full: '100vw'
  },
  
  // Quality settings for different image types
  quality: {
    hero: 90,
    card: 75,
    thumbnail: 60,
    avatar: 80
  },
  
  // Placeholder settings
  placeholder: {
    blur: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
  }
};

// Lazy loading configuration
export const lazyLoading = {
  // Intersection Observer options
  observerOptions: {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
  },
  
  // Components that should be loaded immediately
  criticalComponents: [
    'Header',
    'HeroSection',
    'Navigation'
  ],
  
  // Components that can be lazy loaded
  lazyComponents: [
    'GoogleReviews',
    'EmergencySection',
    'AboutSection'
  ]
};

// Code splitting configuration
export const codeSplitting = {
  // Route-based splitting
  routes: {
    '/': ['HomePage'],
    '/about': ['AboutPage'],
    '/services': ['ServicesPage'],
    '/locations': ['LocationsPage'],
    '/contact': ['ContactPage'],
    '/appointment': ['AppointmentPage'],
    '/patient-service': ['PatientServicePage']
  },
  
  // Component-based splitting
  components: {
    // Keine Komponenten für One-Page-Website
  }
};

// Caching configuration
export const caching = {
  // Static assets cache
  staticAssets: {
    maxAge: 31536000, // 1 year
    immutable: true
  },
  
  // API responses cache
  apiResponses: {
    maxAge: 3600, // 1 hour
    staleWhileRevalidate: 86400 // 1 day
  },
  
  // Page cache
  pages: {
    maxAge: 300, // 5 minutes
    staleWhileRevalidate: 3600 // 1 hour
  }
};

// Performance monitoring
export const performanceMonitoring = {
  // Core Web Vitals thresholds
  thresholds: {
    LCP: 2500, // Largest Contentful Paint
    FID: 100,  // First Input Delay
    CLS: 0.1   // Cumulative Layout Shift
  },
  
  // Performance metrics to track
  metrics: [
    'FCP', // First Contentful Paint
    'LCP', // Largest Contentful Paint
    'FID', // First Input Delay
    'CLS', // Cumulative Layout Shift
    'TTFB', // Time to First Byte
    'FMP'  // First Meaningful Paint
  ]
};

// Bundle optimization
export const bundleOptimization = {
  // Tree shaking configuration
  treeShaking: {
    enabled: true,
    sideEffects: false
  },
  
  // Minification settings
  minification: {
    enabled: true,
    removeConsole: process.env.NODE_ENV === 'production'
  },
  
  // Compression settings
  compression: {
    gzip: true,
    brotli: true
  }
};

// Resource hints
export const resourceHints = {
// Preload critical resources
  preload: [
    '/fonts/inter.woff2',
    '/images/hero-bg.jpg'
  ],
  
  // Prefetch non-critical resources
  prefetch: [
    '/about',
    '/services',
    '/contact'
  ],
  
  // DNS prefetch for external domains
  // NOTE: Google Fonts removed - using next/font/google for local hosting (DSGVO-compliant)
  // NOTE: Google Analytics removed - only loaded after explicit user consent
  dnsPrefetch: [
    // No external DNS prefetch needed - all resources are self-hosted or consent-gated
  ]
};

export default {
  imageOptimization,
  lazyLoading,
  codeSplitting,
  caching,
  performanceMonitoring,
  bundleOptimization,
  resourceHints
};