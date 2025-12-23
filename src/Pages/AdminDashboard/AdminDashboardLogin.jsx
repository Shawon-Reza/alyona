import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaEye, FaEyeSlash } from 'react-icons/fa';
import login from '../../assets/loginPageIMG.png';
import { data, useNavigate } from 'react-router-dom';
import LoginPageOverLap from '../../assets/LoginPageOverLap.png'
import { toast } from 'react-toastify';
import axios from 'axios';
import { baseUrl } from '../../config/config';

const AdminDashboardLogin = () => {
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleAdminLoginForm = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log('Email:', email, 'Password:', password)

        // Here you would typically send the email and password to your backend for authentication


        axios.post(`${baseUrl}accounts/api/v1/login`, { email, password })
            .then((response) => {
                console.log(response?.data.login_user_info.role)
                if (response?.data.login_user_info.role === 'admin') {
                    toast.success('Successfully Logged in as Admin');

                    navigate('/admindashboard');
                    console.log(response.data)
                    localStorage.setItem("accessToken", JSON.stringify(response.data));

                }

                else if (response?.data.login_user_info.role === 'mentor') {
                    toast.success('Successfully Logged in as Mentor');
                    navigate('/mentordashboard');
                    localStorage.setItem("accessToken", JSON.stringify(response.data));
                    return;
                } else {
                    toast.error('You are not an admin. Please use the mentor login page.');
                    return;
                }



            })
            .catch((error) => {
                console.error('Login failed:', error);
                toast.error('Login failed. Please check your credentials : ' + error.response.data.detail);
            });
    }



    return (
        <div className="relative h-screen flex flex-col md:flex-row border-15 border-white rounded-3xl shadow-2xl">

            {/* Left Side Image */}
            <div className="md:w-1/2 w-full h-96 md:h-auto hidden md:block relative ">
                <img
                    src={login}
                    alt="Beauty Woman"
                    className="w-full h-full object-cover rounded-l-3xl "
                />

                {/* Overlay */}
                <div
                    className="absolute bg-cover bg-center bg-white/50 rounded-xl mx-5 p-6 bottom-5 hidden sm:block"

                >
                    <div className="relative z-10  mx-auto text-[#181818]">
                        <h2 className="text-2xl font-semibold mb-4">
                            Join our community of beauty expert mentors
                        </h2>
                        <p className="text-sm mb-4">
                            Ready to inspire others in their beauty journey? Become a mentor today and help
                            transform lives while building your own business. Start your mentoring journey now!
                        </p>
                        <button className="bg-[#9e7e6b] hover:bg-[#7f5a3d] text-white py-2 px-6 rounded-xl text-lg font-semibold flex justify-between">
                            <span></span>
                            <span>Join</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Side Login Form */}
            <div className="md:w-1/2 w-full relative bg-gradient-to-b from-white via-[#fef7f3] to-[#f8f5f2] flex flex-col justify-center items-center px-6  h-screen rounded-3xl sm:rounded-l-none  -mt-7.5 ">

                {/* Overlay */}
                <div
                    className="absolute bg-cover bg-center rounded-xl mx-5 p-4 bottom-5 md:hidden shadow-2xl"

                >
                    <div className="absolute bg-white/50 rounded-lg"></div> {/* Semi-transparent overlay */}
                    <div className="relative z-10 max-w-2xl mx-auto text-white">
                        <h2 className="text-lg font-bold text-[#181818] mb-2">
                            Join our community of beauty expert mentors
                        </h2>
                        <p className="text-[10px] md:text-sm mb-6 text-[#181818]">
                            Ready to inspire others in their beauty journey? Become a mentor today and help
                            transform lives while building your own business. Start your mentoring journey now!
                        </p>
                        <button className="bg-[#9e7e6b] hover:bg-[#7f5a3d] text-white py-2 px-6 rounded-xl text-lg font-semibold">
                            Join
                        </button>
                    </div>
                </div>

                {/* Overlap background decoration */}
                <div className="absolute bottom-0 right-0 opacity-30 pointer-events-none z-0 hidden sm:block">
                    <img src={LoginPageOverLap} alt="Decor" />
                </div>

                <div className="w-full max-w-md space-y-8 z-10 lg:max-w-lg relative">



                    <div className="flex flex-col justify-center items-center text-center gap-8">
                        {/* <img src={NavbarLogo} alt="" className='scale-200 object-cover ' /> */}
                        <div className="text-3xl lg:text-4xl font-semibold text-gray-800">YOURSELF BEAUTY</div>
                    </div>



                    <div className="text-center text-gray-500 text-sm lg:text-base">Or</div>

                    {/* Email and Password Form */}
                    <form
                        onSubmit={handleAdminLoginForm}
                        className="space-y-5 lg:space-y-6">
                        <input
                            type="email"
                            name='email'
                            placeholder="Email"
                            className="w-full px-4 lg:px-6 py-3 lg:py-4 text-base lg:text-lg  bg-white/50 rounded-xl border border-base-200  focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                name='password'
                                className="w-full px-4 lg:px-6 py-3 lg:py-4 pr-10 text-base lg:text-lg rounded-xl bg-white/50 border border-base-200  focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash className='text-xl' /> : <FaEye className='text-xl' />}
                            </button>
                        </div>

                        <div className="flex items-center justify-between text-sm lg:text-base text-gray-700">
                            <label className="inline-flex items-center">
                                <input type="checkbox" className="form-checkbox mr-2 " />
                                <span className='text-[18px]'>Keep me signed in</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#0c0a3e] text-white py-3 lg:py-4 text-base lg:text-lg rounded-md hover:bg-[#191670] transition cursor-pointer"
                        >
                            Log In
                        </button>
                    </form>

                    {/* Bottom Links */}
                    <div className="flex flex-col items-center justify-center text-sm lg:text-base text-gray-600 h-[10%] 3xl:h-[20%] ">
                        <a href="#"
                            onClick={() => {
                                navigate('/admindashboard-reset-password')
                            }}
                            className="hover:underline text-center sm:text-left  mb-19 mt-3">
                            Forgot my password
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminDashboardLogin;
