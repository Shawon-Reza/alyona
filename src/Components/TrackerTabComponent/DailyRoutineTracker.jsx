import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom"; // ✅ Make sure this is imported
import productImage from '../../assets/ProductIMG.png';
import { Sun, Moon } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosApi from "@/api/axiosApi";
import { toast } from "react-toastify"
import ProductFeedback from "./ProductFeedback";

const routineMap = {
    day: {
        title: "Did you do your morning routine?",
        icon: <Sun color="#BB9777" size={25} />,
        products: [
            {
                key: "tone",
                step: "1. Tone",
                name: "Purifying Toner",
                percent: "79%",
                type: "Toner",
                image: productImage,
            },
            {
                key: "hydrate",
                step: "2. Hydrate",
                name: "Hydrating Toner",
                percent: "100%",
                type: "Moisturizer",
                image: productImage,
            },
        ]
    },
    night: {
        title: "Did you do your nighttime routine?",
        icon: <Moon color="#7271E3" size={25} />,
        products: [
            {
                key: "tone",
                step: "1. Tone",
                name: "Purifying Toner",
                percent: "79%",
                type: "Toner",
                image: productImage,
            },
            {
                key: "hydrate",
                step: "2. Hydrate",
                name: "Moisturising Night Cream",
                percent: "100%",
                type: "Moisturizer",
                image: productImage,
            },
        ]
    }
};

