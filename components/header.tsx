import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type MenuAlignment = 'left' | 'center' | 'right';
type MenuItemType = 'button' | 'text' | 'logo' | 'link';

interface CMSMenuItem {
    type: MenuItemType;
    label?: string;
    url?: string;
    style?: string;
    newTab?: boolean;
    icon?: string;
    fontSize?: string;
    color?: string;
    image?: string;
    placement?: MenuAlignment;
    height?: number;
    alignment?: MenuAlignment; // alignment per item from CMS
    controls?: { fontSize?: string; color?: string }; // For text items nested "controls"
}

interface NavbarData {
    title?: string;
    bgColor?: string;
    textColor?: string;
    items: CMSMenuItem[];
    showSearch?: boolean;
    searchPlaceholder?: string;
}

const getNavbarData = (): NavbarData => {
    const filePath = path.join(process.cwd(), 'content/navigation/navbar.md');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);
    return data as NavbarData;
};

const Header: React.FC = () => {
    const { title, bgColor, textColor, items, showSearch, searchPlaceholder } = getNavbarData();

    const headerStyles = {
        backgroundColor: bgColor || '#ffffff',
        color: textColor || '#000000',
    };

    const leftItems = items?.filter((item) => item.alignment === 'left');
    const centerItems = items?.filter((item) => item.alignment === 'center');
    const rightItems = items?.filter((item) => item.alignment === 'right');

    const renderItem = (item: CMSMenuItem, idx: number) => {
        switch (item.type) {
            case 'button':
                return (
                    <a
                        key={idx}
                        href={item.url || '#'}
                        target={item.newTab ? '_blank' : '_self'}
                        rel={item.newTab ? 'noopener noreferrer' : undefined}
                        className={`inline-flex items-center ${item.style || 'bg-blue-500 text-white px-4 py-2 rounded'
                            }`}
                    >
                        {item.icon && <img src={item.icon} alt="" className="mr-2 h-4 w-4" />}
                        {item.label}
                    </a>
                );
            case 'text':
                // Use nested controls object for fontSize and color if present
                return (
                    <span
                        key={idx}
                        className={item.controls?.fontSize || item.fontSize || 'text-base'}
                        style={{ color: item.controls?.color || item.color || headerStyles.color }}
                    >
                        {item.label}
                    </span>
                );
            case 'logo':
                return (
                    <a key={idx} href={item.url || '#'}>
                        {item.image && (
                            <img
                                src={item.image}
                                alt={item.label || 'Logo'}
                                style={{ height: `${item.height || 40}px` }}
                            />
                        )}
                    </a>
                );
            case 'link':
            default:
                return (
                    <a
                        key={idx}
                        href={item.url || '#'}
                        target={item.newTab ? '_blank' : '_self'}
                        rel={item.newTab ? 'noopener noreferrer' : undefined}
                        className="hover:underline transition duration-300"
                    >
                        {item.label}
                    </a>
                );
        }
    };

    const renderMenuItems = (arr?: CMSMenuItem[]) => (
        <ul className="flex space-x-6">{arr?.map(renderItem)}</ul>
    );

    return (
        <header
            style={headerStyles}
            className="p-4 fixed top-0 left-0 right-0 z-50 shadow-lg"
        >
            <div className="container mx-auto flex items-center justify-between">
                {/* Left section */}
                <div className="flex items-center space-x-4">{renderMenuItems(leftItems)}</div>

                {/* Center section */}
                <div className="flex items-center">{renderMenuItems(centerItems)}</div>

                {/* Right section */}
                <div className="flex items-center space-x-4">
                    {renderMenuItems(rightItems)}
                    {showSearch && (
                        <input
                            type="text"
                            placeholder={searchPlaceholder || 'Search...'}
                            className="px-2 py-1 border rounded"
                        />
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
