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

    // Clamp to range between 2 and 5
    const columns = Math.min(Math.max(itemsPerRow, 2), 5);

    // Tailwind grid class
    const gridColsClass = `grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns}`;

    // Title alignment, font size, and color
    const titleAlignClass = titleControls?.align === 'left' ? 'text-left'
        : titleControls?.align === 'right' ? 'text-right'
            : 'text-center';

    const contentAlignClass = contentControls?.align === 'left' ? 'text-left'
        : contentControls?.align === 'right' ? 'text-right'
            : 'text-center';

    const titleFontSizeClass = titleControls?.fontSize || 'text-3xl';
    const contentFontSizeClass = contentControls?.fontSize || 'text-base';

    const titleStyle = titleControls?.color ? { color: titleControls.color } : {};
    const contentStyle = contentControls?.color ? { color: contentControls.color } : {};

    const backgroundStyle =
        bgStyle === 'color' ? { backgroundColor: bgColor } :
            bgStyle === 'image' && backgroundImageUrl
                ? {
                    backgroundImage: `url(${backgroundImageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }
                : {};

    return (
        <section
            className={`py-16 px-6 ${bgStyle !== 'color' && bgStyle !== 'image' ? bgStyleClasses[bgStyle] : ''}`}
            style={backgroundStyle}
        >
            <div className="max-w-7xl mx-auto">
                <h2
                    className={`font-bold mb-4 ${titleFontSizeClass} ${titleAlignClass}`}
                    style={titleStyle}
                >
                    {title}
                </h2>

                {subtitle && (
                    <p
                        className={`mb-12 max-w-3xl mx-auto ${contentFontSizeClass} ${contentAlignClass}`}
                        style={contentStyle}
                    >
                        {subtitle}
                    </p>
                )}

                <div className={`grid gap-8 ${gridColsClass}`}>
                    {features != null && features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-6  border border-[#D8E5EF] flex flex-col items-center text-center"
                        >
                            {feature.icon && (
                                <img
                                    src={feature.icon}
                                    alt={feature.title}
                                    className="w-12 h-12 object-contain mb-4"
                                    loading="lazy"
                                />
                            )}

                            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>

                            <div className="text-gray-700 text-sm w-full break-words">
                                <div
                                    className={`transition-all duration-300 ease-in-out ${isExpanded(index) ? '' : 'line-clamp-2'
                                        } whitespace-pre-wrap break-words`}
                                    style={{ wordBreak: 'break-word' }}
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