const DailyRoutineTracker = () => {

    const { mode = "day" } = useParams(); // ✅ use from router
    const location = useLocation();

    // Determine the category slug from the path (e.g. 'skincare', 'add-on-skincare')
    const categorySlug = location.pathname.split("/")[2] || "skincare"

    const defaultRoutine = routineMap[mode] || routineMap.day;
    const { title, icon } = defaultRoutine;

    const [routineDone, setRoutineDone] = useState(null);
    // products that will be rendered (either from API or fallback)
    const [localProducts, setLocalProducts] = useState(
        defaultRoutine.products.map(p => ({
            id: p.key,
            name: p.name,
            percent: p.percent,
            type: p.type,
            image: p.image,
            daily: p.daily || 'Both',
        }))
    )

    // helper: compute initial selection based on mode and product.daily
    const computeInitialSel = (productsArr, currentMode) => Object.fromEntries(
        productsArr.map(p => {
            const daily = String(p.daily || 'Both').toUpperCase()
            const selected = currentMode === 'day' ? (daily === 'AM' || daily === 'BOTH') : (daily === 'PM' || daily === 'BOTH')
            return [String(p.id || p.key), selected]
        })
    )

    // selection keyed by product id or fallback key — default selects day/night appropriate products
    const [selectedProducts, setSelectedProducts] = useState(() => computeInitialSel(
        defaultRoutine.products.map(p => ({ id: p.key, daily: p.daily || 'Both' })),
        mode
    ))
    const [isSaving, setIsSaving] = useState(false)

    const slugToCategory = {
        'skincare': 'Skincare',
        'add-on-skincare': 'Add on Skincare',
        'body-care': 'Body care',
        'hair-care': 'Hair care',
        'perfume': 'Perfume'
    }
    const categoryName = slugToCategory[categorySlug] || slugToCategory['skincare']

    const toggleProduct = (productKey) => {
        setSelectedProducts((prev) => {
            const next = { ...prev, [productKey]: !prev[productKey] }
            // log currently selected product ids for debugging as requested
            const selectedIds = Object.keys(next).filter(k => next[k])
            console.log('Selected product ids:', selectedIds)
            // Also log full product objects for selected ids
            const selectedObjects = selectedIds.map(id => localProducts.find(p => String(p.id || p.key) === String(id))).filter(Boolean)
            console.log('Selected product objects:', selectedObjects)
            return next
        })
    }

    const queryClient = useQueryClient()
    const handleRoutineResponse = async (value) => {
        // value is 'yes' or 'no'
        setRoutineDone(value)
        const selectedIds = Object.keys(selectedProducts).filter(k => selectedProducts[k]).map(id => {
            const n = Number(id)
            return Number.isNaN(n) ? id : n
        })

        const payload = {
            product_ids: selectedIds,
        }

        setIsSaving(true)
        try {
            if (value === 'yes') {
                // Create/record the tracked products
                await axiosApi.post('/products/api/v1/product-tracker/', payload)
                toast.success('Routine saved')
                console.log("payload",payload)
            } else {
                // Remove tracked products
                // Axios delete with body requires passing { data: payload }
                await axiosApi.delete('/products/api/v1/product-tracker/', { data: payload })
                toast.success('Routine cleared')
            }
            // Refresh trackers data so UI updates
            queryClient.invalidateQueries(['trackersAllData'])
        } catch (err) {
            console.error('Failed to save/clear routine', err)
            toast.error('Failed to update routine')
        } finally {
            setIsSaving(false)
        }
    }

    useEffect(() => {
        console.log("Current mode:", mode);
    }, [mode]);

    // useLocation is used above to derive categorySlug


    const { isPending, error, data } = useQuery({
        queryKey: ['trackersAllData'],
        queryFn: async () => {
            const res = await axiosApi.get('/products/api/v1/user-routine')
            return res.data;
        }
    })

    console.log(data)

    // When API data is available, pick the category that matches the current route
    useEffect(() => {
        if (!data || !Array.isArray(data)) return
        // Map route slugs to API category names
        const slugToCategory = {
            'skincare': 'Skincare',
            'add-on-skincare': 'Add on Skincare',
            'body-care': 'Body care',
            'hair-care': 'Hair care',
            'perfume': 'Perfume'
        }
        const categoryName = slugToCategory[categorySlug] || slugToCategory['skincare']
        const categoryObj = data.find(c => String(c.category).toLowerCase() === String(categoryName).toLowerCase())
        if (categoryObj && Array.isArray(categoryObj.products)) {
            // map API product shape into UI-friendly shape (include `daily` so we can filter by mode)
            const mapped = categoryObj.products.map(p => ({
                id: p.id,
                name: p.productName || p.name,
                percent: p.compatibility_score ? `${p.compatibility_score}%` : p.percent || '',
                type: p.type || categoryObj.category,
                image: p.image,
                daily: p.daily || 'Both',
            }))
            setLocalProducts(mapped)
            // initialize selection: select products that match the current mode (day/night)
            const initialSel = computeInitialSel(mapped, mode)
            setSelectedProducts(initialSel)
        }
    }, [data, categorySlug])

   
    // legacy per-route logic removed — the effect above maps categories to localProducts




    if (isPending) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message











    return (
        <div className="relative p-6 text-[#181818]">
            {/* Question */}
            <div>
                <div className="text-lg font-semibold mb-4 flex items-center gap-2">
                    {icon}
                    <p>{title}</p>
                </div>

                <div className="flex gap-4 mb-6 ">
                    {["yes", "no"].map((value) => {
                        const isSelected = routineDone === value;

                        // Determine background color
                        const bgClass =
                            isSelected && value === "yes"
                                ? mode === "night"
                                    ? "bg-[#3F53A0] text-white"
                                    : "bg-[#E6D1C0] text-[#181818]"
                                : isSelected && value === "no"
                                    ? "bg-[#F5F2EF] text-[#181818]"
                                    : "bg-white text-gray-500";

                        const tickBgClass =
                            isSelected
                                ? mode === "night" && value === "yes"
                                    ? "bg-[#3F53A0] text-white"
                                    : "bg-[#8C6D56] text-white"
                                : "border border-[#8C6D56] text-[#8C6D56]";

                        return (
                            <button
                                key={value}
                                onClick={() => handleRoutineResponse(value)}
                                disabled={isSaving}
                                className={`px-6 w-full py-2 rounded-lg flex items-center justify-between border border-base-300 ${bgClass} cursor-pointer hover:scale-103 transition ${isSaving ? 'opacity-60 pointer-events-none' : ''}`}
                            >
                                {value.charAt(0).toUpperCase() + value.slice(1)}
                                <span className={`ml-3 w-7 h-7 rounded-lg flex items-center justify-center ${tickBgClass} `}>
                                    ✓
                                </span>
                            </button>
                        );
                    })}
                </div>

            </div>

            {/* Products */}
            <div>
                <p className="text-[28px] font-semibold mb-4">Select used products</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(() => {
                        const filteredProducts = localProducts.filter(p => {
                            const daily = String((p.daily || 'Both')).toUpperCase()
                            if (mode === 'day') return daily === 'AM' || daily === 'BOTH'
                            return daily === 'PM' || daily === 'BOTH'
                        })
                        return filteredProducts.map((product) => (
                        <div key={product.id || product.key}>
                            <p className="font-medium mb-2 text-xl">{product.name}</p>
                            <div
                                className={`relative flex items-center gap-4 rounded-xl p-2 border border-base-300 bg-white cursor-pointer transition shadow-sm hover:scale-102`}
                                onClick={() => toggleProduct(String(product.id || product.key))}
                            >
                                <div
                                    className={`absolute top-2 right-2 w-7 h-7 rounded-lg flex items-center justify-center text-xs z-10 ${selectedProducts[String(product.id || product.key)]
                                        ? "bg-[#B1805A] text-white"
                                        : "border border-[#B1805A] text-[#B1805A]"
                                        }`}
                                >
                                    ✓
                                </div>

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
                    ))})()}
                </div>
            </div>

            {/* Give your Feedback */}
            <div className="absolute -top-33 -right-6 z-50 hidden ">
                <ProductFeedback></ProductFeedback>
            </div>
        </div>
    );
};

export default DailyRoutineTracker;
