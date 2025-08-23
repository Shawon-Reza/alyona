import React, { use } from 'react'
import { useSelector } from 'react-redux';

const ProductDescription = () => {

    const product = useSelector((state) => state.product?.details?.ingredients || []);

    return (
        <div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 mt-2">
                {product.map((item, i) => (
                    <div
                        key={i}
                        className="text-sm sm:text-[16px] bg-white border border-gray-200 px-3 py-1 rounded-lg text-center truncate hover:scale-103">
                        {item?.name}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductDescription