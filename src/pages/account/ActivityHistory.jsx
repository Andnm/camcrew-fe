import React, { useState, useEffect } from "react";
import { Calendar, Star, MapPin, Eye, Plus, X, Upload } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { ROLE_OPTIONS, SERVICE_CATEGORIES, SERVICE_AREAS, SERVICE_STYLES, SERVICE_TIME_OF_DAYS } from "../../utils/constants";
import { listServices } from "../../api/services";
import { listReviews } from "../../api/reviews";
import CreateServiceModal from "../../components/modals/CreateServiceModal";
import toast from "react-hot-toast";
import { getCategoryLabel, getStyleLabel } from "../../utils/helper";

const CAMERAMAN_TABS = {
  SERVICES: "services",
  REVIEWS: "reviews",
};

const CUSTOMER_TABS = {
  BOOKINGS: "bookings",
  REVIEWS: "reviews",
  STATUS: "status",
};


export default function ActivityHistory() {
  const { user } = useAuth();
  const isCameraman = user?.role_name === ROLE_OPTIONS.CAMERAMAN;

  const [activeTab, setActiveTab] = useState(
    isCameraman ? CAMERAMAN_TABS.SERVICES : CUSTOMER_TABS.BOOKINGS
  );
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  useEffect(() => {
    if (isCameraman && activeTab === CAMERAMAN_TABS.SERVICES) {
      fetchServices();
    } else if (isCameraman && activeTab === CAMERAMAN_TABS.REVIEWS) {
      fetchReviews();
    }
  }, [activeTab, pagination.page, isCameraman]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await listServices({
        page: pagination.page,
        limit: pagination.limit,
      });
      console.log("response: ", response.data)
      setServices(response.data || []);
      setPagination((prev) => ({
        ...prev,
        total: response.total || 0,
      }));
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await listReviews({
        page: pagination.page,
        limit: pagination.limit,
      });
      setReviews(response.data || []);
      setPagination((prev) => ({
        ...prev,
        total: response.total || 0,
      }));
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLabel = (value, options) => {
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  const handleCreateSuccess = () => {
    toast.success("Đăng dịch vụ thành công!")
    setIsModalOpen(false);
    fetchServices();
  };

  const renderCameramanTabs = () => (
    <div className="flex items-center border-b border-gray-700 mb-6 justify-around">
      <div className="flex">
        <button
          onClick={() => setActiveTab(CAMERAMAN_TABS.SERVICES)}
          className={`px-6 py-3 font-semibold transition-colors ${activeTab === CAMERAMAN_TABS.SERVICES
            ? "text-[#FF9500] border-b-2 border-[#FF9500]"
            : "text-gray-400 hover:text-gray-300"
            }`}
        >
          Danh sách các dịch vụ đã đăng
        </button>
        <button
          onClick={() => setActiveTab(CAMERAMAN_TABS.REVIEWS)}
          className={`px-6 py-3 font-semibold transition-colors ${activeTab === CAMERAMAN_TABS.REVIEWS
            ? "text-[#FF9500] border-b-2 border-[#FF9500]"
            : "text-gray-400 hover:text-gray-300"
            }`}
        >
          Đánh giá đã nhận
        </button>
      </div>

    </div>
  );

  const renderCustomerTabs = () => (
    <div className="flex border-b border-gray-700 mb-6 justify-around">
      <button
        onClick={() => setActiveTab(CUSTOMER_TABS.BOOKINGS)}
        className={`px-6 py-3 font-semibold transition-colors ${activeTab === CUSTOMER_TABS.BOOKINGS
          ? "text-[#FF9500] border-b-2 border-[#FF9500]"
          : "text-gray-400 hover:text-gray-300"
          }`}
      >
        Danh sách các dịch vụ đã thuê
      </button>
      <button
        onClick={() => setActiveTab(CUSTOMER_TABS.REVIEWS)}
        className={`px-6 py-3 font-semibold transition-colors ${activeTab === CUSTOMER_TABS.REVIEWS
          ? "text-[#FF9500] border-b-2 border-[#FF9500]"
          : "text-gray-400 hover:text-gray-300"
          }`}
      >
        Đánh giá đã viết
      </button>
      <button
        onClick={() => setActiveTab(CUSTOMER_TABS.STATUS)}
        className={`px-6 py-3 font-semibold transition-colors ${activeTab === CUSTOMER_TABS.STATUS
          ? "text-[#FF9500] border-b-2 border-[#FF9500]"
          : "text-gray-400 hover:text-gray-300"
          }`}
      >
        Trạng thái các dịch vụ
      </button>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-4 relative">
      {loading ? (
        <div className="text-center text-gray-400 py-8">Đang tải...</div>
      ) : services.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          Chưa có dịch vụ nào được đăng
        </div>
      ) : (
        services.map((service) => (
          <div
            key={service._id}
            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-16 h-16 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                    {service?.video_demo_urls?.[0] ? (
                      <video
                        src={service.video_demo_urls[0]}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-gray-500" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {service.title}
                    </h3>
                    <p className="text-[#FF9500] text-sm">
                      Phong cách:{" "}
                      {service.categories && service.categories.length > 0
                        ? service.categories.map((c) => getCategoryLabel(c)).join(" / ")
                        : "N/A"}
                    </p>
                    <p className="text-[#FF9500] text-sm">
                      Dịch vụ:{" "}
                      {service.styles && service.styles.length > 0
                        ? service.styles.map((s) => getStyleLabel(s)).join(" / ")
                        : "N/A"}
                    </p>

                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-gray-300">
                    <span className="text-gray-400">Thời lượng dự kiến:</span>{" "}
                    {service.time_of_day?.length || 0} buổi (3–4 tiếng)
                  </div>
                  <div className="text-gray-300">
                    <span className="text-gray-400">Địa điểm:</span>{" "}
                    {service.areas?.map((area) => getLabel(area, SERVICE_AREAS)).join(", ") || "N/A"}
                  </div>
                </div>

                <div className="mt-3 text-[#FF9500] text-xl font-bold">
                  Mức giá: {new Intl.NumberFormat("vi-VN").format(service.amount)} VND
                </div>
              </div>

              <div className="text-right ml-4">
                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-medium ${service.status === "active"
                    ? "bg-green-600 text-white"
                    : service.status === "pending"
                      ? "bg-yellow-600 text-white"
                      : "bg-red-600 text-white"
                    }`}
                >
                  {service.status === "active"
                    ? "Đang hoạt động"
                    : service.status === "pending"
                      ? "Chờ duyệt"
                      : "Bị từ chối"}
                </span>
              </div>
            </div>
          </div>
        ))
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

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-[#FF9500] cursor-pointer absolute right-0 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
      >
        <Plus className="w-5 h-5" />
        <span>Đăng tin</span>
      </button>
    </div>
  );

  const renderReviews = () => (
    <div className="space-y-4">
      {loading ? (
        <div className="text-center text-gray-400 py-8">Đang tải...</div>
      ) : reviews.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          Chưa có đánh giá nào
        </div>
      ) : (
        reviews.map((review) => (
          <div
            key={review._id}
            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-700 rounded-full overflow-hidden flex-shrink-0">
                {review.customer_id?.avatar_url ? (
                  <img
                    src={review.customer_id.avatar_url}
                    alt={review.customer_id.full_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-400">
                      {review.customer_id?.full_name?.charAt(0) || "?"}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-semibold">
                    {review.customer_id?.full_name || "Khách hàng"}
                  </h4>
                  <span className="text-gray-400 text-sm">
                    {new Date(review.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                </div>

                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-400"
                        }`}
                    />
                  ))}
                  <span className="text-gray-300 text-sm ml-2">
                    {review.rating}/5
                  </span>
                </div>

                <p className="text-gray-300 text-sm">{review.comment}</p>
              </div>
            </div>
          </div>
        ))
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

  const renderCustomerContent = () => (
    <div className="text-center text-gray-400 py-8">
      Chức năng đang được phát triển
    </div>
  );

  return (
    <div className="">
      <h1 className="text-2xl font-bold text-white mb-6">
        Lịch sử hoạt động
      </h1>

      {isCameraman ? renderCameramanTabs() : renderCustomerTabs()}

      {isCameraman ? (
        activeTab === CAMERAMAN_TABS.SERVICES ? (
          renderServices()
        ) : (
          renderReviews()
        )
      ) : (
        renderCustomerContent()
      )}

      <CreateServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
}