
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
            <div className="cv-preview-container w-full bg-white min-h-[1100px] p-16 text-slate-900" dir={isRtl ? 'rtl' : 'ltr'}>
                <header className="mb-12 pb-8 border-b border-slate-200">
                    {personalInfo.photo && (
                        <img src={personalInfo.photo} alt="Profile" className="w-24 h-24 object-cover rounded-full mb-6" />
                    )}
                    <h1 className="text-5xl font-light mb-2 text-slate-900">{personalInfo.firstName} {personalInfo.lastName}</h1>
                    <p className="text-xl text-slate-700 mb-4 font-medium">{personalInfo.jobTitle}</p>
                    <div className="text-sm text-slate-600 space-y-1">
                        <div>{personalInfo.email} • {personalInfo.phone}</div>
                        <div>{personalInfo.location}</div>
                    </div>
                </header>

                {personalInfo.summary && (
                    <section className="mb-10">
                        <p className="text-base leading-relaxed text-slate-800">{personalInfo.summary}</p>
                    </section>
                )}

                {experience.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">Experience</h2>
                        <div className="space-y-8">
                            {experience.map(exp => (
                                <div key={exp.id}>
                                    <div className="flex justify-between mb-1">
                                        <h3 className="text-lg font-semibold text-slate-900">{exp.position}</h3>
                                        <span className="text-sm text-slate-600">{exp.startDate} – {exp.endDate || 'Present'}</span>
                                    </div>
                                    <div className="text-base text-slate-700 mb-2 font-medium">{exp.company}</div>
                                    <p className="text-sm text-slate-800 leading-relaxed">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {education.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">Education</h2>
                        <div className="space-y-4">
                            {education.map(edu => (
                                <div key={edu.id}>
                                    <h3 className="text-base font-semibold text-slate-900">{edu.degree}</h3>
                                    <div className="text-sm text-slate-700">{edu.institution} • {edu.graduationDate}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-2 gap-10">
                    {skills.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-4">Skills</h2>
                            <div className="text-sm text-slate-800">{skills.map(s => s.name).join(' • ')}</div>
                        </section>
                    )}
                    {languages.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-4">Languages</h2>
                            <div className="text-sm text-slate-800">{languages.map(l => l.name).join(' • ')}</div>
                        </section>
                    )}
                </div>
            </div>
        );
    }

    // Model 2: Executive (Corporate Executive)
    if (template === 'executive') {
        return (
            <div className="cv-preview-container w-full bg-slate-900 text-white min-h-[1100px]" dir={isRtl ? 'rtl' : 'ltr'}>
                <header className="bg-gradient-to-r from-blue-600 to-blue-800 p-12">
                    <div className="flex items-center gap-8">
                        {personalInfo.photo && (
                            <img src={personalInfo.photo} alt="Profile" className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-xl" />
                        )}
                        <div>
                            <h1 className="text-5xl font-bold mb-2">{personalInfo.firstName} {personalInfo.lastName}</h1>
                            <p className="text-2xl text-blue-100">{personalInfo.jobTitle}</p>
                        </div>
                    </div>
                    <div className="mt-6 text-blue-100">{personalInfo.email} | {personalInfo.phone} | {personalInfo.location}</div>
                </header>

                <div className="p-12">
                    {personalInfo.summary && (
                        <section className="mb-10 pb-8 border-b border-slate-700">
                            <h2 className="text-xl font-bold text-blue-400 mb-4">Executive Summary</h2>
                            <p className="text-base leading-relaxed text-slate-300">{personalInfo.summary}</p>
                        </section>
                    )}

                    {experience.length > 0 && (
                        <section className="mb-10 pb-8 border-b border-slate-700">
                            <h2 className="text-xl font-bold text-blue-400 mb-6">Professional Experience</h2>
                            <div className="space-y-6">
                                {experience.map(exp => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between mb-2">
                                            <h3 className="text-lg font-bold">{exp.position}</h3>
                                            <span className="text-sm text-slate-400">{exp.startDate} – {exp.endDate || 'Present'}</span>
                                        </div>
                                        <div className="text-blue-300 font-semibold mb-2">{exp.company}</div>
                                        <p className="text-sm text-slate-300 leading-relaxed">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    <div className="grid grid-cols-2 gap-10">
                        {education.length > 0 && (
                            <section>
                                <h2 className="text-xl font-bold text-blue-400 mb-4">Education</h2>
                                <div className="space-y-3">
                                    {education.map(edu => (
                                        <div key={edu.id}>
                                            <h3 className="font-bold">{edu.degree}</h3>
                                            <div className="text-sm text-slate-400">{edu.institution}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        {skills.length > 0 && (
                            <section>
                                <h2 className="text-xl font-bold text-blue-400 mb-4">Core Competencies</h2>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map(s => (
                                        <span key={s.id} className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded">{s.name}</span>
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
            <div className="cv-preview-container w-full bg-gradient-to-br from-purple-50 to-blue-50 min-h-[1100px] p-12" dir={isRtl ? 'rtl' : 'ltr'}>
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <header className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-10 text-white">
                        <div className="flex items-center gap-6">
                            {personalInfo.photo && (
                                <img src={personalInfo.photo} alt="Profile" className="w-28 h-28 object-cover rounded-2xl border-4 border-white shadow-lg" />
                            )}
                            <div>
                                <h1 className="text-4xl font-black mb-2">{personalInfo.firstName} {personalInfo.lastName}</h1>
                                <p className="text-xl font-semibold text-purple-100">{personalInfo.jobTitle}</p>
                                <div className="mt-3 text-sm">{personalInfo.email} • {personalInfo.phone}</div>
                            </div>
                        </div>
                    </header>

                    <div className="p-10">
                        {personalInfo.summary && (
                            <section className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                                <p className="text-base leading-relaxed text-slate-700">{personalInfo.summary}</p>
                            </section>
                        )}

                        {experience.length > 0 && (
                            <section className="mb-8">
                                <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6">Experience</h2>
                                <div className="space-y-6">
                                    {experience.map(exp => (
                                        <div key={exp.id} className="border-l-4 border-purple-500 pl-6">
                                            <div className="flex justify-between mb-1">
                                                <h3 className="text-lg font-bold text-slate-900">{exp.position}</h3>
                                                <span className="text-sm text-slate-500">{exp.startDate} – {exp.endDate || 'Present'}</span>
                                            </div>
                                            <div className="text-purple-600 font-semibold mb-2">{exp.company}</div>
                                            <p className="text-sm text-slate-700">{exp.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        <div className="grid grid-cols-2 gap-8">
                            {education.length > 0 && (
                                <section>
                                    <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">Education</h2>
                                    <div className="space-y-3">
                                        {education.map(edu => (
                                            <div key={edu.id}>
                                                <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                                                <div className="text-sm text-slate-600">{edu.institution}</div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                            {skills.length > 0 && (
                                <section>
                                    <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">Skills</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.map(s => (
                                            <span key={s.id} className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">{s.name}</span>
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
        return (
            <div className="cv-preview-container w-full bg-black text-white min-h-[1100px] p-16" dir={isRtl ? 'rtl' : 'ltr'} style={{ fontFamily: "'Playfair Display', serif" }}>
                <header className="mb-16 text-center">
                    {personalInfo.photo && (
                        <img src={personalInfo.photo} alt="Profile" className="w-40 h-40 object-cover rounded-full mx-auto mb-8 border-4 border-gold-400" style={{ borderColor: '#D4AF37' }} />
                    )}
                    <h1 className="text-7xl font-light mb-4 tracking-wide" style={{ color: '#D4AF37' }}>{personalInfo.firstName}</h1>
                    <h1 className="text-7xl font-light mb-6 tracking-wide">{personalInfo.lastName}</h1>
                    <p className="text-2xl font-light tracking-widest" style={{ color: '#D4AF37' }}>{personalInfo.jobTitle}</p>
                    <div className="mt-6 text-sm tracking-wider text-gray-400">{personalInfo.email} | {personalInfo.phone}</div>
                </header>

                {personalInfo.summary && (
                    <section className="mb-12 max-w-3xl mx-auto text-center">
                        <p className="text-lg leading-relaxed font-light italic text-gray-300">{personalInfo.summary}</p>
                    </section>
                )}

                {experience.length > 0 && (
                    <section className="mb-12 max-w-3xl mx-auto">
                        <h2 className="text-sm font-light uppercase tracking-widest text-center mb-8" style={{ color: '#D4AF37' }}>Experience</h2>
                        <div className="space-y-8">
                            {experience.map(exp => (
                                <div key={exp.id} className="text-center">
                                    <h3 className="text-xl font-light mb-1">{exp.position}</h3>
                                    <div className="text-base mb-1" style={{ color: '#D4AF37' }}>{exp.company}</div>
                                    <div className="text-sm text-gray-500 mb-3">{exp.startDate} – {exp.endDate || 'Present'}</div>
                                    <p className="text-sm leading-relaxed text-gray-400">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="max-w-3xl mx-auto grid grid-cols-2 gap-12">
                    {education.length > 0 && (
                        <section className="text-center">
                            <h2 className="text-sm font-light uppercase tracking-widest mb-6" style={{ color: '#D4AF37' }}>Education</h2>
                            <div className="space-y-4">
                                {education.map(edu => (
                                    <div key={edu.id}>
                                        <h3 className="font-light">{edu.degree}</h3>
                                        <div className="text-sm text-gray-500">{edu.institution}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    {skills.length > 0 && (
                        <section className="text-center">
                            <h2 className="text-sm font-light uppercase tracking-widest mb-6" style={{ color: '#D4AF37' }}>Expertise</h2>
                            <div className="text-sm text-gray-400">{skills.map(s => s.name).join(' • ')}</div>
                        </section>
                    )}
                </div>
            </div>
        );
    }

    // Model 5: Harvard (Ivy League)
    if (template === 'harvard') {
        return (
            <div className="cv-preview-container w-full bg-white min-h-[1100px] p-12 text-slate-900" dir={isRtl ? 'rtl' : 'ltr'} style={{ fontFamily: "'Times New Roman', serif" }}>
                <header className="mb-10 pb-6 border-b-2 border-red-800 text-center">
                    <h1 className="text-5xl font-bold mb-2 text-red-900">{personalInfo.firstName} {personalInfo.lastName}</h1>
                    <p className="text-xl text-slate-700 mb-4">{personalInfo.jobTitle}</p>
                    <div className="text-sm text-slate-600">{personalInfo.email} | {personalInfo.phone} | {personalInfo.location}</div>
                </header>

                {personalInfo.summary && (
                    <section className="mb-8">
                        <h2 className="text-base font-bold uppercase text-red-900 mb-3 pb-1 border-b border-red-200">Professional Summary</h2>
                        <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
                    </section>
                )}

                {education.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-base font-bold uppercase text-red-900 mb-3 pb-1 border-b border-red-200">Education</h2>
                        <div className="space-y-3">
                            {education.map(edu => (
                                <div key={edu.id}>
                                    <div className="flex justify-between">
                                        <span className="font-bold">{edu.degree}</span>
                                        <span className="text-sm text-slate-600">{edu.graduationDate}</span>
                                    </div>
                                    <div className="text-sm text-slate-700 italic">{edu.institution}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {experience.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-base font-bold uppercase text-red-900 mb-3 pb-1 border-b border-red-200">Professional Experience</h2>
                        <div className="space-y-4">
                            {experience.map(exp => (
                                <div key={exp.id}>
                                    <div className="flex justify-between mb-1">
                                        <span className="font-bold">{exp.position}</span>
                                        <span className="text-sm text-slate-600">{exp.startDate} – {exp.endDate || 'Present'}</span>
                                    </div>
                                    <div className="text-sm italic mb-2">{exp.company}, {exp.location}</div>
                                    <p className="text-sm leading-relaxed">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-2 gap-8">
                    {skills.length > 0 && (
                        <section>
                            <h2 className="text-base font-bold uppercase text-red-900 mb-3 pb-1 border-b border-red-200">Skills</h2>
                            <div className="text-sm">{skills.map(s => s.name).join(', ')}</div>
                        </section>
                    )}
                    {languages.length > 0 && (
                        <section>
                            <h2 className="text-base font-bold uppercase text-red-900 mb-3 pb-1 border-b border-red-200">Languages</h2>
                            <div className="text-sm">{languages.map(l => l.name).join(', ')}</div>
                        </section>
                    )}
                </div>
            </div>
        );
    }

    // Model 6: Ignite (Creative Bold)
    if (template === 'ignite') {
        return (
            <div className="cv-preview-container w-full min-h-[1100px] bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 p-12 text-white" dir={isRtl ? 'rtl' : 'ltr'}>
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 shadow-2xl">
                    <header className="mb-10">
                        <div className="flex items-center gap-8">
                            {personalInfo.photo && (
                                <img src={personalInfo.photo} alt="Profile" className="w-32 h-32 object-cover rounded-2xl border-4 border-white shadow-xl" />
                            )}
                            <div>
                                <h1 className="text-6xl font-black mb-2">{personalInfo.firstName} {personalInfo.lastName}</h1>
                                <p className="text-2xl font-bold text-orange-100">{personalInfo.jobTitle}</p>
                            </div>
                        </div>
                        <div className="mt-6 text-orange-100">{personalInfo.email} • {personalInfo.phone} • {personalInfo.location}</div>
                    </header>

                    {personalInfo.summary && (
                        <section className="mb-10 p-6 bg-white/10 rounded-2xl">
                            <p className="text-lg leading-relaxed">{personalInfo.summary}</p>
                        </section>
                    )}

                    {experience.length > 0 && (
                        <section className="mb-10">
                            <h2 className="text-3xl font-black mb-6 uppercase">Experience</h2>
                            <div className="space-y-6">
                                {experience.map(exp => (
                                    <div key={exp.id} className="p-6 bg-white/10 rounded-2xl">
                                        <div className="flex justify-between mb-2">
                                            <h3 className="text-xl font-bold">{exp.position}</h3>
                                            <span className="text-sm text-orange-200">{exp.startDate} – {exp.endDate || 'Now'}</span>
                                        </div>
                                        <div className="text-lg font-semibold text-orange-100 mb-2">{exp.company}</div>
                                        <p className="text-sm leading-relaxed text-orange-50">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    <div className="grid grid-cols-2 gap-8">
                        {education.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-black mb-4 uppercase">Education</h2>
                                <div className="space-y-3">
                                    {education.map(edu => (
                                        <div key={edu.id} className="p-4 bg-white/10 rounded-xl">
                                            <h3 className="font-bold">{edu.degree}</h3>
                                            <div className="text-sm text-orange-100">{edu.institution}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        {skills.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-black mb-4 uppercase">Skills</h2>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map(s => (
                                        <span key={s.id} className="px-4 py-2 bg-white text-red-600 text-sm font-bold rounded-full">{s.name}</span>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Model 7: Montreal (Canadian Bilingual)
    if (template === 'montreal') {
        return (
            <div className="cv-preview-container w-full bg-white text-slate-900 min-h-[1100px] p-12" dir="ltr">
                <header className="mb-10 pb-8 border-b-4 border-red-700 text-center">
                    {personalInfo.photo && (
                        <img src={personalInfo.photo} alt="Profile" className="w-32 h-32 object-cover rounded-full border-4 border-red-700 shadow-lg mx-auto mb-6" />
                    )}
                    <h1 className="text-5xl font-black mb-3 text-red-900">{personalInfo.firstName} {personalInfo.lastName}</h1>
                    <p className="text-xl text-red-700 font-bold mb-4">{personalInfo.jobTitle}</p>
                    <div className="flex justify-center gap-6 text-sm text-slate-600">
                        <span>{personalInfo.email}</span>
                        <span>{personalInfo.phone}</span>
                        <span>{personalInfo.location}</span>
                    </div>
                </header>

                {personalInfo.summary && (
                    <section className="mb-8">
                        <h2 className="text-lg font-black uppercase tracking-wider text-red-900 mb-4 pb-2 border-b-2 border-red-700">Profile / Profil</h2>
                        <p className="text-sm leading-relaxed text-slate-800">{personalInfo.summary}</p>
                    </section>
                )}

                {experience.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-lg font-black uppercase tracking-wider text-red-900 mb-6 pb-2 border-b-2 border-red-700">Experience / Expérience</h2>
                        <div className="space-y-6">
                            {experience.map(exp => (
                                <div key={exp.id}>
                                    <div className="flex justify-between mb-1">
                                        <span className="font-bold text-base">{exp.position}</span>
                                        <span className="text-sm text-red-700 font-semibold">{exp.startDate} – {exp.endDate || 'Present'}</span>
                                    </div>
                                    <div className="text-sm text-slate-700 font-semibold mb-2">{exp.company}, {exp.location}</div>
                                    <p className="text-sm text-slate-800 leading-relaxed">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {education.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-lg font-black uppercase tracking-wider text-red-900 mb-6 pb-2 border-b-2 border-red-700">Education / Formation</h2>
                        <div className="space-y-4">
                            {education.map(edu => (
                                <div key={edu.id}>
                                    <div className="flex justify-between">
                                        <span className="font-bold text-base">{edu.degree}</span>
                                        <span className="text-sm text-red-700 font-semibold">{edu.graduationDate}</span>
                                    </div>
                                    <div className="text-sm text-slate-700">{edu.institution}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-2 gap-8">
                    {skills.length > 0 && (
                        <section>
                            <h2 className="text-lg font-black uppercase tracking-wider text-red-900 mb-4 pb-2 border-b-2 border-red-700">Skills / Compétences</h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map(s => (
                                    <span key={s.id} className="px-3 py-1 bg-red-50 text-red-800 text-xs font-bold rounded-full border border-red-300">{s.name}</span>
                                ))}
                            </div>
                        </section>
                    )}
                    {languages.length > 0 && (
                        <section>
                            <h2 className="text-lg font-black uppercase tracking-wider text-red-900 mb-4 pb-2 border-b-2 border-red-700">Languages / Langues</h2>
                            <div className="space-y-2">
                                {languages.map(l => (
                                    <div key={l.id}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-semibold">{l.name}</span>
                                            <span className="text-red-700 font-bold">{l.level}%</span>
                                        </div>
                                        <div className="h-2 bg-red-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-red-700" style={{ width: `${l.level}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        );
    }

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
