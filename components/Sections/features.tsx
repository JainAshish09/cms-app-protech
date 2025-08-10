import React from 'react';
import ReactMarkdown from 'react-markdown';

type BgStyle = 'light' | 'dark' | 'gradient' | 'image' | 'color';

interface TitleControls {
    align?: 'left' | 'center' | 'right';
    fontSize?: string; // e.g. "text-xl", "text-2xl"
    color?: string; // CSS color string, supports alpha
}

interface ContentControls {
    align?: 'left' | 'center' | 'right';
    fontSize?: string;
    color?: string;
}

interface FeatureItem {
    title: string;
    description: string;
    icon?: string;
    link?: string;
}

interface FeaturesSectionProps {
    section: {
        title: string;
        subtitle?: string;
        itemsPerRow?: number; // 2 to 5
        bgStyle?: BgStyle;
        bgColor?: string; // e.g. rgba()
        titleControls?: TitleControls;
        contentControls?: ContentControls;
        features: FeatureItem[];
        backgroundImageUrl?: string;
    };
}

const bgStyleClasses: Record<BgStyle, string> = {
    light: 'bg-white text-gray-900',
    dark: 'bg-gray-900 text-white',
    gradient: 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white',
    image: '', // handled with inline styles
    color: '', // handled with inline styles
};

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ section }) => {
    const {
        title,
        subtitle,
        itemsPerRow = 4,
        bgStyle = 'light',
        bgColor,
        titleControls,
        contentControls,
        features,
        backgroundImageUrl,
    } = section;

    // Clamp itemsPerRow between 2 and 5
    const validItemsPerRow = Math.min(Math.max(itemsPerRow, 2), 5);

    // Grid cols class for Tailwind
    const gridColsClass = {
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5',
    }[validItemsPerRow];

    // Title alignment class
    const titleAlignClass =
        titleControls?.align === 'left'
            ? 'text-left'
            : titleControls?.align === 'right'
                ? 'text-right'
                : 'text-center';

    // Content alignment class
    const contentAlignClass =
        contentControls?.align === 'left'
            ? 'text-left'
            : contentControls?.align === 'right'
                ? 'text-right'
                : 'text-center';

    // Title font size class fallback
    const titleFontSizeClass = titleControls?.fontSize || 'text-3xl';

    // Content font size class fallback
    const contentFontSizeClass = contentControls?.fontSize || 'text-base';

    // Inline color styles
    const titleStyle = titleControls?.color ? { color: titleControls.color } : undefined;
    const contentStyle = contentControls?.color ? { color: contentControls.color } : undefined;

    // Background inline styles for color or image
    const backgroundStyle =
        bgStyle === 'color'
            ? { backgroundColor: bgColor }
            : bgStyle === 'image' && backgroundImageUrl
                ? {
                    backgroundImage: `url(${backgroundImageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }
                : {};

    return (
        <section
            className={`py-16 px-6 ${bgStyle !== 'color' && bgStyle !== 'image' ? bgStyleClasses[bgStyle] : ''
                }`}
            style={backgroundStyle}
        >
            <div className="max-w-7xl mx-auto">
                {/* Title */}
                <h2
                    className={`${titleFontSizeClass} font-bold mb-4 ${titleAlignClass}`}
                    style={titleStyle}
                >
                    {title}
                </h2>

                {/* Subtitle */}
                {subtitle && (
                    <p
                        className={`${contentFontSizeClass} mb-12 max-w-3xl mx-auto ${contentAlignClass}`}
                        style={contentStyle}
                    >
                        {subtitle}
                    </p>
                )}

                {/* Features Grid */}
                <div className={`grid gap-8 ${gridColsClass} sm:grid-cols-2`}>
                    {features.map(({ title, description, icon, link }, idx) => (
                        <div
                            key={idx}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md flex flex-col"
                        >
                            {icon && (
                                <img
                                    src={icon}
                                    alt={title}
                                    className="w-16 h-16 object-contain mb-4 mx-auto"
                                    loading="lazy"
                                />
                            )}
                            <h3 className="font-semibold text-lg mb-2 text-center">{title}</h3>
                            <div className="prose prose-sm prose-indigo text-gray-700 flex-grow overflow-hidden break-words">
                                <ReactMarkdown>{description}</ReactMarkdown>
                            </div>
                            {link && (
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 text-indigo-600 hover:text-indigo-800 text-center underline"
                                >
                                    Learn more
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
