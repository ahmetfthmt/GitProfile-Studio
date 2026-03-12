import { create } from 'zustand';
import { Section, SectionType } from '../types';

interface ReadmeState {
  sections: Section[];
  selectedSectionId: string | null;
  globalUsername: string;
  mobileTab: 'components' | 'canvas' | 'settings';
  
  // Actions
  addSection: (type: SectionType) => void;
  removeSection: (id: string) => void;
  updateSection: (id: string, data: any) => void;
  reorderSections: (newSections: Section[]) => void;
  selectSection: (id: string | null) => void;
  setGlobalUsername: (username: string) => void;
  setMobileTab: (tab: 'components' | 'canvas' | 'settings') => void;
}

const getDefaultData = (type: SectionType): any => {
  switch (type) {
    case 'header':
      return { 
        title: "Hi 👋, I'm a Developer", 
        subtitle: "A passionate frontend engineer from Earth.", 
        bannerUrl: "https://capsule-render.vercel.app/api?type=waving&height=300&color=gradient&text=GitProfile%20Studio&reversal=false&fontAlign=50&fontAlignY=41&fontSize=80",
        showBanner: true 
      };
    case 'about':
      return { text: "I love building tools that make developers' lives easier. Currently working on React and AI integration." };
    case 'tech-stack':
      return { icons: ['devicon-javascript-plain', 'devicon-react-original', 'devicon-typescript-plain'] };
    case 'stats':
      return { showIcons: true, theme: 'tokyonight', hideBorder: true };
    case 'socials':
      return { github: '', linkedin: '', twitter: '', website: '', instagram: '', youtube: '', dribbble: '', codepen: '' };
    case 'visitors':
      return { label: 'Profile Views', color: 'blue', style: 'flat' };
    default:
      return {};
  }
};

export const useReadmeStore = create<ReadmeState>((set) => ({
  sections: [
    { id: '1', type: 'header', data: getDefaultData('header') },
    { id: '2', type: 'tech-stack', data: getDefaultData('tech-stack') },
  ],
  selectedSectionId: '1',
  globalUsername: 'yourusername',
  mobileTab: 'canvas',

  setGlobalUsername: (username) => set({ globalUsername: username }),
  setMobileTab: (tab) => set({ mobileTab: tab }),

  addSection: (type) => set((state) => {
    const newSection: Section = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      data: getDefaultData(type),
    };
    return { 
      sections: [...state.sections, newSection],
      selectedSectionId: newSection.id 
    };
  }),

  removeSection: (id) => set((state) => ({
    sections: state.sections.filter((s) => s.id !== id),
    selectedSectionId: state.selectedSectionId === id ? null : state.selectedSectionId
  })),

  updateSection: (id, data) => set((state) => ({
    sections: state.sections.map((s) => 
      s.id === id ? { ...s, data: { ...s.data, ...data } } : s
    )
  })),

  reorderSections: (newSections) => set({ sections: newSections }),

  selectSection: (id) => set({ selectedSectionId: id }),
}));