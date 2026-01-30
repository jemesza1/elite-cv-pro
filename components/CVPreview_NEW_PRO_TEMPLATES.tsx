import React from 'react';
import { CVData, Language, TemplateType } from '../types';

interface Props {
    data: CVData;
    template: TemplateType;
    lang: Language;
}

const NewProfessionalTemplates: React.FC<Props> = ({ data, template, lang }) => {
    const { personalInfo, experience, education, skills, languages } = data;
    const isRtl = lang === 'ar';

    // Template 1: The Atlas (ATS-Friendly Professional)
    if (template === 'atlas') {
        return (
            <div className="cv-preview-container w-full bg-white min-h-[1100px] p-16 text-slate-900" dir={isRtl ? 'rtl' : 'ltr'}>
                {/* Clean header optimized for ATS */}
                <header className="mb-14 pb-10 border-b-8 border-slate-900 flex justify-between items-end gap-12">
                    <div className="flex-1">
                        <div className="inline-block px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.4em] mb-6">Curriculum Vitae</div>
                        <h1 className="text-7xl font-black mb-4 text-slate-900 tracking-tighter leading-none">
                            {personalInfo.firstName} <br /> {personalInfo.lastName}
                        </h1>
                        <p className="text-3xl text-slate-500 font-light mb-8 italic">{personalInfo.jobTitle}</p>
                        <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-[11px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-100 pt-8">
                            {personalInfo.email && <span className="flex items-center gap-3"><i className="fa fa-envelope text-slate-900"></i> {personalInfo.email}</span>}
                            {personalInfo.phone && <span className="flex items-center gap-3"><i className="fa fa-phone text-slate-900"></i> {personalInfo.phone}</span>}
                            {personalInfo.location && <span className="flex items-center gap-3"><i className="fa fa-location-dot text-slate-900"></i> {personalInfo.location}</span>}
                        </div>
                    </div>
                    {personalInfo.photo && (
                        <div className="relative group">
                            <img src={personalInfo.photo} alt="Profile" className="w-56 h-56 object-cover rounded-none border-[12px] border-slate-50 shadow-2xl grayscale brightness-110 contrast-110 group-hover:grayscale-0 transition-all duration-700" />
                            <div className="absolute top-4 right-4 w-full h-full border-2 border-slate-900 -z-10 translate-x-4 translate-y-4"></div>
                        </div>
                    )}
                </header>

                {/* Professional Summary */}
                {personalInfo.summary && (
                    <section className="mb-10">
                        <h2 className="text-lg font-black uppercase text-slate-900 mb-4 tracking-wider">Profil Professionnel</h2>
                        <p className="text-base leading-relaxed text-slate-700 whitespace-pre-line break-words">{personalInfo.summary}</p>
                    </section>
                )}

                {/* Experience - Reverse Chronological */}
                {experience.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-lg font-black uppercase text-slate-900 mb-6 tracking-wider">Expérience Professionnelle</h2>
                        <div className="space-y-6">
                            {experience.map(exp => (
                                <div key={exp.id} className="border-l-4 border-slate-300 pl-6">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-xl font-bold text-slate-900">{exp.position}</h3>
                                        <span className="text-sm font-bold text-slate-600">{exp.startDate} - {exp.endDate || 'Présent'}</span>
                                    </div>
                                    <div className="text-base font-semibold text-slate-700 mb-3">{exp.company} | {exp.location}</div>
                                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line break-words">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Two-column layout for Education & Skills */}
                <div className="grid grid-cols-2 gap-12">
                    {education.length > 0 && (
                        <section>
                            <h2 className="text-lg font-black uppercase text-slate-900 mb-6 tracking-wider">Formation</h2>
                            <div className="space-y-4">
                                {education.map(edu => (
                                    <div key={edu.id}>
                                        <h3 className="text-base font-bold text-slate-900">{edu.degree}</h3>
                                        <div className="text-sm text-slate-700 font-semibold">{edu.institution}</div>
                                        <div className="text-sm text-slate-600">{edu.graduationDate}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {skills.length > 0 && (
                        <section>
                            <h2 className="text-lg font-black uppercase text-slate-900 mb-6 tracking-wider">Compétences</h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map(s => (
                                    <span key={s.id} className="px-4 py-2 bg-slate-100 text-slate-900 text-sm font-bold rounded-lg">
                                        {s.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        );
    }

    // Template 2: The Prism (Modern Minimalist with Accent)
    if (template === 'prism') {
        return (
            <div className="cv-preview-container w-full bg-slate-50 min-h-[1100px] p-12" dir={isRtl ? 'rtl' : 'ltr'}>
                <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Colored accent bar */}
                    <div className="h-3 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500"></div>

                    <div className="p-10 md:p-16">
                        {/* Header with photo */}
                        <header className="flex flex-col md:flex-row items-center gap-14 mb-10 md:mb-20 pb-10 md:pb-16 border-b border-slate-100 relative">
                            <div className="absolute -top-16 -right-16 w-32 h-32 bg-teal-500/5 blur-3xl rounded-full"></div>
                            {personalInfo.photo && (
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-teal-500 to-purple-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
                                    <img src={personalInfo.photo} alt="Profile" className="relative w-60 h-60 object-cover rounded-full shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-[12px] border-white ring-1 ring-slate-100 z-10" />
                                </div>
                            )}
                            <div className="flex-1 text-center md:text-left relative z-10">
                                <div className="inline-block px-4 py-1 bg-teal-50 text-teal-600 text-[10px] font-black uppercase tracking-[0.3em] rounded-full border border-teal-100 mb-6">Premium Candidate Profile</div>
                                <h1 className="text-8xl font-black mb-4 text-slate-900 tracking-tighter leading-[0.85]">
                                    {personalInfo.firstName} <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">{personalInfo.lastName}</span>
                                </h1>
                                <p className="text-3xl text-slate-400 font-light mb-10 tracking-[0.1em] uppercase">{personalInfo.jobTitle}</p>
                                <div className="flex flex-wrap justify-center md:justify-start gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                    <span className="flex items-center gap-3"><i className="fa fa-envelope text-teal-500 text-sm"></i> {personalInfo.email}</span>
                                    <span className="flex items-center gap-3"><i className="fa fa-phone text-blue-500 text-sm"></i> {personalInfo.phone}</span>
                                    <span className="flex items-center gap-3"><i className="fa fa-location-dot text-purple-500 text-sm"></i> {personalInfo.location}</span>
                                </div>
                            </div>
                        </header>

                        {/* Summary */}
                        {personalInfo.summary && (
                            <section className="mb-12">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center">
                                        <i className="fa fa-user text-white text-xl"></i>
                                    </div>
                                    <h2 className="text-2xl font-black text-slate-900">À Propos</h2>
                                </div>
                                <p className="text-lg leading-relaxed text-slate-700 whitespace-pre-line break-words pl-0 md:pl-15">{personalInfo.summary}</p>
                            </section>
                        )}

                        {/* Experience */}
                        {experience.length > 0 && (
                            <section className="mb-12">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                                        <i className="fa fa-briefcase text-white text-xl"></i>
                                    </div>
                                    <h2 className="text-2xl font-black text-slate-900">Expérience</h2>
                                </div>
                                <div className="space-y-8 md:space-y-10 pl-0 md:pl-15">
                                    {experience.map(exp => (
                                        <div key={exp.id} className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-4 before:h-4 before:bg-blue-500 before:rounded-full">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h3 className="text-2xl font-bold text-slate-900">{exp.position}</h3>
                                                    <div className="text-lg text-blue-600 font-semibold mt-1">{exp.company}</div>
                                                </div>
                                                <span className="text-sm font-bold text-slate-500 bg-slate-100 px-4 py-2 rounded-full">
                                                    {exp.startDate} - {exp.endDate || 'Présent'}
                                                </span>
                                            </div>
                                            <p className="text-base text-slate-700 leading-relaxed whitespace-pre-line break-words">{exp.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Education & Skills Grid */}
                        <div className="grid grid-cols-2 gap-12">
                            {education.length > 0 && (
                                <section>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                                            <i className="fa fa-graduation-cap text-white text-xl"></i>
                                        </div>
                                        <h2 className="text-2xl font-black text-slate-900">Formation</h2>
                                    </div>
                                    <div className="space-y-6">
                                        {education.map(edu => (
                                            <div key={edu.id} className="p-5 bg-purple-50 rounded-xl">
                                                <h3 className="text-lg font-bold text-slate-900">{edu.degree}</h3>
                                                <div className="text-base text-purple-600 font-semibold mt-1">{edu.institution}</div>
                                                <div className="text-sm text-slate-600 mt-1">{edu.graduationDate}</div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {skills.length > 0 && (
                                <section>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center">
                                            <i className="fa fa-star text-white text-xl"></i>
                                        </div>
                                        <h2 className="text-2xl font-black text-slate-900">Compétences</h2>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {skills.map(s => (
                                            <span key={s.id} className="px-4 py-2 bg-teal-100 text-teal-700 text-sm font-bold rounded-full border-2 border-teal-200">
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

    // Template 3: The Nexus (Two-Column Layout)
    if (template === 'nexus') {
        return (
            <div className="cv-preview-container w-full min-h-[1100px] flex" dir={isRtl ? 'rtl' : 'ltr'}>
                {/* Left Sidebar - Dark */}
                <div className="w-1/3 bg-slate-800 text-white p-10">
                    {/* Photo */}
                    {personalInfo.photo && (
                        <img src={personalInfo.photo} alt="Profile" className="w-full aspect-square object-cover rounded-2xl mb-8 shadow-2xl" />
                    )}

                    {/* Contact */}
                    <section className="mb-10">
                        <h2 className="text-sm font-black uppercase tracking-widest mb-6 text-slate-400">Contact</h2>
                        <div className="space-y-4 text-sm">
                            {personalInfo.email && (
                                <div className="flex items-center gap-3">
                                    <i className="fa fa-envelope text-blue-400"></i>
                                    <span className="break-all">{personalInfo.email}</span>
                                </div>
                            )}
                            {personalInfo.phone && (
                                <div className="flex items-center gap-3">
                                    <i className="fa fa-phone text-blue-400"></i>
                                    <span>{personalInfo.phone}</span>
                                </div>
                            )}
                            {personalInfo.location && (
                                <div className="flex items-center gap-3">
                                    <i className="fa fa-map-marker text-blue-400"></i>
                                    <span>{personalInfo.location}</span>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Skills */}
                    {skills.length > 0 && (
                        <section className="mb-10">
                            <h2 className="text-sm font-black uppercase tracking-widest mb-6 text-slate-400">Compétences</h2>
                            <div className="space-y-4">
                                {skills.map(s => (
                                    <div key={s.id}>
                                        <div className="text-sm font-bold mb-2">{s.name}</div>
                                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-blue-500 to-teal-500 rounded-full" style={{ width: '85%' }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {languages.length > 0 && (
                        <section className="mb-10">
                            <h2 className="text-sm font-black uppercase tracking-widest mb-6 text-slate-400">Langues</h2>
                            <div className="space-y-3 text-sm">
                                {languages.map(l => (
                                    <div key={l.id} className="flex justify-between items-center">
                                        <span className="font-bold">{l.name}</span>
                                        <span className="text-slate-400">{l.level >= 90 ? 'Natif' : l.level >= 70 ? 'Courant' : 'Intermédiaire'}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Content - Light */}
                <div className="flex-1 bg-white p-10 md:p-16">
                    {/* Header */}
                    <header className="mb-12">
                        <h1 className="text-6xl font-black text-slate-900 mb-3 leading-none">
                            {personalInfo.firstName}<br />{personalInfo.lastName}
                        </h1>
                        <p className="text-2xl text-blue-600 font-bold uppercase tracking-wide">{personalInfo.jobTitle}</p>
                    </header>

                    {/* Summary */}
                    {personalInfo.summary && (
                        <section className="mb-12 p-6 bg-blue-50 rounded-2xl border-l-4 border-blue-500">
                            <p className="text-lg leading-relaxed text-slate-800 whitespace-pre-line break-words">{personalInfo.summary}</p>
                        </section>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <section className="mb-12">
                            <h2 className="text-2xl font-black uppercase text-slate-900 mb-8 tracking-tight flex items-center gap-3">
                                <span className="w-2 h-8 bg-blue-500 rounded"></span>
                                Expérience Professionnelle
                            </h2>
                            <div className="space-y-10">
                                {experience.map(exp => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between items-baseline mb-3">
                                            <h3 className="text-2xl font-bold text-slate-900">{exp.position}</h3>
                                            <span className="text-sm font-bold text-slate-600">{exp.startDate} - {exp.endDate || 'Présent'}</span>
                                        </div>
                                        <div className="text-lg text-blue-600 font-bold mb-4">{exp.company}</div>
                                        <p className="text-base text-slate-700 leading-relaxed whitespace-pre-line break-words">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-black uppercase text-slate-900 mb-8 tracking-tight flex items-center gap-3">
                                <span className="w-2 h-8 bg-blue-500 rounded"></span>
                                Formation
                            </h2>
                            <div className="space-y-6">
                                {education.map(edu => (
                                    <div key={edu.id}>
                                        <h3 className="text-xl font-bold text-slate-900">{edu.degree}</h3>
                                        <div className="text-base text-blue-600 font-semibold mt-1">{edu.institution}</div>
                                        <div className="text-sm text-slate-600 mt-1">{edu.graduationDate}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        );
    }

    // Template 4: The Zenith (Ultra-Modern with Glassmorphism)
    if (template === 'zenith') {
        return (
            <div className="cv-preview-container w-full min-h-[1100px] bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50 p-12" dir={isRtl ? 'rtl' : 'ltr'}>
                <div className="max-w-6xl mx-auto">
                    {/* Glassmorphic Header */}
                    <header className="bg-white/70 backdrop-blur-3xl rounded-[2rem] md:rounded-[2.5rem] p-10 md:p-16 mb-8 md:mb-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-white/50 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] group-hover:bg-blue-500/10 transition-colors duration-1000"></div>
                        <div className="flex flex-col md:flex-row items-center gap-16 relative z-10">
                            {personalInfo.photo && (
                                <div className="relative">
                                    <div className="absolute -inset-8 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                                    <img src={personalInfo.photo} alt="Profile" className="relative w-52 h-52 object-cover rounded-full border-[10px] border-white shadow-2xl" />
                                    <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl border border-slate-50">
                                        <i className="fa fa-crown text-blue-500 text-2xl"></i>
                                    </div>
                                </div>
                            )}
                            <div className="flex-1 text-center md:text-left">
                                <span className="inline-flex items-center px-4 py-1.5 bg-blue-500/5 rounded-full text-blue-600 text-[10px] font-black uppercase tracking-[0.5em] mb-6 border border-blue-500/10">Candidate Alpha-01</span>
                                <h1 className="text-8xl font-black mb-4 bg-gradient-to-br from-blue-700 via-purple-700 to-pink-700 bg-clip-text text-transparent leading-[0.85] tracking-tighter">
                                    {personalInfo.firstName} <br /> {personalInfo.lastName}
                                </h1>
                                <p className="text-3xl font-light text-slate-400 mb-10 tracking-[0.2em] uppercase">{personalInfo.jobTitle}</p>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                    {[
                                        { val: personalInfo.email, icon: 'at' },
                                        { val: personalInfo.phone, icon: 'phone' },
                                        { val: personalInfo.location, icon: 'map-pin' }
                                    ].map((contact, i) => (
                                        <span key={i} className="px-6 py-3 bg-white/80 backdrop-blur rounded-2xl text-[10px] font-black tracking-widest text-slate-600 shadow-sm border border-white hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex items-center gap-3">
                                            <i className={`fa fa-${contact.icon} text-blue-500`}></i> {contact.val}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Summary Card */}
                    {personalInfo.summary && (
                        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-10 mb-10 shadow-xl border border-white/50">
                            <h2 className="text-lg font-black uppercase text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-4 tracking-wider">Profil</h2>
                            <p className="text-xl leading-loose text-slate-800 whitespace-pre-line break-words">{personalInfo.summary}</p>
                        </div>
                    )}

                    {/* Experience Cards */}
                    {experience.length > 0 && (
                        <section className="mb-10">
                            <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tight">Parcours Professionnel</h2>
                            <div className="space-y-6">
                                {experience.map(exp => (
                                    <div key={exp.id} className="bg-white/70 backdrop-blur-xl rounded-3xl p-10 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-3xl font-black text-slate-900 mb-2">{exp.position}</h3>
                                                <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{exp.company}</div>
                                            </div>
                                            <span className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-bold rounded-full shadow-lg">
                                                {exp.startDate} - {exp.endDate || 'Présent'}
                                            </span>
                                        </div>
                                        <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-line break-words">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education & Skills Grid */}
                    <div className="grid grid-cols-2 gap-6">
                        {education.length > 0 && (
                            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-10 shadow-xl border border-white/50">
                                <h2 className="text-lg font-black uppercase text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-6 tracking-wider">Formation</h2>
                                <div className="space-y-6">
                                    {education.map(edu => (
                                        <div key={edu.id}>
                                            <h3 className="text-xl font-bold text-slate-900">{edu.degree}</h3>
                                            <div className="text-base text-slate-700 font-semibold mt-1">{edu.institution}</div>
                                            <div className="text-sm text-slate-600 mt-1">{edu.graduationDate}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {skills.length > 0 && (
                            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-10 shadow-xl border border-white/50">
                                <h2 className="text-lg font-black uppercase text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-6 tracking-wider">Compétences</h2>
                                <div className="flex flex-wrap gap-3">
                                    {skills.map(s => (
                                        <span key={s.id} className="px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-bold rounded-full shadow-lg">
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

export default NewProfessionalTemplates;
