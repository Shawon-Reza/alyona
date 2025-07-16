import React, { useState } from "react";
import { FaTag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function PromoCodeCard() {
    const navigate = useNavigate();
    const [promoCode, setPromoCode] = useState("PROMO-25");

    return (
        <div className="min-h-screen flex items-start justify-center px-4 py-10">
            <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6">
                {/* Left: Plan Info */}
                <div className="bg-gradient-to-br from-[#f3ede7] to-[#e3d5c5] p-6 rounded-xl w-full md:w-1/2 shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Premium</h3>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="line-through text-gray-400 text-lg">7€</span>
                        <span className="text-2xl font-bold text-[#1f1f1f]">6€</span>
                    </div>
                    <ul className="text-sm text-gray-700 space-y-2 leading-relaxed">
                        <li>✨ All free features</li>
                        <li>✓ Monthly reports on your skincare progress</li>
                        <li>
                            ✓ Free skincare consultation once a month — send a request for your routine being analyzed by a real human
                        </li>
                    </ul>
                </div>

                {/* Right: Promo Code Form */}
                <div className="flex-1 flex flex-col justify-between bg-white rounded-xl p-6 shadow-sm">
                    <div>
                        <label htmlFor="promo" className="text-sm text-gray-700 font-medium block mb-2">
                            Do you have a discount code?
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white">
                            <FaTag className="text-gray-400 mr-2" />
                            <input
                                id="promo"
                                type="text"
                                placeholder="Enter promo code"
                                className="flex-1 outline-none text-sm text-gray-800 bg-transparent"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                         onClick={() => {
                                   navigate('/Dashboard/Payment/subscribe');
                                }}

                        className="mt-6 z-1 cursor-pointer bg-[#0c0c33] text-white font-medium text-sm py-2 rounded-md hover:bg-[#1a1a4d] transition"
                    >
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    );
}
