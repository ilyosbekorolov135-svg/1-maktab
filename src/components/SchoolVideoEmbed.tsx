import React, { useState, useRef } from 'react';
import { 
  Play, Pause, Maximize2, Sparkles, 
  Video, Film, Trophy, ExternalLink,
  Clock, Calendar, Share2, Layers, CheckCircle2,
  Tv, Eye
} from 'lucide-react';
import { SchoolVideo } from '../types';
import { formatUzbekDate } from '../utils/dateUtils';

interface SchoolVideoEmbedProps {
  videos?: SchoolVideo[];
  schoolName: string;
  defaultTitle?: string;
  isDarkMode?: boolean;
  className?: string;
  showPlaylist?: boolean;
}

export const SchoolVideoEmbed: React.FC<SchoolVideoEmbedProps> = ({
  videos,
  schoolName,
  defaultTitle = "Rasmiy videolavhalar va virtual ekskursiya",
  isDarkMode = false,
  className = "",
  showPlaylist = true
}) => {
  const fallbackVideos: SchoolVideo[] = [
    {
      id: 'v_yosh_dasturchilar',
      title: "Yosh dasturchilar va robototexniklar ko'rigi",
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000&auto=format&fit=crop&q=80',
      category: 'Tadbir',
      duration: '1:38 daq',
      description: "Angor 1-maktabining IT va robototexnika to'garagi o'quvchilari — yosh ixtirochilar va dasturchilar faoliyati haqida MY5 telekanali 'Hudud' dasturida maxsus lavha.",
      date: '2026-08-25'
    },
    {
      id: 'v1',
      title: "Angor 1-maktab — Kampus bo'ylab 3D Virtual Ekskursiya",
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1000&auto=format&fit=crop&q=80',
      category: 'Virtual Tur',
      duration: '4:20 daq',
      description: "Maktab binosi, zamonaviy jihozlangan sinfxonalar, axborot-resurs markazi, sport majmuasi va faollar zali bo'ylab to'liq video tanishtiruv.",
      date: '2026-08-20'
    },
    {
      id: 'v2',
      title: "Tuman \"Zakovat\" intellektual turniri va g'oliblik shukuhi",
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1000&auto=format&fit=crop&q=80',
      category: 'Zakovat',
      duration: '3:15 daq',
      description: "Angor tuman maktablari o'rtasida o'tkazilgan intellektual turnir, murosasiz savol-javoblar va faxrli 1-o'rin sohiblarini taqdirlash marosimi.",
      date: '2026-08-15'
    },
    {
      id: 'v3',
      title: "STEAM va Fan laboratoriyalarida amaliy darslar",
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1000&auto=format&fit=crop&q=80',
      category: 'Dars jarayoni',
      duration: '2:45 daq',
      description: "Kimyo, biologiya va fizika fanlaridan laboratoriya tajribalari hamda o'quvchilarning mustaqil ilmiy izlanishlari jarayoni.",
      date: '2026-08-10'
    },
    {
      id: 'v_insta_surxon',
      title: 'Surxon Kelajak Markazi — Jonli efir va yangiliklar',
      url: 'https://www.instagram.com/surxon_kelajak_markazi?igsh=MXkxdTFmcWU5MGVncg%3D%3D&utm_source=qr',
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&auto=format&fit=crop&q=80',
      category: 'Virtual Tur',
      duration: 'Instagram',
      description: "Surxon Kelajak Markazi rasmiy sahifasi orqali maktabimizdagi zamonaviy ta'lim jarayonlari, to'garaklar va e'lonlarni kuzating.",
      date: '2026-08-05'
    }
  ];

  const activeVideoList = (videos && videos.length > 0) ? videos : fallbackVideos;
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('Barchasi');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const currentVideo = activeVideoList[selectedVideoIndex] || activeVideoList[0];

  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
      let videoId = '';
      if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
      } else if (url.includes('v=')) {
        videoId = url.split('v=')[1]?.split('&')[0] || '';
      }
      return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
    }
    return null;
  };

  const youtubeEmbedUrl = getEmbedUrl(currentVideo.url);
  const isDirectVideo = !youtubeEmbedUrl;

  const handlePlayClick = () => {
    if (currentVideo.url.includes('instagram.com')) {
      window.open(currentVideo.url, '_blank');
      return;
    }
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleSelectVideo = (index: number) => {
    setSelectedVideoIndex(index);
    if (activeVideoList[index].url.includes('instagram.com')) {
      setIsPlaying(false);
      return;
    }
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'Virtual Tur':
        return 'bg-blue-600 text-white';
      case 'Zakovat':
        return 'bg-purple-600 text-white';
      case 'Tadbir':
        return 'bg-emerald-600 text-white';
      case 'Dars jarayoni':
        return 'bg-amber-600 text-white';
      default:
        return 'bg-indigo-600 text-white';
    }
  };

  const filteredVideos = selectedFilter === 'Barchasi' 
    ? activeVideoList 
    : activeVideoList.filter(v => v.category === selectedFilter);

  const categories = ['Barchasi', ...Array.from(new Set(activeVideoList.map(v => v.category)))];

  return (
    <div className={`space-y-6 ${className}`}>
      
      {/* Top Header with title and filter pills */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-blue-200 dark:border-blue-800">
              <Tv className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              Maktab Media Markazi
            </span>
            <span className="text-[11px] font-bold text-slate-400">
              • {activeVideoList.length} ta rasmiy videolavha
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {defaultTitle}
          </h3>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedFilter === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : isDarkMode
                    ? 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Cinematic Video Player */}
      <div className="relative group">
        <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-blue-600/30 via-indigo-600/20 to-purple-600/30 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity -z-10" />

        <div className="relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex items-center justify-center">
          
          {/* Top Overlay Badge Bar */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg backdrop-blur-md ${getCategoryBadge(currentVideo.category)}`}>
                {currentVideo.category}
              </span>
              {currentVideo.duration && (
                <span className="bg-slate-950/85 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5 shadow-md">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {currentVideo.duration}
                </span>
              )}
            </div>

            <div className="pointer-events-auto flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2.5 rounded-xl bg-slate-900/85 hover:bg-slate-800 text-white backdrop-blur-md border border-white/10 transition-all shadow-md active:scale-95"
                title="Ulashish"
              >
                {copiedLink ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>
              {isDirectVideo && (
                <button
                  onClick={handleFullscreen}
                  className="p-2.5 rounded-xl bg-slate-900/85 hover:bg-slate-800 text-white backdrop-blur-md border border-white/10 transition-all shadow-md active:scale-95"
                  title="To'liq ekranda ko'rish"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              )}
              <a
                href={currentVideo.url}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900/85 hover:bg-slate-800 text-white backdrop-blur-md border border-white/10 transition-all shadow-md active:scale-95"
                title="Tashqi manbada ochish"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* YouTube Embed Player */}
          {youtubeEmbedUrl && isPlaying ? (
            <iframe
              src={youtubeEmbedUrl}
              title={currentVideo.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : isDirectVideo ? (
            /* HTML5 Native Video Player */
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              <video
                ref={videoRef}
                src={currentVideo.url.includes('instagram.com') ? undefined : currentVideo.url}
                poster={currentVideo.thumbnail || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1000&auto=format&fit=crop&q=80'}
                controls={isPlaying}
                playsInline
                className="w-full h-full object-cover"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Custom Play Poster Overlay when not playing */}
              {!isPlaying && (
                <div 
                  onClick={handlePlayClick}
                  className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent hover:via-slate-950/30 transition-colors flex flex-col items-center justify-center cursor-pointer p-6 text-center group/overlay"
                >
                  {/* Pulsing Play Button */}
                  <div className="relative mb-4">
                    <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center shadow-2xl shadow-blue-500/50 transform group-hover/overlay:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white ml-1.5" />
                    </div>
                    <div className="absolute -inset-3 rounded-full border-2 border-blue-400/40 animate-ping pointer-events-none" />
                  </div>

                  <div className="max-w-xl space-y-2">
                    <h4 className="text-white font-black text-base sm:text-xl drop-shadow-md leading-tight">
                      {currentVideo.title}
                    </h4>
                    <p className="text-slate-300 text-xs sm:text-sm line-clamp-2 drop-shadow-sm font-medium">
                      {currentVideo.description || (currentVideo.url.includes('instagram.com') ? "Instagram rasmiy sahifasida ochish" : "Videoni tomosha qilish uchun bosing")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* YouTube Cover Before Play */
            <div 
              onClick={handlePlayClick}
              className="relative w-full h-full flex items-center justify-center cursor-pointer group/yt"
            >
              <img
                src={currentVideo.thumbnail || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1000&auto=format&fit=crop&q=80'}
                alt={currentVideo.title}
                className="w-full h-full object-cover group-hover/yt:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50 group-hover/yt:bg-black/40 transition-colors flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-2xl transform group-hover/yt:scale-110 transition-transform">
                  <Play className="w-8 h-8 fill-white ml-1" />
                </div>
                <h4 className="text-white font-black text-lg mt-4 drop-shadow-md">{currentVideo.title}</h4>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Selected Video Information Banner */}
      <div className={`p-5 sm:p-6 rounded-3xl border transition-all ${
        isDarkMode ? 'bg-slate-900/90 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200/90 text-slate-700'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md ${getCategoryBadge(currentVideo.category)}`}>
                {currentVideo.category}
              </span>
              <span className="text-xs font-bold text-slate-400">
                {schoolName} axborot xizmati
              </span>
            </div>
            <h4 className="font-black text-base sm:text-lg text-slate-900 dark:text-white leading-snug">
              {currentVideo.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {currentVideo.description}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200 dark:border-slate-800">
            {currentVideo.date && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span>{formatUzbekDate(currentVideo.date)}</span>
              </div>
            )}
            {currentVideo.duration && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>{currentVideo.duration}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Video Playlist Switcher (Grid cards) */}
      {showPlaylist && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Film className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Barcha videolavhalar ro'yxati ({filteredVideos.length})
            </span>
            <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400">
              Tomosha qilish uchun tanlang
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredVideos.map((item) => {
              const originalIndex = activeVideoList.findIndex(v => v.id === item.id);
              const isSelected = originalIndex === selectedVideoIndex;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectVideo(originalIndex >= 0 ? originalIndex : 0)}
                  className={`group/card p-3 rounded-2xl border text-left cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 dark:border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                      : isDarkMode
                        ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                        : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50/80'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Thumbnail box */}
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950">
                      <img 
                        src={item.thumbnail || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop&q=80'} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          // Fallback in case of broken image URL
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-slate-950/30 group-hover/card:bg-slate-950/10 transition-colors flex items-center justify-center">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover/card:scale-110 ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-white/90 text-slate-950 backdrop-blur-xs'
                        }`}>
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        </div>
                      </div>

                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-bold text-white pointer-events-none">
                        <span className="bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded-md">
                          {item.category}
                        </span>
                        {item.duration && (
                          <span className="bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded-md">
                            {item.duration}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Text Details */}
                    <div>
                      <h5 className={`font-black text-xs sm:text-sm line-clamp-2 transition-colors ${
                        isSelected 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-slate-900 dark:text-white group-hover/card:text-blue-600 dark:group-hover/card:text-blue-400'
                      }`}>
                        {item.title}
                      </h5>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                    <span>{formatUzbekDate(item.date)}</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1 group-hover/card:translate-x-0.5 transition-transform">
                      {isSelected ? "Hozir ijroda" : "Ko'rish"} &rarr;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
