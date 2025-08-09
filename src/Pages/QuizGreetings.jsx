import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPageOverLap from '../assets/LoginPageOverLap.png';
import AuthenticationNav from '../Components/AuthenticationNav';
import RowButton from '../Components/RowButton';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const QuizGreetings = () => {
    const navigate = useNavigate();


    const data = useSelector((state) => state.form)
    console.log('Greating Quiz: ', data)


    const handle = () => {
        const finalQuizeData = {
            location_area: data.location_area,
            area: data.area,
            country: data.country,
            city: data.city,
            age: Number(data.age),
            daily_period: data.daily_period,
            last_period: data["month-1"],
            next_period: data["month-2"],
            pregnant_or_breastfeeding: data.selectedPregnancyBreastfeeding,
            life_styles: data.selectedLifestyle,
            mood_choices: data.selectedMood,
            water_intake: data.selectedWaterIntake,
            sweet_consumptions: data.selectedSweetConsumption,
            skin_concerns: data.selectedSkinConcerns,
            eating_habits: data.selectedEatingHabits,
            take_supplements: data.selectedSupplement,
            sleep_quality: data.selectedSleepQuality,
            daily_activity: data.selectedDailyActivity,
            skincare_times: data.selectedSkincareTime,
            skincare_goals: data.selectedSkincareGoals,
        };

        console.log('Greating Quiz after edit: ', finalQuizeData)

        const token = JSON.parse(localStorage.getItem('accessToken'));
        if (!token || !token.access) {
            toast.warning("No access token found. Please log in again.");
            return;
        }

        axios.post('http://10.10.13.59:8000/accounts/api/v1/quiz', finalQuizeData, {
            headers: {
                Authorization: `Bearer ${token.access}`,
            }
        })
            .then(res => {
                toast.success("Quiz are stored successfully")
                console.log(res.data)
                navigate('/SkinAnalysis')

            })
            .catch(err => {
                toast.error("Failed to store quiz. Please try again.")
                if (err.response) {
                    console.error("Error response:", err.response.data);
                } else {
                    console.error("Error:", err.message);
                }
            });

        ;
    }




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
                            handle()

                            console.log('Started!');
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default QuizGreetings;
