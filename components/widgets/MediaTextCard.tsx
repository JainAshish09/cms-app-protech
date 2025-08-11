// components/widgets/MediaTextCard.tsx

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import Button, { ButtonProps } from './Button';

interface MediaTextCardProps {
    title: string;
    content: string;
    image?: {
        src: string;
        alt?: string;
    };
    link?: string; // card-level link
    button?: ButtonProps;
    CardControls?: {
        titleColor?: string;
        titleFontSize?: string;
        textColor?: string;
        textFontSize?: string;
        backgroundColor?: string;
    };
}

const MediaTextCard: React.FC<MediaTextCardProps> = ({
    title,
    content,
    image,
    link,
    button,
    CardControls,
}) => {
    const {
        titleColor = '#000000',
        titleFontSize = '1.125rem', // text-lg default
        textColor = '#333333',
        textFontSize = '0.875rem', // text-sm default
        backgroundColor = '#ffffff',
    } = CardControls || {};

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
            className="rounded-lg shadow-sm p-4 flex h-full bg-white"
            style={{ backgroundColor }}
        >
            {/* Image section */}
            {image?.src && (
                <div className="relative w-1/2 h-full rounded-lg overflow-hidden shadow-sm">
                    <CardWrapper>
                        <Image
                            src={image.src}
                            alt={image.alt || 'Media Image'}
                            fill
                            className="object-cover rounded-lg"
                        />
                    </CardWrapper>
                </div>
            )}

            {/* Content section */}
            <div className={`w-1/2 flex flex-col justify-between pl-6`}>
                <CardWrapper>
                    <div>
                        <h3
                            className="font-semibold"
                            style={{ color: titleColor, fontSize: titleFontSize }}
                        >
                            {title}
                        </h3>
                        <div
                            className="prose max-w-none"
                            style={{
                                color: textColor,
                                fontSize: textFontSize,
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
                            <ReactMarkdown>{content}</ReactMarkdown>
                        </div>

                    </div>
                </CardWrapper>

                {/* Button */}
                {
                    button?.text && button?.link && (
                        <div className="mt-4">
                            <Button {...button} />
                        </div>
                    )
                }
            </div >
        </div >
    );
};

export default MediaTextCard;
