// src/chat/ChatPanel.jsx
import React, { useEffect, useState, useRef } from "react";
import { Send, Paperclip } from "lucide-react";
import { getMessages, connectWebSocket } from "../Chat/chatService";
import { useParams } from "react-router-dom";

const ChatPanel = ({ chatWithUserId }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const socketRef = useRef(null);
    const scrollRef = useRef();
    const { id: roomId } = useParams();

    // Logged-in user
    const currentUser = JSON.parse(localStorage.getItem("user"))?.full_name || "current_user";

    useEffect(() => {
        const initChat = async () => {
            // Fetch messages from backend
            const messageList = await getMessages(roomId);
            setMessages(messageList);

            // Connect WebSocket
            socketRef.current = connectWebSocket(
                roomId,
                (newMsg) => {
                    setMessages((prev) => {
                        // If tempId exists, replace the temporary message
                        if (newMsg.tempId) {
                            return prev.map((msg) =>
                                msg.tempId === newMsg.tempId ? { ...newMsg } : msg
                            );
                        }

                        // Otherwise, add message if not duplicate
                        if (prev.find((msg) => msg.id === newMsg.id)) return prev;
                        return [...prev, newMsg];
                    });
                }
            );

        };

        if (roomId) initChat();

        return () => {
            if (socketRef.current) socketRef.current.close();
        };
    }, [roomId]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const tempId = Date.now(); // Temporary ID

        const newMessage = {
            id: tempId,
            text: input.trim(),
            my_message: true,
            created_at: new Date().toISOString(),
            user: currentUser,
            room: roomId,
            seen: true,
            file: null,
            tempId, // Include tempId
        };

        setMessages((prev) => [...prev, newMessage]);

        const messagePayload = {
            type: "chat_message",
            message: input.trim(),
            tempId, // Send tempId to backend
        };

        socketRef.current.send(JSON.stringify(messagePayload));
        setInput("");
    };


    return (
        <div className="flex flex-col h-full w-full rounded-2xl overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex flex-col gap-1 max-w-[80%] ${msg.my_message ? "items-end ml-auto" : "items-start"}`}
                    >
                        <div
                            className={`px-4 py-2 rounded-xl text-sm shadow-sm ${msg.my_message ? "bg-[#695CFF] text-white" : "bg-white text-gray-800"
                                }`}
                        >
                            {msg.text}
                        </div>
                        <span className="text-xs text-gray-400 pl-1">
                            {msg.created_at?.slice(11, 16)}
                        </span>
                    </div>
                ))}
                <div ref={scrollRef} />
            </div>

            {/* Chat Input */}
            <div className="w-full border-t border-gray-200 bg-white/50 backdrop-blur-[100px] px-4 py-3">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-between w-full bg-white rounded-lg px-4 py-2 shadow-sm">
                        <input
                            type="text"
                            placeholder="Write a message"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                        />
                        <button className="p-1.5 rounded-full hover:bg-gray-100 transition">
                            <Paperclip size={18} className="text-gray-500" />
                        </button>
                    </div>
                    <button
                        onClick={handleSend}
                        className="w-12 h-10 flex items-center justify-center bg-[#0D0A44] text-white rounded-lg hover:opacity-90 transition"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPanel;
