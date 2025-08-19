// Note: This version uses `react-select` for autocomplete + creatable fields.
// Make sure you install dependencies:
// npm install react-select

"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Select from "react-select"
import CreatableSelect from "react-select/creatable"

const singleSelectStyles = {
    control: (base) => ({ ...base, backgroundColor: "#ffffff88", borderRadius: "0.75rem" }),
    menu: (base) => ({ ...base, zIndex: 9999 })
}

const multiSelectStyles = {
    ...singleSelectStyles,
    multiValue: (base) => ({ ...base, backgroundColor: "#ffffffcc" }),
}

const options = {
    categories: ["Skincare", "Hair Care", "Body Care", "Perfume"].map(label => ({ label, value: label })),
    priceRanges: ["$", "$$", "$$$"].map(label => ({ label, value: label })),
    brands: ["Brand A", "Brand B"].map(label => ({ label, value: label })),
    productTypes: ["Night Cream", "Moisturizer"].map(label => ({ label, value: label })),
    skinTypes: ["Normal", "Oily", "Dry", "Sensitive"].map(label => ({ label, value: label })),
    concerns: ["Acne", "Aging", "Dryness", "Dehydration"].map(label => ({ label, value: label })),
    ingredients: ["Peptides", "Hyaluronic Acid", "Phytosterols", "Aloe Juice"].map(label => ({ label, value: label })),
    inci: ["Aloe Barbadensis Leaf Juice", "Glycerin", "Simmondsia Chinensis Seed Oil"].map(label => ({ label, value: label })),
    volumes: ["12 g", "0.42 oz"].map(label => ({ label, value: label })),
    textures: ["Rich", "Cream"].map(label => ({ label, value: label })),
    features: ["Firming", "Hydrating", "Barrier-repairing", "Skin glow"].map(label => ({ label, value: label })),
    fragranceNotes: ["Floral", "Amber", "Sweet"].map(label => ({ label, value: label })),
}

export default function AddProductRequestPage() {
    const [formData, setFormData] = useState({
        pregnancySafe: false,
        fragranceFree: false,
        productId: "",
        category: "",
        brand: "",
        productName: "",
        productType: [],
        skinTypes: [],
        concerns: [],
        ingredients: [],
        inciIngredients: [],
        volume: [],
        texture: [],
        features: [],
        natural: "",
        organic: "",
        priceRange: "",
        fragrance: "",
        fragranceNotes: [],
        productUrl: "",
        imageUrl: ""
    })

    const navigate = useNavigate()

    const handleSelectChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleMultiChange = (field, values) => {
        setFormData(prev => ({ ...prev, [field]: values.map(opt => opt.value) }))
    }

    const handleSave = () => {
        console.log("Saving form data:", formData)
    }

    return (
        <div className="min-h-screen ">
            <div className="text-sm breadcrumbs mb-6">
                <ul>
                    <li onClick={() => navigate('/admindashboard')}><a>Dashboard</a></li>
                    <li>New product request</li>
                </ul>
            </div>

            <div className="card ">
                <h2 className="text-xl font-semibold mb-6">General</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    <input type="text" placeholder="Product ID" className="input input-bordered bg-white/50 rounded-lg w-full" value={formData.productId} onChange={e => handleSelectChange("productId", e.target.value)} />
                   
                    <Select options={options.categories} styles={singleSelectStyles} placeholder="Category" onChange={opt => handleSelectChange("category", opt.value)} />
                    <CreatableSelect options={options.brands} styles={singleSelectStyles} placeholder="Brand" onChange={opt => handleSelectChange("brand", opt.value)} />
                    <input type="text" placeholder="Product Name" className="input input-bordered bg-white/50 rounded-lg w-full" value={formData.productName} onChange={e => handleSelectChange("productName", e.target.value)} />
                    <CreatableSelect isMulti options={options.productTypes} styles={multiSelectStyles} placeholder="Product Types" onChange={opts => handleMultiChange("productType", opts)} />
                    <Select isMulti options={options.skinTypes} styles={multiSelectStyles} placeholder="Skin Types" onChange={opts => handleMultiChange("skinTypes", opts)} />
                    <CreatableSelect isMulti options={options.concerns} styles={multiSelectStyles} placeholder="Concerns" onChange={opts => handleMultiChange("concerns", opts)} />
                    <CreatableSelect isMulti options={options.ingredients} styles={multiSelectStyles} placeholder="Ingredients" onChange={opts => handleMultiChange("ingredients", opts)} />
                    <CreatableSelect isMulti options={options.inci} styles={multiSelectStyles} placeholder="INCI Ingredients" onChange={opts => handleMultiChange("inciIngredients", opts)} />
                    <CreatableSelect isMulti options={options.volumes} styles={multiSelectStyles} placeholder="Volume" onChange={opts => handleMultiChange("volume", opts)} />
                    <CreatableSelect isMulti options={options.textures} styles={multiSelectStyles} placeholder="Texture" onChange={opts => handleMultiChange("texture", opts)} />
                    <CreatableSelect isMulti options={options.features} styles={multiSelectStyles} placeholder="Features" onChange={opts => handleMultiChange("features", opts)} />
                    <input type="text" placeholder="% Natural" className="input input-bordered bg-white/50 rounded-lg w-full" value={formData.natural} onChange={e => handleSelectChange("natural", e.target.value)} />
                    <input type="text" placeholder="% Organic" className="input input-bordered bg-white/50 rounded-lg w-full" value={formData.organic} onChange={e => handleSelectChange("organic", e.target.value)} />
                    <Select options={options.priceRanges} styles={singleSelectStyles} placeholder="Price Range ($, $$, $$$)" onChange={opt => handleSelectChange("priceRange", opt.value)} />
                </div>

                <h2 className="text-xl font-semibold mt-10">Fragrance</h2>
                <hr className="my-4" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }]} styles={singleSelectStyles} placeholder="Fragrance?" onChange={opt => handleSelectChange("fragrance", opt.value)} />
                    <CreatableSelect isMulti options={options.fragranceNotes} styles={multiSelectStyles} placeholder="Fragrance Notes" onChange={opts => handleMultiChange("fragranceNotes", opts)} />
                </div>

                <div className="form-control flex flex-col mt-6">
                    <label className="label cursor-pointer">
                        <span className="label-text">Pregnancy/Breastfeeding Safe</span>
                        <input type="checkbox" className="toggle h-5" checked={formData.pregnancySafe} onChange={() => handleSelectChange("pregnancySafe", !formData.pregnancySafe)} />
                    </label>
                    <label className="label cursor-pointer">
                        <span className="label-text">Fragrance Free</span>
                        <input type="checkbox" className="toggle h-5" checked={formData.fragranceFree} onChange={() => handleSelectChange("fragranceFree", !formData.fragranceFree)} />
                    </label>
                </div>

                <h2 className="text-xl font-semibold mt-10">Links</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" placeholder="Product URL" className="input input-bordered bg-white/50 rounded-lg w-full" value={formData.productUrl} onChange={e => handleSelectChange("productUrl", e.target.value)} />
                    <input type="text" placeholder="Image URL" className="input input-bordered bg-white/50 rounded-lg w-full" value={formData.imageUrl} onChange={e => handleSelectChange("imageUrl", e.target.value)} />
                </div>

                <div className="flex justify-end gap-4 mt-8">
                    <button className="btn btn-ghost border border-[#BB9777] text-[#7271E3]">Get back</button>
                    <button onClick={handleSave} className="btn bg-[#BB9777] text-white hover:bg-purple-700 rounded-lg">Save</button>
                </div>
            </div>
        </div>
    )
}
