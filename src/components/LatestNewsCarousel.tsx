import React, { useRef, useState } from 'react';
import { 
  ChevronLeft, ChevronRight, Calendar, ArrowRight, 
  Sparkles, BookOpen, Clock, X, Share2, CheckCircle2, UserCheck
} from 'lucide-react';
import { formatUzbekDate } from '../utils/dateUtils';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  author: string;
  imageUrl: string;
  category: string;
  badgeColor: string;
}

const NEWS_DATA: NewsItem[] = [
  {
    id: '1',
    title: "1-Maktabda \"Zukko Kitobxon\" umumtuman ko'rik-tanlovi o'tkazildi",
    excerpt: "O'quvchilar o'rtasida kitobxonlik madaniyatini yuksaltirish va mumtoz asarlarni targ'ib qilish maqsadida yuqori sinf o'quvchilari bellashuvi bo'lib o'tdi.",
    content: "Surxondaryo viloyati Angor tumani 1-sonli umumta'lim maktabida Yoshlar ishlari agentligi va tuman Axborot-kutubxona markazi bilan hamkorlikda 'Zukko Kitobxon' intellektual tanlovi tashkil etildi. Bellashuv 3 ta asosiy shart asosida o'tkazilib, unda o'quvchilar o'zbek va jahon adabiyotining durdona asarlari bo'yicha o'z bilimlarini sinovdan o'tkazdilar. Yakunda g'olib deb topilgan faol o'quvchilar esdalik sovg'alari va faxriy yorliqlar bilan taqdirlandi.",
    date: '2026-08-25',
    readTime: '2 daq',
    author: 'Shoxista Madiyeva (Adabiyot to\'garagi)',
    imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1000',
    category: "Ma'naviy-ma'rifiy",
    badgeColor: 'bg-blue-600 text-white'
  },
  {
    id: '2',
    title: "Fan olimpiadasi viloyat bosqichida maktabimiz o'quvchilari mutlaq peshqadam",
    excerpt: "Fizika, Tarix va Matematika fanlaridan o'tkazilgan viloyat olimpiadasida 3 nafar o'quvchimiz 1-o'rinni egallab, respublika bosqichiga yo'llanma oldi.",
    content: "Surxondaryo viloyat maktabgacha va maktab ta'limi boshqarmasi tomonidan o'tkazilgan asosiy fan olimpiadasining viloyat bosqichida Angor 1-maktabi o'quvchilari rekord darajadagi natijalarni qayd etishdi. Xususan, tarix fanidan Fazliddin Kenjayev va Guliston Kuvatova shogirdlari birinchi o'rinni egallashdi. Bu yutuq maktab pedagogik jamoasining yuqori professional salohiyatidan dalolat beradi.",
    date: '2026-08-22',
    readTime: '3 daq',
    author: 'Maktab Ilmiy mudiri',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000',
    category: "Ta'lim & Olimpiada",
    badgeColor: 'bg-emerald-600 text-white'
  },
  {
    id: '3',
    title: "Zamonaviy sun'iy intellekt va robototexnika laboratoriyasi ochildi",
    excerpt: "Maktabimizda zamonaviy kompyuterlar, 3D printerlar va Arduino robototexnika to'plamlari bilan jihozlangan yangi IT innovatsiya markazi ishga tushirildi.",
    content: "Raqamli texnologiyalar vazirligi va maktab ma'muriyati ko'magida Angor 1-maktabida yangi avlod STEAM va Sun'iy intellekt xonasi tantanali ravishda foydalanishga topshirildi. Endilikda o'quvchilar Python, Web dasturlash, algoritmika hamda mikrokontrollerlar bilan ishlash bo'yicha bepul to'garaklarda qatnashib, o'z startap loyihalarini yaratish imkoniga egadirlar.",
    date: '2026-08-20',
    readTime: '2 daq',
    author: 'Jamshid Rahimov (IT to\'garagi)',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1000',
    category: 'Innovatsiya & IT',
    badgeColor: 'bg-purple-600 text-white'
  },
  {
    id: '4',
    title: "Tuman sport musobaqalarida faxrli sovrindorlar",
    excerpt: "O'quvchilar o'rtasida sog'lom turmush tarzini targ'ib qilishga qaratilgan 'Besh tashabbus olimpiadasi' mini-futbol bahslarida maktabimiz terma jamoasi sovrindor bo'ldi.",
    content: "Angor tumani sport majmuasida maktablar o'rtasida o'tkazilgan mini-futbol va shaxmat-shashka musobaqalarida 1-maktab terma jamoasi barcha o'yinlarda yuqori mahorat va jipslik ko'rsatib, faxrli o'rinlarni zabt etdi. G'oliblarga diplom va qimmatbaho sport anjomlari topshirildi.",
    date: '2026-08-18',
    readTime: '2 daq',
    author: 'Jismoniy tarbiya fani kafedrasi',
    imageUrl: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=1000',
    category: 'Sport',
    badgeColor: 'bg-amber-600 text-white'
  },
  {
    id: '5',
    title: "\"Ochiq eshiklar kuni\" va ota-onalar forumi o'tkazildi",
    excerpt: "Ota-onalar farzandlarining dars jarayonlarida bevosita ishtirok etib, yangi o'quv yili rejalari va to'garaklar faoliyati bilan tanishdilar.",
    content: "Maktab va oila hamkorligini mustahkamlash maqsadida tashkil etilgan forumda 200 dan ortiq ota-onalar, mahalla faollari va faxriy o'qituvchilar ishtirok etishdi. Direktor Rustam Qobilov o'quvchilar xavfsizligi, darsliklar ta'minoti va zamonaviy baholash tizimi yuzasidan batafsil axborot berdi.",
    date: '2026-08-15',
    readTime: '3 daq',
    author: 'Maktab Ma\'muriyati',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1000',
    category: 'Jamoatchilik',
    badgeColor: 'bg-indigo-600 text-white'
  }
];

