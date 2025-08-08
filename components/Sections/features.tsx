import React from 'react';
import Image from 'next/image';

function getTextStyle(controls: any) {
    return {
        textAlign: controls?.align || undefined,
        fontSize: controls?.fontSize || undefined,
        color: controls?.color || undefined,
    };
}

const FeaturesSection = ({ section }: { section: any }) => {
    let gridClass = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4';
    if (section.layout === 'columns' && section.itemsPerRow) gridClass = `grid-cols-1 sm:grid-cols-2 md:grid-cols-${section.itemsPerRow}`;
    if (section.layout === 'list') gridClass = 'grid-cols-1';

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
        <section className="w-full py-16">
            <div className="container mx-auto">
                <h2 style={titleStyle} className="text-2xl md:text-4xl font-bold mb-2">{section.title}</h2>
                {section.subtitle && <p style={contentStyle} className="text-lg mb-8">{section.subtitle}</p>}
                <div className={`grid gap-8 px-2 md:px-10 ${gridClass}`}>
                    {section.features?.map((feature: any, i: number) => (
                        <div key={i} className="flex flex-col items-center text-center p-6 bg-[#F7FAFC] rounded-xl shadow hover:shadow-lg transition-all">
                            <div className="mb-4"><Image src={`/${feature.icon}`} alt={feature.title} width={64} height={64} /></div>
                            <p className="font-semibold text-base md:text-lg text-gray-800">{feature.title}</p>
                            {feature.description && <div className="text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: feature.description }} />}
                            {feature.link && <a href={feature.link} className="text-blue-600 underline mt-2">Learn more</a>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
