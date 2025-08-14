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

                {/* Section B */}
                <section className="flex gap-4 row-start-2 col-start-1">
                    {sectionB.cards.map((card, idx) => (
                        <div
                            key={idx}
                            className="flex-1 min-w-[200px] bg-white border rounded-lg shadow-sm p-5 flex flex-col justify-between"
                            style={{
                                backgroundColor: card.cardBgColor || '#ffffff',
                                color: card.cardTextColor || '#000000',
                            }}
                        >
                            <div>
                                <h3 className="text-lg font-semibold mb-2">
                                    {card.title || 'Card Title'}
                                </h3>
                                <p className="text-sm mb-3">{card.content || ''}</p>
                                {card.image && (
                                    <img
                                        src={card.image}
                                        alt={card.title || 'Card image'}
                                        className="w-full h-40 object-cover rounded-md mb-4"
                                    />
                                )}
                            </div>
                            <a
                                href={card.buttonUrl || '#'}
                                className="mt-auto inline-block text-sm font-medium px-4 py-2 rounded-md text-center"
                                style={{
                                    backgroundColor: card.buttonBgColor || '#3b82f6',
                                    color: card.buttonTextColor || '#ffffff',
                                }}
                            >
                                {card.buttonLabel || 'Learn More'}
                            </a>
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
