import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Brain, Trophy, Timer, CheckCircle2, XCircle, ArrowRight, RotateCcw, 
  Sparkles, Award, Star, Share2, HelpCircle, ChevronRight, Zap, 
  GraduationCap, Calculator, Cpu, Landmark, Languages, BarChart3, Users
} from 'lucide-react';
import { QUIZ_CATEGORIES, INITIAL_LEADERS, QuizCategory, QuizQuestion, QuizLeader } from '../data/quizData';

interface QuizModuleProps {
  isDarkMode: boolean;
  onNavigateToAngor?: () => void;
}

export const QuizModule: React.FC<QuizModuleProps> = ({ isDarkMode, onNavigateToAngor }) => {
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [leaders, setLeaders] = useState<QuizLeader[]>(INITIAL_LEADERS);
  const [playerName, setPlayerName] = useState<string>('');
  const [playerSchool, setPlayerSchool] = useState<string>('Angor 1-maktab');
  const [hasSavedScore, setHasSavedScore] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'categories' | 'quiz' | 'leaderboard'>('categories');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Icon selector helper
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return Brain;
      case 'Calculator': return Calculator;
      case 'Cpu': return Cpu;
      case 'Landmark': return Landmark;
      case 'Languages': return Languages;
      default: return Sparkles;
    }
  };

  // Timer logic for active question
  useEffect(() => {
    if (viewMode === 'quiz' && selectedCategory && !isAnswerSubmitted && !isQuizCompleted) {
      setTimeLeft(selectedCategory.timePerQuestion || 30);
      
      if (timerRef.current) clearInterval(timerRef.current);

      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            handleTimeOut();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentQuestionIndex, selectedCategory, isAnswerSubmitted, viewMode, isQuizCompleted]);

  const handleTimeOut = () => {
    setIsAnswerSubmitted(true);
    // Timeout counts as incorrect answer
  };

  const handleStartQuiz = (category: QuizCategory) => {
    setSelectedCategory(category);
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setCorrectAnswersCount(0);
    setIsQuizCompleted(false);
    setHasSavedScore(false);
    setViewMode('quiz');
  };

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionIndex(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIndex === null || isAnswerSubmitted || !selectedCategory) return;
    
    if (timerRef.current) clearInterval(timerRef.current);
    setIsAnswerSubmitted(true);

    const currentQuestion = selectedCategory.questions[currentQuestionIndex];
    if (selectedOptionIndex === currentQuestion.correctIndex) {
      setScore(prev => prev + currentQuestion.points);
      setCorrectAnswersCount(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!selectedCategory) return;

    if (currentQuestionIndex + 1 < selectedCategory.questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionIndex(null);
      setIsAnswerSubmitted(false);
    } else {
      // Completed quiz
      setIsQuizCompleted(true);
      if (timerRef.current) clearInterval(timerRef.current);

      // Trigger celebration confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleSaveToLeaderboard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim() || hasSavedScore || !selectedCategory) return;

    const accuracy = Math.round((correctAnswersCount / selectedCategory.questions.length) * 100);

    const newLeader: QuizLeader = {
      id: Date.now(),
      name: playerName.trim(),
      school: playerSchool.trim() || 'Angor 1-maktab',
      score: score,
      accuracy: accuracy,
      category: selectedCategory.title,
      timeSpent: 'Tezkor',
      avatarBg: 'bg-blue-600',
      date: 'Hozirgina'
    };

    setLeaders(prev => [newLeader, ...prev]);
    setHasSavedScore(true);
  };

  const currentQuestion = selectedCategory?.questions[currentQuestionIndex];
  const progressPercent = selectedCategory 
    ? Math.round(((currentQuestionIndex + 1) / selectedCategory.questions.length) * 100)
    : 0;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className={`rounded-3xl border p-6 sm:p-8 relative overflow-hidden shadow-sm ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/70 border-slate-800' 
          : 'bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl'
      }`}>
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-md">
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              Onlayn Viktorina & Zakovat
            </span>
            <span className="bg-white/10 backdrop-blur-md text-white font-bold text-xs px-3 py-1 rounded-full border border-white/10">
              Angor 1-Maktabi Boshqaruvi
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-white mb-2">
            Bilimlar Sinovi va Intellektual Bellashuv
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
            O'quvchilar va iqtidorli yoshlar uchun fan olimpiadalari, Zakovat turniri hamda IT/STEAM yo'nalishidagi maxsus interaktiv testlar maydoni.
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setViewMode('categories')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                viewMode === 'categories'
                  ? 'bg-white text-slate-950 shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Brain className="w-4 h-4" />
              Fanlar & Yo'nalishlar
            </button>

            <button
              onClick={() => setViewMode('leaderboard')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                viewMode === 'leaderboard'
                  ? 'bg-amber-400 text-slate-950 shadow-lg font-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Trophy className="w-4 h-4" />
              Peshqadamlar Jadvali
            </button>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      </div>

      {/* ================= VIEW: CATEGORIES ================= */}
      {viewMode === 'categories' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-black">Sinov Yo'nalishini Tanlang</h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Har bir testda mantiqiy savollar, to'g'ri javoblar izohi va maxsus ballar mavjud
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
              <Sparkles className="w-4 h-4" />
              <span>5 ta tayyor yo'nalish</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {QUIZ_CATEGORIES.map(category => {
              const Icon = getCategoryIcon(category.icon);
              return (
                <div 
                  key={category.id}
                  className={`group rounded-3xl border p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden ${
                    isDarkMode 
                      ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700' 
                      : 'bg-white border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                        {category.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-black text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                        {category.subtitle}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {category.description}
                    </p>

                    <div className="flex items-center gap-4 pt-2 text-xs font-medium text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
                        <span>{category.questionsCount} ta savol</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Timer className="w-3.5 h-3.5 text-amber-500" />
                        <span>{category.timePerQuestion} sek/savol</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartQuiz(category)}
                    className="mt-6 w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Testni Boshlash</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= VIEW: ACTIVE QUIZ ================= */}
      {viewMode === 'quiz' && selectedCategory && (
        <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
          
          {!isQuizCompleted ? (
            <div className={`rounded-3xl border p-6 sm:p-8 shadow-lg relative ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              {/* Quiz Top bar: Progress, Back, Timer */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <button
                  onClick={() => setViewMode('categories')}
                  className="text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center gap-1"
                >
                  &larr; Chiqish
                </button>

                <div className="flex-1 max-w-xs">
                  <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-1">
                    <span>Savol {currentQuestionIndex + 1} / {selectedCategory.questions.length}</span>
                    <span>{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full transition-all duration-300 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold ${
                  timeLeft <= 10 
                    ? 'bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400 animate-pulse border border-red-200 dark:border-red-800' 
                    : 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300'
                }`}>
                  <Timer className="w-4 h-4" />
                  <span>{timeLeft}s</span>
                </div>
              </div>

              {/* Question Box */}
              {currentQuestion && (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                        {currentQuestion.difficulty} daraja
                      </span>
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                        +{currentQuestion.points} ball
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold leading-snug text-slate-900 dark:text-white">
                      {currentQuestion.question}
                    </h2>
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, idx) => {
                      const isSelected = selectedOptionIndex === idx;
                      const isCorrect = isAnswerSubmitted && idx === currentQuestion.correctIndex;
                      const isWrong = isAnswerSubmitted && isSelected && idx !== currentQuestion.correctIndex;

                      let btnStyle = isDarkMode 
                        ? 'bg-slate-800/80 border-slate-700 hover:border-blue-500 text-slate-200' 
                        : 'bg-slate-50 border-slate-200 hover:border-blue-400 text-slate-800';

                      if (isSelected && !isAnswerSubmitted) {
                        btnStyle = 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/20';
                      }
                      if (isCorrect) {
                        btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20';
                      }
                      if (isWrong) {
                        btnStyle = 'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300';
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(idx)}
                          disabled={isAnswerSubmitted}
                          className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 text-xs sm:text-sm font-medium ${btnStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center font-bold text-xs shrink-0">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span>{option}</span>
                          </div>

                          {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                          {isWrong && <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation Box on submit */}
                  {isAnswerSubmitted && (
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 text-xs sm:text-sm space-y-1 animate-fadeIn">
                      <div className="flex items-center gap-2 font-bold text-blue-800 dark:text-blue-300">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span>Bilasizmi? (Izoh):</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  )}

                  {/* Actions Bottom Bar */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="text-xs font-bold text-slate-500">
                      Jami to'plangan ball: <span className="text-blue-600 dark:text-blue-400 text-sm font-black">{score}</span>
                    </div>

                    {!isAnswerSubmitted ? (
                      <button
                        onClick={handleSubmitAnswer}
                        disabled={selectedOptionIndex === null}
                        className="py-3 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
                      >
                        Javobni tasdiqlash
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuestion}
                        className="py-3 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-2"
                      >
                        <span>{currentQuestionIndex + 1 === selectedCategory.questions.length ? 'Natijani ko\'rish' : 'Keyingi savol'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ================= VIEW: RESULTS & CERTIFICATE ================= */
            <div className={`rounded-3xl border p-6 sm:p-10 shadow-2xl space-y-8 animate-fadeIn ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              
              {/* Certificate Card Header */}
              <div className="text-center space-y-3">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 mx-auto flex items-center justify-center shadow-xl shadow-amber-500/20 text-slate-950">
                  <Trophy className="w-10 h-10" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                  Test Muvaffaqiyatli Yakunlandi!
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  {selectedCategory.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Angor 1-maktabi Intellektual Test Natijasi
                </p>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
                <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">To'plangan Ball</span>
                  <p className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 mt-1">{score}</p>
                </div>
                <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">To'g'ri Javoblar</span>
                  <p className="text-2xl sm:text-3xl font-black text-emerald-500 mt-1">
                    {correctAnswersCount} / {selectedCategory.questions.length}
                  </p>
                </div>
                <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase">Aniqlik (Foiz)</span>
                  <p className="text-2xl sm:text-3xl font-black text-amber-500 mt-1">
                    {Math.round((correctAnswersCount / selectedCategory.questions.length) * 100)}%
                  </p>
                </div>
              </div>

              {/* Save result to Leaderboard Form */}
              {!hasSavedScore ? (
                <form onSubmit={handleSaveToLeaderboard} className={`p-5 rounded-2xl border space-y-3 ${
                  isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-blue-50/50 border-blue-200'
                }`}>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <h4 className="font-bold text-xs sm:text-sm">Natijangizni Peshqadamlar Jadvaliga Qo'shing:</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input 
                      type="text"
                      placeholder="Ism va Familiyangiz..."
                      value={playerName}
                      onChange={e => setPlayerName(e.target.value)}
                      required
                      className={`px-4 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                        isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                      }`}
                    />
                    <input 
                      type="text"
                      placeholder="Maktab yoki sinf (Masalan: Angor 1-maktab 10-A)"
                      value={playerSchool}
                      onChange={e => setPlayerSchool(e.target.value)}
                      className={`px-4 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none ${
                        isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md active:scale-95"
                  >
                    Reyting Jadvalida Saqlash
                  </button>
                </form>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-center font-bold text-xs sm:text-sm flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span>Natijangiz muvaffaqiyatli saqlandi!</span>
                </div>
              )}

              {/* Bottom Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => handleStartQuiz(selectedCategory)}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl border font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Qaytadan topshirish
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setViewMode('leaderboard')}
                    className="flex-1 sm:flex-none px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Trophy className="w-4 h-4" />
                    Reytingni ko'rish
                  </button>

                  <button
                    onClick={() => setViewMode('categories')}
                    className="flex-1 sm:flex-none px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    Boshqa fanlar
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* ================= VIEW: LEADERBOARD ================= */}
      {viewMode === 'leaderboard' && (
        <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2">
                <Trophy className="w-6 h-6 text-amber-500" />
                Viktorina Peshqadamlari Jadvali
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Eng yuqori ball to'plagan iqtidorli o'quvchilar va Zakovat bilimdonlari
              </p>
            </div>

            <button
              onClick={() => setViewMode('categories')}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 shadow-md transition-all self-start sm:self-auto"
            >
              Test topshirish &rarr;
            </button>
          </div>

          <div className={`rounded-3xl border overflow-hidden shadow-sm ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className={`border-b text-[11px] uppercase tracking-wider font-bold ${
                  isDarkMode ? 'bg-slate-800/60 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}>
                  <tr>
                    <th className="px-5 py-4">O'rin</th>
                    <th className="px-5 py-4">O'quvchi F.I.SH</th>
                    <th className="px-5 py-4">Yo'nalish</th>
                    <th className="px-5 py-4">Aniqlik</th>
                    <th className="px-5 py-4 text-right">To'plangan Ball</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
                  {leaders.map((leader, idx) => (
                    <tr 
                      key={leader.id} 
                      className={`transition-colors ${
                        idx === 0 
                          ? (isDarkMode ? 'bg-amber-500/10' : 'bg-amber-50/70') 
                          : (isDarkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50')
                      }`}
                    >
                      <td className="px-5 py-4 font-black text-sm">
                        {idx === 0 && <span className="text-amber-500 text-base">🥇 1</span>}
                        {idx === 1 && <span className="text-slate-400 text-base">🥈 2</span>}
                        {idx === 2 && <span className="text-amber-700 text-base">🥉 3</span>}
                        {idx > 2 && <span className="text-slate-400">#{idx + 1}</span>}
                      </td>

                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          {leader.name}
                        </div>
                        <p className="text-[11px] text-slate-400">{leader.school}</p>
                      </td>

                      <td className="px-5 py-4">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800">
                          {leader.category}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full" style={{ width: `${leader.accuracy}%` }} />
                          </div>
                          <span className="font-bold text-xs text-emerald-600 dark:text-emerald-400">{leader.accuracy}%</span>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <span className="font-black text-sm text-blue-600 dark:text-blue-400">
                          {leader.score} ball
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
