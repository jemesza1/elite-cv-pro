import React, { useState } from 'react';
import { TemplateType } from '../types';

interface TemplateOption {
    id: TemplateType;
    title: string;
    description: string;
    category: string;
    preview?: string;
    badge?: string;
    color?: string;
    modelName?: string;
}

const TemplateSkeleton: React.FC<{ id: TemplateType; category: string }> = ({ id, category }) => {
    const isDark = ['elite', 'silicon_valley', 'echo', 'orbit', 'nexus'].includes(id);
    const hasSidebar = ['nexus', 'spectrum', 'tokyo', 'vogue', 'silicon_valley'].includes(id);
    const isCentered = ['zurich', 'harvard', 'quantum', 'echo', 'parisian', 'orbit'].includes(id);

    return (
        <div className={`w-32 h-40 rounded-lg shadow-sm overflow-hidden flex flex-col border border-slate-200 transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white'}`}>
            {/* Header Area */}
            <div className={`h-10 w-full p-2 flex items-center gap-2 ${id === 'atlas' ? 'border-t-4 border-slate-900' : ''} ${id === 'prism' ? 'bg-gradient-to-r from-teal-400 to-purple-400' : ''} ${id === 'nova' ? 'bg-gradient-to-br from-violet-600 to-pink-600' : ''}`}>
                <div className={`w-4 h-4 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
                <div className="flex-1 space-y-1">
                    <div className={`h-1.5 w-full rounded ${isDark ? 'bg-slate-600' : 'bg-slate-200'}`}></div>
                    <div className={`h-1 w-2/3 rounded ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}></div>
                </div>
            </div>

            {/* Layout Area */}
            <div className="flex-1 flex p-2 gap-2">
                {hasSidebar && (
                    <div className={`w-1/3 rounded p-1 space-y-2 ${['nexus', 'silicon_valley'].includes(id) ? 'bg-slate-800' : 'bg-slate-50'}`}>
                        <div className="h-1 w-full bg-slate-300/30 rounded"></div>
                        <div className="h-1 w-full bg-slate-300/30 rounded"></div>
                        <div className="h-1 w-full bg-slate-300/30 rounded"></div>
                    </div>
                )}
                <div className="flex-1 space-y-3">
                    <div className="space-y-1">
                        <div className={`h-1.5 w-full rounded ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}></div>
                        <div className={`h-1 w-full rounded ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}></div>
                        <div className={`h-1 w-2/3 rounded ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}></div>
                    </div>
                    <div className="space-y-1">
                        <div className={`h-1.5 w-full rounded ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}></div>
                        <div className={`h-1 w-full rounded ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}></div>
                    </div>
                </div>
            </div>

            {/* Accent Elements */}
            {id === 'elite' && <div className="absolute top-2 right-2 w-1 h-1 bg-[#D4AF37] rounded-full shadow-[0_0_5px_#D4AF37]"></div>}
            {id === 'vertex' && <div className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-500/20 clip-path-polygon" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}></div>}
        </div>
    );
};

interface ProTemplateCardProps {
    template: TemplateOption;
    isSelected: boolean;
    onSelect: (id: TemplateType) => void;
    onPreview?: (id: TemplateType) => void;
}

const ProTemplateCard: React.FC<ProTemplateCardProps> = ({
    template,
    isSelected,
    onSelect,
    onPreview
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
        'Modern': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
        'Executive': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
        'Creative': { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' },
        'Classic': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
        'Special': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
        'Professional': { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' },
        'Minimalist': { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' }
    };

    const labels = {
        en: { preview: 'Preview', selected: 'Selected', choose: 'Choose template' },
        fr: { preview: 'Aperçu', selected: 'Sélectionné', choose: 'Choisir ce modèle' },
        ar: { preview: 'معاينة', selected: 'تم الاختيار', choose: 'اختر هذا النموذج' }
    };

    const lang: 'en' | 'fr' | 'ar' = (window as any).appLang || 'fr';
    const text = labels[lang] || labels.en;

    const colorScheme = categoryColors[template.category] || categoryColors['Modern'];

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
        relative rounded-3xl overflow-hidden
        transition-all duration-300 cursor-pointer
        ${isSelected ?
                    'ring-4 ring-blue-500 ring-offset-4 shadow-2xl scale-105' :
                    'border-2 border-slate-200 hover:border-blue-300 hover:shadow-xl hover:scale-102'
                }
      `}
            onClick={() => onSelect(template.id)}
        >
            {/* Badge */}
            {template.badge && (
                <div className="absolute top-4 right-4 z-20">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-lg">
                        {template.badge}
                    </span>
                </div>
            )}

            {/* Selected checkmark */}
            {isSelected && (
                <div className="absolute top-4 left-4 z-20">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                        <i className="fa fa-check text-white text-lg"></i>
                    </div>
                </div>
            )}

            {/* Preview Area */}
            <div className={`
        relative h-72 ${colorScheme.bg} flex flex-col items-center justify-center
        overflow-hidden group pt-8
      `}>
                <div className="flex-1 flex items-center justify-center">
                    <TemplateSkeleton id={template.id} category={template.category} />
                </div>
                <div className="text-center pb-6 mt-4">
                    <div className="text-[10px] font-black tracking-[0.2em] text-slate-400 mb-1 uppercase">MODÈLE</div>
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">{template.title}</h3>
                </div>

                {/* Hover overlay */}
                {isHovered && onPreview && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onPreview(template.id);
                            }}
                            className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-blue-500 hover:text-white transition-colors"
                        >
                            <i className="fa fa-eye mr-2"></i>
                            {text.preview}
                        </button>
                    </div>
                )}
            </div>

            {/* Info Section */}
            <div className={`
        p-6 bg-white
        ${isSelected ? 'bg-blue-50' : ''}
      `}>
                {/* Category badge */}
                <div className="flex items-center justify-between mb-3">
                    <span className={`
            ${colorScheme.bg} ${colorScheme.text} ${colorScheme.border}
            px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider
            border-2
          `}>
                        {template.category}
                    </span>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    {template.description}
                </p>

                {/* Action button */}
                <button
                    onClick={() => onSelect(template.id)}
                    className={`
            mt-4 w-full py-3 rounded-xl font-bold uppercase tracking-wider text-sm
            transition-all duration-300
            ${isSelected ?
                            'bg-blue-600 text-white shadow-lg shadow-blue-500/30' :
                            'bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600'
                        }
          `}
                >
                    {isSelected ? (
                        <>
                            <i className="fa fa-check mr-2"></i>
                            {text.selected}
                        </>
                    ) : (
                        text.choose
                    )}
                </button>
            </div>
        </div>
    );
};

