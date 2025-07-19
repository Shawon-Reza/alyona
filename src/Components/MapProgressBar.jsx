import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MapProgressBar = ({ progress = 0 }) => {
    return (
        <div className="w-full flex items-center justify-between px-4 py-2">
            {/* Left Arrow */}
            <button className="rounded-full bg-[#fdf6f2] p-2 shadow-sm">
                <ChevronLeft className="text-[#b18763]" size={18} />
            </button>

            {/* Progress Track */}
            <div className="flex-1 mx-4 h-2 rounded-full bg-[#f6e8dd] relative overflow-hidden">
                <div
                    className="h-full bg-[#b18763] rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Right Arrow */}
            <button className="rounded-xl bg-[#fdf6f2] p-2 shadow-sm">
                <ChevronRight className="text-[#b18763]" size={20} />
            </button>
        </div>
    );
};

export default MapProgressBar;
