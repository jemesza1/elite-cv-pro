
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

    // ... existing templates (zurich, executive, silicon, vogue, harvard, ignite, montreal) ...

    // Model 8: The Oxford (Academic/Research)
    if (template === 'oxford') {
        return (
            <div className="cv-preview-container w-full bg-white min-h-[1100px] p-12 text-slate-900" dir={isRtl ? 'rtl' : 'ltr'} style={{ fontFamily: "'Georgia', serif" }}>
                {/* Header */}
                <header className="mb-8 text-center pb-6 border-b-4 border-slate-800">
                    {personalInfo.photo && (
                        <img src={personalInfo.photo} alt="Profile" className="w-28 h-28 object-cover rounded-full border-4 border-slate-800 shadow-lg mx-auto mb-4" />
                    )}
                    <h1 className="text-4xl font-bold mb-2 text-slate-900">
                        {personalInfo.firstName} {personalInfo.lastName}
                    </h1>
                    <p className="text-lg text-slate-700 font-semibold mb-3">{personalInfo.jobTitle}</p>
                    <div className="text-sm text-slate-600">
                        {personalInfo.email} | {personalInfo.phone} | {personalInfo.location}
                    </div>
                </header>

                {/* Summary */}
                {personalInfo.summary && (
                    <section className="mb-6">
                        <h2 className="text-base font-bold uppercase text-slate-900 mb-2 pb-1 border-b-2 border-slate-300">
                            Research Profile
                        </h2>
                        <p className="text-sm leading-relaxed text-slate-800">{personalInfo.summary}</p>
                    </section>
                )}

                {/* Education First (Academic Focus) */}
                {education.length > 0 && (
                    <section className="mb-6 page-break-inside-avoid">
                        <h2 className="text-base font-bold uppercase text-slate-900 mb-3 pb-1 border-b-2 border-slate-300">
                            Education
                        </h2>
                        <div className="space-y-3">
                            {education.map(edu => (
                                <div key={edu.id}>
                                    <div className="flex justify-between">
                                        <span className="font-bold text-sm">{edu.degree}</span>
                                        <span className="text-sm text-slate-700 font-semibold">{edu.graduationDate}</span>
                                    </div>
                                    <div className="text-sm text-slate-700 italic">{edu.institution}</div>
                                    {edu.description && <p className="text-sm text-slate-600 mt-1">{edu.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section className="mb-6">
                        <h2 className="text-base font-bold uppercase text-slate-900 mb-3 pb-1 border-b-2 border-slate-300">
                            Professional Experience
                        </h2>
                        <div className="space-y-4">
                            {experience.map(exp => (
                                <div key={exp.id} className="page-break-inside-avoid">
                                    <div className="flex justify-between mb-1">
                                        <span className="font-bold text-sm">{exp.position}</span>
                                        <span className="text-sm text-slate-700 font-semibold">{exp.startDate} – {exp.endDate || 'Present'}</span>
                                    </div>
                                    <div className="text-sm text-slate-700 italic mb-2">{exp.company}, {exp.location}</div>
                                    <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-line">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills & Languages */}
                <div className="grid grid-cols-2 gap-6">
                    {skills.length > 0 && (
                        <section className="page-break-inside-avoid">
                            <h2 className="text-base font-bold uppercase text-slate-900 mb-2 pb-1 border-b-2 border-slate-300">
                                Skills
                            </h2>
                            <div className="text-sm text-slate-800">
                                {skills.map(s => s.name).join(', ')}
                            </div>
                        </section>
                    )}

                    {languages.length > 0 && (
                        <section className="page-break-inside-avoid">
                            <h2 className="text-base font-bold uppercase text-slate-900 mb-2 pb-1 border-b-2 border-slate-300">
                                Languages
                            </h2>
                            <div className="space-y-1 text-sm text-slate-800">
                                {languages.map(l => (
                                    <div key={l.id}>{l.name}: {l.level >= 90 ? 'Native' : l.level >= 70 ? 'Fluent' : 'Intermediate'}</div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        );
    }

    // Model 9: The Berlin (Modern Geometric)
    if (template === 'berlin') {
        return (
            <div className="cv-preview-container w-full bg-white min-h-[1100px] text-slate-900 shadow-pro" dir={isRtl ? 'rtl' : 'ltr'}>
                <header className="bg-slate-900 text-white p-20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 opacity-15 -skew-y-12 -translate-y-1/2 translate-x-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-400 opacity-10 skew-x-12 translate-y-1/2 -translate-x-1/3"></div>

                    <div className="relative z-10 flex items-center gap-12">
                        {personalInfo.photo && (
                            <div className="relative group">
                                <div className="absolute -inset-3 bg-yellow-400/30 -skew-y-3"></div>
                                <img src={personalInfo.photo} alt="Profile" className="relative w-48 h-48 object-cover border-[6px] border-yellow-400 shadow-2xl grayscale contrast-125" />
                            </div>
                        )}
                        <div className="flex-1">
                            <h1 className="text-7xl font-black mb-4 tracking-tighter uppercase leading-none">
                                {personalInfo.firstName}<br /><span className="text-yellow-400">{personalInfo.lastName}</span>
                            </h1>
                            <p className="text-2xl text-yellow-400 font-black uppercase tracking-[0.3em] bg-white/5 inline-block px-6 py-3">{personalInfo.jobTitle}</p>
                        </div>
                    </div>
                </header>

                <div className="p-20">
                    <div className="flex flex-wrap gap-10 text-sm font-black uppercase tracking-wider text-slate-600 mb-16 pb-8 border-b-[6px] border-yellow-400">
                        {personalInfo.email && <span className="flex items-center gap-3"><i className="fa fa-envelope text-yellow-500 text-base"></i> {personalInfo.email}</span>}
                        {personalInfo.phone && <span className="flex items-center gap-3"><i className="fa fa-phone text-yellow-500 text-base"></i> {personalInfo.phone}</span>}
                        {personalInfo.location && <span className="flex items-center gap-3"><i className="fa fa-location-dot text-yellow-500 text-base"></i> {personalInfo.location}</span>}
                    </div>

                    {personalInfo.summary && (
                        <section className="mb-20">
                            <h2 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-tight flex items-center gap-4">
                                <span className="w-3 h-12 bg-yellow-400 -skew-x-12"></span> Profil
                            </h2>
                            <p className="text-xl leading-loose text-slate-700 font-medium">{personalInfo.summary}</p>
                        </section>
                    )}

                    {experience.length > 0 && (
                        <section className="mb-20">
                            <h2 className="text-3xl font-black text-slate-900 mb-12 uppercase tracking-tight flex items-center gap-4">
                                <span className="w-3 h-12 bg-yellow-400 -skew-x-12"></span> Erfahrung
                            </h2>
                            <div className="space-y-16">
                                {experience.map(exp => (
                                    <div key={exp.id} className="relative pl-10 before:absolute before:left-0 before:top-0 before:w-1 before:h-full before:bg-yellow-100 hover:before:bg-yellow-400 before:transition-colors group">
                                        <div className="absolute -left-2 top-1 w-5 h-5 bg-yellow-400 rotate-45"></div>
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2 group-hover:text-yellow-600 transition-colors">{exp.position}</h3>
                                                <div className="text-lg text-slate-700 font-bold">{exp.company}</div>
                                            </div>
                                            <span className="text-xs font-black uppercase bg-yellow-400 text-slate-900 px-4 py-2">{exp.startDate} – {exp.endDate || 'Jetzt'}</span>
                                        </div>
                                        <p className="text-base text-slate-700 leading-loose whitespace-pre-line">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    <div className="grid grid-cols-2 gap-20">
                        {education.length > 0 && (
                            <section>
                                <h2 className="text-3xl font-black text-slate-900 mb-10 uppercase tracking-tight flex items-center gap-4">
                                    <span className="w-3 h-12 bg-yellow-400 -skew-x-12"></span> Bildung
                                </h2>
                                <div className="space-y-8">
                                    {education.map(edu => (
                                        <div key={edu.id} className="p-6 bg-slate-50 border-l-4 border-yellow-400">
                                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">{edu.degree}</h3>
                                            <div className="text-base text-slate-700 font-bold mt-2">{edu.institution}</div>
                                            <div className="text-xs font-black text-yellow-600 uppercase mt-1">{edu.graduationDate}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {skills.length > 0 && (
                            <section>
                                <h2 className="text-3xl font-black text-slate-900 mb-10 uppercase tracking-tight flex items-center gap-4">
                                    <span className="w-3 h-12 bg-yellow-400 -skew-x-12"></span> Fähigkeiten
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {skills.map(s => (
                                        <span key={s.id} className="px-5 py-3 bg-slate-900 text-yellow-400 text-xs font-black uppercase tracking-wider hover:bg-yellow-400 hover:text-slate-900 transition-all cursor-default">
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

                {personalInfo.summary && (
                    <section className="mb-10 bg-white p-8 rounded-2xl shadow-lg">
                        <h2 className="text-sm font-black uppercase tracking-wider text-pink-600 mb-4 flex items-center gap-2">
                            <i className="fa fa-user text-pink-500"></i> About Me
                        </h2>
                        <p className="text-base leading-relaxed text-slate-700 whitespace-pre-line break-words">{personalInfo.summary}</p>
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
                                        <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-bold text-slate-900">{exp.position}</h3>
                                                <div className="text-base text-pink-600 font-semibold">{exp.company}</div>
                                            </div>
                                            <span className="text-sm text-white bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-1 rounded-full font-semibold whitespace-nowrap">{exp.startDate} – {exp.endDate || 'Present'}</span>
                                        </div>
                                        <p className="text-base text-slate-700 leading-relaxed whitespace-pre-line break-words">{exp.description}</p>
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

                {personalInfo.summary && (
                    <section className="mb-16">
                        <p className="text-xl leading-loose text-slate-700 font-light max-w-3xl whitespace-pre-line break-words">{personalInfo.summary}</p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section className="mb-16">
                        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-8">Experience</h2>
                        <div className="space-y-12">
                            {experience.map(exp => (
                                <div key={exp.id} className="page-break-inside-avoid">
                                    <div className="flex justify-between items-baseline mb-3 flex-wrap gap-2">
                                        <h3 className="text-2xl font-light text-slate-900">{exp.position}</h3>
                                        <span className="text-sm text-slate-500 whitespace-nowrap">{exp.startDate} – {exp.endDate || 'Present'}</span>
                                    </div>
                                    <div className="text-base text-slate-600 font-light mb-4">{exp.company}</div>
                                    <p className="text-base text-slate-700 leading-loose whitespace-pre-line font-light break-words">{exp.description}</p>
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
                    {personalInfo.summary && (
                        <section className="mb-10 pb-8 border-b border-amber-400/30">
                            <h2 className="text-lg font-black uppercase tracking-wider text-amber-400 mb-4">Executive Profile</h2>
                            <p className="text-lg leading-loose text-slate-200 whitespace-pre-line break-words">{personalInfo.summary}</p>
                        </section>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <section className="mb-10 pb-8 border-b border-amber-400/30">
                            <h2 className="text-lg font-black uppercase tracking-wider text-amber-400 mb-6">Leadership Experience</h2>
                            <div className="space-y-8">
                                {experience.map(exp => (
                                    <div key={exp.id} className="page-break-inside-avoid">
                                        <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-2xl font-bold text-white">{exp.position}</h3>
                                                <div className="text-lg text-amber-400 font-semibold">{exp.company}</div>
                                            </div>
                                            <span className="text-sm text-slate-300 bg-amber-400/10 px-4 py-2 rounded-full border border-amber-400/30 whitespace-nowrap">{exp.startDate} – {exp.endDate || 'Present'}</span>
                                        </div>
                                        <p className="text-base text-slate-300 leading-loose whitespace-pre-line break-words">{exp.description}</p>
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
