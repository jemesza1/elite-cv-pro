
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
  | 'zurich'
  | 'executive'
  | 'silicon'
  | 'vogue'
  | 'harvard'
  | 'ignite'
  | 'montreal'
  | 'oxford'
  | 'berlin'
  | 'tokyo'
  | 'stockholm'
  | 'dubai'
  | 'atlas'
  | 'prism'
  | 'nexus'
  | 'zenith'
  | 'quantum'
  | 'spectrum'
  | 'cascade'
  | 'meridian'
  | 'echo'
  | 'nova'
  | 'orbit'
  | 'vertex'
  | 'elite'
  | 'minimal'
  | 'silicon_valley'
  | 'parisian'
  // NEW 2026 Premium Series
  | 'monaco'       // Riviera luxury - navy & gold
  | 'nordic'       // Ultra-clean Scandinavian 2.0
  | 'imperial'     // Dark executive with gold lines
  | 'aurora';      // Soft gradient modern professional

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

export interface TemplateProps {
  data: CVData;
  lang: Language;
}
