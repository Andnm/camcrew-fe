import {
  Award,
  Users,
  Camera,
  Star,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";

export const NAV_ITEMS = [
  { label: "DỊCH VỤ", to: "/services" },
  { label: "VỀ CHÚNG TÔI", to: "/about-us" },
  { label: "BLOG", to: "/blog" },
  { label: "TƯ VẤN", to: "/consult" },
];

export const FEATURES_DATA = [
  {
    icon: Award,
    title: "Hồ sơ & demo đã được xác minh",
    description: "Tất cả thợ quay đều được kiểm duyệt kỹ lưỡng",
  },
  {
    icon: Camera,
    title: "Gọi ý thợ quay phù hợp theo style - ngân sách",
    description: "AI matching thông minh",
  },
  {
    icon: Users,
    title: "Đảm bảo 2 chiều & ảnh hậu trường thực tế",
    description: "Bảo vệ quyền lợi cho cả hai bên",
  },
  {
    icon: Star,
    title: "Hợp đồng rõ ràng, cam kết đúng lịch",
    description: "Minh bạch và đáng tin cậy",
  },
];

export const PORTFOLIO_DATA = [
  {
    id: 1,
    title: "Dự án quay phim doanh nghiệp",
    description:
      "Chuyên quay phim giới thiệu công ty, sản phẩm với phong cách chuyên nghiệp. Kinh nghiệm 5+ năm làm việc với các doanh nghiệp lớn, đảm bảo chất lượng hình ảnh sắc nét và nội dung truyền tải hiệu quả.",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=400&fit=crop",
    category: "Nguyễn Văn A",
  },
  {
    id: 2,
    title: "Quay phim sự kiện",
    description:
      "Đam mê ghi lại những khoảnh khắc đặc biệt của sự kiện. Thiết bị hiện đại, phong cách năng động, chuyên nghiệp. Từng làm việc với hơn 100 sự kiện từ hội nghị, gala đến event triển lãm.",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
    category: "Trần Minh B",
  },
  {
    id: 3,
    title: "Phim quảng cáo sản phẩm",
    description:
      "Sáng tạo nội dung quảng cáo hấp dẫn, thu hút người xem. Chuyên làm TVC, viral video cho các brand F&B, thời trang và công nghệ. Phong cách trẻ trung, hiện đại, tạo được sự khác biệt.",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=400&fit=crop",
    category: "Lê Thị C",
  },
  {
    id: 4,
    title: "Quay phim wedding",
    description:
      "Ghi lại khoảnh khắc hạnh phúc nhất trong ngày cưới của bạn. Phong cách tự nhiên, tươi sáng, đầy cảm xúc. Kinh nghiệm 7 năm với hơn 200 đám cưới, luôn mang đến video đẹp vượt mong đợi.",
    image:
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=400&fit=crop",
    category: "Phạm Văn D",
  },
  {
    id: 5,
    title: "Phim tài liệu",
    description:
      "Kể chuyện qua ống kính với góc nhìn độc đáo và sâu sắc. Chuyên làm phim tài liệu xã hội, văn hóa, du lịch. Đã có nhiều tác phẩm được trình chiếu tại các liên hoan phim trong nước.",
    image:
      "https://images.unsplash.com/photo-1478720568477-b0829c2b37eb?w=400&h=400&fit=crop",
    category: "Hoàng Thị E",
  },
];

export const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: "TRẦN THỊ HƯƠNG",
    text: "Tôi đã tìm được thợ quay hoàn hảo cho đám cưới của mình chỉ sau 2 ngày đăng job. Anh quay rất chuyên nghiệp, video đẹp không tưởng. Nền tảng CamCrew thật sự giúp tôi tiết kiệm rất nhiều thời gian!",
    avatar: "/avatars/avatar1.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "NGUYỄN VĂN MINH",
    text: "Là một freelancer, CamCrew giúp tôi tìm được nhiều khách hàng tiềm năng. Hệ thống matching rất thông minh, job phù hợp với style của mình. Thanh toán minh bạch, hợp đồng rõ ràng khiến tôi hoàn toàn yên tâm.",
    avatar: "/avatars/avatar2.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "LÊ THỊ MAI",
    text: "Công ty chúng tôi thường xuyên cần thuê thợ quay cho các event. CamCrew giúp chúng tôi tiếp cận được nhiều thợ quay chất lượng với mức giá hợp lý. Quy trình đơn giản, hỗ trợ nhiệt tình. Rất đáng tin cậy!",
    avatar: "/avatars/avatar3.jpg",
    rating: 5,
  },
];

export const SOCIAL_LINKS = [
  {
    name: "Facebook",
    url: "https://facebook.com/camcrew",
    icon: Facebook,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/camcrew",
    icon: Twitter,
  },
  {
    name: "Instagram",
    url: "https://instagram.com/camcrew",
    icon: Instagram,
  },
  {
    name: "Youtube",
    url: "https://youtube.com/camcrew",
    icon: Youtube,
  },
];

export const HERO_CONTENT = {
  title: "Kết nối nhanh chóng với thợ quay phim đáng tin cậy.",
  subtitle:
    "CamCrew giúp bạn kết nối với thợ quay đã được xác minh, đúng phong cách, đúng lịch, đúng ngân sách.",
  primaryButton: "Đăng job ngay →",
  secondaryButton: "Tìm thợ quay →",
};

export const CTA_CONTENT = {
  title: "SẴN SÀNG BẮT ĐẦU DỰ ÁN TIẾP THEO?",
  subtitle:
    "CamCrew giúp bạn thuê thợ quay phù hợp nhanh chóng, minh bạch và an toàn.",
  primaryButton: "Đăng job ngay →",
  secondaryButton: "Tìm thợ ngay →",
};
