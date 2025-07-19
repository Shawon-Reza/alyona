import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPageOverLap from '../assets/LoginPageOverLap.png';
import AuthenticationNav from '../Components/AuthenticationNav';
import RowButton from '../Components/RowButton';

const QuizGreetings = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-[#f7f1ec] to-white relative px-4">
            {/* Top Navigation */}
            <div className="pt-4">
                <AuthenticationNav />
            </div>
            <div className="absolute bottom-15 right-15 hidden sm:block">
                <img src={LoginPageOverLap} alt="OverlapIMG" className='scale-120' />
            </div>

            {/* Main Content */}
            <div className="flex-1 -mt-20 flex flex-col items-center justify-center text-center max-w-xl mx-auto py-10">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                    Thank you for taking care of Yourself!
                </h2>
                <p className="text-lg md:text-lg font-medium mt-3 mb-4 px-4 text-gray-700">
                    Here are your skin beauty quiz results!
                </p>
                <p className="text-[17px] md:text-base text-gray-600 px-4 mb-8 leading-relaxed">
                    Tell us your email so we can send you a complete Yourself Beauty guide with personalized tips, insights, and recommendations to support your skin beauty — as well as a thank you gift for taking care of yourself.
                </p>

                <div className=" max-w-xs mt-2">
                    <RowButton
                        text="Let's get started"
                        onClick={() => {
                            navigate('/SkinAnalysis');
                            console.log('Started!');
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default QuizGreetings;
