import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const plans = [
    {
        title: 'Free',
        monthly: 0,
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
        monthly: 7,
        features: [
            'All free features',
            'Monthly reports on your skincare progress',
            'Free skincare consultation once a month, send a request for your routine being analyzed by a real human',
        ],
        bg: 'bg-gradient-to-b from-[#f6ede7] to-[#f5e5d9]',
    },
    {
        title: 'Luxury',
        monthly: 17,
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

const SubscriptionPlanComponent = () => {
    const [billingCycle, setBillingCycle] = useState('monthly');

    useEffect(() => {
        console.log("Billing cycle changed to:", billingCycle);
    }, [billingCycle]);

    const navigate = useNavigate();

    return (
        <div>
            {/* Main Content */}
            <main className="flex-1 ">
                <h1 className="text-2xl font-semibold mb-6 text-center">Subscription Plan</h1>

                {/* Billing Toggle */}
                <div className="flex items-center justify-center gap-4 mb-6">
                    <span className={billingCycle === 'monthly' ? 'font-semibold' : ''}>Monthly</span>
                    <input
                        type="checkbox"
                        className="toggle toggle-sm"
                        checked={billingCycle === 'yearly'}
                        onChange={() => {
                            const newCycle = billingCycle === 'monthly' ? 'yearly' : 'monthly';
                            setBillingCycle(newCycle);

                        }}
                    />
                    <span className={billingCycle === 'yearly' ? 'font-semibold' : ''}>Yearly</span>
                </div>

                {/* Plans */}
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
                    {plans.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`rounded-2xl p-6 shadow-md ${plan.bg} flex flex-col`}
                        >
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-lg font-semibold">{plan.title}</h2>
                                {(() => {
                                    const monthly = Number(plan.monthly || 0);
                                    const isYearly = billingCycle === 'yearly';
                                    const yearlyRaw = Math.round(monthly * 12 * 0.9); // 10% discount
                                    const priceDisplay = isYearly
                                        ? `${yearlyRaw}€ / year`
                                        : `${monthly}€ / month`;
                                    const savings = monthly > 0 ? Math.round((1 - (yearlyRaw / (monthly * 12))) * 100) : 0;
                                    return (
                                        <div className="text-sm text-right ">
                                            <div>{priceDisplay}</div>
                                            {isYearly && monthly > 0 && (
                                                <div className="text-xs text-gray-500 pl-2">Save {savings}% compared to monthly</div>
                                            )}
                                        </div>
                                    );
                                })()}
                            </div>
                            <ul className="text-sm text-gray-700 space-y-3 mb-15">
                                {plan.features.map((feature, i) => (
                                    <li key={i}>✓ {feature}</li>
                                ))}
                            </ul>

                            <button
                                onClick={() => {
                                    navigate('Payment/promocode')
                                }}
                                className=" pt bg-[#0b0544] text-white text-sm py-2 px-4 rounded-md w-full mt-auto">
                                Change plan
                            </button>
                        </div>
                    ))}
                </div>


                {/* Payment History */}
                <h2 className="text-xl font-semibold mb-8 xl:mt-20 text-center">Payment History</h2>

                <table className="w-full text-sm text-left overflow-hidden shadow-md rounded-2xl border border-gray-200">
                    <thead>
                        <tr className="bg-white text-gray-700">
                            <th className="p-4 font-semibold">Subscription Plan</th>
                            <th className="p-4 font-semibold">Payment Date</th>
                            <th className="p-4 font-semibold">Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-transparent">
                        {paymentHistory.map((item, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition">
                                <td className="p-4">{item.plan}</td>
                                <td className="p-4">{item.date}</td>
                                <td className="p-4">{item.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </main>
        </div>
    );
};

export default SubscriptionPlanComponent;
