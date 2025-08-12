import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

type BgStyle = 'light' | 'dark' | 'gradient' | 'image' | 'color';

interface TitleControls {
    align?: 'left' | 'center' | 'right';
    fontSize?: string;
    color?: string;
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
    link?: string; // CMS has it, but not used
}

interface FeaturesSectionProps {
    section: {
        title: string;
        subtitle?: string;
        itemsPerRow?: number;
        bgStyle?: BgStyle;
        bgColor?: string;
        backgroundImageUrl?: string;
        titleControls?: TitleControls;
        contentControls?: ContentControls;
        features: FeatureItem[];
    };
}

const bgStyleClasses: Record<BgStyle, string> = {
    light: 'bg-white text-gray-900',
    dark: 'bg-gray-900 text-white',
    gradient: 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white',
    image: '',
    color: '',
};

const gridColumnMap: Record<number, string> = {
    2: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-5',
};

// Generate inline styles for fontSize (if numeric px) and color
function getStyleOverride(fontSize?: string, color?: string): React.CSSProperties {
    const style: React.CSSProperties = {};
    if (fontSize && !fontSize.startsWith('text-') && !isNaN(Number(fontSize))) {
        style.fontSize = `${fontSize}px`;
    }
    if (color) {
        style.color = color;
    }
    return style;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ section }) => {
    const {
        title,
        subtitle,
        itemsPerRow = 4,
        bgStyle = 'light',
        bgColor,
        backgroundImageUrl,
        titleControls,
        contentControls,
        features,
    } = section;

    const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);

    const toggleExpand = (index: number) => {
        setExpandedIndexes((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const isExpanded = (index: number) => expandedIndexes.includes(index);

    const columns = Math.min(Math.max(itemsPerRow, 2), 5);
    const gridColsClass = gridColumnMap[columns] ?? gridColumnMap[4];

    // Text alignment
    const titleAlignClass =
        titleControls?.align === 'left' ? 'text-left'
            : titleControls?.align === 'right' ? 'text-right'
                : 'text-center';

    const contentAlignClass =
        contentControls?.align === 'left' ? 'text-left'
            : contentControls?.align === 'right' ? 'text-right'
                : 'text-center';

    // Font sizes with fallback
    const titleFontSize = titleControls?.fontSize;
    const numericValue = parseInt(titleFontSize || '', 10);
    const titleFontSizeClass = numericValue && !isNaN(numericValue) && numericValue > 0
        ? `text-[${numericValue}px]`
        : 'text-[20px]';

    const contentFontSizeClass = contentControls?.fontSize || 'text-base';

    const titleStyle = titleControls?.color ? { color: titleControls.color } : {};
    const contentStyle = contentControls?.color ? { color: contentControls.color } : {};

    const backgroundStyle =
        bgStyle === 'color'
            ? { backgroundColor: bgColor }
            : bgStyle === 'image' && backgroundImageUrl
                ? {
                    backgroundImage: `url(${backgroundImageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }
                : {};

    const titleInlineStyle = getStyleOverride(
        section.titleControls?.fontSize,
        section.titleControls?.color
    );

    return (
        <section
            className={`py-16 px-6 ${bgStyle !== 'color' && bgStyle !== 'image' ? bgStyleClasses[bgStyle] : ''}`}
            style={backgroundStyle}
        >
            <div className="max-w-9xl mx-auto">
                <h1
                    className={`font-bold w-full mb-4 ${titleAlignClass} ${titleFontSizeClass}`}
                    style={titleInlineStyle}
                >
                    {section.title}
                </h1>

                {subtitle && (
                    <p
                        className={`mb-12 max-w-3xl mx-auto ${contentFontSizeClass} ${contentAlignClass}`}
                        style={contentStyle}
                    >
                        {subtitle}
                    </p>
                )}

                <div className={`grid gap-8 ${gridColsClass}`}>
                    {features?.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-6 border border-[#D8E5EF] flex flex-col items-center text-center"
                        >
                            {feature.icon && (
                                <img
                                    src={feature.icon}
                                    alt={feature.title}
                                    className="w-12 h-12 object-contain mb-2"
                                    loading="lazy"
                                />
                            )}

                            {feature.title && feature.title.trim() === '' ? null : (
                                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                            )}

                            <div className="text-gray-700 text-sm w-full break-words">
                                <div
                                    className={`transition-all duration-300 ease-in-out ${isExpanded(index) ? '' : 'line-clamp-2'
                                        } whitespace-pre-wrap break-words`}
                                >
                                    <ReactMarkdown
                                        components={{
                                            a: ({ node, ...props }) => <span {...props} />, // Remove actual links
                                        }}
                                    >
                                        {feature.description}
                                    </ReactMarkdown>
                                </div>

                                {feature.description.length > 100 && (
                                    <button
                                        className="text-indigo-600 mt-2 text-sm font-medium focus:outline-none"
                                        onClick={() => toggleExpand(index)}
                                    >
                                        {isExpanded(index) ? 'Show less' : 'Read more'}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
