import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Building2, Trophy, Star, CheckCircle2, ArrowRight, Award, Users, BookOpen } from 'lucide-react';
import { School } from '../types';
import { SchoolEmblem } from './SchoolEmblem';

interface SchoolCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  schools: School[];
  defaultSchoolA?: School;
  isDarkMode: boolean;
}

export const SchoolCompareModal: React.FC<SchoolCompareModalProps> = ({
  isOpen,
  onClose,
  schools,
  defaultSchoolA,
  isDarkMode
}) => {
  const [schoolAId, setSchoolAId] = useState<number>(defaultSchoolA ? defaultSchoolA.id : 1);
  const [schoolBId, setSchoolBId] = useState<number>(2);

  if (!isOpen) return null;

  const schoolA = schools.find(s => s.id === schoolAId) || schools[0];
  const schoolB = schools.find(s => s.id === schoolBId) || schools[1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className={`relative w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg">Maktablarni Solishtirish Matritsasi</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Ko'rsatkichlar, ustozlar salohiyati va yutuqlarni yonma-yon solishtiring</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable comparison body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Selectors Bar */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">1-Maktab:</label>
              <select
                value={schoolAId}
                onChange={(e) => setSchoolAId(Number(e.target.value))}
                className={`w-full p-3 rounded-xl border text-xs font-bold ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              >
                {schools.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.region})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">2-Maktab:</label>
              <select
                value={schoolBId}
                onChange={(e) => setSchoolBId(Number(e.target.value))}
                className={`w-full p-3 rounded-xl border text-xs font-bold ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              >
                {schools.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.region})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparison Cards Grid */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* School A Header Card */}
            <div className={`p-4 rounded-2xl border flex flex-col items-center text-center ${
              isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-blue-50/50 border-blue-100'
            }`}>
              <SchoolEmblem
                schoolName={schoolA.name}
                type={schoolA.type}
                logoImage={schoolA.logoImage}
                size="md"
                showRays={false}
                className="mb-2"
              />
              <span className="text-xs font-bold text-blue-600 uppercase">{schoolA.type} maktab</span>
              <h4 className="text-base font-black mt-0.5">{schoolA.name}</h4>
              <p className="text-[11px] text-slate-500">{schoolA.district}, {schoolA.region}</p>
            </div>

            {/* School B Header Card */}
            <div className={`p-4 rounded-2xl border flex flex-col items-center text-center ${
              isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-indigo-50/50 border-indigo-100'
            }`}>
              <SchoolEmblem
                schoolName={schoolB.name}
                type={schoolB.type}
                logoImage={schoolB.logoImage}
                size="md"
                showRays={false}
                className="mb-2"
              />
              <span className="text-xs font-bold text-indigo-600 uppercase">{schoolB.type} maktab</span>
              <h4 className="text-base font-black mt-0.5">{schoolB.name}</h4>
              <p className="text-[11px] text-slate-500">{schoolB.district}, {schoolB.region}</p>
            </div>

          </div>

          {/* Metric Comparison Rows */}
          <div className="space-y-3">
            {[
              { 
                label: "Ijobiy jamoat baholashi", 
                valA: `${schoolA.positivePercent}%`, 
                valB: `${schoolB.positivePercent}%`,
                isBetterA: schoolA.positivePercent >= schoolB.positivePercent
              },
              { 
                label: "O'quvchilar soni", 
                valA: `${schoolA.studentsCount} nafar`, 
                valB: `${schoolB.studentsCount} nafar`,
                isBetterA: schoolA.studentsCount >= schoolB.studentsCount
              },
              { 
                label: "Pedagoglar soni", 
                valA: `${schoolA.teachersCount} nafar`, 
                valB: `${schoolB.teachersCount} nafar`,
                isBetterA: schoolA.teachersCount >= schoolB.teachersCount
              },
              { 
                label: "Olimpiada va Zakovat g'oliblari", 
                valA: `${schoolA.olympiadWinnersCount} ta`, 
                valB: `${schoolB.olympiadWinnersCount} ta`,
                isBetterA: schoolA.olympiadWinnersCount >= schoolB.olympiadWinnersCount
              },
              { 
                label: "Ta'lim sifati (5 ballik)", 
                valA: `${schoolA.ratingBreakdown.education} / 5.0`, 
                valB: `${schoolB.ratingBreakdown.education} / 5.0`,
                isBetterA: schoolA.ratingBreakdown.education >= schoolB.ratingBreakdown.education
              },
              { 
                label: "Ustozlar salohiyati (5 ballik)", 
                valA: `${schoolA.ratingBreakdown.teachers} / 5.0`, 
                valB: `${schoolB.ratingBreakdown.teachers} / 5.0`,
                isBetterA: schoolA.ratingBreakdown.teachers >= schoolB.ratingBreakdown.teachers
              }
            ].map((metric, idx) => (
              <div 
                key={idx}
                className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs font-semibold ${
                  isDarkMode ? 'bg-slate-800/30 border-slate-800' : 'bg-slate-50/70 border-slate-200/70'
                }`}
              >
                <span className={`w-1/3 text-center font-black ${metric.isBetterA ? 'text-emerald-500' : 'text-slate-500'}`}>
                  {metric.valA}
                </span>

                <span className="w-1/3 text-center text-slate-400 font-medium text-[11px]">
                  {metric.label}
                </span>

                <span className={`w-1/3 text-center font-black ${!metric.isBetterA ? 'text-emerald-500' : 'text-slate-500'}`}>
                  {metric.valB}
                </span>
              </div>
            ))}
          </div>

          {/* Vazir jamg'armasi ustamasi highlight */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs">
            <div className="flex items-center gap-2 font-bold text-amber-700 dark:text-amber-400 mb-1">
              <Award className="w-4 h-4" />
              <span>Vazir jamg'armasi 100% ustamasi:</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              Angor 1-maktabi 2 nafar Vazir jamg'armasi oylik ustamasiga ega tarix fani o'qituvchilari (Fazliddin Kenjayev va Guliston Kuvatova) bilan tumanda mutlaq peshqadam hisoblanadi.
            </p>
          </div>

        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
          >
            Tushunarli
          </button>
        </div>

      </div>
    </div>
  );
};
