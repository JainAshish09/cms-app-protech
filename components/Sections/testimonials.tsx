import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";

interface ControlProps {
    align: string;
    fontSize: string;
    color: string;
}

interface Testimonial {
    author: string;
    title: string;
    image: string;
    content: string;
}

interface SectionProps {
    titleControls: ControlProps;
    subtitleControls: ControlProps;
    contentControls: ControlProps;
    layout: string;
    testimonials: Testimonial[];
    backgroundColor: string;
    subtitle: string;
    title: string;
    showRatings: boolean;
    roleCompanyColor: string;
}

export default function Testimonials({ section }: { section: SectionProps }) {
    const [current, setCurrent] = useState(0);
    const total = section.testimonials.length;

    const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total);
    const nextSlide = () => setCurrent((prev) => (prev + 1) % total);

    const testimonial = section.testimonials[current];

    return (
        <section style={{ backgroundColor: section.backgroundColor }} className="py-12 ">
            {/* Title */}
            <h2
                style={{
                    textAlign: section.titleControls.align as any,
                    fontSize: `${section.titleControls.fontSize}px`,
                    color: section.titleControls.color,
                }}
                className="font-bold mb-2 max-w-7xl mx-auto"
            >
                {section.title}
            </h2>

            {/* Subtitle */}
            <p
                style={{
                    textAlign: section.subtitleControls.align as any,
                    fontSize: `${section.subtitleControls.fontSize}px`,
                    color: section.subtitleControls.color,
                }}
                className="mb-8 max-w-7xl mx-auto"
            >
                {section.subtitle}
            </p>

            {/* Slider */}
            <div className="flex items-center justify-center gap-4">
                <button
                    onClick={prevSlide}
                    className="bg-white p-3 rounded-full shadow hover:bg-gray-200"
                >
                    <FaChevronLeft />
                </button>

                <div className="bg-white rounded-2xl p-8 w-full max-w-3xl shadow text-center">
                    {section.showRatings && (
                        <div className="flex justify-center mb-4 text-yellow-400">
                            {[...Array(5)].map((_, idx) => (
                                <FaStar key={idx} />
                            ))}
                        </div>
                    )}

                    <p
                        style={{
                            textAlign: section.contentControls.align as any,
                            fontSize: `${section.contentControls.fontSize}px`,
                            color: section.contentControls.color,
                        }}
                        className="italic mb-6"
                    >
                        “{testimonial.content}”
                    </p>

                    <div className="flex flex-col items-center gap-2">
                        {testimonial.image && (
                            <img
                                src={testimonial.image}
                                alt={testimonial.author}
                                className="w-16 h-16 object-contain"
                            />
                        )}
                        <span className="font-semibold">{testimonial.author}</span>
                        <span style={{ color: section.roleCompanyColor }}>{testimonial.title}</span>
                    </div>
                </div>

                <button
                    onClick={nextSlide}
                    className="bg-white p-3 rounded-full shadow hover:bg-gray-200"
                >
                    <FaChevronRight />
                </button>
            </div>
        </section>
    );
}
