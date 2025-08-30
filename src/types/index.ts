export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'tools' | 'languages' | 'databases' | 'cloud' | 'ai';
  level: number; // 1-5
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
  description?: string;
}

export interface SkillCategory {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
} 