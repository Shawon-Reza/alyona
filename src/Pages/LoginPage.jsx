import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaEye, FaEyeSlash } from 'react-icons/fa';
import login from '../assets/loginPageIMG.png';
import { Link, useNavigate } from 'react-router-dom';
import LoginPageOverLap from '../assets/LoginPageOverLap.png';
import NavbarLogo from '../assets/NavbarLogo.png';
import Magnet from '../CustomComponent/Magnet';
import { BackgroundBeamsWithCollision } from '@/Components/ui/background-beams-with-collision';
import axios from 'axios';
import { toast } from 'react-toastify';
import { baseUrl } from '../config/config';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');  // State to hold email
    const [password, setPassword] = useState('');  // State to hold password
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };



    const handleLoginForm = async (e) => {
        e.preventDefault(); // Prevent page reload

        console.log("Email:", email);
        console.log("Password:", password);

        try {
            const response = await axios.post(`${baseUrl}accounts/api/v1/login`, {
                email,
                password,
            });

            console.log("Login Successful:", response.data.login_user_info.role);
            if (response?.data.login_user_info.role !== 'customer') {
                toast.warning('This is not the place for you to login! Redirecting you to admin login page.');
                navigate('/admindashboardlogin');
                return;
            }
            toast.success("Login Successful");
            // Check quiz status
            if (response?.data?.login_user_info?.three_question_not_answered) {
                console.log('status:', response?.data?.login_user_info?.quiz_status);
                navigate('/maindashboard');
            } else {
                // Navigate to quiz if not completed.... need to change the flow.
                navigate('/UploadProfilePage', { replace: true });
            }

            console.log('first', response?.data)
            // Example: Save access token to localStorage
            localStorage.setItem('accessToken', JSON.stringify(response.data));


        } catch (error) {
            console.error("Login Failed:", error.response?.data?.detail);
            toast.warning(`${error.response?.data?.detail || "Please try again"}`);
        }
    };



    return (
        <BackgroundBeamsWithCollision className="h-screen">
            <div className="h-screen flex flex-col md:flex-row border-15 border-white rounded-3xl shadow-2xl relative w-screen">
                {/* Left Side Image */}
                <div className="md:w-1/2 w-full h-96 md:h-auto hidden sm:block">
                    <img
                        src={login}
                        alt="Beauty Woman"
                        className="w-full h-full object-cover rounded-l-3xl"
                    />
                </div>

                {/* Right Side Login Form */}
                <div className="md:w-1/2 w-full relative bg-gradient-to-b from-white via-[#fef7f3] to-[#f8f5f2] flex flex-col justify-center items-center px-6 h-screen rounded-3xl sm:rounded-l-none -mt-7.5">
                    {/* Overlap background decoration */}
                    <div className="absolute bottom-0 right-0 opacity-30 pointer-events-none z-0">
                        <img src={LoginPageOverLap} alt="Decor" />
                    </div>

                    <div className="w-full max-w-md space-y-8 z-10 lg:max-w-lg">
                        <div className="flex flex-col justify-center items-center text-center gap-8">
                            <img src={NavbarLogo} alt="" className="scale-200 object-cover" />
                            <div className="text-3xl lg:text-4xl font-semibold text-gray-800">YOURSELF BEAUTY</div>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="space-y-4">
                            <button className="w-full flex items-center justify-center border border-base-200 rounded-xl py-3 lg:py-4 text-base lg:text-lg gap-2 hover:bg-gray-100 bg-white">
                                <FcGoogle className="text-xl" />
                                <span>Login with Google</span>
                            </button>
                            <button className="w-full flex items-center justify-center border border-base-100 rounded-xl py-3 lg:py-4 text-base lg:text-lg gap-2 hover:bg-gray-100 bg-white">
                                <FaFacebookF className="text-blue-600 text-xl" />
                                <span>Log in with Facebook</span>
                            </button>
                        </div>

                        <div className="text-center text-gray-500 text-sm lg:text-base">Or</div>

                        {/* Email and Password Form */}
                        <form className="space-y-5 lg:space-y-6" onSubmit={handleLoginForm}>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}  // Bind to email state
                                onChange={(e) => setEmail(e.target.value)}  // Update email state
                                className="w-full px-4 lg:px-6 py-3 lg:py-4 text-base lg:text-lg bg-white/50 rounded-xl border border-base-200 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            />
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    value={password}  // Bind to password state
                                    onChange={(e) => setPassword(e.target.value)}  // Update password state
                                    className="w-full px-4 lg:px-6 py-3 lg:py-4 pr-10 text-base lg:text-lg rounded-xl bg-white/50 border border-base-200 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                >
                                    {showPassword ? <FaEyeSlash className="text-xl" /> : <FaEye className="text-xl" />}
                                </button>
                            </div>

                            <div className="flex items-center justify-between text-sm lg:text-base text-gray-700">
                                <label className="inline-flex items-center">
                                    <input type="checkbox" className="form-checkbox mr-2" />
                                    <span className="text-[18px]">Keep me signed in</span>
                                </label>
                            </div>

                            <Magnet padding={100} disabled={false} magnetStrength={10} className="w-full">
                                <button
                                    type="submit"
                                    className="w-full bg-[#0c0a3e] text-white py-3 lg:py-4 text-base lg:text-lg rounded-md hover:bg-[#191670] transition cursor-pointer"
                                >
                                    Log In
                                </button>
                            </Magnet>
                        </form>

                        {/* Bottom Links */}
                        <div className="flex flex-col items-center justify-center text-sm lg:text-base text-gray-600 h-[10%] 3xl:h-[20%]">
                            <a href="#" className="hover:underline text-center sm:text-left">
                                Forgot my password
                            </a>
                            <div className="mt-auto text-[18px] text-center sm:text-left">
                                Don't have an account?
                                <span
                                    onClick={() => {
                                        navigate('/onboarding-lifestyle-quiz');
                                    }}
                                    className="font-bold cursor-pointer"
                                >
                                    {' '}
                                    Sign up
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BackgroundBeamsWithCollision>
    );
};

export default LoginPage;
