
export enum VisaType {
  Tourism = 'Tourism',
  Work = 'Work',
  Student = 'Student'
}

export interface VisaCategoryDetails {
  description: string;
  requirements: string[];
  process: string[];    // New field
  formalities: string[]; // New field
  duration: string;
  cost: string;
}

export interface CountryData {
  name: string;
  code: string; // ISO code or ID for lookup
  coordinates?: { top: number; left: number }; // Map positioning (percentage)
  visa: {
    [key in VisaType]: VisaCategoryDetails;
  };
}

// Firestore-friendly structure: Collection of documents keyed by ID
export interface CountriesData {
  [key: string]: CountryData;
}

export interface UserSelection {
  originId: string; // New field
  originName: string; // New field
  destinationId: string;
  destinationName: string;
  age: number;
  visaType: VisaType;
}

export interface QueryFormData {
  age: string;
  email: string;
  date: string;
  address: string;
}
