const SelectUsedProduct = ({ products, selectedProducts, toggleProduct }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product) => (
                <div key={product.key}>
                    {/* Step label */}
                    <p className="font-medium mb-2 text-xl">{product.step}</p>

                    {/* Product Card */}
                    <div
                        className={`relative flex items-center gap-4 rounded-xl p-2 border border-base-300 bg-white cursor-pointer transition shadow-sm ${selectedProducts[product.key] ? "" : ""
                            }`}
                        onClick={() => toggleProduct(product.key)}
                    >
                        {/* Checkmark */}
                        <div
                            className={`absolute top-2 right-2 w-7 h-7 rounded-lg flex items-center justify-center text-xs z-10 ${selectedProducts[product.key]
                                    ? "bg-[#B1805A] text-white"
                                    : "border border-[#B1805A] text-[#B1805A]"
                                }`}
                        >
                            ✓
                        </div>

                        {/* Product Content */}
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-18 h-18 rounded-md object-cover"
                        />
                        <div>
                            <p className="font-medium text-lg">{product.name}</p>
                            <div className="flex gap-5">
                                <p className="text-sm text-blue-500">{product.percent}</p>
                                <p className="text-sm text-gray-500">{product.type}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SelectUsedProduct;
