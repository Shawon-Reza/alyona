import React from 'react'

const ProductDescription = () => {
    return (
        <div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 mt-2">
                {[
                    'Aloe juice', 'Jojoba oil', 'Betaine', 'Watercress extract', 'Blackberry extract',
                    'Rowan berry extract', 'Raspberry oil', 'Glycerin', 'Hyaluronic acid', 'Bisabolol'
                ].map((item, i) => (
                    <div key={i} className="text-sm sm:text-[16px] bg-white border border-gray-200 px-3 py-1 rounded-lg text-center truncate">
                        {item}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductDescription