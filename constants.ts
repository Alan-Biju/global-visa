
import { CountriesData, VisaType } from './types';

export const APP_NAME = "Flyconnect";

// Central dynamic link for all document protocols
export const GLOBAL_DRIVE_URL = "https://drive.google.com/file/d/1obqfHNBQEJxYEAPhgGVZ0yLevF1B4U7f/view";

const commonPhotoSpecs = "Two recent passport size photos (35mm X 45mm) with white background. Face coverage must be 70% - 80% and the photo must not be older than 6 months.";

const defaultJournalist = {
  description: "Visa for media professionals and journalists on assignment.",
  requirements: [
    "1. Valid Passport with 6 months validity from travel date.",
    "2. Official Press Credentials issued by a recognized media authority.",
    "3. Original Invitation Letter from the host media organization in the destination country.",
    "4. Detailed Assignment Portfolio containing previous international work.",
    "5. Letter from the Editor-in-Chief confirming the scope and duration of the assignment.",
    "6. Equipment list with serial numbers for temporary import customs clearance."
  ],
  process: ["Accreditation with local media council", "Consular Interview", "Dossier Stamping"],
  formalities: ["Local press pass collection upon arrival", "Mandatory orientation session"],
  duration: "Assignment duration",
  cost: "$150 USD",
  checklists: [
    { label: "Journalist Checklist", url: GLOBAL_DRIVE_URL },
    { label: "Equipment Import Form", url: GLOBAL_DRIVE_URL }
  ],
  downloads: [
    { label: "Master Journalist Submission Guide", url: GLOBAL_DRIVE_URL, description: "Detailed guide for media personnel" },
    { label: "Media Equipment Declaration", url: GLOBAL_DRIVE_URL, description: "Official customs form" }
  ],
  photoSpecs: commonPhotoSpecs
};

