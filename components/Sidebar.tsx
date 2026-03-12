import React from 'react';
import { useReadmeStore } from '../store/useReadmeStore';
import { Layout, Type, Code2, BarChart2, Share2, Eye } from 'lucide-react';

const widgets = [
  { type: 'header', label: 'Header', icon: Layout, desc: 'Title, Subtitle, Banner' },
  { type: 'about', label: 'About Me', icon: Type, desc: 'Text description' },
  { type: 'tech-stack', label: 'Tech Stack', icon: Code2, desc: 'Languages & Tools' },
  { type: 'stats', label: 'GitHub Stats', icon: BarChart2, desc: 'Readme Stats Cards' },
  { type: 'socials', label: 'Socials', icon: Share2, desc: 'Profile Links' },
  { type: 'visitors', label: 'Visitors', icon: Eye, desc: 'Hit Counter' },
] as const;

export const Sidebar: React.FC = () => {
  const { addSection, setMobileTab } = useReadmeStore();

  const handleAdd = (type: any) => {
    addSection(type);
    setMobileTab('canvas');
  };

  return (
    <div className="h-full border-r-0 md:border-r border-slate-800 bg-slate-900/50 p-4 flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Widgets</h2>
        <p className="text-sm text-slate-400">
          <span className="hidden md:inline">Click to add to canvas</span>
          <span className="md:hidden">Tap to add to canvas</span>
        </p>
      </div>
      
      <div className="flex flex-col gap-3 overflow-y-auto">
        {widgets.map((widget) => (
          <button
            key={widget.type}
            onClick={() => handleAdd(widget.type)}
            className="flex items-start gap-3 p-3 rounded-xl bg-slate-800 border border-slate-700 hover:border-primary-500 hover:bg-slate-750 transition-all text-left group"
          >
            <div className="p-2 rounded-lg bg-slate-900 text-primary-500 group-hover:text-white group-hover:bg-primary-500 transition-colors">
              <widget.icon size={20} />
            </div>
            <div>
              <div className="font-semibold text-slate-200">{widget.label}</div>
              <div className="text-xs text-slate-500">{widget.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};