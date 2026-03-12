import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';
import { SettingsPanel } from './components/SettingsPanel';
import { Github, LayoutTemplate, Monitor, Settings } from 'lucide-react';
import { useReadmeStore } from './store/useReadmeStore';

const App: React.FC = () => {
  const { mobileTab, setMobileTab } = useReadmeStore();

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-950 text-slate-200 font-sans overflow-hidden">
      {/* Top Navigation */}
      <header className="h-14 border-b border-slate-800 bg-slate-950 flex items-center justify-between px-4 md:px-6 shrink-0 z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-primary-500/20">
            <span className="font-mono font-bold text-white">G</span>
          </div>
          <h1 className="font-bold text-lg tracking-tight">GitProfile <span className="text-primary-500">Studio</span></h1>
        </div>
        <div className="flex items-center gap-4">
           <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
             <Github size={20} />
           </a>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col md:grid md:grid-cols-12 overflow-hidden relative">
        {/* Left Panel: Components */}
        <div className={`w-full h-full md:w-auto md:col-span-3 lg:col-span-2 overflow-hidden ${mobileTab === 'components' ? 'block' : 'hidden md:block'}`}>
          <Sidebar />
        </div>

        {/* Middle Panel: Canvas */}
        <div className={`w-full h-full md:w-auto md:col-span-5 lg:col-span-7 overflow-hidden relative ${mobileTab === 'canvas' ? 'block' : 'hidden md:block'}`}>
          <Canvas />
        </div>

        {/* Right Panel: Settings & Preview */}
        <div className={`w-full h-full md:w-auto md:col-span-4 lg:col-span-3 overflow-hidden shadow-xl z-10 ${mobileTab === 'settings' ? 'block' : 'hidden md:block'}`}>
          <SettingsPanel />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden h-16 border-t border-slate-800 bg-slate-950 flex items-center justify-around px-2 shrink-0 z-20">
        <button onClick={() => setMobileTab('components')} className={`flex flex-col items-center justify-center w-full h-full ${mobileTab === 'components' ? 'text-primary-500' : 'text-slate-400'}`}>
          <LayoutTemplate size={20} />
          <span className="text-[10px] mt-1 font-medium">Add</span>
        </button>
        <button onClick={() => setMobileTab('canvas')} className={`flex flex-col items-center justify-center w-full h-full ${mobileTab === 'canvas' ? 'text-primary-500' : 'text-slate-400'}`}>
          <Monitor size={20} />
          <span className="text-[10px] mt-1 font-medium">Preview</span>
        </button>
        <button onClick={() => setMobileTab('settings')} className={`flex flex-col items-center justify-center w-full h-full ${mobileTab === 'settings' ? 'text-primary-500' : 'text-slate-400'}`}>
          <Settings size={20} />
          <span className="text-[10px] mt-1 font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default App;