"use client"

import axiosApi from "@/api/axiosApi";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CreateUserMentor() {
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        username: "",
        region: "",
        phone_number: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCreateMentor = () => {
        console.log("Mentor created", formData);

        axiosApi.post("/admin_panel/api/v1/mentor", formData)
            .then(res => {
                console.log(res.data)
                toast.success("Mentor created successfully!");
                setFormData({ full_name: "", email: "", username: "", region: "", phone_number: "" }); // Reset form        
            })
            .catch(err => {
                console.error("Error creating mentor:", err);
                toast.error("Failed to create mentor. Please try again.", err.response?.data?.message || "Unknown error");
            });
    };

    return (
        <div className="min-h-screen">
            <div className="p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create User</h2>

                {/* Form Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            placeholder="Write the user's full name"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Username"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Region */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                        <select
                            name="region"
                            value={formData.region}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Choose a region</option>
                            <option value="north">North</option>
                            <option value="south">South</option>
                            <option value="east">East</option>
                            <option value="west">West</option>
                        </select>
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone number</label>
                        <input
                            type="text"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            placeholder="Phone number"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-6">
                    <div></div>
                    <div>
                        <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                            Get back
                        </button>

                        <button
                            onClick={handleCreateMentor}
                            className="ml-10 px-6 py-3 bg-[#BB9777] font-bold cursor-pointer text-white rounded-lg hover:bg-amber-700 transition-colors"
                        >
                            Create user
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
