import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthNav from '../Components/AuthNav';
import LoginPageOverLap from '../assets/LoginPageOverLap.png';

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
            <AuthNav></AuthNav>
            <div className="absolute bottom-0 right-0">
                <img src={LoginPageOverLap} alt="OverlapIMG" />
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


        </div>
    );
};

export default StartQuizPage;
