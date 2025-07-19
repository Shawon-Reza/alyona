import React from 'react';
import Subscribe from '../Components/Subscribe';
import AuthNav from '../Components/AuthNav';
import LoginPageOverLap from '../assets/LoginPageOverLap.png';
import AuthenticationNav from '../Components/AuthenticationNav';

const CheckoutPage = () => {
    return (
        <div className="relative min-h-screen bg-white px-3 py-10 md:px-16 lg:px-32">
            {/* Top Nav */}
            <div className='-my-5'>
                <AuthenticationNav></AuthenticationNav>
            </div>
             {/* Overlapping image */}
            <div className="absolute bottom-15 right-15 z-10 hidden sm:block">
                <img src={LoginPageOverLap} alt="OverlapIMG" className='scale-120' />
            </div>


            <nav className="text-gray-500 mb-12 mt-5 text-center text-2xl">
                <span>Subscription packages</span>
                <span className="mx-1 text-2xl">›</span>
                <span className="font-medium text-black">Subscribe</span>
            </nav>

            {/* Subscription Form */}
            <div>
                <Subscribe />
            </div>

           
        </div>
    );
};

export default CheckoutPage;
