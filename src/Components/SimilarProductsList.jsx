import React from "react";

const products = [
    {
        name: "Tone SB",
        match: 100,
        category: "Moisturizer",
        image: "https://i.ibb.co/DfZ0kbBC/Frame-1000002543.png",
    },
    {
        name: "Purifying Toner",
        match: 79,
        category: "Toner",
        image: "https://i.ibb.co/DfZ0kbBC/Frame-1000002543.png",
    },
    {
        name: "Hydrating Toner",
        match: 100,
        category: "Moisturizer",
        image: "https://i.ibb.co/DfZ0kbBC/Frame-1000002543.png",
    }
];

export default function SimilarProductsList() {
    return (
        <div className="flex flex-wrap gap-4 sm:gap-6">
            {products.map((product, index) => (
                <div
                    key={index}
                    className="bg-white max-w-[215px] w-full rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition px-1"
                >
                    <div className="w-full h-[230px] flex items-center justify-center overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="py-4">
                        <h4 className="text-lg font-semibold text-gray-800">{product.name}</h4>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-purple-500">
                                {product.match}%
                            </span>
                            <span className="text-[18px] text-gray-500">{product.category}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
