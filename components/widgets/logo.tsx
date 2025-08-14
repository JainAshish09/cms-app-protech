// components/Logo.js (or .jsx)

import React from 'react';

export default function Logo() {
    return (
        <div className="flex flex-1 justify-center items-center">
            <div className="flex items-baseline space-x-2 text-center md:text-left">
                <span className="text-black text-xl md:text-2xl font-extrabold tracking-tight">ASSA ABLOY</span>
                <span className="text-black text-xs md:text-sm font-normal tracking-wide">PRO-TECH TITAN®</span>
            </div>
        </div>
    );
}
