import React from 'react';
import Subscribe from '../Components/Subscribe';
import AuthNav from '../Components/AuthNav';
import LoginPageOverLap from '../assets/LoginPageOverLap.png';

const CheckoutPage = () => {
    return (
        <div className="relative min-h-screen bg-white px-3 py-10 md:px-16 lg:px-32">
            {/* Top Nav */}
            <div className="mb-20">
                <AuthNav />
            </div>
            <nav className="text-gray-500 mb-12 text-center text-2xl">
                <span>Subscription packages</span>
                <span className="mx-1 text-2xl">›</span>
                <span className="font-medium text-black">Subscribe</span>
            </nav>

            {/* Subscription Form */}
            <Subscribe />

            {/* Overlapping image */}
            <div className="absolute bottom-0 right-0 z-10">
                <img src={LoginPageOverLap} alt="OverlapIMG" />
            </div>
        </div>
    );
};

export default CheckoutPage;
