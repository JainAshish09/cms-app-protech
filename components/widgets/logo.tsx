import React from 'react';
export default function Logo() {
    return (
        <div className="absolute left-1/2 inset-y-0 flex items-center -translate-x-1/2 px-2">
            <div className="flex flex-col md:flex-row items-center md:items-baseline space-y-1 md:space-y-0 md:space-x-2 text-center max-w-full">
                <span className="text-black text-xl md:text-2xl font-extrabold tracking-tight whitespace-nowrap truncate">
                    ASSA ABLOY
                </span>
                <span className="text-black text-xs md:text-sm font-normal tracking-wide whitespace-nowrap truncate">
                    PRO-TECH TITAN<sup>®</sup>
                </span>
            </div>
        </div>
    );

}
