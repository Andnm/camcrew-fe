import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, DollarSign, User, MessageCircle, Eye, Camera, MapPin, Star } from 'lucide-react';
import Header from '../components/layout/Header';
import { mockData } from '../data/mockData';

const BookingManagementPage = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [activeTab, setActiveTab] = useState('pending');

  const bookings = [
    {
      id: 200,
      customer: { name: 'Nguyễn Văn B', avatar: null },
      service: 'Gói Cưới Cinematic 1 Ngày',
      date: '2025-10-05',
      time: 'Sáng',
      amount: 12000000,
      status: 'requested',
      message: 'Xin chào anh, em muốn book dịch vụ cưới cho ngày 5/10. Có thể trao đổi thêm không?',
      location: 'Quận 1, TP.HCM',
      created_at: '2025-09-21T09:00:00Z'
    },
    {
      id: 201,
      customer: { name: 'Trần Khách 2', avatar: null },
      service: 'Gói Cưới Cinematic 1 Ngày',
      date: '2025-10-12',
      time: 'Chiều',
      amount: 12000000,
      status: 'confirmed',
      message: 'Đã xác nhận, mong anh chuẩn bị kỹ cho ngày quay.',
      location: 'Bình Dương',
      created_at: '2025-09-22T01:00:00Z'
    },
    {
      id: 202,
      customer: { name: 'Phạm Khách 4', avatar: null },
      service: 'Gói Cưới Cinematic 1 Ngày',
      date: '2025-09-10',
      time: 'Chiều',
      amount: 12000000,
      status: 'completed',
      rating: 5,
      location: 'Quận 7, TP.HCM',
      created_at: '2025-09-07T03:00:00Z'
    }
  ];

  const getStatusBadge = (status) => {
    const statusMap = {
      requested: { color: 'bg-yellow-600', text: 'Chờ xác nhận', icon: Clock },
      confirmed: { color: 'bg-blue-600', text: 'Đã xác nhận', icon: CheckCircle },
      in_progress: { color: 'bg-purple-600', text: 'Đang thực hiện', icon: Clock },
      completed: { color: 'bg-green-600', text: 'Hoàn thành', icon: CheckCircle },
      cancelled: { color: 'bg-red-600', text: 'Đã hủy', icon: XCircle }
    };
    
    const statusInfo = statusMap[status] || { color: 'bg-gray-600', text: 'Không xác định', icon: Clock };
    return (
      <div className="flex items-center space-x-2">
        <statusInfo.icon className="w-4 h-4 text-white" />
        <span className={`${statusInfo.color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
          {statusInfo.text}
        </span>
      </div>
    );
  };

  const handleBookingAction = (booking, action) => {
    console.log(`${action} booking:`, booking.id);
  };

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'pending') return booking.status === 'requested';
    if (activeTab === 'confirmed') return ['confirmed', 'in_progress'].includes(booking.status);
    if (activeTab === 'completed') return booking.status === 'completed';
    if (activeTab === 'cancelled') return booking.status === 'cancelled';
    return true;
  });

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-80">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-3 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                    alt="Nguyen Van A"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-white text-lg font-bold">Nguyễn Văn A</h2>
                <p className="text-gray-400 text-sm">Cinematic Videographer</p>
                <div className="mt-2">
                  <span className="bg-[#FF9500] text-white px-3 py-1 rounded-full text-xs">
                    Đã xác minh
                  </span>
                </div>
              </div>

              <nav className="space-y-2">
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-gray-300 hover:bg-gray-700 transition-colors">
                  <User className="w-5 h-5" />
                  <span>Thông tin cá nhân</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left bg-[#FF9500] text-white">
                  <Calendar className="w-5 h-5" />
                  <span>Quản lý booking</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-gray-300 hover:bg-gray-700 transition-colors">
                  <Camera className="w-5 h-5" />
                  <span>Quản lý dịch vụ</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-gray-300 hover:bg-gray-700 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>Tin nhắn</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-gray-300 hover:bg-gray-700 transition-colors">
                  <DollarSign className="w-5 h-5" />
                  <span>Doanh thu</span>
                </button>
              </nav>
            </div>
          </aside>

          <main className="flex-1">
            <div className="bg-gray-800 rounded-lg">
              <div className="p-6 border-b border-gray-700">
                <h1 className="text-white text-xl font-bold mb-4">Quản lý Booking</h1>
                
                <div className="flex space-x-1 bg-gray-700 rounded-lg p-1">
                  {[
                    { id: 'pending', label: 'Chờ xác nhận', count: bookings.filter(b => b.status === 'requested').length },
                    { id: 'confirmed', label: 'Đã xác nhận', count: bookings.filter(b => ['confirmed', 'in_progress'].includes(b.status)).length },
                    { id: 'completed', label: 'Hoàn thành', count: bookings.filter(b => b.status === 'completed').length },
                    { id: 'cancelled', label: 'Đã hủy', count: bookings.filter(b => b.status === 'cancelled').length }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
                        activeTab === tab.id 
                          ? 'bg-[#FF9500] text-white' 
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      <span className="text-sm font-medium">{tab.label}</span>
                      {tab.count > 0 && (
                        <span className={`${activeTab === tab.id ? 'bg-white text-[#FF9500]' : 'bg-[#FF9500] text-white'} text-xs rounded-full px-2 py-1`}>
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {filteredBookings.map((booking) => (
                    <div key={booking.id} className="bg-gray-700 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-gray-300" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold text-lg">{booking.customer.name}</h3>
                            <p className="text-gray-400 text-sm">{booking.service}</p>
                            <p className="text-[#FF9500] font-semibold">
                              {new Intl.NumberFormat('vi-VN').format(booking.amount)} VND
                            </p>
                          </div>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-gray-300">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{new Date(booking.date).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-300">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{booking.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-300">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{booking.location}</span>
                        </div>
                      </div>

                      {booking.message && (
                        <div className="bg-gray-600 rounded-lg p-3 mb-4">
                          <p className="text-gray-300 text-sm italic">"{booking.message}"</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="text-gray-400 text-sm">
                          Tạo lúc: {new Date(booking.created_at).toLocaleString('vi-VN')}
                        </div>

                        <div className="flex space-x-2">
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2">
                            <Eye className="w-4 h-4" />
                            <span>Chi tiết</span>
                          </button>
                          
                          <button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2">
                            <MessageCircle className="w-4 h-4" />
                            <span>Nhắn tin</span>
                          </button>

                          {booking.status === 'requested' && (
                            <>
                              <button 
                                onClick={() => handleBookingAction(booking, 'accept')}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2"
                              >
                                <CheckCircle className="w-4 h-4" />
                                <span>Xác nhận</span>
                              </button>
                              <button 
                                onClick={() => handleBookingAction(booking, 'reject')}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2"
                              >
                                <XCircle className="w-4 h-4" />
                                <span>Từ chối</span>
                              </button>
                            </>
                          )}

                          {booking.status === 'confirmed' && (
                            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                              Bắt đầu quay
                            </button>
                          )}

                          {booking.status === 'completed' && booking.rating && (
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${i < booking.rating ? 'text-[#FF9500] fill-current' : 'text-gray-400'}`} 
                                />
                              ))}
                              <span className="text-gray-300 text-sm ml-2">Đã đánh giá</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredBookings.length === 0 && (
                    <div className="text-center py-12">
                      <Calendar className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                      <h3 className="text-gray-400 text-lg font-medium mb-2">Không có booking nào</h3>
                      <p className="text-gray-500">
                        {activeTab === 'pending' && 'Chưa có yêu cầu booking mới'}
                        {activeTab === 'confirmed' && 'Chưa có booking nào được xác nhận'}
                        {activeTab === 'completed' && 'Chưa có booking nào hoàn thành'}
                        {activeTab === 'cancelled' && 'Chưa có booking nào bị hủy'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default BookingManagementPage;