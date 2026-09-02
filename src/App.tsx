import React, { useState, useMemo, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, Trophy, Award, MessageSquare, Search, 
  Sparkles, Filter, Users, Star, ArrowRight, 
  CheckCircle2, BookOpen, GraduationCap, School as SchoolIcon,
  TrendingUp, HelpCircle, Heart, ChevronRight, PenLine
} from 'lucide-react';

import { Header } from './components/Header';
import { AdminPanel } from './components/AdminPanel';
import { SchoolCard } from './components/SchoolCard';
import { ReviewCard } from './components/ReviewCard';
import { AngorSchoolView } from './components/AngorSchoolView';
import { ClassScheduleViewer } from './components/ClassScheduleViewer';
import { OlympiadLeaderboard } from './components/OlympiadLeaderboard';
import { QuizModule } from './components/QuizModule';
import { LeaveFeedbackModal } from './components/LeaveFeedbackModal';
import { SchoolDetailModal } from './components/SchoolDetailModal';
import { SchoolCompareModal } from './components/SchoolCompareModal';
import { Footer } from './components/Footer';
import { AdminLoginPage } from './components/AdminLoginPage';
import { ProtectedAdminRoute, clearAdminToken } from './components/ProtectedRoute';
import { HonoredTeachersView } from './components/HonoredTeachersView';
import { TalentedStudentsView } from './components/TalentedStudentsView';
import { useSiteSettings } from './hooks/useSiteSettings';

import { SCHOOLS_DATA, INITIAL_REVIEWS, OLYMPIAD_WINNERS } from './data/schoolsData';
import { School, Review } from './types';

