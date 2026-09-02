import React, { useState } from 'react';
import { Award, BookOpen, Building2, GraduationCap, Trophy } from 'lucide-react';
import { angorSchoolLogo as angorLogoImage } from '../assets/images/images';

interface SchoolEmblemProps {
  schoolName?: string;
  type?: 'Davlat' | 'Ixtisoslashgan' | 'Prezident' | 'Xususiy';
  logoImage?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showRays?: boolean;
}

export const SchoolEmblem: React.FC<SchoolEmblemProps> = ({
  schoolName = 'Angor 1-maktab',
  type = 'Davlat',
  logoImage,
  size = 'md',
  className = '',
  showRays = true
}) => {
  const [imgError, setImgError] = useState(false);

  const isAngor1 = schoolName.toLowerCase().includes('angor 1') || schoolName.toLowerCase().includes('1-maktab');
  const imageSource = logoImage || (isAngor1 ? angorLogoImage : undefined);

  // Size styling map
  const sizeClasses = {
    sm: 'w-10 h-10 rounded-xl',
    md: 'w-13 h-13 sm:w-14 sm:h-14 rounded-2xl',
    lg: 'w-20 h-20 sm:w-24 sm:h-24 rounded-3xl',
    xl: 'w-24 h-24 sm:w-32 sm:h-32 rounded-[2rem]'
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14'
  };

  return (
    <div className={`relative shrink-0 select-none ${className}`}>
      {/* Outer Glow / Radial Rings for XL & LG */}
      {showRays && (size === 'xl' || size === 'lg') && (
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/40 via-amber-500/20 to-indigo-600/40 rounded-[2.2rem] blur-md opacity-75 group-hover:opacity-100 transition duration-500" />
      )}

      {/* Main Emblem Container */}
      <div 
        className={`relative ${sizeClasses[size]} overflow-hidden border-2 border-white/25 shadow-xl flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white transform transition-transform group-hover:scale-105 duration-300`}
      >
        {imageSource && !imgError ? (
          <img
            src={imageSource}
            alt={schoolName}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          /* SVG Heraldic Emblem Fallback */
          <div className="w-full h-full flex flex-col items-center justify-center p-1.5 text-center bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 relative overflow-hidden">
            {/* Subtle Uzbek flag color accent ribbons */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-400 via-white to-emerald-400 opacity-80" />
            
            {type === 'Prezident' ? (
              <Trophy className={`${iconSizes[size]} text-amber-400 drop-shadow`} />
            ) : type === 'Ixtisoslashgan' ? (
              <Award className={`${iconSizes[size]} text-sky-400 drop-shadow`} />
            ) : isAngor1 ? (
              <div className="flex flex-col items-center justify-center">
                <span className="font-black text-amber-400 leading-none tracking-tighter" style={{ fontSize: size === 'xl' ? '2.5rem' : size === 'lg' ? '1.8rem' : size === 'md' ? '1.2rem' : '0.9rem' }}>
                  1
                </span>
                <span className="font-black uppercase tracking-widest text-[7px] text-sky-200 -mt-0.5">
                  MAKTAB
                </span>
              </div>
            ) : type === 'Xususiy' ? (
              <BookOpen className={`${iconSizes[size]} text-emerald-400 drop-shadow`} />
            ) : (
              <Building2 className={`${iconSizes[size]} text-blue-300 drop-shadow`} />
            )}

            {/* Bottom Emblem Ribbon */}
            {(size === 'lg' || size === 'xl') && (
              <span className="absolute bottom-1.5 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/30">
                Angor
              </span>
            )}
          </div>
        )}

        {/* Glossy Overlay Highlight */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none" />
      </div>
    </div>
  );
};
