import React from 'react';
import { Plus } from 'lucide-react';
import dummyImage from '../assets/Productimgfordetails.png'; // Replace later
import LoginPageOverLap from '../assets/LoginPageOverLap.png';
import Navbar from '../Components/Navbar';
import { NavLink, Outlet } from 'react-router-dom';

const ProductDetailPage = () => {
    return (
        <div className='p-4 sm:p-6 px-6 sm:px-10 min-h-screen bg-gradient-to-b from-[#FAFAFA] via-[#FFFFFF] to-[#F5EADF] relative'>
            {/* Navbar */}
            <div className='mb-10 sm:mb-14'>
                <Navbar />
            </div>

            {/* Overlay Decorative IMG */}
            <div className='hidden sm:block absolute bottom-10 right-10 z-0'>
                <img src={LoginPageOverLap} alt="OverlapIMG" className="scale-110" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-10 sm:gap-20 relative z-10">
                {/* Right Side (Image Section) - comes first on mobile */}
                {/* Right Side (Image Section) - comes first on mobile */}
                <div className="sm:col-span-2 w-full flex flex-col items-center order-first sm:order-last">
                    <div className="w-full max-w-sm flex flex-col gap-4">
                        {/* Image Box */}
                        <div className="relative w-full">
                            <div className="w-full h-[340px] sm:h-[465px] bg-white rounded-lg overflow-hidden flex items-center justify-center">
                                <img
                                    src={dummyImage}
                                    alt="Product"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <span className="absolute top-2 left-2 bg-[#5b52e6] text-white text-xs font-bold px-2 py-1 rounded-md">
                                100%
                            </span>
                        </div>

                        {/* Review Button */}
                        <button className="w-full bg-[#D2B8A1] hover:bg-[#c9b094] transition text-base sm:text-[18px] font-bold text-[#1f1f1f] py-2 rounded-md">
                            Share my review
                        </button>

                        {/* Routine Button */}
                        <button className="w-full flex items-center justify-between gap-2 bg-[#0c0c33] text-white text-base sm:text-[18px] font-bold py-2 px-6 rounded-md hover:bg-[#1a1a4d] transition">
                            Add to my routine
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>
                </div>


                {/* Left Side (Text Content) */}
                <div className="sm:col-span-3 flex-1 space-y-4">
                    <h1 className="text-xl sm:text-[28px] font-semibold">Moisturising Day Cream</h1>
                    <p className="text-base sm:text-lg font-medium">32.00 €</p>

                    {/* Sizes */}
                    <div>
                        <h4 className="text-lg sm:text-[22px] font-semibold mb-2">Available size</h4>
                        <div className="flex gap-2 flex-wrap">
                            <button className="px-3 py-1 border border-gray-300 text-sm rounded-lg hover:bg-gray-100">15 ml/ 0.5 fl oz</button>
                            <button className="px-3 py-1 border border-gray-300 text-sm rounded-lg hover:bg-gray-100">50 ml/ 1.69 fl oz</button>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-[15px] sm:text-[18px] text-gray-700 leading-relaxed">
                        Silky texture face cream absorbs quickly and provides instant hydration and nourishment.
                        Formulated with multi-molecular-weight Hyaluronic Acid and soothing Bisabolol to make your skin look
                        exceedingly dewy and plump all day long. Anti-oxidant rich Rowanberry Extract helps to protect against
                        environmental aggressors and maintain the skin's youthful appearance.
                    </p>

                    {/* Tabs */}
                    <div className="mt-6 sm:mt-8 border-b border-gray-200">
                        <div className="flex gap-6 text-base sm:text-[18px] font-medium">
                            <NavLink
                                to="."
                                end
                                className={({ isActive }) =>
                                    `pb-2 border-b-2 ${isActive
                                        ? "border-[#af8563] text-[#BB9777]"
                                        : "border-transparent text-gray-400 hover:text-black"
                                    }`
                                }
                            >
                                Ingredients
                            </NavLink>
                            <NavLink
                                to="product-details"
                                className={({ isActive }) =>
                                    `pb-2 border-b-2 ${isActive
                                        ? "border-[#af8563] text-[#BB9777]"
                                        : "border-transparent text-gray-400 hover:text-black"
                                    }`
                                }
                            >
                                Details
                            </NavLink>
                            <NavLink
                                to="similar-products"
                                className={({ isActive }) =>
                                    `pb-2 border-b-2 ${isActive
                                        ? "border-[#af8563] text-[#BB9777]"
                                        : "border-transparent text-gray-400 hover:text-black"
                                    }`
                                }
                            >
                                Similar
                            </NavLink>
                        </div>
                    </div>


                    {/* Ingredients */}
                    <Outlet></Outlet>

                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
