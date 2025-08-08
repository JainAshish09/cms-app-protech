import React from 'react';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ButtonGroup from '../widgets/ButtonGroup';

interface ImageType {
    image: string;
    alt?: string;
}

interface ButtonType {
    text: string;
    link: string;
    style: 'primary' | 'secondary' | 'outline';
}

interface HeroSectionProps {
    section: any;
    sectionStyle?: React.CSSProperties;
}

// Helper function to ensure image path starts with '/'
function formatImageSrc(src: string) {
    if (!src) return '';
    return src.startsWith('/') || src.startsWith('http') ? src : `/${src}`;
}

function getTextStyle(controls: any) {
    return {
        textAlign: controls?.align || undefined,
        fontSize: controls?.fontSize || undefined,
        color: controls?.color || undefined,
    };
}

const HeroSection: React.FC<HeroSectionProps> = ({ section, sectionStyle }) => {
    const layoutClass =
        section.style === 'split'
            ? 'md:flex-row'
            : section.style === 'fullscreen'
                ? 'min-h-[70vh]'
                : '';

    // Use controls from CMS config
    const titleStyle = {
        ...getTextStyle(section.titleControls),
        ...section.titleTextSettings,
    };
    const contentStyle = {
        ...getTextStyle(section.contentControls),
        ...section.contentTextSettings,
    };

    return (
        <section
            className={`w-full pt-20 md:pt-32 pb-5 flex flex-col items-center justify-center relative overflow-hidden ${layoutClass} ${section.customCss || ''}`}
            style={{ backgroundColor: section.bgColor || undefined, ...sectionStyle }}
        >
            <div className="max-w-5xl w-full flex flex-col items-center z-10 px-4 md:px-0">
                {/* Title */}
                <h1
                    className={`mb-4 leading-tight drop-shadow-lg font-bold`}
                    style={titleStyle}
                >
                    {section.title}
                </h1>

                {/* Content */}
                <div
                    className={`prose md:prose-lg max-w-2xl`}
                    style={contentStyle}
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
                            {section.images.map((img: ImageType, i: number) => (
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
                {section.buttons && <ButtonGroup buttons={section.buttons} />}
            </div>
        </section>
    );
};

export default HeroSection;
