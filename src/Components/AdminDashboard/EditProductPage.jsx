"use client"

import { useState, useEffect } from "react"
import { ChevronRight, X, Search } from "lucide-react"
import { useParams } from "react-router-dom"
import axiosApi from "@/api/axiosApi"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const productData = {
    id: "YB001",
    pregnancySafe: false,
    category: "",
    brand: "",
    productName: "",
    productType: [],
    skinTypes: [],
    concerns: [],
    ingredients: [],
    inci: ["Leaf Juice", "Glycerin"],
    texture: "",
    features: [],
    natural: "",
    organic: "",
    priceRange: "",
    fragranceFree: false,
    fragrance: "",
    fragranceNotes: "",
    productUrl: "",
    imageUrl: "",
}

const categories = ["Skincare", "Makeup", "Haircare", "Body Care"]
const brands = ["Yourself Beauty", "Brand A", "Brand B", "Brand C"]
const productTypes = ["Serum", "Cream", "Cleanser", "Toner", "Oil", "Mask"]
const skinTypes = ["Normal", "Dry", "Oily", "Combination", "Sensitive", "Acne-prone"]
const concerns = ["Aging", "Acne", "Dryness", "Sensitivity", "Hyperpigmentation", "Fine Lines"]
const ingredients = ["Hyaluronic Acid", "Retinol", "Vitamin C", "Niacinamide", "Peptides", "Ceramides"]
const textures = ["Cream", "Gel", "Oil", "Serum", "Lotion", "Balm"]
const features = ["Vegan", "Cruelty-free", "Organic", "Natural", "Paraben-free", "Sulfate-free"]
const fragrances = ["Floral", "Citrus", "Fresh", "Woody", "Fruity", "Herbal"]

