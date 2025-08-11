import React from 'react';
import MediaTextCard from '../widgets/MediaTextCard'; // Adjust path as needed

interface ButtonProps {
    text?: string;
    link?: string;
    style?: 'primary' | 'secondary' | 'outline';
    newTab?: boolean;
    icon?: string;
    color?: string;
    backgroundColor?: string;
    border?: string;
    radius?: string;
}

interface CardControls {
    titleColor?: string;
    titleFontSize?: string;
    textColor?: string;
    textFontSize?: string;
    backgroundColor?: string;
}

interface Card {
    title: string;
    content: string;
    image?: string;
    link?: string;
    buttons?: ButtonProps;
}

interface Controls {
    align?: 'left' | 'center' | 'right';
    fontSize?: string;
    color?: string;
}

interface CardsSectionType {
    title?: string;
    cardsPerRow?: number;
    showBorder?: boolean;
    hoverEffect?: boolean;
    titleControls?: Controls;
    cardControls?: CardControls;
    cards: Card[];
}

const CardsSection: React.FC<{ section: CardsSectionType }> = ({ section }) => {
    const {
        title,
        cardsPerRow = 3,
        showBorder = true,
        hoverEffect = true,
        titleControls,
        cardControls,
        cards,
    } = section;

    const gridColsClass = {
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
    }[cardsPerRow] || 'grid-cols-3';

    const getTextAlignClass = (align?: string) => {
        if (align === 'left') return 'text-left';
        if (align === 'right') return 'text-right';
        return 'text-center';
    };

    const getStyleOverride = (fontSize?: string, color?: string): React.CSSProperties => {
        const style: React.CSSProperties = {};
        if (fontSize && !fontSize.startsWith('text-') && !isNaN(Number(fontSize))) {
            style.fontSize = `${fontSize}px`;
        }
        if (color) {
            style.color = color;
        }
        return style;
    };

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
            {title && (
                <h2
                    className={`font-bold mb-8 ${getTextAlignClass(titleControls?.align)}`}
                    style={getStyleOverride(titleControls?.fontSize, titleControls?.color)}
                >
                    {title}
                </h2>
            )}

            <div className={`grid gap-6 grid-cols-1 sm:grid-cols-2 md:${gridColsClass}`}>
                {cards.map((card, idx) => {
                    const normalizedImage = card.image
                        ? card.image.startsWith('/')
                            ? card.image
                            : `/${card.image}`
                        : undefined;

                    return (
                        <div
                            key={idx}
                            className={`rounded-lg overflow-hidden ${showBorder ? 'border border-gray-200' : ''
                                } ${hoverEffect ? 'hover:shadow-lg transition-shadow' : ''}`}
                            style={{
                                backgroundColor: cardControls?.backgroundColor || '#ffffff', // ✅ section-wide bg
                                cursor: card.link ? 'pointer' : 'default',
                            }}
                        >
                            <MediaTextCard
                                title={card.title}
                                content={card.content}
                                image={normalizedImage ? { src: normalizedImage } : undefined}
                                link={card.link}
                                button={card.buttons}
                                CardControls={cardControls} // ✅ pass section-level styles
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default CardsSection;
