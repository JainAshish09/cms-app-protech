'use client';
import React, { useState } from 'react';
import { CMSMenuItem, MenuLayoutConfig, NavbarData } from '@/app/services/getNavbarData';
import Logo from './widgets/logo';
import SearchBar from './widgets/searchBar';
import MenuLayout from './widgets/MenuLayout';

interface HeaderProps {
    navbarData: NavbarData;
    menuLayoutConfig: MenuLayoutConfig;
}

const Header: React.FC<HeaderProps> = ({ navbarData, menuLayoutConfig }) => {
    const {
        bgColor = '#ffffff',
        textColor = '#000000',
        items = [],
        showSearch = false,
    } = navbarData || {};

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const headerStyles = {
        backgroundColor: bgColor,
        color: textColor,
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
        <div>
            <div className="fixed top-0 inset-x-0 z-50 py-3 px-4 sm:px-6">
                <div className="max-w-9xl mx-auto">
                    <header
                        style={headerStyles}
                        className="relative bg-white rounded-lg p-3 flex items-center justify-between shadow-md"
                    >

                        {/* Left section: Menu toggle on mobile and md+ */}
                        <div className="flex items-center space-x-4">
                            {/* Menu button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="flex items-center space-x-1 border-2 border-black rounded-lg px-2 py-1"
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

                            {/* Desktop Left Menu (hidden on small screens) */}
                            <div className="hidden md:flex items-center space-x-4">
                                <span className="text-black text-lg font-normal">Menu</span>
                                {renderMenuItems(leftItems)}
                            </div>
                        </div>

                        {/* Logo */}
                        <Logo />

                        {/* Desktop Right Menu */}
                        <div className="hidden md:flex items-center space-x-3">
                            {renderMenuItems(rightItems)}

                            {showSearch && (
                                <SearchBar />
                            )}
                        </div>
                    </header>

                    {/* Mobile dropdown menu (visible on small screens only) */}
                    {mobileMenuOpen && (
                        <div className="md:hidden mt-2 bg-white rounded-lg shadow p-4 space-y-4">
                            {renderMenuItems(leftItems, true)}
                            <hr />
                            {renderMenuItems(rightItems, true)}
                            {showSearch && (
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full px-3 py-2 border rounded"
                                />
                            )}
                        </div>
                    )}
                </div>

                {mobileMenuOpen && (
                    <div
                        className=" bg-white rounded-lg p-0 max-w-9xl mx-auto items-center justify-between shadow-md mt-4"
                    >                        <MenuLayout config={menuLayoutConfig} />
                    </div>

                )}
            </div>


        </div>
    );
};

export default Header;
