import React from 'react';

interface ButtonType {
    text: string;
    link: string;
    style: 'primary' | 'secondary' | 'outline';
    newTab?: boolean;
    icon?: string;
    color?: string;
    backgroundColor?: string;
    border?: string;
    radius?: string;
}

interface ButtonGroupProps {
    buttons: ButtonType[];
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons }) => {
    return (
        <div className="flex gap-4 flex-wrap justify-center mt-6">
            {buttons.map((btn, i) => {
                const {
                    text,
                    link,
                    style,
                    newTab = false,
                    icon,
                    color,
                    backgroundColor,
                    border,
                    radius,
                } = btn;

                // Base Tailwind classes (removed 'rounded' to avoid conflict with inline radius)
                let btnClass = 'px-6 py-3 font-semibold transition';

                // Apply fallback Tailwind style based on `style` value
                switch (style) {
                    case 'primary':
                        btnClass += ' bg-blue-600 text-white hover:bg-blue-700';
                        break;
                    case 'secondary':
                        btnClass += ' bg-gray-200 text-gray-900 hover:bg-gray-300';
                        break;
                    case 'outline':
                        btnClass += ' border border-gray-800 text-gray-800 hover:bg-gray-100';
                        break;
                    default:
                        btnClass += ' bg-blue-600 text-white';
                }

                // Optional inline styles — apply only if defined
                const inlineStyle: React.CSSProperties = {};

                if (color) inlineStyle.color = color;
                if (backgroundColor) inlineStyle.backgroundColor = backgroundColor;
                if (border) inlineStyle.border = border;

                if (radius) {
                    // Auto-append 'px' if radius is a number without unit
                    inlineStyle.borderRadius = /^\d+$/.test(radius) ? `${radius}px` : radius;
                }

                return (
                    <a
                        key={i}
                        href={link}
                        className={btnClass}
                        style={inlineStyle}
                        target={newTab ? '_blank' : '_self'}
                        rel={newTab ? 'noopener noreferrer' : undefined}
                    >
                        {icon && <span className="mr-2">{icon}</span>}
                        {text}
                    </a>
                );
            })}
        </div>
    );
};

export default ButtonGroup;
