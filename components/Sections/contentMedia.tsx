import React, { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import Button, { ButtonProps } from '../widgets/Button';

interface ControlSettings {
    align?: 'left' | 'center' | 'right';
    fontSize?: string;
    color?: string;
}

interface MediaItem {
    file: string;
    alt?: string;
}

interface Section {
    layout: 'imageLeft' | 'imageRight' | 'imageBottom' | 'imageTop' | 'imageBackground';
    bgColor?: string;
    title: string;
    content: string;
    buttons?: ButtonProps;
    mediaItems?: MediaItem[];
    titleControls?: ControlSettings;
    contentControls?: ControlSettings;
    ctaControls?: ControlSettings;
}

// Utility functions remain same...
function getTextAlignClass(align?: string) {
    if (align === 'left') return 'text-left';
    if (align === 'right') return 'text-right';
    return 'text-center';
}

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
        buttons,
        mediaItems = [],
        titleControls,
        contentControls,
        bgColor,
        layout,
    } = section;

    const flexDirectionClass =
        layout === 'imageRight'
            ? 'md:flex-row-reverse'
            : layout === 'imageBottom'
                ? 'flex-col-reverse'
                : layout === 'imageTop'
                    ? 'flex-col'
                    : 'md:flex-row';

    const hasBgImage = layout === 'imageBackground' && mediaItems.length > 0;

    const [currentIndex, setCurrentIndex] = useState(0);
    const showArrows = mediaItems.length > 1;

    const mediaRef = useRef<HTMLDivElement | null>(null);
    const textRef = useRef<HTMLDivElement | null>(null);
    const [maxTextHeight, setMaxTextHeight] = useState<number | undefined>(undefined);

    /** Function to recalc height after image load or resize */
    const recalcHeights = useCallback(() => {
        if (mediaRef.current) {
            setMaxTextHeight(mediaRef.current.clientHeight);
        }
    }, []);

    // Recalculate on resize
    useEffect(() => {
        window.addEventListener('resize', recalcHeights);
        return () => window.removeEventListener('resize', recalcHeights);
    }, [recalcHeights]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
    };

    return (
        <section
            className="w-full max-w-12xl mx-auto py-8 relative"
            style={hasBgImage ? {} : { backgroundColor: bgColor }}
        >
            {/* Background Image */}
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
                        style={{
                            backgroundColor: bgColor || 'rgba(0,0,0,0.5)',
                            mixBlendMode: 'multiply',
                        }}
                    />
                </div>
            )}

            <div className={`max-w-fit mx-auto flex flex-col items-center gap-8 px-4 md:px-8 ${flexDirectionClass}`}>
                {/* Media Column */}
                {!hasBgImage && mediaItems.length > 0 && (
                    <div
                        ref={mediaRef}
                        className="relative w-full md:w-1/2 max-w-xl rounded-xl overflow-hidden"
                    >
                        <Image
                            src={`/${mediaItems[currentIndex].file}`}
                            alt={mediaItems[currentIndex].alt || `Image ${currentIndex + 1}`}
                            layout="responsive"
                            width={640}
                            height={360}
                            objectFit="cover"
                            className="rounded-xl"
                            onLoadingComplete={recalcHeights} // recalc after load
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

                {/* Text Content Column */}
                <div
                    ref={textRef}
                    className={`w-full md:w-1/2 max-w-4xl space-y-6 ${maxTextHeight ? 'overflow-auto' : 'overflow-visible'}`}
                    style={{
                        maxHeight: maxTextHeight, // match image height
                    }}
                >
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
                        }}
                    >
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </div>

                    {buttons?.text && buttons?.link && (
                        <div className={getTextAlignClass(contentControls?.align)}>
                            <Button {...buttons} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContentMediaSection;
