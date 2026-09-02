import React, { useState } from 'react';
import { 
  X, Image as ImageIcon, Video, UploadCloud, Link as LinkIcon, 
  Sparkles, CheckCircle2, AlertCircle, Play
} from 'lucide-react';
import { MediaItem } from '../types';

interface AddMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMedia: (item: MediaItem) => void;
  isDarkMode: boolean;
}

export const AddMediaModal: React.FC<AddMediaModalProps> = ({
  isOpen,
  onClose,
  onAddMedia,
  isDarkMode
}) => {
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<MediaItem['category']>('Tadbir');
  const [authorName, setAuthorName] = useState('');
  const [urlInput, setUrlInput] = useState('');
  
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    // Read file as Data URL
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPreviewUrl(reader.result);
      }
    };
    reader.onerror = () => {
      setErrorMessage("Faylni o'qishda xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.");
    };

    reader.readAsDataURL(file);
  };

  const handleUrlBlur = () => {
    if (urlInput.trim()) {
      setPreviewUrl(urlInput.trim());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalUrl = uploadMode === 'file' ? previewUrl : urlInput.trim();

    if (!finalUrl) {
      setErrorMessage("Iltimos, rasm yoki video faylini tanlang yoki havolasini kiriting.");
      return;
    }

    if (!title.trim()) {
      setErrorMessage("Iltimos, sarlavha kiriting.");
      return;
    }

    const newItem: MediaItem = {
      id: `user-m-${Date.now()}`,
      type: mediaType,
      url: finalUrl,
      thumbnail: mediaType === 'video' ? 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80' : undefined,
      title: title.trim(),
      description: description.trim() || 'Angor 1-maktabi hayotidan lavha',
      category: category,
      uploadedAt: new Date().toISOString().split('T')[0],
      authorName: authorName.trim() || 'Foydalanuvchi / O\'quvchi',
      videoDuration: mediaType === 'video' ? 'Yangi video' : undefined
    };

    onAddMedia(newItem);
    
    // Reset
    setTitle('');
    setDescription('');
    setUrlInput('');
    setPreviewUrl(null);
    setFileName('');
    setErrorMessage(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className={`relative w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black shadow-md shadow-blue-500/20">
              {mediaType === 'image' ? <ImageIcon className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg">Maktabga Rasm / Video Qo'shish</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Angor 1-maktab fotogalereyasi va media bazasiga yangi lavha</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs">
          
          {/* Type Selector (Photo vs Video) */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setMediaType('image');
                setPreviewUrl(null);
                setFileName('');
              }}
              className={`p-3 rounded-2xl border font-bold flex items-center justify-center gap-2 transition-all ${
                mediaType === 'image'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Fotosurat (Rasm)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMediaType('video');
                setPreviewUrl(null);
                setFileName('');
              }}
              className={`p-3 rounded-2xl border font-bold flex items-center justify-center gap-2 transition-all ${
                mediaType === 'video'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Videolavha (Video)</span>
            </button>
          </div>

          {/* Upload Method (File Upload vs URL Link) */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-slate-400 font-bold">Yuklash usuli:</span>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setUploadMode('file')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  uploadMode === 'file' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-500'
                }`}
              >
                Fayldan yuklash
              </button>
              <button
                type="button"
                onClick={() => setUploadMode('url')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  uploadMode === 'url' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-500'
                }`}
              >
                Havola (URL / YouTube)
              </button>
            </div>
          </div>

          {/* File Upload Box */}
          {uploadMode === 'file' ? (
            <div className="space-y-2">
              <label className="block border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-800/30">
                <input
                  type="file"
                  accept={mediaType === 'image' ? 'image/*' : 'video/*'}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <UploadCloud className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                <span className="font-bold block text-slate-800 dark:text-slate-200">
                  {fileName ? fileName : `${mediaType === 'image' ? 'Rasm' : 'Video'} faylini tanlang`}
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  PNG, JPG, MP4 yoki WEBM formatlar
                </span>
              </label>
            </div>
          ) : (
            <div className="space-y-1">
              <label className="font-bold text-slate-400 block">Rasm yoki Video to'g'ridan-to'g'ri havolasi (URL):</label>
              <div className="relative">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onBlur={handleUrlBlur}
                  placeholder={mediaType === 'image' ? 'https://misol.uz/rasm.jpg' : 'https://youtube.com/watch?v=... yoki https://.../video.mp4'}
                  className={`w-full p-3 pl-9 rounded-xl border font-medium ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                />
                <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>
          )}

          {/* Live Preview Box if media selected */}
          {previewUrl && (
            <div className="p-3 rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/30">
              <span className="font-bold text-blue-600 dark:text-blue-400 block mb-2">Yuklanayotgan fayl ko'rinishi:</span>
              <div className="h-36 w-full rounded-xl overflow-hidden bg-black flex items-center justify-center relative">
                {mediaType === 'image' ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <video src={previewUrl} controls className="w-full h-full object-contain" />
                )}
              </div>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="font-bold text-slate-400 block mb-1">Lavha sarlavhasi / Nomi *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masalan: 1-sentabr 'Bilimlar kuni' tantanasi"
              className={`w-full p-3 rounded-xl border font-medium ${
                isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
              }`}
            />
          </div>

          {/* Category and Author Name in Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-400 block mb-1">Toifasi:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className={`w-full p-3 rounded-xl border font-bold ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <option value="Tadbir">Tadbir</option>
                <option value="Dars jarayoni">Dars jarayoni</option>
                <option value="Zakovat">Zakovat</option>
                <option value="Olimpiada">Olimpiada</option>
                <option value="Sport">Sport</option>
                <option value="Umumiy">Umumiy</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-400 block mb-1">Yuklovchi / Muallif:</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Ismingiz yoki sinfingiz"
                className={`w-full p-3 rounded-xl border font-medium ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="font-bold text-slate-400 block mb-1">Qisqacha tavsif / Izoh:</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ushbu rasm yoki video haqida qo'shimcha ma'lumot..."
              className={`w-full p-3 rounded-xl border font-medium resize-none ${
                isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
              }`}
            />
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-2 shadow-md shadow-blue-500/25 active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              Galereyaga qo'shish
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
