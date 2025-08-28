import React from "react";
import { ChevronRight } from "lucide-react";
import axiosApi from "@/api/axiosApi";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export default function SimilarProductsList() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["similarProducts", id],
    queryFn: async () => {
      const res = await axiosApi.get(`/products/api/v1/similar-products/${id}`);
      return res.data; // expect an array
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const products = Array.isArray(data) ? data : [];

  return (
    <div className="flex flex-wrap gap-4 sm:gap-6">
      {isLoading && <p>Loading...</p>}
      {error && (
        <p className="text-red-600">
          An error has occurred: {error.message}
        </p>
      )}
      {!isLoading && !error && products.length === 0 && (
        <p className="text-gray-500">No similar products found.</p>
      )}

      {!isLoading &&
        !error &&
        products.map((product) => {
          // Normalize fields from backend with fallbacks
          const pid = product?.id;
          const name = product?.name ?? "";
          const image =
            product?.image_url ??
            product?.image ??
            "https://via.placeholder.com/400x300?text=No+Image";
          const score = Math.round(
            Number(product?.compatibility_score ?? product?.compatibility ?? 0)
          );
          const category =
            product?.categories?.[0] ?? product?.category ?? "—";

          return (
            <div
              key={pid ?? name}
              className="w-full sm:max-w-[215px] sm:px-1 bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition p-2 sm:p-0 flex sm:block items-center gap-4 hover:scale-103"
            >
              {/* Image */}
              <div className="w-[60px] h-[60px] sm:w-full sm:h-[230px] flex-shrink-0 flex items-center justify-center overflow-hidden -mt-1">
                <img
                  src={image}
                  alt={name}
                  onClick={() =>
                    navigate(`/library/product-detail/${pid}`)
                  }
                  className="w-full h-full object-cover rounded-2xl pt-2 cursor-pointer"
                />
              </div>

              {/* Content */}
              <div className="flex-1 sm:py-4 sm:px-0 flex justify-between items-center sm:block sm:text-left text-sm">
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-800">
                    {name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-medium text-purple-500 bg-purple-50 px-2 py-[1px] rounded-full">
                      {score}%
                    </span>
                    <span className="text-[14px] text-gray-500">
                      {category}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 sm:hidden" />
              </div>
            </div>
          );
        })}

      {isFetching && !isLoading && (
        <div className="w-full text-xs text-gray-400">Updating…</div>
      )}
    </div>
  );
}
