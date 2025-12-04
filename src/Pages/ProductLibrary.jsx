import React, { useEffect, useMemo, useState } from "react";
import { IoSearchOutline, IoAdd } from "react-icons/io5";
import { BsCheck2Circle } from 'react-icons/bs'
import Navbar from "../Components/Navbar";
import { FaPlus } from "react-icons/fa6";
import LoginPageOverLap from "../assets/LoginPageOverLap.png";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosApi from "@/api/axiosApi";
import { AiOutlineFileSearch, AiFillStar } from "react-icons/ai";
import { toast } from "react-toastify";
import { MdBookmarkAdded, MdRateReview } from "react-icons/md";

export default function ProductLibrary() {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [compatibility, setCompatibility] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const navigate = useNavigate();

    // --- Debounce search ---
    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(searchValue.trim()), 400);
        return () => clearTimeout(t);
    }, [searchValue]);

    // --- Categories ---
    const {
        isLoading: categoriesLoading,
        error: categoriesError,
        data: categoriesData,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await axiosApi.get("/products/api/v1/categories");
            return res.data;
        },
        refetchOnWindowFocus: false,
    });

    const categories = useMemo(() => {
        // Accept both: ["Cleanser", "Serums"] or {results: [...]}
        const raw =
            Array.isArray(categoriesData?.results)
                ? categoriesData.results
                : Array.isArray(categoriesData)
                    ? categoriesData
                    : [];

        // Each item can be a string or an object with .name
        const names = raw.map((c) => (typeof c === "string" ? c : c?.name)).filter(Boolean);

        // Add "All" (empty filter) at front
        return ["All", ...names];
    }, [categoriesData]);

    // --- Products list ---
    const {
        isFetching,
        error: productsError,
        data,
    } = useQuery({
        queryKey: ["productDetails", compatibility, selectedCategory, debouncedSearch],
        queryFn: async () => {
            const categoryParam = selectedCategory === "All" ? "" : selectedCategory;
            const res = await axiosApi.get(
                `/products/api/v1/recommended-product-list` +
                `?max_score=${Number.isFinite(compatibility) ? compatibility : 100}` +
                `&category=${encodeURIComponent(categoryParam || "")}` +
                `&search=${encodeURIComponent(debouncedSearch || "")}`
            );
            return res.data;
        },
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });

    console.log(data)
    
    const products = data?.results ?? [];
    const handleAddProductRequest = async () => {
        try {
            const res = await axiosApi.post('/products/api/v1/request-new-product', {
                name: searchValue
            });
            toast.success("Product added to waitlist");
            console.log("Product added to waitlist:", res.data);
        } catch (err) {
            console.error("Error adding product to waitlist:", err);
            toast.error("Failed to add product to waitlist");
        }
    };




    return (
        <div className="p-4 sm:p-6 px-6 sm:px-10 min-h-screen bg-gradient-to-b from-[#FAFAFA] via-[#FFFFFF] to-[#F5EADF] relative">
            {/* Overlay decoration */}
            <div className="hidden sm:block absolute bottom-10 right-10 z-0">
                <img src={LoginPageOverLap} alt="OverlapIMG" className="scale-110" />
            </div>

            {/* Navbar */}
            <div className="mb-10 sm:mb-14">
                <Navbar />
            </div>

            {/* Content */}
            <div className="flex flex-col lg:flex-row gap-6 relative z-10">
                {/* Sidebar */}
                <div className="w-full lg:w-1/4 space-y-6">
                    {/* Search */}
                    <div className="relative">
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Search products"
                            className="w-full pl-10 pr-4 py-2 border border-base-100 text-[18px] rounded-lg bg-[#FFFFFF] shadow-lg h-13"
                        />
                        <IoSearchOutline className="absolute left-3 top-4 text-gray-400 text-xl" />
                    </div>
                    {isFetching && (
                        <div className="text-sm text-gray-500">Loading…</div>
                    )}
                    {productsError && (
                        <div className="text-sm text-red-600">Error: {productsError.message}</div>
                    )}



                    {/* Info Box */}
                    <div className="bg-[#07004D] rounded-2xl px-6 py-3 flex items-center justify-between shadow-md my-4">
                        <div>
                            <p className="text-white font-semibold text-base flex items-center gap-2">
                                <span className="text-[18px]"><AiOutlineFileSearch size={22} />
                                </span> Don't find a product ?
                            </p>
                            <p className="text-[14px] text-white/70 mt-1">Add it to the waiting list</p>
                        </div>
                        <button

                            onClick={() => {
                                handleAddProductRequest()
                            }}
                            className="bg-white/30 rounded-lg w-10 h-10 flex items-center justify-center text-white font-semibold text-lg cursor-pointer hover:bg-white/40 transition">
                            <FaPlus />
                        </button>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-[22px] font-semibold mb-2 text-gray-800">Categorías</h4>
                        {categoriesError && (
                            <div className="text-sm text-red-600 mb-2">
                                Failed to load categories
                            </div>
                        )}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => {
                                const value = cat === "All" ? "" : cat;
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-3 py-1 text-[16px] sm:text-[18px] rounded-xl border cursor-pointer ${(selectedCategory || "All") === cat
                                            ? "bg-[#BB9777] text-white"
                                            : "bg-white text-gray-700 border-gray-300"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Compatibility */}
                    <div>
                        <h4 className="text-[22px] font-semibold text-gray-800 mb-2">
                            Choose Minimum Compatibility
                        </h4>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                            <span>0%</span>
                            <span>{compatibility}%</span>
                            <span>100%</span>
                        </div>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={compatibility}
                            onChange={(e) => setCompatibility(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Products */}
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.length === 0 && !isFetching && (
                        <div className="col-span-full text-gray-500 text-sm">
                            No products found. Try adjusting filters.
                        </div>
                    )}

                    {products.map((product) => {
                        const score = Number(product?.compatibility_score ?? 0);
                        return (
                            <div
                                key={product?.id}
                                onClick={() => navigate(`/library/product-detail/${product?.id}`)}
                                className="p-4 rounded-xl hover:shadow-md transition cursor-pointer"
                            >
                                <div className="relative mb-4 w-full">
                                    <img
                                        src={product?.image_url}
                                        alt={product?.name}
                                        className="w-full h-[160px] sm:h-[180px] object-contain rounded-lg"
                                    />
                                    <div
                                        className={`absolute top-2 left-2 text-[11px] font-semibold px-2 py-1 rounded-full ${score >= 90
                                            ? "bg-purple-600 text-white"
                                            : score >= 70
                                                ? "bg-blue-500 text-white"
                                                : score >= 50
                                                    ? "bg-pink-400 text-white"
                                                    : "bg-gray-300 text-gray-800"
                                            }`}
                                    >
                                        {Math.round(score)}%
                                    </div>
                                    {/* badges: tracker (in routine) and review */}
                                    <div className="absolute top-2 right-2 flex flex-col items-end gap-2">
                                        {product?.is_in_routine && (
                                            <div title="In routine" className="bg-white rounded-full p-1 shadow-sm">
                                                <MdBookmarkAdded className="text-green-600 w-5 h-5" />
                                            </div>
                                        )}
                                        {product?.is_reviewed && (
                                            <div title="Reviewed" className="bg-white rounded-full p-1 shadow-sm">
                                                <MdRateReview className="text-yellow-400 w-5 h-5" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="text-[16px] sm:text-[18px] text-[#181818] font-bold mb-1">
                                    {product?.price_range ?? ""}
                                </div>
                                <div className="text-[16px] sm:text-[18px] text-gray-600">
                                    {product?.name}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
