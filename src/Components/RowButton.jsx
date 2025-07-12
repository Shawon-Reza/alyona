import React from "react";

export default function RowButton({ text = "Click me", onClick }) {
    return (
        <button
            onClick={onClick}
            className=" flex items-center justify-between gap-2 bg-[#0b0540] text-white font-semibold text-base px-6 py-3 rounded-xl hover:bg-[#1c1664] transition duration-200"
        >
            <span>{text}</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
        </button>
    );
}
