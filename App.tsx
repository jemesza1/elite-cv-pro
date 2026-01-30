
import React, { useState, useEffect, useRef } from 'react';
import { CVData, BuilderStep, TemplateType, AppView, Language } from './types';
import CVPreview from './components/CVPreview';
import CVPreviewNewTemplates from './components/CVPreview_NEW_TEMPLATES';
import NewProfessionalTemplates from './components/CVPreview_NEW_PRO_TEMPLATES';
import MoreProfessionalTemplates from './components/CVPreview_MORE_TEMPLATES';
import PremiumTemplates from './components/CVPreview_PREMIUM';
import LandingPage from './components/LandingPage';
import SelectionView from './components/SelectionView';
import { ProInput, ProButton, ProCard, ProBadge, ProSelect } from './components/ProInput';
import { ProProgress, MiniProgress } from './components/ProProgress';
import { ProTemplateGrid } from './components/ProTemplateGrid';
import { generateProfessionalSummary, refineBulletPoints, chatWithCoverLetterAssistant, parseCV, optimizeFullCV } from './services/geminiService';
import confetti from 'canvas-confetti';


const INITIAL_DATA: CVData = {
  personalInfo: {
    firstName: 'Raphaël', lastName: 'MARTIN', email: 'raphael.martin@gmail.com', phone: '06 06 06 06 06', website: '', location: 'Paris, France', jobTitle: 'COMMERCIAL', summary: 'Commercial diplômé, j\'ai une expérience de 3 ans en tant qu\'Assistant Commercial, et 4 ans en tant que Commercial chez DIOR. Je suis passionné et ai un bon sens relationnel que je saurai mettre au service de votre entreprise.', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&auto=format&fit=crop', birthDate: '', license: 'Permis B - Véhiculé', linkedin: 'linkedin.com/raphael-martin'
  },
  experience: [
    { id: '1', company: 'DIOR', position: 'Commercial', location: 'Paris', startDate: '2019', endDate: '2022', current: false, description: 'Prospection commerciale et gestion d\'un portefeuille client.\nDéveloppement de nouveaux produits et projets innovants.\nGarantir le bon déroulement des formations.\nParticiper au développement de marque.' },
    { id: '2', company: 'ORANGE', position: 'Assistant Commercial Export', location: 'Paris', startDate: '2016', endDate: '2019', current: false, description: 'Assurer la mise à jour des coordonnées administratives.\nTraiter les demandes d\'échantillon.\nAssurer l\'interface entreprise-client export.' }
  ],
  education: [
    { id: '1', institution: 'Université Sorbonne', degree: 'Licence Pro Commerce et Distribution', field: 'Commerce', location: 'Paris', graduationDate: '2012 - 2015', description: '' }
  ],
  skills: [
    { id: '1', name: 'Sens du contact', level: 'Expert' },
    { id: '2', name: 'Communication', level: 'Expert' },
    { id: '3', name: 'Capacité d\'adaptation', level: 'Advanced' }
  ],
  languages: [
    { id: '1', name: 'Français', level: 100 },
    { id: '2', name: 'Anglais', level: 85 },
    { id: '3', name: 'Espagnol', level: 60 }
  ], interests: ['Triathlon', 'Randonnée', 'Bénévolat'], isBilingual: false,
  coverLetter: { company: '', role: '', content: '' }
};

const TEMPLATE_OPTIONS: { id: TemplateType; title: string; description: string; category: string; badge?: string }[] = [
  // Original Templates (12)
  { id: 'zurich', title: 'The Zurich', description: 'Swiss Minimalist - Clean, structured, maximum readability', category: 'Modern' },
  { id: 'executive', title: 'The Executive', description: 'Corporate - Authority and professionalism', category: 'Executive' },
  { id: 'silicon', title: 'The Silicon', description: 'Tech Modern - Skills-first, developer-focused', category: 'Modern' },
  { id: 'vogue', title: 'The Vogue', description: 'Luxury Editorial - Elegant serif typography', category: 'Creative' },
  { id: 'harvard', title: 'The Harvard', description: 'Ivy League - Academic excellence, text-rich', category: 'Classic' },
  { id: 'ignite', title: 'The Ignite', description: 'Creative Bold - High-impact, distinctive design', category: 'Creative' },
  { id: 'montreal', title: 'The Montreal', description: 'Canadian Bilingual - French & English side-by-side', category: 'Special' },
  { id: 'oxford', title: 'The Oxford', description: 'Academic Researc - Publication-focused, scholarly', category: 'Classic' },
  { id: 'berlin', title: 'The Berlin', description: 'Modern Geometric - Bold typography, clean lines', category: 'Modern' },
  { id: 'tokyo', title: 'The Tokyo', description: 'Creative Professional - Unique layout, visual hierarchy', category: 'Creative' },
  { id: 'stockholm', title: 'The Stockholm', description: 'Scandinavian - Elegant whitespace, minimalist', category: 'Modern' },
  { id: 'dubai', title: 'The Dubai', description: 'Luxury Premium - Gold accents, executive presence', category: 'Executive' },

  // NEW Professional Series (4)
  { id: 'atlas', title: 'The Atlas', description: 'ATS-Friendly - Optimized for automated systems', category: 'Professional', badge: 'ATS' },
  { id: 'prism', title: 'The Prism', description: 'Modern Accent - Colorful icons, card design', category: 'Modern', badge: 'Popular' },
  { id: 'nexus', title: 'The Nexus', description: 'Two-Column - Dark sidebar, professional layout', category: 'Professional' },
  { id: 'zenith', title: 'The Zenith', description: 'Glassmorphism - Ultra-modern frosted glass effects', category: 'Creative', badge: 'Trending' },

  // NEW Advanced Series (8)
  { id: 'quantum', title: 'The Quantum', description: 'Elegant Serif - Classic typography, centered layout', category: 'Classic' },
  { id: 'spectrum', title: 'The Spectrum', description: 'Colorful Modern - Rainbow accents, vibrant design', category: 'Creative' },
  { id: 'cascade', title: 'The Cascade', description: 'Timeline Design - Visual project journey', category: 'Modern' },
  { id: 'meridian', title: 'The Meridian', description: 'Corporate Clean - Minimalist with accent bar', category: 'Professional' },
  { id: 'echo', title: 'The Echo', description: 'Monochrome - Minimal black & white aesthetic', category: 'Minimalist' },
  { id: 'nova', title: 'The Nova', description: 'Gradient Background - Vibrant purple-pink theme', category: 'Creative' },
  { id: 'orbit', title: 'The Orbit', description: 'Circular Elements - Modern with rounded design', category: 'Modern' },
  { id: 'vertex', title: 'The Vertex', description: 'Angular Shapes - Sharp geometric patterns', category: 'Creative' },

  // PREMIUM Series (4)
  { id: 'elite', title: 'The Elite', description: 'Gold & Black - High-end executive presence', category: 'Premium', badge: 'Elite' },
  { id: 'minimal', title: 'The Minimal', description: 'Pure Whitespace - Sophisticated minimalist design', category: 'Premium' },
  { id: 'silicon_valley', title: 'The Silicon Valley', description: 'Tech Engineering - Optimized for developers and engineers', category: 'Premium', badge: 'Tech' },
  { id: 'parisian', title: 'The Parisian', description: 'Luxury Style - Elegant typography and fashion aesthetic', category: 'Premium' }
];