function MainSite({ schools, setSchools, reviews, setReviews, isDarkMode, setIsDarkMode }: any) {
  const [activeTab, setActiveTab] = useState<string>('angor-special');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { settings: siteSettings } = useSiteSettings();

  // Filter states
  const [selectedType, setSelectedType] = useState<string>('Barchasi');
  const [selectedRegion, setSelectedRegion] = useState<string>('Barchasi');
  const [reviewSentimentFilter, setReviewSentimentFilter] = useState<string>('Barchasi');
  const [reviewRoleFilter, setReviewRoleFilter] = useState<string>('Barchasi');

  // Modals
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [selectedSchoolDetail, setSelectedSchoolDetail] = useState<School | null>(null);
  const [targetFeedbackSchoolId, setTargetFeedbackSchoolId] = useState<number>(1);

  // Angor 1-maktab object reference
  const angorSchool = useMemo(() => {
    return schools.find(s => s.id === 1) || schools[0];
  }, [schools]);

  // Filtered schools
  const filteredSchools = useMemo(() => {
    return schools.filter(s => {
      const matchesSearch = 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.notableTeachers.some(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType = selectedType === 'Barchasi' || s.type === selectedType;
      const matchesRegion = selectedRegion === 'Barchasi' || s.region === selectedRegion;

      return matchesSearch && matchesType && matchesRegion;
    });
  }, [schools, searchQuery, selectedType, selectedRegion]);

  // Filtered reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter(r => {
      const matchesSearch = 
        r.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.schoolName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSentiment = reviewSentimentFilter === 'Barchasi' || r.sentiment === reviewSentimentFilter;
      const matchesRole = reviewRoleFilter === 'Barchasi' || r.role === reviewRoleFilter;

      return matchesSearch && matchesSentiment && matchesRole;
    });
  }, [reviews, searchQuery, reviewSentimentFilter, reviewRoleFilter]);

  // Review interactions
  const handleVote = (id: number, type: 'up' | 'down') => {
    setReviews(prev => prev.map(r => {
      if (r.id !== id) return r;
      if (r.userVoted === type) {
        // undo vote
        const newUp = type === 'up' ? r.upvotes - 1 : r.upvotes;
        const newDown = type === 'down' ? r.downvotes - 1 : r.downvotes;
        return {
          ...r,
          userVoted: undefined,
          upvotes: newUp,
          downvotes: newDown,
          score: `${newUp - newDown} ball`
        };
      }
      const prevVoted = r.userVoted;
      const newUp = type === 'up' ? r.upvotes + 1 : (prevVoted === 'up' ? r.upvotes - 1 : r.upvotes);
      const newDown = type === 'down' ? r.downvotes + 1 : (prevVoted === 'down' ? r.downvotes - 1 : r.downvotes);
      return {
        ...r,
        userVoted: type,
        upvotes: newUp,
        downvotes: newDown,
        score: `${newUp - newDown} ball`
      };
    }));
  };

  const handleBookmark = (id: number) => {
    setReviews(prev => prev.map(r => {
      if (r.id !== id) return r;
      return { ...r, saved: !r.saved };
    }));
  };

  const handleAddComment = (reviewId: number, commentContent: string) => {
    setReviews(prev => prev.map(r => {
      if (r.id !== reviewId) return r;
      const newComment = {
        id: Date.now(),
        author: 'Mehmon Foydalanuvchi',
        role: 'O\'quvchi',
        date: 'Hozirgina',
        content: commentContent,
        upvotes: 0
      };
      return {
        ...r,
        comments: [...(r.comments || []), newComment]
      };
    }));
  };

  const handleAddNewReview = (reviewData: Partial<Review>) => {
    const newId = Date.now();
    const created: Review = {
      id: newId,
      author: reviewData.author || 'Anonim',
      role: reviewData.role || 'O\'quvchi',
      tagNumber: `#${Math.floor(100 + Math.random() * 900)}`,
      schoolId: reviewData.schoolId || 1,
      schoolName: reviewData.schoolName || 'Angor 1-maktab',
      authorDetail: reviewData.authorDetail || 'O\'quvchi',
      time: 'Hozirgina',
      content: reviewData.content || '',
      sentiment: reviewData.sentiment || 'Ijobiy',
      category: reviewData.category || 'Ta\'lim',
      upvotes: 1,
      downvotes: 0,
      score: '1 ball',
      comments: []
    };

    setReviews(prev => [created, ...prev]);

    // update school review counts
    setSchools(prev => prev.map(s => {
      if (s.id === created.schoolId) {
        return {
          ...s,
          reviewsCount: s.reviewsCount + 1,
          positivePercent: created.sentiment === 'Ijobiy' ? Math.min(100, s.positivePercent + 1) : s.positivePercent
        };
      }
      return s;
    }));
  };

  const handleOpenFeedbackForSpecificSchool = (school: School) => {
    setTargetFeedbackSchoolId(school.id);
    setIsFeedbackOpen(true);
  };

  return (
    <div className={`min-h-screen transition-colors font-sans flex flex-col relative overflow-hidden ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
    
    {/* Ambient Decorative Background Elements */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
      <div className={`absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-40 mix-blend-multiply ${isDarkMode ? 'bg-indigo-900/40' : 'bg-blue-200/60'}`} />
      <div className={`absolute top-[10%] right-[-10%] w-[40%] h-[60%] rounded-full blur-[120px] opacity-40 mix-blend-multiply ${isDarkMode ? 'bg-blue-900/40' : 'bg-indigo-100/60'}`} />
      <div className={`absolute bottom-[-20%] left-[20%] w-[60%] h-[50%] rounded-full blur-[120px] opacity-30 mix-blend-multiply ${isDarkMode ? 'bg-purple-900/30' : 'bg-blue-100/50'}`} />
    </div>

    {/* Navigation Header */}
    <Header 
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      isDarkMode={isDarkMode}
      setIsDarkMode={setIsDarkMode}
      siteSettings={siteSettings}
      onOpenFeedback={() => {
        setTargetFeedbackSchoolId(1);
        setIsFeedbackOpen(true);
      }}
    />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 z-10 relative">
        
        {/* ================= VIEW: BOSH SAHIFA (HOME) ================= */}
        {activeTab === 'home' && (
          <div className="space-y-10 animate-fadeIn">
            
            {/* Spotlight Banner: Surxondaryo Angor 1-maktabi & National Portal */}
            <div className={`rounded-3xl border p-6 sm:p-10 shadow-sm relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 border-slate-800' 
                : 'bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-950 text-white shadow-xl'
            }`}>
              
              <div className="relative z-10 max-w-2xl text-left">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <Trophy className="w-3.5 h-3.5" />
                    Maxsus E'tirof: Surxondaryo Viloyati
                  </span>
                  <span className="bg-white/10 backdrop-blur-md text-white font-bold text-xs px-3 py-1 rounded-full">
                    Ochiq baholash tizimi
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4 text-white">
                  Angor 1-maktabi va O'zbekiston Maktablari Reytingi
                </h1>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  Surxondaryo viloyati Angor tumanidagi 1-maktab tuman miqyosidagi "Zakovat" intellektual turnirlari va Al-Xorazmiy olimpiadasining tayanch markazidir. Tarix fani o'qituvchilari Fazliddin Kenjayev va Guliston Kuvatova Vazir jamg'armasi ustamasiga ega!
                </p>

                <div className="flex items-center gap-3 flex-wrap">
                  <button 
                    onClick={() => setActiveTab('angor-special')}
                    className="bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black px-6 py-3 rounded-2xl text-xs sm:text-sm transition-all shadow-lg flex items-center gap-2"
                  >
                    <SchoolIcon className="w-4 h-4" />
                    Angor 1-maktab sahifasiga o'tish &rarr;
                  </button>

                  <button 
                    onClick={() => setIsCompareOpen(true)}
                    className="bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold px-5 py-3 rounded-2xl text-xs sm:text-sm transition-all border border-white/20 flex items-center gap-2"
                  >
                    <Building2 className="w-4 h-4" />
                    Maktablarni solishtirish
                  </button>

                  <button 
                    onClick={() => {
                      setTargetFeedbackSchoolId(1);
                      setIsFeedbackOpen(true);
                    }}
                    className="bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold px-5 py-3 rounded-2xl text-xs sm:text-sm transition-all border border-white/20 flex items-center gap-2"
                  >
                    <PenLine className="w-4 h-4" />
                    Fikr bildirish
                  </button>
                </div>
              </div>

              {/* Right Hero Card: Angor 1-maktab Snapshot */}
              <div 
                onClick={() => setActiveTab('angor-special')}
                className="w-full lg:w-96 rounded-2xl p-5 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl relative z-10 cursor-pointer hover:scale-[1.02] transition-transform text-white"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xl shadow-md">
                      #1
                    </div>
                    <div>
                      <h4 className="font-extrabold text-base leading-snug">Angor 1-maktab</h4>
                      <p className="text-xs text-amber-300">Surxondaryo viloyati</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500 text-white">
                    98% A'lo
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-200 border-t border-white/10 pt-3">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Zakovat mezbonligi:</span>
                    <span className="font-bold text-amber-300">Tuman markazi</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Vazir ustamasi:</span>
                    <span className="font-bold text-emerald-300">2 nafar ustoz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">O'quvchilar soni:</span>
                    <span className="font-bold text-white">1,280 nafar</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-xs font-bold text-amber-300">
                  <span>To'liq profilni ko'rish</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

            </div>

            {/* Quick Metrics Dashboard Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Umumta\'lim Maktablari', val: '10,200+', icon: Building2, color: 'text-blue-600' },
                { label: 'Ochiq Fikrlar & Baholar', val: '45,800+', icon: MessageSquare, color: 'text-emerald-600' },
                { label: 'Olimpiada G\'oliblari', val: '3,450+', icon: Trophy, color: 'text-amber-500' },
                { label: 'Shaffoflik Darajasi', val: '99.2%', icon: CheckCircle2, color: 'text-purple-600' },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={idx}
                    className={`p-5 rounded-2xl border shadow-xs flex items-center gap-4 ${
                      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-slate-50 dark:bg-slate-800 ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white block">{stat.val}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{stat.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Live Reviews Section (EduStats exact design feed) */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    Eng so'nggi va muhim fikrlar
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    O'quvchilar, ustozlar va ota-onalar tomonidan qoldirilgan haqqoniy baholar
                  </p>
                </div>

                {/* Sentiment Filter Tabs */}
                <div className="flex gap-1.5 overflow-x-auto p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl text-xs font-bold">
                  {['Barchasi', 'Ijobiy', 'Taklif', 'Salbiy'].map(sentiment => (
                    <button
                      key={sentiment}
                      onClick={() => setReviewSentimentFilter(sentiment)}
                      className={`px-3 py-1.5 rounded-xl transition-all ${
                        reviewSentimentFilter === sentiment
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {sentiment}
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredReviews.slice(0, 6).map(review => (
                  <ReviewCard 
                    key={review.id}
                    review={review}
                    isDarkMode={isDarkMode}
                    onVote={handleVote}
                    onBookmark={handleBookmark}
                    onAddComment={handleAddComment}
                  />
                ))}
              </div>

              <div className="text-center pt-2">
                <button 
                  onClick={() => setActiveTab('reviews')}
                  className="px-6 py-2.5 rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors inline-flex items-center gap-1.5"
                >
                  Barcha fikrlarni ko'rish ({reviews.length} ta) <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Leading Schools Section */}
            <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    Yetakchi Maktablar Katalogi
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    O'quvchilar salohiyati va jamoat ishonchi bo'yicha saralangan
                  </p>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => setActiveTab('schools')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1"
                  >
                    Barcha maktablar katalogi &rarr;
                  </button>
                </div>
              </div>

              {/* School Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredSchools.slice(0, 6).map(school => (
                  <SchoolCard 
                    key={school.id}
                    school={school}
                    isDarkMode={isDarkMode}
                    onSelect={(s) => {
                      if (s.id === 1) {
                        setActiveTab('angor-special');
                      } else {
                        setSelectedSchoolDetail(s);
                      }
                    }}
                    onOpenFeedbackForSchool={handleOpenFeedbackForSpecificSchool}
                  />
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ================= VIEW: MAKTABLAR KATALOGI ================= */}
        {activeTab === 'schools' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Filter Bar */}
            <div className={`p-5 rounded-2xl border flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              
              {/* Type Filter Pills */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {['Barchasi', 'Davlat', 'Ixtisoslashgan', 'Prezident', 'Xususiy'].map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      selectedType === type
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Region Filter Dropdown */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400">Hudud:</span>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className={`text-xs font-semibold px-3 py-2 rounded-xl border ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <option value="Barchasi">Barcha viloyatlar</option>
                  <option value="Surxondaryo">Surxondaryo viloyati</option>
                  <option value="Toshkent">Toshkent shahri</option>
                </select>
              </div>

            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSchools.map(school => (
                <SchoolCard 
                  key={school.id}
                  school={school}
                  isDarkMode={isDarkMode}
                  onSelect={(s) => {
                    if (s.id === 1) {
                      setActiveTab('angor-special');
                    } else {
                      setSelectedSchoolDetail(s);
                    }
                  }}
                  onOpenFeedbackForSchool={handleOpenFeedbackForSpecificSchool}
                />
              ))}
            </div>

            {filteredSchools.length === 0 && (
              <div className="p-12 text-center text-slate-400">
                <SchoolIcon className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p className="font-bold text-base">Qidiruv bo'yicha hech qanday maktab topilmadi.</p>
                <p className="text-xs mt-1">Iltimos, boshqa kalit so'z yoki filtrlardan foydalaning.</p>
              </div>
            )}

          </div>
        )}

        {/* ================= VIEW: ANGOR 1-MAKTAB MAXSUS PORTALI ================= */}
        {activeTab === 'angor-special' && (
          <AngorSchoolView 
            school={angorSchool}
            reviews={reviews}
            isDarkMode={isDarkMode}
            siteSettings={siteSettings}
            onVote={handleVote}
            onBookmark={handleBookmark}
            onAddComment={handleAddComment}
            onOpenFeedback={() => {
              setTargetFeedbackSchoolId(1);
              setIsFeedbackOpen(true);
            }}
            onOpenCompare={() => setIsCompareOpen(true)}
          />
        )}

        {/* ================= VIEW: FIKRLAR VA BAHOLAR ================= */}
        {activeTab === 'reviews' && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className={`p-6 rounded-3xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div>
                <h2 className="text-2xl font-black">Ochiq Fikrlar va Baholar Markazi</h2>
                <p className="text-xs text-slate-500 mt-1">Maktablar hayoti, ustozlar mehnati va dars jarayonlari haqida jamoatchilik fikri</p>
              </div>

              <div className="flex gap-2 flex-wrap">
                {/* Role Filter */}
                <select
                  value={reviewRoleFilter}
                  onChange={(e) => setReviewRoleFilter(e.target.value)}
                  className={`text-xs font-semibold px-3 py-2 rounded-xl border ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <option value="Barchasi">Barcha mualliflar</option>
                  <option value="O'quvchi">O'quvchilar</option>
                  <option value="Ustoz">Ustozlar</option>
                  <option value="Ota-ona">Ota-onalar</option>
                  <option value="Bitiruvchi">Bitiruvchilar</option>
                </select>

                {/* Sentiment Filter */}
                <select
                  value={reviewSentimentFilter}
                  onChange={(e) => setReviewSentimentFilter(e.target.value)}
                  className={`text-xs font-semibold px-3 py-2 rounded-xl border ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <option value="Barchasi">Barcha yo'nalishlar</option>
                  <option value="Ijobiy">Ijobiy fikrlar</option>
                  <option value="Taklif">Taklif va tashabbuslar</option>
                  <option value="Salbiy">Salbiy tanqidlar</option>
                </select>

                <button 
                  onClick={() => setIsFeedbackOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5"
                >
                  <PenLine className="w-3.5 h-3.5" />
                  Yangi fikr
                </button>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReviews.map(review => (
                <ReviewCard 
                  key={review.id}
                  review={review}
                  isDarkMode={isDarkMode}
                  onVote={handleVote}
                  onBookmark={handleBookmark}
                  onAddComment={handleAddComment}
                />
              ))}
            </div>

          </div>
        )}

        {/* ================= VIEW: REYTING & OLIMPIADA ================= */}
        {activeTab === 'leaderboard' && (
          <OlympiadLeaderboard 
            schools={schools}
            olympiadWinners={OLYMPIAD_WINNERS}
            isDarkMode={isDarkMode}
            onSelectSchool={(s) => {
              if (s.id === 1) {
                setActiveTab('angor-special');
              } else {
                setSelectedSchoolDetail(s);
              }
            }}
          />
        )}

        {/* ================= VIEW: TEST & VIKTORINA ================= */}
        {activeTab === 'quiz' && (
          <QuizModule 
            isDarkMode={isDarkMode}
            onNavigateToAngor={() => setActiveTab('angor-special')}
          />
        )}

        {/* ================= VIEW: DARS JADVALI ================= */}
        {activeTab === 'schedule' && (
          <div className="space-y-6 animate-fadeIn">
            <ClassScheduleViewer isDarkMode={isDarkMode} />
          </div>
        )}

        {/* ================= VIEW: FAXRIY USTOZLAR ================= */}
        {activeTab === 'teachers' && (
          <HonoredTeachersView 
            schools={schools} 
            isDarkMode={isDarkMode} 
          />
        )}

        {/* ================= VIEW: IQTIDORLI O'QUVCHILAR ================= */}
        {activeTab === 'talented' && (
          <TalentedStudentsView schools={schools} isDarkMode={isDarkMode} />
        )}

      </main>

      {/* Modals */}
      <LeaveFeedbackModal 
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        schools={schools}
        defaultSchoolId={targetFeedbackSchoolId}
        isDarkMode={isDarkMode}
        onAddReview={handleAddNewReview}
      />

      <SchoolDetailModal 
        school={selectedSchoolDetail}
        onClose={() => setSelectedSchoolDetail(null)}
        isDarkMode={isDarkMode}
        onOpenFeedback={handleOpenFeedbackForSpecificSchool}
        onViewAngorPage={() => setActiveTab('angor-special')}
      />


      <SchoolCompareModal 
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        schools={schools}
        isDarkMode={isDarkMode}
      />

      {/* Admin Panel endi alohida route da bo'ladi, modal bu yerdan olib tashlandi */}

      {/* Academic Footer */}
      <Footer 
        isDarkMode={isDarkMode} 
        setActiveTab={setActiveTab} 
      />

      {/* Test rejimida bildirishnomasi */}
      <div 
        className="fixed bottom-4 right-4 z-40 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/85 dark:bg-slate-800/85 text-amber-400 border border-amber-500/30 text-[11px] sm:text-xs font-bold backdrop-blur-md shadow-xl select-none"
        title="Sayt ayni paytda test rejimida faoliyat yuritmoqda"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
        <span className="tracking-wide">Sayt test rejimida</span>
      </div>

    </div>
  );
}

export default function App() {
  const [schools, setSchools] = useState<School[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  // Ma'lumotlarni SQL bazasidan bir marta yuklaymiz
  useEffect(() => {
    async function loadData() {
      try {
        const [schoolsRes, reviewsRes] = await Promise.all([
          fetch('/api/schools'),
          fetch('/api/reviews'),
        ]);
        const schoolsData = await schoolsRes.json();
        const reviewsData = await reviewsRes.json();
        
        if (Array.isArray(schoolsData)) {
          setSchools(schoolsData);
        } else {
          console.error("Schools API Xatosi:", schoolsData);
          setSchools([]); // fallback to empty array
        }
        
        if (Array.isArray(reviewsData)) {
          setReviews(reviewsData);
        } else {
          console.error("Reviews API Xatosi:", reviewsData);
          setReviews([]); // fallback to empty array
        }
      } catch (err) {
        console.error('Ma\'lumotlarni yuklab bo\'lmadi:', err);
        // Xatolik bo\'lsa, zaxira sifatida mahalliy ma\'lumotlarni ishlatamiz
        setSchools(SCHOOLS_DATA);
        setReviews(INITIAL_REVIEWS);
      } finally {
        setIsDataLoaded(true);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  if (!isDataLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-sm font-bold tracking-wider text-slate-300">MA'LUMOTLAR YUKLANMOQDA...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Asosiy sayt */}
      <Route path="/" element={
        <MainSite 
          schools={schools} 
          setSchools={setSchools} 
          reviews={reviews} 
          setReviews={setReviews} 
          isDarkMode={isDarkMode} 
          setIsDarkMode={setIsDarkMode} 
        />
      } />

      {/* Admin login sahifasi - ochiq */}
      <Route path="/admin/login" element={<AdminLoginPage isDarkMode={isDarkMode} />} />

      {/* Admin panel - himoyalangan */}
      <Route path="/admin/panel" element={
        <ProtectedAdminRoute>
          <AdminPanel 
            onClose={() => {
              clearAdminToken();
              window.location.href = '/';
            }}
            isDarkMode={isDarkMode}
            schools={schools}
            setSchools={setSchools}
            reviews={reviews}
            setReviews={setReviews}
          />
        </ProtectedAdminRoute>
      } />

      {/* /admin manziliga kirsa, login sahifasiga yo'naltiradi */}
      <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}
