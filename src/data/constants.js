import { Award, Users, Camera, Star, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

// Navigation items
export const NAV_ITEMS = [
  'ĐĂNG KÝ',
  'VỚI CHÚNG TÔI', 
  'BLOG',
  'TIN TỨC',
  'ĐĂNG NHẬP/ĐĂNG KÝ'
];

// Features data
export const FEATURES_DATA = [
  {
    icon: Award,
    title: "Hồ sơ & demo đã được xác minh",
    description: "Tất cả thợ quay đều được kiểm duyệt kỹ lưỡng"
  },
  {
    icon: Users,
    title: "Đảm bảo 2 chiều & ảnh hưu trương thực tế", 
    description: "Bảo vệ quyền lợi cho cả hai bên"
  },
  {
    icon: Camera,
    title: "Gọi ý thợ quay phù hợp theo style - ngân sách",
    description: "AI matching thông minh"
  },
  {
    icon: Star,
    title: "Hợp đồng rõ ràng, cam kết đúng lịch",
    description: "Minh bạch và đáng tin cậy"
  }
];

// Portfolio data
export const PORTFOLIO_DATA = [
  {
    id: 1,
    title: "Dự án quay phim doanh nghiệp",
    description: "Video giới thiệu công ty chuyên nghiệp với chất lượng 4K",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop",
    category: "Doanh nghiệp"
  },
  {
    id: 2,
    title: "Quay phim sự kiện",
    description: "Ghi lại những khoảnh khắc đáng nhớ trong sự kiện của bạn",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=300&fit=crop",
    category: "Sự kiện"
  },
  {
    id: 3,
    title: "Phim quảng cáo sản phẩm", 
    description: "Tạo ra những video marketing ấn tượng và hiệu quả",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=300&fit=crop",
    category: "Quảng cáo"
  }
];

// Testimonials data
export const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: "TRAN THI D",
    text: "Lorem ipsum dolor sit amet consectetur. Laoreet pharetra sagittis tellus orci urna pellentesque. Mauris lorem cras malesuada nullam magna quis sociis. Velit mollis est ullamcorper lorem justo.",
    avatar: "/avatars/avatar1.jpg",
    rating: 5
  },
  {
    id: 2,
    name: "NGUYEN VAN A", 
    text: "Lorem ipsum dolor sit amet consectetur. Laoreet pharetra sagittis tellus orci urna pellentesque. Mauris lorem cras malesuada nullam magna quis sociis. Velit mollis est ullamcorper lorem justo.",
    avatar: "/avatars/avatar2.jpg",
    rating: 5
  },
  {
    id: 3,
    name: "LE THI C",
    text: "Lorem ipsum dolor sit amet consectetur. Laoreet pharetra sagittis tellus orci urna pellentesque. Mauris lorem cras malesuada nullam magna quis sociis. Velit mollis est ullamcorper lorem justo.",
    avatar: "/avatars/avatar3.jpg", 
    rating: 5
  }
];

// Social media links
export const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    url: 'https://facebook.com/camcrew',
    icon: Facebook
  },
  {
    name: 'Twitter', 
    url: 'https://twitter.com/camcrew',
    icon: Twitter
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/camcrew',
    icon: Instagram
  },
  {
    name: 'Youtube',
    url: 'https://youtube.com/camcrew', 
    icon: Youtube
  }
];

// Hero section content
export const HERO_CONTENT = {
  title: "Kết nối nhanh chóng với thợ quay phim đáng tin cậy.",
  subtitle: "CamCrew giúp bạn kết nối với thợ quay đã được xác minh, đúng phong cách, đúng lịch, đúng ngân sách.",
  primaryButton: "Đăng dự án →",
  secondaryButton: "Tìm thợ quay →"
};

// CTA section content
export const CTA_CONTENT = {
  title: "SẴN SÀNG BẮT ĐẦU DỰ ÁN TIẾP THEO?",
  subtitle: "CamCrew giúp bạn thuê thợ quay phù hợp nhanh chóng, minh bạch và an toàn.",
  primaryButton: "Đăng dự án →",
  secondaryButton: "Tìm thợ quay →"
};