export interface Person {
  id: string;
  name: string;
  nameEn: string;
  title: string;
  description: string;
  birthDate: string;
  deathDate?: string;
  avatar: string;
  coverImage: string;
  tags: string[];
  achievements: string[];
  quote: string;
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  year: number;
  age: number;
  title: string;
  description: string;
  category: MilestoneCategory;
  importance: 'low' | 'medium' | 'high' | 'critical';
  image?: string;
  achievements?: string[];
  challenges?: string[];
  insights?: string[];
}

export type MilestoneCategory = 
  | 'birth' 
  | 'education' 
  | 'career' 
  | 'innovation' 
  | 'leadership' 
  | 'setback' 
  | 'breakthrough' 
  | 'legacy'
  | 'personal';

export interface TimelineFilters {
  categories: MilestoneCategory[];
  importance: ('low' | 'medium' | 'high' | 'critical')[];
  ageRange: [number, number];
}

export interface NavigationItem {
  name: string;
  href: string;
  icon?: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  navigation: NavigationItem[];
}