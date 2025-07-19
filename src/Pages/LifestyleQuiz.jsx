import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPageOverLap from '../assets/LoginPageOverLap.png';
import AuthenticationNav from '../Components/AuthenticationNav';
import { ChevronRight } from 'lucide-react';

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
    const navigate = useNavigate();

    const toggleOption = (option) => {
        setSelected((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option]
        );
    };

    const handleBack = () => {
        navigate(-1); // or specific route
    };

    const handleContinue = () => {
        console.log("Selected lifestyle:", selected);
        navigate('/PeriodDatePicker');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-[#f7f1ec] to-white relative px-4">
            {/* Top Nav */}
            <div className="pt-4">
                <AuthenticationNav />
            </div>

            {/* Overlay Image */}
            <div className='absolute bottom-15 right-20 hidden sm:block'>
                <img src={LoginPageOverLap} alt="OverlapIMG" className='scale-120' />
            </div>

            {/* Main Content */}
            <div className="max-w-3xl mx-auto flex flex-col items-center py-10 z-10">
                {/* Progress Bar */}
                <div className="w-full mb-8">
                    <div className="w-full h-1 rounded bg-[#e5e5e5]">
                        <div
                            className="h-full rounded bg-[#b88b58] transition-all duration-500"
                            style={{ width: '20%' }}
                        />
                    </div>
                </div>

                {/* Question */}
                <div className="text-center max-w-2xl">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        What is your lifestyle?
                    </h2>
                    <p className="text-sm text-gray-600">
                        Answer to this question helps to determine your everyday level of stress that can affect your skin wellbeing
                    </p>
                </div>

                {/* Options */}
                <div className="mt-8 w-full max-w-md space-y-4">
                    {lifestyleOptions.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => toggleOption(option)}
                            className={`w-full px-4 py-3 text-left rounded-md border flex justify-between items-center transition  cursor-pointer
                ${selected.includes(option) ? 'bg-[#f0e5d9] border-[#c4a484]' : 'bg-white border-gray-300'}
              `}
                        >
                            {option}
                            {selected.includes(option) && (
                                <span className="text-[#BB9777] font-bold z-10  border border-[#BB9777] p-1 px-2 rounded-lg">✓</span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-10 max-w-md mx-auto w-full ">
                    <button
                        onClick={handleBack}
                        className="bg-[#d2b89d] text-white px-6 py-2 rounded-md text-sm hover:bg-[#c3a686] transition"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleContinue}
                        disabled={selected.length === 0}
                        className={`px-6 py-2 rounded-md text-sm text-white transition z-10 cursor-pointer flex justify-between items-center gap-10 w-full
              ${selected.length > 0
                                ? 'bg-[#0c0c36] hover:bg-[#1c1c4f]'
                                : 'bg-gray-400 cursor-not-allowed'
                            }
            `}
                    >
                        Continue
                        <ChevronRight size={15}  />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LifestyleQuiz;
