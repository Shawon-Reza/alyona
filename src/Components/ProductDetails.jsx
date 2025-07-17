import { FaLeaf, FaPaw, FaThumbsUp, FaThumbsDown } from "react-icons/fa";

export default function ProductDetails() {
    return (
        <div className=" p-6 sm:p-8 text-[#181818] ">
            {/* Top: Icons */}
            <div className="flex items-center gap-10 mb-6 text-[14px]">
                <div className="flex flex-col items-center text-center  text-gray-700">
                    <FaLeaf className="text-2xl text-[#88c099]" />
                    <span className="mt-2">99% natural ingredients</span>
                </div>
                <div className="flex flex-col items-center text-center  text-gray-700">
                    <FaPaw className="text-2xl text-[#88c099]" />
                    <span className="mt-2">Cruelty free</span>
                </div>
            </div>

            {/* Skin Type */}
            <div className="mb-4">
                <p className="font-bold text-[22px] text-gray-900">
                    Recommended for skin type:
                </p>
                <p className="text-gray-700 mt-1 text-[18px]">Nomal, Dray</p>
            </div>

            {/* Reviews */}
            <div className="mb-4 relative">
                <p className="font-bold text-[22px] text-gray-900">Reviews</p>
                <p className="text-gray-700 mt-1 text-[18px]">
                    15 users with your skin type left a positive review
                </p>


                {/* Reaction Row */}
                <div className="absolute top-0 right-0 flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-[#af8563] font-semibold">
                        <FaThumbsUp className="text-[18px] cursor-pointer" />
                        <span className="text-[16px]">35</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 font-semibold">
                        <FaThumbsDown className="text-[18px] cursor-pointer" />
                        <span className="text-[16px]">2</span>
                    </div>
                </div>
            </div>



            {/* Tags */}
            <div className="flex flex-wrap gap-2">
                {["Awesome results", "Texture", "Smell"].map((tag) => (
                    <span
                        key={tag}
                        className="bg-white text-gray-600 px-3 py-1 rounded-lg text-sm border border-gray-200 shadow-sm"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}
