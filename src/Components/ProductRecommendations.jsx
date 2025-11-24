import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProductRecommendations = ({ data }) => {
    // data expected: array of products with { id, name, image, compatibility (0-1), product_type }
    const navigate = useNavigate()

    const compatibleProducts = Array.isArray(data) ? data : []

    // If original data is missing or empty, render nothing (empty UI) per request
    if (!compatibleProducts.length) return null

    const toPercent = (val) => {
        const n = Number(val) || 0
        return `${Math.round(n)}%`
    }

    return (
        <div className="mt-6">
            <h3 className="font-semibold text-gray-800 mb-1">These products are compatible with your skin type</h3>
            <p className="text-sm text-gray-500 mb-4">Add one to improve your routine</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {compatibleProducts.map((prod, idx) => (
                    <button
                        key={prod.id || idx}
                        onClick={() => navigate(`/library/product-detail/${prod.id}`)}
                        className="w-full text-left bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-start justify-between hover:shadow-md transition hover:scale-101 transition-transform duration-700 ease-in-out z-10"
                    >
                        <div className="flex items-start gap-4">
                            <img src={prod.image} alt={prod.name} className="w-12 h-20 object-contain rounded-2xl" />
                            <div>
                                <p className="font-semibold text-sm text-gray-800">{prod.name}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-[10px] font-medium bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">{toPercent(prod.compatibility)}</span>
                                    <p className="text-xs text-gray-500">{prod.product_type || 'Skincare'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-6 h-6 rounded-full border border-amber-300 flex items-center justify-center mt-1">
                            <span className="text-amber-500 text-sm font-bold">✓</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default ProductRecommendations