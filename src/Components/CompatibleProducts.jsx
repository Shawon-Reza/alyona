import React from "react";

const compatibleProducts = [
  {
    name: "Alpha Beta Pore Perfecting Cleansing Gel",
    match: "79%",
    matchColor: "bg-violet-200 text-violet-700",
    image: "/images/product1.png",
    type: "Gel cleanser",
  },
  {
    name: "Kakadu C Brightening Daily Cleanser",
    match: "85%",
    matchColor: "bg-purple-200 text-purple-700",
    image: "/images/product2.png",
    type: "Gel cleanser",
  },
];

const CompatibleProducts = () => {
  return (
    <div className="mt-6">
      <h2 className="text-base font-semibold text-gray-800">
        These products are compatible with your skin type
      </h2>
      <p className="text-sm text-gray-500 mt-1">Add one to improve your routine</p>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {compatibleProducts.map((product, i) => (
          <div
            key={i}
            className="flex items-start gap-3 border rounded-xl bg-white p-3 shadow-sm"
          >
            {/* Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-12 h-16 object-contain rounded"
            />

            {/* Info */}
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">{product.name}</p>
              <div className="flex items-center mt-1 space-x-2">
                <span
                  className={`text-[10px] font-semibold px-2 py-[2px] rounded-full ${product.matchColor}`}
                >
                  {product.match}
                </span>
                <span className="text-xs text-gray-400">{product.type}</span>
              </div>
            </div>

            {/* Checkmark */}
            <div className="text-sm text-amber-500 font-bold">✔</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompatibleProducts;
