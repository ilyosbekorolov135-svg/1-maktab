import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { 
  MapPin, Trophy, Award, Building2, BookOpen, Star, 
  ChevronRight, Users, GraduationCap, Check
} from 'lucide-react';
import { School } from '../types';
import { SchoolEmblem } from './SchoolEmblem';

interface SchoolCardProps {
  school: School;
  isDarkMode: boolean;
  onSelect: (school: School) => void;
  onOpenFeedbackForSchool: (school: School) => void;
}

export const SchoolCard: React.FC<SchoolCardProps> = ({
  school,
  isDarkMode,
  onSelect,
  onOpenFeedbackForSchool
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      ref={ref}
      layout
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, zIndex: 10, transition: { duration: 0.2 } }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(school)}
      className={`rounded-2xl p-5 sm:p-6 border shadow-xs hover:shadow-2xl transition-shadow transition-colors duration-300 cursor-pointer flex flex-col justify-between group relative overflow-visible ${
        isDarkMode 
          ? 'bg-slate-900 border-slate-800 hover:border-slate-700' 
          : 'bg-white border-slate-200/80 hover:border-blue-200'
      }`}
    >
      {/* Featured Ribbon if applicable */}
      {school.isFeatured && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-white text-[10px] font-black uppercase px-3 py-0.5 rounded-bl-xl rounded-tr-2xl shadow-xs flex items-center gap-1">
          <Star className="w-3 h-3 fill-white" />
          <span>Yetakchi</span>
        </div>
      )}

      <div>
        {/* Header: Logo, Name, Rank */}
        <div className="flex items-start gap-4 mb-3">
          {/* Logo / Badge */}
          <SchoolEmblem 
            schoolName={school.name}
            type={school.type}
            logoImage={school.logoImage}
            size="md"
            showRays={false}
          />

          {/* Name & Subtitle */}
          <div className="flex-1 min-w-0 pr-8">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h3 className="font-bold text-base sm:text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate text-slate-900 dark:text-white">
                {school.name}
              </h3>
            </div>

            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider ${
                school.type === 'Davlat' 
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300' 
                  : school.type === 'Ixtisoslashgan' 
                    ? 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300' 
                    : school.type === 'Prezident' 
                      ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300' 
                      : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
              }`}>
                {school.type}
              </span>

              <span className="text-slate-400 dark:text-slate-500 text-xs flex items-center gap-1 truncate">
                <MapPin className="w-3 h-3 shrink-0 text-slate-400" />
                <span>{school.location}</span>
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 leading-snug">
              {school.fullName}
            </p>
          </div>
        </div>

        {/* Quick Highlights Badge row */}
        {school.achievements && school.achievements.length > 0 && (
          <div className="my-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span className="truncate">{school.achievements[0]}</span>
          </div>
        )}

        {/* School Quick Stats */}
        <div className="grid grid-cols-3 gap-2 my-3 text-center text-xs">
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/70">
            <span className="text-[10px] text-slate-400 block">O'quvchilar</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{school.studentsCount}</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/70">
            <span className="text-[10px] text-slate-400 block">Ustozlar</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{school.teachersCount}</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/70">
            <span className="text-[10px] text-slate-400 block">Yutuqlar</span>
            <span className="font-bold text-blue-600 dark:text-blue-400">{school.olympiadWinnersCount} ta</span>
          </div>
        </div>
      </div>

      {/* Progress & Bottom Bar (Exact EduStats screenshot layout) */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 mt-2">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-xs flex items-center gap-1">
            <span>{school.positivePercent}%</span>
            <span className="font-medium text-[11px]">ijobiy baholash</span>
          </span>
          <span className="text-slate-400 dark:text-slate-500 text-xs font-medium">
            {school.reviewsCount} ta fikr
          </span>
        </div>

        {/* Smooth Animated Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden mb-3">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${school.positivePercent}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-emerald-500 h-2 rounded-full"
          />
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400 pt-1">
          <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1">
            Batafsil ma'lumot <ChevronRight className="w-3.5 h-3.5" />
          </span>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onOpenFeedbackForSchool(school);
            }}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
          >
            Fikr bildirish
          </button>
        </div>
      </div>
    </motion.div>
  );
};
