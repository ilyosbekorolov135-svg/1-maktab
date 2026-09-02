import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, PenLine, Star, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';
import { School, Review } from '../types';

interface LeaveFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  schools: School[];
  defaultSchoolId?: number;
  isDarkMode: boolean;
  onAddReview: (reviewData: Partial<Review>) => void;
}

export const LeaveFeedbackModal: React.FC<LeaveFeedbackModalProps> = ({
  isOpen,
  onClose,
  schools,
  defaultSchoolId = 1,
  isDarkMode,
  onAddReview
}) => {
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState<'O\'quvchi' | 'Ota-ona' | 'Bitiruvchi' | 'Ustoz'>('O\'quvchi');
  const [selectedSchoolId, setSelectedSchoolId] = useState<number>(defaultSchoolId);
  const [sentiment, setSentiment] = useState<'Ijobiy' | 'Salbiy' | 'Taklif'>('Ijobiy');
  const [category, setCategory] = useState<'Ta\'lim' | 'O\'qituvchilar' | 'Sharoit' | 'Oshxona' | 'Tadbirlar'>('Ta\'lim');
  const [content, setContent] = useState('');
  const [authorDetail, setAuthorDetail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    const targetSchool = schools.find(s => s.id === Number(selectedSchoolId)) || schools[0];

    onAddReview({
      author: author.trim(),
      role: role,
      schoolId: targetSchool.id,
      schoolName: targetSchool.name,
      authorDetail: authorDetail.trim() || `${role}, ${targetSchool.location}`,
      content: content.trim(),
      sentiment: sentiment,
      category: category,
      upvotes: 1,
      downvotes: 0,
      score: '1 ball',
      time: 'Hozirgina'
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setContent('');
      setAuthor('');
      setAuthorDetail('');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className={`max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl border max-h-[90vh] overflow-y-auto ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-black">Maktabga Ochiq Fikr Bildirish</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Ta'lim sifati, o'qituvchilar va maktab hayoti haqida xolisona fikringiz
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-xl text-slate-900 dark:text-white">Fikringiz muvaffaqiyatli qabul qilindi!</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Maktab reytingi va jamoat nazoratiga hissa qo'shganingiz uchun tashakkur.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            
            {/* Author Name */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Ismingiz yoki Taxallusingiz *
              </label>
              <input 
                type="text" 
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Masalan: Sardor Kenjayev"
                className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>

            {/* School & Role row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Maktabni tanlang
                </label>
                <select 
                  value={selectedSchoolId}
                  onChange={(e) => setSelectedSchoolId(Number(e.target.value))}
                  className={`w-full px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  {schools.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Kim sifatida
                </label>
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className={`w-full px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <option value="O'quvchi">O'quvchi</option>
                  <option value="Ota-ona">Ota-ona</option>
                  <option value="Bitiruvchi">Bitiruvchi</option>
                  <option value="Ustoz">Ustoz</option>
                </select>
              </div>
            </div>

            {/* Sentiment Buttons (Ijobiy, Salbiy, Taklif) */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Fikr Yo'nalishi (Baho turi)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { type: 'Ijobiy', icon: ThumbsUp, color: 'bg-emerald-600 border-emerald-600' },
                  { type: 'Salbiy', icon: ThumbsDown, color: 'bg-red-600 border-red-600' },
                  { type: 'Taklif', icon: Sparkles, color: 'bg-blue-600 border-blue-600' },
                ].map(({ type, icon: Icon, color }) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setSentiment(type as any)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${
                      sentiment === type
                        ? `${color} text-white shadow-xs`
                        : isDarkMode 
                          ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' 
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{type}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Detail / Class / District */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Qo'shimcha ma'lumot (Ixtiyoriy)
              </label>
              <input 
                type="text" 
                value={authorDetail}
                onChange={(e) => setAuthorDetail(e.target.value)}
                placeholder="Masalan: 9-sinf o'quvchisi yoki Tarix to'garagi a'zosi"
                className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>

            {/* Content Textarea */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Fikringiz matni *
              </label>
              <textarea 
                rows={3}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Maktabdagi darslar sifati, ustozlar mehnati, olimpiadalar yoki sharoit haqida batafsil yozing..."
                className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-98 text-white py-3 rounded-2xl font-bold text-sm transition-all shadow-md shadow-blue-500/25 flex items-center justify-center gap-2"
            >
              <PenLine className="w-4 h-4" />
              Fikrni Chop Etish
            </button>

          </form>
        )}
      </motion.div>
    </div>
  );
};
