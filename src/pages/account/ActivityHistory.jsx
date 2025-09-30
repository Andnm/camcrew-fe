import React, { useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { ROLE_OPTIONS } from "../../utils/constants";
import CreateServiceModal from "../../components/modals/CreateServiceModal";

const CAMERAMAN_TABS = { SERVICES: "services", REVIEWS: "reviews" };
const CUSTOMER_TABS = { BOOKINGS: "bookings", REVIEWS: "reviews", STATUS: "status" };

import CameramanServicesList from "../../components/accounts/CameramanServicesList";
import ReviewsList from "../../components/accounts/ReviewsList";
import CustomerBookings from "../../components/accounts/CustomerBookings";
import CustomerStatus from "../../components/accounts/CustomerStatus";

export default function ActivityHistory() {
  const { user } = useAuth();
  const isCameraman = user?.role_name === ROLE_OPTIONS.CAMERAMAN;
  const [activeTab, setActiveTab] = useState(isCameraman ? CAMERAMAN_TABS.SERVICES : CUSTOMER_TABS.STATUS);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateSuccess = () => {
    toast.success("Đăng dịch vụ thành công!");
    setIsModalOpen(false);
    setRefreshKey((k) => k + 1);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Lịch sử hoạt động</h1>

      {isCameraman ? (
        <div className="flex items-center border-b border-gray-700 mb-6 justify-around">
          <div className="flex">
            <button
              onClick={() => setActiveTab(CAMERAMAN_TABS.SERVICES)}
              className={`px-6 py-3 font-semibold transition-colors ${activeTab === CAMERAMAN_TABS.SERVICES ? "text-[#FF9500] border-b-2 border-[#FF9500]" : "text-gray-400 hover:text-gray-300"
                }`}
            >
              Danh sách các dịch vụ đã đăng
            </button>
            <button
              onClick={() => setActiveTab(CAMERAMAN_TABS.REVIEWS)}
              className={`px-6 py-3 font-semibold transition-colors ${activeTab === CAMERAMAN_TABS.REVIEWS ? "text-[#FF9500] border-b-2 border-[#FF9500]" : "text-gray-400 hover:text-gray-300"
                }`}
            >
              Đánh giá đã nhận
            </button>
          </div>
        </div>
      ) : (
        <div className="flex border-b border-gray-700 mb-6 justify-around">
          <button
            onClick={() => setActiveTab(CUSTOMER_TABS.STATUS)}
            className={`px-6 py-3 font-semibold transition-colors ${activeTab === CUSTOMER_TABS.STATUS ? "text-[#FF9500] border-b-2 border-[#FF9500]" : "text-gray-400 hover:text-gray-300"
              }`}
          >
            Trạng thái các dịch vụ
          </button>
          <button
            onClick={() => setActiveTab(CUSTOMER_TABS.REVIEWS)}
            className={`px-6 py-3 font-semibold transition-colors ${activeTab === CUSTOMER_TABS.REVIEWS ? "text-[#FF9500] border-b-2 border-[#FF9500]" : "text-gray-400 hover:text-gray-300"
              }`}
          >
            Đánh giá đã viết
          </button>
          <button
            onClick={() => setActiveTab(CUSTOMER_TABS.BOOKINGS)}
            className={`px-6 py-3 font-semibold transition-colors ${activeTab === CUSTOMER_TABS.BOOKINGS ? "text-[#FF9500] border-b-2 border-[#FF9500]" : "text-gray-400 hover:text-gray-300"
              }`}
          >
            Danh sách các dịch vụ đã thuê
          </button>
        </div>
      )}

      {isCameraman ? (
        activeTab === CAMERAMAN_TABS.SERVICES ? (
          <div className="relative">
            <CameramanServicesList refreshKey={refreshKey} />
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#FF9500] mt-2 cursor-pointer absolute right-0 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Đăng tin</span>
            </button>
          </div>
        ) : (
          <ReviewsList />
        )
      ) : activeTab === CUSTOMER_TABS.BOOKINGS ? (
        <CustomerBookings />
      ) : activeTab === CUSTOMER_TABS.REVIEWS ? (
        <ReviewsList />
      ) : (
        <CustomerStatus />
      )}

      <CreateServiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={handleCreateSuccess} />
    </div>
  );
}
