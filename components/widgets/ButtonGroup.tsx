import React from 'react';

interface ButtonType {
    text: string;
    link: string;
    style: 'primary' | 'secondary' | 'outline';
}

interface ButtonGroupProps {
    buttons: ButtonType[];
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons }) => {
    return (
        <div className="flex gap-4 flex-wrap justify-center mt-6">
            {buttons.map((btn, i) => {
                let btnClass = 'px-6 py-3 rounded font-semibold transition ';
                switch (btn.style) {
                    case 'primary':
                        btnClass += 'bg-blue-600 text-white hover:bg-blue-700';
                        break;
                    case 'secondary':
                        btnClass += 'bg-gray-200 text-gray-900 hover:bg-gray-300';
                        break;
                    case 'outline':
                        btnClass += 'border border-gray-800 text-gray-800 hover:bg-gray-100';
                        break;
                    default:
                        btnClass += 'bg-blue-600 text-white';
                }
                return (
                    <a
                        key={i}
                        href={btn.link}
                        className={btnClass}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {btn.text}
                    </a>
                );
            })}
        </div>
    );
};

export default ButtonGroup;
