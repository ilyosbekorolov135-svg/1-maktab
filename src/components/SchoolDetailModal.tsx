import React from 'react';
import { motion } from 'motion/react';
import { 
  X, Building2, MapPin, Phone, Mail, Award, Trophy, 
  Users, GraduationCap, CheckCircle2, Star, PenLine, ArrowRight
} from 'lucide-react';
import { School } from '../types';
import { SchoolVideoEmbed } from './SchoolVideoEmbed';
import { SchoolEmblem } from './SchoolEmblem';

interface SchoolDetailModalProps {
  school: School | null;
  onClose: () => void;
  isDarkMode: boolean;
  onOpenFeedback: (school: School) => void;
  onViewAngorPage?: () => void;
}

export const SchoolDetailModal: React.FC<SchoolDetailModalProps> = ({
  school,
  onClose,
  isDarkMode,
  onOpenFeedback,
  onViewAngorPage
}) => {
  if (!school) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className={`max-w-2xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl border max-h-[90vh] overflow-y-auto ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-start gap-4">
            <SchoolEmblem 
              schoolName={school.name}
              type={school.type}
              logoImage={school.logoImage}
              size="md"
              showRays={false}
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 uppercase tracking-wider">
                  {school.type} maktabi
                </span>
                <span className="text-xs font-bold text-amber-500 flex items-center gap-0.5">
                  <Star className="w-3 h-3 fill-amber-500" /> #{school.rank} Reytingda
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black mt-0.5">{school.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                {school.address}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 text-xs sm:text-sm">
          
          {/* Full description */}
          <div>
            <h4 className="font-bold text-[11px] uppercase tracking-wider text-slate-400 mb-1.5">To'liq nomi va pasporti</h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
              {school.fullName}
            </p>
          </div>

          {/* Key Metric stats */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
              <p className="text-xl font-black text-emerald-600">{school.positivePercent}%</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Ijobiy baholash</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
              <p className="text-xl font-black text-slate-800 dark:text-slate-200">{school.studentsCount}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">O'quvchilar soni</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
              <p className="text-xl font-black text-blue-600">{school.olympiadWinnersCount} ta</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Olimpiada yutuqlari</p>
            </div>
          </div>

          {/* Video Embed Section: Virtual Tour & Events */}
          <div className="pt-1">
            <SchoolVideoEmbed
              videos={school.videos}
              schoolName={school.name}
              defaultTitle={`${school.name} — Virtual ekskursiya & Tadbirlar`}
              isDarkMode={isDarkMode}
              showPlaylist={true}
            />
          </div>

          {/* Criteria breakdown */}
          <div>
            <h4 className="font-bold text-[11px] uppercase tracking-wider text-slate-400 mb-2">Yo'nalishlar bo'yicha baholar</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                <span className="text-slate-500">Ta'lim sifati:</span>
                <span className="font-bold text-blue-600">{school.ratingBreakdown.education} / 5</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                <span className="text-slate-500">Ustozlar salohiyati:</span>
                <span className="font-bold text-emerald-600">{school.ratingBreakdown.teachers} / 5</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                <span className="text-slate-500">Maktab sharoiti:</span>
                <span className="font-bold text-purple-600">{school.ratingBreakdown.facilities} / 5</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                <span className="text-slate-500">Oshxona sifati:</span>
                <span className="font-bold text-amber-600">{school.ratingBreakdown.canteen} / 5</span>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h4 className="font-bold text-[11px] uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              Asosiy yutuqlar
            </h4>
            <div className="space-y-1.5">
              {school.achievements.map((ach, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">{ach}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            {school.id === 1 && onViewAngorPage && (
              <button 
                onClick={() => {
                  onClose();
                  onViewAngorPage();
                }}
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 py-3 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
              >
                Angor 1-maktab to'liq sahifasini ochish &rarr;
              </button>
            )}

            <button 
              onClick={() => {
                onClose();
                onOpenFeedback(school);
              }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
            >
              <PenLine className="w-4 h-4" />
              Ushbu maktabga fikr yozish
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
