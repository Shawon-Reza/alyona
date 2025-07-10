import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartQuizPage = () => {
    const navigate = useNavigate();

    const handleStartQuiz = () => {
        navigate('/quiz'); // update route as needed
    };

    const handleSkip = () => {
        navigate('/LocationSelector'); // update route as needed
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-[#f7f1ec] to-white flex flex-col items-center justify-center relative px-4 text-center">
            {/* Top Nav */}
            <div className="absolute top-0 left-0 w-full flex justify-between items-center px-8 py-6">
                <div className="text-xl font-semibold text-[#2c2c2c] flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#1e1e2f] text-white rounded-full flex items-center justify-center font-bold">YB</div>
                    YOURSELF BEAUTY
                </div>
                <div className="space-x-4">
                    <button className="text-sm text-[#1e1e2f] hover:underline">Log in</button>
                    <button className="bg-[#0c0c36] text-white px-4 py-2 rounded-md text-sm hover:bg-[#1c1c4f]">Join</button>
                </div>
            </div>

            {/* Message Content */}
            <div className="max-w-md mt-24">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                    Thanks, your account has been created
                </h2>
                <p className="text-gray-500 mt-3 mb-8 px-4">
                    Give some information and ask for an email to send the full report and skincare tips + bonus week of skincare to fill in.
                </p>

                {/* Start Quiz Button */}
                <button
                    onClick={handleStartQuiz}
                    className="bg-[#0c0c36] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[#1c1c4f] transition-all duration-200"
                >
                    Start the Quiz →
                </button>

                {/* Skip Button */}
                <div className="mt-4">
                    <button
                        onClick={handleSkip}
                        className="text-sm text-gray-600 underline hover:text-gray-800"
                    >
                        Skip this step
                    </button>
                </div>
            </div>

            {/* Decorative Flower Illustration */}
            <div className="absolute bottom-0 right-4 opacity-10 pointer-events-none">
                <img
                    src="https://static.thenounproject.com/png/124207-200.png"
                    alt="Flower Illustration"
                    className="w-40 md:w-60"
                />
            </div>
        </div>
    );
};

export default StartQuizPage;
