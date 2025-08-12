import React from "react";

interface TimelineEvent {
    date: string;
    title: string;
    content: string;
    image?: string;
}

interface TitleControls {
    align?: "left" | "center" | "right";
    fontSize?: string;
    color?: string;
}

interface CardControls {
    bgColor?: string;
    titleColor?: string;
    contentColor?: string;
    dateColor?: string;
}

interface TimelineSectionProps {
    section: {
        type: string;
        title: string;
        titleControls?: TitleControls;
        sectionBgColor?: string;
        cardControls?: CardControls;
        events: TimelineEvent[];
    };
}

const TimelineSection: React.FC<TimelineSectionProps> = ({ section }) => {
    const {
        title,
        titleControls = {},
        sectionBgColor,
        cardControls = {},
        events = [],
    } = section;

    const alignClassMap: Record<NonNullable<TitleControls["align"]>, string> = {
        left: "text-left",
        center: "text-center",
        right: "text-right",
    };

    const titleAlignClass = titleControls.align
        ? alignClassMap[titleControls.align]
        : "text-left";

    const titleFontSizeClass = titleControls.fontSize || "text-3xl";
    const titleStyle = titleControls.color ? { color: titleControls.color } : {};

    return (
        <section
            className="py-12 px-6"
            style={{
                ...(sectionBgColor && { backgroundColor: sectionBgColor }),
            }}
        >
            <div className="max-w-7xl mx-auto">
                <h2
                    className={`font-bold mb-10 ${titleFontSizeClass} ${titleAlignClass}`}
                    style={titleStyle}
                >
                    {title}
                </h2>

                <div className="relative">
                    <div className="grid grid-cols-3 gap-4">
                        {events.map((event, index) => {
                            const isLeft = index % 2 === 0;

                            return (
                                <div key={index} className="contents">
                                    {/* Left Column */}
                                    <div className={`w-full ${isLeft ? "" : "invisible"}`}>
                                        {isLeft && (
                                            <div
                                                className="bg-white shadow-md rounded p-4"
                                                style={{ backgroundColor: cardControls.bgColor }}
                                            >
                                                <p
                                                    className="text-sm mb-1"
                                                    style={{ color: cardControls.dateColor }}
                                                >
                                                    {event.date}
                                                </p>
                                                <h3
                                                    className="font-semibold text-lg mb-2"
                                                    style={{ color: cardControls.titleColor }}
                                                >
                                                    {event.title}
                                                </h3>
                                                <div className="flex gap-4 items-start">
                                                    {event.image && (
                                                        <div className="w-24 h-24 flex-shrink-0">
                                                            <img
                                                                src={event.image}
                                                                alt={event.title}
                                                                className="w-full h-full object-cover rounded"
                                                            />
                                                        </div>
                                                    )}
                                                    <p
                                                        className="text-sm"
                                                        style={{ color: cardControls.contentColor }}
                                                    >
                                                        {event.content}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Center Column with Dot and Line */}
                                    <div className="relative flex justify-center">
                                        <div className="w-1 bg-gray-300" />
                                        <span className="absolute w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow top-4" />
                                    </div>

                                    {/* Right Column */}
                                    <div className={`w-full ${!isLeft ? "" : "invisible"}`}>
                                        {!isLeft && (
                                            <div
                                                className="bg-white shadow-md rounded p-4"
                                                style={{ backgroundColor: cardControls.bgColor }}
                                            >
                                                <p
                                                    className="text-sm mb-1"
                                                    style={{ color: cardControls.dateColor }}
                                                >
                                                    {event.date}
                                                </p>
                                                <h3
                                                    className="font-semibold text-lg mb-2"
                                                    style={{ color: cardControls.titleColor }}
                                                >
                                                    {event.title}
                                                </h3>
                                                <div className="flex gap-4 items-start">
                                                    {event.image && (
                                                        <div className="w-24 h-24 flex-shrink-0">
                                                            <img
                                                                src={event.image}
                                                                alt={event.title}
                                                                className="w-full h-full object-cover rounded"
                                                            />
                                                        </div>
                                                    )}
                                                    <p
                                                        className="text-sm"
                                                        style={{ color: cardControls.contentColor }}
                                                    >
                                                        {event.content}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TimelineSection;
