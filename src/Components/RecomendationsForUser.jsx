import React from 'react'
import { useNavigate } from 'react-router-dom'

const RecomendationsForUser = ({ data }) => {
    const navigate = useNavigate()

    console.log(data)

    // Support two possible `data` shapes:
    // 1) An array of tip strings: ["tip1", "tip2", ...]
    // 2) An object with fields: { title, traits, description, quick_tip, recommended_products }
    const isTipsArray = Array.isArray(data);
    const tipsArray = isTipsArray ? data : (
        Array.isArray(data?.quick_tip) ? data.quick_tip : (data?.quick_tip ? [data.quick_tip] : [])
    );

    // Safely read properties from object-shaped data when available
    const title = !isTipsArray ? (data?.title || 'Recommendations') : 'Recommendations';
    const traits = !isTipsArray ? (data?.traits || '') : '';
    const description = !isTipsArray ? (data?.description || '') : '';
    const recommended = !isTipsArray && Array.isArray(data?.recommended_products) ? data.recommended_products : [];

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
                    <p className="font-bold text-xl ">Latest Tips</p>
                </div>
                <span className="text-indigo-700 text-xl">▾</span>
            </div>

            {/* {traits && <p className="text-sm text-gray-500 mb-3"><span className="font-semibold">Traits:</span> {traits}</p>} */}

            {/* {description && <p className="text-sm text-[#5B5B5B] mb-4">{description}</p>} */}

            {tipsArray && tipsArray.length > 0 && (
                <div className="mb-4">
                    <ul className=" list-inside text-sm space-y-1 grid xl:grid-cols-2 gap-2">
                        {tipsArray.map((t, i) => (
                            <li key={i} className="text-[#5B5B5B] border rounded-lg p-2 border-gray-300 shadow-lg bg-white ">{t}</li>
                        ))}
                    </ul>
                </div>
            )}

        </div>
    )
}

export default RecomendationsForUser