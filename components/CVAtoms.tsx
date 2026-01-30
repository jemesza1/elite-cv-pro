
import React from 'react';
import { Language, Experience, Education, Skill, LanguageSkill } from '../types';

interface SectionProps {
    title: {
        en: string;
        fr: string;
        ar: string;
    };
    children: React.ReactNode;
    lang: Language;
    className?: string;
}

export const CVSection: React.FC<SectionProps> = ({ title, children, lang, className = "" }) => {
    return (
        <div className={`cv-section ${className}`}>
            <h2 className="pro-label mb-6">{title[lang] || title['en']}</h2>
            {children}
        </div>
    );
};

export const CVExperienceItem: React.FC<{ exp: Experience; lang: Language; className?: string }> = ({ exp, lang, className = "" }) => {
    return (
        <div className={`cv-experience-item ${className}`}>
            <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-xl font-bold">{exp.position}</h3>
                <span className="text-sm font-bold text-slate-400">{exp.startDate} – {exp.endDate || (lang === 'fr' ? 'Présent' : 'Present')}</span>
            </div>
            <div className="text-lg text-slate-600 font-semibold mb-3 italic">{exp.company} {exp.location && `— ${exp.location}`}</div>
            <p className="text-base text-slate-700 leading-relaxed whitespace-pre-line break-words">{exp.description}</p>
        </div>
    );
};

export const CVEducationItem: React.FC<{ edu: Education; lang: Language; className?: string }> = ({ edu, lang, className = "" }) => {
    return (
        <div className={`cv-education-item ${className}`}>
            <h3 className="text-lg font-bold">{edu.degree}</h3>
            <div className="text-slate-600 font-medium">{edu.institution}</div>
            <div className="text-sm text-slate-400">{edu.graduationDate}</div>
            {edu.description && <p className="text-sm text-slate-500 mt-2 font-normal">{edu.description}</p>}
        </div>
    );
};

export const CVSkillBadge: React.FC<{ skill: Skill; className?: string }> = ({ skill, className = "" }) => {
    return (
        <span className={`px-4 py-2 bg-slate-50 text-slate-700 text-xs font-bold rounded-lg border border-slate-100 ${className}`}>
            {skill.name}
        </span>
    );
};

export const CVLanguageItem: React.FC<{ lang: LanguageSkill; className?: string }> = ({ lang, className = "" }) => {
    return (
        <div className={`flex items-center justify-between text-sm ${className}`}>
            <span className="font-bold text-slate-700">{lang.name}</span>
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i < (lang.level / 20) ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
                ))}
            </div>
        </div>
    );
};
