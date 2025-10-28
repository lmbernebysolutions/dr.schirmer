import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import './globals.css';
import ResponsiveHeader from '@/components/layout/ResponsiveHeader';
import Footer from '@/components/layout/Footer';
import { Providers } from '@/components/Providers';
import PasswordProtection from '@/components/PasswordProtection';

// Font configuration - Organic & Human-Centric
const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-quicksand',
  weight: ['400', '500', '700'],
});

// Metadata configuration - Organic & Human-Centric
export const metadata: Metadata = {
  title: {
    default: 'Hausarztpraxis Dr. Schirmer | Zschorlau & Aue',
    template: '%s | Hausarztpraxis Dr. Schirmer',
  },
  description: 'Ihre vertrauensvolle Hausarztpraxis in Zschorlau und Aue. Mit modernster Ausstattung und persönlicher Betreuung für die ganze Familie.',
  keywords: 'Hausarzt, Allgemeinmedizin, Aue, Zschorlau, Erzgebirge, Praxis, Vorsorge, Notfall, Dr. Schirmer, Dr. Unger, Dr. Schuster-Meinel, Lehrpraxis',
  authors: [{ name: 'Dr. Schirmer' }],
  creator: 'Dr. Schirmer',
  publisher: 'Dr. Schirmer',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://dr-schirmer.de'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://dr-schirmer.de',
    title: 'Praxis Dr. Schirmer | Organic & Human-Centric',
    description: 'Ihre Gesundheit in einer warmen und fürsorglichen Atmosphäre. Willkommen in den Praxen Dr. Schirmer in Zschorlau und Aue.',
    siteName: 'Praxis Dr. Schirmer',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Praxis Dr. Schirmer - Organic & Human-Centric',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Praxis Dr. Schirmer | Organic & Human-Centric',
    description: 'Ihre Gesundheit in einer warmen und fürsorglichen Atmosphäre. Willkommen in den Praxen Dr. Schirmer in Zschorlau und Aue.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'business',
};

// Root Layout Component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={quicksand.variable}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch for better performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#1e40af" />
        <meta name="msapplication-TileColor" content="#1e40af" />
        
        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        
        {/* Additional Meta Tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Praxis Dr. Schirmer" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'MedicalBusiness',
              name: 'Hausarztpraxis Dr. Schirmer',
              description: 'Vertrauensvolle Hausarztpraxis für die ganze Familie in Zschorlau und Aue',
              url: 'https://hausarztpraxis-dr-schirmer.de',
              telephone: '037715653950',
              email: 'hausarztpraxis-dr-schirmer@web.de',
              address: [
                {
                  '@type': 'PostalAddress',
                  streetAddress: 'Schneeberger Straße 3',
                  addressLocality: 'Zschorlau',
                  postalCode: '08321',
                  addressRegion: 'Sachsen',
                  addressCountry: 'DE'
                },
                {
                  '@type': 'PostalAddress',
                  streetAddress: 'Schwarzenberger Straße 7',
                  addressLocality: 'Aue',
                  postalCode: '08280',
                  addressRegion: 'Sachsen',
                  addressCountry: 'DE'
                }
              ],
              openingHours: [
                'Mo 07:30-12:00,14:00-16:00',
                'Do 07:30-12:00,14:00-18:00',
                'Mo 07:30-12:00,14:00-17:00',
                'Di 07:30-12:00,14:00-17:00'
              ],
              medicalSpecialty: 'Allgemeinmedizin',
              priceRange: '$$',
              paymentAccepted: 'Cash, Credit Card, Insurance',
              currenciesAccepted: 'EUR'
            }),
          }}
        />
      </head>
      <body className={`${quicksand.className} antialiased`}>
        <PasswordProtection>
          <Providers>
            <div className="min-h-screen flex flex-col">
              <ResponsiveHeader />
              
              {/* Skip Links für Accessibility */}
              <a href="#main-content" className="skip-link">
                Zum Hauptinhalt springen
              </a>
              
              <main id="main-content" className="flex-1">
                {children}
              </main>
              
              <Footer />
            </div>
          </Providers>
        </PasswordProtection>
      </body>
    </html>
  );
}
