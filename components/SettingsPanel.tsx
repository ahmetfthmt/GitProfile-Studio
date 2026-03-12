import React, { useState } from 'react';
import { useReadmeStore } from '../store/useReadmeStore';
import { AVAILABLE_TECHS, Section } from '../types';
import { generateMarkdown } from '../utils/generator';
import { Download, Copy, Trash2, CheckCircle2 } from 'lucide-react';
import saveAs from 'file-saver';

const themes = ["default", "tokyonight", "dracula", "dark", "radical", "merko", "gruvbox", "onedark", "cobalt"];

export const SettingsPanel: React.FC = () => {
  const { sections, selectedSectionId, updateSection, removeSection, selectSection, globalUsername, setGlobalUsername, setMobileTab } = useReadmeStore();
  const [activeTab, setActiveTab] = useState<'settings' | 'code'>('settings');
  const [copied, setCopied] = useState(false);

  const selectedSection = sections.find(s => s.id === selectedSectionId);

  const handleRemove = () => {
    if (selectedSection) {
      removeSection(selectedSection.id);
      selectSection(null);
      setMobileTab('canvas');
    }
  };

  const handleCopy = () => {
    const md = generateMarkdown(sections, globalUsername);
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const md = generateMarkdown(sections, globalUsername);
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    saveAs(blob, "README.md");
  };

  const renderInputs = (section: Section) => {
    switch (section.type) {
      case 'header':
        return (
          <>
            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase text-slate-500 font-bold">Title</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white mt-1 focus:border-primary-500 outline-none"
                  value={section.data.title} 
                  onChange={(e) => updateSection(section.id, { title: e.target.value })} 
                />
              </div>
              <div>
                <label className="text-xs uppercase text-slate-500 font-bold">Subtitle</label>
                <textarea 
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white mt-1 focus:border-primary-500 outline-none"
                  value={section.data.subtitle} 
                  onChange={(e) => updateSection(section.id, { subtitle: e.target.value })} 
                />
              </div>
              <div>
                <label className="text-xs uppercase text-slate-500 font-bold">Banner URL (Capsule Render)</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white mt-1 focus:border-primary-500 outline-none text-xs"
                  value={section.data.bannerUrl} 
                  onChange={(e) => updateSection(section.id, { bannerUrl: e.target.value })} 
                />
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="showBanner"
                  checked={section.data.showBanner}
                  onChange={(e) => updateSection(section.id, { showBanner: e.target.checked })}
                />
                <label htmlFor="showBanner" className="text-slate-300 text-sm">Show Banner</label>
              </div>
            </div>
          </>
        );
      case 'tech-stack':
        return (
          <div className="space-y-4">
            <label className="text-xs uppercase text-slate-500 font-bold">Select Technologies</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 h-64 overflow-y-auto pr-2 custom-scroll">
              {AVAILABLE_TECHS.map(tech => (
                <button
                  key={tech.name}
                  onClick={() => {
                    const current = section.data.icons || [];
                    const exists = current.includes(tech.icon);
                    const newIcons = exists 
                      ? current.filter((i: string) => i !== tech.icon) 
                      : [...current, tech.icon];
                    updateSection(section.id, { icons: newIcons });
                  }}
                  className={`p-2 rounded border flex flex-col items-center gap-1 transition-all ${
                    section.data.icons.includes(tech.icon) 
                      ? 'bg-primary-500/20 border-primary-500' 
                      : 'bg-slate-800 border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  <i className={`${tech.icon} text-xl`}></i>
                  <span className="text-[10px] text-slate-400 truncate w-full text-center">{tech.name}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 'stats':
        return (
          <div className="space-y-4">
              <div>
                <label className="text-xs uppercase text-slate-500 font-bold">Theme</label>
                <select 
                   className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white mt-1 focus:border-primary-500 outline-none"
                   value={section.data.theme}
                   onChange={(e) => updateSection(section.id, { theme: e.target.value })}
                >
                  {themes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="hideBorder"
                  checked={section.data.hideBorder}
                  onChange={(e) => updateSection(section.id, { hideBorder: e.target.checked })}
                />
                <label htmlFor="hideBorder" className="text-slate-300 text-sm">Hide Border</label>
              </div>
          </div>
        );
      case 'socials':
        return (
          <div className="space-y-4">
             {['github', 'linkedin', 'twitter', 'website', 'instagram', 'youtube', 'dribbble', 'codepen'].map((platform) => (
                <div key={platform}>
                  <label className="text-xs uppercase text-slate-500 font-bold">{platform} URL</label>
                  <input 
                    type="text" 
                    placeholder={`https://${platform}.com/...`}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white mt-1 focus:border-primary-500 outline-none"
                    value={section.data[platform] || ''} 
                    onChange={(e) => updateSection(section.id, { [platform]: e.target.value })} 
                  />
                </div>
             ))}
          </div>
        );
      case 'about':
        return (
          <div>
            <label className="text-xs uppercase text-slate-500 font-bold">About Text</label>
            <textarea 
              rows={6}
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white mt-1 focus:border-primary-500 outline-none"
              value={section.data.text} 
              onChange={(e) => updateSection(section.id, { text: e.target.value })} 
            />
          </div>
        );
      case 'visitors':
          return (
            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase text-slate-500 font-bold">Color</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white mt-1"
                  value={section.data.color} 
                  onChange={(e) => updateSection(section.id, { color: e.target.value })} 
                />
              </div>
            </div>
          )
      default:
        return <div className="text-slate-500 text-sm">No settings available for this component.</div>;
    }
  };

  return (
    <div className="h-full border-l-0 md:border-l border-slate-800 bg-slate-900/50 flex flex-col">
      <div className="flex border-b border-slate-800">
        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex-1 p-3 text-sm font-medium transition-colors ${activeTab === 'settings' ? 'text-primary-500 border-b-2 border-primary-500' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Editor
        </button>
        <button 
          onClick={() => setActiveTab('code')}
          className={`flex-1 p-3 text-sm font-medium transition-colors ${activeTab === 'code' ? 'text-primary-500 border-b-2 border-primary-500' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Raw Markdown
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scroll">
        {activeTab === 'settings' ? (
          <div className="animate-fade-in flex flex-col h-full">
            <div className="mb-6 pb-6 border-b border-slate-800">
              <label className="text-xs uppercase text-slate-500 font-bold">Global GitHub Username</label>
              <input 
                type="text" 
                placeholder="Enter your GitHub username"
                className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white mt-1 focus:border-primary-500 outline-none"
                value={globalUsername} 
                onChange={(e) => setGlobalUsername(e.target.value)} 
              />
              <p className="text-[10px] text-slate-500 mt-1">This username will be used automatically for stats, visitors, and other widgets.</p>
            </div>
            
            {selectedSection ? (
              <div className="animate-fade-in flex-1">
                <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
                  <h3 className="font-bold text-white capitalize">{selectedSection.type.replace('-', ' ')} Settings</h3>
                  <button 
                    onClick={handleRemove}
                    className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    title="Remove Section"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                {renderInputs(selectedSection)}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
                <p>Select a block in the canvas to edit settings.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <div className="flex-1 bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 overflow-auto border border-slate-800 whitespace-pre-wrap">
              {generateMarkdown(sections, globalUsername)}
            </div>
            <div className="mt-4 flex gap-3">
              <button 
                onClick={handleCopy}
                className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors border border-slate-700"
              >
                 {copied ? <CheckCircle2 size={16} className="text-green-500" /> : <Copy size={16} />}
                 {copied ? 'Copied' : 'Copy'}
              </button>
              <button 
                onClick={handleDownload}
                className="flex-1 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-primary-900/20"
              >
                <Download size={16} />
                Download
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};