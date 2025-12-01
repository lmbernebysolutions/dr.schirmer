import { Metadata } from 'next';

// SEO configuration for the Dr. Schirmer website
export const seoConfig = {
  // Default metadata
  default: {
    title: 'Dr. med. Lars Schirmer - Facharzt für Allgemeinmedizin',
    description: 'Facharzt für Allgemeinmedizin in Aue und Zschorlau. Akademische Lehrpraxis mit persönlicher Betreuung und moderner Medizin im Erzgebirge.',
    keywords: [
      'Hausarzt',
      'Allgemeinmedizin',
      'Aue',
      'Zschorlau',
      'Erzgebirge',
      'Dr. Schirmer',
      'Praxis',
      'Vorsorgeuntersuchung',
      'Hausbesuch',
      'Terminvereinbarung'
    ],
    authors: [{ name: 'Dr. med. Lars Schirmer' }],
    creator: 'Dr. med. Lars Schirmer',
    publisher: 'Dr. med. Lars Schirmer',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'de_DE',
      url: 'https://dr-schirmer.de',
      siteName: 'Dr. med. Lars Schirmer',
      title: 'Dr. med. Lars Schirmer - Facharzt für Allgemeinmedizin',
      description: 'Facharzt für Allgemeinmedizin in Aue und Zschorlau. Akademische Lehrpraxis mit persönlicher Betreuung und moderner Medizin im Erzgebirge.',
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Dr. med. Lars Schirmer - Facharzt für Allgemeinmedizin',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Dr. med. Lars Schirmer - Facharzt für Allgemeinmedizin',
      description: 'Facharzt für Allgemeinmedizin in Aue und Zschorlau. Akademische Lehrpraxis mit persönlicher Betreuung und moderner Medizin im Erzgebirge.',
      images: ['/images/twitter-image.jpg'],
    },
    alternates: {
      canonical: 'https://dr-schirmer.de',
    },
  },

  // Page-specific metadata
  pages: {
    home: {
      title: 'Dr. med. Lars Schirmer - Ihr Hausarzt im Erzgebirge',
      description: 'Willkommen bei Dr. med. Lars Schirmer, Ihrem vertrauensvollen Hausarzt in Aue und Zschorlau. Moderne Medizin mit persönlicher Betreuung.',
      keywords: [
        'Hausarzt Aue',
        'Hausarzt Zschorlau',
        'Allgemeinmedizin Erzgebirge',
        'Praxis Dr. Schirmer',
        'Terminvereinbarung',
        'Vorsorgeuntersuchung',
        'Hausbesuch'
      ],
    },
    about: {
      title: 'Über Dr. med. Lars Schirmer - Ihr Hausarzt',
      description: 'Erfahren Sie mehr über Dr. med. Lars Schirmer, seine Qualifikationen und die Geschichte unserer Praxis in Aue und Zschorlau.',
      keywords: [
        'Dr. Schirmer Biografie',
        'Hausarzt Qualifikationen',
        'Praxis Geschichte',
        'Akademische Lehrpraxis',
        'Team Dr. Schirmer'
      ],
    },
    services: {
      title: 'Leistungen - Dr. med. Lars Schirmer',
      description: 'Unsere medizinischen Leistungen: Allgemeinmedizin, Vorsorgeuntersuchungen, chronische Erkrankungen und Hausbesuche in Aue und Zschorlau.',
      keywords: [
        'Allgemeinmedizin Leistungen',
        'Vorsorgeuntersuchung',
        'Chronische Erkrankungen',
        'Hausbesuch',
        'Impfungen',
        'Reisemedizin'
      ],
    },
    locations: {
      title: 'Standorte - Dr. med. Lars Schirmer',
      description: 'Unsere Praxisstandorte in Aue und Zschorlau. Erfahren Sie mehr über Öffnungszeiten, Anfahrtswege und Besonderheiten.',
      keywords: [
        'Praxis Aue',
        'Praxis Zschorlau',
        'Standort Erzgebirge',
        'Anfahrtsweg',
        'Öffnungszeiten',
        'Parkplätze'
      ],
    },
    contact: {
      title: 'Kontakt - Dr. med. Lars Schirmer',
      description: 'Kontaktieren Sie Dr. med. Lars Schirmer für Terminvereinbarungen und Fragen. Telefon, E-Mail und Kontaktformular.',
      keywords: [
        'Kontakt Dr. Schirmer',
        'Terminvereinbarung',
        'Telefon Praxis',
        'E-Mail Kontakt',
        'Kontaktformular'
      ],
    },
    appointment: {
      title: 'Terminvereinbarung - Dr. med. Lars Schirmer',
      description: 'Vereinbaren Sie Ihren Termin online oder kontaktieren Sie uns direkt. Flexible Termine an beiden Standorten.',
      keywords: [
        'Termin buchen',
        'Online Terminvereinbarung',
        'Termin Aue',
        'Termin Zschorlau',
        'Praxis Termin'
      ],
    },
    patientService: {
      title: 'Patientenservice - Dr. med. Lars Schirmer',
      description: 'Patientenservice mit Downloads, FAQ und wichtigen Informationen für unsere Patienten.',
      keywords: [
        'Patientenservice',
        'Downloads',
        'FAQ',
        'Formulare',
        'Patienteninformationen'
      ],
    },
  },
};

