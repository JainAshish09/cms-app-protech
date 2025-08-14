import React from 'react'

export default function SearchBar() {
    return (
        <div className="relative w-full max-w-sm">
            <input
                type="text"
                placeholder="Search..."
                className="w-full pl-2 pr-18 py-1 border border-[#C8C8C8] text-[#7D7D7D] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 p-1 rounded-lg"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1117 9a7.5 7.5 0 01-.35 7.65z"
                    />
                </svg>
            </button>
        </div>

    )
}
