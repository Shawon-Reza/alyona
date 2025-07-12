import React, { useState } from 'react';
import LoginPageOverLap from '../assets/LoginPageOverLap.png'
import { useNavigate } from 'react-router-dom';
import AuthNav from '../Components/AuthNav';

const lifestyleOptions = [
    "Under a lot of stress: mostly night life — I love to go out",
    "Early to wake up — I enjoy early mornings",
    "I believe I live a balanced life",
    "Never enough time to do everything",
    "Positive thinking — life is beautiful",
    "Surrounded by love, family and friends",
    "I have a lot of free time",
];

const LifestyleQuiz = () => {
    const [selected, setSelected] = useState([]);

    const navigate = useNavigate()

    const toggleOption = (option) => {
        setSelected((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option]
        );
    };

    const handleBack = () => {
        // handle back navigation
        console.log("Go Back");
    };

    const handleContinue = () => {
        // handle next step
        console.log("Selected lifestyle:", selected);
    };

    return (
        <div className="h-screen bg-gradient-to-br from-white via-[#f7f1ec] to-white px-6 py-10 flex flex-col items-center relative font-sans">
            <div className='absolute bottom-0 right-0'>
                <img src={LoginPageOverLap} alt="OverlapIMG" />
            </div>

            {/* Top Nav */}
           <AuthNav></AuthNav>

            {/* Progress Bar */}
            <div className="mt-28 w-full max-w-4xl">
                <div className="w-full bg-[#e5e5e5] h-1 rounded">
                    <div className="w-[20%] bg-[#b88b58] h-1 rounded transition-all duration-500"></div>
                </div>
            </div>

            {/* Question */}
            <div className="max-w-2xl text-center mt-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">What is your lifestyle?</h2>
                <p className="text-sm text-gray-600">Answer to this question helps to determine your everyday level of stress that can affect your skin wellbeing</p>
            </div>

            {/* Options */}
            <div className="mt-8 w-full max-w-md space-y-4">
                {lifestyleOptions.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => toggleOption(option)}
                        className={`w-full px-4 py-3 text-left rounded-md border flex justify-between items-center transition
              ${selected.includes(option) ? 'bg-[#f0e5d9] border-[#c4a484]' : 'bg-white border-gray-300'}
            `}
                    >
                        {option}
                        {selected.includes(option) && (
                            <span className="text-[#0c0c36] font-bold">✓</span>
                        )}
                    </button>
                ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-10">
                <button
                    onClick={handleBack}
                    className="bg-[#d2b89d] text-white px-6 py-2 rounded-md text-sm hover:bg-[#c3a686]"
                >
                    Back
                </button>
                <button
                    onClick={() => {
                        handleContinue()
                        navigate('/PeriodDatePicker')
                    }}
                    className="bg-[#0c0c36] text-white px-6 py-2 rounded-md text-sm hover:bg-[#1c1c4f]"
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default LifestyleQuiz;