export default function EditProductPage() {
    const [formData, setFormData] = useState(productData)
    const [newInciIngredient, setNewInciIngredient] = useState("")
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [serverId, setServerId] = useState(null)

    const { id } = useParams();
    const navigate = useNavigate()
    console.log("Product id:", id)

    useEffect(() => {
        // Fetch product by id and map to local form shape
        if (!id) return
        let mounted = true
        setLoading(true)
        axiosApi
            .get(`/products/api/v1/product/${id}`)
            .then((res) => {
                if (!mounted) return
                const data = res.data || {}
                // map server fields to formData
                setFormData((prev) => ({
                    ...prev,
                    id: data.productId || data.id || prev.id || id,
                    productName: data.productName || data.product_name || prev.productName,
                    pregnancySafe: data.pregnancy_safe ?? data.pregnancySafe ?? prev.pregnancySafe,
                    category: data.category || prev.category,
                    brand: data.brand || prev.brand,
                    productType: data.product_type || data.productType || prev.productType,
                    skinTypes: data.skin_types || data.skinTypes || prev.skinTypes,
                    concerns: data.concerns || prev.concerns,
                    ingredients: data.ingredients || prev.ingredients,
                    inci: data.incl || data.inci || prev.inci,
                    texture: Array.isArray(data.texture) ? data.texture[0] : data.texture || prev.texture,
                    features: data.features || prev.features,
                    natural: data.natural || prev.natural,
                    organic: data.organic || prev.organic,
                    priceRange: data.priceRange || data.price_range || prev.priceRange,
                    fragranceFree: data.fragrance_free ?? data.fragranceFree ?? prev.fragranceFree,
                    fragrance: data.fragrance || prev.fragrance,
                    fragranceNotes: data.fragrance_notes || data.fragranceNotes || prev.fragranceNotes,
                    productUrl: data.product_url || data.productUrl || prev.productUrl,
                    imageUrl: data.image_url || data.imageUrl || prev.imageUrl,
                }))

                // keep server numeric id if provided
                setServerId(data.id || null)
            })
            .catch((err) => {
                console.error("Failed to load product:", err)
                toast.error("Failed to load product")
            })
            .finally(() => setLoading(false))

        return () => {
            mounted = false
        }
    }, [id])

    const handleToggle = (field) => {
        setFormData({
            ...formData,
            [field]: !formData[field],
        })
    }

    const handleInputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        })
    }

    const handleMultiSelectChange = (field, value) => {
        const currentValues = formData[field] || []
        const newValues = currentValues.includes(value)
            ? currentValues.filter((item) => item !== value)
            : [...currentValues, value]

        setFormData({
            ...formData,
            [field]: newValues,
        })
    }

    const removeInciIngredient = (ingredientToRemove) => {
        setFormData({
            ...formData,
            inci: formData.inci.filter((ingredient) => ingredient !== ingredientToRemove),
        })
    }

    const addInciIngredient = () => {
        if (newInciIngredient.trim() && !formData.inci.includes(newInciIngredient.trim())) {
            setFormData({
                ...formData,
                inci: [...formData.inci, newInciIngredient.trim()],
            })
            setNewInciIngredient("")
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            addInciIngredient()
        }
    }

    const handleSave = () => {
        // Build payload matching backend contract
        setSaving(true)

        const payload = {
            brand: formData.brand,
            product_type: formData.productType || [],
            volumes: formData.volumes || [],
            ingredients: formData.ingredients || [],
            incl: formData.inci || [],
            texture: formData.texture ? [formData.texture] : [],
            skin_types: formData.skinTypes || [],
            features: formData.features || [],
            fragrance_notes: formData.fragranceNotes || [],
            concerns: formData.concerns || [],
            productId: formData.id,
            productName: formData.productName,
            priceRange: formData.priceRange,
            description: formData.description || "",
            category: formData.category,
            image_url: formData.imageUrl,
            product_url: formData.productUrl,
            fragranceFree: formData.fragranceFree,
            natural: formData.natural,
            organic: formData.organic,
            pregnancy_safe: formData.pregnancySafe,
        }

        const targetId = serverId || id
        if (!targetId) {
            toast.error("No product id to save to")
            setSaving(false)
            return
        }

        axiosApi
            .patch(`/products/api/v1/product/${targetId}`, payload)
            .then((res) => {
                console.log("Saved product response:", res.data)
                toast.success("Product saved")
                // Optionally navigate back to list
                // navigate('/admindashboard')
            })
            .catch((err) => {
                console.error("Save failed:", err)
                const message = err.response?.data?.error || err.message
                toast.error("Failed to save product: " + message)
            })
            .finally(() => setSaving(false))
    }

    const handleGetBack = () => {
        console.log("Get back clicked")
    }

    return (
        <div className="min-h-screen p-6">
            {/* Breadcrumbs */}
            <div className="flex items-center text-sm text-gray-600 mb-6">
                <span className="cursor-pointer hover:text-gray-900">Products</span>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span className="text-gray-900">Edit product</span>
            </div>

            <div className="p-6">
                {/* General Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-6">General</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {/* Pregnancy/Breastfeeding Safe */}
                        <div className="flex items-center justify-between col-span-full md:col-span-1">
                            <label className="text-base font-medium text-gray-700">Pregnancy/ Breastfeeding Safe: No</label>
                            <input
                                type="checkbox"
                                className="toggle toggle-lg"
                                checked={formData.pregnancySafe}
                                onChange={() => handleToggle("pregnancySafe")}
                            />
                        </div>

                        {/* ID */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">ID</label>
                            <input
                                type="text"
                                value={formData.id}
                                onChange={(e) => handleInputChange("id", e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => handleInputChange("category", e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Choose an option</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Brand */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                            <select
                                value={formData.brand}
                                onChange={(e) => handleInputChange("brand", e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Choose an option</option>
                                {brands.map((brand) => (
                                    <option key={brand} value={brand}>
                                        {brand}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Product name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Product name</label>
                            <input
                                type="text"
                                value={formData.productName}
                                onChange={(e) => handleInputChange("productName", e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Product type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Product type</label>
                            <div className="relative">
                                <select
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                    onChange={(e) => handleMultiSelectChange("productType", e.target.value)}
                                >
                                    <option value="">Choose multiple options</option>
                                    {productTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                                {formData.productType.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {formData.productType.map((type) => (
                                            <span
                                                key={type}
                                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                            >
                                                {type}
                                                <button
                                                    type="button"
                                                    className="ml-1 text-blue-600 hover:text-blue-800"
                                                    onClick={() => handleMultiSelectChange("productType", type)}
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Skin types */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Skin types</label>
                            <div className="relative">
                                <select
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                    onChange={(e) => handleMultiSelectChange("skinTypes", e.target.value)}
                                >
                                    <option value="">Choose multiple options</option>
                                    {skinTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                                {formData.skinTypes.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {formData.skinTypes.map((type) => (
                                            <span
                                                key={type}
                                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                            >
                                                {type}
                                                <button
                                                    type="button"
                                                    className="ml-1 text-green-600 hover:text-green-800"
                                                    onClick={() => handleMultiSelectChange("skinTypes", type)}
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Concerns */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Concerns</label>
                            <div className="relative">
                                <select
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                    onChange={(e) => handleMultiSelectChange("concerns", e.target.value)}
                                >
                                    <option value="">Choose multiple options</option>
                                    {concerns.map((concern) => (
                                        <option key={concern} value={concern}>
                                            {concern}
                                        </option>
                                    ))}
                                </select>
                                {formData.concerns.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {formData.concerns.map((concern) => (
                                            <span
                                                key={concern}
                                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                                            >
                                                {concern}
                                                <button
                                                    type="button"
                                                    className="ml-1 text-purple-600 hover:text-purple-800"
                                                    onClick={() => handleMultiSelectChange("concerns", concern)}
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Ingredients */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients</label>
                            <div className="relative">
                                <select
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                    onChange={(e) => handleMultiSelectChange("ingredients", e.target.value)}
                                >
                                    <option value="">Choose multiple options</option>
                                    {ingredients.map((ingredient) => (
                                        <option key={ingredient} value={ingredient}>
                                            {ingredient}
                                        </option>
                                    ))}
                                </select>
                                {formData.ingredients.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {formData.ingredients.map((ingredient) => (
                                            <span
                                                key={ingredient}
                                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
                                            >
                                                {ingredient}
                                                <button
                                                    type="button"
                                                    className="ml-1 text-orange-600 hover:text-orange-800"
                                                    onClick={() => handleMultiSelectChange("ingredients", ingredient)}
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* INCI */}
                        <div className="col-span-full md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">INCI</label>
                            <div className="bg-white relative flex items-center border border-gray-300 rounded-lg p-3 flex-wrap gap-2 min-h-[3rem] focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                                {formData.inci.map((ingredient, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white text-gray-800"
                                    >
                                        {ingredient}
                                        <button
                                            type="button"
                                            className="ml-1 text-gray-600 hover:text-gray-800"
                                            onClick={() => removeInciIngredient(ingredient)}
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                                <input
                                    type="text"
                                    value={newInciIngredient}
                                    onChange={(e) => setNewInciIngredient(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder=""
                                    className="flex-grow outline-none bg-transparent min-w-[100px]"
                                />
                                <Search className="w-4 h-4 text-gray-400" />
                            </div>
                        </div>

                        {/* Texture */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Texture</label>
                            <select
                                value={formData.texture}
                                onChange={(e) => handleInputChange("texture", e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Choose an option</option>
                                {textures.map((texture) => (
                                    <option key={texture} value={texture}>
                                        {texture}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Features */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                            <div className="relative">
                                <select
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                    onChange={(e) => handleMultiSelectChange("features", e.target.value)}
                                >
                                    <option value="">Choose multiple options</option>
                                    {features.map((feature) => (
                                        <option key={feature} value={feature}>
                                            {feature}
                                        </option>
                                    ))}
                                </select>
                                {formData.features.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {formData.features.map((feature) => (
                                            <span
                                                key={feature}
                                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800"
                                            >
                                                {feature}
                                                <button
                                                    type="button"
                                                    className="ml-1 text-teal-600 hover:text-teal-800"
                                                    onClick={() => handleMultiSelectChange("features", feature)}
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Natural */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Natural</label>
                            <input
                                type="text"
                                value={formData.natural}
                                onChange={(e) => handleInputChange("natural", e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Organic */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Organic</label>
                            <input
                                type="text"
                                value={formData.organic}
                                onChange={(e) => handleInputChange("organic", e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Price range */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Price range</label>
                            <input
                                type="text"
                                value={formData.priceRange}
                                onChange={(e) => handleInputChange("priceRange", e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <hr className="my-4 border-gray-200" />

                {/* Fragrance Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-6">Fragrance</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Fragrance Free */}
                        <div className="flex items-center justify-between col-span-full md:col-span-1">
                            <label className="text-base font-medium text-gray-700">Fragrance Free: No</label>
                            <input
                                type="checkbox"
                                className="toggle toggle-lg bg-white"
                                checked={formData.fragranceFree}
                                onChange={() => handleToggle("fragranceFree")}
                            />
                        </div>

                        {/* Fragrance */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Fragrance</label>
                            <select
                                value={formData.fragrance}
                                onChange={(e) => handleInputChange("fragrance", e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
                            >
                                <option value="">Choose an option</option>
                                {fragrances.map((fragrance) => (
                                    <option key={fragrance} value={fragrance}>
                                        {fragrance}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Fragrance notes */}
                        <div>
                            <label className="block text-sm font-medium  text-gray-700 mb-2">Fragrance notes</label>
                            <input
                                type="text"
                                value={formData.fragranceNotes}
                                onChange={(e) => handleInputChange("fragranceNotes", e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
                            />
                        </div>
                    </div>
                </div>

                <hr className="my-4 border-gray-200" />

                {/* URL Section */}
                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-6">URL</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Product_URL */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Product_URL</label>
                            <input
                                type="url"
                                value={formData.productUrl}
                                onChange={(e) => handleInputChange("productUrl", e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Image_URL */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Image_URL</label>
                            <input
                                type="url"
                                value={formData.imageUrl}
                                onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                    <button
                        onClick={handleGetBack}
                        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Get back
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-3 bg-[#BB9777] text-white rounded-lg hover:bg-amber-700 transition-colors font-black"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}
