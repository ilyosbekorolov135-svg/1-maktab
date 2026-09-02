import React, { useState } from 'react';
import { Trophy, Award, Medal, Star, CheckCircle, Sparkles, Filter, Search } from 'lucide-react';
import { School, OlympiadWinner } from '../types';

interface OlympiadLeaderboardProps {
  schools: School[];
  olympiadWinners: OlympiadWinner[];
  isDarkMode: boolean;
  onSelectSchool: (school: School) => void;
}

export const OlympiadLeaderboard: React.FC<OlympiadLeaderboardProps> = ({
  schools,
  olympiadWinners,
  isDarkMode,
  onSelectSchool
}) => {
  const [activeTab, setActiveTab] = useState<'maktablar' | 'olimpiadachilar' | 'zakovat'>('maktablar');
  const [filterRegion, setFilterRegion] = useState<string>('Barchasi');

  const sortedSchools = [...schools].sort((a, b) => b.positivePercent - a.positivePercent);

  const filteredSchools = filterRegion === 'Barchasi' 
    ? sortedSchools 
    : sortedSchools.filter(s => s.region === filterRegion);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className={`p-8 rounded-3xl border ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-lg'
      }`}>
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5" />
            Milliy Ta'lim Reytingi 2024-2025
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-2">
            Maktablar, Fan Olimpiadalari va Zakovat Reytingi
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            O'zbekiston umumta'lim, ixtisoslashgan va Prezident maktablarining o'quvchilar yutuqlari, OTMga kirish foizlari hamda ochiq ijtimoiy baholash natijalari.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex gap-2 mt-6 overflow-x-auto pb-1">
          {[
            { id: 'maktablar', label: 'Maktablar Top Reytingi' },
            { id: 'olimpiadachilar', label: 'Fan Olimpiadalari G\'oliblari' },
            { id: 'zakovat', label: 'Zakovat Intellektual Turniri' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* View 1: Top Schools Table */}
      {activeTab === 'maktablar' && (
        <div className={`rounded-3xl border p-6 ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 className="font-black text-lg">Maktablar Umumiy Reytingi</h3>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">Hudud:</span>
              <select
                value={filterRegion}
                onChange={(e) => setFilterRegion(e.target.value)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl border ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <option value="Barchasi">Barcha viloyatlar</option>
                <option value="Surxondaryo">Surxondaryo viloyati</option>
                <option value="Toshkent">Toshkent shahri</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
                  <th className="pb-3 font-bold">O'rin</th>
                  <th className="pb-3 font-bold">Maktab nomi</th>
                  <th className="pb-3 font-bold">Turi & Hudud</th>
                  <th className="pb-3 font-bold text-center">Ijobiy Baho</th>
                  <th className="pb-3 font-bold text-center">OTMga Kirish</th>
                  <th className="pb-3 font-bold text-center">Olimpiadachilar</th>
                  <th className="pb-3 font-bold text-right">Amal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {filteredSchools.map((school, index) => (
                  <tr key={school.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-4">
                      <span className={`w-7 h-7 rounded-lg inline-flex items-center justify-center font-black text-xs ${
                        index === 0 ? 'bg-amber-100 text-amber-900 dark:bg-amber-900 dark:text-amber-200' :
                        index === 1 ? 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200' :
                        index === 2 ? 'bg-orange-100 text-orange-900 dark:bg-orange-900 dark:text-orange-200' :
                        'text-slate-400'
                      }`}>
                        #{index + 1}
                      </span>
                    </td>
                    <td className="py-4 font-bold text-slate-900 dark:text-white">
                      <div>{school.name}</div>
                      <div className="text-[11px] text-slate-400 font-normal truncate max-w-xs">{school.fullName}</div>
                    </td>
                    <td className="py-4">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 text-[10px] font-bold">
                        {school.type}
                      </span>
                      <div className="text-[11px] text-slate-400 mt-0.5">{school.region}</div>
                    </td>
                    <td className="py-4 text-center">
                      <span className="font-black text-emerald-600 dark:text-emerald-400">{school.positivePercent}%</span>
                      <div className="text-[10px] text-slate-400">{school.reviewsCount} fikr</div>
                    </td>
                    <td className="py-4 text-center font-bold text-blue-600 dark:text-blue-400">
                      {school.higherEducationAdmissionRate}%
                    </td>
                    <td className="py-4 text-center font-bold text-slate-700 dark:text-slate-300">
                      {school.olympiadWinnersCount} nafar
                    </td>
                    <td className="py-4 text-right">
                      <button 
                        onClick={() => onSelectSchool(school)}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 dark:text-blue-400 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60"
                      >
                        Profil &rarr;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* View 2: Fan Olimpiadalari G'oliblari */}
      {activeTab === 'olimpiadachilar' && (
        <div className="grid md:grid-cols-2 gap-6">
          {olympiadWinners.map((winner) => (
            <div 
              key={winner.id}
              className={`p-6 rounded-2xl border flex items-start gap-4 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-300 flex items-center justify-center font-bold shrink-0">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-black text-base text-slate-900 dark:text-white">{winner.studentName}</h4>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">{winner.schoolName} • {winner.grade}</p>
                  </div>
                  <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-200">
                    {winner.place}
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <div><strong>Fan:</strong> {winner.subject}</div>
                  <div><strong>Musobaqa:</strong> {winner.competition} ({winner.year})</div>
                  <div><strong>Ustoz murabbiy:</strong> {winner.teacherName}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View 3: Zakovat intellektual turniri */}
      {activeTab === 'zakovat' && (
        <div className={`p-8 rounded-3xl border space-y-6 ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black">Tuman va Viloyat "Zakovat" Intellektual Turniri</h3>
              <p className="text-xs text-slate-500">Angor 1-maktabi ushbu musobaqalarning tayanch mezbon markazi hisoblanadi.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-400 block mb-1">Turnir mezbon maktabi</span>
              <p className="text-base font-black text-slate-900 dark:text-white">Angor 1-maktab</p>
              <p className="text-[11px] text-slate-500 mt-1">Shoxista Madiyeva tashabbusi bilan</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-400 block mb-1">Ishtirokchi jamoalar</span>
              <p className="text-base font-black text-blue-600">28 ta maktab jamoasi</p>
              <p className="text-[11px] text-slate-500 mt-1">Tuman bosqichi ishtirokchilari</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-400 block mb-1">Eng faol bilimdonlar</span>
              <p className="text-base font-black text-emerald-600">Angor 1-maktab jamoasi</p>
              <p className="text-[11px] text-slate-500 mt-1">1-o'rin sohibi</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
