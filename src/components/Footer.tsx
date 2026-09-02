import React from 'react';
import { 
  GraduationCap, Sparkles 
} from 'lucide-react';

interface FooterProps {
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;

}

export const Footer: React.FC<FooterProps> = ({ isDarkMode, setActiveTab }) => {
  return (
    <footer className={`mt-16 relative ${
      isDarkMode ? 'bg-slate-950 text-slate-400' : 'bg-slate-900 text-slate-300'
    }`}>
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 transform -translate-y-[99%]">
        <svg className="relative block w-[calc(100%+1.3px)] h-[50px] sm:h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={isDarkMode ? 'fill-slate-950' : 'fill-slate-900'}></path>
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs">
          
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-black">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="font-black text-base text-slate-900 dark:text-white">EduStats Maktablar</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              O'zbekiston Respublikasi umumta'lim va ixtisoslashgan maktablarining milliy ochiq reyting va jamoatchilik fikri platformasi.
            </p>
          </div>

          <div>
            <h5 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">Bo'limlar</h5>
            <ul className="space-y-2">
              <li><button onClick={() => setActiveTab('angor-special')} className="hover:text-blue-600 font-bold text-amber-500">1-Maktab Asosiy</button></li>
              <li><button onClick={() => setActiveTab('teachers')} className="hover:text-blue-600">Faxriy Ustozlar</button></li>
              <li><button onClick={() => setActiveTab('schedule')} className="hover:text-blue-400 font-semibold text-blue-400">📅 Dars jadvali</button></li>
              <li><button onClick={() => setActiveTab('quiz')} className="hover:text-blue-600">🧠 Test & Viktorina</button></li>
              <li><button onClick={() => setActiveTab('leaderboard')} className="hover:text-blue-600">Olimpiada reytingi</button></li>
              <li><button onClick={() => setActiveTab('reviews')} className="hover:text-blue-600 font-semibold text-blue-500">💬 Fikr va takliflar</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">Angor 1-maktab Markazi</h5>
            <p className="leading-relaxed text-slate-500 mb-2">
              Surxondaryo viloyati, Angor tumani, Mustaqillik ko'chasi 12-uy.
            </p>
            <p className="font-semibold text-slate-700 dark:text-slate-300">
              Zakovat va Al-Xorazmiy olimpiadasi tayanch maktabi.
            </p>
          </div>


        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] opacity-60">
          <p>© {new Date().getFullYear()} EduStats Maktablar Portali. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
};
