import React from 'react';

const RichTextSection = ({ section }: { section: any }) => (
    <section
        className={`w-full py-8 ${section.fontSize || ''}`}
        style={{ background: section.bgColor, color: section.textColor, ...((section.customCss && section.customCss.length > 0) ? { cssText: section.customCss } : {}) }}
    >
        <div className="container mx-auto">
            <div className="prose max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: section.content }} />
        </div>
    </section>
);

export default RichTextSection;
