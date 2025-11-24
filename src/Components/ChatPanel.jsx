// src/chat/ChatPanel.jsx
import React, { useEffect, useState, useRef } from "react";
import { Send, Paperclip, X } from "lucide-react";
import { getMessages, connectWebSocket } from "../Chat/chatService";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axiosApi from '@/api/axiosApi';
import { toast } from 'react-toastify';

const IMG_BASE = import.meta.env.VITE_IMG_BASE || 'http://10.10.13.80:8005';

const ChatPanel = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [previewSrc, setPreviewSrc] = useState(null);
  const socketRef = useRef(null);
  const scrollRef = useRef();
  const fileInputRef = useRef(null);
  const { id: roomId } = useParams();
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token") || localStorage.getItem("mtrtoken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserID(decoded?.user_id || decoded?.id);
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);

  useEffect(() => {
    const initChat = async () => {
      try {
        const messageList = await getMessages(roomId);
        // normalize any relative file URLs to include IMG_BASE
        const normalized = (Array.isArray(messageList) ? messageList : []).map(normalizeMessage);
        setMessages(normalized);

        socketRef.current = connectWebSocket(roomId, (newMsg) => {
          const nm = normalizeMessage(newMsg);
          addUniqueMessages(nm);
        }, () => {});
      } catch (err) {
        console.error("Error initializing chat:", err);
      }
    };

    if (roomId) initChat();

    return () => {
      socketRef.current?.close();
    };
  }, [roomId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // close preview on ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setPreviewSrc(null);
    }
    if (previewSrc) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [previewSrc]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const form = new FormData();
    form.append('text', input.trim());

    try {
      const res = await axiosApi.post(`/messaging/api/v1/message/${roomId}`, form);
      if (res && res.data) {
        // normalize returned message(s) and add uniquely
        const returned = Array.isArray(res.data) ? res.data.map(normalizeMessage) : normalizeMessage(res.data);
        addUniqueMessages(returned);
        setInput('');
      }
    } catch (err) {
      console.error('Failed to send message:', err);
      const msg = err?.response?.data?.message || err.message || 'Failed to send message';
      toast.error(msg);
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const form = new FormData();
    for (let i = 0; i < files.length; i++) {
      form.append('file', files[i]);
    }

    try {
      toast.info('Uploading file(s)...');
      const res = await axiosApi.post(`/messaging/api/v1/message/${roomId}`, form);
      if (res && res.data) {
        const returned = Array.isArray(res.data) ? res.data.map(normalizeMessage) : normalizeMessage(res.data);
        addUniqueMessages(returned);
        toast.success('File uploaded');
      } else {
        toast.error('Upload failed');
      }
    } catch (err) {
      console.error('File upload failed', err);
      const msg = err?.response?.data?.message || err.message || 'Upload failed';
      toast.error(msg);
    } finally {
      e.target.value = null;
    }
  };

  const renderMessageContent = (msg) => {
    if (msg.files && Array.isArray(msg.files) && msg.files.length > 0) {
      return msg.files.map((f, i) => (
        <div key={i} className="mb-2">
          {f.url ? (
            f.url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
              <img src={f.url} alt={f.name || 'attachment'} className="max-w-xs rounded cursor-pointer" onClick={() => setPreviewSrc(f.url)} />
            ) : (
              <a href={f.url} target="_blank" rel="noreferrer" className="underline text-sm">{f.name || 'Open attachment'}</a>
            )
          ) : (
            <span className="text-sm">{f.name || 'Attachment'}</span>
          )}
        </div>
      ));
    }

    if (msg.file) {
      const url = msg.file;
      return url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
        <img src={url} alt="attachment" className="max-w-xs rounded cursor-pointer" onClick={() => setPreviewSrc(url)} />
      ) : (
        <a href={url} target="_blank" rel="noreferrer" className="underline text-sm">Open attachment</a>
      );
    }

    return <span>{msg.text}</span>;
  };

  // Normalize a message object's file URLs to be absolute using IMG_BASE when necessary
  function normalizeMessage(msg) {
    if (!msg || typeof msg !== 'object') return msg;
    const out = { ...msg };
    // normalize single `file` string
    if (out.file && typeof out.file === 'string') {
      out.file = normalizeUrl(out.file);
    }
    // normalize `files` array of objects with url/name
    if (Array.isArray(out.files)) {
      out.files = out.files.map((f) => {
        if (!f) return f;
        const copy = { ...f };
        if (copy.url && typeof copy.url === 'string') copy.url = normalizeUrl(copy.url);
        return copy;
      });
    }
    return out;
  }

  function normalizeUrl(u) {
    if (!u || typeof u !== 'string') return u;
    // already absolute
    if (u.startsWith('http://') || u.startsWith('https://')) return u;
    // handle leading slash or not
    if (u.startsWith('/')) return IMG_BASE + u;
    return IMG_BASE + '/' + u;
  }

  // Add messages to state, ensuring uniqueness by id (stringified)
  function addUniqueMessages(newMsgs) {
    setMessages((prev) => {
      const prevMap = new Map();
      prev.forEach((m) => {
        try { prevMap.set(String(m.id), m); } catch (e) { /* ignore */ }
      });

      const arr = Array.isArray(newMsgs) ? newMsgs : [newMsgs];
      for (const m of arr) {
        if (!m) continue;
        const id = String(m.id);
        if (!prevMap.has(id)) prevMap.set(id, m);
      }

      return Array.from(prevMap.values());
    });
  }

  return (
    <>
      {previewSrc && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center" onClick={() => setPreviewSrc(null)}>
          <div className="relative max-w-full max-h-full p-4" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setPreviewSrc(null)} className="absolute top-3 right-3 text-white p-2 rounded-full bg-black/30">
              <X size={20} />
            </button>
            <img src={previewSrc} alt="preview" className="max-w-full max-h-[90vh] object-contain" />
          </div>
        </div>
      )}

      <div className="flex flex-col h-full w-full rounded-2xl overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col gap-1 max-w-[80%] ${msg.sender == userID ? "items-end ml-auto" : "items-start"}`}
          >
            <div className={`px-4 py-2 rounded-xl text-sm shadow-sm ${msg.sender == userID ? "bg-[#695CFF] text-white" : "bg-white text-gray-800"}`}>
              {renderMessageContent(msg)}
            </div>
            <span className={`text-xs text-gray-400 ${msg.sender == userID ? "pr-1 text-right" : "pl-1"}`}>
              {msg.created_at?.slice(11, 16)}
            </span>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

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

            <input ref={fileInputRef} type="file" accept="image/*,application/pdf" multiple onChange={handleFileChange} className="hidden" />

            <button type="button" onClick={handleAttachClick} className="p-1.5 rounded-full hover:bg-gray-100 transition">
              <Paperclip size={18} className="text-gray-500" />
            </button>
          </div>

          <button onClick={handleSend} className="w-12 h-10 flex items-center justify-center bg-[#0D0A44] text-white rounded-lg hover:opacity-90 transition">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default ChatPanel;
