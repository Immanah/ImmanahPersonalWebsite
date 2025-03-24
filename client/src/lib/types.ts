import { ProfileType } from "@shared/schema";

export interface ProfileData {
  id: number;
  type: ProfileType;
  name: string;
  badge: string;
  description: string;
  headerProjects: string;
  avatarUrl: string;
}

export interface ContentItemBase {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  type: string;
  description: string;
  tags: string[];
  timeline?: string;
  technologies?: string;
  role?: string;
  linkUrl?: string;
  linkText?: string;
  details: string[];
  galleryImages: string[];
}

export interface ExperienceItem extends ContentItemBase {
  type: 'experience';
  company: string;
  location: string;
  duration: string;
}

export interface SkillItem extends ContentItemBase {
  type: 'skill';
  category: string;
  level: number;
}

export interface ProjectItem extends ContentItemBase {
  type: 'project';
  github?: string;
  demo?: string;
  relevantFor: ProfileType[];
}

export interface EducationItem extends ContentItemBase {
  type: 'education';
  institution: string;
  degree: string;
  year: string;
}

export type ContentItem = ExperienceItem | SkillItem | ProjectItem | EducationItem;

export interface ContentData {
  profile: ProfileData;
  experiences: ExperienceItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  education: EducationItem[];
}
