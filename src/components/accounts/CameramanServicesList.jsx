import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { listServices } from "../../api/services";
import { SERVICE_AREAS } from "../../utils/constants";
import { getCategoryLabel, getStyleLabel } from "../../utils/helper";

export default function CameramanServicesList({ refreshKey = 0 }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  const fetchServices = async (page = pagination.page) => {
    setLoading(true);
    try {
      const res = await listServices({ page, limit: pagination.limit });
      setServices(res?.data || []);
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
    fetchServices(1);
  }, [refreshKey]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) fetchServices(newPage);
  };

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-28 bg-gray-800/60 rounded animate-pulse" />
          ))}
        </div>
      ) : services.length === 0 ? (
        <div className="text-center text-gray-400 py-8">Chưa có dịch vụ nào được đăng</div>
      ) : (
        services.map((service) => (
          <div key={service._id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
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
                    <h3 className="text-lg font-semibold text-white mb-1">{service.title}</h3>
                    <p className="text-[#FF9500] text-sm">
                      Phong cách: {service.categories?.length ? service.categories.map(getCategoryLabel).join(" / ") : "N/A"}
                    </p>
                    <p className="text-[#FF9500] text-sm">
                      Dịch vụ: {service.styles?.length ? service.styles.map(getStyleLabel).join(" / ") : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-gray-300">
                    <span className="text-gray-400">Thời lượng dự kiến:</span> {service.time_of_day?.length || 0} buổi (3–4 tiếng)
                  </div>
                  <div className="text-gray-300">
                    <span className="text-gray-400">Địa điểm:</span>{" "}
                    {service.areas?.map((a) => SERVICE_AREAS.find((x) => x.value === a)?.label || a).join(", ") || "N/A"}
                  </div>
                </div>

                <div className="mt-3 text-[#FF9500] text-xl font-bold">
                  Mức giá: {new Intl.NumberFormat("vi-VN").format(service.amount)} VND
                </div>
              </div>

              <div className="text-right ml-4">
                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                    service.status === "approved" ? "bg-green-600 text-white" : service.status === "pending" ? "bg-yellow-600 text-white" : "bg-red-600 text-white"
                  }`}
                >
                  {service.status === "approved" ? "Đang được chấp thuận" : service.status === "pending" ? "Chờ duyệt" : "Bị từ chối"}
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
    </div>
  );
}
