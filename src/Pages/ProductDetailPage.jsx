
import { Plus } from 'lucide-react';
import dummyImage from '../assets/Productimgfordetails.png'; // Replace later
import LoginPageOverLap from '../assets/LoginPageOverLap.png';
import Navbar from '../Components/Navbar';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import axiosApi from '@/api/axiosApi';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setProductDetails } from '@/store/productSlice';
import { toast } from 'react-toastify';


const ProductDetailPage = () => {
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [texture, setTexture] = useState('');
    const [packaging, setPackaging] = useState('');
    const [skinFeel, setSkinFeel] = useState('');

    const dispatch = useDispatch()

    const { id } = useParams();
    console.log(id)

    const handleReviewSubmit = async () => {
        try {
            console.log("Review Submitted:");
            console.log("Text:", reviewText);
            console.log("Rating:", rating);
            console.log("Texture:", texture);
            console.log("Packaging:", packaging);
            console.log("Skin Feel:", skinFeel);

            const payload = {
                description: reviewText,
                rating: Number(rating),
                texture,
                packaging,
                skin_feel: skinFeel,
            };

            const response = await axiosApi.post(`/products/api/v1/review/${id}`, payload);
            console.log("✅ Review submitted successfully:", response.data);

            setReviewText("");
            setRating(0);
            setTexture("");
            setPackaging("");
            setSkinFeel("");
            toast.success("Review submitted!");

        } catch (error) {
            console.error("❌ Error submitting review:", error.response?.data || error.message);
            toast.error("Failed to submit review. Please try again. ");
        }
    };

    // Fetch product details using React Query
    const { isPending, error, data } = useQuery({
        queryKey: ['productDetails',id],
        queryFn: async () => {
            const res = await axiosApi.get(`/products/api/v1/product-detail/${id}`);
            return res.data
        },

    })

    // ✅ Save to Redux when data is available
    useEffect(() => {
        if (data) {
            dispatch(setProductDetails(data))
        }
    }, [data, dispatch])


    if (isPending) return <p>Loading...</p>

    if (error) return <p>An error has occurred: {error.message}</p>

    console.log(data)


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
                            <div className="w-full h-[340px] sm:h-[465px]  rounded-lg overflow-hidden flex items-center justify-center ">
                                <img
                                    src={data?.image || dummyImage}
                                    alt="Product"
                                    className="w-full h-full object-cover cursor-pointer hover:scale-103 rounded-lg transition duration-300"
                                />
                            </div>
                            <span className="absolute top-2 left-2 bg-[#5b52e6] text-white text-xs font-bold px-2 py-1 rounded-md">
                                {Math.round(data?.compatibility || 0)}% compatible
                            </span>
                        </div>

                        {/* Review Button */}
                        <button
                            onClick={() => setShowReviewForm(!showReviewForm)}
                            className="w-full bg-[#D2B8A1] hover:bg-[#a87755] transition text-base sm:text-[18px] font-bold text-white py-2 rounded-md cursor-pointer hover:scale-103 "
                        >
                            {showReviewForm ? "Cancel" : "Share my review"}
                        </button>

                        {/* Review Form - Conditionally rendered */}
                        <AnimatePresence>
                            {showReviewForm && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full bg-white/70 rounded-md p-4 shadow-md"
                                >
                                    <h3 className="text-lg font-semibold mb-2">Your Review</h3>

                                    {/* Review Textarea */}
                                    <textarea
                                        rows={4}
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        placeholder="Write your review..."
                                        className="w-full border border-[#a87755] rounded-md p-2 mb-3 text-sm"
                                    />

                                    {/* Rating */}
                                    <div className="flex gap-2 items-center mb-4">
                                        <span className="text-sm">Rating:</span>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span
                                                key={star}
                                                onClick={() => setRating(star)}
                                                className={`text-xl cursor-pointer ${star <= rating ? "text-amber-500" : "text-gray-300"}`}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>

                                    {/* Texture */}
                                    <div className="mb-4">
                                        <span className="text-sm font-semibold">Texture:</span>
                                        <div className="flex gap-4 mt-2">
                                            {["Like", "Dislike", "Not sure"].map((option) => (
                                                <label key={option} className="text-sm">
                                                    <input
                                                        type="radio"
                                                        value={option}
                                                        checked={texture === option}
                                                        onChange={(e) => setTexture(e.target.value)}
                                                    />
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Packaging */}
                                    <div className="mb-4">
                                        <span className="text-sm font-semibold">Packaging:</span>
                                        <div className="flex gap-4 mt-2">
                                            {["Like", "Dislike", "Not sure"].map((option) => (
                                                <label key={option} className="text-sm">
                                                    <input
                                                        type="radio"
                                                        value={option}
                                                        checked={packaging === option}
                                                        onChange={(e) => setPackaging(e.target.value)}
                                                    />
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Skin Feel */}
                                    <div className="mb-4">
                                        <span className="text-sm font-semibold">Skin Feel:</span>
                                        <div className="flex gap-4 mt-2">
                                            {["Like", "Dislike", "Not sure"].map((option) => (
                                                <label key={option} className="text-sm">
                                                    <input
                                                        type="radio"
                                                        value={option}
                                                        checked={skinFeel === option}
                                                        onChange={(e) => setSkinFeel(e.target.value)}
                                                    />
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        onClick={handleReviewSubmit}
                                        className="w-full bg-[#BB9777] text-white font-semibold py-2 rounded-md hover:bg-[#a87755] transition cursor-pointer hover:scale-103"
                                    >
                                        Submit Review
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>


                        {/* Routine Button */}
                        <button className="w-full flex items-center justify-between gap-2 bg-[#0c0c33] text-white text-base sm:text-[18px] font-bold py-2 px-6 rounded-md hover:bg-[#1a1a4d] transition cursor-pointer hover:scale-103">
                            Add to my routine
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>
                </div>


                {/* Left Side (Text Content) */}
                <div className="sm:col-span-3 flex-1 space-y-4">
                    <h1 className="text-xl sm:text-[28px] font-semibold">{data?.productName}</h1>
                    <p className="text-base sm:text-lg font-medium">32.00 €</p>

                    {/* Sizes */}
                    <div>
                        <h4 className="text-lg sm:text-[22px] font-semibold mb-2">Available size</h4>
                        <div className="flex gap-2 flex-wrap">
                            {
                                (data?.available_sizes || []).map((size, idx) => (

                                    <button
                                        key={idx}
                                        className="px-3 py-1 border border-gray-300 text-sm rounded-lg hover:bg-gray-100">{size}</button>
                                ))

                            }

                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-[15px] sm:text-[18px] text-gray-700 leading-relaxed">
                        {
                            data?.description || "Description not available...."
                        }
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
