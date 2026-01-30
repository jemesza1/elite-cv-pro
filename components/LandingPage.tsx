
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
    heroDesc: {
      en: 'Create a professional, job-winning resume in minutes. EliteCV uses advanced AI to optimize your content and beat ATS algorithms.',
      fr: 'Créez un CV professionnel en quelques minutes. EliteCV utilise une IA avancée pour optimiser votre contenu.',
      ar: 'أنشئ سيرة ذاتية احترافية في دقائق. يستخدم EliteCV ذكاءً اصطناعيًا متطورًا لتحسين المحتوى الخاص بك.'
    },
    buildNow: { en: 'Build My CV Now', fr: 'Créer mon CV', ar: 'أنشئ سيرتي الذاتية الآن' },
    featuresTitle: { en: 'Everything you need to land the job.', fr: 'Tout ce dont vous avez besoin.', ar: 'كل ما تحتاجه للحصول على الوظيفة.' },
    feature1Title: { en: 'AI Content Assistant', fr: 'Assistant de contenu IA', ar: 'مساعد المحتوى الذكي' },
    feature2Title: { en: 'ATS Optimization', fr: 'Optimisation ATS', ar: 'تحسين نظام تتبع المتقدمين' },
    feature3Title: { en: 'Cover Letter', fr: 'Lettre de motivation', ar: 'خطاب التغطية' },

    // Templates section
    templatesTitle: { en: 'Professional Templates', fr: 'Modèles Professionnels', ar: 'قوالب احترافية' },
    templatesSubtitle: { en: 'Choose from 28+ stunning designs tested by recruiters', fr: 'Choisissez parmi plus de 28 designs testés par des recruteurs', ar: 'اختر من بين أكثر من 28 تصميمًا احترافيًا' },
    viewAll: { en: 'View All Templates', fr: 'Voir tous les modèles', ar: 'عرض جميع القوالب' },

    // How it works
    howItWorksTitle: { en: 'Create Your CV in 3 Simple Steps', fr: 'Créez Votre CV en 3 Étapes', ar: 'أنشئ سيرتك الذاتية في 3 خطوات' },
    step1Title: { en: 'Choose Template', fr: 'Choisissez un Modèle', ar: 'اختر القالب' },
    step1Desc: { en: 'Select from 28+ professional templates', fr: 'Sélectionnez parmi plus de 28 modèles professionnels', ar: 'اختر من أكثر من 28 قالبًا احترافيًا' },
    step2Title: { en: 'Fill Your Info', fr: 'Remplissez vos Infos', ar: 'أدخل بياناتك' },
    step2Desc: { en: 'AI helps you write compelling content', fr: 'L\'IA vous aide à rédiger un contenu convaincant', ar: 'الذكاء الاصطناعي يساعدك' },
    step3Title: { en: 'Download & Apply', fr: 'Téléchargez et Postulez', ar: 'حمّل وتقدّم' },
    step3Desc: { en: 'Get your ATS-optimized PDF instantly', fr: 'Obtenez votre PDF optimisé instantanément', ar: 'احصل على PDF محسّن فورًا' },

    // Stats
    statsUsers: { en: 'Active Users', fr: 'Utilisateurs Actifs', ar: 'مستخدم نشط' },
    statsTemplates: { en: 'Models', fr: 'Modèles', ar: 'قالب' },
    statsCountries: { en: 'Countries', fr: 'Pays', ar: 'دولة' },
    statsSuccess: { en: 'Success Rate', fr: 'Taux de Réussite', ar: 'معدل النجاح' },

    // FAQ
    faqTitle: { en: 'Frequently Asked Questions', fr: 'Questions Fréquentes', ar: 'الأسئلة الشائعة' },
    faq1Q: { en: 'Is EliteCV really free?', fr: 'EliteCV est-il vraiment gratuit ?', ar: 'هل EliteCV مجاني حقًا؟' },
    faq1A: { en: 'Yes! Create unlimited CVs with all templates for free.', fr: 'Oui ! Créez des CV illimités gratuitement.', ar: 'نعم! أنشئ سيرًا ذاتية غير محدودة مجانًا.' },
    faq2Q: { en: 'Are templates ATS-friendly?', fr: 'Les modèles sont-ils compatibles ATS ?', ar: 'هل القوالب متوافقة مع ATS؟' },
    faq2A: { en: 'Absolutely! All templates are tested against major ATS systems.', fr: 'Absolument ! Tous testés contre les systèmes ATS.', ar: 'بالتأكيد! جميع القوالب متوافقة مع أنظمة ATS.' },
    faq3Q: { en: 'Can I edit my CV later?', fr: 'Puis-je modifier mon CV plus tard ?', ar: 'هل يمكنني تعديل سيرتي لاحقًا؟' },
    faq3A: { en: 'Yes! Your CV is saved and you can edit anytime.', fr: 'Oui ! Votre CV est sauvegardé.', ar: 'نعم! سيرتك الذاتية محفوظة.' },
    faq4Q: { en: 'What file formats can I download?', fr: 'Quels formats puis-je télécharger ?', ar: 'ما هي صيغ الملفات المتاحة؟' },
    faq4A: { en: 'Download as PDF optimized for printing and ATS.', fr: 'Téléchargez en PDF optimisé.', ar: 'حمّل بصيغة PDF محسّنة.' },

    // Final CTA
    finalCtaTitle: { en: 'Ready to Land Your Dream Job?', fr: 'Prêt à Décrocher Votre Emploi de Rêve ?', ar: 'مستعد للحصول على وظيفة أحلامك؟' },
    finalCtaDesc: { en: 'Join thousands of professionals who landed their dream jobs with EliteCV', fr: 'Rejoignez des milliers de professionnels', ar: 'انضم إلى آلاف المحترفين' },
    getStartedFree: { en: 'Get Started - It\'s Free', fr: 'Commencer Gratuitement', ar: 'ابدأ مجانًا' }
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
            </span>
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


            <button
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.pdf,.doc,.docx';
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) (window as any).handleCVUpload(file);
                };
                input.click();
              }}
              className="group relative w-full sm:w-auto px-12 py-7 bg-transparent border-2 border-[var(--cv-text-header)] text-[var(--cv-text-header)] rounded-full text-sm font-black uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-4 overflow-hidden hover:bg-[var(--cv-text-header)] hover:text-white transition-all duration-500"
            >
              <i className="fa fa-upload text-sm relative z-10 transition-transform group-hover:-translate-y-1"></i>
              <span className="relative z-10">
                {lang === 'fr' ? "J'ai déjà un CV" : lang === 'ar' ? 'لدي سيرة ذاتية' : 'I have a CV'}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Trusted By Section - Elite Social Proof */}
      <section className="py-12 px-6 border-y border-[var(--cv-border)] bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-10">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] text-center">Utilisé par des candidats chez</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="flex items-center gap-2 font-serif font-bold text-2xl text-slate-900"><i className="fab fa-google"></i> Google</div>
            <div className="flex items-center gap-2 font-serif font-bold text-2xl text-slate-900"><i className="fab fa-amazon"></i> Amazon</div>
            <div className="flex items-center gap-2 font-serif font-bold text-2xl text-slate-900"><i className="fab fa-meta"></i> Meta</div>
            <div className="flex items-center gap-2 font-serif font-bold text-2xl text-slate-900"><i className="fab fa-apple"></i> Apple</div>
            <div className="flex items-center gap-2 font-serif font-bold text-2xl text-slate-900"><i className="fab fa-microsoft"></i> Microsoft</div>
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
              { icon: 'fa-wand-magic-sparkles', title: translations.feature1Title[lang], desc: 'Gemini 3 AI optimizes every sentence for maximum professional impact.', color: 'text-blue-500', action: 'ai-assistant' },
              { icon: 'fa-layer-group', title: translations.feature2Title[lang], desc: 'Layouts tested against the latest recruitment software filters.', color: 'text-purple-500', action: 'ats-optimization' },
              { icon: 'fa-file-pen', title: translations.feature3Title[lang], desc: 'Instant tailored letters for every specific application.', color: 'text-emerald-500', action: 'cover-letter' }
            ].map((feature, i) => (
              <div
                key={i}
                onClick={onStart}
                className="group p-12 bg-[var(--cv-bg)] rounded-[2.5rem] border border-[var(--cv-border)] hover:border-[var(--cv-accent)]/30 hover:shadow-2xl transition-all duration-500 relative overflow-hidden cursor-pointer hover:scale-105 active:scale-95"
              >
                <div className={`w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mb-10 shadow-sm group-hover:scale-110 transition duration-500 ${feature.color}`}>
                  <i className={`fa ${feature.icon}`}></i>
                </div>
                <h3 className="text-2xl font-black mb-6 text-[var(--cv-text-header)] font-serif">{feature.title}</h3>
                <p className="text-[var(--cv-text-muted)] leading-relaxed text-lg">{feature.desc}</p>

                {/* Interactive indicator */}
                <div className="mt-8 flex items-center gap-3 text-[var(--cv-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-bold uppercase tracking-wider">
                    {lang === 'fr' ? 'Commencer' : lang === 'ar' ? 'ابدأ' : 'Get Started'}
                  </span>
                  <i className={`fa ${isRtl ? 'fa-arrow-left' : 'fa-arrow-right'} text-sm group-hover:translate-x-1 transition-transform`}></i>
                </div>

                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--cv-accent)]/5 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Showcase Section */}
      <section className="py-32 px-6 bg-[var(--cv-bg)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-5xl font-black text-[var(--cv-text-header)] tracking-tight font-serif">{translations.templatesTitle[lang]}</h2>
            <p className="text-xl text-[var(--cv-text-muted)] max-w-2xl mx-auto">{translations.templatesSubtitle[lang]}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {['Elite', 'Parisian', 'Silicon Valley', 'Minimal', 'Zurich', 'Executive', 'Atlas', 'Prism', 'Nexus', 'Zenith', 'Quantum', 'Spectrum'].map((template, i) => (
              <div key={i} className="group relative aspect-[8.5/11] bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer border border-[var(--cv-border)] hover:border-[var(--cv-accent)]/30 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white p-6 flex flex-col">
                  <div className="h-2 w-16 bg-[var(--cv-text-header)] rounded mb-4"></div>
                  <div className="h-1.5 w-full bg-slate-200 rounded mb-2"></div>
                  <div className="h-1.5 w-3/4 bg-slate-200 rounded mb-6"></div>
                  <div className="space-y-3 flex-1">
                    <div className="h-1 w-full bg-slate-100 rounded"></div>
                    <div className="h-1 w-full bg-slate-100 rounded"></div>
                    <div className="h-1 w-2/3 bg-slate-100 rounded"></div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-xs font-black text-[var(--cv-text-header)] opacity-60 group-hover:opacity-100 transition-opacity">{template}</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-[var(--cv-accent)]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={onStart}
              className="px-12 py-5 bg-transparent border-2 border-[var(--cv-text-header)] text-[var(--cv-text-header)] rounded-full text-sm font-black uppercase tracking-[0.2em] hover:bg-[var(--cv-text-header)] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {translations.viewAll[lang]}
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-40 px-6 bg-[var(--cv-sidebar)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-20 left-20 w-96 h-96 bg-[var(--cv-accent)]/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-royal-500/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-5xl font-black text-[var(--cv-text-header)] tracking-tight font-serif">{translations.howItWorksTitle[lang]}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { icon: 'fa-palette', title: translations.step1Title[lang], desc: translations.step1Desc[lang], number: '01', color: 'from-blue-500 to-blue-600' },
              { icon: 'fa-wand-magic-sparkles', title: translations.step2Title[lang], desc: translations.step2Desc[lang], number: '02', color: 'from-purple-500 to-purple-600' },
              { icon: 'fa-cloud-arrow-down', title: translations.step3Title[lang], desc: translations.step3Desc[lang], number: '03', color: 'from-emerald-500 to-emerald-600' }
            ].map((step, i) => (
              <div key={i} className="group relative text-center">
                {/* Connector Line */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-20 left-1/2 w-full h-0.5 bg-gradient-to-r from-[var(--cv-accent)]/30 to-transparent z-0"></div>
                )}

                {/* Step Card */}
                <div className="relative z-10">
                  <div className={`mx-auto w-24 h-24 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white text-4xl mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500 rotate-3 group-hover:rotate-0`}>
                    <i className={`fa ${step.icon}`}></i>
                  </div>

                  <div className="absolute top-0 right-1/2 translate-x-20 -translate-y-2 text-8xl font-black text-[var(--cv-accent)]/5 z-0">{step.number}</div>

                  <h3 className="text-2xl font-black mb-4 text-[var(--cv-text-header)] font-serif">{step.title}</h3>
                  <p className="text-[var(--cv-text-muted)] text-lg leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-32 px-6 bg-[var(--cv-text-header)] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { number: '50K+', label: translations.statsUsers[lang], icon: 'fa-users' },
              { number: '28+', label: translations.statsTemplates[lang], icon: 'fa-file-alt' },
              { number: '120+', label: translations.statsCountries[lang], icon: 'fa-globe' },
              { number: '94%', label: translations.statsSuccess[lang], icon: 'fa-chart-line' }
            ].map((stat, i) => (
              <div key={i} className="group">
                <div className="mb-4 text-5xl opacity-20 group-hover:opacity-40 transition-opacity">
                  <i className={`fa ${stat.icon}`}></i>
                </div>
                <div className="text-5xl md:text-6xl font-black mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">{stat.number}</div>
                <div className="text-sm font-bold uppercase tracking-wider opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-40 px-6 bg-[var(--cv-bg)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-5xl font-black text-[var(--cv-text-header)] tracking-tight font-serif">{translations.faqTitle[lang]}</h2>
          </div>

          <div className="space-y-6">
            {[
              { q: translations.faq1Q[lang], a: translations.faq1A[lang] },
              { q: translations.faq2Q[lang], a: translations.faq2A[lang] },
              { q: translations.faq3Q[lang], a: translations.faq3A[lang] },
              { q: translations.faq4Q[lang], a: translations.faq4A[lang] }
            ].map((faq, i) => (
              <div key={i} className="group p-8 bg-white rounded-2xl border border-[var(--cv-border)] hover:border-[var(--cv-accent)]/30 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[var(--cv-accent)] to-royal-600 rounded-xl flex items-center justify-center text-white font-black text-lg">
                    Q
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-[var(--cv-text-header)] mb-3">{faq.q}</h3>
                    <p className="text-[var(--cv-text-muted)] leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-40 px-6 bg-gradient-to-br from-[var(--cv-text-header)] via-royal-800 to-royal-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-12">
          <h2 className="text-6xl md:text-7xl font-black tracking-tight font-serif leading-tight">{translations.finalCtaTitle[lang]}</h2>
          <p className="text-2xl text-white/80 leading-relaxed">{translations.finalCtaDesc[lang]}</p>

          <button
            onClick={onStart}
            className="group relative px-16 py-8 bg-white text-[var(--cv-text-header)] rounded-full text-lg font-black uppercase tracking-[0.2em] hover:scale-110 active:scale-95 transition-all duration-500 shadow-2xl flex items-center justify-center gap-4 mx-auto overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--cv-accent)] to-royal-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <i className="fa fa-rocket text-xl relative z-10"></i>
            <span className="relative z-10">{translations.getStartedFree[lang]}</span>
            <i className={`fa ${isRtl ? 'fa-arrow-left' : 'fa-arrow-right'} text-lg relative z-10 group-hover:translate-x-2 transition-transform`}></i>
          </button>

          <div className="flex items-center justify-center gap-8 pt-8 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <i className="fa fa-check-circle"></i>
              <span>{lang === 'fr' ? 'Gratuit pour toujours' : lang === 'ar' ? 'مجاني للأبد' : 'Free Forever'}</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fa fa-check-circle"></i>
              <span>{lang === 'fr' ? 'Aucune carte requise' : lang === 'ar' ? 'لا حاجة لبطاقة' : 'No Card Required'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[var(--cv-text-header)] text-white/60 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white text-xl font-black">E</div>
            <span className="text-xl font-black text-white">EliteCV</span>
          </div>
          <p className="text-sm">
            {lang === 'fr' ? '© 2024 EliteCV. Tous droits réservés.' : lang === 'ar' ? '© 2024 EliteCV. جميع الحقوق محفوظة.' : '© 2024 EliteCV. All rights reserved.'}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
