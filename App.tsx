
import React, { useState, useEffect, useRef } from 'react';
import { CVData, BuilderStep, TemplateType, AppView, Language } from './types';
import CVPreview from './components/CVPreview';
import LandingPage from './components/LandingPage';
import SelectionView from './components/SelectionView';
import { generateProfessionalSummary, refineBulletPoints, chatWithCoverLetterAssistant, parseCV, optimizeFullCV } from './services/geminiService';

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

const TEMPLATE_OPTIONS: { id: TemplateType; title: string; description: string; category: string }[] = [
  { id: 'zurich', title: 'The Zurich', description: 'Swiss Minimalist - Clean, structured, maximum readability', category: 'Modern' },
  { id: 'executive', title: 'The Executive', description: 'Corporate - Authority and professionalism', category: 'Executive' },
  { id: 'silicon', title: 'The Silicon', description: 'Tech Modern - Skills-first, developer-focused', category: 'Modern' },
  { id: 'vogue', title: 'The Vogue', description: 'Luxury Editorial - Elegant serif typography', category: 'Creative' },
  { id: 'harvard', title: 'The Harvard', description: 'Ivy League - Academic excellence, text-rich', category: 'Classic' },
  { id: 'ignite', title: 'The Ignite', description: 'Creative Bold - High-impact, distinctive design', category: 'Creative' },
  { id: 'montreal', title: 'The Montreal', description: 'Canadian Bilingual - French & English side-by-side', category: 'Special' },
  { id: 'oxford', title: 'The Oxford', description: 'Academic Research - Publication-focused, scholarly', category: 'Classic' },
  { id: 'berlin', title: 'The Berlin', description: 'Modern Geometric - Bold typography, clean lines', category: 'Modern' },
  { id: 'tokyo', title: 'The Tokyo', description: 'Creative Professional - Unique layout, visual hierarchy', category: 'Creative' },
  { id: 'stockholm', title: 'The Stockholm', description: 'Scandinavian - Elegant whitespace, minimalist', category: 'Modern' },
  { id: 'dubai', title: 'The Dubai', description: 'Luxury Premium - Gold accents, executive presence', category: 'Executive' }
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
    'dubai': 'model-dubai'
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
    const validTemplates: TemplateType[] = ['zurich', 'executive', 'silicon', 'vogue', 'harvard', 'ignite', 'montreal', 'oxford', 'berlin', 'tokyo', 'stockholm', 'dubai'];
    if (validTemplates.includes(saved)) return saved;
    return 'zurich';
  });
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      setTemplate('international');
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

  const renderStepContent = () => {
    const inputCls = "mt-1 block w-full rounded-xl border-2 border-[var(--cv-border)] bg-[var(--cv-bg)] p-4 text-[var(--cv-text-main)] font-medium shadow-sm outline-none transition-all placeholder:text-[var(--cv-text-muted)]/50 focus:border-[var(--cv-accent)] focus:ring-4 focus:ring-[var(--cv-accent)]/10 text-sm";

    switch (step) {
      case BuilderStep.TEMPLATE:
        return (
          <div className="flex flex-col h-full bg-[var(--cv-bg)] -mt-10 md:-mt-20 lg:-mt-28 -mx-10 md:-mx-20 lg:-mx-28 overflow-x-hidden">
            {/* Toolbar */}
            <div className="glass-panel sticky top-0 z-30 px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2 text-[var(--cv-text-header)] font-bold">
                  <i className="fa fa-filter text-[var(--cv-accent)]"></i>
                  <span className="text-sm tracking-wide">Filters</span>
                </div>
                <div className="flex gap-3">
                  {['Minimal', 'Creative', 'Executive'].map(f => (
                    <button key={f} className="px-4 py-2 rounded-full border border-[var(--cv-border)] bg-white/50 text-xs font-bold text-[var(--cv-text-muted)] hover:bg-white hover:border-[var(--cv-accent)] transition-all">
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 md:p-16 pb-48 max-w-7xl mx-auto w-full">
              <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl md:text-5xl font-black font-serif text-[var(--cv-text-header)]">Choose your Legacy</h2>
                <p className="text-[var(--cv-text-muted)] text-lg max-w-2xl mx-auto">Select a template that best defines your professional narrative.</p>
              </div>

              {/* International Templates */}
              <div className="mb-16">
                <h3 className="text-2xl font-black text-[var(--cv-text-header)] mb-8 flex items-center gap-3">
                  <span className="w-12 h-1 bg-[var(--cv-accent)]"></span>
                  International Templates
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {TEMPLATE_OPTIONS.filter(opt => opt.id !== 'montreal').map((opt) => (
                    <div key={opt.id} className="group flex flex-col items-center perspective-1000">
                      <div
                        className={`relative w-full aspect-[1/1.4142] rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-out transform group-hover:-translate-y-4 group-hover:shadow-2xl ${template === opt.id ? 'ring-4 ring-[var(--cv-accent)] shadow-2xl scale-[1.02]' : 'shadow-lg hover:shadow-xl ring-1 ring-black/5'}`}
                        onClick={() => setTemplate(opt.id)}
                      >
                        {/* Preview Container */}
                        <div className="absolute inset-0 bg-white">
                          <div className="scale-[0.25] origin-top-left w-[400%] h-[400%] pointer-events-none select-none">
                            <CVPreview data={INITIAL_DATA} template={opt.id} lang={lang} />
                          </div>
                        </div>

                        {/* Overlay on Hover */}
                        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm ${template === opt.id ? 'opacity-0' : ''}`}>
                          <button className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform">
                            Preview
                          </button>
                        </div>
                      </div>
                      <div className="mt-6 text-center space-y-2">
                        <h3 className="text-xl font-black text-[var(--cv-text-header)] font-serif">{opt.title}</h3>
                        <p className="text-sm text-[var(--cv-text-muted)] max-w-xs">{opt.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Canadian CV Section */}
              <div>
                <h3 className="text-2xl font-black text-red-700 mb-8 flex items-center gap-3">
                  <span className="w-12 h-1 bg-red-700"></span>
                  🇨🇦 CV Canadien / Canadian Resume
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {TEMPLATE_OPTIONS.filter(opt => opt.id === 'montreal').map((opt) => (
                    <div key={opt.id} className="group flex flex-col items-center perspective-1000">
                      <div
                        className={`relative w-full aspect-[1/1.4142] rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-out transform group-hover:-translate-y-4 group-hover:shadow-2xl ${template === opt.id ? 'ring-4 ring-red-700 shadow-2xl scale-[1.02]' : 'shadow-lg hover:shadow-xl ring-1 ring-black/5'}`}
                        onClick={() => setTemplate(opt.id)}
                      >
                        <div className="absolute top-4 right-4 z-20 bg-red-700 text-white font-black px-4 py-1 text-[10px] uppercase tracking-widest rounded-full shadow-lg">
                          Bilingue
                        </div>

                        {/* Preview Container */}
                        <div className="absolute inset-0 bg-white">
                          <div className="scale-[0.25] origin-top-left w-[400%] h-[400%] pointer-events-none select-none">
                            <CVPreview data={INITIAL_DATA} template={opt.id} lang={lang} />
                          </div>
                        </div>

                        {/* Overlay on Hover */}
                        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm ${template === opt.id ? 'opacity-0' : ''}`}>
                          <button className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform">
                            Preview
                          </button>
                        </div>
                      </div>
                      <div className="mt-6 text-center space-y-2">
                        <h3 className="text-xl font-black text-red-900 font-serif">{opt.title}</h3>
                        <p className="text-sm text-red-700 max-w-xs font-semibold">{opt.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-8 flex justify-center z-40 bg-gradient-to-t from-[var(--cv-bg)] via-[var(--cv-bg)]/95 to-transparent backdrop-blur-sm">
              <button
                onClick={() => setStep(BuilderStep.PHOTO)}
                className="group relative bg-[var(--cv-text-header)] text-[var(--cv-bg)] px-12 py-5 rounded-full font-black text-lg uppercase tracking-[0.2em] shadow-xl hover:shadow-2xl hover:scale-105 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                <span className="relative z-10 flex items-center gap-3">
                  Create Resume <i className="fa fa-arrow-right"></i>
                </span>
              </button>
            </div>
          </div >
        );
      case BuilderStep.PHOTO:
        return (
          <div className="space-y-8 md:space-y-12 text-center animate-fadeIn max-w-xl mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-black text-[var(--cv-text-header)] font-serif">Your Portal</h2>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-64 h-64 md:w-80 md:h-80 rounded-[3rem] border-4 border-dashed border-[var(--cv-border)] bg-[var(--cv-card)] flex items-center justify-center cursor-pointer hover:border-[var(--cv-accent)] transition-all overflow-hidden shadow-2xl mx-auto relative group"
            >
              {data.personalInfo.photo ? <img src={data.personalInfo.photo} className="w-full h-full object-cover" /> : <i className="fa fa-camera-retro text-6xl text-[var(--cv-text-muted)]/20"></i>}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white font-bold text-xs uppercase tracking-widest backdrop-blur-sm">Upload Photo</div>
            </div>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, photo: reader.result as string } }));
                reader.readAsDataURL(file);
              }
            }} />
          </div>
        );
      case BuilderStep.PERSONAL:
        return (
          <div className="space-y-8 md:space-y-12 animate-fadeIn max-w-3xl mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-black text-[var(--cv-text-header)] tracking-tight font-serif">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="First Name" className={inputCls} value={data.personalInfo.firstName} onChange={e => setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, firstName: e.target.value } }))} />
              <input type="text" placeholder="Last Name" className={inputCls} value={data.personalInfo.lastName} onChange={e => setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, lastName: e.target.value } }))} />
              <input type="text" placeholder="Job Title / Role" className={`${inputCls} md:col-span-2`} value={data.personalInfo.jobTitle} onChange={e => setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, jobTitle: e.target.value } }))} />
              <input type="email" placeholder="Email Address" className={inputCls} value={data.personalInfo.email} onChange={e => setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, email: e.target.value } }))} />
              <input type="tel" placeholder="Phone Number" className={inputCls} value={data.personalInfo.phone} onChange={e => setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, phone: e.target.value } }))} />
            </div>
          </div>
        );
      case BuilderStep.EXPERIENCE:
        return (
          <div className="space-y-8 animate-fadeIn px-4 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black text-[var(--cv-text-header)] tracking-tight">Career Path</h2>
              <button
                onClick={() => setData(p => ({ ...p, experience: [...p.experience, { id: Math.random().toString(), company: '', position: '', location: '', startDate: '', endDate: '', current: false, description: '' }] }))}
                className="bg-[var(--cv-accent)] hover:opacity-90 text-white px-8 py-3 rounded-[var(--cv-radius)] font-bold text-sm shadow-lg transition-all flex items-center gap-2"
              >
                <i className="fa fa-plus"></i> Add Position
              </button>
            </div>
            {data.experience.length === 0 ? (
              <div className="p-20 text-center border-4 border-dashed border-[var(--cv-border)] rounded-[2.5rem] bg-[var(--cv-card)] opacity-60">
                <div className="w-20 h-20 bg-[var(--cv-accent)]/10 text-[var(--cv-accent)] rounded-3xl flex items-center justify-center text-3xl mx-auto mb-6">
                  <i className="fa fa-briefcase"></i>
                </div>
                <h3 className="text-xl font-black text-[var(--cv-text-main)] mb-2">No experience added</h3>
                <button onClick={() => setData(p => ({ ...p, experience: [{ id: '1', company: '', position: '', location: '', startDate: '', endDate: '', current: false, description: '' }] }))} className="text-[var(--cv-accent)] font-bold">Start your career path</button>
              </div>
            ) : (
              <div className="space-y-6">
                {data.experience.map(exp => (
                  <div key={exp.id} className="p-10 bg-[var(--cv-card)] rounded-[var(--cv-radius)] border border-[var(--cv-border)] shadow-xl relative group transition-all duration-500 hover:shadow-2xl">
                    <button
                      onClick={() => setData(p => ({ ...p, experience: p.experience.filter(x => x.id !== exp.id) }))}
                      className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full text-[var(--cv-text-muted)] hover:text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
                    >
                      <i className="fa fa-trash-can text-sm"></i>
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--cv-text-muted)] ml-4">Position / Title</label>
                        <input type="text" placeholder="e.g. Senior Project Manager" className="w-full bg-[var(--cv-bg)] border-2 border-[var(--cv-border)] rounded-[var(--cv-radius)] p-[var(--cv-padding)] text-sm font-bold text-[var(--cv-text-main)] focus:border-[var(--cv-accent)] focus:ring-4 focus:ring-[var(--cv-accent)]/10 outline-none transition-all" value={exp.position} onChange={e => setData(p => ({ ...p, experience: p.experience.map(x => x.id === exp.id ? { ...x, position: e.target.value } : x) }))} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--cv-text-muted)] ml-4">Company Name</label>
                        <input type="text" placeholder="e.g. Microsoft Corporation" className="w-full bg-[var(--cv-bg)] border-2 border-[var(--cv-border)] rounded-[var(--cv-radius)] p-[var(--cv-padding)] text-sm font-bold text-[var(--cv-text-main)] focus:border-[var(--cv-accent)] focus:ring-4 focus:ring-[var(--cv-accent)]/10 outline-none transition-all" value={exp.company} onChange={e => setData(p => ({ ...p, experience: p.experience.map(x => x.id === exp.id ? { ...x, company: e.target.value } : x) }))} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--cv-text-muted)] ml-4">Dates / Duration</label>
                        <input type="text" placeholder="Jan 2015 – Present" className="w-full bg-[var(--cv-bg)] border-2 border-[var(--cv-border)] rounded-[var(--cv-radius)] p-[var(--cv-padding)] text-sm font-bold text-[var(--cv-text-main)] focus:border-[var(--cv-accent)] focus:ring-4 focus:ring-[var(--cv-accent)]/10 outline-none transition-all" value={exp.startDate + (exp.endDate ? ' - ' + exp.endDate : '')} onChange={e => {
                          const val = e.target.value.split(' - ');
                          setData(p => ({ ...p, experience: p.experience.map(x => x.id === exp.id ? { ...x, startDate: val[0] || '', endDate: val[1] || '' } : x) }));
                        }} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--cv-text-muted)] ml-4">Responsibilities & Key Achievements</label>
                        <textarea rows={4} placeholder="Describe your impact..." className="w-full bg-[var(--cv-bg)] border-2 border-[var(--cv-border)] rounded-[var(--cv-radius)] p-[var(--cv-padding)] text-sm font-bold text-[var(--cv-text-main)] focus:border-[var(--cv-accent)] focus:ring-4 focus:ring-[var(--cv-accent)]/10 outline-none transition-all resize-none" value={exp.description} onChange={e => setData(p => ({ ...p, experience: p.experience.map(x => x.id === exp.id ? { ...x, description: e.target.value } : x) }))} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case BuilderStep.EDUCATION:
        return (
          <div className="space-y-8 animate-fadeIn px-4 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black text-[var(--cv-text-header)] tracking-tight">Academic History</h2>
              <button
                onClick={() => setData(p => ({ ...p, education: [...p.education, { id: Math.random().toString(), institution: '', degree: '', field: '', location: '', graduationDate: '', description: '' }] }))}
                className="bg-[var(--cv-accent)] hover:opacity-90 text-white px-8 py-3 rounded-[var(--cv-radius)] font-bold text-sm shadow-lg transition-all flex items-center gap-2"
              >
                <i className="fa fa-plus"></i> Add Education
              </button>
            </div>
            {data.education.length === 0 ? (
              <div className="p-20 text-center border-4 border-dashed border-[var(--cv-border)] rounded-[2.5rem] bg-[var(--cv-card)] opacity-60">
                <div className="w-20 h-20 bg-[var(--cv-accent)]/10 text-[var(--cv-accent)] rounded-3xl flex items-center justify-center text-3xl mx-auto mb-6">
                  <i className="fa fa-graduation-cap"></i>
                </div>
                <h3 className="text-xl font-black text-[var(--cv-text-main)] mb-2">No education added</h3>
                <button onClick={() => setData(p => ({ ...p, education: [{ id: '1', institution: '', degree: '', field: '', location: '', graduationDate: '', description: '' }] }))} className="text-[var(--cv-accent)] font-bold">Start your academic path</button>
              </div>
            ) : (
              <div className="space-y-6">
                {data.education.map(edu => (
                  <div key={edu.id} className="p-10 bg-[var(--cv-card)] rounded-[var(--cv-radius)] border border-[var(--cv-border)] shadow-xl relative group transition-all duration-500 hover:shadow-2xl">
                    <button
                      onClick={() => setData(p => ({ ...p, education: p.education.filter(x => x.id !== edu.id) }))}
                      className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full text-[var(--cv-text-muted)] hover:text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
                    >
                      <i className="fa fa-trash-can text-sm"></i>
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--cv-text-muted)] ml-4">School / University</label>
                        <input type="text" placeholder="e.g. Harvard University" className="w-full bg-[var(--cv-bg)] border-2 border-[var(--cv-border)] rounded-[var(--cv-radius)] p-[var(--cv-padding)] text-sm font-bold text-[var(--cv-text-main)] focus:border-[var(--cv-accent)] focus:ring-4 focus:ring-[var(--cv-accent)]/10 outline-none transition-all" value={edu.institution} onChange={e => setData(p => ({ ...p, education: p.education.map(x => x.id === edu.id ? { ...x, institution: e.target.value } : x) }))} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--cv-text-muted)] ml-4">Degree / Certification</label>
                        <input type="text" placeholder="e.g. Master of Business Administration" className="w-full bg-[var(--cv-bg)] border-2 border-[var(--cv-border)] rounded-[var(--cv-radius)] p-[var(--cv-padding)] text-sm font-bold text-[var(--cv-text-main)] focus:border-[var(--cv-accent)] focus:ring-4 focus:ring-[var(--cv-accent)]/10 outline-none transition-all" value={edu.degree} onChange={e => setData(p => ({ ...p, education: p.education.map(x => x.id === edu.id ? { ...x, degree: e.target.value } : x) }))} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--cv-text-muted)] ml-4">Date / Graduation</label>
                        <input type="text" placeholder="2012 - 2016" className="w-full bg-[var(--cv-bg)] border-2 border-[var(--cv-border)] rounded-[var(--cv-radius)] p-[var(--cv-padding)] text-sm font-bold text-[var(--cv-text-main)] focus:border-[var(--cv-accent)] focus:ring-4 focus:ring-[var(--cv-accent)]/10 outline-none transition-all" value={edu.graduationDate} onChange={e => setData(p => ({ ...p, education: p.education.map(x => x.id === edu.id ? { ...x, graduationDate: e.target.value } : x) }))} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--cv-text-muted)] ml-4">Academic Details (Optional)</label>
                        <textarea rows={3} placeholder="Describe your field of study..." className="w-full bg-[var(--cv-bg)] border-2 border-[var(--cv-border)] rounded-[var(--cv-radius)] p-[var(--cv-padding)] text-sm font-bold text-[var(--cv-text-main)] focus:border-[var(--cv-accent)] focus:ring-4 focus:ring-[var(--cv-accent)]/10 outline-none transition-all resize-none" value={edu.description} onChange={e => setData(p => ({ ...p, education: p.education.map(x => x.id === edu.id ? { ...x, description: e.target.value } : x) }))} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case BuilderStep.SKILLS:
        return (
          <div className="space-y-8 animate-fadeIn px-4 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black text-[var(--cv-text-header)] tracking-tight">Mastery & Skills</h2>
              <button
                onClick={() => setData(p => ({ ...p, skills: [...p.skills, { id: Math.random().toString(), name: '', level: 'Intermediate' }] }))}
                className="bg-[var(--cv-accent)] hover:opacity-90 text-white px-8 py-3 rounded-[var(--cv-radius)] font-bold text-sm shadow-lg transition-all flex items-center gap-2"
              >
                <i className="fa fa-plus"></i> Add Skill
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.skills.map(s => (
                <div key={s.id} className="p-4 bg-[var(--cv-card)] rounded-2xl border border-[var(--cv-border)] flex items-center gap-4 group hover:border-[var(--cv-accent)] transition-all">
                  <input
                    type="text"
                    placeholder="Skill name..."
                    className="flex-1 bg-transparent border-none outline-none font-bold text-[var(--cv-text-main)]"
                    value={s.name}
                    onChange={e => setData(p => ({ ...p, skills: p.skills.map(x => x.id === s.id ? { ...x, name: e.target.value } : x) }))}
                  />
                  <select
                    className="bg-[var(--cv-bg)] border border-[var(--cv-border)] rounded-lg p-2 text-[10px] font-black uppercase tracking-widest text-[var(--cv-accent)] outline-none cursor-pointer"
                    value={s.level}
                    onChange={e => setData(p => ({ ...p, skills: p.skills.map(x => x.id === s.id ? { ...x, level: e.target.value as any } : x) }))}
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Expert</option>
                  </select>
                  <button onClick={() => setData(p => ({ ...p, skills: p.skills.filter(x => x.id !== s.id) }))} className="text-[var(--cv-text-muted)] hover:text-red-500 transition-colors"><i className="fa fa-times"></i></button>
                </div>
              ))}
            </div>
          </div>
        );
      case BuilderStep.LANGUAGES:
        return (
          <div className="space-y-8 animate-fadeIn px-4 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black text-[var(--cv-text-header)] tracking-tight">Languages</h2>
              <button
                onClick={() => setData(p => ({ ...p, languages: [...p.languages, { id: Math.random().toString(), name: '', level: 80 }] }))}
                className="bg-[var(--cv-accent)] hover:opacity-90 text-white px-8 py-3 rounded-[var(--cv-radius)] font-bold text-sm shadow-lg transition-all flex items-center gap-2"
              >
                <i className="fa fa-plus"></i> Add Language
              </button>
            </div>
            <div className="space-y-4">
              {data.languages.map(l => (
                <div key={l.id} className="p-6 bg-[var(--cv-card)] rounded-[var(--cv-radius)] border border-[var(--cv-border)] flex flex-col md:flex-row items-center gap-6 group">
                  <input
                    type="text"
                    placeholder="Language..."
                    className="w-full md:w-1/3 bg-[var(--cv-bg)] border-2 border-[var(--cv-border)] rounded-xl p-4 font-bold text-[var(--cv-text-main)] focus:border-[var(--cv-accent)] outline-none"
                    value={l.name}
                    onChange={e => setData(p => ({ ...p, languages: p.languages.map(x => x.id === l.id ? { ...x, name: e.target.value } : x) }))}
                  />
                  <div className="flex-1 w-full flex items-center gap-4">
                    <input
                      type="range" min="0" max="100"
                      className="flex-1 accent-[var(--cv-accent)]"
                      value={l.level}
                      onChange={e => setData(p => ({ ...p, languages: p.languages.map(x => x.id === l.id ? { ...x, level: parseInt(e.target.value) } : x) }))}
                    />
                    <span className="text-xs font-black text-[var(--cv-text-muted)] w-10 text-right">{l.level}%</span>
                  </div>
                  <button onClick={() => setData(p => ({ ...p, languages: p.languages.filter(x => x.id !== l.id) }))} className="text-[var(--cv-text-muted)] hover:text-red-500 transition-colors"><i className="fa fa-trash-can"></i></button>
                </div>
              ))}
            </div>
          </div>
        );
      case BuilderStep.SUMMARY:
        return (
          <div className="space-y-8 animate-fadeIn px-4 max-w-4xl mx-auto">
            <h2 className="text-3xl font-black text-[var(--cv-text-header)] tracking-tight">Impact Hook</h2>
            <div className="p-10 bg-[var(--cv-card)] rounded-[var(--cv-radius)] border border-[var(--cv-border)] shadow-2xl relative">
              <div className="absolute top-6 right-10 flex gap-4">
                <button onClick={async () => {
                  setIsAiLoading(true);
                  const s = await generateProfessionalSummary(
                    data.personalInfo.jobTitle,
                    data.skills.map(sk => sk.name),
                    lang
                  );
                  if (s) setData(p => ({ ...p, personalInfo: { ...p.personalInfo, summary: s } }));
                  setIsAiLoading(false);
                }} className="text-[var(--cv-accent)] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-transform bg-[var(--cv-bg)] px-4 py-2 rounded-lg border border-[var(--cv-border)] shadow-sm">
                  <i className="fa fa-wand-magic-sparkles"></i> AI Re-write
                </button>
              </div>
              <textarea
                rows={8}
                className="w-full bg-[var(--cv-bg)] rounded-[var(--cv-radius)] p-8 text-lg font-medium text-[var(--cv-text-main)] border-2 border-transparent focus:border-[var(--cv-accent)] outline-none transition-all resize-none italic shadow-inner"
                value={data.personalInfo.summary}
                onChange={e => setData(p => ({ ...p, personalInfo: { ...p.personalInfo, summary: e.target.value } }))}
              />
              <p className="mt-6 text-xs text-[var(--cv-text-muted)] text-center font-medium opacity-60">A strong summary should highlight your unique value proposition in 3-4 sentences.</p>
            </div>
          </div>
        );
      case BuilderStep.FINALIZE:
        return (
          <div className="space-y-8 md:space-y-12 animate-fadeIn text-center max-w-2xl mx-auto px-4">
            <div className="w-24 h-24 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center text-5xl mx-auto shadow-lg shadow-emerald-500/20"><i className="fa fa-check"></i></div>
            <h2 className="text-4xl md:text-6xl font-black text-[var(--cv-text-header)] font-serif">Masterpiece Ready.</h2>
            <p className="text-[var(--cv-text-muted)] font-medium text-lg">Your professional profile is optimized and ready for export.</p>
            <button onClick={() => window.print()} className="w-full py-6 md:py-8 bg-[var(--cv-text-header)] text-[var(--cv-bg)] rounded-[3rem] font-black text-xl md:text-2xl flex items-center justify-center gap-6 shadow-2xl hover:bg-[var(--cv-accent)] transition-all duration-300">
              <i className="fa fa-file-pdf"></i> PDF EXPORT
            </button>
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
      <aside className="no-print hidden md:flex w-[320px] bg-[var(--cv-sidebar)] border-r border-[var(--cv-border)] flex-col p-8 sticky top-0 h-screen overflow-y-auto shadow-xl z-50">
        <div className="flex items-center gap-5 mb-16 cursor-pointer group" onClick={() => setView('landing')}>
          <div className="w-12 h-12 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl flex items-center justify-center text-white font-serif font-black text-2xl shadow-lg ring-1 ring-white/20 group-hover:scale-105 transition-transform duration-500">E</div>
          <div>
            <h1 className="text-2xl font-black text-[var(--cv-text-header)] tracking-tight font-serif">EliteCV</h1>
            <p className="text-[10px] text-[var(--cv-text-muted)] font-bold tracking-[0.2em] uppercase opacity-70">Professional Suite</p>
          </div>
        </div>

        <nav className="flex flex-col gap-3 w-full">
          {steps.map((s, idx) => {
            const isActive = step === s;
            const stepNum = idx + 1;
            return (
              <button
                key={s}
                onClick={() => setStep(s)}
                className={`w-full group relative flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 ${isActive ? 'bg-[var(--cv-accent)] text-white shadow-lg shadow-blue-500/20' : 'text-[var(--cv-text-muted)] hover:bg-slate-50 hover:text-slate-900'}`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white/30 rounded-r-full"></div>
                )}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${isActive ? 'bg-white text-[var(--cv-accent)]' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                  {stepNum}
                </div>
                <span className="text-xs font-bold tracking-widest uppercase">{s.toString()}</span>
                {idx < currentStepIndex && !isActive && <i className="fa fa-check ml-auto text-emerald-500 text-xs"></i>}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto pt-8 space-y-4 border-t border-[var(--cv-border)]/50">
          <button
            className="w-full group flex items-center justify-between px-4 py-3 bg-slate-50 border border-[var(--cv-border)] rounded-xl text-[10px] font-black uppercase tracking-widest text-[var(--cv-text-muted)] hover:border-[var(--cv-accent)] hover:text-[var(--cv-accent)] transition-all"
            onClick={() => document.documentElement.classList.toggle('dark-mode')}
          >
            <span>Appearance</span>
            <i className="fa fa-circle-half-stroke text-base group-hover:rotate-180 transition-transform duration-500"></i>
          </button>

          <button
            className="w-full flex items-center justify-center gap-2 p-3 text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors"
            onClick={() => {
              window.location.href = window.location.origin + window.location.pathname + '?v=' + Date.now();
            }}
          >
            <i className="fa fa-refresh"></i>
            <span>Reset Application</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 relative flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="no-print md:hidden p-6 glass-panel flex justify-between items-center sticky top-0 z-50">
          <button onClick={() => setView('selection')} className="w-10 h-10 flex items-center justify-center text-[var(--cv-text-muted)] hover:bg-[var(--cv-bg)] rounded-full transition-all"><i className="fa fa-arrow-left"></i></button>
          <span className="font-black text-xl tracking-tighter text-[var(--cv-text-header)] font-serif">EliteCV</span>
          <button onClick={() => setShowMobilePreview(!showMobilePreview)} className="bg-[var(--cv-accent)] text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">{showMobilePreview ? 'Edit' : 'Preview'}</button>
        </header>

        {/* Builder Area & Preview Area (Split View on Desktop) */}
        <div className="flex flex-col lg:flex-row flex-1 print:hidden">
          {/* Main Content Area (Form) */}
          <section className={`flex-1 p-6 md:p-12 lg:p-16 max-w-4xl mx-auto w-full pb-64 transition-all ${showMobilePreview ? 'hidden md:block' : 'block'}`}>
            {renderStepContent()}
          </section>

          {/* Split Vertical Divider (Matches Screenshot) */}
          <div className="hidden lg:block w-[1.5px] bg-[#111827] h-full shadow-lg"></div>

          {/* Preview Area */}
          {step !== BuilderStep.TEMPLATE && (
            <section className={`no-print flex-1 bg-slate-50/50 p-6 md:p-12 lg:flex overflow-y-auto transition-all ${showMobilePreview ? 'block fixed inset-0 z-[60] bg-white pt-24' : 'hidden'}`}>
              <div id="cv-preview" className={`cv-theme-wrapper ${getModelClass(template)}`}>
                <div className="cv-container">
                  <CVPreview data={data} template={template} lang={lang} />
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Builder Footer Navigation (Matches Screenshot) */}
        {step !== BuilderStep.TEMPLATE && (
          <div className="no-print fixed bottom-0 left-0 right-0 md:left-[320px] bg-white border-t border-slate-50 p-6 md:p-8 flex justify-between items-center z-40 backdrop-blur-xl">
            <button
              onClick={() => setStep(steps[currentStepIndex - 1])}
              disabled={currentStepIndex === 0}
              className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-300 disabled:opacity-0 hover:text-slate-900 transition flex items-center gap-2"
            >
              <i className="fa fa-arrow-left"></i> RETOUR
            </button>
            <button
              onClick={() => setStep(steps[currentStepIndex + 1])}
              disabled={currentStepIndex === steps.length - 1}
              className="bg-[#2563eb] text-white px-12 md:px-20 py-5 rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-[0_15px_30px_-5px_rgba(37,99,235,0.4)] hover:bg-[#1d4ed8] active:scale-95 transition-all"
            >
              CONTINUER
            </button>
          </div>
        )}

        {/* Hidden Print Version */}
        <div className="hidden print:block w-full">
          <div className={`cv-theme-wrapper ${getModelClass(template)}`}>
            <div className="cv-container">
              <CVPreview data={data} template={template} lang={lang} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
