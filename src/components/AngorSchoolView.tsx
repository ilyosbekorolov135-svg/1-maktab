import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, MapPin, Phone, Mail, Award, Trophy, Users, 
  GraduationCap, Calendar, CheckCircle2, Star, BookOpen, 
  PenLine, Clock, Sparkles, Share2, Check, ArrowRight,
  Brain, Bell, Layers, Heart, MessageSquare, Download, Compass,
  Image as ImageIcon, Video, Camera
} from 'lucide-react';
import { School, Review, Teacher, MediaItem } from '../types';
import { ReviewCard } from './ReviewCard';
import { ZakovatQuizArena } from './ZakovatQuizArena';
import { BellScheduleWidget } from './BellScheduleWidget';
import { VirtualCampusTour } from './VirtualCampusTour';
import { TeacherPraiseModal } from './TeacherPraiseModal';
import { MediaGalleryView } from './MediaGalleryView';
import { SchoolVideoEmbed } from './SchoolVideoEmbed';
import { LatestNewsCarousel } from './LatestNewsCarousel';
import { ClassScheduleViewer } from './ClassScheduleViewer';
import { CountUp } from './CountUp';
import { SchoolEmblem } from './SchoolEmblem';
import { ANGOR_MEDIA_GALLERY } from '../data/schoolsData';

import { SiteSettings } from '../hooks/useSiteSettings';

interface AngorSchoolViewProps {
  school: School;
  reviews: Review[];
  isDarkMode: boolean;
  siteSettings?: SiteSettings;
  onVote: (id: number, type: 'up' | 'down') => void;
  onBookmark: (id: number) => void;
  onAddComment: (reviewId: number, comment: string) => void;
  onOpenFeedback: () => void;
  onOpenCompare?: () => void;
}

