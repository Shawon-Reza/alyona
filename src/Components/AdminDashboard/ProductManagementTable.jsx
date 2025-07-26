"use client"

import { useState, useRef, useEffect } from "react"
import {
    Search,
    ChevronDown,
    ChevronUp,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Download,
    Upload,
    Plus,
    Trash2,
    Edit,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

// Sample product data based on the image
const initialProducts = [
    {
        id: "YB001",
        product: "Peptide Infusion Serum",
        brand: "Yourself Beauty",
        priceRange: "$",
        ingredients:
            "Cucumber extract, Elder Flower Extract, Evening Primrose Oil, Ferulic acid, Glycerin, Glycolipids, Grape...",
        status: "Available",
    },
    {
        id: "YB002",
        product: "Ceramide Nourishing Night Cream",
        brand: "Yourself Beauty",
        priceRange: "$",
        ingredients: "Jojoba oil, Lactic acid, Lavender flower water, Oak ba...",
        status: "Available",
    },
    {
        id: "YB003",
        product: "BiPhasic Make-up Remover",
        brand: "Yourself Beauty",
        priceRange: "$$",
        ingredients:
            "Rosehip oil, Rosemary Leaf Extract, Rowan berry extract, Salicylic acid, Sea-Buckthorn Fruit extract, Shea butter...",
        status: "Available",
    },
    {
        id: "YB004",
        product: "Hydrating Facial Toner",
        brand: "Yourself Beauty",
        priceRange: "$$",
        ingredients:
            "Sunflower Oil, Sweet Flag extract, Tea tree oil, Vitamin C (L-Ascorbic acid), Vitamin E, Watercress extract, Zinc O...",
        status: "Available",
    },
    {
        id: "YB005",
        product: "Natural Retinol-Alternative Oil Serum",
        brand: "Yourself Beauty",
        priceRange: "$$$",
        ingredients:
            "Cloudberry Extract, Cocoa Butter, Cucumber extract, Elder Flower Extract, Ferulic acid, Ginkgo Leaf Extract...",
        status: "Available",
    },
    {
        id: "YB006",
        product: "Acne Spot Treatment",
        brand: "Yourself Beauty",
        priceRange: "$$$",
        ingredients:
            "Grape seed extract, Hyaluronic acid, Jojoba oil, Lactic acid, Lavender flower water, Peptides, Phytosterols, Ra...",
        status: "Available",
    },
    {
        id: "YB007",
        product: "Oil-To-Milk Cleanser",
        brand: "Yourself Beauty",
        priceRange: "$",
        ingredients:
            "Rice oil, Rose flower water, Rosehip oil, Rosemary Leaf Extract, Rowan berry extract, Salicylic acid, Sea-Buckth...",
        status: "Available",
    },
    {
        id: "YB008",
        product: "Purifying Facial Toner",
        brand: "Yourself Beauty",
        priceRange: "$$",
        ingredients:
            "Aloe Juice, Almond Oil, Avocado Oil, Bakuchiol, Betaine, Blackberry extract, Blueberry extract, Blueberry Oil",
        status: "Available",
    },
    {
        id: "YB009",
        product: "Antioxidant Ginkgo Gel Booster",
        brand: "Yourself Beauty",
        priceRange: "$",
        ingredients:
            "Sunflower Oil, Sweet Flag extract, Tea tree oil, Vitamin C (L-Ascorbic acid), Vitamin E, Watercress extract, Zinc O...",
        status: "Available",
    },
    {
        id: "YB010",
        product: "Sun Protection SPF50 Stick",
        brand: "Yourself Beauty",
        priceRange: "$$",
        ingredients:
            "Cloudberry Extract, Cocoa Butter, Cucumber extract, Elder Flower Extract, Ferulic acid, Ginkgo Leaf Extract...",
        status: "Available",
    },
    {
        id: "YB011",
        product: "Vitamin C Brightening Serum",
        brand: "Yourself Beauty",
        priceRange: "$$$",
        ingredients:
            "Grape seed extract, Hyaluronic acid, Jojoba oil, Lactic acid, Lavender flower water, Peptides, Phytosterols, Ra...",
        status: "Available",
    },
    {
        id: "YB012",
        product: "Moisturising Day Cream",
        brand: "Yourself Beauty",
        priceRange: "$$",
        ingredients:
            "Rice oil, Rose flower water, Rosehip oil, Rosemary Leaf Extract, Rowan berry extract, Salicylic acid, Sea-Buckth...",
        status: "Available",
    },
    {
        id: "YB013",
        product: "Moisturising Day Cream",
        brand: "Yourself Beauty",
        priceRange: "$",
        ingredients: "Vitamin E, Watercress extract, Zinc Oxide, Almond Oil, Aloe Juice, Avocado Oil, Bakuchiol, Betaine",
        status: "Not available",
    },
    {
        id: "YB014",
        product: "Moisturising Day Cream",
        brand: "Yourself Beauty",
        priceRange: "$$$",
        ingredients:
            "Aloe Juice, Almond Oil, Avocado Oil, Bakuchiol, Betaine, Blackberry extract, Blueberry extract, Blueberry Oil",
        status: "Available",
    },
    {
        id: "YB015",
        product: "Moisturising Day Cream",
        brand: "Yourself Beauty",
        priceRange: "$$",
        ingredients:
            "Blueberry Seed oil, Camelia (Green Tea) extract, Charcoal, Cloudberry Extract, Cocoa Butter, Cucumber...",
        status: "Available",
    },
    {
        id: "YB016",
        product: "Moisturising Day Cream",
        brand: "Yourself Beauty",
        priceRange: "$",
        ingredients: "Ferulic acid, Glycerin, Glycolipids, Grape seed extract,",
        status: "Available",
    },
]

const priceRanges = ["$", "$$", "$$$"]
const statuses = ["Available", "Not available", "Discontinued"]
const brands = ["Yourself Beauty", "Brand A", "Brand B"]

export default function ProductManagementTable() {
    const [products, setProducts] = useState(initialProducts)
    const [searchTerm, setSearchTerm] = useState("")
    const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" })
    const [currentPage, setCurrentPage] = useState(1)
    const [showSelectFields, setShowSelectFields] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [selectedFields, setSelectedFields] = useState({
        id: true,
        product: true,
        brand: true,
        priceRange: true,
        ingredients: true,
        status: true,
        actions: true,
    })
    const [filters, setFilters] = useState({
        brand: "",
        priceRange: "",
        status: "",
    })

    const selectFieldsRef = useRef(null)
    const filterRef = useRef(null)

    const productsPerPage = 20
    const totalProducts = 8618 // From the image
    const totalPages = 431 // From the image

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (selectFieldsRef.current && !selectFieldsRef.current.contains(event.target)) {
                setShowSelectFields(false)
            }
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowFilter(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // Handle sorting
    const requestSort = (key) => {
        let direction = "asc"
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc"
        }
        setSortConfig({ key, direction })
    }

    // Get sorted products
    const getSortedProducts = () => {
        const sortableProducts = [...products]
        sortableProducts.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? -1 : 1
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? 1 : -1
            }
            return 0
        })
        return sortableProducts
    }

    // Handle search and filter
    const filteredProducts = getSortedProducts().filter((product) => {
        // Search filter
        const matchesSearch = Object.values(product).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
        )

        // Brand filter
        const matchesBrand = !filters.brand || product.brand === filters.brand

        // Price range filter
        const matchesPriceRange = !filters.priceRange || product.priceRange === filters.priceRange

        // Status filter
        const matchesStatus = !filters.status || product.status === filters.status

        return matchesSearch && matchesBrand && matchesPriceRange && matchesStatus
    })

    // Pagination
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    // Get status class
    const getStatusClass = (status) => {
        switch (status) {
            case "Available":
                return "bg-green-100 text-green-800"
            case "Not available":
                return "bg-red-100 text-red-800"
            case "Discontinued":
                return "bg-gray-100 text-gray-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    // Handle actions
    const handleExportList = () => {
        console.log("Export list clicked")
    }

    const handleBulkUpload = () => {
        console.log("Bulk upload clicked")
    }

    const handleAddProduct = () => {
        console.log("Add product clicked")
    }

    const handleDeleteProduct = (id) => {
        console.log("Delete product:", id)
    }

    const handleEditProduct = (id) => {
        console.log("Edit product:", id)
    }

    const applyFilters = () => {
        setShowFilter(false)
        setCurrentPage(1)
    }

    const clearFilters = () => {
        setFilters({
            brand: "",
            priceRange: "",
            status: "",
        })
    }



    const navigate = useNavigate();
    return (
        <div className=" min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <div className="p-4 border-b border-gray-200">
                    <div className="flex justify-between">
                        <div className="relative w-80">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>

                        <div className="flex gap-10 mb-3">
                            {/* Select Fields */}
                            <div className="relative" ref={selectFieldsRef}>
                                <button
                                    className="flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
                                    onClick={() => setShowSelectFields(!showSelectFields)}
                                >
                                    Select Fields
                                    <ChevronDown
                                        className={`ml-2 h-4 w-4 transition-transform ${showSelectFields ? "rotate-180" : ""}`}
                                    />
                                </button>

                                {showSelectFields && (
                                    <div className="absolute right-0 top-full mt-2 p-4 bg-white rounded-lg shadow-lg border z-10 w-64">
                                        <div className="space-y-2">
                                            {Object.entries(selectedFields).map(([field, checked]) => (
                                                <label key={field} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={checked}
                                                        onChange={(e) =>
                                                            setSelectedFields({
                                                                ...selectedFields,
                                                                [field]: e.target.checked,
                                                            })
                                                        }
                                                        className="mr-2"
                                                    />
                                                    <span className="capitalize">{field}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Filter */}
                            <div className="relative" ref={filterRef}>
                                <button
                                    className="flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
                                    onClick={() => setShowFilter(!showFilter)}
                                >
                                    Filter
                                    <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showFilter ? "rotate-180" : ""}`} />
                                </button>

                                {showFilter && (
                                    <div className="absolute right-0 top-full mt-2 p-6 bg-white rounded-lg shadow-lg border z-10 w-80">
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Brand</label>
                                                <select
                                                    className="w-full p-2 border rounded-md"
                                                    value={filters.brand}
                                                    onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                                                >
                                                    <option value="">All Brands</option>
                                                    {brands.map((brand) => (
                                                        <option key={brand} value={brand}>
                                                            {brand}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Price Range</label>
                                                <select
                                                    className="w-full p-2 border rounded-md"
                                                    value={filters.priceRange}
                                                    onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                                                >
                                                    <option value="">All Prices</option>
                                                    {priceRanges.map((range) => (
                                                        <option key={range} value={range}>
                                                            {range}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Status</label>
                                                <select
                                                    className="w-full p-2 border rounded-md"
                                                    value={filters.status}
                                                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                                >
                                                    <option value="">All Statuses</option>
                                                    {statuses.map((status) => (
                                                        <option key={status} value={status}>
                                                            {status}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="flex justify-end gap-2 pt-4">
                                                <button
                                                    onClick={clearFilters}
                                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
                                                >
                                                    Clear
                                                </button>
                                                <button
                                                    onClick={applyFilters}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                                >
                                                    Apply
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        {/* Search */}
                        <div>

                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-4">

                            {/* Action Buttons */}
                            <button
                                onClick={handleExportList}
                                className="flex items-center px-4 py-2 bg-indigo-900 text-white rounded-lg hover:bg-indigo-800"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Export list
                            </button>

                            <button
                                onClick={handleBulkUpload}
                                className="flex items-center px-4 py-2 bg-indigo-900 text-white rounded-lg hover:bg-indigo-800"
                            >
                                <Upload className="w-4 h-4 mr-2" />
                                Bulk upload
                            </button>

                            <button
                                onClick={()=>{
                                    handleAddProduct();
                                    navigate('addproduct')
                                }}
                                className="flex items-center px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add a product
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto bg-white">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                {selectedFields.id && (
                                    <th className="py-3 px-4 text-left cursor-pointer" onClick={() => requestSort("id")}>
                                        <div className="flex items-center ">
                                            ID
                                            {sortConfig.key === "id" &&
                                                (sortConfig.direction === "asc" ? (
                                                    <ChevronUp className="ml-1 h-4 w-4" />
                                                ) : (
                                                    <ChevronDown className="ml-1 h-4 w-4" />
                                                ))}
                                        </div>
                                    </th>
                                )}
                                {selectedFields.product && (
                                    <th className="py-3 px-4 text-left cursor-pointer" onClick={() => requestSort("product")}>
                                        <div className="flex items-center">
                                            Product
                                            {sortConfig.key === "product" &&
                                                (sortConfig.direction === "asc" ? (
                                                    <ChevronUp className="ml-1 h-4 w-4" />
                                                ) : (
                                                    <ChevronDown className="ml-1 h-4 w-4" />
                                                ))}
                                        </div>
                                    </th>
                                )}
                                {selectedFields.brand && (
                                    <th className="py-3 px-4 text-left cursor-pointer" onClick={() => requestSort("brand")}>
                                        <div className="flex items-center">
                                            Brand
                                            {sortConfig.key === "brand" &&
                                                (sortConfig.direction === "asc" ? (
                                                    <ChevronUp className="ml-1 h-4 w-4" />
                                                ) : (
                                                    <ChevronDown className="ml-1 h-4 w-4" />
                                                ))}
                                        </div>
                                    </th>
                                )}
                                {selectedFields.priceRange && (
                                    <th className="py-3 px-4 text-left cursor-pointer" onClick={() => requestSort("priceRange")}>
                                        <div className="flex items-center">
                                            Price Range
                                            {sortConfig.key === "priceRange" &&
                                                (sortConfig.direction === "asc" ? (
                                                    <ChevronUp className="ml-1 h-4 w-4" />
                                                ) : (
                                                    <ChevronDown className="ml-1 h-4 w-4" />
                                                ))}
                                        </div>
                                    </th>
                                )}
                                {selectedFields.ingredients && (
                                    <th className="py-3 px-4 text-left cursor-pointer" onClick={() => requestSort("ingredients")}>
                                        <div className="flex items-center">
                                            Ingredients
                                            {sortConfig.key === "ingredients" &&
                                                (sortConfig.direction === "asc" ? (
                                                    <ChevronUp className="ml-1 h-4 w-4" />
                                                ) : (
                                                    <ChevronDown className="ml-1 h-4 w-4" />
                                                ))}
                                        </div>
                                    </th>
                                )}
                                {selectedFields.status && (
                                    <th className="py-3 px-4 text-left cursor-pointer" onClick={() => requestSort("status")}>
                                        <div className="flex items-center">
                                            Status
                                            {sortConfig.key === "status" &&
                                                (sortConfig.direction === "asc" ? (
                                                    <ChevronUp className="ml-1 h-4 w-4" />
                                                ) : (
                                                    <ChevronDown className="ml-1 h-4 w-4" />
                                                ))}
                                        </div>
                                    </th>
                                )}
                                {selectedFields.actions && <th className="py-3 px-4 text-left">Actions</th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {currentProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    {selectedFields.id && <td className="py-3 px-4 font-medium text-gray-900">{product.id}</td>}

                                    {selectedFields.product && <td
                                        onClick={() => {
                                            navigate('details')
                                        }}
                                        className="py-3 px-4 text-gray-900 cursor-pointer">{product.product}</td>}

                                    {selectedFields.brand && <td className="py-3 px-4 text-gray-900">{product.brand}</td>}
                                    {selectedFields.priceRange && <td className="py-3 px-4 text-gray-900">{product.priceRange}</td>}
                                    {selectedFields.ingredients && (
                                        <td className="py-3 px-4 text-gray-600 max-w-md">
                                            <div className="truncate" title={product.ingredients}>
                                                {product.ingredients}
                                            </div>
                                        </td>
                                    )}
                                    {selectedFields.status && (
                                        <td className="py-3 px-4">
                                            <div className="relative">
                                                <select
                                                    className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${getStatusClass(product.status)}`}
                                                    value={product.status}
                                                    onChange={(e) => {
                                                        const updatedProducts = products.map((p) =>
                                                            p.id === product.id ? { ...p, status: e.target.value } : p,
                                                        )
                                                        setProducts(updatedProducts)
                                                    }}
                                                >
                                                    {statuses.map((status) => (
                                                        <option key={status} value={status}>
                                                            {status}
                                                        </option>
                                                    ))}
                                                </select>

                                            </div>
                                        </td>
                                    )}
                                    {selectedFields.actions && (
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                    className="p-1 text-gray-400 hover:text-red-600"
                                                >
                                                    <Trash2 className="w-4 h-4 cursor-pointer" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        handleEditProduct(product.id)
                                                        navigate('edit-product')
                                                    }}
                                                    className="p-1 text-gray-400 hover:text-blue-600"
                                                >
                                                    <Edit className="w-4 h-4 cursor-pointer" />
                                                </button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between p-4 border-t border-gray-200">
                    <div className="text-sm text-gray-700">1 to 20 of {totalProducts.toLocaleString()}</div>
                    <div className="flex items-center space-x-2">
                        <button
                            className="p-1 rounded-md hover:bg-gray-100"
                            onClick={() => paginate(1)}
                            disabled={currentPage === 1}
                        >
                            <ChevronsLeft className="h-5 w-5" />
                        </button>
                        <button
                            className="p-1 rounded-md hover:bg-gray-100"
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <span className="text-sm px-2">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            className="p-1 rounded-md hover:bg-gray-100"
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                        <button
                            className="p-1 rounded-md hover:bg-gray-100"
                            onClick={() => paginate(totalPages)}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronsRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
