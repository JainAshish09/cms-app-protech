import React from 'react';

const CTASection = ({ section, renderButtons }: { section: any, renderButtons: (buttons: any[]) => JSX.Element }) => {
    const titleStyle = {
        textAlign: section.titleAlign || 'center',
        color: section.titleColor,
        fontSize: section.titleFontSize,
        ...section.titleStyle,
    };
    const contentStyle = {
        textAlign: section.contentAlign || 'center',
        color: section.contentColor,
        fontSize: section.contentFontSize,
        ...section.contentStyle,
    };
    return (
        <section className="w-full py-16">
            <div className="container mx-auto flex flex-col items-center justify-center text-center">
                <h2 style={titleStyle} className="text-2xl md:text-3xl font-bold mb-4">{section.title}</h2>
                <div style={contentStyle} className="prose md:prose-lg mb-6" dangerouslySetInnerHTML={{ __html: section.content }} />
                {section.buttons && renderButtons(section.buttons)}
            </div>
        </section>
    );
};

export default CTASection;
