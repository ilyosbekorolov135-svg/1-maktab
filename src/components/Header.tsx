import React from 'react';
import { 
  Moon, Sun, PenLine, 
  Award, Sparkles, School as SchoolIcon, Brain, Calendar, MessageSquare, Star
} from 'lucide-react';
import { SchoolEmblem } from './SchoolEmblem';
import { SiteSettings } from '../hooks/useSiteSettings';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  onOpenFeedback: () => void;
  siteSettings?: SiteSettings;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isDarkMode,
  setIsDarkMode,
  onOpenFeedback,
  siteSettings
}) => {
  const siteName = siteSettings?.siteName || '1-Maktab';
  const siteBadge = siteSettings?.siteBadge || 'ANGOR TUMANI';
  const siteTagline = siteSettings?.siteTagline || "Surxondaryo viloyati 1-sonli maktab portali";
  const headerLogo = siteSettings?.headerLogo || '';
  const navMain = siteSettings?.navMain || '1-Maktab Asosiy';
  const navTeachers = siteSettings?.navTeachers || 'Fidoiy Ustozlar';
  const navTalented = siteSettings?.navTalented || "Iqtidorli O'quvchilar";
  const navSchedule = siteSettings?.navSchedule || 'Dars Jadvali';
  const navScheduleBadge = siteSettings?.navScheduleBadge || '2026';
  const navReviews = siteSettings?.navReviews || 'Fikr va Takliflar';

  return (
    <header className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-colors ${
      isDarkMode ? 'bg-slate-950/70 border-white/5' : 'bg-white/70 border-slate-200/60 shadow-[0_4px_30px_rgba(0,0,0,0.02)]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo & Navigation */}
        <div className="flex items-center gap-4 lg:gap-8">
          <div 
            onClick={() => setActiveTab('angor-special')} 
            className="flex items-center gap-3 cursor-pointer select-none group shrink-0"
            title="Angor 1-maktabi rasmiy portali"
          >
            {headerLogo ? (
              <img src={headerLogo} alt={siteName} className="w-9 h-9 rounded-xl object-cover" />
            ) : (
              <SchoolEmblem 
                schoolName="Angor 1-maktab"
                size="sm"
                showRays={false}
              />
            )}
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {siteName}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200 rounded-md uppercase tracking-wider">
                  {siteBadge}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block -mt-0.5 hidden sm:block">
                {siteTagline}
              </span>
            </div>
          </div>
          
          {/* Main Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { id: 'angor-special', label: navMain, icon: SchoolIcon },
              { id: 'teachers', label: navTeachers, icon: Award },
              { id: 'talented', label: navTalented, icon: Star },
              { id: 'schedule', label: navSchedule, icon: Calendar, badge: navScheduleBadge },
              { id: 'reviews', label: navReviews, icon: MessageSquare },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-2.5 xl:px-3 py-1.5 rounded-full font-bold text-xs transition-all flex items-center whitespace-nowrap gap-1.5 relative ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25' 
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.label}</span>
                  {tab.badge && !isActive && (
                    <span className="bg-amber-500 text-slate-950 text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Dark mode toggle */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            title="Mavzuni o'zgartirish"
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
              isDarkMode ? 'text-amber-300 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Leave Feedback CTA Button */}
          <button 
            onClick={onOpenFeedback}
            className="hidden sm:flex bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-3.5 py-2 rounded-full font-bold text-xs transition-all items-center gap-1.5 shadow-sm shadow-blue-500/25 shrink-0"
            title="Fikr bildirish"
          >
            <PenLine className="w-3.5 h-3.5" />
            <span>Fikr bildirish</span>
          </button>
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="flex lg:hidden overflow-x-auto px-4 py-2 border-t border-slate-100 dark:border-slate-800 gap-1 no-scrollbar">
        {[
          { id: 'angor-special', label: `⭐ ${navMain}` },
          { id: 'teachers', label: `🎖️ ${navTeachers}` },
          { id: 'talented', label: `🌟 ${navTalented}` },
          { id: 'schedule', label: `📅 ${navSchedule}` },
          { id: 'reviews', label: `💬 ${navReviews}` },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
};
