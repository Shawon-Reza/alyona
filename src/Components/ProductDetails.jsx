import { FaLeaf, FaPaw, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function ProductDetails() {

    const product = useSelector((state) => state.product?.details?.details || {});
    console.log(product)
    // Add loading state or handle the case when product is not loaded
    if (!product || Object.keys(product).length === 0) {
        return <div>Loading...</div>; // Or use a spinner here
    }

    return (
        <div className="p-6 sm:p-8 text-[#181818]">
            {/* Top: Icons */}
            <div className="flex items-center gap-10 mb-6 text-[14px]">
                <div className="flex flex-col items-center text-center text-gray-700">
                    <FaLeaf className="text-2xl text-[#88c099]" />
                    <span className="mt-2">{product?.natural} natural ingredients</span>
                </div>
                {/* <div className="flex flex-col items-center text-center text-gray-700">
                    <FaPaw className="text-2xl text-[#88c099]" />
                    <span className="mt-2">Cruelty free</span>
                </div> */}
            </div>

            {/* Skin Type */}
            <div className="mb-4">
                <p className="font-bold text-[22px] text-gray-900">
                    Recommended for skin type:
                </p>
                <div className="flex gap-2 ">
                    {
                        // Check if recommended_skin_types exists before calling .map
                        product?.recommended_skin_types?.length > 0 ? (
                            product?.recommended_skin_types.slice(0, 5).map((type, index) => (
                                <p key={index} className="text-gray-700 mt-1 text-[18px]">{type}</p>
                            ))
                        ) : (
                            <p>No skin types available</p> // Fallback if no skin types
                        )
                    }
                </div>
            </div>

            {/* Reviews */}
            <div className="mb-4 relative">
                <p className="font-bold text-[22px] text-gray-900">Reviews</p>
                <p className="text-gray-700 mt-1 text-[18px]">
                    {/* Show number of reviews if available, or fallback */}
                    {product?.user_with_similar_skin_type_count || 0 } users with your skin type left a review
                </p>

                {/* Reaction Row */}
                <div className="absolute top-0 right-0 flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-[#af8563] font-semibold">
                        <FaThumbsUp className="text-[18px] cursor-pointer" />
                        <span className="text-[16px]">{product?.reviews?.likes || 0}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 font-semibold">
                        <FaThumbsDown className="text-[18px] cursor-pointer" />
                        <span className="text-[16px]">{product?.reviews?.dislikes || 0}</span>
                    </div>
                </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
                {
                    // Check if tags exist before rendering
                    product?.tags?.length > 0 ? (
                        product?.tags.map((tag) => (
                            <span
                                key={tag}
                                className="bg-white text-gray-600 px-3 py-1 rounded-lg text-sm border border-gray-200 shadow-sm"
                            >
                                {tag}
                            </span>
                        ))
                    ) : (
                        <span className="bg-white text-gray-600 px-3 py-1 rounded-lg text-sm border border-gray-200 shadow-sm">
                            No tags available
                        </span>
                    )
                }
            </div>
        </div>
    );
}
