import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { ChevronRight, Search, ChevronDown } from 'lucide-react';
import axiosApi from '@/api/axiosApi';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const NotificationComposer = () => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [receiverDropdown, setReceiverDropdown] = useState(false);
    const [receiverQuery, setReceiverQuery] = useState('');
    // user_group selectable by admin; category is fixed to 'Mentor'
    const [userGroup, setUserGroup] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [userRole, setUserRole] = useState('mentor');

    const [selectedReceiver, setSelectedReceiver] = useState(null);
    const [formData, setFormData] = useState({ product: '', title: '', body: '' });

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

    const toggleProductSelection = useCallback((productId) => {
        setSelectedProducts(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
    }, []);

    const handleInputChange = useCallback((field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }, []);

    // Handlers to inspect current input state
    const handleGetBack = () => {
        console.log('Get back clicked - current form state:', {
            formData,
            selectedProducts,
            receiver: selectedReceiver || 'General users'
        });
    };

    // Separate helper to log selected receiver/user data
    const logSelectedUserData = () => {
        if (!selectedReceiver) {
            console.log('No receiver selected');
            return;
        }
        // Log the selected receiver object in a clear, inspectable form
        console.log('Selected receiver data:', selectedReceiver);
    };

    // assigned users for mentor
    const { data: assignedUsers = [] } = useQuery({
        queryKey: ['assignedUsers'],
        queryFn: () => axiosApi.get('/mentor/api/v1/assigned-users').then(res => res.data),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });



    // Get recommended product list for specific user
    const { data: RecommendationProductList = [] } = useQuery({
        queryKey: ['recommendedProducts', selectedReceiver?.id],
        queryFn: () => axiosApi.get(`/mentor/api/v1/recommended-product/${selectedReceiver.id}`).then(res => res.data),
        enabled: !!selectedReceiver?.id,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });


    // dropdown users: mentors see assigned users (filtered by query), admins get server search results
    const { data: adminSearch = [] } = useQuery({
        queryKey: ['adminUserList', receiverQuery],
        queryFn: () => axiosApi.get(`/admin_panel/api/v1/user-list?search=${encodeURIComponent(receiverQuery)}`).then(res => res.data),
        enabled: userRole === 'admin' && (receiverQuery || '').trim().length > 0,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    const dropdownUsers = useMemo(() => {
        if (userRole === 'admin') {
            // admin endpoint may return { results: [] } or an array
            if (!adminSearch) return [];
            return Array.isArray(adminSearch) ? adminSearch : adminSearch.results || [];
        }
        const list = Array.isArray(assignedUsers) ? assignedUsers : [];
        const q = (receiverQuery || '').trim().toLowerCase();
        if (!q) return list;
        return list
            .map(u => ({ ...u, _score: ((u.full_name || '').toLowerCase().startsWith(q) ? 2 : 0) }))
            .filter(u => (u.full_name || '').toLowerCase().includes(q))
            .sort((a, b) => b._score - a._score || (a.full_name || '').localeCompare(b.full_name || ''));
    }, [userRole, adminSearch, assignedUsers, receiverQuery]);

    // choose which product list to render: backend recommendations when available, otherwise static demo list
    const productsToShow = useMemo(() => (Array.isArray(RecommendationProductList) && RecommendationProductList.length) ? RecommendationProductList : recommendedProducts, [RecommendationProductList]);

    // helper: return selected product objects (not just ids)
    const getSelectedProductDetails = useCallback(() => {
        if (!Array.isArray(selectedProducts) || selectedProducts.length === 0) return [];
        return selectedProducts.map(id => productsToShow.find(p => p.id === id)).filter(Boolean);
    }, [selectedProducts, productsToShow]);

    // log all input/form data including selected recommendation product objects
    const logAllInputData = useCallback(() => {
        const selectedProductDetails = getSelectedProductDetails();
        // keep developer logs minimal
        console.log('Notification input:', { formData, selectedReceiver, selectedProducts: selectedProductDetails.length ? selectedProductDetails : selectedProducts });
    }, [formData, selectedReceiver, selectedProducts, getSelectedProductDetails]);

    const handleSend = useCallback(() => {
        logSelectedUserData();
        logAllInputData();
        sendNotification();
    }, [logAllInputData, logSelectedUserData]);

    // send notification to backend in requested shape
    const sendNotification = useCallback(async () => {
        const recipient = selectedReceiver?.id ?? 0;
        const selectedProductDetails = getSelectedProductDetails();
        const recommendationArray = selectedProductDetails.map(p => ({ id: p.id, productName: p.name }));
        const payload = {
            ...(userGroup && { user_group: userGroup }),
            recipient,
            category: 'Mentor',
            custom_title: formData.title || '',
            text: formData.body || '',
            target_url: '',
            recommendation: recommendationArray,
            additional_info: formData.product || ''
        };

        try {
            setIsSending(true);
            const response = await axiosApi.post('/mentor/api/v1/notification', payload);
            toast.success('Notification sent successfully!');
            return response.data;
        } catch (error) {
            toast.error('Error sending notification');
            throw error;
        } finally {
            setIsSending(false);
        }
    }, [selectedReceiver, getSelectedProductDetails, userGroup, formData]);

    // For admin..........................................................

    useEffect(() => {
        const adminToken = localStorage.getItem('adtoken');
        if (!adminToken) return;
        try {
            const tokenData = JSON.parse(atob(adminToken.split('.')[1]));
            setUserRole(tokenData?.role || 'mentor');
        } catch (error) {
            // ignore token parse errors in UI
        }
    }, []);

    // admin searches handled above via adminSearch query

    return (
        <div className="min-h-screen mt-10 ">
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
                            <input
                                type="text"
                                className="input input-bordered w-full bg-white pr-10"
                                placeholder="Search users by name"
                                value={selectedReceiver ? selectedReceiver.full_name : receiverQuery}
                                onChange={(e) => {
                                    setReceiverQuery(e.target.value);
                                    setSelectedReceiver(null);
                                    setReceiverDropdown(true);
                                }}
                                onFocus={() => setReceiverDropdown(true)}
                            />
                            <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

                            {receiverDropdown && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-auto">
                                    <div className="p-2">
                                        {(!Array.isArray(dropdownUsers) || dropdownUsers.length === 0) ? (
                                            <div className="px-3 py-2 text-sm text-gray-500">No users found</div>
                                        ) : (
                                            dropdownUsers.map((u) => (
                                                <button
                                                    key={u.id}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedReceiver(u);
                                                        setReceiverQuery('');
                                                        setReceiverDropdown(false);
                                                    }}
                                                    className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2"
                                                >
                                                    <div className="text-sm text-gray-800">{u.full_name || u.name || u.email}</div>
                                                    <div className="ml-auto text-xs text-gray-400">{u.id}</div>
                                                </button>
                                            ))
                                        )}
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
                            <select
                                name="user_group"
                                id="user_group"
                                className='input input-bordered w-full bg-white pr-10'
                                value={userGroup}
                                onChange={(e) => {
                                    setUserGroup(e.target.value);

                                }}
                            >
                                <option value="">Select group</option>
                                <option value="Normal">Normal</option>
                                <option value="Dry">Dry</option>
                                <option value="Oily">Oily</option>
                                <option value="Combination">Combination</option>
                                <option value="Sensitive">Sensitive</option>
                            </select>

                        </div>
                    </div>
                </div>

                {/* Recommended Products */}
                <div className="mb-8">
                    <h3 className="text-lg font-satoshi font-bold text-gray-800 mb-4">Popular products for this group</h3>
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                        {productsToShow.map((product) => {
                            const compatibility = typeof product.compatibility === 'number'
                                ? `${Math.round(product.compatibility * 100)}%`
                                : product.rating || '';
                            const category = product.product_type || product.category || '';
                            return (
                                <div key={product.id} className="card bg-white shadow-sm border border-gray-100">
                                    <div className="card-body p-4">
                                        <div className="flex items-start gap-3">
                                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden`}>
                                                {product.image && typeof product.image === 'string' && product.image.startsWith('http') ? (
                                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="text-xl">{product.image}</div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-800 text-sm leading-tight mb-1">
                                                    {product.name}
                                                </h4>
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <span className="font-medium">{compatibility}</span>
                                                    <span>{category}</span>
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
                            );
                        })}
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
                    <button onClick={handleGetBack} className="btn btn-outline btn-neutral border-[#BB9777] ">
                        Get back
                    </button>
                    <button onClick={handleSend} className="btn bg-[#BB9777] hover:bg-amber-800 text-white border-none">
                        Send notification
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationComposer;