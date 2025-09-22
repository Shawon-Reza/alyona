import { useState, useRef, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import axiosApi from "@/api/axiosApi"
import { useNavigate } from "react-router-dom"

export default function MentorDropdown() {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)
    const navigate = useNavigate();
    const toggleDropdown = () => setIsOpen(prev => !prev)

    // ✅ Fetch chatrooms (mentor rooms)
    const {
        data: rooms,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["mentorRooms"],
        queryFn: async () => {
            const res = await axiosApi.get(`/messaging/api/v1/room/`)
            return res.data
        },
        enabled: isOpen,
    })

    // ❌ Close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target) &&
                !e.target.closest("#mentor-dropdown-toggle")
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className="relative w-full " ref={dropdownRef}>
            {/* Toggle Button */}
            <button
                id="mentor-dropdown-toggle"
                className="w-full flex justify-between items-center bg-white rounded-xl px-4 py-2 shadow-sm cursor-pointer"
                onClick={toggleDropdown}
            >
                <h2 className="text-xl font-bold">Mentors</h2>
                <span className="text-[#4F46E5] text-2xl">{isOpen ? "˄" : "›"}</span>
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
                <div className="absolute w-full bg-white border rounded-xl shadow-lg mt-2 z-10 p-4 max-h-60 overflow-y-auto">
                    {isLoading && <p className="text-sm text-gray-500">Loading mentors...</p>}
                    {isError && <p className="text-sm text-red-500">Error: {error.message}</p>}

                    {!isLoading && !isError && (
                        <>
                            {rooms?.length > 0 ? (
                                <ul className="space-y-3">
                                    {rooms.map((room) => (
                                        <li
                                            onClick={() => {
                                                navigate(`/chat/chat-with-mentor/${room.id}`);
                                            }}
                                            key={room.id}
                                            className="flex items-center justify-between text-sm text-gray-700 hover:bg-gray-100 p-2 rounded-lg cursor-pointer"
                                        >
                                            <div className="flex items-center gap-3">
                                                {/* Optional avatar if available */}
                                                {room.other_user_image ? (
                                                    <img
                                                        src={room.other_user_image}
                                                        alt={room.other_user}
                                                        className="w-8 h-8 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs">
                                                        {room.other_user?.charAt(0)?.toUpperCase() || "U"}
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-medium">{room.other_user}</p>
                                                    <p className="text-xs text-gray-500 truncate max-w-[180px]">
                                                        {room.last_message || "No messages yet"}
                                                    </p>
                                                </div>
                                            </div>
                                            {/* Optional: show unseen_count */}
                                            {room.unseen_count > 0 && (
                                                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                                    {room.unseen_count}
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-500">No mentor rooms found.</p>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    )
}
