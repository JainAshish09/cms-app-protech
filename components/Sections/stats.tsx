import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

interface Stat {
    icon?: string;
    value: string | number;
    label: string;
    suffix?: string;
    prefix?: string;
}

interface Controls {
    align?: "left" | "center" | "right";
    fontSize?: string;
    color?: string;
}

interface StatsSectionProps {
    section: {
        type?: string;
        title?: string;
        subtitle?: string;
        animation?: "countUp" | "none" | "fade";
        titleControls?: Controls;
        contentControls?: Controls;
        sectionBg?: string;
        statBg?: string;
        stats: Stat[];
    };
}

export default function StatsSection({ section }: StatsSectionProps) {
    const {
        title,
        subtitle,
        animation = "countUp",
        titleControls = {},
        contentControls = {},
        sectionBg,
        statBg,
        stats = [],
    } = section;

    const getFontSize = (size?: string, fallback = "2rem") => {
        if (!size) return fallback;
        // Ensure it includes unit
        return /^\d+$/.test(size) ? `${size}px` : size;
    };

    return (
        <section
            className="py-12 px-6"
            style={{
                background: sectionBg || "linear-gradient(to bottom, #111827, #1f2937, #111827)",
            }}
        >
            {/* Title */}
            {(title || subtitle) && (
                <div className="mb-10">
                    {title && (
                        <h2
                            className="font-extrabold tracking-wide"
                            style={{
                                textAlign: titleControls.align || "center",
                                fontSize: getFontSize(titleControls.fontSize, "2rem"),
                                color: titleControls.color || "#fff",
                            }}
                        >
                            {title}
                        </h2>
                    )}
                    {subtitle && (
                        <p
                            className="mt-2 text-base"
                            style={{
                                textAlign: titleControls.align || "center",
                                color: titleControls.color || "#fff"
                            }}
                        >
                            {subtitle}
                        </p>
                    )}
                </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        className="p-6 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg hover:scale-105 transition-transform relative overflow-hidden"
                        style={{
                            backgroundColor: statBg || "rgba(255, 255, 255, 0.05)",
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        {/* Accent Bar */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500" />

                        {/* Icon */}
                        {stat.icon && (
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-4 shadow-md">
                                <img src={stat.icon} alt={stat.label} className="w-8 h-8" />
                            </div>
                        )}

                        {/* Value */}
                        <div
                            style={{
                                textAlign: contentControls.align || "center",
                                fontSize: getFontSize(contentControls.fontSize, "2rem"),
                                color: contentControls.color || "#fff",
                            }}
                        >
                            {stat.prefix && <span className="mr-1 text-lg">{stat.prefix}</span>}

                            {animation === "countUp" ? (
                                <CountUp
                                    start={0}
                                    end={isNaN(Number(stat.value)) ? 0 : Number(stat.value)}
                                    duration={2}
                                    separator=","
                                />
                            ) : (
                                stat.value
                            )}

                            {stat.suffix && <span className="ml-1 text-lg">{stat.suffix}</span>}
                        </div>

                        {/* Label */}
                        <p className="mt-2 text-gray-300 text-sm text-center">{stat.label}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
