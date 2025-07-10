import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaEye, FaEyeSlash } from 'react-icons/fa';
import login from '../assets/loginPageIMG.png';
import { Link, useNavigate } from 'react-router-dom';
import LoginPageOverLap from '../assets/LoginPageOverLap.png'

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className=" h-screen flex flex-col md:flex-row border-15 border-white rounded-3xl shadow-2xl">

            {/* Left Side Image */}
            <div className="md:w-1/2 w-full h-96 md:h-auto hidden sm:block ">
                <img
                    src={login}
                    alt="Beauty Woman"
                    className="w-full h-full object-cover rounded-l-3xl "
                />



            </div>

            {/* Right Side Login Form */}
            <div className="relative md:w-1/2 w-full flex items-center justify-center bg-gradient-to-b from-white via-[#fef7f3] to-[#f8f5f2] px-6 py-10 rounded-r-3xl">

                <div className='absolute bottom-0 right-0'>
                    <img src={LoginPageOverLap} alt="OverlapIMG" />
                </div>

                <div className="max-w-md w-full space-y-6">
                    <div className="text-center">
                        <div className="text-3xl font-semibold text-gray-800">YOURSELF BEAUTY</div>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="space-y-3">
                        <button className="w-full  flex items-center justify-center border rounded-md py-2 gap-2 hover:bg-gray-100">
                            <FcGoogle className="text-xl" />
                            <span>Login with Google</span>
                        </button>
                        <button className="w-full flex items-center justify-center border rounded-md py-2 gap-2 hover:bg-gray-100">
                            <FaFacebookF className="text-blue-600 text-xl" />
                            <span>Log in with Facebook</span>
                        </button>
                    </div>

                    <div className="relative text-center">
                        <span className="text-gray-500 text-sm">Or</span>
                    </div>

                    {/* Email and Password Inputs */}
                    <form className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-2 bg-[#EFEBEB] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                className="w-full px-4 py-2 pr-10 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="inline-flex items-center">
                                <input type="checkbox" className="form-checkbox mr-2" />
                                <span className="text-sm text-gray-700">Keep me signed in</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#0c0a3e] text-white py-2 rounded-md hover:bg-[#191670] transition"
                        >
                            Log In
                        </button>
                    </form>

                    {/* Bottom Links */}
                    <div className="flex justify-between text-sm text-gray-600">
                        <a href="#" className="hover:underline">
                            Forgot my password
                        </a>
                        <Link to="/registration_page" className="hover:underline z-10">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
