import React from 'react';

const FaqSection = ({ section }: { section: any }) => (
    <section className="w-full py-16 bg-[#F7FAFC]">
        <div className="container mx-auto max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">{section.title}</h2>
            <div className="space-y-4">
                {section.questions?.map((q: any, i: number) => (
                    <details key={i} className="bg-white rounded-lg shadow p-4">
                        <summary className="font-semibold cursor-pointer text-blue-700">{q.question}</summary>
                        <div className="mt-2 text-gray-700" dangerouslySetInnerHTML={{ __html: q.answer }} />
                    </details>
                ))}
            </div>
        </div>
    </section>
);

export default FaqSection;
