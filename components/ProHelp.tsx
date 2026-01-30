import React, { useState } from 'react';

interface ProTipProps {
    title: string;
    content: string;
    icon?: string;
    variant?: 'info' | 'success' | 'warning' | 'tip';
    dismissible?: boolean;
}

export const ProTip: React.FC<ProTipProps> = ({
    title,
    content,
    icon,
    variant = 'info',
    dismissible = true
}) => {
    const [isDismissed, setIsDismissed] = useState(false);

    if (isDismissed) return null;

    const variants = {
        info: {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            icon: icon || 'fa-info-circle',
            iconColor: 'text-blue-600',
            titleColor: 'text-blue-900',
            textColor: 'text-blue-800'
        },
        success: {
            bg: 'bg-green-50',
            border: 'border-green-200',
            icon: icon || 'fa-check-circle',
            iconColor: 'text-green-600',
            titleColor: 'text-green-900',
            textColor: 'text-green-800'
        },
        warning: {
            bg: 'bg-orange-50',
            border: 'border-orange-200',
            icon: icon || 'fa-exclamation-triangle',
            iconColor: 'text-orange-600',
            titleColor: 'text-orange-900',
            textColor: 'text-orange-800'
        },
        tip: {
            bg: 'bg-purple-50',
            border: 'border-purple-200',
            icon: icon || 'fa-lightbulb',
            iconColor: 'text-purple-600',
            titleColor: 'text-purple-900',
            textColor: 'text-purple-800'
        }
    };

    const style = variants[variant];

    return (
        <div className={`
      ${style.bg} ${style.border} 
      border-2 rounded-2xl p-5 mb-6
      transition-all duration-300
      hover:shadow-lg
    `}>
            <div className="flex items-start gap-4">
                <div className={`${style.iconColor} text-2xl flex-shrink-0`}>
                    <i className={`fa ${style.icon}`}></i>
                </div>

                <div className="flex-1">
                    <h4 className={`${style.titleColor} font-bold text-sm uppercase tracking-wider mb-2`}>
                        {title}
                    </h4>
                    <p className={`${style.textColor} text-sm leading-relaxed`}>
                        {content}
                    </p>
                </div>

                {dismissible && (
                    <button
                        onClick={() => setIsDismissed(true)}
                        className={`${style.iconColor} hover:opacity-70 transition-opacity flex-shrink-0`}
                    >
                        <i className="fa fa-times"></i>
                    </button>
                )}
            </div>
        </div>
    );
};

interface ProHelpPanelProps {
    tips: Array<{
        title: string;
        content: string;
        icon?: string;
    }>;
    isOpen?: boolean;
    onClose?: () => void;
}

export const ProHelpPanel: React.FC<ProHelpPanelProps> = ({
    tips,
    isOpen = true,
    onClose
}) => {
    if (!isOpen) return null;

    return (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border-2 border-blue-100 shadow-xl">
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                        <i className="fa fa-question-circle text-white text-xl"></i>
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                            💡 Conseils Pro
                        </h3>
                        <p className="text-sm text-slate-600 font-medium">
                            Optimisez votre CV
                        </p>
                    </div>
                </div>

                {onClose && (
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <i className="fa fa-times text-xl"></i>
                    </button>
                )}
            </div>

            <div className="space-y-4">
                {tips.map((tip, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl p-4 border border-blue-100 hover:shadow-md transition-all"
                    >
                        <div className="flex gap-3">
                            {tip.icon && (
                                <div className="text-blue-600 text-lg flex-shrink-0">
                                    <i className={`fa ${tip.icon}`}></i>
                                </div>
                            )}
                            <div>
                                <h4 className="font-bold text-sm text-slate-900 mb-1">
                                    {tip.title}
                                </h4>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    {tip.content}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Floating help button
export const FloatingHelpButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="
        fixed bottom-8 right-8 z-50
        w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700
        text-white rounded-full shadow-2xl shadow-blue-500/40
        hover:scale-110 transition-all duration-300
        flex items-center justify-center
        hover:shadow-blue-500/60
      "
        >
            <i className={`fa ${isHovered ? 'fa-question-circle' : 'fa-question'} text-2xl`}></i>
        </button>
    );
};

// Step-specific context help
interface StepHelpProps {
    stepName: string;
    description: string;
    tips: string[];
    example?: string;
}

export const StepHelp: React.FC<StepHelpProps> = ({
    stepName,
    description,
    tips,
    example
}) => {
    return (
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 mb-8 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <i className="fa fa-info text-white"></i>
                </div>
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                    {stepName}
                </h3>
            </div>

            <p className="text-sm text-slate-700 mb-4 leading-relaxed">
                {description}
            </p>

            {tips.length > 0 && (
                <div className="space-y-2 mb-4">
                    {tips.map((tip, index) => (
                        <div key={index} className="flex items-start gap-2">
                            <i className="fa fa-check-circle text-green-600 mt-0.5"></i>
                            <span className="text-xs text-slate-600">{tip}</span>
                        </div>
                    ))}
                </div>
            )}

            {example && (
                <div className="bg-white rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                        <i className="fa fa-lightbulb text-yellow-500"></i>
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                            Exemple
                        </span>
                    </div>
                    <p className="text-sm text-slate-600 italic">
                        "{example}"
                    </p>
                </div>
            )}
        </div>
    );
};
