import React from 'react';

function getTextStyle(controls: any) {
    return {
        textAlign: controls?.align || undefined,
        fontSize: controls?.fontSize || undefined,
        color: controls?.color || undefined,
    };
}

const DividerSection = ({ section }: { section: any }) => (
    <>
        {section.title && (
            <div style={getTextStyle(section.titleControls)} className="mb-2 font-bold">
                {section.title}
            </div>
        )}
        <hr
            style={{
                borderStyle: section.style,
                borderColor: section.color || '#e5e7eb',
                borderWidth: section.thickness || 2,
                margin: '2rem 0',
            }}
        />
    </>
);

export default DividerSection;
