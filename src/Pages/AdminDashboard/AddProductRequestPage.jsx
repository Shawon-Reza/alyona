"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function AddProductRequestPage() {
    const [formData, setFormData] = useState({
        pregnancySafe: false,
        fragranceFree: false,
        inciIngredients: ["Leaf Juice", "Glycerin"],
        productId: "YB001",
        category: "",
        brand: "",
        productName: "",
        productType: "",
        skinTypes: [],
        concerns: [],
        ingredients: [],
        texture: "",
        features: [],
        natural: "",
        organic: "",
        priceRange: "",
        fragrance: "",
        fragranceNotes: "",
        productUrl: "",
        imageUrl: ""
    })

    const removeInciIngredient = (ingredientToRemove) => {
        setFormData(prevData => ({
            ...prevData,
            inciIngredients: prevData.inciIngredients.filter((ingredient) => ingredient !== ingredientToRemove)
        }))
    }

    const handleSave = () => {
        console.log(formData)
    }

    const navigate = useNavigate()

    return (
        <div className="min-h-screen p-6">
            {/* Breadcrumbs */}
            <div className="text-sm breadcrumbs mb-6">
                <ul>
                    <li onClick={() => {
                        navigate('/admindashboard')
                    }}>
                        <a>Dashboard</a>
                    </li>
                    <li>New product request</li>
                </ul>
            </div>

            <div className="card  p-6">
                <h2 className="text-xl font-semibold mb-6">General</h2>

                {/* Pregnancy/Breastfeeding Safe */}
                <div className="flex items-center gap-10 col-span-full md:col-span-1">
                    <label htmlFor="pregnancy-safe" className="label cursor-pointer">
                        <span className="label-text text-[#181818] font-medium">Pregnancy/ Breastfeeding Safe: No</span>
                    </label>
                    <input
                        id="pregnancy-safe" 
                        type="checkbox"
                        className="toggle toggle-sm"
                        checked={formData.pregnancySafe}
                        onChange={() => setFormData(prevData => ({
                            ...prevData,
                            pregnancySafe: !prevData.pregnancySafe
                        }))}
                    />
                </div>

                {/* ID, Category, Brand, Product Name, Product Type, etc. */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-[#181818]" >
                    {/* ID */}
                    <div>
                        <label htmlFor="id" className="label">
                            <span className="text-[#181818] font-bold mb-1">ID</span>
                        </label>
                        <input
                            type="text"
                            id="id"
                            value={formData.productId}
                            onChange={(e) => setFormData(prevData => ({
                                ...prevData,
                                productId: e.target.value
                            }))}
                            className="input  w-full rounded-xl bg-white/50"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="label">
                            <span className="text-[#181818] font-bold mb-1">Category</span>
                        </label>
                        <input
                            type="text"
                            id="category"
                            value={formData.category}
                            onChange={(e) => setFormData(prevData => ({
                                ...prevData,
                                category: e.target.value
                            }))}
                            className="input input-bordered w-full rounded-xl bg-white/50"
                        />
                    </div>

                    {/* Brand */}
                    <div>
                        <label htmlFor="brand" className="label">
                            <span className="text-[#181818] font-bold mb-1">Brand</span>
                        </label>
                        <select
                            id="brand"
                            value={formData.brand}
                            onChange={(e) => setFormData(prevData => ({
                                ...prevData,
                                brand: e.target.value
                            }))}
                            className="select select-bordered w-full rounded-xl bg-white/50"
                        >
                            <option value="">Choose an option</option>
                            <option value="Brand A">Brand A</option>
                            <option value="Brand B">Brand B</option>
                        </select>
                    </div>

                    {/* Product name */}
                    <div>
                        <label htmlFor="product-name" className="label">
                            <span className="text-[#181818] font-bold mb-1 ">Product name</span>
                        </label>
                        <input
                            type="text"
                            id="product-name"
                            value={formData.productName}
                            onChange={(e) => setFormData(prevData => ({
                                ...prevData,
                                productName: e.target.value
                            }))}
                            className="input input-bordered w-full rounded-xl bg-white/50"
                        />
                    </div>

                    {/* Product type */}
                    <div>
                        <label htmlFor="product-type" className="label">
                            <span className="text-[#181818] font-bold mb-1">Product type</span>
                        </label>
                        <select
                            id="product-type"
                            value={formData.productType}
                            onChange={(e) => setFormData(prevData => ({
                                ...prevData,
                                productType: e.target.value
                            }))}
                            className="select select-bordered w-full rounded-xl bg-white/50"
                        >
                            <option value="">Choose an option</option>
                            <option value="Type 1">Type 1</option>
                            <option value="Type 2">Type 2</option>
                        </select>
                    </div>

                    {/* Skin types */}
                    <div>
                        <label htmlFor="skin-types" className="label">
                            <span className="text-[#181818] font-bold mb-1">Skin types</span>
                        </label>
                        <select
                            id="skin-types"
                            value={formData.skinTypes}
                            onChange={(e) => setFormData(prevData => ({
                                ...prevData,
                                skinTypes: e.target.value.split(',')
                            }))}
                            className="select select-bordered w-full bg-white/50 rounded-lg"
                        >
                            <option value="">Choose multiple options</option>
                            <option value="Normal">Normal</option>
                            <option value="Oily">Oily</option>
                        </select>
                    </div>

                    {/* Concerns */}
                    <div>
                        <label htmlFor="concerns" className="label">
                            <span className="text-[#181818] font-bold mb-1">Concerns</span>
                        </label>
                        <select
                            id="concerns"
                            value={formData.concerns}
                            onChange={(e) => setFormData(prevData => ({
                                ...prevData,
                                concerns: e.target.value.split(',')
                            }))}
                            className="select select-bordered w-full bg-white/50 rounded-lg"
                        >
                            <option value="">Choose multiple options</option>
                            <option value="Acne">Acne</option>
                            <option value="Aging">Aging</option>
                        </select>
                    </div>

                    {/* Ingredients */}
                    <div>
                        <label htmlFor="ingredients" className="label">
                            <span className="text-[#181818] font-bold mb-1">Ingredients</span>
                        </label>
                        <select
                            id="ingredients"
                            value={formData.ingredients}
                            onChange={(e) => setFormData(prevData => ({
                                ...prevData,
                                ingredients: e.target.value.split(',')
                            }))}
                            className="select select-bordered w-full bg-white/50 rounded-lg"
                        >
                            <option value="">Choose multiple options</option>
                            <option value="Ingredient A">Ingredient A</option>
                            <option value="Ingredient B">Ingredient B</option>
                        </select>
                    </div>

                    {/* INCI */}
                    <div className="col-span-full md:col-span-2 ">
                        <label htmlFor="inci" className="label">
                            <span className="text-[#181818] font-bold mb-1">INCI</span>
                        </label>
                        <div className="relative flex items-center input input-bordered w-full flex-wrap gap-2 p-2 min-h-[3rem] bg-white/50 rounded-lg">
                            {formData.inciIngredients.map((ingredient, index) => (
                                <div key={index} className=" bg-white/50 rounded-lg badge badge-lg gap-2  text-gray-800">
                                    {ingredient}
                                    <button
                                        type="button"
                                        className="btn btn-xs btn-ghost btn-circle"
                                        onClick={() => removeInciIngredient(ingredient)}
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                            <input type="text" id="inci" placeholder="" className="flex-grow outline-none bg-bla " />
                            <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    {/* Texture */}
                    <div>
                        <label htmlFor="texture" className="label">
                            <span className="text-[#181818] font-bold mb-1">Texture</span>
                        </label>
                        <select
                            id="texture"
                            value={formData.texture}
                            onChange={(e) => setFormData(prevData => ({
                                ...prevData,
                                texture: e.target.value
                            }))}
                            className="select select-bordered w-full bg-white/50 rounded-lg"
                        >
                            <option value="">Choose an option</option>
                            <option value="Cream">Cream</option>
                            <option value="Gel">Gel</option>
                        </select>
                    </div>

                    {/* Features */}
                    <div>
                        <label htmlFor="features" className="label">
                            <span className="text-[#181818] font-bold mb-1">Features</span>
                        </label>
                        <select
                            id="features"
                            value={formData.features}
                            onChange={(e) => setFormData(prevData => ({
                                ...prevData,
                                features: e.target.value.split(',')
                            }))}
                            className="select select-bordered w-full bg-white/50 rounded-lg"
                        >
                            <option value="">Choose multiple options</option>
                            <option value="Feature 1">Feature 1</option>
                            <option value="Feature 2">Feature 2</option>
                        </select>
                    </div>

                    {/* Natural */}
                    <div>
                        <label htmlFor="natural" className="label">
                            <span className="text-[#181818] font-bold mb-1">Natural</span>
                        </label>
                        <input
                            type="text"
                            id="natural"
                            value={formData.natural}
                            onChange={(e) => setFormData(prevData => ({
                                ...prevData,
                                natural: e.target.value
                            }))}
                            className="input input-bordered w-full bg-white/50 rounded-lg"
                        />
                    </div>

                    {/* Organic */}
                    <div>
                        <label htmlFor="organic" className="label">
                            <span className="text-[#181818] font-bold mb-1">Organic</span>
                        </label>
                        <input
                            type="text"
                            id="organic"
                            value={formData.organic}
                            onChange={(e) => setFormData(prevData => ({
                                ...prevData,
                                organic: e.target.value
                            }))}
                            className="input input-bordered w-full bg-white/50 rounded-lg"
                        />
                    </div>

                    {/* Price range */}
                    <div>
                        <label htmlFor="price-range" className="label">
                            <span className="text-[#181818] font-bold mb-1">Price range</span>
                        </label>
                        <input
                            type="text"
                            id="price-range"
                            value={formData.priceRange}
                            onChange={(e) => setFormData(prevData => ({
                                ...prevData,
                                priceRange: e.target.value
                            }))}
                            className="input input-bordered w-full bg-white/50 rounded-lg"
                        />
                    </div>
                </div>

                <h2 className="text-xl font-semibold ">Fragrance</h2>
                <hr className="my-6 border-gray-200" />

                {/* Fragrance Free */}
                <div className="flex items-center gap-10 col-span-full md:col-span-1">
                    <label htmlFor="fragrance-free" className="label cursor-pointer">
                        <span className="label-text text-base font-medium">Fragrance Free: No</span>
                    </label>
                    <input
                        id="fragrance-free"
                        type="checkbox"
                        className="toggle toggle-sm "
                        checked={formData.fragranceFree}
                        onChange={() => setFormData(prevData => ({
                            ...prevData,
                            fragranceFree: !prevData.fragranceFree
                        }))}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Fragrance */}
                    <div>
                        <label htmlFor="fragrance" className="label">
                            <span className="label-text">Fragrance</span>
                        </label>
                        <select
                            id="fragrance"
                            value={formData.fragrance}
                            onChange={(e) => setFormData(prevData => ({
                                ...prevData,
                                fragrance: e.target.value
                            }))}
                            className="select select-bordered w-full bg-white/50 rounded-lg"
                        >
                            <option value="">Choose an option</option>
                            <option value="Floral">Floral</option>
                            <option value="Citrus">Citrus</option>
                        </select>
                    </div>

                    {/* Fragrance notes */}
                    <div>
                        <label htmlFor="fragrance-notes" className="label">
                            <span className="label-text">Fragrance notes</span>
                        </label>
                        <input
                            type="text"
                            id="fragrance-notes"
                            value={formData.fragranceNotes}
                            onChange={(e) => setFormData(prevData => ({
                                ...prevData,
                                fragranceNotes: e.target.value
                            }))}
                            className="input input-bordered w-full bg-white/50 rounded-lg"
                        />
                    </div>
                </div>

                <hr className="my-6 border-gray-200" />

                <h2 className="text-xl font-semibold mb-6">URL</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Product_URL */}
                    <div>
                        <label htmlFor="product-url" className="label">
                            <span className="label-text">Product_URL</span>
                        </label>
                        <input
                            type="text"
                            id="product-url"
                            value={formData.productUrl}
                            onChange={(e) => setFormData(prevData => ({
                                ...prevData,
                                productUrl: e.target.value
                            }))}
                            className="bg-white/50 rounded-lg input input-bordered w-full"
                        />
                    </div>

                    {/* Image_URL */}
                    <div>
                        <label htmlFor="image-url" className="label">
                            <span className="label-text">Image_URL</span>
                        </label>
                        <input
                            type="text"
                            id="image-url"
                            value={formData.imageUrl}
                            onChange={(e) => setFormData(prevData => ({
                                ...prevData,
                                imageUrl: e.target.value
                            }))}
                            className="input input-bordered w-full bg-white/50 rounded-lg"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 mt-8">
                    {/* Get Back Button */}
                    <button className="btn btn-ghost border border-[#BB9777] text-[#7271E3] hover:bg-red-100">
                        Get back
                    </button>

                    {/* Save and Notify Button */}
                    <button
                        className="btn bg-[#BB9777] text-white hover:bg-purple-700 rounded-lg"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>

            </div>
        </div>
    )
}
