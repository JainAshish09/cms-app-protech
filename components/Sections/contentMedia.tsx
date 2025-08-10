import React, { useState } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

interface ControlSettings {
    align?: 'left' | 'center' | 'right';
    fontSize?: string;   // e.g., "text-lg" or "48"
    color?: string;      // e.g., "#2912b5"
}

interface MediaItem {
    file: string;
    alt?: string;
}

interface CTA {
    text: string;
    link: string;
}

interface Section {
    layout: 'imageLeft' | 'imageRight' | 'imageBottom' | 'imageTop' | 'imageBackground';
    bgColor?: string;
    title: string;
    content: string;
    cta?: CTA;
    mediaItems?: MediaItem[];
    titleControls?: ControlSettings;
    contentControls?: ControlSettings;
    ctaControls?: ControlSettings;
}

// Utility to map align to tailwind class
function getTextAlignClass(align?: string) {
    if (align === 'left') return 'text-left';
    if (align === 'right') return 'text-right';
    return 'text-center'; // default
}

// Utility to get font size tailwind class if provided, else ''
function getFontSizeClass(fontSize?: string) {
    if (!fontSize) return '';
    if (fontSize.startsWith('text-')) return fontSize;
    return '';
}

// Utility to generate inline style for fontSize(px) and color
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

const ContentMediaSection: React.FC<{ section: Section }> = ({ section }) => {
    const {
        title,
        content,
        cta,
        mediaItems = [],
        titleControls,
        contentControls,
        ctaControls,
        bgColor,
        layout,
    } = section;

    // Determine layout flex classes
    const flexDirectionClass =
        layout === 'imageRight'
            ? 'md:flex-row-reverse'
            : layout === 'imageBottom'
                ? 'flex-col-reverse'
                : layout === 'imageTop'
                    ? 'flex-col'
                    : 'md:flex-row';

    const hasBgImage = layout === 'imageBackground' && mediaItems.length > 0;

    // Carousel index state
    const [currentIndex, setCurrentIndex] = useState(0);
    const showArrows = mediaItems.length > 1;

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
    };
    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
    };

    return (
        <section
            className={`w-full py-16 relative ${hasBgImage ? 'relative' : ''}`}
            style={hasBgImage ? {} : { backgroundColor: bgColor }}
        >
            {/* Background image */}
            {hasBgImage && (
                <div className="absolute inset-0 -z-10">
                    <Image
                        src={`/${mediaItems[0].file}`}
                        alt={mediaItems[0].alt || 'Background Image'}
                        layout="fill"
                        objectFit="cover"
                        priority
                    />
                    <div
                        className="absolute inset-0"
                        style={{ backgroundColor: bgColor || 'rgba(0,0,0,0.5)', mixBlendMode: 'multiply' }}
                    />
                </div>
            )}

            <div
                className={`max-w-7xl mx-auto flex flex-col items-center justify-between gap-8 px-4 md:px-8 ${flexDirectionClass}`}
            >
                {/* Media (except background image layout) */}
                {!hasBgImage && mediaItems.length > 0 && (
                    <div className="relative w-full md:w-1/2 max-w-xl rounded-xl shadow overflow-hidden">
                        <Image
                            src={`/${mediaItems[currentIndex].file}`}
                            alt={mediaItems[currentIndex].alt || `Image ${currentIndex + 1}`}
                            layout="responsive"
                            width={640}
                            height={360}
                            objectFit="cover"
                            className="rounded-xl"
                        />
                        {showArrows && (
                            <>
                                <button
                                    onClick={handlePrev}
                                    className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow z-10"
                                    aria-label="Previous image"
                                >
                                    &#8592;
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow z-10"
                                    aria-label="Next image"
                                >
                                    &#8594;
                                </button>
                            </>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="w-full md:w-1/2 max-w-xl space-y-6">
                    <h2
                        className={`font-bold drop-shadow-lg w-full ${getTextAlignClass(titleControls?.align)}`}
                        style={getStyleOverride(titleControls?.fontSize, titleControls?.color)}
                    >
                        {title}
                    </h2>
                    <div
                        className={`prose prose-blue max-w-none ${getTextAlignClass(contentControls?.align)}`}
                        style={{
                            ...getStyleOverride(contentControls?.fontSize, contentControls?.color),
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word',
                            whiteSpace: 'normal',
                            maxWidth: '100%',
                        }}
                    >
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </div>

                    {cta && (
                        <div className={getTextAlignClass(contentControls?.align)}>
                            <a
                                href={cta.link}
                                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
                                style={getStyleOverride(ctaControls?.fontSize, ctaControls?.color)}
                            >
                                {cta.text}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContentMediaSection;
