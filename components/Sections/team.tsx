import React from 'react';
import Image from 'next/image';

const TeamSection = ({ section }: { section: any }) => {
    let gridClass = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4';
    if (section.layout === 'list') gridClass = 'grid-cols-1';
    if (section.layout === 'carousel') gridClass = 'grid-cols-1';
    return (
        <section className="w-full py-16 bg-white">
            <div className="container mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">{section.title}</h2>
                <div className={`grid gap-8 ${gridClass}`}>
                    {section.members?.map((member: any, i: number) => (
                        <div key={i} className="bg-[#F7FAFC] rounded-xl shadow-lg p-8 flex flex-col items-center">
                            {member.image && <div className="relative w-24 h-24 mb-4"><Image src={`/${member.image}`} alt={member.name} layout="fill" objectFit="cover" className="rounded-full" /></div>}
                            <h3 className="font-bold text-lg mb-1 text-center text-gray-800">{member.name}</h3>
                            <div className="text-blue-600 mb-2">{member.position}</div>
                            {member.bio && <div className="text-gray-600 mb-2 text-center" dangerouslySetInnerHTML={{ __html: member.bio }} />}
                            {member.social && <div className="flex gap-2 mt-2">{member.social.map((s: any, j: number) => <a key={j} href={s.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{s.platform}</a>)}</div>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
