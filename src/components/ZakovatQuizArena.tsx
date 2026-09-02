import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, Trophy, Award, Clock, CheckCircle2, XCircle, 
  Sparkles, RotateCcw, Volume2, Share2, Star, Flame, ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: 'Tarix' | 'Adabiyot' | 'Mantiq' | 'Matematika' | 'Surxondaryo';
  authorTeacher: string;
}

const ZAKOVAT_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Surxondaryo viloyatining qadimiy Termiz shahrida joylashgan va IX-XV asrlarda barpo etilgan mashhur me'moriy yodgorlik qaysi?",
    options: [
      "Hakim at-Termiziy majmuasi",
      "Shohi Zinda ansambli",
      "Registon maydoni",
      "Ark qal'asi"
    ],
    correctIndex: 0,
    explanation: "Hakim at-Termiziy majmuasi Surxondaryo viloyati Termiz shahrida joylashgan buyuk alloma Al-Hakim at-Termiziy nomi bilan bog'liq me'moriy obidadir.",
    category: "Surxondaryo",
    authorTeacher: "Fazliddin Kenjayev (Vazir ustamasi sohibi)"
  },
  {
    id: 2,
    question: "Tarixda Kushonlar davlatining qadimgi poytaxtlaridan biri hisoblangan va hozirgi Surxondaryo hududidagi yodgorlik qaysi?",
    options: [
      "Dalvarzintepa va Xolchayon",
      "Qo'yqirilgan qal'a",
      "Varaxsha",
      "Afrosiyob"
    ],
    correctIndex: 0,
    explanation: "Dalvarzintepa va Xolchayon Kushonlar saltanatining eng muhim madaniy va iqtisodiy markazlaridan biri bo'lgan.",
    category: "Tarix",
    authorTeacher: "Guliston Kuvatova (Tarix fani o'qituvchisi)"
  },
  {
    id: 3,
    question: "O'zbek xalq og'zaki ijodining shoh asari bo'lmish 'Alpomish' dostoni qaysi el-yurt va makon bilan uzviy bog'liq?",
    options: [
      "Boysun va Surxon vohasi (Qo'ng'irot eli)",
      "Farg'ona vodiysi",
      "Xorazm vohasi",
      "Zarafshon vodiysi"
    ],
    correctIndex: 0,
    explanation: "Alpomish dostoni qadim Surxon vohasi, Boysun tog'lari va Qo'ng'irot eli bilan chambarchas bog'liq buyuk xalq qahramonlik dostonidir.",
    category: "Adabiyot",
    authorTeacher: "Shoxista Madiyeva (Zakovat klubi faoli)"
  },
  {
    id: 4,
    question: "Al-Xorazmiy qaysi asari orqali dunyo ilm-faniga 'Algebra' tushunchasi va tenglamalarni yechish metodini kiritgan?",
    options: [
      "Al-Kitob al-muxtasar fi hisob al-jabr val-muqobala",
      "Ziji Malikshohiy",
      "Qonuni Mas'udiy",
      "Tafhimi hisob"
    ],
    correctIndex: 0,
    explanation: "Muhammad al-Xorazmiyning 'Al-jabr val-muqobala' asari zamonaviy algebra faniga asos soldi.",
    category: "Matematika",
    authorTeacher: "Sherzod Norboyev (Al-Xorazmiy olimpiadasi murabbiyi)"
  },
  {
    id: 5,
    question: "Mantiqiy savol: Qora qutida shunday narsa borki, uni qanchalik ko'p bo'lishsang, u shunchalik ko'payadi. Bu nima?",
    options: [
      "Ilm va Bilim",
      "Boylik",
      "Oltin tanga",
      "Vaqt"
    ],
    correctIndex: 0,
    explanation: "Ilm va bilim odamlar bilan ulashilgan sari o'z kuchi va qadrini yanada oshiruvchi yagona bebaho xazinadir.",
    category: "Mantiq",
    authorTeacher: "Angor 1-maktab Zakovat jamoasi"
  }
];

interface ZakovatQuizArenaProps {
  isDarkMode: boolean;
  onClose?: () => void;
}

