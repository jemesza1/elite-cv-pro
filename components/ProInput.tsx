import React from 'react';

interface ProInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: 'text' | 'email' | 'tel' | 'url' | 'date';
    required?: boolean;
    helpText?: string;
    icon?: string;
    multiline?: boolean;
    rows?: number;
}

export const ProInput: React.FC<ProInputProps> = ({
    label,
    value,
    onChange,
    placeholder,
    type = 'text',
    required = false,
    helpText,
    icon,
    multiline = false,
    rows = 4
}) => {
    const inputClasses = `
    w-full px-5 py-4 
    bg-white border-2 border-slate-200 rounded-2xl
    text-slate-900 text-base font-medium
    placeholder:text-slate-400 placeholder:font-normal
    focus:border-blue-500 focus:ring-4 focus:ring-blue-50
    transition-all duration-200
    hover:border-slate-300
    ${icon ? 'pl-14' : ''}
  `;

    const labelClasses = `
    block text-sm font-bold text-slate-900 mb-2
    tracking-wide uppercase
  `;

    return (
        <div className="mb-6">
            <label className={labelClasses}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <div className="relative">
                {icon && (
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <i className={`fa ${icon} text-lg`}></i>
                    </div>
                )}

                {multiline ? (
                    <textarea
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        required={required}
                        rows={rows}
                        className={inputClasses + ' resize-none'}
                    />
                ) : (
                    <input
                        type={type}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        required={required}
                        className={inputClasses}
                    />
                )}
            </div>

            {helpText && (
                <p className="mt-2 text-xs text-slate-500 italic flex items-center gap-2">
                    <i className="fa fa-info-circle"></i>
                    {helpText}
                </p>
            )}
        </div>
    );
};

interface ProSelectProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    required?: boolean;
    helpText?: string;
    icon?: string;
}

export const ProSelect: React.FC<ProSelectProps> = ({
    label,
    value,
    onChange,
    options,
    required = false,
    helpText,
    icon
}) => {
    return (
        <div className="mb-6">
            <label className="block text-sm font-bold text-slate-900 mb-2 tracking-wide uppercase">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <div className="relative">
                {icon && (
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10">
                        <i className={`fa ${icon} text-lg`}></i>
                    </div>
                )}

                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    required={required}
                    className={`
            w-full px-5 py-4 
            bg-white border-2 border-slate-200 rounded-2xl
            text-slate-900 text-base font-medium
            focus:border-blue-500 focus:ring-4 focus:ring-blue-50
            transition-all duration-200
            hover:border-slate-300
            appearance-none cursor-pointer
            ${icon ? 'pl-14' : ''}
          `}
                >
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>

                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <i className="fa fa-chevron-down"></i>
                </div>
            </div>

            {helpText && (
                <p className="mt-2 text-xs text-slate-500 italic flex items-center gap-2">
                    <i className="fa fa-info-circle"></i>
                    {helpText}
                </p>
            )}
        </div>
    );
};

interface ProButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    icon?: string;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
    disabled?: boolean;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

export const ProButton: React.FC<ProButtonProps> = ({
    children,
    onClick,
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'left',
    fullWidth = false,
    disabled = false,
    loading = false,
    type = 'button'
}) => {
    const variants = {
        primary: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40',
        secondary: 'bg-slate-700 hover:bg-slate-800 text-white shadow-lg shadow-slate-500/20',
        outline: 'bg-white border-2 border-slate-300 hover:border-blue-500 text-slate-700 hover:text-blue-600 shadow-sm',
        danger: 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/30',
        success: 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/30'
    };

    const sizes = {
        xs: 'px-2 py-1 text-[10px]',
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
        xl: 'px-10 py-5 text-xl'
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : 'inline-flex'}
        items-center justify-center gap-3
        font-bold rounded-2xl
        transition-all duration-300
        transform hover:-translate-y-1
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        uppercase tracking-wide
      `}
        >
            {loading && (
                <i className="fa fa-spinner fa-spin"></i>
            )}
            {!loading && icon && iconPosition === 'left' && (
                <i className={`fa ${icon}`}></i>
            )}
            <span>{children}</span>
            {!loading && icon && iconPosition === 'right' && (
                <i className={`fa ${icon}`}></i>
            )}
        </button>
    );
};

export const ProCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
    return (
        <div className={`bg-white rounded-3xl shadow-xl border border-slate-100 p-8 ${className}`}>
            {children}
        </div>
    );
};

export const ProBadge: React.FC<{ children: React.ReactNode; variant?: 'blue' | 'green' | 'orange' | 'purple' | 'red' }> = ({
    children,
    variant = 'blue'
}) => {
    const variants = {
        blue: 'bg-blue-100 text-blue-700 border-blue-200',
        green: 'bg-green-100 text-green-700 border-green-200',
        orange: 'bg-orange-100 text-orange-700 border-orange-200',
        purple: 'bg-purple-100 text-purple-700 border-purple-200',
        red: 'bg-red-100 text-red-700 border-red-200'
    };

    return (
        <span className={`
      ${variants[variant]}
      inline-flex items-center gap-2 px-4 py-1.5 rounded-full
      text-xs font-black uppercase tracking-wider
      border-2
    `}>
            {children}
        </span>
    );
};
