import React from 'react';
import { CVData, Language, TemplateType } from '../types';

interface Props {
    data: CVData;
    template: TemplateType;
    lang: Language;
}

const PremiumTemplates: React.FC<Props> = ({ data, template, lang }) => {
    const { personalInfo, experience, education, skills, languages } = data;
    const isRtl = lang === 'ar';

    // Helper to format level
    const getLevelText = (skill: any) => {
        if (typeof skill.level === 'string') return skill.level;
        if (skill.level >= 90) return 'Expert';
        if (skill.level >= 70) return 'Advanced';
        if (skill.level >= 40) return 'Intermediate';
        return 'Beginner';
    };

    // Template 13: The Elite (Gold & Black Executive)
    if (template === 'elite') {
        return (
            <div className="cv-preview-container w-full bg-[#0F0F0F] min-h-[1100px] p-20 text-[#D4AF37]" dir={isRtl ? 'rtl' : 'ltr'} style={{ fontFamily: "'Playfair Display', serif" }}>
                <div className="max-w-5xl mx-auto border-[1px] border-[#D4AF37]/30 p-16 relative">
                    {/* Decorative Corner Accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]"></div>

                    <header className="text-center mb-24">
                        <h1 className="text-8xl font-black mb-6 tracking-[0.2em] uppercase text-[#D4AF37] leading-none drop-shadow-2xl">
                            {personalInfo.firstName} <br /> {personalInfo.lastName}
                        </h1>
                        <div className="flex items-center justify-center gap-6 mb-8">
                            <div className="h-px bg-[#D4AF37]/50 w-24"></div>
                            <p className="text-2xl font-bold tracking-[0.6em] uppercase text-white antialiased">{personalInfo.jobTitle}</p>
                            <div className="h-px bg-[#D4AF37]/50 w-24"></div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-12 mt-12 text-[10px] tracking-[0.4em] text-[#D4AF37]/60 uppercase font-sans font-black">
                            {personalInfo.email && <span className="hover:text-[#D4AF37] transition-colors cursor-pointer">{personalInfo.email}</span>}
                            {personalInfo.phone && <span className="hover:text-[#D4AF37] transition-colors cursor-pointer">{personalInfo.phone}</span>}
                            {personalInfo.location && <span className="hover:text-[#D4AF37] transition-colors cursor-pointer">{personalInfo.location}</span>}
                        </div>
                    </header>

                    <div className="space-y-16">
                        {personalInfo.summary && (
                            <section>
                                <h2 className="text-xs font-black uppercase tracking-[0.5em] text-[#D4AF37] mb-8 text-center">Master Statement</h2>
                                <p className="text-xl leading-relaxed text-white/80 text-center italic max-w-3xl mx-auto whitespace-pre-line break-words">
                                    "{personalInfo.summary}"
                                </p>
                            </section>
                        )}

                        {experience.length > 0 && (
                            <section>
                                <h2 className="text-xs font-black uppercase tracking-[0.5em] text-[#D4AF37] mb-12 flex items-center gap-6">
                                    <div className="flex-1 h-px bg-[#D4AF37]/20"></div>
                                    Executive Experience
                                    <div className="flex-1 h-px bg-[#D4AF37]/20"></div>
                                </h2>
                                <div className="space-y-12">
                                    {experience.map(exp => (
                                        <div key={exp.id} className="relative pl-12 border-l border-[#D4AF37]/20">
                                            <div className="absolute left-[-5px] top-2 w-2 h-2 bg-[#D4AF37] rounded-full shadow-[0_0_10px_#D4AF37]"></div>
                                            <div className="flex justify-between items-baseline mb-4">
                                                <h3 className="text-3xl font-bold text-white uppercase">{exp.position}</h3>
                                                <span className="text-xs font-black tracking-widest text-[#D4AF37] uppercase bg-[#D4AF37]/10 px-4 py-2 border border-[#D4AF37]/30">
                                                    {exp.startDate} — {exp.endDate || 'Present'}
                                                </span>
                                            </div>
                                            <div className="text-xl text-[#D4AF37] font-bold mb-6 italic">{exp.company}</div>
                                            <p className="text-lg leading-relaxed text-white/70 whitespace-pre-line break-words font-sans">{exp.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        <div className="grid grid-cols-2 gap-20">
                            {education.length > 0 && (
                                <section>
                                    <h2 className="text-xs font-black uppercase tracking-[0.5em] text-[#D4AF37] mb-10">Credentials</h2>
                                    <div className="space-y-8">
                                        {education.map(edu => (
                                            <div key={edu.id}>
                                                <h3 className="text-xl font-bold text-white uppercase">{edu.degree}</h3>
                                                <div className="text-lg text-[#D4AF37] italic mt-2">{edu.institution}</div>
                                                <div className="text-sm text-white/50 font-sans mt-2">{edu.graduationDate}</div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {skills.length > 0 && (
                                <section>
                                    <h2 className="text-xs font-black uppercase tracking-[0.5em] text-[#D4AF37] mb-10">Specializations</h2>
                                    <div className="grid grid-cols-1 gap-4">
                                        {skills.map(s => (
                                            <div key={s.id} className="flex justify-between items-center text-sm tracking-widest uppercase py-2 border-b border-[#D4AF37]/10">
                                                <span className="text-white font-bold">{s.name}</span>
                                                <span className="text-[#D4AF37]/50">{getLevelText(s)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Template 14: The Minimal (Pure Whitespace Professional)
    if (template === 'minimal') {
        return (
            <div className="cv-preview-container w-full bg-white min-h-[1100px] p-16 text-slate-900" dir={isRtl ? 'rtl' : 'ltr'} style={{ fontFamily: "'Inter', sans-serif" }}>
                <div className="max-w-4xl mx-auto">
                    <header className="mb-24 flex justify-between items-end border-b-[6px] border-slate-900 pb-12">
                        <div className="flex-1">
                            <h1 className="text-8xl font-black tracking-tighter text-slate-900 mb-2 leading-none">
                                {personalInfo.firstName}<br />{personalInfo.lastName}
                            </h1>
                            <p className="text-3xl font-light text-slate-500">{personalInfo.jobTitle}</p>
                        </div>
                        <div className="text-right text-xs font-bold uppercase tracking-[0.3em] leading-loose">
                            {personalInfo.email && <div>{personalInfo.email}</div>}
                            {personalInfo.phone && <div>{personalInfo.phone}</div>}
                            {personalInfo.location && <div>{personalInfo.location}</div>}
                        </div>
                    </header>

                    <div className="grid grid-cols-12 gap-16">
                        <div className="col-span-4">
                            {skills.length > 0 && (
                                <section className="mb-16">
                                    <h2 className="text-xs font-black uppercase tracking-[0.5em] mb-8 border-b border-slate-200 pb-4">Focus</h2>
                                    <div className="space-y-4">
                                        {skills.map(s => (
                                            <div key={s.id}>
                                                <div className="text-sm font-black mb-1">{s.name}</div>
                                                <div className="h-0.5 bg-slate-900" style={{ width: s.level === 'Expert' ? '100%' : s.level === 'Advanced' ? '80%' : s.level === 'Intermediate' ? '60%' : '40%' }}></div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {education.length > 0 && (
                                <section>
                                    <h2 className="text-xs font-black uppercase tracking-[0.5em] mb-8 border-b border-slate-200 pb-4">Studies</h2>
                                    <div className="space-y-8">
                                        {education.map(edu => (
                                            <div key={edu.id}>
                                                <div className="text-sm font-black text-slate-900 uppercase mb-1">{edu.degree}</div>
                                                <div className="text-xs font-bold text-slate-500 uppercase">{edu.institution}</div>
                                                <div className="text-[10px] font-bold text-slate-400 mt-1">{edu.graduationDate}</div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        <div className="col-span-8 space-y-20">
                            {personalInfo.summary && (
                                <section>
                                    <p className="text-2xl font-medium leading-relaxed text-slate-800 whitespace-pre-line break-words">
                                        {personalInfo.summary}
                                    </p>
                                </section>
                            )}

                            {experience.length > 0 && (
                                <section>
                                    <h2 className="text-xs font-black uppercase tracking-[0.5em] mb-12 border-b border-slate-200 pb-4">Evidence</h2>
                                    <div className="space-y-16">
                                        {experience.map(exp => (
                                            <div key={exp.id}>
                                                <div className="flex justify-between items-baseline mb-4">
                                                    <h3 className="text-2xl font-black text-slate-900 uppercase">{exp.position}</h3>
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{exp.startDate}—{exp.endDate || 'Present'}</span>
                                                </div>
                                                <div className="text-sm font-black text-slate-500 uppercase mb-6">{exp.company}</div>
                                                <p className="text-base leading-relaxed text-slate-600 whitespace-pre-line break-words font-light">{exp.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Template 15: The Silicon Valley (Tech/Startup Engineering)
    if (template === 'silicon_valley') {
        const themeColor = '#06b6d4'; // Cyan 500
        return (
            <div className="cv-preview-container w-full bg-[#0a0a0a] min-h-[1100px] p-12 text-slate-300" dir={isRtl ? 'rtl' : 'ltr'} style={{ fontFamily: "'Space Mono', monospace" }}>
                <div className="max-w-5xl mx-auto grid grid-cols-12 gap-8">
                    {/* Header Strip */}
                    <div className="col-span-12 bg-[#111111] rounded-3xl p-12 flex flex-col md:flex-row items-center gap-12 border border-white/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px]"></div>
                        {personalInfo.photo && (
                            <div className="relative group shrink-0">
                                <img src={personalInfo.photo} alt="Profile" className="w-48 h-48 object-cover rounded-3xl border-2 border-cyan-500/20 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl relative z-10" />
                                <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-500/20 to-transparent rounded-3xl -z-10 group-hover:scale-110 transition-transform"></div>
                            </div>
                        )}
                        <div className="flex-1 text-center md:text-left relative z-10">
                            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                                <span className="inline-flex items-center px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-500 text-[10px] font-black uppercase tracking-widest">
                                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-2 animate-pulse"></span> Production Ready
                                </span>
                            </div>
                            <h1 className="text-7xl font-black text-white mb-4 tracking-tighter leading-none">
                                {personalInfo.firstName}<span className="text-cyan-500">.</span>{personalInfo.lastName}
                                <span className="text-cyan-500 opacity-50 animate-pulse ml-2">_</span>
                            </h1>
                            <p className="text-2xl font-bold text-slate-400 mb-8 flex items-center justify-center md:justify-start gap-3">
                                <span className="text-cyan-500">$</span> env <span className="text-white">ROLE</span>="<span className="text-cyan-400 font-mono tracking-tight">{personalInfo.jobTitle}</span>"
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 font-sans">
                                {[
                                    { icon: 'envelope', val: personalInfo.email, color: 'text-cyan-500' },
                                    { icon: 'code-branch', val: personalInfo.phone, color: 'text-emerald-500' },
                                    { icon: 'terminal', val: personalInfo.location, color: 'text-purple-500' }
                                ].map((contact, i) => (
                                    <span key={i} className="bg-white/5 px-4 py-2 rounded-xl border border-white/5 hover:border-cyan-500/30 hover:bg-white/10 transition-all cursor-pointer flex items-center gap-3 text-xs font-bold text-slate-400">
                                        <i className={`fa fa-${contact.icon} ${contact.color}`}></i> {contact.val}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Left Sidebar */}
                    <aside className="col-span-12 md:col-span-4 space-y-8">
                        {skills.length > 0 && (
                            <div className="bg-[#171717] rounded-3xl p-8 border border-white/5">
                                <h2 className="text-xs font-black uppercase text-cyan-500 mb-8 flex items-center gap-3">
                                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
                                    Stack
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map(s => (
                                        <span key={s.id} className="text-xs font-bold py-2 p-4 bg-white/5 rounded-xl border border-white/10 text-slate-400 hover:text-cyan-500 hover:border-cyan-500/50 transition">
                                            {s.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {education.length > 0 && (
                            <div className="bg-[#171717] rounded-3xl p-8 border border-white/5">
                                <h2 className="text-xs font-black uppercase text-cyan-500 mb-8 flex items-center gap-3">
                                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
                                    Training
                                </h2>
                                <div className="space-y-6">
                                    {education.map(edu => (
                                        <div key={edu.id} className="group">
                                            <div className="text-sm font-bold text-white group-hover:text-cyan-500 transition">{edu.degree}</div>
                                            <div className="text-xs text-slate-500 font-sans mt-1">{edu.institution}</div>
                                            <div className="text-[10px] text-cyan-900 font-black mt-2">{edu.graduationDate}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </aside>

                    {/* Main Content */}
                    <main className="col-span-12 md:col-span-8 space-y-8">
                        {personalInfo.summary && (
                            <div className="bg-[#171717] rounded-3xl p-10 border border-white/5 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-100 transition">
                                    <i className="fa fa-terminal text-4xl text-cyan-500"></i>
                                </div>
                                <p className="text-lg leading-relaxed text-slate-400 font-sans whitespace-pre-line break-words">
                                    {personalInfo.summary}
                                </p>
                            </div>
                        )}

                        {experience.length > 0 && (
                            <div className="bg-[#171717] rounded-3xl p-10 border border-white/5">
                                <h2 className="text-xs font-black uppercase text-cyan-500 mb-12 flex items-center gap-3">
                                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
                                    Changelog
                                </h2>
                                <div className="space-y-12">
                                    {experience.map(exp => (
                                        <div key={exp.id} className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-[2px] before:h-full before:bg-white/5">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-2xl font-black text-white">{exp.position}</h3>
                                                    <div className="text-sm text-cyan-500 mt-1 font-bold">{exp.company}</div>
                                                </div>
                                                <span className="text-[10px] font-black text-slate-600 bg-white/5 px-3 py-1 rounded border border-white/10 uppercase">{exp.startDate}—{exp.endDate || 'Now'}</span>
                                            </div>
                                            <p className="text-sm leading-relaxed text-slate-500 font-sans whitespace-pre-line break-words">{exp.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        );
    }

    // Template 16: The Parisian (Luxury/High-End Fashion)
    if (template === 'parisian') {
        const primary = '#1a1a1a';
        const accent = '#C19A6B'; // Camel color
        return (
            <div className="cv-preview-container w-full bg-[#fdfaf7] min-h-[1100px] p-20 text-[#1a1a1a]" dir={isRtl ? 'rtl' : 'ltr'} style={{ fontFamily: "'Bodoni Moda', serif" }}>
                <div className="max-w-4xl mx-auto">
                    <header className="mb-24 text-center border-b-[8px] border-[#1a1a1a] pb-20 relative">
                        <div className="absolute top-0 right-0 py-2 border-b border-[#C19A6B] text-[8px] font-black uppercase tracking-[0.5em] text-[#C19A6B] leading-none">
                            Collection Printemps-Été 2026
                        </div>
                        {personalInfo.photo && (
                            <div className="relative inline-block mb-16">
                                <img src={personalInfo.photo} alt="Profile" className="w-56 h-72 object-cover mx-auto shadow-[30px_30px_80px_-20px_rgba(0,0,0,0.3)] brightness-110 contrast-110 saturate-[0.8] relative z-10" />
                                <div className="absolute -bottom-6 -right-6 w-full h-full bg-[#C19A6B]/10 -z-10"></div>
                            </div>
                        )}
                        <h1 className="text-9xl font-black tracking-[-0.05em] mb-4 leading-none text-slate-900 italic">
                            {personalInfo.firstName} <span className="font-light not-italic text-slate-400">{personalInfo.lastName}</span>
                        </h1>
                        <div className="w-16 h-[2px] bg-[#C19A6B] mx-auto mb-8"></div>
                        <p className="text-3xl font-bold tracking-[0.5em] mb-12 text-slate-800 uppercase font-sans antialiased">{personalInfo.jobTitle}</p>
                        <div className="flex justify-center gap-16 text-[9px] font-black uppercase tracking-[0.4em] font-sans text-slate-400">
                            {[
                                { icon: 'at', val: personalInfo.email },
                                { icon: 'phone', val: personalInfo.phone },
                                { icon: 'map-pin', val: personalInfo.location }
                            ].map((contact, i) => (
                                <span key={i} className="flex items-center gap-3 hover:text-slate-900 transition-colors cursor-pointer group">
                                    <i className={`fa fa-${contact.icon} text-[8px] text-[#C19A6B]`}></i> {contact.val}
                                </span>
                            ))}
                        </div>
                    </header>

                    <div className="grid grid-cols-12 gap-16">
                        <div className="col-span-12 mb-20">
                            <h2 className="text-xs font-black uppercase tracking-[0.5em] mb-10 text-center text-[#C19A6B]">L'Essentiel</h2>
                            <p className="text-3xl leading-[1.6] text-center font-medium italic whitespace-pre-line break-words px-12">
                                "{personalInfo.summary}"
                            </p>
                        </div>

                        <div className="col-span-12 space-y-24">
                            {experience.length > 0 && (
                                <section>
                                    <h2 className="text-xs font-black uppercase tracking-[0.5em] mb-16 text-center text-[#C19A6B]">Expérience Professionnelle</h2>
                                    <div className="space-y-16">
                                        {experience.map(exp => (
                                            <div key={exp.id} className="grid grid-cols-12 gap-8 items-start">
                                                <div className="col-span-3 text-[10px] font-black uppercase tracking-[0.2em] font-sans opacity-40 pt-2">
                                                    {exp.startDate} — {exp.endDate || 'Présent'}
                                                </div>
                                                <div className="col-span-9 border-l border-[#1a1a1a]/10 pl-12">
                                                    <h3 className="text-4xl font-black mb-2 uppercase">{exp.position}</h3>
                                                    <div className="text-lg font-bold text-[#C19A6B] mb-6 italic uppercase tracking-widest">{exp.company}</div>
                                                    <p className="text-lg leading-relaxed text-[#1a1a1a]/70 font-sans font-light whitespace-pre-line break-words">{exp.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            <div className="grid grid-cols-2 gap-20">
                                {skills.length > 0 && (
                                    <section>
                                        <h2 className="text-xs font-black uppercase tracking-[0.5em] mb-10 text-[#C19A6B]">Savoir-faire</h2>
                                        <div className="space-y-4">
                                            {skills.map(s => (
                                                <div key={s.id} className="flex justify-between items-end border-b border-[#1a1a1a]/10 pb-2">
                                                    <span className="text-lg font-black uppercase tracking-tight">{s.name}</span>
                                                    <span className="text-[10px] font-black uppercase tracking-widest font-sans opacity-40">{getLevelText(s)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {education.length > 0 && (
                                    <section>
                                        <h2 className="text-xs font-black uppercase tracking-[0.5em] mb-10 text-[#C19A6B]">Études</h2>
                                        <div className="space-y-8">
                                            {education.map(edu => (
                                                <div key={edu.id}>
                                                    <h3 className="text-xl font-black uppercase tracking-tight">{edu.degree}</h3>
                                                    <div className="text-sm font-bold opacity-60 italic mt-2">{edu.institution}</div>
                                                    <div className="text-[10px] font-black uppercase tracking-widest font-sans opacity-40 mt-2">{edu.graduationDate}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </div>
                        </div>
                    </div>

                    <footer className="mt-40 pt-16 border-t border-[#1a1a1a]/10 text-center">
                        <div className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30">EliteCV Premium Collection</div>
                    </footer>
                </div>
            </div>
        );
    }

    return <div className="p-10 text-center">Template not found</div>;
};

export default PremiumTemplates;
