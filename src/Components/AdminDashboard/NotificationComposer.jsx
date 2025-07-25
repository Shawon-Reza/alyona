import React, { useState } from 'react';
import { ChevronRight, Search, ChevronDown } from 'lucide-react';

const NotificationComposer = () => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [receiverDropdown, setReceiverDropdown] = useState(false);
    const [formData, setFormData] = useState({
        product: '',
        title: '',
        body: ''
    });

    const recommendedProducts = [
        {
            id: 1,
            name: 'Alpha Beta Pore Perfecting Cleansing Gel',
            rating: '79%',
            category: 'Gel cleanser',
            color: 'bg-amber-100',
            image: '🧴'
        },
        {
            id: 2,
            name: 'Kakadu C Brightening Daily Cleanser',
            rating: '85%',
            category: 'Gel cleanser',
            color: 'bg-purple-200',
            image: '🧴'
        },
        {
            id: 3,
            name: 'Purifying Toner',
            rating: '79%',
            category: 'Toner',
            color: 'bg-blue-200',
            image: '🧴'
        }
    ];

    const toggleProductSelection = (productId) => {
        setSelectedProducts(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="min-h-screen ">
            <div className="">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
                    <span>Sophia Brown</span>
                    <ChevronRight size={16} />
                    <span className="font-medium">Send Notification</span>
                </div>

                {/* Receiver and User Group Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Receiver */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Receiver
                        </label>
                        <div className="relative">
                            <div
                                className="input input-bordered w-full bg-white flex items-center justify-between cursor-pointer"
                                onClick={() => setReceiverDropdown(!receiverDropdown)}
                            >
                                <span className="text-gray-600">General users</span>
                                <ChevronDown size={16} className="text-gray-400" />
                            </div>
                            {receiverDropdown && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                    <div className="p-2">
                                        <div className="px-3 py-2 hover:bg-gray-50 cursor-pointer">General users</div>
                                        <div className="px-3 py-2 hover:bg-gray-50 cursor-pointer">Premium users</div>
                                        <div className="px-3 py-2 hover:bg-gray-50 cursor-pointer">New users</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* User Group */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            User group
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                className="input input-bordered w-full bg-white pr-10"
                                value="Sophia Brown"
                                readOnly
                            />
                            <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Recommended Products */}
                <div className="mb-8"> 
                    <h3 className="text-lg font-satoshi font-bold text-gray-800 mb-4">Popular products for this group</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {recommendedProducts.map((product) => (
                            <div key={product.id} className="card bg-white shadow-sm border border-gray-100">
                                <div className="card-body p-4">
                                    <div className="flex items-start gap-3">
                                        <div className={`w-12 h-12 ${product.color} rounded-lg flex items-center justify-center text-xl`}>
                                            {product.image}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-800 text-sm leading-tight mb-1">
                                                {product.name}
                                            </h4>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <span className="font-medium">{product.rating}</span>
                                                <span>{product.category}</span>
                                            </div>
                                        </div>
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-sm"
                                            checked={selectedProducts.includes(product.id)}
                                            onChange={() => toggleProductSelection(product.id)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-6 mb-8">
                    {/* Product */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Product
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                className="input input-bordered w-full bg-white pr-10"
                                placeholder="Write a product name"
                                value={formData.product}
                                onChange={(e) => handleInputChange('product', e.target.value)}
                            />
                            <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            className="input input-bordered w-full bg-white"
                            placeholder="Write a title"
                            value={formData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                        />
                    </div>

                    {/* Body */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Body
                        </label>
                        <textarea
                            className="textarea textarea-bordered w-full bg-white h-32 resize-none"
                            placeholder="Write the message to share"
                            value={formData.body}
                            onChange={(e) => handleInputChange('body', e.target.value)}
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3">
                    <button className="btn btn-outline btn-neutral border-[#BB9777] ">
                        Get back
                    </button>
                    <button className="btn bg-[#BB9777] hover:bg-amber-800 text-white border-none">
                        Send notification
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationComposer;