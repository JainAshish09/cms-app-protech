import React from 'react';

const RichTextSection = ({ section }: { section: any }) => {
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
        <section
            className={`w-full py-8 ${section.fontSize || ''}`}
            style={{ background: section.bgColor, color: section.textColor, ...((section.customCss && section.customCss.length > 0) ? { cssText: section.customCss } : {}) }}
        >
            <div className="container mx-auto">
                {section.title && <h2 style={titleStyle}>{section.title}</h2>}
                <div className="prose max-w-3xl mx-auto" style={contentStyle} dangerouslySetInnerHTML={{ __html: section.content }} />
            </div>
        </section>
    );
};

export default RichTextSection;
