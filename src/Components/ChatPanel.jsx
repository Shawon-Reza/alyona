// src/chat/ChatPanel.jsx
import React, { useEffect, useState, useRef } from "react";
import { Send, Paperclip } from "lucide-react";
import { getMessages, connectWebSocket } from "../Chat/chatService";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ChatPanel = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef(null);
  const scrollRef = useRef();
  const { id: roomId } = useParams();
  const [userID, setUserID] = useState(null);

  // ✅ Decode user ID from token
  useEffect(() => {
    const token =
      localStorage.getItem("token") || localStorage.getItem("mtrtoken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserID(decoded?.user_id || decoded?.id); // Adjust depending on JWT payload
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);

  // ✅ Load chat + connect WebSocket
  useEffect(() => {
    const initChat = async () => {
      try {
        const messageList = await getMessages(roomId);
        setMessages(messageList);

        socketRef.current = connectWebSocket(roomId, (newMsg) => {
          setMessages((prev) =>
            prev.find((msg) => msg.id === newMsg.id)
              ? prev
              : [...prev, newMsg]
          );
        });
      } catch (err) {
        console.error("Error initializing chat:", err);
      }
    };

    if (roomId) initChat();

    return () => {
      socketRef.current?.close();
    };
  }, [roomId]);

  // ✅ Auto-scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Handle send message
  const handleSend = () => {
    if (!input.trim()) return;

    try {
      socketRef.current.send(
        JSON.stringify({ type: "chat_message", message: input.trim() })
      );
      setInput(""); // Clear input field
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className="flex flex-col h-full w-full rounded-2xl overflow-hidden">
      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col gap-1 max-w-[80%] ${msg.sender === userID ? "items-end ml-auto" : "items-start"
              }`}
          >
            <div
              className={`px-4 py-2 rounded-xl text-sm shadow-sm ${msg.sender === userID
                ? "bg-[#695CFF] text-white"
                : "bg-white text-gray-800"
                }`}
            >
              {msg.text}
            </div>

            <span
              className={`text-xs text-gray-400 ${msg.sender === userID ? "pr-1 text-right" : "pl-1"
                }`}
            >
              {msg.created_at?.slice(11, 16)}
            </span>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Chat Input */}
      <div className="w-full border-t border-gray-200 bg-white/50 backdrop-blur-[100px] px-4 py-3">
        <div className="flex items-center gap-2 pb-2">
          <div className="flex items-center justify-between w-full bg-white rounded-lg px-4 py-2 shadow-sm">
            <input
              type="text"
              placeholder="Write a message..."
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
