import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaEye, FaEyeSlash } from 'react-icons/fa';
import { HiOutlineUser, HiOutlineIdentification, HiOutlineMail, HiOutlineCalendar, HiOutlineKey } from 'react-icons/hi';
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
import { toast } from 'react-toastify';



const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [accepted, setAccepted] = useState(false);
    const navigate = useNavigate();
    // OTP / post-registration state
    const [registered, setRegistered] = useState(false);
    const [registrationData, setRegistrationData] = useState(null);
    const [otp, setOtp] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationError, setVerificationError] = useState('');
    const [birthdayValue, setBirthdayValue] = useState('');
    const [birthdayFocused, setBirthdayFocused] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isResending, setIsResending] = useState(false);

    console.log(otp)
    const handleRegistration = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        setIsSubmitting(true);

        // Registration Post Request
        // On success we'll show an OTP input instead of navigating away immediately.
        axios.post('http://10.10.13.80:8005/accounts/api/v1/register', data)
            .then(res => {
                console.log('Registered:', res.data);
                // store registration data so we can resend or verify OTP
                setRegistrationData({ ...data, ...res.data });
                setRegistered(true);
            })
            .catch(err => {
                if (err.response) {
                    console.error('Server responded with error:', err.response.data);
                    alert("Registration failed: " + JSON.stringify(err.response.data));
                } else {
                    console.error('Network or unknown error:', err.message);
                    alert("Registration failed: Network error");
                }
            })
            .finally(() => setIsSubmitting(false));




    };

    const handleVerifyOtp = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        setVerificationError('');
        setIsVerifying(true);

        try {
            // Assumption: backend exposes a verify endpoint at /accounts/api/v1/verify-otp
            const payload = { otp, email: registrationData?.email || registrationData?.username };
            const res = await axios.patch('http://10.10.13.80:8005/accounts/api/v1/verify-otp', payload);

            console.log('OTP verified:', res.data);
            localStorage.setItem('accessToken', JSON.stringify(res.data));
            toast.success('OTP verified successfully! Please login.');
            // proceed to next step after verification
            navigate('/');
        } catch (err) {
            console.error('OTP verification failed', err.response || err.message);
            setVerificationError(err.response?.data?.detail || 'OTP verification failed. Please try again.');
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResendOtp = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        setIsResending(true);
        try {
            // Assumption: backend exposes a resend endpoint at /accounts/api/v1/resend-otp
            await axios.post(`http://10.10.13.80:8005/accounts/api/v1/resend-otp`, { email: registrationData?.email || registrationData?.username });
            toast.info('OTP resent. Please check your email.');
        } catch (err) {
            console.error('Resend OTP failed', err.response || err.message);
            alert('Failed to resend OTP. Please try again later.');
        } finally {
            setIsResending(false);
        }
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
            <div className="sm:w-1/2 hidden sm:block h-full min-h-screen relative">
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
            <div className="sm:w-1/2 z-100 w-full relative bg-gradient-to-b from-white via-[#fef7f3] to-[#f8f5f2] flex flex-col justify-center items-center px-6 py-10 min-h-screen">
                {/* Overlap image */}
                <div className="absolute bottom-0 right-0 opacity-30 pointer-events-none">
                    <img src={LoginPageOverLap} alt="Overlap" />
                </div>

                {/* Form content or OTP verification */}
                <div className="w-full max-w-xl space-y-6 z-10">


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

                    {/* If registered, show OTP input; otherwise show registration form */}
                    {!registered ? (
                        <form onSubmit={handleRegistration} className="space-y-4">
                            <div className="relative">
                                <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                <input
                                    required
                                    type="text"
                                    name="username"
                                    placeholder="Nickname"
                                    className="w-full pl-10 pr-4 py-2.5 rounded-md bg-[#f5ece4] border border-[#e8ddd3] focus:outline-none focus:ring-2 focus:ring-[#BB9777] text-gray-700 placeholder:text-gray-400"
                                />
                            </div>
                            <div className="relative">
                                <HiOutlineIdentification className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                <input
                                    required
                                    type="text"
                                    name="full_name"
                                    placeholder="Name"
                                    className="w-full pl-10 pr-4 py-2.5 rounded-md bg-[#f5ece4] border border-[#e8ddd3] focus:outline-none focus:ring-2 focus:ring-[#BB9777] text-gray-700 placeholder:text-gray-400"
                                />
                            </div>
                            <div className="relative">
                                <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="w-full pl-10 pr-4 py-2.5 rounded-md bg-[#f5ece4] border border-[#e8ddd3] focus:outline-none focus:ring-2 focus:ring-[#BB9777] text-gray-700 placeholder:text-gray-400"
                                />
                            </div>
                            <div className="relative">
                                <HiOutlineCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none z-10" />
                                {!birthdayValue && !birthdayFocused && (
                                    <span className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                        Birthday
                                    </span>
                                )}
                                <input
                                    id="date"
                                    type="date"
                                    name="birthday"
                                    value={birthdayValue}
                                    onChange={(e) => setBirthdayValue(e.target.value)}
                                    onFocus={() => setBirthdayFocused(true)}
                                    onBlur={() => setBirthdayFocused(false)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-md bg-[#f5ece4] border border-[#e8ddd3] text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#BB9777]"
                                    style={!birthdayValue ? { color: 'transparent' } : {}}
                                />
                            </div>

                            <div className="relative">
                                <HiOutlineKey className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                <input
                                    required
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Password"
                                    className="w-full pl-10 pr-10 py-2.5 rounded-md bg-[#f5ece4] border border-[#e8ddd3] focus:outline-none focus:ring-2 focus:ring-[#BB9777] text-gray-700 placeholder:text-gray-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
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
                                disabled={!accepted || isSubmitting}
                                className={`w-full cursor-pointer py-2 rounded-md text-white transition ${accepted && !isSubmitting
                                    ? 'bg-[#0c0a3e] hover:bg-[#191670]'
                                    : 'bg-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                {isSubmitting ? 'Please wait…' : 'Continue'}
                            </button>
                            <span className='opacity-70'>
                                This app and its recommendations are for informational purposes only and are not intended to diagnose, treat, or cure any medical condition. Please consult a qualified healthcare professional for medical advice.
                            </span>
                        </form>
                    ) : (
                        <div className="space-y-4 bg-white p-6 rounded-md shadow-sm">
                            <h3 className="text-lg font-semibold">Verify OTP</h3>
                            <p className="text-sm text-gray-600">We sent an OTP to <span className="font-medium">{registrationData?.email || registrationData?.username}</span>. Enter it below to complete registration.</p>

                            <div>
                                <input
                                    type="text"
                                    name="otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter OTP"
                                    className="w-full px-4 py-2 rounded-md bg-white border border-base-200 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                />
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={handleVerifyOtp}
                                    className={`flex-1 py-2 rounded-md text-white ${isVerifying ? 'bg-gray-400' : 'bg-[#0c0a3e] hover:bg-[#191670]'}`}
                                    disabled={isVerifying || !otp}
                                >
                                    {isVerifying ? 'Please wait…' : 'Verify OTP'}
                                </button>
                                <button
                                    onClick={handleResendOtp}
                                    className={`py-2 px-3 rounded-md border border-base-200 ${isResending ? 'bg-gray-200 text-gray-500' : 'bg-white'}`}
                                    disabled={isResending}
                                >
                                    {isResending ? 'Sending…' : 'Resend'}
                                </button>
                            </div>

                            {verificationError && <p className="text-sm text-red-500">{verificationError}</p>}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default RegisterPage;
