import React, { useState } from 'react';
import { X, Award, Heart, Sparkles, Star, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Teacher } from '../types';

interface TeacherPraiseModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: Teacher | null;
  isDarkMode: boolean;
}

const BADGES = [
  { id: 'fidoyi', label: 'Eng Fidoyi Ustoz', icon: Heart, color: 'text-rose-500 bg-rose-50 dark:bg-rose-950 border-rose-200' },
  { id: 'vazir', label: 'Vazir Jamg\'armasi Faxri', icon: Award, color: 'text-amber-600 bg-amber-50 dark:bg-amber-950 border-amber-200' },
  { id: 'zakovat', label: 'Zakovat Murabbiyi', icon: Sparkles, color: 'text-purple-600 bg-purple-50 dark:bg-purple-950 border-purple-200' },
  { id: 'mentor', label: 'Iqtidorli Pedagog', icon: Star, color: 'text-blue-600 bg-blue-50 dark:bg-blue-950 border-blue-200' },
];

export const TeacherPraiseModal: React.FC<TeacherPraiseModalProps> = ({
  isOpen,
  onClose,
  teacher,
  isDarkMode
}) => {
  const [selectedBadge, setSelectedBadge] = useState('fidoyi');
  const [senderName, setSenderName] = useState('');
  const [praiseMessage, setPraiseMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (!isOpen || !teacher) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setIsSent(false);
      setSenderName('');
      setPraiseMessage('');
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className={`relative w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden p-6 sm:p-8 ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSent ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Teacher Profile Preview */}
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <img
                src={teacher.avatar}
                alt={teacher.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-500/30"
              />
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
                  Ustozga Minnatdorchilik
                </span>
                <h3 className="font-extrabold text-lg mt-0.5">{teacher.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{teacher.subject}</p>
              </div>
            </div>

            {/* Select Appreciation Badge */}
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-2">
                Qaysi unvon / e'tirofni yo'llamoqchisiz?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {BADGES.map((badge) => {
                  const Icon = badge.icon;
                  const isSelected = selectedBadge === badge.id;
                  return (
                    <button
                      type="button"
                      key={badge.id}
                      onClick={() => setSelectedBadge(badge.id)}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                        isSelected 
                          ? 'border-blue-600 ring-2 ring-blue-500/30 bg-blue-50/50 dark:bg-blue-950/50' 
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${badge.color}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="truncate">{badge.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sender Name */}
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">
                Ismingiz va maqomingiz:
              </label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Masalan: Sardor (10-A sinf o'quvchisi) yoki Malika (Ota-ona)"
                className={`w-full p-3 rounded-xl border text-xs ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">
                Ustozga dil so'zlaringiz va tilaklaringiz:
              </label>
              <textarea
                required
                rows={3}
                value={praiseMessage}
                onChange={(e) => setPraiseMessage(e.target.value)}
                placeholder="Ustoz, mashaqqatli mehnatingiz va bizga bergan chuqur bilimlaringiz uchun tashakkur..."
                className={`w-full p-3 rounded-xl border text-xs resize-none ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-transform active:scale-95"
            >
              <Send className="w-4 h-4" />
              Minnatdorchilik xatini yo'llash
            </button>

          </form>
        ) : (
          <div className="py-10 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-2xl shadow-xl shadow-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-black">Rahmat! Minnatdorchilik yo'llandi!</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                Sizning samimiy tilaklaringiz ustoz {teacher.name} sahifasida e'tirof etildi.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
