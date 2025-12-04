import axiosApi from '@/api/axiosApi'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Image_not_available from "../../assets/Image_not_available.png"

const ProductRecommendation = () => {
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['product-recommendation'],
        queryFn: async () => {
            const res = await axiosApi.post('/chatbot/api/v1/product-recommendation')
            return res.data
        },
        keepPreviousData: true,
    })

    console.log(data)

    if (isLoading) return <div className="text-center text-gray-500">Loading...</div>
    if (isError) return <div className="text-center text-red-500">An error has occurred: {error?.message || 'Unknown'}</div>

    // Normalize possible response shapes (support backend returning `{ recommended_products: [...] }`)
    let items = [];
    if (Array.isArray(data)) items = data;
    else if (Array.isArray(data?.recommended_products)) items = data.recommended_products;
    else if (Array.isArray(data?.results)) items = data.results;
    else items = [];

    return (
        <div className="p-4">
            <h3 className="text-lg font-semibold mb-3">Product recommendations</h3>
            {items && items.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((it, i) => {
                        const id = it?.product_id || it?.id || i;
                        const name = it?.product_name || it?.title || it?.name || it?.productName || 'Recommendation';
                        const img = it?.image_url || it?.image || '';
                        return (
                            <li key={id} className="p-4 border border-gray-300 rounded-xl bg-white/60 flex flex-col items-start gap-3 shadow-lg">
                                {img ? (
                                    <img src={img} alt={name} className="w-full h-40 rounded-md object-cover" />
                                ) : (
                                    <img src={Image_not_available} alt="Image not available" className="w-full h-40 rounded-md object-cover" />
                                )}
                                <div className="w-full flex items-center justify-between">
                                    <div>
                                        <div className="text-base font-semibold">{name}</div>
                                        {it?.compatibility_score != null && (
                                            <div className="text-sm text-gray-500">Score: {it.compatibility_score}%</div>
                                        )}
                                    </div>
                                    {id && (
                                        <a href={`/library/product-detail/${id}`} target="_blank" rel="noreferrer" className="text-sm text-blue-600 ml-4">View</a>
                                    )}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            ) : (
                <div className="text-sm text-gray-500">No recommendations available.</div>
            )}
        </div>
    )
}

export default ProductRecommendation