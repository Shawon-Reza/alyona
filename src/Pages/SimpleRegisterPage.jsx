import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdPerson, MdEmail, MdLock, MdCalendarToday } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const SimpleRegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [accepted, setAccepted] = useState(false);

    const navigate = useNavigate()


    const handleSimpleRegisterPage = (e) => {
        e.preventDefault()


        setTimeout(() => {
            navigate('/UploadProfilePage')
        }, 2000);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fdfbf8] to-[#f8f5f2] relative font-sans text-gray-800">

            {/* Top Navigation */}
            <div className="flex justify-between items-center px-6 py-4">
                <div className="font-bold text-xl flex items-center gap-2">
                    <span className="text-2xl">🌿</span>
                    YOURSELF BEAUTY
                </div>
                <div className="flex items-center gap-4">
                    <button className="text-sm hover:underline">Log in</button>
                    <button className="border border-[#0c0a3e] text-[#0c0a3e] px-4 py-1 rounded-md hover:bg-[#0c0a3e] hover:text-white transition">Join</button>
                </div>
            </div>

            {/* Centered Form */}
            <div className=" flex items-center justify-center mt-30 px-4 py-10">
                <div className="w-full max-w-md space-y-6 text-center z-10">
                    <div>
                        <h2 className="text-2xl font-semibold">Hi Anna,</h2>
                        <p className="text-sm text-gray-600">Add necessary fields to create your account</p>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSimpleRegisterPage}
                        className="space-y-4 text-left">
                        {/* Name */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full px-10 py-2 bg-[#f6efe9] rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            />
                            <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-10 py-2 bg-[#f6efe9] rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            />
                            <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        </div>

                        {/* Birthday */}
                        <div className="relative">
                            <input
                                type="date"
                                className="w-full px-10 py-2 bg-[#f6efe9] text-gray-700 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            />
                            <MdCalendarToday className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                className="w-full px-10 py-2 pr-10 bg-[#f6efe9] rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            />
                            <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {/* Terms */}
                        <label className="flex items-center gap-2 text-sm text-gray-700 mt-2">
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
                            className={`w-full py-2 rounded-md text-white flex items-center justify-center gap-2 transition ${accepted ? 'bg-[#0c0a3e] hover:bg-[#191670]' : 'bg-gray-400 cursor-not-allowed'
                                }`}
                        >
                            Continue <span className="text-xl">→</span>
                        </button>
                    </form>
                </div>
            </div>

            {/* Background Flower Illustration */}
            <div className="absolute bottom-0 right-0 w-full h-full pointer-events-none bg-[url('/your-flower-image.svg')] bg-no-repeat bg-right-bottom bg-contain opacity-10"></div>
        </div>
    );
};

export default SimpleRegisterPage;
