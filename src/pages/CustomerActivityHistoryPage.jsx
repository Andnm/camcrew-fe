import React, { useState } from 'react';
import { User, Calendar, Bell, CreditCard, FileText, LogOut, Edit2, Camera, Save, X, Phone, Mail, MapPin, Cake, MessageCircle, Clock, Star, CheckCircle, AlertCircle, Download, Eye } from 'lucide-react';

const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'Nguyễn Văn B',
    email: 'nguyenvanb@email.com',
    phone: '0901234567',
    address: 'Hồ Chí Minh',
    birthDate: '1990-01-15',
    bio: 'Tôi là một người yêu thích du lịch và khám phá những địa điểm mới. Luôn tìm kiếm những trải nghiệm thú vị và kết nối với mọi người.'
  });

  const sidebarItems = [
    { id: 'personal', icon: User, label: 'Thông tin cá nhân' },
    { id: 'bookings', icon: Calendar, label: 'Lịch sử đặt dịch vụ' },
    { id: 'reviews', icon: Star, label: 'Đánh giá của tôi' },
    { id: 'messages', icon: FileText, label: 'Tin nhắn' },
    { id: 'notifications', icon: Bell, label: 'Thông báo' },
    { id: 'saved', icon: CreditCard, label: 'Dịch vụ đã lưu' },
  ];

  const customerData = {
    profile: {
      name: 'Nguyễn Văn B',
      email: 'nguyenvanb@email.com',
      phone: '0901234567',
      avatar: null,
      joinDate: '2025-08-15',
      totalSpent: 45000000,
      totalBookings: 8,
      averageRating: 4.7
    },
    bookings: [
      {
        id: 200,
        service: 'Gói Cưới Cinematic 1 Ngày',
        cameraman: {
          name: 'Minh Film',
          avatar: null,
          rating: 4.9
        },
        date: '2025-10-05',
        time: 'Sáng',
        location: 'Nhà hàng Riverside, Q7',
        amount: 12000000,
        status: 'confirmed',
        paymentStatus: 'deposit_paid',
        bookingDate: '2025-09-21',
        category: 'Wedding'
      },
      {
        id: 199,
        service: 'Quay Sự Kiện Doanh Nghiệp',
        cameraman: {
          name: 'Anh Cinema',
          avatar: null,
          rating: 4.8
        },
        date: '2025-09-25',
        time: 'Chiều',
        location: 'Khách sạn Rex, Q1',
        amount: 8000000,
        status: 'completed',
        paymentStatus: 'fully_paid',
        bookingDate: '2025-09-10',
        category: 'Event',
        deliveredDate: '2025-10-02',
        files: ['highlight.mp4', 'full_event.mp4']
      },
      {
        id: 198,
        service: 'Chụp Ảnh Cưới Ngoại Cảnh',
        cameraman: {
          name: 'Hoàng Studio',
          avatar: null,
          rating: 4.6
        },
        date: '2025-08-20',
        time: 'Sáng',
        location: 'Landmark 81',
        amount: 6000000,
        status: 'completed',
        paymentStatus: 'fully_paid',
        bookingDate: '2025-08-10',
        category: 'Wedding',
        deliveredDate: '2025-08-30',
        files: ['edited_photos.zip', 'raw_photos.zip'],
        reviewed: true
      },
      {
        id: 197,
        service: 'Kỷ Yếu Lớp 12A1',
        cameraman: {
          name: 'Nam Creative',
          avatar: null,
          rating: 4.7
        },
        date: '2025-07-15',
        time: 'Sáng',
        location: 'Trường THPT Lê Quý Đôn',
        amount: 5000000,
        status: 'cancelled',
        paymentStatus: 'refunded',
        bookingDate: '2025-07-01',
        category: 'Yearbook',
        cancelReason: 'Thay đổi lịch học của trường'
      }
    ],
    reviews: [
      {
        id: 401,
        booking_id: 198,
        service: 'Chụp Ảnh Cưới Ngoại Cảnh',
        cameraman: 'Hoàng Studio',
        rating: 5,
        comment: 'Chất lượng ảnh rất đẹp, góc chụp sáng tạo. Hoàng rất nhiệt tình và chuyên nghiệp. Sẽ book lại dịch vụ khác.',
        date: '2025-09-02',
        helpful: 12,
        images: ['review1.jpg', 'review2.jpg']
      },
      {
        id: 402,
        booking_id: 199,
        service: 'Quay Sự Kiện Doanh Nghiệp',
        cameraman: 'Anh Cinema',
        rating: 4,
        comment: 'Video chất lượng tốt, đúng yêu cầu. Tuy nhiên thời gian giao hơi chậm so với cam kết ban đầu.',
        date: '2025-10-03',
        helpful: 8,
        response: {
          author: 'Anh Cinema',
          content: 'Cảm ơn anh đã phản hồi. Em sẽ cải thiện về thời gian giao hàng trong các dự án tới.',
          date: '2025-10-04'
        }
      }
    ],
    savedServices: [
      {
        id: 105,
        title: 'Gói TVC Quảng Cáo Premium',
        cameraman: 'Duc Vision',
        price: 25000000,
        rating: 4.9,
        category: 'TVC',
        savedDate: '2025-09-20'
      },
      {
        id: 106,
        title: 'Quay Phim Cưới Phong Cách Hàn Quốc',
        cameraman: 'Korea Style Studio',
        price: 18000000,
        rating: 4.8,
        category: 'Wedding',
        savedDate: '2025-09-15'
      }
    ]
  };

  const messages = [
    {
      id: 1,
      from: 'Minh Film',
      message: 'Cảm ơn bạn đã book dịch vụ. Chúng tôi sẽ liên hệ để xác nhận chi tiết buổi chụp.',
      time: '2 giờ trước',
      unread: true
    },
    {
      id: 2,
      from: 'Hỗ trợ khách hàng',
      message: 'Yêu cầu hoàn tiền của bạn đã được xử lý thành công.',
      time: '1 ngày trước',
      unread: false
    },
    {
      id: 3,
      from: 'Anh Cinema',
      message: 'Video sự kiện đã hoàn thành. Vui lòng kiểm tra và tải về.',
      time: '3 ngày trước',
      unread: false
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Thanh toán thành công',
      message: 'Đã thanh toán thành công cho booking Gói Cưới Cinematic 1 Ngày',
      time: '30 phút trước',
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'Nhắc nhở buổi chụp',
      message: 'Còn 2 ngày nữa đến buổi chụp cưới tại Nhà hàng Riverside',
      time: '2 giờ trước',
      read: false
    },
    {
      id: 3,
      type: 'warning',
      title: 'Yêu cầu đánh giá',
      message: 'Hãy để lại đánh giá cho dịch vụ Quay Sự Kiện Doanh Nghiệp',
      time: '1 ngày trước',
      read: true
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { bg: 'bg-blue-600', text: 'Đã xác nhận' },
      completed: { bg: 'bg-green-600', text: 'Hoàn thành' },
      cancelled: { bg: 'bg-red-600', text: 'Đã hủy' },
      pending: { bg: 'bg-yellow-600', text: 'Chờ xác nhận' }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-3 py-1 rounded-full text-white text-sm ${config.bg}`}>
        {config.text}
      </span>
    );
  };

  const getPaymentStatusBadge = (paymentStatus) => {
    const statusConfig = {
      deposit_paid: { bg: 'bg-yellow-600', text: 'Đã cọc' },
      fully_paid: { bg: 'bg-green-600', text: 'Đã thanh toán' },
      refunded: { bg: 'bg-gray-600', text: 'Đã hoàn tiền' },
      pending: { bg: 'bg-orange-600', text: 'Chờ thanh toán' }
    };
    const config = statusConfig[paymentStatus] || statusConfig.pending;
    return (
      <span className={`px-2 py-1 rounded text-white text-xs ${config.bg}`}>
        {config.text}
      </span>
    );
  };

  const renderPersonalInfo = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Thông tin cá nhân</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            <span>Chỉnh sửa</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Lưu lại</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Hủy bỏ</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Họ và Tên*
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 disabled:opacity-60"
            placeholder="Nhập họ và tên"
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Số điện thoại*
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 disabled:opacity-60"
            placeholder="Nhập số điện thoại"
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Email*
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 disabled:opacity-60"
            placeholder="Nhập email"
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Ngày sinh*
          </label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 disabled:opacity-60"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Địa chỉ*
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 disabled:opacity-60"
            placeholder="Nhập địa chỉ"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Mô tả bản thân (bio)
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            disabled={!isEditing}
            rows={4}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 disabled:opacity-60 resize-none"
            placeholder="Viết vài dòng về bản thân..."
          />
        </div>
      </div>

      {isEditing && (
        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
          >
            Lưu lại
          </button>
        </div>
      )}
    </div>
  );

  const renderBookings = () => (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Lịch sử đặt dịch vụ</h1>
      <div className="space-y-6">
        {customerData.bookings.map((booking) => (
          <div key={booking.id} className="bg-gray-700 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">{booking.service}</h3>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-gray-300">{booking.cameraman.name}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-gray-300 text-sm">{booking.cameraman.rating}</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-gray-300 text-sm">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{booking.date} - {booking.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{booking.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold">{formatCurrency(booking.amount)}</span>
                  </div>
                </div>
              </div>
              <div className="text-right space-y-2">
                {getStatusBadge(booking.status)}
                {getPaymentStatusBadge(booking.paymentStatus)}
              </div>
            </div>

            {booking.files && booking.files.length > 0 && (
              <div className="mt-4 p-4 bg-gray-600 rounded-lg">
                <h4 className="text-white font-medium mb-3">Files đã giao:</h4>
                <div className="flex flex-wrap gap-2">
                  {booking.files.map((file, index) => (
                    <button
                      key={index}
                      className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded text-sm transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>{file}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {booking.cancelReason && (
              <div className="mt-4 p-4 bg-red-900/20 border border-red-500 rounded-lg">
                <p className="text-red-300 text-sm">
                  <strong>Lý do hủy:</strong> {booking.cancelReason}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderReviews = () => (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Đánh giá của tôi</h1>
      <div className="space-y-6">
        {customerData.reviews.map((review) => (
          <div key={review.id} className="bg-gray-700 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{review.service}</h3>
                <p className="text-gray-300">{review.cameraman}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-400 text-sm">{review.date}</p>
              </div>
            </div>

            <p className="text-gray-300 mb-4">{review.comment}</p>

            {review.response && (
              <div className="bg-gray-600 rounded-lg p-4 mt-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-medium">Phản hồi từ {review.response.author}</h4>
                  <span className="text-gray-400 text-sm">{review.response.date}</span>
                </div>
                <p className="text-gray-300">{review.response.content}</p>
              </div>
            )}

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-600">
              <span className="text-gray-400 text-sm">{review.helpful} người thấy hữu ích</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMessages = () => (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Tin nhắn</h1>
      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`bg-gray-700 rounded-lg p-4 ${msg.unread ? 'border-l-4 border-orange-500' : ''}`}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-white">{msg.from}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-sm">{msg.time}</span>
                {msg.unread && (
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                )}
              </div>
            </div>
            <p className="text-gray-300">{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Thông báo</h1>
      <div className="space-y-4">
        {notifications.map((notif) => (
          <div key={notif.id} className={`bg-gray-700 rounded-lg p-4 ${!notif.read ? 'border-l-4 border-orange-500' : ''}`}>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {notif.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
                {notif.type === 'info' && <Bell className="w-5 h-5 text-blue-500" />}
                {notif.type === 'warning' && <AlertCircle className="w-5 h-5 text-yellow-500" />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-white">{notif.title}</h3>
                  <span className="text-gray-400 text-sm">{notif.time}</span>
                </div>
                <p className="text-gray-300">{notif.message}</p>
              </div>
              {!notif.read && (
                <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-2"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSavedServices = () => (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Dịch vụ đã lưu</h1>
      <div className="grid gap-6">
        {customerData.savedServices.map((service) => (
          <div key={service.id} className="bg-gray-700 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{service.title}</h3>
                <p className="text-gray-300 mb-2">{service.cameraman}</p>
                <div className="flex items-center space-x-4">
                  <span className="text-orange-500 font-semibold text-lg">{formatCurrency(service.price)}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-gray-300">{service.rating}</span>
                  </div>
                  <span className="px-2 py-1 bg-gray-600 text-gray-300 rounded text-sm">{service.category}</span>
                </div>
              </div>
              <div className="text-right space-y-2">
                <p className="text-gray-400 text-sm">Đã lưu: {service.savedDate}</p>
                <div className="flex space-x-2">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                    Đặt ngay
                  </button>
                  <button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'personal':
        return renderPersonalInfo();
      case 'bookings':
        return renderBookings();
      case 'reviews':
        return renderReviews();
      case 'messages':
        return renderMessages();
      case 'notifications':
        return renderNotifications();
      case 'saved':
        return renderSavedServices();
      default:
        return renderPersonalInfo();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-80">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="text-center mb-6">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="w-24 h-24 bg-gray-600 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-orange-500 rounded-full p-2 hover:bg-orange-600 transition-colors">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>
                <h2 className="text-white text-xl font-bold">{customerData.profile.name}</h2>
                <p className="text-gray-400">Khách hàng</p>
                <div className="mt-2">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                    Thành viên từ 08/2025
                  </span>
                </div>
              </div>

              <div className="mb-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Tổng chi tiêu:</span>
                  <span className="text-white font-semibold">{formatCurrency(customerData.profile.totalSpent)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Số booking:</span>
                  <span className="text-white font-semibold">{customerData.profile.totalBookings}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Đánh giá TB:</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold">{customerData.profile.averageRating}</span>
                  </div>
                </div>
              </div>

              <nav className="space-y-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === item.id 
                        ? 'bg-orange-500 text-white' 
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>

              <button className="w-full mt-6 flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors">
                <LogOut className="w-5 h-5" />
                <span>Đăng xuất</span>
              </button>
            </div>
          </aside>

          <main className="flex-1">
            <div className="bg-gray-800 rounded-lg p-8">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;