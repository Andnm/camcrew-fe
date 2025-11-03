import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { fetchConversations } from "../../api/conversations";
import { fetchMessages, sendMessage } from "../../api/messages";
import { useAuth } from "../../context/AuthContext";
import { Send } from "lucide-react";

const API_BASE = (import.meta.env.VITE_API_REALTIME_URL || "").replace(
  /\/$/,
  ""
);
const SOCKET_URL = API_BASE.replace(/\/api$/, "");

export default function Messages() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedConv, setSelectedConv] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!user?._id) return;
    const socket = io(SOCKET_URL, { query: { userId: user._id } });
    socketRef.current = socket;

    socket.on("conversation:new", (c) => {
      setConversations((prev) => [c, ...prev.filter((x) => x._id !== c._id)]);
    });

    socket.on("conversation:updated", (c) => {
      setConversations((prev) => {
        const exist = prev.find((x) => x._id === c._id);
        if (exist) return [c, ...prev.filter((x) => x._id !== c._id)];
        return prev;
      });
    });

    socket.on("message:new", ({ conversationId, message }) => {
      if (selectedConv?._id !== conversationId) return;

      const direction =
        message?.sender?.userId === user?._id ? "outgoing" : "incoming";

      setMessages((prev) =>
        prev.some((x) => x._id === message._id)
          ? prev
          : [...prev, { ...message, direction }]
      );
    });

    return () => socket.disconnect();
  }, [user, selectedConv]);

  useEffect(() => {
    if (!user?._id) return;
    (async () => {
      const data = await fetchConversations(user._id);
      console.log("data: ", data);
      setConversations(data);
    })();
  }, [user]);

  useEffect(() => {
    if (!selectedConv?._id) return;
    socketRef.current.emit("conversation:join", {
      conversationId: selectedConv._id,
    });
    (async () => {
      const data = await fetchMessages(selectedConv._id, user._id);
      setMessages(data);
    })();
    return () => {
      socketRef.current.emit("conversation:leave", {
        conversationId: selectedConv._id,
      });
    };
  }, [selectedConv]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 100);
    return () => clearTimeout(timeout);
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMsg.trim() || !selectedConv) return;
    const payload = {
      conversationId: selectedConv._id,
      sender: {
        userId: user._id,
        role: user.role_name?.toLowerCase(),
        fullName: user.full_name,
        email: user.email,
        avatarUrl: user.avatar_url || "",
      },
      text: newMsg.trim(),
    };
    await sendMessage(payload);
    console.log("conversations: ", conversations);
    setNewMsg("");
  };

  return (
    <div className="flex h-[80vh] text-white">
      <div className="w-1/3 bg-gray-800 border-r border-gray-700 overflow-y-auto">
        <h2 className="p-4 text-lg font-semibold border-b border-gray-700">
          Cuộc trò chuyện
        </h2>
        {conversations.map((c) => {
          const peer = c.peer;
          return (
            <div
              key={c._id}
              onClick={() => setSelectedConv(c)}
              className={`flex items-center gap-3 p-4 cursor-pointer border-b border-gray-700 hover:bg-gray-700 ${
                selectedConv?._id === c._id ? "bg-gray-700" : ""
              }`}
            >
              <img
                src={peer?.avatarUrl || "/default-avatar.png"}
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-white">{peer?.fullName}</p>
                <p className="text-sm text-gray-400 truncate">
                  {c.lastMessage?.text || "Chưa có tin nhắn"}
                </p>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(c.updatedAt).toLocaleDateString()}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex-1 flex flex-col bg-gray-900">
        {selectedConv ? (
          <>
            <div className="p-4 border-b border-gray-700 flex items-center gap-3">
              <img
                src={selectedConv.peer?.avatarUrl || "/default-avatar.png"}
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <h3 className="text-lg font-semibold">
                {selectedConv.peer?.fullName}
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m) => (
                <div
                  key={m._id}
                  className={`flex ${
                    m.direction === "outgoing" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] px-3 py-2 rounded-xl ${
                      m.direction === "outgoing"
                        ? "bg-[#FF9500] text-black"
                        : "bg-gray-700 text-gray-100"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSend}
              className="p-4 border-t border-gray-700 flex gap-3"
            >
              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#FF9500] text-black rounded-lg px-4 py-2 font-semibold hover:bg-orange-600"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Chọn một cuộc trò chuyện để bắt đầu
          </div>
        )}
      </div>
    </div>
  );
}
