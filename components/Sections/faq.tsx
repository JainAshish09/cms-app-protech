import React from 'react';

function getTextStyle(controls: any) {
    return {
        textAlign: controls?.align || undefined,
        fontSize: controls?.fontSize || undefined,
        color: controls?.color || undefined,
    };
}

const FaqSection = ({ section }: { section: any }) => {
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
            <div className="container mx-auto max-w-3xl">
                <h2 style={titleStyle} className="text-2xl md:text-3xl font-bold mb-10">{section.title}</h2>
                <div className="space-y-4">
                    {section.questions?.map((q: any, i: number) => (
                        <details key={i} className="bg-white rounded-lg shadow p-4">
                            <summary className="font-semibold cursor-pointer text-blue-700" style={contentStyle}>{q.question}</summary>
                            <div className="mt-2 text-gray-700" dangerouslySetInnerHTML={{ __html: q.answer }} />
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FaqSection;
