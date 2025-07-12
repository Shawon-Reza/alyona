import React from 'react'
import AuthNav from '../Components/AuthNav'
import { FaGreaterThan } from "react-icons/fa6";
import LoginPageOverLap from '../assets/LoginPageOverLap.png';
import { useNavigate } from 'react-router-dom';
import RowButton from '../Components/RowButton';
import { nextDay } from 'date-fns/fp';

const QuizGreetings = () => {

    const navigate = useNavigate()

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
                    Thank you for taking care of Yourself!
                </h2>
                <p className="font-semibold mt-3 mb-8 px-4">
                    Here are Your skin Beauty quiz results!
                </p>
                <p>
                    Tell us Your email so we can send to you a complete Yourself Beauty guide with personalized tips, insights, and recommendations to support Your skin Beauty as well as a thank you for taking care of Yourself gift.

                </p>
                <div className='w-full'>
                    <div className="w-1/2 mx-auto mt-10" >
                        <RowButton text="Let's get started"

                            onClick={() => {
                                navigate('/SkinAnalysis')
                                console.log("Started!")
                            }} />
                    </div>
                </div>


            </div>


        </div>
    )
}

export default QuizGreetings