const steps = [
  BuilderStep.TEMPLATE,
  BuilderStep.PHOTO,
  BuilderStep.PERSONAL,
  BuilderStep.EXPERIENCE,
  BuilderStep.EDUCATION,
  BuilderStep.SKILLS,
  BuilderStep.LANGUAGES,
  BuilderStep.SUMMARY,
  BuilderStep.FINALIZE
];

const getModelClass = (templateId: TemplateType) => {
  const mapping: Record<string, string> = {
    // Original Templates
    'zurich': 'model-zurich',
    'executive': 'model-executive',
    'silicon': 'model-silicon',
    'vogue': 'model-vogue',
    'harvard': 'model-harvard',
    'ignite': 'model-ignite',
    'montreal': 'model-montreal',
    'oxford': 'model-oxford',
    'berlin': 'model-berlin',
    'tokyo': 'model-tokyo',
    'stockholm': 'model-stockholm',
    'dubai': 'model-dubai',
    // NEW Templates
    'atlas': 'model-atlas',
    'prism': 'model-prism',
    'nexus': 'model-nexus',
    'zenith': 'model-zenith',
    'quantum': 'model-quantum',
    'spectrum': 'model-spectrum',
    'cascade': 'model-cascade',
    'meridian': 'model-meridian',
    'echo': 'model-echo',
    'nova': 'model-nova',
    'orbit': 'model-orbit',
    'vertex': 'model-vertex',
    // PREMIUM Templates
    'elite': 'model-elite',
    'minimal': 'model-minimal',
    'silicon_valley': 'model-silicon-valley',
    'parisian': 'model-parisian'
  };
  return mapping[templateId] || 'model-zurich';
};

const App: React.FC = () => {
  // Initialize state from localStorage if available
  const [view, setView] = useState<AppView>(() => {
    const saved = localStorage.getItem('elite_cv_view');
    if (saved === 'landing' || saved === 'selection' || saved === 'builder') return saved as AppView;
    return 'landing';
  });
  const [lang, setLang] = useState<Language>('fr');
  const [data, setData] = useState<CVData>(() => {
    const saved = localStorage.getItem('elite-cv-data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.personalInfo) return parsed;
      } catch (e) { console.error("Data restore failed", e); }
    }
    return INITIAL_DATA;
  });
  const [step, setStep] = useState<BuilderStep>(() => {
    const saved = localStorage.getItem('elite_cv_step');
    if (Object.values(BuilderStep).includes(saved as BuilderStep)) return saved as BuilderStep;
    return BuilderStep.TEMPLATE;
  });
  const [template, setTemplate] = useState<TemplateType>(() => {
    const saved = localStorage.getItem('elite_cv_template') as TemplateType;
    const validTemplates: TemplateType[] = [
      'zurich', 'executive', 'silicon', 'vogue', 'harvard', 'ignite', 'montreal', 'oxford',
      'berlin', 'tokyo', 'stockholm', 'dubai', 'atlas', 'prism', 'nexus', 'zenith',
      'quantum', 'spectrum', 'cascade', 'meridian', 'echo', 'nova', 'orbit', 'vertex',
      'elite', 'minimal', 'silicon_valley', 'parisian'
    ];
    if (validTemplates.includes(saved)) return saved;
    return 'zurich';
  });
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [cvScore, setCvScore] = useState(0);

  const calculateScore = () => {
    let score = 0;
    if (data.personalInfo.firstName && data.personalInfo.lastName) score += 15;
    if (data.personalInfo.photo) score += 10;
    if (data.personalInfo.summary && data.personalInfo.summary.length > 50) score += 15;
    if (data.experience.length >= 2) score += 20;
    else if (data.experience.length > 0) score += 10;
    if (data.education.length > 0) score += 15;
    if (data.skills.length >= 4) score += 15;
    if (data.languages.length > 0) score += 10;
    return score;
  };

  useEffect(() => {
    if (step === BuilderStep.FINALIZE) {
      const target = calculateScore();
      let current = 0;
      const timer = setInterval(() => {
        if (current >= target) {
          setCvScore(target);
          clearInterval(timer);
        } else {
          current += 1;
          setCvScore(current);
        }
      }, 15);
      return () => clearInterval(timer);
    }
  }, [step, data]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (window as any).handleCVUpload = (file: File) => {
      handleCVUpload(file);
    };
    (window as any).setAppView = (v: AppView) => {
      setView(v);
    };
  }, []);

  // Helper function to render correct template component
  const renderCVPreview = () => {
    // New Professional Templates (Atlas, Prism, Nexus, Zenith)
    if (['atlas', 'prism', 'nexus', 'zenith'].includes(template)) {
      return <NewProfessionalTemplates data={data} template={template} lang={lang} />;
    }

    // Premium Templates (Elite, Minimal, Silicon Valley, Parisian)
    if (['elite', 'minimal', 'silicon_valley', 'parisian'].includes(template)) {
      return <PremiumTemplates data={data} template={template} lang={lang} />;
    }

    // More Templates (Quantum, Spectrum, Cascade, Meridian, Echo, Nova, Orbit, Vertex)
    if (['quantum', 'spectrum', 'cascade', 'meridian', 'echo', 'nova', 'orbit', 'vertex'].includes(template)) {
      return <MoreProfessionalTemplates data={data} template={template} lang={lang} />;
    }

    // Berlin, Tokyo, Stockholm, Dubai
    if (['berlin', 'tokyo', 'stockholm', 'dubai'].includes(template)) {
      return <CVPreviewNewTemplates data={data} template={template} lang={lang} />;
    }

    // Original templates (Zurich, Executive, Silicon, Vogue, Harvard, Ignite, Montreal, Oxford)
    return <CVPreview data={data} template={template} lang={lang} />;
  };

  // Sync state to localStorage
  useEffect(() => {
    try { localStorage.setItem('elite-cv-data', JSON.stringify(data)); } catch (e) { }
  }, [data]);

  useEffect(() => {
    try { localStorage.setItem('elite_cv_step', step); } catch (e) { }
  }, [step]);

  useEffect(() => {
    try { localStorage.setItem('elite_cv_view', view); } catch (e) { }
  }, [view]);

  useEffect(() => {
    try { localStorage.setItem('elite_cv_template', template); } catch (e) { }
  }, [template]);

  const handleSelection = async (option: 'new' | 'import' | 'canada', fileData?: { base64: string, mimeType: string }) => {
    if (option === 'new') {
      setData({ ...INITIAL_DATA, isBilingual: false });
      setStep(BuilderStep.TEMPLATE);
      setView('builder');
    } else if (option === 'canada') {
      setData({ ...INITIAL_DATA, isBilingual: true });
      setTemplate('montreal'); // FIX: Use correct template ID
      setStep(BuilderStep.PERSONAL);
      setView('builder');
    } else if (option === 'import' && fileData) {
      setIsParsing(true);
      try {
        const parsedData = await parseCV(fileData.base64, fileData.mimeType);
        if (parsedData) {
          setData(parsedData);
          setStep(BuilderStep.TEMPLATE); // Redirect to Step 1
          setView('builder');
        }
      } catch (e) {
        alert("Parsing failed.");
      } finally {
        setIsParsing(false);
      }
    }
  };

  // Handle CV file upload from landing page
  const handleCVUpload = async (file: File) => {
    if (!file) return;

    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF or DOCX file.');
      return;
    }

    setIsParsing(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result as string;
        const base64Data = base64.split(',')[1]; // Remove data:mime;base64, prefix

        const parsedData = await parseCV(base64Data, file.type);
        if (parsedData) {
          setData(parsedData);
          setStep(BuilderStep.TEMPLATE);
          setView('builder');
        } else {
          alert('Could not extract data from CV. Please try again or fill manually.');
        }
        setIsParsing(false);
      };
      reader.onerror = () => {
        alert('Error reading file.');
        setIsParsing(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading file.');
      setIsParsing(false);
    }
  };

  // Expose handleCVUpload globally for landing page
  useEffect(() => {
    (window as any).handleCVUpload = handleCVUpload;
    return () => {
      delete (window as any).handleCVUpload;
    };
  }, []);

  useEffect(() => {
    if (step === BuilderStep.FINALIZE) {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [step]);

  const renderStepContent = () => {
    const inputCls = "mt-1 block w-full rounded-xl border-2 border-[var(--cv-border)] bg-[var(--cv-bg)] p-4 text-[var(--cv-text-main)] font-medium shadow-sm outline-none transition-all placeholder:text-[var(--cv-text-muted)]/50 focus:border-[var(--cv-accent)] focus:ring-4 focus:ring-[var(--cv-accent)]/10 text-sm";

    switch (step) {
      case BuilderStep.TEMPLATE:
        return (
          <div className="space-y-12 animate-fadeIn max-w-7xl mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <ProBadge variant="blue">Étape 1 sur 9</ProBadge>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 font-serif tracking-tight">Choisissez votre <span className="text-blue-600 italic">Héritage</span></h2>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">Sélectionnez le modèle qui définit le mieux votre parcours professionnel.</p>
            </div>

            <ProTemplateGrid
              templates={TEMPLATE_OPTIONS}
              selectedTemplate={template}
              onSelect={(id) => setTemplate(id)}
              showFilters={true}
              lang={lang}
            />

            <div className="flex justify-center pt-12 pb-20">
              <ProButton
                size="xl"
                variant="primary"
                onClick={() => setStep(BuilderStep.PHOTO)}
                icon="fa-arrow-right"
                iconPosition="right"
                className="shadow-2xl scale-110"
              >
                Continuer vers la photo
              </ProButton>
            </div>
          </div>
        );
      case BuilderStep.PHOTO:
        return (
          <div className="space-y-12 animate-fadeIn max-w-2xl mx-auto px-4 py-8">
            <div className="text-center space-y-4">
              <ProBadge variant="purple">Étape 2 sur 9</ProBadge>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 font-serif tracking-tight">Votre <span className="text-blue-600 italic">Portrait</span></h2>
              <p className="text-xl text-slate-500 font-medium">Une photo professionnelle augmente vos chances de 40%.</p>
            </div>

            <ProCard className="text-center py-12">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-64 h-64 md:w-80 md:h-80 rounded-[3rem] border-4 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center cursor-pointer hover:border-blue-500 transition-all overflow-hidden shadow-2xl mx-auto relative group"
              >
                {data.personalInfo.photo ? <img src={data.personalInfo.photo} className="w-full h-full object-cover" /> : <i className="fa fa-camera-retro text-6xl text-slate-300"></i>}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white font-bold text-xs uppercase tracking-widest backdrop-blur-sm">Changer la Photo</div>
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, photo: reader.result as string } }));
                  reader.readAsDataURL(file);
                }
              }} />
            </ProCard>

            <div className="flex justify-between pt-8">
              <ProButton variant="outline" onClick={() => setStep(BuilderStep.TEMPLATE)} icon="fa-arrow-left">Précédent</ProButton>
              <ProButton variant="primary" onClick={() => setStep(BuilderStep.PERSONAL)} icon="fa-arrow-right" iconPosition="right">Continuer</ProButton>
            </div>
          </div>
        );
      case BuilderStep.PERSONAL:
        return (
          <div className="space-y-12 animate-fadeIn max-w-3xl mx-auto px-4 py-8">
            <div className="text-center space-y-4">
              <ProBadge variant="blue">Étape 3 sur 9</ProBadge>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 font-serif tracking-tight">Vos <span className="text-blue-600 italic">Coordonnées</span></h2>
              <p className="text-xl text-slate-500 font-medium">Comment les recruteurs peuvent-ils vous joindre ?</p>
            </div>

            <ProCard>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <ProInput label="Prénom" icon="fa-user" value={data.personalInfo.firstName} onChange={val => setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, firstName: val } }))} />
                <ProInput label="Nom" icon="fa-user" value={data.personalInfo.lastName} onChange={val => setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, lastName: val } }))} />
                <div className="md:col-span-2">
                  <ProInput label="Titre du Poste" icon="fa-briefcase" value={data.personalInfo.jobTitle} onChange={val => setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, jobTitle: val } }))} placeholder="ex: Senior Project Manager" />
                </div>
                <ProInput label="E-mail" type="email" icon="fa-envelope" value={data.personalInfo.email} onChange={val => setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, email: val } }))} />
                <ProInput label="Téléphone" type="tel" icon="fa-phone" value={data.personalInfo.phone} onChange={val => setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, phone: val } }))} />
                <div className="md:col-span-2">
                  <ProInput label="Localisation" icon="fa-location-dot" value={data.personalInfo.location} onChange={val => setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, location: val } }))} placeholder="ex: Paris, France" />
                </div>
              </div>
            </ProCard>

            <div className="flex justify-between pt-8">
              <ProButton variant="outline" onClick={() => setStep(BuilderStep.PHOTO)} icon="fa-arrow-left">Précédent</ProButton>
              <ProButton variant="primary" onClick={() => setStep(BuilderStep.EXPERIENCE)} icon="fa-arrow-right" iconPosition="right">Continuer</ProButton>
            </div>
          </div>
        );
      case BuilderStep.EXPERIENCE:
        return (
          <div className="space-y-12 animate-fadeIn max-w-4xl mx-auto px-4 py-8">
            <div className="text-center space-y-4">
              <ProBadge variant="orange">Étape 4 sur 9</ProBadge>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 font-serif tracking-tight">Votre <span className="text-blue-600 italic">Parcours</span></h2>
              <p className="text-xl text-slate-500 font-medium">L'expérience est le cœur de votre CV.</p>
            </div>

            <div className="space-y-8">
              {data.experience.map((exp, idx) => (
                <ProCard key={exp.id} className="relative group">
                  <button
                    onClick={() => setData(p => ({ ...p, experience: p.experience.filter(x => x.id !== exp.id) }))}
                    className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100 z-10"
                  >
                    <i className="fa fa-trash-can"></i>
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <ProInput label="Poste Occupé" icon="fa-briefcase" value={exp.position} onChange={val => setData(p => ({ ...p, experience: p.experience.map(x => x.id === exp.id ? { ...x, position: val } : x) }))} />
                    <ProInput label="Entreprise" icon="fa-building" value={exp.company} onChange={val => setData(p => ({ ...p, experience: p.experience.map(x => x.id === exp.id ? { ...x, company: val } : x) }))} />
                    <ProInput label="Dates" icon="fa-calendar" value={exp.startDate + (exp.endDate ? ' - ' + exp.endDate : '')} onChange={val => {
                      const parts = val.split(' - ');
                      setData(p => ({ ...p, experience: p.experience.map(x => x.id === exp.id ? { ...x, startDate: parts[0] || '', endDate: parts[1] || '' } : x) }));
                    }} placeholder="Jan 2020 - Présent" />
                    <ProInput label="Ville" icon="fa-location-dot" value={exp.location} onChange={val => setData(p => ({ ...p, experience: p.experience.map(x => x.id === exp.id ? { ...x, location: val } : x) }))} />
                    <div className="md:col-span-2 space-y-4">
                      <div className="flex justify-between items-center bg-slate-50/50 p-2 rounded-xl border border-slate-100">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Missions et Réalisations</span>
                        <ProButton
                          variant="success"
                          size="xs"
                          icon="fa-wand-magic-sparkles"
                          loading={isAiLoading}
                          onClick={async () => {
                            setIsAiLoading(true);
                            const refined = await refineBulletPoints(exp.position, exp.description, lang);
                            if (refined && refined.length > 0) {
                              setData(p => ({
                                ...p,
                                experience: p.experience.map(x => x.id === exp.id ? { ...x, description: refined.join('\n') } : x)
                              }));
                            }
                            setIsAiLoading(false);
                          }}
                        >
                          Optimiser avec l'IA
                        </ProButton>
                      </div>
                      <ProInput multiline label="" value={exp.description} onChange={val => setData(p => ({ ...p, experience: p.experience.map(x => x.id === exp.id ? { ...x, description: val } : x) }))} helpText="Décrivez vos accomplissements. L'IA peut vous aider à utiliser des verbes d'action puissants." />
                    </div>
                  </div>
                </ProCard>
              ))}

              <ProButton variant="outline" fullWidth onClick={() => setData(p => ({ ...p, experience: [...p.experience, { id: Math.random().toString(), company: '', position: '', location: '', startDate: '', endDate: '', current: false, description: '' }] }))} icon="fa-plus">Ajouter une expérience</ProButton>
            </div>

            <div className="flex justify-between pt-12">
              <ProButton variant="outline" onClick={() => setStep(BuilderStep.PERSONAL)} icon="fa-arrow-left">Précédent</ProButton>
              <ProButton variant="primary" onClick={() => setStep(BuilderStep.EDUCATION)} icon="fa-arrow-right" iconPosition="right">Continuer</ProButton>
            </div>
          </div>
        );
      case BuilderStep.EDUCATION:
        return (
          <div className="space-y-12 animate-fadeIn max-w-4xl mx-auto px-4 py-8">
            <div className="text-center space-y-4">
              <ProBadge variant="green">Étape 5 sur 9</ProBadge>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 font-serif tracking-tight">Votre <span className="text-blue-600 italic">Formation</span></h2>
              <p className="text-xl text-slate-500 font-medium">Vos diplômes et certifications académiques.</p>
            </div>

            <div className="space-y-8">
              {data.education.map((edu) => (
                <ProCard key={edu.id} className="relative">
                  <button
                    onClick={() => setData(p => ({ ...p, education: p.education.filter(x => x.id !== edu.id) }))}
                    className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all z-10"
                  >
                    <i className="fa fa-trash-can"></i>
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <ProInput label="Diplôme / École" icon="fa-graduation-cap" value={edu.degree} onChange={val => setData(p => ({ ...p, education: p.education.map(x => x.id === edu.id ? { ...x, degree: val } : x) }))} />
                    <ProInput label="Établissement" icon="fa-building-columns" value={edu.institution} onChange={val => setData(p => ({ ...p, education: p.education.map(x => x.id === edu.id ? { ...x, institution: val } : x) }))} />
                    <ProInput label="Date d'obtention" icon="fa-calendar-check" value={edu.graduationDate} onChange={val => setData(p => ({ ...p, education: p.education.map(x => x.id === edu.id ? { ...x, graduationDate: val } : x) }))} />
                  </div>
                </ProCard>
              ))}
              <ProButton variant="outline" fullWidth onClick={() => setData(p => ({ ...p, education: [...p.education, { id: Math.random().toString(), institution: '', degree: '', field: '', location: '', graduationDate: '', description: '' }] }))} icon="fa-plus">Ajouter un diplôme</ProButton>
            </div>

            <div className="flex justify-between pt-12">
              <ProButton variant="outline" onClick={() => setStep(BuilderStep.EXPERIENCE)} icon="fa-arrow-left">Précédent</ProButton>
              <ProButton variant="primary" onClick={() => setStep(BuilderStep.SKILLS)} icon="fa-arrow-right" iconPosition="right">Continuer</ProButton>
            </div>
          </div>
        );
      case BuilderStep.SKILLS:
        return (
          <div className="space-y-12 animate-fadeIn max-w-4xl mx-auto px-4 py-8">
            <div className="text-center space-y-4">
              <ProBadge variant="purple">Étape 6 sur 9</ProBadge>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 font-serif tracking-tight">Vos <span className="text-blue-600 italic">Atouts</span></h2>
              <p className="text-xl text-slate-500 font-medium">Vos compétences clés pour le poste.</p>
            </div>

            <ProCard>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.skills.map(s => (
                  <div key={s.id} className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 flex flex-col md:flex-row items-center gap-6 group hover:border-blue-300 transition-all">
                    <div className="flex-1 w-full">
                      <ProInput
                        label=""
                        placeholder="Nom de la compétence..."
                        icon="fa-star"
                        value={s.name}
                        onChange={val => setData(p => ({ ...p, skills: p.skills.map(x => x.id === s.id ? { ...x, name: val } : x) }))}
                      />
                    </div>
                    <div className="w-full md:w-64">
                      <ProSelect
                        label=""
                        icon="fa-gauge-high"
                        value={s.level}
                        onChange={val => setData(p => ({ ...p, skills: p.skills.map(x => x.id === s.id ? { ...x, level: val as any } : x) }))}
                        options={[
                          { value: 'Beginner', label: 'Débutant' },
                          { value: 'Intermediate', label: 'Intermédiaire' },
                          { value: 'Advanced', label: 'Avancé' },
                          { value: 'Expert', label: 'Expert' }
                        ]}
                      />
                    </div>
                    <button onClick={() => setData(p => ({ ...p, skills: p.skills.filter(x => x.id !== s.id) }))} className="text-slate-300 hover:text-red-500 transition-colors"><i className="fa fa-times"></i></button>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <ProButton variant="outline" fullWidth onClick={() => setData(p => ({ ...p, skills: [...p.skills, { id: Math.random().toString(), name: '', level: 'Intermediate' }] }))} icon="fa-plus">Ajouter une compétence</ProButton>
              </div>
            </ProCard>

            <div className="flex justify-between pt-12">
              <ProButton variant="outline" onClick={() => setStep(BuilderStep.EDUCATION)} icon="fa-arrow-left">Précédent</ProButton>
              <ProButton variant="primary" onClick={() => setStep(BuilderStep.LANGUAGES)} icon="fa-arrow-right" iconPosition="right">Continuer</ProButton>
            </div>
          </div>
        );
      case BuilderStep.LANGUAGES:
        return (
          <div className="space-y-12 animate-fadeIn max-w-4xl mx-auto px-4 py-8">
            <div className="text-center space-y-4">
              <ProBadge variant="blue">Étape 7 sur 9</ProBadge>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 font-serif tracking-tight">Maîtrise <span className="text-blue-600 italic">Linguistique</span></h2>
              <p className="text-xl text-slate-500 font-medium">Parlez-vous la langue du recruteur ?</p>
            </div>

            <ProCard>
              <div className="space-y-6">
                {data.languages.map(l => (
                  <div key={l.id} className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-100 flex flex-col md:flex-row items-center gap-6 group">
                    <div className="w-full md:w-1/3">
                      <ProInput
                        label=""
                        placeholder="Langue (ex: Français, Anglais...)"
                        icon="fa-language"
                        value={l.name}
                        onChange={val => setData(p => ({ ...p, languages: p.languages.map(x => x.id === l.id ? { ...x, name: val } : x) }))}
                      />
                    </div>
                    <div className="flex-1 w-full flex items-center gap-4">
                      <div className="flex-1 h-3 bg-white rounded-full overflow-hidden border-2 border-slate-200 p-[2px]">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500" style={{ width: `${l.level}%` }}></div>
                      </div>
                      <input
                        type="range" min="0" max="100"
                        className="w-32 accent-blue-600"
                        value={l.level}
                        onChange={e => setData(p => ({ ...p, languages: p.languages.map(x => x.id === l.id ? { ...x, level: parseInt(e.target.value) } : x) }))}
                      />
                      <span className="text-xs font-black text-slate-400 w-10 text-right">{l.level}%</span>
                    </div>
                    <button onClick={() => setData(p => ({ ...p, languages: p.languages.filter(x => x.id !== l.id) }))} className="text-slate-300 hover:text-red-500 transition-colors"><i className="fa fa-trash-can"></i></button>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <ProButton variant="outline" fullWidth onClick={() => setData(p => ({ ...p, languages: [...p.languages, { id: Math.random().toString(), name: '', level: 80 }] }))} icon="fa-plus">Ajouter une langue</ProButton>
              </div>
            </ProCard>

            <div className="flex justify-between pt-12">
              <ProButton variant="outline" onClick={() => setStep(BuilderStep.SKILLS)} icon="fa-arrow-left">Précédent</ProButton>
              <ProButton variant="primary" onClick={() => setStep(BuilderStep.SUMMARY)} icon="fa-arrow-right" iconPosition="right">Continuer</ProButton>
            </div>
          </div>
        );
      case BuilderStep.SUMMARY:
        return (
          <div className="space-y-12 animate-fadeIn max-w-4xl mx-auto px-4 py-8">
            <div className="text-center space-y-4">
              <ProBadge variant="purple">Étape 8 sur 9</ProBadge>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 font-serif tracking-tight">Votre <span className="text-blue-600 italic">Signature</span></h2>
              <p className="text-xl text-slate-500 font-medium">L'IA Gemini optimise votre profil pour un impact maximum.</p>
            </div>

            <ProCard className="relative">
              <div className="absolute top-6 right-8">
                <ProButton
                  size="sm"
                  variant="success"
                  onClick={async () => {
                    setIsAiLoading(true);
                    const s = await generateProfessionalSummary(data.personalInfo.jobTitle, data.skills.map(sk => sk.name), lang);
                    if (s) setData(p => ({ ...p, personalInfo: { ...p.personalInfo, summary: s } }));
                    setIsAiLoading(false);
                  }}
                  icon="fa-wand-magic-sparkles"
                  loading={isAiLoading}
                >
                  {lang === 'fr' ? 'Génération Intelligente' : lang === 'ar' ? 'توليد ذكي' : 'Smart Generation'}
                </ProButton>
              </div>
              <div className="mt-8">
                <ProInput
                  multiline
                  label="Résumé Professionnel"
                  rows={10}
                  value={data.personalInfo.summary}
                  onChange={val => setData(p => ({ ...p, personalInfo: { ...p.personalInfo, summary: val } }))}
                />
              </div>
            </ProCard>

            <div className="flex justify-between pt-12">
              <ProButton variant="outline" onClick={() => setStep(BuilderStep.LANGUAGES)} icon="fa-arrow-left">Précédent</ProButton>
              <ProButton variant="primary" onClick={() => setStep(BuilderStep.FINALIZE)} icon="fa-arrow-right" iconPosition="right">Terminer le CV</ProButton>
            </div>
          </div>
        );
      case BuilderStep.FINALIZE:
        return (
          <div className="space-y-12 animate-fadeIn max-w-2xl mx-auto px-4 py-16 text-center">
            <div className="w-32 h-32 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center text-6xl mx-auto shadow-2xl shadow-green-500/20 border-4 border-white animate-bounce-slow">
              <i className="fa fa-check"></i>
            </div>

            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 font-serif tracking-tight">Un <span className="text-blue-600 italic">Chef-d'œuvre</span>.</h2>
              <p className="text-xl text-slate-500 font-medium">Votre profil professionnel est maintenant prêt à impressionner.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
              <ProCard className="flex flex-col items-center justify-center p-12 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                <div className="relative w-40 h-40 mb-6 font-black text-4xl text-slate-900 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="80" cy="80" r="70" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
                    <circle cx="80" cy="80" r="70" fill="transparent" stroke="currentColor" strokeWidth="12"
                      className="text-blue-600 transition-all duration-1000 ease-out"
                      strokeDasharray={440}
                      strokeDashoffset={440 - (440 * cvScore) / 100}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>{cvScore}%</span>
                </div>
                <h4 className="font-black uppercase tracking-widest text-xs text-slate-400">Score de Performance</h4>
                <p className="text-sm font-bold text-slate-500 mt-2 text-center">Optimisé pour les systèmes ATS</p>
              </ProCard>

              <div className="space-y-6">
                <ProCard className="p-8 text-left">
                  <h3 className="font-black text-xl text-slate-900 mb-6 flex items-center gap-3">
                    <i className="fa fa-shield-halved text-blue-600"></i> Audit de Qualité
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Informations de Contact', ok: !!data.personalInfo.email && !!data.personalInfo.phone },
                      { label: 'Photo Professionnelle', ok: !!data.personalInfo.photo },
                      { label: 'Résumé Optimisé AI', ok: data.personalInfo.summary.length > 50 },
                      { label: 'Profondeur d\'Expérience', ok: data.experience.length >= 2 },
                      { label: 'Validation des Compétences', ok: data.skills.length >= 4 }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                        <span className="text-sm font-bold text-slate-600">{item.label}</span>
                        <i className={`fa ${item.ok ? 'fa-circle-check text-green-500' : 'fa-circle-exclamation text-slate-200'} text-lg`}></i>
                      </div>
                    ))}
                  </div>
                </ProCard>

                <ProButton
                  fullWidth
                  size="xl"
                  onClick={() => window.print()}
                  icon="fa-cloud-arrow-down"
                  className="shadow-2xl hover:scale-105 py-6"
                >
                  Télécharger mon CV (PDF)
                </ProButton>
              </div>
            </div>

            <ProCard className="text-left bg-blue-50/50 border-2 border-dashed border-blue-200 p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <ProBadge variant="blue">Alpha AI</ProBadge>
              </div>
              <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                <div className="flex-1">
                  <h3 className="text-blue-900 font-black text-xl flex items-center gap-3 mb-4 uppercase tracking-tight">
                    <i className="fa fa-robot text-blue-500"></i> Audit Professionnel Gemini AI
                  </h3>
                  <p className="text-sm text-blue-700/70 font-semibold mb-6">L'intelligence artificielle analyse la structure, le ton et la pertinence de votre CV pour maximiser vos chances de recrutement.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ProButton
                      variant="primary"
                      size="lg"
                      icon="fa-magnifying-glass-chart"
                      loading={isAiLoading}
                      onClick={async () => {
                        setIsAiLoading(true);
                        // Simulate full optimization and show a success message
                        const optimized = await optimizeFullCV(data, template, lang);
                        if (optimized) {
                          setData(optimized);
                          confetti({
                            particleCount: 150,
                            spread: 70,
                            origin: { y: 0.6 }
                          });
                        }
                        setIsAiLoading(false);
                      }}
                    >
                      Lancer l'Audit Complet
                    </ProButton>
                    <div className="px-6 py-3 bg-white/50 backdrop-blur rounded-2xl border border-blue-200 text-[10px] font-black uppercase tracking-widest text-blue-900/40 flex items-center justify-center">
                      Recommandé par nos experts
                    </div>
                  </div>
                </div>
              </div>
            </ProCard>

            <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.3em] italic mt-12">
              EliteCV Engine v2.4 • Intelligence Artificielle Intégrée
            </p>
          </div>
        );
      default: return <div className="p-10 text-center font-black opacity-20">Chargement...</div>;
    }
  };

  if (view === 'landing') return <LandingPage onStart={() => setView('selection')} lang={lang} onLangChange={setLang} />;
  if (view === 'selection') return <SelectionView onSelect={handleSelection} onBack={() => setView('landing')} lang={lang} />;

  const currentStepIndex = steps.indexOf(step);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white overflow-x-hidden print:block print:h-auto print:overflow-visible">
      {isAiLoading && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-3xl z-[100] flex items-center justify-center">
          <div className="bg-[var(--cv-bg)] p-12 md:p-20 rounded-[var(--cv-radius)] text-center space-y-6 mx-4 shadow-2xl">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-[var(--cv-accent)] rounded-2xl flex items-center justify-center text-white text-4xl mx-auto animate-spin-slow shadow-lg shadow-blue-500/20"><i className="fa fa-arrows-rotate"></i></div>
            <p className="font-black text-[var(--cv-text-main)] uppercase tracking-widest text-xs">AI Optimization in progress...</p>
          </div>
        </div>
      )}

      {isParsing && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-3xl z-[100] flex items-center justify-center">
          <div className="bg-[var(--cv-bg)] p-12 md:p-20 rounded-[var(--cv-radius)] text-center space-y-6 mx-4 shadow-2xl">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-[var(--cv-accent)] rounded-2xl flex items-center justify-center text-white text-4xl mx-auto animate-spin-slow shadow-lg shadow-blue-500/20">
              <i className="fa fa-cloud-arrow-up"></i>
            </div>
            <p className="font-black text-[var(--cv-text-main)] uppercase tracking-widest text-xs">Analyse et importation de vos données...</p>
          </div>
        </div>
      )}

      {/* Sidebar - Executive Professional */}
      <aside className="no-print hidden md:flex w-[350px] bg-white border-r border-slate-100 flex-col p-8 sticky top-0 h-screen overflow-y-auto shadow-2xl z-50">
        <div className="flex items-center gap-5 mb-12 cursor-pointer group" onClick={() => setView('landing')}>
          <div className="w-14 h-14 bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl flex items-center justify-center text-white font-serif font-black text-3xl shadow-xl ring-2 ring-blue-500/20 group-hover:scale-105 transition-transform duration-500">E</div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight font-serif">EliteCV</h1>
            <p className="text-[11px] text-blue-600 font-bold tracking-[0.2em] uppercase">Professional Suite v2.4</p>
          </div>
        </div>

        <ProProgress
          currentStep={step}
          onStepClick={(s) => setStep(s)}
          variant="vertical"
          lang={lang}
        />

        <div className="mt-auto pt-8 space-y-4 border-t border-slate-100">
          <button
            className="w-full group flex items-center justify-between px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-500 hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm"
            onClick={() => document.documentElement.classList.toggle('dark-mode')}
          >
            <span>Thème sombre</span>
            <i className="fa fa-moon text-base group-hover:rotate-12 transition-transform duration-500"></i>
          </button>

          <button
            className="w-full flex items-center justify-center gap-2 p-3 text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors"
            onClick={() => {
              window.location.href = window.location.origin + window.location.pathname + '?v=' + Date.now();
            }}
          >
            <i className="fa fa-refresh"></i>
            <span>Réinitialiser tout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 relative flex flex-col min-h-screen bg-slate-50/30">
        {/* Mobile Header / Mini Progress */}
        <header className="no-print md:hidden p-6 bg-white border-b border-slate-100 sticky top-0 z-[100] shadow-md">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black">E</div>
              <span className="font-black text-xl tracking-tighter text-slate-900 font-serif">EliteCV</span>
            </div>
            <ProButton size="sm" variant={showMobilePreview ? 'secondary' : 'primary'} onClick={() => setShowMobilePreview(!showMobilePreview)}>
              {showMobilePreview ? 'Éditer' : 'Aperçu'}
            </ProButton>
          </div>
          <MiniProgress current={currentStepIndex + 1} total={steps.length} lang={lang} />
        </header>

        {/* Builder Area & Preview Area (Split View on Desktop) */}
        <div className="flex flex-col lg:flex-row flex-1 print:hidden">
          {/* Main Content Area (Form) */}
          <section className={`flex-1 p-6 md:p-12 lg:p-16 max-w-5xl mx-auto w-full pb-64 transition-all relative ${showMobilePreview ? 'hidden md:block' : 'block'}`}>
            {/* Current Model Indicator */}
            {step !== BuilderStep.TEMPLATE && (
              <div className="absolute top-8 right-8 z-10 hidden md:block">
                <div className="flex items-center gap-2 bg-white/50 backdrop-blur-md border border-slate-200 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => setStep(BuilderStep.TEMPLATE)}>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Modèle:</span>
                  <span className="text-xs font-black text-blue-600 uppercase tracking-tight">{TEMPLATE_OPTIONS.find(t => t.id === template)?.title}</span>
                  <i className="fa fa-rotate text-[10px] text-slate-300 group-hover:text-blue-500 transition-colors ml-1"></i>
                </div>
              </div>
            )}
            {renderStepContent()}
          </section>

          {/* Split Vertical Divider */}
          <div className="hidden lg:block w-[1px] bg-slate-200 h-full shadow-inner"></div>

          {/* Preview Area (Sticky on Desktop) */}
          {step !== BuilderStep.TEMPLATE && (
            <section className={`no-print flex-1 bg-slate-200/30 p-4 md:p-8 lg:p-12 lg:flex overflow-y-auto transition-all ${showMobilePreview ? 'block fixed inset-0 z-[110] bg-white pt-24' : 'hidden'}`}>
              <div id="cv-preview" className={`cv-theme-wrapper ${getModelClass(template)} rounded-2xl shadow-3xl transform scale-[0.85] lg:scale-100 origin-top`}>
                <div className="cv-container">
                  {renderCVPreview()}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Builder Footer Navigation (Mobile Fixed Only) */}
        {!showMobilePreview && step !== BuilderStep.FINALIZE && step !== BuilderStep.TEMPLATE && (
          <div className="no-print fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 p-6 flex justify-between items-center z-50 md:hidden">
            <ProButton
              variant="outline"
              onClick={() => setStep(steps[currentStepIndex - 1])}
              disabled={currentStepIndex === 0}
              icon="fa-arrow-left"
            >
              Retour
            </ProButton>
            <ProButton
              variant="primary"
              onClick={() => setStep(steps[currentStepIndex + 1])}
              disabled={currentStepIndex === steps.length - 1}
              icon="fa-arrow-right"
              iconPosition="right"
            >
              Suivant
            </ProButton>
          </div>
        )}

        {/* Hidden Print Version */}
        <div className="hidden print:block w-full">
          <div className={`cv-theme-wrapper ${getModelClass(template)}`}>
            <div className="cv-container">
              {renderCVPreview()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
