import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthNav from '../Components/AuthNav';
import LoginPageOverLap from '../assets/LoginPageOverLap.png';
import AuthenticationNav from '../Components/AuthenticationNav';

const plans = [
    {
        title: 'Free',
        price: '0€',
        features: [
            'Basic skin analysis and profile creation',
            'Limited access to product library',
            'Basic routine tracking',
            'UV index alerts',
            'Smart AI suggestions to boost your skincare game',
        ],
        bg: 'bg-white',
    },
    {
        title: 'Premium',
        price: '7€',
        features: [
            'All free features',
            'Monthly reports on your skincare progress',
            'Free skincare consultation once a month, send a request for your routine being analyzed by a real human',
        ],
        bg: 'bg-gradient-to-b from-[#f6ede7] to-[#f5e5d9]',
    },
    {
        title: 'Luxury',
        price: '17€',
        features: [
            'All standard features',
            'Skincare coach',
            'Live chat with your curator',
        ],
        bg: 'bg-gradient-to-b from-[#d5ccf5] to-[#f4d9d8]',
    },
];

const SubscriptionPlans = () => {
    const navigate = useNavigate();
    const [isYearly, setIsYearly] = useState(false); // false = Monthly, true = Yearly

    const handleToggle = (e) => {
        setIsYearly(e.target.checked);
        console.log(e.target.checked ? 'Yearly' : 'Monthly');
    };



    return (
        <div className="min-h-screen bg-white px-4 md:px-10 pt-5 relative">
            <div>
                <AuthenticationNav></AuthenticationNav>
            </div>
            <div className="absolute bottom-15 right-15 hidden sm:block">
                <img src={LoginPageOverLap} alt="OverlapIMG" className='scale-120' />
            </div>

            <div className="text-center mb-6">
                <h1 className="text-2xl md:text-3xl font-semibold my-10">
                    Subscribe now and begin your skincare journey today
                </h1>
                <div className="text-sm text-gray-500 flex justify-center items-center gap-4">
                    <span className={!isYearly ? 'underline font-semibold' : ''}>Monthly</span>
                    <input
                        type="checkbox"
                        className="toggle theme-controller"
                        onChange={handleToggle}
                        checked={isYearly}
                    />
                    <span className={isYearly ? 'underline font-semibold' : ''}>Yearly</span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto  sm:mt-20 z-10 relative">
                {plans.map((plan, idx) => (
                    <div
                        key={idx}
                        className={`rounded-2xl p-6 shadow-md ${plan.bg} flex flex-col justify-between`}
                    >
                        <div>
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-lg font-semibold">{plan.title}</h2>
                                <span className="text-sm font-medium">{plan.price}</span>
                            </div>
                            <ul className="text-sm space-y-4 text-gray-700">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-green-600 mt-0.5">✓</span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button
                            onClick={() => {
                                navigate('/SubscriptionPlans/CheckoutPage');
                            }}
                            className="mt-20 lg:mt-25 cursor-pointer bg-[#0b0544] hover:bg-[#1a0f66] text-white text-sm py-2 rounded-md transition">
                            Choose this option
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubscriptionPlans;
