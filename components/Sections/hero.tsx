import React from 'react';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface ImageType {
    image: string;
    alt?: string;
}

interface ButtonType {
    text: string;
    link: string;
    style: 'primary' | 'secondary' | 'outline';
}

interface TextSettings {
    fontSize: string;
    textColor?: string;
}

interface HeroSectionProps {
    section: {
        type: string;
        style?: 'centered' | 'split' | 'fullscreen';
        title: string;
        content: string;
        bgColor?: string;
        images?: ImageType[];
        buttons?: ButtonType[];
        titleTextSettings?: TextSettings;
        contentTextSettings?: TextSettings;
        customCss?: string;
    };
    sectionStyle?: React.CSSProperties;
}

// Helper to ensure image path starts with '/'
function formatImageSrc(src: string) {
    if (!src) return '';
    return src.startsWith('/') || src.startsWith('http') ? src : `/${src}`;
}

const renderButtons = (buttons: ButtonType[]) => {
    return (
        <div className="flex gap-4 flex-wrap justify-center mt-6">
            {buttons.map((btn, i) => {
                let btnClass = 'px-6 py-3 rounded font-semibold transition ';
                switch (btn.style) {
                    case 'primary':
                        btnClass += 'bg-blue-600 text-white hover:bg-blue-700';
                        break;
                    case 'secondary':
                        btnClass += 'bg-gray-200 text-gray-900 hover:bg-gray-300';
                        break;
                    case 'outline':
                        btnClass += 'border border-gray-800 text-gray-800 hover:bg-gray-100';
                        break;
                    default:
                        btnClass += 'bg-blue-600 text-white';
                }
                return (
                    <a
                        key={i}
                        href={btn.link}
                        className={btnClass}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {btn.text}
                    </a>
                );
            })}
        </div>
    );
};

const HeroSection: React.FC<HeroSectionProps> = ({ section, sectionStyle }) => {
    const layoutClass =
        section.style === 'split'
            ? 'md:flex-row'
            : section.style === 'fullscreen'
                ? 'min-h-[70vh]'
                : '';

    return (
        <section
            className={`w-full pt-20 md:pt-32 pb-5 flex flex-col items-center justify-center relative overflow-hidden ${layoutClass} ${section.customCss || ''
                }`}
            style={{ backgroundColor: section.bgColor || undefined, ...sectionStyle }}
        >
            <div className="max-w-5xl w-full flex flex-col items-center z-10 px-4 md:px-0">
                {/* Title */}
                <h1
                    className={`mb-4 text-center leading-tight drop-shadow-lg ${section.titleTextSettings?.fontSize || 'text-3xl'
                        } font-bold`}
                    style={{ color: section.titleTextSettings?.textColor || undefined }}
                >
                    {section.title}
                </h1>

                {/* Content */}
                <div
                    className={`prose md:prose-lg text-center max-w-2xl ${section.contentTextSettings?.fontSize || 'text-base'
                        }`}
                    style={{ color: section.contentTextSettings?.textColor || undefined }}
                    dangerouslySetInnerHTML={{ __html: section.content }}
                />

                {/* Images Carousel */}
                {section.images && section.images.length > 0 && (
                    <div className="w-full max-w-5xl mt-8">
                        <Carousel
                            showThumbs={false}
                            infiniteLoop
                            autoPlay
                            interval={3000}
                            transitionTime={500}
                            showStatus={false}
                            swipeable
                            emulateTouch
                            showArrows
                            dynamicHeight={false}
                            className="rounded-2xl overflow-hidden shadow-lg"
                        >
                            {section.images.map((img, i) => (
                                <div
                                    key={i}
                                    className="relative w-full h-[200px] md:h-[400px]"
                                    style={{ position: 'relative' }}
                                >
                                    <Image
                                        src={formatImageSrc(img.image)}
                                        alt={img.alt || 'Hero Image'}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-2xl"
                                        priority={i === 0} // preload first image
                                    />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                )}

                {/* Buttons */}
                {section.buttons && renderButtons(section.buttons)}
            </div>
        </section>
    );
};

export default HeroSection;
