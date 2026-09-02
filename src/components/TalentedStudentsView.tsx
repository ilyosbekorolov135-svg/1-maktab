import React, { useMemo } from 'react';
import { Star, Users, Trophy } from 'lucide-react';
import { School } from '../types';

// Safely ensure value is always an array
function safeArray(val: any): any[] {
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') {
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) ? parsed : [];
    } catch { return []; }
  }
  return [];
}

interface TalentedStudentsViewProps {
  schools: School[];
  isDarkMode: boolean;
}

export const TalentedStudentsView: React.FC<TalentedStudentsViewProps> = ({ schools, isDarkMode }) => {
  const allStudents = useMemo(() => {
    return schools.flatMap(s => safeArray(s.talentedStudents).map(st => ({ ...st, schoolName: s.name })));
  }, [schools]);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className={"rounded-3xl border p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden " + (isDarkMode ? 'bg-gradient-to-br from-slate-900 to-indigo-950 border-slate-800' : 'bg-gradient-to-br from-indigo-50 to-white border-slate-200')}>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-amber-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider shadow-sm flex items-center gap-1">
              <Star className="w-3 h-3" /> Iqtidorlilar
            </span>
          </div>
          <h2 className="text-3xl font-black mb-2 tracking-tight text-slate-900 dark:text-white">
            Maktabimiz Iftixorlari
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
            Respublika va xalqaro fan olimpiadalari, sport musobaqalari g'oliblari va a'lo baholarga erishgan iqtidorli o'quvchilar ro'yxati.
          </p>
        </div>
      </div>

      {allStudents.length === 0 ? (
        <div className="p-12 text-center text-slate-400">
          <Users className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="font-bold text-base">Hozircha iqtidorli o'quvchilar kiritilmagan.</p>
          <p className="text-xs mt-1">Admin paneldan o'quvchilarni qo'shishingiz mumkin.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allStudents.map((student: any) => (
            <div
              key={student.id}
              className={"rounded-3xl border p-6 flex flex-col justify-between transition-all hover:scale-[1.01] hover:shadow-xl " + (isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs')}
            >
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative shrink-0">
                    <img
                      src={student.avatar || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=200&auto=format&fit=crop&q=80'}
                      alt={student.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-md border-2 border-indigo-500/30"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=200&auto=format&fit=crop&q=80'; }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                      {student.grade} - sinf
                    </span>
                    <h3 className="font-extrabold text-base sm:text-lg leading-tight truncate mt-1">
                      {student.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {student.schoolName}
                    </p>
                  </div>
                </div>
                {student.achievements && (
                  <div className="mb-3 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-amber-800 dark:text-amber-300 text-xs font-semibold flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="line-clamp-2">{student.achievements}</span>
                  </div>
                )}
                {student.bio && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {student.bio}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
