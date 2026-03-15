
export const VisaType = {
  ShortTerm: 'Short Term Visa',
  LongTerm: 'Long Term Visa',
  WorkPermit: 'Work Permit',
  Student: 'Student Visa',
  Journalist: 'Journalist / Media'
} as const;

export type VisaType = typeof VisaType[keyof typeof VisaType] | string;

export interface ChecklistItem {
  label: string;
  url: string;
}

export interface DownloadItem {
  label: string;
  url: string;
  description?: string;
  isExternal?: boolean;
}

export interface VisaCategoryDetails {
  description: string;
  requirements: string[];
  process?: string[];
  formalities?: string[];
  duration?: string;
  cost?: string;
  checklists?: ChecklistItem[]; // Array of document labels and their specific URLs
  downloads?: DownloadItem[];   // Dynamic list of manuals, guides, and portal redirects
  photoSpecs?: string;          // Custom photo requirement text
  files?: CountryFile[];         // Per-visa-type downloadable files
}

export interface CountryFile {
  name: string;
  url: string;
}

export interface CountryData {
  name: string;
  code: string;
  coordinates?: { top: number; left: number };
  latlng?: { lat: number; lng: number };
  visa: {
    [key: string]: VisaCategoryDetails | undefined;
  };
  files?: CountryFile[];
  formalities?: string[];
  phoneNumber?: string;
}

export interface CountriesData {
  [key: string]: CountryData;
}

export interface UserSelection {
  originId: string;
  originName: string;
  destinationId: string;
  destinationName: string;
  visaType: VisaType;
}

export interface QueryFormData {
  name: string;
  contact: string;
  email: string;
  destination: string;
}
