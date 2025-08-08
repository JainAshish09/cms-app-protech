import React from 'react';

const DividerSection = ({ section }: { section: any }) => (
    <hr
        style={{
            borderStyle: section.style,
            borderColor: section.color || '#e5e7eb',
            borderWidth: section.thickness || 2,
            margin: '2rem 0',
        }}
    />
);

export default DividerSection;
