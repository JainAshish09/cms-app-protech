import React, { useState } from 'react';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ButtonGroup from '../widgets/ButtonGroup';
import ImageNavigationButtons from '../widgets/ImageNavigationButtons';

// ---------- TypeScript interfaces matching your CMS schema ----------

interface HeroSectionImage {
    image: string;
    alt?: string;
}

interface HeroSectionButton {
    text: string;
    link: string;
    style: 'primary' | 'secondary' | 'outline';
}

interface TextSettings {
    fontSize?: string;   // e.g., "text-3xl" or "50" (pixels)
    textColor?: string;  // e.g., "#182583"
}

interface ControlSettings {
    align?: 'left' | 'center' | 'right';
    fontSize?: string;   // e.g., "text-lg" or "48"
    color?: string;      // e.g., "#2912b5"
}

interface HeroSectionData {
    type: 'hero';
    style: 'centered' | 'split' | 'fullscreen';
    title: string;
    content: string; // Assumed HTML string already (converted markdown)
    bgColor?: string;
    images?: HeroSectionImage[];
    buttons?: HeroSectionButton[];
    titleControls?: ControlSettings;
    contentControls?: ControlSettings;
    titleTextSettings?: TextSettings;
    contentTextSettings?: TextSettings;
    customCss?: string;
    [key: string]: any;
}

interface HeroSectionProps {
    section: HeroSectionData;
    sectionStyle?: React.CSSProperties;
}

// ---------- Utility functions ----------

// Fix image src to have leading slash or absolute URL
function formatImageSrc(src: string) {
    if (!src) return '';
    return src.startsWith('/') || src.startsWith('http') ? src : `/${src}`;
}

// Map CMS align to Tailwind text-align class
function getTextAlignClass(align?: string) {
    if (align === 'left') return 'text-left';
    if (align === 'right') return 'text-right';
    return 'text-center';
}

// Return font size Tailwind class if applicable
function getFontSizeClass(fontSize?: string) {
    if (!fontSize) return '';
    if (fontSize.startsWith('text-')) return fontSize;
    return '';
}

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

// ---------- HeroSection component ----------

const HeroSection: React.FC<HeroSectionProps> = ({ section, sectionStyle }) => {
    // Compute classes and inline styles for title
    const titleAlignClass = getTextAlignClass(section.titleControls?.align);
    const titleFontSizeClass =
        getFontSizeClass(section.titleControls?.fontSize) || getFontSizeClass(section.titleTextSettings?.fontSize);
    const titleInlineStyle = getStyleOverride(
        section.titleControls?.fontSize || section.titleTextSettings?.fontSize,
        section.titleControls?.color || section.titleTextSettings?.textColor
    );

    // Inside HeroSection component
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleLeftClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? section.images!.length - 1 : prevIndex - 1));
    };

    const handleRightClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === section.images!.length - 1 ? 0 : prevIndex + 1));
    };


    // Compute classes and inline styles for content
    const contentAlignClass = getTextAlignClass(section.contentControls?.align);
    const contentFontSizeClass =
        getFontSizeClass(section.contentControls?.fontSize) || getFontSizeClass(section.contentTextSettings?.fontSize);
    const contentInlineStyle = getStyleOverride(
        section.contentControls?.fontSize || section.contentTextSettings?.fontSize,
        section.contentControls?.color || section.contentTextSettings?.textColor
    );

    // Layout style classes based on CMS style field
    const layoutClass =
        section.style === 'split' ? 'md:flex-row' : section.style === 'fullscreen' ? 'min-h-[70vh]' : '';

    return (
        <section
            className={`w-full max-w-9xl mx-auto pt-20 md:pt-28 pb-10 flex flex-col items-center justify-center relative overflow-hidden ${layoutClass} ${section.customCss ?? ''}`}
            style={{ backgroundColor: section.bgColor, ...sectionStyle, position: 'relative', zIndex: 3 }}
        >
            {/* Background Image Container */}
            <div
                className="absolute z-0 w-4/5 h-3/4"
                style={{
                    backgroundImage: `url(/images/gallery-bg-image.png)`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    bottom: 0,
                    left: 0,
                }}
            />

            <div className="max-w-5xl w-full flex flex-col items-center z-10 px-4 md:px-0">
                {/* Title */}
                <h1
                    className={`mb-4 leading-tight drop-shadow-lg font-bold w-full ${titleAlignClass} ${titleFontSizeClass}`}
                    style={titleInlineStyle}
                >
                    {section.title}
                </h1>

                {/* Content */}
                <div
                    className={`prose md:prose-lg max-w-2xl w-full ${contentAlignClass} ${contentFontSizeClass}`}
                    style={contentInlineStyle}
                    dangerouslySetInnerHTML={{ __html: section.content }}
                />

                {/* Images Carousel */}
                {section.images && section.images.length > 0 && (
                    <div className="w-full max-w-5xl mt-8">
                        <Carousel
                            selectedItem={currentIndex}
                            showThumbs={false}
                            infiniteLoop
                            autoPlay
                            interval={3000}
                            transitionTime={500}
                            showStatus={false}
                            swipeable
                            emulateTouch
                            showArrows={false}
                            dynamicHeight={false}
                            className="rounded-2xl overflow-hidden shadow-lg"
                        >
                            {section.images.map((img, i) => (
                                <div key={i} className="relative w-full h-[200px] md:h-[400px]">
                                    <Image
                                        src={formatImageSrc(img.image)}
                                        alt={img.alt || 'Hero Image'}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-2xl"
                                        priority={i === 0}
                                    />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                )}

                {/* Buttons */}
                {section.buttons && section.buttons.length > 0 && <ButtonGroup buttons={section.buttons} />}
            </div>
        </section>
    );
};

export default HeroSection;
