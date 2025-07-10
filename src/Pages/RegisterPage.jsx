import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaEye, FaEyeSlash } from 'react-icons/fa';
import registerImg from '../assets/registration.png'; // Use your actual path
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [accepted, setAccepted] = useState(false);

    const navigate = useNavigate()

    const handleRegistration = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        console.log(data);

        setTimeout(() => {
            navigate('/SimpleRegisterPage')
        }, 2000)



    };




    return (
        <div className="min-h-screen flex flex-col md:flex-row font-sans overflow-hidden">

            {/* Left Side */}
            <div className="md:w-1/2 w-full relative hidden sm:block">
                <img
                    src={registerImg}
                    alt="Skin Beauty"
                    className="w-full h-full object-cover rounded-l-3xl"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white/60 via-white/10 to-transparent px-8 py-6 text-left rounded-bl-3xl">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Your Skin Journey Starts Here</h2>
                    <p className="text-sm text-gray-700">Discover personalized skincare powered by AI technology</p>
                </div>
            </div>

            {/* Right Side Form */}
            <div className="md:w-1/2 w-full flex items-center justify-center bg-gradient-to-b from-white via-[#fef7f3] to-[#f8f5f2] px-6 py-10">
                <div className="max-w-md w-full space-y-6">
                    <div className="text-left space-y-1">
                        <h2 className="text-2xl font-semibold text-gray-800">Hi Anna,</h2>
                        <p className="text-sm text-gray-600">Add necessary fields to create your account</p>
                    </div>

                    {/* Social Login */}
                    <div className="space-y-3">
                        <button className="w-full bg-white border flex items-center justify-center py-2 gap-2 rounded-md hover:bg-gray-100">
                            <FcGoogle className="text-xl" />
                            <span>Login with Google</span>
                        </button>
                        <button className="w-full bg-white border flex items-center justify-center py-2 gap-2 rounded-md hover:bg-gray-100">
                            <FaFacebookF className="text-blue-600 text-xl" />
                            <span>Log in with Facebook</span>
                        </button>
                    </div>

                    <div className="relative text-center">
                        <span className="text-gray-500 text-sm">Or</span>
                    </div>

                    {/* Registration Form */}
                    <form
                        onSubmit={handleRegistration}
                        className="space-y-4">
                        <input
                            type="text"
                            name='nickName'
                            placeholder="👤 Nickname"
                            className="w-full px-4 py-2 rounded-md bg-white border focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                        <input
                            type="text"
                            name='name'
                            placeholder="🪪 Name"
                            className="w-full px-4 py-2 rounded-md bg-white border focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                        <input
                            type="email"
                            name='email'
                            placeholder="📧 Email"
                            className="w-full px-4 py-2 rounded-md bg-white border focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                        <input
                            type="date"
                            name='date'
                            placeholder="🎂 Birthday"
                            className="w-full px-4 py-2 rounded-md bg-white border text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="🔒 Password"
                                name='password'
                                className="w-full px-4 py-2 pr-10 rounded-md bg-white border focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {/* Terms Checkbox */}
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input
                                type="checkbox"
                                checked={accepted}
                                onChange={() => setAccepted(!accepted)}
                                className="form-checkbox accent-[#0c0a3e]"
                            />
                            I accept the terms and conditions of Yourself Beauty
                        </label>

                        {/* Submit Button */}
                        <button

                            type="submit"
                            disabled={!accepted}
                            className={`w-full py-2 rounded-md text-white transition ${accepted ? 'bg-[#0c0a3e] hover:bg-[#191670]' : 'bg-gray-400 cursor-not-allowed'
                                }`}
                        >
                            Continue
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
