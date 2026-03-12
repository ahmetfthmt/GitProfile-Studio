export type SectionType = 'header' | 'about' | 'tech-stack' | 'stats' | 'socials' | 'visitors';

export interface BaseSection {
  id: string;
  type: SectionType;
}

export interface HeaderData {
  title: string;
  subtitle: string;
  bannerUrl: string;
  showBanner: boolean;
}

export interface AboutData {
  text: string;
}

export interface TechStackData {
  icons: string[]; // List of devicon class names
}

export interface StatsData {
  showIcons: boolean;
  theme: string;
  hideBorder: boolean;
}

export interface SocialsData {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  email?: string;
  instagram?: string;
  youtube?: string;
  dribbble?: string;
  codepen?: string;
}

export interface VisitorData {
  label: string;
  color: string;
  style: 'flat' | 'plastic' | 'flat-square' | 'for-the-badge' | 'social';
}

// Discriminated Union for Section Data
export type SectionData = 
  | HeaderData 
  | AboutData 
  | TechStackData 
  | StatsData 
  | SocialsData
  | VisitorData;

export interface Section extends BaseSection {
  data: any; // Using any for flexibility in the store, but specific components will type check
}

export const AVAILABLE_TECHS = [
  { name: 'JavaScript', icon: 'devicon-javascript-plain' },
  { name: 'TypeScript', icon: 'devicon-typescript-plain' },
  { name: 'React', icon: 'devicon-react-original' },
  { name: 'Next.js', icon: 'devicon-nextjs-original' },
  { name: 'Node.js', icon: 'devicon-nodejs-plain' },
  { name: 'Python', icon: 'devicon-python-plain' },
  { name: 'Java', icon: 'devicon-java-plain' },
  { name: 'C#', icon: 'devicon-csharp-plain' },
  { name: 'Go', icon: 'devicon-go-original-wordmark' },
  { name: 'Rust', icon: 'devicon-rust-plain' },
  { name: 'HTML5', icon: 'devicon-html5-plain' },
  { name: 'CSS3', icon: 'devicon-css3-plain' },
  { name: 'Tailwind', icon: 'devicon-tailwindcss-original' },
  { name: 'Docker', icon: 'devicon-docker-plain' },
  { name: 'Kubernetes', icon: 'devicon-kubernetes-plain' },
  { name: 'AWS', icon: 'devicon-amazonwebservices-original' },
  { name: 'Git', icon: 'devicon-git-plain' },
  { name: 'MongoDB', icon: 'devicon-mongodb-plain' },
  { name: 'PostgreSQL', icon: 'devicon-postgresql-plain' },
  { name: 'Redis', icon: 'devicon-redis-plain' },
];