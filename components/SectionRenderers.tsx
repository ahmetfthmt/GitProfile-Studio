import React from 'react';
import { Section, AVAILABLE_TECHS } from '../types';

interface RendererProps {
  section: Section;
  globalUsername: string;
}

const HeaderRenderer: React.FC<RendererProps> = ({ section }) => {
  const { title, subtitle, bannerUrl, showBanner } = section.data;
  return (
    <div className="text-center">
      {showBanner && bannerUrl && (
        <img 
          src={bannerUrl} 
          alt="Banner" 
          referrerPolicy="no-referrer"
          className="w-full h-auto min-h-[100px] object-contain rounded-lg mb-6 opacity-100 shadow-sm" 
        />
      )}
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{title || 'Header Title'}</h1>
      <h2 className="text-lg md:text-xl text-slate-400">{subtitle || 'Subtitle goes here'}</h2>
    </div>
  );
};

const AboutRenderer: React.FC<RendererProps> = ({ section }) => {
  return (
    <div className="prose prose-invert max-w-none">
      <p className="text-slate-300 whitespace-pre-wrap">{section.data.text || 'Write something about yourself...'}</p>
    </div>
  );
};

const TechStackRenderer: React.FC<RendererProps> = ({ section }) => {
  const { icons } = section.data;
  return (
    <div>
      <h3 className="font-bold text-lg text-white mb-4">🛠️ Languages and Tools</h3>
      <div className="flex flex-wrap gap-4">
        {icons && icons.length > 0 ? (
          icons.map((iconClass: string, idx: number) => (
            <i key={idx} className={`${iconClass} text-4xl colored`} title={iconClass.split('-')[1]} />
          ))
        ) : (
          <p className="text-slate-500 italic">No technologies selected.</p>
        )}
      </div>
    </div>
  );
};

const StatsRenderer: React.FC<RendererProps> = ({ section, globalUsername }) => {
  const { theme, hideBorder, showIcons } = section.data;
  if (!globalUsername) return <div className="text-red-400">Please enter a global GitHub username in settings.</div>;
  
  const cleanUsername = globalUsername.trim();
  const statsUrl = `https://github-readme-stats.vercel.app/api?username=${cleanUsername}&show_icons=${showIcons}&theme=${theme}&hide_border=${hideBorder}`;
  const streakUrl = `https://github-readme-streak-stats.herokuapp.com/?user=${cleanUsername}&theme=${theme}&hide_border=${hideBorder}`;

  return (
    <div>
      <h3 className="font-bold text-lg text-white mb-4">⚡ Stats</h3>
      <div className="flex flex-col md:flex-row gap-4 flex-wrap">
        <img src={statsUrl} alt="GitHub Stats" referrerPolicy="no-referrer" className="h-40 max-w-full" />
        <img src={streakUrl} alt="Streak Stats" referrerPolicy="no-referrer" className="h-40 max-w-full" />
      </div>
    </div>
  );
};

const SocialsRenderer: React.FC<RendererProps> = ({ section }) => {
  const { github, linkedin, twitter, website, instagram, youtube, dribbble, codepen } = section.data;
  return (
    <div>
      <h3 className="font-bold text-lg text-white mb-4">📫 Connect with me</h3>
      <div className="flex gap-2 flex-wrap">
        {github && <div className="px-3 py-1 bg-slate-800 border border-slate-700 rounded text-sm text-slate-300">GitHub: {github}</div>}
        {linkedin && <div className="px-3 py-1 bg-slate-800 border border-slate-700 rounded text-sm text-slate-300">LinkedIn: {linkedin}</div>}
        {twitter && <div className="px-3 py-1 bg-slate-800 border border-slate-700 rounded text-sm text-slate-300">Twitter: {twitter}</div>}
        {website && <div className="px-3 py-1 bg-slate-800 border border-slate-700 rounded text-sm text-slate-300">Web: {website}</div>}
        {instagram && <div className="px-3 py-1 bg-slate-800 border border-slate-700 rounded text-sm text-slate-300">Instagram: {instagram}</div>}
        {youtube && <div className="px-3 py-1 bg-slate-800 border border-slate-700 rounded text-sm text-slate-300">YouTube: {youtube}</div>}
        {dribbble && <div className="px-3 py-1 bg-slate-800 border border-slate-700 rounded text-sm text-slate-300">Dribbble: {dribbble}</div>}
        {codepen && <div className="px-3 py-1 bg-slate-800 border border-slate-700 rounded text-sm text-slate-300">CodePen: {codepen}</div>}
        {!github && !linkedin && !twitter && !website && !instagram && !youtube && !dribbble && !codepen && <span className="text-slate-500 italic">No links configured</span>}
      </div>
    </div>
  );
};

const VisitorRenderer: React.FC<RendererProps> = ({ section, globalUsername }) => {
    const { label, color, style } = section.data;
    if(!globalUsername || globalUsername.trim() === "") return <div className="text-slate-500 italic p-4 border border-dashed border-slate-800 rounded">Please configure global GitHub username in settings</div>;
    
    const cleanUsername = encodeURIComponent(globalUsername.trim());
    const encodedLabel = encodeURIComponent(label || 'Profile Views');
    const encodedColor = encodeURIComponent(color || 'blue');
    
    const url = `https://visitor-badge.laobi.icu/badge?page_id=${cleanUsername}.${cleanUsername}&left_text=${encodedLabel}&color=${encodedColor}&style=${style}`;
    
    return (
        <div className="flex items-center">
            <img src={url} alt="visitors" referrerPolicy="no-referrer" className="max-w-full" />
        </div>
    )
}

export const renderSection = (section: Section, globalUsername: string) => {
  switch (section.type) {
    case 'header': return <HeaderRenderer section={section} globalUsername={globalUsername} />;
    case 'about': return <AboutRenderer section={section} globalUsername={globalUsername} />;
    case 'tech-stack': return <TechStackRenderer section={section} globalUsername={globalUsername} />;
    case 'stats': return <StatsRenderer section={section} globalUsername={globalUsername} />;
    case 'socials': return <SocialsRenderer section={section} globalUsername={globalUsername} />;
    case 'visitors': return <VisitorRenderer section={section} globalUsername={globalUsername} />;
    default: return <div>Unknown Component</div>;
  }
};