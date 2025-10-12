import React, { useState, useMemo } from "react";
import {
  Users,
  Camera,
  Calendar,
  DollarSign,
  TrendingUp,
  Star,
  Eye,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

// Mock Data
const mockData = {
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

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");

  // Tính toán thống kê từ mockData
  const statistics = useMemo(() => {
    const totalUsers = mockData.users.length;
    const cameramen = mockData.users.filter(u => u.role_name === "cameraman");
    const activeCameramen = cameramen.filter(c => c.status === "active").length;
    const customers = mockData.users.filter(u => u.role_name === "customer").length;
    
    const pendingServices = mockData.services.filter(s => s.status === "pending").length;
    const approvedServices = mockData.services.filter(s => s.status === "approved").length;
    const rejectedServices = mockData.services.filter(s => s.status === "rejected").length;
    
    const totalRevenue = mockData.services
      .filter(s => s.status === "approved")
      .reduce((sum, s) => sum + s.amount, 0);
    
    const avgRating = mockData.reviews.reduce((sum, r) => sum + r.rating, 0) / mockData.reviews.length || 0;
    
    const verifiedUsers = mockData.users.filter(u => u.is_verified).length;
    const verificationRate = (verifiedUsers / totalUsers) * 100;

    return {
      totalUsers,
      activeCameramen,
      customers,
      pendingServices,
      approvedServices,
      rejectedServices,
      totalRevenue,
      avgRating,
      verificationRate,
      totalBookings: mockData.bookings.length
    };
  }, []);

  // Dữ liệu cho biểu đồ phân bố vai trò
  const roleDistribution = useMemo(() => {
    const roles = mockData.users.reduce((acc, user) => {
      const role = user.role_name === "cameraman" ? "Cameraman" : 
                   user.role_name === "customer" ? "Khách hàng" : "Admin";
      acc[role] = (acc[role] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(roles).map(([name, value]) => ({ name, value }));
  }, []);

  // Dữ liệu cho biểu đồ trạng thái dịch vụ
  const serviceStatusData = useMemo(() => {
    const statuses = mockData.services.reduce((acc, service) => {
      const status = service.status === "approved" ? "Đã duyệt" :
                    service.status === "rejected" ? "Từ chối" :
                    service.status === "pending" ? "Chờ duyệt" : "Khác";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(statuses).map(([name, value]) => ({ name, value }));
  }, []);

  // State cho biểu đồ doanh thu
  const [revenueTimeRange, setRevenueTimeRange] = useState("year");
  
  // Dữ liệu cho biểu đồ doanh thu theo thời gian
  const revenueOverTime = useMemo(() => {
    // Tạo dữ liệu mẫu cho biểu đồ theo tuần/tháng/năm
    if (revenueTimeRange === "week") {
      return [
        { period: "Tuần 1", revenue: 8.5, bookings: 2 },
        { period: "Tuần 2", revenue: 12.0, bookings: 3 },
        { period: "Tuần 3", revenue: 15.5, bookings: 4 },
        { period: "Tuần 4", revenue: 20.0, bookings: 5 },
      ];
    } else if (revenueTimeRange === "month") {
      return [
        { period: "Tháng 6", revenue: 25.5, bookings: 6 },
        { period: "Tháng 7", revenue: 32.0, bookings: 8 },
        { period: "Tháng 8", revenue: 28.5, bookings: 7 },
        { period: "Tháng 9", revenue: 45.0, bookings: 12 },
        { period: "Tháng 10", revenue: 38.5, bookings: 9 },
      ];
    } else {
      return [
        { period: "2021", revenue: 120.0, bookings: 35 },
        { period: "2022", revenue: 185.5, bookings: 52 },
        { period: "2023", revenue: 245.0, bookings: 68 },
        { period: "2024", revenue: 320.5, bookings: 89 },
        { period: "2025", revenue: 280.0, bookings: 75 },
      ];
    }
  }, [revenueTimeRange]);

  // Dữ liệu cho biểu đồ membership
  const membershipData = useMemo(() => {
    const memberships = mockData.users
      .filter(u => u.role_name === "cameraman")
      .reduce((acc, user) => {
        const type = user.membership_subscription || "normal";
        const label = type === "1month" ? "1 Tháng" :
                     type === "6month" ? "6 Tháng" :
                     type === "12month" ? "12 Tháng" : "Thường";
        acc[label] = (acc[label] || 0) + 1;
        return acc;
      }, {});
    
    return Object.entries(memberships).map(([name, value]) => ({ name, value }));
  }, []);

  const COLORS = ["#FF9500", "#34C759", "#007AFF", "#FF3B30", "#AF52DE"];

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-green-600 text-sm font-semibold flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              {statistics.verificationRate.toFixed(0)}%
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Tổng người dùng</h3>
          <p className="text-3xl font-bold text-gray-900 mt-1">{statistics.totalUsers}</p>
          <p className="text-gray-500 text-xs mt-2">{statistics.customers} khách hàng</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Camera className="w-6 h-6 text-green-600" />
            </div>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Cameraman hoạt động</h3>
          <p className="text-3xl font-bold text-gray-900 mt-1">{statistics.activeCameramen}</p>
          <p className="text-gray-500 text-xs mt-2">{statistics.approvedServices} dịch vụ đã duyệt</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            {statistics.pendingServices > 0 && (
              <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-semibold">
                Cần duyệt
              </span>
            )}
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Dịch vụ chờ duyệt</h3>
          <p className="text-3xl font-bold text-gray-900 mt-1">{statistics.pendingServices}</p>
          <p className="text-gray-500 text-xs mt-2">{statistics.rejectedServices} đã từ chối</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-[#FF9500]" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-gray-600 text-sm font-medium">Tổng doanh thu</h3>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {(statistics.totalRevenue / 1000000).toFixed(1)}M
          </p>
          <p className="text-gray-500 text-xs mt-2">{statistics.totalBookings} booking</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Role Distribution Pie Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân bố người dùng</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roleDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {roleDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Service Status Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Trạng thái dịch vụ</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={serviceStatusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#FF9500" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Over Time */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Doanh thu theo thời gian (triệu VND)</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setRevenueTimeRange("week")}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  revenueTimeRange === "week"
                    ? "bg-[#FF9500] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Tuần
              </button>
              <button
                onClick={() => setRevenueTimeRange("month")}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  revenueTimeRange === "month"
                    ? "bg-[#FF9500] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Tháng
              </button>
              <button
                onClick={() => setRevenueTimeRange("year")}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  revenueTimeRange === "year"
                    ? "bg-[#FF9500] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Năm
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="period" 
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '12px'
                }}
                formatter={(value, name) => [
                  name === 'revenue' ? `${value}M VND` : `${value} bookings`,
                  name === 'revenue' ? 'Doanh thu' : 'Số booking'
                ]}
              />
              <Legend 
                wrapperStyle={{ fontSize: '12px' }}
                formatter={(value) => value === 'revenue' ? 'Doanh thu' : 'Số booking'}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#FF9500" 
                strokeWidth={3}
                dot={{ fill: '#FF9500', r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line 
                type="monotone" 
                dataKey="bookings" 
                stroke="#34C759" 
                strokeWidth={2}
                dot={{ fill: '#34C759', r: 4 }}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Membership Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân bố gói thành viên</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={membershipData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {membershipData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

     

      {/* Services Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Danh sách dịch vụ</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dịch vụ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cameraman
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giá
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockData.services.map(service => {
                const cameraman = mockData.users.find(u => u.id === service.cameraman_id);
                return (
                  <tr key={service.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">{service.title}</p>
                      <p className="text-xs text-gray-500">{service.styles.join(", ")}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {cameraman?.full_name}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-[#FF9500]">
                      {(service.amount / 1000000).toFixed(1)}M VND
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        service.status === "approved" ? "bg-green-100 text-green-800" :
                        service.status === "rejected" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"
                      }`}>
                        {service.status === "approved" ? "Đã duyệt" :
                         service.status === "rejected" ? "Từ chối" : "Chờ duyệt"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;