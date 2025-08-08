import React from 'react';
import Image from 'next/image';

const ContentMediaSection = ({ section }: { section: any }) => {
    let flexClass = 'flex-col md:flex-row';
    if (section.layout === 'imageRight') flexClass = 'flex-col md:flex-row-reverse';
    if (section.layout === 'imageTop') flexClass = 'flex-col';
    if (section.layout === 'imageBottom') flexClass = 'flex-col-reverse';
    if (section.layout === 'imageBackground') flexClass = 'relative flex-col justify-center items-center';

    const titleStyle = {
        textAlign: section.titleAlign || 'left',
        color: section.titleColor,
        fontSize: section.titleFontSize,
        ...section.titleStyle,
    };
    const contentStyle = {
        textAlign: section.contentAlign || 'left',
        color: section.contentColor,
        fontSize: section.contentFontSize,
        ...section.contentStyle,
    };

    return (
        <section className={`w-full py-16`}>
            <div className={`max-w-7xl mx-auto flex ${flexClass} items-center gap-10 px-4 md:px-8`}>
                {section.layout === 'imageBackground' ? (
                    <>
                        {section.mediaItems?.[0]?.file && (
                            <div className="absolute inset-0 z-0">
                                <Image src={`/${section.mediaItems[0].file}`} alt={section.mediaItems[0].alt || 'Background'} layout="fill" objectFit="cover" className="opacity-30" />
                            </div>
                        )}
                        <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-center gap-10 py-10">
                            <div className="flex-1 max-w-xl">
                                <h2 style={titleStyle}>{section.title}</h2>
                                <div style={contentStyle} dangerouslySetInnerHTML={{ __html: section.content }} />
                                {section.cta && <a href={section.cta.link} className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition">{section.cta.text}</a>}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {section.mediaType === 'image' && section.mediaItems?.[0]?.file && (
                            <div className="flex-1 flex justify-center">
                                <div className="relative w-[320px] h-[200px] rounded-xl shadow overflow-hidden">
                                    <Image src={`/${section.mediaItems[0].file}`} alt={section.mediaItems[0].alt || 'Section Image'} layout="fill" objectFit="cover" className="rounded-xl" />
                                </div>
                            </div>
                        )}
                        <div className="flex-1 max-w-xl">
                            <h2 style={titleStyle}>{section.title}</h2>
                            <div style={contentStyle} dangerouslySetInnerHTML={{ __html: section.content }} />
                            {section.cta && <a href={section.cta.link} className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition">{section.cta.text}</a>}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default ContentMediaSection;
