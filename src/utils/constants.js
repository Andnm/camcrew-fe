import {
    User,
    Calendar,
    FileText,
    Bell,
    CreditCard,
    ArrowUpCircle,
} from "lucide-react";

export const ROLE_OPTIONS = {
    CUSTOMER: "customer",
    CAMERAMAN: "cameraman",
    ADMIN: "admin",
};

export const BOOKING_STATUS_OPTIONS = {
    PAYING: "paying",
    PAY_CANCELLED: "pay_cancelled",
    REQUESTED: "requested",
    COMPLETED: "completed",
};

export const BOOKING_STATUS_LABEL = [
    { value: "paying", label: "Đang thanh toán" },
    { value: "pay_cancelled", label: "Đã hủy thanh toán" },
    { value: "requested", label: "Đã được yêu cầu" },
    { value: "completed", label: "Đã hoàn thành" },
];

export const ROLE_OPTIONS_LABEL = [
    { value: "customer", label: "Khách hàng" },
    { value: "cameraman", label: "Thợ quay phim" },
];

export const MEMBERSHIP_OPTIONS = {
    ONE_MONTH: "1month",
    SIX_MONTH: "6month",
};

export const membershipLabels = {
    normal: "Tài khoản thường",
    "1month": "Gói 1 tháng",
    "6month": "Gói 6 tháng",
};

export const customerSidebarItems = [{
        id: "personal",
        icon: User,
        label: "Thông tin cá nhân",
        to: "/manage-account/personal",
    },
    {
        id: "bookings",
        icon: Calendar,
        label: "Lịch sử hoạt động",
        to: "/manage-account/activity-history",
    },
    {
        id: "messages",
        icon: FileText,
        label: "Tin nhắn",
        to: "/manage-account/messages",
    },
    {
        id: "notifications",
        icon: Bell,
        label: "Thông báo",
        to: "/manage-account/notifications",
    },
    {
        id: "rentals",
        icon: CreditCard,
        label: "Lịch thuê của tôi",
        to: "/manage-account/my-rentals",
    },
];

export const cameramanExtraItems = [{
    id: "upgrade",
    icon: ArrowUpCircle,
    label: "Nâng cấp tài khoản",
    to: "/manage-account/upgrade",
}, ];

export const REPORT_STATUS = [
    { value: "pending", label: "Đang chờ xử lý" },
    { value: "processed", label: "Đã xử lý" },
];

export const SERVICE_STATUS_OPTIONS = {
    PENDING: "pending",
    APPROVED: "approved",
    REJECTED: "rejected",
    DISABLED: "disabled",
};

export const SERVICE_STATUS = [
    { value: "pending", label: "Đang chờ duyệt" },
    { value: "approved", label: "Đã được chấp thuận" },
    { value: "rejected", label: "Đã bị từ chối" },
    { value: "disabled", label: "Đã được ẩn" },
];

export const SERVICE_STYLES = [
    { value: "wedding", label: "Cưới hỏi" },
    { value: "event", label: "Sự kiện" },
    { value: "yearbook", label: "Kỷ yếu" },
    { value: "tvc", label: "TVC" },
    { value: "film", label: "Phim" },
];

export const SERVICE_CATEGORIES = [
    { value: "cinematic", label: "Cinematic" },
    { value: "traditional", label: "Truyền thống" },
    { value: "highlight", label: "Highlight" },
    { value: "bts", label: "BTS" },
    { value: "documentary", label: "Tài liệu" },
];

export const SERVICE_AREAS = [
    { value: "Ho Chi Minh", label: "Hồ Chí Minh" },
    { value: "Binh Duong", label: "Bình Dương" },
    { value: "Can Tho", label: "Cần Thơ" },
    { value: "Dong Nai", label: "Đồng Nai" },
    { value: "Ha Noi", label: "Hà Nội" },
];

export const SERVICE_TIME_OF_DAYS = [
    { value: "morning", label: "Buổi sáng" },
    { value: "afternoon", label: "Buổi chiều" },
    { value: "evening", label: "Buổi tối" },
];