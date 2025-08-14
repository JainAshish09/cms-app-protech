import { MenuLayoutConfig } from '@/app/services/getNavbarData';
import React from 'react';

interface MenuLayoutProps {
    config: MenuLayoutConfig;
}

export default function MenuLayout({ config }: MenuLayoutProps) {
    if (!config) return null;

    const sectionA = config.sectionAButtons;
    const sectionB = config.sectionBCards;
    const sectionC = config.sectionCCard;

    // Determine grid classes based on number of cards
    const totalCards = sectionB.cards.length;

    let gridColsClass = 'grid-cols-1'; // default 1 col
    if (totalCards === 2) {
        gridColsClass = 'grid-cols-1 sm:grid-cols-2'; // 2 cols on small screens+
    } else if (totalCards >= 3) {
        gridColsClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'; // 3 cols on large screens
    }

    return (
        <div className="w-full max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] lg:grid-rows-[auto_auto] gap-4 ">
                <section className="w-full flex flex-wrap gap-3 px-3 pt-3">
                    {sectionA.buttons.map((btn, idx) => (
                        <a
                            key={idx}
                            href={btn.url || '#'}
                            className="flex-grow basis-[calc(25%-0.75rem)] sm:basis-[calc(20%-0.75rem)] md:basis-[calc(16.66%-0.75rem)] lg:basis-[calc(12.5%-0.75rem)] px-4 py-2 border border-[#D8E5EF] rounded-lg text-sm font-medium text-center transition hover:opacity-90 shadow"
                            style={{
                                backgroundColor: btn.buttonBgColor || 'transparent',
                                color: btn.buttonTextColor || '#000000',
                            }}
                        >
                            {btn.label || 'Button'}
                        </a>
                    ))}
                </section>



                {/* Section B with dynamic grid columns */}
                <section
                    className={`grid ${gridColsClass} gap-4 row-start-2 col-start-1 px-3 pb-3`}
                >
                    {sectionB.cards.map((card, idx) => (
                        <div
                            key={idx}
                            className="bg-white border border-[#D8E5EF] rounded-3xl shadow-sm p-4 flex flex-col lg:flex-row min-w-0"
                            style={{
                                backgroundColor: card.cardBgColor || '#ffffff',
                                color: card.cardTextColor || '#000000',
                            }}
                        >
                            {/* Left Image */}
                            {card.image && (
                                <img
                                    src={card.image}
                                    alt={card.title || 'Card image'}
                                    className="w-full h-40 lg:h-full lg:w-40 object-cover rounded-3xl flex-shrink-0"
                                />
                            )}

                            {/* Right Content */}
                            <div className="flex flex-col flex-1 mt-4 lg:mt-0 lg:ml-4 min-w-0">
                                <h3 className="text-lg font-semibold mb-2">{card.title || 'Card Title'}</h3>
                                <p className="text-sm mb-4 mt-0">{card.content || ''}</p>
                                <div className="mt-auto">
                                    <a
                                        href={card.buttonUrl || '#'}
                                        className="inline-block text-sm font-medium px-4 py-2 rounded-md text-center self-start"
                                        style={{
                                            backgroundColor: card.buttonBgColor || '#3b82f6',
                                            color: card.buttonTextColor || '#ffffff',
                                        }}
                                    >
                                        {card.buttonLabel || 'Learn More'}
                                    </a>
                                </div>
                            </div>

                        </div>
                    ))}
                </section>
                {/* Section C (spanning both rows) */}
                <section
                    className="lg:row-span-2 lg:col-start-2 rounded-r-lg shadow min-h-[250px] flex items-center justify-center text-center overflow-hidden"
                >
                    <div
                        className="w-full h-full bg-cover bg-center relative"
                        style={{ backgroundImage: `url(${sectionC.backgroundImage})` }}
                    >
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40" />

                        {/* Content */}
                        <div className="relative z-10 mt-16 flex flex-col items-center space-y-6">
                            <a
                                href={sectionC.link || '#'}
                                className="text-black bg-white no-underline text-base font-semibold p-2 mx-3 rounded-md shadow hover:bg-gray-100 transition duration-300"
                            >
                                {sectionC.linkLabel || 'Learn More'}
                            </a>

                            {sectionC.logo && (
                                <img
                                    src={sectionC.logo}
                                    alt="Sidebar Logo"
                                    className="h-20 w-auto object-contain rounded-lg border border-[#00A0D0]"
                                />
                            )}

                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
