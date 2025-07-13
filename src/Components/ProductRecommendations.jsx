import React from 'react'

const ProductRecommendations = () => {
    const compatibleProducts = [
        {
            name: "Alpha Beta Pore Perfecting Cleansing Gel",
            percent: "79%",
            type: "Gel cleanser",
            image: "https://thebioaqua.com/cdn/shop/products/product-image-924759520.jpg?v=1605491158",
        },
        {
            name: "Kakadu C Brightening Daily Cleanser",
            percent: "85%",
            type: "Gel cleanser",
            image: "https://thebioaqua.com/cdn/shop/products/product-image-924759520.jpg?v=1605491158",
        },
    ];
    return (
        <div className="mt-6">
            <h3 className="font-semibold text-gray-800 mb-1">
                These products are compatible with your skin type
            </h3>
            <p className="text-sm text-gray-500 mb-4">Add one to improve your routine</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {compatibleProducts.map((prod, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-start justify-between"
                    >
                        <div className="flex items-start gap-4">
                            <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-12 h-20 object-contain rounded-md"
                            />
                            <div>
                                <p className="font-semibold text-sm text-gray-800">{prod.name}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-[10px] font-medium bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">
                                        {prod.percent}
                                    </span>
                                    <p className="text-xs text-gray-500">{prod.type}</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-5 h-5 rounded-full border border-amber-300 flex items-center justify-center mt-1">
                            <span className="text-amber-500 text-xs font-bold">✓</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductRecommendations