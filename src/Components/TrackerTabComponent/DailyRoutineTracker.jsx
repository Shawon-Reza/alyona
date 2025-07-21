import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // ✅ Make sure this is imported
import productImage from '../../assets/ProductIMG.png';
import { Sun, Moon } from "lucide-react";

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
    const { title, icon, products } = routineMap[mode] || routineMap.day;

    const [routineDone, setRoutineDone] = useState("yes");
    const [selectedProducts, setSelectedProducts] = useState(
        Object.fromEntries((routineMap[mode] || routineMap.day).products.map(p => [p.key, true]))
    );

    const toggleProduct = (key) => {
        setSelectedProducts((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    useEffect(() => {
        console.log("Current mode:", mode);
    }, [mode]);

    return (
        <div className="relative p-6 text-[#181818]">
            {/* Question */}
            <div>
                <div className="text-lg font-semibold mb-4 flex items-center gap-2">
                    {icon}
                    <p>{title}</p>
                </div>

                <div className="flex gap-4 mb-6">
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
                                onClick={() => setRoutineDone(value)}
                                className={`px-6 w-full py-2 rounded-lg flex items-center justify-between border border-base-300 ${bgClass}`}
                            >
                                {value.charAt(0).toUpperCase() + value.slice(1)}
                                <span className={`ml-3 w-7 h-7 rounded-lg flex items-center justify-center ${tickBgClass}`}>
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
                    {products.map((product) => (
                        <div key={product.key}>
                            <p className="font-medium mb-2 text-xl">{product.step}</p>
                            <div
                                className={`relative flex items-center gap-4 rounded-xl p-2 border border-base-300 bg-white cursor-pointer transition shadow-sm`}
                                onClick={() => toggleProduct(product.key)}
                            >
                                <div
                                    className={`absolute top-2 right-2 w-7 h-7 rounded-lg flex items-center justify-center text-xs z-10 ${selectedProducts[product.key]
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
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DailyRoutineTracker;
