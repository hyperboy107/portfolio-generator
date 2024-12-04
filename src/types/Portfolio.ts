export interface PortfolioData {
  name: string;
  title: string;
  about: string;
  experience: Experience[];
  projects: Project[];
  contact: Contact;
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface PortfolioData {
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  skills: Array<{
    name: string;
    logo: string;
  }>;
};

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  link: string;
}

export interface Contact {
  email: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}