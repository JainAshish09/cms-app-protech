import React from 'react';
import Image from 'next/image';

function getTextStyle(controls: any) {
    return {
        textAlign: controls?.align || undefined,
        fontSize: controls?.fontSize || undefined,
        color: controls?.color || undefined,
    };
}

const CardsSection = ({ section }: { section: any }) => {
    let gridClass = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
    if (section.style === 'masonry') gridClass = 'md:grid-cols-3';
    if (section.style === 'carousel') gridClass = 'grid-cols-1';
    if (section.cardsPerRow) gridClass = `grid-cols-1 sm:grid-cols-2 md:grid-cols-${section.cardsPerRow}`;

    // Use controls from CMS config
    const titleStyle = {
        ...getTextStyle(section.titleControls),
        ...section.titleStyle,
    };
    const contentStyle = {
        ...getTextStyle(section.contentControls),
        ...section.contentStyle,
    };

    return (
        <section className="w-full py-16 bg-[#F7FAFC]">
            <div className="container mx-auto">
                <h2 style={titleStyle} className="text-2xl md:text-3xl font-bold mb-10">{section.title}</h2>
                {section.subtitle && <p style={contentStyle} className="mb-10">{section.subtitle}</p>}
                <div className={`grid gap-8 ${gridClass}`}>
                    {section.cards?.map((card: any, i: number) => (
                        <div key={i} className={`bg-white rounded-xl shadow-lg p-8 flex flex-col items-center ${section.showBorder ? 'border border-gray-200' : ''} ${section.hoverEffect ? 'hover:scale-105 transition-transform' : ''}`}>
                            {card.image && <div className="relative w-full h-40 mb-4"><Image src={`/${card.image}`} alt={card.title} layout="fill" objectFit="cover" className="rounded-xl" /></div>}
                            <h3 className="font-bold text-lg mb-2 text-center text-gray-800">{card.title}</h3>
                            <div className="text-gray-600 mb-4 text-center" dangerouslySetInnerHTML={{ __html: card.content }} />
                            {card.buttonText && (
                                <a href={card.link || '#'} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-2 inline-block font-semibold shadow">{card.buttonText}</a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CardsSection;
