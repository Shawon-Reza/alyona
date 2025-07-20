import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationNav from '../Components/AuthenticationNav';
import LoginPageOverLap from '../assets/LoginPageOverLap.png';
import { ChevronRight } from 'lucide-react';

const StartQuizPage = () => {
    const navigate = useNavigate();

    const handleStartQuiz = () => {
        navigate('/quiz'); // Adjust route if needed
    };

    const handleSkip = () => {
        navigate('/LocationSelector'); // Adjust route if needed
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-[#f7f1ec] to-white relative px-4 pb-20">
            {/* Top Nav */}
            <div className="pt-5">
                <AuthenticationNav />
            </div>

            {/* Decorative Background Image */}
            <div className="absolute bottom-15 right-20 hidden sm:block ">
                <img
                    src={LoginPageOverLap}
                    alt="Decorative Overlap"
                    className="scale-120 object-contain"
                />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto px-2">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                    Thanks, your account has been created
                </h2>
                <p className="text-lg md:text-xl text-gray-600 mt-3 mb-8">
                    Give some information and ask for an email to send the full report and skincare tips + bonus week of skincare to fill in.
                </p>

                {/* Start the Quiz Button (full width on mobile) */}
                <button
                    onClick={handleStartQuiz}
                    className="w-full max-w-xs cursor-pointer z-10 bg-[#0c0c36] text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-[#1c1c4f] transition-all duration-200 flex  items-center justify-between mx-4 mt-12"
                >
                    Start the Quiz
                    <ChevronRight />
                </button>

                {/* Skip Button */}
                <div className="mt-4 w-full max-w-sm z-10">
                    <button
                        onClick={handleSkip}
                        className="w-full text-[16px] cursor-pointer font-semibold text-[#5B5B5B] underline hover:text-gray-800"
                    >
                        Skip this step
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StartQuizPage;
