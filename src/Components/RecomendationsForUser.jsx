import React from 'react'
import { useNavigate } from 'react-router-dom'

const RecomendationsForUser = ({ data }) => {
    const navigate = useNavigate()

    // Safely read properties from data (original format provided by parent)
    const title = data?.title || 'Recommendations'
    const traits = data?.traits || ''
    const description = data?.description || ''
    const quickTip = data?.quick_tip || ''
    const recommended = Array.isArray(data?.recommended_products) ? data.recommended_products : []

    const handleProductClick = (product) => {
        const url = product?.url || ''
        if (!url) return

        try {
            const isExternal = /^https?:\/\//i.test(url)
            if (isExternal) {
                // Open external product URL in a new tab
                window.open(url, '_blank', 'noopener')
            } else {
                // Treat as internal route — navigate within the app
                navigate(url)
            }
        } catch (err) {
            console.error('Navigation error', err)
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-md p-5">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-indigo-700 text-xl">📄</span>
                    <p className="font-bold text-xl ">{title}</p>
                </div>
                <span className="text-indigo-700 text-xl">▾</span>
            </div>

            {traits && <p className="text-sm text-gray-500 mb-3"><span className="font-semibold">Traits:</span> {traits}</p>}

            {description && <p className="text-sm text-[#5B5B5B] mb-4">{description}</p>}

            {quickTip && (
                <div className="mb-4 p-3 bg-[#f7f7ff] rounded-lg border border-gray-100">
                    <p className="text-sm font-semibold mb-1">Quick Tip</p>
                    <p className="text-sm text-[#5B5B5B]">{quickTip}</p>
                </div>
            )}

            <div>
                <p className="font-semibold mb-2">Recommended products</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-3">
                    {recommended.length === 0 && (
                        <div className="text-sm text-[#5B5B5B]">No recommendations available.</div>
                    )}

                    {recommended.map((prod, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleProductClick(prod)}
                            className="w-full text-left bg-white border border-gray-100 rounded-lg p-3 hover:shadow-sm transition flex items-center justify-between"
                        >
                            <div>
                                <div className="text-sm font-semibold">{prod?.name || 'Product'}</div>
                                {prod?.brand && <div className="text-xs text-gray-400">{prod.brand}</div>}
                            </div>
                            <div className="text-indigo-600 text-sm">Open</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RecomendationsForUser