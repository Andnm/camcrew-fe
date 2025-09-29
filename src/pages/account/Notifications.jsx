import React from "react";
import { CheckCircle, Bell, AlertCircle } from "lucide-react";

const data = [
  {
    id: 1,
    type: "success",
    title: "Thanh toán thành công",
    message: "Đã thanh toán ...",
    time: "30 phút trước",
    read: false,
  },
  {
    id: 2,
    type: "info",
    title: "Nhắc nhở check-in",
    message: "Còn 2 ngày ...",
    time: "2 giờ trước",
    read: false,
  },
  {
    id: 3,
    type: "warning",
    title: "Yêu cầu đánh giá",
    message: "Hãy để lại đánh giá ...",
    time: "1 ngày trước",
    read: true,
  },
];

export default function Notifications() {
  const icon = (t) =>
    t === "success" ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : t === "info" ? (
      <Bell className="w-5 h-5 text-blue-500" />
    ) : (
      <AlertCircle className="w-5 h-5 text-yellow-500" />
    );

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Thông báo</h1>
      <div className="space-y-4">
        {data.map((n) => (
          <div
            key={n.id}
            className={`bg-gray-700 rounded-lg p-4 ${
              !n.read ? "border-l-4 border-orange-500" : ""
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">{icon(n.type)}</div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-white">{n.title}</h3>
                  <span className="text-gray-400 text-sm">{n.time}</span>
                </div>
                <p className="text-gray-300">{n.message}</p>
              </div>
              {!n.read && (
                <div className="w-2 h-2 bg-[#FF9500] rounded-full flex-shrink-0 mt-2" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
