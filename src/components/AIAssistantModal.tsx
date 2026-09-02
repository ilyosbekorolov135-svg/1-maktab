import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Bot, Send, Sparkles, School, Trophy, Award } from 'lucide-react';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onNavigateToAngor: () => void;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  isDarkMode,
  onNavigateToAngor
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "Assalomu alaykum! Men EduStats maktablar bo'yicha sun'iy intellekt maslahatchisiman. Surxondaryo viloyati Angor tumani 1-maktabi, uning fidoiy ustozlari (Fazliddin Kenjayev, Guliston Kuvatova, Shoxista Madiyeva), olimpiada tayyorgarligi yoki maktablar reytingi bo'yicha qanday savolingiz bor?",
      time: 'Hozirgina'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const quickQuestions = [
    "Angor 1-maktabi yutuqlari nimalardan iborat?",
    "Vazir jamg'armasi ustamasi olgan ustozlar kim?",
    "Zakovat va Al-Xorazmiy olimpiadasi qayerda o'tkaziladi?",
    "Maktab reytingi va ijobiy baholar qanday hisoblanadi?"
  ];

  const handleSend = (textToSend?: string) => {
    const question = textToSend || input;
    if (!question.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: question,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiReply = "Bu bo'yicha ma'lumotlar bazamiz tahlil qilinmoqda. Maktablarimiz yosh avlodga sifatli ta'lim berishda davom etmoqda.";
      const qLower = question.toLowerCase();

      if (qLower.includes('angor') || qLower.includes('1-maktab') || qLower.includes('yutuq')) {
        aiReply = "Surxondaryo viloyati Angor tumanidagi 1-sonli umumiy o'rta ta'lim maktabi tuman miqyosidagi 'Zakovat' intellektual bellashuvlari hamda Al-Xorazmiy nomidagi matematika olimpiadasining tayanch mezbon markazi hisoblanadi. Maktabda 1,280 nafar o'quvchi tahsil oladi va 98% ijobiy jamoat reytingiga ega!";
      } else if (qLower.includes('ustoz') || qLower.includes('fazliddin') || qLower.includes('guliston') || qLower.includes('vazir')) {
        aiReply = "Angor 1-maktabining tarix fani o'qituvchilari Fazliddin Kenjayev va Guliston Kuvatova yuqori malakasi va o'quvchilarining fan olimpiadalari g'alabalari uchun Vazir jamg'armasining 100% maxsus ustamasiga sazovor bo'lishgan. Shuningdek, Shoxista Madiyeva Zakovat to'garagi va 'Gulxan' jurnali ijodiy loyihalariga rahbarlik qiladi.";
      } else if (qLower.includes('zakovat') || qLower.includes('olimpiada') || qLower.includes('al-xorazmiy')) {
        aiReply = "Angor 1-maktab binosida tuman 'Zakovat' klubi va Al-Xorazmiy olimpiadasi saralash bosqichlari doimiy o'tkaziladi. O'quvchilar viloyat va respublika bosqichlarida faxrli o'rinlarni egallab kelmoqda.";
      } else if (qLower.includes('reyting') || qLower.includes('hisob')) {
        aiReply = "EduStats portali orqali maktablar reytingi o'quvchilar, ota-onalar va bitiruvchilarning real ochiq baholari, OTMga kirish foizi va fan olimpiadalari natijalari asosida shaffof shakllantiriladi.";
      }

      setMessages(prev => [...prev, {
        sender: 'ai',
        text: aiReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className={`max-w-lg w-full rounded-3xl p-6 shadow-2xl border flex flex-col h-[580px] max-h-[90vh] ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base flex items-center gap-1.5">
                AI Maktab Maslahatchisi
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              </h3>
              <p className="text-[11px] text-slate-400">Tezkor ta'lim va maktab tahlili</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Message List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1 text-xs">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-xs' 
                  : isDarkMode 
                    ? 'bg-slate-800 text-slate-200 rounded-bl-xs border border-slate-700' 
                    : 'bg-slate-100 text-slate-800 rounded-bl-xs'
              }`}>
                <p>{msg.text}</p>
                <span className={`text-[9px] block mt-1 ${
                  msg.sender === 'user' ? 'text-blue-200 text-right' : 'text-slate-400'
                }`}>
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl text-slate-400 text-xs italic flex items-center gap-1">
                <span className="animate-pulse">AI javob tayyorlamoqda...</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Prompts */}
        <div className="py-2 overflow-x-auto flex gap-1.5 no-scrollbar">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] font-medium whitespace-nowrap px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-slate-600 dark:text-slate-300 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input area */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="pt-2 flex gap-2">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Maktab yoki ustozlar haqida so'rang..."
            className={`flex-1 px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
              isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
            }`}
          />
          <button 
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};
