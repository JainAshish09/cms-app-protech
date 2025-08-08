import React from 'react';
import Image from 'next/image';

const SimpleSlider = ({ children }: { children: React.ReactNode }) => {
    const [idx, setIdx] = React.useState(0);
    const count = React.Children.count(children);
    if (count <= 1) return <>{children}</>;
    return (
        <div className="relative w-full flex flex-col items-center">
            <div className="w-full flex justify-center">{React.Children.toArray(children)[idx]}</div>
            <div className="flex gap-2 mt-4">
                {Array.from({ length: count }).map((_, i) => (
                    <button
                        key={i}
                        className={`w-3 h-3 rounded-full ${i === idx ? 'bg-blue-600' : 'bg-gray-300'}`}
                        onClick={() => setIdx(i)}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

const TestimonialsSection = ({ section }: { section: any }) => {
    let layout = section.layout || 'grid';
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
    if (layout === 'slider') {
        return (
            <section className="w-full py-16 bg-gradient-to-b from-white to-[#F7FAFC]">
                <div className="container mx-auto">
                    <h2 style={titleStyle}>{section.title}</h2>
                    <SimpleSlider>
                        {section.testimonials?.map((t: any, i: number) => (
                            <div key={i} className="bg-white rounded-xl shadow-md p-8 max-w-md flex flex-col items-center border border-gray-100 mx-auto">
                                <blockquote className="italic mb-2 text-gray-700 text-center">“{t.content}”</blockquote>
                                <div className="font-bold text-blue-700 text-center">{t.author}</div>
                                {section.showRatings && t.rating && <div className="text-yellow-400 mt-2 text-center">{'★'.repeat(t.rating)}</div>}
                            </div>
                        ))}
                    </SimpleSlider>
                </div>
            </section>
        );
    }
    // grid or masonry
    let gridClass = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
    if (layout === 'masonry') gridClass = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    return (
        <section className="w-full py-16 bg-gradient-to-b from-white to-[#F7FAFC]">
            <div className="container mx-auto">
                <h2 style={titleStyle}>{section.title}</h2>
                <div className={`grid gap-8 ${gridClass}`}>
                    {section.testimonials?.map((t: any, i: number) => (
                        <div key={i} className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center border border-gray-100">
                            <blockquote className="italic mb-2 text-gray-700 text-center">“{t.content}”</blockquote>
                            <div className="font-bold text-blue-700 text-center">{t.author}</div>
                            {section.showRatings && t.rating && <div className="text-yellow-400 mt-2 text-center">{'★'.repeat(t.rating)}</div>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
