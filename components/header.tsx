'use client';
import React, { useState } from 'react';
import { CMSMenuItem, NavbarData } from '@/app/services/getNavbarData';

interface HeaderProps {
    navbarData: NavbarData;
}

const Header: React.FC<HeaderProps> = ({ navbarData }) => {

    const {
        bgColor = '#ffffff',
        textColor = '#000000',
        items = [],
        showSearch = false,
        searchPlaceholder = '',
    } = navbarData || {};

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const headerStyles = {
        backgroundColor: bgColor || '#ffffff',
        color: textColor || '#000000',
    };

    const leftItems = items?.filter((item) => item.alignment === 'left');
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
                        className={`inline-flex items-center ${item.style || 'bg-blue-500 text-white px-4 py-2 rounded'}`}
                    >
                        {item.icon && <img src={item.icon} alt="" className="mr-2 h-4 w-4" />}
                        {item.label}
                    </a>
                );
            case 'text':
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

    const renderMenuItems = (arr?: CMSMenuItem[], vertical?: boolean) => (
        <ul className={`flex ${vertical ? 'flex-col space-y-2' : 'space-x-6'}`}>
            {arr?.map(renderItem)}
        </ul>
    );

    return (
        <div className="fixed top-0 inset-x-0 z-50 py-3 px-4 sm:px-6">
            <div className="max-w-9xl mx-auto">
                <header
                    style={headerStyles}
                    className="bg-white rounded-lg p-3 flex items-center justify-between shadow-md"
                >
                    {/* Left section: Menu toggle on mobile */}
                    <div className="flex items-center space-x-4">
                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden flex items-center space-x-1 border-2 border-black rounded-lg px-2 py-1"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-black"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        {/* Desktop Left Menu */}
                        <div className="hidden md:flex items-center space-x-4">
                            <span className="text-black text-lg font-normal">Menu</span>
                            {renderMenuItems(leftItems)}
                        </div>
                    </div>

                    {/* Center logo */}
                    <div className="flex flex-1 justify-center items-center">
                        <div className="flex items-baseline space-x-2 text-center md:text-left">
                            <span className="text-black text-xl md:text-2xl font-extrabold tracking-tight">ASSA ABLOY</span>
                            <span className="text-black text-xs md:text-sm font-normal tracking-wide">PRO-TECH TITAN®</span>
                        </div>
                    </div>

                    {/* Right items */}
                    <div className="hidden md:flex items-center space-x-3">
                        {renderMenuItems(rightItems)}

                        {showSearch && (
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder={searchPlaceholder || 'Search...'}
                                    className="px-3 py-1 border rounded pr-8"
                                />
                                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1117 9a7.5 7.5 0 01-.35 7.65z" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                {/* Mobile dropdown menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-2 bg-white rounded-lg shadow p-4 space-y-4">
                        {renderMenuItems(leftItems, true)}
                        <hr />
                        {renderMenuItems(rightItems, true)}
                        {showSearch && (
                            <input
                                type="text"
                                placeholder={searchPlaceholder || 'Search...'}
                                className="w-full px-3 py-2 border rounded"
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;


