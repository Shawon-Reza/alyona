import React, { useState } from "react";
import { IoSearchOutline, IoAdd } from "react-icons/io5";
import Navbar from '../Components/Navbar';
import { FaPlus } from "react-icons/fa6";
import LoginPageOverLap from '../assets/LoginPageOverLap.png';
import { useNavigate } from "react-router-dom";

const dummyProducts = [
    {
        name: "Moisturising Day Cream",
        price: 32,
        match: 100,
        img: "https://i.ibb.co/DfZ0kbBC/Frame-1000002543.png",
    },
    {
        name: "Antioxidant Ginkgo Gel Booster",
        price: 64,
        match: 78,
        img: "https://i.ibb.co/DfZ0kbBC/Frame-1000002543.png",
    },
    {
        name: "Peptide Serum",
        price: 32,
        match: 50,
        img: "https://i.ibb.co/DfZ0kbBC/Frame-1000002543.png",
    },
    {
        name: "Hydrating Toner",
        price: 41,
        match: 35,
        img: "https://i.ibb.co/DfZ0kbBC/Frame-1000002543.png",
    },
    {
        name: "Moisturising Day Cream",
        price: 32,
        match: 100,
        img: "https://i.ibb.co/DfZ0kbBC/Frame-1000002543.png",
    },
    {
        name: "Antioxidant Ginkgo Gel Booster",
        price: 64,
        match: 78,
        img: "https://i.ibb.co/DfZ0kbBC/Frame-1000002543.png",
    },
    {
        name: "Peptide Serum",
        price: 32,
        match: 50,
        img: "https://i.ibb.co/DfZ0kbBC/Frame-1000002543.png",
    },
    {
        name: "Hydrating Toner",
        price: 41,
        match: 35,
        img: "https://i.ibb.co/DfZ0kbBC/Frame-1000002543.png",
    }
];

const categories = ["All", "Cleanser", "Exfoliation", "Serums", "Sunscreen"];

export default function ProductLibrary() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [compatibility, setCompatibility] = useState(50);
    const navigate = useNavigate();

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
                            placeholder="Search products"
                            className="w-full pl-10 pr-4 py-2 border border-base-100 text-[18px] rounded-lg bg-[#FFFFFF] shadow-lg h-13"
                        />
                        <IoSearchOutline className="absolute left-3 top-4 text-gray-400 text-xl" />
                    </div>

                    {/* CTA */}
                    <button className="w-full bg-[#090642] hover:bg-[#1a1a4d] text-white rounded-lg py-3 text-sm font-medium flex items-center justify-center gap-2">
                        <IoAdd className="text-lg" /> Didn't find a product?
                    </button>

                    {/* Info Box */}
                    <div className="bg-[#07004D] rounded-2xl px-6 py-3 flex items-center justify-between shadow-md my-4">
                        <div>
                            <p className="text-white font-semibold text-base flex items-center gap-2">
                                <span className="text-[18px]">🧬</span> Find a product
                            </p>
                            <p className="text-[14px] text-white/70 mt-1">Add it to the waiting list</p>
                        </div>
                        <button className="bg-white/30 rounded-lg w-10 h-10 flex items-center justify-center text-white font-semibold text-lg">
                            <FaPlus />
                        </button>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-[22px] font-semibold mb-2 text-gray-800">Categorías</h4>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-3 py-1 text-[16px] sm:text-[18px] rounded-xl border ${selectedCategory === cat
                                        ? "bg-[#BB9777] text-white"
                                        : "bg-white text-gray-700 border-gray-300"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Compatibility */}
                    <div>
                        <h4 className="text-[22px] font-semibold text-gray-800 mb-2">Compatibilidad mínima</h4>
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
                            onChange={(e) => setCompatibility(e.target.value)}
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Products */}
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {dummyProducts
                        .filter((p) => p.match >= compatibility)
                        .map((product, idx) => (
                            <div
                                key={idx}
                                onClick={() => navigate('/library/product-detail')}
                                className=" p-4 rounded-xl hover:shadow-md transition cursor-pointer"
                            >
                                <div className="relative mb-4 w-full">
    <img
        src={product.img}
        alt={product.name}
        className="w-full h-[160px] sm:h-[180px] object-contain rounded-lg"
    />
    <div
        className={`absolute top-2 left-2 text-[11px] font-semibold px-2 py-1 rounded-full ${
            product.match >= 90
                ? "bg-purple-600 text-white"
                : product.match >= 70
                ? "bg-blue-500 text-white"
                : product.match >= 50
                ? "bg-pink-400 text-white"
                : "bg-gray-300 text-gray-800"
        }`}
    >
        {product.match}%
    </div>
</div>

                                <div className="text-[16px] sm:text-[18px] text-[#181818] font-bold mb-1">
                                    ${" "}{product.price.toFixed(2)}
                                </div>
                                <div className="text-[16px] sm:text-[18px] text-gray-600">{product.name}</div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
