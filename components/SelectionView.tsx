import React, { useState, useRef } from 'react';
import { Language } from '../types';

interface SelectionViewProps {
  onSelect: (option: 'new' | 'import' | 'canada', fileData?: { base64: string, mimeType: string }) => void;
  onBack: () => void;
  lang: Language;
}

const SelectionView: React.FC<SelectionViewProps> = ({ onSelect, onBack, lang }) => {
  const [isReadingFile, setIsReadingFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isRtl = lang === 'ar';

  const translations = {
    back: { en: 'Back', fr: 'Retour', ar: 'رجوع' },
    title: { en: 'Choose the option that', fr: 'Choisissez l\'option qui', ar: 'اختر الخيار الذي' },
    subtitle: { en: 'suits you', fr: 'vous convient', ar: 'يناسبك' },
    newCv: { en: 'Create a new CV', fr: 'Créer un nouveau CV', ar: 'إنشاء سيرة ذاتية جديدة' },
    newCvDesc: { en: 'Our AI-powered tool will guide you step by step.', fr: 'Notre outil IA vous guidera étape par étape.', ar: 'سيرشدك نظامنا الذكي خطوة بخطوة.' },
    importCv: { en: 'I already have a CV', fr: 'J\'ai déjà un CV', ar: 'لدي سيرة ذاتية بالفعل' },
    importCvDesc: { en: 'Upload your old file and we\'ll extract it.', fr: 'Téléchargez votre fichier et nous l\'extrairons.', ar: 'ارفع ملفك القديم وسنقوم باستخراج البيانات.' },
    canada: { en: 'Canadian Bilingual CV', fr: 'CV Bilingue Canadien', ar: 'سيرة ذاتية كندية ثنائية اللغة' },
    canadaDesc: { en: 'Optimized for Canada with side-by-side English/French content.', fr: 'Optimisé pour le Canada avec un contenu bilingue.', ar: 'محسن للسوق الكندي مع محتوى مزدوج اللغة.' },
    reading: { en: 'Reading file...', fr: 'Lecture du fichier...', ar: 'جاري قراءة الملف...' }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsReadingFile(true);
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      onSelect('import', { base64, mimeType: file.type });
      setIsReadingFile(false);
    };
    reader.onerror = () => {
      alert("Error reading file");
      setIsReadingFile(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-[var(--cv-bg)] flex flex-col" dir={isRtl ? 'rtl' : 'ltr'}>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*,.pdf" />

      <header className="glass-panel border-b border-[var(--cv-border)] p-6 flex items-center justify-between sticky top-0 z-50">
        <button onClick={onBack} className="w-12 h-12 flex items-center justify-center text-[var(--cv-text-muted)] hover:bg-[var(--cv-border)] rounded-full transition-all">
          <i className={`fa ${isRtl ? 'fa-arrow-right' : 'fa-arrow-left'}`}></i>
        </button>
        <div className="flex items-center gap-3 pr-4">
          <div className="w-10 h-10 bg-gradient-to-br from-royal-900 to-royal-800 rounded-lg flex items-center justify-center text-white font-black font-serif shadow-md">E</div>
          <span className="font-black text-[var(--cv-text-header)] tracking-tight font-serif text-lg">EliteCV</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8 max-w-7xl mx-auto w-full">
        {isReadingFile ? (
          <div className="flex flex-col items-center space-y-8 animate-pulse">
            <div className="w-24 h-24 bg-[var(--cv-accent)] rounded-full flex items-center justify-center text-white text-4xl shadow-xl shadow-blue-500/30">
              <i className="fa fa-spinner fa-spin"></i>
            </div>
            <p className="text-2xl font-black text-[var(--cv-text-header)] font-serif">{translations.reading[lang]}</p>
          </div>
        ) : (
          <>
            <h1 className="text-4xl md:text-6xl font-black text-[var(--cv-text-header)] text-center mb-20 tracking-tight font-serif">
              {translations.title[lang]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--cv-accent)] to-royal-600 italic">{translations.subtitle[lang]}</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              {[
                { id: 'new', icon: 'fa-file-circle-plus', title: translations.newCv[lang], desc: translations.newCvDesc[lang], color: 'text-[var(--cv-accent)]', bg: 'bg-blue-50', enabled: true },
                { id: 'canada', icon: 'fa-map-location-dot', title: translations.canada[lang], desc: translations.canadaDesc[lang], color: 'text-red-600', bg: 'bg-red-50', badge: true, enabled: false, comingSoon: true },
                { id: 'import', icon: 'fa-cloud-arrow-up', title: translations.importCv[lang], desc: translations.importCvDesc[lang], color: 'text-indigo-600', bg: 'bg-indigo-50', action: () => fileInputRef.current?.click(), enabled: false, comingSoon: true }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => item.enabled ? (item.action ? item.action() : onSelect(item.id as any)) : null}
                  disabled={!item.enabled}
                  className={`group relative bg-[var(--cv-card)] p-10 rounded-[2.5rem] border border-[var(--cv-border)] transition-all duration-300 flex flex-col items-center text-center space-y-6 overflow-hidden ${item.enabled ? 'hover:border-[var(--cv-accent)] hover:shadow-2xl cursor-pointer' : 'opacity-60 cursor-not-allowed'}`}
                >
                  {item.comingSoon && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider shadow-lg z-20">
                      Coming Soon
                    </div>
                  )}
                  {item.badge && !item.comingSoon && (
                    <div className="absolute top-0 right-0 w-16 h-16 bg-red-600 text-white flex items-center justify-center rotate-45 translate-x-6 -translate-y-6 shadow-lg z-10">
                      <i className="fa fa-leaf text-xs -rotate-45 mt-4 mr-2"></i>
                    </div>
                  )}
                  <div className={`w-20 h-20 ${item.bg} rounded-3xl flex items-center justify-center text-3xl ${item.enabled ? 'group-hover:scale-110' : ''} transition-transform duration-500 ${item.color}`}>
                    <i className={`fa ${item.icon}`}></i>
                  </div>
                  <div className="space-y-2 relative z-10">
                    <h2 className="text-2xl font-bold text-[var(--cv-text-header)] font-serif">{item.title}</h2>
                    <p className="text-sm text-[var(--cv-text-muted)] leading-relaxed font-medium">{item.desc}</p>
                  </div>
                  {item.enabled && (
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[var(--cv-accent)]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default SelectionView;
