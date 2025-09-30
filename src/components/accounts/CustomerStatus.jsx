import React, { useEffect, useState } from "react";
import { Calendar, Camera } from "lucide-react";
import { listBookings } from "../../api/bookings";
import { BOOKING_STATUS_OPTIONS, SERVICE_TIME_OF_DAYS } from "../../utils/constants";
import { getBookingStatusLabel } from "../../utils/helper";

const STATUS_TABS = [
  BOOKING_STATUS_OPTIONS.REQUESTED,
  BOOKING_STATUS_OPTIONS.PAYING,
  BOOKING_STATUS_OPTIONS.PAY_CANCELLED,
];

const statusBadgeClass = (s) =>
  s === "completed"
    ? "bg-green-600 text-white"
    : s === "paying"
      ? "bg-yellow-600 text-white"
      : s === "pay_cancelled"
        ? "bg-red-600 text-white"
        : "bg-gray-600 text-white";

const getTimeLabel = (value) => {
  const t = SERVICE_TIME_OF_DAYS.find((x) => x.value === value);
  return t ? t.label : value;
};

export default function CustomerStatus() {
  const [activeStatus, setActiveStatus] = useState(BOOKING_STATUS_OPTIONS.REQUESTED);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  const fetchData = async (page = pagination.page, status = activeStatus) => {
    setLoading(true);
    try {
      const res = await listBookings({ page, limit: pagination.limit, status });
      setItems(res?.data || []);
      setPagination((p) => ({
        ...p,
        page: res?.pagination?.pageIndex || page,
        limit: res?.pagination?.pageSize || p.limit,
        total: res?.pagination?.totalResults || 0,
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1, activeStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStatus]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) fetchData(newPage, activeStatus);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        {STATUS_TABS.map((s) => {
          const isActive = activeStatus === s;
          const activeClasses = "bg-[#FF9500] text-black";
          const inactiveClasses = "bg-gray-700 text-gray-200 hover:bg-gray-600";

          return (
            <button
              key={s}
              onClick={() => {
                setActiveStatus(s);
                setPagination((p) => ({ ...p, page: 1 }));
              }}
              className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-colors ${isActive ? activeClasses : inactiveClasses}`}
            >
              <span>{getBookingStatusLabel(s)}</span>

            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-28 bg-gray-800/60 rounded animate-pulse" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center text-gray-400 py-8">Không có đơn phù hợp</div>
      ) : (
        items
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((b) => {
            const cam = b.cameraman_id || {};
            const srv = b.service_id || {};
            const amount = srv.amount ?? b.amount ?? 0;
            return (
              <div key={b._id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-16 h-16 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                        <div className="w-full h-full flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-gray-500" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {srv.title || "Gói dịch vụ"}
                        </h3>

                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center flex-shrink-0">
                            {cam.avatar_url ? (
                              <img
                                src={cam.avatar_url}
                                alt={cam.full_name || "Cameraman"}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Camera className="w-5 h-5 text-[#FF9500]" />
                            )}
                          </div>

                          <div className="text-sm leading-5">
                            <div className="text-white">{cam.full_name || "—"}</div>
                            <div className="text-gray-400">{cam.phone_number || "—"}</div>
                            <div className="text-gray-400">{cam.email || "—"}</div>
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="text-gray-300">
                        <span className="text-gray-400">Ngày hẹn:</span>{" "}
                        {b.scheduled_date ? new Date(b.scheduled_date).toLocaleDateString("vi-VN") : "—"}
                      </div>
                      <div className="text-gray-300">
                        <span className="text-gray-400">Khung giờ:</span> {getTimeLabel(b.time_of_day)}
                      </div>
                      <div className="text-[#FF9500] font-bold">
                        {new Intl.NumberFormat("vi-VN").format(amount)} VND
                      </div>
                    </div>
                  </div>

                  <div className="text-right ml-4">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${statusBadgeClass(b.status)}`}>
                      {getBookingStatusLabel(b.status)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
          >
            Trước
          </button>
          <span className="text-gray-300">
            Trang {pagination.page} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === totalPages}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
}
