import React from "react";
import {
    FaLinkedin,
    FaTwitter,
    FaFacebook,
    FaInstagram,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

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

interface TeamSectionData {
    type: string;
    title: string;
    sectionBgColor?: string;
    cardBgColor?: string;
    titleControls?: TitleControls;
    memberControls?: MemberControls;
    layout?: "grid" | "list" | "carousel";
    members: Member[];
}

interface TeamSectionProps {
    section: TeamSectionData;
}

const icons = {
    linkedin: <FaLinkedin />,
    twitter: <FaTwitter />,
    facebook: <FaFacebook />,
    instagram: <FaInstagram />,
};

const TeamSection: React.FC<TeamSectionProps> = ({ section }) => {
    const {
        title,
        sectionBgColor = "#f0f0f0",
        cardBgColor,
        titleControls,
        memberControls,
        layout = "carousel",
        members,
    } = section;

    const cardBackground =
        memberControls?.cardBgColor || cardBgColor || "#ffffff";

    const renderMemberCard = (member: Member, index: number) => {
        return (
            <div
                key={index}
                className={`flex ${layout === "list" ? "flex-row items-center gap-6" : "flex-col items-center"} text-center p-6 rounded-lg shadow-md transition-transform transform hover:scale-105`}
                style={{ backgroundColor: cardBackground }}
            >
                {/* Avatar */}
                <img
                    src={member.image}
                    alt={member.name}
                    className={`rounded-full object-cover border-4 border-white shadow-lg ${layout === "list" ? "w-20 h-20" : "w-24 h-24 mb-4"
                        }`}
                />

                <div className={`${layout === "list" ? "text-left" : "text-center"}`}>
                    {/* Name */}
                    <h3
                        className="text-lg font-semibold"
                        style={{ color: memberControls?.nameColor || "#222" }}
                    >
                        {member.name}
                    </h3>

                    {/* Position */}
                    <p
                        className="text-sm"
                        style={{ color: memberControls?.positionColor || "#444" }}
                    >
                        {member.position}
                    </p>

                    {/* Bio */}
                    {member.bio && (
                        <p
                            className="mt-2 text-sm"
                            style={{ color: memberControls?.bioColor || "#555" }}
                        >
                            {member.bio}
                        </p>
                    )}

                    {/* Social Icons */}
                    {member.social && member.social.length > 0 && (
                        <div
                            className={`flex gap-4 mt-4 text-xl text-gray-600 ${layout === "list" ? "" : "justify-center"
                                }`}
                        >
                            {member.social.map((link, i) => (
                                <a
                                    key={i}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {icons[link.platform]}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <section style={{ backgroundColor: sectionBgColor }} className="py-12">
            <div className="max-w-7xl mx-auto">

                {/* Title */}
                <h2
                    className="mb-10 px-5"
                    style={{
                        textAlign: titleControls?.align || "center",
                        fontSize: titleControls?.fontSize
                            ? `${titleControls.fontSize}px`
                            : "28px",
                        color: titleControls?.color || "#000",
                    }}
                >
                    {title}
                </h2>

                {/* Layouts */}
                {members && members.length > 0 ? (
                    layout === "carousel" ? (
                        <div className="px-6">
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={20}
                                navigation
                                modules={[Navigation]}
                                breakpoints={{
                                    640: { slidesPerView: 1 },
                                    768: { slidesPerView: 2 },
                                    1024: { slidesPerView: 3 },
                                }}
                            >
                                {members.map((member, index) => (
                                    <SwiperSlide key={index}>
                                        {renderMemberCard(member, index)}
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    ) : layout === "list" ? (
                        <div className="flex flex-col gap-6 px-6">
                            {members.map((member, index) => renderMemberCard(member, index))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
                            {members.map((member, index) => renderMemberCard(member, index))}
                        </div>
                    )
                ) : (
                    <p className="text-center text-lg text-gray-700">
                        No team members found.
                    </p>
                )}
            </div>
        </section>
    );
};

export default TeamSection;
