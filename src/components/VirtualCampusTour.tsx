import React, { useState } from 'react';
import { 
  Building2, BookOpen, Monitor, Award, Activity, 
  FlaskConical, Sparkles, CheckCircle2, ChevronRight, Eye
} from 'lucide-react';
import { SchoolVideoEmbed } from './SchoolVideoEmbed';

interface Facility {
  id: string;
  name: string;
  category: string;
  description: string;
  equipment: string[];
  capacity: string;
  image: string;
  badge: string;
}

const ANGOR_FACILITIES: Facility[] = [
  {
    id: 'zakovat',
    name: 'Tuman "Zakovat" va Intellektual O\'yinlar Zali',
    category: 'Intellektual markaz',
    description: 'Angor tumanidagi barcha umumta\'lim maktablari o\'rtasida o\'tkaziladigan "Zakovat", "Breyn-ring" va "Munozara" turnirlari uchun maxsus moslashtirilgan akustik va elektron tabloli zali.',
    equipment: [
      '6 ta jamoa uchun elektron Zakovat tugmalari va chiroqlari',
      'Katta multimedia proyektori va akustik ovoz tizimi',
      'Turnir hakamlari va hisob-kitob kompyuter bazasi'
    ],
    capacity: '120 o\'rinli',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80',
    badge: 'Tuman Markazi'
  },
  {
    id: 'tarix',
    name: 'Tarix va Milliy Meros Kabineti',
    category: 'Fan kabineti',
    description: 'Vazir jamg\'armasi ustamasi sohiblari Fazliddin Kenjayev va Guliston Kuvatova tashabbusi bilan tashkil etilgan tarixiy muzey va interaktiv xarita burchagi.',
    equipment: [
      'Surxondaryo qadimiy obidalari va Dalvarzintepa xaritasi maketlari',
      'Interaktiv sensorli dars paneli va tarixiy hujjatlar arxivi',
      'Fan olimpiadasiga tayyorgarlik uchun maxsus kutubxona'
    ],
    capacity: '36 o\'rinli',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
    badge: 'Faxriy Ustozlar bazasi'
  },
  {
    id: 'stem',
    name: 'Aniq Fanlar va STEAM Laboratoriyasi',
    category: 'Laboratoriya',
    description: 'Al-Xorazmiy olimpiadasi murabbiyi Sherzod Norboyev rahbarligidagi fizika, kimyo va biologiya bo\'yicha amaliy tajribalar laboratoriyasi.',
    equipment: [
      'Optik mikroskoplar va kimyoviy reaktivlar to\'plami',
      'Fizika mexanika va elektronika amaliy konstruktorlari',
      'Laboratoriya xavfsizlik shkaflari va raqamli o\'lchov asboblari'
    ],
    capacity: '32 o\'rinli',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
    badge: 'Olimpiada bazasi'
  },
  {
    id: 'it',
    name: 'Zamonaviy Axborot Texnologiyalari (IT) Xonasi',
    category: 'Raqamli ta\'lim',
    description: 'O\'quvchilarga dasturlash, kompyuter savodxonligi, veb-dizayn va robototexnika asoslarini amaliy o\'rgatuvchi yuqori tezlikdagi internetga ulangan sinf.',
    equipment: [
      '24 dona zamonaviy monoblok kompyuterlar to\'plami',
      'Optik tolali yuqori tezlikdagi lokal internet tarmog\'i',
      'Arduino va robototexnika amaliy to\'plamlari'
    ],
    capacity: '24 o\'rinli',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    badge: 'Raqamli Maktab'
  },
  {
    id: 'kutubxona',
    name: 'Maktab Axborot-Resurs Kutubxonasi',
    category: 'Kutubxona',
    description: 'O\'quvchilar va ustozlar uchun 15,000 dan ortiq darslik, badiiy adabiyot, "Gulxan", "G\'uncha" jurnallari to\'plami hamda elektron kitoblar bazasi.',
    equipment: [
      '15,000+ jildlik kitob fondi',
      'Elektron o\'quv zali va audio kitoblar dasturi',
      'Ijodiy uchrashuvlar va kitobxonlik burchagi'
    ],
    capacity: '50 o\'rinli',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&auto=format&fit=crop&q=80',
    badge: 'Ziyo Maskani'
  },
  {
    id: 'sport',
    name: 'Yopiq Sport Majmuasi va Maydoncha',
    category: 'Sport & Salomatlik',
    description: 'Voleybol, basketbol, mini-futbol va kurash to\'garaklari uchun mo\'ljallangan yoritilgan sport zali.',
    equipment: [
      'Standart voleybol va basketbol maydoni',
      'Gimnastika to\'sinlari va gimnastika matlari',
      'Kurash va dzyudo bo\'yicha tuman musobaqalari tatamisi'
    ],
    capacity: '200 tomoshabin',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
    badge: 'Sog\'lom Avlod'
  }
];

