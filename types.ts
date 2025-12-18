
export enum VisaType {
  ShortTerm = 'Short Term Visa',
  LongTerm = 'Long Term Visa',
  WorkPermit = 'Work Permit',
  Student = 'Student Visa',
  Journalist = 'Journalist / Media'
}

export interface VisaCategoryDetails {
  description: string;
  requirements: string[];
  process: string[];
  formalities: string[];
  duration: string;
  cost: string;
}

export interface CountryData {
  name: string;
  code: string;
  coordinates?: { top: number; left: number };
  visa: {
    [key in VisaType]?: VisaCategoryDetails;
  };
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
  destination: string;
  date: string;
  address: string;
}
