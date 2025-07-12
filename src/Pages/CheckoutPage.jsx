import React, { useState } from 'react';
import { FaTag } from 'react-icons/fa';
import LoginPageOverLap from '../assets/LoginPageOverLap.png';
import AuthNav from '../Components/AuthNav';

const CheckoutPage = () => {
    const [discountCode, setDiscountCode] = useState('PROMO-25');
    const originalPrice = 7.0;
    const discount = 1.0;
    const total = originalPrice - discount;

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log('Form Data:', data);
    };

    return (
        <div className="min-h-screen bg-white px-3 py-10 md:px-16 lg:px-32 relative">
            <div className="mb-20">
                <AuthNav />
            </div>

            <div className="absolute bottom-0 right-0">
                <img src={LoginPageOverLap} alt="OverlapIMG" />
            </div>

            <form onSubmit={handleSubmit} className="mb-8 xl:mx-44 px-4">
                {/* Breadcrumb */}
                <nav className="text-gray-500 mb-12 text-center text-2xl">
                    <span>Subscription packages</span>
                    <span className="mx-1 text-2xl">›</span>{' '}
                    <span className="font-medium text-black">Subscribe</span>
                </nav>

                {/* Plan Summary */}
                <div className="bg-gradient-to-b from-[#f6ede7] to-[#f5e5d9] rounded-xl p-6 mb-6 shadow-md">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-semibold">Premium</h2>
                        <div className="text-sm font-medium text-gray-700">
                            <span className="line-through mr-2 text-xl">7€</span>
                            <span className="text-black text-xl">6€</span>
                        </div>
                    </div>
                    <ul className="text-gray-700 space-y-3">
                        <li>✓ All free features</li>
                        <li>✓ Monthly reports on your skincare progress</li>
                        <li>✓ Free skincare consultation once a month, send a request for your routine being analyzed by a real human</li>
                    </ul>
                </div>

                {/* Card Information */}
                <div className="mb-6">
                    <h3 className="text-md font-semibold mb-3">Card information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            name="cardName"
                            placeholder="Card name"
                            className="input input-bordered w-full text-sm h-10 md:h-12 lg:h-14"
                            required
                        />
                        <input
                            type="text"
                            name="cardNumber"
                            placeholder="Card number"
                            className="input input-bordered w-full text-sm h-10 md:h-12 lg:h-14"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="expiry"
                            placeholder="MM/YY"
                            className="input input-bordered w-full text-sm h-10 md:h-12 lg:h-14"
                            required
                        />
                        <input
                            type="text"
                            name="cvv"
                            placeholder="CVV"
                            className="input input-bordered w-full text-sm h-10 md:h-12 lg:h-14"
                            required
                        />
                    </div>
                </div>

                {/* Discount Code */}
                <div className="mb-6">
                    <h3 className="text-md font-semibold mb-2">Do you have a discount code?</h3>
                    <div className="relative">
                        <input
                            type="text"
                            name="discountCode"
                            className="input input-bordered w-1/2 pl-10 text-sm h-10 md:h-12 lg:h-14"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                        />
                        <FaTag className="absolute left-3 top-3 md:top-3.5 lg:top-4 text-gray-400" />
                    </div>
                </div>

                {/* Pricing Summary */}
                <div className="text-sm text-gray-700 space-y-1 mb-8">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{originalPrice.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Discount</span>
                        <span className="text-red-600">- {discount.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between font-semibold text-black text-base mt-2">
                        <span>Total</span>
                        <span>{total.toFixed(2)} €</span>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-[#0b0544] hover:bg-[#1a0f66] text-white text-sm py-3 rounded-md transition font-medium"
                >
                    Subscribe
                </button>
            </form>
        </div>
    );
};

export default CheckoutPage;
