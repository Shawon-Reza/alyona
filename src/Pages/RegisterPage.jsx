import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaEye, FaEyeSlash } from 'react-icons/fa';
import registerImg from '../assets/registration.png';
import { useNavigate } from 'react-router-dom';
import LoginPageOverLap from '../assets/LoginPageOverLap.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import axios from 'axios';
import SplitText from '../CustomComponent/SplitText';
import { fadeSlide } from '@/CustomComponent/fadeSlide';
import { motion } from 'framer-motion';



const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [accepted, setAccepted] = useState(false);
    const navigate = useNavigate();

    const handleRegistration = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log(data);


        // Registration Post Requiest 
        axios.post('http://10.10.13.59:8000/accounts/api/v1/register', data)
            .then(res => {
                console.log('Registered:', res.data);
                alert("Registration Succesfull")
                setTimeout(() => navigate('/SimpleRegisterPage'), 1000);
            })
            .catch(err => {
                if (err.response) {
                    console.error('Server responded with error:', err.response.data);
                    alert("Registration failed: " + JSON.stringify(err.response.data));
                } else {
                    console.error('Network or unknown error:', err.message);
                    alert("Registration failed: Network error");
                }
            });




    };

    const slides = [
        {
            img: registerImg,
            title: "Your Skin Journey Starts Here",
            subtitle: "Discover personalized skincare powered by AI technology"
        },
        {
            img: '/path/to/second-image.jpg',
            title: "Feel Confident in Your Skin",
            subtitle: "AI-driven solutions for your unique needs"
        },
        {
            img: '/path/to/third-image.jpg',
            title: "Join Thousands of Happy Users",
            subtitle: "Skin health powered by smart technology"
        }
    ];

    return (

        <motion.div
            variants={fadeSlide}
            initial="initial"
            animate="animate"
            exit="exit"
            className="h-screen flex flex-col md:flex-row font-sans bg-white overflow-hidden">
            {/* Left Side Swiper */}
            <div className="md:w-1/2 hidden sm:block h-full min-h-screen relative">
                <Swiper
                    pagination={{ clickable: true }}
                    modules={[Pagination, Autoplay]}
                    className="w-full h-full"
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative w-full h-full">
                                <img
                                    src={slide.img}
                                    alt={slide.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#BB9777] via-[#EDDBCB] to-transparent px-8 py-6 text-left h-60">
                                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800">{slide.title}</h2>
                                    <p className="text-sm text-gray-700">{slide.subtitle}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Right Side Form */}
            <div className="md:w-1/2 w-full relative bg-gradient-to-b from-white via-[#fef7f3] to-[#f8f5f2] flex flex-col justify-center items-center px-6 py-10 min-h-screen">
                {/* Overlap image */}
                <div className="absolute bottom-0 right-0 opacity-30 pointer-events-none">
                    <img src={LoginPageOverLap} alt="Overlap" />
                </div>

                {/* Form content */}
                <div className="w-full max-w-md space-y-6 z-10">


                    <div className="text-left space-y-1">
                        <SplitText
                            text="Hi Anna"
                            className="text-2xl font-semibold text-gray-800"
                            delay={100}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                        // onLetterAnimationComplete={handleAnimationComplete}
                        />
                        <div>
                            <SplitText
                                text="Add necessary fields to create your account"
                                className="text-sm text-gray-600"
                                delay={20}
                                duration={0.6}
                                ease="power3.out"
                                splitType="chars"
                                from={{ opacity: 0, y: 40 }}
                                to={{ opacity: 1, y: 0 }}
                                threshold={0.1}
                                rootMargin="-100px"
                                textAlign="center"
                            // onLetterAnimationComplete={handleAnimationComplete}
                            />
                        </div>
                        {/* <h2 className="text-2xl font-semibold text-gray-800">Hi Anna,</h2> */}
                        {/* <p className="text-sm text-gray-600">Add necessary fields to create your account</p> */}
                    </div>

                    {/* Social Login */}
                    <div className="space-y-3">
                        <button className="w-full bg-white border border-base-200 flex items-center justify-center py-2 gap-2 rounded-md hover:bg-gray-100">
                            <FcGoogle className="text-xl" />
                            <span>Login with Google</span>
                        </button>
                        <button className="w-full bg-white border border-base-200 flex items-center justify-center py-2 gap-2 rounded-md hover:bg-gray-100">
                            <FaFacebookF className="text-blue-600 text-xl" />
                            <span>Log in with Facebook</span>
                        </button>
                    </div>

                    <div className="relative text-center">
                        <span className="text-gray-500 text-sm">Or</span>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleRegistration} className="space-y-4">
                        <input
                            required
                            type="text"
                            name="username"
                            placeholder="👤 Nickname"
                            className="w-full px-4 py-2 rounded-md bg-white/50 border border-base-200 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                        <input
                            required
                            type="text"
                            name="full_name"
                            placeholder="🪪 Name"
                            className="w-full px-4 py-2 rounded-md bg-white border border-base-200 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                        <input
                            required
                            type="email"
                            name="email"
                            placeholder="📧 Email"
                            className="w-full px-4 py-2 rounded-md bg-white border border-base-200 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                        <div className="relative">
                            <input
                                id="date"
                                type="date"
                                name="birthday"
                                placeholder="Birthday"
                                className="w-full px-4 py-2 rounded-md bg-white border border-base-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            />
                        </div>

                        <div className="relative">
                            <input
                                required
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="🔒 Password"
                                className="w-full px-4 py-2 pr-10 rounded-md bg-white border border-base-200 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {/* Terms */}
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input
                                type="checkbox"
                                checked={accepted}
                                onChange={() => setAccepted(!accepted)}
                                className="form-checkbox accent-[#0c0a3e]"
                            />
                            I accept the terms and conditions of Yourself Beauty
                        </label>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={!accepted}
                            className={`w-full cursor-pointer py-2 rounded-md text-white transition ${accepted
                                ? 'bg-[#0c0a3e] hover:bg-[#191670]'
                                : 'bg-gray-400 cursor-not-allowed'
                                }`}
                        >
                            Continue
                        </button>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};

export default RegisterPage;
