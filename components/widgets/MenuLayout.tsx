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
        <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] lg:grid-rows-[auto_auto] gap-6">
                <section className="bg-transparent border rounded-lg p-5 shadow-sm flex flex-row gap-3 row-start-1 col-start-1">
                    {sectionA.buttons.map((btn, idx) => (
                        <a
                            key={idx}
                            href={btn.url || '#'}
                            className="flex-1 min-w-[100px] px-4 py-2 rounded-md text-sm font-medium text-center transition hover:opacity-90 shadow"
                            style={{
                                backgroundColor: btn.buttonBgColor || '#3b82f6',
                                color: btn.buttonTextColor || '#ffffff',
                            }}
                        >
                            {btn.label || 'Button'}
                        </a>
                    ))}
                </section>

                {/* Section B with dynamic grid columns */}
                <section
                    className={`grid ${gridColsClass} gap-4 row-start-2 col-start-1`}
                >
                    {sectionB.cards.map((card, idx) => (
                        <div
                            key={idx}
                            className="bg-white border rounded-lg shadow-sm p-5 flex flex-col lg:flex-row min-w-0"
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
                                    className="w-full h-48 lg:w-40 lg:h-40 object-cover rounded-md flex-shrink-0"
                                />
                            )}

                            {/* Right Content */}
                            <div className="flex flex-col flex-1 mt-4 lg:mt-0 lg:ml-4 min-w-0">
                                <h3 className="text-lg font-semibold mb-2">{card.title || 'Card Title'}</h3>
                                <p className="text-sm mb-4 flex-grow">{card.content || ''}</p>
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
                    ))}
                </section>

                {/* Section C (spanning both rows) */}
                {sectionC?.backgroundImage && (
                    <section
                        className="relative lg:row-span-2 col-start-2 rounded-lg shadow overflow-hidden flex items-center justify-center text-center p-6"
                        style={{
                            backgroundImage: `url(${sectionC.backgroundImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40" />

                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center space-y-4">
                            {sectionC.logo && (
                                <img
                                    src={sectionC.logo}
                                    alt="Sidebar Logo"
                                    className="h-12 w-auto"
                                />
                            )}
                            <a
                                href={sectionC.link || '#'}
                                className="text-white text-base font-semibold underline"
                            >
                                {sectionC.linkLabel || 'Learn More'}
                            </a>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
