import React from "react";
import {
    FaLinkedin,
    FaTwitter,
    FaFacebook,
    FaInstagram,
} from "react-icons/fa";

// TypeScript Interfaces
interface SocialLink {
    platform: "linkedin" | "twitter" | "facebook" | "instagram";
    url: string;
}

interface Member {
    name: string;
    position: string;
    image: string;
    bio?: string;
    social?: SocialLink[];
}

interface TitleControls {
    align?: "left" | "center" | "right";
    fontSize?: string;
    color?: string;
}

interface MemberControls {
    nameColor?: string;
    positionColor?: string;
    bioColor?: string;
    cardBgColor?: string;
}

interface TeamSectionProps {
    section: {
        title: string;
        sectionBgColor?: string;
        cardBgColor?: string;
        titleControls?: TitleControls;
        memberControls?: MemberControls;
        layout?: "grid" | "list" | "carousel";
        members: Member[];
    };
}

// Social Icon Map
const socialIcons: Record<string, JSX.Element> = {
    linkedin: <FaLinkedin />,
    twitter: <FaTwitter />,
    facebook: <FaFacebook />,
    instagram: <FaInstagram />,
};

// Helper for text alignment class
const getTextAlignClass = (align?: string) => {
    switch (align) {
        case "left":
            return "text-left";
        case "right":
            return "text-right";
        case "center":
        default:
            return "text-center";
    }
};

export default function TeamSection({ section }: TeamSectionProps) {
    const {
        title,
        sectionBgColor,
        cardBgColor,
        titleControls,
        memberControls,
        members,
    } = section;

    return (
        <section
            style={{ backgroundColor: sectionBgColor || "#f3f4f6" }}
            className="py-16 px-6"
        >
            {/* Section Title */}
            <h2
                className={`font-bold mb-12 ${getTextAlignClass(titleControls?.align)}`}
                style={{
                    fontSize: titleControls?.fontSize || "1.875rem", // 3xl fallback
                    color: titleControls?.color || "#111827", // default text-gray-900
                }}
            >
                {title}
            </h2>

            {/* Member Grid */}
            <div
                className={`gap-10 ${section.layout === "list" ? "flex flex-col" : "grid sm:grid-cols-2 lg:grid-cols-3"
                    }`}
            >
                {members.map((member, index) => (
                    <div
                        key={index}
                        className="relative backdrop-blur-lg rounded-3xl shadow-xl border border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        style={{
                            backgroundColor:
                                memberControls?.cardBgColor ||
                                cardBgColor ||
                                "rgba(255,255,255,0.15)",
                        }}
                    >
                        {/* Image on top */}
                        <div className="absolute left-1/2 -top-12 transform -translate-x-1/2">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-lg"
                            />
                        </div>

                        {/* Card Content */}
                        <div className="pt-20 p-6 text-center">
                            <h3
                                className="text-xl font-semibold"
                                style={{ color: memberControls?.nameColor || "#ffffff" }}
                            >
                                {member.name}
                            </h3>
                            <p
                                className="text-sm"
                                style={{ color: memberControls?.positionColor || "#e5e7eb" }}
                            >
                                {member.position}
                            </p>
                            {member.bio && (
                                <p
                                    className="mt-3 text-sm leading-relaxed"
                                    style={{ color: memberControls?.bioColor || "#f3f4f6" }}
                                >
                                    {member.bio}
                                </p>
                            )}

                            {/* Social Links */}
                            {member.social && member.social.length > 0 && (
                                <div className="flex justify-center space-x-4 mt-5">
                                    {member.social.map((link, i) => (
                                        <a
                                            key={i}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-lg text-white/80 hover:text-white transition-colors"
                                        >
                                            {socialIcons[link.platform]}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
