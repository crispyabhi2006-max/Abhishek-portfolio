export interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  liveDemo?: string;
  createdAt?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
  iconName: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ApiStatus {
  status: string;
  developer: string;
  institution: string;
  database: {
    connected: boolean;
    mode: 'mongodb' | 'fallback';
    error: string | null;
    uriConfigured: boolean;
  };
}
