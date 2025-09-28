import React from "react";
import { Calendar, Star } from "lucide-react";

const data = [
  {
    id: 1,
    title: "Villa Sunrise Đà Lạt",
    date: "15/09/2025 - 17/09/2025",
    status: "Hoàn thành",
    price: "2.500.000 VNĐ",
    rating: 5,
  },
  {
    id: 2,
    title: "Căn hộ Ocean View Nha Trang",
    date: "20/08/2025 - 25/08/2025",
    status: "Hoàn thành",
    price: "4.200.000 VNĐ",
    rating: 4,
  },
  {
    id: 3,
    title: "Nhà phố cổ Hội An",
    date: "10/10/2025 - 12/10/2025",
    status: "Sắp tới",
    price: "1.800.000 VNĐ",
    rating: null,
  },
];

export default function BookingHistory() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Lịch sử hoạt động</h1>
      <div className="space-y-4">
        {data.map((b) => (
          <div key={b.id} className="bg-gray-700 rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {b.title}
                </h3>
                <div className="flex items-center space-x-4 text-gray-300 text-sm">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{b.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold">{b.price}</span>
                  </div>
                </div>
                {b.rating && (
                  <div className="flex items-center space-x-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < b.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-400"
                        }`}
                      />
                    ))}
                    <span className="text-gray-300 text-sm ml-2">
                      Đã đánh giá
                    </span>
                  </div>
                )}
              </div>
              <div className="text-right">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    b.status === "Hoàn thành"
                      ? "bg-green-600 text-white"
                      : b.status === "Sắp tới"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-600 text-white"
                  }`}
                >
                  {b.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
