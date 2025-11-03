import { X, Calendar } from "lucide-react";
import React, { useMemo, useState } from "react";
import { SERVICE_TIME_OF_DAYS } from "../../utils/constants";
import { createNewBooking } from "../../api/bookings";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { createConversation } from "../../api/conversations";

const CreateBookingModal = ({ isOpen, onClose, service }) => {
  console.log("service: ", service);
  const [scheduledDate, setScheduledDate] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { user } = useAuth();

  console.log("user: ", user);

  const timeOptions = useMemo(() => {
    const allowed = service?.time_of_day || [];
    return SERVICE_TIME_OF_DAYS.filter((t) => allowed.includes(t.value));
  }, [service]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!scheduledDate || !timeOfDay) return;

    const payload = {
      cameraman_id: service?.cameraman_id?._id,
      service_id: service?._id,
      scheduled_date: scheduledDate,
      time_of_day: timeOfDay,
    };

    try {
      setSubmitting(true);

      const customerInfo = {
        userId: user?._id,
        fullName: user?.full_name,
        email: user?.email,
        avatarUrl: user?.avatar_url || "",
      };

      const cameramanInfo = {
        userId: service?.cameraman_id?._id,
        fullName: service?.cameraman_id?.full_name,
        email: service?.cameraman_id?.email,
        avatarUrl: service?.cameraman_id?.avatar_url || "",
      };

      await createConversation(customerInfo, cameramanInfo);

      const res = await createNewBooking(payload);
      if (res?.paymentUrl) {
        window.location.href = res.paymentUrl;
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Đặt lịch thất bại, vui lòng thủ lại!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
      <div className="bg-gray-800 w-full max-w-md rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-700">
          <h3 className="text-white text-lg font-semibold">Đặt lịch với thợ</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          <div>
            <label className="block text-[#FF9500] font-medium mb-2">
              Chọn ngày
            </label>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[#FF9500] font-medium mb-2">
              Khung giờ
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timeOptions.map((t) => (
                <label
                  key={t.value}
                  className={`cursor-pointer text-sm px-3 py-2 rounded-lg border ${
                    timeOfDay === t.value
                      ? "bg-[#FF9500] text-black border-[#FF9500]"
                      : "bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="time_of_day"
                    value={t.value}
                    checked={timeOfDay === t.value}
                    onChange={() => setTimeOfDay(t.value)}
                    className="hidden"
                  />
                  {t.label}
                </label>
              ))}
              {timeOptions.length === 0 && (
                <span className="text-gray-400 col-span-3 text-sm">
                  Thợ chưa mở khung giờ nào
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2.5 rounded-lg"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={submitting || !scheduledDate || !timeOfDay}
              className="flex-1 bg-[#FF9500] cursor-pointer hover:bg-orange-600 text-black font-semibold py-2.5 rounded-lg disabled:opacity-60"
            >
              {submitting ? "Đang tạo..." : "Xác nhận đặt lịch"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBookingModal;
