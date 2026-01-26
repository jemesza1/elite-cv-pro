
import React from 'react';
import { Language } from '../types';

interface LandingPageProps {
  onStart: () => void;
  lang: Language;
  onLangChange: (lang: Language) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, lang, onLangChange }) => {
  const isRtl = lang === 'ar';

  const translations = {
    start: { en: 'Start Building', fr: 'Commencer', ar: 'ابدأ الآن' },
    heroTitle1: { en: 'Your Career,', fr: 'Votre Carrière,', ar: 'مسيرتك المهنية،' },
    heroTitle2: { en: 'Elevated', fr: 'Élevée', ar: 'مرتقية' },
    heroTitle3: { en: 'by AI.', fr: 'par l\'IA.', ar: 'بالذكاء الاصطناعي.' },
    heroDesc: {
      en: 'Create a professional, job-winning resume in minutes. EliteCV uses advanced AI to optimize your content and beat ATS algorithms.',
      fr: 'Créez un CV professionnel en quelques minutes. EliteCV utilise une IA avancée pour optimiser votre contenu.',
      ar: 'أنشئ سيرة ذاتية احترافية في دقائق. يستخدم EliteCV ذكاءً اصطناعيًا متطورًا لتحسين المحتوى الخاص بك.'
    },
    buildNow: { en: 'Build My CV Now', fr: 'Créer mon CV', ar: 'أنشئ سيرتي الذاتية الآن' },
    featuresTitle: { en: 'Everything you need to land the job.', fr: 'Tout ce dont vous avez besoin.', ar: 'كل ما تحتاجه للحصول على الوظيفة.' },
    feature1Title: { en: 'AI Content Assistant', fr: 'Assistant de contenu IA', ar: 'مساعد المحتوى الذكي' },
    feature2Title: { en: 'ATS Optimization', fr: 'Optimisation ATS', ar: 'تحسين نظام تتبع المتقدمين' },
    feature3Title: { en: 'Cover Letter', fr: 'Lettre de motivation', ar: 'خطاب التغطية' }
  };

  return (
    <div className="bg-[var(--cv-bg)] text-[var(--cv-text-main)] overflow-x-hidden min-h-screen" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Navigation */}
      <nav className="fixed w-full z-50 glass-panel border-b border-[var(--cv-border)]/50">
        <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-royal-900 to-royal-800 rounded-xl flex items-center justify-center text-white text-2xl font-black font-serif shadow-lg ring-1 ring-white/20">E</div>
            <span className="text-2xl font-black tracking-tight text-[var(--cv-text-header)] font-serif">EliteCV</span>
          </div>

          <div className="flex items-center gap-8">
            <select
              value={lang}
              onChange={(e) => onLangChange(e.target.value as Language)}
              className="bg-transparent border-none text-sm font-bold text-[var(--cv-text-muted)] focus:ring-0 cursor-pointer hover:text-[var(--cv-accent)] transition-colors uppercase tracking-widest"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="ar">العربية</option>
            </select>
            <button
              onClick={onStart}
              className="px-8 py-3 bg-[var(--cv-text-header)] text-[var(--cv-bg)] rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-[var(--cv-accent)] hover:scale-105 transition-all duration-300 shadow-xl"
            >
              {translations.start[lang]}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-60 pb-32 px-6 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[1400px] h-[1000px] opacity-40 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--cv-accent)_0%,_transparent_60%)] blur-[150px] opacity-20"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-16">
          <div className="inline-flex items-center gap-4 px-8 py-3 glass-panel rounded-full text-[var(--cv-accent)] text-[10px] font-black uppercase tracking-[0.25em] shadow-lg animate-fade-in border border-[var(--cv-accent)]/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--cv-accent)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--cv-accent)]"></span>
            </span>
            <i className="fa fa-sparkles"></i>
            <span>Powered by Gemini 1.5 Ultra</span>
          </div>

          <h1 className="text-7xl md:text-9xl font-black text-[var(--cv-text-header)] tracking-tighter leading-[0.9] font-serif animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {translations.heroTitle1[lang]}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--cv-accent)] to-royal-800 italic pr-4">
              {translations.heroTitle2[lang]}
            </span><br />
            {translations.heroTitle3[lang]}
          </h1>

          <p className="text-xl md:text-2xl text-[var(--cv-text-muted)] max-w-2xl mx-auto leading-relaxed font-medium animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {translations.heroDesc[lang]}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={onStart}
              className="group relative w-full sm:w-auto px-16 py-7 bg-[var(--cv-text-header)] text-[var(--cv-bg)] rounded-full text-sm font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all duration-500 shadow-2xl flex items-center justify-center gap-4 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--cv-accent)] to-royal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10">{translations.buildNow[lang]}</span>
              <i className={`fa ${isRtl ? 'fa-arrow-left' : 'fa-arrow-right'} text-sm relative z-10 group-hover:translate-x-2 transition-transform`}></i>
            </button>


            <div className="group relative w-full sm:w-auto px-12 py-7 bg-transparent border-2 border-[var(--cv-text-header)] text-[var(--cv-text-header)] rounded-full text-sm font-black uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-4 overflow-hidden opacity-60 cursor-not-allowed">
              <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg z-20">
                Coming Soon
              </div>
              <i className="fa fa-upload text-sm relative z-10"></i>
              <span className="relative z-10">
                {lang === 'fr' ? "J'ai déjà un CV" : lang === 'ar' ? 'لدي سيرة ذاتية' : 'I have a CV'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-40 px-6 bg-[var(--cv-sidebar)] relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-6">
            <h2 className="text-5xl font-black text-[var(--cv-text-header)] tracking-tight font-serif">{translations.featuresTitle[lang]}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: 'fa-wand-magic-sparkles', title: translations.feature1Title[lang], desc: 'Gemini 3 AI optimizes every sentence for maximum professional impact.', color: 'text-blue-500' },
              { icon: 'fa-layer-group', title: translations.feature2Title[lang], desc: 'Layouts tested against the latest recruitment software filters.', color: 'text-purple-500' },
              { icon: 'fa-file-pen', title: translations.feature3Title[lang], desc: 'Instant tailored letters for every specific application.', color: 'text-emerald-500' }
            ].map((feature, i) => (
              <div key={i} className="group p-12 bg-[var(--cv-bg)] rounded-[2.5rem] border border-[var(--cv-border)] hover:border-[var(--cv-accent)]/30 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                <div className={`w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mb-10 shadow-sm group-hover:scale-110 transition duration-500 ${feature.color}`}>
                  <i className={`fa ${feature.icon}`}></i>
                </div>
                <h3 className="text-2xl font-black mb-6 text-[var(--cv-text-header)] font-serif">{feature.title}</h3>
                <p className="text-[var(--cv-text-muted)] leading-relaxed text-lg">{feature.desc}</p>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--cv-accent)]/5 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