const defaultLongTerm = {
  description: "Long-term stay visa for various residential purposes.",
  requirements: [
    "1. Registered Lease Agreement as Proof of Accommodation (minimum 12 months).",
    "2. Personal Bank Statements for the last 12 consecutive months showing stable liquidity.",
    "3. National Identity Proof (Aadhaar/Passport copy) verified by notary.",
    "4. Clean Criminal Record Certificate (Apostilled/Notarized from Home Ministry).",
    "5. Medical Fitness Certificate from an Embassy-approved hospital.",
    "6. Proof of relationship (Marriage/Birth certificate) if applying as a dependent."
  ],
  process: ["Consular submission", "Document verification protocol", "Inter-agency background check"],
  formalities: ["Local police reporting within 14 days of entry", "Residence permit issuance"],
  duration: "1 - 5 Years",
  cost: "$200+ USD",
  checklists: [
    { label: "Long Stay Checklist", url: GLOBAL_DRIVE_URL },
    { label: "Proof of Funds Annexure", url: GLOBAL_DRIVE_URL },
    { label: "Accommodation Declaration", url: GLOBAL_DRIVE_URL }
  ],
  downloads: [
    { label: "Long Term Residence Manual", url: GLOBAL_DRIVE_URL, description: "Lifecycle of long-stay applications" },
    { label: "Financial Sustainability Annex", url: GLOBAL_DRIVE_URL, description: "Rules for proof of funds" }
  ],
  photoSpecs: commonPhotoSpecs
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
         process: ["Fill online application", "Submit biometrics"],
         formalities: ["Immigration check upon arrival"],
         duration: "30 Days to 5 Years",
         cost: "$25 - $80 USD",
         checklists: [
           { label: "Tourist Checklist", url: GLOBAL_DRIVE_URL },
           { label: "Health Declaration", url: GLOBAL_DRIVE_URL }
         ],
         downloads: [
           { label: "India e-Visa Guide", url: "https://indianvisaonline.gov.in/", isExternal: true, description: "Official e-Visa portal redirect" }
         ],
         photoSpecs: commonPhotoSpecs
       },
       [VisaType.WorkPermit]: {
         description: "Employment Visa for skilled professionals.",
         requirements: ["Employment Contract", "Company Registration Proof"],
         process: ["Employer files petition", "Applicant visits embassy"],
         formalities: ["FRRO Registration"],
         duration: "1 Year",
         cost: "$100+ USD",
         checklists: [
           { label: "Work Visa Checklist", url: GLOBAL_DRIVE_URL },
           { label: "Employer Undertaking", url: GLOBAL_DRIVE_URL }
         ],
         photoSpecs: commonPhotoSpecs
       },
       [VisaType.Student]: {
         description: "Student Visa for academic pursuits.",
         requirements: ["Admission Letter", "Financial Proof"],
         process: ["Consulate interview"],
         formalities: ["University registration"],
         duration: "Course Duration",
         cost: "$80 USD",
         checklists: [
           { label: "Student Checklist", url: GLOBAL_DRIVE_URL },
           { label: "Sponsorship Letter", url: GLOBAL_DRIVE_URL }
         ],
         photoSpecs: commonPhotoSpecs
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
        description: "Standard tourist visa for sightseeing and visiting friends in Japan.",
        requirements: [
          "1. Original passport valid for minimum six months from the return date with three blank pages + old passport if any. All previous travels must be documented.",
          "2. Two photographs, size 45mm X 35mm inch, white background, matte finish, 80% face coverage. Neutral expression only.",
          "3. Typed visa application form duly filled & signed by the applicant. To be printed back to back only. Hand-written forms are strictly not accepted and will result in refusal.",
          "4. Covering letter from the Company in Original addressed To, The Visa Officer, Consulate General of Japan, Mumbai stating Company’s profile in brief, applicant's name, passport details, designation, purpose of travel, travelling dates, etc duly signed by an authorized signatory with his/her name, designation & company seal.",
          "5. Copy of Invite letter addressed To, The Visa Officer, Consulate General of Japan, Mumbai stating Company’s profile in brief, applicant's name, passport details, designation, purpose of travel, travelling dates, etc duly signed by an authorized signatory with his/her name, designation & company seal.",
          "6. Formal Letter of Guarantee from the inviting company or individual in Japan, clearly stating the assumption of financial responsibility.",
          "7. Detailed Day to Day schedule (Koteihyo) as per flight ticket itinerary. This must include hotel names, full addresses, and Japanese contact phone numbers for every single day.",
          "8. Copy of ITR (Income Tax Return) acknowledgment returns for the last three assessment years (e.g. 2021-22, 2022-23, 2023-24).",
          "9. Fully vaccinated certificate with name as per passport & passport no. updated with a clear, scannable QR code.",
          "10. Confirmed Round Trip Air Ticket matching the day to day schedule and covering letter dates perfectly.",
          "11. Personal Bank Statement for the last 6 months with original bank stamp and signature on every single page. Minimum balance must reflect travel cost.",
          "12. Travel dates on all documents i.e. covering letter, Invite letter, schedule & ticket must match with zero discrepancies or time gaps.",
          "13. Passports issued outside the jurisdiction of Maharashtra / Goa / Gujarat / MP require a registered leave & license agreement as local residence proof (minimum 1 year valid).",
          "14. Note: Standard Visa Processing Time is a minimum of 8 working days excluding public holidays."
        ],
        process: ["Document vetting at Flyconnect", "VFS/Consulate submission", "Protocol Verification", "Final Stamping"],
        formalities: ["Visit Japan Web (VJW) digital registration for Immigration & Customs"],
        duration: "90 Days",
        cost: "₹6,450 Total Protocol Fee",
        checklists: [
          { label: "Tourist Visa Checklist", url: GLOBAL_DRIVE_URL },
          { label: "Business Visa Checklist", url: GLOBAL_DRIVE_URL },
          { label: "Visit Friends/Family Checklist", url: GLOBAL_DRIVE_URL },
          { label: "Schedule of Stay (Koteihyo) Template", url: GLOBAL_DRIVE_URL }
        ],
        downloads: [
          { label: "Japan Visa Application Form (PDF)", url: "https://www.mofa.go.jp/files/000124525.pdf", isExternal: true, description: "Official MOFA application template" },
          { label: "Flyconnect Master Submission Guide", url: GLOBAL_DRIVE_URL, description: "Internal protocol for error-free filing" }
        ],
        photoSpecs: "Size 45mm X 35mm, white background, matte finish, 80% face coverage. High resolution, strictly no borders or glares on glasses."
      },
      [VisaType.WorkPermit]: {
        description: "Visa for highly skilled professionals based on a valid Certificate of Eligibility (COE).",
        requirements: [
          "1. Original Certificate of Eligibility (COE) issued by regional immigration bureau in Japan.",
          "2. Valid Passport with 6 months remaining validity.",
          "3. One signed application form.",
          "4. Employment Contract copy with company seal.",
          "5. Academic graduation certificate (degree) copy."
        ],
        process: ["COE issuance in Japan", "Visa stamping at local consulate"],
        formalities: ["Residence Card (Zairyu) issuance at major airports (Narita/Haneda)", "City Hall registration within 14 days"],
        duration: "1, 3, or 5 Years",
        cost: "₹4,500 Approx.",
        checklists: [
          { label: "Work Visa Checklist", url: GLOBAL_DRIVE_URL },
          { label: "COE Verification Guide", url: GLOBAL_DRIVE_URL }
        ],
        downloads: [
          { label: "Work Permit Protocol", url: GLOBAL_DRIVE_URL, description: "Step-by-step for COE holders" }
        ],
        photoSpecs: commonPhotoSpecs
      },
      [VisaType.Student]: {
        description: "For students enrolled in recognized Japanese educational institutions.",
        requirements: ["COE for Study", "Admission Letter", "Financial proof of support (Bank statements of sponsor)"],
        process: ["Apply for COE through school", "Consular submission for visa stamping"],
        formalities: ["Permission for part-time work application at airport", "National Health Insurance enrollment"],
        duration: "Course Duration",
        cost: "₹3,200 Approx.",
        checklists: [
          { label: "Student Visa Checklist", url: GLOBAL_DRIVE_URL },
          { label: "Guardian Financial Support Letter", url: GLOBAL_DRIVE_URL }
        ],
        downloads: [
          { label: "Student Life Handbook", url: GLOBAL_DRIVE_URL, description: "Official JASSO orientation guide" }
        ],
        photoSpecs: commonPhotoSpecs
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
        description: "Schengen visa for short stays in Germany and the EU region.",
        requirements: [
          "1. Valid Passport with 2 blank pages and 3 months validity beyond stay.",
          "2. Travel Health Insurance (€30,000 coverage, valid for all Schengen states).",
          "3. Confirmed Hotel Bookings for the entire duration.",
          "4. Proof of Employment / Last 3 Salary Slips.",
          "5. Cover letter detailing purpose of visit and itinerary."
        ],
        process: ["Online Videx application", "VFS Appointment booking", "Biometric collection", "Review"],
        formalities: ["Passport control interview on initial entry into Schengen"],
        duration: "90 Days",
        cost: "€80 + VFS Service Fee",
        checklists: [
          { label: "Short-term Tourist Checklist", url: GLOBAL_DRIVE_URL },
          { label: "Schengen Business Checklist", url: GLOBAL_DRIVE_URL },
          { label: "Cultural/Sport Event Checklist", url: GLOBAL_DRIVE_URL }
        ],
        downloads: [
          { label: "Digital Videx Portal (Germany)", url: "https://videx.diplo.de/", isExternal: true, description: "Mandatory digital application portal" },
          { label: "Schengen Health Insurance Rules", url: GLOBAL_DRIVE_URL, description: "Detailed regulatory requirements for policy" }
        ],
        photoSpecs: "Standard Schengen biometric specifications (35x45mm, high contrast)."
      },
      [VisaType.WorkPermit]: {
        description: "Employment visa including EU Blue Card for skilled workers.",
        requirements: ["Job Offer", "University Degree (Anabin/ZAB recognized)", "Employment Contract with salary details"],
        process: ["National Visa Appointment", "Consular Interview", "D-Visa issuance"],
        formalities: ["Anmeldung (City Address Registration)", "Health insurance activation"],
        duration: "Up to 4 Years",
        cost: "€75",
        checklists: [
          { label: "Blue Card Checklist", url: GLOBAL_DRIVE_URL },
          { label: "Specialist Work Checklist", url: GLOBAL_DRIVE_URL }
        ],
        downloads: [
          { label: "Recognition of Foreign Qualifications", url: "https://www.anabin.kmk.org/", isExternal: true, description: "Anabin database for degree verification" }
        ],
        photoSpecs: commonPhotoSpecs
      },
      [VisaType.Student]: {
        description: "Student visa for higher education (Bachelor/Master) in Germany.",
        requirements: ["University Admission Letter", "Blocked Account (Sperrkonto) Proof (€11,208)", "Language certificates"],
        process: ["Open Blocked Account", "Apply at German Embassy", "Stamping"],
        formalities: ["University enrollment", "Residence permit application at Foreigners' Office"],
        duration: "Study duration",
        cost: "€75",
        checklists: [
          { label: "Student Visa Checklist", url: GLOBAL_DRIVE_URL },
          { label: "Blocked Account Opening Manual", url: GLOBAL_DRIVE_URL }
        ],
        downloads: [
          { label: "Fintiba Blocked Account Portal", url: "https://www.fintiba.com/", isExternal: true, description: "Official partner for Sperrkonto" }
        ],
        photoSpecs: commonPhotoSpecs
      },
      [VisaType.LongTerm]: defaultLongTerm,
      [VisaType.Journalist]: defaultJournalist
    }
  }
};
