
import { CountriesData, VisaType } from './types';

export const APP_NAME = "Global Visa Portal";

const defaultJournalist = {
  description: "Visa for media professionals and journalists on assignment.",
  requirements: ["Press Credentials", "Invitation Letter", "Editor's Letter", "Portfolio"],
  process: ["Accreditation with Ministry of External Affairs", "Embassy Interview", "Standard Verification"],
  formalities: ["Press pass registration", "Local reporting guidelines"],
  duration: "3 - 12 Months",
  cost: "$150 USD"
};

const defaultLongTerm = {
  description: "Long-term stay visa for various residential purposes.",
  requirements: ["Proof of Accommodation", "Bank Statements (12 months)", "Clean Criminal Record", "Health Clearance"],
  process: ["Initial application at consulate", "Document notarization", "Final approval after background checks"],
  formalities: ["Local police registration", "Residence permit issuance"],
  duration: "1 - 5 Years",
  cost: "$200+ USD"
};

export const COUNTRIES_DATA: CountriesData = {
  "india": {
     name: "India",
     code: "IN",
     coordinates: { top: 44, left: 69 },
     visa: {
       [VisaType.ShortTerm]: {
         description: "Tourist Visa for recreation and sightseeing.",
         requirements: ["Passport (6 months validity)", "Passport Photo", "Return Ticket"],
         process: ["Fill online application", "Submit biometrics", "Receive visa via email/post"],
         formalities: ["Immigration check upon arrival", "Customs declaration"],
         duration: "30 Days to 5 Years",
         cost: "$25 - $80 USD"
       },
       [VisaType.WorkPermit]: {
         description: "Employment Visa for skilled professionals.",
         requirements: ["Employment Contract", "Company Registration Proof", "Academic Certificates"],
         process: ["Employer files petition", "Applicant visits embassy", "Passport stamping"],
         formalities: ["FRRO Registration within 14 days", "Tax registration"],
         duration: "1 Year (Extendable)",
         cost: "$100+ USD"
       },
       [VisaType.Student]: {
         description: "Student Visa for academic pursuits.",
         requirements: ["Admission Letter", "Financial Proof", "No Objection Certificate"],
         process: ["Apply with admission proof", "Interview at consulate", "Medical clearance"],
         formalities: ["University registration", "Police reporting if stay > 180 days"],
         duration: "Course Duration",
         cost: "$80 USD"
       },
       [VisaType.LongTerm]: defaultLongTerm,
       [VisaType.Journalist]: defaultJournalist
     }
  },
  "japan": {
    name: "Japan",
    code: "JP",
    coordinates: { top: 36, left: 86 },
    visa: {
      [VisaType.ShortTerm]: {
        description: "Standard tourist visa for sightseeing and visiting friends.",
        requirements: ["Valid Passport", "Itinerary", "Proof of Funds"],
        process: ["Apply at consulate or VFS", "Wait for processing (5-7 days)", "Collect passport"],
        formalities: ["QR Code for Immigration/Customs (Visit Japan Web)", "Fingerprint scan at airport"],
        duration: "90 Days",
        cost: "$30 USD"
      },
      [VisaType.WorkPermit]: {
        description: "Visa for highly skilled professionals and specific sectors.",
        requirements: ["COE (Certificate of Eligibility)", "Contract", "Degree"],
        process: ["Employer applies for COE in Japan", "Applicant applies for Visa with COE", "Entry into Japan"],
        formalities: ["Residence Card issuance at airport", "City hall address registration"],
        duration: "1-5 Years",
        cost: "$60 USD"
      },
      [VisaType.Student]: {
        description: "For students enrolled in Japanese universities or language schools.",
        requirements: ["Acceptance Letter", "Financial Support Proof"],
        process: ["School applies for COE", "Apply for visa at embassy", "Enter Japan"],
        formalities: ["Work permit application (optional)", "National Health Insurance signup"],
        duration: "6 Months - 2 Years",
        cost: "$40 USD"
      },
      [VisaType.LongTerm]: defaultLongTerm,
      [VisaType.Journalist]: defaultJournalist
    }
  },
  "germany": {
    name: "Germany",
    code: "DE",
    coordinates: { top: 26, left: 51 },
    visa: {
      [VisaType.ShortTerm]: {
        description: "Schengen visa for short stays in Germany and EU.",
        requirements: ["Travel Insurance", "Hotel Booking", "Return Ticket"],
        process: ["Book appointment", "Submit documents in person", "Biometrics collection"],
        formalities: ["Border control interview", "Proof of accommodation checks"],
        duration: "90 Days within 180 days",
        cost: "€80"
      },
      [VisaType.WorkPermit]: {
        description: "For qualified professionals and Blue Card applicants.",
        requirements: ["Job Offer", "University Degree", "Health Insurance"],
        process: ["ZAV Approval (if needed)", "Embassy Interview", "Visa issuance"],
        formalities: ["Residence permit application after arrival", "City registration (Anmeldung)"],
        duration: "4 Years",
        cost: "€75"
      },
      [VisaType.Student]: {
        description: "For university studies or preparatory courses.",
        requirements: ["University Admission", "Blocked Account (€11k+)"],
        process: ["Open blocked bank account", "Apply at Embassy", "Receive National Visa"],
        formalities: ["University enrollment", "Residence permit extension"],
        duration: "Duration of Studies",
        cost: "€75"
      },
      [VisaType.LongTerm]: defaultLongTerm,
      [VisaType.Journalist]: defaultJournalist
    }
  },
  "usa": {
    name: "United States",
    code: "US",
    coordinates: { top: 32, left: 20 },
    visa: {
      [VisaType.ShortTerm]: {
        description: "B-2 Visa for tourism, vacation, or medical treatment.",
        requirements: ["DS-160 Form", "Interview", "Ties to Home Country"],
        process: ["Submit DS-160", "Pay fee", "Schedule and attend interview"],
        formalities: ["CBP Interview at port of entry", "I-94 record creation"],
        duration: "Up to 6 Months",
        cost: "$185 USD"
      },
      [VisaType.WorkPermit]: {
        description: "H-1B or L-1 visas for specialty occupations.",
        requirements: ["Labor Condition Application", "Petition Approval"],
        process: ["Employer files petition", "Consular processing", "Visa stamping"],
        formalities: ["SSN Application", "Tax compliance"],
        duration: "3 Years (Renewable)",
        cost: "$460+ USD"
      },
      [VisaType.Student]: {
        description: "F-1 Visa for academic students.",
        requirements: ["I-20 Form", "SEVIS Fee", "Interview"],
        process: ["Pay SEVIS fee", "Complete DS-160", "Embassy Interview"],
        formalities: ["Report to DSO upon arrival", "Maintain full-time status"],
        duration: "Duration of Status",
        cost: "$185 + SEVIS Fee"
      },
      [VisaType.LongTerm]: defaultLongTerm,
      [VisaType.Journalist]: defaultJournalist
    }
  },
  "canada": {
    name: "Canada",
    code: "CA",
    coordinates: { top: 18, left: 22 },
    visa: {
      [VisaType.ShortTerm]: {
        description: "Visitor visa or eTA for short-term visits.",
        requirements: ["Valid Passport", "Good Health", "No Criminal Record"],
        process: ["Create IRCC account", "Upload docs", "Biometrics appointment"],
        formalities: ["CBSA kiosk declaration", "Immigration officer interview"],
        duration: "Up to 6 Months",
        cost: "$100 CAD"
      },
      [VisaType.WorkPermit]: {
        description: "Employer-specific or Open Work Permit.",
        requirements: ["Job Offer", "LMIA (if applicable)"],
        process: ["Employer submits offer", "Apply online", "Medical exam (if req)"],
        formalities: ["SIN Number application", "Health insurance registration"],
        duration: "1-2 Years",
        cost: "$155 CAD"
      },
      [VisaType.Student]: {
        description: "Study permit for designated learning institutions.",
        requirements: ["Acceptance Letter", "Proof of Funds ($20k CAD)"],
        process: ["Apply online/paper", "Biometrics", "Receive Port of Entry Letter"],
        formalities: ["Permit issuance at border", "Condition of stay compliance"],
        duration: "Length of program + 90 days",
        cost: "$150 CAD"
      },
      [VisaType.LongTerm]: defaultLongTerm,
      [VisaType.Journalist]: defaultJournalist
    }
  }
};
