import React, { useEffect, useMemo, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { listBookings } from "../../api/bookings";
import { getDetailServiceById } from "../../api/services";
import { BOOKING_STATUS_OPTIONS, SERVICE_AREAS } from "../../utils/constants";
import { getCategoryLabel, getStyleLabel, getTimeOfDay } from "../../utils/helper";

function startOfWeekSunday(d) {
  const dt = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const day = dt.getDay();
  dt.setDate(dt.getDate() - day);
  dt.setHours(0, 0, 0, 0);
  return dt;
}
function addDays(d, n) {
  const dt = new Date(d);
  dt.setDate(dt.getDate() + n);
  return dt;
}
function sameYMD(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
const dowLabels = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
const areaLabel = (v) => SERVICE_AREAS.find((x) => x.value === v)?.label || v;

export default function MyRentals() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [anchorDate, setAnchorDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [serviceMap, setServiceMap] = useState({});
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
  const totalPages = Math.ceil(pagination.total / pagination.limit);

  const weekStart = useMemo(() => startOfWeekSunday(anchorDate), [anchorDate]);
  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart]
  );

  const fetchBookings = async (page = pagination.page) => {
    setLoading(true);
    try {
      const res = await listBookings({
        page,
        limit: pagination.limit,
        status: BOOKING_STATUS_OPTIONS.REQUESTED,
      });
      setBookings(res?.data || []);
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
    fetchBookings(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const ids = Array.from(
      new Set(
        (bookings || [])
          .map((b) => b?.service_id?._id || b?.service_id)
          .filter(Boolean)
      )
    );
    if (!ids.length) return;
    (async () => {
      const entries = await Promise.all(
        ids.map(async (sid) => {
          try {
            const detail = await getDetailServiceById(sid);
            return [sid, detail];
          } catch {
            return [sid, null];
          }
        })
      );
      const map = {};
      entries.forEach(([k, v]) => v && (map[k] = v));
      setServiceMap(map);
    })();
  }, [bookings]);

  const filteredByDay = useMemo(
    () =>
      (bookings || []).filter((b) =>
        b?.scheduled_date ? sameYMD(new Date(b.scheduled_date), selectedDate) : false
      ),
    [bookings, selectedDate]
  );

  const handleWeekShift = (deltaWeeks) => {
    const next = addDays(weekStart, deltaWeeks * 7);
    setAnchorDate(next);
    if (selectedDate < next || selectedDate >= addDays(next, 7)) setSelectedDate(next);
  };

  const handlePageChange = async (next) => {
    if (next < 1 || next > totalPages) return;
    await fetchBookings(next);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => handleWeekShift(-1)} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        <div className="flex items-center gap-4">
          {weekDays.map((d, idx) => {
            const isActive = sameYMD(d, selectedDate);
            return (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-xs text-gray-400 mb-2">{dowLabels[idx]}</span>
                <button
                  onClick={() => setSelectedDate(d)}
                  className={`w-10 h-10 rounded-full font-semibold ${
                    isActive ? "bg-[#FF9500] text-white" : "bg-white text-black"
                  }`}
                >
                  {d.getDate()}
                </button>
              </div>
            );
          })}
        </div>

        <button onClick={() => handleWeekShift(1)} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-28 bg-gray-800/60 rounded animate-pulse" />
          ))}
        </div>
      ) : filteredByDay.length === 0 ? (
        <div className="text-center text-gray-400 py-10">Không có lịch hẹn trong ngày này</div>
      ) : (
        filteredByDay
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
          .map((bk) => {
            const serviceId = bk?.service_id?._id || bk?.service_id;
            const service = serviceMap[serviceId] || bk?.service_id || {};
            const price = bk?.amount ?? service?.amount ?? 0;

            return (
              <div key={bk._id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-16 h-16 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                        {service?.video_demo_urls?.[0] ? (
                          <video src={service.video_demo_urls[0]} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-gray-500" />
                          </div>
                        )}
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">{service?.title || "Gói dịch vụ"}</h3>
                        <p className="text-[#FF9500] text-sm">
                          Phong cách:{" "}
                          {service?.categories?.length ? service.categories.map(getCategoryLabel).join(" / ") : "N/A"}
                        </p>
                        <p className="text-[#FF9500] text-sm">
                          Dịch vụ:{" "}
                          {service?.styles?.length ? service.styles.map(getStyleLabel).join(" / ") : "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="text-gray-300">
                        <span className="text-gray-400">Ngày hẹn:</span>{" "}
                        {bk.scheduled_date ? new Date(bk.scheduled_date).toLocaleDateString("vi-VN") : "—"}
                      </div>
                      <div className="text-gray-300">
                        <span className="text-gray-400">Khung giờ:</span> {getTimeOfDay(bk.time_of_day)}
                      </div>
                      <div className="text-gray-300">
                        <span className="text-gray-400">Địa điểm:</span>{" "}
                        {service?.areas?.length ? service.areas.map(areaLabel).join(", ") : "N/A"}
                      </div>
                    </div>

                    <div className="mt-3 text-[#FF9500] text-xl font-bold">
                      Mức giá: {new Intl.NumberFormat("vi-VN").format(price)} VND
                    </div>
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
