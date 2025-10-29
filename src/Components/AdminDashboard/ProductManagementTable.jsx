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
import axiosApi from "@/api/axiosApi"
import { toast } from "react-toastify"
import { useQuery, useQueryClient } from "@tanstack/react-query"


const priceRanges = ["$", "$$", "$$$"]

export default function ProductManagementTable() {
    const queryClient = useQueryClient()
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
        actions: true,
    })
    const [filters, setFilters] = useState({
        priceRange: "",
    })

    const fileInputRef = useRef(null)
    const selectFieldsRef = useRef(null)
    const filterRef = useRef(null)

    const productsPerPage = 15

    // Fetch products with pagination and filtering
    const { isPending: products_loading, error: products_error, data: products } = useQuery({
        queryKey: ['productslist', filters, searchTerm, currentPage],
        queryFn: async () => {
            const res = await axiosApi.get(`/admin_panel/api/v1/product-list`, {
                params: {
                    priceRange: filters?.priceRange || "",
                    search: searchTerm || "",
                    page: currentPage,  // Correctly pass the current page
                    limit: productsPerPage,  // Adding limit for pagination
                },
            })
            return res.data
        }
    })
    console.log(products)

    const totalProducts = products?.count || 0
    const totalPages = Math.ceil(totalProducts / productsPerPage) // Calculate total pages dynamically

    // Pagination
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    // Handle actions
    const handleExportList = async () => {
        console.log("Export list clicked")
        try {
            const res = await axiosApi.get("/products/api/v1/bulk-product", {
                responseType: "blob", // Important for file download
            })
            console.log(res)

            // Create a download link
            const url = window.URL.createObjectURL(new Blob([res.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'products.xlsx') // Set filename
            document.body.appendChild(link)
            link.click()
            link.remove()
            window.URL.revokeObjectURL(url) // Clean up

            toast.success("Exported successfully!")
        } catch (error) {
            console.error("Export error:", error)
            toast.error("Export failed!")
        }
    }

    const handleBulkUpload = () => {
        fileInputRef.current?.click()
    }

    // When user selects file
    const handleFileChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            console.log("Selected file:", file)

            // Prepare FormData
            const formData = new FormData()
            formData.append("file", file)

            try {
                const res = await axiosApi.post("/products/api/v1/bulk-product", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })

                console.log("Upload success:", res.data)
                toast.success("File uploaded successfully!")
            } catch (error) {
                console.error("Upload error:", error)
                toast.error("File upload failed!")
            }
        }
    }

    const handleAddProduct = () => {
        console.log("Add product clicked")
    }

    const handleDeleteProduct = async (id) => {
        console.log("Delete product:", id)
        try {
            await axiosApi.delete(`/products/api/v1/product/${id}`)
            toast.success("Product deleted successfully!")
            // Refetch the products list after deletion
            queryClient.invalidateQueries(['productslist'])
        } catch (error) {
            console.error("Delete error:", error)
            toast.error("Failed to delete product!")
        }
    }

    const handleEditProduct = (id) => {
        console.log("Edit product:", id)

    }

    const applyFilters = () => {
        setShowFilter(false)
        setCurrentPage(1)
    }

    const navigate = useNavigate()

    return (
        <div className=" min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <div className="pb-4 border-b border-gray-200">
                    <div className="flex justify-between gap-5">
                        <div className="relative w-80">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-xl"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-3  top-2.5 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                        </div>

                        <div className="flex gap-10 mb-3">
                            {/* Select Fields */}
                            <div className="relative" ref={selectFieldsRef}>
                                <button
                                    className="flex text-xs sm:text-xl items-center px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
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
                                <select
                                    className="flex items-center text-xs sm:text-xl px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
                                    defaultValue=""  // ✅ set default

                                    onChange={(e) => {
                                        const { value } = e.target;
                                        setFilters((prevFilters) => ({
                                            ...prevFilters,
                                            priceRange: value,
                                        }));

                                    }}

                                >
                                    <option value="" disabled>
                                        Filter
                                    </option>
                                    <option value="$">$</option>
                                    <option value="$$">$$</option>
                                    <option value="$$$">$$$</option>
                                </select>



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
                                className="flex items-center px-4 py-2 bg-indigo-900 text-white text-xs sm:text-xl rounded-lg hover:bg-indigo-800"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Export list
                            </button>



                            {/* Hidden file input */}
                            <input
                                type="file"
                                accept=".csv,.xlsx,.xls"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                            />
                            <button
                                onClick={handleBulkUpload}
                                className="flex items-center px-4 py-2 bg-indigo-900 text-white text-xs sm:text-xl rounded-lg hover:bg-indigo-800"
                            >
                                <Upload className="w-4 h-4 mr-2" />
                                Bulk upload
                            </button>

                            <button
                                onClick={() => {
                                    handleAddProduct();
                                    navigate('addproduct')
                                }}
                                className="flex items-center px-4 py-2 bg-amber-700 text-white text-xs sm:text-xl rounded-lg hover:bg-amber-800"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add a product
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto bg-white rounded-2xl">
                    <table className="w-full rounded-2xl">
                        <thead className="bg-gray-50 ">
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

                                {selectedFields.actions && <th className="py-3 px-4 text-left">Actions</th>}
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200 rounded-2xl">
                            {products?.results
                                .map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        {selectedFields.id && <td className="py-3 px-4 font-medium text-gray-900">{product.productId}</td>}

                                        {selectedFields.product && <td
                                            onClick={() => {
                                                navigate(`details/${product.id}`)
                                            }}
                                            className="py-3 px-4 text-gray-900 cursor-pointer">{product.productName}</td>}

                                        {selectedFields.brand && <td className="py-3 px-4 text-gray-900">{product.brand}</td>}
                                        {selectedFields.priceRange && <td className="py-3 px-4 text-gray-900">{product.priceRange}</td>}
                                        {selectedFields.ingredients && (
                                            <td className="py-3 px-4 text-gray-600 max-w-md">
                                                <div className="truncate" title={product.ingredients}>
                                                    {product.ingredients}
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
                    <div className="text-sm text-gray-700">1 to 20 of {totalProducts}</div>
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
