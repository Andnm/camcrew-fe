import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin, ShieldCheck, Star, User as UserIcon, Send, Flag, X, TriangleAlert } from "lucide-react";
import { getProfileById } from "../api/users";
import { getReviewsByCameramanId, createNewReviews } from "../api/reviews";
import { createNewReport } from "../api/reports";
import { getMembershipLabel } from "../utils/helper";
import { ROLE_OPTIONS_LABEL } from "../utils/constants";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function CameramanProfilePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const [reviews, setReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(false);

    const [newRating, setNewRating] = useState(5);
    const [newContent, setNewContent] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const [showReportModal, setShowReportModal] = useState(false);
    const [reportContent, setReportContent] = useState("");
    const [reportSubmitting, setReportSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const getRoleLabel = (val) =>
        ROLE_OPTIONS_LABEL.find((r) => r.value === val)?.label || val || "—";

    const formatVN = (d) => (d ? new Date(d).toLocaleString("vi-VN") : "—");

    const loadProfile = async (userId) => {
        setLoading(true);
        try {
            const res = await getProfileById(userId);
            setProfile(res);
        } finally {
            setLoading(false);
        }
    };

    const loadReviews = async (userId) => {
        setReviewsLoading(true);
        try {
            const res = await getReviewsByCameramanId(userId);
            setReviews(Array.isArray(res?.data) ? res.data : []);
        } finally {
            setReviewsLoading(false);
        }
    };

    useEffect(() => {
        if (!id) return;
        loadProfile(id);
        loadReviews(id);
    }, [id]);

    const avgRating = useMemo(() => {
        if (!reviews.length) return 0;
        const s = reviews.reduce((a, r) => a + (Number(r.rating) || 0), 0);
        return Math.round((s / reviews.length) * 10) / 10;
    }, [reviews]);

    const ratingDistribution = useMemo(() => {
        const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        reviews.forEach((r) => {
            const rating = Math.round(Number(r.rating) || 0);
            if (rating >= 1 && rating <= 5) dist[rating]++;
        });
        return dist;
    }, [reviews]);

    const handleSubmitReview = async () => {
        if (!newContent.trim()) {
            toast.error("Vui lòng nhập nội dung đánh giá");
            return;
        }

        try {
            setSubmitting(true);
            await createNewReviews({
                customer_id: user?._id || user?.id,
                cameraman_id: id,
                rating: newRating,
                comment: newContent.trim(),
            });

            toast.success("Gửi đánh giá thành công!");
            setNewContent("");
            setNewRating(5);
            await loadReviews(id);
        } catch (e) {
            const errorMsg = e?.response?.data?.message || e?.message || "Đã có lỗi xảy ra, vui lòng thử lại.";
            toast.error(errorMsg);
        } finally {
            setSubmitting(false);
        }
    };

    const handleSubmitReport = async () => {
        if (!reportContent.trim()) return;
        try {
            setReportSubmitting(true);
            await createNewReport({
                customer_id: user?._id || user?.id,
                cameraman_id: id,
                content: reportContent.trim(),
            });
            setReportContent("");
            setShowReportModal(false);
            setShowSuccessModal(true);
        } finally {
            setReportSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black">
                <div className="max-w-7xl mx-auto px-6 py-12 animate-pulse">
                    <div className="h-10 w-24 bg-gray-800 rounded mb-6" />

                    <div className="bg-[#1a1a1a] rounded-2xl p-8 mb-6 flex gap-6">
                        <div className="w-56 h-56 bg-gray-800 rounded-xl" />
                        <div className="flex-1 space-y-4">
                            <div className="h-8 w-1/2 bg-gray-800 rounded" />
                            <div className="h-5 w-1/4 bg-gray-800 rounded" />
                            <div className="h-6 w-32 bg-gray-800 rounded" />
                        </div>
                    </div>

                    <div className="bg-[#1a1a1a] rounded-2xl p-8 mb-6 space-y-4">
                        <div className="h-6 w-1/4 bg-gray-800 rounded" />
                        <div className="h-4 w-full bg-gray-800 rounded" />
                        <div className="h-4 w-5/6 bg-gray-800 rounded" />
                        <div className="h-4 w-4/6 bg-gray-800 rounded" />
                    </div>

                    <div className="bg-[#1a1a1a] rounded-2xl p-8 space-y-6">
                        <div className="h-6 w-1/3 bg-gray-800 rounded" />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="space-y-3">
                                <div className="h-16 w-32 bg-gray-800 rounded" />
                                <div className="h-4 w-full bg-gray-800 rounded" />
                                <div className="h-4 w-full bg-gray-800 rounded" />
                                <div className="h-4 w-full bg-gray-800 rounded" />
                            </div>
                            <div className="space-y-3">
                                <div className="h-24 w-full bg-gray-800 rounded" />
                                <div className="h-10 w-1/3 bg-gray-800 rounded ml-auto" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    if (!profile) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white">Không tìm thấy thông tin cameraman</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <div className="bg-[#FF9500] pt-6 pb-20">
                <div className="max-w-7xl mx-auto px-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 text-black hover:text-gray-800 mb-4"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 -mt-12">
                <div className="bg-[#1a1a1a] rounded-2xl p-8 mb-6">
                    <div className="flex items-start gap-6">
                        <div className="w-56 h-56 rounded-xl bg-gray-800 overflow-hidden flex-shrink-0">
                            {profile?.avatar_url ? (
                                <img
                                    src={profile.avatar_url}
                                    alt={profile.full_name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <UserIcon className="w-20 h-20 text-gray-600" />
                                </div>
                            )}
                        </div>

                        <div className="flex-1">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h1 className="text-white text-3xl font-bold mb-2">{profile.full_name}</h1>
                                    <p className="text-gray-400 text-lg mb-3">{getRoleLabel(profile.role_name)}</p>
                                    {profile.is_verified && (
                                        <div className="inline-flex items-center gap-2 text-green-400 mb-4">
                                            <ShieldCheck className="w-5 h-5" />
                                            <span className="text-sm">Đã xác minh</span>
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => setShowReportModal(true)}
                                    className="w-12 h-12 rounded-full bg-[#FF9500] flex items-center justify-center hover:bg-orange-600 transition-colors"
                                >
                                    <TriangleAlert className="w-6 h-6 text-black" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#1a1a1a] rounded-2xl p-8 mb-6">
                    <h2 className="text-[#FF9500] text-xl font-bold mb-6">Giới thiệu thông tin</h2>

                    {profile.description && (
                        <p className="text-gray-300 text-base leading-relaxed mb-8">
                            {profile.description}
                        </p>
                    )}

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-white font-bold mb-3">Phong cách</h3>
                            <p className="text-gray-300">Cinematic, Highlight, Truyền thống...</p>
                        </div>

                        <div>
                            <h3 className="text-white font-bold mb-3">Kinh nghiệm</h3>
                            <ul className="text-gray-300 space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#FF9500] mt-1.5">•</span>
                                    <span>50+ dự án cưới hỏi</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#FF9500] mt-1.5">•</span>
                                    <span>12 TVC ngắn</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#FF9500] mt-1.5">•</span>
                                    <span>5 MV hậu trường</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#FF9500] mt-1.5">•</span>
                                    <span>4 năm làm hậu kỳ (Premiere Pro & DaVinci Resolve)</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-bold mb-3">Thế mạnh</h3>
                            <ul className="text-gray-300 space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#FF9500] mt-1.5">•</span>
                                    <span>Chỉnh màu sâu – cinematic</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#FF9500] mt-1.5">•</span>
                                    <span>Bắt khoảnh khắc cảm xúc nhanh</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#FF9500] mt-1.5">•</span>
                                    <span>Giao sản phẩm đúng deadline</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#FF9500] mt-1.5">•</span>
                                    <span>Hợp tác nhẹ nhàng – chuyên nghiệp</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-bold mb-3">Địa điểm hoạt động</h3>
                            <p className="text-gray-300">TP. Hồ Chí Minh, Bình Dương, Đồng Nai</p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#1a1a1a] rounded-2xl p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                        <div>
                            <h2 className="text-white text-xl font-bold mb-6">Đánh giá từ khách hàng</h2>

                            <div className="flex items-start gap-8">
                                <div className="text-center">
                                    <div className="text-7xl font-bold text-white mb-2">{avgRating}</div>
                                    <div className="flex items-center justify-center gap-1 mb-2">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${i <= Math.round(avgRating) ? "text-[#FF9500]" : "text-gray-600"
                                                    }`}
                                                fill="currentColor"
                                            />
                                        ))}
                                    </div>
                                    <div className="text-gray-400 text-sm">{reviews.length} đánh giá</div>
                                </div>

                                <div className="flex-1 space-y-2">
                                    {[5, 4, 3, 2, 1].map((star) => (
                                        <div key={star} className="flex items-center gap-3">
                                            <span className="text-white text-sm w-3">{star}</span>
                                            <Star className="w-4 h-4 text-[#FF9500]" fill="currentColor" />
                                            <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-[#FF9500] transition-all duration-300"
                                                    style={{
                                                        width: reviews.length
                                                            ? `${(ratingDistribution[star] / reviews.length) * 100}%`
                                                            : "0%",
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-white text-xl font-bold">Đánh giá</h2>
                                <button className="text-[#FF9500] hover:text-orange-600">
                                    <Send className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="mb-4">
                                <p className="text-gray-400 text-sm mb-3">Viết bài đánh giá</p>
                                <textarea
                                    className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#FF9500] transition-colors resize-none"
                                    rows={4}
                                    placeholder="Viết bài đánh giá"
                                    value={newContent}
                                    onChange={(e) => setNewContent(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <button
                                            key={i}
                                            onClick={() => setNewRating(i)}
                                            className={`transition-colors ${i <= newRating ? "text-[#FF9500]" : "text-gray-600"}`}
                                            aria-label={`rating-${i}`}
                                        >
                                            <Star className="w-7 h-7" fill="currentColor" />
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={handleSubmitReview}
                                    disabled={submitting || !newContent.trim()}
                                    className={`bg-[#FF9500] hover:bg-orange-600 text-black font-semibold py-2 px-8 rounded-lg transition-colors ${submitting || !newContent.trim() ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                >
                                    Gửi
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8">
                        {reviewsLoading ? (
                            <div className="text-gray-400 text-center py-8">Đang tải đánh giá...</div>
                        ) : reviews.length ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {reviews.map((rv) => (
                                    <div key={rv._id} className="bg-black rounded-xl p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gray-800 flex-shrink-0 overflow-hidden flex items-center justify-center">
                                                <UserIcon className="w-6 h-6 text-gray-600" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-white font-semibold mb-1">
                                                    {rv.author_name || "Khách hàng"}
                                                </h4>
                                                <p className="text-gray-400 text-xs mb-2">Khách hàng</p>
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="flex items-center gap-0.5">
                                                        {[1, 2, 3, 4, 5].map((i) => (
                                                            <Star
                                                                key={i}
                                                                className={`w-3.5 h-3.5 ${i <= (rv.rating || 0) ? "text-[#FF9500]" : "text-gray-600"
                                                                    }`}
                                                                fill="currentColor"
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-gray-500 text-xs">
                                                        {rv.createdAt ? new Date(rv.createdAt).toLocaleDateString("vi-VN") : ""}
                                                    </span>
                                                </div>
                                                <p className="text-gray-300 text-sm leading-relaxed">{rv.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-gray-400 text-center py-12">Chưa có đánh giá nào.</div>
                        )}
                    </div>
                </div>
            </div>

            <div className="h-12"></div>

            {showReportModal && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-4">
                    <div className="bg-[#2a2a2a] rounded-2xl w-full max-w-2xl">
                        <div className="flex items-center justify-between p-6 border-b border-gray-700">
                            <h3 className="text-[#FF9500] text-xl font-bold">Báo cáo</h3>
                            <button
                                onClick={() => setShowReportModal(false)}
                                className="text-[#FF9500] hover:text-orange-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center flex-shrink-0">
                                    {profile?.avatar_url ? (
                                        <img src={profile.avatar_url} alt={profile.full_name} className="w-full h-full object-cover" />
                                    ) : (
                                        <UserIcon className="w-6 h-6 text-gray-500" />
                                    )}
                                </div>
                                <div className="text-white font-semibold">{profile.full_name}</div>
                            </div>

                            <textarea
                                className="w-full bg-[#1a1a1a] border-2 border-[#FF9500] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none resize-none"
                                rows={6}
                                placeholder="Mô tả lý do chi tiết"
                                value={reportContent}
                                onChange={(e) => setReportContent(e.target.value)}
                                maxLength={500}
                            />
                            <div className="text-gray-400 text-sm mt-2">
                                {reportContent.length}/500
                            </div>

                            <button
                                onClick={handleSubmitReport}
                                disabled={reportSubmitting || !reportContent.trim()}
                                className={`w-full bg-[#FF9500] hover:bg-orange-600 text-black font-bold py-4 rounded-xl mt-6 transition-colors ${reportSubmitting || !reportContent.trim() ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                Gửi báo cáo
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-4">
                    <div className="bg-[#2a2a2a] rounded-2xl w-full max-w-2xl">
                        <div className="flex items-center justify-between p-6 border-b border-gray-700">
                            <h3 className="text-[#FF9500] text-xl font-bold">Báo cáo thành công</h3>
                            <button
                                onClick={() => setShowSuccessModal(false)}
                                className="text-[#FF9500] hover:text-orange-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-8">
                            <p className="text-white text-lg leading-relaxed mb-8">
                                Cảm ơn bạn đã báo cáo. Chúng tôi đã ghi nhận phản hồi và sẽ kiểm tra thông tin trong thời gian sớm nhất để đảm bảo trải nghiệm an toàn cho bạn.
                            </p>

                            <button
                                onClick={() => setShowSuccessModal(false)}
                                className="w-full bg-[#FF9500] hover:bg-orange-600 text-black font-bold py-4 rounded-xl transition-colors"
                            >
                                Hoàn thành
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}