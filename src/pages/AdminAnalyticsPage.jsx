import React, { useState } from 'react';
import { TrendingUp, Users, DollarSign, Calendar, Eye, BarChart3, PieChart } from 'lucide-react';
import Header from '../components/layout/Header';

const AdminAnalyticsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');

  const analytics = {
    overview: {
      totalUsers: 1247,
      activeCameramen: 89,
      totalBookings: 342,
      totalRevenue: 1850000000,
      growthRates: {
        users: 12.5,
        bookings: 18.2,
        revenue: 23.1
      }
    },
    userStats: {
      customers: 958,
      cameramen: 289,
      newThisMonth: 67,
      activeThisMonth: 234
    },
    bookingStats: {
      completed: 289,
      inProgress: 34,
      cancelled: 19,
      averageValue: 8500000
    },
    revenueData: [
      { month: 'T1', revenue: 125000000, bookings: 45 },
      { month: 'T2', revenue: 148000000, bookings: 52 },
      { month: 'T3', revenue: 167000000, bookings: 58 },
      { month: 'T4', revenue: 142000000, bookings: 49 },
      { month: 'T5', revenue: 189000000, bookings: 65 },
      { month: 'T6', revenue: 203000000, bookings: 71 },
      { month: 'T7', revenue: 186000000, bookings: 63 },
      { month: 'T8', revenue: 195000000, bookings: 67 },
      { month: 'T9', revenue: 218000000, bookings: 74 }
    ],
    topCameramen: [
      { name: 'Minh Film', bookings: 23, revenue: 276000000, rating: 4.9 },
      { name: 'Anh Cinema', bookings: 19, revenue: 228000000, rating: 4.8 },
      { name: 'Hoàng Studio', bookings: 16, revenue: 192000000, rating: 4.7 },
      { name: 'Nam Photo', bookings: 14, revenue: 168000000, rating: 4.6 },
      { name: 'Duc Vision', bookings: 12, revenue: 144000000, rating: 4.8 }
    ],
    serviceCategories: [
      { name: 'Wedding', count: 156, percentage: 45.6 },
      { name: 'Event', count: 89, percentage: 26.0 },
      { name: 'TVC', count: 67, percentage: 19.6 },
      { name: 'Yearbook', count: 30, percentage: 8.8 }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white text-3xl font-bold">Analytics Dashboard</h1>
              <p className="text-gray-400">Thống kê và phân tích dữ liệu hệ thống</p>
            </div>
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="thisMonth">Tháng này</option>
              <option value="lastMonth">Tháng trước</option>
              <option value="thisQuarter">Quý này</option>
              <option value="thisYear">Năm này</option>
            </select>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Tổng người dùng</p>
                <p className="text-white text-3xl font-bold">{analytics.overview.totalUsers.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-500 text-sm font-medium">+{analytics.overview.growthRates.users}%</span>
                </div>
              </div>
              <div className="bg-blue-600 p-3 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Tổng booking</p>
                <p className="text-white text-3xl font-bold">{analytics.overview.totalBookings}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-500 text-sm font-medium">+{analytics.overview.growthRates.bookings}%</span>
                </div>
              </div>
              <div className="bg-purple-600 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Tổng doanh thu</p>
                <p className="text-white text-3xl font-bold">
                  {(analytics.overview.totalRevenue / 1000000000).toFixed(1)}B
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-500 text-sm font-medium">+{analytics.overview.growthRates.revenue}%</span>
                </div>
              </div>
              <div className="bg-green-600 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Cameraman hoạt động</p>
                <p className="text-white text-3xl font-bold">{analytics.overview.activeCameramen}</p>
                <div className="flex items-center mt-1">
                  <span className="text-gray-400 text-sm">
                    {Math.round((analytics.overview.activeCameramen / analytics.userStats.cameramen) * 100)}% tổng số
                  </span>
                </div>
              </div>
              <div className="bg-orange-600 p-3 rounded-lg">
                <Eye className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-xl font-semibold flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Doanh thu và Booking theo tháng</span>
                </h3>
              </div>
              
              <div className="h-80 flex items-end space-x-2">
                {analytics.revenueData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center group">
                    <div className="relative w-full">
                      <div 
                        className="w-full bg-orange-500 rounded-t hover:bg-orange-400 transition-colors cursor-pointer"
                        style={{ 
                          height: `${(data.revenue / Math.max(...analytics.revenueData.map(d => d.revenue))) * 240}px` 
                        }}
                      />
                      <div 
                        className="w-full bg-blue-500 rounded-t hover:bg-blue-400 transition-colors cursor-pointer mt-1"
                        style={{ 
                          height: `${(data.bookings / Math.max(...analytics.revenueData.map(d => d.bookings))) * 60}px` 
                        }}
                      />
                    </div>
                    <span className="text-gray-400 text-xs mt-2">{data.month}</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bg-gray-700 text-white p-2 rounded text-xs mt-8 z-10">
                      <p>Doanh thu: {(data.revenue / 1000000).toFixed(0)}M VND</p>
                      <p>Booking: {data.bookings}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-400">Doanh thu</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-400">Số booking</span>
                </div>
              </div>
            </div>
          </div>

          {/* Service Categories */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-white text-xl font-semibold mb-6 flex items-center space-x-2">
              <PieChart className="w-5 h-5" />
              <span>Danh mục dịch vụ</span>
            </h3>
            
            <div className="space-y-4">
              {analytics.serviceCategories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">{category.name}</span>
                    <div className="text-right">
                      <span className="text-white font-semibold">{category.count}</span>
                      <span className="text-gray-400 text-sm ml-2">({category.percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gray-700 rounded-lg">
              <p className="text-gray-400 text-sm">Danh mục phổ biến nhất</p>
              <p className="text-white font-semibold">{analytics.serviceCategories[0].name}</p>
              <p className="text-orange-500 text-sm">{analytics.serviceCategories[0].percentage}% tổng booking</p>
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-white text-xl font-semibold mb-6">Top Cameramen</h3>
            
            <div className="space-y-4">
              {analytics.topCameramen.map((cameraman, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{cameraman.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>{cameraman.bookings} booking</span>
                      <span>⭐ {cameraman.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-orange-500 font-semibold">
                      {(cameraman.revenue / 1000000).toFixed(0)}M VND
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-white text-xl font-semibold mb-6">Thống kê chi tiết</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-gray-400 text-sm mb-3">Phân bố người dùng</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Khách hàng</span>
                    <span className="text-white font-semibold">{analytics.userStats.customers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Cameramen</span>
                    <span className="text-white font-semibold">{analytics.userStats.cameramen}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Mới tháng này</span>
                    <span className="text-green-400 font-semibold">+{analytics.userStats.newThisMonth}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-gray-400 text-sm mb-3">Trạng thái booking</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Hoàn thành</span>
                    <span className="text-green-400 font-semibold">{analytics.bookingStats.completed}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Đang thực hiện</span>
                    <span className="text-blue-400 font-semibold">{analytics.bookingStats.inProgress}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Đã hủy</span>
                    <span className="text-red-400 font-semibold">{analytics.bookingStats.cancelled}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Giá trị booking trung bình</p>
                <p className="text-white text-2xl font-bold">
                  {(analytics.bookingStats.averageValue / 1000000).toFixed(1)}M VND
                </p>
                <p className="text-green-400 text-sm">+15% so với tháng trước</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;