// Generate metadata for a specific page
export function generateMetadata(page: keyof typeof seoConfig.pages): Metadata {
  const pageConfig = seoConfig.pages[page];
  const defaultConfig = seoConfig.default;

    return {
    title: pageConfig.title,
    description: pageConfig.description,
    keywords: pageConfig.keywords,
    authors: defaultConfig.authors,
    creator: defaultConfig.creator,
    publisher: defaultConfig.publisher,
    robots: defaultConfig.robots,
    openGraph: {
      ...defaultConfig.openGraph,
      title: pageConfig.title,
      description: pageConfig.description,
    },
    twitter: {
      ...defaultConfig.twitter,
      title: pageConfig.title,
      description: pageConfig.description,
    },
    alternates: {
      canonical: `https://dr-schirmer.de/${page === 'home' ? '' : page}`,
    },
  };
}

// Structured data for medical business
export const structuredData = {
  
  organization: {
      '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: 'Praxis Dr. med. Lars Schirmer',
    description: 'Akademische Lehrpraxis für Allgemeinmedizin',
    url: 'https://dr-schirmer.de',
    logo: 'https://dr-schirmer.de/images/logo.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Hauptstraße 123',
      addressLocality: 'Aue',
      postalCode: '08309',
      addressRegion: 'Sachsen',
      addressCountry: 'DE',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+4937715653950',
      contactType: 'customer service',
      availableLanguage: 'German',
    },
  },
  
  breadcrumb: (items: Array<{ name: string; url: string }>) => ({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
      name: item.name,
      item: `https://dr-schirmer.de${item.url}`,
    })),
  }),
};

// Local SEO configuration
export const localSeo = {
  // Google My Business information
  googleMyBusiness: {
    name: 'Dr. med. Lars Schirmer',
    address: 'Hauptstraße 123, 08309 Aue, Deutschland',
    phone: '+4937715653950',
    website: 'https://dr-schirmer.de',
    hours: {
      monday: '8:00-18:00',
      tuesday: '8:00-18:00',
      wednesday: '8:00-18:00',
      thursday: '8:00-18:00',
      friday: '8:00-18:00',
      saturday: '9:00-12:00',
      sunday: 'Geschlossen',
    },
    categories: ['Hausarzt', 'Allgemeinmedizin', 'Arzt'],
    description: 'Facharzt für Allgemeinmedizin in Aue und Zschorlau',
  },
  
  // Local keywords
  localKeywords: [
    'Hausarzt Aue',
    'Hausarzt Zschorlau',
    'Allgemeinmedizin Erzgebirge',
    'Arzt Aue',
    'Arzt Zschorlau',
    'Praxis Aue',
    'Praxis Zschorlau',
    'Hausarzt Erzgebirge',
    'Allgemeinmedizin Aue',
    'Allgemeinmedizin Zschorlau',
  ],
  
  // Service areas
  serviceAreas: [
    'Aue',
    'Zschorlau',
    'Schwarzenberg',
    'Lauter',
    'Bernsbach',
    'Grünhain-Beierfeld',
    'Raschau-Markersbach',
    'Erzgebirge',
    'Sachsen',
  ],
};

export default {
  seoConfig,
  generateMetadata,
  structuredData,
  localSeo,
};