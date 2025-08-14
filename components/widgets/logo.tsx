import React from 'react';

export default function Logo() {
    return (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-baseline space-x-2 text-center md:text-left">
                <span className="text-black text-xl md:text-2xl font-extrabold tracking-tight">ASSA ABLOY</span>
                <span className="text-black text-xs md:text-sm font-normal tracking-wide">PRO-TECH TITAN®</span>
            </div>
        </div>
    );
}
