import React, { useState, useMemo } from 'react';
import { 
  Calendar, Clock, User, MapPin, Search, Sparkles, 
  Printer, BookOpen, Layers, CheckCircle2, Award, 
  ChevronRight, Filter, Compass, Bell, ShieldCheck,
  GraduationCap, Users, School, ArrowRight, Star
} from 'lucide-react';
import { 
  AVAILABLE_GRADES, 
  AVAILABLE_STREAMS, 
  SUBJECT_TYPE_COLORS,
  getScheduleForGradeAndStream,
  DaySchedule,
  LessonItem,
  ClassStreamInfo
} from '../data/scheduleData';

interface ClassScheduleViewerProps {
  isDarkMode?: boolean;
  className?: string;
  initialGrade?: number;
  initialStream?: string;
}

export const ClassScheduleViewer: React.FC<ClassScheduleViewerProps> = ({
  isDarkMode = false,
  className = "",
  initialGrade = 10,
  initialStream = 'A'
}) => {
  const [selectedGrade, setSelectedGrade] = useState<number>(initialGrade);
  const [selectedStream, setSelectedStream] = useState<string>(initialStream);
  
  // Day filter: 'all' or 'Dushanba' | 'Seshanba' | ...
  const [activeDayFilter, setActiveDayFilter] = useState<string>('all');
  
  // Search query for teacher or subject or room
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Subject category filter
  const [subjectTypeFilter, setSubjectTypeFilter] = useState<string>('Barchasi');

  // Bell schedule modal or drawer toggle
  const [showBellSchedule, setShowBellSchedule] = useState<boolean>(false);

  // Get current day of week in Uzbek
  const currentDayName = useMemo(() => {
    const dayOfWeek = new Date().getDay(); // 0 is Sunday, 1 is Monday
    const map: Record<number, string> = {
      1: 'Dushanba',
      2: 'Seshanba',
      3: 'Chorshanba',
      4: 'Payshanba',
      5: 'Juma',
      6: 'Shanba',
      0: 'Dushanba' // fallback to Monday on Sunday
    };
    return map[dayOfWeek] || 'Dushanba';
  }, []);

  // Fetch current class schedule
  const currentClass: ClassStreamInfo = useMemo(() => {
    return getScheduleForGradeAndStream(selectedGrade, selectedStream);
  }, [selectedGrade, selectedStream]);

  // Filter lessons
  const filteredSchedule = useMemo(() => {
    let days = currentClass.schedule;

    // Filter by day
    if (activeDayFilter !== 'all') {
      days = days.filter(d => d.dayName === activeDayFilter);
    }

    // Filter inside lessons if search query or type filter is active
    if (searchQuery.trim() || subjectTypeFilter !== 'Barchasi') {
      const q = searchQuery.toLowerCase().trim();
      
      return days.map(d => ({
        ...d,
        lessons: d.lessons.filter(lesson => {
          const matchesQuery = !q || (
            lesson.subject.toLowerCase().includes(q) ||
            lesson.teacher.toLowerCase().includes(q) ||
            lesson.room.toLowerCase().includes(q) ||
            lesson.type.toLowerCase().includes(q)
          );

          const matchesType = subjectTypeFilter === 'Barchasi' || lesson.type === subjectTypeFilter;

          return matchesQuery && matchesType;
        })
      })).filter(d => d.lessons.length > 0);
    }

    return days;
  }, [currentClass, activeDayFilter, searchQuery, subjectTypeFilter]);

  const handlePrint = () => {
    window.print();
  };

  const handleSetToday = () => {
    setActiveDayFilter(currentDayName);
  };

  const subjectCategories = ['Barchasi', 'Aniq fanlar', 'Tabiiy fanlar', 'Tillar', 'Gumanitar', 'STEAM & IT', 'San\'at & Sport'];

  return (
    <div id="class-schedule-section" className={`space-y-6 ${className}`}>
      
      {/* Header section with Title & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1.5 border border-blue-200 dark:border-blue-800">
              <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              2026-2027 O'quv Yili
            </span>
            <span className="text-[11px] font-bold text-slate-400">
              • Rasmiy Ta'lim Dars Jadvali
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Sinflar Dars Jadvali va Xonalar Taqsimoti
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Kerakli sinf va guruhni tanlab, haftalik darslar, xona raqamlari va fan ustozlari bilan tanishing
          </p>
        </div>

        {/* Action buttons (Print, Today, Bell schedule) */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleSetToday}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95 ${
              activeDayFilter === currentDayName
                ? 'bg-blue-600 text-white shadow-blue-500/20'
                : isDarkMode
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
            title="Bugungi darslarni ko'rsatish"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-500" />
            <span>Bugungi darslar ({currentDayName})</span>
          </button>

          <button
            onClick={() => setShowBellSchedule(!showBellSchedule)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95 ${
              showBellSchedule
                ? 'bg-amber-500 text-slate-950 shadow-amber-500/20'
                : isDarkMode
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Qo'ng'iroqlar vaqti</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 active:scale-95"
            title="Jadvalni chop etish yoki PDF saqlash"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Chop etish</span>
          </button>
        </div>
      </div>

      {/* ================= GRADE & STREAM SELECTORS BAR ================= */}
      <div className={`p-4 sm:p-5 rounded-3xl border transition-all ${
        isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50/90 border-slate-200 shadow-xs'
      }`}>
        <div className="space-y-4">
          
          {/* Grade selection row */}
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-2">
              1. Sinfni tanlang:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {AVAILABLE_GRADES.map((grade) => (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95 ${
                    selectedGrade === grade
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-500/20'
                      : isDarkMode
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                        : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>{grade}-sinf</span>
                </button>
              ))}
            </div>
          </div>

          {/* Stream / Group selection row */}
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-2">
              2. Guruh va Yo'nalishni tanlang:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {AVAILABLE_STREAMS.map((st) => (
                <button
                  key={st.id}
                  onClick={() => setSelectedStream(st.id)}
                  className={`p-3 rounded-2xl text-left border transition-all active:scale-98 ${
                    selectedStream === st.id
                      ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 dark:border-blue-500 ring-2 ring-blue-500/20'
                      : isDarkMode
                        ? 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
                        : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-black ${
                      selectedStream === st.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'
                    }`}>
                      {selectedGrade}-{st.id} sinfi
                    </span>
                    <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-md ${
                      selectedStream === st.id 
                        ? 'bg-blue-600 text-white' 
                        : isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {st.id}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                    {st.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ================= CLASS INFORMATION HERO CARD ================= */}
      <div className={`p-5 sm:p-6 rounded-3xl border relative overflow-hidden transition-all ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 shadow-sm text-slate-900'
      }`}>
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          {/* Left: Class details */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-blue-600 text-white text-xs font-black px-3 py-1 rounded-xl shadow-sm">
                {currentClass.displayName}
              </span>
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold px-3 py-1 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-blue-500" />
                {currentClass.specialization}
              </span>
              <span className="bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-xs font-bold px-3 py-1 rounded-xl border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {currentClass.shift}-smena {currentClass.shift === 1 ? '(08:00 - 13:10)' : '(13:30 - 18:35)'}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 flex-wrap">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-500" />
                Biriktirilgan xona: <strong className="text-slate-900 dark:text-white">{currentClass.homeRoom}</strong>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-500" />
                O'quvchilar soni: <strong className="text-slate-900 dark:text-white">{currentClass.studentsCount} nafar</strong>
              </span>
            </div>
          </div>

          {/* Right: Class Teacher Badge */}
          <div className={`p-3.5 rounded-2xl border flex items-center gap-3.5 shrink-0 ${
            isDarkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-slate-50 border-slate-200/90'
          }`}>
            <img 
              src={currentClass.classTeacherAvatar} 
              alt={currentClass.classTeacher}
              className="w-12 h-12 rounded-2xl object-cover border-2 border-blue-500/40 shrink-0 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400">Sinf Rahbari</span>
                {currentClass.isTeacherMinistryWinner && (
                  <span className="text-[9px] font-black px-1.5 py-0.2 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 rounded">
                    100% Ustama
                  </span>
                )}
              </div>
              <h4 className="font-black text-sm text-slate-900 dark:text-white">
                {currentClass.classTeacher}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {currentClass.classTeacherRole}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ================= BELL SCHEDULE MODAL / ACCORDION ================= */}
      {showBellSchedule && (
        <div className={`p-5 rounded-3xl border animate-fadeIn transition-all ${
          isDarkMode ? 'bg-slate-900/95 border-amber-500/30' : 'bg-amber-50/70 border-amber-200'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-500" />
              <h4 className="font-black text-sm text-slate-900 dark:text-white">
                {currentClass.shift}-smena Qo'ng'iroqlar Jadvali
              </h4>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Dars davomiyligi: 45 daqiqa</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {[1, 2, 3, 4, 5, 6].map((p) => {
              const time = currentClass.shift === 1 
                ? (p === 1 ? '08:00 - 08:45' : p === 2 ? '08:50 - 09:35' : p === 3 ? '09:45 - 10:30' : p === 4 ? '10:40 - 11:25' : p === 5 ? '11:35 - 12:20' : '12:25 - 13:10')
                : (p === 1 ? '13:30 - 14:15' : p === 2 ? '14:20 - 15:05' : p === 3 ? '15:15 - 16:00' : p === 4 ? '16:10 - 16:55' : p === 5 ? '17:00 - 17:45' : '17:50 - 18:35');
              
              return (
                <div 
                  key={p} 
                  className={`p-2.5 rounded-xl border text-center ${
                    isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-amber-200/80 shadow-2xs'
                  }`}
                >
                  <span className="text-xs font-black text-blue-600 dark:text-blue-400 block">{p}-dars</span>
                  <span className="text-[11px] font-mono text-slate-600 dark:text-slate-300 font-semibold">{time}</span>
                  {p === 3 && (
                    <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400 block mt-0.5">Katta tanaffus</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= SEARCH & FILTER CONTROLS ================= */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Day Pills Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setActiveDayFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all whitespace-nowrap ${
              activeDayFilter === 'all'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                : isDarkMode
                  ? 'bg-slate-800 text-slate-400 hover:text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            Haftalik to'liq ({currentClass.schedule.length} kun)
          </button>
          
          {currentClass.schedule.map((day) => {
            const isSelected = activeDayFilter === day.dayName;
            const isToday = currentDayName === day.dayName;

            return (
              <button
                key={day.dayName}
                onClick={() => setActiveDayFilter(day.dayName)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : isDarkMode
                      ? 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                <span>{day.dayName}</span>
                {isToday && (
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-amber-300' : 'bg-blue-500'}`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Fan, ustoz yoki xonani izlash..."
            className={`w-full pl-9 pr-3 py-1.5 rounded-xl text-xs font-medium border outline-none transition-all ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500' 
                : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500 shadow-2xs'
            }`}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-[10px] font-black uppercase text-slate-400 shrink-0 mr-1">Toifa:</span>
        {subjectCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSubjectTypeFilter(cat)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap ${
              subjectTypeFilter === cat
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                : isDarkMode
                  ? 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ================= SCHEDULE DAYS & LESSONS LIST ================= */}
      {filteredSchedule.length === 0 ? (
        <div className={`p-10 rounded-3xl border text-center space-y-3 ${
          isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="font-black text-base text-slate-900 dark:text-white">Darslar topilmadi</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            "{searchQuery}" qidiruviga yoki tanlangan filtrga mos dars jadvali topilmadi. Qidiruv so'zini o'zgartiring.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSubjectTypeFilter('Barchasi'); setActiveDayFilter('all'); }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-sm hover:bg-blue-500 transition-all"
          >
            Barcha darslarni ko'rish
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSchedule.map((day) => {
            const isToday = currentDayName === day.dayName;

            return (
              <div
                key={day.dayName}
                className={`rounded-3xl border overflow-hidden transition-all flex flex-col justify-between ${
                  isToday
                    ? isDarkMode 
                      ? 'bg-slate-900 border-blue-500/60 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500/30' 
                      : 'bg-white border-blue-300 shadow-xl shadow-blue-500/10 ring-2 ring-blue-500/20'
                    : isDarkMode 
                      ? 'bg-slate-900/80 border-slate-800' 
                      : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                
                {/* Day Header */}
                <div className={`p-4 border-b flex items-center justify-between ${
                  isToday 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' 
                    : isDarkMode 
                      ? 'bg-slate-800/50 border-slate-800 text-white' 
                      : 'bg-slate-50 border-slate-100 text-slate-900'
                }`}>
                  <div className="flex items-center gap-2">
                    <Calendar className={`w-4 h-4 ${isToday ? 'text-white' : 'text-blue-500'}`} />
                    <h3 className="font-black text-sm tracking-tight">
                      {day.dayName}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {isToday && (
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-white/20 text-white rounded-full">
                        Bugun
                      </span>
                    )}
                    <span className={`text-[11px] font-bold ${isToday ? 'text-white/80' : 'text-slate-400'}`}>
                      {day.lessons.length} ta dars
                    </span>
                  </div>
                </div>

                {/* Lessons list */}
                <div className="p-3.5 space-y-2.5 flex-1">
                  {day.lessons.map((lesson) => {
                    const typeColor = SUBJECT_TYPE_COLORS[lesson.type] || SUBJECT_TYPE_COLORS['Aniq fanlar'];

                    return (
                      <div
                        key={lesson.period}
                        className={`p-3 rounded-2xl border transition-all duration-200 hover:scale-[1.01] ${
                          isDarkMode 
                            ? `${typeColor.darkBg} ${typeColor.darkBorder} hover:border-slate-600` 
                            : `${typeColor.bg} ${typeColor.border} hover:border-slate-300`
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          
                          {/* Subject and Period */}
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-950 flex items-center justify-center text-[11px] font-black shrink-0 shadow-2xs">
                              {lesson.period}
                            </span>
                            <div>
                              <h4 className="font-black text-xs sm:text-sm text-slate-900 dark:text-white leading-snug">
                                {lesson.subject}
                              </h4>
                              <span className="text-[10px] font-bold text-slate-400 block font-mono">
                                {lesson.time}
                              </span>
                            </div>
                          </div>

                          {/* Room badge */}
                          <span className={`text-[11px] font-black px-2 py-0.5 rounded-lg border shrink-0 flex items-center gap-1 ${
                            isDarkMode 
                              ? 'bg-slate-900/90 text-slate-200 border-slate-700' 
                              : 'bg-white text-slate-800 border-slate-200/90 shadow-2xs'
                          }`}>
                            <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                            <span>{lesson.room}</span>
                          </span>
                        </div>

                        {/* Teacher & Subject Type Footer */}
                        <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] gap-2">
                          <div className="flex items-center gap-1.5 truncate">
                            <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="font-semibold text-slate-700 dark:text-slate-300 truncate">
                              {lesson.teacher}
                            </span>
                            {lesson.isMinistryWinner && (
                              <Star className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" title="Vazir jamg'armasi ustamasi sohibi" />
                            )}
                          </div>

                          <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded shrink-0 ${
                            isDarkMode ? typeColor.darkText : typeColor.text
                          }`}>
                            {lesson.type}
                          </span>
                        </div>

                      </div>
                    );
                  })}
                </div>

                {/* Day Footer note */}
                <div className={`px-4 py-2.5 border-t text-[10px] flex items-center justify-between font-semibold ${
                  isDarkMode ? 'bg-slate-950/40 border-slate-800 text-slate-500' : 'bg-slate-50/80 border-slate-100 text-slate-400'
                }`}>
                  <span>{currentClass.displayName}</span>
                  <span>{day.lessons[0]?.time.split(' - ')[0]} — {day.lessons[day.lessons.length - 1]?.time.split(' - ')[1]}</span>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* ================= SUMMARY STATS & LEGEND ================= */}
      <div className={`p-5 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-4 text-xs ${
        isDarkMode ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
      }`}>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-black text-slate-900 dark:text-white uppercase text-[11px]">Fan Toifalari:</span>
          {Object.entries(SUBJECT_TYPE_COLORS).map(([type, colors]) => (
            <span key={type} className={`px-2.5 py-0.5 rounded-lg font-bold text-[10px] border ${
              isDarkMode ? `${colors.darkBg} ${colors.darkText} ${colors.darkBorder}` : `${colors.bg} ${colors.text} ${colors.border}`
            }`}>
              {type}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span className="font-medium">O'zbekiston Respublikasi Xalq Ta'limi vazirligi Davlat Ta'lim Standarti asosida tasdiqlangan</span>
        </div>
      </div>

    </div>
  );
};