export const LatestNewsCarousel: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth + 60 : scrollLeft + clientWidth - 60;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className={`p-6 sm:p-8 rounded-3xl border overflow-hidden relative ${
      isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
    }`}>
      
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800 flex items-center gap-1.5">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Maktab Axborot Xizmati
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            So'nggi Yangiliklar va Voqealar
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
            Angor 1-maktabining eng so'nggi tadbirlari, yutuqlari va e'lonlari
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => scroll('left')}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all active:scale-95 ${
              isDarkMode 
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
            }`}
            aria-label="Oldingi yangilik"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all active:scale-95 ${
              isDarkMode 
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
            }`}
            aria-label="Keyingi yangilik"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Carousel Cards Container */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 sm:gap-6 pb-4 snap-x snap-mandatory no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {NEWS_DATA.map((news) => (
          <div 
            key={news.id} 
            onClick={() => setSelectedNews(news)}
            className={`group min-w-[280px] w-[280px] sm:min-w-[340px] sm:w-[340px] rounded-3xl overflow-hidden snap-start shrink-0 cursor-pointer border transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between ${
              isDarkMode 
                ? 'bg-slate-950 border-slate-800 hover:border-blue-500/50 shadow-slate-950/40' 
                : 'bg-white border-slate-200 hover:border-blue-300 shadow-slate-200/50'
            }`}
          >
            <div>
              {/* Image banner */}
              <div className="h-44 overflow-hidden relative bg-slate-900">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent z-10" />
                <img 
                  src={news.imageUrl} 
                  alt={news.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=80';
                  }}
                />
                <span className={`absolute top-3.5 left-3.5 z-20 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-xl shadow-md ${news.badgeColor}`}>
                  {news.category}
                </span>

                <span className="absolute bottom-3 right-3 z-20 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  {news.readTime}
                </span>
              </div>
              
              {/* Content body */}
              <div className="p-5 space-y-2.5">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-blue-500" />
                  <span>{formatUzbekDate(news.date)}</span>
                </div>
                
                <h3 className={`font-black text-sm sm:text-base line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {news.title}
                </h3>
                
                <p className={`text-xs leading-relaxed line-clamp-2 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {news.excerpt}
                </p>
              </div>
            </div>

            {/* Read more footer */}
            <div className="px-5 pb-5 pt-2">
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                <span className="group-hover:underline">Batafsil o'qish</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DETAILED ARTICLE MODAL ================= */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden my-8 ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            
            {/* Modal Header Image */}
            <div className="h-56 sm:h-64 relative bg-slate-950">
              <img 
                src={selectedNews.imageUrl} 
                alt={selectedNews.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              
              <button
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-950/80 hover:bg-slate-900 text-white flex items-center justify-center transition-all active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1.5">
                <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-md ${selectedNews.badgeColor}`}>
                  {selectedNews.category}
                </span>
                <h3 className="font-black text-lg sm:text-xl leading-snug drop-shadow-md">
                  {selectedNews.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-3 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                    {formatUzbekDate(selectedNews.date)}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    {selectedNews.readTime}
                  </span>
                </div>
                <span className="text-slate-600 dark:text-slate-300 font-medium">
                  {selectedNews.author}
                </span>
              </div>

              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-3 font-normal">
                <p className="font-medium text-slate-900 dark:text-white">
                  {selectedNews.excerpt}
                </p>
                <p>
                  {selectedNews.content}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={handleShare}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition-all flex items-center gap-2"
                >
                  {copiedLink ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                  <span>{copiedLink ? "Havola nusxalandi!" : "Yangilikni ulashish"}</span>
                </button>

                <button
                  onClick={() => setSelectedNews(null)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all active:scale-95"
                >
                  Yopish
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
