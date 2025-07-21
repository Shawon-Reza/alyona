import { LayoutGrid, Users, ShoppingBag, UserPlus, LogOut } from "lucide-react"

export default function AdminDashboardSidebar() {
    return (
        <div className="w-64 h-screen bg-white/50 border-r border-base-100 rounded-xl">
            <div className="p-6">
                {/* Logo/Brand */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-orange-400 rounded-full"></div>
                    </div>
                    <span className="font-medium text-gray-800 text-sm tracking-wide">YOURSELF BEAUTY</span>
                </div>

                {/* Navigation Items */}
                <nav className="space-y-2">
                    {/* Dashboard - Active */}
                    <a
                        href="/admindashboard"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg bg-orange-100 text-gray-800 font-medium transition-colors"
                    >
                        <LayoutGrid className="w-5 h-5" />
                        <span>Dashboard</span>
                    </a>

                    {/* Users */}
                    <a
                        href="/users"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-orange-100 hover:text-gray-800 transition-colors"
                    >
                        <Users className="w-5 h-5" />
                        <span>Users</span>
                    </a>

                    {/* Products */}
                    <a
                        href="/products"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-orange-100 hover:text-gray-800 transition-colors"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        <span>Products</span>
                    </a>

                    {/* Create a mentor */}
                    <a
                        href="/create-mentor"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-orange-100 hover:text-gray-800 transition-colors"
                    >
                        <UserPlus className="w-5 h-5" />
                        <span>Create a mentor</span>
                    </a>

                    {/* Log out */}
                    <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-orange-100 hover:text-gray-800 transition-colors w-full text-left">
                        <LogOut className="w-5 h-5" />
                        <span>Log out</span>
                    </button>
                </nav>
            </div>
        </div>
    )
}