interface VirtualCampusTourProps {
  isDarkMode: boolean;
}

export const VirtualCampusTour: React.FC<VirtualCampusTourProps> = ({ isDarkMode }) => {
  const [selectedFacility, setSelectedFacility] = useState<Facility>(ANGOR_FACILITIES[0]);

  return (
    <div className={`p-6 sm:p-8 rounded-3xl border ${
      isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
    }`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-blue-500/10 text-blue-600 dark:text-blue-400 font-extrabold text-xs px-2.5 py-1 rounded-full uppercase tracking-wider">
              Virtual Ekskursiya
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">Angor 1-maktab Sharoitlari va Xonalari</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Maktabning zamonaviy laboratoriyalari, Zakovat zali va ta'lim infratuzilmasi bilan tanishing
          </p>
        </div>
      </div>

      {/* Video Walkthrough Embed */}
      <div className="pt-6 pb-2">
        <SchoolVideoEmbed
          schoolName="Angor 1-maktab"
          defaultTitle="Angor 1-maktab — Kampus va ta'lim jarayoni videolavhalari"
          isDarkMode={isDarkMode}
          showPlaylist={true}
        />
      </div>

      <div className="grid lg:grid-cols-12 gap-6 pt-6">
        
        {/* Left: Navigation Buttons List */}
        <div className="lg:col-span-4 space-y-2">
          {ANGOR_FACILITIES.map((facility) => {
            const isSelected = selectedFacility.id === facility.id;
            return (
              <button
                key={facility.id}
                onClick={() => setSelectedFacility(facility)}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                    : isDarkMode 
                    ? 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800' 
                    : 'bg-slate-50/80 border-slate-200/80 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                  }`}>
                    {facility.id === 'zakovat' && <Award className="w-4 h-4" />}
                    {facility.id === 'tarix' && <BookOpen className="w-4 h-4" />}
                    {facility.id === 'stem' && <FlaskConical className="w-4 h-4" />}
                    {facility.id === 'it' && <Monitor className="w-4 h-4" />}
                    {facility.id === 'kutubxona' && <BookOpen className="w-4 h-4" />}
                    {facility.id === 'sport' && <Activity className="w-4 h-4" />}
                  </div>
                  <div className="truncate">
                    <h5 className="font-bold text-xs truncate">{facility.name}</h5>
                    <p className={`text-[11px] truncate ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                      {facility.category}
                    </p>
                  </div>
                </div>

                <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
              </button>
            );
          })}
        </div>

        {/* Right: Detailed Facility Preview Card */}
        <div className={`lg:col-span-8 p-6 rounded-2xl border flex flex-col justify-between ${
          isDarkMode ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50/60 border-slate-200/80'
        }`}>
          
          <div className="space-y-4">
            {/* Visual Photo with Badge */}
            <div className="h-64 sm:h-72 w-full rounded-2xl overflow-hidden relative shadow-md">
              <img 
                src={selectedFacility.image} 
                alt={selectedFacility.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {selectedFacility.badge}
                </span>
                <span className="bg-white/20 backdrop-blur-md text-white font-bold text-xs px-3 py-1 rounded-full">
                  Sig'imi: {selectedFacility.capacity}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl sm:text-2xl font-black drop-shadow-md">
                  {selectedFacility.name}
                </h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedFacility.description}
            </p>

            {/* Equipment & Highlights */}
            <div className="space-y-2 pt-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                Xona jihozlari va afzalliklari:
              </h4>
              <div className="grid sm:grid-cols-2 gap-2">
                {selectedFacility.equipment.map((eq, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="font-medium text-slate-700 dark:text-slate-200">{eq}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
