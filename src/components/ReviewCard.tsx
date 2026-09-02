import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ThumbsUp, ThumbsDown, Share2, Bookmark, Flag, 
  Quote, Building2, User, MessageCircle, Send, CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Review } from '../types';

interface ReviewCardProps {
  review: Review;
  isDarkMode: boolean;
  onVote: (id: number, type: 'up' | 'down') => void;
  onBookmark: (id: number) => void;
  onAddComment: (reviewId: number, commentText: string) => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  isDarkMode,
  onVote,
  onBookmark,
  onAddComment
}) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [copied, setCopied] = useState(false);

  const isNegative = review.sentiment === 'Salbiy';
  const isPositive = review.sentiment === 'Ijobiy';

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(review.id, newComment.trim());
    setNewComment('');
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
      className={`rounded-2xl p-5 sm:p-6 border shadow-xs relative overflow-hidden transition-all flex flex-col justify-between group ${
        isDarkMode 
          ? 'bg-slate-900 border-slate-800 hover:border-slate-700' 
          : 'bg-white border-slate-200/80 hover:border-slate-300'
      }`}
    >
      {/* Sentiment colored accent border indicator (Exact style from EduStats screenshot) */}
      <div 
        className={`absolute top-0 left-0 w-1.5 h-full rounded-tl-2xl rounded-bl-2xl transition-all ${
          isNegative 
            ? 'bg-red-400 group-hover:bg-red-500' 
            : isPositive 
              ? 'bg-emerald-400 group-hover:bg-emerald-500' 
              : 'bg-blue-400 group-hover:bg-blue-500'
        }`} 
      />
      
      {/* Subtle background quote ornament */}
      <Quote className={`absolute top-4 right-5 w-12 h-12 opacity-5 rotate-180 pointer-events-none ${
        isNegative ? 'text-red-500' : isPositive ? 'text-emerald-500' : 'text-blue-500'
      }`} />

      <div>
        {/* Author Header */}
        <div className="flex items-start justify-between mb-4 relative z-10 gap-2">
          <div className="flex items-start gap-3">
            {/* User Avatar */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-xs ${
              isPositive 
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                : isNegative 
                  ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' 
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
            }`}>
              {review.author.charAt(0)}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-bold text-sm tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                  {review.author}
                  {review.role === 'Ustoz' && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 inline" title="Tasdiqlangan ustoz" />
                  )}
                </h4>
                {review.role && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    review.role === 'Ustoz' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                      : review.role === 'Ota-ona'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                  }`}>
                    {review.role}
                  </span>
                )}
                <span className="text-slate-400 text-xs font-mono">{review.tagNumber}</span>
              </div>

              {/* School and Time */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1 flex-wrap">
                <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
                  <Building2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>{review.schoolName}</span>
                </div>
                <span className="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full"></span>
                <span>{review.time}</span>
              </div>

              {review.authorDetail && (
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 flex items-center gap-1">
                  <User className="w-3 h-3 text-slate-400" />
                  {review.authorDetail}
                </p>
              )}
            </div>
          </div>

          {/* Sentiment Badge */}
          <div className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shrink-0 ${
            isPositive 
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' 
              : isNegative 
                ? 'bg-red-50 text-red-700 dark:bg-red-950/70 dark:text-red-300 border border-red-200 dark:border-red-800' 
                : 'bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
          }`}>
            {isPositive ? <ThumbsUp className="w-3 h-3" /> : isNegative ? <ThumbsDown className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
            {review.sentiment}
          </div>
        </div>

        {/* Review Text Content */}
        <p className={`text-sm leading-relaxed mb-5 relative z-10 ${
          isDarkMode ? 'text-slate-200' : 'text-slate-700'
        }`}>
          {review.content}
        </p>
      </div>

      {/* Footer Controls */}
      <div>
        <div className={`flex items-center justify-between pt-3.5 border-t text-xs ${
          isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
        }`}>
          {/* Votes and Score */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onVote(review.id, 'up')}
              className={`flex items-center gap-1 font-semibold transition-colors px-2 py-1 rounded-lg ${
                review.userVoted === 'up' 
                  ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50' 
                  : 'hover:text-emerald-600 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>{review.upvotes}</span>
            </button>

            <button 
              onClick={() => onVote(review.id, 'down')}
              className={`flex items-center gap-1 font-semibold transition-colors px-2 py-1 rounded-lg ${
                review.userVoted === 'down' 
                  ? 'bg-red-50 text-red-600 dark:bg-red-950/50' 
                  : 'hover:text-red-600 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <ThumbsDown className="w-3.5 h-3.5" />
              <span>{review.downvotes}</span>
            </button>

            <span className="font-bold text-slate-400 dark:text-slate-500 border-l border-slate-200 dark:border-slate-700 pl-3">
              {review.score}
            </span>
          </div>

          {/* Actions & Comment toggle */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowComments(!showComments)}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-colors text-xs font-medium ${
                showComments ? 'bg-blue-50 text-blue-600 dark:bg-blue-950' : 'hover:text-blue-600'
              }`}
              title="Izohlar"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{review.comments?.length || 0}</span>
            </button>

            <button 
              onClick={() => onBookmark(review.id)}
              className={`p-1.5 rounded-lg transition-colors ${
                review.saved 
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-950 fill-blue-600' 
                  : 'hover:text-blue-600'
              }`}
              title="Saqlash"
            >
              <Bookmark className="w-3.5 h-3.5" />
            </button>

            <button 
              onClick={handleShare}
              className="p-1.5 rounded-lg hover:text-blue-600 transition-colors relative"
              title="Ulashish"
            >
              <Share2 className="w-3.5 h-3.5" />
              {copied && (
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow">
                  Nusxalandi!
                </span>
              )}
            </button>

            <button 
              className="p-1.5 rounded-lg hover:text-red-600 transition-colors"
              title="Shikoyat qilish"
            >
              <Flag className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Expandable Comments Section */}
        <AnimatePresence>
          {showComments && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden pt-3 mt-3 border-t border-slate-100 dark:border-slate-800"
            >
              <div className="space-y-2 mb-3 max-h-48 overflow-y-auto pr-1">
                {review.comments && review.comments.length > 0 ? (
                  review.comments.map(c => (
                    <div key={c.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-slate-900 dark:text-white">{c.author}</span>
                        <span className="text-[10px] text-slate-400">{c.date}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 leading-normal">{c.content}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic py-1">Hozircha izohlar yo'q. Birinchi bo'lib izoh qoldiring!</p>
                )}
              </div>

              {/* Add Comment Input */}
              <form onSubmit={handleCommentSubmit} className="flex gap-2">
                <input 
                  type="text" 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Izoh yozing..." 
                  className={`flex-1 px-3 py-1.5 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'
                  }`}
                />
                <button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Send className="w-3 h-3" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
