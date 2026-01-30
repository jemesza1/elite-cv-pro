import React from 'react';
import { CVData, Language, TemplateType } from '../types';

interface Props {
    data: CVData;
    template: TemplateType;
    lang: Language;
}

const MoreProfessionalTemplates: React.FC<Props> = ({ data, template, lang }) => {
    const { personalInfo, experience, education, skills, languages } = data;
    const isRtl = lang === 'ar';

    // Template 5: The Quantum (Elegant Serif)
    if (template === 'quantum') {
        return (
            <div className="cv-preview-container w-full bg-[#FEFEFE] min-h-[1100px] p-20 text-slate-900" dir={isRtl ? 'rtl' : 'ltr'} style={{ fontFamily: "'Playfair Display', serif" }}>
                <header className="text-center mb-16 pb-12 border-b-2 border-slate-900 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-slate-900"></div>
                    {personalInfo.photo && (
                        <div className="relative inline-block mb-10 group">
                            <img src={personalInfo.photo} alt="Profile" className="w-48 h-48 object-cover rounded-none mx-auto border-2 border-slate-900 shadow-[20px_20px_0px_rgba(15,23,42,0.05)] grayscale group-hover:grayscale-0 transition-all duration-700" />
                        </div>
                    )}
                    <h1 className="text-8xl font-black mb-6 text-slate-900 tracking-tighter leading-none">
                        {personalInfo.firstName} <span className="font-light">{personalInfo.lastName}</span>
                    </h1>
                    <div className="flex justify-center flex-wrap gap-x-12 gap-y-4 text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mt-8 mb-4">
                        <span className="flex items-center gap-3">EMAIL: {personalInfo.email}</span>
                        <span className="flex items-center gap-3">TEL: {personalInfo.phone}</span>
                        <span className="flex items-center gap-3">LOC: {personalInfo.location}</span>
                    </div>
                    <div className="h-px w-2/3 bg-slate-100 mx-auto mt-8"></div>
                    <p className="text-3xl text-slate-800 font-bold italic mt-8 font-serif leading-tight">{personalInfo.jobTitle}</p>
                </header>

                <div className="max-w-4xl mx-auto space-y-12">
                    {personalInfo.summary && (
                        <section className="text-center">
                            <p className="text-xl leading-loose text-slate-700 italic whitespace-pre-line break-words first-letter:text-6xl first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:text-slate-900">
                                {personalInfo.summary}
                            </p>
                        </section>
                    )}

                    {experience.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-center mb-10 text-slate-900 uppercase tracking-widest" style={{ letterSpacing: '0.2em' }}>Experience</h2>
                            <div className="space-y-10">
                                {experience.map(exp => (
                                    <div key={exp.id} className="text-center border-b border-slate-100 pb-8 last:border-0">
                                        <h3 className="text-3xl font-bold text-slate-900 mb-2">{exp.position}</h3>
                                        <div className="text-xl text-slate-600 italic mb-3">{exp.company}</div>
                                        <div className="text-sm text-slate-500 font-sans mb-4">{exp.startDate} - {exp.endDate || 'Present'}</div>
                                        <p className="text-base leading-relaxed text-slate-700 max-w-3xl mx-auto whitespace-pre-line break-words font-sans">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    <div className="grid grid-cols-2 gap-12 pt-10">
                        {education.length > 0 && (
                            <section className="text-center">
                                <h2 className="text-lg font-bold mb-6 text-slate-900 uppercase tracking-widest">Education</h2>
                                <div className="space-y-6">
                                    {education.map(edu => (
                                        <div key={edu.id}>
                                            <h3 className="text-xl font-bold text-slate-900">{edu.degree}</h3>
                                            <div className="text-base text-slate-600 italic">{edu.institution}</div>
                                            <div className="text-sm text-slate-500 font-sans mt-1">{edu.graduationDate}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {skills.length > 0 && (
                            <section className="text-center">
                                <h2 className="text-lg font-bold mb-6 text-slate-900 uppercase tracking-widest">Skills</h2>
                                <div className="text-base text-slate-700 font-sans leading-loose">
                                    {skills.map(s => s.name).join(' • ')}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Template 6: The Spectrum (Colorful Modern)
    if (template === 'spectrum') {
        return (
            <div className="cv-preview-container w-full bg-white min-h-[1100px] p-12" dir={isRtl ? 'rtl' : 'ltr'}>
                {/* Rainbow Top Border */}
                <div className="h-4 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 rounded-full mb-12"></div>

                <div className="flex gap-12">
                    {/* Left Column */}
                    <div className="w-1/3 space-y-8">
                        {personalInfo.photo && (
                            <div className="relative group">
                                <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition"></div>
                                <img src={personalInfo.photo} alt="Profile" className="relative w-full aspect-square object-cover rounded-3xl shadow-2xl" />
                            </div>
                        )}

                        {/* Contact */}
                        <section>
                            <h2 className="text-sm font-black uppercase tracking-wider mb-6 text-pink-600 flex items-center gap-2">
                                <span className="w-10 h-1 bg-pink-600 rounded"></span> Contact
                            </h2>
                            <div className="space-y-3 text-sm text-slate-700">
                                {personalInfo.email && <div className="flex items-center gap-3"><i className="fa fa-envelope text-pink-500"></i> <span className="break-all">{personalInfo.email}</span></div>}
                                {personalInfo.phone && <div className="flex items-center gap-3"><i className="fa fa-phone text-blue-500"></i> {personalInfo.phone}</div>}
                                {personalInfo.location && <div className="flex items-center gap-3"><i className="fa fa-map-marker text-green-500"></i> {personalInfo.location}</div>}
                            </div>
                        </section>

                        {/* Skills */}
                        {skills.length > 0 && (
                            <section>
                                <h2 className="text-sm font-black uppercase tracking-wider mb-6 text-blue-600 flex items-center gap-2">
                                    <span className="w-10 h-1 bg-blue-600 rounded"></span> Skills
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((s, idx) => {
                                        const colors = ['bg-red-100 text-red-700', 'bg-yellow-100 text-yellow-700', 'bg-green-100 text-green-700', 'bg-blue-100 text-blue-700', 'bg-purple-100 text-purple-700'];
                                        return (
                                            <span key={s.id} className={`px-3 py-1.5 rounded-full text-xs font-bold ${colors[idx % colors.length]}`}>
                                                {s.name}
                                            </span>
                                        );
                                    })}
                                </div>
                            </section>
                        )}

                        {/* Education */}
                        {education.length > 0 && (
                            <section>
                                <h2 className="text-sm font-black uppercase tracking-wider mb-6 text-green-600 flex items-center gap-2">
                                    <span className="w-10 h-1 bg-green-600 rounded"></span> Education
                                </h2>
                                <div className="space-y-4">
                                    {education.map(edu => (
                                        <div key={edu.id} className="p-4 bg-green-50 rounded-2xl border-l-4 border-green-500">
                                            <h3 className="text-sm font-bold text-slate-900">{edu.degree}</h3>
                                            <div className="text-xs text-green-700 font-semibold mt-1">{edu.institution}</div>
                                            <div className="text-xs text-slate-500 mt-1">{edu.graduationDate}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="flex-1">
                        <header className="mb-14">
                            <div className="inline-block px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-lg mb-8">Creative Portfolio</div>
                            <h1 className="text-8xl font-black text-slate-900 mb-6 leading-[0.85] tracking-tighter bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                {personalInfo.firstName}<br />{personalInfo.lastName}
                            </h1>
                            <div className="h-2 w-32 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full mb-8"></div>
                            <p className="text-3xl text-slate-700 font-black tracking-tight italic">{personalInfo.jobTitle}</p>
                        </header>

                        {personalInfo.summary && (
                            <section className="mb-12 p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl border-2 border-purple-200">
                                <p className="text-lg leading-relaxed text-slate-800 whitespace-pre-line break-words">{personalInfo.summary}</p>
                            </section>
                        )}

                        {experience.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-black uppercase text-slate-900 mb-8 tracking-tight flex items-center gap-3">
                                    <span className="w-12 h-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded"></span>
                                    Experience
                                </h2>
                                <div className="space-y-10">
                                    {experience.map(exp => (
                                        <div key={exp.id} className="pl-8 border-l-4 border-purple-200 hover:border-purple-500 transition">
                                            <div className="flex justify-between items-baseline mb-3">
                                                <h3 className="text-2xl font-bold text-slate-900">{exp.position}</h3>
                                                <span className="text-xs font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">{exp.startDate} - {exp.endDate || 'Now'}</span>
                                            </div>
                                            <div className="text-lg text-purple-600 font-bold mb-4">{exp.company}</div>
                                            <p className="text-base text-slate-700 leading-relaxed whitespace-pre-line break-words">{exp.description}</p>
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

    // Template 7: The Cascade (Timeline Design)
    if (template === 'cascade') {
        return (
            <div className="cv-preview-container w-full bg-gradient-to-br from-slate-50 to-slate-100 min-h-[1100px] p-16" dir={isRtl ? 'rtl' : 'ltr'}>
                <div className="max-w-5xl mx-auto">
                    {/* Header Card */}
                    <div className="bg-white rounded-3xl p-12 mb-10 shadow-2xl">
                        <div className="flex flex-col md:flex-row items-center gap-12 relative">
                            {personalInfo.photo && (
                                <div className="relative group">
                                    <img src={personalInfo.photo} alt="Profile" className="w-52 h-52 object-cover rounded-3xl shadow-2xl relative z-10 border-4 border-white" />
                                    <div className="absolute -inset-4 bg-indigo-500/10 rounded-[2.5rem] -z-10 group-hover:scale-105 transition-transform duration-700 animate-pulse"></div>
                                </div>
                            )}
                            <div className="flex-1 text-center md:text-left">
                                <span className="inline-block text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600 mb-4 px-4 py-1.5 bg-indigo-50 rounded-full border border-indigo-100">Verified Personnel</span>
                                <h1 className="text-7xl font-black text-slate-900 mb-4 tracking-tighter leading-none">
                                    {personalInfo.firstName} <span className="text-indigo-600 font-light italic">{personalInfo.lastName}</span>
                                </h1>
                                <p className="text-3xl text-slate-600 font-bold mb-8 uppercase tracking-widest leading-none">{personalInfo.jobTitle}</p>
                                <div className="flex flex-wrap justify-center md:justify-start gap-8 font-black uppercase text-[10px] tracking-[0.2em] text-slate-400">
                                    {personalInfo.email && <span className="flex items-center gap-3"><i className="fa fa-envelope text-indigo-500 text-xs"></i> {personalInfo.email}</span>}
                                    {personalInfo.phone && <span className="flex items-center gap-3"><i className="fa fa-phone text-indigo-500 text-xs"></i> {personalInfo.phone}</span>}
                                    {personalInfo.location && <span className="flex items-center gap-3"><i className="fa fa-location-dot text-indigo-500 text-xs"></i> {personalInfo.location}</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    {personalInfo.summary && (
                        <div className="bg-white rounded-3xl p-10 mb-10 shadow-lg border-l-8 border-indigo-500">
                            <p className="text-xl leading-relaxed text-slate-800 whitespace-pre-line break-words">{personalInfo.summary}</p>
                        </div>
                    )}

                    {/* Timeline Experience */}
                    {experience.length > 0 && (
                        <section className="mb-10">
                            <h2 className="text-3xl font-black text-slate-900 mb-10 flex items-center gap-4">
                                <i className="fa fa-briefcase text-indigo-600"></i>
                                Professional Journey
                            </h2>
                            <div className="relative">
                                {/* Timeline line */}
                                <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-500"></div>

                                <div className="space-y-8">
                                    {experience.map(exp => (
                                        <div key={exp.id} className="relative pl-16">
                                            {/* Timeline dot */}
                                            <div className="absolute left-0 top-2 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                                                <i className="fa fa-star text-white text-sm"></i>
                                            </div>

                                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-2xl font-bold text-slate-900">{exp.position}</h3>
                                                        <div className="text-lg text-indigo-600 font-semibold mt-1">{exp.company}</div>
                                                    </div>
                                                    <span className="px-4 py-2 bg-indigo-100 text-indigo-700 text-sm font-bold rounded-full">
                                                        {exp.startDate} - {exp.endDate || 'Present'}
                                                    </span>
                                                </div>
                                                <p className="text-base text-slate-700 leading-relaxed whitespace-pre-line break-words">{exp.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Education & Skills Grid */}
                    <div className="grid grid-cols-2 gap-8">
                        {education.length > 0 && (
                            <div className="bg-white rounded-3xl p-8 shadow-lg">
                                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                    <i className="fa fa-graduation-cap text-indigo-600"></i>
                                    Education
                                </h2>
                                <div className="space-y-6">
                                    {education.map(edu => (
                                        <div key={edu.id} className="border-l-4 border-indigo-200 pl-4">
                                            <h3 className="text-lg font-bold text-slate-900">{edu.degree}</h3>
                                            <div className="text-base text-indigo-600 font-semibold mt-1">{edu.institution}</div>
                                            <div className="text-sm text-slate-500 mt-1">{edu.graduationDate}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {skills.length > 0 && (
                            <div className="bg-white rounded-3xl p-8 shadow-lg">
                                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                    <i className="fa fa-star text-indigo-600"></i>
                                    Skills
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {skills.map(s => (
                                        <span key={s.id} className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-bold rounded-full shadow-lg">
                                            {s.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Template 8: The Meridian (Clean Corporate)
    if (template === 'meridian') {
        return (
            <div className="cv-preview-container w-full bg-white min-h-[1100px] p-16 text-slate-900" dir={isRtl ? 'rtl' : 'ltr'}>
                <div className="max-w-5xl mx-auto">
                    {/* Header with Accent Line */}
                    <header className="mb-16 relative">
                        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-cyan-500 to-blue-600 rounded-full"></div>
                        <div className="pl-10">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h1 className="text-7xl font-black text-slate-900 mb-4 leading-none uppercase" style={{ letterSpacing: '-0.03em' }}>
                                        {personalInfo.firstName}<br /><span className="text-cyan-600">{personalInfo.lastName}</span>
                                    </h1>
                                    <p className="text-2xl text-slate-700 font-semibold mb-6 uppercase tracking-wider">{personalInfo.jobTitle}</p>
                                    <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 font-medium max-w-lg">
                                        {personalInfo.email && <div><span className="font-bold text-slate-900">Email:</span> {personalInfo.email}</div>}
                                        {personalInfo.phone && <div><span className="font-bold text-slate-900">Phone:</span> {personalInfo.phone}</div>}
                                        {personalInfo.location && <div><span className="font-bold text-slate-900">Location:</span> {personalInfo.location}</div>}
                                    </div>
                                </div>
                                {personalInfo.photo && (
                                    <img src={personalInfo.photo} alt="Profile" className="w-44 h-44 object-cover rounded-none border-8 border-slate-100 shadow-2xl" />
                                )}
                            </div>
                        </div>
                    </header>

                    {/* Summary */}
                    {personalInfo.summary && (
                        <section className="mb-16 pl-10">
                            <h2 className="text-xs font-black uppercase tracking-widest text-cyan-600 mb-6 flex items-center gap-4">
                                Professional Profile <div className="flex-1 h-px bg-slate-200"></div>
                            </h2>
                            <p className="text-lg leading-loose text-slate-700 whitespace-pre-line break-words">{personalInfo.summary}</p>
                        </section>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <section className="mb-16 pl-10">
                            <h2 className="text-xs font-black uppercase tracking-widest text-cyan-600 mb-10 flex items-center gap-4">
                                Professional Experience <div className="flex-1 h-px bg-slate-200"></div>
                            </h2>
                            <div className="space-y-12">
                                {experience.map(exp => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between items-baseline mb-3">
                                            <h3 className="text-3xl font-black text-slate-900 uppercase">{exp.position}</h3>
                                            <span className="text-sm font-bold text-white bg-cyan-600 px-4 py-2 uppercase tracking-wider">
                                                {exp.startDate} - {exp.endDate || 'Present'}
                                            </span>
                                        </div>
                                        <div className="text-xl text-cyan-600 font-bold mb-4 uppercase tracking-wide">{exp.company}</div>
                                        <p className="text-base text-slate-700 leading-relaxed whitespace-pre-line break-words">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Two Column: Education & Skills */}
                    <div className="grid grid-cols-2 gap-12 pl-10">
                        {education.length > 0 && (
                            <section>
                                <h2 className="text-xs font-black uppercase tracking-widest text-cyan-600 mb-8">Education</h2>
                                <div className="space-y-6">
                                    {education.map(edu => (
                                        <div key={edu.id} className="border-l-4 border-cyan-600 pl-6">
                                            <h3 className="text-lg font-bold text-slate-900 uppercase">{edu.degree}</h3>
                                            <div className="text-base text-slate-700 font-semibold mt-1">{edu.institution}</div>
                                            <div className="text-sm text-slate-500 mt-1">{edu.graduationDate}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {skills.length > 0 && (
                            <section>
                                <h2 className="text-xs font-black uppercase tracking-widest text-cyan-600 mb-8">Core Competencies</h2>
                                <div className="grid grid-cols-2 gap-3">
                                    {skills.map(s => (
                                        <div key={s.id} className="flex items-center gap-2 text-sm font-bold text-slate-900">
                                            <span className="w-2 h-2 bg-cyan-600 rounded-full"></span>
                                            {s.name}
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

    // Template 9: The Echo (Minimal Monochrome)
    if (template === 'echo') {
        return (
            <div className="cv-preview-container w-full bg-black text-white min-h-[1100px] p-20" dir={isRtl ? 'rtl' : 'ltr'}>
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <header className="text-center mb-20 pb-16 border-b border-white/10">
                        <h1 className="text-9xl font-black mb-6 leading-none tracking-tighter uppercase" style={{ letterSpacing: '-0.05em' }}>
                            {personalInfo.firstName}
                        </h1>
                        <h2 className="text-6xl font-light mb-8 uppercase tracking-widest text-white/60">
                            {personalInfo.lastName}
                        </h2>
                        <p className="text-2xl font-bold uppercase tracking-[0.3em] mb-10">{personalInfo.jobTitle}</p>
                        {personalInfo.photo && (
                            <img src={personalInfo.photo} alt="Profile" className="w-40 h-40 object-cover rounded-full mx-auto border-4 border-white/20 grayscale" />
                        )}
                    </header>

                    {/* Contact */}
                    <div className="flex justify-center gap-12 text-sm uppercase tracking-widest mb-20 text-white/60 font-bold">
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {personalInfo.phone && <span>{personalInfo.phone}</span>}
                        {personalInfo.location && <span>{personalInfo.location}</span>}
                    </div>

                    {/* Summary */}
                    {personalInfo.summary && (
                        <section className="mb-20 text-center">
                            <p className="text-2xl leading-loose text-white/80 italic whitespace-pre-line break-words">
                                {personalInfo.summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <section className="mb-20">
                            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-center mb-16 text-white/40">Experience</h2>
                            <div className="space-y-16">
                                {experience.map(exp => (
                                    <div key={exp.id} className="text-center border-t border-white/5 pt-12">
                                        <div className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4">
                                            {exp.startDate} — {exp.endDate || 'Present'}
                                        </div>
                                        <h3 className="text-4xl font-bold mb-3 uppercase tracking-tight">{exp.position}</h3>
                                        <div className="text-xl uppercase tracking-widest text-white/60 mb-8">{exp.company}</div>
                                        <p className="text-lg leading-relaxed text-white/70 max-w-2xl mx-auto whitespace-pre-line break-words">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills & Education Grid */}
                    <div className="grid grid-cols-2 gap-16">
                        {education.length > 0 && (
                            <section>
                                <h2 className="text-xs font-black uppercase tracking-[0.5em] text-center mb-10 text-white/40">Education</h2>
                                <div className="space-y-8 text-center">
                                    {education.map(edu => (
                                        <div key={edu.id}>
                                            <h3 className="text-xl font-bold uppercase tracking-wide">{edu.degree}</h3>
                                            <div className="text-base text-white/60 mt-2">{edu.institution}</div>
                                            <div className="text-sm text-white/40 mt-1">{edu.graduationDate}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {skills.length > 0 && (
                            <section>
                                <h2 className="text-xs font-black uppercase tracking-[0.5em] text-center mb-10 text-white/40">Skills</h2>
                                <div className="flex flex-wrap gap-4 justify-center">
                                    {skills.map(s => (
                                        <span key={s.id} className="px-6 py-3 border border-white/20 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition">
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

    // Template 10: The Nova (Gradient Background)
    if (template === 'nova') {
        return (
            <div className="cv-preview-container w-full min-h-[1100px] bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 p-12" dir={isRtl ? 'rtl' : 'ltr'}>
                <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-sm rounded-[3rem] p-16 shadow-[0_50px_100px_rgba(0,0,0,0.3)]">
                    {/* Header */}
                    <header className="flex items-center gap-12 mb-16 pb-12 border-b-2 border-slate-100">
                        {personalInfo.photo && (
                            <div className="relative">
                                <div className="absolute -inset-6 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full blur-xl opacity-50"></div>
                                <img src={personalInfo.photo} alt="Profile" className="relative w-56 h-56 object-cover rounded-full border-8 border-white shadow-2xl" />
                            </div>
                        )}
                        <div className="flex-1">
                            <h1 className="text-7xl font-black mb-4 bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                                {personalInfo.firstName} {personalInfo.lastName}
                            </h1>
                            <p className="text-3xl font-bold text-slate-700 mb-6">{personalInfo.jobTitle}</p>
                            <div className="flex flex-wrap gap-4">
                                {personalInfo.email && <span className="px-5 py-2 bg-violet-100 text-violet-700 text-sm font-bold rounded-full">{personalInfo.email}</span>}
                                {personalInfo.phone && <span className="px-5 py-2 bg-fuchsia-100 text-fuchsia-700 text-sm font-bold rounded-full">{personalInfo.phone}</span>}
                                {personalInfo.location && <span className="px-5 py-2 bg-pink-100 text-pink-700 text-sm font-bold rounded-full">{personalInfo.location}</span>}
                            </div>
                        </div>
                    </header>

                    {/* Summary */}
                    {personalInfo.summary && (
                        <section className="mb-12 p-10 rounded-3xl bg-gradient-to-br from-violet-50 to-pink-50 border-2 border-violet-100">
                            <p className="text-2xl leading-loose text-slate-800 whitespace-pre-line break-words font-medium">{personalInfo.summary}</p>
                        </section>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <section className="mb-12">
                            <h2 className="text-3xl font-black text-slate-900 mb-10 flex items-center gap-4">
                                <span className="w-16 h-2 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full"></span>
                                Experience
                            </h2>
                            <div className="space-y-10">
                                {experience.map(exp => (
                                    <div key={exp.id} className="p-8 rounded-3xl bg-slate-50 border-2 border-slate-100 hover:border-violet-200 hover:shadow-lg transition">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-3xl font-black text-slate-900 mb-2">{exp.position}</h3>
                                                <div className="text-xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">{exp.company}</div>
                                            </div>
                                            <span className="px-6 py-3 bg-gradient-to-r from-violet-600 to-pink-600 text-white text-sm font-bold rounded-full shadow-lg">
                                                {exp.startDate} - {exp.endDate || 'Now'}
                                            </span>
                                        </div>
                                        <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-line break-words">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education & Skills Grid */}
                    <div className="grid grid-cols-2 gap-10">
                        {education.length > 0 && (
                            <section className="p-8 rounded-3xl bg-violet-50 border-2 border-violet-100">
                                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                    <i className="fa fa-graduation-cap text-violet-600"></i>
                                    Education
                                </h2>
                                <div className="space-y-6">
                                    {education.map(edu => (
                                        <div key={edu.id}>
                                            <h3 className="text-xl font-bold text-slate-900">{edu.degree}</h3>
                                            <div className="text-base text-violet-600 font-semibold mt-1">{edu.institution}</div>
                                            <div className="text-sm text-slate-600 mt-1">{edu.graduationDate}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {skills.length > 0 && (
                            <section className="p-8 rounded-3xl bg-pink-50 border-2 border-pink-100">
                                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                    <i className="fa fa-star text-pink-600"></i>
                                    Skills
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {skills.map(s => (
                                        <span key={s.id} className="px-5 py-3 bg-gradient-to-r from-violet-600 to-pink-600 text-white text-sm font-bold rounded-full shadow-lg">
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

    // Template 11: The Orbit (Circular Elements)
    if (template === 'orbit') {
        return (
            <div className="cv-preview-container w-full bg-slate-900 text-white min-h-[1100px] p-16" dir={isRtl ? 'rtl' : 'ltr'}>
                <div className="max-w-6xl mx-auto">
                    {/* Floating Circles Decoration */}
                    <div className="absolute top-20 right-20 w-64 h-64 bg-orange-500 rounded-full opacity-10 blur-3xl"></div>
                    <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>

                    <div className="relative z-10">
                        {/* Header */}
                        <header className="text-center mb-20">
                            {personalInfo.photo && (
                                <div className="relative inline-block mb-10">
                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full blur-2xl opacity-30 scale-110"></div>
                                    <img src={personalInfo.photo} alt="Profile" className="relative w-60 h-60 object-cover rounded-full border-8 border-slate-800 shadow-2xl" />
                                </div>
                            )}
                            <h1 className="text-8xl font-black mb-6 leading-none">
                                {personalInfo.firstName} <span className="text-orange-500">{personalInfo.lastName}</span>
                            </h1>
                            <p className="text-3xl font-bold text-blue-400 mb-8 uppercase tracking-widest">{personalInfo.jobTitle}</p>
                            <div className="flex justify-center gap-6">
                                {personalInfo.email && <span className="px-6 py-3 bg-white/10 backdrop-blur rounded-full text-sm font-bold">{personalInfo.email}</span>}
                                {personalInfo.phone && <span className="px-6 py-3 bg-white/10 backdrop-blur rounded-full text-sm font-bold">{personalInfo.phone}</span>}
                                {personalInfo.location && <span className="px-6 py-3 bg-white/10 backdrop-blur rounded-full text-sm font-bold">{personalInfo.location}</span>}
                            </div>
                        </header>

                        {/* Summary */}
                        {personalInfo.summary && (
                            <section className="max-w-4xl mx-auto mb-20 text-center">
                                <p className="text-2xl leading-loose text-white/80 italic whitespace-pre-line break-words">{personalInfo.summary}</p>
                            </section>
                        )}

                        {/* Experience */}
                        {experience.length > 0 && (
                            <section className="mb-20">
                                <h2 className="text-4xl font-black text-center mb-16 uppercase tracking-wider">
                                    <span className="bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent">Experience</span>
                                </h2>
                                <div className="grid gap-10">
                                    {experience.map(exp => (
                                        <div key={exp.id} className="bg-white/5 backdrop-blur rounded-3xl p-10 border border-white/10 hover:border-orange-500/50 transition">
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <h3 className="text-4xl font-black mb-3">{exp.position}</h3>
                                                    <div className="text-2xl text-orange-400 font-bold">{exp.company}</div>
                                                </div>
                                                <span className="px-6 py-3 bg-gradient-to-r from-orange-500 to-blue-500 text-white text-sm font-black rounded-full uppercase">
                                                    {exp.startDate} - {exp.endDate || 'Now'}
                                                </span>
                                            </div>
                                            <p className="text-lg text-white/70 leading-relaxed whitespace-pre-line break-words">{exp.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Education & Skills Circles */}
                        <div className="grid grid-cols-2 gap-16">
                            {education.length > 0 && (
                                <section>
                                    <h2 className="text-3xl font-black text-center mb-10 uppercase tracking-wider text-blue-400">Education</h2>
                                    <div className="space-y-8">
                                        {education.map(edu => (
                                            <div key={edu.id} className="text-center p-8 bg-white/5 backdrop-blur rounded-3xl border border-white/10">
                                                <h3 className="text-2xl font-bold mb-2">{edu.degree}</h3>
                                                <div className="text-lg text-blue-400 font-semibold">{edu.institution}</div>
                                                <div className="text-sm text-white/50 mt-2">{edu.graduationDate}</div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {skills.length > 0 && (
                                <section>
                                    <h2 className="text-3xl font-black text-center mb-10 uppercase tracking-wider text-orange-400">Skills</h2>
                                    <div className="flex flex-wrap gap-4 justify-center">
                                        {skills.map(s => (
                                            <span key={s.id} className="px-6 py-4 bg-gradient-to-r from-orange-500 to-blue-500 text-white text-base font-black rounded-full shadow-lg hover:scale-110 transition">
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

    // Template 12: The Vertex (Sharp Angles)
    if (template === 'vertex') {
        return (
            <div className="cv-preview-container w-full bg-slate-50 min-h-[1100px] p-12" dir={isRtl ? 'rtl' : 'ltr'}>
                <div className="max-w-6xl mx-auto">
                    {/* Angular Header */}
                    <div className="relative bg-gradient-to-r from-emerald-600 to-teal-600 p-16 mb-12 clip-path-polygon" style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)' }}>
                        <div className="flex items-center gap-12">
                            {personalInfo.photo && (
                                <img src={personalInfo.photo} alt="Profile" className="w-48 h-48 object-cover shadow-2xl" style={{ clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)' }} />
                            )}
                            <div className="flex-1 text-white">
                                <h1 className="text-7xl font-black mb-4 uppercase leading-none" style={{ letterSpacing: '-0.02em' }}>
                                    {personalInfo.firstName}<br />{personalInfo.lastName}
                                </h1>
                                <p className="text-3xl font-bold uppercase tracking-wider mb-6 text-emerald-100">{personalInfo.jobTitle}</p>
                                <div className="flex gap-6 text-sm font-bold">
                                    {personalInfo.email && <span>{personalInfo.email}</span>}
                                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                                    {personalInfo.location && <span>{personalInfo.location}</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    {personalInfo.summary && (
                        <div className="mb-12 p-10 bg-white shadow-lg" style={{ clipPath: 'polygon(0 0, 97% 0, 100% 100%, 0 100%)' }}>
                            <p className="text-xl leading-relaxed text-slate-800 whitespace-pre-line break-words font-medium">{personalInfo.summary}</p>
                        </div>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <section className="mb-12">
                            <h2 className="text-3xl font-black text-slate-900 mb-10 uppercase tracking-tight flex items-center gap-4">
                                <span className="w-20 h-2 bg-gradient-to-r from-emerald-600 to-teal-600"></span>
                                Experience
                            </h2>
                            <div className="space-y-8">
                                {experience.map((exp, idx) => (
                                    <div key={exp.id} className="bg-white p-10 shadow-lg" style={{ clipPath: idx % 2 === 0 ? 'polygon(0 0, 98% 0, 100% 100%, 0 100%)' : 'polygon(0 0, 100% 0, 100% 100%, 2% 100%)' }}>
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-3xl font-black text-slate-900 uppercase">{exp.position}</h3>
                                                <div className="text-xl text-emerald-600 font-bold mt-2 uppercase">{exp.company}</div>
                                            </div>
                                            <span className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-black uppercase">
                                                {exp.startDate} - {exp.endDate || 'Now'}
                                            </span>
                                        </div>
                                        <p className="text-base text-slate-700 leading-relaxed whitespace-pre-line break-words">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education & Skills */}
                    <div className="grid grid-cols-2 gap-8">
                        {education.length > 0 && (
                            <div className="bg-white p-10 shadow-lg" style={{ clipPath: 'polygon(0 0, 98% 0, 100% 100%, 0 100%)' }}>
                                <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase">Education</h2>
                                <div className="space-y-6">
                                    {education.map(edu => (
                                        <div key={edu.id} className="border-l-8 border-emerald-600 pl-6">
                                            <h3 className="text-xl font-bold text-slate-900 uppercase">{edu.degree}</h3>
                                            <div className="text-base text-emerald-600 font-semibold mt-1">{edu.institution}</div>
                                            <div className="text-sm text-slate-600 mt-1">{edu.graduationDate}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {skills.length > 0 && (
                            <div className="bg-white p-10 shadow-lg" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 2% 100%)' }}>
                                <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase">Skills</h2>
                                <div className="flex flex-wrap gap-3">
                                    {skills.map(s => (
                                        <span key={s.id} className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-black uppercase shadow-lg">
                                            {s.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return <div className="p-10 text-center">Template not found</div>;
};

export default MoreProfessionalTemplates;
