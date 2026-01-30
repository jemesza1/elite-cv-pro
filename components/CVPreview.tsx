
import React from 'react';
import { CVData, Language, TemplateType } from '../types';

interface Props {
    data: CVData;
    template: TemplateType;
    lang: Language;
}

const CVPreview: React.FC<Props> = ({ data, template, lang }) => {
    const { personalInfo, experience, education, skills, languages } = data;
    const isRtl = lang === 'ar';

    // Model 1: Zurich (Swiss Minimalist)
    if (template === 'zurich') {
        return (
            <div className="cv-preview-container w-full bg-white min-h-[1100px] p-16 md:p-20 text-slate-900 shadow-pro selection:bg-blue-100" dir={isRtl ? 'rtl' : 'ltr'}>
                <header className="mb-14 pb-12 flex justify-between items-start gap-12">
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                            <h1 className="text-5xl md:text-6xl font-light tracking-tighter text-slate-900 leading-none">
                                {personalInfo.firstName} <span className="font-bold">{personalInfo.lastName}</span>
                            </h1>
                            <div className="h-[2px] flex-1 bg-slate-100 hidden md:block mt-2"></div>
                        </div>
                        <p className="text-xl md:text-2xl text-blue-600 font-bold tracking-[0.1em] mb-8 uppercase leading-tight font-inter">
                            {personalInfo.jobTitle}
                        </p>
                        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-500 font-bold uppercase tracking-wider">
                            <span className="flex items-center gap-2 group cursor-pointer transition-colors hover:text-blue-600">
                                <i className="fa fa-envelope text-slate-300 group-hover:text-blue-500"></i> {personalInfo.email}
                            </span>
                            <span className="flex items-center gap-2 group cursor-pointer transition-colors hover:text-blue-600">
                                <i className="fa fa-phone text-slate-300 group-hover:text-blue-500"></i> {personalInfo.phone}
                            </span>
                            <span className="flex items-center gap-2 group cursor-pointer transition-colors hover:text-blue-600">
                                <i className="fa fa-location-dot text-slate-300 group-hover:text-blue-500"></i> {personalInfo.location}
                            </span>
                        </div>
                    </div>
                    {personalInfo.photo && (
                        <div className="relative shrink-0">
                            <img src={personalInfo.photo} alt="Profile" className="w-40 h-40 object-cover rounded-3xl grayscale brightness-105 contrast-90 hover:grayscale-0 transition-all duration-700 shadow-2xl border-4 border-white" />
                            <div className="absolute -inset-2 border-2 border-slate-50 rounded-[2rem] -z-10 bg-slate-50"></div>
                        </div>
                    )}
                </header>

                {personalInfo.summary && (
                    <section className="mb-12 max-w-3xl">
                        <h2 className="pro-label mb-4">Professional Profile</h2>
                        <p className="text-lg leading-relaxed text-slate-700 font-light whitespace-pre-line break-words">{personalInfo.summary}</p>
                    </section>
                )}

                {experience.length > 0 && (
                    <section className="mb-12">
                        <h2 className="pro-label mb-8">Professional Experience</h2>
                        <div className="space-y-12">
                            {experience.map(exp => (
                                <div key={exp.id} className="group relative">
                                    <div className="flex flex-col md:flex-row justify-between items-baseline gap-2 mb-3">
                                        <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                                            {exp.position}
                                        </h3>
                                        <span className="text-xs font-black text-blue-600 tracking-widest uppercase bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 shrink-0 whitespace-nowrap">
                                            {exp.startDate} – {exp.endDate || 'Present'}
                                        </span>
                                    </div>
                                    <div className="text-lg text-slate-600 font-bold mb-4 tracking-tight flex items-center gap-3">
                                        <span className="w-8 h-[2px] bg-blue-600 hidden md:block"></span> {exp.company}
                                    </div>
                                    <p className="text-[17px] text-slate-600 leading-relaxed whitespace-pre-line border-l-2 border-slate-200 pl-8 mb-4 break-words font-medium">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-2 gap-16 border-t font-inter pt-12 border-slate-100">
                    <div className="space-y-12">
                        {education.length > 0 && (
                            <section>
                                <h2 className="pro-label mb-6">Education</h2>
                                <div className="space-y-6">
                                    {education.map(edu => (
                                        <div key={edu.id}>
                                            <h3 className="text-lg font-bold text-slate-900">{edu.degree}</h3>
                                            <div className="text-slate-600 font-medium">{edu.institution}</div>
                                            <div className="text-sm text-slate-400">{edu.graduationDate}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                    <div className="space-y-12">
                        {skills.length > 0 && (
                            <section>
                                <h2 className="pro-label mb-6">Expertise</h2>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map(s => (
                                        <span key={s.id} className="px-4 py-2 bg-slate-50 text-slate-700 text-xs font-bold rounded-lg border border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-700 transition-all">
                                            {s.name}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}
                        {languages.length > 0 && (
                            <section>
                                <h2 className="pro-label mb-6">Languages</h2>
                                <div className="grid gap-3">
                                    {languages.map(l => (
                                        <div key={l.id} className="flex items-center justify-between text-sm">
                                            <span className="font-bold text-slate-700">{l.name}</span>
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <div key={i} className={`w-2 h-2 rounded-full ${i < (l.level / 20) ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Model 2: Executive (Corporate Executive)
    if (template === 'executive') {
        return (
            <div className="cv-preview-container w-full bg-white text-slate-900 min-h-[1100px] shadow-pro" dir={isRtl ? 'rtl' : 'ltr'}>
                <header className="bg-slate-900 p-16 relative overflow-hidden flex justify-between items-center text-white">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600 skew-x-[-15deg] translate-x-12"></div>
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-500/10 -translate-x-4 blur-xl"></div>

                    <div className="relative z-10 flex items-center gap-12 w-full">
                        {personalInfo.photo && (
                            <div className="relative">
                                <img src={personalInfo.photo} alt="Profile" className="w-44 h-44 object-cover rounded-full border-8 border-white/10 shadow-2xl relative z-10" />
                                <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-pulse"></div>
                            </div>
                        )}
                        <div className="flex-1">
                            <h1 className="text-6xl font-black mb-3 tracking-tighter uppercase leading-none">
                                {personalInfo.firstName} <br /><span className="text-blue-400">{personalInfo.lastName}</span>
                            </h1>
                            <div className="h-1 w-24 bg-blue-400 mb-6"></div>
                            <p className="text-2xl text-blue-100/90 font-bold tracking-[0.2em] uppercase mb-8">{personalInfo.jobTitle}</p>
                            <div className="flex flex-wrap gap-x-8 gap-y-3 text-slate-300 text-[10px] font-black uppercase tracking-[0.2em]">
                                <span className="flex items-center gap-2"><i className="fa fa-envelope text-blue-400"></i> {personalInfo.email}</span>
                                <span className="flex items-center gap-2"><i className="fa fa-phone text-blue-400"></i> {personalInfo.phone}</span>
                                <span className="flex items-center gap-2"><i className="fa fa-location-dot text-blue-400"></i> {personalInfo.location}</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-16 space-y-16">
                    {personalInfo.summary && (
                        <section className="bg-slate-50 p-12 rounded-[2.5rem] relative group border border-slate-100">
                            <div className="absolute top-8 left-8 text-6xl text-blue-200/50 font-serif leading-none">“</div>
                            <div className="relative z-10">
                                <h2 className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] mb-6">Executive Summary</h2>
                                <p className="text-2xl leading-relaxed text-slate-700 font-medium italic whitespace-pre-line break-words">
                                    {personalInfo.summary}
                                </p>
                            </div>
                        </section>
                    )}

                    {experience.length > 0 && (
                        <section>
                            <h2 className="text-blue-500 font-black text-xs uppercase tracking-[0.3em] mb-10 pb-4 border-b border-slate-800">Professional Leadership</h2>
                            <div className="space-y-12">
                                {experience.map(exp => (
                                    <div key={exp.id} className="relative pl-12 before:absolute before:left-0 before:top-4 before:w-4 before:h-4 before:bg-blue-600 before:rounded-full after:absolute after:left-2 after:top-8 after:bottom-[-2rem] after:w-[2px] after:bg-slate-100 last:after:hidden">
                                        <div className="flex flex-col md:flex-row justify-between items-start mb-2">
                                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{exp.position}</h3>
                                            <span className="text-xs font-black text-blue-600 bg-blue-50 px-5 py-2 rounded-full border border-blue-100 uppercase tracking-widest">{exp.startDate} – {exp.endDate || 'Present'}</span>
                                        </div>
                                        <div className="text-lg text-blue-600 font-black uppercase tracking-widest mb-4 flex items-center gap-3">
                                            {exp.company} <span className="w-8 h-[2px] bg-blue-100"></span> <span className="text-slate-400">{exp.location}</span>
                                        </div>
                                        <p className="text-[17px] text-slate-600 leading-relaxed whitespace-pre-line font-medium break-words">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    <div className="grid grid-cols-2 gap-16">
                        {education.length > 0 && (
                            <section>
                                <h2 className="text-blue-500 font-black text-xs uppercase tracking-[0.3em] mb-8 pb-4 border-b border-slate-800">Academic Foundation</h2>
                                <div className="space-y-8">
                                    {education.map(edu => (
                                        <div key={edu.id}>
                                            <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                                            <div className="text-slate-400 font-semibold mt-1">{edu.institution}</div>
                                            <div className="text-blue-400/50 text-sm mt-1">{edu.graduationDate}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        {skills.length > 0 && (
                            <section>
                                <h2 className="text-blue-500 font-black text-xs uppercase tracking-[0.3em] mb-8 pb-4 border-b border-slate-800">Core Competencies</h2>
                                <div className="flex flex-wrap gap-3">
                                    {skills.map(s => (
                                        <span key={s.id} className="px-5 py-2 bg-slate-800 text-blue-100 text-[11px] font-black uppercase tracking-wider rounded border border-slate-700 hover:border-blue-500 transition-all cursor-default">{s.name}</span>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Model 3: Silicon (Tech Modern)
    if (template === 'silicon') {
        return (
            <div className="cv-preview-container w-full bg-[#f8fafc] min-h-[1100px] p-8 md:p-12 lg:p-20 shadow-pro" dir={isRtl ? 'rtl' : 'ltr'}>
                <div className="max-w-5xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
                    <header className="bg-slate-900 px-12 py-16 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,#4f46e5_0%,transparent_50%)] opacity-30"></div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                            {personalInfo.photo && (
                                <div className="relative group">
                                    <img src={personalInfo.photo} alt="Profile" className="w-44 h-44 object-cover rounded-3xl border-2 border-slate-700 shadow-[0_20px_50px_rgba(79,70,229,0.3)] group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center border-4 border-slate-900 shadow-xl">
                                        <i className="fa fa-code text-white text-xs"></i>
                                    </div>
                                </div>
                            )}
                            <div className="text-center md:text-left flex-1">
                                <div className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Available for Deployment</div>
                                <h1 className="text-6xl font-black mb-4 tracking-tight leading-none bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">{personalInfo.firstName} <br />{personalInfo.lastName}</h1>
                                <p className="text-2xl font-bold text-purple-400 font-mono tracking-tighter mb-8 flex items-center justify-center md:justify-start gap-3 italic">
                                    <span className="text-slate-600">const</span> jobTitle <span className="text-white">=</span> <span className="text-emerald-400">"{personalInfo.jobTitle}"</span>
                                </p>
                                <div className="flex flex-wrap justify-center md:justify-start gap-6 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                                    <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"><i className="fa fa-terminal text-purple-500"></i> {personalInfo.email}</span>
                                    <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"><i className="fa fa-link text-blue-500"></i> {personalInfo.phone}</span>
                                    <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"><i className="fa fa-map-pin text-pink-500"></i> {personalInfo.location}</span>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="p-12 space-y-12">
                        {personalInfo.summary && (
                            <section className="bg-slate-50 p-8 rounded-3xl border-l-8 border-purple-500 shadow-inner">
                                <h2 className="text-xs font-black uppercase tracking-widest text-purple-600 mb-4 flex items-center gap-2">
                                    <i className="fa fa-info-circle"></i> Executable Summary
                                </h2>
                                <p className="text-lg leading-relaxed text-slate-700 font-medium whitespace-pre-line break-words">{personalInfo.summary}</p>
                            </section>
                        )}

                        {experience.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-4">
                                    <span className="p-2 bg-indigo-100 text-indigo-600 rounded-lg text-sm"><i className="fa fa-history"></i></span>
                                    Deployment History
                                </h2>
                                <div className="space-y-10">
                                    {experience.map(exp => (
                                        <div key={exp.id} className="relative pl-12 before:absolute before:left-4 before:top-2 before:bottom-0 before:w-0.5 before:bg-slate-100 group">
                                            <div className="absolute left-0 top-1.5 w-8 h-8 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center z-10 group-hover:border-purple-500 group-hover:text-purple-500 transition-all">
                                                <i className="fa fa-play text-[10px]"></i>
                                            </div>
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-xl font-bold text-slate-900">{exp.position}</h3>
                                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{exp.startDate} – {exp.endDate || 'Present'}</span>
                                            </div>
                                            <div className="text-purple-600 font-bold mb-4 flex items-center gap-2 italic">
                                                <i className="fa fa-building-o"></i> {exp.company}
                                            </div>
                                            <p className="text-base text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50/50 p-6 rounded-2xl border border-slate-50 break-words">{exp.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {skills.length > 0 && (
                                <section>
                                    <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                        <span className="p-2 bg-purple-100 text-purple-600 rounded-lg text-sm"><i className="fa fa-cube"></i></span>
                                        Tech Stack
                                    </h2>
                                    <div className="flex flex-wrap gap-3">
                                        {skills.map(s => (
                                            <span key={s.id} className="px-5 py-2 bg-white text-slate-700 text-xs font-black rounded-xl border-2 border-slate-100 hover:border-purple-500 hover:text-purple-600 transition-all shadow-sm">
                                                {`#${s.name}`}
                                            </span>
                                        ))}
                                    </div>
                                </section>
                            )}
                            {education.length > 0 && (
                                <section>
                                    <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                        <span className="p-2 bg-pink-100 text-pink-600 rounded-lg text-sm"><i className="fa fa-graduation-cap"></i></span>
                                        Education
                                    </h2>
                                    <div className="space-y-6">
                                        {education.map(edu => (
                                            <div key={edu.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                                <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                                                <div className="text-sm text-slate-500 font-medium mt-1">{edu.institution}</div>
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

    // Model 4: Vogue (Luxury Editorial)
    if (template === 'vogue') {
        const goldColor = '#D4AF37';
        return (
            <div className="cv-preview-container w-full bg-black text-white min-h-[1100px] p-24 shadow-pro relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'} style={{ fontFamily: "'Playfair Display', serif" }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-white/5"></div>

                <header className="mb-24 text-center relative z-10 p-12 border-b border-white/5">
                    {personalInfo.photo && (
                        <div className="relative inline-block mb-16">
                            <img src={personalInfo.photo} alt="Profile" className="w-56 h-56 object-cover rounded-full mx-auto border-[1px] p-4 grayscale brightness-110 contrast-125" style={{ borderColor: goldColor }} />
                            <div className="absolute inset-x-[-20px] top-1/2 h-[1px] bg-white/10 -z-10"></div>
                        </div>
                    )}
                    <div className="mb-12">
                        <h1 className="text-9xl font-light tracking-[0.2em] uppercase leading-none opacity-90" style={{ color: goldColor }}>
                            {personalInfo.firstName.split('').join(' ')}
                        </h1>
                        <h1 className="text-9xl font-light tracking-[0.2em] uppercase leading-none mt-4">
                            {personalInfo.lastName.split('').join(' ')}
                        </h1>
                    </div>
                    <div className="mt-12 flex flex-col items-center gap-6">
                        <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                        <p className="text-3xl font-light tracking-[0.4em] uppercase italic" style={{ color: goldColor }}>{personalInfo.jobTitle}</p>
                        <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    </div>
                    <div className="mt-12 text-[10px] tracking-[0.5em] uppercase text-gray-400 flex justify-center gap-16 font-bold">
                        <span className="hover:text-white transition-colors cursor-pointer">{personalInfo.email}</span>
                        <span className="hover:text-white transition-colors cursor-pointer">{personalInfo.phone}</span>
                        <span className="hover:text-white transition-colors cursor-pointer">{personalInfo.location}</span>
                    </div>
                </header>

                <div className="max-w-4xl mx-auto grid grid-cols-1 gap-24 relative z-10">
                    {personalInfo.summary && (
                        <section className="text-center px-12">
                            <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] mb-12" style={{ color: goldColor }}>The Narrative</h2>
                            <p className="text-2xl leading-relaxed font-light italic text-gray-300 first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left whitespace-pre-line break-words">{personalInfo.summary}</p>
                            <div className="clear-both"></div>
                        </section>
                    )}

                    {experience.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-center mb-16" style={{ color: goldColor }}>The Journey</h2>
                            <div className="space-y-16">
                                {experience.map(exp => (
                                    <div key={exp.id} className="text-center group">
                                        <div className="text-sm font-bold uppercase tracking-[0.3em] mb-4 text-gray-500">{exp.startDate} — {exp.endDate || 'Present'}</div>
                                        <h3 className="text-3xl font-light mb-2 group-hover:italic transition-all">{exp.position}</h3>
                                        <div className="text-lg mb-6 tracking-widest font-bold" style={{ color: goldColor }}>{exp.company}</div>
                                        <p className="text-base leading-relaxed text-gray-400 font-light max-w-2xl mx-auto whitespace-pre-line break-words">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    <div className="grid grid-cols-2 gap-24">
                        {education.length > 0 && (
                            <section className="text-center">
                                <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] mb-12" style={{ color: goldColor }}>Foundation</h2>
                                <div className="space-y-8">
                                    {education.map(edu => (
                                        <div key={edu.id}>
                                            <h3 className="text-xl font-light mb-2">{edu.degree}</h3>
                                            <div className="text-sm tracking-widest text-gray-500 font-bold uppercase">{edu.institution}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        {skills.length > 0 && (
                            <section className="text-center">
                                <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] mb-12" style={{ color: goldColor }}>Disciplines</h2>
                                <div className="flex flex-wrap justify-center gap-4">
                                    {skills.map(s => (
                                        <span key={s.id} className="text-sm tracking-[0.2em] text-gray-400 font-light border-b border-white/10 pb-1 italic">{s.name}</span>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Model 5: Harvard (Ivy League)
    if (template === 'harvard') {
        return (
            <div className="cv-preview-container w-full bg-[#fdfdfd] min-h-[1100px] p-20 text-slate-900 shadow-pro font-serif border-[12px] border-slate-100" dir={isRtl ? 'rtl' : 'ltr'}>
                <header className="mb-14 border-b-4 border-red-900 p-12 text-center relative">
                    <div className="absolute top-0 left-0 w-full h-2 bg-red-900"></div>
                    <h1 className="text-7xl font-black mb-4 text-red-900 tracking-tighter uppercase leading-none">{personalInfo.firstName} {personalInfo.lastName}</h1>
                    <div className="w-1/3 h-1 bg-slate-200 mx-auto mb-6"></div>
                    <p className="text-3xl text-slate-800 font-bold mb-8 italic tracking-wide font-serif">{personalInfo.jobTitle}</p>
                    <div className="flex justify-center flex-wrap gap-12 text-xs font-black tracking-[0.2em] text-slate-400 uppercase">
                        <span className="flex items-center gap-3"><i className="fa fa-envelope text-red-900 text-base"></i> {personalInfo.email}</span>
                        <span className="flex items-center gap-3"><i className="fa fa-phone text-red-900 text-base"></i> {personalInfo.phone}</span>
                        <span className="flex items-center gap-3"><i className="fa fa-map-location-dot text-red-900 text-base"></i> {personalInfo.location}</span>
                    </div>
                </header>

                <div className="space-y-12">
                    {personalInfo.summary && (
                        <section>
                            <h2 className="text-sm font-black uppercase text-red-900 mb-4 pb-2 border-b-2 border-red-900 inline-block tracking-[0.2em]">Abstract</h2>
                            <p className="text-lg leading-relaxed text-slate-800 text-justify whitespace-pre-line break-words">{personalInfo.summary}</p>
                        </section>
                    )}

                    {experience.length > 0 && (
                        <section>
                            <h2 className="text-sm font-black uppercase text-red-900 mb-6 pb-2 border-b-2 border-red-900 inline-block tracking-[0.2em]">Professional Background</h2>
                            <div className="space-y-10">
                                {experience.map(exp => (
                                    <div key={exp.id} className="relative">
                                        <div className="flex justify-between items-baseline mb-3">
                                            <h3 className="text-2xl font-black text-slate-900">{exp.position}</h3>
                                            <span className="text-sm font-black text-slate-600 italic">{exp.startDate} — {exp.endDate || 'Present'}</span>
                                        </div>
                                        <div className="flex justify-between mb-4">
                                            <div className="text-lg text-red-800 font-bold">{exp.company}</div>
                                            <div className="text-sm text-slate-500 font-bold uppercase">{exp.location}</div>
                                        </div>
                                        <p className="text-base text-slate-800 leading-relaxed whitespace-pre-line border-l border-slate-200 pl-8 break-words">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    <div className="grid grid-cols-2 gap-16 pt-8 border-t-2 border-slate-100">
                        {education.length > 0 && (
                            <section>
                                <h2 className="text-sm font-black uppercase text-red-900 mb-6 pb-2 border-b-2 border-red-900 inline-block tracking-[0.2em]">Credentials</h2>
                                <div className="space-y-6">
                                    {education.map(edu => (
                                        <div key={edu.id}>
                                            <h3 className="text-xl font-bold">{edu.degree}</h3>
                                            <div className="text-red-800 font-bold italic mt-1">{edu.institution}</div>
                                            <div className="text-sm text-slate-500 font-black uppercase mt-1">{edu.graduationDate}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        <div className="space-y-10">
                            {skills.length > 0 && (
                                <section>
                                    <h2 className="text-sm font-black uppercase text-red-900 mb-6 pb-2 border-b-2 border-red-900 inline-block tracking-[0.2em]">Core Skillet</h2>
                                    <div className="text-base text-slate-800 leading-loose">
                                        {skills.map(s => s.name).join(' • ')}
                                    </div>
                                </section>
                            )}
                            {languages.length > 0 && (
                                <section>
                                    <h2 className="text-sm font-black uppercase text-red-900 mb-4 pb-2 border-b-2 border-red-900 inline-block tracking-[0.2em]">Linguistic Proficiencies</h2>
                                    <div className="text-base text-slate-800">
                                        {languages.map(l => l.name).join(', ')}
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Model 6: Ignite (Creative Bold)
    if (template === 'ignite') {
        return (
            <div className="cv-preview-container w-full min-h-[1100px] bg-slate-100 p-8 md:p-12 lg:p-16 shadow-pro" dir={isRtl ? 'rtl' : 'ltr'}>
                <div className="relative bg-[#111827] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                    <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 opacity-90 -skew-y-12 origin-top-right transform translate-y-[-10%] scale-110"></div>

                    <header className="relative z-10 p-20 pb-40">
                        <div className="flex flex-col md:flex-row items-center gap-16">
                            {personalInfo.photo && (
                                <div className="relative group">
                                    <div className="absolute -inset-6 bg-gradient-to-tr from-white/30 to-transparent rounded-[3rem] blur-2xl group-hover:scale-110 transition-all duration-700"></div>
                                    <img src={personalInfo.photo} alt="Profile" className="relative w-56 h-56 object-cover rounded-[2.5rem] border-8 border-white shadow-2xl skew-x-3 -rotate-3 hover:rotate-0 hover:skew-x-0 transition-all duration-700 ease-out z-10" />
                                </div>
                            )}
                            <div className="text-center md:text-left relative">
                                <div className="absolute -top-12 -left-4 text-9xl font-black text-white/5 tracking-tighter uppercase select-none pointer-events-none">CREATIVE</div>
                                <h1 className="text-8xl font-black text-white mb-6 tracking-tighter uppercase drop-shadow-2xl leading-[0.85] italic">
                                    {personalInfo.firstName} <br />
                                    <span className="text-orange-300 antialiased">{personalInfo.lastName}</span>
                                </h1>
                                <p className="text-2xl font-black text-white uppercase tracking-[0.3em] bg-black/40 backdrop-blur-xl px-10 py-4 rounded-2xl border-2 border-white/20 inline-block shadow-2xl transform hover:scale-105 transition-transform">
                                    {personalInfo.jobTitle}
                                </p>
                            </div>
                        </div>
                        <div className="mt-16 flex flex-wrap justify-center md:justify-start gap-8">
                            {[
                                { icon: 'envelope', val: personalInfo.email, bg: 'from-orange-600 to-red-600' },
                                { icon: 'phone', val: personalInfo.phone, bg: 'from-red-600 to-pink-600' },
                                { icon: 'location-dot', val: personalInfo.location, bg: 'from-pink-600 to-purple-600' }
                            ].map((item, i) => (
                                <span key={i} className={`flex items-center gap-4 bg-black/40 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:shadow-2xl hover:-translate-y-1 transition-all`}>
                                    <i className={`fa fa-${item.icon} text-orange-400`}></i> {item.val}
                                </span>
                            ))}
                        </div>
                    </header>

                    <div className="relative z-10 bg-white m-8 mt-[-100px] rounded-[2.5rem] p-16 shadow-2xl">
                        {personalInfo.summary && (
                            <section className="mb-20 max-w-4xl border-b border-slate-100 pb-16">
                                <h2 className="text-sm font-black text-orange-600 uppercase tracking-[0.4em] mb-8">The Hook</h2>
                                <p className="text-2xl leading-relaxed text-slate-900 font-bold italic tracking-tight whitespace-pre-line break-words">{personalInfo.summary}</p>
                            </section>
                        )}

                        {experience.length > 0 && (
                            <section className="mb-20">
                                <div className="flex items-center gap-6 mb-12">
                                    <h2 className="text-sm font-black text-red-600 uppercase tracking-[0.4em]">Milestones</h2>
                                    <div className="h-[1px] flex-1 bg-gradient-to-r from-red-600 to-transparent"></div>
                                </div>
                                <div className="space-y-20">
                                    {experience.map(exp => (
                                        <div key={exp.id} className="relative group">
                                            <div className="md:flex gap-16">
                                                <div className="md:w-48 mb-6 md:mb-0">
                                                    <div className="text-sm font-black text-slate-400 uppercase tracking-widest">{exp.startDate}</div>
                                                    <div className="w-8 h-1 bg-orange-500 mt-2"></div>
                                                    <div className="text-sm font-black text-slate-400 uppercase tracking-widest mt-1">{exp.endDate || 'Now'}</div>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-4xl font-black text-slate-900 mb-2 group-hover:text-red-600 transition-colors">{exp.position}</h3>
                                                    <div className="text-xl font-bold text-orange-600 mb-6 italic underline decoration-red-600/30 decoration-4 underline-offset-8">{exp.company}</div>
                                                    <p className="text-lg text-slate-700 leading-relaxed font-medium whitespace-pre-line break-words">{exp.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                            {education.length > 0 && (
                                <section>
                                    <h2 className="text-sm font-black text-pink-600 uppercase tracking-[0.4em] mb-10">Academy</h2>
                                    <div className="space-y-10">
                                        {education.map(edu => (
                                            <div key={edu.id} className="p-8 bg-slate-50 rounded-3xl hover:bg-pink-50 transition-colors">
                                                <h3 className="text-2xl font-black text-slate-900">{edu.degree}</h3>
                                                <div className="text-lg font-bold text-pink-600 mt-2">{edu.institution}</div>
                                                <div className="text-sm font-black text-slate-400 mt-1 uppercase tracking-widest">{edu.graduationDate}</div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                            {skills.length > 0 && (
                                <section>
                                    <h2 className="text-sm font-black text-orange-600 uppercase tracking-[0.4em] mb-10">Arsenal</h2>
                                    <div className="flex flex-wrap gap-4">
                                        {skills.map(s => (
                                            <span key={s.id} className="px-6 py-4 bg-[#111827] text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-orange-600 transition-all transform hover:-translate-y-1 shadow-lg shadow-orange-600/10">
                                                {s.name}
                                            </span>
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

    // Model 7: Montreal (Canadian Bilingual)
    if (template === 'montreal') {
        const mapleRed = '#C53030';
        return (
            <div className="cv-preview-container w-full bg-slate-50 min-h-[1100px] p-8 md:p-12 lg:p-16 shadow-pro font-inter" dir="ltr">
                <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200">
                    <header className="relative p-20 text-center bg-slate-50/50">
                        <div className="absolute top-0 left-0 w-full h-6 bg-[repeating-linear-gradient(45deg,#C53030,#C53030_20px,#9B2C2C_20px,#9B2C2C_40px)]"></div>
                        <div className="max-w-4xl mx-auto pt-6">
                            {personalInfo.photo && (
                                <div className="relative inline-block mb-10">
                                    <img src={personalInfo.photo} alt="Profile" className="w-48 h-48 object-cover rounded-[3rem] mx-auto border-[10px] border-white shadow-2xl ring-2 ring-red-700/10" />
                                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-700 rounded-2xl flex items-center justify-center text-white text-2xl shadow-xl">
                                        <i className="fa fa-leaf"></i>
                                    </div>
                                </div>
                            )}
                            <h1 className="text-7xl font-black mb-6 tracking-tighter text-slate-900 border-b-[12px] border-red-700 px-8 pb-4 inline-block transform -rotate-1 shadow-sm bg-white">
                                {personalInfo.firstName} {personalInfo.lastName}
                            </h1>
                            <p className="text-3xl text-red-700 font-black mb-12 uppercase tracking-[0.3em] font-inter">
                                {personalInfo.jobTitle}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] bg-white p-8 rounded-3xl border border-slate-100 shadow-2xl shadow-red-900/5">
                                <div className="flex flex-col items-center gap-2 border-r border-slate-100">
                                    <i className="fa fa-envelope text-red-600 text-lg mb-1"></i>
                                    <span>{personalInfo.email}</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 border-r border-slate-100">
                                    <i className="fa fa-phone text-red-600 text-lg mb-1"></i>
                                    <span>{personalInfo.phone}</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <i className="fa fa-map-location-dot text-red-600 text-lg mb-1"></i>
                                    <span>{personalInfo.location}</span>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="p-16 pt-0 space-y-16">
                        {personalInfo.summary && (
                            <section className="relative">
                                <div className="absolute -left-16 top-0 w-2 h-16 bg-red-700 rounded-r-full"></div>
                                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-red-700 mb-6 flex items-center gap-4">
                                    Profile / Profil <div className="h-[1px] flex-1 bg-slate-100"></div>
                                </h2>
                                <p className="text-lg leading-relaxed text-slate-700 font-medium italic whitespace-pre-line break-words">{personalInfo.summary}</p>
                            </section>
                        )}

                        {experience.length > 0 && (
                            <section>
                                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-red-700 mb-10 flex items-center gap-4">
                                    Experience / Expérience <div className="h-[1px] flex-1 bg-slate-100"></div>
                                </h2>
                                <div className="space-y-12">
                                    {experience.map(exp => (
                                        <div key={exp.id} className="group">
                                            <div className="flex justify-between items-baseline mb-3">
                                                <h3 className="text-2xl font-black text-slate-900 group-hover:text-red-700 transition-colors uppercase tracking-tight">{exp.position}</h3>
                                                <span className="text-sm font-black text-red-700 bg-red-50 px-4 py-2 rounded-full border border-red-100">{exp.startDate} – {exp.endDate || 'Present'}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-lg text-slate-500 font-bold mb-6 italic">
                                                <i className="fa fa-building-columns text-slate-300"></i> {exp.company} — {exp.location}
                                            </div>
                                            <p className="text-base text-slate-600 leading-relaxed whitespace-pre-line border-l-4 border-slate-50 pl-8 break-words">{exp.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                            <div className="space-y-16">
                                {education.length > 0 && (
                                    <section>
                                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-red-700 mb-8 flex items-center gap-4">
                                            Education <div className="h-[1px] flex-1 bg-slate-100"></div>
                                        </h2>
                                        <div className="space-y-8">
                                            {education.map(edu => (
                                                <div key={edu.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-red-200 transition-all">
                                                    <h3 className="text-xl font-black text-slate-900 border-b-2 border-slate-200 pb-2 mb-3">{edu.degree}</h3>
                                                    <div className="text-red-700 font-bold mb-1 uppercase tracking-wider text-xs">{edu.institution}</div>
                                                    <div className="text-slate-400 font-black text-xs uppercase tracking-[0.2em]">{edu.graduationDate}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </div>

                            <div className="space-y-16">
                                {skills.length > 0 && (
                                    <section>
                                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-red-700 mb-8 flex items-center gap-4">
                                            Skills / Compétences <div className="h-[1px] flex-1 bg-slate-100"></div>
                                        </h2>
                                        <div className="flex flex-wrap gap-2">
                                            {skills.map(s => (
                                                <span key={s.id} className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.1em] rounded-lg border-b-4 border-red-700 hover:bg-red-700 transition-all cursor-default">
                                                    {s.name}
                                                </span>
                                            ))}
                                        </div>
                                    </section>
                                )}
                                {languages.length > 0 && (
                                    <section>
                                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-red-700 mb-8 flex items-center gap-4">
                                            Languages <div className="h-[1px] flex-1 bg-slate-100"></div>
                                        </h2>
                                        <div className="space-y-4">
                                            {languages.map(l => (
                                                <div key={l.id} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest mb-3 text-slate-600">
                                                        <span>{l.name}</span>
                                                        <span className="text-red-700">{l.level}%</span>
                                                    </div>
                                                    <div className="h-3 bg-white rounded-full overflow-hidden border border-slate-200 p-[2px]">
                                                        <div className="h-full bg-gradient-to-r from-red-700 to-red-500 rounded-full" style={{ width: `${l.level}%` }}></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Model 8: The Oxford (Academic/Research)
    if (template === 'oxford') {
        return (
            <div className="cv-preview-container w-full bg-[#fdfbf7] min-h-[1100px] p-20 text-slate-900 shadow-pro font-serif" dir={isRtl ? 'rtl' : 'ltr'}>
                <header className="mb-20 text-center relative p-16">
                    <div className="absolute inset-0 border-[20px] border-double border-slate-100 -z-10"></div>
                    {personalInfo.photo && (
                        <div className="relative inline-block mb-10 group">
                            <img src={personalInfo.photo} alt="Profile" className="w-48 h-48 object-cover rounded-full border-[10px] border-double border-slate-800 shadow-2xl mx-auto grayscale flex-shrink-0" />
                            <div className="absolute inset-0 rounded-full border-2 border-slate-800 scale-110 opacity-30 group-hover:scale-125 transition-transform duration-1000"></div>
                        </div>
                    )}
                    <h1 className="text-7xl font-bold mb-4 text-slate-900 tracking-tighter font-serif uppercase">
                        {personalInfo.firstName} <span className="text-slate-500 font-light">{personalInfo.lastName}</span>
                    </h1>
                    <div className="h-[2px] w-40 bg-slate-800 mx-auto mb-8"></div>
                    <p className="text-3xl text-slate-700 font-medium mb-10 italic tracking-widest font-serif">{personalInfo.jobTitle}</p>
                    <div className="flex justify-center flex-wrap gap-x-12 gap-y-4 text-[11px] text-slate-500 font-black uppercase tracking-[0.3em] border-t border-slate-200 pt-8 inline-flex">
                        <span className="flex items-center gap-3 hover:text-slate-900 transition-colors cursor-pointer"><i className="fa fa-envelope text-[8px]"></i> {personalInfo.email}</span>
                        <span className="text-slate-200">/</span>
                        <span className="flex items-center gap-3 hover:text-slate-900 transition-colors cursor-pointer"><i className="fa fa-phone text-[8px]"></i> {personalInfo.phone}</span>
                        <span className="text-slate-200">/</span>
                        <span className="flex items-center gap-3 hover:text-slate-900 transition-colors cursor-pointer"><i className="fa fa-location-dot text-[8px]"></i> {personalInfo.location}</span>
                    </div>
                </header>

                <div className="max-w-4xl mx-auto space-y-12">
                    {personalInfo.summary && (
                        <section>
                            <h2 className="text-sm font-bold uppercase text-slate-900 mb-5 pb-2 border-b-2 border-slate-800 tracking-[0.3em] inline-block">
                                Academic Profile
                            </h2>
                            <p className="text-lg leading-loose text-slate-800 text-justify mt-6 first-letter:text-4xl first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:text-slate-900 whitespace-pre-line break-words">{personalInfo.summary}</p>
                        </section>
                    )}

                    {education.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase text-slate-900 mb-8 pb-2 border-b-2 border-slate-800 tracking-[0.3em] inline-block">
                                Academic Qualifications
                            </h2>
                            <div className="space-y-8 mt-6">
                                {education.map(edu => (
                                    <div key={edu.id} className="relative pl-8 before:absolute before:left-0 before:top-1 before:w-3 before:h-3 before:bg-slate-800 before:rounded-full">
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="text-xl font-bold text-slate-900">{edu.degree}</h3>
                                            <span className="text-sm text-slate-600 font-bold italic">{edu.graduationDate}</span>
                                        </div>
                                        <div className="text-base text-slate-700 italic mb-2">{edu.institution}</div>
                                        {edu.description && <p className="text-base text-slate-600 leading-relaxed mt-2 whitespace-pre-line break-words">{edu.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {experience.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase text-slate-900 mb-8 pb-2 border-b-2 border-slate-800 tracking-[0.3em] inline-block">
                                Professional Appointments
                            </h2>
                            <div className="space-y-10 mt-6">
                                {experience.map(exp => (
                                    <div key={exp.id} className="relative pl-8 before:absolute before:left-0 before:top-1 before:w-3 before:h-3 before:bg-slate-800 before:rounded-full">
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="text-xl font-bold text-slate-900">{exp.position}</h3>
                                            <span className="text-sm text-slate-600 font-bold italic">{exp.startDate} – {exp.endDate || 'Present'}</span>
                                        </div>
                                        <div className="text-base text-slate-700 italic mb-3">{exp.company}, {exp.location}</div>
                                        <p className="text-base text-slate-700 leading-loose whitespace-pre-line text-justify break-words">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    <div className="grid grid-cols-2 gap-16 pt-10 border-t-2 border-slate-200">
                        {skills.length > 0 && (
                            <section>
                                <h2 className="text-sm font-bold uppercase text-slate-900 mb-6 pb-2 border-b-2 border-slate-800 tracking-[0.3em] inline-block">
                                    Proficiencies
                                </h2>
                                <div className="text-base text-slate-800 leading-loose mt-4">
                                    {skills.map(s => s.name).join(' • ')}
                                </div>
                            </section>
                        )}

                        {languages.length > 0 && (
                            <section>
                                <h2 className="text-sm font-bold uppercase text-slate-900 mb-6 pb-2 border-b-2 border-slate-800 tracking-[0.3em] inline-block">
                                    Languages
                                </h2>
                                <div className="space-y-2 text-base text-slate-800 mt-4">
                                    {languages.map(l => (
                                        <div key={l.id} className="font-medium">{l.name} — {l.level >= 90 ? 'Native fluency' : l.level >= 70 ? 'Professional fluency' : 'Working knowledge'}</div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Model 9: The Berlin (Modern Geometric)
    if (template === 'berlin') {
        return (
            <div className="cv-preview-container w-full bg-white min-h-[1100px] text-slate-900" dir={isRtl ? 'rtl' : 'ltr'}>
                {/* Bold Geometric Header */}
                <header className="bg-slate-900 text-white p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 opacity-20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400 opacity-20 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10 flex items-center gap-8">
                        {personalInfo.photo && (
                            <img src={personalInfo.photo} alt="Profile" className="w-32 h-32 object-cover rounded-none border-4 border-yellow-400 shadow-xl" />
                        )}
                        <div className="flex-1">
                            <h1 className="text-5xl font-black mb-2 tracking-tight uppercase">
                                {personalInfo.firstName}<br />{personalInfo.lastName}
                            </h1>
                            <p className="text-xl text-yellow-400 font-bold uppercase tracking-wider">{personalInfo.jobTitle}</p>
                        </div>
                    </div>
                </header>

                <div className="p-12">
                    {/* Contact Bar */}
                    <div className="flex flex-wrap gap-6 text-sm text-slate-600 mb-10 pb-6 border-b-4 border-yellow-400">
                        {personalInfo.email && <span className="flex items-center gap-2"><i className="fa fa-envelope text-yellow-500"></i> {personalInfo.email}</span>}
                        {personalInfo.phone && <span className="flex items-center gap-2"><i className="fa fa-phone text-yellow-500"></i> {personalInfo.phone}</span>}
                        {personalInfo.location && <span className="flex items-center gap-2"><i className="fa fa-location-dot text-yellow-500"></i> {personalInfo.location}</span>}
                    </div>

                    {/* Summary */}
                    {personalInfo.summary && (
                        <section className="mb-10">
                            <h2 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-wide flex items-center gap-3">
                                <span className="w-2 h-8 bg-yellow-400"></span> Profile
                            </h2>
                            <p className="text-base leading-relaxed text-slate-700">{personalInfo.summary}</p>
                        </section>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <section className="mb-10">
                            <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-wide flex items-center gap-3">
                                <span className="w-2 h-8 bg-yellow-400"></span> Experience
                            </h2>
                            <div className="space-y-8">
                                {experience.map(exp => (
                                    <div key={exp.id} className="border-l-4 border-yellow-400 pl-6 page-break-inside-avoid">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900">{exp.position}</h3>
                                                <div className="text-base text-slate-700 font-semibold">{exp.company}</div>
                                            </div>
                                            <span className="text-sm text-slate-500 font-semibold bg-yellow-50 px-3 py-1 rounded">{exp.startDate} – {exp.endDate || 'Now'}</span>
                                        </div>
                                        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education & Skills Grid */}
                    <div className="grid grid-cols-2 gap-10">
                        {education.length > 0 && (
                            <section className="page-break-inside-avoid">
                                <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-wide flex items-center gap-3">
                                    <span className="w-2 h-8 bg-yellow-400"></span> Education
                                </h2>
                                <div className="space-y-4">
                                    {education.map(edu => (
                                        <div key={edu.id}>
                                            <h3 className="text-base font-bold text-slate-900">{edu.degree}</h3>
                                            <div className="text-sm text-slate-600">{edu.institution}</div>
                                            <div className="text-xs text-slate-500">{edu.graduationDate}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {skills.length > 0 && (
                            <section className="page-break-inside-avoid">
                                <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-wide flex items-center gap-3">
                                    <span className="w-2 h-8 bg-yellow-400"></span> Skills
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map(s => (
                                        <span key={s.id} className="px-3 py-1 bg-slate-900 text-white text-xs font-bold uppercase">
                                            {s.name}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Model 10: The Tokyo (Creative Professional)
    if (template === 'tokyo') {
        return (
            <div className="cv-preview-container w-full bg-gradient-to-br from-slate-50 to-pink-50 min-h-[1100px] p-12 text-slate-900" dir={isRtl ? 'rtl' : 'ltr'}>
                {/* Unique Asymmetric Header */}
                <header className="mb-12 relative">
                    <div className="flex items-start gap-8">
                        <div className="flex-1">
                            <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-8 rounded-3xl shadow-2xl">
                                <h1 className="text-5xl font-black mb-3 tracking-tight">
                                    {personalInfo.firstName}<br />
                                    <span className="text-pink-200">{personalInfo.lastName}</span>
                                </h1>
                                <p className="text-xl font-bold">{personalInfo.jobTitle}</p>
                            </div>
                            <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-600">
                                {personalInfo.email && <span className="flex items-center gap-2"><i className="fa fa-envelope text-pink-500"></i> {personalInfo.email}</span>}
                                {personalInfo.phone && <span className="flex items-center gap-2"><i className="fa fa-phone text-pink-500"></i> {personalInfo.phone}</span>}
                                {personalInfo.location && <span className="flex items-center gap-2"><i className="fa fa-location-dot text-pink-500"></i> {personalInfo.location}</span>}
                            </div>
                        </div>
                        {personalInfo.photo && (
                            <img src={personalInfo.photo} alt="Profile" className="w-48 h-48 object-cover rounded-3xl border-8 border-white shadow-2xl" />
                        )}
                    </div>
                </header>

                {/* Summary */}
                {personalInfo.summary && (
                    <section className="mb-10 bg-white p-8 rounded-2xl shadow-lg">
                        <h2 className="text-sm font-black uppercase tracking-wider text-pink-600 mb-4 flex items-center gap-2">
                            <i className="fa fa-user text-pink-500"></i> About Me
                        </h2>
                        <p className="text-sm leading-relaxed text-slate-700">{personalInfo.summary}</p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-sm font-black uppercase tracking-wider text-purple-600 mb-6 flex items-center gap-2">
                            <i className="fa fa-briefcase text-purple-500"></i> Professional Journey
                        </h2>
                        <div className="space-y-6">
                            {experience.map(exp => (
                                <div key={exp.id} className="bg-white p-8 rounded-2xl shadow-lg page-break-inside-avoid relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-100 to-purple-100 rounded-bl-full opacity-50"></div>
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900">{exp.position}</h3>
                                                <div className="text-base text-pink-600 font-semibold">{exp.company}</div>
                                            </div>
                                            <span className="text-sm text-white bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-1 rounded-full font-semibold">{exp.startDate} – {exp.endDate || 'Present'}</span>
                                        </div>
                                        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{exp.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills & Education Grid */}
                <div className="grid grid-cols-2 gap-6">
                    {skills.length > 0 && (
                        <section className="bg-white p-8 rounded-2xl shadow-lg page-break-inside-avoid">
                            <h2 className="text-sm font-black uppercase tracking-wider text-pink-600 mb-6 flex items-center gap-2">
                                <i className="fa fa-star text-pink-500"></i> Skills
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map(s => (
                                    <span key={s.id} className="px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 text-purple-800 text-sm font-bold rounded-full">
                                        {s.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {education.length > 0 && (
                        <section className="bg-white p-8 rounded-2xl shadow-lg page-break-inside-avoid">
                            <h2 className="text-sm font-black uppercase tracking-wider text-purple-600 mb-6 flex items-center gap-2">
                                <i className="fa fa-graduation-cap text-purple-500"></i> Education
                            </h2>
                            <div className="space-y-4">
                                {education.map(edu => (
                                    <div key={edu.id}>
                                        <h3 className="text-base font-bold text-slate-900">{edu.degree}</h3>
                                        <div className="text-sm text-pink-600 font-semibold">{edu.institution}</div>
                                        <div className="text-xs text-slate-500">{edu.graduationDate}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        );
    }

    // Model 11: The Stockholm (Scandinavian)
    if (template === 'stockholm') {
        return (
            <div className="cv-preview-container w-full bg-gray-50 min-h-[1100px] p-16 text-slate-900" dir={isRtl ? 'rtl' : 'ltr'}>
                {/* Minimalist Header with Generous Whitespace */}
                <header className="mb-16 pb-12 border-b border-slate-200">
                    <div className="flex items-center gap-12">
                        {personalInfo.photo && (
                            <img src={personalInfo.photo} alt="Profile" className="w-40 h-40 object-cover rounded-full border border-slate-200 shadow-sm" />
                        )}
                        <div className="flex-1">
                            <h1 className="text-6xl font-light mb-4 tracking-tight text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>
                                {personalInfo.firstName} {personalInfo.lastName}
                            </h1>
                            <p className="text-2xl text-slate-600 font-light">{personalInfo.jobTitle}</p>
                        </div>
                    </div>
                    <div className="mt-8 flex gap-8 text-sm text-slate-500">
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {personalInfo.phone && <span>•</span>}
                        {personalInfo.phone && <span>{personalInfo.phone}</span>}
                        {personalInfo.location && <span>•</span>}
                        {personalInfo.location && <span>{personalInfo.location}</span>}
                    </div>
                </header>

                {/* Summary */}
                {personalInfo.summary && (
                    <section className="mb-16">
                        <p className="text-lg leading-relaxed text-slate-700 font-light max-w-3xl">{personalInfo.summary}</p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section className="mb-16">
                        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-8">Experience</h2>
                        <div className="space-y-12">
                            {experience.map(exp => (
                                <div key={exp.id} className="page-break-inside-avoid">
                                    <div className="flex justify-between items-baseline mb-3">
                                        <h3 className="text-2xl font-light text-slate-900">{exp.position}</h3>
                                        <span className="text-sm text-slate-500">{exp.startDate} – {exp.endDate || 'Present'}</span>
                                    </div>
                                    <div className="text-base text-slate-600 font-light mb-4">{exp.company}</div>
                                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line font-light">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <section className="mb-16 page-break-inside-avoid">
                        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-8">Education</h2>
                        <div className="space-y-6">
                            {education.map(edu => (
                                <div key={edu.id}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-xl font-light text-slate-900">{edu.degree}</h3>
                                        <span className="text-sm text-slate-500">{edu.graduationDate}</span>
                                    </div>
                                    <div className="text-base text-slate-600 font-light">{edu.institution}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                    <section className="page-break-inside-avoid">
                        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-8">Skills</h2>
                        <div className="flex flex-wrap gap-4">
                            {skills.map(s => (
                                <span key={s.id} className="text-sm text-slate-700 font-light">
                                    {s.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        );
    }

    // Model 12: The Dubai (Luxury Executive)
    if (template === 'dubai') {
        return (
            <div className="cv-preview-container w-full bg-gradient-to-br from-slate-900 to-slate-800 min-h-[1100px] text-white" dir={isRtl ? 'rtl' : 'ltr'}>
                {/* Luxury Header */}
                <header className="relative p-12 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10 flex items-center gap-10">
                        {personalInfo.photo && (
                            <img src={personalInfo.photo} alt="Profile" className="w-48 h-48 object-cover rounded-full border-8 border-amber-400 shadow-2xl shadow-amber-400/50" />
                        )}
                        <div className="flex-1">
                            <h1 className="text-6xl font-black mb-4 tracking-tight bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
                                {personalInfo.firstName} {personalInfo.lastName}
                            </h1>
                            <p className="text-2xl text-amber-400 font-bold uppercase tracking-widest mb-6">{personalInfo.jobTitle}</p>
                            <div className="flex flex-wrap gap-6 text-sm text-slate-300">
                                {personalInfo.email && <span className="flex items-center gap-2"><i className="fa fa-envelope text-amber-400"></i> {personalInfo.email}</span>}
                                {personalInfo.phone && <span className="flex items-center gap-2"><i className="fa fa-phone text-amber-400"></i> {personalInfo.phone}</span>}
                                {personalInfo.location && <span className="flex items-center gap-2"><i className="fa fa-location-dot text-amber-400"></i> {personalInfo.location}</span>}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-12">
                    {/* Summary */}
                    {personalInfo.summary && (
                        <section className="mb-10 pb-8 border-b border-amber-400/30">
                            <h2 className="text-lg font-black uppercase tracking-wider text-amber-400 mb-4">Executive Profile</h2>
                            <p className="text-base leading-relaxed text-slate-200">{personalInfo.summary}</p>
                        </section>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <section className="mb-10 pb-8 border-b border-amber-400/30">
                            <h2 className="text-lg font-black uppercase tracking-wider text-amber-400 mb-6">Leadership Experience</h2>
                            <div className="space-y-8">
                                {experience.map(exp => (
                                    <div key={exp.id} className="page-break-inside-avoid">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="text-2xl font-bold text-white">{exp.position}</h3>
                                                <div className="text-lg text-amber-400 font-semibold">{exp.company}</div>
                                            </div>
                                            <span className="text-sm text-slate-300 bg-amber-400/10 px-4 py-2 rounded-full border border-amber-400/30">{exp.startDate} – {exp.endDate || 'Present'}</span>
                                        </div>
                                        <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education & Skills */}
                    <div className="grid grid-cols-2 gap-12">
                        {education.length > 0 && (
                            <section className="page-break-inside-avoid">
                                <h2 className="text-lg font-black uppercase tracking-wider text-amber-400 mb-6">Education</h2>
                                <div className="space-y-4">
                                    {education.map(edu => (
                                        <div key={edu.id}>
                                            <h3 className="text-base font-bold text-white">{edu.degree}</h3>
                                            <div className="text-sm text-slate-300">{edu.institution}</div>
                                            <div className="text-xs text-amber-400 font-semibold">{edu.graduationDate}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {skills.length > 0 && (
                            <section className="page-break-inside-avoid">
                                <h2 className="text-lg font-black uppercase tracking-wider text-amber-400 mb-6">Core Competencies</h2>
                                <div className="flex flex-wrap gap-3">
                                    {skills.map(s => (
                                        <span key={s.id} className="px-4 py-2 bg-amber-400/10 text-amber-400 text-sm font-bold rounded border border-amber-400/30">
                                            {s.name}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Fallback
    return <div className="p-10 text-center font-black opacity-20">Template not found</div>;
};

export default CVPreview;
