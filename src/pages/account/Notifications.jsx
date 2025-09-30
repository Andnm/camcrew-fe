import React, { useEffect, useMemo, useState } from "react";
import { CheckCircle, Bell, AlertCircle, Check, Star } from "lucide-react";
import { listNotifications, markAllRead, markReadOne } from "../../api/notifications";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationsContext";
import { useNavigate } from "react-router-dom";

const NOTIFICATION_TYPES = {
  booking_requested: "Yêu cầu đặt dịch vụ mới",
  review_new: "Đánh giá mới",
  service_confirm: "Xác nhận dịch vụ",
  service_approved: "Dịch vụ đã được duyệt",
  service_rejected: "Dịch vụ bị từ chối",
  subscription_activated: "Gói thành viên đã kích hoạt",
  subscription_warning: "Cảnh báo gói thành viên",
  subscription_expired: "Gói thành viên đã hết hạn",
};

const typeRoute = {
  booking_requested: "/bookings",
  review_new: "/manage-account/reviews",
  service_confirm: "/services",
  service_approved: "/manage-account/services",
  service_rejected: "/manage-account/services",
  subscription_activated: "/manage-account/subscription",
  subscription_warning: "/manage-account/subscription",
  subscription_expired: "/manage-account/subscription",
};

export default function Notifications() {
  const { user } = useAuth();
  const { unreadCount, setUnreadCount, refreshUnread } = useNotifications();
  const navigate = useNavigate();

  const [tab, setTab] = useState("all");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ pageIndex: 1, pageSize: 10, totalPages: 0, totalResults: 0 });

  const isUnreadTab = tab === "unread";

  const fetchList = async (page = 1, pageSize = pagination.pageSize) => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await listNotifications({
        page,
        limit: pageSize,
        is_read: isUnreadTab ? false : undefined,
      });
      const sorted = (res?.data || []).slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setItems(sorted);
      console.log("sorted: ", sorted)
      setPagination({
        pageIndex: res?.pagination?.pageIndex || page,
        pageSize: res?.pagination?.pageSize || pageSize,
        totalPages: res?.pagination?.totalPages || 0,
        totalResults: res?.pagination?.totalResults || 0,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList(1, pagination.pageSize);
  }, [isUnreadTab]);

  useEffect(() => {
    const handler = (e) => {
      const notif = e.detail;
      setItems((prev) => {
        const next = [...prev, notif].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return next;
      });
      refreshUnread();
    };
    window.addEventListener("app:new-notification", handler);
    return () => window.removeEventListener("app:new-notification", handler);
  }, [refreshUnread]);

  const onChangePage = (nextPage) => {
    if (nextPage < 1 || nextPage > pagination.totalPages) return;
    fetchList(nextPage, pagination.pageSize);
  };

  const handleOpen = async (n) => {
    if (!n.is_read) {
      try {
        await markReadOne(n._id, { is_read: true });
        setItems((prev) => prev.map((x) => (x._id === n._id ? { ...x, is_read: true } : x)));
        setUnreadCount((c) => Math.max(0, c - 1));
      } catch (e) {
        console.log(e);
      }
    }
    const to = typeRoute[n.type] || "/manage-account/notifications";
    navigate(to);
  };

  const handleMarkAll = async () => {
    try {
      await markAllRead();
      setItems((prev) => prev.map((x) => ({ ...x, is_read: true })));
      setUnreadCount(0);
    } catch (e) {
      console.log(e);
    }
  };

  const icon = (t) => {
    if (t?.startsWith("subscription_")) return <Bell className="w-5 h-5 text-[#FF9500]" />;
    if (t === "service_rejected") return <AlertCircle className="w-5 h-5 text-red-500" />;
    if (t === "service_approved" || t === "service_confirm") return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (t === "review_new") return <Star className="w-5 h-5 text-yellow-400" />;
    if (t === "booking_requested") return <Bell className="w-5 h-5 text-blue-500" />;
    return <Bell className="w-5 h-5 text-gray-400" />;
  };

  const formatTime = (iso) => {
    const date = new Date(iso);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Vừa xong";
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    if (days < 7) return `${days} ngày trước`;
    return date.toLocaleDateString("vi-VN");
  };

  const getNotificationTitle = (type) => {
    return NOTIFICATION_TYPES[type] || type?.replaceAll("_", " ");
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Thông báo</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTab("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              !isUnreadTab ? "bg-[#FF9500] text-black" : "bg-gray-700 text-gray-200 hover:bg-gray-600"
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setTab("unread")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors relative ${
              isUnreadTab ? "bg-[#FF9500] text-black" : "bg-gray-700 text-gray-200 hover:bg-gray-600"
            }`}
          >
            Chưa đọc
            {unreadCount > 0 && (
              <span className="ml-2 inline-flex items-center justify-center bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={handleMarkAll}
            className="ml-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-700 text-gray-200 hover:bg-gray-600 inline-flex items-center transition-colors"
          >
            <Check className="w-4 h-4 mr-2" />
            Đánh dấu tất cả đã đọc
          </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-800 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12">
          <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Chưa có thông báo nào</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((n) => (
            <button
              key={n._id}
              onClick={() => handleOpen(n)}
              className={`w-full text-left rounded-lg p-4 transition-all duration-200 ${
                !n.is_read
                  ? "bg-gray-800 border-l-4 border-[#FF9500] hover:bg-gray-750 shadow-lg"
                  : "bg-gray-800/50 border-l-4 border-transparent hover:bg-gray-800/70"
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">{icon(n.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <h3
                      className={`font-semibold text-base ${
                        !n.is_read ? "text-white" : "text-gray-400"
                      }`}
                    >
                      {getNotificationTitle(n.type)}
                    </h3>
                    <span className="text-gray-500 text-xs whitespace-nowrap ml-3">
                      {formatTime(n.createdAt)}
                    </span>
                  </div>
                  <p
                    className={`text-sm leading-relaxed ${
                      !n.is_read ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {n.content}
                  </p>
                </div>
                {!n.is_read && (
                  <div className="flex-shrink-0 mt-2">
                    <div className="w-2.5 h-2.5 bg-[#FF9500] rounded-full animate-pulse" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            onClick={() => onChangePage(pagination.pageIndex - 1)}
            disabled={pagination.pageIndex === 1}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Trước
          </button>
          <span className="text-gray-300 text-sm font-medium">
            Trang {pagination.pageIndex} / {pagination.totalPages}
          </span>
          <button
            onClick={() => onChangePage(pagination.pageIndex + 1)}
            disabled={pagination.pageIndex === pagination.totalPages}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
}