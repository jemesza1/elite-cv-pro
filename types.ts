
export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  graduationDate: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface LanguageSkill {
  id: string;
  name: string;
  level: number; // 0 to 100
}

export interface CVData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    website: string;
    location: string;
    jobTitle: string;
    summary: string;
    photo?: string;
    birthDate?: string;
    license?: string;
    linkedin?: string;
  };
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: LanguageSkill[];
  interests: string[];
  isBilingual?: boolean;
  coverLetter?: {
    company: string;
    role: string;
    content: string;
  };
}

export type TemplateType =
  | 'zurich'           // Swiss Minimalist
  | 'executive'        // Corporate Executive
  | 'silicon'          // Tech Modern
  | 'vogue'            // Luxury Editorial
  | 'harvard'          // Ivy League
  | 'ignite'           // Creative Bold
  | 'montreal'         // Canadian Bilingual
  | 'oxford'           // Academic/Research
  | 'berlin'           // Modern Minimalist
  | 'tokyo'            // Creative Professional
  | 'stockholm'        // Scandinavian Design
  | 'dubai';           // Luxury Executive

export enum BuilderStep {
  TEMPLATE = 'Style Selection',
  PHOTO = 'Portrait',
  PERSONAL = 'Identity',
  EXPERIENCE = 'Career Path',
  EDUCATION = 'Academic',
  SKILLS = 'Mastery',
  LANGUAGES = 'Communication',
  SUMMARY = 'Impact Hook',
  COVER_LETTER = 'AI Assistant',
  FINALIZE = 'AI Audit & Export'
}

export type AppView = 'landing' | 'selection' | 'builder';
export type Language = 'en' | 'fr' | 'ar';
