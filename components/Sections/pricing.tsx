import React from 'react';

const PricingSection = ({ section }: { section: any }) => {
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
        <section className="w-full py-16 bg-white">
            <div className="container mx-auto">
                <h2 style={titleStyle} className="text-2xl md:text-3xl font-bold mb-4">{section.title}</h2>
                {section.subtitle && <p style={contentStyle} className="text-lg mb-8">{section.subtitle}</p>}
                <div className="flex flex-wrap justify-center gap-8">
                    {section.plans?.map((plan: any, i: number) => (
                        <div key={i} className={`bg-[#F7FAFC] rounded-xl shadow-lg p-8 flex flex-col items-center border-2 ${plan.popular ? 'border-blue-600' : 'border-transparent'}`}>
                            <div className="font-bold text-xl mb-2">{plan.name}</div>
                            <div className="text-3xl font-bold text-blue-700 mb-2">{plan.currency}{plan.monthlyPrice} <span className="text-base font-normal">/mo</span></div>
                            {section.showPeriodToggle && <div className="text-gray-500 text-sm mb-2">or {plan.currency}{plan.annualPrice} /yr</div>}
                            <ul className="mb-4 list-disc list-inside text-gray-700">
                                {plan.features?.map((f: any, j: number) => <li key={j}>{f.feature}</li>)}
                            </ul>
                            {plan.buttonText && <a href={plan.buttonLink || '#'} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-2 inline-block font-semibold shadow">{plan.buttonText}</a>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
