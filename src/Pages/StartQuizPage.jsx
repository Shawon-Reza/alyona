import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationNav from '../Components/AuthenticationNav';
import LoginPageOverLap from '../assets/LoginPageOverLap.png';
import { ChevronRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { baseUrl } from '../config/config';
import { toast } from 'react-toastify';
import axiosApi from '../api/axiosApi';

const StartQuizPage = () => {
    const navigate = useNavigate();
    const formData = useSelector((state) => state.form);
    console.log('Redux data', formData);
    const payload = {
        location_area: formData.location_area,
        area: formData.area,
        city: formData.city,
        country: formData.country,
        last_period: formData['month-1'],
        next_period: formData['month-2']
    }
    console.log(payload)
    // Mutation hook at component level
    const quizMutation = useMutation({
        mutationFn: async () => {
            const response = await axiosApi.post(`${baseUrl}accounts/api/v1/quiz`, payload);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('Quiz data submitted successfully:', data);
            toast.success('Quiz data submitted successfully!');
            navigate('/dashboard/about-my-skin');
        },
        onError: (error) => {
            console.error('Error submitting quiz data:', error);
            toast.error('Failed to submit quiz data. Please try again.');
        }
    });

    const handleStartQuiz = () => {
        quizMutation.mutate();
    };

    const handleSkip = () => {
        // navigate('/LocationSelector'); // Adjust route if needed
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-[#f7f1ec] to-white relative px-4 pb-20">
            {/* Top Nav */}
            <div className="pt-5">
                {/* <AuthenticationNav /> */}
            </div>

            {/* Decorative Background Image */}
            <div className="absolute bottom-15 right-20 hidden sm:block">
                <img
                    src={LoginPageOverLap}
                    alt="Decorative Overlap"
                    className="scale-120 object-contain"
                />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto px-2">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                    Thank you for taking care of Yourself!
                </h2>
                <h3 className='font-semibold md:text-lg xl:text-xl'>Here are Your skin Beauty quiz results!</h3>
                <p className="text-lg md:text-xl text-gray-600 mt-3 mb-8">
                    Get your personalized Yourself Beauty guide with tailored tips, insights, and recommendations to support your skin beauty—plus a small thank-you gift for taking care of yourself.
                </p>

                {/* Start the Quiz Button (full width on mobile) */}
                <button
                    onClick={handleStartQuiz}
                    className="w-full max-w-xs cursor-pointer z-10 bg-[#0c0c36] text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-[#1c1c4f] transition-all duration-200 flex items-center justify-between mx-4 mt-12"
                >
                    See my results
                    <ChevronRight />
                </button>
            </div>
        </div>
    );
};

export default StartQuizPage;
