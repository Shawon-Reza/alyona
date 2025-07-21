import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarLogo from '../../assets/NavbarLogo.png'; // Replace with your logo
import { Mail } from 'lucide-react';
import LoginPageOverLap from '../../assets/LoginPageOverLap.png'

const AdminResetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle sending password reset request here
        console.log(`Password reset email sent to: ${email}`);
    };

    return (
        <div className="relative h-screen flex items-center justify-center bg-gradient-to-r from-[#F6F6F6] to-[#F1E2D7]">


            {/* Overlap background decoration */}
            <div className="absolute bottom-15 right-15 opacity-30 pointer-events-none z-0 hidden sm:block">
                <img src={LoginPageOverLap} alt="Decor" className='scale-120' />
            </div>

            <div className="max-w-xl w-full  p-8 rounded-xl  relative z-10">


                <h2 className="text-3xl font-semibold text-center text-[#181818] mb-6">Reset Your Password</h2>
                <p className="text-sm text-center text-[#555] mb-6">
                    Enter your email address and we'll send you instructions to reset your password.
                    Check your inbox (and spam folder) for a password reset link.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <div className='relative'>
                            <Mail size={22} className='absolute left-2 top-[30%]' />
                            <input

                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 px-4 py-3 text-lg bg-white/50 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-[#0c0a3e] text-white text-lg rounded-md hover:bg-[#191670] transition cursor-pointer"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminResetPasswordPage;
