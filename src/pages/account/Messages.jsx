import React from "react";

const data = [
  {
    id: 1,
    from: "Chủ nhà Villa Sunrise",
    message: "Cảm ơn bạn...",
    time: "2 giờ trước",
    unread: true,
  },
  {
    id: 2,
    from: "Hỗ trợ khách hàng",
    message: "Yêu cầu hủy booking...",
    time: "1 ngày trước",
    unread: false,
  },
  {
    id: 3,
    from: "Chủ nhà Ocean View",
    message: "Check-in từ 2PM nhé!",
    time: "3 ngày trước",
    unread: false,
  },
];

export default function Messages() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Tin nhắn</h1>
      <div className="space-y-4">
        {data.map((m) => (
          <div
            key={m.id}
            className={`bg-gray-700 rounded-lg p-4 ${
              m.unread ? "border-l-4 border-orange-500" : ""
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-white">{m.from}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-sm">{m.time}</span>
                {m.unread && (
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                )}
              </div>
            </div>
            <p className="text-gray-300">{m.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
