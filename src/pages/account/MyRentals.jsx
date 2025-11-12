import React, { useEffect, useMemo, useState, useRef } from "react";
import { Calendar, ChevronLeft, ChevronRight, CheckCircle, CalendarCheck } from "lucide-react";
import { Popconfirm, message } from "antd";
import { listBookings, completedBooking } from "../../api/bookings";
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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef(null);

  const weekStart = useMemo(() => startOfWeekSunday(anchorDate), [anchorDate]);
  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart]
  );

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await listBookings({
        page: 1,
        limit: 100,
      });

      console.log("res: ", res)
      setBookings(res?.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
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

  const handleDatePickerSelect = (date) => {
    setSelectedDate(date);
    setAnchorDate(date);
    setShowDatePicker(false);
  };

  const handleCompleteBooking = async (bookingId) => {
    try {
      await completedBooking(bookingId);
      message.success("Đã đánh dấu hoàn thành booking!");
      setBookings((prev) =>
        prev.map((bk) =>
          bk._id === bookingId ? { ...bk, status: BOOKING_STATUS_OPTIONS.COMPLETED } : bk
        )
      );
    } catch (error) {
      message.error("Không thể hoàn thành booking. Vui lòng thử lại!");
      console.error("Complete booking error:", error);
    }
  };

  const goToNearestBooking = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingBookings = bookings
      .filter((bk) => {
        if (!bk?.scheduled_date) return false;
        const bkDate = new Date(bk.scheduled_date);
        bkDate.setHours(0, 0, 0, 0);
        return bkDate >= today;
      })
      .sort((a, b) => new Date(a.scheduled_date) - new Date(b.scheduled_date));

    if (upcomingBookings.length > 0) {
      const nearestDate = new Date(upcomingBookings[0].scheduled_date);
      setSelectedDate(nearestDate);
      setAnchorDate(nearestDate);
      message.success("Đã chuyển đến booking gần nhất!");
    } else {
      message.info("Không có booking nào sắp tới!");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    };

    if (showDatePicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDatePicker]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToNearestBooking}
          className="flex items-center gap-2 px-4 py-2 bg-[#FF9500] hover:bg-[#FF9500]/80 text-white rounded-lg font-semibold transition-colors"
        >
          <CalendarCheck className="w-4 h-4" />
          Booking gần nhất
        </button>
      </div>

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

        <div className="flex items-center gap-2">
          <div className="relative" ref={datePickerRef}>
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="p-2 rounded-full bg-[#FF9500] hover:bg-[#FF9500]/80 transition-colors"
              title="Chọn ngày"
            >
              <Calendar className="w-5 h-5 text-white" />
            </button>

            {showDatePicker && (
              <div className="absolute right-0 mt-2 bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-4 z-50 min-w-[280px]">
                <input
                  type="date"
                  value={selectedDate.toISOString().split('T')[0]}
                  onChange={(e) => {
                    const newDate = new Date(e.target.value);
                    if (!isNaN(newDate.getTime())) {
                      handleDatePickerSelect(newDate);
                    }
                  }}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#FF9500] focus:ring-1 focus:ring-[#FF9500]"
                />
              </div>
            )}
          </div>

          <button onClick={() => handleWeekShift(1)} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
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
            const canComplete =
              bk?.status === BOOKING_STATUS_OPTIONS.REQUESTED ||
              bk?.status === BOOKING_STATUS_OPTIONS.PAYING;

            return (
              <div key={bk._id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors mb-4">
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

                    <div className="flex items-center justify-between mt-3">
                      <div className="text-[#FF9500] text-xl font-bold">
                        Mức giá: {new Intl.NumberFormat("vi-VN").format(price)} VND
                      </div>

                      {canComplete && (
                        <Popconfirm
                          title="Xác nhận hoàn thành"
                          description="Bạn có chắc chắn muốn đánh dấu booking này là đã hoàn thành?"
                          onConfirm={() => handleCompleteBooking(bk._id)}
                          okText="Xác nhận"
                          cancelText="Hủy"
                          okButtonProps={{ className: "bg-[#FF9500] hover:bg-[#FF9500]/80" }}
                        >
                          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 cursor-pointer hover:bg-green-700 text-white rounded-lg font-semibold transition-colors">
                            <CheckCircle className="w-4 h-4" />
                            Hoàn thành
                          </button>
                        </Popconfirm>
                      )}

                      {bk?.status === BOOKING_STATUS_OPTIONS.COMPLETED && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg">
                          <CheckCircle className="w-4 h-4" />
                          Đã hoàn thành
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
      )}
    </div>
  );
}
