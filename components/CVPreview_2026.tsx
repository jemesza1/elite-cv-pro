import React from 'react';
import { CVData, Language, TemplateType } from '../types';

interface Props {
  data: CVData;
  template: TemplateType;
  lang: Language;
}

const SectionTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <h2 className={`text-[11px] font-black uppercase tracking-[0.25em] mb-3 ${className}`}>{children}</h2>
);

const CVPreview2026: React.FC<Props> = ({ data, template, lang }) => {
  const { personalInfo: p, experience, education, skills, languages } = data;
  const fullName = `${p.firstName} ${p.lastName}`;

  // ========== MONACO — Riviera Luxury (Navy + Gold) ==========
  if (template === 'monaco') {
    return (
      <div className="bg-white text-slate-800 font-sans text-[13px] leading-relaxed min-h-[1122px]">
        {/* Gold top bar */}
        <div className="h-1.5 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600" />

        <div className="px-10 pt-8 pb-6 flex gap-8 items-start border-b border-slate-100">
          {p.photo && (
            <img src={p.photo} alt="" className="w-24 h-24 rounded-full object-cover ring-2 ring-amber-500/40 shadow-lg" />
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-serif font-bold text-[#0c1e3a] tracking-tight">{fullName}</h1>
            <p className="text-amber-700 font-semibold text-sm mt-1 tracking-wide">{p.jobTitle}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[11px] text-slate-500">
              {p.email && <span>{p.email}</span>}
              {p.phone && <span>{p.phone}</span>}
              {p.location && <span>{p.location}</span>}
              {p.linkedin && <span>{p.linkedin}</span>}
            </div>
          </div>
        </div>

        <div className="px-10 py-6 space-y-6">
          {p.summary && (
            <section>
              <SectionTitle className="text-[#0c1e3a] border-b border-amber-200 pb-1">Profile</SectionTitle>
              <p className="text-slate-600 whitespace-pre-line">{p.summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <SectionTitle className="text-[#0c1e3a] border-b border-amber-200 pb-1">Experience</SectionTitle>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-[#0c1e3a]">{exp.position}</h3>
                      <span className="text-[11px] text-slate-400">{exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}</span>
                    </div>
                    <p className="text-amber-700 text-xs font-semibold">{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                    <p className="mt-1 text-slate-600 whitespace-pre-line text-[12.5px]">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <SectionTitle className="text-[#0c1e3a] border-b border-amber-200 pb-1">Education</SectionTitle>
              {education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-[#0c1e3a]">{edu.degree}</h3>
                    <span className="text-[11px] text-slate-400">{edu.graduationDate}</span>
                  </div>
                  <p className="text-xs text-slate-500">{edu.institution}</p>
                </div>
              ))}
            </section>
          )}

          <div className="grid grid-cols-2 gap-6">
            {skills.length > 0 && (
              <section>
                <SectionTitle className="text-[#0c1e3a] border-b border-amber-200 pb-1">Skills</SectionTitle>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s) => (
                    <span key={s.id} className="px-2.5 py-1 bg-[#0c1e3a]/5 text-[#0c1e3a] text-[11px] font-semibold rounded-full">{s.name}</span>
                  ))}
                </div>
              </section>
            )}
            {languages.length > 0 && (
              <section>
                <SectionTitle className="text-[#0c1e3a] border-b border-amber-200 pb-1">Languages</SectionTitle>
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between text-xs mb-1">
                    <span className="font-semibold">{l.name}</span>
                    <span className="text-slate-400">{l.level}%</span>
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ========== NORDIC — Ultra-clean Scandinavian ==========
  if (template === 'nordic') {
    return (
      <div className="bg-white text-slate-900 font-sans text-[13px] leading-relaxed min-h-[1122px] px-12 py-10">
        <header className="mb-10">
          <h1 className="text-4xl font-light tracking-tight text-slate-900">{fullName}</h1>
          <p className="text-sm text-slate-400 mt-1 font-medium tracking-wide">{p.jobTitle}</p>
          <div className="flex flex-wrap gap-3 mt-4 text-[11px] text-slate-400">
            {[p.email, p.phone, p.location, p.linkedin].filter(Boolean).map((v, i) => (
              <span key={i}>{v}</span>
            ))}
          </div>
          <div className="mt-6 h-px bg-slate-200" />
        </header>

        {p.summary && (
          <section className="mb-8">
            <p className="text-slate-600 whitespace-pre-line leading-relaxed">{p.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="mb-8">
            <SectionTitle className="text-slate-400">Experience</SectionTitle>
            <div className="space-y-5 mt-3">
              {experience.map((exp) => (
                <div key={exp.id} className="grid grid-cols-[100px_1fr] gap-4">
                  <div className="text-[11px] text-slate-400 pt-0.5">{exp.startDate}{exp.endDate ? `–${exp.endDate}` : ''}</div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{exp.position}</h3>
                    <p className="text-xs text-slate-500 mb-1">{exp.company}</p>
                    <p className="text-slate-600 whitespace-pre-line text-[12.5px]">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className="mb-8">
            <SectionTitle className="text-slate-400">Education</SectionTitle>
            <div className="space-y-3 mt-3">
              {education.map((edu) => (
                <div key={edu.id} className="grid grid-cols-[100px_1fr] gap-4">
                  <div className="text-[11px] text-slate-400">{edu.graduationDate}</div>
                  <div>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-xs text-slate-500">{edu.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-8">
          {skills.length > 0 && (
            <section>
              <SectionTitle className="text-slate-400">Skills</SectionTitle>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((s) => (
                  <span key={s.id} className="text-xs text-slate-700 border border-slate-200 px-2.5 py-1 rounded">{s.name}</span>
                ))}
              </div>
            </section>
          )}
          {languages.length > 0 && (
            <section>
              <SectionTitle className="text-slate-400">Languages</SectionTitle>
              <div className="mt-2 space-y-1">
                {languages.map((l) => (
                  <div key={l.id} className="text-xs flex justify-between"><span>{l.name}</span><span className="text-slate-400">{l.level}%</span></div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  // ========== IMPERIAL — Dark Executive ==========
  if (template === 'imperial') {
    return (
      <div className="bg-[#0f0f12] text-white font-sans text-[13px] leading-relaxed min-h-[1122px]">
        <div className="px-10 pt-10 pb-8 border-b border-white/10">
          <div className="flex items-center gap-6">
            {p.photo && <img src={p.photo} alt="" className="w-20 h-20 rounded-lg object-cover ring-1 ring-amber-500/50" />}
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{fullName}</h1>
              <p className="text-amber-400 text-sm font-medium mt-1">{p.jobTitle}</p>
              <div className="flex flex-wrap gap-3 mt-2 text-[11px] text-white/40">
                {[p.email, p.phone, p.location].filter(Boolean).map((v, i) => <span key={i}>{v}</span>)}
              </div>
            </div>
          </div>
        </div>

        <div className="px-10 py-6 space-y-6">
          {p.summary && (
            <section>
              <SectionTitle className="text-amber-400">Executive Summary</SectionTitle>
              <p className="text-white/60 whitespace-pre-line">{p.summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <SectionTitle className="text-amber-400">Career History</SectionTitle>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-amber-500/40 pl-4">
                    <div className="flex justify-between">
                      <h3 className="font-bold">{exp.position}</h3>
                      <span className="text-[11px] text-white/30">{exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}</span>
                    </div>
                    <p className="text-amber-400/80 text-xs">{exp.company}</p>
                    <p className="mt-1 text-white/50 whitespace-pre-line text-[12.5px]">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <SectionTitle className="text-amber-400">Education</SectionTitle>
              {education.map((edu) => (
                <div key={edu.id} className="mb-2 flex justify-between">
                  <div>
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p className="text-xs text-white/40">{edu.institution}</p>
                  </div>
                  <span className="text-[11px] text-white/30">{edu.graduationDate}</span>
                </div>
              ))}
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <SectionTitle className="text-amber-400">Core Competencies</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s.id} className="px-3 py-1 border border-white/10 text-[11px] rounded text-white/70">{s.name}</span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  // ========== AURORA — Soft modern gradient ==========
  if (template === 'aurora') {
    return (
      <div className="bg-white text-slate-800 font-sans text-[13px] leading-relaxed min-h-[1122px]">
        <div className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400 px-10 py-8 text-white">
          <div className="flex items-center gap-6">
            {p.photo && <img src={p.photo} alt="" className="w-20 h-20 rounded-2xl object-cover ring-2 ring-white/30" />}
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{fullName}</h1>
              <p className="text-white/80 text-sm mt-1">{p.jobTitle}</p>
              <div className="flex flex-wrap gap-3 mt-2 text-[11px] text-white/60">
                {[p.email, p.phone, p.location].filter(Boolean).map((v, i) => <span key={i}>{v}</span>)}
              </div>
            </div>
          </div>
        </div>

        <div className="px-10 py-6 space-y-6">
          {p.summary && (
            <section>
              <SectionTitle className="text-violet-600">About</SectionTitle>
              <p className="text-slate-600 whitespace-pre-line">{p.summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <SectionTitle className="text-violet-600">Experience</SectionTitle>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-slate-900">{exp.position}</h3>
                      <span className="text-[11px] text-slate-400">{exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}</span>
                    </div>
                    <p className="text-violet-600 text-xs font-semibold">{exp.company}</p>
                    <p className="mt-1 text-slate-600 whitespace-pre-line text-[12.5px]">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <SectionTitle className="text-violet-600">Education</SectionTitle>
              {education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <div className="flex justify-between">
                    <h3 className="font-bold">{edu.degree}</h3>
                    <span className="text-[11px] text-slate-400">{edu.graduationDate}</span>
                  </div>
                  <p className="text-xs text-slate-500">{edu.institution}</p>
                </div>
              ))}
            </section>
          )}

          <div className="grid grid-cols-2 gap-6">
            {skills.length > 0 && (
              <section>
                <SectionTitle className="text-violet-600">Skills</SectionTitle>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s) => (
                    <span key={s.id} className="px-2.5 py-1 bg-violet-50 text-violet-700 text-[11px] font-semibold rounded-full">{s.name}</span>
                  ))}
                </div>
              </section>
            )}
            {languages.length > 0 && (
              <section>
                <SectionTitle className="text-violet-600">Languages</SectionTitle>
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between text-xs mb-1">
                    <span className="font-semibold">{l.name}</span>
                    <span className="text-slate-400">{l.level}%</span>
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CVPreview2026;