interface ProTemplateGridProps {
    templates: TemplateOption[];
    selectedTemplate: TemplateType;
    onSelect: (id: TemplateType) => void;
    onPreview?: (id: TemplateType) => void;
    showFilters?: boolean;
    lang?: 'en' | 'fr' | 'ar';
}

export const ProTemplateGrid: React.FC<ProTemplateGridProps> = ({
    templates,
    selectedTemplate,
    onSelect,
    onPreview,
    showFilters = true,
    lang = 'fr'
}) => {
    const [filter, setFilter] = useState<string>('All');
    (window as any).appLang = lang;

    const categories = ['All', ...Array.from(new Set(templates.map(t => t.category)))];
    const filteredTemplates = filter === 'All'
        ? templates
        : templates.filter(t => t.category === filter);

    const noResultsLabels = {
        en: 'No templates found',
        fr: 'Aucun modèle trouvé',
        ar: 'لم يتم العثور على نماذج'
    };

    return (
        <div>
            {/* Filters */}
            {showFilters && (
                <div className="mb-8 flex flex-wrap gap-3 justify-center">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`
                px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm
                transition-all duration-300
                ${filter === cat ?
                                    'bg-blue-600 text-white shadow-lg scale-110' :
                                    'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }
              `}
                        >
                            {cat}
                            {cat !== 'All' && (
                                <span className="ml-2 opacity-60">
                                    ({templates.filter(t => t.category === cat).length})
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTemplates.map(template => (
                    <ProTemplateGridItem
                        key={template.id}
                        template={template}
                        isSelected={template.id === selectedTemplate}
                        onSelect={onSelect}
                        onPreview={onPreview}
                    />
                ))}
            </div>

            {/* No results */}
            {filteredTemplates.length === 0 && (
                <div className="text-center py-20">
                    <i className="fa fa-search text-6xl text-slate-300 mb-4"></i>
                    <p className="text-xl text-slate-500 font-bold">{noResultsLabels[lang] || noResultsLabels.en}</p>
                </div>
            )}
        </div>
    );
};

// Internal component to manage translation state without passing it down to every card
const ProTemplateGridItem = ProTemplateCard;
