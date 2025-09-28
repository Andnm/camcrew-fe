import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, User, Phone, MessageCircle, Camera, FileText, Star, Download } from 'lucide-react';
import Header from '../components/layout/Header';

const BookingDetailPage = () => {
  const [activeTab, setActiveTab] = useState('details');

  const booking = {
    id: 200,
    customer: {
      name: 'Nguyễn Văn B',
      phone: '0901234567',
      email: 'nguyenvanb@email.com',
      avatar: null
    },
    cameraman: {
      name: 'Minh Film',
      phone: '0900000002',
      email: 'minhfilm@camhub.vn',
      avatar: null
    },
    service: {
      title: 'Gói Cưới Cinematic 1 Ngày',
      description: 'Quay trọn buổi cưới với phong cách cinematic, bao gồm highlight và full lễ',
      category: 'Wedding'
    },
    schedule: {
      date: '2025-10-05',
      time: 'Sáng (8:00 - 16:00)',
      location: 'Nhà hàng Riverside, Quận 7, TP.HCM',
      address: '123 Đường Nguyễn Văn Linh, Phường Tân Thuận Đông, Quận 7'
    },
    pricing: {
      serviceAmount: 12000000,
      deposit: 3000000,
      remaining: 9000000,
      platformFee: 600000,
      cameranNetAmount: 11400000
    },
    status: 'confirmed',
    timeline: [
      {
        date: '2025-09-21',
        time: '09:00',
        event: 'Booking được tạo',
        description: 'Khách hàng đã gửi yêu cầu booking',
        status: 'completed'
      },
      {
        date: '2025-09-21',
        time: '14:30',
        event: 'Cameraman xác nhận',
        description: 'Minh Film đã xác nhận nhận việc',
        status: 'completed'
      },
      {
        date: '2025-09-22',
        time: '10:00',
        event: 'Thanh toán đặt cọc',
        description: 'Đã thanh toán 3,000,000 VND',
        status: 'completed'
      },
      {
        date: '2025-10-05',
        time: '08:00',
        event: 'Bắt đầu quay',
        description: 'Ngày quay chính thức',
        status: 'upcoming'
      },
      {
        date: '2025-10-15',
        time: null,
        event: 'Giao sản phẩm',
        description: 'Dự kiến giao video hoàn chỉnh',
        status: 'upcoming'
      }
    ],
    requirements: 'Yêu cầu quay theo phong cách tự nhiên, ưu tiên các khoảnh khắc cảm xúc. Cần có cả phần lễ cưới và tiệc cưới.',
    notes: [
      {
        date: '2025-09-22',
        author: 'Khách hàng',
        content: 'Anh nhớ mang thêm lens tele để chụp các khoảnh khắc xa nhé'
      },
      {
        date: '2025-09-23',
        author: 'Cameraman',
        content: 'Em đã chuẩn bị đầy đủ thiết bị. Em sẽ có mặt từ 7:30 để setup'
      }
    ]
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      requested: { color: 'bg-yellow-600', text: 'Chờ xác nhận' },
      confirmed: { color: 'bg-blue-600', text: 'Đã xác nhận' },
      in_progress: { color: 'bg-purple-600', text: 'Đang thực hiện' },
      completed: { color: 'bg-green-600', text: 'Hoàn thành' },
      cancelled: { color: 'bg-red-600', text: 'Đã hủy' }
    };
    
    const statusInfo = statusMap[status] || { color: 'bg-gray-600', text: 'Không xác định' };
    return (
      <span className={`${statusInfo.color} text-white px-4 py-2 rounded-full text-sm font-medium`}>
        {statusInfo.text}
      </span>
    );
  };

  const getTimelineStatus = (status) => {
    const statusMap = {
      completed: 'bg-green-500',
      upcoming: 'bg-gray-400',
      current: 'bg-orange-500'
    };
    return statusMap[status] || 'bg-gray-400';
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="max-w-6xl mx-auto p-6 pt-24">
        <div className="flex items-center mb-6">
          <button className="text-gray-400 hover:text-white mr-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-white text-2xl font-bold">Booking #{booking.id}</h1>
            <p className="text-gray-400">Chi tiết booking và quản lý dự án</p>
          </div>
          <div className="ml-auto">
            {getStatusBadge(booking.status)}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Overview */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-white text-xl font-semibold mb-4">{booking.service.title}</h2>
              <p className="text-gray-300 mb-4">{booking.service.description}</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-white font-medium">{new Date(booking.schedule.date).toLocaleDateString('vi-VN')}</p>
                      <p className="text-gray-400 text-sm">{booking.schedule.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-orange-500 mt-1" />
                    <div>
                      <p className="text-white font-medium">{booking.schedule.location}</p>
                      <p className="text-gray-400 text-sm">{booking.schedule.address}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-2">Tổng giá trị</p>
                    <p className="text-white text-2xl font-bold">{new Intl.NumberFormat('vi-VN').format(booking.pricing.serviceAmount)} VND</p>
                    <div className="mt-2 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Đã cọc:</span>
                        <span className="text-green-400">{new Intl.NumberFormat('vi-VN').format(booking.pricing.deposit)} VND</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Còn lại:</span>
                        <span className="text-yellow-400">{new Intl.NumberFormat('vi-VN').format(booking.pricing.remaining)} VND</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-gray-800 rounded-lg">
              <div className="flex border-b border-gray-700">
                {[
                  { id: 'details', label: 'Chi tiết', icon: FileText },
                  { id: 'timeline', label: 'Tiến trình', icon: Clock },
                  { id: 'communication', label: 'Trao đổi', icon: MessageCircle }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 transition-colors ${
                      activeTab === tab.id
                        ? 'border-b-2 border-orange-500 text-orange-500'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'details' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-white text-lg font-semibold mb-3">Yêu cầu đặc biệt</h3>
                      <div className="bg-gray-700 rounded-lg p-4">
                        <p className="text-gray-300">{booking.requirements}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-white text-lg font-semibold mb-3">Thông tin thanh toán</h3>
                      <div className="bg-gray-700 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Giá dịch vụ:</span>
                          <span className="text-white">{new Intl.NumberFormat('vi-VN').format(booking.pricing.serviceAmount)} VND</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Phí nền tảng (5%):</span>
                          <span className="text-red-400">-{new Intl.NumberFormat('vi-VN').format(booking.pricing.platformFee)} VND</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-600 pt-2">
                          <span className="text-gray-400">Cameraman nhận:</span>
                          <span className="text-green-400 font-semibold">{new Intl.NumberFormat('vi-VN').format(booking.pricing.cameranNetAmount)} VND</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'timeline' && (
                  <div className="space-y-4">
                    {booking.timeline.map((item, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className={`w-3 h-3 rounded-full mt-2 ${getTimelineStatus(item.status)}`}></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-white font-medium">{item.event}</h4>
                            <span className="text-gray-400 text-sm">
                              {new Date(item.date).toLocaleDateString('vi-VN')} {item.time}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'communication' && (
                  <div className="space-y-4">
                    {booking.notes.map((note, index) => (
                      <div key={index} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-orange-500 font-medium">{note.author}</span>
                          <span className="text-gray-400 text-sm">{new Date(note.date).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <p className="text-gray-300">{note.content}</p>
                      </div>
                    ))}
                    
                    <div className="mt-6">
                      <textarea
                        placeholder="Thêm ghi chú hoặc bình luận..."
                        rows={3}
                        className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      <button className="mt-3 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        Thêm ghi chú
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-white text-lg font-semibold mb-4">Thông tin liên hệ</h3>
              
              <div className="space-y-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-300" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{booking.customer.name}</p>
                      <p className="text-gray-400 text-sm">Khách hàng</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300 text-sm">{booking.customer.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300 text-sm">{booking.customer.email}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm transition-colors">
                      Gọi
                    </button>
                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded text-sm transition-colors">
                      Nhắn tin
                    </button>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                      <Camera className="w-5 h-5 text-gray-300" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{booking.cameraman.name}</p>
                      <p className="text-gray-400 text-sm">Cameraman</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300 text-sm">{booking.cameraman.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300 text-sm">{booking.cameraman.email}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm transition-colors">
                      Gọi
                    </button>
                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded text-sm transition-colors">
                      Nhắn tin
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-white text-lg font-semibold mb-4">Hành động nhanh</h3>
              
              <div className="space-y-3">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Tải hợp đồng</span>
                </button>
                
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors">
                  Chỉnh sửa booking
                </button>
                
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors">
                  Đánh dấu hoàn thành
                </button>
                
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors">
                  Hủy booking
                </button>
              </div>
            </div>

            {/* Files & Documents */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-white text-lg font-semibold mb-4">Tài liệu & File</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">Hợp đồng.pdf</p>
                    <p className="text-gray-400 text-xs">245 KB</p>
                  </div>
                  <button className="text-blue-400 hover:text-blue-300">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                  <FileText className="w-5 h-5 text-green-400" />
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">Biên lai thanh toán</p>
                    <p className="text-gray-400 text-xs">128 KB</p>
                  </div>
                  <button className="text-green-400 hover:text-green-300">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <button className="w-full mt-4 border-2 border-dashed border-gray-600 rounded-lg p-3 text-gray-400 hover:border-orange-500 hover:text-orange-500 transition-colors">
                + Thêm file
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailPage;