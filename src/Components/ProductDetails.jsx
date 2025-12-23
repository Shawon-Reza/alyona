import { FaLeaf, FaPaw, FaThumbsUp, FaThumbsDown, FaStar, FaRegStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { SiOrganicmaps } from "react-icons/si";
import { GiFragrance } from "react-icons/gi";
import { MdPregnantWoman } from "react-icons/md";

export default function ProductDetails() {

    const product = useSelector((state) => state.product?.details?.details || {});
    console.log(product)
    const reviews = product?.reviews?.reviews || []
    console.log("product reviews:", reviews)
    const BASE_REPO_URL = 'http://10.10.13.80:8005';
    const buildImageUrl = (img) => {
        if (!img) return null;
        try {
            // if already absolute URL, return as-is
            if (/^https?:\/\//i.test(img)) return img;
            // otherwise prefix base
            return `${BASE_REPO_URL}${img}`;
        } catch (e) {
            return img;
        }
    }

    // Add loading state or handle the case when product is not loaded
    if (!product || Object.keys(product).length === 0) {
        return <div>Loading...</div>; // Or use a spinner here
    }

    return (
        <div className="p-6 sm:p-8 text-[#181818]">
            {/* Top: Icons */}
            <div className="flex flex-col gap-10 mb-6 text-[14px]">

                <div className="flex flex-row gap-2 items-center text-gray-700 ">
                    {
                        product?.natural ? (
                            <>
                                <div className="flex gap-1 items-center justify-center text-center ">
                                    <FaLeaf className="text-2xl text-[#88c099]" />
                                    <span className="mt-2">{product?.natural} natural ingredients</span>
                                </div>
                            </>
                        ) : null
                    }
                    {
                        product?.organic ? (
                            <>
                                <div className="flex gap-1 items-center justify-center text-center">
                                    <SiOrganicmaps color="#88c099" className="text-2xl" />
                                    <span className="mt-2">{product?.organic} organic ingredients</span>
                                </div>
                            </>
                        ) : null
                    }
                    {
                        product?.pregnancy_safe ? (
                            <>
                                <div className="flex gap-1 items-center justify-center text-center">
                                    <MdPregnantWoman color="#88c099" className="text-2xl" />
                                    <span className="mt-2">pregnancy safe</span>
                                </div>
                            </>
                        ) : null
                    }
                    {
                        product?.fragrance_free ? (
                            <>
                                <div className="flex gap-1 items-center justify-center text-center">
                                    <GiFragrance color="#88c099" className="text-2xl" />
                                    <span className="mt-2">fragrance free</span>
                                </div>
                            </>
                        ) : null
                    }

                </div>
                {/* <div className="flex flex-col items-center text-center text-gray-700">
                    <FaPaw className="text-2xl text-[#88c099]" />
                    <span className="mt-2">Cruelty free</span>
                </div> */}

                {
                    product?.concerns ? (
                        <div className="flex flex-wrap gap-4">
                            {product.concerns.map((concern, index) => (
                                <div
                                    key={index}
                                    className="
            flex items-center justify-center text-center text-gray-700
            bg-[#FAFAFA] shadow-sm
            p-1.5 px-2 border border-gray-300 rounded-xl
            break-words whitespace-normal
          "
                                >
                                    <span>{concern}</span>
                                </div>
                            ))}
                        </div>
                    ) : null
                }


                {
                    product?.fragrance_notes ? (
                        <div className="flex gap-4 ">
                            {
                                product?.fragrance_notes.map((note, index) => (
                                    <div key={index} className=" flex items-center justify-center text-center text-gray-700
            bg-[#FAFAFA] shadow-sm
            p-1.5 px-2 border border-gray-300 rounded-xl
            break-words whitespace-normal
                                    ">
                                        <span className="">{note}</span>
                                    </div>
                                ))
                            }
                        </div>
                    ) : null
                }



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
                    {product?.user_with_similar_skin_type_count || 0} users with your skin type left a review
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
            {/* <div className="flex flex-wrap gap-2">
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
            </div> */}

            {/* Display user reviews: show avatar and rating only */}
            <div className="mt-6 border border-gray-300 max-h-72 p-4 rounded-lg overflow-y-auto ">
                {Array.isArray(reviews) && reviews.length > 0 ? (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                        {reviews.map((rev, idx) => (
                            <div key={rev.id ?? idx} className="flex items-start gap-3 bg-white/30 p-3 rounded-lg shadow-sm">
                                <img
                                    src={buildImageUrl(rev.user_image) || ''}
                                    alt={rev.user || 'Reviewer'}
                                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/fallback-avatar.png'; }}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div className="font-medium text-sm text-gray-800">{rev.user || 'Anonymous'}</div>
                                        <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map((n) => (
                                                <span key={n} className="text-sm">
                                                    {n <= (Number(rev.rating) || 0) ? <FaStar className="text-amber-400" /> : <FaRegStar className="text-gray-300" />}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    {rev.description && (
                                        <p className="text-sm text-gray-600 mt-2">{rev.description}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-sm text-gray-500">No reviews yet.</div>
                )}
            </div>
        </div>
    );
}
