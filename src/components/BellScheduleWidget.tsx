import React, { useState, useEffect } from 'react';
import { Clock, Bell, Volume2, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface LessonPeriod {
  number: number;
  start: string;
  end: string;
  name: string;
}

const FIRST_SHIFT: LessonPeriod[] = [
  { number: 1, start: "08:00", end: "08:45", name: "1-dars" },
  { number: 2, start: "08:50", end: "09:35", name: "2-dars" },
  { number: 3, start: "09:45", end: "10:30", name: "3-dars (Katta tanaffus)" },
  { number: 4, start: "10:40", end: "11:25", name: "4-dars" },
  { number: 5, start: "11:35", end: "12:20", name: "5-dars" },
  { number: 6, start: "12:25", end: "13:10", name: "6-dars" },
];

const SECOND_SHIFT: LessonPeriod[] = [
  { number: 1, start: "13:30", end: "14:15", name: "1-dars" },
  { number: 2, start: "14:20", end: "15:05", name: "2-dars" },
  { number: 3, start: "15:15", end: "16:00", name: "3-dars (Katta tanaffus)" },
  { number: 4, start: "16:10", end: "16:55", name: "4-dars" },
  { number: 5, start: "17:00", end: "17:45", name: "5-dars" },
];

interface BellScheduleWidgetProps {
  isDarkMode: boolean;
}

export const BellScheduleWidget: React.FC<BellScheduleWidgetProps> = ({ isDarkMode }) => {
  const [shift, setShift] = useState<'1' | '2'>('1');
  const [isPlayingBell, setIsPlayingBell] = useState(false);

  const periods = shift === '1' ? FIRST_SHIFT : SECOND_SHIFT;

  const handleTestBell = () => {
    setIsPlayingBell(true);
    soundManager.playSchoolBell();
    setTimeout(() => setIsPlayingBell(false), 2000);
  };

  return (
    <div className={`p-6 rounded-3xl border ${
      isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
    }`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shrink-0">
            <Bell className={`w-5 h-5 ${isPlayingBell ? 'animate-bounce text-slate-950' : ''}`} />
          </div>
          <div>
            <h3 className="font-extrabold text-base">Qo'ng'iroqlar va Dars Vaqti Jadvali</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Angor 1-maktab namunaviy dars va tanaffus taqvimi</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Shift Switcher */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setShift('1')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                shift === '1' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              1-smena
            </button>
            <button
              onClick={() => setShift('2')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                shift === '2' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              2-smena
            </button>
          </div>

          {/* Bell test sound button */}
          <button
            onClick={handleTestBell}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all active:scale-95 shadow-sm"
            title="Qo'ng'iroq ovozini sinash"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Qo'ng'iroqni chalish</span>
          </button>
        </div>
      </div>

      {/* Grid of Periods */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-4">
        {periods.map((period) => (
          <div 
            key={period.number}
            className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all hover:border-blue-500/50 ${
              isDarkMode ? 'bg-slate-800/50 border-slate-700/60' : 'bg-slate-50/70 border-slate-200/80'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-black">
                {period.number}
              </span>
              <div>
                <h5 className="font-bold text-xs">{period.name}</h5>
                <p className="text-[11px] text-slate-500 font-mono">{period.start} — {period.end}</p>
              </div>
            </div>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          Darslar davomiyligi: <strong>45 daqiqa</strong>
        </span>
        <span>Katta tanaffus: <strong>15 daqiqa</strong> (3-darsdan so'ng)</span>
      </div>

    </div>
  );
};
