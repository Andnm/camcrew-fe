import React, { useState } from "react";
import {
  Plus,
  Edit2,
  Eye,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Users,
  DollarSign,
  BarChart,
  Copy,
  Share2,
} from "lucide-react";
import Header from "../components/layout/Header";
import toast from "react-hot-toast";

const ServiceManagementPage = () => {
  const [activeTab, setActiveTab] = useState("all");

  const services = [
    {
      id: 100,
      title: "Gói Cưới Cinematic 1 Ngày",
      description:
        "Quay phim cưới phong cách điện ảnh với đầy đủ thiết bị chuyên nghiệp, bao gồm highlight và full ceremony",
      amount: 12000000,
      status: "approved",
      views: 156,
      bookings: 12,
      conversionRate: 7.7,
      categories: ["cinematic", "highlight"],
      styles: ["wedding"],
      areas: ["Ho Chi Minh", "Binh Duong"],
      timeOfDay: ["morning", "afternoon"],
      created_at: "2025-09-05T05:00:00Z",
      updated_at: "2025-09-21T03:30:00Z",
      lastBooking: "2025-09-20T10:00:00Z",
      revenue: 144000000,
      averageRating: 4.8,
      totalReviews: 8,
      isPromoted: true,
    },
    {
      id: 103,
      title: "Quay Sự Kiện Doanh Nghiệp",
      description:
        "Dịch vụ quay phim sự kiện công ty, hội thảo, conference với chất lượng chuyên nghiệp",
      amount: 8000000,
      status: "pending",
      views: 23,
      bookings: 0,
      conversionRate: 0,
      categories: ["documentary", "bts"],
      styles: ["event"],
      areas: ["Ho Chi Minh", "Dong Nai"],
      timeOfDay: ["evening"],
      created_at: "2025-09-20T02:00:00Z",
      updated_at: "2025-09-20T02:00:00Z",
      lastBooking: null,
      revenue: 0,
      averageRating: 0,
      totalReviews: 0,
      isPromoted: false,
    },
    {
      id: 104,
      title: "Kỷ Yếu Học Sinh THPT",
      description:
        "Quay kỷ yếu học sinh với nhiều concept sáng tạo và hiện đại, phù hợp với xu hướng GenZ",
      amount: 5000000,
      status: "rejected",
      rejection_reason:
        "Video demo chưa đủ chất lượng, thiếu showcase kỹ thuật quay nhóm đông người",
      views: 5,
      bookings: 0,
      conversionRate: 0,
      categories: ["traditional", "highlight"],
      styles: ["yearbook"],
      areas: ["Ho Chi Minh"],
      timeOfDay: ["morning"],
      created_at: "2025-09-18T07:00:00Z",
      updated_at: "2025-09-19T09:00:00Z",
      lastBooking: null,
      revenue: 0,
      averageRating: 0,
      totalReviews: 0,
      isPromoted: false,
    },
    {
      id: 105,
      title: "TVC Quảng Cáo Ngắn",
      description:
        "Sản xuất TVC quảng cáo chuyên nghiệp cho doanh nghiệp, từ concept đến post-production",
      amount: 15000000,
      status: "disabled",
      views: 89,
      bookings: 3,
      conversionRate: 3.4,
      categories: ["cinematic"],
      styles: ["tvc"],
      areas: ["Ha Noi"],
      timeOfDay: ["afternoon", "evening"],
      created_at: "2025-08-10T02:00:00Z",
      updated_at: "2025-09-12T02:00:00Z",
      lastBooking: "2025-09-10T14:00:00Z",
      revenue: 45000000,
      averageRating: 4.3,
      totalReviews: 3,
      isPromoted: false,
      disabledReason: "Tạm dừng để cập nhật thiết bị",
    },
    {
      id: 106,
      title: "Chụp Ảnh Cưới Ngoại Cảnh",
      description:
        "Chụp ảnh cưới tại các địa điểm đẹp với phong cách tự nhiên, romantic và artistic",
      amount: 6000000,
      status: "approved",
      views: 78,
      bookings: 5,
      conversionRate: 6.4,
      categories: ["traditional", "artistic"],
      styles: ["wedding"],
      areas: ["Ho Chi Minh", "Vung Tau"],
      timeOfDay: ["morning", "afternoon"],
      created_at: "2025-08-25T03:00:00Z",
      updated_at: "2025-09-15T08:00:00Z",
      lastBooking: "2025-09-18T11:00:00Z",
      revenue: 30000000,
      averageRating: 4.6,
      totalReviews: 5,
      isPromoted: false,
    },
  ];

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { color: "bg-yellow-600", text: "Chờ duyệt", icon: Clock },
      approved: { color: "bg-green-600", text: "Đã duyệt", icon: CheckCircle },
      rejected: { color: "bg-red-600", text: "Từ chối", icon: XCircle },
      disabled: { color: "bg-gray-600", text: "Tạm khóa", icon: AlertCircle },
    };

    const statusInfo = statusMap[status] || {
      color: "bg-gray-600",
      text: "Không xác định",
      icon: Clock,
    };
    return (
      <div className="flex items-center space-x-2">
        <statusInfo.icon className="w-4 h-4" />
        <span
          className={`${statusInfo.color} text-white px-3 py-1 rounded-full text-sm font-medium`}
        >
          {statusInfo.text}
        </span>
      </div>
    );
  };

  const filteredServices = services.filter((service) => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return service.status === "approved";
    if (activeTab === "pending") return service.status === "pending";
    if (activeTab === "rejected") return service.status === "rejected";
    if (activeTab === "disabled") return service.status === "disabled";
    return true;
  });

  const stats = {
    total: services.length,
    approved: services.filter((s) => s.status === "approved").length,
    pending: services.filter((s) => s.status === "pending").length,
    rejected: services.filter((s) => s.status === "rejected").length,
    disabled: services.filter((s) => s.status === "disabled").length,
    totalViews: services.reduce((sum, s) => sum + s.views, 0),
    totalBookings: services.reduce((sum, s) => sum + s.bookings, 0),
    totalRevenue: services.reduce((sum, s) => sum + s.revenue, 0),
  };

  const averageConversion =
    services.filter((s) => s.views > 0).length > 0
      ? services
          .filter((s) => s.views > 0)
          .reduce((sum, s) => sum + s.conversionRate, 0) /
        services.filter((s) => s.views > 0).length
      : 0;

  const confirmToast = (message) =>
    new Promise((resolve) => {
      const t = toast.custom(
        (/* id */) => (
          <div className="max-w-sm w-full bg-gray-800 text-white rounded-lg shadow-lg p-4 border border-gray-700">
            <p className="mb-3">{message}</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  resolve(false);
                }}
                className="px-3 py-1 rounded bg-gray-600 hover:bg-gray-500"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  resolve(true);
                }}
                className="px-3 py-1 rounded bg-[#FF9500] hover:bg-orange-600"
              >
                Xác nhận
              </button>
            </div>
          </div>
        ),
        { duration: Infinity }
      );
    });

  const handleServiceAction = async (service, action) => {
    console.log(`Action: ${action} for service:`, service?.id || "new");

    switch (action) {
      case "create":
        toast("Chuyển đến trang tạo dịch vụ mới", { icon: "🆕" });
        break;

      case "edit":
        toast("Mở trang chỉnh sửa", { icon: "✏️" });
        break;

      case "view":
        toast("Mở trang chi tiết", { icon: "👁️" });
        break;

      case "disable": {
        const ok = await confirmToast(
          `Bạn có chắc muốn tạm khóa dịch vụ "${service.title}"?`
        );
        if (ok) {
          // TODO: gọi API disable
          toast.success("Đã tạm khóa dịch vụ.");
        } else {
          toast("Đã hủy thao tác.", { icon: "↩️" });
        }
        break;
      }

      case "enable": {
        const ok = await confirmToast(
          `Kích hoạt lại dịch vụ "${service.title}"?`
        );
        if (ok) {
          // TODO: gọi API enable
          toast.success("Đã kích hoạt dịch vụ.");
        } else {
          toast("Đã hủy thao tác.", { icon: "↩️" });
        }
        break;
      }

      case "delete": {
        const ok = await confirmToast(
          `Xóa dịch vụ "${service.title}"? Hành động này không thể hoàn tác.`
        );
        if (ok) {
          // TODO: gọi API delete
          toast.success("Đã xóa dịch vụ.");
        } else {
          toast("Đã hủy thao tác.", { icon: "↩️" });
        }
        break;
      }

      case "duplicate":
        toast.success(`Đã nhân bản "${service.title}".`);
        break;

      case "promote":
        toast("Mở cấu hình quảng cáo", { icon: "📣" });
        break;

      case "analytics":
        toast("Mở trang thống kê", { icon: "📊" });
        break;

      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="max-w-7xl mx-auto p-4">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white text-3xl font-bold">Quản lý Dịch vụ</h1>
              <p className="text-gray-400 mt-1">
                Quản lý và theo dõi hiệu suất các dịch vụ của bạn
              </p>
            </div>
            <button
              onClick={() => handleServiceAction(null, "create")}
              className="bg-[#FF9500] hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Tạo dịch vụ mới</span>
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Tổng dịch vụ</p>
                <p className="text-white text-3xl font-bold">{stats.total}</p>
                <p className="text-green-500 text-sm">
                  +{stats.approved} đã duyệt
                </p>
              </div>
              <div className="bg-blue-600 p-3 rounded-lg">
                <Eye className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Lượt xem</p>
                <p className="text-white text-3xl font-bold">
                  {stats.totalViews.toLocaleString()}
                </p>
                <p className="text-blue-500 text-sm">
                  {Math.round(stats.totalViews / stats.total)} TB/dịch vụ
                </p>
              </div>
              <div className="bg-purple-600 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Booking</p>
                <p className="text-white text-3xl font-bold">
                  {stats.totalBookings}
                </p>
                <p className="text-green-500 text-sm">
                  {averageConversion.toFixed(1)}% tỷ lệ chuyển đổi
                </p>
              </div>
              <div className="bg-green-600 p-3 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Doanh thu</p>
                <p className="text-white text-3xl font-bold">
                  {(stats.totalRevenue / 1000000).toFixed(0)}M
                </p>
                <p className="text-[#FF9500] text-sm">
                  {stats.totalBookings > 0
                    ? (
                        stats.totalRevenue /
                        stats.totalBookings /
                        1000000
                      ).toFixed(1)
                    : 0}
                  M TB/booking
                </p>
              </div>
              <div className="bg-orange-600 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Chờ duyệt</p>
                <p className="text-white text-3xl font-bold">{stats.pending}</p>
                <p className="text-yellow-500 text-sm">Cần xem xét</p>
              </div>
              <div className="bg-yellow-600 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg">
          <div className="p-6 border-b border-gray-700">
            <div className="flex space-x-1 bg-gray-700 rounded-lg p-1">
              {[
                { id: "all", label: "Tất cả", count: stats.total },
                {
                  id: "active",
                  label: "Đang hoạt động",
                  count: stats.approved,
                },
                { id: "pending", label: "Chờ duyệt", count: stats.pending },
                { id: "rejected", label: "Từ chối", count: stats.rejected },
                { id: "disabled", label: "Tạm khóa", count: stats.disabled },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-colors ${
                    activeTab === tab.id
                      ? "bg-[#FF9500] text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  <span className="text-sm font-medium">{tab.label}</span>
                  {tab.count > 0 && (
                    <span
                      className={`${
                        activeTab === tab.id
                          ? "bg-white text-[#FF9500]"
                          : "bg-[#FF9500] text-white"
                      } text-xs rounded-full px-2 py-1`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-gray-700 rounded-lg p-6 hover:bg-gray-650 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-white font-semibold text-lg">
                          {service.title}
                        </h3>
                        {service.isPromoted && (
                          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                            PROMOTED
                          </span>
                        )}
                      </div>
                      <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                        {service.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {service.categories.map((category, index) => (
                          <span
                            key={index}
                            className="bg-[#FF9500] text-white px-2 py-1 rounded text-xs"
                          >
                            {category}
                          </span>
                        ))}
                        {service.styles.map((style, index) => (
                          <span
                            key={index}
                            className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                          >
                            {style}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-300">
                        <div>
                          <span className="text-gray-400">Khu vực:</span>
                          <p>{service.areas.join(", ")}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Lượt xem:</span>
                          <p className="font-semibold">{service.views}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Booking:</span>
                          <p className="font-semibold text-green-400">
                            {service.bookings}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-400">
                            Tỷ lệ chuyển đổi:
                          </span>
                          <p className="font-semibold text-blue-400">
                            {service.conversionRate.toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="text-right ml-6">
                      <p className="text-[#FF9500] font-bold text-xl mb-2">
                        {new Intl.NumberFormat("vi-VN").format(service.amount)}{" "}
                        VND
                      </p>
                      {getStatusBadge(service.status)}
                      {service.revenue > 0 && (
                        <p className="text-green-400 text-sm mt-2 font-semibold">
                          Doanh thu: {(service.revenue / 1000000).toFixed(1)}M
                        </p>
                      )}
                    </div>
                  </div>

                  {service.status === "rejected" &&
                    service.rejection_reason && (
                      <div className="bg-red-900 border border-red-700 rounded-lg p-3 mb-4">
                        <p className="text-red-300 text-sm">
                          <strong>Lý do từ chối:</strong>{" "}
                          {service.rejection_reason}
                        </p>
                      </div>
                    )}

                  {service.status === "disabled" && service.disabledReason && (
                    <div className="bg-gray-600 border border-gray-500 rounded-lg p-3 mb-4">
                      <p className="text-gray-300 text-sm">
                        <strong>Lý do tạm khóa:</strong>{" "}
                        {service.disabledReason}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="text-gray-400 text-sm">
                      <span>
                        Tạo:{" "}
                        {new Date(service.created_at).toLocaleDateString(
                          "vi-VN"
                        )}
                      </span>
                      <span className="mx-2">•</span>
                      <span>
                        Cập nhật:{" "}
                        {new Date(service.updated_at).toLocaleDateString(
                          "vi-VN"
                        )}
                      </span>
                      {service.lastBooking && (
                        <>
                          <span className="mx-2">•</span>
                          <span>
                            Booking cuối:{" "}
                            {new Date(service.lastBooking).toLocaleDateString(
                              "vi-VN"
                            )}
                          </span>
                        </>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          handleServiceAction(service, "analytics")
                        }
                        className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm transition-colors flex items-center space-x-1"
                      >
                        <BarChart className="w-4 h-4" />
                        <span>Thống kê</span>
                      </button>

                      <button
                        onClick={() => handleServiceAction(service, "view")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors flex items-center space-x-1"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Xem</span>
                      </button>

                      {service.status !== "disabled" && (
                        <button
                          onClick={() => handleServiceAction(service, "edit")}
                          className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-2 rounded-lg text-sm transition-colors flex items-center space-x-1"
                        >
                          <Edit2 className="w-4 h-4" />
                          <span>Sửa</span>
                        </button>
                      )}

                      <button
                        onClick={() =>
                          handleServiceAction(service, "duplicate")
                        }
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-sm transition-colors flex items-center space-x-1"
                      >
                        <Copy className="w-4 h-4" />
                        <span>Nhân bản</span>
                      </button>

                      {service.status === "approved" && !service.isPromoted && (
                        <button
                          onClick={() =>
                            handleServiceAction(service, "promote")
                          }
                          className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                        >
                          Quảng cáo
                        </button>
                      )}

                      {service.status === "approved" && (
                        <button
                          onClick={() =>
                            handleServiceAction(service, "disable")
                          }
                          className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                        >
                          Tạm khóa
                        </button>
                      )}

                      {service.status === "disabled" && (
                        <button
                          onClick={() => handleServiceAction(service, "enable")}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                        >
                          Kích hoạt
                        </button>
                      )}

                      {service.status === "rejected" && (
                        <button
                          onClick={() => handleServiceAction(service, "edit")}
                          className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                        >
                          Chỉnh sửa & Gửi lại
                        </button>
                      )}

                      <button
                        onClick={() => handleServiceAction(service, "delete")}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition-colors flex items-center space-x-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Xóa</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredServices.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Plus className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-gray-400 text-lg font-medium mb-2">
                    Chưa có dịch vụ nào
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {activeTab === "all" && "Bạn chưa tạo dịch vụ nào"}
                    {activeTab === "active" && "Chưa có dịch vụ nào được duyệt"}
                    {activeTab === "pending" &&
                      "Không có dịch vụ nào đang chờ duyệt"}
                    {activeTab === "rejected" &&
                      "Không có dịch vụ nào bị từ chối"}
                    {activeTab === "disabled" &&
                      "Không có dịch vụ nào bị tạm khóa"}
                  </p>
                  <button
                    onClick={() => handleServiceAction(null, "create")}
                    className="bg-[#FF9500] hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Tạo dịch vụ đầu tiên
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceManagementPage;
