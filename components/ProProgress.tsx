import React from 'react';
import { BuilderStep } from '../types';

interface StepInfo {
    step: BuilderStep;
    label: string;
    icon: string;
    description: string;
}

const TRANSLATIONS = {
    fr: [
        { step: BuilderStep.TEMPLATE, label: 'Modèle', icon: 'fa-palette', description: 'Choisir votre style' },
        { step: BuilderStep.PHOTO, label: 'Photo', icon: 'fa-camera', description: 'Votre portrait' },
        { step: BuilderStep.PERSONAL, label: 'Identité', icon: 'fa-user', description: 'Informations personnelles' },
        { step: BuilderStep.EXPERIENCE, label: 'Expérience', icon: 'fa-briefcase', description: 'Parcours professionnel' },
        { step: BuilderStep.EDUCATION, label: 'Formation', icon: 'fa-graduation-cap', description: 'Études et diplômes' },
        { step: BuilderStep.SKILLS, label: 'Compétences', icon: 'fa-star', description: 'Vos atouts' },
        { step: BuilderStep.LANGUAGES, label: 'Langues', icon: 'fa-language', description: 'Langues parlées' },
        { step: BuilderStep.SUMMARY, label: 'Résumé', icon: 'fa-file-text', description: 'Profil professionnel' },
        { step: BuilderStep.FINALIZE, label: 'Finaliser', icon: 'fa-check-circle', description: 'Terminé !' }
    ],
    en: [
        { step: BuilderStep.TEMPLATE, label: 'Template', icon: 'fa-palette', description: 'Choose your style' },
        { step: BuilderStep.PHOTO, label: 'Photo', icon: 'fa-camera', description: 'Your portrait' },
        { step: BuilderStep.PERSONAL, label: 'Identity', icon: 'fa-user', description: 'Personal info' },
        { step: BuilderStep.EXPERIENCE, label: 'Experience', icon: 'fa-briefcase', description: 'Career path' },
        { step: BuilderStep.EDUCATION, label: 'Education', icon: 'fa-graduation-cap', description: 'Studies and degrees' },
        { step: BuilderStep.SKILLS, label: 'Skills', icon: 'fa-star', description: 'Your assets' },
        { step: BuilderStep.LANGUAGES, label: 'Languages', icon: 'fa-language', description: 'Speaking skills' },
        { step: BuilderStep.SUMMARY, label: 'Summary', icon: 'fa-file-text', description: 'Professional profile' },
        { step: BuilderStep.FINALIZE, label: 'Finalize', icon: 'fa-check-circle', description: 'Ready to export!' }
    ],
    ar: [
        { step: BuilderStep.TEMPLATE, label: 'النموذج', icon: 'fa-palette', description: 'اختر ستايلك' },
        { step: BuilderStep.PHOTO, label: 'الصورة', icon: 'fa-camera', description: 'صورتك الشخصية' },
        { step: BuilderStep.PERSONAL, label: 'الهوية', icon: 'fa-user', description: 'معلومات شخصية' },
        { step: BuilderStep.EXPERIENCE, label: 'الخبرة', icon: 'fa-briefcase', description: 'مسارك المهني' },
        { step: BuilderStep.EDUCATION, label: 'التعليم', icon: 'fa-graduation-cap', description: 'الدراسات والشهادات' },
        { step: BuilderStep.SKILLS, label: 'المهارات', icon: 'fa-star', description: 'نقاط قوتك' },
        { step: BuilderStep.LANGUAGES, label: 'اللغات', icon: 'fa-language', description: 'اللغات التي تتقنها' },
        { step: BuilderStep.SUMMARY, label: 'الملخص', icon: 'fa-file-text', description: 'الملف المهني' },
        { step: BuilderStep.FINALIZE, label: 'النهائي', icon: 'fa-check-circle', description: 'جاهز للتصدير!' }
    ]
};

interface ProProgressProps {
    currentStep: BuilderStep;
    onStepClick?: (step: BuilderStep) => void;
    variant?: 'horizontal' | 'vertical';
    showLabels?: boolean;
    lang?: 'en' | 'fr' | 'ar';
}

