import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import Button, { ButtonProps } from './Button';

interface CardControlProps {
    titleColor?: string;
    titleFontSize?: string;
    textColor?: string;
    textFontSize?: string;
    backgroundColor?: string;
    borderRadius?: string;
    padding?: string;
}

interface MediaTextCardProps {
    title: string;
    content: string;
    image?: {
        src: string;
        alt?: string;
    };
    link?: string; // card-level link
    button?: ButtonProps;
    CardControls?: CardControlProps;
}

const MediaTextCard: React.FC<MediaTextCardProps> = ({
    title,
    content,
    image,
    link,
    button,
    CardControls = {},
}) => {
    const {
        titleColor = '#000000',
        titleFontSize = '1.125rem', // text-lg
        textColor = '#333333',
        textFontSize = '0.875rem', // text-sm
        backgroundColor = '#ffffff',
        borderRadius = '0.5rem',
        padding = '1rem',
    } = CardControls;

    // Utility to ensure font size has units
    const parseFontSize = (size: string | undefined, fallback: string) => {
        if (!size) return fallback;
        if (typeof size === 'number') return `${size}px`;
        if (/^\d+$/.test(size)) return `${size}px`;
        return size;
    };

    const parsedTitleFontSize = parseFontSize(titleFontSize, '1.125rem');
    const parsedTextFontSize = parseFontSize(textFontSize, '0.875rem');

    const CardWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
        link ? (
            <Link href={link} className="block hover:opacity-95 transition-opacity duration-200">
                {children}
            </Link>
        ) : (
            <>{children}</>
        );

    return (
        <div
            className="shadow-sm flex h-full"
            style={{
                backgroundColor,
                borderRadius,
                padding,
            }}
        >
            {/* Image section */}
            {image?.src && (
                <div
                    className="relative w-[40%] h-full overflow-hidden shadow-sm"
                    style={{ borderRadius }}
                >
                    <CardWrapper>
                        <Image
                            src={image.src}
                            alt={image.alt || 'Media Image'}
                            fill
                            style={{
                                objectFit: 'cover',
                                borderRadius,
                            }}
                        />
                    </CardWrapper>
                </div>
            )}

            {/* Content section */}
            <div className="w-[60%] flex flex-col justify-between pl-6">
                <CardWrapper>
                    <div>
                        {/* Card Title */}
                        <h3
                            className="font-semibold"
                            style={{
                                color: titleColor,
                                fontSize: parsedTitleFontSize,
                                marginBottom: '0.5rem',
                            }}
                        >
                            {title}
                        </h3>

                        {/* Card Content (Markdown styled with CMS controls) */}
                        <div
                            style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 10,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                                whiteSpace: 'normal',
                                maxWidth: '100%',
                            }}
                        >
                            <ReactMarkdown
                                components={{
                                    p: ({ node, ...props }) => (
                                        <p {...props} style={{ color: textColor, fontSize: parsedTextFontSize, margin: 0 }} />
                                    ),
                                    ul: ({ node, ...props }) => (
                                        <ul {...props} style={{ color: textColor, fontSize: parsedTextFontSize, margin: 0 }} />
                                    ),
                                    li: ({ node, ...props }) => (
                                        <li {...props} style={{ color: textColor, fontSize: parsedTextFontSize }} />
                                    ),
                                    h1: ({ node, ...props }) => (
                                        <h1 {...props} style={{ color: titleColor, fontSize: `calc(${parsedTitleFontSize} * 1.5)`, fontWeight: 700, margin: 0 }} />
                                    ),
                                    h2: ({ node, ...props }) => (
                                        <h2 {...props} style={{ color: titleColor, fontSize: `calc(${parsedTitleFontSize} * 1.2)`, fontWeight: 600, margin: 0 }} />
                                    ),
                                    h3: ({ node, ...props }) => (
                                        <h3 {...props} style={{ color: titleColor, fontSize: parsedTitleFontSize, fontWeight: 600, margin: 0 }} />
                                    ),
                                }}
                            >
                                {content}
                            </ReactMarkdown>
                        </div>
                    </div>
                </CardWrapper>

                {/* Button */}
                {button?.text && button?.link && (
                    <div className="mt-4">
                        <Button {...button} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MediaTextCard;
