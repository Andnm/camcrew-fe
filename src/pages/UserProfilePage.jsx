import React, { useEffect, useState } from "react";
import {
  User,
  Calendar,
  Bell,
  CreditCard,
  FileText,
  LogOut,
  Edit2,
  Camera,
  Save,
  X,
  Phone,
  Mail,
  MapPin,
  Cake,
  MessageCircle,
  Clock,
  Star,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getMembershipLabel } from "../utils/helper";

const UserProfilePage = () => {
  const { user, logout } = useAuth();
  console.log("user: ", user);
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    birthDate: "",
    bio: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.full_name || "",
        email: user.email || "",
        phone: user.phone_number || "",
        address: user.address || "",
        birthDate: user.birth_date || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const sidebarItems = [
    { id: "personal", icon: User, label: "Thông tin cá nhân" },
    { id: "bookings", icon: Calendar, label: "Lịch sử hoạt động" },
    { id: "messages", icon: FileText, label: "Tin nhắn" },
    { id: "notifications", icon: Bell, label: "Thông báo" },
    { id: "subscription", icon: CreditCard, label: "Lịch thuê của tôi" },
  ];

  const bookingHistory = [
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

  const messages = [
    {
      id: 1,
      from: "Chủ nhà Villa Sunrise",
      message:
        "Cảm ơn bạn đã lựa chọn villa của chúng tôi. Chúc bạn có kỳ nghỉ vui vẻ!",
      time: "2 giờ trước",
      unread: true,
    },
    {
      id: 2,
      from: "Hỗ trợ khách hàng",
      message: "Yêu cầu hủy booking của bạn đã được xử lý thành công.",
      time: "1 ngày trước",
      unread: false,
    },
    {
      id: 3,
      from: "Chủ nhà Ocean View",
      message: "Xin lỗi vì phản hồi muộn. Check-in từ 2PM nhé!",
      time: "3 ngày trước",
      unread: false,
    },
  ];

  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Thanh toán thành công",
      message: "Đã thanh toán thành công cho booking Villa Sunrise Đà Lạt",
      time: "30 phút trước",
      read: false,
    },
    {
      id: 2,
      type: "info",
      title: "Nhắc nhở check-in",
      message: "Còn 2 ngày nữa đến ngày check-in tại Nhà phố cổ Hội An",
      time: "2 giờ trước",
      read: false,
    },
    {
      id: 3,
      type: "warning",
      title: "Yêu cầu đánh giá",
      message: "Hãy để lại đánh giá cho kỳ nghỉ tại Ocean View Nha Trang",
      time: "1 ngày trước",
      read: true,
    },
  ];

  const rentals = [
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save data logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data
  };

  const renderPersonalInfo = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Thông tin cá nhân</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            <span>Chỉnh sửa</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Lưu lại</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Hủy bỏ</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Họ và Tên*
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 disabled:opacity-60"
            placeholder="Nhập họ và tên"
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Số điện thoại*
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 disabled:opacity-60"
            placeholder="Nhập số điện thoại"
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Email*
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 disabled:opacity-60"
            placeholder="Nhập email"
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Ngày sinh*
          </label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 disabled:opacity-60"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Địa chỉ*
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 disabled:opacity-60"
            placeholder="Nhập địa chỉ"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Mô tả bản thân (bio)
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            disabled={!isEditing}
            rows={4}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 disabled:opacity-60 resize-none"
            placeholder="Viết vài dòng về bản thân..."
          />
        </div>
      </div>

      {isEditing && (
        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
          >
            Lưu lại
          </button>
        </div>
      )}
    </div>
  );

  const renderBookingHistory = () => (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Lịch sử hoạt động</h1>
      <div className="space-y-4">
        {bookingHistory.map((booking) => (
          <div key={booking.id} className="bg-gray-700 rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {booking.title}
                </h3>
                <div className="flex items-center space-x-4 text-gray-300 text-sm">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold">{booking.price}</span>
                  </div>
                </div>
                {booking.rating && (
                  <div className="flex items-center space-x-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < booking.rating
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
                    booking.status === "Hoàn thành"
                      ? "bg-green-600 text-white"
                      : booking.status === "Sắp tới"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-600 text-white"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMessages = () => (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Tin nhắn</h1>
      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`bg-gray-700 rounded-lg p-4 ${
              msg.unread ? "border-l-4 border-orange-500" : ""
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-white">{msg.from}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-sm">{msg.time}</span>
                {msg.unread && (
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                )}
              </div>
            </div>
            <p className="text-gray-300">{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Thông báo</h1>
      <div className="space-y-4">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`bg-gray-700 rounded-lg p-4 ${
              !notif.read ? "border-l-4 border-orange-500" : ""
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {notif.type === "success" && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {notif.type === "info" && (
                  <Bell className="w-5 h-5 text-blue-500" />
                )}
                {notif.type === "warning" && (
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-white">{notif.title}</h3>
                  <span className="text-gray-400 text-sm">{notif.time}</span>
                </div>
                <p className="text-gray-300">{notif.message}</p>
              </div>
              {!notif.read && (
                <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-2"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRentals = () => (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Lịch thuê của tôi</h1>
      <div className="grid gap-6">
        {rentals.map((rental) => (
          <div key={rental.id} className="bg-gray-700 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {rental.title}
                </h3>
                <p className="text-gray-300 flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{rental.location}</span>
                </p>
              </div>
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                {rental.status}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Lượt đặt</p>
                <p className="text-white font-semibold text-lg">
                  {rental.bookings}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">Doanh thu</p>
                <p className="text-white font-semibold text-lg">
                  {rental.revenue}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">Đánh giá</p>
                <div className="flex items-center justify-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white font-semibold">
                    {rental.rating}
                  </span>
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

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return renderPersonalInfo();
      case "bookings":
        return renderBookingHistory();
      case "messages":
        return renderMessages();
      case "notifications":
        return renderNotifications();
      case "subscription":
        return renderRentals();
      default:
        return renderPersonalInfo();
    }
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-80">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="text-center mb-6">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="w-24 h-24 bg-gray-600 rounded-full overflow-hidden flex items-center justify-center">
                    {user?.avatar_url ? (
                      <img
                        src={user.avatar_url}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-gray-300" />
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-orange-500 rounded-full p-2 hover:bg-orange-600 transition-colors">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>
                <h2 className="text-white text-xl font-bold">
                  {formData.fullName || user?.full_name || "Người dùng"}
                </h2>
                <p className="text-gray-400">
                  {user?.role_name === "cameraman" ? "Thợ quay phim" : "Khách"}
                </p>
                <div className="mt-2">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                    {getMembershipLabel(user?.membership_subscription)}
                  </span>
                </div>
              </div>

              <nav className="space-y-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? "bg-orange-500 text-white"
                        : "text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>

              <button
                onClick={() => {
                  logout();
                }}
                className="w-full mt-6 flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Đăng xuất</span>
              </button>
            </div>
          </aside>

          <main className="flex-1">
            <div className="bg-gray-800 rounded-lg p-8">{renderContent()}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
