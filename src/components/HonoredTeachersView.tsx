import React, { useState, useMemo } from 'react';
import { 
  Award, Star, Heart, Sparkles, Trophy, BookOpen, 
  GraduationCap, CheckCircle2, ThumbsUp, Filter, Search, Users,
  MessageSquare
} from 'lucide-react';
import { Teacher, School } from '../types';
import { TeacherPraiseModal } from './TeacherPraiseModal';

interface HonoredTeachersViewProps {
  schools: School[];
  isDarkMode: boolean;
}

export const HonoredTeachersView: React.FC<HonoredTeachersViewProps> = ({
  schools,
  isDarkMode
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('Barchasi');
  const [onlyMinistryFund, setOnlyMinistryFund] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTeacherForPraise, setSelectedTeacherForPraise] = useState<Teacher | null>(null);

  // Combine teachers from schools
  const allTeachers = useMemo(() => {
    const list: (Teacher & { schoolName: string; schoolId: number })[] = [];
    schools.forEach(s => {
      if (s.notableTeachers && Array.isArray(s.notableTeachers)) {
        s.notableTeachers.forEach(t => {
          list.push({
            ...t,
            schoolName: s.name,
            schoolId: s.id
          });
        });
      }
    });
    return list;
  }, [schools]);

  // Extract unique subjects
  const subjects = useMemo(() => {
    const set = new Set<string>();
    allTeachers.forEach(t => {
      if (t.subject) set.add(t.subject);
    });
    return ['Barchasi', ...Array.from(set)];
  }, [allTeachers]);

  // Filtered teachers
  const filteredTeachers = useMemo(() => {
    return allTeachers.filter(t => {
      const matchesSubject = selectedSubject === 'Barchasi' || t.subject === selectedSubject;
      const matchesMinistry = !onlyMinistryFund || t.isMinistryFundWinner;
      const matchesSearch = !searchQuery || 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.award.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSubject && matchesMinistry && matchesSearch;
    });
  }, [allTeachers, selectedSubject, onlyMinistryFund, searchQuery]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Spotlight Header Banner */}
      <div className={`p-8 sm:p-12 rounded-[2.5rem] border relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-blue-950/50 to-slate-950 border-slate-800' 
          : 'bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl'
      }`}>
        <div className="relative z-10 max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider mb-4 shadow-md">
            <Award className="w-4 h-4" />
            Vazir Jamg'armasi va Faxriy Pedagoglar
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white mb-4">
            Maktabimizning Faxriy Ustozlari
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
            Surxondaryo viloyati Angor tumanidagi 1-sonli umumta'lim maktabi faxriy o'qituvchilari, Respublika va xalqaro olimpiadalar g'oliblarini tayyorlagan fidoyi ustozlar hamda Vazir jamg'armasi 100% ustamasi sohiblari.
          </p>
        </div>

        {/* Quick Stats Badges */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0 relative z-10">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-black block">100% Ustama</span>
              <span className="text-[11px] text-slate-300">Vazir Jamg'armasi g'oliblari</span>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center font-black">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-black block">{allTeachers.length}+ Nafar</span>
              <span className="text-[11px] text-slate-300">Oliy toifali faxriy pedagoglar</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className={`p-5 rounded-2xl border flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        {/* Subject pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {subjects.map(subj => (
            <button
              key={subj}
              onClick={() => setSelectedSubject(subj)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedSubject === subj
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {subj}
            </button>
          ))}
        </div>

        {/* Ministry fund toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setOnlyMinistryFund(!onlyMinistryFund)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
              onlyMinistryFund 
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-sm' 
                : isDarkMode 
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Faqat Vazir jamg'armasi g'oliblari</span>
          </button>
        </div>
      </div>

      {/* Teachers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map(teacher => (
          <div
            key={teacher.id}
            className={`rounded-3xl border p-6 flex flex-col justify-between transition-all hover:scale-[1.01] hover:shadow-xl ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
            }`}
          >
            <div>
              {/* Top Header with Avatar */}
              <div className="flex items-start gap-4 mb-4">
                <div className="relative shrink-0">
                  <img
                    src={teacher.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80'}
                    alt={teacher.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-md border-2 border-blue-500/30"
                  />
                  {teacher.isMinistryFundWinner && (
                    <span 
                      title="Vazir Jamg'armasi g'olibi (100% ustama)"
                      className="absolute -top-2 -right-2 w-7 h-7 bg-amber-500 text-slate-950 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-900"
                    >
                      <Award className="w-4 h-4" />
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      {teacher.subject}
                    </span>
                    {teacher.experience && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {teacher.experience} tajriba
                      </span>
                    )}
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg leading-tight truncate">
                    {teacher.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {teacher.schoolName}
                  </p>
                </div>
              </div>

              {/* Award & Badge */}
              {teacher.award && (
                <div className="mb-3 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-amber-800 dark:text-amber-300 text-xs font-semibold flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="line-clamp-1">{teacher.award}</span>
                </div>
              )}

              {/* Bio */}
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
                {teacher.bio || `${teacher.name} — ${teacher.subject} fani bo'yicha ko'p yillik tajribaga ega bo'lgan yetakchi pedagog.`}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1 text-amber-500 font-black text-xs">
                <Star className="w-4 h-4 fill-amber-500" />
                <span>{teacher.rating || 5.0} / 5.0</span>
              </div>

              <button
                onClick={() => setSelectedTeacherForPraise(teacher)}
                className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-300 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 border border-rose-200 dark:border-rose-900"
              >
                <Heart className="w-3.5 h-3.5" />
                <span>Tashakkurnoma</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTeachers.length === 0 && (
        <div className="p-12 text-center text-slate-400">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="font-bold text-base">Tanlangan filtr bo'yicha ustoz topilmadi.</p>
        </div>
      )}

      {/* Praise Modal */}
      <TeacherPraiseModal
        isOpen={Boolean(selectedTeacherForPraise)}
        onClose={() => setSelectedTeacherForPraise(null)}
        teacher={selectedTeacherForPraise}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};
