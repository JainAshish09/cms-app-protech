import React from 'react';
export default function Logo() {
    return (
        <div className="absolute left-1/2 inset-y-0 flex items-center -translate-x-1/2">
            <div className="flex items-baseline space-x-2 text-center">
                <span className="text-black text-xl md:text-2xl font-extrabold tracking-tight">ASSA ABLOY</span>
                <span className="text-black text-xs md:text-sm font-normal tracking-wide">PRO-TECH TITAN®</span>
            </div>
        </div>
    );
}
