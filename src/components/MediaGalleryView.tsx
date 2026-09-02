import React, { useState } from 'react';
import { 
  Image as ImageIcon, Video, Plus, Play, Calendar, User, 
  ExternalLink, Maximize2, X, Download, HelpCircle, Eye, Sparkles
} from 'lucide-react';
import { MediaItem } from '../types';
import { AddMediaModal } from './AddMediaModal';
import { formatUzbekDate } from '../utils/dateUtils';

interface MediaGalleryViewProps {
  mediaItems: MediaItem[];
  onAddMedia: (item: MediaItem) => void;
  isDarkMode: boolean;
}

export const MediaGalleryView: React.FC<MediaGalleryViewProps> = ({
  mediaItems,
  onAddMedia,
  isDarkMode
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Barchasi');
  const [selectedType, setSelectedType] = useState<'all' | 'image' | 'video'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeMediaPreview, setActiveMediaPreview] = useState<MediaItem | null>(null);
  const [showGuide, setShowGuide] = useState(false);

  const categories = ['Barchasi', 'Tadbir', 'Dars jarayoni', 'Zakovat', 'Olimpiada', 'Sport', 'Umumiy'];

  const filteredMedia = mediaItems.filter(item => {
    const matchesCategory = selectedCategory === 'Barchasi' || item.category === selectedCategory;
    const matchesType = selectedType === 'all' || item.type === selectedType;
    return matchesCategory && matchesType;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header & Controls Bar */}
      <div className={`p-6 rounded-3xl border ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Angor 1-maktab Rasm va Video Galereyasi
              </h2>
              <span className="bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 text-xs font-black px-2.5 py-0.5 rounded-full">
                {mediaItems.length} ta lavha
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Maktab hayoti, bayram tantanalari, Zakovat bellashuvlari va fan to'garaklaridan olingan fotosuratlar hamda videolavhalar.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold flex items-center gap-2 transition-all"
            >
              <HelpCircle className="w-4 h-4 text-blue-500" />
              <span>Qo'shish bo'yicha qo'llanma</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/25 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Rasm yoki Video qo'shish</span>
            </button>
          </div>

        </div>

        {/* Informative Guide Drawer */}
        {showGuide && (
          <div className="mt-5 p-5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-sm text-blue-900 dark:text-blue-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Rasm va video qanday qo'shiladi? (2 xil qulay usul)
              </h4>
              <button 
                onClick={() => setShowGuide(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 text-slate-700 dark:text-slate-300">
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/50 space-y-1">
                <strong className="text-blue-600 dark:text-blue-400 block font-bold text-xs">1-usul: Saytning o'zidan to'g'ridan-to'g'ri yuklash</strong>
                <p className="text-[11px] leading-relaxed">
                  Tepada turgan <strong>"Rasm yoki Video qo'shish"</strong> ko'k tugmasini bosing. O'z telefoningiz yoki kompyuteringizdagi xohlagan rasm/video faylini tanlang yoki YouTube havolasini kiriting. U bir zumda galereyada paydo bo'ladi.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/50 space-y-1">
                <strong className="text-emerald-600 dark:text-emerald-400 block font-bold text-xs">2-usul: Doimiy fayl/kod orqali qo'shish</strong>
                <p className="text-[11px] leading-relaxed">
                  Loyiha ichidagi <code>src/data/schoolsData.ts</code> faylidagi <code>ANGOR_MEDIA_GALLERY</code> massiviga yangi rasm URL'ini yoki <code>public/</code> papkasiga saqlangan media nomini kiritib qo'yishingiz mumkin.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Filter Navigation */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Type Toggle (All, Images only, Videos only) */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedType === 'all' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              Barchasi ({mediaItems.length})
            </button>
            <button
              onClick={() => setSelectedType('image')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedType === 'image' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-500'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Rasmlar ({mediaItems.filter(m => m.type === 'image').length})</span>
            </button>
            <button
              onClick={() => setSelectedType('video')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedType === 'video' ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-xs' : 'text-slate-500'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Videolar ({mediaItems.filter(m => m.type === 'video').length})</span>
            </button>
          </div>

        </div>

      </div>

      {/* Grid of Media Cards */}
      {filteredMedia.length === 0 ? (
        <div className={`p-12 text-center rounded-3xl border ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <ImageIcon className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
          <h3 className="font-bold text-base text-slate-700 dark:text-slate-300">Ushbu toifada lavhalar topilmadi</h3>
          <p className="text-xs text-slate-400 mt-1">Yangi rasm yoki video qo'shish orqali galereyani boyitishingiz mumkin.</p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="mt-4 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
          >
            Yangi rasm/video qo'shish
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveMediaPreview(item)}
              className={`group rounded-3xl border overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between ${
                isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-blue-300 shadow-xs'
              }`}
            >
              <div>
                {/* Media Thumbnail Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={item.type === 'image' ? item.url : (item.thumbnail || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80')}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/10">
                      {item.category}
                    </span>

                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md ${
                      item.type === 'video' 
                        ? 'bg-rose-600 text-white' 
                        : 'bg-blue-600 text-white'
                    }`}>
                      {item.type === 'video' ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                      <span>{item.type === 'video' ? 'Video' : 'Rasm'}</span>
                    </span>
                  </div>

                  {/* Video Play Overlay */}
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                      <div className="w-14 h-14 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-white ml-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Image hover view icon */}
                  {item.type === 'image' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg">
                        <Eye className="w-5 h-5" />
                      </div>
                    </div>
                  )}

                  {item.videoDuration && (
                    <span className="absolute bottom-2 right-2 bg-slate-950/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {item.videoDuration}
                    </span>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-5">
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  
                  {item.description && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Footer Meta */}
              <div className="px-5 pb-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {item.authorName || '1-maktab'}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-blue-500" />
                  {formatUzbekDate(item.uploadedAt)}
                </span>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox / Video Player Modal */}
      {activeMediaPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col text-white">
            
            {/* Top Bar */}
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-400 bg-blue-950/80 px-2.5 py-0.5 rounded-full">
                  {activeMediaPreview.category}
                </span>
                <h3 className="font-bold text-base sm:text-lg text-white mt-1">
                  {activeMediaPreview.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activeMediaPreview.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="To'liq o'lchamda ochish"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setActiveMediaPreview(null)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Media Content Display */}
            <div className="flex-1 bg-black overflow-hidden flex items-center justify-center min-h-[300px] max-h-[65vh]">
              {activeMediaPreview.type === 'image' ? (
                <img 
                  src={activeMediaPreview.url} 
                  alt={activeMediaPreview.title} 
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="w-full h-full aspect-video flex items-center justify-center">
                  <video 
                    src={activeMediaPreview.url} 
                    controls 
                    autoPlay 
                    className="w-full h-full max-h-[60vh] object-contain"
                  />
                </div>
              )}
            </div>

            {/* Bottom Meta & Info */}
            <div className="p-4 sm:p-5 bg-slate-950/80 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
              <p className="text-slate-300 leading-relaxed max-w-xl">
                {activeMediaPreview.description || 'Angor 1-maktab fotogalereyasi lavhasi.'}
              </p>
              
              <div className="flex items-center gap-4 shrink-0 text-[11px]">
                <span>Yuklovchi: <strong className="text-white">{activeMediaPreview.authorName || '1-maktab'}</strong></span>
                <span>Sana: <strong className="text-white">{activeMediaPreview.uploadedAt}</strong></span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Add Media Modal */}
      <AddMediaModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddMedia={onAddMedia}
        isDarkMode={isDarkMode}
      />

    </div>
  );
};
