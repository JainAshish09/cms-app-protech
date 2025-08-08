import React from 'react';
import Image from 'next/image';

const AlertSection = ({ section }: { section: any }) => (
    <section className="w-full py-4" style={{ background: section.bgColor, color: section.textColor }}>
        <div className={`container mx-auto flex items-center gap-4 ${section.fontSize || ''}`}>
            {section.icon && <Image src={`/${section.icon}`} alt="alert" width={32} height={32} />}
            <div className="prose" dangerouslySetInnerHTML={{ __html: section.message }} />
        </div>
    </section>
);

export default AlertSection;
