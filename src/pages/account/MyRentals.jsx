import React from "react";
import { MapPin, Star } from "lucide-react";

const data = [
  {
    id: 1,
    title: "Căn hộ Studio Q1",
    location: "Quận 1, TP.HCM",
    bookings: 12,
    revenue: "15.600.000 VNĐ",
    rating: 4.8,
    status: "Đang hoạt động",
  },
  {
    id: 2,
    title: "Nhà nguyên căn Q7",
    location: "Quận 7, TP.HCM",
    bookings: 8,
    revenue: "24.000.000 VNĐ",
    rating: 4.9,
    status: "Đang hoạt động",
  },
];

export default function MyRentals() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Lịch thuê của tôi</h1>
      <div className="grid gap-6">
        {data.map((r) => (
          <div key={r.id} className="bg-gray-700 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {r.title}
                </h3>
                <p className="text-gray-300 flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{r.location}</span>
                </p>
              </div>
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                {r.status}
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Lượt đặt</p>
                <p className="text-white font-semibold text-lg">{r.bookings}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">Doanh thu</p>
                <p className="text-white font-semibold text-lg">{r.revenue}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">Đánh giá</p>
                <div className="flex items-center justify-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white font-semibold">{r.rating}</span>
                </div>
              </div>
              <div className="text-center">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Quản lý
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
