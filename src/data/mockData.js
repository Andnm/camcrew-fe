export const mockData = {
  users: [
    {
      id: 1,
      email: "admin@camhub.vn",
      password: "$2b$10$hashed-admin",
      full_name: "System Admin",
      avatar_url: null,
      phone_number: null,
      status: "active",
      is_verified: true,
      avg_rating: null,
      membership_subscription: null,
      subscription_start_date: null,
      subscription_end_date: null,
      role_name: "admin",
      created_at: "2025-09-20T08:00:00Z",
      updated_at: "2025-09-20T08:00:00Z"
    },
    {
      id: 2,
      email: "minhfilm@camhub.vn",
      password: "$2b$10$hashed-2",
      full_name: "Minh Film",
      avatar_url: "https://cdn.example.com/u2.jpg",
      phone_number: "0900000002",
      status: "active",
      is_verified: true,
      avg_rating: 4.5,
      membership_subscription: "1month",
      subscription_start_date: "2025-09-01",
      subscription_end_date: "2025-09-30",
      role_name: "cameraman",
      created_at: "2025-09-01T03:10:00Z",
      updated_at: "2025-09-22T10:00:00Z"
    },
    {
      id: 3,
      email: "anhcinema@camhub.vn",
      password: "$2b$10$hashed-3",
      full_name: "Anh Cinema",
      avatar_url: "https://cdn.example.com/u3.jpg",
      phone_number: "0900000003",
      status: "active",
      is_verified: true,
      avg_rating: 0,
      membership_subscription: "normal",
      subscription_start_date: null,
      subscription_end_date: null,
      role_name: "cameraman",
      created_at: "2025-09-05T04:00:00Z",
      updated_at: "2025-09-21T04:00:00Z"
    },
    {
      id: 4,
      email: "hoangstudio@camhub.vn",
      password: "$2b$10$hashed-4",
      full_name: "Hoàng Studio",
      avatar_url: "https://cdn.example.com/u4.jpg",
      phone_number: "0900000004",
      status: "blocked",
      is_verified: false,
      avg_rating: 0,
      membership_subscription: "6month",
      subscription_start_date: "2025-03-01",
      subscription_end_date: "2025-08-31",
      role_name: "cameraman",
      created_at: "2025-03-01T02:00:00Z",
      updated_at: "2025-09-10T02:00:00Z"
    },
    {
      id: 10,
      email: "khach1@camhub.vn",
      password: "$2b$10$hashed-10",
      full_name: "Nguyễn Khách 1",
      avatar_url: null,
      phone_number: "0911000001",
      status: "active",
      is_verified: true,
      avg_rating: null,
      membership_subscription: null,
      subscription_start_date: null,
      subscription_end_date: null,
      role_name: "customer",
      created_at: "2025-09-15T06:00:00Z",
      updated_at: "2025-09-21T06:00:00Z"
    }
  ],
  services: [
    {
      id: 100,
      cameraman_id: 2,
      title: "Gói Cưới Cinematic 1 Ngày",
      amount: 12000000,
      styles: ["wedding"],
      categories: ["cinematic", "highlight"],
      areas: ["Ho Chi Minh", "Binh Duong"],
      video_demo_urls: ["https://video.example.com/100-1.mp4"],
      date_get_job: ["2025-10-05", "2025-10-12"],
      time_of_day: ["morning", "afternoon"],
      status: "approved",
      rejection_reason: null,
      created_at: "2025-09-05T05:00:00Z",
      updated_at: "2025-09-21T03:30:00Z"
    },
    {
      id: 101,
      cameraman_id: 3,
      title: "Quay Sự Kiện Doanh Nghiệp",
      amount: 8000000,
      styles: ["event"],
      categories: ["documentary", "bts"],
      areas: ["Ho Chi Minh", "Dong Nai"],
      video_demo_urls: [],
      date_get_job: ["2025-10-20"],
      time_of_day: ["evening"],
      status: "rejected",
      rejection_reason: "Demo kém chất lượng, thiếu portfolio.",
      created_at: "2025-09-10T02:00:00Z",
      updated_at: "2025-09-18T09:00:00Z"
    }
  ],
  bookings: [
    {
      id: 200,
      customer_id: 10,
      cameraman_id: 2,
      service_id: 100,
      scheduled_date: "2025-10-05",
      time_of_day: "morning",
      status: "requested",
      created_at: "2025-09-21T09:00:00Z",
      updated_at: "2025-09-21T09:10:00Z"
    }
  ],
  reviews: [
    {
      id: 400,
      customer_id: 10,
      cameraman_id: 2,
      rating: 5,
      comment: "Quay đẹp, đúng timeline, rất chuyên nghiệp.",
      created_at: "2025-09-11T02:00:00Z",
      updated_at: "2025-09-11T02:00:00Z"
    }
  ],
  blogs: [
    {
      id: 700,
      title: "5 Mẹo Chọn Cameraman Cho Đám Cưới",
      content: "Nội dung blog chi tiết về cách chọn cameraman phù hợp cho ngày cưới của bạn...",
      cover_url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=400&fit=crop",
      created_at: "2025-09-18T05:00:00Z",
      updated_at: "2025-09-18T05:00:00Z"
    }
  ]
};