export const AngorSchoolView: React.FC<AngorSchoolViewProps> = ({
  school,
  reviews,
  isDarkMode,
  siteSettings,
  onVote,
  onBookmark,
  onAddComment,
  onOpenFeedback,
  onOpenCompare
}) => {
  const [activeTab, setActiveTab] = useState<'pasport' | 'dars-jadvali' | 'galereya' | 'ustozlar' | 'zakovat' | 'virtual-tur' | 'togaraklar'>('pasport');
  const [mediaList, setMediaList] = useState<MediaItem[]>(ANGOR_MEDIA_GALLERY);
  const [selectedTeacherForPraise, setSelectedTeacherForPraise] = useState<Teacher | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const angorReviews = reviews.filter(r => r.schoolId === school.id || r.schoolName.includes('Angor'));

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleAddMedia = (newItem: MediaItem) => {
    setMediaList(prev => [newItem, ...prev]);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
                        {/* Hero Visual Spotlight Banner */}
      <div className="rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl relative bg-slate-950 flex flex-col justify-end min-h-[460px] sm:min-h-[500px]">
        
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={school.bannerImage} 
            alt={school.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/20 to-transparent" />
        </div>

        {/* Top Badges & Actions */}
        <div className="absolute top-5 left-5 right-5 sm:top-8 sm:left-8 sm:right-8 flex justify-between items-start z-20">
          <div className="flex flex-col sm:flex-row gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-amber-500/90 text-amber-950 font-black text-[10px] sm:text-xs uppercase tracking-wider backdrop-blur-md shadow-lg shadow-amber-500/20 border border-amber-400/50">
              <Trophy className="w-3.5 h-3.5" />
              {siteSettings?.heroBadge1 || "Surxondaryo #1 Tayanch Maktabi"}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white/10 text-white font-bold text-[10px] sm:text-xs uppercase tracking-wider backdrop-blur-md border border-white/20 shadow-lg">
              <Award className="w-3.5 h-3.5 text-blue-300" />
              {siteSettings?.heroBadge2 || "Vazir Jamg'armasi 100% Ustamasi"}
            </span>
          </div>

          <button
            onClick={handleShare}
            className="p-2.5 sm:px-5 sm:py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 font-bold text-xs flex items-center gap-2 transition-all shadow-lg"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{copiedLink ? 'Nusxalandi' : 'Ulashish'}</span>
          </button>
        </div>

        {/* Content Details Block */}
        <div className="relative z-20 px-6 sm:px-10 pb-8 sm:pb-10 pt-20 w-full">
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
            
            {/* Logo & Headline */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 max-w-4xl">
              {/* Official School Emblem */}
              <div className="relative group shrink-0">
                <SchoolEmblem
                  schoolName={school.name}
                  type={school.type}
                  logoImage={school.logoImage}
                  size="xl"
                  showRays={true}
                />
              </div>
              
              {/* Text Info */}
              <div className="flex-1 pb-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                    {school.name}
                  </h1>
                  <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400 shrink-0 drop-shadow-md" />
                </div>
                
                <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed mb-4 sm:mb-5 max-w-2xl">
                  {school.fullName}
                </p>
                
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-200 flex-wrap">
                  <span className="flex items-center gap-2 font-semibold bg-slate-800/60 px-4 py-2 rounded-xl border border-slate-700/50 backdrop-blur-sm shadow-sm">
                    <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                    {school.address}
                  </span>
                  <span className="flex items-center gap-2 font-semibold bg-slate-800/60 px-4 py-2 rounded-xl border border-slate-700/50 backdrop-blur-sm shadow-sm">
                    <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                    {school.establishedYear}-yilda tashkil etilgan
                  </span>
                  <span className="flex items-center gap-2 font-semibold bg-slate-800/60 px-4 py-2 rounded-xl border border-slate-700/50 backdrop-blur-sm shadow-sm">
                    <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                    {school.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                onClick={() => setActiveTab('galereya')}
                className="px-6 py-3.5 rounded-xl font-bold text-sm transition-all border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center gap-2.5 backdrop-blur-md shadow-lg"
              >
                <Camera className="w-4 h-4 text-amber-400" />
                Media ({mediaList.length})
              </button>
              <button 
                onClick={onOpenFeedback}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-blue-500/25 transition-transform active:scale-95"
              >
                <PenLine className="w-4 h-4" />
                Fikr va Baho qoldirish
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation Menu */}
        <div className="px-6 sm:px-10 border-t border-slate-100 dark:border-slate-800/50 flex overflow-x-auto gap-2 py-4 bg-slate-50/50 dark:bg-slate-900/40 backdrop-blur-md no-scrollbar">
          {[
            { id: 'pasport', label: 'Maktab Pasporti', icon: Building2 },
            { id: 'dars-jadvali', label: 'Dars Jadvali', icon: Calendar, badge: '2026' },
            { id: 'galereya', label: `Fotogalereya & Videolar`, icon: Camera, badge: mediaList.length },
            { id: 'ustozlar', label: 'Faxriy Ustozlar', icon: Award },
            { id: 'zakovat', label: 'Zakovat Arenasi', icon: Brain },
            { id: 'virtual-tur', label: 'Virtual Ekskursiya', icon: Compass },
            { id: 'togaraklar', label: 'To\'garaklar', icon: BookOpen },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2.5 whitespace-nowrap shrink-0 overflow-hidden group ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-white/20 w-full h-full transform -skew-x-12 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                )}
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-500'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

      {/* ================= TAB 1: Maktab Pasporti & Metrikalar ================= */}
      {activeTab === 'pasport' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Premium Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div className={`p-6 rounded-[2rem] border relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all" />
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 shadow-sm">
                <Star className="w-5 h-5 fill-current" />
              </div>
              <div className="flex items-baseline gap-1">
                <CountUp 
                  end={school.positivePercent || 98} 
                  className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
                />
                <span className="text-blue-600 font-black text-2xl sm:text-3xl">%</span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block mt-2 font-bold uppercase tracking-wider">Ijobiy Baholash</span>
            </div>

            <div className={`p-6 rounded-[2rem] border relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all" />
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 shadow-sm">
                <Users className="w-5 h-5" />
              </div>
              <div className="flex items-baseline gap-1">
                <CountUp 
                  end={school.studentsCount || 1280} 
                  className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
                />
                <span className="text-emerald-600 font-bold text-lg sm:text-xl">+</span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block mt-2 font-bold uppercase tracking-wider">O'quvchilar soni</span>
            </div>

            <div className={`p-6 rounded-[2rem] border relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all" />
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 shadow-sm">
                <Award className="w-5 h-5" />
              </div>
              <div className="flex items-baseline gap-1">
                <CountUp 
                  end={school.teachersCount || 88} 
                  className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
                />
                <span className="text-purple-600 font-bold text-lg sm:text-xl">nafar</span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block mt-2 font-bold uppercase tracking-wider">Malakali Pedagoglar</span>
            </div>

            <div className={`p-6 rounded-[2rem] border relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all" />
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 shadow-sm">
                <Trophy className="w-5 h-5" />
              </div>
              <div className="flex items-baseline gap-1">
                <CountUp 
                  end={school.olympiadWinnersCount || 34} 
                  className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
                />
                <span className="text-amber-500 font-bold text-2xl sm:text-3xl ml-1">ta</span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block mt-2 font-bold uppercase tracking-wider">Olimpiada Yutuqlari</span>
            </div>
          </div>

          {/* Bizning Faxrimiz - Bento Grid */}
          <div className="pt-4">
            <h2 className="text-xl sm:text-2xl font-black mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
              <span className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </span>
              Bizning Faxrimiz
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 sm:gap-6 h-auto md:h-[420px]">
              
              {/* Block 1: Zakovat (Spans 2 columns, 1 row) */}
              <div 
                onClick={() => setActiveTab('zakovat')}
                className="md:col-span-2 md:row-span-1 p-6 sm:p-8 rounded-[2rem] border border-slate-800 bg-slate-900 relative overflow-hidden group transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl flex flex-col justify-end cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 via-purple-900/30 to-slate-950 z-0" />
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80" 
                  alt="Zakovat" 
                  className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-overlay group-hover:opacity-40 transition-opacity duration-500" 
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 backdrop-blur-md text-indigo-300 flex items-center justify-center border border-indigo-500/30">
                      <Brain className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 rounded-full flex items-center gap-1">
                      Viktorinani boshlash <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    Zakovat va Al-Xorazmiy olimpiadalari tuman markazi
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">Har haftalik intellektual bellashuvlar va maxsus mashg'ulotlar</p>
                </div>
              </div>

              {/* Block 2: Fidoyi Ustozlar (Spans 1 column, 2 rows) */}
              <div className={`md:col-span-1 md:row-span-2 p-6 sm:p-7 rounded-[2rem] border relative overflow-hidden group transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl flex flex-col justify-between ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-md'
              }`}>
                <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all" />
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <button 
                      onClick={() => setActiveTab('ustozlar')}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center gap-1"
                    >
                      Barchasi ({school.notableTeachers.length}) <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">Fidoyi Ustozlar</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Vazir jamg'armasi ustamasi sohiblari</p>
                </div>
                
                <div className="space-y-2.5">
                  {school.notableTeachers.slice(0, 3).map((teacher) => (
                    <div 
                      key={teacher.id} 
                      onClick={() => setSelectedTeacherForPraise(teacher)}
                      className="flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/30 border border-slate-100 dark:border-slate-700/50 transition-all cursor-pointer group/teacher"
                      title="Ustozga minnatdorchilik bildirish"
                    >
                      <img 
                        src={teacher.avatar} 
                        alt={teacher.name} 
                        className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500/30 shrink-0" 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate group-hover/teacher:text-emerald-600 transition-colors">
                            {teacher.name}
                          </span>
                          {teacher.isMinistryFundWinner && (
                            <span className="text-[9px] font-black px-1.5 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 rounded shrink-0">
                              100%
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
                          {teacher.subject}
                        </span>
                      </div>
                      <Heart className="w-4 h-4 text-slate-300 group-hover/teacher:text-rose-500 group-hover/teacher:fill-rose-500 transition-colors shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Block 3: Iqtidorli O'quvchilar (Spans 2 columns, 1 row) */}
              <div className={`md:col-span-2 md:row-span-1 p-6 sm:p-8 rounded-[2rem] border relative overflow-hidden group transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl flex flex-col justify-end ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-gradient-to-r from-blue-600 to-indigo-700 border-blue-500 shadow-lg shadow-blue-500/20'
              }`}>
                <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl transition-all ${isDarkMode ? 'bg-blue-500/10' : 'bg-white/10'}`} />
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-white/20 text-white'}`}>
                      <Star className="w-6 h-6 fill-current" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                      Iqtidorli o'quvchilar
                    </h3>
                    <p className={`mt-1.5 text-xs sm:text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-blue-100'}`}>
                      "Gulxan" jurnali ijodkorlari va fan olimpiadasi g'oliblari
                    </p>
                  </div>
                  
                  {/* Youth/Student Avatars */}
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-3">
                      {[
                        { name: 'Olimpiada 1-o\'rin', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80' },
                        { name: 'Zakovat yetakchisi', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80' },
                        { name: 'Matematika g\'olibi', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&auto=format&fit=crop&q=80' },
                        { name: 'Gulxan yulduzi', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80' }
                      ].map((student, i) => (
                        <div 
                          key={i} 
                          title={student.name}
                          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-white dark:border-slate-900 overflow-hidden bg-slate-200 shadow-md transform hover:scale-110 hover:z-20 transition-all cursor-pointer"
                        >
                          <img src={student.img} alt={student.name} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                    <span className="text-xs font-black px-2.5 py-1 bg-white/20 text-white rounded-full backdrop-blur-md">
                      +34 ta
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Radar / Detailed Criteria Scores & History */}
          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Left: Criteria Breakdown */}
            <div className={`lg:col-span-1 p-6 sm:p-7 rounded-3xl border ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <h3 className="font-extrabold text-base mb-4 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                Yo'nalishlar bo'yicha baholar (5 ballik)
              </h3>

              <div className="space-y-4 text-xs">
                {[
                  { label: 'Ta\'lim sifati va metodika', score: school.ratingBreakdown.education, color: 'bg-blue-500' },
                  { label: 'O\'qituvchilar salohiyati & ustamalar', score: school.ratingBreakdown.teachers, color: 'bg-emerald-500' },
                  { label: 'Maktab sharoiti va laboratoriyalar', score: school.ratingBreakdown.facilities, color: 'bg-indigo-500' },
                  { label: 'O\'quvchilar intizomi & odob', score: school.ratingBreakdown.discipline, color: 'bg-purple-500' },
                  { label: 'Oshxona va tozalik', score: school.ratingBreakdown.canteen, color: 'bg-amber-500' },
                  { label: 'Sport va to\'garaklar faolligi', score: school.ratingBreakdown.sports, color: 'bg-teal-500' },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between font-bold mb-1.5">
                      <span className="text-slate-600 dark:text-slate-300">{item.label}</span>
                      <span className="font-black text-slate-900 dark:text-white">{item.score} / 5.0</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-2.5 rounded-full ${item.color}`} 
                        style={{ width: `${(item.score / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: History & Official Achievements */}
            <div className={`lg:col-span-2 p-6 sm:p-7 rounded-3xl border flex flex-col justify-between ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div>
                <h3 className="font-extrabold text-base mb-3 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  Maktab yutuqlari va nufuzli e'tiroflar
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Surxondaryo viloyati Angor tumani 1-sonli umumiy o'rta ta'lim maktabi yarim asrdan ortiq vaqt mobaynida minglab yoshlarga sifatli ta'lim va chuqur ma'naviy tarbiya berib kelayotgan yetakchi dargohlardan biridir. Maktabda tuman va viloyat miqyosidagi barcha yirik fan olimpiadalari, Zakovat intellektual turnirlari hamda ijodiy tanlovlar muntazam tashkil etiladi.
                </p>

                <div className="space-y-3">
                  {school.achievements.map((ach, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="font-semibold text-slate-700 dark:text-slate-200 leading-relaxed">{ach}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-4 text-xs text-slate-500">
                <span><strong>Direktor:</strong> {school.director}</span>
                <span><strong>Bog'lanish:</strong> {school.phone}</span>
                <span><strong>E-mail:</strong> {school.email}</span>
              </div>
            </div>

          </div>

          {/* School Video Embed: Virtual Tour & Events */}
          <div className={`p-6 sm:p-8 rounded-3xl border ${
            isDarkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <SchoolVideoEmbed
              videos={school.videos}
              schoolName={school.name}
              defaultTitle={`${school.name} — Virtual ekskursiya va tadbirlar videosi`}
              isDarkMode={isDarkMode}
              showPlaylist={true}
            />
          </div>

          {/* Latest News Carousel */}
          <LatestNewsCarousel isDarkMode={isDarkMode} />

          {/* Interactive Bell Schedule Component */}
          <BellScheduleWidget isDarkMode={isDarkMode} />

          {/* Quick Class Schedule Teaser */}
          <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-6 transition-all ${
            isDarkMode 
              ? 'bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border-blue-900/50' 
              : 'bg-gradient-to-r from-blue-50 via-indigo-50/40 to-slate-50 border-blue-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30">
                <Calendar className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-100/80 dark:bg-blue-950/80 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800">
                  Darslar va Xonalar Rejasi
                </span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-1">
                  5–11 Sinflar Haftalik Dars Jadvali
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Guruhlar, fan o'qituvchilari, 1 va 2-smena qo'ng'iroqlari hamda xonalar taqsimotini interaktiv ko'rish
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('dars-jadvali')}
              className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-black text-xs sm:text-sm transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2 shrink-0"
            >
              <span>Jadvalni ko'rish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* ================= TAB 2: Sinflar Dars Jadvali ================= */}
      {activeTab === 'dars-jadvali' && (
        <div className="space-y-6 animate-fadeIn">
          <ClassScheduleViewer isDarkMode={isDarkMode} />
        </div>
      )}

      {/* ================= TAB 3: Fotogalereya & Videolar ================= */}
      {activeTab === 'galereya' && (
        <div className="space-y-6 animate-fadeIn">
          <MediaGalleryView
            mediaItems={mediaList}
            onAddMedia={handleAddMedia}
            isDarkMode={isDarkMode}
          />
        </div>
      )}

      {/* ================= TAB 3: Faxriy Ustozlar ================= */}
      {activeTab === 'ustozlar' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 via-blue-500/10 to-indigo-500/10 border border-amber-500/20 text-slate-900 dark:text-slate-100">
            <h3 className="font-extrabold text-sm sm:text-base flex items-center gap-2 text-amber-700 dark:text-amber-300">
              <Award className="w-5 h-5 text-amber-500" />
              O'zbekiston Respublikasi Maktabgacha va maktab ta'limi vazirligi jamg'armasi ustamasi sohiblari
            </h3>
            <p className="text-xs mt-1.5 text-slate-600 dark:text-slate-300 leading-relaxed">
              Angor 1-maktabi tarix fani o'qituvchilari <strong>Fazliddin Kenjayev</strong> va <strong>Guliston Kuvatova</strong> o'quvchilarining fan olimpiadalari g'alabalari hamda zamonaviy pedagogik metodikasi uchun Vazir jamg'armasining 100% ustamasiga sazovor bo'lishgan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {school.notableTeachers.map((teacher) => (
              <div 
                key={teacher.id}
                className={`p-6 rounded-3xl border shadow-xs flex flex-col justify-between transition-all hover:border-blue-500/40 ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <img 
                      src={teacher.avatar} 
                      alt={teacher.name} 
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-blue-500/30 shrink-0" 
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">{teacher.name}</h4>
                        {teacher.isMinistryFundWinner && (
                          <span className="text-[10px] font-black bg-amber-100 text-amber-900 dark:bg-amber-900 dark:text-amber-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                            Vazir Ustamasi ⭐
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-0.5">{teacher.subject}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{teacher.role || 'Oliy toifali o\'qituvchi'}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {teacher.bio}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs mb-4">
                    <span className="font-bold text-amber-600 dark:text-amber-400 block mb-0.5">E'tirof va mukofotlar:</span>
                    <p className="text-slate-700 dark:text-slate-300">{teacher.award}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-500 font-medium">Tajriba: <strong>{teacher.experience}</strong></span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedTeacherForPraise(teacher)}
                      className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900 text-rose-600 dark:text-rose-300 text-xs font-bold flex items-center gap-1.5 transition-all"
                    >
                      <Heart className="w-3.5 h-3.5 fill-rose-500" />
                      <span>Rahmat aytish</span>
                    </button>
                    
                    <span className="font-black text-xs text-amber-500 flex items-center gap-1 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1.5 rounded-xl">
                      <Star className="w-3.5 h-3.5 fill-amber-500" /> {teacher.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 3: Zakovat Arenasi ================= */}
      {activeTab === 'zakovat' && (
        <div className="space-y-6 animate-fadeIn">
          <ZakovatQuizArena isDarkMode={isDarkMode} />
        </div>
      )}

      {/* ================= TAB 4: Virtual Ekskursiya & Sharoitlar ================= */}
      {activeTab === 'virtual-tur' && (
        <div className="space-y-6 animate-fadeIn">
          <VirtualCampusTour isDarkMode={isDarkMode} />
        </div>
      )}

      {/* ================= TAB 5: To'garaklar & Zakovat ================= */}
      {activeTab === 'togaraklar' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid md:grid-cols-2 gap-6">
            {school.clubs.map((club) => (
              <div 
                key={club.id}
                className={`p-6 rounded-3xl border shadow-xs flex flex-col justify-between ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-lg">
                        To'garak
                      </span>
                      <h4 className="font-black text-lg text-slate-900 dark:text-white mt-1.5">{club.name}</h4>
                    </div>
                    <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold">
                      <BookOpen className="w-5 h-5" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                    {club.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs space-y-1.5 text-slate-500">
                  <div className="flex justify-between">
                    <span>To'garak rahbari:</span>
                    <strong className="text-slate-900 dark:text-white">{club.leader}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Mashg'ulot vaqti:</span>
                    <strong className="text-slate-900 dark:text-white">{club.schedule}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Qatnashuvchilar:</span>
                    <strong className="text-blue-600 dark:text-blue-400">{club.studentsCount} nafar o'quvchi</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Teacher Praise Modal */}
      <TeacherPraiseModal 
        isOpen={!!selectedTeacherForPraise}
        onClose={() => setSelectedTeacherForPraise(null)}
        teacher={selectedTeacherForPraise}
        isDarkMode={isDarkMode}
      />

    </div>
  );
};