export const ProProgress: React.FC<ProProgressProps> = ({
    currentStep,
    onStepClick,
    variant = 'horizontal',
    showLabels = true,
    lang = 'fr'
}) => {
    const stepInfoList = TRANSLATIONS[lang] || TRANSLATIONS.en;
    const currentIndex = stepInfoList.findIndex(s => s.step === currentStep);

    const getStepStatus = (index: number): 'completed' | 'current' | 'upcoming' => {
        if (index < currentIndex) return 'completed';
        if (index === currentIndex) return 'current';
        return 'upcoming';
    };

    if (variant === 'vertical') {
        return (
            <div className="space-y-2">
                {stepInfoList.map((stepInfo, index) => {
                    const status = getStepStatus(index);
                    const isClickable = index <= currentIndex && onStepClick;

                    return (
                        <button
                            key={stepInfo.step}
                            onClick={() => isClickable && onStepClick(stepInfo.step)}
                            disabled={!isClickable}
                            className={`
                w-full text-left p-4 rounded-xl transition-all duration-300
                ${status === 'completed' ? 'bg-green-50 border-2 border-green-200 hover:bg-green-100' : ''}
                ${status === 'current' ? 'bg-blue-100 border-2 border-blue-400 shadow-lg' : ''}
                ${status === 'upcoming' ? 'bg-slate-50 border-2 border-slate-200' : ''}
                ${isClickable ? 'cursor-pointer hover:scale-105' : 'cursor-default'}
                disabled:opacity-50
              `}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center text-lg
                  ${status === 'completed' ? 'bg-green-500 text-white' : ''}
                  ${status === 'current' ? 'bg-blue-600 text-white animate-pulse' : ''}
                  ${status === 'upcoming' ? 'bg-slate-300 text-slate-500' : ''}
                `}>
                                    {status === 'completed' ? (
                                        <i className="fa fa-check"></i>
                                    ) : (
                                        <i className={`fa ${stepInfo.icon}`}></i>
                                    )}
                                </div>

                                {showLabels && (
                                    <div className="flex-1">
                                        <div className={`
                      font-bold text-sm uppercase tracking-wide
                      ${status === 'completed' ? 'text-green-700' : ''}
                      ${status === 'current' ? 'text-blue-700' : ''}
                      ${status === 'upcoming' ? 'text-slate-500' : ''}
                    `}>
                                            {stepInfo.label}
                                        </div>
                                        <div className="text-xs text-slate-500 font-medium mt-0.5">
                                            {stepInfo.description}
                                        </div>
                                    </div>
                                )}

                                {status === 'current' && (
                                    <div className="animate-bounce">
                                        <i className="fa fa-chevron-right text-blue-600"></i>
                                    </div>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
        );
    }

    // Horizontal variant
    return (
        <div className="relative">
            {/* Progress bar background */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-slate-200 rounded-full z-0"></div>

            {/* Progress bar fill */}
            <div
                className="absolute top-6 left-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full z-0 transition-all duration-500"
                style={{ width: `${(currentIndex / (stepInfoList.length - 1)) * 100}%` }}
            ></div>

            {/* Steps */}
            <div className="relative z-10 flex justify-between">
                {stepInfoList.map((stepInfo, index) => {
                    const status = getStepStatus(index);
                    const isClickable = index <= currentIndex && onStepClick;

                    return (
                        <div key={stepInfo.step} className="flex flex-col items-center">
                            <button
                                onClick={() => isClickable && onStepClick(stepInfo.step)}
                                disabled={!isClickable}
                                className={`
                  w-14 h-14 rounded-full flex items-center justify-center text-lg
                  transition-all duration-300 border-4 border-white shadow-lg
                  ${status === 'completed' ? 'bg-green-500 text-white hover:scale-110' : ''}
                  ${status === 'current' ? 'bg-blue-600 text-white scale-125 animate-pulse' : ''}
                  ${status === 'upcoming' ? 'bg-slate-200 text-slate-400' : ''}
                  ${isClickable ? 'cursor-pointer hover:shadow-xl' : 'cursor-default'}
                  disabled:opacity-50
                `}
                            >
                                {status === 'completed' ? (
                                    <i className="fa fa-check"></i>
                                ) : (
                                    <i className={`fa ${stepInfo.icon}`}></i>
                                )}
                            </button>

                            {showLabels && (
                                <div className="mt-3 text-center">
                                    <div className={`
                    text-xs font-bold uppercase tracking-wider
                    ${status === 'completed' ? 'text-green-600' : ''}
                    ${status === 'current' ? 'text-blue-600' : ''}
                    ${status === 'upcoming' ? 'text-slate-400' : ''}
                  `}>
                                        {stepInfo.label}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Mini progress bar for mobile
export const MiniProgress: React.FC<{ current: number; total: number; lang?: 'en' | 'fr' | 'ar' }> = ({ current, total, lang = 'fr' }) => {
    const percentage = (current / total) * 100;

    const labels = {
        en: { step: 'Step', of: 'of' },
        fr: { step: 'Étape', of: 'sur' },
        ar: { step: 'الخطوة', of: 'من' }
    };

    const { step, of } = labels[lang] || labels.en;

    return (
        <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                    {step} {current} {of} {total}
                </span>
                <span className="text-sm font-bold text-blue-600">
                    {Math.round(percentage)}%
                </span>
            </div>
            <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};
