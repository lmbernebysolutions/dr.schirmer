// Company configuration for Hausarztpraxis Dr. Schirmer - Dual Practice Setup

export interface PracticeInfo {
  id: string;
  name: string;
  location: string;
  address: string;
  phone: string;
  fax: string;
  email: string;
  type: 'hauptstandort' | 'zweigstelle' | 'landarztpraxis';
  openingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  specialServices?: string[];
  color: 'yellow' | 'red';
}

export const PRACTICES: PracticeInfo[] = [
  {
    id: 'zschorlau',
    name: 'Praxis Zschorlau',
    location: 'Zschorlau',
    address: 'Schneeberger Straße 3, 08321 Zschorlau',
    phone: '03771 / 56 53 950',
    fax: '03771 / 56 53 959',
    email: 'hausarztpraxis-dr-schirmer@web.de',
    type: 'landarztpraxis',
    color: 'yellow',
    openingHours: {
      monday: '07:30 - 12:00 & 14:00 - 16:00',
      tuesday: '07:30 - 11:30',
      wednesday: '07:30 - 12:00',
      thursday: '07:30 - 12:00 & 14:00 - 18:00',
      friday: '07:30 - 11:30',
      saturday: 'Geschlossen',
      sunday: 'Geschlossen'
    },
    specialServices: ['Kindersprechstunde (Do 14-18 Uhr)', 'Landarztpraxis', 'Labor vor Ort']
  },
  {
    id: 'aue',
    name: 'Praxis Aue',
    location: 'Aue',
    address: 'Schwarzenberger Straße 7, 08280 Aue',
    phone: '03771 / 20 208',
    fax: '03771 / 25 90 944',
    email: 'hausarztpraxis-dr-schirmer@web.de',
    type: 'zweigstelle',
    color: 'red',
    openingHours: {
      monday: '07:30 - 12:00 & 14:00 - 17:00',
      tuesday: '07:30 - 12:00 & 14:00 - 17:00',
      wednesday: 'Geschlossen',
      thursday: 'Geschlossen',
      friday: 'Geschlossen',
      saturday: 'Geschlossen',
      sunday: 'Geschlossen'
    }
  }
];

export const COMPANY_INFO = {
  name: 'Hausarztpraxis Dr. Schirmer',
  description: 'Hausarztpraxis Dr. med. Lars Schirmer, Facharzt für Allgemeinmedizin, Aue, Zschorlau, Erzgebirge - Akademische Lehrpraxis',
  website: 'www.hausarztpraxis-dr-schirmer.de',
  logo: '/images/stab.jpg',
  practices: PRACTICES
};

export const CONTACT_INFO = {
  email: 'hausarztpraxis-dr-schirmer@web.de',
  practices: PRACTICES
};

export const getPracticeById = (id: string): PracticeInfo | undefined => {
  return PRACTICES.find(practice => practice.id === id);
};

export const getMainPractice = (): PracticeInfo => {
  return PRACTICES.find(practice => practice.type === 'landarztpraxis') || PRACTICES[0]!;
};