export const ZakovatQuizArena: React.FC<ZakovatQuizArenaProps> = ({ isDarkMode, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const currentQ = ZAKOVAT_QUESTIONS[currentIdx];

  // Timer countdown
  useEffect(() => {
    if (isAnswered || isFinished) return;

    if (timeLeft <= 0) {
      handleAnswer(-1); // timeout
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, isFinished]);

  const handleAnswer = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIdx);
    setIsAnswered(true);

    const isCorrect = optionIdx === currentQ.correctIndex;

    if (isCorrect) {
      setScore(prev => prev + 100 + (timeLeft * 2));
      setStreak(prev => prev + 1);
      if (soundEnabled) soundManager.playZakovatGong();
      
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < ZAKOVAT_QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(30);
    } else {
      setIsFinished(true);
      if (soundEnabled) soundManager.playSuccessSound();
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 }
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setIsFinished(false);
    setTimeLeft(30);
  };

  return (
    <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border-indigo-900/60 text-white' 
        : 'bg-gradient-to-br from-white via-indigo-50/40 to-blue-50/40 border-indigo-100 text-slate-900'
    }`}>
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-indigo-100 dark:border-indigo-900/40">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/25 shrink-0">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/80 px-2.5 py-0.5 rounded-full">
                Angor 1-maktab Intellektual Arenasi
              </span>
              {streak >= 2 && (
                <span className="text-xs font-black text-rose-500 flex items-center gap-1 bg-rose-50 dark:bg-rose-950/80 px-2 py-0.5 rounded-full animate-bounce">
                  <Flame className="w-3.5 h-3.5 fill-rose-500" /> {streak} ketma-ket!
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-black mt-1">Zakovat & Fan Olimpiadasi Viktorinasi</h2>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/80 px-3.5 py-1.5 rounded-xl border border-indigo-100 dark:border-indigo-900 text-xs font-bold">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Ball: <strong className="text-indigo-600 dark:text-indigo-400 text-sm">{score}</strong></span>
          </div>

          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border text-xs ${
              soundEnabled 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
            title={soundEnabled ? 'Ovoz yoqilgan' : 'Ovoz o\'chirilgan'}
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Game Screen */}
      {!isFinished ? (
        <div className="pt-6 space-y-6">
          
          {/* Progress and Timer */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span>Savol {currentIdx + 1} / {ZAKOVAT_QUESTIONS.length}</span>
            
            <div className="flex items-center gap-2">
              <Clock className={`w-4 h-4 ${timeLeft <= 10 ? 'text-rose-500 animate-pulse' : 'text-blue-500'}`} />
              <span className={`font-mono text-sm font-black ${timeLeft <= 10 ? 'text-rose-500' : 'text-slate-700 dark:text-slate-200'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / ZAKOVAT_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <div className={`p-6 rounded-2xl border ${
            isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between gap-2 mb-3 text-xs">
              <span className="font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-lg">
                Fan: {currentQ.category}
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-[11px] font-medium">
                Tuzuvchi: <strong>{currentQ.authorTeacher}</strong>
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-extrabold leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {currentQ.options.map((option, idx) => {
              let btnStyle = isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-indigo-600' : 'bg-white border-slate-200 hover:border-indigo-400 shadow-xs';
              
              if (isAnswered) {
                if (idx === currentQ.correctIndex) {
                  btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-md shadow-emerald-500/20 font-bold';
                } else if (idx === selectedOption) {
                  btnStyle = 'bg-rose-500 text-white border-rose-600 shadow-md shadow-rose-500/20 font-bold';
                } else {
                  btnStyle = 'opacity-40 bg-slate-100 dark:bg-slate-900 border-transparent';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={isAnswered}
                  className={`p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                      isAnswered && idx === currentQ.correctIndex
                        ? 'bg-white text-emerald-600'
                        : isAnswered && idx === selectedOption
                        ? 'bg-white text-rose-600'
                        : isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isAnswered && idx === currentQ.correctIndex && (
                    <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                  )}
                  {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                    <XCircle className="w-5 h-5 text-white shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation & Next Button */}
          {isAnswered && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 text-xs space-y-3"
            >
              <div className="flex items-start gap-2 text-indigo-900 dark:text-indigo-200">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Izoh:</strong> {currentQ.explanation}
                </p>
              </div>

              <div className="text-right">
                <button
                  onClick={handleNextQuestion}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs inline-flex items-center gap-2 shadow-md shadow-indigo-600/30 transition-transform active:scale-95"
                >
                  {currentIdx + 1 === ZAKOVAT_QUESTIONS.length ? 'Natijani ko\'rish' : 'Keyingi savol'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

        </div>
      ) : (
        /* Result Screen & Certificate */
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="pt-8 text-center space-y-6"
        >
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-3xl shadow-xl shadow-amber-500/30 animate-bounce">
            <Trophy className="w-10 h-10" />
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-black">Tabriklaymiz, Zakovat Bilimdoni!</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
              Siz Surxondaryo viloyati Angor 1-maktabi maxsus Zakovat bellashuvida ajoyib natija qayd etdingiz!
            </p>
          </div>

          <div className="inline-flex items-center gap-6 p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900 text-center">
            <div>
              <span className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">{score}</span>
              <span className="text-[11px] block text-slate-500">To'plangan Ball</span>
            </div>
            <div className="h-8 w-px bg-indigo-200 dark:bg-indigo-800" />
            <div>
              <span className="text-2xl sm:text-3xl font-black text-emerald-600">{Math.round((score / 600) * 100)}%</span>
              <span className="text-[11px] block text-slate-500">Aniqlik Darajasi</span>
            </div>
          </div>

          {/* Certificate Badge Frame */}
          <div className={`max-w-lg mx-auto p-6 rounded-2xl border-2 border-dashed border-amber-400/80 text-left ${
            isDarkMode ? 'bg-slate-900/90' : 'bg-amber-50/50'
          }`}>
            <div className="flex items-center justify-between mb-3 border-b border-amber-300/40 pb-2">
              <span className="font-extrabold text-xs text-amber-700 dark:text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                Faxriy Zakovat Sertifikati
              </span>
              <span className="text-[10px] text-slate-400">№ ANGOR-ZK-{Math.floor(1000 + Math.random() * 9000)}</span>
            </div>
            
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Ushbu sertifikat egasi Angor 1-maktabi fan ustozlari Fazliddin Kenjayev, Guliston Kuvatova, Shoxista Madiyeva va Sherzod Norboyev tomonidan tuzilgan saralash intellektual testini muvaffaqiyatli topshirganligini tasdiqlaydi.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-500/25 transition-transform active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              Qayta o'ynash
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Yopish
              </button>
            )}
          </div>

        </motion.div>
      )}

    </div>
  );
};
