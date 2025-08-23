import React from "react";
import { ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import { sync } from "framer-motion";
import axiosApi from "@/api/axiosApi";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

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
    },
];

export default function SimilarProductsList() {










    const { id } = useParams()
    //Fetch similar products from backend 
    const { isLoading, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: async () => {
            const res = await axiosApi.get(`/products/api/v1/similar-products/${id}`);
            return res.data; // axios automatically parses JSON
        },
    });
    console.log(data)

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>An error has occurred: {error.message}</p>;

    const navigate = useNavigate()



    return (
        <div className="flex flex-wrap gap-4 sm:gap-6">
            {(data || []).map((product, index) => (
                <div
                    key={index}
                    className="w-full sm:max-w-[215px] sm:px-1 bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition p-2 sm:p-0 flex sm:block items-center gap-4"
                >
                    {/* Image */}
                    <div className="w-[60px] h-[60px] sm:w-full sm:h-[230px] flex-shrink-0 flex items-center justify-center overflow-hidden -mt-1">
                        <img
                            src={product.image}
                            alt={product.name}
                            onClick={() => navigate(`/library/product-detail/${product?.id}`)}
                            className="w-full h-full object-cover  rounded-lg pt-2 cursor-pointer  "
                        />
                    </div>

                    {/* Content */}
                    <div className="flex-1 sm:py-4 sm:px-0 flex justify-between items-center sm:block sm:text-left text-sm">
                        <div>
                            <h4 className="text-base sm:text-lg font-semibold text-gray-800">{product?.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm font-medium text-purple-500 bg-purple-50 px-2 py-[1px] rounded-full">
                                    {Math.round(product?.compatibility)}%
                                </span>
                                <span className="text-[14px] text-gray-500">{product.categories[0]}</span>
                            </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 sm:hidden" />
                    </div>
                </div>
            ))}
        </div>
    );
}
