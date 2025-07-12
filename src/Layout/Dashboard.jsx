import React, { useState } from 'react';
import AuthNav from '../Components/AuthNav';

const plans = [
    {
        title: 'Free',
        price: '0€',
        features: [
            'Basic skin analysis and profile creation',
            'Limited access to product library',
            'Basic routine tracking',
            'UV index alerts',
            'Smart AI suggestions to boost your skincare game'
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

const paymentHistory = [
    { plan: 'Premium', date: '15/06/2025', total: '7€' },
    { plan: 'Free', date: '15/05/2025', total: '0€' },
];

const Dashboard = () => {
    const [billingCycle, setBillingCycle] = useState('monthly');

    return (
        <div className="flex min-h-screen bg-[#f7f5f2] text-gray-800 px-10">
            <div className=''>
                <AuthNav></AuthNav>
            </div>

            {/* Sidebar */}
            <aside className="mt-28 w-64 ">
                {/* GENERAL */}
                <div className='bg-white shadow-md p-6 space-y-8 border-r border-gray-200 border rounded-2xl'>
                    <h2 className="text-xs font-semibold text-gray-500 uppercase mb-3">General</h2>
                    <ul className="space-y-2 text-sm text-gray-800">
                        <li className="flex items-center justify-between bg-[#f5f5f5] text-[#0b0544] font-medium px-3 py-2 rounded-md cursor-pointer">
                            Subscription Plan
                            <span className="text-xs">›</span>
                        </li>
                        <li className="flex items-center justify-between hover:bg-gray-100 px-3 py-2 rounded-md cursor-pointer">
                            Edit Profile
                            <span className="text-xs">›</span>
                        </li>
                        <li className="flex items-center justify-between hover:bg-gray-100 px-3 py-2 rounded-md cursor-pointer">
                            Skin Type Test
                            <span className="text-xs">›</span>
                        </li>
                        <li className="flex justify-between items-center hover:bg-gray-100 px-3 py-2 rounded-md cursor-pointer">
                            <span>Pregnant or breastfeeding</span>
                            <input type="checkbox" className="toggle toggle-sm" />
                        </li>
                        <li className="flex items-center justify-between hover:bg-gray-100 px-3 py-2 rounded-md cursor-pointer">
                            About my skin
                            <span className="text-xs">›</span>
                        </li>
                        <li className="flex items-center justify-between hover:bg-gray-100 px-3 py-2 rounded-md cursor-pointer">
                            Monthly skin report
                            <span className="text-xs">›</span>
                        </li>
                        <li className="flex items-center justify-between hover:bg-gray-100 px-3 py-2 rounded-md cursor-pointer">
                            Routine analysis
                            <span className="text-xs">›</span>
                        </li>
                        <li className="flex items-center justify-between hover:bg-gray-100 px-3 py-2 rounded-md cursor-pointer">
                            Badges
                            <span className="text-xs">›</span>
                        </li>
                    </ul>
                </div>

                {/* NOTIFICATIONS */}
                <div className='bg-white shadow-md p-6 space-y-8 border-r border-gray-200 border rounded-2xl mt-6'>
                    <h2 className="text-xs font-semibold text-gray-500 uppercase mb-3">Notifications</h2>
                    <div className="space-y-3 text-sm text-gray-800">
                        <div className="flex justify-between items-center px-3">
                            <span>New products</span>
                            <input type="checkbox" className="toggle toggle-sm" />
                        </div>
                        <div className="flex justify-between items-center px-3">
                            <span>UV alerts</span>
                            <input type="checkbox" className="toggle toggle-sm" />
                        </div>
                        <div className="flex justify-between items-center px-3">
                            <span>AI recommendations</span>
                            <input type="checkbox" className="toggle toggle-sm" />
                        </div>
                    </div>
                </div>

                {/* HELP */}
                <div className='bg-white shadow-md p-6 space-y-8 border-r border-gray-200 border rounded-2xl mt-6'>
                    <h2 className="text-xs font-semibold text-gray-500 uppercase mb-3">Help & Privacy</h2>
                    <div className="text-sm text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-md cursor-pointer">
                        Support
                    </div>
                </div>
            </aside>


            {/* Main Content */}
            <main className="flex-1 p-10 mt-16">
                <h1 className="text-2xl font-semibold mb-6 text-center">Subscription Plan</h1>

                {/* Billing Toggle */}
                <div className="flex items-center justify-center gap-4 mb-6">
                    <span className={billingCycle === 'monthly' ? 'font-semibold' : ''}>Monthly</span>
                    <input
                        type="checkbox"
                        className="toggle toggle-sm"
                        checked={billingCycle === 'yearly'}
                        onChange={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                    />
                    <span className={billingCycle === 'yearly' ? 'font-semibold' : ''}>Yearly</span>
                </div>


                {/* Plans */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {plans.map((plan, idx) => (
                        <div key={idx} className={`rounded-2xl p-6 shadow-md ${plan.bg}`}>
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-lg font-semibold">{plan.title}</h2>
                                <span className="text-sm">{plan.price}</span>
                            </div>
                            <ul className="text-sm text-gray-700 space-y-2 mb-4">
                                {plan.features.map((feature, i) => (
                                    <li key={i}>✓ {feature}</li>
                                ))}
                            </ul>
                            <button className="bg-[#0b0544] text-white text-sm py-2 px-4 rounded-md">
                                Change plan
                            </button>
                        </div>
                    ))}
                </div>

                {/* Payment History */}
                <h2 className="text-xl font-semibold mb-4">Payment History</h2>
                <table className="w-full text-sm text-left border">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="p-3">Subscription Plan</th>
                            <th className="p-3">Payment Date</th>
                            <th className="p-3">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentHistory.map((item, i) => (
                            <tr key={i} className="border-t">
                                <td className="p-3">{item.plan}</td>
                                <td className="p-3">{item.date}</td>
                                <td className="p-3">{item.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default Dashboard;
