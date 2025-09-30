import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { listReviews } from "../../api/reviews";

export default function ReviewsList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  const fetchReviews = async (page = pagination.page) => {
    setLoading(true);
    try {
      const res = await listReviews({ page, limit: pagination.limit });
      setReviews(res?.data || []);
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
    fetchReviews(1);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) fetchReviews(newPage);
  };

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-800/60 rounded animate-pulse" />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center text-gray-400 py-8">Chưa có đánh giá nào</div>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-700 rounded-full overflow-hidden flex-shrink-0">
                {review.customer_id?.avatar_url ? (
                  <img src={review.customer_id.avatar_url} alt={review.customer_id.full_name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-400">{review.customer_id?.full_name?.charAt(0) || "?"}</span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-semibold">{review.customer_id?.full_name || "Khách hàng"}</h4>
                  <span className="text-gray-400 text-sm">{new Date(review.createdAt).toLocaleDateString("vi-VN")}</span>
                </div>

                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-400"}`} />
                  ))}
                  <span className="text-gray-300 text-sm ml-2">{review.rating}/5</span>
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
}
