import { User, Calendar, FileText, Bell, CreditCard } from "lucide-react";


export const ROLE_OPTIONS = [
  { value: "customer", label: "Khách hàng" },
  { value: "cameraman", label: "Thợ quay phim" },
];

export const membershipLabels = {
  normal: "Tài khoản thường",
  "1month": "Gói 1 tháng",
  "6month": "Gói 6 tháng",
};


export const sidebarItems = [
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
    id: "subscription",
    icon: CreditCard,
    label: "Lịch thuê của tôi",
    to: "/manage-account/subscription",
  },
];
