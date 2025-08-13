// components/ImageNavigationButtons.tsx
import React from 'react';

interface ImageNavigationButtonsProps {
    onLeftClick: () => void;
    onRightClick: () => void;
}

const ImageNavigationButtons: React.FC<ImageNavigationButtonsProps> = ({ onLeftClick, onRightClick }) => {
    return (
        <div className="relative w-32 h-7 flex justify-between items-center bg-white rounded-full shadow-lg">
            {/* Left Circle Button */}
            <div
                className="absolute left-2 w-4 h-4 rounded-full border-2 border-blue-500 bg-white cursor-pointer"
                onClick={onLeftClick}
            />

            {/* Center Active Section */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 w-16 h-4 rounded-full bg-blue-500 transition-all duration-300" />


            {/* Right Circle Button */}
            <div
                className="absolute right-2 w-4 h-4 rounded-full border-2 border-blue-500 bg-white cursor-pointer"
                onClick={onRightClick}
            />
        </div>
    );
};

export default ImageNavigationButtons;
