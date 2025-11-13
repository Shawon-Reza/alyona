// src/chat/chatService.js

import axiosApi from "@/api/axiosApi";


export const getOrCreateRoom = async (otherUserId) => {
    const res = await axiosApi.post(`/room/${otherUserId}`);
    return res.data;
};

export const getMessages = async (roomId) => {
    console.log(roomId)
    const res = await axiosApi.get(`/messaging/api/v1/message/${roomId}`);
    console.log(res.data)  // Messages history 
    console.log(window.location.host)
    return res.data;

};

export const connectWebSocket = (roomId, onMessage, onSeen) => {
    // const token = JSON.parse(localStorage.getItem("mtrtoken"));
    let token;
    try {
        token = JSON.parse(localStorage.getItem('token'))
            || JSON.parse(localStorage.getItem('mtrtoken'));
    } catch (e) {
        token = null;
    }
    console.log(token);

    const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
    const wsUrl = `${wsProtocol}://10.10.13.80:8005/ws/chat/${roomId}/?token=${token}`;

    const socket = new WebSocket(wsUrl);

    socket.onopen = () => console.log("✅ WebSocket connected");

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data)
        if (data.type === "chat_message") {
            onMessage(data.message);
        } else if (data.type === "messages_seen_update") {
            onSeen(data.message_ids, data.seen_by);
        }
    };

    socket.onclose = () => console.log("❌ WebSocket disconnected");
    socket.onerror = (e) => console.error("⚠️ WebSocket error", e);
    return socket;
};

// For notifications 
export const getnotifications = async () => {
    const res = await axiosApi.get('/messaging/api/v1/notifications');
    console.log(res.data)
    return res.data;
}


// For notifications
export const connectWebSocketForNotifications = (onNotification) => {
    let token;
    try {
        token = JSON.parse(localStorage.getItem('token'))
            || JSON.parse(localStorage.getItem('mtrtoken'));
    } catch (e) {
        token = null;
    }
    console.log(token);

    const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
    const wsUrl = `${wsProtocol}://10.10.13.80:8005/ws/notifications/?token=${token}`;

    const socket = new WebSocket(wsUrl); "wss://api.alyona.ai/ws/notifications/?token=${token}";


    socket.onopen = () => console.log("✅ Notification WebSocket connected");

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Notification received:", data);
        onNotification(data);

    };

    socket.onclose = () => console.log("❌ Notification WebSocket disconnected");
    socket.onerror = (e) => console.error("⚠️ Notification WebSocket error", e);
    return socket;

}

