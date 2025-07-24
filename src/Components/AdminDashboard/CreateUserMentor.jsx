"use client"


export default function CreateUserMentor() {


    return (
        <div className="min-h-screen ">
            <div className=" p-6 rounded-lg ">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create User</h2>

                {/* Form Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            placeholder="Write the user name"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Right Column */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                        <select
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option>Choose a region</option>
                            {/* Add your region options here */}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone number</label>
                        <input
                            type="text"
                            placeholder="Number"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-6">
                    <div>

                    </div>
                    <div>
                        <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                            Get back
                        </button>

                        <button className="ml-10 px-6 py-3 bg-[#BB9777] font-bold cursor-pointer text-white rounded-lg hover:bg-amber-700 transition-colors">
                            Create user
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}
