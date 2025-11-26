// Note: This version uses `react-select` for autocomplete + creatable fields.
// Make sure you install dependencies:
// npm install react-select

"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Select from "react-select"
import CreatableSelect from "react-select/creatable"
import axiosApi from "@/api/axiosApi"
import { toast } from "react-toastify"

const singleSelectStyles = {
    control: (base) => ({ ...base, backgroundColor: "#ffffff88", borderRadius: "0.75rem" }),
    menu: (base) => ({ ...base, zIndex: 9999 })
}

const multiSelectStyles = {
    ...singleSelectStyles,
    multiValue: (base) => ({ ...base, backgroundColor: "#ffffffcc" }),
}

const options = {
    categories: ["Skincare", "Hair care", "Body care", "Perfume"].map(label => ({ label, value: label })),
    priceRanges: ["$", "$$", "$$$"].map(label => ({ label, value: label })),
    brands: ["Yourself Beauty"].map(label => ({ label, value: label })),
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
    const initialFormData = {
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
    };

    const [formData, setFormData] = useState(initialFormData)

    const navigate = useNavigate()

    const handleSelectChange = (field, value) => {
        // If value is an option object from react-select, extract its value
        const v = value && typeof value === 'object' && 'value' in value ? value.value : value;
        setFormData(prev => ({ ...prev, [field]: v }))
    }

    const handleMultiChange = (field, values) => {
        setFormData(prev => ({ ...prev, [field]: values.map(opt => opt.value) }))
    }

    const getSingleOption = (optsArray, value) => {
        if (!value) return null;
        const found = (optsArray || []).find(o => o.value === value || o.label === value);
        return found || { value, label: value };
    }

    const getMultiOptions = (optsArray, values) => {
        if (!Array.isArray(values)) return [];
        return values.map(v => {
            const found = (optsArray || []).find(o => o.value === v || o.label === v);
            return found || { value: v, label: v };
        })
    }

    const handleSave = () => {
    console.log("Saving form data:", formData);

    const backendProduct = {
        brand: formData?.brand,
        product_type: formData?.productType,
        volumes: formData?.volume,
        ingredients: formData?.ingredients,
        incl: formData?.inciIngredients,
        texture: formData?.texture,
        skin_types: formData?.skinTypes,
        features: formData?.features,
        fragrance_notes: formData?.fragranceNotes,
        concerns: formData?.concerns,
        productId: formData?.productId,
        productName: formData?.productName,
        priceRange: formData?.priceRange,
        description: "", // optional, if you have one
        category: formData?.category,
        image_url: formData?.imageUrl,
        product_url: formData?.productUrl,
        fragranceFree: formData?.fragranceFree,
        natural: formData?.natural,
        organic: formData?.organic,
        pregnancy_safe: formData?.pregnancySafe
    };

    console.log('backendProduct', backendProduct);

    // Send product request to backend
    axiosApi.post('/products/api/v1/product', backendProduct)
        .then(response => {
            console.log('Product request submitted successfully:', response.data);
            toast.success('Product request submitted successfully!');
            // Reset form after successful submission
            setFormData(initialFormData);
        })
        .catch(error => {
            console.error('Error submitting product request:', error);
            const message = error.response?.data?.error || error.message;
            toast.error('Failed to submit product request : ' + message);
        });
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

                    <Select value={getSingleOption(options.categories, formData.category)} options={options.categories} styles={singleSelectStyles} placeholder="Category" onChange={opt => handleSelectChange("category", opt)} />
                    <CreatableSelect value={getSingleOption(options.brands, formData.brand)} options={options.brands} styles={singleSelectStyles} placeholder="Brand" onChange={opt => handleSelectChange("brand", opt)} />
                    <input type="text" placeholder="Product Name" className="input input-bordered bg-white/50 rounded-lg w-full" value={formData.productName} onChange={e => handleSelectChange("productName", e.target.value)} />
                    <CreatableSelect value={getMultiOptions(options.productTypes, formData.productType)} isMulti options={options.productTypes} styles={multiSelectStyles} placeholder="Product Types" onChange={opts => handleMultiChange("productType", opts)} />
                    <Select value={getMultiOptions(options.skinTypes, formData.skinTypes)} isMulti options={options.skinTypes} styles={multiSelectStyles} placeholder="Skin Types" onChange={opts => handleMultiChange("skinTypes", opts)} />
                    <CreatableSelect value={getMultiOptions(options.concerns, formData.concerns)} isMulti options={options.concerns} styles={multiSelectStyles} placeholder="Concerns" onChange={opts => handleMultiChange("concerns", opts)} />
                    <CreatableSelect value={getMultiOptions(options.ingredients, formData.ingredients)} isMulti options={options.ingredients} styles={multiSelectStyles} placeholder="Ingredients" onChange={opts => handleMultiChange("ingredients", opts)} />
                    <CreatableSelect value={getMultiOptions(options.inci, formData.inciIngredients)} isMulti options={options.inci} styles={multiSelectStyles} placeholder="INCI Ingredients" onChange={opts => handleMultiChange("inciIngredients", opts)} />
                    <CreatableSelect value={getMultiOptions(options.volumes, formData.volume)} isMulti options={options.volumes} styles={multiSelectStyles} placeholder="Volume" onChange={opts => handleMultiChange("volume", opts)} />
                    <CreatableSelect value={getMultiOptions(options.textures, formData.texture)} isMulti options={options.textures} styles={multiSelectStyles} placeholder="Texture" onChange={opts => handleMultiChange("texture", opts)} />
                    <CreatableSelect value={getMultiOptions(options.features, formData.features)} isMulti options={options.features} styles={multiSelectStyles} placeholder="Features" onChange={opts => handleMultiChange("features", opts)} />
                    <input type="text" placeholder="% Natural" className="input input-bordered bg-white/50 rounded-lg w-full" value={formData.natural} onChange={e => handleSelectChange("natural", e.target.value)} />
                    <input type="text" placeholder="% Organic" className="input input-bordered bg-white/50 rounded-lg w-full" value={formData.organic} onChange={e => handleSelectChange("organic", e.target.value)} />
                    <Select value={getSingleOption(options.priceRanges, formData.priceRange)} options={options.priceRanges} styles={singleSelectStyles} placeholder="Price Range ($, $$, $$$)" onChange={opt => handleSelectChange("priceRange", opt)} />
                </div>

                <h2 className="text-xl font-semibold mt-10">Fragrance</h2>
                <hr className="my-4" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* <Select options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }]} styles={singleSelectStyles} placeholder="Fragrance?" onChange={opt => handleSelectChange("fragrance", opt.value)} /> */}


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
