import { User, Calendar, FileText, Bell, CreditCard, ArrowUpCircle } from "lucide-react";

export const ROLE_OPTIONS = [
  { value: "customer", label: "Khách hàng" },
  { value: "cameraman", label: "Thợ quay phim" },
];

export const membershipLabels = {
  normal: "Tài khoản thường",
  "1month": "Gói 1 tháng",
  "6month": "Gói 6 tháng",
};

export const customerSidebarItems = [
  {
    id: "personal",
    icon: User,
    label: "Thông tin cá nhân",
    to: "/manage-account/personal",
  },
  {
    id: "bookings",
    icon: Calendar,
    label: "Lịch sử hoạt động",
    to: "/manage-account/bookings",
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

export const cameramanExtraItems = [
  {
    id: "upgrade",
    icon: ArrowUpCircle,
    label: "Nâng cấp tài khoản",
    to: "/manage-account/upgrade",
  },
];

export const REPORT_STATUS = [
  { value: "pending", label: "Đang chờ xử lý" },
  { value: "processed", label: "Đã xử lý" },
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
