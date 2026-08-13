import React, { useState, useEffect } from 'react';
import { Language } from '../types';

interface LandingPageProps {
  onStart: () => void;
  lang: Language;
  onLangChange: (lang: Language) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, lang, onLangChange }) => {
  const isRtl = lang === 'ar';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const t = {
    start: { en: 'Start Building', fr: 'Commencer', ar: 'ابدأ الآن' },
    heroTitle1: { en: 'Craft a Resume', fr: 'Créez un CV', ar: 'أنشئ سيرة ذاتية' },
    heroTitle2: { en: 'That Opens Doors', fr: 'Qui Ouvre des Portes', ar: 'تفتح الأبواب' },
    heroDesc: {
      en: '28 elite templates. Gemini AI writing. ATS-optimized. Built for professionals who refuse to blend in.',
      fr: '28 modèles d\'élite. Rédaction IA Gemini. Optimisé ATS. Pour les professionnels qui refusent de se fondre dans la masse.',
      ar: '28 قالبًا فاخرًا. كتابة بالذكاء الاصطناعي. محسّن لأنظمة التوظيف. للمحترفين الذين يرفضون التشابه.'
    },
    buildNow: { en: 'Build My CV Free', fr: 'Créer mon CV gratuitement', ar: 'أنشئ سيرتي مجانًا' },
    haveCV: { en: 'I already have a CV', fr: "J'ai déjà un CV", ar: 'لدي سيرة ذاتية' },
    featuresTitle: { en: 'Why professionals choose EliteCV', fr: 'Pourquoi les pros choisissent EliteCV', ar: 'لماذا يختار المحترفون EliteCV' },
    f1: { en: 'AI Content Engine', fr: 'Moteur de contenu IA', ar: 'محرك محتوى ذكي' },
    f1d: { en: 'Gemini rewrites every line with impact metrics and recruiter-ready language.', fr: 'Gemini réécrit chaque ligne avec impact et langage recruteur.', ar: 'يعيد Gemini صياغة كل سطر بلغة احترافية ومؤشرات أثر.' },
    f2: { en: '28 Distinct Templates', fr: '28 modèles distincts', ar: '28 قالبًا مميزًا' },
    f2d: { en: 'From ATS-safe corporate to bold creative — every design is original and print-perfect.', fr: 'Du corporate ATS au créatif audacieux — chaque design est original.', ar: 'من القوالب المؤسسية الآمنة إلى الإبداعية الجريئة.' },
    f3: { en: 'Instant Cover Letters', fr: 'Lettres de motivation', ar: 'خطابات تغطية فورية' },
    f3d: { en: 'Generate tailored letters for each application in seconds, in EN / FR / AR.', fr: 'Générez des lettres adaptées en secondes, EN / FR / AR.', ar: 'أنشئ خطابات مخصصة لكل طلب خلال ثوانٍ.' },
    templatesTitle: { en: 'Templates that get interviews', fr: 'Des modèles qui décrochent des entretiens', ar: 'قوالب تجلب المقابلات' },
    templatesSub: { en: 'Hand-crafted for real hiring systems — not generic themes.', fr: 'Conçus pour les vrais systèmes de recrutement.', ar: 'مصممة لأنظمة التوظيف الحقيقية.' },
    viewAll: { en: 'Explore all templates', fr: 'Explorer tous les modèles', ar: 'استكشف كل القوالب' },
    howTitle: { en: 'Three steps. Zero friction.', fr: 'Trois étapes. Zéro friction.', ar: 'ثلاث خطوات. بدون تعقيد.' },
    s1: { en: 'Pick a style', fr: 'Choisissez un style', ar: 'اختر أسلوبًا' },
    s1d: { en: '28 templates across Professional, Creative, Luxury & Minimal.', fr: '28 modèles : Pro, Créatif, Luxe & Minimal.', ar: '28 قالبًا: احترافي، إبداعي، فاخر وبسيط.' },
    s2: { en: 'Let AI write', fr: 'Laissez l\'IA écrire', ar: 'دع الذكاء يكتب' },
    s2d: { en: 'Paste notes or upload a CV — Gemini turns them into powerful bullets.', fr: 'Collez des notes ou importez un CV — Gemini les transforme.', ar: 'الصق ملاحظاتك أو ارفع سيرتك — Gemini يحوّلها لنقاط قوية.' },
    s3: { en: 'Export & apply', fr: 'Exportez & postulez', ar: 'صدّر وتقدّم' },
    s3d: { en: 'Print-ready PDF with perfect page breaks and ATS-safe structure.', fr: 'PDF prêt à imprimer, structure ATS-safe.', ar: 'PDF جاهز للطباعة بهيكل متوافق مع أنظمة التوظيف.' },
    statsUsers: { en: 'Professionals', fr: 'Professionnels', ar: 'محترف' },
    statsTemplates: { en: 'Templates', fr: 'Modèles', ar: 'قالب' },
    statsLangs: { en: 'Languages', fr: 'Langues', ar: 'لغات' },
    statsAts: { en: 'ATS Ready', fr: 'Compatible ATS', ar: 'متوافق ATS' },
    faqTitle: { en: 'Questions, answered', fr: 'Questions fréquentes', ar: 'أسئلة شائعة' },
    faq1Q: { en: 'Is EliteCV free?', fr: 'EliteCV est-il gratuit ?', ar: 'هل EliteCV مجاني؟' },
    faq1A: { en: 'Yes. Create unlimited CVs with every template at no cost.', fr: 'Oui. Créez des CV illimités gratuitement.', ar: 'نعم. أنشئ سيرًا غير محدودة بكل القوالب مجانًا.' },
    faq2Q: { en: 'Will my CV pass ATS?', fr: 'Mon CV passera-t-il les ATS ?', ar: 'هل ستمر سيرتي عبر أنظمة ATS؟' },
    faq2A: { en: 'Yes. Templates like Atlas are built specifically for applicant tracking systems.', fr: 'Oui. Des modèles comme Atlas sont conçus pour les ATS.', ar: 'نعم. قوالب مثل Atlas مصممة خصيصًا لأنظمة التتبع.' },
    faq3Q: { en: 'Can I use Arabic or French?', fr: 'Puis-je utiliser l\'arabe ou le français ?', ar: 'هل يمكنني استخدام العربية أو الفرنسية؟' },
    faq3A: { en: 'Full interface and content support for English, French and Arabic (RTL).', fr: 'Interface et contenu complets en anglais, français et arabe (RTL).', ar: 'دعم كامل للواجهة والمحتوى بالإنجليزية والفرنسية والعربية.' },
    faq4Q: { en: 'What format do I download?', fr: 'Quel format de téléchargement ?', ar: 'بأي صيغة أحمل؟' },
    faq4A: { en: 'High-quality PDF optimized for both screen and print.', fr: 'PDF haute qualité optimisé écran et impression.', ar: 'PDF عالي الجودة محسّن للشاشة والطباعة.' },
    ctaTitle: { en: 'Your next role starts with a better CV.', fr: 'Votre prochain poste commence par un meilleur CV.', ar: 'وظيفتك القادمة تبدأ بسيرة أفضل.' },
    ctaDesc: { en: 'Join professionals who stopped sending average resumes.', fr: 'Rejoignez ceux qui ont arrêté d\'envoyer des CV moyens.', ar: 'انضم لمن توقفوا عن إرسال سير متوسطة.' },
    ctaBtn: { en: 'Start free — no card needed', fr: 'Commencer gratuitement', ar: 'ابدأ مجانًا — بدون بطاقة' },
    free: { en: 'Free forever', fr: 'Gratuit à vie', ar: 'مجاني للأبد' },
    noCard: { en: 'No credit card', fr: 'Sans carte', ar: 'بدون بطاقة' },
    trusted: { en: 'Trusted by candidates targeting', fr: 'Utilisé par des candidats visant', ar: 'موثوق من مرشحين يستهدفون' }
  };

  const templateShowcase = [
    { name: 'Elite', tag: 'Premium', color: 'from-amber-600 to-yellow-500' },
    { name: 'Parisian', tag: 'Luxury', color: 'from-rose-500 to-pink-400' },
    { name: 'Silicon Valley', tag: 'Tech', color: 'from-cyan-500 to-blue-600' },
    { name: 'Atlas', tag: 'ATS', color: 'from-slate-700 to-slate-900' },
    { name: 'Zenith', tag: 'Modern', color: 'from-violet-500 to-purple-600' },
    { name: 'Minimal', tag: 'Clean', color: 'from-neutral-400 to-neutral-600' },
    { name: 'Quantum', tag: 'Classic', color: 'from-stone-600 to-stone-800' },
    { name: 'Spectrum', tag: 'Creative', color: 'from-fuchsia-500 to-orange-400' },
  ];

  return (
    <div className="bg-[#0a0a0f] text-white overflow-x-hidden min-h-screen" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Nav */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-600 flex items-center justify-center text-white text-lg font-black shadow-lg shadow-orange-500/20">
              E
            </div>
            <span className="text-xl font-bold tracking-tight">EliteCV</span>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={lang}
              onChange={(e) => onLangChange(e.target.value as Language)}
              className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs font-semibold text-white/70 focus:outline-none focus:border-white/30 cursor-pointer appearance-none"
            >
              <option value="en" className="bg-[#0a0a0f]">EN</option>
              <option value="fr" className="bg-[#0a0a0f]">FR</option>
              <option value="ar" className="bg-[#0a0a0f]">AR</option>
            </select>
            <button
              onClick={onStart}
              className="px-6 py-2.5 bg-white text-black rounded-full text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-all duration-300"
            >
              {t.start[lang]}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-36 pb-28 px-6 overflow-hidden">
        {/* Glow orbs */}
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-violet-600/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-400 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Gemini AI · 28 Templates · EN/FR/AR
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6">
            {t.heroTitle1[lang]}
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 bg-clip-text text-transparent">
              {t.heroTitle2[lang]}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-12">
            {t.heroDesc[lang]}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStart}
              className="group w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-black rounded-full text-sm font-bold uppercase tracking-wider hover:shadow-2xl hover:shadow-orange-500/30 hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
            >
              {t.buildNow[lang]}
              <i className={`fa ${isRtl ? 'fa-arrow-left' : 'fa-arrow-right'} text-xs group-hover:translate-x-1 transition-transform`} />
            </button>

            <button
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.pdf,.doc,.docx';
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) (window as any).handleCVUpload?.(file);
                };
                input.click();
              }}
              className="w-full sm:w-auto px-10 py-4 border border-white/15 text-white/80 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-white/5 hover:border-white/30 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <i className="fa fa-upload text-xs" />
              {t.haveCV[lang]}
            </button>
          </div>
        </div>
      </section>

      {/* Trusted */}
      <section className="py-10 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30 mb-6">{t.trusted[lang]}</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 text-white/25 text-lg font-semibold">
            {['Google', 'Amazon', 'Meta', 'Apple', 'Microsoft', 'McKinsey'].map((c) => (
              <span key={c} className="hover:text-white/50 transition-colors">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-16 tracking-tight">{t.featuresTitle[lang]}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: 'fa-wand-magic-sparkles', title: t.f1[lang], desc: t.f1d[lang], gradient: 'from-blue-500 to-cyan-400' },
              { icon: 'fa-layer-group', title: t.f2[lang], desc: t.f2d[lang], gradient: 'from-violet-500 to-purple-400' },
              { icon: 'fa-file-pen', title: t.f3[lang], desc: t.f3d[lang], gradient: 'from-emerald-500 to-teal-400' },
            ].map((f, i) => (
              <div
                key={i}
                onClick={onStart}
                className="group p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/15 hover:bg-white/[0.06] transition-all duration-400 cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-white text-lg mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <i className={`fa ${f.icon}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-white/45 leading-relaxed text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates showcase */}
      <section className="py-28 px-6 bg-gradient-to-b from-transparent to-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">{t.templatesTitle[lang]}</h2>
            <p className="text-white/40">{t.templatesSub[lang]}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
            {templateShowcase.map((tpl, i) => (
              <div
                key={i}
                onClick={onStart}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-white/20 transition-all duration-400 hover:scale-[1.03]"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tpl.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                <div className="absolute inset-0 bg-[#12121a] p-5 flex flex-col">
                  <div className={`h-1.5 w-12 rounded-full bg-gradient-to-r ${tpl.color} mb-4`} />
                  <div className="space-y-2 flex-1">
                    <div className="h-1 w-full bg-white/10 rounded" />
                    <div className="h-1 w-4/5 bg-white/10 rounded" />
                    <div className="h-1 w-3/5 bg-white/10 rounded" />
                    <div className="h-1 w-full bg-white/5 rounded mt-4" />
                    <div className="h-1 w-full bg-white/5 rounded" />
                    <div className="h-1 w-2/3 bg-white/5 rounded" />
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs font-bold text-white/70">{tpl.name}</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-white/50">{tpl.tag}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={onStart}
              className="px-8 py-3 border border-white/15 rounded-full text-sm font-bold text-white/70 hover:text-white hover:border-white/30 transition-all"
            >
              {t.viewAll[lang]} →
            </button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-16 tracking-tight">{t.howTitle[lang]}</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { n: '01', title: t.s1[lang], desc: t.s1d[lang] },
              { n: '02', title: t.s2[lang], desc: t.s2d[lang] },
              { n: '03', title: t.s3[lang], desc: t.s3d[lang] },
            ].map((s, i) => (
              <div key={i} className="relative text-center md:text-left">
                <div className="text-5xl font-black text-white/5 mb-4">{s.n}</div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { n: '50K+', l: t.statsUsers[lang] },
            { n: '28+', l: t.statsTemplates[lang] },
            { n: '3', l: t.statsLangs[lang] },
            { n: '100%', l: t.statsAts[lang] },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-1">{s.n}</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/40">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12 tracking-tight">{t.faqTitle[lang]}</h2>
          <div className="space-y-4">
            {[
              { q: t.faq1Q[lang], a: t.faq1A[lang] },
              { q: t.faq2Q[lang], a: t.faq2A[lang] },
              { q: t.faq3Q[lang], a: t.faq3A[lang] },
              { q: t.faq4Q[lang], a: t.faq4A[lang] },
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                <h3 className="font-bold mb-2 text-white/90">{faq.q}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-600/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight">{t.ctaTitle[lang]}</h2>
          <p className="text-white/45 text-lg mb-10">{t.ctaDesc[lang]}</p>
          <button
            onClick={onStart}
            className="group px-12 py-5 bg-gradient-to-r from-amber-500 to-orange-600 text-black rounded-full text-sm font-bold uppercase tracking-wider hover:shadow-2xl hover:shadow-orange-500/25 hover:scale-[1.03] active:scale-95 transition-all duration-300 inline-flex items-center gap-3"
          >
            {t.ctaBtn[lang]}
            <i className={`fa ${isRtl ? 'fa-arrow-left' : 'fa-arrow-right'} text-xs`} />
          </button>
          <div className="flex items-center justify-center gap-6 mt-8 text-xs text-white/30">
            <span className="flex items-center gap-1.5"><i className="fa fa-check text-amber-500" /> {t.free[lang]}</span>
            <span className="flex items-center gap-1.5"><i className="fa fa-check text-amber-500" /> {t.noCard[lang]}</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white text-sm font-black">E</div>
            <span className="font-bold">EliteCV</span>
          </div>
          <p className="text-xs text-white/30">© 2026 EliteCV. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
