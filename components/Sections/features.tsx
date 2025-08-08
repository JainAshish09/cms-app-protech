import React from 'react';
import Image from 'next/image';

interface ControlSettings {
    align?: 'left' | 'center' | 'right';
    fontSize?: string; // e.g. 'text-lg' or pixel value like '20'
    color?: string;
}

interface FeatureItem {
    title: string;
    description?: string; // HTML string (converted from Markdown)
    icon: string; // image path or URL
    link?: string;
}

interface FeaturesSectionData {
    type: 'features';
    title: string;
    subtitle?: string;
    layout: 'grid' | 'list' | 'columns';
    itemsPerRow: number;
    bgStyle: 'light' | 'dark' | 'gradient' | 'image' | 'color';
    bgColor?: string; // Used only if bgStyle === 'color'
    titleControls?: ControlSettings;
    contentControls?: ControlSettings;
    titleStyle?: React.CSSProperties;    // optional inline style overrides
    contentStyle?: React.CSSProperties;  // optional inline style overrides
    features?: FeatureItem[];
    [key: string]: any;
}

interface FeaturesSectionProps {
    section: FeaturesSectionData;
}

// Map CMS align to Tailwind alignment classes
function getTextAlignClass(align?: string) {
    if (align === 'left') return 'text-left';
    if (align === 'right') return 'text-right';
    return 'text-center';
}

// Return Tailwind font size class if valid
function getFontSizeClass(fontSize?: string) {
    if (!fontSize) return '';
    if (fontSize.startsWith('text-')) return fontSize;
    return '';
}

// Generate inline style for pixel font size and color
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
    // Determine grid columns based on layout and itemsPerRow with safety limits
    let gridClass = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4';

    if (section.layout === 'columns' && section.itemsPerRow) {
        const cols = Math.min(Math.max(section.itemsPerRow, 2), 6);
        gridClass = `grid-cols-1 sm:grid-cols-2 md:grid-cols-${cols}`;
    } else if (section.layout === 'list') {
        gridClass = 'grid-cols-1';
    } else if (section.layout === 'grid') {
        gridClass = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4';
    }

    // Compose title styles and classes
    const titleAlignClass = getTextAlignClass(section.titleControls?.align);
    const titleFontSizeClass = getFontSizeClass(section.titleControls?.fontSize);
    const titleInlineStyle = {
        ...getStyleOverride(
            section.titleControls?.fontSize,
            section.titleControls?.color
        ),
        ...section.titleStyle,
    };

    // Compose content styles and classes (for subtitle)
    const contentAlignClass = getTextAlignClass(section.contentControls?.align);
    const contentFontSizeClass = getFontSizeClass(section.contentControls?.fontSize);
    const contentInlineStyle = {
        ...getStyleOverride(
            section.contentControls?.fontSize,
            section.contentControls?.color
        ),
        ...section.contentStyle,
    };

    // Background styles handling
    const isColorBg = section.bgStyle === 'color';

    const bgStyleClassMap: Record<string, string> = {
        light: 'bg-white',
        dark: 'bg-gray-900 text-white',
        gradient: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white',
        image: '',
    };

    const bgClass = !isColorBg ? (bgStyleClassMap[section.bgStyle] || 'bg-white') : '';
    const bgColorStyle = isColorBg && section.bgColor ? { backgroundColor: section.bgColor } : {};

    return (
        <section
            className={`w-full py-16 ${bgClass}`}
            style={{ ...bgColorStyle }}
        >
            <div className="container mx-auto px-4">
                {/* Title */}
                <h2
                    className={`font-bold mb-2 ${titleAlignClass} ${titleFontSizeClass}`}
                    style={titleInlineStyle}
                >
                    {section.title}
                </h2>

                {/* Subtitle */}
                {section.subtitle && (
                    <p
                        className={`mb-8 ${contentAlignClass} ${contentFontSizeClass}`}
                        style={contentInlineStyle}
                    >
                        {section.subtitle}
                    </p>
                )}

                {/* Features Grid/List */}
                <div className={`grid gap-8 ${gridClass}`}>
                    {section.features?.map((feature, i) => (
                        <div
                            key={i}
                            className={`flex flex-col ${section.layout === 'list' ? 'items-start text-left' : 'items-center text-center'
                                } p-6 bg-[#F7FAFC] rounded-xl shadow hover:shadow-lg transition-all`}
                        >
                            <div className="mb-4 relative w-16 h-16">
                                <Image
                                    src={feature.icon.startsWith('http') ? feature.icon : `/${feature.icon}`}
                                    alt={feature.title}
                                    layout="fill"
                                    objectFit="contain"
                                    priority={false}
                                />
                            </div>

                            <p className="font-semibold text-base md:text-lg text-gray-800 mb-2">
                                {feature.title}
                            </p>

                            {feature.description && (
                                <div
                                    className="text-gray-600 mb-4"
                                    dangerouslySetInnerHTML={{ __html: feature.description }}
                                />
                            )}

                            {feature.link && (
                                <a
                                    href={feature.link}
                                    className="text-blue-600 underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
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
