import React, { useState } from "react";

interface FaqQuestion {
    question: string;
    answer: string;
    category?: string;
}

interface FaqCategory {
    name: string;
}

interface ControlSettings {
    align?: "left" | "center" | "right";
    fontSize?: string;
    color?: string;
}

interface FaqSectionProps {
    section: {
        title: string;
        layout: "accordion" | "tabs" | "grid";
        sectionBgColor?: string;
        questionBgColor?: string;
        titleControls?: ControlSettings;
        contentControls?: ControlSettings;
        categories?: FaqCategory[];
        questions: FaqQuestion[];
    };
}

export default function FaqSection({ section }: FaqSectionProps) {
    const {
        title,
        layout,
        sectionBgColor,
        questionBgColor,
        titleControls,
        contentControls,
        categories = [],
        questions = [],
    } = section;

    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState<string | null>(
        categories.length > 0 ? categories[0].name : null
    );

    const filteredQuestions =
        layout === "tabs" && activeCategory
            ? questions.filter((q) => q.category === activeCategory)
            : questions;

    const titleStyle: React.CSSProperties = {
        textAlign: titleControls?.align,
        fontSize: titleControls?.fontSize,
        color: titleControls?.color,
    };

    const contentStyle: React.CSSProperties = {
        textAlign: contentControls?.align,
        fontSize: contentControls?.fontSize,
        color: contentControls?.color,
    };

    return (
        <section
            className="py-10 px-4 "
            style={{ backgroundColor: sectionBgColor || "transparent" }}
        >
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                {title && (
                    <h2
                        style={titleStyle}
                        className="font-bold mb-6 px-2"
                    >
                        {title}
                    </h2>
                )}

                {/* Layouts */}
                {layout === "accordion" && (
                    <div className="space-y-4">
                        {questions.map((q, index) => (
                            <div
                                key={index}
                                className="rounded-lg shadow p-4 cursor-pointer"
                                style={{ backgroundColor: questionBgColor || "#f9f9f9" }}
                                onClick={() =>
                                    setActiveIndex(activeIndex === index ? null : index)
                                }
                            >
                                <h3 className="font-semibold">{q.question}</h3>
                                {activeIndex === index && (
                                    <p className="mt-2" style={contentStyle}>
                                        {q.answer}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {layout === "tabs" && (
                    <div>
                        {/* Category Tabs */}
                        {categories.length > 0 && (
                            <div className="flex space-x-4 mb-6">
                                {categories.map((cat, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveCategory(cat.name)}
                                        className={`px-4 py-2 rounded ${activeCategory === cat.name
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-200"
                                            }`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        )}
                        {/* Questions */}
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredQuestions.map((q, idx) => (
                                <div
                                    key={idx}
                                    className="rounded-lg shadow p-4"
                                    style={{ backgroundColor: questionBgColor || "#f9f9f9" }}
                                >
                                    <h3 className="font-semibold">{q.question}</h3>
                                    <p className="mt-2" style={contentStyle}>
                                        {q.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {layout === "grid" && (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {questions.map((q, idx) => (
                            <div
                                key={idx}
                                className="rounded-lg shadow p-4"
                                style={{ backgroundColor: questionBgColor || "#f9f9f9" }}
                            >
                                <h3 className="font-semibold">{q.question}</h3>
                                <p className="mt-2" style={contentStyle}>
                                    {q.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
