// components/Button.tsx

import React from 'react';
import Image from 'next/image';

export interface ButtonProps {
    text: string;
    link: string;
    style: 'primary' | 'secondary' | 'outline';
    newTab?: boolean;
    icon?: string; // This is a path to an image
    color?: string;
    backgroundColor?: string;
    border?: string;
    radius?: string;
}

const Button: React.FC<ButtonProps> = ({
    text,
    link,
    style,
    newTab = false,
    icon,
    color,
    backgroundColor,
    border,
    radius,
}) => {
    // Base classes for different button styles
    let baseClass = 'inline-flex items-center gap-2 px-6 py-3 font-semibold transition rounded shadow';

    switch (style) {
        case 'secondary':
            baseClass += ' bg-gray-200 text-gray-900 hover:bg-gray-300';
            break;
        case 'outline':
            baseClass += ' border border-gray-800 text-gray-800 hover:bg-gray-100';
            break;
        case 'primary':
        default:
            baseClass += ' bg-blue-600 text-white hover:bg-blue-700';
            break;
    }

    const inlineStyle: React.CSSProperties = {};
    if (color) inlineStyle.color = color;
    if (backgroundColor) inlineStyle.backgroundColor = backgroundColor;
    if (border) inlineStyle.border = border;
    if (radius) inlineStyle.borderRadius = /^\d+$/.test(radius) ? `${radius}px` : radius;

    return (
        <a
            href={link}
            target={newTab ? '_blank' : '_self'}
            rel={newTab ? 'noopener noreferrer' : undefined}
            className={baseClass}
            style={inlineStyle}
        >
            {icon && (
                <Image
                    src={`/${icon}`}
                    alt="Button icon"
                    width={20}
                    height={20}
                    className="inline-block"
                />
            )}
            {text}
        </a>
    );
};

export default Button;
