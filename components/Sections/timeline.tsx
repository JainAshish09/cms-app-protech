import React from 'react';
import Image from 'next/image';

const TimelineSection = ({ section }: { section: any }) => {
    const titleStyle = {
        textAlign: section.titleAlign || 'center',
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
        <section className="w-full py-16 bg-[#F7FAFC]">
            <div className="container mx-auto">
                <h2 style={titleStyle} className="text-2xl md:text-3xl font-bold mb-10">{section.title}</h2>
                <div className="flex flex-col gap-8 max-w-2xl mx-auto">
                    {section.events?.map((event: any, i: number) => (
                        <div key={i} className="flex items-start gap-4">
                            {event.image && <div className="relative w-20 h-20 flex-shrink-0"><Image src={`/${event.image}`} alt={event.title} layout="fill" objectFit="cover" className="rounded-lg" /></div>}
                            <div>
                                <div className="text-blue-700 font-bold mb-1">{event.date}</div>
                                <div className="font-semibold text-lg mb-1">{event.title}</div>
                                <div className="text-gray-700" style={contentStyle} dangerouslySetInnerHTML={{ __html: event.content }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TimelineSection;
